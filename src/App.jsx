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
        <path d="M161 74 L185 88 L178 98 L158 84 Z" fill="#f1f5f9" />
        <path d="M159 81 L180 104 L170 110 L154 86 Z" fill="#e2e8f0" />

        <text x="86" y="75" textAnchor="middle" fill="#0f172a" fontSize="14.5" fontWeight="900" fontFamily="sans-serif">
          ZiyoPrep
        </text>

        <g transform="translate(128, 63) rotate(10)">
          <rect width="19" height="13" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
          <circle cx="9.5" cy="6.5" r="3.4" fill="#dc2626" />
          <path d="M6.1 6.5 A3.4 3.4 0 0 0 12.9 6.5 A1.7 1.7 0 0 1 9.5 6.5 A1.7 1.7 0 0 0 6.1 6.5 Z" fill="#2563eb" />
          <line x1="3" y1="3" x2="5" y2="4.5" stroke="#0f172a" strokeWidth="1" />
          <line x1="14" y1="4.5" x2="16" y2="3" stroke="#0f172a" strokeWidth="1" />
          <line x1="3" y1="10" x2="5" y2="8.5" stroke="#0f172a" strokeWidth="1" />
          <line x1="14" y1="8.5" x2="16" y2="10" stroke="#0f172a" strokeWidth="1" />
        </g>

        {equipped.gradCap && (
          <g>
            <polygon points="100,12 152,30 100,48 48,30" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
            <rect x="74" y="34" width="52" height="14" rx="4" fill="#334155" />
            <line x1="146" y1="32" x2="152" y2="54" stroke="#facc15" strokeWidth="3" />
            <circle cx="152" cy="55" r="4" fill="#f59e0b" />
          </g>
        )}

        {equipped.crown && (
          <g>
            <polygon points="68,46 76,20 90,36 100,14 110,36 124,20 132,46" fill="#facc15" stroke="#d97706" strokeWidth="2" />
            <circle cx="100" cy="24" r="3" fill="#ef4444" />
            <circle cx="78" cy="30" r="2.5" fill="#3b82f6" />
            <circle cx="122" cy="30" r="2.5" fill="#3b82f6" />
          </g>
        )}

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
            <line x1="36" y1="96" x2="48" y2="102" stroke="#0f172a" strokeWidth="4" />
            <line x1="164" y1="96" x2="152" y2="102" stroke="#0f172a" strokeWidth="4" />
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
        <circle cx="129" cy="173" r="4.5" fill="#dc2626" />
        <path d="M124.5 173 A4.5 4.5 0 0 0 133.5 173 Z" fill="#3b82f6" />

        <ellipse cx="42" cy="154" rx="13" ry="16" transform="rotate(-18 42 154)" fill="#65d318" stroke="#48b808" strokeWidth="1.5" />
        <ellipse cx="158" cy="154" rx="13" ry="16" transform="rotate(18 158 154)" fill="#65d318" stroke="#48b808" strokeWidth="1.5" />

        <rect x="20" y="42" width="14" height="5" rx="2.5" transform="rotate(32 20 42)" fill="#facc15" />
        <rect x="14" y="55" width="13" height="5" rx="2.5" transform="rotate(12 14 55)" fill="#facc15" />
      </svg>
    </div>
  );
}

const INITIALS = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const MEDIALS = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const FINALS = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

