import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, ArrowLeft, Globe, Lock, CheckCircle2, 
  ChevronUp, ChevronDown, Edit3, Shuffle, Play, 
  BookOpen, Sparkles, RotateCcw, User, 
  Flame, Zap, Send, Sun, Moon, LogOut,
  Headphones, Mic, Clock, Layers, Timer,
  MessageSquare, Keyboard, ShoppingBag, Trophy
} from 'lucide-react';

// ZiyoPrep Yashil Boyo'g'li Maskot (Kiyiladigan aksessuarlar: TOPIK qalpoqchasi, ko'zoynak, toj bilan)
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

        {/* Oq Bosh Bog'ich (ZiyoPrep + Koreya bayrog'i) */}
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

        {/* AKSESSUAR 1: TOPIK Bitiruvchi Qalpoqchasi */}
        {equipped.gradCap && (
          <g>
            <polygon points="100,12 152,30 100,48 48,30" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
            <rect x="74" y="34" width="52" height="14" rx="4" fill="#334155" />
            <line x1="146" y1="32" x2="152" y2="54" stroke="#facc15" strokeWidth="3" />
            <circle cx="152" cy="55" r="4" fill="#f59e0b" />
          </g>
        )}

        {/* AKSESSUAR 2: Oltin Qirollik Toji */}
        {equipped.crown && (
          <g>
            <polygon points="68,46 76,20 90,36 100,14 110,36 124,20 132,46" fill="#facc15" stroke="#d97706" strokeWidth="2" />
            <circle cx="100" cy="24" r="3" fill="#ef4444" />
            <circle cx="78" cy="30" r="2.5" fill="#3b82f6" />
            <circle cx="122" cy="30" r="2.5" fill="#3b82f6" />
          </g>
        )}

        {/* Katta Quvnoq Ko'zlar */}
        <circle cx="72" cy="105" r="22" fill="#ffffff" />
        <circle cx="128" cy="105" r="22" fill="#ffffff" />
        <circle cx="76" cy="105" r="11.5" fill="#1e293b" />
        <circle cx="124" cy="105" r="11.5" fill="#1e293b" />
        <circle cx="80" cy="100" r="4.2" fill="#ffffff" />
        <circle cx="128" cy="100" r="4.2" fill="#ffffff" />

        {/* AKSESSUAR 3: Aqlli Ko'zoynak */}
        {equipped.glasses && (
          <g>
            <circle cx="72" cy="105" r="24" fill="rgba(56,189,248,0.18)" stroke="#0f172a" strokeWidth="4.5" />
            <circle cx="128" cy="105" r="24" fill="rgba(56,189,248,0.18)" stroke="#0f172a" strokeWidth="4.5" />
            <line x1="96" y1="103" x2="104" y2="103" stroke="#0f172a" strokeWidth="5" />
            <line x1="36" y1="96" x2="48" y2="102" stroke="#0f172a" strokeWidth="4" />
            <line x1="164" y1="96" x2="152" y2="102" stroke="#0f172a" strokeWidth="4" />
          </g>
        )}

        {/* Sariq Tumshuq */}
        <path d="M91 116 Q100 111 109 116 L100 129 Z" fill="#f59e0b" />
        <path d="M94 123 Q100 133 106 123 Z" fill="#ea580c" />

        {/* Ko'k 한국어 Kitobi */}
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

