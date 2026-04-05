export type UserRole = 'super-admin' | 'admin' | 'operator' | 'engineer';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  role: UserRole;
  createdAt: string;
}

export interface Lead {
  id: string;
  company: string;
  contactName: string;
  email: string;
  status: 'new' | 'contacted' | 'qualified' | 'lost';
  value: number;
  createdAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  product: string;
  quantity: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  totalAmount: number;
  createdAt: string;
}

export interface WorkOrder {
  id: string;
  orderId: string;
  machineId: string;
  operatorId: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'paused';
  priority: 'low' | 'medium' | 'high';
  startTime?: string;
  endTime?: string;
}

export interface Machine {
  id: string;
  name: string;
  type: string;
  status: 'running' | 'idle' | 'error' | 'maintenance';
  telemetry: {
    temperature: number;
    pressure: number;
    speed: number;
    voltage: number;
  };
  lastUpdate: string;
}

export interface TestLog {
  id: string;
  machineId: string;
  testType: string;
  result: 'pass' | 'fail';
  metrics: Record<string, number>;
  timestamp: string;
  operatorId: string;
}
