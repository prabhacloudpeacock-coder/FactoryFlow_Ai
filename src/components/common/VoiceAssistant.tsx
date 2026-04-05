import { useState, useEffect } from 'react';
import { Mic, MicOff, X, Loader2, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

export default function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  const handleToggleListen = () => {
    if (isListening) {
      setIsListening(false);
      processCommand(transcript);
    } else {
      setIsListening(true);
      setTranscript('');
      setResponse('');
      // Simulate listening
      setTimeout(() => {
        setTranscript('Show me the predictive maintenance alerts for CNC Machine 1');
      }, 1500);
      setTimeout(() => {
        setIsListening(false);
        processCommand('Show me the predictive maintenance alerts for CNC Machine 1');
      }, 3000);
    }
  };

  const processCommand = (cmd: string) => {
    if (!cmd) return;
    setResponse('Analyzing command...');
    setTimeout(() => {
      setResponse('Navigating to Predictive Maintenance. CNC Machine 1 shows a 85% probability of spindle bearing failure in the next 4 days.');
      toast.success('Voice command executed');
    }, 1500);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 p-4 rounded-full shadow-2xl z-50 transition-all duration-300 group",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100 bg-orange-500 hover:bg-orange-600 text-zinc-950"
        )}
      >
        <Mic size={24} className="group-hover:scale-110 transition-transform" />
        <span className="absolute -top-2 -right-2 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 border-2 border-zinc-950"></span>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-80 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-zinc-800/50 flex justify-between items-center bg-zinc-950/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Volume2 size={16} className="text-orange-500" />
                </div>
                <span className="font-bold text-zinc-100">ERP Voice AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-end min-h-[200px]">
              {transcript && (
                <div className="mb-4 text-right">
                  <span className="inline-block bg-zinc-800 text-zinc-300 px-4 py-2 rounded-2xl rounded-tr-sm text-sm">
                    "{transcript}"
                  </span>
                </div>
              )}
              {response && (
                <div className="mb-4 text-left">
                  <span className="inline-block bg-orange-500/10 text-orange-500 border border-orange-500/20 px-4 py-2 rounded-2xl rounded-tl-sm text-sm">
                    {response}
                  </span>
                </div>
              )}
              {!transcript && !response && (
                <div className="text-center text-zinc-500 text-sm mb-4">
                  {isListening ? "Listening..." : "Tap the mic and speak"}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-zinc-800/50 flex justify-center bg-zinc-950/50">
              <button
                onClick={handleToggleListen}
                className={cn(
                  "p-4 rounded-full transition-all duration-300 relative",
                  isListening 
                    ? "bg-red-500/20 text-red-500 hover:bg-red-500/30" 
                    : "bg-orange-500 text-zinc-950 hover:bg-orange-600 shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                )}
              >
                {isListening && (
                  <span className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-50"></span>
                )}
                {isListening ? <MicOff size={24} /> : <Mic size={24} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
