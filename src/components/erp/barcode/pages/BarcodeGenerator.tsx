import { useState } from 'react';
import Barcode from 'react-barcode';
import { Download, Printer, Plus, Trash2, Hash, Package, Tag } from 'lucide-react';
import { toast } from 'sonner';

export default function BarcodeGenerator() {
  const [barcodeValue, setBarcodeValue] = useState('WO-2026-001');
  const [barcodeType, setBarcodeType] = useState('CODE128');

  const handleDownload = () => {
    const svg = document.getElementById('barcode-svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `${barcodeValue}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
        toast.success(`Barcode ${barcodeValue} downloaded successfully`);
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-6">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2 mb-6">
          <Tag className="text-orange-500" /> Barcode Generator
        </h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
              <Hash size={14} /> Barcode Value
            </label>
            <input 
              type="text" 
              value={barcodeValue}
              onChange={(e) => setBarcodeValue(e.target.value)}
              placeholder="Enter value (e.g., WO-2026-001)"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
              <Package size={14} /> Barcode Format
            </label>
            <select 
              value={barcodeType}
              onChange={(e) => setBarcodeType(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
            >
              <option value="CODE128">CODE 128 (Standard Industrial)</option>
              <option value="EAN13">EAN-13 (Retail)</option>
              <option value="UPC">UPC (Retail)</option>
              <option value="ITF14">ITF-14 (Shipping)</option>
            </select>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-800 flex items-center gap-3">
          <button 
            onClick={handleDownload}
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            <Download size={18} /> Download PNG
          </button>
          <button 
            onClick={() => window.print()}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            <Printer size={18} /> Print Label
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center justify-center min-h-[300px]">
        <div className="p-8 bg-white rounded-xl shadow-2xl">
          <div id="barcode-svg">
            <Barcode 
              value={barcodeValue} 
              format={barcodeType as any}
              width={2}
              height={100}
              displayValue={true}
              fontOptions="bold"
              fontSize={16}
              background="#ffffff"
              lineColor="#000000"
            />
          </div>
        </div>
        <p className="mt-6 text-xs text-zinc-500 font-mono uppercase tracking-widest">Preview Label</p>
      </div>
    </div>
  );
}
