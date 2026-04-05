import { useState } from 'react';
import { 
  Database, 
  Plus, 
  Trash2, 
  Settings, 
  Save, 
  Play, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Activity,
  Tag,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { toast } from 'sonner';

interface SCADATag {
  id: string;
  name: string;
  address: string;
  dataType: 'Float' | 'Integer' | 'Boolean' | 'String';
  defaultValue: string;
  unit: string;
  samplingRate: number; // in ms
  description: string;
}

interface SCADATemplate {
  id: string;
  name: string;
  description: string;
  protocol: 'OPC-UA' | 'MQTT' | 'Modbus' | 'EtherNet/IP';
  tags: SCADATag[];
}

const INITIAL_TAGS: SCADATag[] = [
  { id: '1', name: 'Motor_Temp', address: 'ns=2;s=Motor1.Temperature', dataType: 'Float', defaultValue: '25.0', unit: '°C', samplingRate: 1000, description: 'Main motor winding temperature' },
  { id: '2', name: 'Motor_RPM', address: 'ns=2;s=Motor1.Speed', dataType: 'Float', defaultValue: '0', unit: 'RPM', samplingRate: 500, description: 'Rotational speed of the motor' },
  { id: '3', name: 'Motor_Current', address: 'ns=2;s=Motor1.Current', dataType: 'Float', defaultValue: '0', unit: 'A', samplingRate: 500, description: 'Phase current consumption' },
  { id: '4', name: 'Emergency_Stop', address: 'ns=2;s=Motor1.EStop', dataType: 'Boolean', defaultValue: 'false', unit: '', samplingRate: 100, description: 'E-Stop status bit' },
  { id: '5', name: 'Motor_Bearing_Temp', address: 'ns=2;s=Motor1.BearingTemp', dataType: 'Float', defaultValue: '25.0', unit: '°C', samplingRate: 1000, description: 'Motor bearing temperature sensor' },
];

export default function SCADATemplate() {
  const [templateName, setTemplateName] = useState('EV Motor Test Bench Template');
  const [protocol, setProtocol] = useState<'OPC-UA' | 'MQTT' | 'Modbus' | 'EtherNet/IP'>('OPC-UA');
  const [tags, setTags] = useState<SCADATag[]>(INITIAL_TAGS);
  const [isSaving, setIsSaving] = useState(false);

  const addTag = () => {
    const newTag: SCADATag = {
      id: Date.now().toString(),
      name: 'New_Tag',
      address: 'ns=2;s=...',
      dataType: 'Float',
      defaultValue: '0',
      unit: '',
      samplingRate: 1000,
      description: ''
    };
    setTags([...tags, newTag]);
    toast.success('New tag added to template');
  };

  const removeTag = (id: string) => {
    setTags(tags.filter(t => t.id !== id));
    toast.info('Tag removed');
  };

  const updateTag = (id: string, field: keyof SCADATag, value: any) => {
    setTags(tags.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('SCADA Template saved successfully');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Database className="text-orange-500" size={20} /> SCADA Capture Template
          </h2>
          <p className="text-sm text-zinc-500">Define data points and protocols for automated machine data acquisition.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-all disabled:opacity-50"
          >
            {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
            Save Template
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template Configuration */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <Settings size={14} /> General Settings
            </h3>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-500">Template Name</label>
              <input 
                type="text" 
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-500">Communication Protocol</label>
              <select 
                value={protocol}
                onChange={(e) => setProtocol(e.target.value as any)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
              >
                <option value="OPC-UA">OPC-UA (Industrial Standard)</option>
                <option value="MQTT">MQTT (IoT Lightweight)</option>
                <option value="Modbus">Modbus TCP/RTU</option>
                <option value="EtherNet/IP">EtherNet/IP (Rockwell/Allen-Bradley)</option>
              </select>
            </div>

            <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Templates define the structure of data stored in the Time-Series Database (TSDB). Changes may affect historical data indexing.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity size={14} /> Live Preview
            </h3>
            <div className="space-y-3">
              {tags.slice(0, 3).map(tag => (
                <div key={tag.id} className="flex items-center justify-between p-3 bg-zinc-900 rounded-xl border border-zinc-800/50">
                  <div className="flex items-center gap-2">
                    <Tag size={12} className="text-orange-500" />
                    <span className="text-xs font-mono text-zinc-300">{tag.name}</span>
                  </div>
                  <div className="text-xs font-bold text-orange-500">
                    {tag.dataType === 'Boolean' ? 'OFF' : (Math.random() * 100).toFixed(2)} {tag.unit}
                  </div>
                </div>
              ))}
              <button className="w-full py-2 text-[10px] font-bold text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-widest">
                View All Live Data
              </button>
            </div>
          </div>
        </div>

        {/* Tag Definition Table */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/30">
              <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                <Cpu size={16} className="text-orange-500" /> Data Points (Tags)
              </h3>
              <button 
                onClick={addTag}
                className="text-xs font-bold text-orange-500 hover:text-orange-400 flex items-center gap-1 transition-colors"
              >
                <Plus size={14} /> Add Data Point
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-900/50 border-b border-zinc-800">
                    <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Tag Name</th>
                    <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Address / Path</th>
                    <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest w-24">Type</th>
                    <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest w-24">Default</th>
                    <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest w-24">Unit</th>
                    <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest w-32">Rate (ms)</th>
                    <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest w-16"></th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <AnimatePresence initial={false}>
                    {tags.map((tag) => (
                      <motion.tr 
                        key={tag.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors"
                      >
                        <td className="p-3">
                          <input 
                            type="text" 
                            value={tag.name}
                            onChange={(e) => updateTag(tag.id, 'name', e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 text-zinc-200 font-mono text-xs"
                          />
                        </td>
                        <td className="p-3">
                          <input 
                            type="text" 
                            value={tag.address}
                            onChange={(e) => updateTag(tag.id, 'address', e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 text-zinc-400 font-mono text-[10px]"
                          />
                        </td>
                        <td className="p-3">
                          <select 
                            value={tag.dataType}
                            onChange={(e) => updateTag(tag.id, 'dataType', e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-1 px-2 text-[10px] focus:outline-none"
                          >
                            <option value="Float">Float</option>
                            <option value="Integer">Integer</option>
                            <option value="Boolean">Boolean</option>
                            <option value="String">String</option>
                          </select>
                        </td>
                        <td className="p-3">
                          <input 
                            type="text" 
                            value={tag.defaultValue}
                            onChange={(e) => updateTag(tag.id, 'defaultValue', e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 text-zinc-300 text-xs text-center font-mono"
                            placeholder="0"
                          />
                        </td>
                        <td className="p-3">
                          <input 
                            type="text" 
                            value={tag.unit}
                            onChange={(e) => updateTag(tag.id, 'unit', e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 text-zinc-300 text-xs text-center"
                            placeholder="-"
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Clock size={10} className="text-zinc-600" />
                            <input 
                              type="number" 
                              value={tag.samplingRate}
                              onChange={(e) => updateTag(tag.id, 'samplingRate', parseInt(e.target.value))}
                              className="w-full bg-transparent border-none focus:ring-0 text-zinc-300 text-xs font-mono"
                            />
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <button 
                            onClick={() => removeTag(tag.id)}
                            className="p-2 text-zinc-600 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            
            {tags.length === 0 && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                  <Database className="text-zinc-700" size={24} />
                </div>
                <h4 className="text-zinc-300 font-bold">No Data Points Defined</h4>
                <p className="text-zinc-500 text-xs mt-1">Add tags to start capturing data from your SCADA system.</p>
                <button 
                  onClick={addTag}
                  className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold transition-all"
                >
                  Add First Tag
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function RefreshCw({ className, size }: { className?: string, size?: number }) {
  return <Play className={className} size={size} />;
}
