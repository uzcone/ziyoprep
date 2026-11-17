import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, ArrowLeft, Globe, Lock, CheckCircle2, 
  ChevronUp, ChevronDown, Edit3, Shuffle, Play, 
  BookOpen, Sparkles, RotateCcw, User, 
  Flame, Zap, Send, Sun, Moon, LogOut,
  Headphones, Mic, Clock, Layers, Timer,
  MessageSquare, Keyboard, ShoppingBag, Trophy, Search,
  Bookmark, CheckSquare, Award, Target, Star, Bell, Check, AlertCircle, Box, BookMarked
} from 'lucide-react';

import { snu1A } from './data/snu1A.js';
import { snu1B } from './data/snu1B.js';
import { snu2A, snu2B } from './data/snu2AB.js';
import { snu3A, snu3B, snu4A, snu4B, snu5A, snu5B, snu6A, snu6B } from './data/snu3_6.js';

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
        </defs>
        <rect width="200" height="200" rx="44" fill="url(#skyGrad)" />
        <ellipse cx="100" cy="108" rx="64" ry="62" fill="url(#owlBody)" />
        <circle cx="72" cy="105" r="22" fill="#ffffff" />
        <circle cx="128" cy="105" r="22" fill="#ffffff" />
        <circle cx="76" cy="105" r="11.5" fill="#1e293b" />
        <circle cx="124" cy="105" r="11.5" fill="#1e293b" />
        <path d="M91 116 Q100 111 109 116 L100 129 Z" fill="#f59e0b" />
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
  const [currentUser, setCurrentUser] = useState(() => {
    try { const saved = localStorage.getItem('hs_auth_user'); return saved ? JSON.parse(saved) : null; } catch { return null; }
  });
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try { const saved = localStorage.getItem('hs_registered_users'); return saved ? JSON.parse(saved) : []; } catch { return []; }
  });
  const [authMode, setAuthMode] = useState('welcome');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');

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
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('hs_auth_user');
    setCurrentUser(null);
    setAuthMode('welcome');
    setScreen('home');
  };

  const [screen, setScreen] = useState('home');
  const [isDark, setIsDark] = useState(() => localStorage.getItem('hs_dark'] === 'true');
  const [selectedBookCode, setSelectedBookCode] = useState('1A');
  const [activeLesson, setActiveLesson] = useState(null);

  // Seksni avtomatik boshqarish (20 ta savoldan keyin 2-seksga o'tish)
  const [currentSection, setCurrentSection] = useState(1);
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0);

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: '⚡ Zinapoya yarmida to‘xtatildi!', desc: '1A darajasini oxirigacha yakunlash uchun davom eting!', time: 'Hozir', unread: true },
    { id: 2, title: '🔔 Kunlik vazifa eslatmasi', desc: 'Bugungi 15 daqiqalik o‘quv rejangizni bajarishni unutmang.', time: '2 soat oldin', unread: true }
  ]);

  const vocabBooks = [vocab1A, vocab1B, vocab2A, vocab2B, vocab3A, vocab3B, vocab4A, vocab4B, vocab5A, vocab5B, vocab6A].filter(Boolean);
  const [vocabSearch, setVocabSearch] = useState('');

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
      return { name: saved?.name || 'Tokhirbek', xp: saved?.xp ?? 2700, dailyXp: saved?.dailyXp ?? 60, streak: saved?.streak ?? 33, freezes: saved?.freezes ?? 1 };
    } catch {
      return { name: 'Tokhirbek', xp: 2700, dailyXp: 60, streak: 33, freezes: 1 };
    }
  });

  const [completedIds, setCompletedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hs_completed')) || []; } catch { return []; }
  });

  useEffect(() => { localStorage.setItem('hs_profile', JSON.stringify(profile)); }, [profile]);
  useEffect(() => { localStorage.setItem('hs_completed', JSON.stringify(completedIds)); }, [completedIds]);

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
      window.speechSynthesis.speak(u);
    } catch {}
  };

  const snuBooks = [snu1A, snu1B, snu2A, snu2B, snu3A, snu3B, snu4A, snu4B, snu5A, snu5B, snu6A, snu6B].filter(Boolean);
  const currentBook = snuBooks.find(b => b.code === selectedBookCode) || snuBooks[0];
  const allLessons = snuBooks.flatMap(b => b.lessons || []);
  const allVocabWords = vocabBooks.flatMap(b => (b.topics || []).flatMap(tp => tp.words || []));
  const nextLesson = allLessons.find(l => !completedIds.includes(l.id)) || allLessons[0];

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
              </div>
            </>
          )}

          {(authMode === 'login' || authMode === 'register') && (
            <div className={`${t.card} border rounded-3xl p-6 space-y-4 text-left shadow-xl`}>
              <button onClick={() => { setAuthError(''); setAuthMode('welcome'); }} className="text-xs font-bold text-emerald-500">‹ Orqaga</button>
              <h2 className={`font-black text-base ${t.textMain}`}>{authMode === 'login' ? 'Tizimga kirish' : 'Yangi аккаунт ochish'}</h2>
              {authError && <div className="text-rose-500 text-xs font-bold">{authError}</div>}
              <form onSubmit={handleEmailAuth} className="space-y-3">
                {authMode === 'register' && (
                  <input type="text" placeholder="Ismingiz" value={authForm.name} onChange={e => setAuthForm({ ...authForm, name: e.target.value })} className={`w-full ${t.sub} border rounded-2xl p-3 text-xs font-bold`} />
                )}
                <input type="email" placeholder="Email manzilingiz" value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })} className={`w-full ${t.sub} border rounded-2xl p-3 text-xs font-bold`} />
                <input type="password" placeholder="Parol" value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })} className={`w-full ${t.sub} border rounded-2xl p-3 text-xs font-bold`} />
                <button type="submit" className="w-full py-3 rounded-2xl bg-[#58cc02] text-white font-black text-xs uppercase shadow">Tasdiqlash</button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- DUOLINGO STYLE HOME SCREEN (Zinapoya & Seks dizayni rasmga moslab yaratildi) ---
  const renderHome = () => {
    return (
      <div className="space-y-6 pb-28 pt-2 font-sans select-none">
        {/* Top Header Stats Bar */}
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-xs">🇰🇷</div>
            <span className="text-xs font-black text-slate-700 dark:text-slate-300">1</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-amber-500 font-black text-xs">
              🔥 <span>{profile.streak}</span>
            </div>
            <div className="flex items-center gap-1 text-rose-500 font-black text-xs">
              ⚡ <span>25</span>
            </div>
            <button onClick={() => setShowNotifications(true)} className="relative text-slate-600 dark:text-slate-300">
              <Bell size={18} />
              {notifications.some(n => n.unread) && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500"></span>}
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

        {/* Section Header Banner (Seks 1 yoki Seks 2) */}
        <div className="bg-[#58cc02] text-white p-4 rounded-3xl shadow-md flex justify-between items-center">
          <div className="space-y-0.5">
            <span className="text-[11px] font-black uppercase tracking-wider opacity-90">섹션 {currentSection}, 유닛 10</span>
            <h2 className="text-base font-black">반려동물에 대해 이야기하기</h2>
          </div>
          <button onClick={() => setScreen('vocab')} className="p-2.5 rounded-2xl bg-black/10 hover:bg-black/20 transition">
            <BookMarked size={20} />
          </button>
        </div>

        {/* Streak badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 bg-rose-500 text-white px-4 py-2 rounded-2xl shadow-lg">
            <Flame size={18} className="fill-white" />
            <span className="text-xs font-black">{profile.streak}일</span>
          </div>
        </div>

        {/* Zinapoya Track (Rasmga mos tarzdagi tugmalar) */}
        <div className="flex flex-col items-center space-y-8 py-4">
          <button onClick={() => setScreen('review')} className="w-20 h-20 rounded-full bg-[#58cc02] border-b-4 border-[#46a302] text-white flex items-center justify-center shadow-xl text-3xl font-black active:scale-95 transition">
            ⭐
          </button>
          
          <div className="flex gap-16">
            <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-slate-300 dark:border-slate-700 flex items-center justify-center shadow-md">
              <Box size={24} className="text-slate-400" />
            </div>
            <div className="w-16 h-16 rounded-full bg-slate-300 dark:bg-slate-700 border-4 border-slate-400 dark:border-slate-600 flex items-center justify-center shadow-md">
              <BookOpen size={24} className="text-slate-500" />
            </div>
          </div>

          <button onClick={() => setScreen('review')} className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-slate-300 dark:border-slate-700 text-slate-400 flex items-center justify-center shadow-xl active:scale-95 transition">
            <Lock size={26} />
          </button>
          
          <button onClick={() => setScreen('review')} className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-slate-300 dark:border-slate-700 text-slate-400 flex items-center justify-center shadow-xl active:scale-95 transition">
            <Lock size={26} />
          </button>
        </div>

        {/* Locked Section 2 Card */}
        <div className={`${t.card} border rounded-3xl p-5 space-y-3 shadow-sm`}>
          <div className="text-center text-slate-400 text-xs font-bold uppercase">다음 섹션</div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              <Lock size={22} />
            </div>
            <div>
              <h3 className={`text-sm font-black ${t.textMain}`}>섹션 {currentSection === 1 ? '2' : '3'}</h3>
              <p className="text-xs text-slate-400 font-medium leading-tight">기본적인 인사를 위한 단어, 구문, 문법 개념을 익혀요.</p>
            </div>
          </div>
          <button onClick={() => { setCurrentSection(prev => prev + 1); alert("Keyingi seksga o'tildi!"); }} className="w-full py-3 rounded-2xl border text-blue-600 dark:text-blue-400 font-black text-xs uppercase hover:bg-blue-50 transition">
            여기로 건너뛰할까요?
          </button>
        </div>
      </div>
    );
  };

  // --- GRAMMAR SCREEN ---
  const renderGrammarScreen = () => {
    const grammarRules = [
      { title: '-아요 / 어요 (Hozirgi zamon rasmiy-hurmatli)', desc: 'Fe’l o‘zaklarida unli tovushga qarab qo‘shiladi.', example: '가다 -> 가요 (Boraman/Boradi)' },
      { title: '-고 싶다 (Xohishni bildirish)', desc: 'Biror ishni qilishni xohlashni anglatadi.', example: '한국에 가고 싶어요. (Koreyaga bormoqchiman.)' }
    ];

    return (
      <div className="space-y-4 pb-28 pt-2">
        <div className="flex items-center justify-between">
          <button onClick={() => setScreen('home')} className={`flex items-center gap-1.5 text-sm font-black ${t.textMain}`}>
            <ArrowLeft size={16} /> <span>Asosiy sahifa</span>
          </button>
          <span className="text-xs font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">문법 학습</span>
        </div>
        <div className="space-y-3">
          {grammarRules.map((g, idx) => (
            <div key={idx} className={`${t.card} border rounded-3xl p-4 space-y-2 shadow-xs`}>
              <div className={`text-sm font-black text-purple-600`}>{g.title}</div>
              <p className="text-xs text-slate-600">{g.desc}</p>
              <div className="p-2.5 rounded-2xl bg-purple-50 text-xs font-bold text-purple-700">💡 Misol: {g.example}</div>
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
          <h2 className={`text-base font-black ${t.textMain}`}>단어장</h2>
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

  // --- MASHQ SCREEN (Har 20 ta savoldan keyin avtomatik 2-seksga o'tish) ---
  const renderReview = () => {
    if (levelCompleteData) {
      return (
        <div className="space-y-6 pb-28 pt-4 text-center select-none animate-fade-in">
          <div className="w-32 h-32 mx-auto">
            <ZiyoOwlAvatar className="w-full h-full rounded-full border-4 border-emerald-500 shadow-2xl" />
          </div>
          <div className="space-y-1">
            <h2 className={`text-2xl font-black text-emerald-600`}>참 잘했어요! 대단해요!</h2>
            <p className="text-xs font-bold text-slate-500">Seks {currentSection} yakunlandi!</p>
          </div>
          <button onClick={() => { setLevelCompleteData(null); setExerciseActive(false); }} className="w-full py-4 rounded-2xl bg-[#58cc02] text-white font-black text-xs uppercase shadow-xl">
            Davom etish ›
          </button>
        </div>
      );
    }

    if (exerciseActive && exTarget) {
      const progressPercent = Math.min(100, ((exStep + 1) / 5) * 100);

      return (
        <div className="space-y-6 pb-32 pt-2 select-none">
          <div className="flex items-center gap-4">
            <button onClick={() => setShowExitAlert(true)} className="text-slate-400 font-black text-lg p-1">✕</button>
            <div className="flex-1 h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-[#58cc02] rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="flex items-center gap-1 text-rose-500 font-black text-xs">❤️ 5</div>
          </div>

          <div className="space-y-3 text-center pt-2">
            <span className="text-[11px] font-black uppercase text-purple-600 bg-purple-100 px-3 py-1 rounded-full">섹션 {currentSection} • 새로운 단어</span>
            <h2 className={`text-sm font-black ${t.textMain}`}>To'g'ri ma'noni tanlang</h2>
            <div onClick={() => speakKo(exTarget.ko)} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-600 cursor-pointer mx-auto">
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
                    }
                  }}
                  className={`p-5 rounded-3xl border-2 text-center flex flex-col items-center justify-center min-h-[110px] font-black text-sm transition-all ${btnStyle}`}
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
                    {exSelected === exTarget.uz ? '✨ 참 잘했어요!' : `❌ Xato! To‘g‘risi: ${exTarget.uz}`}
                  </div>
                </div>
                <button
                  onClick={() => {
                    const nextTotal = totalQuestionsAnswered + 1;
                    setTotalQuestionsAnswered(nextTotal);

                    // Har 20 ta savoldan keyin avtomatik 2-seksga o'tish
                    if (nextTotal >= 20 && currentSection === 1) {
                      setCurrentSection(2);
                      alert("Tabriklaymiz! Siz 20 ta savolni yakunladingiz va 섹션 2 ga o'tdingiz!");
                    }

                    if (exStep + 1 >= 5) {
                      setLevelCompleteData({ levelId: currentLevelId, xpGained: 50, scoreText: '5 / 5 to\'g\'ri', time: '1:00' });
                      setProfile(p => ({ ...p, xp: p.xp + 50, streak: p.streak + 1 }));
                    } else {
                      setExStep(s => s + 1);
                      loadNextQuestion();
                    }
                  }}
                  className="py-3 px-8 rounded-2xl bg-[#58cc02] text-white font-black text-xs uppercase shadow-lg"
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
          <h2 className={`text-lg font-black ${t.textMain}`}>ZiyoPrep O‘quv Yo‘lakchasi (Seks {currentSection})</h2>
          <p className="text-xs text-slate-400">Jami bajarilgan savollar: {totalQuestionsAnswered} / 20</p>
        </div>
        <div className="flex flex-col items-center space-y-6 py-4 relative">
          {exerciseLevels.map((lvl) => (
            <button key={lvl.id} onClick={() => startLevelExercise(lvl)} className="w-20 h-20 rounded-full bg-[#58cc02] border-b-4 border-[#46a302] text-white flex flex-col items-center justify-center shadow-xl font-black active:scale-95 transition">
              <span className="text-2xl">{lvl.icon}</span>
              <span className="text-[10px]">{lvl.id}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // --- AI TUTOR SCREEN ---
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
          <ZiyoOwlAvatar className="w-16 h-16 rounded-2xl" />
          <div>
            <h2 className={`font-black text-base ${t.textMain}`}>{profile.name}</h2>
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

      {!exerciseActive && (
        <nav className={`fixed bottom-0 inset-x-0 z-40 ${t.nav} px-4 pt-2.5 pb-6 backdrop-blur-xl shadow-lg`}>
          <div className="max-w-md mx-auto flex items-center justify-around">
            <button onClick={() => setScreen('home')} className={`flex flex-col items-center gap-1 py-1 px-3 transition ${screen === 'home' ? 'text-[#58cc02] scale-105' : t.textMuted}`}>
              <BookOpen size={24} />
            </button>
            <button onClick={() => setScreen('ai')} className={`flex flex-col items-center gap-1 py-1 px-3 transition ${screen === 'ai' ? 'text-[#58cc02] scale-105' : t.textMuted}`}>
              <MessageSquare size={24} />
            </button>
            <button onClick={() => setScreen('grammar')} className={`flex flex-col items-center gap-1 py-1 px-3 transition ${screen === 'grammar' ? 'text-[#58cc02] scale-105' : t.textMuted}`}>
              <Bookmark size={24} />
            </button>
            <button onClick={() => setScreen('review')} className={`flex flex-col items-center gap-1 py-1 px-3 transition ${screen === 'review' ? 'text-[#58cc02] scale-105' : t.textMuted}`}>
              <RotateCcw size={24} />
            </button>
            <button onClick={() => setScreen('profile')} className={`flex flex-col items-center gap-1 py-1 px-3 transition ${screen === 'profile' ? 'text-[#58cc02] scale-105' : t.textMuted}`}>
              <User size={24} />
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
