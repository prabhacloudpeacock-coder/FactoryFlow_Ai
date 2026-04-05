import React, { useState } from 'react';
import { Scan, Package, CheckCircle2, XCircle, RefreshCw, Smartphone, History, ArrowRight, ShieldCheck, Database, Search } from 'lucide-react';
import QRScanner from '../../../common/QRScanner';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { clsx } from 'clsx';

interface ScannedItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  location: string;
  lastUpdated: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const MOCK_INVENTORY: Record<string, ScannedItem> = {
  'EV-BAT-48V': {
    id: 'EV-BAT-48V',
    name: 'Lithium-Ion Battery Pack 48V',
    category: 'Energy Storage',
    stock: 42,
    location: 'Aisle 4, Shelf B',
    lastUpdated: '2026-04-05 10:30',
    status: 'In Stock'
  },
  'EV-MOT-3KW': {
    id: 'EV-MOT-3KW',
    name: 'Brushless DC Motor 3kW',
    category: 'Powertrain',
    stock: 12,
    location: 'Aisle 2, Shelf C',
    lastUpdated: '2026-04-05 09:15',
    status: 'Low Stock'
  },
  'EV-CH-ALUM': {
    id: 'EV-CH-ALUM',
    name: 'Aluminum Alloy Chassis Frame',
    category: 'Chassis',
    stock: 8,
    location: 'Aisle 1, Shelf A',
    lastUpdated: '2026-04-05 11:45',
    status: 'Low Stock'
  }
};

export default function InventoryScan() {
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [scannedItem, setScannedItem] = useState<ScannedItem | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [scanHistory, setScanHistory] = useState<ScannedItem[]>([]);

  const handleScanSuccess = (decodedText: string) => {
    setScannedResult(decodedText);
    setIsScanning(false);
    
    // Look up item in mock database
    const item = MOCK_INVENTORY[decodedText];
    if (item) {
      setScannedItem(item);
      setScanHistory(prev => [item, ...prev].slice(0, 5));
      toast.success(`Item found: ${item.name}`);
    } else {
      setScannedItem(null);
      toast.error(`Unknown barcode: ${decodedText}`);
    }
  };

  const resetScanner = () => {
    setScannedResult(null);
    setScannedItem(null);
    setIsScanning(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Scan className="text-orange-500" size={20} /> Inventory Scanner
          </h2>
          <p className="text-sm text-zinc-500">Scan QR codes or barcodes to quickly identify items and check stock levels.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-xl flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Scanner Status</span>
              <span className={clsx(
                "text-xs font-bold flex items-center gap-1",
                isScanning ? "text-green-500" : "text-zinc-500"
              )}>
                {isScanning ? <RefreshCw size={12} className="animate-spin" /> : <CheckCircle2 size={12} />}
                {isScanning ? 'ACTIVE' : 'IDLE'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scanner Panel */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {isScanning ? (
              <motion.div 
                key="scanner"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
                  <motion.div 
                    className="h-full bg-orange-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                
                <QRScanner onScanSuccess={handleScanSuccess} />
                
                <div className="mt-8 text-center max-w-xs">
                  <p className="text-sm text-zinc-400">Position the barcode or QR code within the frame to scan.</p>
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-500">
                        <Smartphone size={16} />
                      </div>
                      <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-tighter">Mobile Ready</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-500">
                        <ShieldCheck size={16} />
                      </div>
                      <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-tighter">Secure Link</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 min-h-[400px] flex flex-col items-center justify-center gap-6"
              >
                {scannedItem ? (
                  <>
                    <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500">
                      <CheckCircle2 size={48} />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-2xl font-bold text-zinc-100">{scannedItem.name}</h3>
                      <p className="text-sm text-orange-500 font-medium uppercase tracking-widest">{scannedItem.category}</p>
                      <div className="flex items-center justify-center gap-2 mt-4">
                        <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-mono text-zinc-400">ID: {scannedItem.id}</span>
                        <span className={clsx(
                          "px-3 py-1 rounded-full text-xs font-bold uppercase border",
                          scannedItem.status === 'In Stock' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        )}>
                          {scannedItem.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-4">
                      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 text-center">
                        <span className="block text-2xl font-mono font-bold text-zinc-100">{scannedItem.stock}</span>
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mt-1 block">Current Stock</span>
                      </div>
                      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 text-center">
                        <span className="block text-xs font-bold text-zinc-100 truncate">{scannedItem.location}</span>
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mt-1 block">Location</span>
                      </div>
                    </div>

                    <div className="flex gap-3 w-full max-w-md mt-4">
                      <button 
                        onClick={resetScanner}
                        className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                      >
                        <RefreshCw size={18} /> Scan Again
                      </button>
                      <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                        Update Stock <ArrowRight size={18} />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                      <XCircle size={48} />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-2xl font-bold text-zinc-100">Unknown Item</h3>
                      <p className="text-sm text-zinc-500">The scanned code <span className="text-zinc-300 font-mono">{scannedResult}</span> was not found in the database.</p>
                    </div>
                    <div className="flex gap-3 w-full max-w-md mt-6">
                      <button 
                        onClick={resetScanner}
                        className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                      >
                        <RefreshCw size={18} /> Try Again
                      </button>
                      <button className="flex-1 bg-zinc-100 hover:bg-white text-zinc-950 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                        Register Item <Plus size={18} />
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* History & Info Panel */}
        <div className="space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
            <h3 className="font-bold text-zinc-100 flex items-center gap-2 mb-6">
              <History size={18} className="text-zinc-400" /> Recent Scans
            </h3>
            <div className="space-y-4">
              {scanHistory.length > 0 ? (
                scanHistory.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-orange-500 transition-colors">
                      <Package size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-zinc-200 truncate">{item.name}</h4>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">{item.category} • {item.lastUpdated}</p>
                    </div>
                    <div className={clsx(
                      "w-2 h-2 rounded-full",
                      item.status === 'In Stock' ? "bg-green-500" : "bg-yellow-500"
                    )} />
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-700 mx-auto mb-4">
                    <Search size={24} />
                  </div>
                  <p className="text-xs text-zinc-500">No recent scans found.</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
            <h3 className="font-bold text-zinc-100 flex items-center gap-2 mb-4">
              <Database size={18} className="text-zinc-400" /> Database Info
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Registered Items</span>
                <span className="text-zinc-200 font-mono">1,242</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Sync Status</span>
                <span className="text-green-500 font-bold uppercase tracking-tighter">Real-time</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Last Database Sync</span>
                <span className="text-zinc-400 font-mono">2 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Plus({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
