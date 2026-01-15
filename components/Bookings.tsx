
import React from 'react';
import { Calendar as CalendarIcon, Clock, Filter, CheckCircle, Clock3 } from 'lucide-react';
import { Booking } from '../types';

const mockBookings: Booking[] = [
  { id: '1', customerName: 'Alice Thompson', serviceName: 'Botox Treatment', date: 'Oct 24, 2023 at 10:00 AM', status: 'confirmed' },
  { id: '2', customerName: 'Bob Henderson', serviceName: 'Dermal Fillers', date: 'Oct 24, 2023 at 02:30 PM', status: 'pending' },
  { id: '3', customerName: 'Clara Oswald', serviceName: 'Skin Rejuvenation', date: 'Oct 25, 2023 at 09:15 AM', status: 'confirmed' },
];

const Bookings: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-500">Manage your schedule and customer bookings.</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600"><Filter size={20} /></button>
          <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-100">+ Manual Booking</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 mb-4">
             <div className="flex-1 text-center border-r border-slate-100">
               <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Today</p>
               <p className="text-2xl font-black text-indigo-600">24</p>
             </div>
             <div className="flex-1 text-center border-r border-slate-100">
               <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Confirmed</p>
               <p className="text-2xl font-black text-emerald-600">12</p>
             </div>
             <div className="flex-1 text-center">
               <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Pending</p>
               <p className="text-2xl font-black text-amber-500">4</p>
             </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Service</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Date & Time</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {mockBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{booking.customerName}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{booking.serviceName}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1"><Clock size={14} className="text-indigo-400" /> {booking.date}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                          booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {booking.status === 'confirmed' ? <CheckCircle size={12}/> : <Clock3 size={12}/>}
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 font-bold hover:text-indigo-600 text-sm">Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-fit">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <CalendarIcon size={20} className="text-indigo-600" /> Calendar Sync
          </h3>
          <p className="text-sm text-slate-500 mb-6">Connect your favorite calendar to sync bookings and prevent double bookings.</p>
          <div className="space-y-3">
            <button className="w-full p-4 border border-slate-100 rounded-2xl flex items-center justify-between hover:bg-slate-50 transition-all">
              <div className="flex items-center gap-3">
                <img src="https://www.gstatic.com/images/branding/product/2x/calendar_2020q4_48dp.png" className="w-6 h-6" alt="Google" />
                <span className="font-bold text-slate-700">Google Calendar</span>
              </div>
              <span className="text-xs text-indigo-600 font-bold">Connect</span>
            </button>
            <button className="w-full p-4 border border-slate-100 rounded-2xl flex items-center justify-between hover:bg-slate-50 transition-all opacity-60">
              <div className="flex items-center gap-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg" className="w-6 h-6" alt="Outlook" />
                <span className="font-bold text-slate-700">Outlook</span>
              </div>
              <span className="text-xs text-slate-400">Coming Soon</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
