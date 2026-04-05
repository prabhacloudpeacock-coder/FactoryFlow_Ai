import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Scan, Camera, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function BarcodeScanner() {
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(
      (result) => {
        setScanResult(result);
        toast.success(`Barcode Scanned: ${result}`);
        scanner.clear();
      },
      (error) => {
        // console.warn(error);
      }
    );

    return () => {
      scanner.clear().catch(error => console.error("Failed to clear scanner", error));
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2 mb-6">
          <Scan className="text-orange-500" /> Industrial Barcode Scanner
        </h2>
        
        <div className="max-w-md mx-auto">
          <div id="reader" className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950"></div>
          
          <div className="mt-8 p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Camera className="text-zinc-500" size={18} />
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Scan Result</span>
            </div>
            {scanResult ? (
              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <p className="text-orange-500 font-mono font-bold text-lg">{scanResult}</p>
              </div>
            ) : (
              <p className="text-zinc-600 italic text-sm">Waiting for scan...</p>
            )}
          </div>

          <div className="mt-6 p-4 bg-orange-500/5 border border-orange-500/10 rounded-xl flex gap-3">
            <AlertCircle className="text-orange-500 shrink-0" size={20} />
            <p className="text-xs text-zinc-400 leading-relaxed">
              Ensure the barcode is well-lit and centered within the scanning box. Supports Code 128, QR Codes, and standard industrial formats.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
