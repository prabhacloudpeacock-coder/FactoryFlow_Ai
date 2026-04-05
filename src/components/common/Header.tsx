import React, { useState } from 'react';
import { Bell, Search, Settings, User, Menu, Activity, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile } from '../../types';
import NotificationPanel from './NotificationPanel';
import { cn } from '../../lib/utils';

interface HeaderProps {
  profile: UserProfile | null;
  onLogout: () => void;
}

export default function Header({ profile, onLogout }: HeaderProps) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-zinc-500 group-focus-within:text-orange-500 transition-colors" size={18} />
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search modules, work orders, or assets..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-2.5 pl-11 pr-4 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:bg-zinc-900 transition-all placeholder:text-zinc-600"
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <span className="text-[10px] font-mono text-zinc-700 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">⌘K</span>
          </div>
        </div>

        {/* Mobile Logo/Title */}
        <div className="flex md:hidden items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Activity className="text-zinc-950" size={18} />
          </div>
          <span className="font-bold text-lg tracking-tight">FactoryFlow</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Status Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-zinc-900/50 rounded-full border border-zinc-800/50">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">System Online</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setIsNotificationOpen(true)}
              className="p-2.5 bg-zinc-900/50 hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-orange-500 transition-all border border-zinc-800/50 relative group"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.6)] group-hover:scale-125 transition-transform" />
            </button>
          </div>

          {/* User Profile */}
          <div className="relative">
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-3 p-1.5 pr-3 bg-zinc-900/50 hover:bg-zinc-800 rounded-2xl border border-zinc-800/50 transition-all group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center border border-zinc-700 overflow-hidden">
                <User size={18} className="text-zinc-400 group-hover:text-zinc-100 transition-colors" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-zinc-100 truncate max-w-[100px]">{profile?.displayName || 'User'}</p>
                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">{profile?.role || 'Operator'}</p>
              </div>
              <ChevronDown size={14} className={cn("text-zinc-500 transition-transform", isUserMenuOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isUserMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl z-20 overflow-hidden"
                  >
                    <div className="p-4 border-b border-zinc-800 bg-zinc-950/50">
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Signed in as</p>
                      <p className="text-sm font-bold text-zinc-100 truncate">{profile?.email}</p>
                    </div>
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl transition-all">
                        <User size={16} /> Profile Settings
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl transition-all">
                        <Settings size={16} /> Preferences
                      </button>
                    </div>
                    <div className="p-2 border-t border-zinc-800">
                      <button 
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
                      >
                        <User size={16} /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <NotificationPanel 
        isOpen={isNotificationOpen} 
        onClose={() => setIsNotificationOpen(false)} 
      />
    </header>
  );
}
