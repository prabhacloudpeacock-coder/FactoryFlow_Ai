import React, { useState, useEffect } from 'react';
import { Bell, X, AlertTriangle, Clock, CheckCircle2, Info, Trash2, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { formatDistanceToNow } from 'date-fns';

export type NotificationType = 'critical' | 'maintenance' | 'info' | 'success';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  read: boolean;
  link?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Critical Alert: Motor Overheat',
    message: 'Main Motor on Line 2 has exceeded 85°C. Immediate inspection required.',
    type: 'critical',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    read: false,
    link: '/plc'
  },
  {
    id: '2',
    title: 'Upcoming Maintenance',
    message: 'Scheduled maintenance for Frame Welding Station (M001) in 2 hours.',
    type: 'maintenance',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: false,
    link: '/maintenance'
  },
  {
    id: '3',
    title: 'Inventory Low',
    message: 'Stock for "48V Battery Pack" is below safety threshold (15 units remaining).',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    read: true,
    link: '/inventory'
  },
  {
    id: '4',
    title: 'Production Target Met',
    message: 'Shift B has successfully completed 100% of the daily target for Model S.',
    type: 'success',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    read: true,
    link: '/oee'
  }
];

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getTypeStyles = (type: NotificationType) => {
    switch (type) {
      case 'critical': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'maintenance': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'success': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      default: return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case 'critical': return <AlertTriangle size={16} />;
      case 'maintenance': return <Clock size={16} />;
      case 'success': return <CheckCircle2 size={16} />;
      default: return <Info size={16} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 shadow-2xl z-[101] flex flex-col"
          >
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bell className="text-zinc-400" size={24} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-zinc-950 text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-zinc-950">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-zinc-100">Notifications</h2>
                  <p className="text-xs text-zinc-500">{unreadCount} unread alerts</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={markAllAsRead}
                  className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-100 transition-colors"
                  title="Mark all as read"
                >
                  <CheckCircle2 size={18} />
                </button>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
              {notifications.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 border border-zinc-800">
                    <Bell className="text-zinc-700" size={24} />
                  </div>
                  <h3 className="text-zinc-300 font-bold">All caught up!</h3>
                  <p className="text-zinc-500 text-sm mt-1">No new notifications at this time.</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "relative p-4 rounded-2xl border transition-all group",
                      notification.read 
                        ? "bg-zinc-900/30 border-zinc-800/50 opacity-70" 
                        : "bg-zinc-900 border-zinc-800 shadow-lg"
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                        getTypeStyles(notification.type)
                      )}>
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={cn(
                            "text-sm font-bold truncate",
                            !notification.read ? "text-zinc-100" : "text-zinc-400"
                          )}>
                            {notification.title}
                          </h4>
                          <span className="text-[10px] text-zinc-500 whitespace-nowrap font-mono">
                            {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                          {notification.message}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <button className="text-[10px] font-bold uppercase tracking-widest text-orange-500 hover:text-orange-400 transition-colors">
                            View Details
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="p-1.5 text-zinc-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    {!notification.read && (
                      <div className="absolute top-4 right-4 w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
                    )}
                  </motion.div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-zinc-800 bg-zinc-900/30 flex items-center justify-between">
              <button 
                onClick={clearAll}
                className="text-xs font-bold text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-2"
              >
                <Trash2 size={14} /> Clear All
              </button>
              <button className="text-xs font-bold text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-2">
                <Settings size={14} /> Notification Settings
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
