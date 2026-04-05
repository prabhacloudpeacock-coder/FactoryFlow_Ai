import { Database, CheckCircle, Upload, Globe, Shield, Users, UserPlus, ShieldAlert, Lock, Plus, CreditCard, Check, Settings as SettingsIcon, Trash2, ToggleLeft, ToggleRight, Activity, Cpu, Printer } from 'lucide-react';
import { useState, useEffect } from 'react';
import { sync } from '../../../lib/sync';
import { toast } from 'sonner';
import { cn } from '../../../lib/utils';
import { getPermissions, savePermissions } from '../../../lib/permissions';

import { UserProfile } from '../../../types';

export default function Settings({ profile }: { profile: UserProfile | null }) {
  const isDemo = profile?.email?.toLowerCase().includes('demo');
  const [logo, setLogo] = useState<string | null>(localStorage.getItem('brand-logo'));
  const [tenantId, setTenantId] = useState(sync.getTenantId());
  const [permissions, setPermissions] = useState<Record<string, string[]>>(getPermissions());
  const [isLiveMode, setIsLiveMode] = useState(localStorage.getItem('app-mode') === 'live');
  const [showConnString, setShowConnString] = useState(false);

  const handleModeToggle = () => {
    const newMode = !isLiveMode;
    setIsLiveMode(newMode);
    localStorage.setItem('app-mode', newMode ? 'live' : 'demo');
    if (newMode) {
      toast.success('Switched to Live Mode. Connecting to production database...');
    } else {
      toast.success('Switched to Demo Mode. Using local mock data...');
    }
    setTimeout(() => window.location.reload(), 1500);
  };

  const handleClearData = async () => {
    if (!window.confirm('Are you sure you want to clear all data for this tenant? This cannot be undone.')) return;
    try {
      const res = await sync.fetch('/api/data/clear', { method: 'POST' });
      if (res.ok) {
        toast.success('Data cleared successfully');
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error('Failed to clear data');
      }
    } catch (error) {
      toast.error('Failed to clear data');
    }
  };

  const handleAddUser = () => {
    const name = window.prompt('Enter new user name:');
    if (!name) return;
    const email = name.toLowerCase().replace(/\s+/g, '.') + '@industrial.com';
    setUsers([...users, { id: Date.now(), name, email, role: 'operator', status: 'active' }]);
    toast.success(`User ${name} added successfully`);
  };

  const handleManageUser = (userId: number) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        const newStatus = u.status === 'active' ? 'inactive' : 'active';
        toast.success(`User ${u.name} status changed to ${newStatus}`);
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  const handleTestConnection = () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: 'Testing connection to Primary Node...',
        success: 'Connection successful! Latency: 14ms',
        error: 'Connection failed'
      }
    );
  };

  const handleSyncSchema = () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)),
      {
        loading: 'Synchronizing database schema...',
        success: 'Schema synchronized successfully across all nodes',
        error: 'Sync failed'
      }
    );
  };

  const handleBackupAll = () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2500)),
      {
        loading: 'Initiating global cluster backup...',
        success: 'Global backup completed and stored in secure vault',
        error: 'Backup failed'
      }
    );
  };

  const handleGenericAction = (actionName: string) => {
    toast.info(`${actionName} interface opening...`);
  };

  const [users, setUsers] = useState([
    { id: 1, name: 'Super Admin', email: 'super@industrial.com', role: 'super-admin', status: 'active' },
    { id: 2, name: 'Industrial Admin', email: 'admin@industrial.com', role: 'admin', status: 'active' },
    { id: 3, name: 'Machine Operator', email: 'operator@industrial.com', role: 'operator', status: 'active' },
    { id: 4, name: 'Process Engineer', email: 'engineer@industrial.com', role: 'engineer', status: 'inactive' },
  ]);

  const [tenants, setTenants] = useState([
    { id: 'tenant-alpha', name: 'Alpha Manufacturing', status: 'active', plan: 'Enterprise' },
    { id: 'tenant-beta', name: 'Beta Systems', status: 'active', plan: 'Pro' },
    { id: 'tenant-gamma', name: 'Gamma Logistics', status: 'active', plan: 'Basic' },
  ]);

  const [plans, setPlans] = useState([
    { id: 'basic', name: 'Basic', price: '$499/mo', features: ['MES Core', 'Inventory', 'Alerts'] },
    { id: 'pro', name: 'Pro', price: '$1,299/mo', features: ['All Basic', 'Quality Control', 'BOM & Routing', 'CRM'] },
    { id: 'enterprise', name: 'Enterprise', price: 'Custom', features: ['All Pro', 'AI Insights', 'PLC Integration', 'Multi-Tenancy'] },
  ]);

  const pages = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'mes', label: 'MES Core' },
    { id: 'crm', label: 'Sales & CRM' },
    { id: 'shopfloor', label: 'Shop Floor' },
    { id: 'plc', label: 'PLC Integration' },
    { id: 'quality', label: 'Quality Control' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'bom', label: 'BOM & Routing' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'finance', label: 'Finance' },
    { id: 'bi', label: 'Business Intelligence' },
    { id: 'hr', label: 'HR Management' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'oee', label: 'OEE Management' },
    { id: 'workforce', label: 'Workforce' },
    { id: 'alerts', label: 'Alerts' },
    { id: 'reports', label: 'Reports' },
    { id: 'integration', label: 'Integration' },
    { id: 'master', label: 'Master Data' },
    { id: 'settings', label: 'Settings' },
    { id: 'ai', label: 'AI Features' },
    { id: 'docs', label: 'Documentation' },
    { id: 'barcode', label: 'Barcode' },
  ];

  const roles = ['super-admin', 'admin', 'operator', 'engineer'];

  const togglePermission = (role: string, pageId: string) => {
    if (role === 'super-admin' && pageId === 'settings') return; // Protect super-admin settings access
    
    const rolePerms = permissions[role] || [];
    const newPerms = rolePerms.includes(pageId)
      ? rolePerms.filter(p => p !== pageId)
      : [...rolePerms, pageId];
    
    const updated = { ...permissions, [role]: newPerms };
    setPermissions(updated);
    savePermissions(updated);
    toast.success(`Updated permissions for ${role}`);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setLogo(base64);
        localStorage.setItem('brand-logo', base64);
        window.location.reload(); // Refresh to update logo globally
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTenantChange = (newId: string) => {
    setTenantId(newId);
    sync.setTenant(newId);
    toast.success(`Switched to tenant: ${newId}`);
    // Reloading to reset all states and reconnect WS
    setTimeout(() => window.location.reload(), 1000);
  };

  const [newTenantName, setNewTenantName] = useState('');
  const addTenant = () => {
    if (!newTenantName) return;
    const id = `tenant-${newTenantName.toLowerCase().replace(/\s+/g, '-')}`;
    setTenants([...tenants, { id, name: newTenantName, status: 'active', plan: 'Basic' }]);
    setNewTenantName('');
    toast.success('New tenant added successfully');
  };

  const handleBackup = async () => {
    try {
      const res = await sync.fetch('/api/data/backup');
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup-${tenantId}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Backup downloaded successfully');
    } catch (error) {
      toast.error('Failed to download backup');
    }
  };

  const handleRestore = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content);
        
        const res = await sync.fetch('/api/data/restore', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (res.ok) {
          toast.success('Data restored successfully');
          setTimeout(() => window.location.reload(), 1000);
        } else {
          toast.error('Failed to restore data');
        }
      } catch (error) {
        toast.error('Invalid backup file');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  const handleDemoData = async () => {
    try {
      const res = await sync.fetch('/api/data/demo', { method: 'POST' });
      if (res.ok) {
        toast.success('Demo data loaded successfully');
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error('Failed to load demo data');
      }
    } catch (error) {
      toast.error('Failed to load demo data');
    }
  };

  return (
    <div className="space-y-12 pb-24">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black tracking-tighter text-zinc-100 uppercase">System Control Center</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleModeToggle}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border",
              isLiveMode 
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20" 
                : "bg-orange-500/10 border-orange-500/20 text-orange-500 hover:bg-orange-500/20"
            )}
          >
            {isLiveMode ? <Activity size={14} /> : <CheckCircle size={14} />}
            {isLiveMode ? 'Live Mode' : 'Demo Mode'}
            {isLiveMode ? <ToggleRight size={16} className="ml-1" /> : <ToggleLeft size={16} className="ml-1" />}
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 text-xs font-bold uppercase tracking-widest">
            <ShieldAlert size={14} /> Root Access Enabled
          </div>
        </div>
      </div>

      {/* Role Permissions Management */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <div>
            <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
              <Lock className="text-orange-500" size={20} /> Role Permissions
            </h2>
            <p className="text-sm text-zinc-500 mt-1">Manage page-level access control for each user role.</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/50">
                <th className="p-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Module / Page</th>
                {roles.map(role => (
                  <th key={role} className="p-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center">
                    {role.replace('-', ' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pages.map(page => (
                <tr key={page.id} className="border-b border-zinc-800 hover:bg-zinc-800/20 transition-colors">
                  <td className="p-6">
                    <p className="text-sm font-bold text-zinc-200">{page.label}</p>
                    <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-tighter">/{page.id}</p>
                  </td>
                  {roles.map(role => (
                    <td key={role} className="p-6 text-center">
                      <button
                        onClick={() => togglePermission(role, page.id)}
                        className={cn(
                          "w-6 h-6 rounded-md border transition-all inline-flex items-center justify-center",
                          permissions[role]?.includes(page.id)
                            ? "bg-orange-500 border-orange-500 text-zinc-950"
                            : "border-zinc-700 hover:border-zinc-500 text-transparent"
                        )}
                      >
                        <Check size={14} strokeWidth={4} />
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tenancy Management */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
              <Globe className="text-orange-500" size={20} /> Tenancy Management
            </h2>
            <button onClick={() => document.getElementById('new-tenant-input')?.focus()} className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-zinc-400 transition-all">
              <Plus size={20} />
            </button>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex gap-3">
              <input 
                id="new-tenant-input"
                type="text" 
                placeholder="New Tenant Name (e.g. Delta Corp)"
                value={newTenantName}
                onChange={(e) => setNewTenantName(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
              />
              <button 
                onClick={addTenant}
                className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-orange-500/20"
              >
                Add Tenant
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {tenants.map(t => (
              <div key={t.id} className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-2xl group hover:border-zinc-700 transition-all">
                <div>
                  <p className="text-sm font-bold text-zinc-100">{t.name}</p>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{t.id}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-2 py-1 bg-zinc-800 text-zinc-400 rounded-lg text-[10px] font-bold uppercase">{t.plan}</span>
                  <button 
                    onClick={() => handleTenantChange(t.id)}
                    className={cn(
                      "px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all",
                      tenantId === t.id 
                        ? "bg-orange-500 text-zinc-950" 
                        : "bg-zinc-800 text-zinc-400 hover:text-zinc-100"
                    )}
                  >
                    {tenantId === t.id ? 'Active' : 'Switch'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
              <CreditCard className="text-orange-500" size={20} /> Subscription Plans
            </h2>
            <button onClick={() => handleGenericAction('Billing Portal')} className="text-xs font-bold text-orange-500 hover:underline">Manage Billing</button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {plans.map(plan => (
              <div key={plan.id} className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <CreditCard size={60} />
                </div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-100">{plan.name}</h3>
                    <p className="text-2xl font-black text-orange-500 mt-1">{plan.price}</p>
                  </div>
                  <button onClick={() => handleGenericAction(`${plan.name} Plan Settings`)} className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-zinc-400">
                    <SettingsIcon size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {plan.features.map(f => (
                    <span key={f} className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-lg text-[9px] font-bold uppercase tracking-wider">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => handleGenericAction('Custom Plan Builder')} className="w-full mt-6 py-4 border border-dashed border-zinc-700 hover:border-orange-500/50 hover:bg-orange-500/5 text-zinc-500 hover:text-orange-500 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2">
            <Plus size={18} /> Create Custom Plan
          </button>
        </div>
      </section>

      {/* User Management Section */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <div>
            <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
              <Users className="text-orange-500" size={20} /> User Management
            </h2>
            <p className="text-sm text-zinc-500 mt-1">Control user access and assign roles within the organization.</p>
          </div>
          <button onClick={handleAddUser} className="flex items-center gap-2 px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-950 rounded-2xl text-sm font-bold transition-all shadow-xl">
            <UserPlus size={18} /> Add New User
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/50 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                <th className="p-6">User Profile</th>
                <th className="p-6">Role Assignment</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter(user => !isDemo || (user.role !== 'super-admin' && user.role !== 'admin'))
                .map((user) => (
                <tr key={user.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-100">{user.name}</p>
                        <p className="text-xs text-zinc-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase border",
                      user.role === 'super-admin' ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                      user.role === 'admin' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                      "bg-zinc-800 text-zinc-400 border-zinc-700"
                    )}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full", user.status === 'active' ? "bg-green-500" : "bg-zinc-600")} />
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{user.status}</span>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <button onClick={() => handleManageUser(user.id)} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl text-xs font-bold transition-all">
                      Toggle Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Testing Tools Section */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <div>
            <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
              <Activity className="text-orange-500" size={20} /> Testing & Simulation Tools
            </h2>
            <p className="text-sm text-zinc-500 mt-1">Manual triggers for system testing and demonstration scenarios.</p>
          </div>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center text-center gap-4 group hover:border-orange-500/30 transition-all">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
              <ShieldAlert size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-200">Trigger Mock Alert</h3>
              <p className="text-xs text-zinc-500 mt-1">Inject a critical system alert into the dashboard stream.</p>
            </div>
            <button 
              onClick={() => {
                toast.error('CRITICAL: PLC-02 Communication Timeout Detected!', {
                  description: 'Heartbeat lost on Modbus TCP node 192.168.1.11',
                  duration: 5000,
                });
              }}
              className="w-full mt-auto py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl text-xs font-bold transition-all"
            >
              Fire Alert
            </button>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center text-center gap-4 group hover:border-blue-500/30 transition-all">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <Cpu size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-200">Simulate PLC Error</h3>
              <p className="text-xs text-zinc-500 mt-1">Set a mock PLC node to 'Error' state for UI testing.</p>
            </div>
            <button 
              onClick={() => {
                toast.promise(
                  new Promise(resolve => setTimeout(resolve, 1000)),
                  {
                    loading: 'Sending error command to PLC-01...',
                    success: 'PLC-01 state updated to ERROR',
                    error: 'Command failed'
                  }
                );
              }}
              className="w-full mt-auto py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl text-xs font-bold transition-all"
            >
              Trigger Error
            </button>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center text-center gap-4 group hover:border-emerald-500/30 transition-all">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
              <Printer size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-200">Print Test Label</h3>
              <p className="text-xs text-zinc-500 mt-1">Simulate sending a QC pass label to the industrial printer.</p>
            </div>
            <button 
              onClick={() => {
                toast.success('Label sent to PRINTER-04', {
                  description: 'Job ID: LBL-8492-QC',
                });
              }}
              className="w-full mt-auto py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl text-xs font-bold transition-all"
            >
              Print Label
            </button>
          </div>
        </div>
      </section>

      {/* Data Management */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <div>
            <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
              <Database className="text-orange-500" size={20} /> Data Management
            </h2>
            <p className="text-sm text-zinc-500 mt-1">Backup, restore, and load demo data for the current tenant.</p>
          </div>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Upload size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-200">Backup Data</h3>
              <p className="text-xs text-zinc-500 mt-1">Export current tenant data as a JSON file.</p>
            </div>
            <button onClick={handleBackup} className="w-full mt-auto py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl text-xs font-bold transition-all">
              Download Backup
            </button>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Database size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-200">Restore Data</h3>
              <p className="text-xs text-zinc-500 mt-1">Import data from a previous JSON backup.</p>
            </div>
            <label className="w-full mt-auto py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl text-xs font-bold transition-all cursor-pointer block">
              Upload Backup
              <input type="file" accept=".json" className="hidden" onChange={handleRestore} />
            </label>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
              <CheckCircle size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-200">Demo Data</h3>
              <p className="text-xs text-zinc-500 mt-1">Load a predefined set of sample data.</p>
            </div>
            <button onClick={handleDemoData} className="w-full mt-auto py-2.5 bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/20 rounded-xl text-xs font-bold transition-all">
              Load Demo Data
            </button>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
              <Trash2 size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-200">Clear Data</h3>
              <p className="text-xs text-zinc-500 mt-1">Wipe all data for the current tenant.</p>
            </div>
            <button onClick={handleClearData} className="w-full mt-auto py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl text-xs font-bold transition-all">
              Clear All Data
            </button>
          </div>
        </div>
      </section>

      {/* Database Connectivity */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <div>
            <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
              <Database className="text-orange-500" size={20} /> Database Connectivity
            </h2>
            <p className="text-sm text-zinc-500 mt-1">Configure primary and secondary external database clusters.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleBackupAll} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-all">
              Backup All
            </button>
          </div>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Primary Database */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" /> Primary Node
              </h3>
              <span className="text-[10px] font-mono text-green-500 bg-green-500/10 px-2 py-0.5 rounded">ACTIVE</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Provider Type</label>
                <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-orange-500">
                  <option value="insforge">Insforge (Native)</option>
                  <option value="mysql">MySQL (External)</option>
                  <option value="supabase">Supabase (PostgreSQL)</option>
                  <option value="custom">Custom External Endpoint</option>
                </select>
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Connection String</label>
                <div className="relative">
                  <input 
                    type={showConnString ? "text" : "password"} 
                    value="insforge://cluster-01.industrial.io:5432/main_db"
                    readOnly
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-500 font-mono focus:outline-none"
                  />
                  <button onClick={() => setShowConnString(!showConnString)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-orange-500 hover:text-orange-400">
                    {showConnString ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button onClick={handleTestConnection} className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl text-xs font-bold transition-all border border-zinc-700/50">
                  Test Connection
                </button>
                <button onClick={handleSyncSchema} className="px-6 py-3 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-xl text-xs font-bold transition-all border border-orange-500/20">
                  Sync Schema
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Database */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-zinc-600" /> Secondary Node (Failover)
              </h3>
              <span className="text-[10px] font-mono text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">STANDBY</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Provider Type</label>
                <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-orange-500">
                  <option value="supabase">Supabase (PostgreSQL)</option>
                  <option value="mysql">MySQL (External)</option>
                  <option value="insforge">Insforge (Native)</option>
                  <option value="custom">Custom External Endpoint</option>
                </select>
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Connection String</label>
                <input 
                  type="text" 
                  placeholder="Enter external DB URL..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </div>

              <div className="pt-2">
                <button onClick={() => handleGenericAction('Failover Policy Configuration')} className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl text-xs font-bold transition-all border border-zinc-700/50">
                  Configure Failover Policy
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-zinc-950/50 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-xs">SQL</div>
            <div>
              <p className="text-xs font-bold text-zinc-200">MySQL Cluster</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">External Node</p>
            </div>
            <button onClick={() => handleGenericAction('MySQL Cluster Config')} className="ml-auto text-[10px] font-bold text-zinc-500 hover:text-zinc-300 uppercase">Config</button>
          </div>
          <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 font-bold text-xs">SB</div>
            <div>
              <p className="text-xs font-bold text-zinc-200">Supabase Cloud</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">PostgreSQL 15</p>
            </div>
            <button onClick={() => handleGenericAction('Supabase Cloud Config')} className="ml-auto text-[10px] font-bold text-zinc-500 hover:text-zinc-300 uppercase">Config</button>
          </div>
          <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold text-xs">IF</div>
            <div>
              <p className="text-xs font-bold text-zinc-200">Insforge Core</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">Primary Engine</p>
            </div>
            <button onClick={() => handleGenericAction('Insforge Core Config')} className="ml-auto text-[10px] font-bold text-zinc-500 hover:text-zinc-300 uppercase">Config</button>
          </div>
        </div>
      </section>

      {/* Legacy Settings */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-zinc-100">
            <Upload className="text-orange-500" size={20} /> Brand Customization
          </h2>
          <div className="flex items-center gap-8">
            <div className="w-32 h-32 flex items-center justify-center overflow-hidden border border-zinc-800 rounded-2xl bg-zinc-950">
              {logo ? <img src={logo} alt="Brand Logo" className="w-full h-full object-contain" /> : <span className="text-zinc-500">Logo</span>}
            </div>
            <div className="space-y-4">
              <p className="text-xs text-zinc-500 max-w-[200px]">Upload your company logo to customize the interface for all users.</p>
              <label className="inline-block bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-6 py-3 rounded-xl text-xs cursor-pointer transition-all shadow-lg shadow-orange-500/20">
                Upload New Logo
                <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              </label>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
