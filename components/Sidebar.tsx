
import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Calendar, 
  Settings as SettingsIcon,
  Sparkles,
  Zap,
  ShieldAlert,
  LogOut,
  ChevronUp
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setView: (view: any) => void;
  user: { name: string; email: string; avatar?: string } | null;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, user, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inbox', label: 'Inbox', icon: MessageSquare, badge: '2' },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'settings', label: 'AI & Settings', icon: SettingsIcon },
  ];

  return (
    <div className="w-20 md:w-64 bg-white border-r border-slate-100 flex flex-col z-50">
      <div className="p-8 flex items-center gap-4">
        <div className="bg-indigo-600 w-12 h-12 rounded-[1rem] text-white shadow-2xl shadow-indigo-200 flex items-center justify-center relative group">
          <Sparkles size={28} className="group-hover:scale-110 transition-transform" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
        </div>
        <div className="hidden md:block">
          <span className="font-black text-2xl tracking-tighter text-slate-900 leading-none block">Carely</span>
          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Enterprise</span>
        </div>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center justify-between px-5 py-4 rounded-[1.25rem] transition-all group ${
              currentView === item.id 
                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 font-bold' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-4">
              <item.icon size={22} strokeWidth={currentView === item.id ? 2.5 : 2} />
              <span className="hidden md:block text-sm tracking-tight">{item.label}</span>
            </div>
            {item.badge && currentView !== item.id && (
              <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-lg font-black hidden md:block">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 space-y-4">
        {/* AI Usage Indicator */}
        <div className="bg-slate-900 rounded-[1.5rem] p-5 shadow-lg hidden md:block">
          <div className="flex justify-between items-center mb-3">
             <p className="text-white text-[9px] font-black uppercase tracking-widest opacity-60">Usage</p>
             <Zap size={10} className="text-amber-400" fill="currentColor" />
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-[65%] rounded-full"></div>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="relative group">
          <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-100">
            {user?.avatar ? (
              <img src={user.avatar} className="w-10 h-10 rounded-xl shadow-sm" alt="Avatar" />
            ) : (
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
                {user?.name.charAt(0)}
              </div>
            )}
            <div className="flex-1 hidden md:block min-w-0">
              <p className="text-xs font-black text-slate-900 truncate tracking-tight">{user?.name || 'Guest Admin'}</p>
              <p className="text-[10px] text-slate-400 font-bold truncate">Pro Plan</p>
            </div>
            <ChevronUp size={14} className="text-slate-300 hidden md:block group-hover:text-slate-500 transition-colors" />
          </div>

          {/* User Tooltip/Dropdown Menu */}
          <div className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors text-xs font-black uppercase tracking-widest"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
