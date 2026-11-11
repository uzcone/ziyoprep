import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, BookOpen, Headphones, PenTool, Mic, Bot, User, 
  Play, Pause, RotateCcw, CheckCircle2, XCircle, Award, 
  Sparkles, Send, Volume2, ChevronRight, Edit3, ArrowLeft, 
  Layers, Sun, Moon, Target, TrendingUp, Clock, AlertTriangle,
  CheckSquare, Square, FileText, BarChart3, BookmarkCheck,
  Calendar, Cake, ArrowRight, Zap, RefreshCw, Camera, Upload, Check,
  Menu, Bell, ArrowUpRight, GraduationCap, Lock, Star, X, Settings, HelpCircle, LogOut
} from 'lucide-react';

export default function App() {
  // --- 1. TIL VA MAVZU SOZLAMALARI ---
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('ziyoprep_lang') || 'kr';
  });

  const switchLanguage = (lang) => {
    setSelectedLanguage(lang);
    localStorage.setItem('ziyoprep_lang', lang);
    setActiveTab('home');
    setIsSidebarOpen(false);
  };

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

  // --- 2. FOYDALANUVCHI PROFILI (XATOSIZ XAVFSIZ STORAGE) ---
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('ziyoprep_user');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        return {
          name: parsed.name || 'Tokhirbek',
          gender: parsed.gender || 'Erkak',
          birthDate: parsed.birthDate || '2004-05-18',
          photoBase64: (parsed.photoBase64 && parsed.photoBase64.startsWith('data:image')) ? parsed.photoBase64 : '',
          currentBand: parsed.currentBand || '6.5',
          targetBand: parsed.targetBand || '7.5',
          koreanCurrentLevel: parsed.koreanCurrentLevel || '2-급 (Boshlang‘ich)',
          koreanTargetLevel: parsed.koreanTargetLevel || '4-급 (TOPIK II)',
          streak: parsed.streak || 5,
          xp: parsed.xp || 840,
          completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [1]
        };
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
      xp: 840,
      completedLessons: [1]
    };
  });

  useEffect(() => {
    localStorage.setItem('ziyoprep_user', JSON.stringify(userProfile));
  }, [userProfile]);

  // Asosiy sahifa holatlari
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [activeLesson, setActiveLesson] = useState(null);
  const [lessonStep, setLessonStep] = useState('theory'); // 'theory' | 'vocab' | 'quiz'
  const [quizAnswer, setQuizAnswer] = useState(null);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState(userProfile);
  const fileInputRef = useRef(null);

  // --- 3. AKADEMIYA DARSLAR BAZASI ---
  const coursesData = {
    kr: {
      title: "Korean Academy",
      subtitle: "한국어 기초 과정",
      desc: "Koreys tilini noldan mukammal o‘rganish",
      levels: [
        { id: 'beginner', title: 'Beginner (초급 1)', desc: 'Noldan alifbo va asosiy iboralar' },
        { id: 'elementary', title: 'Elementary (초급 2)', desc: 'Kundalik muloqot va fe’l zamonlari' },
        { id: 'intermediate', title: 'Intermediate (중급)', desc: 'TOPIK II va murakkab grammatika' },
        { id: 'advanced', title: 'Advanced (고급)', desc: 'Ish joyi va rasmiy muloqot' }
      ],
      lessons: [
        {
          id: 1,
          level: 'beginner',
          section: '1-bo‘lim: Hangul',
          title: '1-dars: Koreys alifbosi',
          desc: 'Unlilar va undoshlar',
          theory: 'Koreys alifbosi (Hangul) 14 ta asosiy undosh va 10 ta asosiy unlidan iborat. Harflar blok (bo‘g‘in) ko‘rinishida birlashadi.',
          words: [
            { word: '가', meaning: 'Ga (ㄱ + ㅏ)', sound: '가' },
            { word: '나', meaning: 'Na (ㄴ + ㅏ)', sound: '나' },
            { word: '다', meaning: 'Da (ㄷ + ㅏ)', sound: '다' },
            { word: '라', meaning: 'Ra / La (ㄹ + ㅏ)', sound: '라' }
          ],
          quiz: {
            question: "Koreys tilida 'N' tovushini qaysi harf ifodalaydi?",
            options: ["① ㄱ", "② ㄴ", "③ ㄷ", "④ ㄹ"],
            correct: 1,
            explanation: "ㄴ (Niun) harfi o‘zbek tilidagi 'N' tovushini beradi."
          }
        },
        {
          id: 2,
          level: 'beginner',
          section: '1-bo‘lim: Hangul',
          title: '2-dars: Bo‘g‘in tuzish',
          desc: '가, 나, 다, 라… so‘zlari',
          theory: 'Har bir bo‘g‘in kamida bitta undosh va bitta unlidan tashkil topadi. Masalan: ㄱ + ㅏ = 가 (ga).',
          words: [
            { word: '나무', meaning: 'Daraxt (Namu)', sound: '나무' },
            { word: '다리', meaning: 'Ko‘prik / Oyoq (Dari)', sound: '다리' },
            { word: '라디오', meaning: 'Radio (Radio)', sound: '라디오' }
          ],
          quiz: {
            question: "'Daraxt' so‘zining to‘g‘ri koreyscha shakli qaysi?",
            options: ["① 나비", "② 나무", "③ 나라", "④ 다리"],
            correct: 1,
            explanation: "나무 (namu) — daraxt degan ma’noni anglatadi."
          }
        },
        {
          id: 3,
          level: 'beginner',
          section: '2-bo‘lim: Salomlashish',
          title: '3-dars: Rasmiy salomlashish',
          desc: '안녕하세요, 감사합니다',
          theory: 'Koreys tilida hurmat uslubi muhim. Yoshi kattalar va yangi tanishlar bilan gaplashganda xushmuomala qo‘shimchalar qo‘llaniladi.',
          words: [
            { word: '안녕하세요', meaning: 'Assalomu alaykum (Salom)', sound: '안녕하세요' },
            { word: '감사합니다', meaning: 'Rahmat', sound: '감사합니다' },
            { word: '죄송합니다', meaning: 'Kechirasiz (Uzr)', sound: '죄송합니다' }
          ],
          quiz: {
            question: "Eng keng tarqalgan xushmuomala salomlashish iborasini tanlang:",
            options: ["① 안녕", "② 안녕하세요", "③ 잘 가", "④ 고마워"],
            correct: 1,
            explanation: "안녕하세요 — rasmiy va xushmuomala salomlashish iborasi."
          }
        }
      ]
    },
    en: {
      title: "English Academy",
      subtitle: "General & Academic English",
      desc: "Ingliz tilini noldan IELTS 7.5 gacha o‘rganish",
      levels: [
        { id: 'beginner', title: 'Beginner (A1)', desc: 'Alphabet, basic phonics and words' },
        { id: 'elementary', title: 'Elementary (A2)', desc: 'Daily life & Present Simple' },
        { id: 'intermediate', title: 'Intermediate (B1-B2)', desc: 'Complex grammar & Writing' },
        { id: 'advanced', title: 'Advanced (IELTS Prep)', desc: 'Band 7.5–9.0 collocations' }
      ],
      lessons: [
        {
          id: 101,
          level: 'beginner',
          section: 'Unit 1: Foundations',
          title: 'Lesson 1: Greetings & Introductions',
          desc: 'Hello, Nice to meet you',
          theory: 'When meeting someone for the first time, polite introductions form the basis of communication.',
          words: [
            { word: 'Greeting', meaning: 'Salomlashish', sound: 'Greeting' },
            { word: 'Pleasure', meaning: 'Mamnuniyat', sound: 'Pleasure' },
            { word: 'Colleague', meaning: 'Hamkasb', sound: 'Colleague' }
          ],
          quiz: {
            question: "Choose the correct phrase to introduce yourself:",
            options: ["① I am pleased meeting you", "② Nice to meet you", "③ Good look", "④ Goodbye"],
            correct: 1,
            explanation: "'Nice to meet you' is the standard polite greeting."
          }
        }
      ]
    }
  };

  // --- 4. 10 TA TOPIK & EPS TEST SAVOLLARI ---
  const koreanTopikQuestions = [
    {
      id: "kr1",
      question: "1. 저는 아침에 일찍 ________.",
      options: ["① 일어납니다", "② 잤습니다", "③ 만났습니다", "④ 샀습니다"],
      correct: "① 일어납니다",
      audio: "저는 아침에 일찍 일어납니다",
      explanation: "Tarjimasi: 'Men ertalab barvaqt uyg'onaman'. Ertalab bajariladigan odatiy harakat uchun 일어나다 fe'li qo'llaniladi."
    },
    {
      id: "kr2",
      question: "2. [EPS-TOPIK] 공장에서 일할 때 반드시 ________을/를 착용해야 합니다.",
      options: ["① 안전모 (Kaska)", "② 양말 (Paypoq)", "③ 안경 (Ko'zoynak)", "④ 모자 (Oddiy qalpoq)"],
      correct: "① 안전모 (Kaska)",
      audio: "공장에서 일할 때 반드시 안전모를 착용해야 합니다",
      explanation: "Zavod va qurilish maydonlarida boshni himoya qilish uchun xavfsizlik kaskasi (안전모) kiyish majburiydir."
    },
    {
      id: "kr3",
      question: "3. 식당에서 음식을 먹은 후에 돈을 ________.",
      options: ["① 냅니다 (To'layman)", "② 먹습니다", "③ 입습니다", "④ 봅니다"],
      correct: "① 냅니다 (To'layman)",
      audio: "식당에서 음식을 먹은 후에 돈을 냅니다",
      explanation: "Pul to'lamoq birikmasi koreys tilida '돈을 내다' deyiladi."
    },
    {
      id: "kr4",
      question: "4. 어제 비가 와서 날씨가 아주 ________.",
      options: ["① 추웠습니다 (Sovuq edi)", "② 맛있었습니다", "③ 넓었습니다", "④ 조용합니다"],
      correct: "① 추웠습니다 (Sovuq edi)",
      audio: "어제 비가 와서 날씨가 아주 추웠습니다",
      explanation: "Kecha (어제) yomg'ir yog'gani sababli o'tgan zamonda 'havo sovuq edi' (추웠습니다) bo'ladi."
    },
    {
      id: "kr5",
      question: "5. [EPS-TOPIK] 물건을 포장할 때 쓰는 상자를 ________(으)로 닫으세요.",
      options: ["① 테이프 (Skotch)", "② 빗자루 (Supurgi)", "③ 장갑 (Qo'lqop)", "④ 마스크"],
      correct: "① 테이프 (Skotch)",
      audio: "물건을 포장할 때 쓰는 상자를 테이프로 닫으세요",
      explanation: "Yuklarni qadoqlashda qutilar (상자) skotch (테이프) bilan yopiladi."
    }
  ];

  const [koreanAnswers, setKoreanAnswers] = useState({});
  const [koreanChecked, setKoreanChecked] = useState(false);

  // Ovoz berish
  const speakText = (text, lang = selectedLanguage === 'kr' ? 'ko-KR' : 'en-US') => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();
    const clean = text.replace(/[\(\)①②③④]/g, '');
    const ut = new SpeechSynthesisUtterance(clean);
    ut.lang = lang;
    ut.rate = 0.9;
    window.speechSynthesis.speak(ut);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("Rasm hajmi 3MB dan oshmasligi kerak.");
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

  const currentCourse = coursesData[selectedLanguage] || coursesData.kr;
  const activeLessonsList = currentCourse.lessons.filter(l => l.level === selectedLevel);

  // Mavzu ranglari
  const theme = {
    bg: isDarkMode ? 'bg-[#0b0c16] text-slate-100' : 'bg-slate-900 text-slate-100',
    card: 'bg-[#151728] border-slate-800 shadow-xl',
    subCard: 'bg-[#1b1e34] border-slate-700/60',
    header: 'bg-[#0e101f]/95 border-b border-slate-800/80 backdrop-blur-xl',
    textMuted: 'text-slate-400',
    navBg: 'bg-[#121424]/95 border-t border-slate-800 backdrop-blur-2xl shadow-2xl',
    inputBg: 'bg-slate-900 border-slate-700 text-white'
  };

  // ==========================================
  // 1. ASOSIY BOSH SAHIFA
  // ==========================================
  const renderHome = () => {
    const isKr = selectedLanguage === 'kr';

    return (
      <div className="space-y-5 animate-fadeIn pb-6">

        {/* YOUR LANGUAGE JOURNEY BANNERI */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#261f5c] via-[#1a1a40] to-[#12132b] p-6 text-white border border-indigo-500/25 shadow-2xl">
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full border border-indigo-400/10 pointer-events-none"></div>

          <div className="flex items-start justify-between relative z-10">
            <div className="space-y-3 max-w-[62%]">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300 block">
                {currentCourse.title.toUpperCase()}
              </span>
              
              <div className="space-y-0.5">
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  Salom, {userProfile.name}! 👋
                </h2>
                <h3 className="text-xl font-extrabold tracking-tight text-white">
                  Bugun nimani o‘rganamiz?
                </h3>
              </div>

              <p className="text-xs text-indigo-200/80 leading-relaxed font-normal">
                {currentCourse.desc}
              </p>

              <button 
                onClick={() => setActiveTab('academy')}
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
                    strokeDashoffset={251.2 - (251.2 * 72) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black tracking-tight text-white">72%</span>
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
            <span>🇬🇧</span> English Academy
          </button>
          <button 
            onClick={() => switchLanguage('kr')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 ${
              isKr ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🇰🇷</span> Korean Academy
          </button>
        </div>

        {/* BOSQICHLAR TIZIMI */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-sm uppercase tracking-wider text-slate-300">
              {currentCourse.title} Bosqichlari
            </h3>
            <button 
              onClick={() => setActiveTab('academy')}
              className="text-xs font-bold text-indigo-400 hover:underline"
            >
              Barcha darslar
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {currentCourse.levels.map(lvl => (
              <div 
                key={lvl.id}
                onClick={() => {
                  setSelectedLevel(lvl.id);
                  setActiveTab('academy');
                }}
                className={`${theme.card} border rounded-3xl p-4 cursor-pointer active:scale-95 transition hover:border-indigo-500/50 space-y-2`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">
                    {lvl.id === 'beginner' ? '🌱' : lvl.id === 'elementary' ? '🌿' : lvl.id === 'intermediate' ? '🌳' : '🎓'}
                  </span>
                  <span className="text-[10px] bg-indigo-500/15 text-indigo-400 font-black px-2 py-0.5 rounded-full">
                    Faol
                  </span>
                </div>
                <div>
                  <h4 className="font-black text-sm text-white">{lvl.title}</h4>
                  <p className={`text-[11px] ${theme.textMuted} mt-0.5 leading-snug`}>{lvl.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IMTIHON TAYYORGARLIK */}
        <div 
          onClick={() => setActiveTab('tests')}
          className={`${theme.card} border rounded-3xl p-5 flex items-center justify-between cursor-pointer hover:border-indigo-500 transition shadow-sm`}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Award size={26} />
            </div>
            <div>
              <div className="text-[10px] text-indigo-400 font-black uppercase tracking-wider">
                {isKr ? 'TOPIK & EPS Imtihoni' : 'Cambridge IELTS Mock'}
              </div>
              <h4 className="font-black text-base mt-0.5 text-white">
                {isKr ? 'Haqiqiy 10 Ta TOPIK Testlari' : 'Full Reading & Audio Test'}
              </h4>
            </div>
          </div>
          <ChevronRight size={22} className={theme.textMuted} />
        </div>

      </div>
    );
  };

  // ==========================================
  // 2. AKADEMIYA DARSLAR RO'YXATI
  // ==========================================
  const renderAcademy = () => {
    return (
      <div className="space-y-5 animate-fadeIn pb-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-1.5 text-xs text-indigo-400 font-extrabold bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl active:scale-95"
          >
            <ArrowLeft size={16} /> Bosh sahifa
          </button>
          <span className="text-xs bg-indigo-500/15 text-indigo-400 px-3 py-1 rounded-full font-black">
            {currentCourse.title}
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {currentCourse.levels.map(lvl => (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevel(lvl.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition ${
                selectedLevel === lvl.id 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : `${theme.subCard} text-slate-400 hover:text-white`
              }`}
            >
              {lvl.title}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <div className="px-1">
            <h3 className="font-black text-base text-white">{currentCourse.subtitle}</h3>
            <p className={`text-xs ${theme.textMuted} mt-0.5`}>Qadamma-qadam amaliy darslar</p>
          </div>

          {activeLessonsList.length > 0 ? (
            activeLessonsList.map(lesson => {
              const completedList = userProfile.completedLessons || [];
              const isCompleted = completedList.includes(lesson.id);

              return (
                <div 
                  key={lesson.id}
                  onClick={() => {
                    setActiveLesson(lesson);
                    setLessonStep('theory');
                    setQuizAnswer(null);
                    setActiveTab('lesson_detail');
                  }}
                  className={`${theme.card} border rounded-3xl p-4.5 flex items-center justify-between cursor-pointer active:scale-98 transition hover:border-indigo-500/50 shadow-md`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${
                      isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-indigo-500/20 text-indigo-400'
                    }`}>
                      {isCompleted ? <CheckCircle2 size={24} /> : <BookOpen size={24} />}
                    </div>
                    <div>
                      <span className="text-[10px] text-indigo-400 font-bold uppercase">{lesson.section}</span>
                      <h4 className="font-black text-sm text-white mt-0.5">{lesson.title}</h4>
                      <p className={`text-xs ${theme.textMuted} mt-0.5`}>{lesson.desc}</p>
                    </div>
                  </div>
                  
                  <span className="text-[10px] bg-emerald-500/15 text-emerald-400 font-black px-2.5 py-1 rounded-full">
                    Bepul
                  </span>
                </div>
              );
            })
          ) : (
            <div className={`${theme.card} border rounded-3xl p-8 text-center space-y-2`}>
              <Award size={32} className="mx-auto text-indigo-400" />
              <h4 className="font-bold text-sm text-white">Bu bosqich darslari tez orada ochiladi</h4>
              <p className={`text-xs ${theme.textMuted}`}>Beginner bo‘limi darslarini o‘rganishni davom ettiring.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ==========================================
  // 3. INTERAKTIV DARS JARAYONI
  // ==========================================
  const renderLessonDetail = () => {
    if (!activeLesson) return null;

    return (
      <div className="space-y-5 animate-fadeIn pb-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <button 
            onClick={() => setActiveTab('academy')}
            className="flex items-center gap-1.5 text-xs text-indigo-400 font-extrabold bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl active:scale-95"
          >
            <ArrowLeft size={16} /> Darslar
          </button>
          <span className="text-xs font-black text-slate-300">
            {activeLesson.title}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs font-bold">
          <button 
            onClick={() => setLessonStep('theory')}
            className={`py-2.5 rounded-2xl transition ${lessonStep === 'theory' ? 'bg-indigo-600 text-white' : `${theme.subCard} text-slate-400`}`}
          >
            Qoida
          </button>
          <button 
            onClick={() => setLessonStep('vocab')}
            className={`py-2.5 rounded-2xl transition ${lessonStep === 'vocab' ? 'bg-indigo-600 text-white' : `${theme.subCard} text-slate-400`}`}
          >
            So‘zlar
          </button>
          <button 
            onClick={() => setLessonStep('quiz')}
            className={`py-2.5 rounded-2xl transition ${lessonStep === 'quiz' ? 'bg-indigo-600 text-white' : `${theme.subCard} text-slate-400`}`}
          >
            Test
          </button>
        </div>

        {lessonStep === 'theory' && (
          <div className={`${theme.card} border rounded-3xl p-6 space-y-4`}>
            <div className="flex items-center gap-2 text-indigo-400 font-black text-xs uppercase tracking-wider">
              <Sparkles size={16} /> Dars Nazariyasi
            </div>
            <h3 className="font-black text-lg text-white">{activeLesson.title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed font-normal bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              {activeLesson.theory}
            </p>
            <button 
              onClick={() => setLessonStep('vocab')}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-xs transition shadow-lg flex items-center justify-center gap-2"
            >
              Keyingi: Yangi So‘zlar <ArrowRight size={16} />
            </button>
          </div>
        )}

        {lessonStep === 'vocab' && (
          <div className="space-y-3">
            <div className="px-1">
              <h4 className="font-black text-sm text-white">Yangi so‘zlar va Audio Talaffuz:</h4>
              <p className={`text-xs ${theme.textMuted}`}>So‘zlarni eshitish uchun ustiga bosing</p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {activeLesson.words.map((w, idx) => (
                <div 
                  key={idx}
                  onClick={() => speakText(w.sound)}
                  className={`${theme.card} border rounded-2xl p-4 flex items-center justify-between cursor-pointer active:scale-98 transition hover:border-indigo-500`}
                >
                  <div className="flex items-center gap-3">
                    <button className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-400">
                      <Volume2 size={20} />
                    </button>
                    <div>
                      <div className="text-lg font-black text-white">{w.word}</div>
                      <div className={`text-xs ${theme.textMuted}`}>{w.meaning}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-indigo-400">Eshitish 🔊</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setLessonStep('quiz')}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-xs transition shadow-lg flex items-center justify-center gap-2 mt-2"
            >
              Keyingi: Testga o‘tish <ArrowRight size={16} />
            </button>
          </div>
        )}

        {lessonStep === 'quiz' && (
          <div className={`${theme.card} border rounded-3xl p-6 space-y-4`}>
            <div className="flex items-center gap-2 text-indigo-400 font-black text-xs uppercase tracking-wider">
              <CheckCircle2 size={16} /> Yakuniy Test
            </div>
            <h4 className="font-black text-base text-white">{activeLesson.quiz.question}</h4>

            <div className="space-y-2 pt-1">
              {activeLesson.quiz.options.map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => setQuizAnswer(i)}
                  className={`w-full py-3.5 px-4 rounded-2xl text-left border text-xs font-bold transition ${
                    quizAnswer === i 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                      : `${theme.subCard} text-slate-300`
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {quizAnswer !== null && (
              <div className={`p-3.5 rounded-2xl text-xs ${
                quizAnswer === activeLesson.quiz.correct ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
              }`}>
                <div className="font-bold">
                  {quizAnswer === activeLesson.quiz.correct ? "To‘g‘ri javob! 🎉" : "Noto‘g‘ri javob"}
                </div>
                <div className="mt-1 text-slate-300">{activeLesson.quiz.explanation}</div>
              </div>
            )}

            <button 
              onClick={() => {
                if (quizAnswer === activeLesson.quiz.correct) {
                  setUserProfile(prev => {
                    const currentCompleted = prev.completedLessons || [];
                    return {
                      ...prev,
                      xp: prev.xp + 50,
                      completedLessons: [...new Set([...currentCompleted, activeLesson.id])]
                    };
                  });
                  alert("Tabriklaymiz! Dars muvaffaqiyatli yakunlandi (+50 XP qo‘shildi).");
                  setActiveTab('academy');
                } else {
                  alert("Iltimos, to‘g‘ri javobni tanlang!");
                }
              }}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl text-xs transition shadow-lg"
            >
              Darsni Tugatish va Natijani Saqlash
            </button>
          </div>
        )}
      </div>
    );
  };

  // ==========================================
  // 4. TESTLAR MARKAZI (TOPIK VA IELTS)
  // ==========================================
  const renderTests = () => {
    return (
      <div className="space-y-4 animate-fadeIn pb-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <button 
            onClick={() => setActiveTab('home')} 
            className="flex items-center gap-1.5 text-xs text-indigo-400 font-extrabold bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl active:scale-95"
          >
            <ArrowLeft size={16} /> Bosh sahifa
          </button>
          <span className="text-xs bg-indigo-500/15 text-indigo-400 px-3 py-1 rounded-full font-black">
            TOPIK & EPS Imtihon Testlari
          </span>
        </div>

        <div className="space-y-3">
          {koreanTopikQuestions.map((q) => (
            <div key={q.id} className={`${theme.card} border rounded-3xl p-5 text-xs space-y-3`}>
              <div className="flex items-start justify-between gap-2">
                <p className="font-bold text-sm leading-relaxed text-white">{q.question}</p>
                <button 
                  onClick={() => speakText(q.audio, 'ko-KR')}
                  className="p-2 bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-400 rounded-xl shrink-0"
                  title="Savolni tinglash"
                >
                  <Volume2 size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-1">
                {q.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setKoreanAnswers({ ...koreanAnswers, [q.id]: opt })}
                    className={`py-3 px-3.5 rounded-2xl text-left border text-xs font-semibold transition ${
                      koreanAnswers[q.id] === opt 
                        ? 'bg-indigo-600 text-white font-black border-indigo-600' 
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
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-sm transition active:scale-95 shadow-xl"
          >
            Javoblarni Tekshirish va Tahlil Qilish
          </button>
        </div>
      </div>
    );
  };

  // ==========================================
  // 5. ZIYOAI SHAXSIY MURABBIY
  // ==========================================
  const renderAi = () => (
    <div className="space-y-4 animate-fadeIn pb-8">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <button 
          onClick={() => setActiveTab('home')} 
          className="flex items-center gap-1.5 text-xs text-indigo-400 font-extrabold bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl active:scale-95"
        >
          <ArrowLeft size={16} /> Bosh sahifa
        </button>
        <span className="text-xs bg-indigo-500/15 text-indigo-400 px-3 py-1 rounded-full font-black">AI Voice Coach</span>
      </div>

      <div className={`${theme.card} border rounded-3xl p-6 text-center space-y-3.5 shadow-lg`}>
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white mx-auto flex items-center justify-center shadow-xl">
          <Bot size={40} />
        </div>
        <div>
          <h3 className="font-black text-lg text-white">ZiyoAI Murabbiy</h3>
          <p className={`text-xs ${theme.textMuted} mt-0.5`}>
            {selectedLanguage === 'kr' ? "Koreys tilida ovozli muloqot va talaffuz mashqlari" : "Ingliz tili Speaking va Writing AI murabbiyi"}
          </p>
        </div>

        <button 
          onClick={() => speakText(selectedLanguage === 'kr' ? "안녕하세요! 한국어 공부를 시작해 볼까요?" : "Hello! Let us practice English speaking today.")}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-xs transition flex items-center justify-center gap-2 shadow-lg"
        >
          <Volume2 size={16} /> AI Murabbiy bilan ovozli mashq qilish
        </button>
      </div>
    </div>
  );

  // ==========================================
  // 6. PROFIL VA NATIJALAR
  // ==========================================
  const renderProfileOnly = () => (
    <div className="space-y-5 animate-fadeIn pb-8">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 className="font-black text-base text-white">Mening Profilim</h3>
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

          <button 
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-0 right-0 p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-xl border-2 border-slate-900 active:scale-90 transition"
          >
            <Camera size={16} />
          </button>
          <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
        </div>

        <div>
          <h3 className="text-xl font-black tracking-tight text-white">{userProfile.name}</h3>
          <p className="text-xs text-indigo-400 font-bold mt-0.5">• {userProfile.currentLevel || 'B2 Upper-Intermediate'}</p>
        </div>
      </div>

      <div className={`${theme.card} border rounded-[28px] p-5 space-y-3.5 text-xs`}>
        <h4 className="font-black text-sm text-slate-200">Ta’lim Natijalari & Progress</h4>
        
        <div className="flex justify-between items-center py-2 border-b border-slate-800">
          <span className="text-slate-400 font-semibold">Tugallangan Darslar:</span>
          <span className="font-black text-emerald-400 text-sm">{(userProfile.completedLessons || []).length} ta dars</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-slate-800">
          <span className="text-slate-400 font-semibold">To‘plangan Tajriba (XP):</span>
          <span className="font-black text-amber-400 text-sm">{userProfile.xp} XP</span>
        </div>

        <div className="flex justify-between items-center py-2">
          <span className="text-slate-400 font-semibold">Kunlik Ketma-ketlik:</span>
          <span className="font-black text-rose-400 text-sm flex items-center gap-1">
            🔥 {userProfile.streak} kun
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen w-full ${theme.bg} overflow-x-hidden flex flex-col font-sans select-none antialiased transition-colors duration-300 touch-pan-y`}>
      
      {/* 1. ASOSIY HEADER (FAQAT HOME DA CHIQADI) */}
      {activeTab === 'home' && (
        <header className={`sticky top-0 z-40 ${theme.header} px-4 py-3 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            {/* ☰ MENYU TUGMASI (DRAWER OCHILADI) */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition active:scale-95"
            >
              <Menu size={20} strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="text-base font-extrabold text-white tracking-tight leading-tight">
                Ziyo Academy
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
      )}

      {/* 2. INTERAKTIV YON PANEL (DRAWER MENYU) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            onClick={() => setIsSidebarOpen(false)} 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          ></div>
          <div className="relative w-72 max-w-[80%] bg-[#121424] border-r border-slate-800 p-5 flex flex-col justify-between shadow-2xl z-10 animate-fadeIn">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white text-sm">
                    Z
                  </div>
                  <span className="font-black text-base text-white">Ziyo Menu</span>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Ta’lim Tili</span>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => switchLanguage('en')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      selectedLanguage === 'en' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    🇬🇧 English
                  </button>
                  <button 
                    onClick={() => switchLanguage('kr')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      selectedLanguage === 'kr' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    🇰🇷 Korean
                  </button>
                </div>
              </div>

              <div className="space-y-1 text-xs font-semibold">
                <button 
                  onClick={() => { setActiveTab('academy'); setIsSidebarOpen(false); }}
                  className="w-full p-3 rounded-2xl flex items-center gap-3 text-slate-300 hover:bg-slate-900 hover:text-white"
                >
                  <GraduationCap size={18} className="text-indigo-400" /> Akademiya Darslari
                </button>
                <button 
                  onClick={() => { setActiveTab('tests'); setIsSidebarOpen(false); }}
                  className="w-full p-3 rounded-2xl flex items-center gap-3 text-slate-300 hover:bg-slate-900 hover:text-white"
                >
                  <Award size={18} className="text-emerald-400" /> Imtihon Testlari
                </button>
                <button 
                  onClick={() => { setActiveTab('ai'); setIsSidebarOpen(false); }}
                  className="w-full p-3 rounded-2xl flex items-center gap-3 text-slate-300 hover:bg-slate-900 hover:text-white"
                >
                  <Bot size={18} className="text-purple-400" /> ZiyoAI Murabbiy
                </button>
                <button 
                  onClick={() => { setActiveTab('profile'); setIsSidebarOpen(false); }}
                  className="w-full p-3 rounded-2xl flex items-center gap-3 text-slate-300 hover:bg-slate-900 hover:text-white"
                >
                  <User size={18} className="text-amber-400" /> Shaxsiy Profil
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-500">
              ZiyoPrep Platformasi v2.5
            </div>
          </div>
        </div>
      )}

      {/* 3. ASOSIY MAYDON (CRASH BO'LMASLIGI UCHUN XAVFSIZ ROUTING) */}
      <main className="flex-1 w-full max-w-md mx-auto p-4 pb-44 box-border">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'academy' && renderAcademy()}
        {activeTab === 'lesson_detail' && renderLessonDetail()}
        {activeTab === 'tests' && renderTests()}
        {activeTab === 'ai' && renderAi()}
        {activeTab === 'profile' && renderProfileOnly()}
      </main>

      {/* 4. 5 TALIK KATTA PASTKI MENYU */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#121424]/95 border-t border-slate-800 backdrop-blur-2xl px-3 pt-2.5 pb-7 shadow-2xl">
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
            onClick={() => setActiveTab('academy')}
            className={`flex-1 flex flex-col items-center py-1 transition active:scale-90 ${
              activeTab === 'academy' || activeTab === 'lesson_detail' ? 'text-indigo-400 font-black' : 'text-slate-400'
            }`}
          >
            <GraduationCap size={26} strokeWidth={2.8} />
            <span className="text-xs mt-1 font-bold">Akademiya</span>
            {(activeTab === 'academy' || activeTab === 'lesson_detail') && <span className="w-6 h-1 bg-emerald-500 rounded-full mt-0.5"></span>}
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
            onClick={() => setActiveTab('tests')}
            className={`flex-1 flex flex-col items-center py-1 transition active:scale-90 ${
              activeTab === 'tests' ? 'text-indigo-400 font-black' : 'text-slate-400'
            }`}
          >
            <Award size={26} strokeWidth={2.8} />
            <span className="text-xs mt-1 font-bold">Imtihon</span>
            {activeTab === 'tests' && <span className="w-6 h-1 bg-emerald-500 rounded-full mt-0.5"></span>}
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex-1 flex flex-col items-center py-1 transition active:scale-90 ${
              activeTab === 'profile' ? 'text-indigo-400 font-black' : 'text-slate-400'
            }`}
          >
            <User size={26} strokeWidth={2.8} />
            <span className="text-xs mt-1 font-bold">Profil</span>
            {activeTab === 'profile' && <span className="w-6 h-1 bg-emerald-500 rounded-full mt-0.5"></span>}
          </button>

        </div>
      </div>

      {/* Profil Tahrirlash Modali */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${theme.card} border rounded-3xl p-6 w-full max-w-sm space-y-4 shadow-2xl`}>
            <h3 className="font-black text-base text-white">Profilni Tahrirlash</h3>
            
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
                className="flex-1 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
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
