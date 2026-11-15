import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, ArrowLeft, Globe, Lock, CheckCircle2, 
  ChevronUp, ChevronDown, Edit3, Shuffle, Play, 
  BookOpen, Sparkles, RotateCcw, User, 
  Flame, Zap, Send, Sun, Moon, LogOut,
  Headphones, Mic, MicOff, Clock, Layers, Timer,
  MessageSquare, Keyboard, ShoppingBag, Trophy, Search,
  Bookmark, CheckSquare, Award, Target, Radio
} from 'lucide-react';

// Darslik fayllari
import { snu1A } from './data/snu1A.js';
import { snu1B } from './data/snu1B.js';
import { snu2A, snu2B } from './data/snu2AB.js';
import { snu3A, snu3B, snu4A, snu4B, snu5A, snu5B, snu6A, snu6B } from './data/snu3_6.js';

// Lug'at fayllari (1A ~ 6A)
import { vocab1A } from './data/vocab1A.js';
import { vocab1B } from './data/vocab1B.js';
import { vocab2A } from './data/vocab2A.js';
import { vocab2B } from './data/vocab2B.js';
import { vocab3A } from './data/vocab3A.js';
import { vocab3B } from './data/vocab3B.js';
import { vocab4A } from './data/vocab4A.js';
import { vocab4B } from './data/vocab4B.js';
import { vocab5A } from './data/vocab5A.js';
import { vocab5B } from './data/vocab5B.js';
import { vocab6A } from './data/vocab6A.js';

// ZiyoPrep Yashil Boyo'g'li Maskot
function ZiyoOwlAvatar({ className = 'w-12 h-12', equipped = {} }) {
  return (
    <div className={`${className} overflow-hidden shadow-md relative select-none`}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="60%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#86efac" />
          </linearGradient>
          <linearGradient id="owlBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#76e026" />
            <stop offset="100%" stopColor="#48b808" />
          </linearGradient>
          <linearGradient id="bookGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" rx="44" fill="url(#skyGrad)" />
        <ellipse cx="100" cy="185" rx="115" ry="45" fill="#4ade80" />
        <ellipse cx="100" cy="108" rx="64" ry="62" fill="url(#owlBody)" />
        <text x="86" y="75" textAnchor="middle" fill="#0f172a" fontSize="14.5" fontWeight="900" fontFamily="sans-serif">ZiyoPrep</text>
        <circle cx="72" cy="105" r="22" fill="#ffffff" />
        <circle cx="128" cy="105" r="22" fill="#ffffff" />
        <circle cx="76" cy="105" r="11.5" fill="#1e293b" />
        <circle cx="124" cy="105" r="11.5" fill="#1e293b" />
        <path d="M91 116 Q100 111 109 116 L100 129 Z" fill="#f59e0b" />
      </svg>
    </div>
  );
}

// 3D Stildagi AI Qizaloq Avatar (Emma / 토히르벡 AI)
function LiveAiAvatar({ isSpeaking, isListening }) {
  return (
    <div className="relative flex items-center justify-center py-6">
      {/* Orqa fon nur taratuvchi hoshiyalar */}
      <div className={`absolute w-44 h-44 rounded-full bg-emerald-500/20 blur-xl transition-all duration-700 ${isSpeaking || isListening ? 'scale-125 bg-emerald-400/40 animate-pulse' : 'scale-100'}`} />
      
      <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-emerald-500 shadow-2xl bg-gradient-to-b from-sky-400 to-emerald-600 flex flex-col items-center justify-center p-2">
        {/* Qizaloq yuzi SVG illustration */}
        <svg viewBox="0 0 150 150" className="w-full h-full drop-shadow-md">
          <circle cx="75" cy="75" r="70" fill="#fbcfe8" opacity="0.3" />
          {/* Sochlar */}
          <path d="M30 70 Q30 20 75 20 Q120 20 120 70 Q120 120 100 140 L50 140 Q30 120 30 70 Z" fill="#78350f" />
          {/* Yuz */}
          <ellipse cx="75" cy="80" rx="35" ry="40" fill="#fed7aa" />
          {/* Ko'zlar */}
          <circle cx="63" cy="75" r="5" fill="#1e293b" />
          <circle cx="87" cy="75" r="5" fill="#1e293b" />
          <circle cx="65" cy="73" r="1.5" fill="#ffffff" />
          <circle cx="89" cy="73" r="1.5" fill="#ffffff" />
          {/* Yanoqlar */}
          <ellipse cx="56" cy="88" rx="5" ry="3" fill="#f43f5e" opacity="0.5" />
          <ellipse cx="94" cy="88" rx="5" ry="3" fill="#f43f5e" opacity="0.5" />
          {/* Og'iz (gapirganda o'zgaradi) */}
          {isSpeaking ? (
            <ellipse cx="75" cy="98" rx="6" ry="8" fill="#991b1b" className="animate-bounce" />
          ) : (
            <path d="M68 96 Q75 103 82 96" stroke="#991b1b" strokeWidth="3" strokeLinecap="round" fill="none" />
          )}
          {/* Quloqchin / Headset */}
          <path d="M42 75 Q42 45 75 45 Q108 45 108 75" stroke="#3b82f6" strokeWidth="5" fill="none" />
          <circle cx="43" cy="78" r="7" fill="#1e293b" />
        </svg>
      </div>
    </div>
  );
}

const INITIALS = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const MEDIALS = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const FINALS = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

