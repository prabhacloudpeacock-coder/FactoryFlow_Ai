import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { UserProfile, UserRole } from './types';
import { LayoutDashboard, Users, Factory, Beaker, LogOut, Settings, Menu, X, ChevronRight, Activity, Package, Briefcase, BookOpen, Barcode as BarcodeIcon, Home, User, Grid, ShoppingCart, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { cn } from './lib/utils';
import { clsx } from 'clsx';
import { hasPermission } from './lib/permissions';
import { sync } from './lib/sync';

// Components
import Dashboard from './components/erp/dashboard';
import MES from './components/erp/mes';
import ShopFloor from './components/erp/shopfloor';
import PLC from './components/erp/plc';
import Quality from './components/erp/quality';
import BOM from './components/erp/bom';
import Inventory from './components/erp/inventory';
import Maintenance from './components/erp/maintenance';
import OEE from './components/erp/oee';
import Workforce from './components/erp/workforce';
import Alerts from './components/erp/alerts';
import Reports from './components/erp/reports';
import Integration from './components/erp/integration';
import SettingsPage from './components/erp/settings';
import MasterData from './components/erp/master';
import MasterProduct from './components/erp/master_product';
import WorkInstructions from './components/erp/work-instructions';
import AI from './components/erp/ai';
import Documentation from './components/erp/docs';
import Barcode from './components/erp/barcode';
import CRM from './components/erp/crm';
import Finance from './components/erp/finance';
import BI from './components/erp/bi';
import Engineering from './components/erp/engineering';
import HRManagement from './components/erp/hr';
import VoiceAssistant from './components/common/VoiceAssistant';
import OfflineStatus from './components/common/OfflineStatus';
import Header from './components/common/Header';
import SecurityProvider from './components/security/SecurityProvider';

import ECommerce from './components/erp/ecommerce';
import Purchasing from './components/erp/purchasing';

const MOCK_USERS: Record<UserRole, UserProfile> = {
  'super-admin': {
    uid: 'super-admin-123',
    email: 'super@industrial.com',
    displayName: 'Super Admin',
    role: 'super-admin',
    createdAt: new Date().toISOString(),
  },
  'admin': {
    uid: 'admin-123',
    email: 'admin@industrial.com',
    displayName: 'Industrial Admin',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  'operator': {
    uid: 'operator-123',
    email: 'operator@industrial.com',
    displayName: 'Machine Operator',
    role: 'operator',
    createdAt: new Date().toISOString(),
  },
  'engineer': {
    uid: 'engineer-123',
    email: 'engineer@industrial.com',
    displayName: 'Process Engineer',
    role: 'engineer',
    createdAt: new Date().toISOString(),
  },
};

const Logo = () => {
  const logo = localStorage.getItem('brand-logo');
  return <img src={logo || '/src/assets/logo.png'} alt="FactoryFlow AI Logo" className="w-full h-full object-contain" />;
};

function AnimatedButton({ onClick, children, className }: any) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={clsx("relative overflow-hidden group px-4 py-3 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-3 w-full", className)}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 opacity-0 group-hover:opacity-20 blur-xl transition duration-500"></span>
      <span className="relative z-10 flex items-center justify-center gap-3 w-full">{children}</span>
    </motion.button>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

const RouteWrapper = ({ element, permissionId, profile }: { element: React.ReactNode, permissionId?: string, profile: UserProfile | null }) => {
  if (permissionId && !hasPermission(profile?.role || 'operator', permissionId)) {
    return <Navigate to="/" />;
  }
  return <PageTransition>{element}</PageTransition>;
};

function AnimatedRoutes({ profile }: { profile: UserProfile | null }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<RouteWrapper profile={profile} element={<Dashboard />} />} />
        <Route path="/mes" element={<RouteWrapper profile={profile} permissionId="mes" element={<MES />} />} />
        <Route path="/shopfloor" element={<RouteWrapper profile={profile} permissionId="shopfloor" element={<ShopFloor />} />} />
        <Route path="/plc" element={<RouteWrapper profile={profile} permissionId="plc" element={<PLC />} />} />
        <Route path="/quality" element={<RouteWrapper profile={profile} permissionId="quality" element={<Quality />} />} />
        <Route path="/bom" element={<RouteWrapper profile={profile} permissionId="bom" element={<BOM />} />} />
        <Route path="/inventory" element={<RouteWrapper profile={profile} permissionId="inventory" element={<Inventory />} />} />
        <Route path="/purchasing" element={<RouteWrapper profile={profile} permissionId="inventory" element={<Purchasing />} />} />
        <Route path="/maintenance" element={<RouteWrapper profile={profile} permissionId="maintenance" element={<Maintenance />} />} />
        <Route path="/oee" element={<RouteWrapper profile={profile} permissionId="oee" element={<OEE />} />} />
        <Route path="/workforce" element={<RouteWrapper profile={profile} permissionId="workforce" element={<Workforce />} />} />
        <Route path="/alerts" element={<RouteWrapper profile={profile} permissionId="alerts" element={<Alerts />} />} />
        <Route path="/reports" element={<RouteWrapper profile={profile} permissionId="reports" element={<Reports />} />} />
        <Route path="/integration" element={<RouteWrapper profile={profile} permissionId="integration" element={<Integration />} />} />
        
        {/* Restricted Routes */}
        <Route path="/master" element={<RouteWrapper profile={profile} permissionId="master" element={<MasterData />} />} />
        <Route path="/master-product" element={<RouteWrapper profile={profile} permissionId="master" element={<MasterProduct />} />} />
        <Route path="/work-instructions" element={<RouteWrapper profile={profile} permissionId="shopfloor" element={<WorkInstructions />} />} />
        <Route path="/settings" element={<RouteWrapper profile={profile} permissionId="settings" element={<SettingsPage profile={profile} />} />} />
        
        <Route path="/ai" element={<RouteWrapper profile={profile} permissionId="ai" element={<AI />} />} />
        <Route path="/docs" element={<RouteWrapper profile={profile} permissionId="docs" element={<Documentation />} />} />
        <Route path="/barcode" element={<RouteWrapper profile={profile} permissionId="barcode" element={<Barcode />} />} />
        <Route path="/crm" element={<RouteWrapper profile={profile} permissionId="crm" element={<CRM />} />} />
        <Route path="/ecommerce" element={<RouteWrapper profile={profile} permissionId="crm" element={<ECommerce />} />} />
        <Route path="/finance" element={<RouteWrapper profile={profile} permissionId="finance" element={<Finance />} />} />
        <Route path="/bi" element={<RouteWrapper profile={profile} permissionId="bi" element={<BI />} />} />
        <Route path="/engineering" element={<RouteWrapper profile={profile} permissionId="engineering" element={<Engineering />} />} />
        <Route path="/hr" element={<RouteWrapper profile={profile} permissionId="hr" element={<HRManagement />} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
}

const getMenuItems = (role: UserRole = 'operator') => [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  
  // Engineering & Design
  { path: '/engineering', icon: Settings, label: 'Engineering', id: 'engineering' },
  { path: '/bom', icon: Package, label: 'BOM & Routing', id: 'bom' },
  { path: '/master-product', icon: Grid, label: 'Master Product', id: 'master' },
  
  // Sales & Procurement
  { path: '/crm', icon: Briefcase, label: 'Sales & CRM', id: 'crm' },
  { path: '/ecommerce', icon: ShoppingCart, label: 'B2B E-Commerce', id: 'crm' },
  { path: '/purchasing', icon: ClipboardList, label: 'Purchasing', id: 'inventory' },
  
  // Inventory & Logistics
  { path: '/inventory', icon: Package, label: 'Inventory', id: 'inventory' },
  { path: '/barcode', icon: BarcodeIcon, label: 'Barcode', id: 'barcode' },
  
  // Production Execution
  { path: '/mes', icon: Factory, label: 'MES Core', id: 'mes' },
  { path: '/shopfloor', icon: Activity, label: 'Shop Floor', id: 'shopfloor' },
  { path: '/work-instructions', icon: BookOpen, label: 'Work Instructions', id: 'shopfloor' },
  { path: '/plc', icon: Activity, label: 'PLC Integration', id: 'plc' },
  
  // Quality & Maintenance
  { path: '/quality', icon: Beaker, label: 'Quality Control', id: 'quality' },
  { path: '/maintenance', icon: Settings, label: 'Maintenance', id: 'maintenance' },
  
  // Performance & Intelligence
  { path: '/oee', icon: Activity, label: 'OEE Management', id: 'oee' },
  { path: '/bi', icon: Activity, label: 'Business Intelligence', id: 'bi' },
  { path: '/ai', icon: Activity, label: 'AI Features', id: 'ai' },
  { path: '/reports', icon: Activity, label: 'Reports', id: 'reports' },
  
  // Organization & Admin
  { path: '/finance', icon: Package, label: 'Finance', id: 'finance' },
  { path: '/hr', icon: Users, label: 'HR Management', id: 'hr' },
  { path: '/workforce', icon: Users, label: 'Workforce', id: 'workforce' },
  { path: '/alerts', icon: Activity, label: 'Alerts', id: 'alerts' },
  { path: '/integration', icon: Activity, label: 'Integration', id: 'integration' },
  { path: '/master', icon: Settings, label: 'Master Data', id: 'master' },
  { path: '/docs', icon: BookOpen, label: 'Documentation', id: 'docs' },
  { path: '/settings', icon: Settings, label: 'Settings', id: 'settings' },
].filter(item => hasPermission(role, item.id));

function MobileNavigation({ profile, onLogout }: { profile: UserProfile | null, onLogout: () => void }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = getMenuItems(profile?.role);
  
  const bottomNavItems = [
    { path: '/', icon: Home, label: 'Home', id: 'dashboard' },
    { path: '/mes', icon: Factory, label: 'MES', id: 'mes' },
    { path: '/shopfloor', icon: Activity, label: 'Shop', id: 'shopfloor' },
  ].filter(item => hasPermission(profile?.role || 'operator', item.id));

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  if (bottomNavItems.length === 0) return null;

  return (
    <>
      <div className="md:hidden fixed bottom-4 left-4 right-4 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl px-6 py-3 flex justify-between items-center shadow-2xl z-40">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path && !isOpen;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="relative flex flex-col items-center cursor-pointer p-2"
            >
              {isActive && (
                <motion.div
                  layoutId="activeBottomTab"
                  className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-xl blur-sm"
                />
              )}
              <motion.div whileTap={{ scale: 0.9 }}>
                <Icon className={clsx("z-10 relative transition-colors", isActive ? "text-orange-500" : "text-zinc-400")} size={24} />
              </motion.div>
              <span className={clsx("text-[10px] mt-1 font-medium transition-colors", isActive ? "text-orange-500" : "text-zinc-500")}>{item.label}</span>
            </Link>
          );
        })}
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex flex-col items-center cursor-pointer p-2"
        >
          {isOpen && (
            <motion.div
              layoutId="activeBottomTab"
              className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-xl blur-sm"
            />
          )}
          <motion.div whileTap={{ scale: 0.9 }}>
            <Menu className={clsx("z-10 relative transition-colors", isOpen ? "text-orange-500" : "text-zinc-400")} size={24} />
          </motion.div>
          <span className={clsx("text-[10px] mt-1 font-medium transition-colors", isOpen ? "text-orange-500" : "text-zinc-500")}>Menu</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100) setIsOpen(false);
              }}
              className="md:hidden fixed bottom-0 left-0 right-0 h-[85vh] bg-zinc-950 border-t border-zinc-800 rounded-t-3xl z-50 flex flex-col overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="w-full flex justify-center py-3 shrink-0">
                <div className="w-12 h-1.5 bg-zinc-800 rounded-full" />
              </div>
              
              <div className="px-6 pb-4 shrink-0 flex items-center justify-between border-b border-zinc-800/50">
                <div>
                  <h2 className="text-xl font-bold text-zinc-100">Menu</h2>
                  <p className="text-sm text-zinc-500">{profile?.displayName}</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 bg-zinc-900 rounded-full text-zinc-400 hover:text-zinc-100">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                <div className="grid grid-cols-2 gap-3">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02 }}
                      >
                        <Link
                          to={item.path}
                          className={clsx(
                            "flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border transition-all",
                            isActive 
                              ? "bg-orange-500/10 border-orange-500/30 text-orange-500" 
                              : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                          )}
                        >
                          <Icon size={24} className={isActive ? "text-orange-500" : "text-zinc-400"} />
                          <span className="text-xs font-medium text-center">{item.label}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 shrink-0 border-t border-zinc-800/50 bg-zinc-950 pb-24">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl transition-all font-bold"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function App() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [tenant, setTenant] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenant || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      let role: UserRole = 'operator';
      const lowerEmail = email.toLowerCase();
      if (lowerEmail.includes('super')) role = 'super-admin';
      else if (lowerEmail.includes('admin') || lowerEmail.includes('demo')) role = 'admin';
      else if (lowerEmail.includes('engineer')) role = 'engineer';

      const selectedUser = { ...MOCK_USERS[role], email };
      
      // Update sync tenant
      const tenantId = tenant.toLowerCase().replace(/\s+/g, '-');
      sync.setTenant(tenantId);

      setUser(selectedUser);
      setProfile(selectedUser);
      setLoading(false);
      toast.success(`Logged in to ${tenant} as ${role}`);
    }, 800);
  };

  const handleLogout = () => {
    setUser(null);
    setProfile(null);
    toast.success('Logged out successfully');
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-zinc-950 text-zinc-100">
        <div className="flex flex-col items-center gap-4">
          <Activity className="w-12 h-12 text-orange-500 animate-pulse" />
          <p className="text-sm font-mono tracking-widest uppercase opacity-50">Initializing System...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-zinc-950 p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-20 h-20 flex items-center justify-center">
              <Logo />
            </div>
            <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">FactoryFlow AI</h1>
          </div>
          <h2 className="text-xl font-semibold text-zinc-100 mb-6">Access Workspace</h2>
          
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Tenant Name</label>
              <input 
                type="text" 
                value={tenant}
                onChange={(e) => setTenant(e.target.value)}
                placeholder="e.g. Alpha Manufacturing"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@industrial.com"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                required
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full relative overflow-hidden group px-4 py-3 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-zinc-950"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 opacity-0 group-hover:opacity-20 blur-xl transition duration-500"></span>
                <span className="relative z-10 flex items-center justify-center gap-3 w-full">Sign In to Workspace</span>
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-zinc-500">
              Demo Credentials: <br/>
              <span className="text-zinc-400">demo@industrial.com</span><br/>
              (Any password works for demo)
            </p>
          </div>
        </motion.div>
        <Toaster position="bottom-right" theme="dark" />
      </div>
    );
  }

  const isSuperAdmin = profile?.role === 'super-admin';

  return (
    <SecurityProvider>
      <Router>
        <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
          <Sidebar profile={profile} onLogout={handleLogout} />
          <main className="flex-1 overflow-y-auto relative pb-20 md:pb-0">
            <Header profile={profile} onLogout={handleLogout} />
            <div className="p-4 md:p-8 max-w-7xl mx-auto">
              <AnimatedRoutes profile={profile} />
            </div>
          </main>
          <MobileNavigation profile={profile} onLogout={handleLogout} />
          <VoiceAssistant />
          <OfflineStatus />
          <Toaster position="bottom-right" theme="dark" />
        </div>
      </Router>
    </SecurityProvider>
  );
}

