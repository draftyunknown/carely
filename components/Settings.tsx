
import React, { useState } from 'react';
import { 
  Save, 
  Info, 
  BrainCircuit, 
  ListPlus, 
  Clock, 
  Trash2, 
  Edit2, 
  X, 
  Plus, 
  MessageCircleQuestion, 
  DollarSign, 
  Sparkles, 
  Check, 
  HelpCircle 
} from 'lucide-react';
import { BusinessProfile, Service, FAQ } from '../types';

interface WorkingDay {
  day: string;
  enabled: boolean;
  open: string;
  close: string;
}

const Settings: React.FC = () => {
  const [profile, setProfile] = useState<BusinessProfile>({
    name: 'Glow Medical Spa',
    industry: 'Medical Aesthetics',
    description: 'A boutique medical spa providing botox, fillers, and skin rejuvenation treatments with a focus on natural results.',
    personality: 'professional',
    services: [
      { id: '1', name: 'Botox Treatment', price: 300, duration: 30 },
      { id: '2', name: 'Dermal Fillers', price: 650, duration: 60 },
    ],
    faqs: [
      { id: '1', question: 'Do you take insurance?', answer: 'We do not accept health insurance as we provide elective cosmetic services.' },
      { id: '2', question: 'What is your cancellation policy?', answer: 'We require 24 hours notice for cancellations, otherwise a fee may apply.' }
    ]
  });

  const [workingHours, setWorkingHours] = useState<WorkingDay[]>([
    { day: 'Monday', enabled: true, open: '09:00', close: '18:00' },
    { day: 'Tuesday', enabled: true, open: '09:00', close: '18:00' },
    { day: 'Wednesday', enabled: true, open: '09:00', close: '18:00' },
    { day: 'Thursday', enabled: true, open: '09:00', close: '18:00' },
    { day: 'Friday', enabled: true, open: '09:00', close: '17:00' },
    { day: 'Saturday', enabled: false, open: '10:00', close: '14:00' },
    { day: 'Sunday', enabled: false, open: '10:00', close: '14:00' },
  ]);

  const [isSaving, setIsSaving] = useState(false);
  
  // Service State Management
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  
  // FAQ State Management
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);

  const saveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      console.log('Saved Profile:', profile);
    }, 1200);
  };

  const toggleDay = (index: number) => {
    const updated = [...workingHours];
    updated[index].enabled = !updated[index].enabled;
    setWorkingHours(updated);
  };

  // Service CRUD logic
  const handleOpenServiceModal = (service?: Service) => {
    setEditingService(service || { id: Date.now().toString(), name: '', price: 0, duration: 30 });
    setIsServiceModalOpen(true);
  };

  const handleSaveService = () => {
    if (!editingService) return;
    const exists = profile.services.find(s => s.id === editingService.id);
    const updatedServices = exists 
      ? profile.services.map(s => s.id === editingService.id ? editingService : s)
      : [...profile.services, editingService];
    
    setProfile({ ...profile, services: updatedServices });
    setIsServiceModalOpen(false);
    setEditingService(null);
  };

  const handleDeleteService = (id: string) => {
    setProfile({ ...profile, services: profile.services.filter(s => s.id !== id) });
  };

  // FAQ CRUD logic
  const handleOpenFAQModal = (faq?: FAQ) => {
    setEditingFAQ(faq || { id: Date.now().toString(), question: '', answer: '' });
    setIsFAQModalOpen(true);
  };

  const handleSaveFAQ = () => {
    if (!editingFAQ) return;
    const exists = profile.faqs.find(f => f.id === editingFAQ.id);
    const updatedFAQs = exists 
      ? profile.faqs.map(f => f.id === editingFAQ.id ? editingFAQ : f)
      : [...profile.faqs, editingFAQ];
    
    setProfile({ ...profile, faqs: updatedFAQs });
    setIsFAQModalOpen(false);
    setEditingFAQ(null);
  };

  const handleDeleteFAQ = (id: string) => {
    setProfile({ ...profile, faqs: profile.faqs.filter(f => f.id !== id) });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Sparkles className="text-indigo-600" /> AI & Business Settings
          </h1>
          <p className="text-slate-500 mt-1">Configure your AI agent's knowledge base, personality, and service list.</p>
        </div>
        <button 
          onClick={saveSettings}
          className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
        >
          {isSaving ? (
            <span className="flex items-center gap-2 italic opacity-80">Saving Changes...</span>
          ) : (
            <><Save size={18} /> Save Changes</>
          )}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-6">
          {/* AI Personality Toggle */}
          <section className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600">
                  <BrainCircuit size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 leading-tight">AI Personality</h2>
                  <p className="text-xs text-slate-400 font-medium">Define how the agent communicates</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {(['professional', 'friendly', 'witty'] as const).map((persona) => (
                <button
                  key={persona}
                  onClick={() => setProfile({ ...profile, personality: persona })}
                  className={`group relative p-5 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 active:scale-95 ${
                    profile.personality === persona
                      ? 'border-indigo-600 bg-indigo-50/40 ring-4 ring-indigo-500/5'
                      : 'border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-white'
                  }`}
                >
                  {profile.personality === persona && (
                    <div className="absolute top-3 right-3 bg-indigo-600 text-white rounded-full p-1 shadow-md animate-in zoom-in duration-300">
                      <Check size={12} strokeWidth={4} />
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    profile.personality === persona 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 rotate-0' 
                      : 'bg-white text-slate-400 group-hover:text-indigo-400 shadow-sm'
                  }`}>
                    {persona === 'professional' && <Info size={24} />}
                    {persona === 'friendly' && <Sparkles size={24} />}
                    {persona === 'witty' && <BrainCircuit size={24} />}
                  </div>
                  <div className="text-center">
                    <span className={`block capitalize font-bold text-sm tracking-tight ${
                      profile.personality === persona ? 'text-indigo-900' : 'text-slate-600'
                    }`}>
                      {persona}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* FAQ Knowledge Base Section */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                  <HelpCircle size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 leading-tight">Knowledge Base</h2>
                  <p className="text-xs text-slate-400 font-medium">Train your AI on common business queries</p>
                </div>
              </div>
              <button 
                onClick={() => handleOpenFAQModal()}
                className="bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 p-2 px-5 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-slate-200"
              >
                <Plus size={16} /> Add New FAQ
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {profile.faqs.map(faq => (
                <div key={faq.id} className="group p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-100 transition-all relative">
                  <div className="pr-16">
                    <div className="flex items-start gap-2 mb-3">
                      <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase px-2 py-0.5 rounded shrink-0">Q</span>
                      <p className="font-bold text-slate-900 text-sm">{faq.question}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase px-2 py-0.5 rounded shrink-0">A</span>
                      <p className="text-xs text-slate-500 leading-relaxed italic">"{faq.answer}"</p>
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    <button 
                      onClick={() => handleOpenFAQModal(faq)}
                      className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteFAQ(faq.id)}
                      className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              {profile.faqs.length === 0 && (
                <div className="text-center py-16 border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/50">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <MessageCircleQuestion className="text-slate-300" size={32} />
                  </div>
                  <h4 className="text-slate-900 font-bold mb-1">Knowledge Base is Empty</h4>
                  <p className="text-xs text-slate-400 max-w-[280px] mx-auto">Add your first FAQ entry to start training your AI assistant.</p>
                </div>
              )}
            </div>
          </section>

          {/* Business Profile */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-amber-50 p-2 rounded-xl text-amber-600">
                <Info size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Business Profile</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Business Name</label>
                <input 
                  type="text" 
                  value={profile.name}
                  onChange={e => setProfile({...profile, name: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none font-medium transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Business Description</label>
                <textarea 
                  rows={4}
                  value={profile.description}
                  onChange={e => setProfile({...profile, description: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-sm font-medium transition-all"
                />
              </div>
            </div>
          </section>
        </div>

        <div className="md:col-span-4 space-y-6">
          {/* Services Section */}
          <section className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-xl text-blue-600">
                  <ListPlus size={20} />
                </div>
                <h2 className="text-lg font-bold text-slate-900 leading-tight">Services</h2>
              </div>
              <button 
                onClick={() => handleOpenServiceModal()}
                className="text-indigo-600 text-xs font-bold hover:bg-indigo-50 p-2 px-3 rounded-xl flex items-center gap-1 border border-indigo-50 transition-all"
              >
                <Plus size={14} /> Add
              </button>
            </div>
            <div className="space-y-4">
              {profile.services.map(service => (
                <div key={service.id} className="group p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all relative">
                  <div className="pr-10">
                    <h4 className="text-sm font-bold text-slate-900 mb-2 truncate">{service.name}</h4>
                    <div className="flex flex-wrap items-center gap-2">
                       <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
                         <DollarSign size={10} />{service.price}
                       </span>
                       <span className="inline-flex items-center gap-1 text-[10px] text-slate-600 font-bold bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm">
                         <Clock size={10} className="text-indigo-400" />{service.duration} min
                       </span>
                    </div>
                  </div>
                  <div className="absolute top-5 right-5 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all">
                    <button 
                      onClick={() => handleOpenServiceModal(service)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={() => handleDeleteService(service.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Operating Hours */}
          <section className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-50 p-2 rounded-xl text-purple-600">
                <Clock size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-900 leading-tight">Hours</h2>
            </div>
            <div className="space-y-2">
              {workingHours.map((wh, idx) => (
                <div key={wh.day} className={`flex items-center justify-between p-3 rounded-2xl transition-all ${wh.enabled ? 'bg-slate-50' : 'opacity-40 grayscale'}`}>
                  <span className="text-[11px] font-black text-slate-900 uppercase tracking-tighter">{wh.day}</span>
                  <div className="flex items-center gap-2">
                    {wh.enabled && <span className="text-[10px] text-slate-500 font-medium">{wh.open}-{wh.close}</span>}
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-indigo-600 rounded" 
                      checked={wh.enabled} 
                      onChange={() => toggleDay(idx)} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* MODAL: Service Entry */}
      {isServiceModalOpen && editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-2xl font-black text-slate-900">Configure Service</h3>
              <button onClick={() => setIsServiceModalOpen(false)} className="text-slate-400 hover:text-slate-900">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Service Name</label>
                <input 
                  type="text" 
                  value={editingService.name}
                  onChange={e => setEditingService({...editingService, name: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold"
                  placeholder="e.g. Skin Consultation"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Price ($)</label>
                  <input 
                    type="number" 
                    value={editingService.price}
                    onChange={e => setEditingService({...editingService, price: Number(e.target.value)})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Duration (min)</label>
                  <input 
                    type="number" 
                    value={editingService.duration}
                    onChange={e => setEditingService({...editingService, duration: Number(e.target.value)})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold"
                  />
                </div>
              </div>
            </div>
            <div className="p-8 bg-slate-50/50 flex gap-4">
              <button onClick={() => setIsServiceModalOpen(false)} className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl font-black uppercase text-[11px]">Cancel</button>
              <button onClick={handleSaveService} className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[11px] shadow-lg shadow-indigo-100">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: FAQ Entry */}
      {isFAQModalOpen && editingFAQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-2xl font-black text-slate-900">Knowledge Entry</h3>
              <button onClick={() => setIsFAQModalOpen(false)} className="text-slate-400 hover:text-slate-900">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Customer Question</label>
                <input 
                  type="text" 
                  value={editingFAQ.question}
                  onChange={e => setEditingFAQ({...editingFAQ, question: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold"
                  placeholder="e.g. Do you have parking available?"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">AI Response Script</label>
                <textarea 
                  rows={5}
                  value={editingFAQ.answer}
                  onChange={e => setEditingFAQ({...editingFAQ, answer: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none text-sm leading-relaxed"
                  placeholder="The AI will use this exact information to answer customers..."
                />
              </div>
            </div>
            <div className="p-8 bg-slate-50/50 flex gap-4">
              <button onClick={() => setIsFAQModalOpen(false)} className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl font-black uppercase text-[11px]">Cancel</button>
              <button onClick={handleSaveFAQ} className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[11px] shadow-lg shadow-indigo-100">Train AI</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
