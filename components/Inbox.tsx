
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Send, User, Bot, AlertCircle, CheckCircle2, 
  MessageSquare, Tag, Phone, Mail, Clock, ShieldCheck,
  Zap, ChevronRight, CornerDownRight, MoreVertical
} from 'lucide-react';
import { Conversation, Message, ConversationStatus } from '../types';

const mockConversations: Conversation[] = [
  {
    id: '1',
    customerName: 'Sarah Jenkins',
    lastMessage: 'Can I book for tomorrow at 2 PM?',
    status: ConversationStatus.AI_HANDLED,
    updatedAt: new Date(),
    messages: [
      { id: 'm1', sender: 'user', content: 'Hi, I saw your clinic online.', timestamp: new Date() },
      { id: 'm2', sender: 'ai', content: 'Hello! I am Carely AI. How can I assist you today?', timestamp: new Date() },
      { id: 'm3', sender: 'user', content: 'Can I book for tomorrow at 2 PM?', timestamp: new Date() },
    ]
  },
  {
    id: '2',
    customerName: 'Mike Ross',
    lastMessage: 'I need to speak with a human.',
    status: ConversationStatus.HUMAN_REQUIRED,
    updatedAt: new Date(),
    messages: [
      { id: 'm4', sender: 'user', content: 'I have a very specific question about my treatment.', timestamp: new Date() },
      { id: 'm5', sender: 'user', content: 'I need to speak with a human.', timestamp: new Date() },
    ]
  }
];

