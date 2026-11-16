import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, ArrowLeft, Globe, Lock, CheckCircle2, 
  ChevronUp, ChevronDown, Edit3, Shuffle, Play, 
  BookOpen, Sparkles, RotateCcw, User, 
  Flame, Zap, Send, Sun, Moon, LogOut,
  Headphones, Mic, Clock, Layers, Timer,
  MessageSquare, Keyboard, ShoppingBag, Trophy, Search,
  Bookmark, CheckSquare, Award, Target
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
        <circle cx="155" cy="42" r="18" fill="#ffffff" opacity="0.6" />
        <circle cx="142" cy="46" r="13" fill="#ffffff" opacity="0.6" />

        <rect x="166" y="45" width="4" height="65" fill="#94a3b8" />
        <rect x="167.2" y="25" width="1.6" height="22" fill="#ef4444" />
        <ellipse cx="168" cy="52" rx="11" ry="4.5" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
        <rect x="161" y="48" width="14" height="4" rx="1" fill="#3b82f6" />

        <ellipse cx="100" cy="185" rx="115" ry="45" fill="#4ade80" />
        <ellipse cx="45" cy="188" rx="75" ry="35" fill="#22c55e" />
        <circle cx="178" cy="145" r="16" fill="#f9a8d4" opacity="0.85" />
        <ellipse cx="24" cy="72" rx="6" ry="3.5" transform="rotate(-25 24 72)" fill="#f472b6" />
        <ellipse cx="175" cy="112" rx="5" ry="3" transform="rotate(20 175 112)" fill="#f472b6" />

        <path d="M44 58 Q46 26 68 38 Z" fill="#65d318" />
        <path d="M156 58 Q154 26 132 38 Z" fill="#65d318" />
        <ellipse cx="100" cy="108" rx="64" ry="62" fill="url(#owlBody)" />

        <path d="M36 66 Q100 50 164 66 L160 86 Q100 70 40 86 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <text x="86" y="75" textAnchor="middle" fill="#0f172a" fontSize="14.5" fontWeight="900" fontFamily="sans-serif">
          ZiyoPrep
        </text>

        <circle cx="72" cy="105" r="22" fill="#ffffff" />
        <circle cx="128" cy="105" r="22" fill="#ffffff" />
        <circle cx="76" cy="105" r="11.5" fill="#1e293b" />
        <circle cx="124" cy="105" r="11.5" fill="#1e293b" />
        <circle cx="80" cy="100" r="4.2" fill="#ffffff" />
        <circle cx="128" cy="100" r="4.2" fill="#ffffff" />

        {equipped.glasses && (
          <g>
            <circle cx="72" cy="105" r="24" fill="rgba(56,189,248,0.18)" stroke="#0f172a" strokeWidth="4.5" />
            <circle cx="128" cy="105" r="24" fill="rgba(56,189,248,0.18)" stroke="#0f172a" strokeWidth="4.5" />
            <line x1="96" y1="103" x2="104" y2="103" stroke="#0f172a" strokeWidth="5" />
          </g>
        )}

        <path d="M91 116 Q100 111 109 116 L100 129 Z" fill="#f59e0b" />
        <path d="M94 123 Q100 133 106 123 Z" fill="#ea580c" />

        <path d="M46 132 L98 142 L98 184 L46 172 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5" />
        <path d="M154 132 L102 142 L102 184 L154 172 Z" fill="url(#bookGrad)" stroke="#1e3a8a" strokeWidth="1.5" />
        <path d="M50 130 L98 140 L102 140 L150 130 L150 135 L100 145 L50 135 Z" fill="#f8fafc" />

        <text x="128" y="162" textAnchor="middle" fill="#ffffff" fontSize="12.5" fontWeight="900" fontFamily="sans-serif" transform="rotate(-11 128 162)">
          한국어
        </text>
      </svg>
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
  // --- AUTH STATE ---
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

  // --- CORE APP STATES ---
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
  const speakKo = (text) => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text.replace(/[\(\)\[\]~]/g, '').trim());
      u.lang = 'ko-KR';
      window.speechSynthesis.speak(u);
    } catch {}
  };

  const snuBooks = [snu1A, snu1B, snu2A, snu2B, snu3A, snu3B, snu4A, snu4B, snu5A, snu5B, snu6A, snu6B].filter(Boolean);
  const currentBook = snuBooks.find(b => b.code === selectedBookCode) || snuBooks[0];
  const allLessons = snuBooks.flatMap(b => b.lessons || []);
  const allVocabWords = vocabBooks.flatMap(b => (b.topics || []).flatMap(tp => tp.words || []));
  const nextLesson = allLessons.find(l => !completedIds.includes(l.id)) || allLessons[0];

  // --- AI CHAT STATE (토히르벡) ---
  const [aiMessages, setAiMessages] = useState([
    { role: 'ai', ko: '안녕하세요! 토히르벡이에요. 무엇이든 물어보세요!', uz: 'Assalomu alaykum! Men AI ustoz 토히르벡 man.' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [aiMessages, aiLoading]);

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
      setAiMessages(prev => [...prev, { role: 'ai', ko: data.ko || '', uz: data.uz || '' }]);
      if (data.ko) speakKo(data.ko);
    } catch {
      setAiMessages(prev => [...prev, { role: 'ai', ko: '오류가 발생했어요.', uz: 'Server bilan aloqa xatosi.' }]);
    } finally { setAiLoading(false); }
  };

  const [openSec, setOpenSec] = useState({ rule: true, struct: true, words: true });
  const [doneSec, setDoneSec] = useState({ rule: false, struct: false });
  const [revealed, setRevealed] = useState({});
  const [quizList, setQuizList] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [qAnswer, setQAnswer] = useState(null);

  const toggleItem = (key, ko) => { speakKo(ko); setRevealed(p => ({ ...p, [key]: !p[key] })); };
  const startLesson = (lesson) => {
    setActiveLesson(lesson);
    setRevealed({});
    const shuffled = shuffleArray(lesson.quizzes || []).map(q => ({ ...q, opts: shuffleArray(q.opts) }));
    setQuizList(shuffled);
    setQIdx(0);
    setQAnswer(null);
    setScreen('lesson');
    setPlannerTasks(prev => prev.map(task => task.id === 1 ? { ...task, done: true } : task));
  };

  const t = {
    bg: isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-[#faf8f9] text-[#1e1e1e]',
    card: isDark ? 'bg-[#141a29] border-slate-800' : 'bg-white border-slate-200 shadow-2xs',
    sub: isDark ? 'bg-[#1c2438] border-slate-700' : 'bg-[#fafafa] border-slate-200',
    nav: isDark ? 'bg-[#0f1524]/95 border-t border-slate-800' : 'bg-white/95 border-t border-slate-200',
    textMain: isDark ? 'text-white' : 'text-[#1e1e1e]',
    textMuted: isDark ? 'text-slate-400' : 'text-slate-500'
  };

  // --- AUTH SCREEN ---
  if (!currentUser) {
    return (
      <div className={`min-h-screen w-full ${t.bg} flex flex-col justify-between p-6 pt-10 font-sans`}>
        <div className="max-w-md w-full mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <ZiyoOwlAvatar className="w-10 h-10 rounded-2xl" />
            <div>
              <span className={`font-black text-lg ${t.textMain}`}>ZiyoPrep</span>
              <span className="text-[10px] font-black text-emerald-500 block">한글 스튜디오</span>
            </div>
          </div>
          <button onClick={toggleDark} className={`p-2.5 rounded-full ${t.card} border`}>{isDark ? <Sun size={16} /> : <Moon size={16} />}</button>
        </div>

        <div className="max-w-md w-full mx-auto my-auto text-center space-y-6">
          {authMode === 'welcome' && (
            <>
              <div className="w-36 h-36 mx-auto"><ZiyoOwlAvatar className="w-full h-full rounded-[36px]" /></div>
              <h1 className={`text-2xl font-black ${t.textMain}`}>ZiyoPrep bilan koreys tilini o‘rganing!</h1>
              <div className="space-y-3">
                <button onClick={handleGuestLogin} className="w-full py-4 rounded-2xl bg-[#58cc02] text-white font-black text-sm uppercase shadow">Tezkor kirish (Mehmon)</button>
                <button onClick={() => { setAuthError(''); setAuthMode('google'); }} className={`w-full py-4 rounded-2xl ${t.card} border font-black text-sm ${t.textMain}`}>Google bilan davom etish</button>
                <div className="flex justify-center gap-4 pt-2">
                  <button onClick={() => { setAuthError(''); setAuthMode('login'); }} className="text-xs font-black text-emerald-600">Email orqali kirish</button>
                  <span className="text-slate-300">|</span>
                  <button onClick={() => { setAuthError(''); setAuthMode('register'); }} className="text-xs font-black text-indigo-500">Ro‘yxatdan o‘tish</button>
                </div>
              </div>
            </>
          )}

          {authMode === 'google' && (
            <div className={`${t.card} border rounded-3xl p-6 space-y-4 text-left`}>
              <button onClick={() => setAuthMode('welcome')} className="text-xs font-bold text-emerald-500">‹ Orqaga</button>
              <h2 className={`font-black text-base ${t.textMain}`}>Google hisob</h2>
              {authError && <div className="text-rose-500 text-xs">{authError}</div>}
              <form onSubmit={handleGoogleSubmit} className="space-y-3">
                <input type="text" placeholder="Ismingiz" value={authForm.name} onChange={e => setAuthForm({ ...authForm, name: e.target.value })} className={`w-full ${t.sub} border rounded-2xl p-3 text-xs`} />
                <input type="email" placeholder="Gmail manzilingiz" value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })} className={`w-full ${t.sub} border rounded-2xl p-3 text-xs`} />
                <button type="submit" className="w-full py-3 rounded-2xl bg-blue-600 text-white font-black text-xs">Tasdiqlash</button>
              </form>
            </div>
          )}

          {(authMode === 'login' || authMode === 'register' || authMode === 'forgot') && (
            <div className={`${t.card} border rounded-3xl p-6 space-y-4 text-left`}>
              <button onClick={() => { setAuthError(''); setResetSuccess(''); setAuthMode('welcome'); }} className="text-xs font-bold text-emerald-500">‹ Orqaga</button>
              <h2 className={`font-black text-base ${t.textMain}`}>
                {authMode === 'login' ? 'Tizimga kirish' : authMode === 'register' ? 'Ro‘yxatdan o‘tish' : 'Parolni tiklash'}
              </h2>
              {authError && <div className="text-rose-500 text-xs">{authError}</div>}
              {resetSuccess && <div className="text-emerald-500 text-xs">{resetSuccess}</div>}
              <form onSubmit={handleEmailAuth} className="space-y-3">
                {authMode === 'register' && <input type="text" placeholder="Ismingiz" value={authForm.name} onChange={e => setAuthForm({ ...authForm, name: e.target.value })} className={`w-full ${t.sub} border rounded-2xl p-3 text-xs`} />}
                <input type="email" placeholder="Email" value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })} className={`w-full ${t.sub} border rounded-2xl p-3 text-xs`} />
                <input type="password" placeholder={authMode === 'forgot' ? "Yangi parol" : "Parol"} value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })} className={`w-full ${t.sub} border rounded-2xl p-3 text-xs`} />
                <button type="submit" className="w-full py-3 rounded-2xl bg-[#58cc02] text-white font-black text-xs">
                  {authMode === 'login' ? 'Kirish' : authMode === 'register' ? 'Yaratish' : 'Yangilash'}
                </button>
              </form>
              {authMode === 'login' && (
                <div className="flex justify-between pt-1 text-xs">
                  <button onClick={() => setAuthMode('forgot')} className="text-slate-400">Parolni unutdingizmi?</button>
                  <button onClick={() => setAuthMode('register')} className="text-emerald-600 font-bold">Ro‘yxatdan o‘tish</button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="text-center text-[11px] text-slate-400">ZiyoPrep</div>
      </div>
    );
  }

  // --- HOME SCREEN ---
  const renderHome = () => {
    const dailyPct = Math.min(100, Math.round((profile.dailyXp / 100) * 100));
    return (
      <div className="space-y-4 pb-28">
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-2.5">
            <ZiyoOwlAvatar className="w-10 h-10 rounded-2xl" equipped={equippedItems} />
            <div>
              <h1 className={`text-lg font-black ${t.textMain}`}>ZiyoPrep</h1>
              <span className="text-[10px] font-bold text-emerald-600">한글 스튜디오 • 1A–6B</span>
            </div>
          </div>
          <button onClick={toggleDark} className={`p-2 rounded-full ${t.card} border`}>{isDark ? <Sun size={14} /> : <Moon size={14} />}</button>
        </div>

        <div className={`rounded-3xl ${t.card} border p-4 flex items-center gap-3.5`}>
          <ZiyoOwlAvatar className="w-16 h-16 rounded-2xl shrink-0" equipped={equippedItems} />
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-xs font-black ${t.textMain}`}>Salom, {profile.name}! 👋</span>
              <span className="text-[11px] font-black text-emerald-600">{profile.dailyXp}/100 XP</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-[#58cc02] rounded-full transition-all duration-500" style={{ width: `${dailyPct}%` }} />
            </div>
            <div className="text-[10px] text-slate-400">🔥 {profile.streak} kunlik streak • ⚡ {profile.xp} XP</div>
          </div>
        </div>

        <button onClick={() => startLesson(nextLesson)} className="w-full py-3.5 px-4 rounded-2xl bg-[#58cc02] text-white font-black text-xs flex items-center justify-center gap-2">
          <Play size={13} className="fill-white" /> Davom etish ({nextLesson.title})
        </button>

        {/* PLANNER */}
        <div className={`rounded-2xl ${t.card} border p-3.5 space-y-2`}>
          <div className="flex justify-between items-center text-xs font-black">
            <span className="flex items-center gap-1.5 text-indigo-500"><Target size={14} /> Kunlik O‘quv Rejasi</span>
            <span className="text-[10px] text-slate-400">{plannerTasks.filter(p => p.done).length}/{plannerTasks.length}</span>
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

        <div onClick={() => { setVocabQuizMode(false); setScreen('vocab'); }} className={`rounded-2xl ${t.card} border p-3.5 flex items-center justify-between cursor-pointer`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center">단어</div>
            <div>
              <div className={`font-black text-xs ${t.textMain}`}>📚 Lug‘atlar & Savol-Javob ({allVocabWords.length}+ so‘z)</div>
              <div className="text-[10px] text-slate-400">서울대 1A–6A barcha lug'atlar</div>
            </div>
          </div>
          <span className="text-indigo-500 font-black text-xs">Ochish ›</span>
        </div>

        {/* 12 BOOKS */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {snuBooks.map((b) => (
            <button key={b.code} onClick={() => setSelectedBookCode(b.code)} className={`px-3 h-8 rounded-lg font-black text-xs shrink-0 ${b.code === selectedBookCode ? 'bg-[#58cc02] text-white border-2 border-emerald-600' : `${t.card} border`}`}>
              {b.code}
            </button>
          ))}
        </div>

        <div className="space-y-2.5">
          {currentBook.lessons.map((lesson) => {
            const isDone = completedIds.includes(lesson.id);
            return (
              <div key={lesson.id} onClick={() => startLesson(lesson)} className={`rounded-2xl ${t.card} border p-3.5 flex justify-between items-center cursor-pointer`}>
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg font-black text-xs flex items-center justify-center ${isDone ? 'bg-[#58cc02] text-white' : 'bg-blue-100 text-blue-700'}`}>{lesson.num}</span>
                  <div>
                    <div className={`text-xs font-black ${t.textMain}`}>{lesson.title}</div>
                    <div className="text-[10px] text-slate-400">{lesson.heroUz}</div>
                  </div>
                </div>
                {isDone ? <CheckCircle2 size={17} className="text-[#58cc02]" /> : <span className="text-slate-300">›</span>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // --- VOCABULARY SCREEN ---
  const renderVocab = () => {
    const filteredWords = allVocabWords.filter(w => w.ko.toLowerCase().includes(vocabSearch.toLowerCase()) || w.uz.toLowerCase().includes(vocabSearch.toLowerCase()));
    return (
      <div className="space-y-3.5 pb-28">
        <div className="flex justify-between pt-2">
          <button onClick={() => setScreen('home')} className={`text-sm font-black ${t.textMain}`}><ArrowLeft size={16} /> Lug‘atlar</button>
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
          <input type="text" value={vocabSearch} onChange={e => setVocabSearch(e.target.value)} placeholder="So‘z qidirish..." className={`w-full ${t.card} border rounded-2xl pl-9 pr-4 py-2.5 text-xs font-bold outline-none`} />
        </div>
        <div className="space-y-1.5">
          {filteredWords.slice(0, 40).map((w, idx) => (
            <div key={idx} onClick={() => speakKo(w.ko)} className={`rounded-2xl ${t.card} border p-3 flex justify-between items-center cursor-pointer`}>
              <div>
                <div className={`text-sm font-black ${t.textMain}`}>{w.ko}</div>
                <div className="text-xs text-slate-400">{w.uz}</div>
              </div>
              <Volume2 size={16} className="text-indigo-500" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- BUILDER SCREEN ---
  const renderBuilder = () => (
    <div className="space-y-3.5 pb-28">
      <button onClick={() => setScreen('home')} className={`text-sm font-black ${t.textMain}`}><ArrowLeft size={16} /> Harf Yig‘ish</button>
      <div className={`rounded-3xl ${t.card} border p-8 text-center`}>
        <div className={`text-6xl font-black ${t.textMain}`}>한글</div>
        <p className="text-xs text-slate-400 mt-2">Hangul alifbosi va bo'g'in yig'ish</p>
      </div>
    </div>
  );

  // --- LESSON SCREEN ---
  const renderLesson = () => {
    if (!activeLesson) return null;
    const currentQ = quizList[qIdx];
    return (
      <div className="space-y-3.5 pb-28">
        <button onClick={() => setScreen('home')} className="text-xs font-black text-slate-400"><ArrowLeft size={15} /> Orqaga</button>
        <div className={`rounded-2xl ${t.card} border p-4`}>
          <div className={`text-base font-black ${t.textMain}`}>{activeLesson.title}</div>
        </div>
        {currentQ && (
          <div className={`rounded-3xl ${t.card} border p-4 space-y-3`}>
            <div className={`text-sm font-black ${t.textMain}`}>{currentQ.q}</div>
            <div className="space-y-2">
              {currentQ.opts.map(opt => (
                <button key={opt} onClick={() => {
                  if (opt === currentQ.ans) {
                    setProfile(p => ({ ...p, xp: p.xp + 10 }));
                    alert("To'g'ri! 🎉 (+10 XP)");
                    if (qIdx + 1 < quizList.length) setQIdx(qIdx + 1);
                    else { setCompletedIds(p => [...new Set([...p, activeLesson.id])]); setScreen('home'); }
                  } else {
                    setMistakes(m => [...m, { ko: currentQ.ans, uz: currentQ.q }]);
                    alert("Xato! Xatolar daftariga qo'shildi.");
                  }
                }} className={`w-full p-3 rounded-2xl border text-xs font-bold ${t.sub} ${t.textMain}`}>{opt}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // --- AI TUTOR SCREEN (토히르벡) ---
  const renderAiTutor = () => (
    <div className="flex flex-col h-[78vh] pb-24 pt-2">
      <div className="flex items-center gap-2.5 pb-3">
        <ZiyoOwlAvatar className="w-11 h-11 rounded-2xl" />
        <div>
          <h2 className={`font-black text-sm ${t.textMain}`}>토히르벡</h2>
          <span className="text-[10px] font-bold text-emerald-500">● AI ustozi bilan muloqot</span>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto rounded-3xl ${t.card} border p-4 space-y-3`}>
        {aiMessages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div onClick={() => m.role === 'ai' && m.ko && speakKo(m.ko)} className={`max-w-[85%] rounded-2xl p-3.5 text-xs space-y-1 cursor-pointer ${m.role === 'user' ? 'bg-[#58cc02] text-white font-bold' : `${t.sub} ${t.textMain}`}`}>
              {m.ko && <div className="font-black">{m.ko}</div>}
              {m.uz && <div className="text-[11px] opacity-90">{m.uz}</div>}
            </div>
          </div>
        ))}
        {aiLoading && <div className="text-xs text-slate-400 animate-pulse">토히르벡 yozmoqda...</div>}
        <div ref={chatEndRef} />
      </div>

      <div className="pt-3 flex gap-2">
        <input type="text" value={aiInput} onChange={e => setAiInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAiSend()} placeholder="Savol yozing..." className={`flex-1 ${t.card} border rounded-2xl px-4 py-3 text-xs font-bold outline-none`} />
        <button onClick={() => handleAiSend()} disabled={aiLoading} className="px-4 rounded-2xl bg-[#58cc02] text-white font-black"><Send size={18} /></button>
      </div>
    </div>
  );

  // --- REVIEW SCREEN ---

  // --- DUOLINGO USLUBDAGI MASHQ VA LUG'AT TESTI ---
  const [exerciseActive, setExerciseActive] = useState(false);
  const [exStep, setExStep] = useState(0);
  const [exScore, setExScore] = useState(0);
  const [exTarget, setExTarget] = useState(null);
  const [exOpts, setExOpts] = useState([]);
  const [exSelected, setExSelected] = useState(null);
  const [showExitAlert, setShowExitAlert] = useState(false);

  const startDuolingoExercise = () => {
    const pool = allWords.length >= 4 ? allWords : allVocabWords;
    const target = pool[Math.floor(Math.random() * pool.length)];
    const wrongs = shuffleArray(pool.filter(w => w.uz !== target.uz)).slice(0, 3).map(w => w.uz);
    setExTarget(target);
    setExOpts(shuffleArray([target.uz, ...wrongs]));
    setExSelected(null);
    setExerciseActive(true);
    speakKo(target.ko);
  };

  const renderReview = () => {
    // Agar Duolingo uslubidagi mashq boshlangan bo'lsa
    if (exerciseActive && exTarget) {
      const progressPercent = Math.min(100, (exStep / 5) * 100);

      return (
        <div className="space-y-6 pb-28 pt-2 select-none">
          {/* Yuqori Panel: Chiqish (✕) tugmasi va Progress bar */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowExitAlert(true)} 
              className="text-slate-400 hover:text-slate-600 font-black text-lg"
            >
              ✕
            </button>
            <div className="flex-1 h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-[#58cc02] rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="flex items-center gap-1 text-rose-500 font-black text-xs">
              ❤️ 5
            </div>
          </div>

          {/* Chiqish ogohlantirishi (Alert Modal) */}
          {showExitAlert && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className={`${t.card} border rounded-3xl p-6 max-w-xs w-full text-center space-y-4 shadow-2xl`}>
                <div className="text-3xl">⚠️</div>
                <h3 className={`text-base font-black ${t.textMain}`}>Mashqni tark etasizmi?</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Agar hozir chiqib ketsangiz, to‘plagan yutuqlaringiz va streak saqlanmaydi!
                </p>
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => setShowExitAlert(false)}
                    className="w-full py-3 rounded-2xl bg-[#58cc02] text-white font-black text-xs uppercase"
                  >
                    Mashqni davom ettirish
                  </button>
                  <button
                    onClick={() => {
                      setShowExitAlert(false);
                      setExerciseActive(false);
                    }}
                    className="w-full py-3 rounded-2xl bg-rose-500/10 text-rose-500 font-black text-xs uppercase"
                  >
                    Chiqib ketish
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Savol qismi */}
          <div className="space-y-3">
            <span className="text-[10px] font-black uppercase text-indigo-500 tracking-wider">새로운 단어 • Yangi so‘z</span>
            <h2 className={`text-lg font-black ${t.textMain}`}>To‘g‘ri tarjimani tanlang</h2>
            
            <div 
              onClick={() => speakKo(exTarget.ko)}
              className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-400 cursor-pointer active:scale-95 transition`}
            >
              <Volume2 size={18} />
              <span className="text-xl font-black">{exTarget.ko}</span>
            </div>
          </div>

          {/* 4 ta tanlov kartochkalari (Grid) */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {exOpts.map((opt, idx) => {
              const isSelected = exSelected === opt;
              const isCorrect = opt === exTarget.uz;

              let btnStyle = `${t.card} border-2 ${t.textMain} hover:border-emerald-400`;
              if (exSelected !== null) {
                if (isCorrect) btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md';
                else if (isSelected) btnStyle = 'bg-rose-500 text-white border-rose-600 shadow-md';
                else btnStyle = `${t.card} opacity-40`;
              }

              return (
                <button
                  key={idx}
                  disabled={exSelected !== null}
                  onClick={() => {
                    setExSelected(opt);
                    if (isCorrect) {
                      setExScore(s => s + 1);
                      setProfile(p => ({ ...p, xp: p.xp + 10, dailyXp: p.dailyXp + 10 }));
                    } else {
                      setMistakes(m => [...m, { ko: exTarget.ko, uz: exTarget.uz }]);
                    }
                  }}
                  className={`p-4 rounded-3xl border-2 text-center flex flex-col items-center justify-center min-h-[110px] font-black text-sm transition-all active:scale-95 ${btnStyle}`}
                >
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Pastki Tasdiqlash / Keyingi bosqich paneli */}
          {exSelected !== null && (
            <div className={`fixed bottom-0 inset-x-0 ${isDark ? 'bg-[#0b0f19]' : 'bg-white'} border-t p-4 space-y-3 z-30`}>
              <div className="max-w-md mx-auto flex items-center justify-between">
                <div>
                  <div className={`font-black text-sm ${exSelected === exTarget.uz ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {exSelected === exTarget.uz ? '참 잘했어요! 🎉 (Ajoyib!)' : `Xato! To‘g‘risi: ${exTarget.uz}`}
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (exStep + 1 >= 5) {
                      setExerciseActive(false);
                      alert("Tabriklayman! Mashq muvaffaqiyatli yakunlandi! 🏆");
                    } else {
                      setExStep(s => s + 1);
                      startDuolingoExercise();
                    }
                  }}
                  className="py-3 px-8 rounded-2xl bg-[#58cc02] text-white font-black text-xs uppercase shadow-lg active:scale-95 transition"
                >
                  Davom etish ›
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Asosiy Mashq menyusi
    return (
      <div className="space-y-4 pb-28 pt-2">
        <div className={`rounded-3xl ${isDark ? 'bg-emerald-950/40 border-emerald-800' : 'bg-gradient-to-r from-[#eef9e8] to-[#e4f5fc] border-[#cdeac0]'} border p-5 text-center space-y-3`}>
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#58cc02] text-white flex items-center justify-center text-2xl shadow-md">
            🎯
          </div>
          <h2 className={`text-base font-black ${t.textMain}`}>Duolingo Uslubidagi Interaktiv Mashq</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            Lug‘atlar va so‘zlarni tezkor testlar orqali mustahkamlang va XP yig‘ing!
          </p>
          <button
            onClick={() => {
              setExStep(0);
              setExScore(0);
              startDuolingoExercise();
            }}
            className="w-full py-3.5 rounded-2xl bg-[#58cc02] hover:bg-[#4cb800] border-b-4 border-[#46a302] text-white font-black text-xs uppercase shadow-lg active:translate-y-0.5 transition"
          >
            Mashqni Boshlash 🚀
          </button>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center text-xs font-black px-1">
            <span className={t.textMain}>📌 Xatolar daftari ({mistakes.length})</span>
            {mistakes.length > 0 && <button onClick={() => setMistakes([])} className="text-rose-500 underline text-[10px]">Tozalash</button>}
          </div>
          {mistakes.length === 0 ? (
            <div className={`rounded-3xl ${t.card} border p-8 text-center text-xs text-slate-400`}>Hozircha xatolar yo‘q! Ajoyib! 🎉</div>
          ) : (
            mistakes.map((m, idx) => (
              <div key={idx} onClick={() => speakKo(m.ko)} className={`rounded-2xl ${t.card} border p-3.5 flex justify-between items-center cursor-pointer hover:border-indigo-400 transition`}>
                <div>
                  <div className={`text-sm font-black ${t.textMain}`}>{m.ko}</div>
                  <div className="text-xs text-slate-400 font-bold mt-0.5">{m.uz}</div>
                </div>
                <Volume2 size={16} className="text-rose-500" />
              </div>
            ))
          )}
        </div>
      </div>
    );
  };
