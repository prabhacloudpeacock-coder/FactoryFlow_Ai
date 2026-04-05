import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { WebSocketServer, WebSocket } from "ws";
import { createServer } from "http";

dotenv.config();

// --- Database Configuration ---
let supabase: any = null;
if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
  supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
}

let mysqlPool: any = null;
if (process.env.MYSQL_HOST) {
  mysqlPool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
}

// --- Multi-Tenant Mock Store (Fallback) ---
const mockDb: Record<string, { workOrders: any[], logs: any[], machines: any[] }> = {
  "tenant-default": {
    workOrders: [
      { id: "WO-EV-001", product: "EV Bike Model S", status: "In Progress", qty: 50, supervisor: "Robert Chen", startDate: "2026-04-01", endDate: "2026-04-10" },
      { id: "WO-EV-002", product: "EV Bike Model X", status: "Released", qty: 25, supervisor: "Sarah Miller", startDate: "2026-04-05", endDate: "2026-04-15" },
      { id: "WO-EV-003", product: "EV Bike Model S", status: "Completed", qty: 100, supervisor: "James Wilson", startDate: "2026-03-15", endDate: "2026-03-25" }
    ],
    logs: [],
    machines: [
      { id: "M001", name: "Frame Welding Station", status: "running" },
      { id: "M002", name: "Motor Assembly Line", status: "idle" },
      { id: "M003", name: "Battery Testing Unit", status: "error" },
      { id: "M004", name: "Final QA Dyno", status: "maintenance" }
    ]
  }
};

const getTenantData = (tenantId: string) => {
  if (!mockDb[tenantId]) {
    mockDb[tenantId] = { workOrders: [], logs: [], machines: [] };
  }
  return mockDb[tenantId];
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);
  const PORT = 3000;

  // --- WebSocket Setup (App Sync) ---
  const wss = new WebSocketServer({ server });
  const clients = new Map<string, Set<WebSocket>>();

  wss.on("connection", (ws, req) => {
    const url = new URL(req.url || "", `http://${req.headers.host}`);
    const tenantId = url.searchParams.get("tenantId") || "tenant-default";

    if (!clients.has(tenantId)) {
      clients.set(tenantId, new Set());
    }
    clients.get(tenantId)?.add(ws);

    console.log(`Client connected to tenant: ${tenantId}`);

    ws.on("close", () => {
      clients.get(tenantId)?.delete(ws);
      if (clients.get(tenantId)?.size === 0) {
        clients.delete(tenantId);
      }
    });
  });

  const broadcastToTenant = (tenantId: string, data: any) => {
    const tenantClients = clients.get(tenantId);
    if (tenantClients) {
      const message = JSON.stringify(data);
      tenantClients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }
  };

  app.use(express.json());

  // --- Multi-Tenant Middleware ---
  app.use((req, res, next) => {
    const tenantId = req.headers["x-tenant-id"] as string || "tenant-default";
    (req as any).tenantId = tenantId;
    next();
  });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", tenant: (req as any).tenantId });
  });

  // MES Endpoints (Multi-Tenant)
  app.get("/api/mes/work-orders", async (req, res) => {
    const tenantId = (req as any).tenantId;
    if (supabase) {
      const { data, error } = await supabase.from("work_orders").select("*").eq("tenant_id", tenantId);
      if (error) return res.status(500).json({ error: error.message });
      return res.json(data);
    }
    res.json(getTenantData(tenantId).workOrders);
  });

  app.post("/api/mes/work-orders", async (req, res) => {
    const tenantId = (req as any).tenantId;
    const workOrder = { ...req.body, tenant_id: tenantId, id: `WO-${Date.now()}` };
    
    if (supabase) {
      const { data, error } = await supabase.from("work_orders").insert(workOrder).select();
      if (error) return res.status(500).json({ error: error.message });
      broadcastToTenant(tenantId, { type: "WORK_ORDER_CREATED", data: data[0] });
      return res.status(201).json(data[0]);
    }

    getTenantData(tenantId).workOrders.push(workOrder);
    broadcastToTenant(tenantId, { type: "WORK_ORDER_CREATED", data: workOrder });
    res.status(201).json(workOrder);
  });

  // Machine Status (Multi-Tenant)
  app.get("/api/hardware/status", (req, res) => {
    const tenantId = (req as any).tenantId;
    const data = getTenantData(tenantId);
    
    // Simulate some real-time changes
    const machines = data.machines.map(m => ({
      ...m,
      telemetry: {
        temperature: 40 + Math.random() * 20,
        voltage: 220 + Math.random() * 10
      }
    }));
    
    res.json(machines);
  });

  // Data Management Endpoints (Backup, Restore, Demo)
  app.get("/api/data/backup", (req, res) => {
    const tenantId = (req as any).tenantId;
    res.json(getTenantData(tenantId));
  });

  app.post("/api/data/restore", (req, res) => {
    const tenantId = (req as any).tenantId;
    const data = req.body;
    if (data && typeof data === 'object') {
      mockDb[tenantId] = {
        workOrders: data.workOrders || [],
        logs: data.logs || [],
        machines: data.machines || []
      };
      broadcastToTenant(tenantId, { type: "DATA_RESTORED" });
      res.json({ success: true });
    } else {
      res.status(400).json({ error: "Invalid data format" });
    }
  });

  app.post("/api/data/demo", (req, res) => {
    const tenantId = (req as any).tenantId;
    mockDb[tenantId] = {
      workOrders: [
        { id: "WO-EV-001", product: "EV Bike Model S", status: "In Progress", qty: 50, supervisor: "Robert Chen", startDate: "2026-04-01", endDate: "2026-04-10" },
        { id: "WO-EV-002", product: "EV Bike Model X", status: "Released", qty: 25, supervisor: "Sarah Miller", startDate: "2026-04-05", endDate: "2026-04-15" },
        { id: "WO-EV-003", product: "EV Bike Model S", status: "Completed", qty: 100, supervisor: "James Wilson", startDate: "2026-03-15", endDate: "2026-03-25" }
      ],
      logs: [
        { id: 1, message: "EV Bike production system initialized", timestamp: new Date().toISOString() }
      ],
      machines: [
        { id: "M-DEMO-1", name: "Frame Welding Station", status: "running" },
        { id: "M-DEMO-2", name: "Motor Assembly Line", status: "idle" },
        { id: "M-DEMO-3", name: "Battery Testing Unit", status: "error" },
        { id: "M-DEMO-4", name: "Final QA Dyno", status: "maintenance" }
      ]
    };
    broadcastToTenant(tenantId, { type: "DEMO_DATA_LOADED" });
    res.json({ success: true });
  });

  app.post("/api/data/clear", (req, res) => {
    const tenantId = (req as any).tenantId;
    mockDb[tenantId] = {
      workOrders: [],
      logs: [],
      machines: []
    };
    broadcastToTenant(tenantId, { type: "DATA_CLEARED" });
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`SaaS Server running on http://localhost:${PORT}`);
  });
}

startServer();
