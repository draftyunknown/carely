
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Users, CalendarCheck, Zap, TrendingUp } from 'lucide-react';

const mockData = [
  { name: 'Mon', conv: 400, bookings: 24, ai: 85 },
  { name: 'Tue', conv: 300, bookings: 13, ai: 88 },
  { name: 'Wed', conv: 200, bookings: 98, ai: 92 },
  { name: 'Thu', conv: 278, bookings: 39, ai: 90 },
  { name: 'Fri', conv: 189, bookings: 48, ai: 89 },
  { name: 'Sat', conv: 239, bookings: 38, ai: 95 },
  { name: 'Sun', conv: 349, bookings: 43, ai: 94 },
];

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-hover hover:shadow-md">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-slate-800`}>
        <Icon className={color.replace('bg-', 'text-')} size={24} />
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {change}
      </span>
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Business Overview</h1>
        <p className="text-slate-500">Welcome back. Your AI agent is currently handling 92% of queries.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Conversations" value="1,284" change="+12%" icon={Users} color="bg-indigo-500" />
        <StatCard title="Active Bookings" value="42" change="+18%" icon={CalendarCheck} color="bg-emerald-500" />
        <StatCard title="AI Handling Rate" value="92.4%" change="+2.4%" icon={Zap} color="bg-amber-500" />
        <StatCard title="Revenue (Estimated)" value="$12,450" change="+8%" icon={TrendingUp} color="bg-blue-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Conversation Volume</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData}>
                <defs>
                  <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Area type="monotone" dataKey="conv" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorConv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Booking Success</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                   contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="bookings" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
