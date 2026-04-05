import { openDB, IDBPDatabase } from 'idb';

type SyncCallback = (data: any) => void;

interface QueuedRequest {
  id?: number;
  url: string;
  options: RequestInit;
  timestamp: number;
  tenantId: string;
}

class SyncService {
  private ws: WebSocket | null = null;
  private tenantId: string = localStorage.getItem('tenantId') || 'tenant-default';
  private callbacks: Set<SyncCallback> = new Set();
  private db: Promise<IDBPDatabase>;
  private isOnline: boolean = navigator.onLine;
  private statusCallbacks: Set<(online: boolean, queueCount: number) => void> = new Set();

  constructor() {
    this.db = this.initDB();
    this.connect();
    this.setupNetworkListeners();
    this.updateQueueCount();
  }

  private async updateQueueCount() {
    const db = await this.db;
    const count = await db.count('queue');
    this.statusCallbacks.forEach(cb => cb(this.isOnline, count));
  }

  private async initDB() {
    return openDB('factoryflow-sync', 1, {
      upgrade(db) {
        // Store for caching GET requests
        db.createObjectStore('cache', { keyPath: 'url' });
        // Store for queuing POST/PUT/DELETE requests
        db.createObjectStore('queue', { keyPath: 'id', autoIncrement: true });
      },
    });
  }

  private setupNetworkListeners() {
    window.addEventListener('online', () => this.handleNetworkChange(true));
    window.addEventListener('offline', () => this.handleNetworkChange(false));
  }

  private async handleNetworkChange(online: boolean) {
    this.isOnline = online;
    await this.updateQueueCount();
    if (online) {
      console.log('Back online. Syncing queue...');
      await this.syncQueue();
      this.connect(); // Reconnect WebSocket
    } else {
      console.log('Went offline.');
    }
  }

  private connect() {
    if (!this.isOnline) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    this.ws = new WebSocket(`${protocol}//${host}?tenantId=${this.tenantId}`);

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.callbacks.forEach(cb => cb(data));
    };

    this.ws.onclose = () => {
      if (this.isOnline) {
        console.log('Sync connection closed. Reconnecting...');
        setTimeout(() => this.connect(), 3000);
      }
    };
  }

  private async syncQueue() {
    const db = await this.db;
    const tx = db.transaction('queue', 'readwrite');
    const store = tx.objectStore('queue');
    const requests = await store.getAll();

    for (const req of requests) {
      try {
        const response = await fetch(req.url, {
          ...req.options,
          headers: {
            ...req.options.headers,
            'x-tenant-id': req.tenantId,
            'x-offline-sync': 'true'
          }
        });

        if (response.ok) {
          await store.delete(req.id!);
          console.log(`Synced request to ${req.url}`);
          await this.updateQueueCount();
        }
      } catch (error) {
        console.error(`Failed to sync request to ${req.url}`, error);
        break; // Stop syncing if network fails again
      }
    }
    await tx.done;
  }

  public subscribe(callback: SyncCallback) {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }

  public onStatusChange(callback: (online: boolean, queueCount: number) => void) {
    this.statusCallbacks.add(callback);
    this.updateQueueCount().then(() => callback(this.isOnline, 0)); // Initial call will be updated by updateQueueCount
    return () => this.statusCallbacks.delete(callback);
  }

  public setTenant(id: string) {
    this.tenantId = id;
    localStorage.setItem('tenantId', id);
    this.ws?.close();
    if (this.isOnline) this.connect();
  }

  public getTenantId() {
    return this.tenantId;
  }

  public getOnlineStatus() {
    return this.isOnline;
  }

  public async fetch(url: string, options: RequestInit = {}) {
    const method = options.method || 'GET';
    const isGet = method.toUpperCase() === 'GET';

    if (!this.isOnline) {
      if (isGet) {
        // Return from cache if offline
        const db = await this.db;
        const cached = await db.get('cache', url);
        if (cached) {
          console.log(`Serving cached data for ${url}`);
          return new Response(JSON.stringify(cached.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'x-from-cache': 'true' }
          });
        }
        throw new Error('Offline and no cached data available');
      } else {
        // Queue mutation requests if offline
        const db = await this.db;
        await db.add('queue', {
          url,
          options,
          timestamp: Date.now(),
          tenantId: this.tenantId
        });
        console.log(`Queued ${method} request to ${url} for later sync`);
        await this.updateQueueCount();
        return new Response(JSON.stringify({ status: 'queued', message: 'Offline: Request queued for sync' }), {
          status: 202,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Online: Perform real fetch
    const headers = {
      ...options.headers,
      'x-tenant-id': this.tenantId
    };

    try {
      const response = await fetch(url, { ...options, headers });
      
      if (response.ok && isGet) {
        // Cache successful GET requests
        const clonedResponse = response.clone();
        const data = await clonedResponse.json();
        const db = await this.db;
        await db.put('cache', { url, data, timestamp: Date.now() });
      }

      return response;
    } catch (error) {
      if (isGet) {
        // Fallback to cache on network error even if "online" (e.g. DNS failure)
        const db = await this.db;
        const cached = await db.get('cache', url);
        if (cached) {
          return new Response(JSON.stringify(cached.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'x-from-cache': 'true' }
          });
        }
      }
      throw error;
    }
  }
}

export const sync = new SyncService();
