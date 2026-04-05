import { UserRole } from '../types';

const DEFAULT_PERMISSIONS: Record<string, string[]> = {
  'super-admin': ['dashboard', 'mes', 'crm', 'shopfloor', 'plc', 'quality', 'engineering', 'bom', 'inventory', 'finance', 'bi', 'hr', 'maintenance', 'oee', 'workforce', 'alerts', 'reports', 'integration', 'master', 'settings', 'ai', 'docs', 'barcode'],
  'admin': ['dashboard', 'mes', 'crm', 'quality', 'engineering', 'bom', 'inventory', 'finance', 'hr', 'maintenance', 'oee', 'workforce', 'alerts', 'reports', 'integration', 'ai', 'docs', 'barcode'],
  'operator': ['dashboard', 'mes', 'shopfloor', 'quality', 'alerts', 'docs', 'barcode'],
  'engineer': ['dashboard', 'mes', 'quality', 'engineering', 'bom', 'maintenance', 'oee', 'alerts', 'docs', 'ai'],
};

export const getPermissions = (): Record<string, string[]> => {
  const stored = localStorage.getItem('role-permissions');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return DEFAULT_PERMISSIONS;
    }
  }
  return DEFAULT_PERMISSIONS;
};

export const savePermissions = (permissions: Record<string, string[]>) => {
  localStorage.setItem('role-permissions', JSON.stringify(permissions));
};

export const hasPermission = (role: UserRole, pageId: string): boolean => {
  if (role === 'super-admin') return true;
  const perms = getPermissions();
  return perms[role]?.includes(pageId) || false;
};
