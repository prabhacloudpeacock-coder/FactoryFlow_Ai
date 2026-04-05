import React, { useState, useEffect, useRef } from 'react';
import { Activity, RefreshCw, AlertTriangle, CheckCircle2, Settings2, Power, Database, Play, Network, Wifi, Globe, Terminal, ShieldCheck } from 'lucide-react';
import { clsx } from 'clsx';

export default function TestBench() {
  const [isFetching, setIsFetching] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('connected');
  const [connectionLogs, setConnectionLogs] = useState<string[]>([
    'System initialized...',
    'Establishing handshake with PLC-7742...',
    'Authentication successful.',
    'Polling data from TVS_CONVEYOR_01...',
    'Connection stable at 12ms latency.'
  ]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState({
    wipAllowed1: 3,
    currentWip1: -49,
    greasingTime: 100,
    ignTubeSensor: false,
    servoOnlineValue: 0.00,
    leverRangeActual: 39.91,
    meter1V: 0.00,
    meter2A: 0.0,
    meter3A: 0.0,
    rubber1Bolt1: true,
    rubber2Bolt2: 'warning' as const,
    sleeve1Bolt3: false,
    upperBracket: false,
    boltWasherSensor: false,
    wipAllowed2: 3,
    currentWip2: 28,
    runningOk: true,
    bufferLow: true,
    bufferHigh: false,
    fail: false,
    fliker: false,
    hazard: false,
    production: 142,
    batchCount: 1,
    scannerOn: true,
    mvdBypass: false,
    flikerBypass: false,
  });

  useEffect(() => {
    if (connectionStatus !== 'connected' || !isFetching) return;
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        servoOnlineValue: +(Math.random() * 0.5).toFixed(2),
        leverRangeActual: +(39.5 + Math.random() * 1.0).toFixed(2),
        meter1V: +(12.0 + Math.random() * 0.5).toFixed(2),
        meter2A: +(1.2 + Math.random() * 0.2).toFixed(1),
        meter3A: +(1.1 + Math.random() * 0.2).toFixed(1),
        production: Math.random() > 0.8 ? prev.production + 1 : prev.production,
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, [isFetching, connectionStatus]);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [connectionLogs]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setConnectionLogs(prev => [...prev, `[${timestamp}] ${message}`].slice(-10));
  };

  const handleReconnect = () => {
    setConnectionStatus('connecting');
    addLog('Initiating manual reconnection...');
    setTimeout(() => {
      setConnectionStatus('connected');
      addLog('Reconnected to TVS_CONVEYOR_01.');
    }, 2000);
  };

  const Indicator = ({ label, status }: { label: string, status: boolean | 'warning' }) => (
    <div className="flex items-center justify-between bg-zinc-900 p-2 rounded border border-zinc-800">
      <span className="text-xs text-zinc-400">{label}</span>
      <div className={clsx(
        "w-4 h-4 rounded-full shadow-inner",
        status === true ? "bg-green-500 shadow-green-500/50" :
        status === 'warning' ? "bg-yellow-500 shadow-yellow-500/50" :
        "bg-red-500 shadow-red-500/50"
      )} />
    </div>
  );

  const ValueDisplay = ({ label, value, unit }: { label: string, value: number | string, unit: string }) => (
    <div className="bg-zinc-900 p-3 rounded border border-zinc-800 flex justify-between items-center">
      <span className="text-xs text-zinc-500 uppercase tracking-wider font-bold">{label}</span>
      <div className="text-right">
        <span className="text-lg font-mono font-bold text-zinc-100">{value}</span>
        <span className="text-xs text-zinc-500 ml-1">{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
            <Database className="text-orange-500" size={20} /> TVS Conveyor Assemble Line
          </h2>
          <p className="text-sm text-zinc-500">Live SCADA Data Fetching & Monitoring</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="relative flex h-3 w-3">
              {isFetching && connectionStatus === 'connected' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
              <span className={clsx(
                "relative inline-flex rounded-full h-3 w-3", 
                connectionStatus === 'connected' ? "bg-green-500" : 
                connectionStatus === 'connecting' ? "bg-yellow-500 animate-pulse" : "bg-red-500"
              )}></span>
            </span>
            <span className="text-zinc-400">
              {connectionStatus === 'connected' ? (isFetching ? 'Live Data Active' : 'Data Paused') : 
               connectionStatus === 'connecting' ? 'Reconnecting...' : 'Disconnected'}
            </span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleReconnect}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 p-2 rounded-lg transition-colors"
              title="Reconnect"
            >
              <RefreshCw size={18} className={clsx(connectionStatus === 'connecting' && "animate-spin")} />
            </button>
            <button 
              onClick={() => setIsFetching(!isFetching)}
              disabled={connectionStatus !== 'connected'}
              className={clsx(
                "px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors",
                isFetching ? "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20" : "bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/20",
                connectionStatus !== 'connected' && "opacity-50 cursor-not-allowed"
              )}
            >
              <Power size={16} />
              {isFetching ? 'Stop Fetching' : 'Start Fetching'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: WIP & Sensors */}
        <div className="space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-zinc-100 mb-4 uppercase tracking-wider">Work In Progress (WIP)</h3>
            <div className="space-y-3">
              <ValueDisplay label="WIP Allowed" value={data.wipAllowed1} unit="" />
              <ValueDisplay label="Current WIP" value={data.currentWip1} unit="" />
              <ValueDisplay label="Greasing Time" value={data.greasingTime} unit="ms" />
              <Indicator label="IGN Tube Position Sensor" status={data.ignTubeSensor} />
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-2 rounded text-xs font-bold text-zinc-300">WIP Bypass On</button>
              <button className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-2 rounded text-xs font-bold text-zinc-300">WIP Reset Off</button>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-zinc-100 mb-4 uppercase tracking-wider">Assembly Sensors</h3>
            <div className="grid grid-cols-1 gap-2">
              <Indicator label="Rubber 1 / Bolt 1" status={data.rubber1Bolt1} />
              <Indicator label="Rubber 2 / Bolt 2" status={data.rubber2Bolt2} />
              <Indicator label="Sleeve 1 / Bolt 3" status={data.sleeve1Bolt3} />
              <Indicator label="Upper Bracket" status={data.upperBracket} />
              <Indicator label="Bolt/Washer Sensor" status={data.boltWasherSensor} />
            </div>
          </div>
        </div>

        {/* Middle Column: Telemetry & Controls */}
        <div className="space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-zinc-100 mb-4 uppercase tracking-wider">Servo & Meters</h3>
            <div className="space-y-3">
              <ValueDisplay label="Servo Online Value" value={data.servoOnlineValue} unit="mm" />
              <ValueDisplay label="Lever Range Actual" value={data.leverRangeActual} unit="mm" />
              <div className="h-px bg-zinc-800 my-4" />
              <ValueDisplay label="Meter 1 (Voltage)" value={data.meter1V} unit="V" />
              <ValueDisplay label="Meter 2 (Current)" value={data.meter2A} unit="Amp" />
              <ValueDisplay label="Meter 3 (Current)" value={data.meter3A} unit="Amp" />
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-zinc-100 mb-4 uppercase tracking-wider">Cycle Controls</h3>
            <div className="grid grid-cols-1 gap-2">
              <button className="bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/20 py-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                <Play size={16} /> Cycle Start
              </button>
              <button className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/20 py-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                <RefreshCw size={16} /> Cycle Reset
              </button>
              <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 py-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                <AlertTriangle size={16} /> Emergency Reset
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Status & Production */}
        <div className="space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-zinc-100 mb-4 uppercase tracking-wider">Line Status</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex flex-col items-center justify-center gap-2">
                <div className={clsx("w-8 h-8 rounded-full shadow-lg", data.runningOk ? "bg-green-500 shadow-green-500/50" : "bg-zinc-700")} />
                <span className="text-[10px] font-bold text-zinc-400 uppercase">Running OK</span>
              </div>
              <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex flex-col items-center justify-center gap-2">
                <div className={clsx("w-8 h-8 rounded-full shadow-lg", data.hazard ? "bg-red-500 shadow-red-500/50 animate-pulse" : "bg-zinc-700")} />
                <span className="text-[10px] font-bold text-zinc-400 uppercase">HAZARD</span>
              </div>
            </div>

            <div className="space-y-2">
              <Indicator label="Buffer Low" status={data.bufferLow} />
              <Indicator label="Buffer High" status={data.bufferHigh} />
              <Indicator label="Fail Status" status={!data.fail} />
              <Indicator label="Fliker Status" status={!data.fliker} />
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-zinc-100 mb-4 uppercase tracking-wider">Production Output</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 text-center">
                <span className="block text-3xl font-mono font-bold text-orange-500">{data.production}</span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mt-1 block">Total Production</span>
              </div>
              <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 text-center">
                <span className="block text-3xl font-mono font-bold text-blue-500">{data.batchCount}</span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mt-1 block">Batch Count</span>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Management Column */}
        <div className="space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-zinc-100 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Network size={16} className="text-blue-500" /> Connection Info
            </h3>
            <div className="space-y-4">
              <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 space-y-2">
                <div className="flex justify-between text-[10px]">
                  <span className="text-zinc-500 uppercase font-bold">IP Address</span>
                  <span className="text-zinc-300 font-mono">192.168.1.142</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-zinc-500 uppercase font-bold">Protocol</span>
                  <span className="text-zinc-300 font-mono">Modbus TCP</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-zinc-500 uppercase font-bold">PLC Model</span>
                  <span className="text-zinc-300 font-mono">Siemens S7-1500</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-zinc-900 p-2 rounded-lg border border-zinc-800 text-center">
                  <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Latency</div>
                  <div className="text-xs font-bold text-green-500">12ms</div>
                </div>
                <div className="bg-zinc-900 p-2 rounded-lg border border-zinc-800 text-center">
                  <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Uptime</div>
                  <div className="text-xs font-bold text-blue-500">99.9%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 flex-1 flex flex-col">
            <h3 className="text-sm font-bold text-zinc-100 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Terminal size={16} className="text-zinc-500" /> Connection Log
            </h3>
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-3 font-mono text-[10px] space-y-1 h-64 overflow-y-auto scrollbar-hide">
              {connectionLogs.map((log, i) => (
                <div key={i} className="text-zinc-400">
                  <span className="text-zinc-600 mr-2">{'>'}</span>
                  {log}
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