function composeHangul(cho, jung, jong = '') {
  const c = INITIALS.indexOf(cho);
  const v = MEDIALS.indexOf(jung);
  const f = FINALS.indexOf(jong);
  if (c === -1 || v === -1) return cho || jung || '';
  return String.fromCharCode(0xAC00 + (c * 21 * 28) + (v * 28) + (f > 0 ? f : 0));
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try { const saved = localStorage.getItem('hs_auth_user'); return saved ? JSON.parse(saved) : null; } catch { return null; }
  });
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try { const saved = localStorage.getItem('hs_registered_users'); return saved ? JSON.parse(saved) : []; } catch { return []; }
  });
  const [authMode, setAuthMode] = useState('welcome');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  const handleGuestLogin = () => {
    const guest = { uid: 'guest', name: 'Tokhirbek', email: 'guest@ziyoprep.uz', isGuest: true };
    setCurrentUser(guest);
    localStorage.setItem('hs_auth_user', JSON.stringify(guest));
    setProfile(p => ({ ...p, name: 'Tokhirbek' }));
  };

  const handleGoogleSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    const email = authForm.email.trim().toLowerCase();
    if (!email || !email.includes('@')) return setAuthError("To‘g‘ri Gmail manzilini kiriting!");
    const name = authForm.name.trim() || email.split('@')[0];
    const gUser = { uid: 'google_' + email, name, email };
    setCurrentUser(gUser);
    localStorage.setItem('hs_auth_user', JSON.stringify(gUser));
    setProfile(p => ({ ...p, name }));
  };

  const handleEmailAuth = (e) => {
    e.preventDefault();
    setAuthError('');
    const email = authForm.email.trim().toLowerCase();
    const password = authForm.password.trim();
    if (!email || !email.includes('@')) return setAuthError("To‘g‘ri email kiriting!");
    if (password.length < 4) return setAuthError("Parol kamida 4 ta belgidan iborat bo‘lsin!");

    if (authMode === 'register') {
      if (!authForm.name.trim()) return setAuthError("Ismingizni kiriting!");
      const exists = registeredUsers.find(u => u.email === email);
      if (exists) return setAuthError("Bu email band! Tizimga kiring.");
      const newUser = { uid: 'user_' + Date.now(), name: authForm.name.trim(), email, password };
      const updated = [...registeredUsers, newUser];
      setRegisteredUsers(updated);
      localStorage.setItem('hs_registered_users', JSON.stringify(updated));
      setCurrentUser(newUser);
      setProfile(p => ({ ...p, name: newUser.name }));
    } else if (authMode === 'login') {
      const found = registeredUsers.find(u => u.email === email);
      if (!found) return setAuthError("Bunday email topilmadi! Ro‘yxatdan o‘ting.");
      if (found.password !== password) return setAuthError("Parol xato!");
      setCurrentUser(found);
      setProfile(p => ({ ...p, name: found.name }));
    } else if (authMode === 'forgot') {
      const foundIndex = registeredUsers.findIndex(u => u.email === email);
      if (foundIndex === -1) return setAuthError("Bunday email bazada topilmadi!");
      const updated = [...registeredUsers];
      updated[foundIndex].password = password;
      setRegisteredUsers(updated);
      localStorage.setItem('hs_registered_users', JSON.stringify(updated));
      setResetSuccess("Parol muvaffaqiyatli o'zgartirildi!");
      setTimeout(() => setAuthMode('login'), 2000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('hs_auth_user');
    setCurrentUser(null);
    setAuthMode('welcome');
    setScreen('home');
  };

  const [screen, setScreen] = useState('home');
  const [uiLang, setUiLang] = useState('uz');
  const [isDark, setIsDark] = useState(() => localStorage.getItem('hs_dark') === 'true');
  const [selectedBookCode, setSelectedBookCode] = useState('1A');
  const [activeLesson, setActiveLesson] = useState(null);
  const [isUnlockedAll, setIsUnlockedAll] = useState(() => localStorage.getItem('hs_unlocked') === 'true');

  const [mistakes, setMistakes] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hs_mistakes')) || []; } catch { return []; }
  });
  const [plannerTasks, setPlannerTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hs_planner')) || [
        { id: 1, title: '15 daqiqa dars qilish', done: false, xp: 20 },
        { id: 2, title: '10 ta so‘z takrorlash', done: false, xp: 15 },
        { id: 3, title: 'AI ustoz 토히르벡 bilan muloqot', done: false, xp: 25 }
      ];
    } catch {
      return [
        { id: 1, title: '15 daqiqa dars qilish', done: false, xp: 20 },
        { id: 2, title: '10 ta so‘z takrorlash', done: false, xp: 15 },
        { id: 3, title: 'AI ustoz 토히르벡 bilan muloqot', done: false, xp: 25 }
      ];
    }
  });

  const vocabBooks = [vocab1A, vocab1B, vocab2A, vocab2B, vocab3A, vocab3B, vocab4A, vocab4B, vocab5A, vocab5B, vocab6A].filter(Boolean);
  const [selectedVocabBook, setSelectedVocabBook] = useState('1A');
  const [selectedVocabTopicId, setSelectedVocabTopicId] = useState('1a-l1');
  const [vocabSearch, setVocabSearch] = useState('');
  const [vocabQuizMode, setVocabQuizMode] = useState(false);
  const [vocabQuizDirection, setVocabQuizDirection] = useState('ko2uz');
  const [vocabQuizWord, setVocabQuizWord] = useState(null);
  const [vocabQuizOpts, setVocabQuizOpts] = useState([]);
  const [vocabQuizPick, setVocabQuizPick] = useState(null);
  const [vocabQuizScore, setVocabQuizScore] = useState(0);
  const [vocabQuizCount, setVocabQuizCount] = useState(0);

  const [profile, setProfile] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('hs_profile'));
      return { name: saved?.name || 'Tokhirbek', xp: saved?.xp ?? 1450, dailyXp: saved?.dailyXp ?? 60, streak: saved?.streak ?? 12, freezes: saved?.freezes ?? 1 };
    } catch {
      return { name: 'Tokhirbek', xp: 1450, dailyXp: 60, streak: 12, freezes: 1 };
    }
  });
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(profile.name);

  const [ownedItems, setOwnedItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hs_owned_items')) || { glasses: false, gradCap: false, crown: false }; } catch { return { glasses: false, gradCap: false, crown: false }; }
  });
  const [equippedItems, setEquippedItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hs_equipped_items')) || { glasses: false, gradCap: false, crown: false }; } catch { return { glasses: false, gradCap: false, crown: false }; }
  });

  const [completedIds, setCompletedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hs_completed')) || []; } catch { return []; }
  });
  const [memos, setMemos] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hs_memos')) || {}; } catch { return {}; }
  });

  useEffect(() => { localStorage.setItem('hs_profile', JSON.stringify(profile)); }, [profile]);
  useEffect(() => { localStorage.setItem('hs_completed', JSON.stringify(completedIds)); }, [completedIds]);
  useEffect(() => { localStorage.setItem('hs_memos', JSON.stringify(memos)); }, [memos]);
  useEffect(() => { localStorage.setItem('hs_mistakes', JSON.stringify(mistakes)); }, [mistakes]);
  useEffect(() => { localStorage.setItem('hs_planner', JSON.stringify(plannerTasks)); }, [plannerTasks]);

  const toggleDark = () => setIsDark(prev => { const next = !prev; localStorage.setItem('hs_dark', String(next)); return next; });

  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const speakKo = (text) => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text.replace(/[\(\)\[\]~]/g, '').trim());
      u.lang = 'ko-KR';
      u.onstart = () => setIsAiSpeaking(true);
      u.onend = () => setIsAiSpeaking(false);
      window.speechSynthesis.speak(u);
    } catch {
      setIsAiSpeaking(false);
    }
  };

  const snuBooks = [snu1A, snu1B, snu2A, snu2B, snu3A, snu3B, snu4A, snu4B, snu5A, snu5B, snu6A, snu6B].filter(Boolean);
  const currentBook = snuBooks.find(b => b.code === selectedBookCode) || snuBooks[0];
  const allLessons = snuBooks.flatMap(b => b.lessons || []);
  const allVocabWords = vocabBooks.flatMap(b => (b.topics || []).flatMap(tp => tp.words || []));
  const allWords = allVocabWords.length > 0 ? allVocabWords : allLessons.flatMap(l => l.words || []);
  const nextLesson = allLessons.find(l => !completedIds.includes(l.id)) || allLessons[0];

  // --- LIVE 3D AI TUTOR VOICE STATE ---
  const [aiMessages, setAiMessages] = useState([
    { role: 'ai', ko: '안녕하세요! 저는 토히르벡 AI에요. 마이크를 꾹 누르고 저 랑 한국어로 대화해봐요!', uz: 'Assalomu alaykum! Men 토히르벡 AI man. Mikrofonni bosib men bilan koreys tilida gaplashing!' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [aiMessages, aiLoading]);

  const handleVoiceInput = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert("Brauzeringiz ovozli kiritishni qo‘llab-quvvatlamaydi.");
      return;
    }
    const rec = new SR();
    rec.lang = 'ko-KR';
    rec.interimResults = false;
    setIsRecording(true);
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setAiInput(transcript);
      setIsRecording(false);
      handleAiSend(transcript);
    };
    rec.onerror = () => setIsRecording(false);
    rec.start();
  };

  const handleAiSend = async (preset) => {
    const text = (preset || aiInput).trim();
    if (!text || aiLoading) return;
    setAiMessages(prev => [...prev, { role: 'user', ko: text }]);
    setAiInput('');
    setAiLoading(true);
    setPlannerTasks(prev => prev.map(task => task.id === 3 ? { ...task, done: true } : task));
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: aiMessages, userName: profile.name })
      });
      const data = await res.json();
      const replyKo = data.ko || '아주 잘했어요!';
      const replyUz = data.uz || 'Ajoyib javob!';
      setAiMessages(prev => [...prev, { role: 'ai', ko: replyKo, uz: replyUz }]);
      speakKo(replyKo);
    } catch {
      const fallbackKo = `"${text}" — 아주 좋은 질문이에요! 함께 공부해봐요.`;
      const fallbackUz = `Ajoyib savol! Buni birga o'rganamiz.`;
      setAiMessages(prev => [...prev, { role: 'ai', ko: fallbackKo, uz: fallbackUz }]);
      speakKo(fallbackKo);
    } finally {
      setAiLoading(false);
    }
  };

  const t = {
    bg: isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-[#faf8f9] text-[#1e1e1e]',
    card: isDark ? 'bg-[#141a29] border-slate-800' : 'bg-white border-slate-200/90 shadow-2xs',
    sub: isDark ? 'bg-[#1c2438] border-slate-700' : 'bg-[#fafafa] border-slate-200',
    nav: isDark ? 'bg-[#0f1524]/95 border-t border-slate-800' : 'bg-white/95 border-t border-slate-200/90',
    textMain: isDark ? 'text-white' : 'text-[#1e1e1e]',
    textMuted: isDark ? 'text-slate-400' : 'text-slate-500'
  };

  // =========================================================================
  // AUTH SCREEN
  // =========================================================================
  if (!currentUser) {
    return (
      <div className={`min-h-screen w-full ${t.bg} flex flex-col justify-between p-6 pt-10 font-sans`}>
        <div className="max-w-md w-full mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <ZiyoOwlAvatar className="w-10 h-10 rounded-2xl" equipped={equippedItems} />
            <div>
              <span className={`font-black text-lg tracking-tight block leading-none ${t.textMain}`}>ZiyoPrep</span>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">한글 스튜디오</span>
            </div>
          </div>
          <button onClick={toggleDark} className={`p-2.5 rounded-full ${t.card} border`}>
            {isDark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-slate-600" />}
          </button>
        </div>

        <div className="max-w-md w-full mx-auto my-auto text-center space-y-6">
          {authMode === 'welcome' && (
            <>
              <div className="w-36 h-36 mx-auto">
                <ZiyoOwlAvatar className="w-full h-full rounded-[36px] border-4 border-emerald-500/30 shadow-2xl" equipped={equippedItems} />
              </div>

              <div className="space-y-2">
                <h1 className={`text-2xl font-black ${t.textMain}`}>
                  ZiyoPrep bilan koreys tilini o‘rganing!
                </h1>
                <p className={`text-xs ${t.textMuted} max-w-xs mx-auto leading-relaxed`}>
                  서울대 1A–6B darsliklari, AI Ovozli Tutor va jonli suhbat imkoniyati.
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <button
                  onClick={handleGuestLogin}
                  className="w-full py-4 rounded-2xl bg-[#58cc02] hover:bg-[#4cb800] border-b-4 border-[#46a302] text-white font-black text-sm uppercase shadow-lg active:translate-y-0.5 transition"
                >
                  Akkauntsiz Boshlash (Tezkor kirish)
                </button>
                <button
                  onClick={() => { setAuthError(''); setAuthForm({ name: '', email: '', password: '' }); setAuthMode('google'); }}
                  className={`w-full py-4 rounded-2xl ${t.card} border-2 border-b-4 font-black text-sm ${t.textMain} flex items-center justify-center gap-2 active:translate-y-0.5 transition`}
                >
                  <span className="text-base font-black text-blue-500">G</span>
                  <span>Google bilan davom etish</span>
                </button>
                <div className="flex items-center justify-center gap-4 pt-1">
                  <button
                    onClick={() => { setAuthError(''); setAuthForm({ name: '', email: '', password: '' }); setAuthMode('login'); }}
                    className="text-xs font-black text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    Email orqali kirish
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    onClick={() => { setAuthError(''); setAuthForm({ name: '', email: '', password: '' }); setAuthMode('register'); }}
                    className="text-xs font-black text-indigo-500 hover:underline"
                  >
                    Ro‘yxatdan o‘tish
                  </button>
                </div>
              </div>
            </>
          )}

          {authMode === 'google' && (
            <div className={`${t.card} border rounded-3xl p-6 space-y-4 text-left`}>
              <div className="flex items-center justify-between">
                <button onClick={() => setAuthMode('welcome')} className={`p-2 rounded-xl ${t.sub} border`}>
                  <ArrowLeft size={16} />
                </button>
                <h2 className={`font-black text-base ${t.textMain}`}>Google hisob bilan kirish</h2>
                <div className="w-8" />
              </div>

              {authError && <div className="p-3 rounded-xl bg-rose-500/15 text-rose-500 text-xs font-bold text-center">{authError}</div>}

              <form onSubmit={handleGoogleSubmit} className="space-y-3">
                <input type="text" placeholder="Ismingiz" value={authForm.name} onChange={e => setAuthForm({ ...authForm, name: e.target.value })} className={`w-full ${t.sub} border rounded-2xl px-4 py-3 text-xs font-bold outline-none`} />
                <input type="email" placeholder="Gmail manzilingiz" value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })} className={`w-full ${t.sub} border rounded-2xl px-4 py-3 text-xs font-bold outline-none`} />
                <button type="submit" className="w-full py-3.5 rounded-2xl bg-blue-600 text-white font-black text-xs uppercase">Tasdiqlash</button>
              </form>
            </div>
          )}

          {(authMode === 'login' || authMode === 'register' || authMode === 'forgot') && (
            <div className={`${t.card} border rounded-3xl p-6 space-y-4 text-left`}>
              <div className="flex items-center justify-between">
                <button onClick={() => { setAuthError(''); setResetSuccess(''); setAuthMode('welcome'); }} className={`p-2 rounded-xl ${t.sub} border`}>
                  <ArrowLeft size={16} />
                </button>
                <h2 className={`font-black text-base ${t.textMain}`}>
                  {authMode === 'login' ? 'Tizimga kirish' : authMode === 'register' ? 'Yangi akkaunt yaratish' : 'Parolni tiklash'}
                </h2>
                <div className="w-8" />
              </div>

              {authError && <div className="p-3 rounded-xl bg-rose-500/15 text-rose-500 text-xs font-bold text-center">{authError}</div>}
              {resetSuccess && <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-600 text-xs font-bold text-center">{resetSuccess}</div>}

              <form onSubmit={handleEmailAuth} className="space-y-3">
                {authMode === 'register' && <input type="text" placeholder="Ismingiz" value={authForm.name} onChange={e => setAuthForm({ ...authForm, name: e.target.value })} className={`w-full ${t.sub} border rounded-2xl px-4 py-3 text-xs font-bold outline-none`} />}
                <input type="email" placeholder="Email manzilingiz" value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })} className={`w-full ${t.sub} border rounded-2xl px-4 py-3 text-xs font-bold outline-none`} />
                <input type="password" placeholder={authMode === 'forgot' ? "Yangi parol kiriting" : "Parol"} value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })} className={`w-full ${t.sub} border rounded-2xl px-4 py-3 text-xs font-bold outline-none`} />
                <button type="submit" className="w-full py-3.5 rounded-2xl bg-[#58cc02] text-white font-black text-xs uppercase">
                  {authMode === 'login' ? 'Kirish' : authMode === 'register' ? 'Ro‘yxatdan o‘tish' : 'Parolni yangilash'}
                </button>
              </form>

              {authMode === 'login' && (
                <div className="flex justify-between items-center pt-1 text-xs">
                  <button onClick={() => { setAuthError(''); setAuthMode('forgot'); }} className="text-slate-400 hover:underline font-bold">Parolni esdan chiqardingizmi?</button>
                  <button onClick={() => { setAuthError(''); setAuthMode('register'); }} className="text-emerald-600 font-bold hover:underline">Ro‘yxatdan o‘tish</button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="text-center text-[11px] text-slate-400">ZiyoPrep • 한글 스튜디오</div>
      </div>
    );
  }

  // =========================================================================
  // 1. ASOSIY EKRAN
  // =========================================================================
  const renderHome = () => {
    const dailyPct = Math.min(100, Math.round((profile.dailyXp / 100) * 100));

    return (
      <div className="space-y-4 pb-28">
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2.5">
            <ZiyoOwlAvatar className="w-10 h-10 rounded-2xl" equipped={equippedItems} />
            <div>
              <h1 className={`text-lg font-black tracking-tight leading-none ${t.textMain}`}>ZiyoPrep</h1>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">한글 스튜디오 • 1A–6B</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button onClick={() => setUiLang(l => l === 'uz' ? 'ko' : 'uz')} className={`px-3 py-1.5 rounded-full ${t.card} border text-xs font-bold flex items-center gap-1.5`}>
              <Globe size={14} className="text-sky-500" />
              <span>{uiLang === 'uz' ? "O'zbekcha" : '한국어'}</span>
            </button>
            <button onClick={toggleDark} className={`p-2 rounded-full ${t.card} border`}>
              {isDark ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-slate-600" />}
            </button>
          </div>
        </div>

        <div className={`rounded-3xl ${isDark ? 'bg-emerald-950/35 border-emerald-800/70' : 'bg-gradient-to-r from-[#eef9e8] to-[#e4f5fc] border-[#cdeac0]'} border p-4 flex items-center gap-3.5`}>
          <ZiyoOwlAvatar className="w-16 h-16 rounded-2xl shrink-0 border-2 border-white dark:border-slate-700" equipped={equippedItems} />
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-xs font-black ${t.textMain}`}>Salom, {profile.name}! 👋</span>
              <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400">{profile.dailyXp}/100 XP</span>
            </div>
            <div className="w-full h-2.5 bg-white/80 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-[#58cc02] rounded-full transition-all duration-500" style={{ width: `${dailyPct}%` }} />
            </div>
            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
              🔥 {profile.streak} kunlik streak • ⚡ {profile.xp} XP
            </div>
          </div>
        </div>

        <button onClick={() => startLesson(nextLesson)} className={`w-full py-3.5 px-4 rounded-2xl ${t.card} border hover:border-emerald-400 text-xs font-black flex items-center justify-center gap-2`}>
          <Play size={13} className="text-[#58cc02] fill-[#58cc02]" />
          <span>{nextLesson.week} Davom etish ({nextLesson.title})</span>
        </button>

        {/* PLANNER */}
        <div className={`rounded-2xl ${t.card} border p-3.5 space-y-2`}>
          <div className="flex justify-between items-center text-xs font-black">
            <span className="flex items-center gap-1.5 text-indigo-500"><Target size={14} /> Kunlik O‘quv Rejasi</span>
            <span className="text-[10px] text-slate-400">{plannerTasks.filter(p => p.done).length}/{plannerTasks.length} bajarildi</span>
          </div>
          <div className="space-y-1.5">
            {plannerTasks.map(task => (
              <div key={task.id} onClick={() => {
                setPlannerTasks(prev => prev.map(p => p.id === task.id ? { ...p, done: !p.done } : p));
                if (!task.done) setProfile(p => ({ ...p, xp: p.xp + task.xp }));
              }} className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer text-xs ${task.done ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600' : `${t.sub} ${t.textMain}`}`}>
                <div className="flex items-center gap-2">
                  <CheckSquare size={14} className={task.done ? 'text-emerald-500' : 'text-slate-400'} />
                  <span className={task.done ? 'line-through opacity-75' : ''}>{task.title}</span>
                </div>
                <span className="text-[10px] font-bold text-sky-500">+{task.xp} XP</span>
              </div>
            ))}
          </div>
        </div>

        {/* LUG'AT KARTASI */}
        <div onClick={() => { setVocabQuizMode(false); setScreen('vocab'); }} className={`rounded-2xl ${isDark ? 'bg-indigo-950/45 border-indigo-700' : 'bg-gradient-to-r from-[#f3f0fa] to-[#eef2ff] border-[#d8ccf5]'} border p-3.5 flex items-center justify-between cursor-pointer`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center">단어장</div>
            <div>
              <div className={`font-black text-xs ${t.textMain}`}>📚 Lug‘atlar & Savol-Javob ({allVocabWords.length}+ so‘z)</div>
              <div className={`text-[10px] ${t.textMuted}`}>서울대 1A–6A barcha bo‘lim lug‘atlari</div>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-black text-[10px]">Ochish ›</span>
        </div>

        {/* 12 TA KITOB TABI */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[11px] font-black text-slate-400 tracking-wider uppercase shrink-0 mr-1">서울대</span>
            {snuBooks.map((b) => (
              <button key={b.code} onClick={() => setSelectedBookCode(b.code)} className={`px-3 h-8 rounded-lg font-black text-xs shrink-0 ${b.code === selectedBookCode ? 'bg-[#58cc02] text-white border-2 border-emerald-600' : `${t.card} border`}`}>
                {b.code}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          {currentBook.lessons.map((lesson, idx) => {
            const isDone = completedIds.includes(lesson.id);
            const prev = idx > 0 ? currentBook.lessons[idx - 1] : null;
            const isOpen = isUnlockedAll || idx === 0 || isDone || (prev && completedIds.includes(prev.id));

            return (
              <div key={lesson.id} onClick={() => { if (!isOpen) return alert("Avval oldingi darsni tugating!"); startLesson(lesson); }} className={`rounded-2xl ${t.card} border p-3.5 flex items-center justify-between cursor-pointer ${isOpen ? 'hover:border-emerald-400' : 'opacity-65'}`}>
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg font-black text-xs flex items-center justify-center ${isDone ? 'bg-[#58cc02] text-white' : isOpen ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'}`}>{lesson.num}</span>
                  <span className="text-base">{lesson.emoji}</span>
                  <div>
                    <div className={`text-xs font-black ${t.textMain}`}>{lesson.title}</div>
                    <div className="text-[10px] text-slate-400">{lesson.heroUz}</div>
                  </div>
                </div>
                <div>{isDone ? <CheckCircle2 size={17} className="text-[#58cc02]" /> : !isOpen ? <Lock size={15} className="text-slate-300" /> : <span className="text-emerald-600">›</span>}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // =========================================================================
  // LUG'ATLAR
  // =========================================================================
  const renderVocab = () => {
    const vBook = vocabBooks.find(b => b.code === selectedVocabBook) || vocabBooks[0];
    const vTopic = vBook.topics.find(tp => tp.id === selectedVocabTopicId) || vBook.topics[0];
    const filteredWords = vTopic.words.filter(w => w.ko.toLowerCase().includes(vocabSearch.toLowerCase()) || w.uz.toLowerCase().includes(vocabSearch.toLowerCase()));

    const startVocabQuiz = (dir = vocabQuizDirection) => {
      const pool = vTopic.words.length >= 4 ? vTopic.words : allVocabWords;
      const target = pool[Math.floor(Math.random() * pool.length)];
      if (dir === 'ko2uz') {
        const wrongs = shuffleArray(pool.filter(w => w.uz !== target.uz)).slice(0, 3).map(w => w.uz);
        setVocabQuizOpts(shuffleArray([target.uz, ...wrongs]));
      } else {
        const wrongs = shuffleArray(pool.filter(w => w.ko !== target.ko)).slice(0, 3).map(w => w.ko);
        setVocabQuizOpts(shuffleArray([target.ko, ...wrongs]));
      }
      setVocabQuizWord(target);
      setVocabQuizPick(null);
      setVocabQuizMode(true);
      speakKo(target.ko);
    };

    return (
      <div className="space-y-3.5 pb-28">
        <div className="flex items-center justify-between pt-2">
          <button onClick={() => setScreen('home')} className={`flex items-center gap-1.5 text-sm font-black ${t.textMain}`}><ArrowLeft size={16} /> <span>Lug‘atlar</span></button>
          <button onClick={() => { if (vocabQuizMode) { setVocabQuizMode(false); } else { setVocabQuizScore(0); setVocabQuizCount(0); startVocabQuiz(vocabQuizDirection); } }} className="px-3.5 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-black">
            {vocabQuizMode ? '📖 Ro‘yxat' : '🎯 Savol-Javob'}
          </button>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {vocabBooks.map(b => (
            <button key={b.code} onClick={() => { setSelectedVocabBook(b.code); setSelectedVocabTopicId(b.topics[0].id); setVocabQuizMode(false); }} className={`px-3 py-1.5 rounded-xl text-xs font-black shrink-0 ${selectedVocabBook === b.code ? 'bg-indigo-600 text-white' : `${t.card} border`}`}>
              {b.code}
            </button>
          ))}
        </div>

        {vocabQuizMode && vocabQuizWord ? (
          <div className={`rounded-3xl ${t.card} border p-5 text-center space-y-4`}>
            <div className="flex justify-between text-xs font-black text-indigo-500">
              <span>Test rejimi</span>
              <span>To‘g‘ri: {vocabQuizScore}/{vocabQuizCount}</span>
            </div>
            <div onClick={() => speakKo(vocabQuizWord.ko)} className="py-4 cursor-pointer">
              <div className={`text-2xl font-black ${t.textMain}`}>{vocabQuizDirection === 'ko2uz' ? vocabQuizWord.ko : vocabQuizWord.uz}</div>
              <div className="text-xs text-indigo-500 mt-1 flex items-center justify-center gap-1"><Volume2 size={14} /> Eshitish</div>
            </div>
            <div className="space-y-2 text-left">
              {vocabQuizOpts.map(opt => {
                const correctAns = vocabQuizDirection === 'ko2uz' ? vocabQuizWord.uz : vocabQuizWord.ko;
                return (
                  <button key={opt} disabled={vocabQuizPick !== null} onClick={() => {
                    setVocabQuizPick(opt);
                    setVocabQuizCount(c => c + 1);
                    if (opt === correctAns) {
                      setVocabQuizScore(s => s + 1);
                      setProfile(p => ({ ...p, xp: p.xp + 10 }));
                    } else {
                      setMistakes(m => [...m, { ko: vocabQuizWord.ko, uz: vocabQuizWord.uz }]);
                    }
                  }} className={`w-full p-3.5 rounded-2xl border text-xs font-black ${vocabQuizPick !== null ? (opt === correctAns ? 'bg-emerald-500 text-white' : vocabQuizPick === opt ? 'bg-rose-500 text-white' : `${t.sub}`) : `${t.sub} ${t.textMain}`}`}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {vocabQuizPick !== null && <button onClick={() => startVocabQuiz(vocabQuizDirection)} className="w-full py-3 rounded-2xl bg-[#58cc02] text-white font-black text-xs">Keyingi →</button>}
          </div>
        ) : (
          <>
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
              <input type="text" value={vocabSearch} onChange={e => setVocabSearch(e.target.value)} placeholder="So‘z qidirish..." className={`w-full ${t.card} border rounded-2xl pl-9 pr-4 py-2.5 text-xs font-bold outline-none`} />
            </div>
            <div className="space-y-1.5">
              {filteredWords.map((w, idx) => (
                <div key={idx} onClick={() => speakKo(w.ko)} className={`rounded-2xl ${t.card} border p-3 flex justify-between items-center cursor-pointer`}>
                  <div>
                    <div className={`text-sm font-black ${t.textMain}`}>{w.ko}</div>
                    <div className="text-xs text-slate-400">{w.uz}</div>
                  </div>
                  <Volume2 size={16} className="text-indigo-500" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  // =========================================================================
  // BUILDER
  // =========================================================================
  const renderBuilder = () => (
    <div className="space-y-3.5 pb-28">
      <div className="flex items-center justify-between pt-2">
        <button onClick={() => setScreen('home')} className={`flex items-center gap-1.5 text-sm font-black ${t.textMain}`}><ArrowLeft size={16} /> <span>Harf Yig‘ish</span></button>
      </div>
      <div className={`rounded-3xl ${t.card} border p-4 space-y-4 text-center`}>
        <div onClick={() => speakKo(composedSyllable)} className={`py-8 rounded-2xl ${t.sub} border cursor-pointer`}>
          <div className={`text-6xl font-black ${t.textMain}`}>{composedSyllable}</div>
          <div className="text-xs text-slate-400 mt-2">{romanGuide}</div>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // DARS
  // =========================================================================
  const renderLesson = () => {
    if (!activeLesson) return null;
    const currentQ = quizList[qIdx];
    return (
      <div className="space-y-3.5 pb-28">
        <div className="flex items-center justify-between pt-2">
          <button onClick={() => setScreen('home')} className={`flex items-center gap-1.5 text-xs font-black ${t.textMuted}`}><ArrowLeft size={15} /> <span>{activeLesson.week}</span></button>
        </div>

        <div className={`rounded-2xl ${t.card} border p-4 flex items-center gap-3.5`}>
          <ZiyoOwlAvatar className="w-11 h-11 rounded-2xl shrink-0" equipped={equippedItems} />
          <div>
            <div className="text-[10px] font-bold text-slate-400">{activeLesson.week}</div>
            <div className={`text-base font-black ${t.textMain}`}>{activeLesson.heroKo}</div>
          </div>
        </div>

        {currentQ && (
          <div className={`rounded-3xl ${t.card} border p-4 space-y-3`}>
            <div className="text-xs font-black text-rose-500">Test ({qIdx + 1} / {quizList.length})</div>
            <div className={`text-sm font-black ${t.textMain}`}>{currentQ.q}</div>
            <div className="space-y-2">
              {currentQ.opts.map(opt => (
                <button key={opt} disabled={qAnswer !== null} onClick={() => {
                  setQAnswer(opt);
                  speakKo(opt);
                  if (opt !== currentQ.ans) setMistakes(m => [...m, { ko: currentQ.ans, uz: currentQ.q }]);
                }} className={`w-full p-3 rounded-2xl text-left border text-xs font-bold ${qAnswer !== null ? (opt === currentQ.ans ? 'bg-emerald-500 text-white' : qAnswer === opt ? 'bg-rose-500 text-white' : `${t.sub}`) : `${t.sub} ${t.textMain}`}`}>
                  {opt}
                </button>
              ))}
            </div>
            {qAnswer && (
              <button onClick={() => {
                if (qIdx + 1 < quizList.length) { setQIdx(qIdx + 1); setQAnswer(null); }
                else { setCompletedIds(p => [...new Set([...p, activeLesson.id])]); setProfile(p => ({ ...p, xp: p.xp + 50 })); setScreen('home'); }
              }} className="w-full py-3 rounded-2xl bg-[#58cc02] text-white font-black text-xs">
                {qIdx + 1 < quizList.length ? 'Keyingi →' : 'Tugatish (+50 XP)'}
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  // =========================================================================
  // 🎙️ 3D JONLI AI TUTOR (EMMA / 토히르벡 3D AI VIBE)
  // =========================================================================
  const renderAiTutor = () => (
    <div className="flex flex-col h-[78vh] pb-24 pt-2">
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
          <h2 className={`font-black text-sm ${t.textMain}`}>Live AI Tutor — 토히르벡</h2>
        </div>
      </div>

      {/* 3D Qizaloq Avatar Interfeysi */}
      <div className={`rounded-3xl ${t.card} border p-4 text-center space-y-2 flex flex-col items-center`}>
        <LiveAiAvatar isSpeaking={isAiSpeaking} isListening={isRecording} />
        <div className={`text-base font-black ${t.textMain}`}>토히르벡 AI</div>
        <div className="text-[11px] text-emerald-500 font-bold">
          {isRecording ? "🎤 Eshitilmoqda..." : isAiSpeaking ? "🔊 Gapirmoqda..." : "Suhbat uchun mikrofonni bosing"}
        </div>
      </div>

      {/* Chat tarixi */}
      <div className={`flex-1 overflow-y-auto rounded-3xl ${t.card} border p-4 space-y-3 mt-2`}>
        {aiMessages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div onClick={() => m.role === 'ai' && m.ko && speakKo(m.ko)} className={`max-w-[85%] rounded-2xl p-3.5 text-xs space-y-1 cursor-pointer ${m.role === 'user' ? 'bg-[#58cc02] text-white font-bold' : `${t.sub} ${t.textMain}`}`}>
              {m.ko && <div className="font-black">{m.ko}</div>}
              {m.uz && <div className="text-[11px] opacity-90">{m.uz}</div>}
            </div>
          </div>
        ))}
        {aiLoading && <div className="text-xs text-slate-400 animate-pulse text-center">토히르벡 o‘ylamoqda...</div>}
        <div ref={chatEndRef} />
      </div>

      {/* Ovozli Boshqaruv Paneli */}
      <div className="pt-3 flex gap-2 items-center">
        <button onClick={handleVoiceInput} className={`p-4 rounded-full text-white shadow-xl ${isRecording ? 'bg-rose-600 animate-pulse scale-110' : 'bg-emerald-500 hover:bg-emerald-600'}`}>
          <Mic size={24} />
        </button>
        <input type="text" value={aiInput} onChange={e => setAiInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAiSend()} placeholder="Yoki xabar yozing..." className={`flex-1 ${t.card} border rounded-2xl px-4 py-3 text-xs font-bold outline-none`} />
        <button onClick={() => handleAiSend()} disabled={aiLoading} className="px-4 rounded-2xl bg-[#58cc02] text-white font-black"><Send size={18} /></button>
      </div>
    </div>
  );

  // =========================================================================
  // MASHQ
  // =========================================================================
  const renderReview = () => (
    <div className="space-y-4 pb-28 pt-2">
      <div className="flex justify-between items-center text-xs font-black px-1">
        <span className={t.textMain}>📌 Xatolar daftari</span>
        {mistakes.length > 0 && <button onClick={() => setMistakes([])} className="text-rose-500 underline text-[10px]">Tozalash</button>}
      </div>
      {mistakes.length === 0 ? (
        <div className={`rounded-3xl ${t.card} border p-8 text-center text-xs text-slate-400`}>Hozircha xatolar yo‘q! 🎉</div>
      ) : (
        mistakes.map((m, idx) => (
          <div key={idx} onClick={() => speakKo(m.ko)} className={`rounded-2xl ${t.card} border p-3 flex justify-between items-center cursor-pointer`}>
            <div>
              <div className={`text-sm font-black ${t.textMain}`}>{m.ko}</div>
              <div className="text-xs text-slate-400">{m.uz}</div>
            </div>
            <Volume2 size={16} className="text-rose-500" />
          </div>
        ))
      )}
    </div>
  );

  // =========================================================================
  // PROFIL
  // =========================================================================
  const renderProfile = () => (
    <div className="space-y-4 pb-28 pt-2">
      <div className={`rounded-3xl ${t.card} border p-5 flex items-center justify-between`}>
        <div className="flex items-center gap-3.5">
          <ZiyoOwlAvatar className="w-16 h-16 rounded-2xl" equipped={equippedItems} />
          <div>
            {editingName ? (
              <div className="flex gap-1.5">
                <input type="text" value={nameDraft} onChange={e => setNameDraft(e.target.value)} className={`${t.sub} border rounded-xl px-2.5 py-1 text-xs font-bold outline-none`} />
                <button onClick={() => { setProfile(p => ({ ...p, name: nameDraft || 'Tokhirbek' })); setEditingName(false); }} className="px-2.5 py-1 bg-emerald-500 text-white text-xs font-bold rounded-xl">OK</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className={`font-black text-base ${t.textMain}`}>{profile.name}</h2>
                <button onClick={() => { setNameDraft(profile.name); setEditingName(true); }} className="text-slate-400"><Edit3 size={13} /></button>
              </div>
            )}
            <p className="text-xs text-slate-400 mt-0.5">{currentUser?.email}</p>
          </div>
        </div>
        <button onClick={toggleDark} className={`p-2.5 rounded-2xl ${t.sub} border`}>
          {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-700" />}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        <div className={`rounded-2xl ${t.card} border p-3.5 text-center`}>
          <Flame size={20} className="mx-auto text-amber-500 fill-amber-500" />
          <div className={`text-lg font-black mt-1 ${t.textMain}`}>{profile.streak}</div>
          <div className="text-[10px] text-slate-400 font-bold">Kunlik Streak</div>
        </div>
        <div className={`rounded-2xl ${t.card} border p-3.5 text-center`}>
          <Zap size={20} className="mx-auto text-sky-500 fill-sky-500" />
          <div className={`text-lg font-black mt-1 ${t.textMain}`}>{profile.xp}</div>
          <div className="text-[10px] text-slate-400 font-bold">Mavjud XP</div>
        </div>
        <div className={`rounded-2xl ${t.card} border p-3.5 text-center`}>
          <CheckCircle2 size={20} className="mx-auto text-emerald-500" />
          <div className={`text-lg font-black mt-1 ${t.textMain}`}>{completedIds.length} / {allLessons.length}</div>
          <div className="text-[10px] text-slate-400 font-bold">Darslar</div>
        </div>
      </div>

      <button onClick={handleLogout} className="w-full py-3.5 rounded-2xl bg-rose-500/15 text-rose-500 font-black text-xs flex items-center justify-center gap-2">
        <LogOut size={16} /> Akkauntdan chiqish
      </button>
    </div>
  );

  return (
    <div className={`min-h-screen w-full ${t.bg} font-sans select-none transition-colors`}>
      <main className="max-w-md mx-auto px-4 pt-8 pb-2">
        {screen === 'home' && renderHome()}
        {screen === 'vocab' && renderVocab()}
        {screen === 'builder' && renderBuilder()}
        {screen === 'lesson' && renderLesson()}
        {screen === 'ai' && renderAiTutor()}
        {screen === 'review' && renderReview()}
        {screen === 'profile' && renderProfile()}
      </main>

      <nav className={`fixed bottom-0 inset-x-0 z-40 ${t.nav} px-2 pt-2.5 pb-4 backdrop-blur-xl shadow-lg`}>
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button onClick={() => setScreen('home')} className={`flex flex-col items-center py-1 px-2 rounded-2xl ${screen === 'home' || screen === 'lesson' ? 'text-[#58cc02]' : t.textMuted}`}>
            <BookOpen size={25} strokeWidth={2.3} />
            <span className="text-[11px] font-black mt-1">Dars</span>
          </button>
          <button onClick={() => { setVocabQuizMode(false); setScreen('vocab'); }} className={`flex flex-col items-center py-1 px-2 rounded-2xl ${screen === 'vocab' ? 'text-indigo-500' : t.textMuted}`}>
            <Sparkles size={25} strokeWidth={2.3} />
            <span className="text-[11px] font-black mt-1">Lug‘at</span>
          </button>
          <button onClick={() => setScreen('ai')} className="-mt-8 w-16 h-16 rounded-full bg-[#58cc02] border-b-4 border-[#46a302] text-white flex items-center justify-center shadow-xl">
            <ZiyoOwlAvatar className="w-full h-full rounded-full" equipped={equippedItems} />
          </button>
          <button onClick={() => setScreen('review')} className={`flex flex-col items-center py-1 px-2 rounded-2xl ${screen === 'review' ? 'text-amber-500' : t.textMuted}`}>
            <RotateCcw size={25} strokeWidth={2.3} />
            <span className="text-[11px] font-black mt-1">Mashq</span>
          </button>
          <button onClick={() => setScreen('profile')} className={`flex flex-col items-center py-1 px-2 rounded-2xl ${screen === 'profile' ? 'text-indigo-500' : t.textMuted}`}>
            <User size={25} strokeWidth={2.3} />
            <span className="text-[11px] font-black mt-1">Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