// Unicode Hangul Bo'g'in Yig'uvchi Formula
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
  // --- 1. LOGIN / REGISTER / AKKAUNTSIZ KIRISH ---
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hs_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [authMode, setAuthMode] = useState('welcome');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');

  const handleGuestLogin = () => {
    const guest = { uid: 'guest', name: 'Tokhirbek', email: 'talaba@ziyoprep.uz', isGuest: true };
    setCurrentUser(guest);
    localStorage.setItem('hs_auth_user', JSON.stringify(guest));
  };

  const handleGoogleLogin = () => {
    const gUser = { uid: 'google_user', name: 'Tokhirbek', email: 'tokhirbek@gmail.com' };
    setCurrentUser(gUser);
    localStorage.setItem('hs_auth_user', JSON.stringify(gUser));
  };

  const handleEmailAuth = (e) => {
    e.preventDefault();
    setAuthError('');
    if (!authForm.email.trim() || !authForm.password.trim()) {
      return setAuthError("Email va parolni kiriting!");
    }
    if (authForm.password.length < 4) {
      return setAuthError("Parol kamida 4 ta belgidan iborat bo‘lishi kerak.");
    }
    const displayName = authForm.name.trim() || authForm.email.split('@')[0] || 'Tokhirbek';
    const userObj = { uid: 'user_' + Date.now(), name: displayName, email: authForm.email.trim() };
    setCurrentUser(userObj);
    localStorage.setItem('hs_auth_user', JSON.stringify(userObj));
    setProfile(p => ({ ...p, name: displayName }));
  };

  const handleLogout = () => {
    localStorage.removeItem('hs_auth_user');
    setCurrentUser(null);
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

  // XP Do'koni (Maskot aksessuarlari)
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

  // --- 서울대 한국어 1A ~ 6B TO'LIQ DARSLIKLAR, LUG'ATLAR VA UYGA VAZIFALAR ---
  const snuBooks = [
    {
      code: '1A',
      label: '서울대 한국어 1A',
      range: 'TOPIK 1 · Boshlang‘ich 1 (1과–8과 To‘liq)',
      lessons: [
        {
          id: '1a-1', num: 1, week: '1A · 1과', emoji: '👋', title: '안녕하세요? (Tanishuv)',
          heroKo: '저는 우즈베키스탄 사람이에요', heroUz: 'Men O‘zbekistonlikman',
          pinkTitle: 'N은/는 N이에요 / 예요', pinkSub: 'Millat, kasb va ismni tanishtirish',
          pinkGroups: [
            {
              cond: '받침이 없으면 (Unli bilan tugasa) → 예요',
              items: [
                { ko: '저는 유나예요.', uz: 'Men Yunaman.' },
                { ko: '저는 가수예요.', uz: 'Men qo‘shiqchiman.' },
                { ko: '저는 의사예요.', uz: 'Men shifokorman.' }
              ]
            },
            {
              cond: '받침이 있으면 (Undosh bilan tugasa) → 이에요',
              items: [
                { ko: '저는 학생이에요.', uz: 'Men talabaman.' },
                { ko: '저는 회사원이에요.', uz: 'Men kompaniya xodimiman.' },
                { ko: '저는 선생님이에요.', uz: 'Men o‘qituvchiman.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '저는 + 명사 + 예요 / 이에요',
          greenRows: [
            { parts: ['저는', '학생', '이에요'], res: '저는 학생이에요.', uz: 'Men talabaman.' },
            { parts: ['저는', '가수', '예요'], res: '저는 가수예요.', uz: 'Men qo‘shiqchiman.' }
          ],
          words: [
            { ko: '한국 / 우즈베키스탄', uz: 'Koreya / O‘zbekiston' },
            { ko: '학생 / 선생님', uz: 'Talaba / O‘qituvchi' },
            { ko: '회사원 / 의사', uz: 'Kompaniya xodimi / Shifokor' },
            { ko: '이름 / 국적', uz: 'Ism / Millat' },
            { ko: '만나서 반갑습니다', uz: 'Tanishganimdan xursandman' }
          ],
          homework: {
            taskUz: "O‘zingizni tanishtiring: 'Men talabaman' deb koreyscha yozing.",
            sampleKo: '저는 학생이에요',
            hint: '저는 + 학생 + 이에요'
          },
          quizzes: [
            { q: "‘저는 학생___’ — to‘g‘ri qo‘shimchani tanlang:", opts: ['이에요', '예요', '을', '를'], ans: '이에요', exp: "‘학생’ undosh bilan tugagani uchun ‘이에요’ qo‘shiladi." },
            { q: "‘저는 의사___’ — to‘g‘ri qo‘shimcha:", opts: ['예요', '이에요', '에', '에서'], ans: '예요', exp: "‘의사’ unli bilan tugagani uchun ‘예요’ qo‘shiladi." }
          ]
        },
        {
          id: '1a-2', num: 2, week: '1A · 2과', emoji: '🎒', title: '이거 뭐예요? (Buyumlar va Inkor)',
          heroKo: '이것은 한국어 사전이에요', heroUz: 'Bu koreys tili lug‘ati',
          pinkTitle: '이것 / 그것 / 저것 & N이/가 아니에요', pinkSub: 'Ko‘rsatish olmoshlari va inkor shakli (-emas)',
          pinkGroups: [
            {
              cond: '이거 (bu), 그거 (u), 저거 (anavi) | Inkor: 이/가 아니에요',
              items: [
                { ko: '이거는 핸드폰이에요.', uz: 'Bu telefon.' },
                { ko: '저거는 시계가 아니에요. 카메라예요.', uz: 'Anavi soat emas. Kamera.' },
                { ko: '그거는 제 우산이에요.', uz: 'U mening soyabonim.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '이거는 + 명사 + 이/가 아니에요',
          greenRows: [
            { parts: ['이거는', '책이', '아니에요'], res: '이거는 책이 아니에요.', uz: 'Bu kitob emas.' }
          ],
          words: [
            { ko: '책 / 공책', uz: 'Kitob / Daftar' },
            { ko: '사전 / 연필', uz: 'Lug‘at / Qalam' },
            { ko: '시계 / 안경', uz: 'Soat / Ko‘zoynak' },
            { ko: '우산 / 모자', uz: 'Soyabon / Bosh kiyim' }
          ],
          homework: {
            taskUz: "Inkor gap yozing: 'Bu kitob emas' (이거는 ...).",
            sampleKo: '이거는 책이 아니에요',
            hint: '이거는 + 책이 + 아니에요'
          },
          quizzes: [
            { q: "‘Bu soat emas’ — to‘g‘ri tarjima:", opts: ['이거는 시계가 아니에요', '이거는 시계예요', '이거는 시계 있어요', '이거는 시계를 아니에요'], ans: '이거는 시계가 아니에요', exp: "Inkor shaklida ‘이/가 아니에요’ ishlatiladi." }
          ]
        },
        {
          id: '1a-3', num: 3, week: '1A · 3과', emoji: '📚', title: '한국어를 공부해요 (Kundalik ishlar)',
          heroKo: '도서관에서 한국어를 공부해요', heroUz: 'Kutubxonada koreys tilini o‘rganaman',
          pinkTitle: 'V-아요 / 어요 & N에서', pinkSub: 'Hozirgi zamon fe’li va harakat joyi',
          pinkGroups: [
            {
              cond: 'ㅏ, ㅗ → 아요  |  Boshqa unlilar → 어요  |  하다 → 해요',
              items: [
                { ko: '카페에서 친구를 만나요.', uz: 'Kafeda do‘stim bilan uchrashaman.' },
                { ko: '식당에서 비빔밥을 먹어요.', uz: 'Oshxonada bibimbap yeyman.' },
                { ko: '집에서 숙제를 해요.', uz: 'Uyda uy vazifasini qilaman.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '장소 + 에서 + 목적어 + 을/를 + V-아요/어요',
          greenRows: [
            { parts: ['도서관에서', '한국어를', '공부해요'], res: '도서관에서 한국어를 공부해요.', uz: 'Kutubxonada koreys tilini o‘rganaman.' }
          ],
          words: [
            { ko: '도서관 / 식당', uz: 'Kutubxona / Oshxona' },
            { ko: '공부하다 / 일하다', uz: 'O‘qimoq / Ishlamoq' },
            { ko: '먹다 / 마시다', uz: 'Yemoq / Ichmoq' },
            { ko: '보다 / 읽다', uz: 'Ko‘rmoq / O‘qimoq' }
          ],
          homework: {
            taskUz: "Harakat joyini yozing: 'Kutubxonada koreys tilini o‘rganaman'.",
            sampleKo: '도서관에서 한국어를 공부해요',
            hint: '도서관에서 + 한국어를 + 공부해요'
          },
          quizzes: [
            { q: "Harakat sodir bo‘lgan joyga qaysi qo‘shimcha qo‘shiladi?", opts: ['에서', '에', '와', '도'], ans: '에서', exp: "Harakat fe’li bilan joyga ‘-에서’ qo‘shiladi." }
          ]
        },
        {
          id: '1a-4', num: 4, week: '1A · 4과', emoji: '📍', title: '어디에 있어요? (Joylashuv)',
          heroKo: '은행은 병원 옆에 있어요', heroUz: 'Bank kasalxonaning yonida joylashgan',
          pinkTitle: 'N에 있어요 / 없어요 & Joy otlari', pinkSub: '위 (ustida), 아래 (ostida), 앞 (oldida), 뒤 (orqasida), 옆 (yonida)',
          pinkGroups: [
            {
              cond: 'Narsa + 이/가 + Joy + 에 있어요',
              items: [
                { ko: '가방이 의자 위에 있어요.', uz: 'Sumka stulning ustida turibdi.' },
                { ko: '약국이 은행하고 병원 사이에 있어요.', uz: 'Dorixona bank va kasalxona orasida joylashgan.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '명사1 + 은/는 + 명사2 + 앞/뒤/옆 + 에 있어요',
          greenRows: [
            { parts: ['은행은', '병원 옆', '에 있어요'], res: '은행은 병원 옆에 있어요.', uz: 'Bank kasalxona yonida.' }
          ],
          words: [
            { ko: '은행 / 병원 / 약국', uz: 'Bank / Kasalxona / Dorixona' },
            { ko: '위 / 아래 / 밑', uz: 'Ustida / Ostida / Tagida' },
            { ko: '앞 / 뒤 / 옆', uz: 'Oldida / Orqasida / Yonida' },
            { ko: '안 / 밖 / 사이', uz: 'Ichida / Tashqarisida / Orasida' }
          ],
          homework: {
            taskUz: "Joylashuvni yozing: 'Sumka stul ustida bor' (가방이 의자 ...).",
            sampleKo: '가방이 의자 위에 있어요',
            hint: '가방이 + 의자 위에 + 있어요'
          },
          quizzes: [
            { q: "‘Kasalxona yonida’ koreys tilida qanday bo‘ladi?", opts: ['병원 옆에', '병원 위에', '병원 안에', '병원 밑에'], ans: '병원 옆에', exp: "‘옆’ — yonida." }
          ]
        },
        {
          id: '1a-5', num: 5, week: '1A · 5과', emoji: '📅', title: '주말에 친구를 만났어요 (O‘tgan zamon)',
          heroKo: '어제 친구하고 영화를 봤어요', heroUz: 'Kecha do‘stim bilan kino ko‘rdim',
          pinkTitle: 'V-았어요 / 었어요 & N하고', pinkSub: 'O‘tgan zamon va birgalik (-bilan)',
          pinkGroups: [
            {
              cond: 'ㅏ, ㅗ → 았어요 | Boshqa unlilar → 었어요 | 하다 → 했어요',
              items: [
                { ko: '토요일에 백화점에서 쇼핑했어요.', uz: 'Shanba kuni univermagda xarid qildim.' },
                { ko: '일요일에 집에서 책을 읽었어요.', uz: 'Yakshanba kuni uyda kitob o‘qidim.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '언제 + 누구하고 + 무엇을 + V-았/었어요',
          greenRows: [
            { parts: ['어제', '친구하고 영화를', '봤어요'], res: '어제 친구하고 영화를 봤어요.', uz: 'Kecha do‘stim bilan kino ko‘rdim.' }
          ],
          words: [
            { ko: '어제 / 오늘 / 내일', uz: 'Kecha / Bugun / Ertaga' },
            { ko: '월요일 ~ 일요일', uz: 'Dushanba ~ Yakshanba' },
            { ko: '쇼핑하다 / 운동하다', uz: 'Xarid qilmoq / Sport qilmoq' },
            { ko: '산책하다 / 쉬다', uz: 'Sayr qilmoq / Dam olmoq' }
          ],
          homework: {
            taskUz: "O‘tgan zamonda yozing: 'Kecha kino ko‘rdim'.",
            sampleKo: '어제 영화를 봤어요',
            hint: '어제 + 영화를 + 봤어요'
          },
          quizzes: [
            { q: "‘먹다’ (yemoq) fe’lining o‘tgan zamon shakli:", opts: ['먹었어요', '먹았어요', '먹해요', '먹을 거예요'], ans: '먹었어요', exp: "‘ㅓ’ unlisidan keyin ‘-었어요’ qo‘shiladi." }
          ]
        },
        {
          id: '1a-6', num: 6, week: '1A · 6과', emoji: '🍎', title: '얼마예요? (Xarid va Sonlar)',
          heroKo: '사과 다섯 개하고 오렌지 두 개 주세요', heroUz: 'Beshta olma va ikkita apelsin bering',
          pinkTitle: 'Asl Koreys Sonlari + 개, 병, 잔, 명, 권', pinkSub: '하나(한), 둘(두), 셋(세), 넷(네), 다섯...',
          pinkGroups: [
            {
              cond: 'Buyum: 개 | Shisha: 병 | Stakan: 잔 | Odam: 명 | Kitob: 권',
              items: [
                { ko: '아이스 아메리카노 두 잔 주세요.', uz: 'Ikkita muzli amerikano bering.' },
                { ko: '학생이 모두 열 명 있어요.', uz: 'Jami o‘n nafar talaba bor.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '명사 + 수량(한/두/세) + 단위(개/잔) + 주세요',
          greenRows: [
            { parts: ['사과', '다섯 개', '주세요'], res: '사과 다섯 개 주세요.', uz: 'Beshta olma bering.' }
          ],
          words: [
            { ko: '하나 / 둘 / 셋 / 넷 / 다섯', uz: '1 / 2 / 3 / 4 / 5 (Asl koreys)' },
            { ko: '일 / 이 / 삼 / 사 / 오', uz: '1 / 2 / 3 / 4 / 5 (Xitoy-koreys)' },
            { ko: '얼마예요? / 싸다 / 비싸다', uz: 'Qancha? / Arzon / Qimmat' },
            { ko: '깎아 주세요', uz: 'Narxini tushirib bering' }
          ],
          homework: {
            taskUz: "Do‘konda so‘rang: 'Ikki stakan kofe bering'.",
            sampleKo: '커피 두 잔 주세요',
            hint: '커피 + 두 잔 + 주세요'
          },
          quizzes: [
            { q: "Odamlarni sanashda qaysi hisob so‘zi ishlatiladi?", opts: ['명', '개', '잔', '권'], ans: '명', exp: "Odamlar ‘명’ bilan sanaladi." }
          ]
        },
        {
          id: '1a-7', num: 7, week: '1A · 7과', emoji: '☀️', title: '날씨가 어때요? (Ob-havo va Fasllar)',
          heroKo: '한국은 봄에 따뜻하고 꽃이 많이 펴요', heroUz: 'Koreyada bahorda havo iliq bo‘ladi va gullar ko‘p ochiladi',
          pinkTitle: 'A/V-고 (Va) & ㅂ-noto‘g‘ri sifatlar', pinkSub: '춥다 → 추워요, 덥다 → 더워요, 아름답다 → 아름다워요',
          pinkGroups: [
            {
              cond: 'Bog‘lovchi (-va): -고 | ㅂ tushishi: 춥다 → 추워요',
              items: [
                { ko: '오늘은 날씨가 맑고 시원해요.', uz: 'Bugun havo ochiq va salqin.' },
                { ko: '겨울에는 눈이 오고 아주 추워요.', uz: 'Qishda qor yog‘adi va juda sovuq bo‘ladi.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '계절 + 에는 + 형용사1-고 + 형용사2-아요/어요',
          greenRows: [
            { parts: ['오늘은', '맑고', '시원해요'], res: '오늘은 맑고 시원해요.', uz: 'Bugun havo ochiq va salqin.' }
          ],
          words: [
            { ko: '봄 / 여름 / 가을 / 겨울', uz: 'Bahor / Yoz / Kuz / Qish' },
            { ko: '따뜻하다 / 덥다', uz: 'Iliq / Issiq' },
            { ko: '시원하다 / 춥다', uz: 'Salqin / Sovuq' },
            { ko: '비가 오다 / 눈이 오다', uz: 'Yomg‘ir yog‘moq / Qor yog‘moq' }
          ],
          homework: {
            taskUz: "Ob-havoni tasvirlang: 'Bugun havo sovuq' (오늘 날씨가 ...).",
            sampleKo: '오늘 날씨가 추워요',
            hint: '오늘 날씨가 + 추워요'
          },
          quizzes: [
            { q: "‘덥다’ (issiq) sifatining hozirgi zamon shakli:", opts: ['더워요', '덥아요', '덥어요', '더웠어요'], ans: '더워요', exp: "‘ㅂ’ undoshi ‘우’ ga aylanib ‘더워요’ bo‘ladi." }
          ]
        },
        {
          id: '1a-8', num: 8, week: '1A · 8과', emoji: '🎬', title: '주말에 같이 영화 볼까요? (Taklif)',
          heroKo: '토요일 오후에 같이 등산할까요?', heroUz: 'Shanba tushdan keyin birga toqqa chiqaylikmi?',
          pinkTitle: 'V-(으)ㄹ까요? & V-고 싶다', pinkSub: 'Taklif bildirish (-aylikmi?) va istak (-moqchi)',
          pinkGroups: [
            {
              cond: 'Taklif: -(으)ㄹ까요? | Istak: -고 싶어요',
              items: [
                { ko: '우리 내일 같이 점심 먹을까요?', uz: 'Ertaga birga tushlik qilaylikmi?' },
                { ko: '저는 한국 음식을 만들고 싶어요.', uz: 'Men koreys taomini tayyorlamoqchiman.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '같이 + 명사 + 을/를 + V-(으)ㄹ까요?',
          greenRows: [
            { parts: ['같이', '영화를', '볼까요?'], res: '같이 영화를 볼까요?', uz: 'Birga kino ko‘raylikmi?' }
          ],
          words: [
            { ko: '등산하다 / 수영하다', uz: 'Toqqa chiqmoq / Suzmoq' },
            { ko: '노래방에 가다', uz: 'Karaokega bormoq' },
            { ko: '시간이 있다 / 없다', uz: 'Vaqti bor / yo‘q' },
            { ko: '미안하지만 / 좋아요', uz: 'Kechirasiz-u, lekin / Yaxshi, mayli' }
          ],
          homework: {
            taskUz: "Do‘stingizga taklif qiling: 'Birga tushlik qilaylikmi?'.",
            sampleKo: '같이 점심을 먹을까요?',
            hint: '같이 + 점심을 + 먹을까요?'
          },
          quizzes: [
            { q: "‘Kino ko‘rmoqchiman’ — to‘g‘ri istak shakli:", opts: ['영화를 보고 싶어요', '영화를 볼까요', '영화를 봤어요', '영화를 보세요'], ans: '영화를 보고 싶어요', exp: "Istak qo‘shimchasi: ‘V-고 싶다’." }
          ]
        }
      ]
    },
    {
      code: '1B',
      label: '서울대 한국어 1B',
      range: 'TOPIK 1–2 · Boshlang‘ich 2 (9과–16과 To‘liq)',
      lessons: [
        {
          id: '1b-1', num: 9, week: '1B · 9과', emoji: '👨‍👩‍👧‍👦', title: '가족이 몇 명이에요? (Oila va Hurmat)',
          heroKo: '부모님께서 고향에 계세요', heroUz: 'Ota-onam vatanimda yashaydilar',
          pinkTitle: 'N께서 / V-(으)세요 / 계시다 · 드시다 · 주무시다', pinkSub: 'Kattalarga hurmat shakli (높임말)',
          pinkGroups: [
            {
              cond: '있다 → 계시다 | 먹다 → 드시다 | 자다 → 주무시다 | 말하다 → 말씀하시다',
              items: [
                { ko: '할아버지께서 신문을 읽으세요.', uz: 'Bobom gazeta o‘qiyaptilar.' },
                { ko: '어머니께서 부엌에서 요리하세요.', uz: 'Onam oshxonada ovqat pishiryaptilar.' },
                { ko: '부모님께서 지금 주무세요.', uz: 'Ota-onam hozir uxlayaptilar.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '가족(Hurmat) + 께서 + 동사-(으)세요',
          greenRows: [
            { parts: ['부모님께서', '고향에', '계세요'], res: '부모님께서 고향에 계세요.', uz: 'Ota-onam vatanimda yashaydilar.' }
          ],
          words: [
            { ko: '할아버지 / 할머니', uz: 'Bobo / Buvi' },
            { ko: '아버지 / 어머니', uz: 'Ota / Ona' },
            { ko: '형 / 오빠 / 누나 / 언니', uz: 'Aka / Opa' },
            { ko: '동생 / 남동생 / 여동생', uz: 'Uka / Singil' },
            { ko: '연세 / 성함 / 댁', uz: 'Yosh / Ism / Uy (hurmat)' }
          ],
          homework: {
            taskUz: "Hurmat shaklida yozing: 'Ota-onam vatanimda yashaydilar' (부모님께서 ...).",
            sampleKo: '부모님께서 고향에 계세요',
            hint: '부모님께서 + 고향에 + 계세요'
          },
          quizzes: [
            { q: "‘자다’ (uxlamoq) fe’lining kattalarga nisbatan hurmat shakli:", opts: ['주무시다', '계시다', '드시다', '편찮으시다'], ans: '주무시다', exp: "Hurmat shaklida ‘자다’ → ‘주무시다’ bo‘ladi." }
          ]
        },
        {
          id: '1b-2', num: 10, week: '1B · 10과', emoji: '⏰', title: '지금 몇 시예요? (Vaqt va Kun tartibi)',
          heroKo: '오전 9시에 한국어 수업이 시작해요', heroUz: 'Ertalab soat 9 da koreys tili darsi boshlanadi',
          pinkTitle: 'Soat (Asl koreys) + 분 (Xitoy-koreys) & N부터 N까지', pinkSub: 'Boshlanish (부터) va tugash (까지) vaqti',
          pinkGroups: [
            {
              cond: '한 시, 두 시, 세 시, 네 시 + 십 분, 이십 분, 반 (yarim)',
              items: [
                { ko: '아침 7시 반에 일어나요.', uz: 'Ertalab 7:30 da uyg‘onaman.' },
                { ko: '9시부터 1시까지 수업이 있어요.', uz: '9 dan 1 gacha darsim bor.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '시간1 + 부터 + 시간2 + 까지',
          greenRows: [
            { parts: ['9시부터', '1시까지', '공부해요'], res: '9시부터 1시까지 공부해요.', uz: '9 dan 1 gacha o‘qiyman.' }
          ],
          words: [
            { ko: '새벽 / 아침 / 점심 / 저녁 / 밤', uz: 'Tong / Ertalab / Tushlik / Kechqurun / Tun' },
            { ko: '일어나다 / 세수하다 / 씻다', uz: 'Uyg‘onmoq / Yuz-qo‘l yuvmoq / Yuvinmoq' },
            { ko: '출근하다 / 퇴근하다', uz: 'Ishga bormoq / Ishdan qaytmoq' },
            { ko: '시작하다 / 끝나다', uz: 'Boshlanmoq / Tugamoq' }
          ],
          homework: {
            taskUz: "Vaqt oralig‘ini yozing: '9 dan 1 gacha o‘qiyman' (9시부터 ...).",
            sampleKo: '9시부터 1시까지 공부해요',
            hint: '9시부터 + 1시까지 + 공부해요'
          },
          quizzes: [
            { q: "Soat 2:30 koreys tilida qanday aytiladi?", opts: ['두 시 반', '이 시 반', '두 시 이', '이 시 삼십'], ans: '두 시 반', exp: "Soat asl koreys soni (두 시) bilan aytiladi." }
          ]
        },
        {
          id: '1b-3', num: 11, week: '1B · 11과', emoji: '🏥', title: '감기에 걸렸어요 (Salomatlik)',
          heroKo: '열이 나고 목이 아파서 병원에 갔어요', heroUz: 'Isitmam chiqib tomog‘im og‘rigani uchun kasalxonaga bordim',
          pinkTitle: 'A/V-아서/어서 (Sabab) & V-(으)면 안 되다 (Taqiq)', pinkSub: 'Kasal bo‘lganda sabab aytish va shifokor tavsiyasi',
          pinkGroups: [
            {
              cond: 'Sabab: -아서/어서 | Taqiq (-ish mumkin emas): -(으)면 안 돼요',
              items: [
                { ko: '배가 아파서 약을 먹었어요.', uz: 'Qornim og‘rigani uchun dori ichdim.' },
                { ko: '오늘은 찬물을 마시면 안 돼요.', uz: 'Bugun sovuq suv ichish mumkin emas.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '증상(Alomat) + -아서/어서 + 병원에 갔어요',
          greenRows: [
            { parts: ['머리가 아파서', '약을', '먹었어요'], res: '머리가 아파서 약을 먹었어요.', uz: 'Boshim og‘rigani uchun dori ichdim.' }
          ],
          words: [
            { ko: '머리 / 눈 / 코 / 입 / 귀', uz: 'Bosh / Ko‘z / Burun / Og‘iz / Quloq' },
            { ko: '목 / 배 / 손 / 발 / 다리', uz: 'Tomoq / Qorin / Qo‘l / Oyoq panjasi / Oyoq' },
            { ko: '감기에 걸리다 / 열이 나다', uz: 'Shamollab qolmoq / Isitmasi chiqmoq' },
            { ko: '기침을 하다 / 콧물이 나다', uz: 'Yo‘talmoq / Burni oqmoq' },
            { ko: '푹 쉬다 / 약을 먹다', uz: 'To‘yib dam olmoq / Dori ichmoq' }
          ],
          homework: {
            taskUz: "Sabab gap yozing: 'Boshim og‘rigani uchun dori ichdim'.",
            sampleKo: '머리가 아파서 약을 먹었어요',
            hint: '머리가 아파서 + 약을 먹었어요'
          },
          quizzes: [
            { q: "‘Sovuq suv ichish mumkin emas’ — to‘g‘ri taqiq shakli:", opts: ['찬물을 마시면 안 돼요', '찬물을 마셔서 안 돼요', '찬물을 마시고 싶어요', '찬물을 마실 거예요'], ans: '찬물을 마시면 안 돼요', exp: "Taqiq shakli: ‘V-(으)면 안 되다’." }
          ]
        },
        {
          id: '1b-4', num: 12, week: '1B · 12과', emoji: '📞', title: '여보세요? (Telefon suhbati)',
          heroKo: '지금 통화 중이니까 나중에 다시 걸게요', heroUz: 'Hozir band bo‘lgani uchun keyinroq qayta qo‘ng‘iroq qilaman',
          pinkTitle: 'V-(으)ㄹ게요 (Va’da/Niyat) & V-고 있다 (Davomiy zamon)', pinkSub: 'Telefonda gaplashish va hozir davom etayotgan ish',
          pinkGroups: [
            {
              cond: 'Hozir davom etmoqda: -고 있어요 | O‘z qarori/va’da: -(으)ㄹ게요',
              items: [
                { ko: '민수 씨는 지금 회의하고 있어요.', uz: 'Minsu hozir majlis o‘tkazyapti.' },
                { ko: '알겠습니다. 제가 다시 전화할게요.', uz: 'Tushunarli. Men qayta qo‘ng‘iroq qilaman.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '주어 + 는 + 지금 + V-고 있어요',
          greenRows: [
            { parts: ['저는 지금', '한국어를 공부하고', '있어요'], res: '저는 지금 한국어를 공부하고 있어요.', uz: 'Men hozir koreys tilini o‘rganyapman.' }
          ],
          words: [
            { ko: '여보세요 / 실례지만', uz: 'Allo / Kechirasiz-u' },
            { ko: '전화를 걸다 / 받다 / 끊다', uz: 'Qo‘ng‘iroq qilmoq / Olmoq / Qo‘ymoq' },
            { ko: '통화 중이다 / 문자를 보내다', uz: 'Band bo‘lmoq / SMS yubormoq' },
            { ko: '나중에 / 다시 / 메모를 남기다', uz: 'Keyinroq / Qayta / Xabar qoldirmoq' }
          ],
          homework: {
            taskUz: "Hozirgi davomiy zamonda yozing: 'Men hozir koreys tilini o‘rganyapman'.",
            sampleKo: '저는 지금 한국어를 공부하고 있어요',
            hint: '저는 지금 + 한국어를 + 공부하고 있어요'
          },
          quizzes: [
            { q: "Hozir ayni damda davom etayotgan harakat qo‘shimchasi:", opts: ['-고 있다', '-았/었다', '-(으)ㄹ게요', '-(으)러 가다'], ans: '-고 있다', exp: "Davomiy zamon: ‘V-고 있다’." }
          ]
        },
        {
          id: '1b-5', num: 13, week: '1B · 13과', emoji: '🚇', title: '서울역까지 어떻게 가요? (Transport)',
          heroKo: '집에서 학교까지 지하철로 30분 걸려요', heroUz: 'Uydan maktabgacha metroda 30 daqiqa ketadi',
          pinkTitle: 'N(으)로 (Vosita/Yo‘nalish) & N에서 N까지', pinkSub: 'Transport turlari va yo‘l tushuntirish',
          pinkGroups: [
            {
              cond: 'Transport + (으)로 | Masofa: A에서 B까지 + 시간 걸리다',
              items: [
                { ko: '시청역에서 2호선으로 갈아타세요.', uz: 'Shichong bekatida 2-liniyaga almashing.' },
                { ko: '걸어서 10분쯤 걸려요.', uz: 'Piyoda 10 daqiqacha ketadi.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: 'A에서 B까지 + 교통수단(으)로 + 시간 걸려요',
          greenRows: [
            { parts: ['집에서 학교까지', '지하철로', '30분 걸려요'], res: '집에서 학교까지 지하철로 30분 걸려요.', uz: 'Uydan maktabgacha metroda 30 daqiqa ketadi.' }
          ],
          words: [
            { ko: '지하철 / 버스 / 택시 / 비행기', uz: 'Metro / Avtobus / Taksi / Samolyot' },
            { ko: '타다 / 내리다 / 갈아타다', uz: 'Minmoq / Tushmoq / Almashtirmoq' },
            { ko: '걸어서 가다 / 길을 건너다', uz: 'Piyoda bormoq / Yo‘ldan o‘tmoq' },
            { ko: '오른쪽 / 왼쪽 / 똑바로', uz: 'O‘ngga / Chapga / To‘g‘riga' }
          ],
          homework: {
            taskUz: "Transportni yozing: 'Metroda maktabga boraman' (지하철로 ...).",
            sampleKo: '지하철로 학교에 가요',
            hint: '지하철로 + 학교에 + 가요'
          },
          quizzes: [
            { q: "‘2-liniyaga almashing’ — to‘g‘ri ibora:", opts: ['2호선으로 갈아타세요', '2호선에서 내리세요', '2호선을 걸어가세요', '2호선에 있어요'], ans: '2호선으로 갈아타세요', exp: "Transport almashtirish: ‘-(으)로 갈아타다’." }
          ]
        },
        {
          id: '1b-6', num: 14, week: '1B · 14과', emoji: '👕', title: '이 옷을 입어 봐도 돼요? (Kiyim do‘koni)',
          heroKo: '이 코트가 더 따뜻하고 잘 어울려요', heroUz: 'Bu palto issiqroq va yaxshi yarashadi',
          pinkTitle: 'V-아/어 보다 & V-아/어도 되다 (Ruxsat)', pinkSub: 'Kiyib ko‘rish (-아/어 보다) va ruxsat so‘rash (-어도 돼요?)',
          pinkGroups: [
            {
              cond: 'Sinab ko‘rish: -아/어 보다 | Ruxsat: -아/어도 되다 (...-sam maylimi?)',
              items: [
                { ko: '이 바지를 한번 입어 봐도 돼요?', uz: 'Bu shimni bir kiyib ko‘rsam maylimi?' },
                { ko: '네, 탈의실은 저쪽에 있어요.', uz: 'Ha, kiyinish xonasi anavi tomonda.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '명사 + 을/를 + V-아/어 봐도 돼요?',
          greenRows: [
            { parts: ['이 옷을', '입어 봐도', '돼요?'], res: '이 옷을 입어 봐도 돼요?', uz: 'Bu kiyimni kiyib ko‘rsam maylimi?' }
          ],
          words: [
            { ko: '옷 / 바지 / 치마 / 코트 / 구두', uz: 'Kiyim / Shim / Yubka / Palto / Tufli' },
            { ko: '입다 / 신다 / 쓰다 / 끼다', uz: 'Kiymoq (kiyim / poyabzal / bosh kiyim / qo‘lqop)' },
            { ko: '크다 / 작다 / 길다 / 짧다', uz: 'Katta / Kichik / Uzun / Kalta' },
            { ko: '어울리다 / 편하다 / 불편하다', uz: 'Yarashmoq / Qulay / Noqulay' }
          ],
          homework: {
            taskUz: "Do‘konda ruxsat so‘rang: 'Bu kiyimni kiyib ko‘rsam maylimi?'.",
            sampleKo: '이 옷을 입어 봐도 돼요?',
            hint: '이 옷을 + 입어 봐도 + 돼요?'
          },
          quizzes: [
            { q: "Poyabzal (운동화, 구두) kiyish uchun qaysi fe’l ishlatiladi?", opts: ['신다', '입다', '쓰다', '하다'], ans: '신다', exp: "Oyoq kiyimlar uchun ‘신다’ ishlatiladi." }
          ]
        },
        {
          id: '1b-7', num: 15, week: '1B · 15과', emoji: '✈️', title: '여행을 가고 싶어요 (Sayohat va Tajriba)',
          heroKo: '제주도에 가 본 적이 있어요', heroUz: 'Jeju oroliga borib ko‘rganman',
          pinkTitle: 'V-(으)ㄴ 적이 있다/없다 & V-(으)ㄹ 수 있다/없다', pinkSub: 'Hayotiy tajriba va imkoniyat (-a olmoq)',
          pinkGroups: [
            {
              cond: 'Tajriba: -(으)ㄴ 적이 있다 | Imkoniyat: -(으)ㄹ 수 있다',
              items: [
                { ko: '저는 김치를 만들어 본 적이 있어요.', uz: 'Men kimchi tayyorlab ko‘rganman.' },
                { ko: '저는 운전할 수 있어요.', uz: 'Men mashina hayday olaman.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '장소 + 에 + 가 본 적이 있어요',
          greenRows: [
            { parts: ['제주도에', '가 본 적이', '있어요'], res: '제주도에 가 본 적이 있어요.', uz: 'Jeju oroliga borib ko‘rganman.' }
          ],
          words: [
            { ko: '여행 / 관광지 / 바다 / 산 / 섬', uz: 'Sayohat / Turistik joy / Dengiz / Tog‘ / Orol' },
            { ko: '사진을 찍다 / 구경하다', uz: 'Rasmga olmoq / Tomosha qilmoq' },
            { ko: '기념품 / 비행기 표 / 호텔', uz: 'Esdalik sovg‘a / Samolyot chiptasi / Mehmonxona' },
            { ko: '기억에 남다 / 즐겁다', uz: 'Xotirada qolmoq / Maroqli' }
          ],
          homework: {
            taskUz: "Tajribangizni yozing: 'Koreyaga borib ko‘rganman' (한국에 ...).",
            sampleKo: '한국에 가 본 적이 있어요',
            hint: '한국에 + 가 본 적이 + 있어요'
          },
          quizzes: [
            { q: "‘Mashina hayday olaman’ — imkoniyat qo‘shimchasi:", opts: ['운전할 수 있어요', '운전한 적이 있어요', '운전하면 안 돼요', '운전하고 있어요'], ans: '운전할 수 있어요', exp: "Imkoniyat: ‘V-(으)ㄹ 수 있다’." }
          ]
        },
        {
          id: '1b-8', num: 16, week: '1B · 16과', emoji: '🎉', title: '우리 집에 놀러 오세요 (Taklif va Uy)',
          heroKo: '집들이 선물로 휴지하고 세제를 샀어요', heroUz: 'Uy to‘yi sovg‘asi sifatida salfetka va kir yuvish kukuni sotib oldim',
          pinkTitle: 'V-(으)려고 하다 & V-아야/어야 되다', pinkSub: 'Reja va niyat (-moqchi) hamda majburiyat (-ish kerak)',
          pinkGroups: [
            {
              cond: 'Niyat: -(으)려고 해요 | Majburiyat: -아야/어야 돼요',
              items: [
                { ko: '주말에 친구들을 집에 초대하려고 해요.', uz: 'Dam olish kuni do‘stlarimni uyga taklif qilmoqchiman.' },
                { ko: '손님이 오기 전에 청소를 해야 돼요.', uz: 'Mehmon kelishidan oldin tozalash kerak.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '명사 + 을/를 + V-(으)려고 해요',
          greenRows: [
            { parts: ['불고기를', '만들려고', '해요'], res: '불고기를 만들려고 해요.', uz: 'Bulgogi tayyorlamoqchiman.' }
          ],
          words: [
            { ko: '초대하다 / 방문하다 / 집들이', uz: 'Taklif qilmoq / Tashrif buyurmoq / Uy to‘yi' },
            { ko: '청소하다 / 준비하다 / 선물', uz: 'Tozalamoq / Tayyorlamoq / Sovg‘a' },
            { ko: '거실 / 부엌 / 방 / 화장실', uz: 'Mehmonxona / Oshxona / Xona / Hojatxona' },
            { ko: '감사합니다 / 잘 먹겠습니다', uz: 'Rahmat / Yoqimli ishtaha (ovqatdan oldin)' }
          ],
          homework: {
            taskUz: "Majburiyat gap yozing: 'Uy vazifasini qilishim kerak' (숙제를 ...).",
            sampleKo: '숙제를 해야 돼요',
            hint: '숙제를 + 해야 + 돼요'
          },
          quizzes: [
            { q: "‘Ovqat tayyorlamoqchiman’ — reja/niyat shakli:", opts: ['요리하려고 해요', '요리한 적이 있어요', '요리하면 안 돼요', '요리했어요'], ans: '요리하려고 해요', exp: "Reja/niyat: ‘V-(으)려고 하다’." }
          ]
        }
      ]
    },
    {
      code: '2A',
      label: '서울대 한국어 2A',
      range: 'TOPIK 2 · O‘rta-boshlang‘ich 1 (To‘liq)',
      lessons: [
        {
          id: '2a-1', num: 1, week: '2A · 1과', emoji: '🤝', title: '새 학기가 시작되었어요 (Fe’l-atvor)',
          heroKo: '성격이 활발하고 친절해서 인기가 많아요', heroUz: 'Xarakteri quvnoq va mehribon bo‘lgani uchun mashhur',
          pinkTitle: 'A-(으)ㄴ 편이다 & N처럼', pinkSub: 'Moyillikni bildirish (-ga moyil / -roq) va o‘xshatish (-dek)',
          pinkGroups: [
            {
              cond: 'Sifat + -(으)ㄴ 편이에요 | Ot + 처럼',
              items: [
                { ko: '저는 키가 큰 편이에요.', uz: 'Men bo‘yim balandroq.' },
                { ko: '가수처럼 노래를 아주 잘 불러요.', uz: 'Qo‘shiqchidek qo‘shiqni juda yaxshi aytadi.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '주어 + 는 + 형용사-(으)ㄴ 편이에요',
          greenRows: [
            { parts: ['한국어가', '재미있는', '편이에요'], res: '한국어가 재미있는 편이에요.', uz: 'Koreys tili qiziqarliroq.' }
          ],
          words: [
            { ko: '성격 / 활발하다 / 조용하다', uz: 'Xarakter / Quvnoq / Sokin' },
            { ko: '친절하다 / 부지런하다 / 게으르다', uz: 'Mehribon / Mehnatkash / Dangasa' },
            { ko: '인기가 많다 / 사귀다', uz: 'Mashhur bo‘lmoq / Do‘stlashmoq' }
          ],
          homework: {
            taskUz: "O‘zingizni tasvirlang: 'Men mehnatkashroqman' (저는 부지런한 ...).",
            sampleKo: '저는 부지런한 편이에요',
            hint: '저는 + 부지런한 + 편이에요'
          },
          quizzes: [
            { q: "‘Qo‘shiqchidek kuylaydi’ — o‘xshatish qo‘shimchasi:", opts: ['가수처럼', '가수 덕분에', '가수 탓에', '가수밖에'], ans: '가수처럼', exp: "Otga o‘xshatish uchun ‘-처럼’ qo‘shiladi." }
          ]
        },
        {
          id: '2a-2', num: 2, week: '2A · 2과', emoji: '🏠', title: '깨끗한 방을 구하고 있어요 (Uy-joy)',
          heroKo: '학교에서 가깝고 교통이 편리한 집을 찾고 있어요', heroUz: 'Maktabga yaqin va transporti qulay uy qidiryapman',
          pinkTitle: 'A-(으)ㄴ N & V-는 N (Sifatdoshlar)', pinkSub: 'Otni sifat yoki harakat fe’li bilan ta’riflash',
          pinkGroups: [
            {
              cond: 'Sifat: -(으)ㄴ N (큰 방) | Fe’l (Hozirgi): -는 N (사는 집)',
              items: [
                { ko: '창문이 커서 햇빛이 잘 들어오는 방이에요.', uz: 'Derazasi katta bo‘lgani uchun quyosh nuri yaxshi tushadigan xona.' },
                { ko: '제가 지금 사는 하숙집은 아주 깨끗해요.', uz: 'Men hozir yashayotgan yotoqxona juda toza.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '형용사-(으)ㄴ + 명사 + 을/를 구하고 있어요',
          greenRows: [
            { parts: ['조용한', '방을', '구하고 있어요'], res: '조용한 방을 구하고 있어요.', uz: 'Tinch xona qidiryapman.' }
          ],
          words: [
            { ko: '하숙집 / 원룸 / 기숙사 / 아파트', uz: 'Pansionat / Bir xonali uy / Yotoqxona / Kvartira' },
            { ko: '보증금 / 월세 / 관리비', uz: 'Kafolat puli / Oylik ijara / Kommunal to‘lov' },
            { ko: '편리하다 / 햇빛이 잘 들다', uz: 'Qulay / Quyosh nuri yaxshi tushmoq' }
          ],
          homework: {
            taskUz: "Uy qidirish gapini yozing: 'Toza xona qidiryapman'.",
            sampleKo: '깨끗한 방을 구하고 있어요',
            hint: '깨끗한 + 방을 + 구하고 있어요'
          },
          quizzes: [
            { q: "‘Men yashayotgan uy’ (fe’lning hozirgi zamon sifatdoshi):", opts: ['제가 사는 집', '제가 산 집', '제가 살 집', '제가 살던 집'], ans: '제가 사는 집', exp: "Fe’l + ‘-는’ + Ot hozirgi zamonni bildiradi." }
          ]
        },
        {
          id: '2a-3', num: 3, week: '2A · 3과', emoji: '📦', title: '우체국에서 소포를 보냈어요 (Xizmatlar)',
          heroKo: '고향에 선물을 보내려고 우체국에 갔어요', heroUz: 'Vatanimga sovg‘a yuborish uchun pochtaga bordim',
          pinkTitle: 'V-(으)려고 & V-아/어 주다', pinkSub: 'Maqsad (-ish uchun) va biror kishi uchun bajarilgan ish',
          pinkGroups: [
            {
              cond: 'Maqsad: -(으)려고 | Birov uchun: -아/어 주다 (yordam bermoq: 도와주다)',
              items: [
                { ko: '한국 돈을 환전하려고 은행에 갔어요.', uz: 'Koreya pulini almashtirish uchun bankka bordim.' },
                { ko: '친구에게 한국어 숙제를 도와줬어요.', uz: 'Do‘stimga koreys tili uy vazifasida yordam berdim.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '목적(V-(으)려고) + 장소에 갔어요',
          greenRows: [
            { parts: ['소포를 보내려고', '우체국에', '갔어요'], res: '소포를 보내려고 우체국에 갔어요.', uz: 'Posilka yuborish uchun pochtaga bordim.' }
          ],
          words: [
            { ko: '우체국 / 소포 / 편지 / 우표 / 주소', uz: 'Pochta / Posilka / Xat / Marka / Manzil' },
            { ko: '환전하다 / 계좌를 만들다 / 송금하다', uz: 'Pul almashtirmoq / Hisob ochmoq / Pul o‘tkazmoq' },
            { ko: '항공편 / 배편 / 무게를 재다', uz: 'Havo pochtasi / Dengiz pochtasi / Og‘irligini o‘lchamoq' }
          ],
          homework: {
            taskUz: "Maqsad gap yozing: 'Pul almashtirish uchun bankka bordim'.",
            sampleKo: '환전하려고 은행에 갔어요',
            hint: '환전하려고 + 은행에 + 갔어요'
          },
          quizzes: [
            { q: "‘Posilka yuborish uchun’ — maqsad qo‘shimchasi:", opts: ['소포를 보내려고', '소포를 보내지만', '소포를 보낸 후에', '소포를 보내거든요'], ans: '소포를 보내려고', exp: "Maqsad: ‘V-(으)려고’." }
          ]
        }
      ]
    },
    {
      code: '2B',
      label: '서울대 한국어 2B',
      range: 'TOPIK 2–3 · O‘rta-boshlang‘ich 2 (To‘liq)',
      lessons: [
        {
          id: '2b-1', num: 1, week: '2B · 1과', emoji: '🎯', title: '취직 준비를 하고 있어요 (Karyera)',
          heroKo: '졸업한 후에 한국 회사에 취직하려고 해요', heroUz: 'Bitirganimdan keyin Koreya kompaniyasiga ishga kirmoqchiman',
          pinkTitle: 'V-(으)ㄴ 후에 & V-기 전에', pinkSub: 'Biror ishdan keyin (후에) va oldin (전에)',
          pinkGroups: [
            {
              cond: 'Keyin: -(으)ㄴ 후에 | Oldin: -기 전에',
              items: [
                { ko: '밥을 먹기 전에 손을 씻으세요.', uz: 'Ovqatlanishdan oldin qo‘lingizni yuving.' },
                { ko: '수업이 끝난 후에 도서관에서 복습해요.', uz: 'Dars tugagandan keyin kutubxonada takrorlayman.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: 'V1-(으)ㄴ 후에 + V2',
          greenRows: [
            { parts: ['수업이 끝난 후에', '도서관에', '가요'], res: '수업이 끝난 후에 도서관에 가요.', uz: 'Dars tugagandan keyin kutubxonaga boraman.' }
          ],
          words: [
            { ko: '졸업하다 / 취직하다 / 면접을 보다', uz: 'Bitirmoq / Ishga kirmoq / Suhbatdan o‘tmoq' },
            { ko: '이력서 / 자기소개서 / 자격증', uz: 'Rezyume / Tarjimai hol / Sertifikat' },
            { ko: '전공 / 경험 / 합격하다', uz: 'Mutaxassislik / Tajriba / Imtihondan o‘tmoq' }
          ],
          homework: {
            taskUz: "Oldin/Keyin gap yozing: 'Ovqatlanishdan oldin qo‘l yuving'.",
            sampleKo: '밥을 먹기 전에 손을 씻으세요',
            hint: '밥을 먹기 전에 + 손을 씻으세요'
          },
          quizzes: [
            { q: "‘Uxlashdan oldin’ — to‘g‘ri qo‘shimcha:", opts: ['자기 전에', '잔 후에', '자려고', '자니까'], ans: '자기 전에', exp: "‘-기 전에’ — ...-dan oldin." }
          ]
        },
        {
          id: '2b-2', num: 2, week: '2B · 2과', emoji: '🧥', title: '날씨가 추우니까 따뜻하게 입으세요',
          heroKo: '길이 미끄러우니까 조심해서 가세요', heroUz: 'Yo‘l sirpanchiq bo‘lgani uchun ehtiyot bo‘lib boring',
          pinkTitle: 'A/V-(으)니까 & A-게 (Ravish yasovchi)', pinkSub: 'Buyruq/taklif oldidan sabab va sifatdan ravish yasash',
          pinkGroups: [
            {
              cond: 'Sabab + (으)니까 → Buyruq (-세요) | Sifat + -게 (따뜻하게, 맛있게)',
              items: [
                { ko: '비가 오니까 우산을 가지고 가세요.', uz: 'Yomg‘ir yog‘ayotgani uchun soyabon olib keting.' },
                { ko: '음식을 아주 맛있게 먹었어요.', uz: 'Ovqatni juda mazali qilib yedim.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '이유 + -(으)니까 + 명령문(-세요)',
          greenRows: [
            { parts: ['비가 오니까', '우산을', '가지고 가세요'], res: '비가 오니까 우산을 가지고 가세요.', uz: 'Yomg‘ir yog‘ayotgani uchun soyabon olib keting.' }
          ],
          words: [
            { ko: '미끄럽다 / 조심하다 / 따뜻하게', uz: 'Sirpanchiq / Ehtiyot bo‘lmoq / Iliq qilib' },
            { ko: '일기 예보 / 우산 / 장갑 / 목도리', uz: 'Ob-havo ma’lumoti / Soyabon / Qo‘lqop / Sharf' }
          ],
          homework: {
            taskUz: "Sabab va buyruq gap yozing: 'Yomg‘ir yog‘ayotgani uchun soyabon olib keting'.",
            sampleKo: '비가 오니까 우산을 가지고 가세요',
            hint: '비가 오니까 + 우산을 + 가지고 가세요'
          },
          quizzes: [
            { q: "Buyruq gap (-세요) oldidan qaysi sabab qo‘shimchasi ishlatiladi?", opts: ['-(으)니까', '-아서/어서', '-지만', '-거나'], ans: '-(으)니까', exp: "Buyruq va taklif gaplarda ‘-(으)니까’ ishlatiladi." }
          ]
        },
        {
          id: '2b-3', num: 3, week: '2B · 3과', emoji: '📈', title: '한국어 실력이 많이 좋아졌어요',
          heroKo: '매일 연습해서 한국어가 쉬워졌어요', heroUz: 'Har kuni mashq qilganim uchun koreys tili osonlashdi',
          pinkTitle: 'A-아/어지다 (Holat o‘zgarishi) & V-게 되다', pinkSub: 'Vaqt o‘tishi bilan o‘zgarish (-lashmoq / -adigan bo‘lmoq)',
          pinkGroups: [
            {
              cond: 'Sifat: -아/어지다 (좋아지다) | Fe’l: -게 되다 (먹게 되다)',
              items: [
                { ko: '한국에 온 후에 매운 음식을 잘 먹게 되었어요.', uz: 'Koreyaga kelganimdan keyin achchiq ovqatni yaxshi yeydigan bo‘ldim.' },
                { ko: '어제보다 날씨가 훨씬 따뜻해졌어요.', uz: 'Kechagidan ko‘ra havo ancha ilidi.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '명사 + 이/가 + 형용사-아/어졌어요',
          greenRows: [
            { parts: ['한국어 실력이', '많이', '좋아졌어요'], res: '한국어 실력이 많이 좋아졌어요.', uz: 'Koreys tili darajam ancha yaxshilandi.' }
          ],
          words: [
            { ko: '실력 / 습관 / 생활 / 적응하다', uz: 'Mahorat / Odat / Hayot / Moslashmoq' },
            { ko: '훨씬 / 점점 / 예전보다', uz: 'Ancha / Asta-sekin / Oldingidan ko‘ra' }
          ],
          homework: {
            taskUz: "O‘zgarish gapini yozing: 'Koreys tili darajam yaxshilandi'.",
            sampleKo: '한국어 실력이 좋아졌어요',
            hint: '한국어 실력이 + 좋아졌어요'
          },
          quizzes: [
            { q: "‘Havo ilidi’ — holat o‘zgarishi shakli:", opts: ['날씨가 따뜻해졌어요', '날씨가 따뜻했어요', '날씨가 따뜻할 거예요', '날씨가 따뜻하지만'], ans: '날씨가 따뜻해졌어요', exp: "Holat o‘zgarishi: ‘A-아/어지다’." }
          ]
        }
      ]
    },
    {
      code: '3A-3B',
      label: '서울대 한국어 3A & 3B',
      range: 'TOPIK 3–4 · O‘rta Bosqich (To‘liq)',
      lessons: [
        {
          id: '3a-1', num: 1, week: '3A · 1과', emoji: '🗣️', title: '친구가 내일 온다고 했어요 (Bilvosita nutq)',
          heroKo: '일기 예보에서 내일 비가 온다고 했어요', heroUz: 'Ob-havo ma’lumotida ertaga yomg‘ir yog‘adi deb aytdi',
          pinkTitle: 'A/V-다고 하다 · -(으)라고 하다 · -자고 하다', pinkSub: 'Darak, buyruq va taklif gaplarni yetkazish',
          pinkGroups: [
            {
              cond: 'Darak: -ㄴ/는다고 하다 | Buyruq: -(으)라고 하다 | Taklif: -자고 하다',
              items: [
                { ko: '선생님께서 숙제를 꼭 하라고 하셨어요.', uz: 'O‘qituvchi uy vazifasini albatta qiling deb aytdilar.' },
                { ko: '친구가 주말에 같이 등산하자고 했어요.', uz: 'Do‘stim dam olish kuni birga toqqa chiqaylik deb aytdi.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: 'Ega + 이/가 + V-ㄴ/는다고 했어요',
          greenRows: [
            { parts: ['친구가', '내일 온다고', '했어요'], res: '친구가 내일 온다고 했어요.', uz: 'Do‘stim ertaga kelaman deb aytdi.' }
          ],
          words: [
            { ko: '전하다 / 소식 / 일기 예보 / 약속', uz: 'Yetkazmoq / Xabar / Ob-havo ma’lumoti / Va’da' }
          ],
          homework: {
            taskUz: "Bilvosita nutq yozing: 'Do‘stim ertaga kelaman deb aytdi'.",
            sampleKo: '친구가 내일 온다고 했어요',
            hint: '친구가 + 내일 온다고 + 했어요'
          },
          quizzes: [
            { q: "‘Birga ovqatlanaylik deb aytdi’ (taklif bilvosita nutqi):", opts: ['같이 밥을 먹자고 했어요', '같이 밥을 먹는다고 했어요', '같이 밥을 먹으라고 했어요', '같이 밥을 먹냐고 했어요'], ans: '같이 밥을 먹자고 했어요', exp: "Taklif gap: ‘-자고 하다’." }
          ]
        },
        {
          id: '3a-2', num: 2, week: '3A · 2과', emoji: '🤔', title: '밖에 비가 올 것 같아요 (Taxmin)',
          heroKo: '하늘이 흐린 걸 보니까 비가 올 것 같아요', heroUz: 'Osmon bulutligiga qaraganda yomg‘ir yog‘adiganga o‘xshaydi',
          pinkTitle: 'A/V-(으)ㄴ/는/(으)ㄹ 것 같다', pinkSub: 'O‘z fikri va taxminini yumshoq ifodalash',
          pinkGroups: [
            {
              cond: 'O‘tgan: -(으)ㄴ 것 같다 | Hozirgi: -는 것 같다 | Kelajak: -(으)ㄹ 것 같다',
              items: [
                { ko: '지금은 길이 많이 막히는 것 같아요.', uz: 'Hozir yo‘l ancha tirbandga o‘xshaydi.' },
                { ko: '내일은 오늘보다 더 추울 것 같아요.', uz: 'Ertaga bugungidan sovuqroq bo‘ladiganga o‘xshaydi.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '문장 + -(으)ㄹ 것 같아요',
          greenRows: [
            { parts: ['비가', '올 것', '같아요'], res: '비가 올 것 같아요.', uz: 'Yomg‘ir yog‘adiganga o‘xshaydi.' }
          ],
          words: [
            { ko: '흐리다 / 아마 / 분위기 / 어울리다', uz: 'Bulutli / Ehtimol / Muhit / Mos kelmoq' }
          ],
          homework: {
            taskUz: "Taxmin gap yozing: 'Ertaga yomg‘ir yog‘adiganga o‘xshaydi'.",
            sampleKo: '내일 비가 올 것 같아요',
            hint: '내일 + 비가 올 것 + 같아요'
          },
          quizzes: [
            { q: "‘Hozir yo‘l tirbandga o‘xshaydi’ (hozirgi zamon taxmini):", opts: ['길이 막히는 것 같아요', '길이 막힌 것 같아요', '길이 막힐 것 같아요', '길이 막혔거든요'], ans: '길이 막히는 것 같아요', exp: "Hozirgi zamon taxmini: ‘-는 것 같다’." }
          ]
        },
        {
          id: '3b-1', num: 3, week: '3B · 1과', emoji: '😱', title: '비행기를 놓칠 뻔했어요 (Sal qolish)',
          heroKo: '늦잠을 자서 중요한 면접에 늦을 뻔했어요', heroUz: 'Uxlab qolib muhim suhbatga kech qolishimga sal qoldi',
          pinkTitle: 'V-(으)ㄹ 뻔하다 & V-기로 하다', pinkSub: 'Salbiy hodisaga bir bahya qolish va qat’iy qaror',
          pinkGroups: [
            {
              cond: 'Sal qolish: -(으)ㄹ 뻔했어요 | Qaror: -기로 했어요',
              items: [
                { ko: '길이 미끄러워서 넘어질 뻔했어요.', uz: 'Yo‘l sirpanchiq bo‘lgani uchun yiqilib tushishimga sal qoldi.' },
                { ko: '매일 아침 운동하기로 했어요.', uz: 'Har kuni ertalab sport bilan shug‘ullanishga qaror qildim.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '원인 + V-(으)ㄹ 뻔했어요',
          greenRows: [
            { parts: ['늦잠을 자서', '지각할', '뻔했어요'], res: '늦잠을 자서 지각할 뻔했어요.', uz: 'Uxlab qolib kech qolishimga sal qoldi.' }
          ],
          words: [
            { ko: '놓치다 / 넘어지다 / 지각하다 / 결심하다', uz: 'O‘tkazib yubormoq / Yiqilmoq / Kech qolmoq / Qaror qilmoq' }
          ],
          homework: {
            taskUz: "Sal qolish gapini yozing: 'Yiqilib tushishimga sal qoldi'.",
            sampleKo: '넘어질 뻔했어요',
            hint: '넘어질 + 뻔했어요'
          },
          quizzes: [
            { q: "‘Yiqilishimga sal qoldi’ — to‘g‘ri grammatika:", opts: ['넘어질 뻔했어요', '넘어지기로 했어요', '넘어진 적이 있어요', '넘어질 수 있어요'], ans: '넘어질 뻔했어요', exp: "Sal qolish holati: ‘-(으)ㄹ 뻔하다’." }
          ]
        }
      ]
    },
    {
      code: '4A-4B',
      label: '서울대 한국어 4A & 4B',
      range: 'TOPIK 4–5 · Yuqori-o‘rta (To‘liq)',
      lessons: [
        {
          id: '4a-1', num: 1, week: '4A · 1과', emoji: '⚖️', title: '편리한 반면에 물가가 비싸요',
          heroKo: '도시 생활은 편리한 반면에 스트레스가 많아요', heroUz: 'Shahar hayoti qulay bo‘lgani holda, stress ko‘p',
          pinkTitle: 'V-는 반면에 & N뿐만 아니라', pinkSub: 'Qiyosiy tahlil va qo‘shimcha ma’lumot',
          pinkGroups: [
            {
              cond: 'Qiyoslash: -는 반면에 | Nafaqat ... balki: -뿐만 아니라',
              items: [
                { ko: '그는 한국어뿐만 아니라 영어도 유창하게 구사해요.', uz: 'U nafaqat koreys, balki ingliz tilida ham ravon gapiradi.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '장점 + -는 반면에 + 단점',
          greenRows: [
            { parts: ['편리한 반면에', '물가가', '비싸요'], res: '편리한 반면에 물가가 비싸요.', uz: 'Qulay bo‘lgani holda narxlar qimmat.' }
          ],
          words: [
            { ko: '물가 / 장단점 / 구사하다 / 직접', uz: 'Narx-navo / Yutuq-kamchilik / Ravon gapirmoq / Bevosita' }
          ],
          homework: {
            taskUz: "Qiyosiy gap yozing: 'Qulay bo‘lgani holda narxlar qimmat'.",
            sampleKo: '편리한 반면에 물가가 비싸요',
            hint: '편리한 반면에 + 물가가 비싸요'
          },
          quizzes: [
            { q: "‘Nafaqat koreys, balki ingliz tilini ham biladi’:", opts: ['한국어뿐만 아니라 영어도', '한국어 덕분에 영어도', '한국어 탓에 영어도', '한국어 대신에 영어도'], ans: '한국어뿐만 아니라 영어도', exp: "‘N뿐만 아니라’ — nafaqat ..., balki ... ham." }
          ]
        },
        {
          id: '4b-1', num: 2, week: '4B · 1과', emoji: '🏆', title: '선생님 덕분에 장학금을 받았어요',
          heroKo: '열심히 도와준 친구들 덕분에 성공할 수 있었어요', heroUz: 'Astoydil yordam bergan do‘stlarim sharofati bilan muvaffaqiyatga erishdim',
          pinkTitle: 'N 덕분에 vs V-는 바람에', pinkSub: 'Ijobiy sabab (덕분에) va kutilmagan salbiy sabab (-는 바람에)',
          pinkGroups: [
            {
              cond: 'Ijobiy natija → 덕분에 | Salbiy natija → -는 바람에',
              items: [
                { ko: '갑자기 비가 쏟아지는 바람에 옷이 다 젖었어요.', uz: 'To‘satdan jala quygani sababli kiyimlarim hammasi ho‘l bo‘ldi.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '긍정 원인 + 덕분에',
          greenRows: [
            { parts: ['선생님 덕분에', '장학금을', '받았어요'], res: '선생님 덕분에 장학금을 받았어요.', uz: 'Ustozim sharofati bilan stipendiya oldim.' }
          ],
          words: [
            { ko: '장학금 / 응원 / 이겨내다 / 쏟아지다', uz: 'Stipendiya / Qo‘llab-quvvatlash / Yengib o‘tmoq / Jala quymoq' }
          ],
          homework: {
            taskUz: "Ijobiy sabab yozing: 'Ustozim sharofati bilan stipendiya oldim'.",
            sampleKo: '선생님 덕분에 장학금을 받았어요',
            hint: '선생님 덕분에 + 장학금을 받았어요'
          },
          quizzes: [
            { q: "Kutilmagan salbiy sababni ifodalovchi qo‘shimcha:", opts: ['-는 바람에', '덕분에', '뿐만 아니라', '기로 하다'], ans: '-는 바람에', exp: "Salbiy kutilmagan sabab: ‘-는 바람에’." }
          ]
        }
      ]
    },
    {
      code: '5A-6B',
      label: '서울대 한국어 5A ~ 6B',
      range: 'TOPIK 5–6 · Oliy Akademik (To‘liq)',
      lessons: [
        {
          id: '5a-1', num: 1, week: '5A · 1과', emoji: '📊', title: '이 정도면 성공한 셈이에요',
          heroKo: '수출이 증가한 데 반해 내수 시장은 위축되었다', heroUz: 'Eksport oshgan bir paytda ichki bozor qisqardi',
          pinkTitle: 'A/V-(으)ㄴ/는 셈이다 & V-는 데 반해', pinkSub: 'TOPIK 5 rasmiy xulosa va keskin qiyoslash',
          pinkGroups: [
            {
              cond: 'Xulosa: -(으)ㄴ/는 셈이다 | Keskin qarama-qarshilik: -는 데 반해',
              items: [
                { ko: '1년 만에 TOPIK 5급을 땄으니 대단한 셈이다.', uz: '1 yil ichida TOPIK 5-darajani olgani uchun katta yutuq hisoblanadi.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '결과 + -(으)ㄴ/는 셈이다',
          greenRows: [
            { parts: ['이 정도면', '성공한', '셈이에요'], res: '이 정도면 성공한 셈이에요.', uz: 'Bu daraja bo‘lsa muvaffaqiyatga erishilgan hisoblanadi.' }
          ],
          words: [
            { ko: '수출 / 수입 / 급성장하다 / 위축되다', uz: 'Eksport / Import / Tez o‘smoq / Qisqarmoq' }
          ],
          homework: {
            taskUz: "TOPIK 5 xulosasi: 'Deyarli tugatgan hisoblanamiz'.",
            sampleKo: '다 끝낸 셈이에요',
            hint: '다 끝낸 + 셈이에요'
          },
          quizzes: [
            { q: "‘Deyarli tugatgan hisoblanamiz’ — TOPIK 5 shakli:", opts: ['다 끝낸 셈이에요', '다 끝낼 뻔했어요', '다 끝내거든요', '다 끝내러 가요'], ans: '다 끝낸 셈이에요', exp: "Umumiy xulosa: ‘-(으)ㄴ/는 셈이다’." }
          ]
        },
        {
          id: '6a-1', num: 2, week: '6A · 1과', emoji: '🎓', title: '남녀노소를 막론하고 참여할 수 있다',
          heroKo: '본 연구는 AI 교육의 효율성을 규명한 바이다', heroUz: 'Ushbu tadqiqot AI ta’limi samaradorligini isbotlab berdi',
          pinkTitle: 'N을/를 막론하고 & V-는 바이다 & V-다시피 하다', pinkSub: 'TOPIK 6 oliy rasmiy uslub va ilmiy maqolalar tili',
          pinkGroups: [
            {
              cond: 'Qat’i nazar: -을/를 막론하고 | Deyarli ... qilmoq: -다시피 하다',
              items: [
                { ko: '시험 기간에는 하루 종일 도서관에서 살다시피 했어요.', uz: 'Imtihon paytida kun bo‘yi kutubxonada yashagandek bo‘ldim.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '명사 + 을/를 막론하고',
          greenRows: [
            { parts: ['남녀노소를', '막론하고', '참여할 수 있다'], res: '남녀노소를 막론하고 참여할 수 있다.', uz: 'Yoshu qaridan qat’i nazar hamma qatnasha oladi.' }
          ],
          words: [
            { ko: '막론하다 / 규명하다 / 인재 / 전환되다', uz: 'Qat’i nazar / Isbotlamoq / Iqtidorli kadr / O‘zgarmoq' }
          ],
          homework: {
            taskUz: "TOPIK 6 iborasi: 'Kutubxonada yashagandek bo‘ldim'.",
            sampleKo: '도서관에서 살다시피 했어요',
            hint: '도서관에서 + 살다시피 + 했어요'
          },
          quizzes: [
            { q: "‘Yoshu qaridan qat’i nazar’ — TOPIK 6 iborasi:", opts: ['남녀노소를 막론하고', '남녀노소 덕분에', '남녀노소 탓에', '남녀노소지만'], ans: '남녀노소를 막론하고', exp: "‘N을/를 막론하고’ — ...-dan qat’i nazar." }
          ]
        }
      ]
    }
  ];

  const currentBook = snuBooks.find(b => b.code === selectedBookCode) || snuBooks[0];
  const allLessons = snuBooks.flatMap(b => b.lessons);
  const allWords = allLessons.flatMap(l => l.words);
  const allQuizzesPool = allLessons.flatMap(l => l.quizzes);
  const nextLesson = allLessons.find(l => !completedIds.includes(l.id)) || allLessons[0];

  // --- 3. REAL HAYOTIY DIALOG SIMULYATORI (ROLEPLAY) ---
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
    },
    {
      id: 'interview',
      emoji: '💼',
      title: 'Kompaniyada Suhbat',
      level: '3A–4B',
      steps: [
        {
          npcKo: '자기소개를 간단하게 해 주시겠어요?',
          npcUz: 'O‘zingizni qisqacha tanishtirib bera olasizmi?',
          opts: [
            { ko: '안녕하세요! 저는 한국어와 IT에 관심이 많은 토히르벡입니다.', uz: 'Assalomu alaykum! Men koreys tili va IT ga qiziqishi katta Tokhirbekman.', ok: true },
            { ko: '가방에 지갑이 없어요.', uz: 'Sumkada hamyon yo‘q.', ok: false }
          ]
        },
        {
          npcKo: '우리 회사에 지원한 이유가 무엇입니까?',
          npcUz: 'Kompaniyamizga hujjat topshirishingiz sababi nima?',
          opts: [
            { ko: '귀사의 혁신적인 기술력 덕분에 많이 배울 수 있을 것 같아서 지원했습니다.', uz: 'Kompaniyangizning innovatsion texnologiyalari sharofati bilan ko‘p narsa o‘rgana olaman deb o‘ylab topshirdim.', ok: true },
            { ko: '비가 오니까 우산을 가지고 가세요.', uz: 'Yomg‘ir yog‘ayotgani uchun soyabon olib keting.', ok: false }
          ]
        }
      ]
    }
  ];
  const [activeDialog, setActiveDialog] = useState(roleplayScenarios[0]);
  const [dialogStep, setDialogStep] = useState(0);
  const [dialogFeedback, setDialogFeedback] = useState(null);

  // --- 4. 쓰기 • YOZISH VA IMLO TRENAJYORI ---
  const writingPrompts = [
    { uz: 'Talaba', ko: '학생', hint: 'ㅎ + ㅏ + ㄱ + ㅅ + ㅐ + ㅇ' },
    { uz: 'Kutubxona', ko: '도서관', hint: 'ㄷ + ㅗ + ㅅ + ㅓ + ㄱ + ㅘ + ㄴ' },
    { uz: 'Rahmat', ko: '감사합니다', hint: 'ㄱ + ㅏ + ㅁ + ㅅ + ㅏ + ㅎ + ㅏ + ㅂ + ㄴ + ㅣ + ㄷ + ㅏ' },
    { uz: 'Stipendiya', ko: '장학금', hint: 'ㅈ + ㅏ + ㅇ + ㅎ + ㅏ + ㄱ + ㄱ + ㅡ + ㅁ' },
    { uz: 'Men talabaman', ko: '저는 학생이에요', hint: '저는 + 학생 + 이에요' },
    { uz: 'Koreys tili', ko: '한국어', hint: 'ㅎ + ㅏ + ㄴ + ㄱ + ㅜ + ㄱ + ㅇ + ㅓ' }
  ];
  const [writeIdx, setWriteIdx] = useState(0);
  const [writeInput, setWriteInput] = useState('');
  const [writeResult, setWriteResult] = useState(null);

  // --- AQLLI AI USTOZ: 토히르벡 ---
  const [aiMessages, setAiMessages] = useState([
    {
      role: 'ai',
      ko: '안녕하세요! 저는 ZiyoPrep AI 튜터 토히르벡이에요. 무엇이든 물어보세요!',
      uz: 'Assalomu alaykum! Men ZiyoPrep AI ustoz 토히르벡 (Tokhirbek) man. Menga istalgan savol bering, so‘z tarjimasini so‘rang yoki koreyscha suhbatlashing!'
    }
  ]);
  const [aiInput, setAiInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages]);

  const generateSmartAiReply = (rawText) => {
    const q = rawText.toLowerCase().trim();

    if (/^(salom|assalom|hello|hi|안녕|반가워|하이)/.test(q)) {
      return {
        ko: `안녕하세요, ${profile.name} 씨! 오늘도 ZiyoPrep과 함께 화이팅해요!`,
        uz: `Va alaykum assalom, ${profile.name}! Bugun kayfiyatlar qanday? Qaysi mavzuda suhbatlashamiz: Kafe, Universitet yoki TOPIK grammatikasi?`
      };
    }

    if (q.includes('kimman') || q.includes('men haqimda') || q.includes('프로필') || q.includes('내 이름')) {
      return {
        ko: `당신은 열심히 공부하는 ${profile.name} 학생이에요! 현재 ${profile.xp} XP를 모았어요.`,
        uz: `Siz — tinimsiz izlanayotgan talaba ${profile.name}siz! Hozirgacha ${profile.xp} XP to‘pladingiz, ${profile.streak} kunlik streak va ${completedIds.length} ta darsni tugatdingiz. Barakalla!`
      };
    }

    if (q.includes('isming') || q.includes('kimsan') || q.includes('토히르벡') || q.includes('누구')) {
      return {
        ko: '제 이름은 토히르벡이에요! ZiyoPrep에서 한국어를 가르치는 AI 선생님입니다.',
        uz: 'Mening ismim 토히르벡 (Tokhirbek)! Sizga Hangul alifbosidan tortib 서울대 한국어 1A–6B va TOPIK 6 gacha koreys tilini o‘rgatuvchi shaxsiy AI ustozingizman.'
      };
    }

    if (q.includes('예요') || q.includes('이에요')) {
      return {
        ko: '받침이 있으면 "이에요" (학생이에요), 없으면 "예요" (가수예요)를 사용해요!',
        uz: "Qoida juda oson: So‘z oxiri undosh (받침) bilan tugasa '이에요' (학생이에요), unli bilan tugasa '예요' (가수예요) qo‘shiladi."
      };
    }
    if (q.includes('아서') || q.includes('니까') || q.includes('sabab')) {
      return {
        ko: '명령문(세요)이나 청유문(읍시다) 앞에는 반드시 "-(으)니까"를 써야 해요!',
        uz: "Farqi: Oddiy sababda '-아서/어서' (배가 아파서 병원에 갔어요), buyruq va taklif gaplarda esa '-(으)니까' (추우니까 옷을 입으세요) ishlatiladi!"
      };
    }
    if (q.includes('kafe') || q.includes('카페') || q.includes('kofe') || q.includes('커피')) {
      return {
        ko: '카페에서: "아이스 아메리카노 한 잔 주세요. 여기서 마실 거예요."',
        uz: "Kafeda: 'Bitta muzli amerikano bering. Shu yerda ichaman.' Pastdagi Mashq -> Dialog bo‘limida kafeda jonli buyurtma berishni mashq qilishingiz mumkin!"
      };
    }

    const foundWord = allWords.find(
      w => q.includes(w.uz.toLowerCase().split('/')[0].trim()) || q.includes(w.ko.toLowerCase())
    );
    if (foundWord) {
      return {
        ko: `"${foundWord.ko}" — 뜻: ${foundWord.uz}! 예문: 저는 ${foundWord.ko}에 대해 공부해요.`,
        uz: `Topildi! Koreyscha: "${foundWord.ko}" — O‘zbekcha ma’nosi: "${foundWord.uz}". Eshitish uchun xabar ustiga bosing!`
      };
    }

    if (/[가-힣]/.test(rawText)) {
      return {
        ko: `"${rawText}"라고 하셨군요! 정말 자연스러운 한국어예요. 계속 이야기해 볼까요?`,
        uz: `Ajoyib! Siz "${rawText}" deb koreyscha yozdingiz — talaffuzi va tuzilishi juda tabiiy! Yana davom ettiring, men tinglayapman.`
      };
    }

    return {
      ko: `"${rawText}"에 대한 좋은 질문이에요! 한국어로 "저는 한국어를 배우고 싶어요"라고 연습해 보세요.`,
      uz: `Qiziq savol ("${rawText}")! Men 토히르벡 (Tokhirbek AI) sifatida sizga koreys tilini o‘rgatishga tayyorman. Biror o‘zbekcha so‘z yozing (masalan: 'kutubxona', 'talaba', 'stipendiya') yoki koreyscha gap tuzib ko‘ring!`
    };
  };

  const handleAiSend = (preset) => {
    const text = (preset || aiInput).trim();
    if (!text) return;
    setAiMessages(prev => [...prev, { role: 'user', ko: text }]);
    setAiInput('');

    setTimeout(() => {
      const reply = generateSmartAiReply(text);
      setAiMessages(prev => [...prev, { role: 'ai', ...reply }]);
      speakKo(reply.ko);
    }, 350);
  };

  // --- TAKRORLASH (KARTOCHKA, TINGLASH, DIALOG, YOZISH, NUTQ, SPRINT, TOPIK) ---
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

  const [sprintRunning, setSprintRunning] = useState(false);
  const [sprintTime, setSprintTime] = useState(30);
  const [sprintScore, setSprintScore] = useState(0);
  const [sprintWord, setSprintWord] = useState(null);
  const [sprintChoices, setSprintChoices] = useState([]);

  useEffect(() => {
    if (!sprintRunning) return;
    const tmr = setInterval(() => {
      setSprintTime(prev => {
        if (prev <= 1) {
          clearInterval(tmr);
          setSprintRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(tmr);
  }, [sprintRunning]);

  const nextSprintRound = () => {
    const target = allWords[Math.floor(Math.random() * allWords.length)];
    const wrong = shuffleArray(allWords.filter(w => w.uz !== target.uz)).slice(0, 3).map(w => w.uz);
    setSprintWord(target);
    setSprintChoices(shuffleArray([target.uz, ...wrong]));
    speakKo(target.ko);
  };

  const startSprintGame = () => {
    setSprintScore(0);
    setSprintTime(30);
    setSprintRunning(true);
    nextSprintRound();
  };

  useEffect(() => {
    if (!mockActive || mockDone) return;
    const timer = setInterval(() => {
      setMockSeconds(s => {
        if (s <= 1) {
          clearInterval(timer);
          setMockDone(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [mockActive, mockDone]);

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
  const basicJung = ['ㅏ','ㅑ','ㅓ','ㅕ','ㅗ','ㅛ','ㅜ','ㅠ','ㅡ','ㅣ'];
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
    const shuffled = shuffleArray(lesson.quizzes).map(q => ({
      ...q,
      opts: shuffleArray(q.opts)
    }));
    setQuizList(shuffled);
    setQIdx(0);
    setQAnswer(null);
    setScreen('lesson');
  };

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
      setSpeechText("Brauzeringiz mikrofonni qo‘llab-quvvatlamaydi (Chrome/Safari da sinab ko‘ring).");
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
          setSpeechStatus({ ok: true, msg: "Ajoyib talaffuz! To‘g‘ri! 🎉 (+20 XP)" });
          setProfile(p => ({ ...p, xp: p.xp + 20, dailyXp: p.dailyXp + 20 }));
        } else {
          setSpeechStatus({ ok: false, msg: "Yana bir bor aniqroq talaffuz qilib ko‘ring!" });
        }
        setIsRecording(false);
      };
      rec.onerror = () => {
        setIsRecording(false);
        setSpeechText("Ovoz eshitilmadi. Mikrofon ruxsatini tekshiring.");
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
      <div className={`min-h-screen w-full ${t.bg} flex flex-col justify-between p-6 font-sans`}>
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
          {authMode === 'welcome' ? (
            <>
              <div className="relative w-36 h-36 mx-auto">
                <ZiyoOwlAvatar className="w-full h-full rounded-[36px] border-4 border-emerald-500/30 shadow-2xl" equipped={equippedItems} />
                <span className="absolute -bottom-2 inset-x-3 bg-[#58cc02] text-white text-[10px] font-black py-1 rounded-full shadow-lg uppercase">
                  ZiyoPrep • 서울대 1A–6B
                </span>
              </div>
              <div className="space-y-2 pt-2">
                <h1 className={`text-2xl font-black ${t.textMain}`}>
                  ZiyoPrep bilan koreys tilini quvnoq va samarali o‘rganing!
                </h1>
                <p className={`text-xs ${t.textMuted} max-w-xs mx-auto leading-relaxed`}>
                  Hangul alifbosi, 서울대 한국어 1A–6B to‘liq darsliklari, Uyga vazifalar, Real Dialoglar va AI ustoz 토히르벡.
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
                  onClick={handleGoogleLogin}
                  className={`w-full py-4 rounded-2xl ${t.card} border-2 border-b-4 font-black text-sm ${t.textMain} active:translate-y-0.5 transition`}
                >
                  Google bilan davom etish
                </button>
                <button
                  onClick={() => { setAuthError(''); setAuthMode('login'); }}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Email va Parol orqali kirish
                </button>
              </div>
            </>
          ) : (
            <div className={`${t.card} border rounded-3xl p-6 space-y-4 text-left`}>
              <div className="flex items-center justify-between">
                <button onClick={() => setAuthMode('welcome')} className={`p-2 rounded-xl ${t.sub} border`}>
                  <ArrowLeft size={16} />
                </button>
                <h2 className={`font-black text-base ${t.textMain}`}>
                  {authMode === 'login' ? 'ZiyoPrep ga kirish' : 'Ro‘yxatdan o‘tish'}
                </h2>
                <div className="w-8" />
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-500/15 text-rose-500 text-xs font-bold text-center">
                  {authError}
                </div>
              )}

              <form onSubmit={handleEmailAuth} className="space-y-3">
                {authMode === 'register' && (
                  <input
                    type="text"
                    placeholder="Ismingiz"
                    value={authForm.name}
                    onChange={e => setAuthForm({ ...authForm, name: e.target.value })}
                    className={`w-full ${t.sub} border rounded-2xl px-4 py-3 text-xs font-bold outline-none`}
                  />
                )}
                <input
                  type="email"
                  placeholder="Email manzilingiz"
                  value={authForm.email}
                  onChange={e => setAuthForm({ ...authForm, email: e.target.value })}
                  className={`w-full ${t.sub} border rounded-2xl px-4 py-3 text-xs font-bold outline-none`}
                />
                <input
                  type="password"
                  placeholder="Parol (kamida 4 ta belgi)"
                  value={authForm.password}
                  onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
                  className={`w-full ${t.sub} border rounded-2xl px-4 py-3 text-xs font-bold outline-none`}
                />
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#58cc02] border-b-4 border-[#46a302] text-white font-black text-xs uppercase"
                >
                  {authMode === 'login' ? 'Kirish' : 'Akkaunt yaratish'}
                </button>
              </form>

              <button
                onClick={() => { setAuthError(''); setAuthMode(authMode === 'login' ? 'register' : 'login'); }}
                className="w-full text-center text-xs font-bold text-emerald-600"
              >
                {authMode === 'login' ? "Akkauntingiz yo‘qmi? Ro‘yxatdan o‘ting" : "Akkauntingiz bormi? Tizimga kiring"}
              </button>
            </div>
          )}
        </div>

        <div className="text-center text-[11px] text-slate-400">ZiyoPrep • 한글 스튜디오 (서울대 1A–6B)</div>
      </div>
    );
  }

  // =========================================================================
  // 1. ASOSIY EKRAN — "ZiyoPrep • 한글 스튜디오"
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
            <button
              onClick={() => setUiLang(l => l === 'uz' ? 'ko' : 'uz')}
              className={`px-3 py-1.5 rounded-full ${t.card} border text-xs font-bold flex items-center gap-1.5`}
            >
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
              🔥 {profile.streak} kunlik streak • ⚡ {profile.xp} XP • ❄️ {profile.freezes}
            </div>
          </div>
        </div>

        <button
          onClick={() => startLesson(nextLesson)}
          className={`w-full py-3.5 px-4 rounded-2xl ${t.card} border hover:border-emerald-400 text-xs font-black flex items-center justify-center gap-2 active:scale-99 transition`}
        >
          <Play size={13} className="text-[#58cc02] fill-[#58cc02]" />
          <span>
            {uiLang === 'uz'
              ? `${nextLesson.week} Davom etish (${nextLesson.title})`
              : `${nextLesson.week} 이어서 공부하기`}
          </span>
        </button>

        {/* TEZKOR MINI-ILOVALAR: 글자 조립 + DIALOG SIMULYATORI */}
        <div className="grid grid-cols-2 gap-2.5">
          <div
            onClick={() => setScreen('builder')}
            className={`rounded-2xl ${isDark ? 'bg-emerald-950/40 border-emerald-800' : 'bg-[#eef6ee] border-[#d6ead6]'} border p-3.5 cursor-pointer active:scale-98 transition space-y-1.5`}
          >
            <div className="w-9 h-9 rounded-xl bg-[#4d8b6f] text-white font-black text-xs flex items-center justify-center">
              가나다
            </div>
            <div className={`font-black text-xs ${t.textMain}`}>글자 조립 (Harf)</div>
            <div className={`text-[10px] ${t.textMuted}`}>Bo‘g‘in yig‘ish & Talaffuz</div>
          </div>

          <div
            onClick={() => {
              setScreen('review');
              setReviewMode('dialog');
              setDialogStep(0);
              setDialogFeedback(null);
            }}
            className={`rounded-2xl ${isDark ? 'bg-sky-950/40 border-sky-800' : 'bg-[#eef6fc] border-[#cce5f6]'} border p-3.5 cursor-pointer active:scale-98 transition space-y-1.5`}
          >
            <div className="w-9 h-9 rounded-xl bg-sky-500 text-white font-black text-xs flex items-center justify-center">
              <MessageSquare size={18} />
            </div>
            <div className={`font-black text-xs ${t.textMain}`}>🎭 Dialog Simulyator</div>
            <div className={`text-[10px] ${t.textMuted}`}>Kafe, Shifoxona, Suhbat</div>
          </div>
        </div>

        {/* 서울대 한국어 1A ~ 6B Tablari */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[11px] font-black text-slate-400 tracking-wider uppercase shrink-0 mr-1">서울대</span>
            {snuBooks.map((b) => {
              const active = b.code === selectedBookCode;
              return (
                <button
                  key={b.code}
                  onClick={() => setSelectedBookCode(b.code)}
                  className={`px-3 h-8 rounded-lg font-black text-xs shrink-0 transition ${
                    active
                      ? isDark ? 'bg-slate-800 border-2 border-emerald-400 text-white' : 'bg-white border-2 border-[#1e1e1e] text-[#1e1e1e]'
                      : isDark ? 'bg-rose-950/60 text-rose-200' : 'bg-[#f8dce2] text-[#7f2d3f]'
                  }`}
                >
                  {b.code}
                </button>
              );
            })}
          </div>
          <div className="flex justify-between text-[11px] font-bold text-slate-400 px-0.5">
            <span>{currentBook.label}</span>
            <span>{currentBook.range}</span>
          </div>
        </div>

        {/* Darslar Ro'yxati */}
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
                    alert(uiLang === 'uz' ? "Avval oldingi darsni tugating!" : "이전 과를 먼저 완료하세요!");
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
                    isDone
                      ? 'bg-[#58cc02] text-white'
                      : isOpen
                        ? 'bg-[#dbeafe] text-[#1d4ed8]'
                        : 'bg-[#fce7eb] text-[#be123c]'
                  }`}>
                    {lesson.num}
                  </span>
                  <span className="text-base">{lesson.emoji}</span>
                  <div>
                    <div className={`text-xs font-black ${t.textMain}`}>{lesson.title}</div>
                    {uiLang === 'uz' && <div className="text-[10px] text-slate-400">{lesson.heroUz}</div>}
                  </div>
                </div>

                <div>
                  {isDone ? (
                    <CheckCircle2 size={17} className="text-[#58cc02]" />
                  ) : !isOpen ? (
                    <Lock size={15} className="text-slate-300" />
                  ) : (
                    <span className="text-[10px] font-black text-emerald-600">›</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {!isUnlockedAll && (
          <button
            onClick={() => {
              setIsUnlockedAll(true);
              localStorage.setItem('hs_unlocked', 'true');
            }}
            className="w-full py-3.5 rounded-2xl bg-[#e11d48] hover:bg-rose-600 text-white font-black text-xs tracking-wide shadow-md mt-2"
          >
            {uiLang === 'uz' ? '전체 코스 열기 (Barcha darslarni ochish)' : '전체 코스 열기'}
          </button>
        )}
      </div>
    );
  };

  // =========================================================================
  // 2. "글자 조립"
  // =========================================================================
  const renderBuilder = () => (
    <div className="space-y-3.5 pb-28">
      <div className="flex items-center justify-between pt-2">
        <button onClick={() => setScreen('home')} className={`flex items-center gap-1.5 text-sm font-black ${t.textMain}`}>
          <ArrowLeft size={16} /> <span>글자 조립</span>
        </button>
        <button
          onClick={() => setUiLang(l => l === 'uz' ? 'ko' : 'uz')}
          className={`px-3 py-1 rounded-full ${t.card} border text-xs font-bold flex items-center gap-1`}
        >
          <Globe size={13} className="text-sky-500" /> {uiLang === 'uz' ? "O'zbekcha" : '한국어'}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        {[
          { id: 'no_batchim', icon: '가', label: '받침 없는 글자' },
          { id: 'with_batchim', icon: '난', label: '받침 있는 글자' },
          { id: 'word', icon: '🥗', label: '단어 조립' },
          { id: 'pronounce', icon: '🔊', label: '발음 연습' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setBuilderTab(tab.id)}
            className={`p-2.5 rounded-2xl border text-center transition ${
              builderTab === tab.id
                ? isDark ? 'bg-emerald-950/60 border-emerald-500 text-white font-black' : 'bg-[#eef6ee] border-[#9ec99e] font-black text-slate-900'
                : `${t.card} ${t.textMuted}`
            }`}
          >
            <div className="text-sm font-black">{tab.icon}</div>
            <div className="text-[9px] mt-1 leading-tight">{tab.label}</div>
          </button>
        ))}
      </div>

      <div className={`rounded-3xl ${t.card} border p-4 space-y-3.5`}>
        <div className="text-[11px] font-bold text-slate-500">
          자음과 모음을 눌러서 글자를 만들어 보세요
        </div>

        <div className="space-y-1.5">
          <div className="text-[10px] font-bold text-slate-400">자음</div>
          <div className="grid grid-cols-8 gap-1.5">
            {(showDoubleCho ? [...basicCho, ...doubleCho] : basicCho).map(c => (
              <button
                key={c}
                onClick={() => { setCho(c); speakKo(composeHangul(c, jung, activeJong)); }}
                className={`py-2 rounded-xl border text-xs font-black transition ${
                  cho === c
                    ? 'bg-[#e6f3e6] border-[#82b982] text-emerald-900'
                    : `${t.sub} ${t.textMain}`
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <button onClick={() => setShowDoubleCho(!showDoubleCho)} className="text-[10px] font-bold text-slate-400">
            쌍자음 {showDoubleCho ? '▲' : '▼'}
          </button>
        </div>

        <div className="space-y-1.5">
          <div className="text-[10px] font-bold text-slate-400">모음</div>
          <div className="grid grid-cols-8 gap-1.5">
            {(showCompoundJung ? [...basicJung, ...compoundJung] : basicJung).map(v => (
              <button
                key={v}
                onClick={() => { setJung(v); speakKo(composeHangul(cho, v, activeJong)); }}
                className={`py-2 rounded-xl border text-xs font-black transition ${
                  jung === v
                    ? 'bg-[#e6f3e6] border-[#82b982] text-emerald-900'
                    : `${t.sub} ${t.textMain}`
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <button onClick={() => setShowCompoundJung(!showCompoundJung)} className="text-[10px] font-bold text-slate-400">
            겹모음 {showCompoundJung ? '▲' : '▼'}
          </button>
        </div>

        {(builderTab === 'with_batchim' || builderTab === 'word') && (
          <div className="space-y-1.5">
            <div className="text-[10px] font-bold text-slate-400">받침</div>
            <div className="grid grid-cols-6 gap-1.5">
              {batchims.map(b => (
                <button
                  key={b}
                  onClick={() => { setJong(b); speakKo(composeHangul(cho, jung, b)); }}
                  className={`py-1.5 rounded-xl border text-xs font-black ${
                    jong === b ? 'bg-[#fdf2f4] border-rose-400 text-rose-800' : `${t.sub} ${t.textMain}`
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-12 gap-3 pt-2 items-center border-t border-slate-200/40">
          <div
            onClick={() => speakKo(composedSyllable)}
            className={`col-span-5 aspect-square rounded-2xl ${t.sub} border flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400`}
          >
            <span className={`text-5xl font-black ${t.textMain}`}>{composedSyllable}</span>
            <span className="text-[10px] font-bold text-slate-400 mt-1">{romanGuide}</span>
            <span className="text-[9px] font-bold text-slate-500 mt-0.5">🔊 눌러서 듣기</span>
          </div>

          <div className="col-span-7 space-y-2">
            <div className="text-[10px] font-bold text-slate-500">단어 조립</div>
            <div className={`min-h-[38px] px-3 py-2 rounded-xl ${t.sub} border text-sm font-black ${t.textMain} flex items-center`}>
              {wordBuffer || <span className="text-[10px] font-normal text-slate-400">글자를 추가하거나 입력</span>}
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={() => setWordBuffer(w => w + composedSyllable)}
                className="px-3 py-1.5 rounded-xl bg-[#eef6ee] text-emerald-800 font-black text-[11px]"
              >
                + 추가
              </button>
              <button
                onClick={() => setWordBuffer(w => w.slice(0, -1))}
                className={`px-2.5 py-1.5 rounded-xl ${t.sub} border text-[11px] font-bold`}
              >
                ⌫
              </button>
              <button
                onClick={() => setWordBuffer('')}
                className={`px-2.5 py-1.5 rounded-xl ${t.sub} border text-[10px] font-bold`}
              >
                전체 지우기
              </button>
            </div>
            <button
              onClick={() => wordBuffer && speakKo(wordBuffer)}
              className="px-3.5 py-1.5 rounded-full bg-slate-800 text-white font-bold text-[10px] flex items-center gap-1"
            >
              <Volume2 size={12} /> 단어 듣기
            </button>
          </div>
        </div>
      </div>

      <div className={`rounded-3xl ${t.card} border p-5 text-center space-y-3`}>
        <div className="flex justify-between items-center text-[11px] font-bold">
          <span className={t.textMain}>🔊 랜덤 읽기 연습</span>
          <span className="text-slate-400">지금까지 {practiceCount}개 연습</span>
        </div>

        <div className="flex items-center justify-center gap-4 py-1">
          <span className={`text-5xl font-black ${t.textMain}`}>{randomChar}</span>
          <button
            onClick={() => speakKo(randomChar)}
            className="text-[11px] font-bold text-slate-500 hover:text-emerald-600 flex items-center gap-1"
          >
            <Volume2 size={15} /> 발음 들어보기
          </button>
        </div>

        <button
          onClick={nextRandomSyllable}
          className="px-6 py-2.5 rounded-full bg-[#2b2b2b] text-white font-bold text-xs shadow-xs active:scale-95 transition"
        >
          읽었어요, 다음 글자
        </button>
      </div>
    </div>
  );

  // =========================================================================
  // 3. DARS EKRANI (GRAMMATIKA + LUG'AT + UYGA VAZIFA + TEST)
  // =========================================================================
  const renderLesson = () => {
    if (!activeLesson) return null;
    const currentQ = quizList[qIdx];

    return (
      <div className="space-y-3.5 pb-28">
        <div className="flex items-center justify-between pt-2">
          <button onClick={() => setScreen('home')} className={`flex items-center gap-1.5 text-xs font-black ${t.textMuted}`}>
            <ArrowLeft size={15} /> <span>{activeLesson.week}</span>
          </button>
          <button
            onClick={() => setUiLang(l => l === 'uz' ? 'ko' : 'uz')}
            className={`px-3 py-1 rounded-full ${t.card} border text-[11px] font-bold flex items-center gap-1`}
          >
            <Globe size={12} className="text-sky-500" /> {uiLang === 'uz' ? "O'zbekcha" : '한국어'}
          </button>
        </div>

        <div
          onClick={() => toggleItem('hero', activeLesson.heroKo)}
          className={`rounded-2xl ${t.card} border p-4 flex items-center gap-3.5 cursor-pointer`}
        >
          <ZiyoOwlAvatar className="w-11 h-11 rounded-2xl shrink-0" equipped={equippedItems} />
          <div>
            <div className="text-[10px] font-bold text-slate-400">{activeLesson.week}</div>
            <div className={`text-base font-black ${t.textMain}`}>{activeLesson.heroKo}</div>
            {revealed['hero'] && (
              <div className="text-xs font-bold text-indigo-500 mt-0.5">{activeLesson.heroUz}</div>
            )}
          </div>
        </div>

        {/* 1-BLOK (PUSHTI) */}
        <div className={`rounded-3xl ${isDark ? 'bg-rose-950/40 border-rose-800' : 'bg-[#fdf2f4] border-[#f5d5dc]'} border overflow-hidden`}>
          <button
            onClick={() => setOpenSec(p => ({ ...p, rule: !p.rule }))}
            className="w-full p-4 flex items-center justify-between text-left"
          >
            <div>
              <span className={`font-black text-sm ${t.textMain}`}>{activeLesson.pinkTitle} </span>
              <span className="text-[11px] text-slate-500">{activeLesson.pinkSub}</span>
            </div>
            {openSec.rule ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
          </button>

          {openSec.rule && (
            <div className={`${isDark ? 'bg-[#141a29]' : 'bg-white'} p-4 space-y-4`}>
              {activeLesson.pinkGroups.map((grp, gi) => (
                <div key={gi} className="space-y-2">
                  <div className="text-[11px] font-bold text-slate-400">{grp.cond}</div>
                  <div className="space-y-2">
                    {grp.items.map((it, ii) => {
                      const key = `p-${gi}-${ii}`;
                      return (
                        <div key={key} onClick={() => toggleItem(key, it.ko)} className="cursor-pointer">
                          <div className={`text-sm font-black ${t.textMain} hover:text-rose-500`}>{it.ko}</div>
                          {revealed[key] && (
                            <div className="text-xs text-slate-400 font-bold">{it.uz}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="pt-2 border-t border-slate-200/30">
                {editingMemo ? (
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={memoInput}
                      onChange={e => setMemoInput(e.target.value)}
                      placeholder="Eslatma yozing..."
                      className={`flex-1 ${t.sub} border rounded-xl px-3 py-1.5 text-xs`}
                    />
                    <button
                      onClick={() => {
                        setMemos(p => ({ ...p, [activeLesson.id]: memoInput }));
                        setEditingMemo(false);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
                    >
                      OK
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <button onClick={() => setEditingMemo(true)} className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Edit3 size={12} /> {memos[activeLesson.id] || 'memo'}
                    </button>
                    <button
                      onClick={() => setDoneSec(p => ({ ...p, rule: !p.rule }))}
                      className={`px-3 py-1 rounded-lg border text-[11px] font-bold ${
                        doneSec.rule ? 'bg-emerald-500 text-white border-emerald-600' : 'border-slate-300 text-slate-400'
                      }`}
                    >
                      {doneSec.rule ? '✓ 완료' : '☐ 완료'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 2-BLOK (YASHIL) */}
        <div className={`rounded-3xl ${isDark ? 'bg-emerald-950/40 border-emerald-800' : 'bg-[#eef6ee] border-[#d6ead6]'} border overflow-hidden`}>
          <button
            onClick={() => setOpenSec(p => ({ ...p, struct: !p.struct }))}
            className="w-full p-4 flex items-center justify-between text-left"
          >
            <div>
              <span className={`font-black text-sm ${t.textMain}`}>{activeLesson.greenTitle} </span>
              <span className="text-[11px] text-emerald-600 font-bold">{activeLesson.greenFormula}</span>
            </div>
            {openSec.struct ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
          </button>

          {openSec.struct && (
            <div className={`${isDark ? 'bg-[#141a29]' : 'bg-white'} p-4 space-y-3`}>
              {activeLesson.greenRows.map((row, ri) => {
                const key = `g-${ri}`;
                return (
                  <div key={key} onClick={() => toggleItem(key, row.res)} className="cursor-pointer space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
                      {row.parts.map((pt, pi) => (
                        <React.Fragment key={pi}>
                          <span className={`px-2.5 py-1 rounded-lg ${t.sub} border`}>{pt}</span>
                          {pi < row.parts.length - 1 && <span className="text-slate-400">+</span>}
                        </React.Fragment>
                      ))}
                      <span className="text-slate-400">→</span>
                      <span className={`font-black ${t.textMain}`}>{row.res}</span>
                    </div>
                    {revealed[key] && <div className="text-xs text-emerald-600 font-bold">{row.uz}</div>}
                  </div>
                );
              })}

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setDoneSec(p => ({ ...p, struct: !p.struct }))}
                  className={`px-3 py-1 rounded-lg border text-[11px] font-bold ${
                    doneSec.struct ? 'bg-emerald-500 text-white border-emerald-600' : 'border-slate-300 text-slate-400'
                  }`}
                >
                  {doneSec.struct ? '✓ 완료' : '☐ 완료'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3-BLOK (BINAFSHA) */}
        <div className={`rounded-3xl ${isDark ? 'bg-indigo-950/40 border-indigo-800' : 'bg-[#f3f0fa] border-[#e0d7f5]'} border overflow-hidden`}>
          <button
            onClick={() => setOpenSec(p => ({ ...p, words: !p.words }))}
            className="w-full p-4 flex items-center justify-between text-left"
          >
            <span className={`font-black text-sm ${t.textMain}`}>오늘의 핵심 단어 (Lug‘at)</span>
            {openSec.words ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
          </button>

          {openSec.words && (
            <div className={`${isDark ? 'bg-[#141a29]' : 'bg-white'} p-4 space-y-2`}>
              {activeLesson.words.map((w, wi) => {
                const key = `w-${wi}`;
                return (
                  <div
                    key={key}
                    onClick={() => toggleItem(key, w.ko)}
                    className="py-1.5 border-b border-slate-200/30 last:border-none cursor-pointer flex justify-between items-center"
                  >
                    <div>
                      <div className={`text-sm font-black ${t.textMain}`}>{w.ko}</div>
                      <div className="text-[11px] text-slate-400 font-bold">
                        {revealed[key] ? w.uz : '누르면 발음 & 번역'}
                      </div>
                    </div>
                    <Volume2 size={15} className="text-indigo-400" />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 4-BLOK: INTERAKTIV UYGA VAZIFA (오늘의 숙제) */}
        {activeLesson.homework && (
          <div className={`rounded-3xl ${isDark ? 'bg-amber-950/35 border-amber-800' : 'bg-amber-50 border-amber-200'} border p-4 space-y-2.5`}>
            <div className="flex justify-between items-center text-xs font-black text-amber-600 dark:text-amber-400">
              <span>📝 오늘의 숙제 • Uyga Vazifa</span>
              <button onClick={() => speakKo(activeLesson.homework.sampleKo)} className="flex items-center gap-1 underline">
                <Volume2 size={13} /> Namuna
              </button>
            </div>
            <p className={`text-xs font-bold ${t.textMain}`}>{activeLesson.homework.taskUz}</p>
            <p className="text-[10px] text-slate-400">Yordam: {activeLesson.homework.hint}</p>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={hwInput}
                onChange={e => setHwInput(e.target.value)}
                placeholder="Koreyscha javobingizni yozing..."
                className={`flex-1 ${t.card} border rounded-xl px-3 py-2 text-xs font-bold outline-none`}
              />
              <button
                onClick={() => {
                  const cleanU = hwInput.replace(/[\s.?!]/g, '');
                  const cleanA = activeLesson.homework.sampleKo.replace(/[\s.?!]/g, '');
                  if (cleanU === cleanA) {
                    speakKo(activeLesson.homework.sampleKo);
                    setProfile(p => ({ ...p, xp: p.xp + 30, dailyXp: p.dailyXp + 30 }));
                    setHwStatus({ ok: true, msg: "Ajoyib! Uyga vazifa to‘g‘ri bajarildi! 🎉 (+30 XP)" });
                  } else {
                    setHwStatus({ ok: false, msg: `Yana urinib ko‘ring! To‘g‘ri namuna: ${activeLesson.homework.sampleKo}` });
                  }
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-500 text-white font-black text-xs"
              >
                Tekshirish
              </button>
            </div>
            {hwStatus && (
              <div className={`p-2.5 rounded-xl text-xs font-bold ${hwStatus.ok ? 'bg-emerald-500/15 text-emerald-600' : 'bg-rose-500/15 text-rose-500'}`}>
                {hwStatus.msg}
              </div>
            )}
          </div>
        )}

        {/* TEST */}
        {currentQ && (
          <div className={`rounded-3xl ${t.card} border p-4 space-y-3`}>
            <div className="flex items-center justify-between text-xs font-black">
              <span className="text-rose-500 flex items-center gap-1">
                <Shuffle size={13} /> 퀴즈 ({qIdx + 1} / {quizList.length})
              </span>
              <button onClick={() => startLesson(activeLesson)} className="text-[11px] text-indigo-500 underline">
                Savollarni almashtirish
              </button>
            </div>

            <div className={`text-sm font-black ${t.textMain}`}>{currentQ.q}</div>

            <div className="space-y-2">
              {currentQ.opts.map(opt => (
                <button
                  key={opt}
                  disabled={qAnswer !== null}
                  onClick={() => {
                    setQAnswer(opt);
                    speakKo(opt);
                  }}
                  className={`w-full p-3 rounded-2xl text-left border text-xs font-bold transition ${
                    qAnswer !== null
                      ? opt === currentQ.ans
                        ? 'bg-emerald-500 text-white border-emerald-600'
                        : qAnswer === opt
                          ? 'bg-rose-500 text-white border-rose-600'
                          : `${t.sub} opacity-50`
                      : `${t.sub} ${t.textMain} hover:border-rose-300`
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {qAnswer && (
              <div className={`p-3 rounded-2xl text-xs ${qAnswer === currentQ.ans ? 'bg-emerald-500/15 text-emerald-600' : 'bg-rose-500/15 text-rose-500'}`}>
                <div className="font-black">{qAnswer === currentQ.ans ? '정답이에요! 🎉' : `오답! 정답: ${currentQ.ans}`}</div>
                <div className="mt-0.5">{currentQ.exp}</div>
              </div>
            )}

            {qAnswer && (
              <button
                onClick={() => {
                  if (qIdx + 1 < quizList.length) {
                    setQIdx(qIdx + 1);
                    setQAnswer(null);
                  } else {
                    setCompletedIds(p => [...new Set([...p, activeLesson.id])]);
                    setProfile(p => ({ ...p, xp: p.xp + 50, dailyXp: p.dailyXp + 50 }));
                    setScreen('home');
                  }
                }}
                className="w-full py-3 rounded-2xl bg-[#58cc02] text-white font-black text-xs"
              >
                {qIdx + 1 < quizList.length ? '다음 문제 →' : '학습 완료 (+50 XP)'}
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
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2.5">
          <ZiyoOwlAvatar className="w-11 h-11 rounded-2xl" equipped={equippedItems} />
          <div>
            <h2 className={`font-black text-sm ${t.textMain}`}>토히르벡 (ZiyoPrep AI)</h2>
            <span className="text-[10px] font-bold text-emerald-500">● Online • Istalgan savol bering yoki koreyscha yozing</span>
          </div>
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-2.5 no-scrollbar">
        {['Men kimman?', 'Isming nima?', 'kutubxona koreyscha nima?', '이에요 / 예요 farqi?', '☕ 카페에서 buyurtma'].map(chip => (
          <button
            key={chip}
            onClick={() => handleAiSend(chip)}
            className={`shrink-0 px-3 py-1.5 rounded-full ${t.card} border text-[11px] font-bold text-emerald-600 dark:text-emerald-400`}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className={`flex-1 overflow-y-auto rounded-3xl ${t.card} border p-4 space-y-3`}>
        {aiMessages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              onClick={() => m.role === 'ai' && speakKo(m.ko)}
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs space-y-1 cursor-pointer ${
                m.role === 'user'
                  ? 'bg-[#58cc02] text-white font-bold'
                  : `${t.sub} ${t.textMain}`
              }`}
            >
              {m.role === 'ai' && (
                <div className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">🦉 토히르벡 AI</div>
              )}
              <div className="font-black leading-relaxed">{m.ko}</div>
              {m.uz && <div className="text-[11px] opacity-85 leading-relaxed">{m.uz}</div>}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="pt-3 flex gap-2">
        <input
          type="text"
          value={aiInput}
          onChange={e => setAiInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAiSend()}
          placeholder="토히르벡 ga savol yozing..."
          className={`flex-1 ${t.card} border rounded-2xl px-4 py-3 text-xs font-bold outline-none`}
        />
        <button
          onClick={() => handleAiSend()}
          className="px-4 rounded-2xl bg-[#58cc02] text-white font-black flex items-center justify-center"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );

  // =========================================================================
  // 5. TAKRORLASH (KARTOCHKA, TINGLASH, DIALOG, YOZISH, NUTQ, SPRINT, TOPIK)
  // =========================================================================
  const renderReview = () => {
    const card = allWords[flashIdx % allWords.length];
    const listenWord = allWords[listenIdx % allWords.length];
    const speakWord = allWords[speakIdx % allWords.length];
    const writeItem = writingPrompts[writeIdx % writingPrompts.length];
    const currentDialogObj = activeDialog.steps[dialogStep];

    return (
      <div className="space-y-4 pb-28 pt-2">
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'cards', icon: Layers, label: 'So‘z' },
            { id: 'listen', icon: Headphones, label: 'Tinglash' },
            { id: 'dialog', icon: MessageSquare, label: 'Dialog' },
            { id: 'write', icon: Keyboard, label: 'Yozish' },
            { id: 'speak', icon: Mic, label: 'Nutq' },
            { id: 'sprint', icon: Timer, label: 'Sprint' },
            { id: 'mock', icon: Clock, label: 'TOPIK' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => {
                setReviewMode(m.id);
                if (m.id === 'listen' && listenOpts.length === 0) prepareListening(listenIdx);
                if (m.id === 'sprint' && !sprintWord) startSprintGame();
              }}
              className={`shrink-0 py-2.5 px-3 rounded-2xl border flex items-center gap-1.5 text-[11px] font-black transition ${
                reviewMode === m.id
                  ? 'bg-[#58cc02] text-white border-emerald-600 shadow'
                  : `${t.card} ${t.textMuted}`
              }`}
            >
              <m.icon size={14} />
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {/* 1. KARTOCHKA */}
        {reviewMode === 'cards' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-base font-black ${t.textMain}`}>단어 카드 • So‘z Kartochkalari</h2>
              <span className="text-xs font-bold text-slate-400">{(flashIdx % allWords.length) + 1} / {allWords.length}</span>
            </div>

            <div
              onClick={() => { setFlashFlipped(!flashFlipped); speakKo(card.ko); }}
              className={`rounded-3xl ${t.card} border-2 p-8 min-h-[240px] flex flex-col items-center justify-center text-center cursor-pointer space-y-3`}
            >
              <span className="text-[10px] font-black uppercase text-emerald-500">
                {flashFlipped ? 'Tarjimasi' : 'Talaffuz va tarjima uchun bosing'}
              </span>
              {!flashFlipped ? (
                <>
                  <div className={`text-4xl font-black ${t.textMain}`}>{card.ko}</div>
                  <Volume2 size={24} className="text-emerald-500" />
                </>
              ) : (
                <div className="text-2xl font-black text-emerald-500">{card.uz}</div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => { setFlashFlipped(false); setFlashIdx(Math.floor(Math.random() * allWords.length)); }}
                className={`py-3.5 rounded-2xl ${t.card} border font-black text-xs flex items-center justify-center gap-1.5`}
              >
                <Shuffle size={15} /> Tasodifiy so‘z
              </button>
              <button
                onClick={() => { setFlashFlipped(false); setFlashIdx(i => i + 1); setProfile(p => ({ ...p, xp: p.xp + 5, dailyXp: p.dailyXp + 5 })); }}
                className="py-3.5 rounded-2xl bg-[#58cc02] text-white font-black text-xs"
              >
                Yodladim (+5 XP) →
              </button>
            </div>
          </div>
        )}

        {/* 2. TINGLAB TUSHUNISH */}
        {reviewMode === 'listen' && (
          <div className={`rounded-3xl ${t.card} border p-6 text-center space-y-4`}>
            <span className="px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-500 text-[10px] font-black uppercase">
              듣기 연습 • Tinglab Toping
            </span>
            <div>
              <button
                onClick={() => speakKo(listenWord.ko)}
                className="w-20 h-20 rounded-full bg-indigo-600 text-white mx-auto flex items-center justify-center shadow-lg active:scale-95 transition"
              >
                <Volume2 size={34} />
              </button>
              <p className="text-xs text-slate-400 mt-2">Audioni tinglang va to‘g‘ri tarjimani tanlang</p>
            </div>

            <div className="space-y-2 text-left">
              {listenOpts.map(opt => (
                <button
                  key={opt}
                  onClick={() => {
                    setListenPick(opt);
                    if (opt === listenWord.uz) {
                      setProfile(p => ({ ...p, xp: p.xp + 15, dailyXp: p.dailyXp + 15 }));
                    }
                  }}
                  className={`w-full p-3.5 rounded-2xl border text-xs font-black transition ${
                    listenPick !== null
                      ? opt === listenWord.uz
                        ? 'bg-emerald-500 text-white border-emerald-600'
                        : listenPick === opt
                          ? 'bg-rose-500 text-white border-rose-600'
                          : `${t.sub} opacity-50`
                      : `${t.sub} ${t.textMain}`
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {listenPick !== null && (
              <button
                onClick={() => {
                  const next = listenIdx + 1;
                  setListenIdx(next);
                  prepareListening(next);
                }}
                className="w-full py-3.5 rounded-2xl bg-[#58cc02] text-white font-black text-xs"
              >
                Keyingi audio →
              </button>
            )}
          </div>
        )}

        {/* 3. REAL HAYOTIY DIALOG SIMULYATORI (ROLEPLAY) */}
        {reviewMode === 'dialog' && (
          <div className="space-y-3.5">
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {roleplayScenarios.map(sc => (
                <button
                  key={sc.id}
                  onClick={() => {
                    setActiveDialog(sc);
                    setDialogStep(0);
                    setDialogFeedback(null);
                    speakKo(sc.steps[0].npcKo);
                  }}
                  className={`shrink-0 px-3.5 py-2 rounded-2xl border text-xs font-black flex items-center gap-1.5 ${
                    activeDialog.id === sc.id ? 'bg-sky-500 text-white border-sky-600' : `${t.card} ${t.textMain}`
                  }`}
                >
                  <span>{sc.emoji}</span>
                  <span>{sc.title}</span>
                </button>
              ))}
            </div>

            {currentDialogObj && (
              <div className={`rounded-3xl ${t.card} border p-5 space-y-4`}>
                <div className="flex justify-between items-center text-[10px] font-black text-sky-500 uppercase">
                  <span>{activeDialog.emoji} {activeDialog.title} ({activeDialog.level})</span>
                  <span>Bosqich {dialogStep + 1} / {activeDialog.steps.length}</span>
                </div>

                <div
                  onClick={() => speakKo(currentDialogObj.npcKo)}
                  className={`p-4 rounded-2xl ${t.sub} border space-y-1 cursor-pointer`}
                >
                  <div className="text-[10px] font-black text-emerald-500 flex items-center gap-1">
                    <Volume2 size={13} /> Suhbatdosh (Eshitish uchun bosing):
                  </div>
                  <div className={`text-base font-black ${t.textMain}`}>{currentDialogObj.npcKo}</div>
                  <div className="text-xs text-slate-400 font-bold">{currentDialogObj.npcUz}</div>
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-slate-400">Sizning javobingizni tanlang:</div>
                  {currentDialogObj.opts.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        speakKo(opt.ko);
                        if (opt.ok) {
                          setDialogFeedback({ ok: true, msg: "To‘g‘ri va tabiiy javob! 🎉 (+15 XP)" });
                          setProfile(p => ({ ...p, xp: p.xp + 15, dailyXp: p.dailyXp + 15 }));
                        } else {
                          setDialogFeedback({ ok: false, msg: "Bu javob vaziyatga mos kelmadi. Yana urinib ko‘ring!" });
                        }
                      }}
                      className={`w-full p-3.5 rounded-2xl text-left border space-y-0.5 transition ${t.sub} hover:border-sky-400`}
                    >
                      <div className={`text-xs font-black ${t.textMain}`}>{opt.ko}</div>
                      <div className="text-[11px] text-slate-400">{opt.uz}</div>
                    </button>
                  ))}
                </div>

                {dialogFeedback && (
                  <div className={`p-3 rounded-2xl text-xs font-black ${dialogFeedback.ok ? 'bg-emerald-500/15 text-emerald-600' : 'bg-rose-500/15 text-rose-500'}`}>
                    {dialogFeedback.msg}
                  </div>
                )}

                {dialogFeedback?.ok && (
                  <button
                    onClick={() => {
                      if (dialogStep + 1 < activeDialog.steps.length) {
                        const next = dialogStep + 1;
                        setDialogStep(next);
                        setDialogFeedback(null);
                        speakKo(activeDialog.steps[next].npcKo);
                      } else {
                        setDialogStep(0);
                        setDialogFeedback(null);
                      }
                    }}
                    className="w-full py-3.5 rounded-2xl bg-[#58cc02] text-white font-black text-xs"
                  >
                    {dialogStep + 1 < activeDialog.steps.length ? 'Keyingi suhbat →' : 'Suhbat yakunlandi! Qaytadan boshlash'}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* 4. 쓰기 • YOZISH VA IMLO TRENAJYORI */}
        {reviewMode === 'write' && (
          <div className={`rounded-3xl ${t.card} border p-5 space-y-4`}>
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-indigo-500 uppercase">✍️ 쓰기 • Koreyscha Yozish</span>
              <button onClick={() => speakKo(writeItem.ko)} className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                <Volume2 size={15} /> Eshitish
              </button>
            </div>

            <div className="text-center py-2 space-y-1">
              <div className="text-[11px] text-slate-400 font-bold">Quyidagi so‘z/gapni koreys tilida yozing:</div>
              <div className={`text-2xl font-black ${t.textMain}`}>{writeItem.uz}</div>
              <div className="text-[10px] text-slate-400">Yordam: {writeItem.hint}</div>
            </div>

            <input
              type="text"
              value={writeInput}
              onChange={e => setWriteInput(e.target.value)}
              placeholder="Koreyscha yozing (masalan: 학생)..."
              className={`w-full ${t.sub} border-2 focus:border-indigo-500 rounded-2xl px-4 py-3.5 text-center text-base font-black outline-none`}
            />

            {writeResult && (
              <div className={`p-3 rounded-2xl text-xs font-black text-center ${writeResult.ok ? 'bg-emerald-500/15 text-emerald-600' : 'bg-rose-500/15 text-rose-500'}`}>
                {writeResult.msg}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  const cleanUser = writeInput.replace(/\s+/g, '').trim();
                  const cleanAns = writeItem.ko.replace(/\s+/g, '').trim();
                  if (cleanUser === cleanAns) {
                    setWriteResult({ ok: true, msg: `Barakalla! "${writeItem.ko}" — 100% to‘g‘ri! (+20 XP)` });
                    setProfile(p => ({ ...p, xp: p.xp + 20, dailyXp: p.dailyXp + 20 }));
                    speakKo(writeItem.ko);
                  } else {
                    setWriteResult({ ok: false, msg: `Xato! To‘g‘ri yozilishi: ${writeItem.ko}` });
                  }
                }}
                className="py-3.5 rounded-2xl bg-indigo-600 text-white font-black text-xs"
              >
                Tekshirish
              </button>
              <button
                onClick={() => {
                  setWriteIdx(i => i + 1);
                  setWriteInput('');
                  setWriteResult(null);
                }}
                className={`py-3.5 rounded-2xl ${t.sub} border font-black text-xs`}
              >
                Keyingi so‘z →
              </button>
            </div>
          </div>
        )}

        {/* 5. SPEAKING */}
        {reviewMode === 'speak' && (
          <div className={`rounded-3xl ${t.card} border p-6 text-center space-y-4`}>
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-500 text-[10px] font-black uppercase">
              말하기 연습 • AI Talaffuz Tekshiruvi
            </span>
            <div className={`text-3xl font-black ${t.textMain}`}>{speakWord.ko}</div>
            <div className="text-xs text-slate-400 font-bold">{speakWord.uz}</div>

            <div className="flex justify-center gap-2.5 pt-2">
              <button
                onClick={() => speakKo(speakWord.ko)}
                className={`px-4 py-3 rounded-2xl ${t.sub} border font-black text-xs flex items-center gap-1.5`}
              >
                <Volume2 size={16} /> Eshitish
              </button>
              <button
                onClick={() => handleSpeechTest(speakWord.ko)}
                className={`px-5 py-3 rounded-2xl text-white font-black text-xs flex items-center gap-2 ${
                  isRecording ? 'bg-rose-600 animate-pulse' : 'bg-[#58cc02]'
                }`}
              >
                <Mic size={16} /> {isRecording ? 'Eshitilmoqda...' : 'Mikrofonga gapiring'}
              </button>
            </div>

            {speechText && <div className="text-xs font-bold text-indigo-500">Eshitildi: "{speechText}"</div>}
            {speechStatus && (
              <div className={`p-3 rounded-2xl text-xs font-black ${speechStatus.ok ? 'bg-emerald-500/15 text-emerald-600' : 'bg-amber-500/15 text-amber-600'}`}>
                {speechStatus.msg}
              </div>
            )}

            <button
              onClick={() => {
                setSpeechText('');
                setSpeechStatus(null);
                setSpeakIdx(i => i + 1);
              }}
              className="w-full py-3 rounded-2xl bg-slate-900 text-white font-black text-xs"
            >
              Keyingi so‘z →
            </button>
          </div>
        )}

        {/* 6. SPRINT */}
        {reviewMode === 'sprint' && (
          <div className={`rounded-3xl ${t.card} border p-5 text-center space-y-4`}>
            <div className="flex justify-between items-center text-xs font-black">
              <span className="text-amber-500">⚡ Ball: {sprintScore}</span>
              <span className="text-rose-500">⏱ {sprintTime} soniya</span>
            </div>

            {sprintRunning && sprintWord ? (
              <>
                <div className={`text-3xl font-black py-3 ${t.textMain}`}>{sprintWord.ko}</div>
                <div className="grid grid-cols-2 gap-2.5">
                  {sprintChoices.map(ch => (
                    <button
                      key={ch}
                      onClick={() => {
                        if (ch === sprintWord.uz) {
                          setSprintScore(s => s + 10);
                          setProfile(p => ({ ...p, xp: p.xp + 10, dailyXp: p.dailyXp + 10 }));
                        }
                        nextSprintRound();
                      }}
                      className={`p-3.5 rounded-2xl ${t.sub} border hover:border-amber-500 text-xs font-black`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="py-4 space-y-3">
                <div className="text-4xl">⚡</div>
                <h3 className={`text-lg font-black ${t.textMain}`}>
                  {sprintTime === 0 ? `Vaqt tugadi! Natija: ${sprintScore} XP` : '30-Soniyalik So‘z Ovchisi'}
                </h3>
                <p className="text-xs text-slate-400">30 soniya ichida iloji boricha ko‘proq koreyscha so‘z tarjimasini toping!</p>
                <button
                  onClick={startSprintGame}
                  className="w-full py-3.5 rounded-2xl bg-amber-500 text-white font-black text-xs uppercase"
                >
                  O‘yinni Boshlash
                </button>
              </div>
            )}
          </div>
        )}

        {/* 7. TOPIK MOCK */}
        {reviewMode === 'mock' && (
          <div className={`rounded-3xl ${t.card} border p-5 space-y-4`}>
            {!mockActive ? (
              <div className="text-center py-4 space-y-3">
                <div className="text-5xl">📝</div>
                <h3 className={`text-lg font-black ${t.textMain}`}>TOPIK I & II Mock Test</h3>
                <p className="text-xs text-slate-400">
                  8 ta aralash imtihon savoli • 05:00 daqiqa vaqt chegarasi • Real natija tahlili.
                </p>
                <button
                  onClick={launchTopikMock}
                  className="w-full py-4 rounded-2xl bg-[#58cc02] text-white font-black text-xs uppercase shadow"
                >
                  Imtihonni Boshlash
                </button>
              </div>
            ) : !mockDone ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-black">
                  <span className="text-emerald-500">Savol {mockStep + 1} / {mockList.length}</span>
                  <span className="text-indigo-500 flex items-center gap-1">
                    <Clock size={14} /> {Math.floor(mockSeconds / 60)}:{String(mockSeconds % 60).padStart(2, '0')}
                  </span>
                </div>
                <div className={`text-sm font-black ${t.textMain}`}>{mockList[mockStep]?.q}</div>
                <div className="space-y-2">
                  {mockList[mockStep]?.opts.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setMockSelected({ ...mockSelected, [mockStep]: opt })}
                      className={`w-full p-3.5 rounded-2xl text-left border text-xs font-bold ${
                        mockSelected[mockStep] === opt ? 'border-emerald-500 bg-emerald-500/15 text-emerald-500' : `${t.sub} ${t.textMain}`
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {mockStep + 1 < mockList.length ? (
                  <button
                    onClick={() => setMockStep(s => s + 1)}
                    className="w-full py-3.5 rounded-2xl bg-slate-900 text-white font-black text-xs"
                  >
                    Keyingi savol →
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setMockDone(true);
                      setProfile(p => ({ ...p, xp: p.xp + 80, dailyXp: p.dailyXp + 80 }));
                    }}
                    className="w-full py-3.5 rounded-2xl bg-[#58cc02] text-white font-black text-xs"
                  >
                    Imtihonni Yakunlash (+80 XP)
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="text-5xl">🎓</div>
                <h3 className={`text-xl font-black ${t.textMain}`}>
                  Natija: {mockList.filter((q, i) => mockSelected[i] === q.ans).length} / {mockList.length}
                </h3>
                <p className="text-xs font-bold text-emerald-500">
                  Taxminiy daraja: {mockList.filter((q, i) => mockSelected[i] === q.ans).length >= 6 ? 'TOPIK 3–4급 (A’lo!)' : 'TOPIK 1–2급'}
                </p>
                <button
                  onClick={launchTopikMock}
                  className="w-full py-3.5 rounded-2xl bg-[#58cc02] text-white font-black text-xs"
                >
                  Qayta topshirish
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // =========================================================================
  // 6. PROFIL, XP DO'KONI VA TALABALAR REYTINGI (LEADERBOARD)
  // =========================================================================
  const renderProfile = () => {
    const shopItems = [
      { id: 'glasses', icon: '🕶️', name: 'Aqlli Ko‘zoynak', price: 200, desc: 'Boyo‘g‘liga zamonaviy ko‘zoynak taqing' },
      { id: 'gradCap', icon: '🎓', name: 'TOPIK 6 Qalpoqchasi', price: 400, desc: 'Akademik bitiruvchi bosh kiyimi' },
      { id: 'crown', icon: '👑', name: 'Oltin Qirollik Toji', price: 700, desc: 'Eng faol talabalar toji' }
    ];

    const leaderboard = [
      { name: '김민준 (Seul)', xp: 2450, badge: 'TOPIK 5' },
      { name: 'Fariza', xp: 1890, badge: 'TOPIK 4' },
      { name: `${profile.name} (Siz)`, xp: profile.xp, badge: 'TOPIK 4', isMe: true },
      { name: '김예인', xp: 1320, badge: 'TOPIK 3' },
      { name: '투굴두르', xp: 980, badge: 'TOPIK 2' }
    ].sort((a, b) => b.xp - a.xp);

    return (
      <div className="space-y-4 pb-28 pt-2">
        <div className={`rounded-3xl ${t.card} border p-5 flex items-center justify-between`}>
          <div className="flex items-center gap-3.5">
            <ZiyoOwlAvatar className="w-16 h-16 rounded-2xl" equipped={equippedItems} />
            <div>
              {editingName ? (
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={nameDraft}
                    onChange={e => setNameDraft(e.target.value)}
                    className={`${t.sub} border rounded-xl px-2.5 py-1 text-xs font-bold`}
                  />
                  <button
                    onClick={() => { setProfile(p => ({ ...p, name: nameDraft || 'Tokhirbek' })); setEditingName(false); }}
                    className="px-2.5 py-1 rounded-xl bg-emerald-500 text-white text-xs font-bold"
                  >
                    OK
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className={`font-black text-base ${t.textMain}`}>{profile.name}</h2>
                  <button onClick={() => setEditingName(true)} className="text-slate-400"><Edit3 size={13} /></button>
                </div>
              )}
              <p className="text-xs text-slate-400 mt-0.5">{currentUser?.email}</p>
            </div>
          </div>
          <button onClick={toggleDark} className={`p-2.5 rounded-2xl ${t.sub} border`}>
            {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-700" />}
          </button>
        </div>

        {/* Statistika */}
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

        {/* 🛍️ XP DO'KONI (MASKOT AKSESSUARLARI & STREAK MUZLATGICH) */}
        <div className={`rounded-3xl ${t.card} border p-4 space-y-3`}>
          <div className="flex justify-between items-center text-xs font-black">
            <span className="flex items-center gap-1.5 text-emerald-500"><ShoppingBag size={15} /> XP Do‘koni (Maskot Kiyimlari)</span>
            <span className="text-sky-500">⚡ {profile.xp} XP</span>
          </div>

          <div className="space-y-2">
            {shopItems.map(item => {
              const isOwned = ownedItems[item.id];
              const isEquipped = equippedItems[item.id];
              return (
                <div key={item.id} className={`p-3 rounded-2xl ${t.sub} border flex items-center justify-between`}>
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className={`text-xs font-black ${t.textMain}`}>{item.name}</div>
                      <div className="text-[10px] text-slate-400">{item.desc}</div>
                    </div>
                  </div>
                  {isOwned ? (
                    <button
                      onClick={() => setEquippedItems(p => ({ ...p, [item.id]: !p[item.id] }))}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-black ${
                        isEquipped ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-white'
                      }`}
                    >
                      {isEquipped ? 'Kiyilgan ✓' : 'Kiyish'}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (profile.xp < item.price) return alert("XP yetarli emas! Dars yoki mashq bajarib XP yig‘ing.");
                        setProfile(p => ({ ...p, xp: p.xp - item.price }));
                        setOwnedItems(p => ({ ...p, [item.id]: true }));
                        setEquippedItems(p => ({ ...p, [item.id]: true }));
                      }}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 text-white text-[11px] font-black"
                    >
                      ⚡ {item.price}
                    </button>
                  )}
                </div>
              );
            })}

            <div className={`p-3 rounded-2xl ${t.sub} border flex items-center justify-between`}>
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">❄️</span>
                <div>
                  <div className={`text-xs font-black ${t.textMain}`}>Streak Muzlatgich ({profile.freezes} ta bor)</div>
                  <div className="text-[10px] text-slate-400">1 kun dars qilmasangiz ham streak saqlanadi</div>
                </div>
              </div>
              <button
                onClick={() => {
                  if (profile.xp < 150) return alert("150 XP kerak!");
                  setProfile(p => ({ ...p, xp: p.xp - 150, freezes: p.freezes + 1 }));
                }}
                className="px-3 py-1.5 rounded-xl bg-sky-500 text-white text-[11px] font-black"
              >
                ⚡ 150
              </button>
            </div>
          </div>
        </div>

        {/* 🏆 TALABALAR REYTINGI */}
        <div className={`rounded-3xl ${t.card} border p-4 space-y-2.5`}>
          <div className="text-xs font-black flex items-center gap-1.5 text-amber-500">
            <Trophy size={15} /> Haftalik Talabalar Reytingi
          </div>
          <div className="space-y-1.5">
            {leaderboard.map((st, i) => (
              <div
                key={st.name}
                className={`p-2.5 rounded-2xl border flex items-center justify-between text-xs font-black ${
                  st.isMe ? 'bg-emerald-500/15 border-emerald-500 text-emerald-500' : `${t.sub} ${t.textMain}`
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 text-center">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`}</span>
                  <span>{st.name}</span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-500/15 text-slate-400">{st.badge}</span>
                </div>
                <span>⚡ {st.xp} XP</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-3.5 rounded-2xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-500 font-black text-xs flex items-center justify-center gap-2"
        >
          <LogOut size={16} /> Akkauntdan chiqish (Login sahifaga qaytish)
        </button>
      </div>
    );
  };

  // =========================================================================
  // ASOSIY SHELL + PASTKI 5 TA MENYU
  // =========================================================================
  return (
    <div className={`min-h-screen w-full ${t.bg} font-sans select-none transition-colors`}>
      <main className="max-w-md mx-auto px-4 py-2">
        {screen === 'home' && renderHome()}
        {screen === 'builder' && renderBuilder()}
        {screen === 'lesson' && renderLesson()}
        {screen === 'ai' && renderAiTutor()}
        {screen === 'review' && renderReview()}
        {screen === 'profile' && renderProfile()}
      </main>

      <nav className={`fixed bottom-0 inset-x-0 z-40 ${t.nav} px-2 pt-2.5 pb-4 backdrop-blur-xl shadow-lg`}>
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button
            onClick={() => setScreen('home')}
            className={`flex flex-col items-center py-1 px-2 rounded-2xl transition active:scale-95 ${
              screen === 'home' || screen === 'lesson' ? 'text-[#58cc02]' : t.textMuted
            }`}
          >
            <BookOpen size={25} strokeWidth={2.3} />
            <span className="text-[11px] font-black mt-1">학습 • Dars</span>
          </button>

          <button
            onClick={() => setScreen('builder')}
            className={`flex flex-col items-center py-1 px-2 rounded-2xl transition active:scale-95 ${
              screen === 'builder' ? 'text-emerald-600' : t.textMuted
            }`}
          >
            <Sparkles size={25} strokeWidth={2.3} />
            <span className="text-[11px] font-black mt-1">조립 • Harf</span>
          </button>

          <button
            onClick={() => setScreen('ai')}
            className="-mt-8 w-16 h-16 rounded-full bg-[#58cc02] border-b-4 border-[#46a302] text-white flex flex-col items-center justify-center shadow-xl active:translate-y-0.5 transition overflow-hidden p-0.5"
          >
            <ZiyoOwlAvatar className="w-full h-full rounded-full" equipped={equippedItems} />
          </button>

          <button
            onClick={() => {
              setScreen('review');
              if (reviewMode === 'listen' && listenOpts.length === 0) prepareListening(listenIdx);
            }}
            className={`flex flex-col items-center py-1 px-2 rounded-2xl transition active:scale-95 ${
              screen === 'review' ? 'text-amber-500' : t.textMuted
            }`}
          >
            <RotateCcw size={25} strokeWidth={2.3} />
            <span className="text-[11px] font-black mt-1">복습 • Mashq</span>
          </button>

          <button
            onClick={() => setScreen('profile')}
            className={`flex flex-col items-center py-1 px-2 rounded-2xl transition active:scale-95 ${
              screen === 'profile' ? 'text-indigo-500' : t.textMuted
            }`}
          >
            <User size={25} strokeWidth={2.3} />
            <span className="text-[11px] font-black mt-1">프로필 • Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
