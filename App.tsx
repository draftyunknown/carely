
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Inbox from './components/Inbox';
import Settings from './components/Settings';
import Bookings from './components/Bookings';
import { Sparkles, Mail, Apple, Github, ShieldCheck, ChevronRight } from 'lucide-react';

type View = 'dashboard' | 'inbox' | 'bookings' | 'settings';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);

  // Simulate Social Auth callback
  const handleSocialLogin = (provider: 'google' | 'apple') => {
    setIsLoading(true);
    // Mimicking OAuth Redirect & Callback loop
    setTimeout(() => {
      setIsAuthenticated(true);
      setUser({
        name: provider === 'google' ? 'Alex Rivera' : 'Private User',
        email: provider === 'google' ? 'alex.rivera@gmail.com' : 'user_relay@appleid.com',
        avatar: provider === 'google' ? 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' : undefined
      });
      setIsLoading(false);
    }, 1200);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'inbox': return <Inbox />;
      case 'bookings': return <Bookings />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-white">
        <div className="max-w-md w-full animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-[2rem] text-white shadow-2xl shadow-indigo-200 mb-6">
              <Sparkles size={40} />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Carely</h1>
            <p className="text-slate-500 mt-2 font-medium">Production-grade AI Customer Operations</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">Verifying Identity...</p>
              </div>
            )}
            
            <div className="space-y-4">
              <button 
                onClick={() => handleSocialLogin('google')}
                className="w-full flex items-center justify-between px-6 py-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-4">
                  <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-6 h-6" alt="Google" />
                  <span className="font-bold text-slate-700">Continue with Google</span>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => handleSocialLogin('apple')}
                className="w-full flex items-center justify-between px-6 py-4 bg-slate-900 text-white rounded-2xl hover:bg-black hover:shadow-xl transition-all group"
              >
                <div className="flex items-center gap-4">
                  <Apple size={22} fill="white" />
                  <span className="font-bold">Sign in with Apple</span>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                <div className="relative flex justify-center text-xs uppercase font-black text-slate-400 tracking-[0.2em]"><span className="bg-white px-4">OR</span></div>
              </div>

              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="name@business.com" 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-sm font-medium transition-all"
                />
                <button className="w-full py-4 bg-indigo-50 text-indigo-600 font-black rounded-2xl hover:bg-indigo-100 transition-all uppercase tracking-widest text-[11px]">
                  Continue with Email
                </button>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Enterprise-Grade Security Enforced</span>
            </div>
          </div>

          <p className="text-center text-[10px] text-slate-400 mt-8 font-medium px-10">
            By signing in, you agree to our <span className="text-indigo-500 font-bold underline cursor-pointer">Terms of Service</span> and acknowledge our <span className="text-indigo-500 font-bold underline cursor-pointer">Data Processing Agreement (GDPR)</span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar currentView={currentView} setView={setCurrentView} user={user} onLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto relative p-4 md:p-8">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
