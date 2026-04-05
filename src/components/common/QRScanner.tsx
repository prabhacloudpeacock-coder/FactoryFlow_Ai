import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { Camera, X, RefreshCw, AlertCircle } from 'lucide-react';

interface QRScannerProps {
  onScanSuccess: (decodedText: string, decodedResult: any) => void;
  onScanError?: (errorMessage: string) => void;
  fps?: number;
  qrbox?: number | { width: number; height: number };
  aspectRatio?: number;
  disableFlip?: boolean;
  verbose?: boolean;
}

const QRScanner: React.FC<QRScannerProps> = ({
  onScanSuccess,
  onScanError,
  fps = 10,
  qrbox = 250,
  aspectRatio = 1.0,
  disableFlip = false,
  verbose = false,
}) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize scanner
    const config = {
      fps,
      qrbox,
      aspectRatio,
      disableFlip,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    };

    const scanner = new Html5QrcodeScanner("qr-reader", config, verbose);
    scannerRef.current = scanner;

    const successCallback = (decodedText: string, decodedResult: any) => {
      onScanSuccess(decodedText, decodedResult);
    };

    const errorCallback = (errorMessage: string) => {
      if (onScanError) onScanError(errorMessage);
    };

    scanner.render(successCallback, errorCallback);
    setIsScanning(true);

    // Cleanup on unmount
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(err => {
          console.error("Failed to clear scanner", err);
        });
      }
    };
  }, [onScanSuccess, onScanError, fps, qrbox, aspectRatio, disableFlip, verbose]);

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="relative bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        <div id="qr-reader" className="w-full" />
        
        {!isScanning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/80 backdrop-blur-sm p-6 text-center">
            <Camera size={48} className="text-zinc-600 mb-4 animate-pulse" />
            <h3 className="text-zinc-100 font-bold">Initializing Camera...</h3>
            <p className="text-sm text-zinc-500 mt-2">Please grant camera permissions if prompted.</p>
          </div>
        )}

        {error && (
          <div className="absolute bottom-4 left-4 right-4 bg-red-500/10 border border-red-500/20 p-3 rounded-xl flex items-center gap-3 text-red-500 text-xs">
            <AlertCircle size={16} />
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-auto text-zinc-400 hover:text-zinc-100">
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-4 text-[10px] uppercase tracking-widest font-bold text-zinc-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Scanner Active</span>
        </div>
        <div className="w-px h-3 bg-zinc-800" />
        <span>Auto-Focus Enabled</span>
      </div>
    </div>
  );
};

export default QRScanner;
