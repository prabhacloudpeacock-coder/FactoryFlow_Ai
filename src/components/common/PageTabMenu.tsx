import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { Grid, X } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: any;
  component?: React.ReactNode;
}

interface PageTabMenuProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  maxVisible?: number;
}

export default function PageTabMenu({ tabs, activeTab, setActiveTab, maxVisible = 5 }: PageTabMenuProps) {
  const [showAllModal, setShowAllModal] = useState(false);
  const layoutId = useId();

  const primaryTabs = tabs.slice(0, maxVisible);
  const isCurrentInPrimary = primaryTabs.some(tab => tab.id === activeTab);
  
  let displayedTabs = [...primaryTabs];
  if (!isCurrentInPrimary) {
    const currentTab = tabs.find(tab => tab.id === activeTab);
    if (currentTab) {
      displayedTabs.push(currentTab);
    }
  }

  return (
    <>
      <div className="w-full pb-4">
        <div className="flex flex-wrap gap-1.5 bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-800/50 backdrop-blur-xl">
          {displayedTabs.map(tab => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors rounded-xl whitespace-nowrap",
                  isActive ? "text-orange-500" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId={`activePageTab-${layoutId}`}
                    className="absolute inset-0 bg-orange-500/10 border border-orange-500/20 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon size={16} className="relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}

          {tabs.length > maxVisible && (
            <button
              onClick={() => setShowAllModal(true)}
              className="relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors rounded-xl whitespace-nowrap text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 border border-transparent hover:border-zinc-700"
            >
              <Grid size={16} className="relative z-10" />
              <span className="relative z-10">More</span>
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showAllModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAllModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-6 border-b border-zinc-800/50 flex justify-between items-center bg-zinc-900/50">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-100">All Tabs</h2>
                  <p className="text-zinc-500 text-sm mt-1">Select a section to view</p>
                </div>
                <button onClick={() => setShowAllModal(false)} className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-zinc-100 transition-colors border border-zinc-800">
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-zinc-950/50">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {tabs.map((tab, index) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <motion.div
                        key={tab.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02 }}
                      >
                        <button
                          onClick={() => {
                            setActiveTab(tab.id);
                            setShowAllModal(false);
                          }}
                          className={clsx(
                            "w-full flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border transition-all group h-full",
                            isActive 
                              ? "bg-orange-500/10 border-orange-500/30 text-orange-500" 
                              : "border-zinc-800/50 bg-zinc-900/30 hover:bg-orange-500/10 hover:border-orange-500/30"
                          )}
                        >
                          <Icon size={32} className={clsx("transition-colors", isActive ? "text-orange-500" : "text-zinc-400 group-hover:text-orange-500")} />
                          <span className={clsx("text-sm font-medium text-center", isActive ? "text-orange-500" : "text-zinc-300 group-hover:text-orange-500")}>{tab.label}</span>
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
