import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, RefreshCw, Database, Wifi, Settings2, Battery, BatteryCharging, Gauge, Thermometer, Car, Zap, Power } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function EVTestCell() {
  const [isConnected, setIsConnected] = useState(true);
  const [testRunning, setTestRunning] = useState(false);
  const [mode, setMode] = useState<'charge' | 'discharge'>('discharge');
  
  // Telemetry state
  const [soc, setSoc] = useState(85);
  const [voltage, setVoltage] = useState(395);
  const [current, setCurrent] = useState(0);
  const [temperature, setTemperature] = useState(25);
  const [pressure, setPressure] = useState(2.4); // Added pressure in bar
  const [rpm, setRpm] = useState(0);

  // Captured Data Log
  const [capturedData, setCapturedData] = useState<any[]>([]);
  const [manualInput, setManualInput] = useState({
    voltage: '',
    current: '',
    temperature: '',
    pressure: '',
    notes: ''
  });

  // Simulate live data
  useEffect(() => {
    if (!isConnected) return;
    
    const interval = setInterval(() => {
      if (testRunning) {
        if (mode === 'charge') {
          setSoc(prev => Math.min(100, prev + 0.05));
          setVoltage(prev => Math.min(420, prev + 0.5));
          setCurrent(150 + Math.random() * 5);
          setTemperature(prev => Math.min(45, prev + 0.05));
          setPressure(prev => Math.min(2.8, prev + 0.001));
          setRpm(0);
        } else {
          setSoc(prev => Math.max(0, prev - 0.1));
          setVoltage(prev => Math.max(320, prev - 0.8));
          setCurrent(-250 - Math.random() * 10);
          setTemperature(prev => Math.min(65, prev + 0.1));
          setPressure(prev => Math.max(2.1, prev - 0.002));
          setRpm(12000 + Math.random() * 500);
        }
      } else {
        setCurrent(0);
        setRpm(prev => Math.max(0, prev - 500));
        setTemperature(prev => Math.max(25, prev - 0.1));
        setPressure(prev => prev + (2.4 - prev) * 0.05);
        setVoltage(prev => {
          // Return to resting voltage based on SoC
          const target = 320 + (soc / 100) * 80;
          return prev + (target - prev) * 0.1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isConnected, testRunning, mode, soc]);

  const handleCapture = () => {
    const newData = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      voltage: voltage.toFixed(1),
      current: current.toFixed(1),
      temperature: temperature.toFixed(1),
      pressure: pressure.toFixed(2),
      notes: 'Auto-captured telemetry'
    };
    setCapturedData([newData, ...capturedData]);
  };

  const handleManualSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newData = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      voltage: manualInput.voltage || voltage.toFixed(1),
      current: manualInput.current || current.toFixed(1),
      temperature: manualInput.temperature || temperature.toFixed(1),
      pressure: manualInput.pressure || pressure.toFixed(2),
      notes: manualInput.notes || 'Manual entry'
    };
    setCapturedData([newData, ...capturedData]);
    setManualInput({ voltage: '', current: '', temperature: '', pressure: '', notes: '' });
  };

  const downloadLog = () => {
    const headers = ['Timestamp', 'Voltage (V)', 'Current (A)', 'Temperature (°C)', 'Pressure (bar)', 'Notes'];
    const rows = capturedData.map(d => [d.timestamp, d.voltage, d.current, d.temperature, d.pressure, d.notes]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `ev_test_scada_log_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const powerKw = Math.abs((voltage * current) / 1000);

  return (
    <div className="space-y-6">
      {/* Header & Connection Status */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/50">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${isConnected ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
            <Car size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100">EV Powertrain Test Cell</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="relative flex h-2.5 w-2.5">
                {isConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isConnected ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
              </span>
              <span className="text-sm font-mono text-zinc-400">
                {isConnected ? 'CAN-FD // Node 0x1A' : 'Connection Lost'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsConnected(!isConnected)}
            className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${isConnected ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700' : 'bg-emerald-500 text-zinc-950 hover:bg-emerald-600'}`}
          >
            <RefreshCw size={16} className={isConnected ? '' : 'animate-spin'} />
            {isConnected ? 'Disconnect' : 'Reconnect'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* HMI Visualization */}
        <div className="lg:col-span-2 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <Activity className="text-orange-500" size={20} />
              Powertrain SCADA
            </h3>
            <span className="text-xs font-mono bg-zinc-800 text-zinc-300 px-2 py-1 rounded-md">
              Update Rate: 100ms
            </span>
          </div>

          <div className="relative h-[400px] bg-zinc-950/50 rounded-xl border border-zinc-800/50 p-8 flex items-center justify-center overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* SCADA Diagram */}
            <div className="relative w-full max-w-3xl h-full flex items-center justify-between z-10 px-4">
              
              {/* Battery Pack */}
              <div className="relative flex flex-col items-center">
                <div className="relative w-28 h-40 border-4 border-zinc-700 rounded-xl bg-zinc-900 flex flex-col justify-end overflow-hidden p-1 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-2 bg-zinc-700 rounded-b-sm"></div>
                  <motion.div 
                    className={`w-full rounded-sm relative ${soc > 20 ? 'bg-emerald-500' : 'bg-red-500'}`}
                    animate={{ height: `${soc}%` }}
                    transition={{ type: "tween", duration: 1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <span className="font-mono font-bold text-white drop-shadow-md text-lg">{soc.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="mt-4 text-xs font-mono font-bold text-zinc-400 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">HV_BATTERY</div>
              </div>

              {/* DC Bus Wire */}
              <div className="absolute left-[8rem] top-1/2 -translate-y-1/2 w-24 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${mode === 'charge' ? 'bg-emerald-500' : 'bg-orange-500'}`}
                  animate={{ x: testRunning ? (mode === 'charge' ? [-40, 100] : [100, -40]) : 0, opacity: testRunning ? [0, 1, 0] : 0 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  style={{ width: '40px' }}
                />
              </div>

              {/* Inverter */}
              <div className="relative flex flex-col items-center z-20">
                <div className={`w-32 h-32 rounded-2xl border-4 flex flex-col items-center justify-center bg-zinc-900 transition-colors shadow-xl ${testRunning ? (mode === 'charge' ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.2)]') : 'border-zinc-700'}`}>
                  <Zap size={32} className={testRunning ? (mode === 'charge' ? 'text-emerald-500' : 'text-orange-500') : 'text-zinc-600'} />
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-[10px] font-mono text-zinc-500">DC</span>
                    <RefreshCw size={12} className="text-zinc-600" />
                    <span className="text-[10px] font-mono text-zinc-500">AC</span>
                  </div>
                </div>
                <div className="mt-4 text-xs font-mono font-bold text-zinc-400 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">INVERTER</div>
              </div>

              {/* AC Phase Wires */}
              <div className="absolute right-[8rem] top-1/2 -translate-y-1/2 w-24 h-6 flex flex-col justify-between">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden relative">
                    <motion.div 
                      className={`absolute top-0 bottom-0 ${mode === 'charge' ? 'bg-emerald-500' : 'bg-orange-500'}`}
                      animate={{ x: testRunning ? (mode === 'charge' ? [-20, 100] : [100, -20]) : 0, opacity: testRunning ? [0, 1, 0] : 0 }}
                      transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.15, ease: "linear" }}
                      style={{ width: '20px' }}
                    />
                  </div>
                ))}
              </div>

              {/* Motor / Dyno */}
              <div className="relative flex flex-col items-center z-20">
                <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center bg-zinc-900 transition-colors shadow-xl ${testRunning && mode === 'discharge' ? 'border-orange-500' : 'border-zinc-700'}`}>
                  <motion.div
                    animate={{ rotate: rpm > 0 ? 360 : 0 }}
                    transition={{ repeat: Infinity, duration: rpm > 0 ? 60000 / rpm : 0, ease: "linear" }}
                    className="w-24 h-24 border-4 border-dashed border-zinc-600 rounded-full flex items-center justify-center"
                  >
                    <Settings2 size={32} className={rpm > 0 ? 'text-orange-500' : 'text-zinc-600'} />
                  </motion.div>
                </div>
                <div className="mt-4 text-xs font-mono font-bold text-zinc-400 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">TRACTION_MOTOR</div>
              </div>

            </div>
          </div>
        </div>

        {/* Controls & Telemetry */}
        <div className="space-y-6">
          {/* Controls */}
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <Settings2 className="text-orange-500" size={20} />
              Test Sequence Control
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setMode('discharge')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${mode === 'discharge' ? 'bg-orange-500/10 border-orange-500/50 text-orange-500' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800'}`}
                >
                  <Gauge size={20} />
                  <span className="text-xs font-bold uppercase tracking-wider">Drive Cycle</span>
                </button>
                <button 
                  onClick={() => setMode('charge')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${mode === 'charge' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800'}`}
                >
                  <BatteryCharging size={20} />
                  <span className="text-xs font-bold uppercase tracking-wider">Regen / Charge</span>
                </button>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => setTestRunning(!testRunning)}
                  disabled={!isConnected}
                  className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg ${testRunning ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20' : 'bg-emerald-500 hover:bg-emerald-600 text-zinc-950 shadow-emerald-500/20'} ${!isConnected && 'opacity-50 cursor-not-allowed'}`}
                >
                  <Power size={18} />
                  {testRunning ? 'Stop Test Sequence' : 'Start Test Sequence'}
                </button>
              </div>
            </div>
          </div>

          {/* Live Tags */}
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <Database className="text-orange-500" size={20} />
              Live Telemetry
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50">
                <p className="text-xs text-zinc-500 mb-1">HV Voltage</p>
                <p className="text-lg font-mono font-bold text-zinc-100">{voltage.toFixed(1)} <span className="text-xs text-zinc-500">V</span></p>
              </div>
              <div className="bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50">
                <p className="text-xs text-zinc-500 mb-1">HV Current</p>
                <p className={`text-lg font-mono font-bold ${current > 0 ? 'text-emerald-400' : current < 0 ? 'text-orange-400' : 'text-zinc-100'}`}>
                  {current > 0 ? '+' : ''}{current.toFixed(1)} <span className="text-xs text-zinc-500">A</span>
                </p>
              </div>
              <div className="bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50">
                <p className="text-xs text-zinc-500 mb-1">Active Power</p>
                <p className="text-lg font-mono font-bold text-blue-400">{powerKw.toFixed(1)} <span className="text-xs text-zinc-500">kW</span></p>
              </div>
              <div className="bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50">
                <p className="text-xs text-zinc-500 mb-1">Motor Speed</p>
                <p className="text-lg font-mono font-bold text-purple-400">{rpm.toFixed(0)} <span className="text-xs text-zinc-500">RPM</span></p>
              </div>
              <div className="bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50">
                <p className="text-xs text-zinc-500 mb-1">Coolant Pressure</p>
                <p className="text-lg font-mono font-bold text-cyan-400">{pressure.toFixed(2)} <span className="text-xs text-zinc-500">bar</span></p>
              </div>
              <div className="bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50 flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Max Cell Temp</p>
                  <p className={`text-lg font-mono font-bold ${temperature > 50 ? 'text-red-400' : 'text-zinc-100'}`}>
                    {temperature.toFixed(1)} <span className="text-xs text-zinc-500">°C</span>
                  </p>
                </div>
                <Thermometer size={24} className={temperature > 50 ? 'text-red-500' : 'text-zinc-600'} />
              </div>
            </div>
            <div className="mt-4">
              <button 
                onClick={handleCapture}
                className="w-full py-3 bg-orange-500/10 border border-orange-500/30 text-orange-500 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-zinc-950 transition-all flex items-center justify-center gap-2"
              >
                <Database size={14} />
                Capture Current Telemetry
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* SCADA Data Capture Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Manual Input Form */}
        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
            <Settings2 className="text-orange-500" size={20} />
            Manual SCADA Entry
          </h3>
          <form onSubmit={handleManualSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Voltage (V)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={manualInput.voltage}
                  onChange={(e) => setManualInput({...manualInput, voltage: e.target.value})}
                  placeholder={voltage.toFixed(1)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Current (A)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={manualInput.current}
                  onChange={(e) => setManualInput({...manualInput, current: e.target.value})}
                  placeholder={current.toFixed(1)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Temp (°C)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={manualInput.temperature}
                  onChange={(e) => setManualInput({...manualInput, temperature: e.target.value})}
                  placeholder={temperature.toFixed(1)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Pressure (bar)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={manualInput.pressure}
                  onChange={(e) => setManualInput({...manualInput, pressure: e.target.value})}
                  placeholder={pressure.toFixed(2)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Notes</label>
              <textarea 
                value={manualInput.notes}
                onChange={(e) => setManualInput({...manualInput, notes: e.target.value})}
                placeholder="Observation notes..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-orange-500 h-20 resize-none"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-3 bg-emerald-500 text-zinc-950 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/10"
            >
              Save Data Point
            </button>
          </form>
        </div>

        {/* Captured Data Table */}
        <div className="lg:col-span-2 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-6 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <Database className="text-orange-500" size={20} />
              Captured SCADA Log
            </h3>
            <div className="flex items-center gap-4">
              <button 
                onClick={downloadLog}
                disabled={capturedData.length === 0}
                className="text-[10px] font-bold text-emerald-500 hover:text-emerald-400 uppercase tracking-widest transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Download CSV
              </button>
              <button 
                onClick={() => setCapturedData([])}
                className="text-[10px] font-bold text-zinc-500 hover:text-red-400 uppercase tracking-widest transition-colors"
              >
                Clear Log
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[300px] custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-zinc-900 z-10 border-b border-zinc-800">
                <tr>
                  <th className="p-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Time</th>
                  <th className="p-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">V</th>
                  <th className="p-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">A</th>
                  <th className="p-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">°C</th>
                  <th className="p-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">bar</th>
                  <th className="p-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {capturedData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-zinc-500 text-sm italic">
                      No data points captured yet.
                    </td>
                  </tr>
                ) : (
                  capturedData.map((data) => (
                    <tr key={data.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="p-3 text-xs font-mono text-zinc-400">{data.timestamp}</td>
                      <td className="p-3 text-xs font-mono text-zinc-100">{data.voltage}</td>
                      <td className="p-3 text-xs font-mono text-zinc-100">{data.current}</td>
                      <td className="p-3 text-xs font-mono text-zinc-100">{data.temperature}</td>
                      <td className="p-3 text-xs font-mono text-zinc-100">{data.pressure}</td>
                      <td className="p-3 text-xs text-zinc-400 truncate max-w-[150px]">{data.notes}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Diagnostics & Faults (Restored) */}
      <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
        <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
          <AlertTriangle className="text-orange-500" size={20} />
          Active Diagnostics & Faults
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-900/80 border-b border-zinc-800/50">
              <tr>
                <th className="p-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Time</th>
                <th className="p-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">ECU/Node</th>
                <th className="p-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">DTC / Message</th>
                <th className="p-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {!isConnected && (
                <tr className="bg-red-500/5">
                  <td className="p-3 text-sm font-mono text-zinc-400">Just now</td>
                  <td className="p-3 text-sm font-mono text-zinc-300">CAN_BUS</td>
                  <td className="p-3 text-sm text-zinc-200">U0100 - Lost Communication with ECM/PCM</td>
                  <td className="p-3"><span className="text-[10px] px-2 py-1 rounded bg-red-500/20 text-red-400 font-bold border border-red-500/20">CRITICAL</span></td>
                </tr>
              )}
              {temperature > 50 && (
                <tr className="bg-orange-500/5">
                  <td className="p-3 text-sm font-mono text-zinc-400">Just now</td>
                  <td className="p-3 text-sm font-mono text-zinc-300">BMS_01</td>
                  <td className="p-3 text-sm text-zinc-200">P0A7E - Battery Pack Over Temperature</td>
                  <td className="p-3"><span className="text-[10px] px-2 py-1 rounded bg-orange-500/20 text-orange-400 font-bold border border-orange-500/20">HIGH</span></td>
                </tr>
              )}
              {soc < 20 && (
                <tr className="bg-yellow-500/5">
                  <td className="p-3 text-sm font-mono text-zinc-400">1m ago</td>
                  <td className="p-3 text-sm font-mono text-zinc-300">BMS_01</td>
                  <td className="p-3 text-sm text-zinc-200">P0B24 - Hybrid/EV Battery Voltage Low</td>
                  <td className="p-3"><span className="text-[10px] px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 font-bold border border-yellow-500/20">WARNING</span></td>
                </tr>
              )}
              <tr>
                <td className="p-3 text-sm font-mono text-zinc-400">10m ago</td>
                <td className="p-3 text-sm font-mono text-zinc-300">INV_01</td>
                <td className="p-3 text-sm text-zinc-200">Inverter Initialization Complete</td>
                <td className="p-3"><span className="text-[10px] px-2 py-1 rounded bg-zinc-800 text-zinc-400 font-bold border border-zinc-700">INFO</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
