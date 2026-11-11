import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, BookOpen, Headphones, PenTool, Mic, Bot, User, 
  Play, Pause, RotateCcw, CheckCircle2, XCircle, Award, 
  Sparkles, Send, Volume2, ChevronRight, Edit3, ArrowLeft, 
  Layers, Sun, Moon, Target, TrendingUp, Clock, AlertTriangle,
  CheckSquare, Square, FileText, BarChart3, BookmarkCheck,
  Calendar, Cake, ArrowRight, Zap, RefreshCw, Camera, Upload, Check,
  Menu, Bell, ArrowUpRight, GraduationCap, Lock, Unlock, Star
} from 'lucide-react';

export default function App() {
  // --- 1. TIL VA AKADEMIYA TANLOVI ---
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('ziyoprep_lang') || 'kr'; // 'en' yoki 'kr'
  });

  const switchLanguage = (lang) => {
    setSelectedLanguage(lang);
    localStorage.setItem('ziyoprep_lang', lang);
    setActiveTab('home');
  };

  // --- 2. MAVZU REJIMI ---
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

  // --- 3. FOYDALANUVCHI PROFILI VA PROGRESS ---
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
      koreanCurrentLevel: '2-급',
      koreanTargetLevel: '4-급 (TOPIK II)',
      streak: 5,
      xp: 840,
      completedLessons: [1, 2] // Bajarilgan darslar ID lari
    };
  });

  useEffect(() => {
    localStorage.setItem('ziyoprep_user', JSON.stringify(userProfile));
  }, [userProfile]);

  // Navigatsiya holati: 'home' | 'academy' | 'lesson_detail' | 'tests' | 'ai' | 'profile'
  const [activeTab, setActiveTab] = useState('home');
  const [selectedLevel, setSelectedLevel] = useState('beginner'); // 'beginner' | 'elementary' | 'intermediate' | 'advanced'
  const [activeLesson, setActiveLesson] = useState(null);
  const [lessonStep, setLessonStep] = useState('theory'); // 'theory' | 'vocab' | 'typing' | 'quiz' | 'result'
  const [typedInput, setTypedInput] = useState('');
  const [typingFeedback, setTypingFeedback] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState(null);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState(userProfile);
  const fileInputRef = useRef(null);

  // --- 4. AKADEMIYA DARSLAR BAZASI (KOREAN & ENGLISH) ---
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
          isFree: true,
          theory: 'Koreys alifbosi 14 ta asosiy undosh va 10 ta asosiy unlidan iborat. Harflar blok (bo‘g‘in) holida birlashadi.',
          words: [
            { word: '가', meaning: 'Ga (Unli + Undosh)', sound: '가' },
            { word: '나', meaning: 'Na', sound: '나' },
            { word: '다', meaning: 'Da', sound: '다' },
            { word: '라', meaning: 'Ra / La', sound: '라' }
          ],
          typingWord: { prompt: "Bo'g'inni yozing: 'Ga'", correct: '가' },
          quiz: {
            question: "Koreys tilida 'N' tovushini qaysi harf ifodalaydi?",
            options: ["① ㄱ", "② ㄴ", "③ ㄷ", "④ ㄹ"],
            correct: 1,
            explanation: "ㄴ (Niun) harfi o'zbek tilidagi 'N' tovushini beradi."
          }
        },
        {
          id: 2,
          level: 'beginner',
          section: '1-bo‘lim: Hangul',
          title: '2-dars: Bo‘g‘in tuzish',
          desc: '가, 나, 다, 라…',
          isFree: true,
          theory: 'Har bir bo‘g‘in kamida bitta undosh va bitta unlidan tashkil topadi. Masalan: ㄱ + ㅏ = 가.',
          words: [
            { word: '나무', meaning: 'Daraxt (Namu)', sound: '나무' },
            { word: '다리', meaning: 'Ko‘prik / Oyoq (Dari)', sound: '다리' },
            { word: '라디오', meaning: 'Radio (Radio)', sound: '라디오' }
          ],
          typingWord: { prompt: "Daraxt so‘zini koreyscha yozing (Namu):", correct: '나무' },
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
          isFree: true,
          theory: 'Koreys tilida hurmat uslubi juda muhim. Yangi tanishlar va yoshi kattalarga rasmiy xushmuomala qo‘shimchalari qo‘llaniladi.',
          words: [
            { word: '안녕하세요', meaning: 'Assalomu alaykum (Salom)', sound: '안녕하세요' },
            { word: '감사합니다', meaning: 'Rahmat', sound: '감사합니다' },
            { word: '죄송합니다', meaning: 'Kechirasiz (Uzr)', sound: '죄송합니다' }
          ],
          typingWord: { prompt: "'Rahmat' so‘zini yozing:", correct: '감사합니다' },
          quiz: {
            question: "Eng keng tarqalgan xushmuomala salomlashish iborasini tanlang:",
            options: ["① 안녕", "② 안녕하세요", "③ 잘 가", "④ 고마워"],
            correct: 1,
            explanation: "안녕하세요 — kattalar va jamoat joylarida rasmiy salomlashish uchun eng to‘g‘ri ibora."
          }
        }
      ]
    },
    en: {
      title: "English Academy",
      subtitle: "General & Academic English",
      desc: "Ingliz tilini noldan IELTS 7.5 gacha bosqichma-bosqich o‘rganish",
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
          isFree: true,
          theory: 'When meeting someone for the first time, polite introductions form the basis of communication.',
          words: [
            { word: 'Greeting', meaning: 'Salomlashish', sound: 'Greeting' },
            { word: 'Pleasure', meaning: 'Mamnuniyat', sound: 'Pleasure' },
            { word: 'Colleague', meaning: 'Hamkasb', sound: 'Colleague' }
          ],
          typingWord: { prompt: "Write 'Salomlashish' in English:", correct: 'Greeting' },
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

  // Ovoz berish
  const speakText = (text, lang = selectedLanguage === 'kr' ? 'ko-KR' : 'en-US') => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();
    const ut = new SpeechSynthesisUtterance(text);
    ut.lang = lang;
    ut.rate = 0.9;
    window.speechSynthesis.speak(ut);
  };

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

  const currentCourse = coursesData[selectedLanguage];
  const activeLessonsList = currentCourse.lessons.filter(l => l.level === selectedLevel);

  // Ranglar va mavzu uslubi
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
                <span>Akademiyaga kirish</span>
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

        {/* DUOLINGO USLUBIDAGI BOSQICHLAR BLOKI */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-sm uppercase tracking-wider text-slate-300">
              {currentCourse.title} Bosqichlari
            </h3>
            <button 
              onClick={() => setActiveTab('academy')}
              className="text-xs font-bold text-indigo-400 hover:underline"
            >
              Hammasini ko‘rish
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
                  <span className="text-lg">
                    {lvl.id === 'beginner' ? '🌱' : lvl.id === 'elementary' ? '🌿' : lvl.id === 'intermediate' ? '🌳' : '🎓'}
                  </span>
                  <span className="text-[10px] bg-indigo-500/15 text-indigo-400 font-black px-2 py-0.5 rounded-full">
                    {lvl.id === 'beginner' ? 'Ochiq' : 'Faol'}
                  </span>
                </div>
                <div>
                  <h4 className="font-black text-sm">{lvl.title}</h4>
                  <p className={`text-[11px] ${theme.textMuted} mt-0.5 leading-snug`}>{lvl.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IMTIHON TAYYORGARLIK (IELTS / TOPIK) BANNERI */}
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
              <h4 className="font-black text-base mt-0.5">
                {isKr ? 'Haqiqiy TOPIK I/II Testlari' : 'Full 10-Question Reading & Audio'}
              </h4>
            </div>
          </div>
          <ChevronRight size={22} className={theme.textMuted} />
        </div>

      </div>
    );
  };

  // ==========================================
  // 2. AKADEMIYA DARSLAR RO'YXATI (KOREAN / ENGLISH)
  // ==========================================
  const renderAcademy = () => {
    return (
      <div className="space-y-5 animate-fadeIn pb-8">
        {/* Yuqori Header */}
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

        {/* Bosqichlar Tabs (Beginner / Elementary...) */}
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

        {/* Darslar Ro'yxati */}
        <div className="space-y-3">
          <div className="px-1">
            <h3 className="font-black text-base text-white">{currentCourse.subtitle}</h3>
            <p className={`text-xs ${theme.textMuted} mt-0.5`}>Qadamma-qadam darslar va amaliyot</p>
          </div>

          {activeLessonsList.length > 0 ? (
            activeLessonsList.map(lesson => {
              const isCompleted = userProfile.completedLessons.includes(lesson.id);
              return (
                <div 
                  key={lesson.id}
                  onClick={() => {
                    setActiveLesson(lesson);
                    setLessonStep('theory');
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
                  
                  <div className="text-right">
                    <span className="text-[10px] bg-emerald-500/15 text-emerald-400 font-black px-2.5 py-1 rounded-full">
                      Bepul
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={`${theme.card} border rounded-3xl p-8 text-center space-y-2`}>
              <Lock size={32} className="mx-auto text-slate-500" />
              <h4 className="font-bold text-sm">Bu bosqich darslari tayyorlanmoqda</h4>
              <p className={`text-xs ${theme.textMuted}`}>Beginner bo‘limi darslarini o‘rganishni davom ettiring.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ==========================================
  // 3. INTERAKTIV DARS JARAYONI (THEORY -> VOCAB -> TYPING -> QUIZ)
  // ==========================================
  const renderLessonDetail = () => {
    if (!activeLesson) return null;

    return (
      <div className="space-y-5 animate-fadeIn pb-8">
        {/* Yuqori Header va Qadamlar */}
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

        {/* Dars Navigatsiyasi (Qadamlar) */}
        <div className="grid grid-cols-4 gap-1.5 text-[11px] font-bold">
          <button 
            onClick={() => setLessonStep('theory')}
            className={`py-2 rounded-xl transition ${lessonStep === 'theory' ? 'bg-indigo-600 text-white' : `${theme.subCard} text-slate-400`}`}
          >
            Qoida
          </button>
          <button 
            onClick={() => setLessonStep('vocab')}
            className={`py-2 rounded-xl transition ${lessonStep === 'vocab' ? 'bg-indigo-600 text-white' : `${theme.subCard} text-slate-400`}`}
          >
            So‘zlar
          </button>
          <button 
            onClick={() => setLessonStep('typing')}
            className={`py-2 rounded-xl transition ${lessonStep === 'typing' ? 'bg-indigo-600 text-white' : `${theme.subCard} text-slate-400`}`}
          >
            Yozish
          </button>
          <button 
            onClick={() => setLessonStep('quiz')}
            className={`py-2 rounded-xl transition ${lessonStep === 'quiz' ? 'bg-indigo-600 text-white' : `${theme.subCard} text-slate-400`}`}
          >
            Test
          </button>
        </div>

        {/* 1-QADAM: GRAMMATIKA VA NAZARIYA */}
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

        {/* 2-QADAM: SO'ZLAR VA AUDIO TALAFFUZ */}
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
              onClick={() => setLessonStep('typing')}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-xs transition shadow-lg flex items-center justify-center gap-2 mt-2"
            >
              Keyingi: Yozish Mashqi <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* 3-QADAM: YOZISH MASHQLARI (INTERACTIVE TYPING) */}
        {lessonStep === 'typing' && (
          <div className={`${theme.card} border rounded-3xl p-6 space-y-4`}>
            <div className="flex items-center gap-2 text-indigo-400 font-black text-xs uppercase tracking-wider">
              <PenTool size={16} /> Yozish Mashqi
            </div>
            <h4 className="font-bold text-base text-white">{activeLesson.typingWord.prompt}</h4>
            
            <input 
              type="text"
              value={typedInput}
              onChange={(e) => setTypedInput(e.target.value)}
              placeholder="Javobni kiriting..."
              className={`w-full ${theme.inputBg} rounded-2xl p-4 text-base font-bold outline-none focus:border-indigo-500`}
            />

            {typingFeedback && (
              <div className={`p-3 rounded-2xl text-xs font-bold ${
                typingFeedback.correct ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              }`}>
                {typingFeedback.message}
              </div>
            )}

            <button 
              onClick={() => {
                if (typedInput.trim() === activeLesson.typingWord.correct) {
                  setTypingFeedback({ correct: true, message: "A'lo darajada! To‘g‘ri yozildi ✓" });
                  speakText(activeLesson.typingWord.correct);
                } else {
                  setTypingFeedback({ correct: false, message: `Xato! To‘g‘risi: '${activeLesson.typingWord.correct}'` });
                }
              }}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-xs transition shadow-lg"
            >
              Tekshirish
            </button>

            <button 
              onClick={() => setLessonStep('quiz')}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl text-xs transition"
            >
              Keyingi: Testga o‘tish
            </button>
          </div>
        )}

        {/* 4-QADAM: TEST (4 TALIK TANLOV) */}
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
                  setUserProfile(prev => ({
                    ...prev,
                    xp: prev.xp + 50,
                    completedLessons: [...new Set([...prev.completedLessons, activeLesson.id])]
                  }));
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
            Imtihon Markazi
          </span>
        </div>

        <div className="space-y-3">
          {coursesData.kr.lessons[0].quiz && (
            <div className={`${theme.card} border rounded-3xl p-5 text-xs space-y-3`}>
              <div className="font-black text-sm text-white">TOPIK I/II va IELTS Haqiqiy Imtihon Testlari:</div>
              <p className={theme.textMuted}>Har bir savol imtihon standartlariga to‘liq mos keladi.</p>
              <button 
                onClick={() => {
                  setSelectedLevel('beginner');
                  setActiveTab('academy');
                }}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-xs transition shadow-md"
              >
                Akademiya Darslari orqali Testlarni Boshlash
              </button>
            </div>
          )}
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
          <h3 className="font-black text-lg">ZiyoAI Coach</h3>
          <p className={`text-xs ${theme.textMuted} mt-0.5`}>
            {selectedLanguage === 'kr' ? "Koreys tilida ovozli muloqot va talaffuz mashqlari" : "Ingliz tili Speaking va Writing AI murabbiyi"}
          </p>
        </div>

        <button 
          onClick={() => speakText(selectedLanguage === 'kr' ? "안녕하세요! 한국어 공부를 시작해 볼까요?" : "Hello! Let us practice English speaking today.")}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-xs transition flex items-center justify-center gap-2"
        >
          <Volume2 size={16} /> AI Murabbiy bilan gaplashish
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
          <h3 className="text-xl font-black tracking-tight">{userProfile.name}</h3>
          <p className="text-xs text-indigo-400 font-bold mt-0.5">• {userProfile.currentLevel}</p>
        </div>
      </div>

      <div className={`${theme.card} border rounded-[28px] p-5 space-y-3.5 text-xs`}>
        <h4 className="font-black text-sm text-slate-200">Ta’lim Natijalari & Progress</h4>
        
        <div className="flex justify-between items-center py-2 border-b border-slate-800">
          <span className="text-slate-400 font-semibold">Tugallangan Darslar:</span>
          <span className="font-black text-emerald-400 text-sm">{userProfile.completedLessons.length} ta dars</span>
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
      
      {/* HEADER */}
      {activeTab === 'home' && (
        <header className={`sticky top-0 z-40 ${theme.header} px-4 py-3 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition active:scale-95">
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

            <button className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition active:scale-95">
              <Bell size={19} />
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

      {/* Asosiy Ekran Maydoni */}
      <main className="flex-1 w-full max-w-md mx-auto p-4 pb-44 box-border">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'academy' && renderAcademy()}
        {activeTab === 'lesson_detail' && renderLessonDetail()}
        {activeTab === 'tests' && renderTests()}
        {activeTab === 'ai' && renderAi()}
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