const ROMAN_CHO = { 'ㄱ':'g/k','ㄲ':'kk','ㄴ':'n','ㄷ':'d/t','ㄸ':'tt','ㄹ':'r/l','ㅁ':'m','ㅂ':'b/p','ㅃ':'pp','ㅅ':'s','ㅆ':'ss','ㅇ':'-','ㅈ':'j','ㅉ':'jj','ㅊ':'ch','ㅋ':'kh','ㅌ':'th','ㅍ':'ph','ㅎ':'h' };
const ROMAN_JUNG = { 'ㅏ':'a','ㅐ':'ae','ㅑ':'ya','ㅒ':'yae','ㅓ':'eo','ㅔ':'e','ㅕ':'yeo','ㅖ':'ye','ㅗ':'o','ㅘ':'wa','ㅙ':'wae','ㅚ':'oe','ㅛ':'yo','ㅜ':'u','ㅝ':'wo','ㅞ':'we','ㅟ':'wi','ㅠ':'yu','ㅡ':'eu','ㅢ':'ui','ㅣ':'i' };
const ROMAN_JONG = { '':'','ㄱ':'k','ㄴ':'n','ㄷ':'t','ㄹ':'l','ㅁ':'m','ㅂ':'p','ㅅ':'t','ㅇ':'ng','ㅈ':'t','ㅊ':'t','ㅎ':'t' };

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
  // --- 1. LOGIN / REGISTER / GOOGLE / MEHMON KIRISH ---
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hs_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('hs_registered_users');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [authMode, setAuthMode] = useState('welcome');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');

  const handleGuestLogin = () => {
    const guest = { uid: 'guest', name: 'Mehmon Talaba', email: 'guest@ziyoprep.uz', isGuest: true };
    setCurrentUser(guest);
    localStorage.setItem('hs_auth_user', JSON.stringify(guest));
    setProfile(p => ({ ...p, name: 'Mehmon Talaba' }));
  };

  const handleGoogleSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    const email = authForm.email.trim().toLowerCase();
    if (!email || !email.includes('@')) {
      return setAuthError("To‘g‘ri Gmail manzilini kiriting (masalan: ism@gmail.com)!");
    }
    const name = authForm.name.trim() || email.split('@')[0];
    const gUser = { uid: 'google_' + email, name, email, provider: 'google' };
    setCurrentUser(gUser);
    localStorage.setItem('hs_auth_user', JSON.stringify(gUser));
    setProfile(p => ({ ...p, name }));
  };

  const handleEmailAuth = (e) => {
    e.preventDefault();
    setAuthError('');
    const email = authForm.email.trim().toLowerCase();
    const password = authForm.password.trim();

    if (!email || !email.includes('@')) {
      return setAuthError("To‘g‘ri email manzilini kiriting!");
    }
    if (password.length < 4) {
      return setAuthError("Parol kamida 4 ta belgidan iborat bo‘lishi kerak!");
    }

    if (authMode === 'register') {
      if (!authForm.name.trim()) {
        return setAuthError("Ismingizni kiriting!");
      }
      const exists = registeredUsers.find(u => u.email === email);
      if (exists) {
        return setAuthError("Bu email allaqachon ro‘yxatdan o‘tgan! Kirish bo‘limidan kiring.");
      }
      const newUser = {
        uid: 'user_' + Date.now(),
        name: authForm.name.trim(),
        email,
        password
      };
      const updatedList = [...registeredUsers, newUser];
      setRegisteredUsers(updatedList);
      localStorage.setItem('hs_registered_users', JSON.stringify(updatedList));

      const sessionUser = { uid: newUser.uid, name: newUser.name, email: newUser.email };
      setCurrentUser(sessionUser);
      localStorage.setItem('hs_auth_user', JSON.stringify(sessionUser));
      setProfile(p => ({ ...p, name: newUser.name }));
    } else {
      const found = registeredUsers.find(u => u.email === email);
      if (!found) {
        return setAuthError("Bunday email topilmadi! Avval 'Ro‘yxatdan o‘tish' tugmasini bosing.");
      }
      if (found.password !== password) {
        return setAuthError("Parol noto‘g‘ri! Qaytadan tekshirib kiriting.");
      }
      const sessionUser = { uid: found.uid, name: found.name, email: found.email };
      setCurrentUser(sessionUser);
      localStorage.setItem('hs_auth_user', JSON.stringify(sessionUser));
      setProfile(p => ({ ...p, name: found.name }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('hs_auth_user');
    setCurrentUser(null);
    setAuthForm({ name: '', email: '', password: '' });
    setAuthError('');
    setAuthMode('welcome');
    setScreen('home');
  };

  // --- 2. ASOSIY ILOVA HOLATLARI ---
  const [screen, setScreen] = useState('home');
  const [uiLang, setUiLang] = useState('uz');
  const [isDark, setIsDark] = useState(() => localStorage.getItem('hs_dark') === 'true');
  const [selectedBookCode, setSelectedBookCode] = useState('1A');
  const [activeLesson, setActiveLesson] = useState(null);
  const [isUnlockedAll, setIsUnlockedAll] = useState(() => localStorage.getItem('hs_unlocked') === 'true');

  // --- YNGI: XATOLAR DAFTARI (MISTAKE NOTEBOOK) & PLANNER & ACHIEVEMENTS ---
  const [mistakes, setMistakes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hs_mistakes')) || [];
    } catch { return []; }
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

  useEffect(() => { localStorage.setItem('hs_mistakes', JSON.stringify(mistakes)); }, [mistakes]);
  useEffect(() => { localStorage.setItem('hs_planner', JSON.stringify(plannerTasks)); }, [plannerTasks]);

  // --- LUG'ATLAR BO'LIMI HOLATLARI ---
  const vocabBooks = [
    vocab1A, vocab1B, vocab2A, vocab2B, vocab3A, vocab3B, vocab4A, vocab4B, vocab5A, vocab5B, vocab6A
  ].filter(Boolean);

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
      return {
        name: saved?.name || 'Tokhirbek',
        xp: saved?.xp ?? 1450,
        dailyXp: saved?.dailyXp ?? 60,
        streak: saved?.streak ?? 12,
        freezes: saved?.freezes ?? 1
      };
    } catch {
      return { name: 'Tokhirbek', xp: 1450, dailyXp: 60, streak: 12, freezes: 1 };
    }
  });
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(profile.name);

  const [ownedItems, setOwnedItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hs_owned_items')) || { glasses: false, gradCap: false, crown: false };
    } catch {
      return { glasses: false, gradCap: false, crown: false };
    }
  });
  const [equippedItems, setEquippedItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hs_equipped_items')) || { glasses: false, gradCap: false, crown: false };
    } catch {
      return { glasses: false, gradCap: false, crown: false };
    }
  });

  const [completedIds, setCompletedIds] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('hs_completed'));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const [memos, setMemos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hs_memos')) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => { localStorage.setItem('hs_profile', JSON.stringify(profile)); }, [profile]);
  useEffect(() => { localStorage.setItem('hs_completed', JSON.stringify(completedIds)); }, [completedIds]);
  useEffect(() => { localStorage.setItem('hs_memos', JSON.stringify(memos)); }, [memos]);
  useEffect(() => { localStorage.setItem('hs_owned_items', JSON.stringify(ownedItems)); }, [ownedItems]);
  useEffect(() => { localStorage.setItem('hs_equipped_items', JSON.stringify(equippedItems)); }, [equippedItems]);

  const toggleDark = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem('hs_dark', String(next));
      return next;
    });
  };

  const speakKo = (text) => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const clean = text.replace(/[\(\)\[\]~]/g, '').trim();
      const u = new SpeechSynthesisUtterance(clean);
      u.lang = 'ko-KR';
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    } catch {}
  };

  // --- BARCHA 12 TA KITOB (1A ~ 6B) ---
  const snuBooks = [
    snu1A, snu1B, snu2A, snu2B, snu3A, snu3B, snu4A, snu4B, snu5A, snu5B, snu6A, snu6B
  ].filter(Boolean);

  const currentBook = snuBooks.find(b => b.code === selectedBookCode) || snuBooks[0];
  const allLessons = snuBooks.flatMap(b => b.lessons || []);
  const allVocabWords = vocabBooks.flatMap(b => (b.topics || []).flatMap(tp => tp.words || []));
  const allWords = allVocabWords.length > 0 ? allVocabWords : allLessons.flatMap(l => l.words || []);
  const allQuizzesPool = allLessons.flatMap(l => l.quizzes || []);
  const nextLesson = allLessons.find(l => !completedIds.includes(l.id)) || allLessons[0];

  // --- REAL HAYOTIY DIALOG SIMULYATORI ---
  const roleplayScenarios = [
    {
      id: 'cafe',
      emoji: '☕',
      title: 'Kafeda Buyurtma',
      level: '1A–1B',
      steps: [
        {
          npcKo: '어서 오세요! 주문하시겠어요?',
          npcUz: 'Xush kelibsiz! Buyurtma berasizmi?',
          opts: [
            { ko: '네, 아이스 아메리카노 한 잔 주세요.', uz: 'Ha, bitta muzli amerikano bering.', ok: true },
            { ko: '아니요, 학교에 갔어요.', uz: 'Yo‘q, maktabga bordim.', ok: false }
          ]
        },
        {
          npcKo: '네, 알겠습니다. 여기서 드실 거예요?',
          npcUz: 'Xo‘p, tushunarli. Shu yerda ichasizmi?',
          opts: [
            { ko: '네, 여기서 마실 거예요.', uz: 'Ha, shu yerda ichaman.', ok: true },
            { ko: '어제 영화를 봤어요.', uz: 'Kecha kino ko‘rdim.', ok: false }
          ]
        },
        {
          npcKo: '사천오백 원입니다. 진동벨 울리면 가져가세요!',
          npcUz: '4,500 von bo‘ldi. Qo‘ng‘iroq jiringlaganda olib keting!',
          opts: [
            { ko: '네, 감사합니다!', uz: 'Xo‘p, rahmat!', ok: true },
            { ko: '얼마예요?', uz: 'Qancha turadi?', ok: false }
          ]
        }
      ]
    },
    {
      id: 'hospital',
      emoji: '🏥',
      title: 'Shifokor Qabulida',
      level: '1B–2A',
      steps: [
        {
          npcKo: '어떻게 오셨어요? 어디가 아프세요?',
          npcUz: 'Nima shikoyat bilan keldingiz? Qayeringiz og‘riyapti?',
          opts: [
            { ko: '어제부터 목이 아프고 열이 나요.', uz: 'Kechadan beri tomog‘im og‘riyapti va isitmam bor.', ok: true },
            { ko: '날씨가 맑아서 기분이 좋아요.', uz: 'Havo ochiq bo‘lgani uchun kayfiyatim yaxshi.', ok: false }
          ]
        },
        {
          npcKo: '감기에 걸리셨네요. 처방전을 드릴 테니까 약국에 가세요.',
          npcUz: 'Shamollab qolibsiz. Retsept beraman, dorixonaga boring.',
          opts: [
            { ko: '선생님, 찬물을 마셔도 돼요?', uz: 'Doktor, sovuq suv ichsam maylimi?', ok: true },
            { ko: '지하철로 30분 걸려요.', uz: 'Metroda 30 daqiqa ketadi.', ok: false }
          ]
        },
        {
          npcKo: '아니요, 찬물을 마시면 안 돼요. 따뜻한 물을 많이 드세요.',
          npcUz: 'Yo‘q, sovuq suv ichish mumkin emas. Iliq suv ko‘proq iching.',
          opts: [
            { ko: '네, 잘 알겠습니다. 감사합니다!', uz: 'Xo‘p, tushundim. Rahmat!', ok: true },
            { ko: '아메리카노 두 잔 주세요.', uz: 'Ikkita amerikano bering.', ok: false }
          ]
        }
      ]
    }
  ];
  const [activeDialog, setActiveDialog] = useState(roleplayScenarios[0]);
  const [dialogStep, setDialogStep] = useState(0);
  const [dialogFeedback, setDialogFeedback] = useState(null);

  // --- 쓰기 • YOZISH ---
  const writingPrompts = [
    { uz: 'Talaba', ko: '학생', hint: 'ㅎ + ㅏ + ㄱ + ㅅ + ㅐ + ㅇ' },
    { uz: 'Kutubxona', ko: '도서관', hint: 'ㄷ + ㅗ + ㅅ + ㅓ + ㄱ + ㅘ + ㄴ' },
    { uz: 'Rahmat', ko: '감사합니다', hint: 'ㄱ + ㅏ + ㅁ + ㅅ + ㅏ + ㅎ + ㅏ + ㅂ + ㄴ + ㅣ + ㄷ + ㅏ' }
  ];
  const [writeIdx, setWriteIdx] = useState(0);
  const [writeInput, setWriteInput] = useState('');
  const [writeResult, setWriteResult] = useState(null);

  // --- HAQIQIY GEMINI AI USTOZ: 토히르벡 ---
  const [aiMessages, setAiMessages] = useState([
    {
      role: 'ai',
      ko: '안녕하세요! 저는 ZiyoPrep AI 튜터 토히르벡이에요. 무엇이든 물어보세요!',
      uz: `Assalomu alaykum! Men ZiyoPrep AI ustoz 토히르벡 (Tokhirbek) man. Bazamda 서울대 1A–6A dan ${allVocabWords.length}+ so‘z va barcha grammatikalar bor.`
    }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages, aiLoading]);

  const generateFallbackAiReply = (rawText) => {
    const q = rawText.toLowerCase().trim();
    const cleanQuery = q.replace(/(koreyscha nima|nima degani|tarjimasi|\?)/g, '').trim();
    const foundWord = allWords.find(
      w => (cleanQuery.length >= 2 && w.uz.toLowerCase().includes(cleanQuery)) ||
           (cleanQuery.length >= 1 && w.ko.toLowerCase() === cleanQuery)
    );
    if (foundWord) {
      return {
        ko: `"${foundWord.ko}" — 뜻: ${foundWord.uz}!`,
        uz: `Topildi! Koreyscha: "${foundWord.ko}" — O‘zbekcha ma’nosi: "${foundWord.uz}".`
      };
    }
    return {
      ko: `"${rawText}"에 대해 같이 공부해 봐요!`,
      uz: `Server bilan aloqa tekshirilmoqda. Savolingizni qayta yuborishingiz mumkin!`
    };
  };

  const handleAiSend = async (preset) => {
    const text = (preset || aiInput).trim();
    if (!text || aiLoading) return;

    const updatedHistory = [...aiMessages, { role: 'user', ko: text }];
    setAiMessages(updatedHistory);
    setAiInput('');
    setAiLoading(true);

    // Planner task completion check
    setPlannerTasks(prev => prev.map(task => task.id === 3 ? { ...task, done: true } : task));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: aiMessages,
          userName: profile.name
        })
      });

      const data = await res.json();
      if (data.ko || data.uz) {
        setAiMessages(prev => [...prev, { role: 'ai', ko: data.ko || '', uz: data.uz || '' }]);
        if (data.ko) speakKo(data.ko);
      } else {
        throw new Error(data.error || 'AI javob qaytarmadi');
      }
    } catch {
      const fallback = generateFallbackAiReply(text);
      setAiMessages(prev => [...prev, { role: 'ai', ...fallback }]);
      speakKo(fallback.ko);
    } finally {
      setAiLoading(false);
    }
  };

  // --- TAKRORLASH VA MASHQLAR ---
  const [reviewMode, setReviewMode] = useState('cards');
  const [flashIdx, setFlashIdx] = useState(0);
  const [flashFlipped, setFlashFlipped] = useState(false);

  const [listenIdx, setListenIdx] = useState(0);
  const [listenOpts, setListenOpts] = useState([]);
  const [listenPick, setListenPick] = useState(null);

  const [speakIdx, setSpeakIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [speechText, setSpeechText] = useState('');
  const [speechStatus, setSpeechStatus] = useState(null);

  const [mockActive, setMockActive] = useState(false);
  const [mockList, setMockList] = useState([]);
  const [mockStep, setMockStep] = useState(0);
  const [mockSelected, setMockSelected] = useState({});
  const [mockSeconds, setMockSeconds] = useState(300);
  const [mockDone, setMockDone] = useState(false);

  const prepareListening = (idx) => {
    const target = allWords[idx % allWords.length];
    const distractors = shuffleArray(allWords.filter(w => w.uz !== target.uz)).slice(0, 3).map(w => w.uz);
    setListenOpts(shuffleArray([target.uz, ...distractors]));
    setListenPick(null);
    speakKo(target.ko);
  };

  const handleSpeechTest = (targetKo) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setSpeechText("Brauzeringiz mikrofonni qo‘llab-quvvatlamaydi.");
      return;
    }
    try {
      const rec = new SR();
      rec.lang = 'ko-KR';
      rec.interimResults = false;
      setIsRecording(true);
      setSpeechText('');
      setSpeechStatus(null);

      rec.onresult = (e) => {
        const spoken = e.results[0][0].transcript;
        setSpeechText(spoken);
        const cleanSpoken = spoken.replace(/\s+/g, '');
        const cleanTarget = targetKo.split('/')[0].replace(/\s+/g, '');
        if (cleanSpoken.includes(cleanTarget) || cleanTarget.includes(cleanSpoken)) {
          setSpeechStatus({ ok: true, msg: "Ajoyib talaffuz! (+20 XP)" });
          setProfile(p => ({ ...p, xp: p.xp + 20, dailyXp: p.dailyXp + 20 }));
        } else {
          setSpeechStatus({ ok: false, msg: "Yana bir bor aniqroq talaffuz qilib ko‘ring!" });
        }
        setIsRecording(false);
      };
      rec.onerror = () => {
        setIsRecording(false);
        setSpeechText("Ovoz eshitilmadi.");
      };
      rec.start();
    } catch {
      setIsRecording(false);
    }
  };

  const launchTopikMock = () => {
    const picked = shuffleArray(allQuizzesPool).slice(0, 8).map(q => ({
      ...q,
      opts: shuffleArray(q.opts)
    }));
    setMockList(picked);
    setMockStep(0);
    setMockSelected({});
    setMockSeconds(300);
    setMockDone(false);
    setMockActive(true);
  };

  // --- 글자 조립 ---
  const [builderTab, setBuilderTab] = useState('no_batchim');
  const [cho, setCho] = useState('ㄱ');
  const [jung, setJung] = useState('ㅏ');
  const [jong, setJong] = useState('ㄴ');
  const [showDoubleCho, setShowDoubleCho] = useState(false);
  const [showCompoundJung, setShowCompoundJung] = useState(false);
  const [wordBuffer, setWordBuffer] = useState('');
  const [randomChar, setRandomChar] = useState('흐');
  const [practiceCount, setPracticeCount] = useState(0);

  const basicCho = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
  const doubleCho = ['ㄲ','ㄸ','ㅃ','ㅆ','ㅉ'];
  const basicJung = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
  const compoundJung = ['ㅐ','ㅒ','ㅔ','ㅖ','ㅘ','ㅙ','ㅚ','ㅝ','ㅞ','ㅟ','ㅢ'];
  const batchims = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅎ'];

  const activeJong = (builderTab === 'with_batchim' || builderTab === 'word') ? jong : '';
  const composedSyllable = composeHangul(cho, jung, activeJong);
  const romanGuide = `${ROMAN_CHO[cho] || ''} + ${ROMAN_JUNG[jung] || ''}${activeJong ? ` + ${ROMAN_JONG[activeJong] || ''}` : ''}`;

  const nextRandomSyllable = () => {
    const c = basicCho[Math.floor(Math.random() * basicCho.length)];
    const v = basicJung[Math.floor(Math.random() * basicJung.length)];
    const b = Math.random() > 0.45 ? batchims[Math.floor(Math.random() * batchims.length)] : '';
    setRandomChar(composeHangul(c, v, b));
    setPracticeCount(p => p + 1);
    setProfile(p => ({ ...p, xp: p.xp + 2, dailyXp: p.dailyXp + 2 }));
  };

  // --- DARS ICHIDAGI HOLATLAR ---
  const [openSec, setOpenSec] = useState({ rule: true, struct: true, words: true });
  const [doneSec, setDoneSec] = useState({ rule: false, struct: false });
  const [revealed, setRevealed] = useState({});
  const [editingMemo, setEditingMemo] = useState(false);
  const [memoInput, setMemoInput] = useState('');
  const [hwInput, setHwInput] = useState('');
  const [hwStatus, setHwStatus] = useState(null);

  const [quizList, setQuizList] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [qAnswer, setQAnswer] = useState(null);

  const toggleItem = (key, ko) => {
    speakKo(ko);
    setRevealed(p => ({ ...p, [key]: !p[key] }));
  };

  const startLesson = (lesson) => {
    setActiveLesson(lesson);
    setOpenSec({ rule: true, struct: true, words: true });
    setDoneSec({ rule: false, struct: false });
    setRevealed({});
    setEditingMemo(false);
    setMemoInput(memos[lesson.id] || '');
    setHwInput('');
    setHwStatus(null);
    const shuffled = shuffleArray(lesson.quizzes || []).map(q => ({
      ...q,
      opts: shuffleArray(q.opts)
    }));
    setQuizList(shuffled);
    setQIdx(0);
    setQAnswer(null);
    setScreen('lesson');

    // Planner task update
    setPlannerTasks(prev => prev.map(task => task.id === 1 ? { ...task, done: true } : task));
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
  // 0. KIRISH EKRANI
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
                  서울대 한국어 1A–6B darsliklari, {allVocabWords.length}+ lug‘at, AI ustoz 토히르벡 va boshqalar.
                </p>
              </div>
              <div className="space-y-3 pt-1">
                <button
                  onClick={handleGuestLogin}
                  className="w-full py-4 rounded-2xl bg-[#58cc02] hover:bg-[#4cb800] border-b-4 border-[#46a302] text-white font-black text-sm uppercase shadow-lg transition"
                >
                  Akkauntsiz Boshlash (Tezkor kirish)
                </button>
                <button
                  onClick={() => { setAuthError(''); setAuthForm({ name: '', email: '', password: '' }); setAuthMode('google'); }}
                  className={`w-full py-4 rounded-2xl ${t.card} border-2 border-b-4 font-black text-sm ${t.textMain} flex items-center justify-center gap-2 transition`}
                >
                  <span className="text-base font-black text-blue-500">G</span>
                  <span>Google bilan davom etish</span>
                </button>
              </div>
            </>
          )}

          {authMode === 'google' && (
            <div className={`${t.card} border rounded-3xl p-6 space-y-4 text-left`}>
              <div className="flex items-center justify-between">
                <button onClick={() => setAuthMode('welcome')} className={`p-2 rounded-xl ${t.sub} border`}><ArrowLeft size={16} /></button>
                <h2 className={`font-black text-base ${t.textMain}`}>Google hisob bilan kirish</h2>
                <div className="w-8" />
              </div>
              {authError && <div className="p-3 rounded-xl bg-rose-500/15 text-rose-500 text-xs font-bold text-center">{authError}</div>}
              <form onSubmit={handleGoogleSubmit} className="space-y-3">
                <input type="text" placeholder="Ismingiz (masalan: Tokhirbek)" value={authForm.name} onChange={e => setAuthForm({ ...authForm, name: e.target.value })} className={`w-full ${t.sub} border rounded-2xl px-4 py-3 text-xs font-bold outline-none`} />
                <input type="email" placeholder="example@gmail.com" value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })} className={`w-full ${t.sub} border rounded-2xl px-4 py-3 text-xs font-bold outline-none`} />
                <button type="submit" className="w-full py-3.5 rounded-2xl bg-blue-600 border-b-4 border-blue-800 text-white font-black text-xs uppercase">Tasdiqlash</button>
              </form>
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
              <span className="text-[10px] font-bold text-emerald-600">한글 스튜디오 • 1A–6B</span>
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

        <div className={`rounded-3xl ${isDark ? 'bg-emerald-950/35 border-emerald-800' : 'bg-gradient-to-r from-[#eef9e8] to-[#e4f5fc] border-[#cdeac0]'} border p-4 flex items-center gap-3.5`}>
          <ZiyoOwlAvatar className="w-16 h-16 rounded-2xl shrink-0 border-2 border-white" equipped={equippedItems} />
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-xs font-black ${t.textMain}`}>Salom, {profile.name}! 👋</span>
              <span className="text-[11px] font-black text-emerald-600">{profile.dailyXp}/100 XP</span>
            </div>
            <div className="w-full h-2.5 bg-white/80 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-[#58cc02] rounded-full transition-all duration-500" style={{ width: `${dailyPct}%` }} />
            </div>
            <div className="text-[10px] font-bold text-slate-500">
              🔥 {profile.streak} kunlik streak • ⚡ {profile.xp} XP
            </div>
          </div>
        </div>

        <button
          onClick={() => startLesson(nextLesson)}
          className={`w-full py-3.5 px-4 rounded-2xl ${t.card} border hover:border-emerald-400 text-xs font-black flex items-center justify-center gap-2 active:scale-99 transition`}
        >
          <Play size={13} className="text-[#58cc02] fill-[#58cc02]" />
          <span>{nextLesson.week} Davom etish ({nextLesson.title})</span>
        </button>

        {/* YANGI: KUNLIK PLANNER WIDGET */}
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

        <div className="grid grid-cols-2 gap-2.5">
          <div onClick={() => { setVocabQuizMode(false); setScreen('vocab'); }} className={`rounded-2xl ${isDark ? 'bg-indigo-950/40 border-indigo-800' : 'bg-[#f3f0fa] border-[#d8ccf5]'} border p-3.5 cursor-pointer`}>
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center mb-1">단어</div>
            <div className={`font-black text-xs ${t.textMain}`}>Lug‘atlar & Test</div>
          </div>
          <div onClick={() => setScreen('builder')} className={`rounded-2xl ${isDark ? 'bg-emerald-950/40 border-emerald-800' : 'bg-[#eef6ee] border-[#d6ead6]'} border p-3.5 cursor-pointer`}>
            <div className="w-8 h-8 rounded-xl bg-[#4d8b6f] text-white font-black text-xs flex items-center justify-center mb-1">가나다</div>
            <div className={`font-black text-xs ${t.textMain}`}>Harf Yig‘ish</div>
          </div>
        </div>

        {/* 12 TA KITOB SELECTION */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[11px] font-black text-slate-400 shrink-0 mr-1">서울대</span>
            {snuBooks.map((b) => {
              const active = b.code === selectedBookCode;
              return (
                <button
                  key={b.code}
                  onClick={() => setSelectedBookCode(b.code)}
                  className={`px-3 h-8 rounded-lg font-black text-xs shrink-0 transition ${
                    active ? 'bg-[#58cc02] text-white border-2 border-emerald-600' : `${t.card} border`
                  }`}
                >
                  {b.code}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2.5">
          {currentBook.lessons.map((lesson, idx) => {
            const isDone = completedIds.includes(lesson.id);
            const prev = idx > 0 ? currentBook.lessons[idx - 1] : null;
            const isOpen = isUnlockedAll || idx === 0 || isDone || (prev && completedIds.includes(prev.id));

            return (
              <div
                key={lesson.id}
                onClick={() => {
                  if (!isOpen) {
                    alert("Avval oldingi darsni tugating!");
                    return;
                  }
                  startLesson(lesson);
                }}
                className={`rounded-2xl ${t.card} border p-3.5 flex items-center justify-between cursor-pointer transition ${
                  isOpen ? 'hover:border-emerald-400' : 'opacity-65'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg font-black text-xs flex items-center justify-center ${
                    isDone ? 'bg-[#58cc02] text-white' : isOpen ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {lesson.num}
                  </span>
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

        {!isUnlockedAll && (
          <button onClick={() => setIsUnlockedAll(true)} className="w-full py-3.5 rounded-2xl bg-rose-600 text-white font-black text-xs shadow-md">
            Barcha darslarni ochish
          </button>
        )}
      </div>
    );
  };

  // =========================================================================
  // 1.5. LUG'ATLAR
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
                      // Add to mistakes notebook!
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
  // 2. 글자 조립
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
        <div className="text-xs font-bold text-slate-500">Zarur harflarni tanlab bo‘g‘in hosil qiling</div>
      </div>
    </div>
  );

  // =========================================================================
  // 3. DARS EKRANI
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
                  if (opt !== currentQ.ans) {
                    setMistakes(m => [...m, { ko: currentQ.ans, uz: currentQ.q }]);
                  }
                }} className={`w-full p-3 rounded-2xl text-left border text-xs font-bold ${qAnswer !== null ? (opt === currentQ.ans ? 'bg-emerald-500 text-white' : qAnswer === opt ? 'bg-rose-500 text-white' : `${t.sub}`) : `${t.sub} ${t.textMain}`}`}>
                  {opt}
                </button>
              ))}
            </div>
            {qAnswer && (
              <button onClick={() => {
                if (qIdx + 1 < quizList.length) {
                  setQIdx(qIdx + 1);
                  setQAnswer(null);
                } else {
                  setCompletedIds(p => [...new Set([...p, activeLesson.id])]);
                  setProfile(p => ({ ...p, xp: p.xp + 50 }));
                  setScreen('home');
                }
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
  // 4. AI USTOZ — 토히르벡
  // =========================================================================
  const renderAiTutor = () => (
    <div className="flex flex-col h-[78vh] pb-24 pt-2">
      <div className="flex items-center gap-2.5 pb-3">
        <ZiyoOwlAvatar className="w-11 h-11 rounded-2xl" equipped={equippedItems} />
        <div>
          <h2 className={`font-black text-sm ${t.textMain}`}>토히르벡</h2>
          <span className="text-[10px] font-bold text-emerald-500">● Jonli AI ustozi</span>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto rounded-3xl ${t.card} border p-4 space-y-3`}>
        {aiMessages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs space-y-1 ${m.role === 'user' ? 'bg-[#58cc02] text-white font-bold' : `${t.sub} ${t.textMain}`}`}>
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

  // =========================================================================
  // 5. TAKRORLASH (MISTAKE NOTEBOOK BILAN)
  // =========================================================================
  const renderReview = () => (
    <div className="space-y-4 pb-28 pt-2">
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'cards', label: 'So‘z' },
          { id: 'mistakes', label: `오답 노트 (${mistakes.length})` },
          { id: 'dialog', label: 'Dialog' },
          { id: 'mock', label: 'TOPIK' }
        ].map(m => (
          <button key={m.id} onClick={() => setReviewMode(m.id)} className={`px-3.5 py-2 rounded-2xl border text-xs font-black ${reviewMode === m.id ? 'bg-[#58cc02] text-white border-emerald-600' : `${t.card} ${t.textMuted}`}`}>
            {m.label}
          </button>
        ))}
      </div>

      {reviewMode === 'cards' && (
        <div className={`rounded-3xl ${t.card} border p-8 text-center space-y-4`}>
          <div className={`text-3xl font-black ${t.textMain}`}>{allWords[flashIdx % allWords.length].ko}</div>
          <div className="text-sm text-emerald-500 font-bold">{flashFlipped ? allWords[flashIdx % allWords.length].uz : 'Tarjimasi uchun bosing'}</div>
          <button onClick={() => setFlashFlipped(!flashFlipped)} className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-black">Tarjimani ko‘rish</button>
          <button onClick={() => { setFlashFlipped(false); setFlashIdx(i => i + 1); }} className="w-full py-3 rounded-2xl bg-[#58cc02] text-white font-black text-xs">Keyingi so‘z →</button>
        </div>
      )}

      {reviewMode === 'mistakes' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-black">
            <span className={t.textMain}>📌 Xatolar daftari (Qayta takrorlash)</span>
            {mistakes.length > 0 && <button onClick={() => setMistakes([])} className="text-rose-500 underline text-[10px]">Tozalash</button>}
          </div>
          {mistakes.length === 0 ? (
            <div className={`rounded-3xl ${t.card} border p-8 text-center text-xs text-slate-400`}>Hozircha xatolar yo‘q! Ajoyib! 🎉</div>
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
      )}
    </div>
  );

  // =========================================================================
  // 6. PROFIL
  // =========================================================================
  const renderProfile = () => (
    <div className="space-y-4 pb-28 pt-2">
      <div className={`rounded-3xl ${t.card} border p-5 flex items-center justify-between`}>
        <div className="flex items-center gap-3.5">
          <ZiyoOwlAvatar className="w-16 h-16 rounded-2xl" equipped={equippedItems} />
          <div>
            <h2 className={`font-black text-base ${t.textMain}`}>{profile.name}</h2>
            <p className="text-xs text-slate-400">{currentUser?.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        <div className={`rounded-2xl ${t.card} border p-3.5 text-center`}>
          <Flame size={20} className="mx-auto text-amber-500" />
          <div className={`text-lg font-black mt-1 ${t.textMain}`}>{profile.streak}</div>
          <div className="text-[10px] text-slate-400">Streak</div>
        </div>
        <div className={`rounded-2xl ${t.card} border p-3.5 text-center`}>
          <Zap size={20} className="mx-auto text-sky-500" />
          <div className={`text-lg font-black mt-1 ${t.textMain}`}>{profile.xp}</div>
          <div className="text-[10px] text-slate-400">XP</div>
        </div>
        <div className={`rounded-2xl ${t.card} border p-3.5 text-center`}>
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
        {screen === 'builder' && renderBuilder()}
        {screen === 'lesson' && renderLesson()}
        {screen === 'ai' && renderAiTutor()}
        {screen === 'review' && renderReview()}
        {screen === 'profile' && renderProfile()}
      </main>

      <nav className={`fixed bottom-0 inset-x-0 z-40 ${t.nav} px-2 pt-2.5 pb-4 backdrop-blur-xl shadow-lg`}>
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button onClick={() => setScreen('home')} className={`flex flex-col items-center py-1 px-2 ${screen === 'home' || screen === 'lesson' ? 'text-[#58cc02]' : t.textMuted}`}><BookOpen size={25} /><span className="text-[11px] font-black">Dars</span></button>
          <button onClick={() => setScreen('vocab')} className={`flex flex-col items-center py-1 px-2 ${screen === 'vocab' ? 'text-indigo-500' : t.textMuted}`}><Sparkles size={25} /><span className="text-[11px] font-black">Lug‘at</span></button>
          <button onClick={() => setScreen('ai')} className="-mt-8 w-16 h-16 rounded-full bg-[#58cc02] border-b-4 border-[#46a302] text-white flex items-center justify-center shadow-xl"><ZiyoOwlAvatar className="w-full h-full rounded-full" equipped={equippedItems} /></button>
          <button onClick={() => setScreen('review')} className={`flex flex-col items-center py-1 px-2 ${screen === 'review' ? 'text-amber-500' : t.textMuted}`}><RotateCcw size={25} /><span className="text-[11px] font-black">Mashq</span></button>
          <button onClick={() => setScreen('profile')} className={`flex flex-col items-center py-1 px-2 ${screen === 'profile' ? 'text-indigo-500' : t.textMuted}`}><User size={25} /><span className="text-[11px] font-black">Profil</span></button>
        </div>
      </nav>
    </div>
  );
}
