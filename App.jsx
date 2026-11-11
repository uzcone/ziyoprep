import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, BookOpen, Headphones, PenTool, Mic, Bot, User, 
  Play, Pause, RotateCcw, CheckCircle2, XCircle, Award, 
  Sparkles, Send, Volume2, ChevronRight, Edit3, ArrowLeft, 
  Layers, Sun, Moon, Target, TrendingUp, Clock, AlertTriangle,
  CheckSquare, Square, FileText, BarChart3, BookmarkCheck,
  Calendar, Cake, ArrowRight, Zap, RefreshCw, Camera, Upload, Check,
  Globe, Languages, Menu, Bell, ArrowUpRight
} from 'lucide-react';

export default function App() {
  // --- 1. TILNI ALMASHTIRISH (INGLIZ TILI / KOREYS TILI) ---
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('ziyoprep_lang') || 'en';
  });

  const switchLanguage = (lang) => {
    setSelectedLanguage(lang);
    localStorage.setItem('ziyoprep_lang', lang);
  };

  // --- 2. MAVZU REJIMI (DARK / LIGHT) ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('ziyoprep_theme');
    if (saved !== null) return saved === 'dark';
    const h = new Date().getHours();
    return h < 7 || h >= 19;
  });

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('ziyoprep_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // --- 3. FOYDALANUVCHI PROFILI ---
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('ziyoprep_user');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (!parsed.photoBase64 || !parsed.photoBase64.startsWith('data:image')) {
          parsed.photoBase64 = '';
        }
        return parsed;
      } catch (e) {}
    }
    return {
      name: 'Tokhirbek',
      gender: 'Erkak',
      birthDate: '2004-05-18',
      photoBase64: '',
      currentBand: '6.5',
      targetBand: '7.5',
      koreanCurrentLevel: '2-급 (Boshlang‘ich)',
      koreanTargetLevel: '4-급 (TOPIK II)',
      streak: 5,
      xp: 750,
      completedTests: 20
    };
  });

  // Kunlik dars rejalari
  const [dailyPlanEn, setDailyPlanEn] = useState([
    { id: 1, title: 'Academic Reading: 10 ta savolli to‘liq test', duration: '30 daq', done: false, xp: 60, tag: 'Reading' },
    { id: 2, title: 'ZiyoAI Speaking Coach: Talaffuz & Ravonlik', duration: '20 daq', done: false, xp: 50, tag: 'Speaking' },
    { id: 3, title: 'Band 7.5–9.0 uchun 10 ta yangi collocation', duration: '15 daq', done: true, xp: 30, tag: 'Vocab' }
  ]);

  const [dailyPlanKr, setDailyPlanKr] = useState([
    { id: 101, title: 'TOPIK II O‘qish (읽기): 15 ta grammatik test', duration: '30 daq', done: false, xp: 60, tag: '읽기' },
    { id: 102, title: 'EPS-TOPIK Tinglash (듣기): Suhbat audiolari', duration: '20 daq', done: false, xp: 50, tag: '듣기' },
    { id: 103, title: 'Koreys tili 20 ta yangi so‘z & Collocation', duration: '15 daq', done: true, xp: 30, tag: '어휘' }
  ]);

  useEffect(() => {
    localStorage.setItem('ziyoprep_user', JSON.stringify(userProfile));
  }, [userProfile]);

  const toggleTask = (id, isKr) => {
    if (isKr) {
      setDailyPlanKr(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
    } else {
      setDailyPlanEn(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
    }
  };

  // Navigatsiya holati: 'home' | 'tests' | 'ai' | 'writing' | 'profile' | 'korean_hangul'
  const [activeTab, setActiveTab] = useState('home');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState(userProfile);
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("Rasm hajmi juda katta (maksimal 3MB).");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        setEditForm(prev => ({ ...prev, photoBase64: base64Data }));
        setUserProfile(prev => ({ ...prev, photoBase64: base64Data }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- 4. INGLIZ TILI READING TESTI ---
  const [readingTime, setReadingTime] = useState(3600);
  const [readingTimerRunning, setReadingTimerRunning] = useState(false);
  const [highlightEvidence, setHighlightEvidence] = useState(false);
  const [readingAnswers, setReadingAnswers] = useState({});
  const [readingChecked, setReadingChecked] = useState(false);

  useEffect(() => {
    let t = null;
    if (readingTimerRunning && readingTime > 0) {
      t = setInterval(() => setReadingTime(prev => prev - 1), 1000);
    }
    return () => clearInterval(t);
  }, [readingTimerRunning, readingTime]);

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const fullReadingQuestions = [
    {
      id: "q1",
      type: "Matching Headings",
      question: "1. Paragraph A uchun mos keladigan asosiy sarlavhani tanlang:",
      options: [
        "i. Financial consequences of bilingual education",
        "ii. Cognitive agility and task-switching superiority",
        "iii. Linguistic conflict observed in childhood"
      ],
      correct: "ii. Cognitive agility and task-switching superiority",
      explanation: "Paragraf A da ko‘p tillilik diqqatni boshqarish va vazifalarni tez almashtirishni rivojlantirishi aytilgan."
    },
    {
      id: "q2",
      type: "Matching Headings",
      question: "2. Paragraph B uchun mos sarlavhani tanlang:",
      options: [
        "i. Neuroplastic resilience persisting into old age",
        "ii. Accelerated cognitive decline in multilinguals",
        "iii. Evolution of dialect mapping"
      ],
      correct: "i. Neuroplastic resilience persisting into old age",
      explanation: "Paragraf B da kognitiv moslashuv keksayganda ham davom etishi va kasalliklarni 4.5 yilga kechiktirishi aytilgan."
    },
    {
      id: "q3",
      type: "True / False / Not Given",
      question: "3. Learning two languages causes lifelong intellectual confusion in adults.",
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct: "FALSE",
      explanation: "Matnda aksincha: 'Far from creating interference, it strengthens mental agility' deb ta'kidlanadi."
    }
  ];

  // --- 5. KOREYS TILI DARS MATERIALLARI ---
  const hangulAlphabet = [
    { char: "ㄱ", name: "Giyok (g/k)", sound: "가 (ga)" },
    { char: "ㄴ", name: "Niun (n)", sound: "나 (na)" },
    { char: "ㄷ", name: "Digeut (d/t)", sound: "다 (da)" },
    { char: "ㄹ", name: "Riel (r/l)", sound: "라 (ra)" },
    { char: "ㅁ", name: "Mium (m)", sound: "마 (ma)" },
    { char: "ㅂ", name: "Biup (b/p)", sound: "바 (ba)" },
    { char: "ㅅ", name: "Siut (s)", sound: "사 (sa)" },
    { char: "ㅇ", name: "Iung (ng)", sound: "아 (a)" }
  ];

  const koreanTopikQuestions = [
    {
      id: "kr1",
      question: "1. 다음 빈칸에 들어갈 가장 알맞은 것을 고르십시오: 저는 아침에 일찍 ________.",
      options: ["① 일어납니다", "② 잤습니다", "③ 만났습니다", "④ 샀습니다"],
      correct: "① 일어납니다",
      explanation: "Tarjimasi: 'Men ertalab barvaqt uyg'onaman'. Ertalab bajariladigan harakat uchun '일어나다' fe'li to'g'ri keladi."
    },
    {
      id: "kr2",
      question: "2. [EPS-TOPIK] 공장에서 일할 때 반드시 ________을/를 착용해야 합니다.",
      options: ["① 안전모 (Kaska)", "② 양말 (Paypoq)", "③ 안경 (Ko'zoynak)", "④ 모자 (Oddiy qalpoq)"],
      correct: "① 안전모 (Kaska)",
      explanation: "Xavfsizlik qoidasi: Zavod yoki qurilishda ishlaganda albatta himoya kaskasini (안전모) kiyish shart."
    }
  ];

  const [koreanAnswers, setKoreanAnswers] = useState({});
  const [koreanChecked, setKoreanChecked] = useState(false);

  const speakText = (text, lang = 'en-US') => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const ut = new SpeechSynthesisUtterance(text);
    ut.lang = lang;
    window.speechSynthesis.speak(ut);
  };

  const theme = {
    bg: isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-900 text-slate-100',
    card: isDarkMode ? 'bg-[#151726] border-slate-800 shadow-xl' : 'bg-[#1a1d30] border-slate-700/60 shadow-md',
    subCard: isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-800/80 border-slate-700',
    header: 'bg-slate-950/95 border-b border-slate-800/80',
    textMuted: 'text-slate-400',
    navBg: 'bg-[#121421]/95 border-t border-slate-800 backdrop-blur-2xl shadow-2xl',
    inputBg: 'bg-slate-900 border-slate-700 text-white'
  };

  // ==========================================
  // 1. ASOSIY BOSH SAHIFA
  // ==========================================
  const renderHome = () => {
    const isKr = selectedLanguage === 'kr';
    const currentDailyPlan = isKr ? dailyPlanKr : dailyPlanEn;

    return (
      <div className="space-y-5 animate-fadeIn pb-6">

        {/* YOUR LANGUAGE JOURNEY BANNERI */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#261f5c] via-[#1a1a40] to-[#12132b] p-6 text-white border border-indigo-500/25 shadow-2xl">
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full border border-indigo-400/10 pointer-events-none"></div>
          <div className="absolute -top-6 -right-6 w-52 h-52 rounded-full border border-indigo-400/15 pointer-events-none"></div>

          <div className="flex items-start justify-between relative z-10">
            <div className="space-y-3 max-w-[62%]">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300/90 block">
                YOUR LANGUAGE JOURNEY
              </span>
              
              <div className="space-y-0.5">
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  Salom! Xush kelibsiz 👋
                </h2>
                <h3 className="text-xl font-extrabold tracking-tight text-white">
                  Bugun nimani o‘rganamiz?
                </h3>
              </div>

              <p className="text-xs text-indigo-200/80 leading-relaxed font-normal">
                Ingliz va koreys tillarini bir joyda, aqlli va samarali o‘rganing.
              </p>

              <button 
                onClick={() => setActiveTab('tests')}
                className="mt-2 inline-flex items-center gap-2 bg-[#b8a5fe] hover:bg-[#a892fe] text-slate-950 font-black text-xs px-4 py-2.5 rounded-2xl shadow-lg transition transform active:scale-95"
              >
                <span>Darsni boshlash</span>
                <ArrowUpRight size={16} strokeWidth={2.8} />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center pt-2">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#2e335a" strokeWidth="9" fill="transparent" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#5885f8"
                    strokeWidth="9"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * 68) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black tracking-tight text-white">68%</span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-indigo-200/70 mt-1">Umumiy progress</span>
              <span className="text-xs font-bold text-indigo-100 mt-2">Haftalik maqsad</span>
            </div>
          </div>
        </div>

        {/* TIL TANLASH (IELTS / TOPIK) */}
        <div className="flex items-center justify-between p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <button 
            onClick={() => switchLanguage('en')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 ${
              !isKr ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🇬🇧</span> IELTS Darslari
          </button>
          <button 
            onClick={() => switchLanguage('kr')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 ${
              isKr ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🇰🇷</span> TOPIK Koreys Tili
          </button>
        </div>

        {/* DARAXA VA BALLAR */}
        {!isKr ? (
          <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-600 rounded-[28px] p-5 text-white shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/20">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-indigo-200 font-bold flex items-center gap-1.5">
                  <BarChart3 size={14} /> Diagnostik Ball
                </span>
                <div className="text-3xl font-black mt-1">Band {userProfile.currentBand}</div>
                <span className="text-[10px] text-indigo-100">Cambridge IELTS darajasi</span>
              </div>
              <div className="border-l border-white/20 pl-4">
                <span className="text-[11px] uppercase tracking-wider text-amber-200 font-bold flex items-center gap-1.5">
                  <Target size={14} /> Maqsadli Ball
                </span>
                <div className="text-3xl font-black mt-1 text-amber-300">Band {userProfile.targetBand}</div>
                <span className="text-[10px] text-indigo-100">Oraliq farq: +1.0 ball</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center pt-3 text-xs">
              <div className="bg-white/10 rounded-xl py-2">
                <div className="text-indigo-200 text-[10px] font-semibold">Listening</div>
                <div className="font-black text-sm mt-0.5">7.0</div>
              </div>
              <div className="bg-white/10 rounded-xl py-2">
                <div className="text-indigo-200 text-[10px] font-semibold">Reading</div>
                <div className="font-black text-sm mt-0.5">7.5</div>
              </div>
              <div className="bg-white/10 rounded-xl py-2">
                <div className="text-indigo-200 text-[10px] font-semibold">Writing</div>
                <div className="font-black text-sm mt-0.5">6.5</div>
              </div>
              <div className="bg-white/10 rounded-xl py-2">
                <div className="text-indigo-200 text-[10px] font-semibold">Speaking</div>
                <div className="font-black text-sm mt-0.5">7.0</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-rose-700 via-rose-600 to-indigo-700 rounded-[28px] p-5 text-white shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/20">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-rose-200 font-bold flex items-center gap-1.5">
                  <BarChart3 size={14} /> Hozirgi Daraja
                </span>
                <div className="text-3xl font-black mt-1">2-급 (TOPIK I)</div>
                <span className="text-[10px] text-rose-100">Boshlang'ich daraja</span>
              </div>
              <div className="border-l border-white/20 pl-4">
                <span className="text-[11px] uppercase tracking-wider text-amber-200 font-bold flex items-center gap-1.5">
                  <Target size={14} /> Maqsadli Daraja
                </span>
                <div className="text-3xl font-black mt-1 text-amber-300">4-급 (TOPIK II)</div>
                <span className="text-[10px] text-rose-100">Universitet & Viza</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-3 text-xs">
              <div className="bg-white/10 rounded-xl py-2">
                <div className="text-rose-200 text-[10px] font-semibold">Tinglash (듣기)</div>
                <div className="font-black text-sm mt-0.5">78 ball</div>
              </div>
              <div className="bg-white/10 rounded-xl py-2">
                <div className="text-rose-200 text-[10px] font-semibold">O‘qish (읽기)</div>
                <div className="font-black text-sm mt-0.5">72 ball</div>
              </div>
              <div className="bg-white/10 rounded-xl py-2">
                <div className="text-rose-200 text-[10px] font-semibold">Yozish (쓰기)</div>
                <div className="font-black text-sm mt-0.5">55 ball</div>
              </div>
            </div>
          </div>
        )}

        {/* BUGUNGI KUNLIK REJA */}
        <div className={`${theme.card} border rounded-3xl p-5 space-y-4`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-base flex items-center gap-2">
                <Clock size={18} className="text-indigo-400" /> {isKr ? "Koreys Tili Vazifalari" : "IELTS Dars Rejasi"}
              </h3>
              <p className={`text-xs ${theme.textMuted} mt-0.5`}>Bugun bajarilishi kerak bo‘lgan mashqlar</p>
            </div>
            <span className="text-xs font-black bg-emerald-500/15 text-emerald-400 px-3 py-1 rounded-full">
              {currentDailyPlan.filter(t => t.done).length}/{currentDailyPlan.length} tayyor
            </span>
          </div>

          <div className="space-y-2.5">
            {currentDailyPlan.map(task => (
              <div 
                key={task.id}
                onClick={() => toggleTask(task.id, isKr)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border text-xs cursor-pointer transition active:scale-98 ${
                  task.done 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                    : `${theme.subCard} hover:border-indigo-500/50`
                }`}
              >
                <div className="flex items-center gap-3">
                  {task.done ? <CheckSquare size={20} className="text-emerald-400" /> : <Square size={20} className="text-slate-500" />}
                  <div>
                    <span className={`font-bold text-sm ${task.done ? 'line-through opacity-80' : ''}`}>{task.title}</span>
                    <span className="block text-[11px] text-slate-400 mt-0.5">{task.tag}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[11px] px-2.5 py-1 rounded-lg font-bold ${task.done ? 'bg-emerald-500/20' : 'bg-slate-800'}`}>
                    {task.duration}
                  </span>
                  <span className="block text-[11px] text-amber-400 font-extrabold mt-1">+{task.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MODULLAR */}
        {isKr ? (
          <div>
            <h3 className={`text-xs font-black uppercase tracking-wider ${theme.textMuted} mb-3.5`}>
              Koreys Tili Bo‘limlari
            </h3>
            <div className="grid grid-cols-2 gap-3.5">
              <div 
                onClick={() => setActiveTab('korean_hangul')}
                className={`${theme.card} border rounded-3xl p-4 cursor-pointer group active:scale-95 transition space-y-3`}
              >
                <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-500 flex items-center justify-center font-black text-lg">
                  한
                </div>
                <div>
                  <div className="text-[11px] font-bold text-rose-500 uppercase">Alifbo & O‘qish</div>
                  <h4 className="font-black text-base mt-0.5">Hangul (한글)</h4>
                  <p className={`text-xs ${theme.textMuted} mt-1`}>Ovozli unli va undosh harflar</p>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('tests')}
                className={`${theme.card} border rounded-3xl p-4 cursor-pointer group active:scale-95 transition space-y-3`}
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center font-black text-lg">
                  시험
                </div>
                <div>
                  <div className="text-[11px] font-bold text-indigo-400 uppercase">Haqiqiy Testlar</div>
                  <h4 className="font-black text-base mt-0.5">TOPIK & EPS</h4>
                  <p className={`text-xs ${theme.textMuted} mt-1`}>O‘qish va tinglash savollari</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h3 className={`text-xs font-black uppercase tracking-wider ${theme.textMuted} mb-3.5`}>
              IELTS Ko‘nikmalari
            </h3>
            <div className="grid grid-cols-2 gap-3.5">
              <div 
                onClick={() => setActiveTab('tests')}
                className={`${theme.card} border rounded-3xl p-4 cursor-pointer group active:scale-95 transition space-y-3`}
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                  <BookOpen size={24} />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-blue-400 uppercase">Cambridge 18</div>
                  <h4 className="font-black text-base mt-0.5">Reading Test</h4>
                  <p className={`text-xs ${theme.textMuted} mt-1`}>10 ta savol • 60 daqiqalik taymer</p>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('ai')}
                className={`${theme.card} border rounded-3xl p-4 cursor-pointer group active:scale-95 transition space-y-3`}
              >
                <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-500 flex items-center justify-center">
                  <Mic size={24} />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-rose-500 uppercase">Speaking AI</div>
                  <h4 className="font-black text-base mt-0.5">Speaking Coach</h4>
                  <p className={`text-xs ${theme.textMuted} mt-1`}>Talaffuz va ravonlik tahlili</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  };

  // ==========================================
  // 2. KOREYS TILI HANGUL
  // ==========================================
  const renderHangul = () => (
    <div className="space-y-4 animate-fadeIn pb-8">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-xs text-rose-500 font-extrabold">
          <ArrowLeft size={18} /> Bosh sahifa
        </button>
        <span className="text-xs bg-rose-500/15 text-rose-500 px-3 py-1 rounded-full font-black">한글 기초</span>
      </div>

      <div className={`${theme.card} border rounded-3xl p-5 space-y-2`}>
        <h3 className="font-black text-base text-rose-500">Hangul (한글) — Koreys alifbosi</h3>
        <p className={`text-xs ${theme.textMuted} leading-relaxed`}>
          Har bir harf ustiga bosib, uning talaffuzini eshiting va to'g'ri o'qilishini o'rganing.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {hangulAlphabet.map((item, idx) => (
          <div 
            key={idx}
            onClick={() => speakText(item.sound, 'ko-KR')}
            className={`${theme.card} border rounded-2xl p-4 flex items-center justify-between cursor-pointer active:scale-95 transition hover:border-rose-500`}
          >
            <div>
              <div className="text-3xl font-black text-rose-500">{item.char}</div>
              <div className="text-xs font-bold mt-1">{item.name}</div>
              <div className={`text-[10px] ${theme.textMuted}`}>Masalan: {item.sound}</div>
            </div>
            <button className="p-2.5 rounded-xl bg-rose-500/15 text-rose-500">
              <Volume2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // ==========================================
  // 3. TESTLAR (INGLIZ & KOREYS)
  // ==========================================
  const renderTests = () => {
    const isKr = selectedLanguage === 'kr';

    if (isKr) {
      return (
        <div className="space-y-4 animate-fadeIn pb-8">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-xs text-rose-500 font-extrabold">
              <ArrowLeft size={18} /> Bosh sahifa
            </button>
            <span className="text-xs bg-rose-500/15 text-rose-500 px-3 py-1 rounded-full font-black">TOPIK & EPS</span>
          </div>

          <div className="space-y-3">
            {koreanTopikQuestions.map((q) => (
              <div key={q.id} className={`${theme.card} border rounded-3xl p-5 text-xs space-y-3`}>
                <p className="font-bold text-sm leading-relaxed">{q.question}</p>
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {q.options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setKoreanAnswers({ ...koreanAnswers, [q.id]: opt })}
                      className={`py-3 px-3.5 rounded-2xl text-left border text-xs font-semibold transition ${
                        koreanAnswers[q.id] === opt 
                          ? 'bg-rose-600 text-white font-black border-rose-600' 
                          : `${theme.subCard}`
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {koreanChecked && (
                  <div className={`mt-2 p-3.5 rounded-2xl ${theme.subCard} text-[11px] space-y-1`}>
                    <span className={koreanAnswers[q.id] === q.correct ? "text-emerald-500 font-black" : "text-rose-500 font-black"}>
                      {koreanAnswers[q.id] === q.correct ? "✓ To‘g‘ri javob" : `✗ Xato (To‘g‘risi: ${q.correct})`}
                    </span>
                    <p className={`${theme.textMuted}`}>{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}

            <button 
              onClick={() => setKoreanChecked(true)}
              className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-2xl text-sm transition active:scale-95 shadow-xl"
            >
              Javoblarni Tekshirish va Tahlil Qilish
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4 animate-fadeIn pb-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-xs text-indigo-400 font-extrabold">
            <ArrowLeft size={18} /> Bosh sahifa
          </button>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-indigo-500/15 border border-indigo-500/30 px-3.5 py-1 rounded-xl text-xs font-mono font-black text-indigo-400">
              <Clock size={15} /> {formatTimer(readingTime)}
            </div>
            <button 
              onClick={() => setReadingTimerRunning(!readingTimerRunning)}
              className="p-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
            >
              {readingTimerRunning ? <Pause size={15} /> : <Play size={15} />}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {fullReadingQuestions.map((q, idx) => (
            <div key={q.id} className={`${theme.card} border rounded-3xl p-4 text-xs space-y-2.5`}>
              <div className="flex justify-between items-center">
                <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2.5 py-0.5 rounded-full font-black">
                  {q.type}
                </span>
                <span className="text-slate-500 text-[11px] font-bold">Savol {idx + 1}</span>
              </div>
              <p className="font-bold text-sm leading-snug">{q.question}</p>
              
              <div className="grid grid-cols-1 gap-2 pt-1">
                {q.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setReadingAnswers({ ...readingAnswers, [q.id]: opt })}
                    className={`py-3 px-3.5 rounded-2xl text-left border text-xs font-semibold transition ${
                      readingAnswers[q.id] === opt 
                        ? 'bg-indigo-600 text-white font-black border-indigo-600' 
                        : `${theme.subCard}`
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {readingChecked && (
                <div className={`mt-2 p-3.5 rounded-2xl ${theme.subCard} text-[11px] space-y-1`}>
                  <span className={readingAnswers[q.id] === q.correct ? "text-emerald-500 font-black" : "text-rose-500 font-black"}>
                    {readingAnswers[q.id] === q.correct ? "✓ To‘g‘ri javob" : `✗ Xato (To‘g‘risi: ${q.correct})`}
                  </span>
                  <p className={`${theme.textMuted}`}>{q.explanation}</p>
                </div>
              )}
            </div>
          ))}

          <button 
            onClick={() => setReadingChecked(true)}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-sm transition active:scale-95 shadow-xl"
          >
            IELTS Javoblarini Tekshirish
          </button>
        </div>
      </div>
    );
  };

  // ==========================================
  // 4. ZIYOAI MURABBIY
  // ==========================================
  const renderAi = () => {
    const isKr = selectedLanguage === 'kr';
    return (
      <div className="space-y-4 animate-fadeIn pb-8">
        <div className={`${theme.card} border rounded-3xl p-6 text-center space-y-3.5 shadow-lg`}>
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white mx-auto flex items-center justify-center shadow-xl">
            <Bot size={40} />
          </div>
          <div>
            <h3 className="font-black text-lg">
              {isKr ? "ZiyoAI Koreys Tili Murabbiyi" : "ZiyoAI IELTS Speaking Coach"}
            </h3>
            <p className={`text-xs ${theme.textMuted} mt-0.5`}>
              {isKr ? "Koreyscha talaffuz va kundalik dialoglarni mashq qiling" : "Inglizcha talaffuz va ravonlik tahlili"}
            </p>
          </div>

          <div className={`${theme.subCard} p-3.5 rounded-2xl text-left border text-xs space-y-1`}>
            <div className="text-[10px] text-slate-400 uppercase font-black">
              {isKr ? "Koreyscha gapiring:" : "Inglizcha gapiring:"}
            </div>
            <div className="font-bold text-sm">
              {isKr ? "안녕하세요! 저는 우즈베키스탄에서 온 토히르벡입니다." : "I am from Tashkent, the capital of Uzbekistan."}
            </div>
          </div>

          <button 
            onClick={() => speakText(isKr ? "안녕하세요! 만나서 반갑습니다. 한국어 발음이 아주 좋습니다!" : "That is great! Your pronunciation is excellent.", isKr ? 'ko-KR' : 'en-US')}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-xs transition flex items-center justify-center gap-2"
          >
            <Volume2 size={16} /> AI Murabbiy Javobini Eshitish
          </button>
        </div>
      </div>
    );
  };

  // ==========================================
  // 5. WRITING MODULI
  // ==========================================
  const renderWriting = () => (
    <div className="space-y-4 animate-fadeIn pb-8">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 className="font-black text-base">Writing & Lug'at Studiyasi</h3>
        <span className="text-xs bg-amber-500/15 text-amber-500 px-3 py-1 rounded-full font-black">Academic</span>
      </div>

      <div className={`${theme.card} border rounded-3xl p-5 space-y-2`}>
        <span className="text-amber-500 font-black uppercase text-[10px] tracking-wider">Esse Mavzusi:</span>
        <p className="font-bold text-sm leading-relaxed">
          "Some people argue that technological development leads to the loss of traditional cultures. To what extent do you agree or disagree?"
        </p>
      </div>

      <textarea
        rows={8}
        placeholder="Esse matnini yozing..."
        className={`w-full ${theme.inputBg} rounded-3xl p-4 text-xs outline-none focus:border-indigo-500 leading-relaxed resize-none shadow-inner`}
      />

      <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-sm transition shadow-xl">
        Esseni AI Bilan Baholash
      </button>
    </div>
  );

  // ==========================================
  // 6. SHAXSIY PROFIL (AYLANA SHAKLDA VA TARTIBLI)
  // ==========================================
  const renderProfileOnly = () => (
    <div className="space-y-5 animate-fadeIn pb-8">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 className="font-black text-base">Mening Profilim</h3>
        <button 
          onClick={() => {
            setEditForm(userProfile);
            setIsEditingProfile(true);
          }}
          className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-2xl font-black flex items-center gap-1.5 transition active:scale-95 shadow-md"
        >
          <Edit3 size={15} /> Tahrirlash
        </button>
      </div>

      {/* AYLANA SHAKLDAGI PROFIL RASMI VA BLOKI */}
      <div className={`${theme.card} border rounded-[32px] p-6 text-center space-y-4 shadow-xl relative`}>
        <div className="relative w-32 h-32 mx-auto">
          {userProfile.photoBase64 ? (
            <img 
              src={userProfile.photoBase64} 
              alt={userProfile.name}
              className="w-full h-full rounded-full object-cover border-4 border-indigo-500 shadow-2xl ring-4 ring-indigo-500/20"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 border-4 border-indigo-400 flex items-center justify-center text-4xl font-black text-white shadow-2xl ring-4 ring-indigo-500/20">
              {userProfile.name.charAt(0)}
            </div>
          )}

          {/* Kamera tugmasi (Aylana chetida) */}
          <button 
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-0 right-0 p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-xl border-2 border-slate-900 active:scale-90 transition"
            title="Rasm yuklash"
          >
            <Camera size={16} />
          </button>

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handlePhotoUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        <div>
          <h3 className="text-xl font-black tracking-tight">{userProfile.name}</h3>
          <p className="text-xs text-indigo-400 font-bold mt-0.5">• {userProfile.currentLevel}</p>
        </div>
      </div>

      {/* O‘rganilayotgan Tillar Ro‘yxati */}
      <div className={`${theme.card} border rounded-[28px] p-5 space-y-3.5 text-xs`}>
        <h4 className="font-black text-sm text-slate-200">O‘rganilayotgan Tillar</h4>
        
        <div className="flex justify-between items-center py-2 border-b border-slate-800">
          <span className="text-slate-400 font-semibold flex items-center gap-1.5">
            🇬🇧 IELTS Maqsadi:
          </span>
          <span className="font-black text-indigo-400 text-sm">Band {userProfile.targetBand}</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-slate-800">
          <span className="text-slate-400 font-semibold flex items-center gap-1.5">
            🇰🇷 TOPIK Maqsadi:
          </span>
          <span className="font-black text-rose-400 text-sm">{userProfile.koreanTargetLevel}</span>
        </div>

        <div className="flex justify-between items-center py-2">
          <span className="text-slate-400 font-semibold">Kunlik Streak:</span>
          <span className="font-black text-amber-400 text-sm flex items-center gap-1">
            🔥 {userProfile.streak} kun
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen w-full ${theme.bg} overflow-x-hidden flex flex-col font-sans select-none antialiased transition-colors duration-300 touch-pan-y`}>
      
      {/* HEADER */}
      <header className={`sticky top-0 z-40 ${theme.header} px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition active:scale-95">
            <Menu size={20} strokeWidth={2.5} />
          </button>
          <div>
            <h1 className="text-base font-extrabold text-white tracking-tight leading-tight">
              Bosh sahifa
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">
              Har kuni yangi bilim, yangi imkoniyat.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition active:scale-95"
          >
            {isDarkMode ? <Sun size={19} className="text-amber-400" /> : <Moon size={19} className="text-indigo-400" />}
          </button>

          <button className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition active:scale-95">
            <Bell size={19} />
          </button>

          {/* HEADERDAGI DUMALOQ AVATAR */}
          <button 
            onClick={() => setActiveTab('profile')}
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-indigo-500 shadow-md active:scale-95 transition flex items-center justify-center bg-gradient-to-tr from-indigo-600 to-purple-500 text-white font-black text-sm"
          >
            {userProfile.photoBase64 ? (
              <img src={userProfile.photoBase64} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              userProfile.name.charAt(0)
            )}
          </button>
        </div>
      </header>

      {/* Asosiy Ekran Maydoni */}
      <main className="flex-1 w-full max-w-md mx-auto p-4 pb-44 box-border">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'tests' && renderTests()}
        {activeTab === 'korean_hangul' && renderHangul()}
        {activeTab === 'ai' && renderAi()}
        {activeTab === 'writing' && renderWriting()}
        {activeTab === 'profile' && renderProfileOnly()}
      </main>

      {/* 5 TALIK KATTA VA QULAY PASTKI MENYU */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#121421]/95 border-t border-slate-800 backdrop-blur-2xl px-3 pt-2.5 pb-7 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-between relative px-1">
          
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex-1 flex flex-col items-center py-1 transition active:scale-90 ${
              activeTab === 'home' ? 'text-indigo-400 font-black' : 'text-slate-400'
            }`}
          >
            <Compass size={26} strokeWidth={activeTab === 'home' ? 2.8 : 2} />
            <span className="text-xs mt-1 font-bold">Asosiy</span>
            {activeTab === 'home' && <span className="w-6 h-1 bg-emerald-500 rounded-full mt-0.5"></span>}
          </button>

          <button 
            onClick={() => setActiveTab('tests')}
            className={`flex-1 flex flex-col items-center py-1 transition active:scale-90 ${
              activeTab === 'tests' ? 'text-indigo-400 font-black' : 'text-slate-400'
            }`}
          >
            <BookOpen size={26} strokeWidth={activeTab === 'tests' ? 2.8 : 2} />
            <span className="text-xs mt-1 font-bold">Testlar</span>
            {activeTab === 'tests' && <span className="w-6 h-1 bg-emerald-500 rounded-full mt-0.5"></span>}
          </button>

          {/* O'rtadagi Katta ZiyoAI Tugmasi */}
          <button 
            onClick={() => setActiveTab('ai')}
            className="flex flex-col items-center -mt-8 px-2 active:scale-90 transition group"
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl ring-4 ring-slate-900 transition ${
              activeTab === 'ai' 
                ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 scale-105' 
                : 'bg-gradient-to-tr from-indigo-600 to-blue-600'
            }`}>
              <Bot size={32} />
            </div>
            <span className="text-xs text-indigo-400 font-black mt-1">ZiyoAI</span>
          </button>

          <button 
            onClick={() => setActiveTab('writing')}
            className={`flex-1 flex flex-col items-center py-1 transition active:scale-90 ${
              activeTab === 'writing' ? 'text-indigo-400 font-black' : 'text-slate-400'
            }`}
          >
            <PenTool size={26} strokeWidth={activeTab === 'writing' ? 2.8 : 2} />
            <span className="text-xs mt-1 font-bold">Writing</span>
            {activeTab === 'writing' && <span className="w-6 h-1 bg-emerald-500 rounded-full mt-0.5"></span>}
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex-1 flex flex-col items-center py-1 transition active:scale-90 ${
              activeTab === 'profile' ? 'text-indigo-400 font-black' : 'text-slate-400'
            }`}
          >
            <User size={26} strokeWidth={activeTab === 'profile' ? 2.8 : 2} />
            <span className="text-xs mt-1 font-bold">Profil</span>
            {activeTab === 'profile' && <span className="w-6 h-1 bg-emerald-500 rounded-full mt-0.5"></span>}
          </button>

        </div>
      </div>

      {/* Profil Tahrirlash Modali */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${theme.card} border rounded-3xl p-6 w-full max-w-sm space-y-4 shadow-2xl`}>
            <h3 className="font-black text-base">Profilni Tahrirlash</h3>
            
            <div className="flex items-center gap-3.5">
              {editForm.photoBase64 ? (
                <img src={editForm.photoBase64} alt="Avatar" className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500 shadow-md" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-indigo-600/20 border-2 border-indigo-500/40 flex items-center justify-center font-bold text-indigo-400 text-lg">
                  Rasm
                </div>
              )}
              <button 
                onClick={() => fileInputRef.current.click()}
                className="px-3.5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Upload size={14} /> Galereyadan tanlash
              </button>
            </div>

            <div>
              <label className={`text-xs ${theme.textMuted} block mb-1 font-bold`}>Ismingiz:</label>
              <input 
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className={`w-full ${theme.inputBg} rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-indigo-500`}
              />
            </div>

            <div className="flex gap-2.5 pt-2">
              <button 
                onClick={() => setIsEditingProfile(false)}
                className={`flex-1 py-2.5 ${theme.subCard} rounded-xl text-xs font-bold`}
              >
                Bekor qilish
              </button>
              <button 
                onClick={() => {
                  setUserProfile(editForm);
                  setIsEditingProfile(false);
                }}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
