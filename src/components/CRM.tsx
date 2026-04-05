import { useState, useEffect } from 'react';
import { Lead, Order, UserProfile } from '../types';
import { clsx } from 'clsx';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  Building2, 
  DollarSign,
  Briefcase,
  ChevronRight,
  TrendingUp,
  Clock,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

export default function CRM({ profile }: { profile: UserProfile | null }) {
  const [activeTab, setActiveTab] = useState<'leads' | 'orders'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [leadsRes, ordersRes] = await Promise.all([
        fetch('/api/crm/leads'),
        fetch('/api/crm/orders')
      ]);
      const [leadsData, ordersData] = await Promise.all([
        leadsRes.json(),
        ordersRes.json()
      ]);
      setLeads(leadsData);
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching CRM data:', error);
      toast.error('Failed to load CRM data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newLead = {
      company: formData.get('company'),
      contactName: formData.get('contact'),
      email: formData.get('email'),
      status: 'new',
      value: Number(formData.get('value')),
    };

    try {
      const response = await fetch('/api/crm/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead),
      });

      if (response.ok) {
        setIsModalOpen(false);
        toast.success('Lead added successfully');
        fetchData();
      } else {
        throw new Error('Failed to add lead');
      }
    } catch (error) {
      console.error('Error adding lead:', error);
      toast.error('Failed to add lead');
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">CRM Module</h1>
          <p className="text-zinc-500 mt-1">Manage leads, opportunities, and sales pipeline.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold py-2.5 px-5 rounded-xl transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.2)]"
        >
          <Plus size={20} />
          New {activeTab === 'leads' ? 'Lead' : 'Order'}
        </button>
      </header>

      <div className="flex items-center gap-2 p-1 bg-zinc-900 border border-zinc-800 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('leads')}
          className={clsx(
            "px-6 py-2 rounded-lg text-sm font-bold transition-all",
            activeTab === 'leads' ? "bg-zinc-800 text-zinc-100 shadow-sm" : "text-zinc-500 hover:text-zinc-300"
          )}
        >
          Leads
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={clsx(
            "px-6 py-2 rounded-lg text-sm font-bold transition-all",
            activeTab === 'orders' ? "bg-zinc-800 text-zinc-100 shadow-sm" : "text-zinc-500 hover:text-zinc-300"
          )}
        >
          Orders
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-zinc-800 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Search leads..." 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
              </div>
              <button className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-100 transition-all">
                <Filter size={18} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-950/50 text-zinc-500 text-[10px] uppercase tracking-widest font-mono">
                    <th className="px-6 py-4 font-medium">Company</th>
                    <th className="px-6 py-4 font-medium">Contact</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Value</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {activeTab === 'leads' ? (
                    leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-zinc-800/30 transition-all group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-orange-500 transition-colors">
                              <Building2 size={16} />
                            </div>
                            <span className="text-sm font-bold text-zinc-100">{lead.company}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-zinc-300">{lead.contactName}</div>
                          <div className="text-xs text-zinc-500">{lead.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={clsx(
                            "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                            lead.status === 'new' ? "bg-blue-500/10 text-blue-500" :
                            lead.status === 'contacted' ? "bg-orange-500/10 text-orange-500" :
                            lead.status === 'qualified' ? "bg-emerald-500/10 text-emerald-500" :
                            "bg-red-500/10 text-red-500"
                          )}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-mono text-zinc-100">
                          ${lead.value.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-1.5 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-all">
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="hover:bg-zinc-800/30 transition-all group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-blue-500 transition-colors">
                              <Package size={16} />
                            </div>
                            <span className="text-sm font-bold text-zinc-100">{order.product}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-zinc-300">ID: {order.id.slice(0, 8)}</div>
                          <div className="text-xs text-zinc-500">Qty: {order.quantity}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={clsx(
                            "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                            order.status === 'pending' ? "bg-zinc-500/10 text-zinc-500" :
                            order.status === 'processing' ? "bg-orange-500/10 text-orange-500" :
                            order.status === 'shipped' ? "bg-blue-500/10 text-blue-500" :
                            "bg-emerald-500/10 text-emerald-500"
                          )}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-mono text-zinc-100">
                          ${order.totalAmount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-1.5 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-all">
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-zinc-100 mb-6">Pipeline Value</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Total Pipeline</span>
                <span className="text-lg font-bold text-zinc-100">$2.4M</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full w-3/4" />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
                  <p className="text-[10px] text-zinc-500 uppercase font-mono mb-1">Conversion</p>
                  <p className="text-lg font-bold text-emerald-500">24%</p>
                </div>
                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
                  <p className="text-[10px] text-zinc-500 uppercase font-mono mb-1">Avg. Deal</p>
                  <p className="text-lg font-bold text-blue-500">$45k</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-zinc-100 mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                    <TrendingUp size={14} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-100">
                      <span className="font-bold">Lead Qualified:</span> TechCorp Inc.
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">Moved to Negotiation stage.</p>
                    <p className="text-[10px] text-zinc-600 mt-1 font-mono">2h ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl"
            >
              <h3 className="text-xl font-bold text-zinc-100 mb-6">Add New Lead</h3>
              <form onSubmit={handleAddLead} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-500 uppercase mb-1.5">Company Name</label>
                  <input name="company" required className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-500 uppercase mb-1.5">Contact Person</label>
                  <input name="contact" required className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-500 uppercase mb-1.5">Email Address</label>
                  <input name="email" type="email" required className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-500 uppercase mb-1.5">Estimated Value ($)</label>
                  <input name="value" type="number" required className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 font-bold hover:bg-zinc-800 transition-all">Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-2.5 rounded-xl bg-orange-500 text-zinc-950 font-bold hover:bg-orange-600 transition-all">Create Lead</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
