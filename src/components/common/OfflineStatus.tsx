import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, CloudOff, Cloud } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sync } from '../../lib/sync';
import { cn } from '../../lib/utils';

export default function OfflineStatus() {
  const [isOnline, setIsOnline] = useState(sync.getOnlineStatus());
  const [queueCount, setQueueCount] = useState(0);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const unsubscribe = sync.onStatusChange((online, count) => {
      setIsOnline(online);
      setQueueCount(count);
      setShowStatus(true);
      // Hide status after 5 seconds if back online and queue is empty
      if (online && count === 0) {
        timer = setTimeout(() => setShowStatus(false), 5000);
      }
    });
    return () => {
      unsubscribe();
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {showStatus && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className={cn(
            "fixed bottom-24 md:bottom-8 right-8 z-[60] flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-xl transition-colors duration-500",
            isOnline 
              ? "bg-green-500/10 border-green-500/20 text-green-500" 
              : "bg-red-500/10 border-red-500/20 text-red-500"
          )}
        >
          <div className="relative">
            {isOnline ? (
              <Wifi size={20} className="animate-pulse" />
            ) : (
              <WifiOff size={20} />
            )}
            {!isOnline && (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 -right-1"
              >
                <RefreshCw size={10} />
              </motion.div>
            )}
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-widest">
              {isOnline ? 'Back Online' : 'Offline Mode'}
            </span>
            <span className="text-[10px] opacity-70">
              {isOnline 
                ? (queueCount > 0 ? `Syncing ${queueCount} items...` : 'System synchronized successfully')
                : (queueCount > 0 ? `${queueCount} items pending sync` : 'Changes will sync when reconnected')}
            </span>
          </div>

          {!isOnline && (
            <div className="w-px h-6 bg-red-500/20 mx-1" />
          )}
          
          {!isOnline && (
            <div className="flex items-center gap-1">
              <CloudOff size={14} className="opacity-50" />
              <span className="text-[10px] font-mono">Local Cache Active</span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
