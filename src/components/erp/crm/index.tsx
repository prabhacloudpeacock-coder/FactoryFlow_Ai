import { useState } from 'react';
import PageTabMenu from '../../common/PageTabMenu';
import { motion } from 'framer-motion';
import { Briefcase, FileText, Users, ShoppingCart, TrendingUp, Clock, Plus } from 'lucide-react';
import { cn } from '../../../lib/utils';
import CRMModal from './components/CRMModal';

const tabs = [
  { id: 'orders', label: 'Sales Orders', icon: ShoppingCart },
  { id: 'quotes', label: 'Quotes', icon: FileText },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'pipeline', label: 'Sales Pipeline', icon: TrendingUp },
];

export default function CRM() {
  const [activeTab, setActiveTab] = useState('orders');
  const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; type: 'orders' | 'quotes' | 'customers' | 'pipeline' }>({
    isOpen: false,
    type: 'orders'
  });

  const openModal = (type: 'orders' | 'quotes' | 'customers' | 'pipeline') => {
    setModalConfig({ isOpen: true, type });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">Sales Order Management</h1>
          <p className="text-zinc-500 mt-1">Track every stage from quote to delivery.</p>
        </div>
        <div className="flex gap-3">
          {activeTab === 'orders' && (
            <button 
              onClick={() => openModal('orders')}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl transition-all text-sm font-bold shadow-lg shadow-orange-500/20 flex items-center gap-2"
            >
              <Plus size={18} /> New Sales Order
            </button>
          )}
          {activeTab === 'quotes' && (
            <button 
              onClick={() => openModal('quotes')}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl transition-all text-sm font-bold flex items-center gap-2 border border-zinc-700"
            >
              <Plus size={18} /> New Quote
            </button>
          )}
          {activeTab === 'customers' && (
            <button 
              onClick={() => openModal('customers')}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl transition-all text-sm font-bold shadow-lg shadow-orange-500/20 flex items-center gap-2"
            >
              <Plus size={18} /> New Customer
            </button>
          )}
          {activeTab === 'pipeline' && (
            <button 
              onClick={() => openModal('pipeline')}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl transition-all text-sm font-bold shadow-lg shadow-orange-500/20 flex items-center gap-2"
            >
              <Plus size={18} /> New Lead
            </button>
          )}
        </div>
      </div>

      <CRMModal 
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        type={modalConfig.type}
      />

      <PageTabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
      >
        {activeTab === 'orders' && <SalesOrdersList />}
        {activeTab === 'quotes' && <QuotesList />}
        {activeTab === 'customers' && <CustomersList />}
        {activeTab === 'pipeline' && <SalesPipeline />}
      </motion.div>
    </div>
  );
}

