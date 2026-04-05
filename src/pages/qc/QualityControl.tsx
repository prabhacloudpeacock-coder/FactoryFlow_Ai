import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Image as ImageIcon, 
  FileText, 
  ChevronRight, 
  Filter 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QualityControl() {
  const [reports, setReports] = useState([
    { id: 'qc-001', order: 'PO-2026-001', step: 'Frame Assembly', status: 'pass', inspector: 'Robert Chen', date: '2026-04-01 10:15', defect: null },
    { id: 'qc-002', order: 'PO-2026-001', step: 'Motor Install', status: 'fail', inspector: 'Sarah Miller', date: '2026-04-01 11:00', defect: 'Alignment' },
    { id: 'qc-003', order: 'PO-2026-002', step: 'Frame Assembly', status: 'pass', inspector: 'James Wilson', date: '2026-04-02 09:30', defect: null }
  ]);

  const [selectedReport, setSelectedReport] = useState<any>(null);

  return (
    <div className="p-6 space-y-6 bg-zinc-950 min-h-screen text-zinc-100">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quality Control</h1>
          <p className="text-zinc-500 mt-1">Record defects, pass/fail status, and inspections</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-all">
          <Plus size={18} />
          New QC Report
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="text" 
                placeholder="Search reports..." 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
              />
            </div>
            <button className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-100 transition-colors">
              <Filter size={20} />
            </button>
          </div>
          <div className="space-y-2">
            {reports.map((report) => (
              <motion.div 
                key={report.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedReport(report)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedReport?.id === report.id 
                    ? 'bg-orange-500/10 border-orange-500/50' 
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm">{report.id}</h3>
                    <p className="text-xs text-zinc-500">{report.order} • {report.step}</p>
                  </div>
                  <div className={`p-1.5 rounded-lg ${report.status === 'pass' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                    {report.status === 'pass' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-[10px] text-zinc-600 font-bold uppercase">{report.date}</p>
                  <ChevronRight size={14} className="text-zinc-700" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Report Details */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedReport ? (
              <motion.div 
                key={selectedReport.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 h-full"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                      selectedReport.status === 'pass' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      <ShieldCheck size={32} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedReport.id}</h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-mono text-zinc-500 uppercase">{selectedReport.order}</span>
                        <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                        <span className="text-xs text-zinc-500">{selectedReport.step}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-widest ${
                    selectedReport.status === 'pass' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {selectedReport.status}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">Inspection Details</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                          <span className="text-sm text-zinc-500">Inspector</span>
                          <span className="text-sm font-bold">{selectedReport.inspector}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                          <span className="text-sm text-zinc-500">Date & Time</span>
                          <span className="text-sm font-bold">{selectedReport.date}</span>
                        </div>
                        {selectedReport.defect && (
                          <div className="flex justify-between items-center p-3 bg-red-500/5 rounded-xl border border-red-500/20">
                            <span className="text-sm text-red-400">Defect Type</span>
                            <span className="text-sm font-bold text-red-500">{selectedReport.defect}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">Notes</h3>
                      <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-sm text-zinc-400 leading-relaxed">
                        The frame assembly was inspected for weld integrity and dimensional accuracy. All critical points were within tolerance.
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">Attachments</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="aspect-square bg-zinc-950 rounded-xl border border-zinc-800 flex flex-col items-center justify-center text-zinc-600 hover:text-zinc-400 hover:border-zinc-700 transition-all cursor-pointer group">
                          <ImageIcon size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                          <span className="text-[10px] font-bold uppercase">Add Photo</span>
                        </div>
                        <div className="aspect-square bg-zinc-950 rounded-xl border border-zinc-800 flex flex-col items-center justify-center text-zinc-600 hover:text-zinc-400 hover:border-zinc-700 transition-all cursor-pointer group">
                          <FileText size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                          <span className="text-[10px] font-bold uppercase">Add Document</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-orange-500/5 border border-orange-500/20 rounded-2xl">
                      <div className="flex items-center gap-3 text-orange-500 mb-3">
                        <AlertTriangle size={20} />
                        <h3 className="text-sm font-bold uppercase tracking-wider">QC Alert</h3>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        This is the 3rd alignment failure on Line 1 this week. AI suggests recalibrating Machine M2.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-2xl">
                <ShieldCheck className="text-zinc-700 mb-4" size={48} />
                <h3 className="text-xl font-bold text-zinc-500">Select a report to view details</h3>
                <p className="text-sm text-zinc-600 mt-2">Manage inspections, defects, and quality standards.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