const Inbox: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(mockConversations[0].id);
  const [conversations, setConversations] = useState(mockConversations);
  const [inputText, setInputText] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeChat = conversations.find(c => c.id === selectedId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeChat?.messages, isAiProcessing]);

  const handleSend = async () => {
    if (!inputText.trim() || !activeChat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'agent',
      content: inputText,
      timestamp: new Date()
    };

    setConversations(prev => prev.map(c => 
      c.id === selectedId ? { ...c, messages: [...c.messages, userMessage], lastMessage: inputText, status: ConversationStatus.OPEN } : c
    ));
    setInputText('');
  };

  const toggleStatus = (id: string) => {
    setConversations(prev => prev.map(c => 
      c.id === id ? { ...c, status: c.status === ConversationStatus.CLOSED ? ConversationStatus.OPEN : ConversationStatus.CLOSED } : c
    ));
  };

  const savedReplies = [
    "I'll look into your booking right now.",
    "Can you please confirm your email address?",
    "We are currently closed, but I'll check first thing tomorrow."
  ];

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      {/* 1. Conversations List */}
      <div className="w-80 border-r border-slate-100 flex flex-col bg-slate-50/30">
        <div className="p-6">
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
            Inbox <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-lg">24</span>
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-3 pb-6">
          {conversations.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedId(chat.id)}
              className={`w-full p-4 mb-2 flex gap-3 text-left transition-all rounded-2xl ${
                selectedId === chat.id 
                  ? 'bg-white shadow-lg shadow-indigo-500/10 border border-indigo-100' 
                  : 'hover:bg-white hover:shadow-sm'
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner">
                  {chat.customerName.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h4 className="font-bold text-slate-900 text-sm truncate">{chat.customerName}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">12m</span>
                </div>
                <p className="text-xs text-slate-500 truncate leading-relaxed">{chat.lastMessage}</p>
                <div className="mt-2 flex items-center gap-2">
                  {chat.status === ConversationStatus.HUMAN_REQUIRED && (
                    <span className="bg-rose-50 text-rose-600 text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-tighter flex items-center gap-1 border border-rose-100">
                      <AlertCircle size={10} strokeWidth={3} /> Human Needed
                    </span>
                  )}
                  {chat.status === ConversationStatus.AI_HANDLED && (
                    <span className="bg-indigo-50 text-indigo-600 text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-tighter flex items-center gap-1 border border-indigo-100">
                      <Zap size={10} fill="currentColor" /> AI Guided
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Chat Window */}
      <div className="flex-1 flex flex-col bg-white">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white/80 backdrop-blur-md z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg tracking-tight">{activeChat.customerName}</h3>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-widest">
                      <Clock size={12} /> Last active 2m ago
                    </span>
                    <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Live
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100">
                  <MoreVertical size={20} />
                </button>
                <button 
                  onClick={() => toggleStatus(activeChat.id)}
                  className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                    activeChat.status === ConversationStatus.CLOSED 
                      ? 'bg-slate-100 text-slate-500' 
                      : 'bg-slate-900 text-white shadow-xl shadow-slate-200 hover:bg-black'
                  }`}
                >
                  <CheckCircle2 size={16} />
                  {activeChat.status === ConversationStatus.CLOSED ? 'Re-open' : 'Resolve'}
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-6 bg-slate-50/20">
              {activeChat.messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[75%] group relative ${m.sender === 'user' ? 'pr-4' : 'pl-4'}`}>
                    <div className={`rounded-[2rem] p-5 shadow-sm border ${
                      m.sender === 'user' 
                        ? 'bg-white border-slate-100 text-slate-800 rounded-tl-none' 
                        : m.sender === 'ai' 
                          ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-tr-none border-transparent' 
                          : 'bg-slate-900 text-white rounded-tr-none border-transparent'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {m.sender === 'ai' && <Zap size={10} className="text-indigo-200" fill="currentColor" />}
                          <span className={`text-[9px] font-black uppercase tracking-widest opacity-60`}>
                            {m.sender === 'user' ? 'Customer' : m.sender === 'ai' ? 'Carely Core AI' : 'Internal Agent'}
                          </span>
                        </div>
                        <span className="text-[9px] opacity-40 font-bold">
                          {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed font-medium">{m.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isAiProcessing && (
                <div className="flex justify-start animate-pulse">
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-4 flex gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-6 bg-white border-t border-slate-100">
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                {savedReplies.map((reply, i) => (
                  <button 
                    key={i}
                    onClick={() => setInputText(reply)}
                    className="whitespace-nowrap px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-bold text-slate-500 hover:border-indigo-200 hover:text-indigo-600 transition-all flex items-center gap-2"
                  >
                    <CornerDownRight size={10} /> {reply}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 items-end">
                <div className="flex-1 bg-slate-50 rounded-3xl p-2 border border-slate-100 focus-within:ring-4 focus-within:ring-indigo-500/5 focus-within:border-indigo-500 transition-all">
                  <textarea
                    rows={1}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => {
                      if(e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Type an official response..."
                    className="w-full bg-transparent border-none focus:ring-0 text-sm px-4 py-2 min-h-[44px] max-h-32 resize-none"
                  />
                </div>
                <button 
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="bg-indigo-600 text-white p-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95 disabled:opacity-50 disabled:grayscale"
                >
                  <Send size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-12 text-center bg-slate-50/20">
             {/* Empty State placeholder */}
             <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl shadow-indigo-500/5 flex items-center justify-center mb-6">
                <MessageSquare size={40} className="text-indigo-100" />
             </div>
             <h3 className="text-xl font-black text-slate-900">Zero Inbound Backlog</h3>
             <p className="max-w-xs mt-3 text-sm text-slate-500 font-medium">Select a customer from the sidebar to view thread history and AI intelligence logs.</p>
          </div>
        )}
      </div>

      {/* 3. Customer Profile Panel (Right Sidebar) */}
      {activeChat && (
        <div className="w-72 border-l border-slate-100 bg-white flex flex-col animate-in slide-in-from-right-4 duration-300">
          <div className="p-6 border-b border-slate-50">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Intelligence Panel</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <Zap size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sentiment</p>
                  <p className="text-sm font-bold text-slate-900">Positive / High Intent</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Confidence</p>
                  <p className="text-sm font-bold text-slate-900">98.4% (Elite)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 flex-1 overflow-y-auto space-y-8">
            <section>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Tag size={12} /> Segments
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg border border-indigo-100">NEW_LEAD</span>
                <span className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] font-black rounded-lg border border-slate-200">AUTO_BOOKING</span>
              </div>
            </section>

            <section>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Contact Profile</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail size={14} />
                  <span className="text-xs font-bold truncate">s.jenkins@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Phone size={14} />
                  <span className="text-xs font-bold">+1 (555) 012-3456</span>
                </div>
              </div>
            </section>

            <section>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Integrations</h4>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white transition-all">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white rounded-lg shadow-sm flex items-center justify-center text-xs font-black text-blue-600">sf</div>
                  <span className="text-[10px] font-black text-slate-900">Salesforce Sync</span>
                </div>
                <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-500 transition-all" />
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inbox;
