import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, ArrowLeft, Globe, Lock, CheckCircle2, 
  ChevronUp, ChevronDown, Edit3, Shuffle, Play, 
  BookOpen, Sparkles, RotateCcw, User, 
  Flame, Zap, Send, Sun, Moon, LogOut,
  Headphones, Mic, Clock, Layers, Timer,
  MessageSquare, Keyboard, ShoppingBag, Trophy, Search,
  Bookmark, CheckSquare, Award, Target, Star, Bell, Check, AlertCircle
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

  const handleGoogleLogin = () => {
    window.location.href = "https://accounts.google.com/signin";
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
  const [isDark, setIsDark] = useState(() => localStorage.getItem('hs_dark'] === 'true');
  const [selectedBookCode, setSelectedBookCode] = useState('1A');
  const [activeLesson, setActiveLesson] = useState(null);

  // Bildirishnomalar holati va Zinapoya yarmida tashlab ketilsa ogohlantirish qo'shish
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: '⚡ Zinapoya yarmida to‘xtatildi!', desc: '1A darajasini oxirigacha yakunlash uchun davom eting!', time: 'Hozir', unread: true },
    { id: 2, title: '🔔 Kunlik vazifa eslatmasi', desc: 'Bugungi 15 daqiqalik o‘quv rejangizni bajarishni unutmang.', time: '2 soat oldin', unread: true }
  ]);

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
  const [vocabSearch, setVocabSearch] = useState('');

  // --- MASHQ VA STATISTIKA ---
  const [exerciseActive, setExerciseActive] = useState(false);
  const [currentLevelId, setCurrentLevelId] = useState(null);
  const [exStep, setExStep] = useState(0);
  const [exTarget, setExTarget] = useState(null);
  const [exOpts, setExOpts] = useState([]);
  const [exSelected, setExSelected] = useState(null);
  const [showExitAlert, setShowExitAlert] = useState(false);
  const [levelCompleteData, setLevelCompleteData] = useState(null);

  const startTimeRef = useRef(null);
  const [sessionMistakes, setSessionMistakes] = useState(0);

  const exerciseLevels = Array.from({ length: 60 }, (_, i) => {
    const id = i + 1;
    const icons = ['⭐', '🌱', '☕', '⏰', '🔥', '💎', '🚀', '🎯', '🏆', '👑'];
    const themes = [
      'Alifbo va unlilar', 'Asosiy so‘zlar', 'Salomlashish', 'Oila a’zolari', 
      'Raqamlar va vaqt', 'Oziq-ovqat', 'Kafeda buyurtma', 'Shahar va transport', 
      'Kasblar', 'Do‘kon va xarid', 'Ob-havo', 'Hissiyotlar', 
      'Sayohat', 'X koronasi', 'TOPIK 1 lug‘atlari', 'Murakkab fe’llar'
    ];
    return {
      id,
      title: `${id}-daraja: ${themes[(id - 1) % themes.length]}`,
      subtitle: id <= 10 ? 'Boshlang‘ich (1-daraja)' : id <= 30 ? 'O‘rta daraja' : 'Yuqori daraja (TOPIK)',
      icon: icons[(id - 1) % icons.length],
      difficulty: Math.min(5, Math.ceil(id / 12))
    };
  });

  const [completedLevels, setCompletedLevels] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hs_completed_levels')) || [1]; } catch { return [1]; }
  });

  useEffect(() => { localStorage.setItem('hs_completed_levels', JSON.stringify(completedLevels)); }, [completedLevels]);

  const [profile, setProfile] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('hs_profile'));
      return { name: saved?.name || 'Tokhirbek', xp: saved?.xp ?? 2700, dailyXp: saved?.dailyXp ?? 60, streak: saved?.streak ?? 24, freezes: saved?.freezes ?? 1 };
    } catch {
      return { name: 'Tokhirbek', xp: 2700, dailyXp: 60, streak: 24, freezes: 1 };
    }
  });
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(profile.name);

  const [equippedItems, setEquippedItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hs_equipped_items')) || { glasses: false, gradCap: false, crown: false }; } catch { return { glasses: false, gradCap: false, crown: false }; }
  });

  const [completedIds, setCompletedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hs_completed')) || []; } catch { return []; }
  });

  useEffect(() => { localStorage.setItem('hs_profile', JSON.stringify(profile)); }, [profile]);
  useEffect(() => { localStorage.setItem('hs_completed', JSON.stringify(completedIds)); }, [completedIds]);
  useEffect(() => { localStorage.setItem('hs_mistakes', JSON.stringify(mistakes)); }, [mistakes]);
  useEffect(() => { localStorage.setItem('hs_planner', JSON.stringify(plannerTasks)); }, [plannerTasks]);

  const toggleDark = () => setIsDark(prev => { const next = !prev; localStorage.setItem('hs_dark', String(next)); return next; });

  const speakKo = (text) => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const clean = text.replace(/[\(\)\[\]~]/g, '').trim();
      const u = new SpeechSynthesisUtterance(clean);
      u.lang = 'ko-KR';
      u.rate = 0.95;
      u.pitch = 1.2;

      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v => v.lang.includes('ko') && (v.name.includes('Female') || v.name.includes('Google') || v.name.includes('Heami') || v.name.includes('Sun-Hi')));
      if (femaleVoice) {
        u.voice = femaleVoice;
      }

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

  const handleAiSend = async () => {
    const text = aiInput.trim();
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

  const [quizList, setQuizList] = useState([]);
  const [qIdx, setQIdx] = useState(0);

  const startLesson = (lesson) => {
    setActiveLesson(lesson);
    const shuffled = shuffleArray(lesson.quizzes || []).map(q => ({ ...q, opts: shuffleArray(q.opts) }));
    setQuizList(shuffled);
    setQIdx(0);
    setScreen('lesson');
    setPlannerTasks(prev => prev.map(task => task.id === 1 ? { ...task, done: true } : task));
  };

  const startLevelExercise = (level) => {
    setCurrentLevelId(level.id);
    setExStep(0);
    setSessionMistakes(0);
    startTimeRef.current = Date.now();
    setLevelCompleteData(null);
    loadNextQuestion();
    setExerciseActive(true);
  };

  const loadNextQuestion = () => {
    const pool = allVocabWords.length > 0 ? allVocabWords : allLessons.flatMap(l => l.words || []);
    const target = pool[Math.floor(Math.random() * pool.length)];
    const wrongs = shuffleArray(pool.filter(w => w.uz !== target.uz)).slice(0, 3).map(w => w.uz);
    setExTarget(target);
    setExOpts(shuffleArray([target.uz, ...wrongs]));
    setExSelected(null);
    speakKo(target.ko);
  };

  const t = {
    bg: isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-[#f8f9fc] text-[#1e1e1e]',
    card: isDark ? 'bg-[#141a29] border-slate-800' : 'bg-white border-slate-100 shadow-xs',
    sub: isDark ? 'bg-[#1c2438] border-slate-700' : 'bg-[#f1f5f9] border-slate-200',
    nav: isDark ? 'bg-[#0f1524]/95 border-t border-slate-800' : 'bg-white/95 border-t border-slate-100',
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
                <button onClick={() => { setAuthError(''); setAuthMode('login'); }} className={`w-full py-4 rounded-2xl ${t.card} border font-black text-sm ${t.textMain}`}>Tizimga kirish</button>
                <button onClick={() => { setAuthError(''); setAuthMode('register'); }} className={`w-full py-3 rounded-2xl bg-indigo-600 text-white font-black text-sm uppercase`}>Ro‘yxatdan o‘tish</button>
                <button onClick={handleGoogleLogin} className={`w-full py-3 rounded-2xl ${t.card} border font-black text-xs ${t.textMain} flex items-center justify-center gap-2 shadow-xs`}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.15 21.32 7.22 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.18C.43 8.12 0 9.83 0 12s.43 3.88 1.18 5.39l4.09-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.15 2.68 1.18 6.61l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96z"/>
                  </svg>
                  Google bilan davom etish
                </button>
              </div>
            </>
          )}

          {(authMode === 'login' || authMode === 'register' || authMode === 'forgot') && (
            <div className={`${t.card} border rounded-3xl p-6 space-y-4 text-left shadow-xl`}>
              <button onClick={() => { setAuthError(''); setAuthMode('welcome'); }} className="text-xs font-bold text-emerald-500">‹ Orqaga</button>
              <h2 className={`font-black text-base ${t.textMain}`}>
                {authMode === 'login' && 'Tizimga kirish'}
                {authMode === 'register' && 'Yangi аккаунт ochish'}
                {authMode === 'forgot' && 'Parolni tiklash'}
              </h2>
              {authError && <div className="text-rose-500 text-xs font-bold">{authError}</div>}
              {resetSuccess && <div className="text-emerald-500 text-xs font-bold">{resetSuccess}</div>}

              <form onSubmit={handleEmailAuth} className="space-y-3">
                {authMode === 'register' && (
                  <input type="text" placeholder="Ismingiz" value={authForm.name} onChange={e => setAuthForm({ ...authForm, name: e.target.value })} className={`w-full ${t.sub} border rounded-2xl p-3 text-xs font-bold`} />
                )}
                <input type="email" placeholder="Email manzilingiz" value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })} className={`w-full ${t.sub} border rounded-2xl p-3 text-xs font-bold`} />
                {authMode !== 'forgot' && (
                  <input type="password" placeholder="Parol (kamida 4 ta belgi)" value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })} className={`w-full ${t.sub} border rounded-2xl p-3 text-xs font-bold`} />
                )}
                {authMode === 'forgot' && (
                  <input type="password" placeholder="Yangi parol kiriting" value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })} className={`w-full ${t.sub} border rounded-2xl p-3 text-xs font-bold`} />
                )}

                <button type="submit" className="w-full py-3 rounded-2xl bg-[#58cc02] text-white font-black text-xs uppercase shadow">
                  {authMode === 'login' && 'Kirish'}
                  {authMode === 'register' && 'Ro‘yxatdan o‘tish'}
                  {authMode === 'forgot' && 'Parolni yangilash'}
                </button>
              </form>

              {authMode === 'login' && (
                <div className="flex justify-between items-center text-[11px] pt-1">
                  <button onClick={() => { setAuthError(''); setAuthMode('forgot'); }} className="text-slate-400 hover:underline">Parolni unutdingizmi?</button>
                  <button onClick={() => { setAuthError(''); setAuthMode('register'); }} className="text-emerald-500 font-bold hover:underline">Ro‘yxatdan o‘tish</button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="text-center text-[11px] text-slate-400">ZiyoPrep</div>
      </div>
    );
  }

  // --- APPLE-INSPIRED HOME SCREEN DESIGN ---
  const renderHome = () => {
    return (
      <div className="space-y-6 pb-28 pt-2 font-sans select-none">
        {/* Top Header: Logo, Notification Bell, Profile Avatar */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ZiyoPrep</h1>
            <div className="mt-1">
              <h2 className={`text-lg font-black ${t.textMain}`}>안녕하세요, {profile.name}! 👋</h2>
              <p className="text-xs text-slate-400 font-medium">오늘도 한국어를 배워볼까요?</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowNotifications(true)} className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-xs border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 relative">
              <Bell size={18} />
              {notifications.some(n => n.unread) && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500"></span>}
            </button>
            <button onClick={() => setScreen('profile')} className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black text-sm">
              {profile.name.charAt(0)}
            </button>
          </div>
        </div>

        {/* NOTIFICATIONS MODAL */}
        {showNotifications && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className={`${t.card} border rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl`}>
              <div className="flex justify-between items-center border-b pb-3 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Bell size={18} className="text-blue-600" />
                  <h3 className={`font-black text-sm ${t.textMain}`}>Bildirishnomalar</h3>
                </div>
                <button onClick={() => setShowNotifications(false)} className="text-slate-400 font-bold text-sm">✕</button>
              </div>
              <div className="space-y-2.5 max-h-64 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className={`p-3 rounded-2xl border ${n.unread ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200' : `${t.sub} opacity-75`} space-y-1`}>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-black ${t.textMain}`}>{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{n.desc}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowNotifications(false)} className="w-full py-3 rounded-2xl bg-blue-600 text-white font-black text-xs uppercase shadow">Yopish</button>
            </div>
          </div>
        )}

        {/* Progress & Stats Compact Widget */}
        <div onClick={() => setScreen('review')} className={`${t.card} border rounded-3xl p-5 shadow-xs flex items-center justify-between cursor-pointer hover:border-indigo-400 transition`}>
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-100 dark:text-slate-800" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-blue-600" strokeDasharray="75, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute text-xs font-black text-slate-800 dark:text-white">75%</div>
            </div>
            <div>
              <h3 className={`text-sm font-black ${t.textMain}`}>Korean 1A</h3>
              <div className="w-36 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full my-2 overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500">
                <span className="flex items-center gap-1 text-amber-500">🔥 {profile.streak}일 연속</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-indigo-500">⭐ {profile.xp} XP</span>
              </div>
            </div>
          </div>
          <span className="text-slate-300 font-bold text-lg">›</span>
        </div>

        {/* 1 - Asosiy Dars Card */}
        <div 
          onClick={() => startLesson(nextLesson)} 
          className="rounded-[32px] overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-800 text-white p-6 relative shadow-xl cursor-pointer active:scale-98 transition group"
        >
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-black tracking-wide uppercase">
              <Play size={10} className="fill-white" /> 계속 학습하기
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">{selectedBookCode} - 첫 번째 수업</h2>
              <p className="text-xs text-blue-100 font-medium mt-1">안녕하세요를 배워요</p>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-blue-200 font-bold flex items-center gap-1">
                <Clock size={12} /> 약 5분
              </span>
              <button className="px-5 py-2.5 rounded-2xl bg-white text-blue-600 font-black text-xs shadow-lg flex items-center gap-1 group-hover:bg-blue-50 transition">
                지금 시작하기 <span>›</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3, 4 va YANGI 5-blok: Grammatika, Tinglash, Gapirish (Barchasi turlicha!) */}
        <div className="grid grid-cols-3 gap-3">
          {/* 5-blok o'rniga: Grammatika o'rganish */}
          <div onClick={() => setScreen('grammar')} className={`${t.card} border rounded-3xl p-4 text-center cursor-pointer hover:border-purple-400 transition space-y-2`}>
            <div className="w-10 h-10 mx-auto rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <BookOpen size={20} />
            </div>
            <div>
              <div className={`text-xs font-black ${t.textMain}`}>문법 학습</div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">Grammatika</div>
            </div>
          </div>

          {/* 4-blok: Tinglash mashqi */}
          <div onClick={() => startLesson(nextLesson)} className={`${t.card} border rounded-3xl p-4 text-center cursor-pointer hover:border-emerald-400 transition space-y-2`}>
            <div className="w-10 h-10 mx-auto rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Headphones size={20} />
            </div>
            <div>
              <div className={`text-xs font-black ${t.textMain}`}>듣기 연습</div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">오늘 10분</div>
            </div>
          </div>

          {/* 3-blok: Gapirish mashqi */}
          <div onClick={() => setScreen('ai')} className={`${t.card} border rounded-3xl p-4 text-center cursor-pointer hover:border-amber-400 transition space-y-2`}>
            <div className="w-10 h-10 mx-auto rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Mic size={20} />
            </div>
            <div>
              <div className={`text-xs font-black ${t.textMain}`}>말하기 연습</div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">AI Muloqot</div>
            </div>
          </div>
        </div>

        {/* Course Selection (코스 선택 1A - 4B) */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h3 className={`text-sm font-black ${t.textMain}`}>코스 선택</h3>
            <button onClick={() => setScreen('review')} className="text-xs font-black text-indigo-600">전체 보기 ›</button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B'].map((code) => (
              <button 
                key={code} 
                onClick={() => setSelectedBookCode(code)} 
                className={`py-3 rounded-2xl font-black text-xs transition border ${
                  code === selectedBookCode 
                    ? 'bg-blue-600 text-white border-blue-700 shadow-md' 
                    : `${t.card} ${t.textMain} hover:border-indigo-300`
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Mascot Motivational Card at bottom */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/20 border border-emerald-500/30 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 shrink-0">
              <ZiyoOwlAvatar className="w-full h-full rounded-2xl" equipped={equippedItems} />
            </div>
            <div>
              <h4 className={`text-xs font-black ${t.textMain}`}>오늘도 수고했어요!</h4>
              <p className="text-[10px] text-slate-500 font-bold mt-0.5">꾸준함이 실력을 만드는 중 ✨</p>
            </div>
          </div>
          <div className="text-emerald-600 font-black text-lg">📈</div>
        </div>
      </div>
    );
  };

  // --- 📚 GRAMMAR LEARNING SCREEN (문법 학습) ---
  const renderGrammarScreen = () => {
    const grammarRules = [
      { title: '-아요 / 어요 (Hozirgi zamon rasmiy-hurmatli)', desc: 'Fe’l o‘zaklarida unli tovushga qarab qo‘shiladi.', example: '가다 -> 가요 (Boraman/Boradi)' },
      { title: '-고 싶다 (Xohishni bildirish)', desc: 'Biror ishni qilishni xohlashni anglatadi.', example: '한국에 가고 싶어요. (Koreyaga bormoqchiman.)' },
      { title: '-기 때문에 (Sabab-oqibat)', desc: 'Biror ish sodir bo‘lish sababini tushuntiradi.', example: '비가 오기 때문에 안 가요. (Yomg‘ir yog‘ayotgani uchun bormayman.)' },
      { title: '--(으)ㄹ 수 있다/없다 (Imkoniyat)', desc: 'Biror ishni qila olish yoki qila olmaslikni bildiradi.', example: '한국어를 읽을 수 있어요. (Koreys tilini o‘qiy olaman.)' },
      { title: '-아/어 보다 (Tajriba qilib ko‘rish)', desc: 'Biror ishni sinab ko‘rish ma’nosini beradi.', example: '이 김치를 먹어 보세요. (Bu kimchini tatib ko‘ring.)' }
    ];

    return (
      <div className="space-y-4 pb-28 pt-2">
        <div className="flex items-center justify-between">
          <button onClick={() => setScreen('home')} className={`flex items-center gap-1.5 text-sm font-black ${t.textMain}`}>
            <ArrowLeft size={16} /> <span>Asosiy sahifa</span>
          </button>
          <span className="text-xs font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">문법 학습 (Grammatika)</span>
        </div>

        <div className="space-y-3">
          {grammarRules.map((g, idx) => (
            <div key={idx} className={`${t.card} border rounded-3xl p-4 space-y-2 shadow-xs`}>
              <div className={`text-sm font-black text-purple-600 dark:text-purple-400`}>{g.title}</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{g.desc}</p>
              <div className="p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950/30 text-xs font-bold text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-900">
                💡 Misol: {g.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- VOCABULARY SCREEN ---
  const renderVocab = () => {
    const filteredWords = allVocabWords.filter(w => w.ko.toLowerCase().includes(vocabSearch.toLowerCase()) || w.uz.toLowerCase().includes(vocabSearch.toLowerCase()));
    return (
      <div className="space-y-3.5 pb-28 pt-2">
        <div className="flex justify-between items-center">
          <h2 className={`text-base font-black ${t.textMain}`}>단어장 (Barcha Lug‘atlar)</h2>
          <span className="text-xs font-bold text-indigo-600">{filteredWords.length} ta so'z</span>
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
          <input type="text" value={vocabSearch} onChange={e => setVocabSearch(e.target.value)} placeholder="So‘z qidirish..." className={`w-full ${t.card} border rounded-2xl pl-9 pr-4 py-2.5 text-xs font-bold outline-none`} />
        </div>
        <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
          {filteredWords.map((w, idx) => (
            <div key={idx} onClick={() => speakKo(w.ko)} className={`rounded-2xl ${t.card} border p-3.5 flex justify-between items-center cursor-pointer hover:border-indigo-400 transition`}>
              <div>
                <div className={`text-sm font-black ${t.textMain}`}>{w.ko}</div>
                <div className="text-xs text-slate-400 font-bold mt-0.5">{w.uz}</div>
              </div>
              <Volume2 size={18} className="text-indigo-500 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- BUILDER SCREEN ---
  const renderBuilder = () => (
    <div className="space-y-3.5 pb-28 pt-2">
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
      <div className="space-y-3.5 pb-28 pt-2">
        <button onClick={() => setScreen('home')} className="text-xs font-black text-slate-400 flex items-center gap-1"><ArrowLeft size={15} /> Orqaga</button>
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

  // --- 🏔️ MASHQ SCREEN (Zinapoyadan yarmida chiqib ketilsa bildirishnoma qo'shiladi) ---
  const renderReview = () => {
    if (levelCompleteData) {
      return (
        <div className="space-y-6 pb-28 pt-4 text-center select-none animate-fade-in">
          <div className="w-32 h-32 mx-auto">
            <ZiyoOwlAvatar className="w-full h-full rounded-full border-4 border-emerald-500 shadow-2xl" equipped={equippedItems} />
          </div>

          <div className="space-y-1">
            <h2 className={`text-2xl font-black text-emerald-600 dark:text-emerald-400`}>참 잘했어요! 대단해요!</h2>
            <p className="text-xs font-bold text-slate-500">Ajoyib natija! {levelCompleteData.levelId}-darajani muvaffaqiyatli yakunladingiz!</p>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className={`${t.card} border-2 border-amber-400/80 rounded-2xl p-3 shadow-md flex flex-col items-center justify-center`}>
              <span className="text-[10px] font-black uppercase text-amber-500">XP Olingan</span>
              <span className="text-xl font-black mt-1 text-amber-500 flex items-center gap-1">⚡ +{levelCompleteData.xpGained}</span>
            </div>
            <div className={`${t.card} border-2 border-emerald-400/80 rounded-2xl p-3 shadow-md flex flex-col items-center justify-center`}>
              <span className="text-[10px] font-black uppercase text-emerald-500">To'g'ri javoblar</span>
              <span className="text-xs font-black mt-1 text-emerald-600">🎯 {levelCompleteData.scoreText}</span>
            </div>
            <div className={`${t.card} border-2 border-sky-400/80 rounded-2xl p-3 shadow-md flex flex-col items-center justify-center`}>
              <span className="text-[10px] font-black uppercase text-sky-500">Vaqt</span>
              <span className="text-xl font-black mt-1 text-sky-500">⏱️ {levelCompleteData.time}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setLevelCompleteData(null);
              setExerciseActive(false);
            }}
            className="w-full py-4 rounded-2xl bg-[#58cc02] hover:bg-[#4cb800] text-white font-black text-xs uppercase shadow-xl active:scale-95 transition"
          >
            XP ni olish va davom etish ›
          </button>
        </div>
      );
    }

    if (exerciseActive && exTarget) {
      const progressPercent = Math.min(100, ((exStep + 1) / 5) * 100);

      return (
        <div className="space-y-6 pb-32 pt-2 select-none">
          <div className="flex items-center gap-4">
            <button onClick={() => setShowExitAlert(true)} className="text-slate-400 hover:text-slate-600 font-black text-lg p-1">✕</button>
            <div className="flex-1 h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-[#58cc02] rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="flex items-center gap-1 text-rose-500 font-black text-xs">❤️ 5</div>
          </div>

          {showExitAlert && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className={`${t.card} border rounded-3xl p-6 max-w-xs w-full text-center space-y-4 shadow-2xl`}>
                <div className="text-3xl">⚠️</div>
                <h3 className={`text-base font-black ${t.textMain}`}>Mashqni tark etasizmi?</h3>
                <div className="space-y-2 pt-2">
                  <button onClick={() => setShowExitAlert(false)} className="w-full py-3 rounded-2xl bg-[#58cc02] text-white font-black text-xs uppercase shadow">Davom etish</button>
                  <button onClick={() => {
                    setShowExitAlert(false);
                    setExerciseActive(false);
                    // Zinapoya yarmida tashlab ketilsa bildirishnoma qo'shish
                    setNotifications(prev => [
                      { id: Date.now(), title: '⚡ Zinapoya yarmida to‘xtatildi!', desc: `${currentLevelId}-darajani oxirigacha tugatmadingiz. Qaytadan urinib ko‘ring!`, time: 'Hozir', unread: true },
                      ...prev
                    ]);
                  }} className="w-full py-3 rounded-2xl bg-rose-500/10 text-rose-500 font-black text-xs uppercase">Chiqib ketish</button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3 text-center pt-2">
            <span className="text-[11px] font-black uppercase text-purple-600 bg-purple-100 dark:bg-purple-950 px-3 py-1 rounded-full">새로운 단어 (Yangi so'z)</span>
            <h2 className={`text-sm font-black ${t.textMain}`}>To'g'ri ma'noni tanlang</h2>
            
            <div onClick={() => speakKo(exTarget.ko)} className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-600 cursor-pointer active:scale-95 transition shadow-sm mx-auto`}>
              <Volume2 size={22} />
              <span className="text-2xl font-black">{exTarget.ko}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5 pt-2">
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
                      setProfile(p => ({ ...p, xp: p.xp + 10, dailyXp: p.dailyXp + 10 }));
                    } else {
                      setSessionMistakes(prev => prev + 1);
                      setMistakes(m => [...m, { ko: exTarget.ko, uz: exTarget.uz }]);
                    }
                  }}
                  className={`p-5 rounded-3xl border-2 text-center flex flex-col items-center justify-center min-h-[110px] font-black text-sm transition-all active:scale-95 ${btnStyle}`}
                >
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {exSelected !== null && (
            <div className={`fixed bottom-0 inset-x-0 ${isDark ? 'bg-[#141a29]' : 'bg-white'} border-t p-4 space-y-3 z-50 shadow-2xl`}>
              <div className="max-w-md mx-auto flex items-center justify-between">
                <div>
                  <div className={`font-black text-sm ${exSelected === exTarget.uz ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {exSelected === exTarget.uz ? '✨ 참 잘했어요! (Ajoyib!)' : `❌ Xato! To‘g‘risi: ${exTarget.uz}`}
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (exStep + 1 >= 5) {
                      if (!completedLevels.includes(currentLevelId + 1) && currentLevelId < exerciseLevels.length) {
                        setCompletedLevels(prev => [...prev, currentLevelId + 1]);
                      }

                      const elapsedSec = Math.floor((Date.now() - (startTimeRef.current || Date.now())) / 1000);
                      const mins = Math.floor(elapsedSec / 60);
                      const secs = elapsedSec % 60;
                      const timeStr = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

                      const correctCount = Math.max(0, 5 - sessionMistakes);
                      const earnedXp = correctCount * 10;
                      const scoreText = `${correctCount} / 5 to'g'ri (${sessionMistakes} ta xato)`;

                      speakKo("참 잘했어요! 정말 대단해요!");
                      setLevelCompleteData({
                        levelId: currentLevelId,
                        xpGained: earnedXp,
                        scoreText: scoreText,
                        time: timeStr
                      });
                      setProfile(p => ({ ...p, xp: p.xp + earnedXp, streak: p.streak + 1 }));
                    } else {
                      setExStep(s => s + 1);
                      loadNextQuestion();
                    }
                  }}
                  className="py-3 px-8 rounded-2xl bg-[#58cc02] hover:bg-[#4cb800] text-white font-black text-xs uppercase shadow-lg active:scale-95 transition"
                >
                  Davom etish ›
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-6 pb-28 pt-2">
        <div className="text-center space-y-1">
          <h2 className={`text-lg font-black ${t.textMain}`}>ZiyoPrep O‘quv Yo‘lakchasi</h2>
          <p className="text-xs text-slate-400">1-darajadan boshlab cheksiz davom etadi</p>
        </div>

        <div className="flex flex-col items-center space-y-6 py-4 relative">
          {exerciseLevels.map((lvl, idx) => {
            const isUnlocked = completedLevels.includes(lvl.id) || lvl.id === 1;
            const isCompleted = completedLevels.includes(lvl.id + 1) || (lvl.id < Math.max(...completedLevels));

            const offsets = ['translate-x-0', 'translate-x-12', '-translate-x-12', 'translate-x-8', '-translate-x-8'];
            const alignClass = offsets[idx % offsets.length];

            return (
              <div key={lvl.id} className={`flex flex-col items-center transition-transform ${alignClass}`}>
                <button
                  disabled={!isUnlocked}
                  onClick={() => startLevelExercise(lvl)}
                  className={`w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-xl border-4 transition-all active:scale-95 ${
                    isUnlocked
                      ? isCompleted 
                        ? 'bg-amber-400 border-amber-600 text-white' 
                        : 'bg-[#58cc02] border-emerald-600 text-white animate-bounce'
                      : 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isUnlocked ? (
                    <>
                      <span className="text-2xl">{lvl.icon}</span>
                      <span className="text-[10px] font-black">{lvl.id}-daraja</span>
                    </>
                  ) : (
                    <Lock size={22} />
                  )}
                </button>
                <div className="mt-2 text-center">
                  <div className={`text-xs font-black ${t.textMain}`}>{lvl.title}</div>
                  <div className="text-[10px] text-slate-400 font-bold">{lvl.subtitle}</div>
                </div>
              </div>
            );
          })}
        </div>
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

  // --- PROFILE SCREEN ---
  const renderProfile = () => (
    <div className="space-y-4 pb-28 pt-2">
      <div className={`rounded-3xl ${t.card} border p-5 flex items-center justify-between`}>
        <div className="flex items-center gap-3.5">
          <ZiyoOwlAvatar className="w-16 h-16 rounded-2xl" equipped={equippedItems} />
          <div>
            {editingName ? (
              <div className="flex gap-1.5">
                <input type="text" value={nameDraft} onChange={e => setNameDraft(e.target.value)} className={`${t.sub} border rounded-xl px-2.5 py-1 text-xs`} />
                <button onClick={() => { setProfile(p => ({ ...p, name: nameDraft || 'Tokhirbek' })); setEditingName(false); }} className="px-2.5 py-1 bg-emerald-500 text-white text-xs rounded-xl">OK</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className={`font-black text-base ${t.textMain}`}>{profile.name}</h2>
                <button onClick={() => setEditingName(true)} className="text-slate-400"><Edit3 size={13} /></button>
              </div>
            )}
            <p className="text-xs text-slate-400">{currentUser?.email}</p>
          </div>
        </div>
        <button onClick={toggleDark} className={`p-2.5 rounded-2xl ${t.sub} border`}>{isDark ? <Sun size={18} /> : <Moon size={18} />}</button>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        <div className={`${t.card} border p-3.5 text-center rounded-2xl`}>
          <Flame size={20} className="mx-auto text-amber-500" />
          <div className={`text-lg font-black mt-1 ${t.textMain}`}>{profile.streak}</div>
          <div className="text-[10px] text-slate-400">Streak</div>
        </div>
        <div className={`${t.card} border p-3.5 text-center rounded-2xl`}>
          <Zap size={20} className="mx-auto text-sky-500" />
          <div className={`text-lg font-black mt-1 ${t.textMain}`}>{profile.xp}</div>
          <div className="text-[10px] text-slate-400">XP</div>
        </div>
        <div className={`${t.card} border p-3.5 text-center rounded-2xl`}>
          <Award size={20} className="mx-auto text-indigo-500" />
          <div className={`text-lg font-black mt-1 ${t.textMain}`}>TOPIK 4</div>
          <div className="text-[10px] text-slate-400">Daraja</div>
        </div>
      </div>

      <button onClick={handleLogout} className="w-full py-3.5 rounded-2xl bg-rose-500/15 text-rose-500 font-black text-xs">Akkauntdan chiqish</button>
    </div>
  );

  return (
    <div className={`min-h-screen w-full ${t.bg} font-sans select-none transition-colors`}>
      <main className="max-w-md mx-auto px-4 pt-8 pb-2">
        {screen === 'home' && renderHome()}
        {screen === 'vocab' && renderVocab()}
        {screen === 'grammar' && renderGrammarScreen()}
        {screen === 'builder' && renderBuilder()}
        {screen === 'lesson' && renderLesson()}
        {screen === 'ai' && renderAiTutor()}
        {screen === 'review' && renderReview()}
        {screen === 'profile' && renderProfile()}
      </main>

      {/* Apple-style Bottom Navigation Bar: 홈, 단어장, AI 튜터, 연습, 프로필 */}
      {!exerciseActive && (
        <nav className={`fixed bottom-0 inset-x-0 z-40 ${t.nav} px-4 pt-2.5 pb-6 backdrop-blur-xl shadow-lg`}>
          <div className="max-w-md mx-auto flex items-center justify-around">
            <button onClick={() => setScreen('home')} className={`flex flex-col items-center gap-1 py-1 px-3 transition ${screen === 'home' ? 'text-blue-600 dark:text-blue-400 scale-105' : t.textMuted}`}>
              <BookOpen size={22} />
              <span className="text-[10px] font-black">홈</span>
            </button>
            <button onClick={() => setScreen('vocab')} className={`flex flex-col items-center gap-1 py-1 px-3 transition ${screen === 'vocab' ? 'text-blue-600 dark:text-blue-400 scale-105' : t.textMuted}`}>
              <Sparkles size={22} />
              <span className="text-[10px] font-black">단어장</span>
            </button>
            <button onClick={() => setScreen('ai')} className={`flex flex-col items-center gap-1 py-1 px-3 transition ${screen === 'ai' ? 'text-blue-600 dark:text-blue-400 scale-105' : t.textMuted}`}>
              <MessageSquare size={22} />
              <span className="text-[10px] font-black">AI 튜터</span>
            </button>
            <button onClick={() => setScreen('review')} className={`flex flex-col items-center gap-1 py-1 px-3 transition ${screen === 'review' ? 'text-blue-600 dark:text-blue-400 scale-105' : t.textMuted}`}>
              <RotateCcw size={22} />
              <span className="text-[10px] font-black">연습</span>
            </button>
            <button onClick={() => setScreen('profile')} className={`flex flex-col items-center gap-1 py-1 px-3 transition ${screen === 'profile' ? 'text-blue-600 dark:text-blue-400 scale-105' : t.textMuted}`}>
              <User size={22} />
              <span className="text-[10px] font-black">프로필</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