function SalesOrdersList() {
  const orders = [
    { id: 'SO-2026-001', customer: 'Global Motors Corp', date: '2026-03-28', amount: '$125,000', status: 'Production', progress: 65 },
    { id: 'SO-2026-002', customer: 'TechFlow Systems', date: '2026-03-29', amount: '$42,500', status: 'Pending Approval', progress: 10 },
    { id: 'SO-2026-003', customer: 'Apex Engineering', date: '2026-03-30', amount: '$89,000', status: 'Delivery', progress: 95 },
    { id: 'SO-2026-004', customer: 'Precision Parts Ltd', date: '2026-03-31', amount: '$15,200', status: 'Draft', progress: 0 },
  ];

  return (
    <div className="p-6">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
            <th className="p-4">Order ID</th>
            <th className="p-4">Customer</th>
            <th className="p-4">Date</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Status</th>
            <th className="p-4">Progress</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors group">
              <td className="p-4 font-mono text-orange-500 text-sm">{order.id}</td>
              <td className="p-4 text-sm font-medium">{order.customer}</td>
              <td className="p-4 text-sm text-zinc-400">{order.date}</td>
              <td className="p-4 text-sm font-mono">{order.amount}</td>
              <td className="p-4">
                <span className={cn(
                  "px-2 py-1 rounded-full text-[10px] font-bold uppercase border",
                  order.status === 'Production' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                  order.status === 'Delivery' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                  order.status === 'Pending Approval' ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                  "bg-zinc-800 text-zinc-500 border-zinc-700"
                )}>
                  {order.status}
                </span>
              </td>
              <td className="p-4 w-48">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-500 transition-all duration-500" 
                      style={{ width: `${order.progress}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">{order.progress}%</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function QuotesList() {
  const quotes = [
    { id: 'QT-2026-001', customer: 'Global Motors Corp', date: '2026-03-25', value: '$150,000', expiry: '2026-04-25', status: 'Sent' },
    { id: 'QT-2026-002', customer: 'TechFlow Systems', date: '2026-03-26', value: '$45,000', expiry: '2026-04-26', status: 'Draft' },
    { id: 'QT-2026-003', customer: 'Apex Engineering', date: '2026-03-27', value: '$95,000', expiry: '2026-04-27', status: 'Accepted' },
    { id: 'QT-2026-004', customer: 'Precision Parts Ltd', date: '2026-03-28', value: '$18,000', expiry: '2026-04-28', status: 'Expired' },
  ];

  return (
    <div className="p-6">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
            <th className="p-4">Quote ID</th>
            <th className="p-4">Customer</th>
            <th className="p-4">Date</th>
            <th className="p-4">Value</th>
            <th className="p-4">Expiry</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => (
            <tr key={quote.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors group">
              <td className="p-4 font-mono text-orange-500 text-sm">{quote.id}</td>
              <td className="p-4 text-sm font-medium">{quote.customer}</td>
              <td className="p-4 text-sm text-zinc-400">{quote.date}</td>
              <td className="p-4 text-sm font-mono">{quote.value}</td>
              <td className="p-4 text-sm text-zinc-500">{quote.expiry}</td>
              <td className="p-4">
                <span className={cn(
                  "px-2 py-1 rounded-full text-[10px] font-bold uppercase border",
                  quote.status === 'Accepted' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                  quote.status === 'Sent' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                  quote.status === 'Expired' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                  "bg-zinc-800 text-zinc-500 border-zinc-700"
                )}>
                  {quote.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CustomersList() {
  const customers = [
    { id: 'CUST-001', name: 'Global Motors Corp', contact: 'John Miller', email: 'john@globalmotors.com', industry: 'Automotive', orders: 12 },
    { id: 'CUST-002', name: 'TechFlow Systems', contact: 'Sarah Chen', email: 'sarah@techflow.io', industry: 'Electronics', orders: 5 },
    { id: 'CUST-003', name: 'Apex Engineering', contact: 'David Wilson', email: 'david@apexeng.com', industry: 'Aerospace', orders: 8 },
    { id: 'CUST-004', name: 'Precision Parts Ltd', contact: 'Emma Thompson', email: 'emma@precision.co.uk', industry: 'Manufacturing', orders: 3 },
  ];

  return (
    <div className="p-6">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
            <th className="p-4">Customer ID</th>
            <th className="p-4">Company Name</th>
            <th className="p-4">Contact</th>
            <th className="p-4">Industry</th>
            <th className="p-4">Total Orders</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors group">
              <td className="p-4 font-mono text-orange-500 text-sm">{customer.id}</td>
              <td className="p-4">
                <div className="text-sm font-medium">{customer.name}</div>
                <div className="text-[10px] text-zinc-500">{customer.email}</div>
              </td>
              <td className="p-4 text-sm text-zinc-400">{customer.contact}</td>
              <td className="p-4 text-sm text-zinc-500">{customer.industry}</td>
              <td className="p-4 text-sm font-mono">{customer.orders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SalesPipeline() {
  const stages = [
    { name: 'Discovery', leads: [
      { id: 'L-001', name: 'Q3 Expansion', company: 'Future Tech', value: '$100,000', prob: '20%' },
    ]},
    { name: 'Proposal', leads: [
      { id: 'L-002', name: 'New Line Setup', company: 'Apex Eng', value: '$250,000', prob: '50%' },
      { id: 'L-003', name: 'Maintenance Contract', company: 'Global Motors', value: '$45,000', prob: '60%' },
    ]},
    { name: 'Negotiation', leads: [
      { id: 'L-004', name: 'Supply Chain Optimization', company: 'TechFlow', value: '$120,000', prob: '80%' },
    ]},
    { name: 'Closed Won', leads: [
      { id: 'L-005', name: 'Prototype Development', company: 'Precision Parts', value: '$15,000', prob: '100%' },
    ]},
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      {stages.map((stage) => (
        <div key={stage.name} className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{stage.name}</h3>
            <span className="text-[10px] font-mono text-zinc-600">{stage.leads.length}</span>
          </div>
          <div className="space-y-3">
            {stage.leads.map((lead) => (
              <div key={lead.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-orange-500/50 transition-all cursor-pointer group">
                <div className="text-xs font-bold text-zinc-200 group-hover:text-orange-500 transition-colors">{lead.name}</div>
                <div className="text-[10px] text-zinc-500 mt-1">{lead.company}</div>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm font-mono text-zinc-300">{lead.value}</div>
                  <div className="text-[10px] font-mono text-zinc-600">{lead.prob}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