function ModulesModal({ isOpen, onClose, menuItems }: { isOpen: boolean, onClose: () => void, menuItems: any[] }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl max-h-[85vh] bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-6 border-b border-zinc-800/50 flex justify-between items-center bg-zinc-900/50">
              <div>
                <h2 className="text-2xl font-bold text-zinc-100">All Modules</h2>
                <p className="text-zinc-500 text-sm mt-1">Select a module to navigate</p>
              </div>
              <button onClick={onClose} className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-zinc-100 transition-colors border border-zinc-800">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-zinc-950/50">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                    >
                      <Link
                        to={item.path}
                        onClick={onClose}
                        className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 hover:bg-orange-500/10 hover:border-orange-500/30 transition-all group h-full"
                      >
                        <Icon size={32} className="text-zinc-400 group-hover:text-orange-500 transition-colors" />
                        <span className="text-sm font-medium text-zinc-300 group-hover:text-orange-500 text-center">{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Sidebar({ profile, onLogout }: { profile: UserProfile | null, onLogout: () => void }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [showAllModal, setShowAllModal] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const menuItems = getMenuItems(profile?.role);
  
  const primaryCount = 6;
  const primaryItems = menuItems.slice(0, primaryCount);
  const isCurrentInPrimary = primaryItems.some(item => item.path === location.pathname);
  
  let displayedItems = [...primaryItems];
  if (!isCurrentInPrimary) {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    if (currentItem) {
      displayedItems.push(currentItem);
    }
  }

  return (
    <>
      <aside className={clsx(
        "hidden md:flex bg-zinc-900 border-r border-zinc-800 transition-all duration-300 flex-col z-30",
        isOpen ? "w-64" : "w-20"
      )}>
        <div className={clsx("p-6 flex items-center", isOpen ? "justify-between" : "justify-center")}>
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex items-center gap-3 overflow-hidden whitespace-nowrap"
              >
                <div className="w-12 h-12 flex items-center justify-center shrink-0">
                  <Logo />
                </div>
                <span className="font-bold tracking-tight">FactoryFlow AI</span>
              </motion.div>
            )}
          </AnimatePresence>
          <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-zinc-800 rounded text-zinc-400 shrink-0">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="relative flex-1 flex flex-col overflow-hidden">
          <nav ref={navRef} className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
            {displayedItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.2 }}
                >
                  <Link
                    to={item.path}
                    className={clsx(
                      "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all group overflow-hidden",
                      isActive 
                        ? "text-orange-500" 
                        : "text-zinc-400 hover:text-zinc-100"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSidebarTab"
                        className="absolute inset-0 bg-orange-500/10 border border-orange-500/20 rounded-xl"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="activeSidebarGlow"
                        className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-orange-500 rounded-r-full shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <motion.div whileHover={{ x: 5, scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative z-10 shrink-0">
                      <Icon size={20} className={clsx(isActive ? "text-orange-500" : "group-hover:text-zinc-100")} />
                    </motion.div>
                    <AnimatePresence mode="wait">
                      {isOpen && (
                        <motion.span 
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="font-medium whitespace-nowrap relative z-10"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {isOpen && isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="ml-auto shrink-0 relative z-10"
                        >
                          <ChevronRight size={16} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Link>
                </motion.div>
              );
            })}

            {menuItems.length > primaryCount && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: displayedItems.length * 0.03, duration: 0.2 }}
              >
                <button
                  onClick={() => setShowAllModal(true)}
                  className={clsx(
                    "w-full relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all group overflow-hidden text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 border border-transparent hover:border-zinc-700",
                    !isOpen && "justify-center"
                  )}
                >
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative z-10 shrink-0">
                    <Grid size={20} className="group-hover:text-zinc-100" />
                  </motion.div>
                  <AnimatePresence mode="wait">
                    {isOpen && (
                      <motion.span 
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium whitespace-nowrap relative z-10"
                      >
                        View All Modules
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            )}
          </nav>
        </div>

        <div className="p-4 border-t border-zinc-800">
          <AnimatePresence>
            {isOpen && profile && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 px-4 py-3 bg-zinc-800/50 rounded-xl border border-zinc-800 overflow-hidden"
              >
                <p className="text-xs font-mono text-zinc-500 uppercase mb-1">Active Session</p>
                <p className="text-sm font-bold truncate">{profile.displayName || profile.email}</p>
                <p className="text-[10px] text-orange-500 font-mono uppercase tracking-wider mt-1">{profile.role}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={onLogout}
            className={clsx(
              "w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all overflow-hidden",
              !isOpen && "justify-center"
            )}
          >
            <LogOut size={20} className="shrink-0" />
            <AnimatePresence>
              {isOpen && (
                <motion.span 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-medium whitespace-nowrap"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </aside>

      <ModulesModal 
        isOpen={showAllModal} 
        onClose={() => setShowAllModal(false)} 
        menuItems={menuItems} 
      />
    </>
  );
}

export default App;
