import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Search, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  AlertTriangle, 
  History, 
  MapPin, 
  Layers, 
  RefreshCw 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function InventoryManagement() {
  const [inventory, setInventory] = useState([
    { id: 'i1', name: 'Battery Pack 48V', sku: 'BATT-48V', quantity: 45, min_stock: 10, location: 'Shelf A1', category: 'Electrical' },
    { id: 'i2', name: 'Traction Motor 2kW', sku: 'MOT-2KW', quantity: 12, min_stock: 5, location: 'Shelf B2', category: 'Mechanical' },
    { id: 'i3', name: 'Aluminum Frame', sku: 'FRM-ALU', quantity: 8, min_stock: 15, location: 'Zone C', category: 'Structural' },
    { id: 'i4', name: 'All-Terrain Tires', sku: 'TIRE-AT', quantity: 120, min_stock: 40, location: 'Shelf D4', category: 'Mechanical' }
  ]);

  return (
    <div className="p-6 space-y-6 bg-zinc-950 min-h-screen text-zinc-100">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-zinc-500 mt-1">Track raw materials, components, and stock levels</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 border border-zinc-800 transition-all">
            <ArrowDownLeft size={18} />
            Stock In
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-all">
            <Plus size={18} />
            Add Item
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Stats */}
        <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <p className="text-sm font-medium text-zinc-500">Total Items</p>
            <p className="text-2xl font-bold mt-2">1,248</p>
          </div>
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <p className="text-sm font-medium text-zinc-500">Low Stock Alerts</p>
            <p className="text-2xl font-bold mt-2 text-orange-500">3 Items</p>
          </div>
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <p className="text-sm font-medium text-zinc-500">Stock Value</p>
            <p className="text-2xl font-bold mt-2">$142,500</p>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="text" 
                placeholder="Search inventory..." 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
              />
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-zinc-950 border-b border-zinc-800">
                <tr>
                  <th className="p-4 text-xs font-bold text-zinc-500 uppercase">Item / SKU</th>
                  <th className="p-4 text-xs font-bold text-zinc-500 uppercase">Category</th>
                  <th className="p-4 text-xs font-bold text-zinc-500 uppercase">Quantity</th>
                  <th className="p-4 text-xs font-bold text-zinc-500 uppercase">Location</th>
                  <th className="p-4 text-xs font-bold text-zinc-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                    <td className="p-4">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase">{item.sku}</p>
                    </td>
                    <td className="p-4 text-sm text-zinc-400">{item.category}</td>
                    <td className="p-4 font-bold text-sm">{item.quantity}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <MapPin size={12} />
                        {item.location}
                      </div>
                    </td>
                    <td className="p-4">
                      {item.quantity <= item.min_stock ? (
                        <span className="flex items-center gap-1.5 text-orange-500 text-[10px] font-bold uppercase">
                          <AlertTriangle size={12} />
                          Low Stock
                        </span>
                      ) : (
                        <span className="text-emerald-500 text-[10px] font-bold uppercase">In Stock</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <History size={20} className="text-blue-500" />
            Recent Activity
          </h2>
          <div className="space-y-3">
            {[
              { type: 'in', item: 'Battery Pack', qty: '+10', time: '2h ago' },
              { type: 'out', item: 'Aluminum Frame', qty: '-2', time: '4h ago' },
              { type: 'in', item: 'Tires', qty: '+50', time: '1d ago' }
            ].map((activity, i) => (
              <div key={i} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${activity.type === 'in' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                    {activity.type === 'in' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.item}</p>
                    <p className="text-[10px] text-zinc-500">{activity.time}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold ${activity.type === 'in' ? 'text-emerald-500' : 'text-red-500'}`}>
                  {activity.qty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
