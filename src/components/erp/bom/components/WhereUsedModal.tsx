import { useState } from 'react';
import { X, Search, Package, ArrowRight } from 'lucide-react';
import { cn } from '../../../../lib/utils';

interface WhereUsedResult {
  productId: string;
  productName: string;
  qty: number;
}

interface WhereUsedModalProps {
  isOpen: boolean;
  onClose: () => void;
  partId?: string;
}

// Mock data representing "real" data in a database
const MOCK_DATA: Record<string, WhereUsedResult[]> = {
  'P-101': [{ productId: 'FG-1001', productName: 'Industrial Pump V2', qty: 1 }],
  'P-102-1': [{ productId: 'FG-1001', productName: 'Industrial Pump V2', qty: 4 }],
  'P-102-2': [{ productId: 'FG-1001', productName: 'Industrial Pump V2', qty: 1 }],
  'P-103-1': [{ productId: 'FG-1001', productName: 'Industrial Pump V2', qty: 4 }],
  'P-103-2': [{ productId: 'FG-1001', productName: 'Industrial Pump V2', qty: 1 }],
  'P-104': [{ productId: 'FG-1001', productName: 'Industrial Pump V2', qty: 1 }],
};

export default function WhereUsedModal({ isOpen, onClose, partId: initialPartId }: WhereUsedModalProps) {
  const [partId, setPartId] = useState(initialPartId || '');
  const [results, setResults] = useState<WhereUsedResult[]>([]);

  const handleSearch = () => {
    setResults(MOCK_DATA[partId] || []);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <h2 className="text-xl font-bold text-zinc-100">Where Used Analysis</h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={partId}
              onChange={(e) => setPartId(e.target.value)}
              placeholder="Enter Part ID (e.g., P-101)"
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl py-2 px-4 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            <button 
              onClick={handleSearch}
              className="bg-orange-500 text-zinc-950 px-4 py-2 rounded-xl text-sm font-bold hover:bg-orange-600 transition-all"
            >
              <Search size={18} />
            </button>
          </div>

          <div className="space-y-2">
            {results.length > 0 ? (
              results.map((res, idx) => (
                <div key={idx} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Package className="text-orange-500" size={20} />
                    <div>
                      <p className="text-sm font-bold text-zinc-100">{res.productName}</p>
                      <p className="text-xs text-zinc-500 font-mono">{res.productId}</p>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-zinc-400">Qty: {res.qty}</div>
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-600 text-center py-4">No usages found for this Part ID.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
