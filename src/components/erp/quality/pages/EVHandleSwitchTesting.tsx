import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  CheckCircle2, 
  XCircle, 
  Play, 
  RotateCcw, 
  Printer, 
  FileText, 
  Smartphone, 
  Activity,
  ShieldCheck,
  Cpu,
  Thermometer,
  Gauge,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner';
import { cn } from '../../../../lib/utils';

interface TestResult {
  id: string;
  timestamp: string;
  productSerial: string;
  status: 'PASS' | 'FAIL';
  parameters: {
    horn: boolean;
    highBeam: boolean;
    lowBeam: boolean;
    leftIndicator: boolean;
    rightIndicator: boolean;
    killSwitch: boolean;
    voltage: number;
    current: number;
    temperature: number;
  };
}

export default function EVHandleSwitchTesting() {
  const [isTesting, setIsTesting] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [serialNumber, setSerialNumber] = useState(`EV-SW-${Math.floor(100000 + Math.random() * 900000)}`);
  const [currentTest, setCurrentTest] = useState<Partial<TestResult['parameters']>>({});
  const [lastResult, setLastResult] = useState<TestResult | null>(null);
  const [showLabel, setShowLabel] = useState(false);

  // SCADA Simulation Data
  const [telemetry, setTelemetry] = useState({
    voltage: 12.4,
    current: 0.0,
    temp: 28.5,
    pressure: 0.0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        voltage: 12.4 + (Math.random() * 0.2 - 0.1),
        current: isTesting ? 1.2 + (Math.random() * 0.5) : 0.0,
        temp: 28.5 + (Math.random() * 2),
        pressure: isTesting ? 5.2 + (Math.random() * 0.5) : 0.0
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTesting]);

  const runTest = async () => {
    if (isTesting) return;
    
    setIsTesting(true);
    setTestProgress(0);
    setCurrentTest({});
    setShowLabel(false);

    const steps = [
      { key: 'horn', label: 'Horn Switch' },
      { key: 'highBeam', label: 'High Beam' },
      { key: 'lowBeam', label: 'Low Beam' },
      { key: 'leftIndicator', label: 'Left Indicator' },
      { key: 'rightIndicator', label: 'Right Indicator' },
      { key: 'killSwitch', label: 'Kill Switch' },
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 800));
      const success = Math.random() > 0.1; // 90% success rate
      setCurrentTest(prev => ({ ...prev, [steps[i].key]: success }));
      setTestProgress(((i + 1) / steps.length) * 100);
      
      if (!success) {
        toast.error(`Test failed at ${steps[i].label}`);
      }
    }

    await new Promise(r => setTimeout(r, 500));
    
    const isPass = Object.values(currentTest).every(v => v === true) && Math.random() > 0.05;
    
    const result: TestResult = {
      id: `TR-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toLocaleString(),
      productSerial: serialNumber,
      status: isPass ? 'PASS' : 'FAIL',
      parameters: {
        horn: currentTest.horn || false,
        highBeam: currentTest.highBeam || false,
        lowBeam: currentTest.lowBeam || false,
        leftIndicator: currentTest.leftIndicator || false,
        rightIndicator: currentTest.rightIndicator || false,
        killSwitch: currentTest.killSwitch || false,
        voltage: telemetry.voltage,
        current: telemetry.current,
        temperature: telemetry.temp,
      }
    };

    setLastResult(result);
    setIsTesting(false);
    
    if (isPass) {
      toast.success('QC Passed! Label ready for printing.');
      setShowLabel(true);
    } else {
      toast.error('QC Failed. Product rejected.');
    }
  };

  const resetTest = () => {
    setSerialNumber(`EV-SW-${Math.floor(100000 + Math.random() * 900000)}`);
    setLastResult(null);
    setCurrentTest({});
    setTestProgress(0);
    setShowLabel(false);
  };

  const printLabel = () => {
    toast.success('Sending to label printer...');
    window.print(); // Browser print dialog as a mock for label printer
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <Cpu className="text-orange-500" /> EV Handle Switch SCADA Testing
          </h2>
          <p className="text-sm text-zinc-500 mt-1">Automated QC Station #QC-04 • Line 02</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-xl flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Station Status</span>
              <span className="text-xs font-bold text-green-500 flex items-center gap-1">
                <Activity size={12} className="animate-pulse" /> ONLINE
              </span>
            </div>
          </div>
          <button 
            onClick={resetTest}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-all"
            title="Reset Station"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SCADA Telemetry Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TelemetryCard label="Voltage" value={`${telemetry.voltage.toFixed(1)}V`} icon={Zap} color="text-yellow-500" />
            <TelemetryCard label="Current" value={`${telemetry.current.toFixed(2)}A`} icon={Activity} color="text-blue-500" />
            <TelemetryCard label="Temp" value={`${telemetry.temp.toFixed(1)}°C`} icon={Thermometer} color="text-orange-500" />
            <TelemetryCard label="Pressure" value={`${telemetry.pressure.toFixed(1)} bar`} icon={Gauge} color="text-emerald-500" />
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
              <motion.div 
                className="h-full bg-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${testProgress}%` }}
              />
            </div>

            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-zinc-100">Active Test Sequence</h3>
                <p className="text-xs text-zinc-500 mt-1">Serial: <span className="text-zinc-300 font-mono">{serialNumber}</span></p>
              </div>
              {!isTesting && !lastResult && (
                <button 
                  onClick={runTest}
                  className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20"
                >
                  <Play size={18} /> Start Automated Test
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TestStep label="Horn Switch Continuity" status={currentTest.horn} />
              <TestStep label="High Beam Relay" status={currentTest.highBeam} />
              <TestStep label="Low Beam Relay" status={currentTest.lowBeam} />
              <TestStep label="Left Indicator Pulse" status={currentTest.leftIndicator} />
              <TestStep label="Right Indicator Pulse" status={currentTest.rightIndicator} />
              <TestStep label="Kill Switch Isolation" status={currentTest.killSwitch} />
            </div>
          </div>
        </div>

        {/* Report & Label Panel */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {lastResult ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-zinc-100 flex items-center gap-2">
                    <FileText size={18} className="text-zinc-400" /> Test Report
                  </h3>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase border",
                    lastResult.status === 'PASS' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                  )}>
                    {lastResult.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <ReportRow label="Report ID" value={lastResult.id} />
                  <ReportRow label="Timestamp" value={lastResult.timestamp} />
                  <ReportRow label="Voltage Peak" value={`${lastResult.parameters.voltage.toFixed(2)}V`} />
                  <ReportRow label="Current Draw" value={`${lastResult.parameters.current.toFixed(2)}A`} />
                </div>

                {showLabel && (
                  <div className="pt-6 border-t border-zinc-800 flex flex-col items-center gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-xl print:shadow-none">
                      <QRCodeSVG 
                        value={JSON.stringify({
                          id: lastResult.id,
                          serial: lastResult.productSerial,
                          status: lastResult.status,
                          date: lastResult.timestamp
                        })} 
                        size={120}
                        level="H"
                      />
                      <div className="mt-2 text-center">
                        <p className="text-[8px] font-bold text-black uppercase tracking-tighter">{lastResult.productSerial}</p>
                        <p className="text-[6px] text-zinc-600">{lastResult.timestamp}</p>
                      </div>
                    </div>
                    <button 
                      onClick={printLabel}
                      className="w-full bg-zinc-100 hover:bg-white text-zinc-950 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                      <Printer size={18} /> Print QC Label
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="bg-zinc-900/50 border border-zinc-800 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-600">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h4 className="text-zinc-300 font-bold">Waiting for Test</h4>
                  <p className="text-xs text-zinc-500 mt-1">Complete a test sequence to generate the report and QR label.</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function TelemetryCard({ label, value, icon: Icon, color }: any) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{label}</span>
        <Icon size={14} className={color} />
      </div>
      <span className="text-xl font-bold text-zinc-100 font-mono">{value}</span>
    </div>
  );
}

function TestStep({ label, status }: { label: string, status?: boolean }) {
  return (
    <div className={cn(
      "flex items-center justify-between p-3 rounded-xl border transition-all",
      status === true ? "bg-green-500/5 border-green-500/20" : 
      status === false ? "bg-red-500/5 border-red-500/20" : 
      "bg-zinc-900 border-zinc-800"
    )}>
      <span className="text-sm text-zinc-300">{label}</span>
      {status === true && <CheckCircle2 size={16} className="text-green-500" />}
      {status === false && <XCircle size={16} className="text-red-500" />}
      {status === undefined && <div className="w-4 h-4 rounded-full border-2 border-zinc-700 border-t-orange-500 animate-spin" />}
    </div>
  );
}

function ReportRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-zinc-500">{label}</span>
      <span className="text-zinc-200 font-mono">{value}</span>
    </div>
  );
}
