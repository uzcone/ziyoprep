import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, BookOpen, Headphones, PenTool, Mic, Bot, User, 
  Play, Pause, RotateCcw, CheckCircle2, XCircle, Award, 
  Sparkles, Send, Volume2, ChevronRight, Edit3, ArrowLeft, 
  Layers, Sun, Moon, Target, TrendingUp, Clock, AlertTriangle,
  CheckSquare, Square, FileText, BarChart3, BookmarkCheck,
  Calendar, Camera, Cake, ShieldCheck, HelpCircle, Check
} from 'lucide-react';

export default function App() {
  // --- 1. REJIM (DARK / LIGHT) ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('ziyoprep_theme');
    if (saved !== null) return saved === 'dark';
    const hour = new Date().getHours();
    return hour < 7 || hour >= 19;
  });

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('ziyoprep_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // --- 2. ONBOARDING & DIAGNOSTIK TEST (DARAJANI ANIQLASH) ---
  const [hasCompletedPlacement, setHasCompletedPlacement] = useState(() => {
    return localStorage.getItem('ziyoprep_placement_done') === 'true';
  });
  const [placementStep, setPlacementStep] = useState(0);
  const [placementScore, setPlacementScore] = useState(0);

  const placementQuestions = [
    {
      q: "If I ________ you, I would focus more on academic collocations for Band 8.",
      options: ["was", "were", "am", "had been"],
      correct: 1,
      level: "Grammar & Conditionals"
    },
    {
      q: "Choose the synonym for 'mitigate':",
      options: ["alleviate", "intensify", "aggravate", "postpone"],
      correct: 0,
      level: "Academic Vocabulary"
    },
    {
      q: "The phenomenon is ________ occurring across multiple ecosystems.",
      options: ["ubiquitous", "ubiquitously", "ubiquity", "ubiquitousness"],
      correct: 1,
      level: "Word Formation & Syntax"
    }
  ];

  // --- 3. FOYDALANUVCHI PROFILI (TUG'ILGAN KUN, JINS, RASM, BALLAR) ---
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('ziyoprep_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      name: 'Tokhirbek',
      gender: 'Erkak',
      birthDate: '2004-05-18',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      currentBand: '6.0',
      targetBand: '7.5',
      currentLevel: 'B2 Upper-Intermediate',
      streak: 5,
      completedTests: 14,
      weakSkill: 'Reading: Matching Headings (42% aniqlik)'
    };
  });

  const [scores, setScores] = useState(() => {
    const saved = localStorage.getItem('ziyoprep_scores');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return { listening: '6.5', reading: '6.0', writing: '5.5', speaking: '6.0' };
  });

  const [dailyTasks, setDailyTasks] = useState(() => {
    const saved = localStorage.getItem('ziyoprep_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 1, title: 'Academic Reading: Matching Headings', duration: '20 daq', done: false },
      { id: 2, title: 'Listening Section 2: Note Completion', duration: '15 daq', done: false },
      { id: 3, title: 'Band 7.5–9.0 uchun lug‘at: 5 ta Collocation', duration: '10 daq', done: true }
    ];
  });

  const [showBirthdayCard, setShowBirthdayCard] = useState(false);

  // Tug'ilgan kunni tekshirish
  useEffect(() => {
    if (userProfile.birthDate) {
      const today = new Date();
      const bDate = new Date(userProfile.birthDate);
      if (today.getMonth() === bDate.getMonth() && today.getDate() === bDate.getDate()) {
        setShowBirthdayCard(true);
      }
    }
  }, [userProfile.birthDate]);

  useEffect(() => {
    localStorage.setItem('ziyoprep_user', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('ziyoprep_tasks', JSON.stringify(dailyTasks));
  }, [dailyTasks]);

  const toggleTask = (id) => {
    setDailyTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // Navigatsiya: 'home' | 'tests' | 'ai' | 'profile' | 'reading_test' | 'listening_test' | 'vocab'
  const [activeTab, setActiveTab] = useState('home');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState(userProfile);

  // --- 4. READING 60 DAQ TAYMER VA TEST ---
  const [readingTime, setReadingTime] = useState(3600);
  const [readingTimerRunning, setReadingTimerRunning] = useState(false);
  const [readingAnswers, setReadingAnswers] = useState({});
  const [readingChecked, setReadingChecked] = useState(false);
  const [highlightEvidence, setHighlightEvidence] = useState(false);

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

  // --- 5. ZIYOAI REJIMLARI ---
  const [aiMode, setAiMode] = useState('consultant'); // 'consultant' | 'essay' | 'speaking' | 'grammar'
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: `Assalomu alaykum ${userProfile.name}! ZiyoAI shaxsiy IELTS murabbiyingizman. Bugun qaysi yo'nalish bo'yicha shug'ullanamiz?` }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isAiListening, setIsAiListening] = useState(false);

  const sendAiMessage = () => {
    if (!inputMsg.trim()) return;
    const newMsgs = [...chatMessages, { role: 'user', text: inputMsg }];
    setChatMessages(newMsgs);
    setInputMsg("");

    setTimeout(() => {
      let reply = "";
      if (aiMode === 'essay') {
        reply = "Esse tahlili (Band 6.5): Kirish qismi yaxshi, biroq 'Coherence and Cohesion' bo'yicha paragraflar orasidagi bog'lovchilar kam. 'On the one hand' va 'Conversely' iboralarini qo'shing.";
      } else if (aiMode === 'speaking') {
        reply = "Speaking maslahati: Part 2 da pauzalarni kamaytirish uchun 'That is a captivating question, let me reflect on that...' kabi tabiiy birikmalardan foydalaning.";
      } else if (aiMode === 'grammar') {
        reply = "Grammatika xatosi aniqlandi: 3-gapda 'In spite of' birikmasidan keyin fe'lga '-ing' qo'shilishi yoki ot birikmasi kelishi lozim.";
      } else {
        reply = `Hozirgi natijangiz Band ${userProfile.currentBand}. Maqsadli Band ${userProfile.targetBand} ga erishish uchun bugun Reading Matching Headings bo'yicha 20 daqiqa mashq qilishni tavsiya qilaman.`;
      }

      setChatMessages(prev => [...prev, { role: 'ai', text: reply }]);
      if ('speechSynthesis' in window) {
        const ut = new SpeechSynthesisUtterance(reply);
        ut.lang = 'uz-UZ';
        window.speechSynthesis.speak(ut);
      }
    }, 600);
  };

  const toggleSpeech = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Brauzeringiz ovozli yozishni qo'llab-quvvatlamaydi.");
      return;
    }
    if (isAiListening) {
      setIsAiListening(false);
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = 'en-US';
    rec.onstart = () => setIsAiListening(true);
    rec.onresult = (e) => {
      setInputMsg(e.results[0][0].transcript);
      setIsAiListening(false);
    };
    rec.onerror = () => setIsAiListening(false);
    rec.onend = () => setIsAiListening(false);
    rec.start();
  };

  // Dinamik Ranglar
  const theme = {
    bg: isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900',
    card: isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white border-slate-200 shadow-sm',
    subCard: isDarkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200',
    header: isDarkMode ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-200',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-slate-500',
    navBg: isDarkMode ? 'bg-slate-950/95 border-slate-800/90' : 'bg-white/95 border-slate-200/90',
    inputBg: isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
  };

  // ==========================================
  // ONBOARDING DIAGNOSTIKA
  // ==========================================
  if (!hasCompletedPlacement) {
    const q = placementQuestions[placementStep];
    return (
      <div className={`min-h-screen w-full ${theme.bg} flex flex-col justify-center items-center p-5`}>
        <div className="w-full max-w-md bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 border border-indigo-500/30 rounded-3xl p-6 text-white shadow-2xl space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full font-bold">
              Diagnostik Test • {placementStep + 1}/{placementQuestions.length}
            </span>
            <span className="text-xs text-indigo-400 font-semibold">{q.level}</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-black tracking-tight leading-snug">
              ZiyoPrep’ga xush kelibsiz! Boshlang'ich darajangizni aniqlab olamiz:
            </h3>
            <p className="text-sm font-medium text-slate-200 pt-2">{q.q}</p>
          </div>

          <div className="space-y-2.5 pt-2">
            {q.options.map((opt, i) => (
              <button
                key={opt}
                onClick={() => {
                  const isCorrect = i === q.correct;
                  const newScore = isCorrect ? placementScore + 1 : placementScore;
                  setPlacementScore(newScore);

                  if (placementStep + 1 < placementQuestions.length) {
                    setPlacementStep(placementStep + 1);
                  } else {
                    let calculatedBand = "5.5";
                    if (newScore === 2) calculatedBand = "6.5";
                    if (newScore === 3) calculatedBand = "7.5";

                    setUserProfile(prev => ({
                      ...prev,
                      currentBand: calculatedBand,
                      currentLevel: calculatedBand >= '7.0' ? 'C1 Advanced' : 'B2 Upper-Intermediate'
                    }));
                    localStorage.setItem('ziyoprep_placement_done', 'true');
                    setHasCompletedPlacement(true);
                  }
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-left text-sm font-semibold transition active:scale-95"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // BOSH SAHIFA
  // ==========================================
  const renderHome = () => (
    <div className="space-y-4 animate-fadeIn">
      {/* Profil va Streak */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={userProfile.photoUrl} 
              alt={userProfile.name}
              className="w-13 h-13 rounded-2xl object-cover border-2 border-indigo-500 shadow-sm" 
            />
            <span className="absolute -bottom-1 -right-1 text-xs bg-indigo-600 text-white rounded-full p-0.5">
              {userProfile.gender === 'Ayol' ? '👩‍🎓' : '👨‍🎓'}
            </span>
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight">{userProfile.name}</h2>
            <span className="text-xs text-indigo-500 font-semibold">{userProfile.currentLevel}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/25 px-3 py-1.5 rounded-full">
          <span className="text-xs font-bold text-amber-500">🔥 {userProfile.streak} kun streak</span>
        </div>
      </div>

      {/* TUG'ILGAN KUN TABRIKNOMASI */}
      {showBirthdayCard && (
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-4 text-white shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
              🎂
            </div>
            <div>
              <h4 className="font-bold text-sm">Tug‘ilgan kuningiz bilan, {userProfile.name}! 🎉</h4>
              <p className="text-xs text-pink-100">ZiyoPrep jamoasi nomidan sizga Band {userProfile.targetBand} tilaymiz!</p>
            </div>
          </div>
          <button onClick={() => setShowBirthdayCard(false)} className="text-xs bg-white/20 px-2 py-1 rounded-lg">✕</button>
        </div>
      )}

      {/* HAQIQIY BALL vs MAQSADLI BALL */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-700 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/20">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-indigo-200 font-semibold flex items-center gap-1">
              <BarChart3 size={13} /> Hozirgi Natija
            </span>
            <div className="text-3xl font-black mt-1">Band {userProfile.currentBand}</div>
            <span className="text-[10px] text-indigo-100">Diagnostik test xulosasi</span>
          </div>
          <div className="border-l border-white/20 pl-4">
            <span className="text-[11px] uppercase tracking-wider text-amber-200 font-semibold flex items-center gap-1">
              <Target size={13} /> Maqsadli Ball
            </span>
            <div className="text-3xl font-black mt-1 text-amber-300">Band {userProfile.targetBand}</div>
            <span className="text-[10px] text-indigo-100">Oraliq farq: +{(parseFloat(userProfile.targetBand) - parseFloat(userProfile.currentBand)).toFixed(1)} ball</span>
          </div>
        </div>

        {/* 4 Skill */}
        <div className="grid grid-cols-4 gap-2 text-center pt-3 text-xs">
          <div>
            <div className="text-indigo-200 text-[11px]">Listening</div>
            <div className="font-bold text-sm">{scores.listening}</div>
          </div>
          <div>
            <div className="text-indigo-200 text-[11px]">Reading</div>
            <div className="font-bold text-sm">{scores.reading}</div>
          </div>
          <div>
            <div className="text-indigo-200 text-[11px]">Writing</div>
            <div className="font-bold text-sm">{scores.writing}</div>
          </div>
          <div>
            <div className="text-indigo-200 text-[11px]">Speaking</div>
            <div className="font-bold text-sm">{scores.speaking}</div>
          </div>
        </div>
      </div>

      {/* ZAIF TOMONLARIM OGOHLANTIRISHI */}
      <div className="bg-rose-500/10 border border-rose-500/25 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle size={20} className="text-rose-500 shrink-0 mt-0.5" />
        <div className="flex-1 text-xs">
          <div className="font-bold text-rose-500 text-sm">Zaif tomoningiz aniqlandi:</div>
          <p className={`${theme.textMuted} mt-0.5 font-medium`}>{userProfile.weakSkill}</p>
          <button 
            onClick={() => setActiveTab('reading_test')}
            className="mt-2 text-xs font-bold text-rose-600 dark:text-rose-400 underline flex items-center gap-1"
          >
            Hozir ushbu bo'limni kuchaytirish <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* BUGUNGI REJA */}
      <div className={`${theme.card} border rounded-2xl p-4 space-y-3`}>
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm flex items-center gap-2">
            <Clock size={16} className="text-indigo-500" /> Bugungi Kunlik Reja
          </h3>
          <span className="text-[11px] font-semibold text-emerald-500">
            {dailyTasks.filter(t => t.done).length} / {dailyTasks.length} bajarildi
          </span>
        </div>

        <div className="space-y-2">
          {dailyTasks.map(task => (
            <div 
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition ${
                task.done 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' 
                  : `${theme.subCard} hover:border-indigo-500/50`
              }`}
            >
              <div className="flex items-center gap-2.5">
                {task.done ? <CheckSquare size={18} className="text-emerald-500" /> : <Square size={18} className="text-slate-400" />}
                <span className={task.done ? 'line-through opacity-80' : 'font-medium'}>{task.title}</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${task.done ? 'bg-emerald-500/20' : 'bg-slate-200 dark:bg-slate-700'}`}>
                {task.duration}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ZIYOAI MURABBIY */}
      <div 
        onClick={() => setActiveTab('ai')}
        className={`${theme.card} border rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:border-indigo-500 transition group`}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md">
            <Bot size={24} />
          </div>
          <div>
            <h4 className="font-bold text-sm group-hover:text-indigo-500 transition flex items-center gap-1.5">
              ZiyoAI Shaxsiy Murabbiy <Sparkles size={15} className="text-amber-400" />
            </h4>
            <p className={`text-xs ${theme.textMuted}`}>Ovozli suhbat, esse tahlili va zaif tomonlarni yo'qotish</p>
          </div>
        </div>
        <ChevronRight size={20} className={`${theme.textMuted} group-hover:text-indigo-500 transition`} />
      </div>

      {/* SURATLI BO'LIMLAR */}
      <div>
        <h3 className={`text-xs font-bold uppercase tracking-wider ${theme.textMuted} mb-3`}>IELTS Ko'nikmalari</h3>
        <div className="grid grid-cols-2 gap-3">
          <div 
            onClick={() => setActiveTab('reading_test')}
            className={`${theme.card} border rounded-2xl overflow-hidden cursor-pointer group active:scale-95 transition`}
          >
            <div className="h-24 w-full relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80" 
                alt="Reading"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
              />
              <span className="absolute top-2 left-2 bg-blue-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                60 daq
              </span>
            </div>
            <div className="p-3">
              <h4 className="font-bold text-sm">Academic Reading</h4>
              <p className={`text-[11px] ${theme.textMuted}`}>Headings & TFNG test</p>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('tests')}
            className={`${theme.card} border rounded-2xl overflow-hidden cursor-pointer group active:scale-95 transition`}
          >
            <div className="h-24 w-full relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80" 
                alt="Listening"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
              />
              <span className="absolute top-2 left-2 bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                Section 1–4
              </span>
            </div>
            <div className="p-3">
              <h4 className="font-bold text-sm">Listening Audio</h4>
              <p className={`text-[11px] ${theme.textMuted}`}>Britaniya aksenti</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // READING TESTI (MATCHING HEADINGS + TFNG)
  // ==========================================
  const renderReadingTest = () => (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between pb-2 border-b border-slate-700/40">
        <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-xs text-indigo-500 font-bold">
          <ArrowLeft size={16} /> Chiqish
        </button>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-indigo-500/15 border border-indigo-500/30 px-3 py-1 rounded-xl text-xs font-mono font-bold text-indigo-500">
            <Clock size={14} /> {formatTimer(readingTime)}
          </div>
          <button 
            onClick={() => setReadingTimerRunning(!readingTimerRunning)}
            className="p-1.5 bg-indigo-600 text-white rounded-lg text-xs"
          >
            {readingTimerRunning ? <Pause size={14} /> : <Play size={14} />}
          </button>
        </div>
      </div>

      <div className={`${theme.card} border rounded-2xl p-4 text-xs space-y-3 leading-relaxed max-h-72 overflow-y-auto`}>
        <div className="flex justify-between items-center pb-2 border-b border-slate-700/20">
          <span className="font-black text-sm text-indigo-500">Cambridge Academic Reading</span>
          <button 
            onClick={() => setHighlightEvidence(!highlightEvidence)}
            className={`text-[11px] px-2.5 py-1 rounded-lg border font-bold transition ${
              highlightEvidence ? 'bg-amber-500/20 text-amber-500 border-amber-500/40' : 'bg-slate-200 dark:bg-slate-800'
            }`}
          >
            {highlightEvidence ? "Asoslar belgilandi ✓" : "Matndan dalillarni ajratish"}
          </button>
        </div>

        <div>
          <h5 className="font-bold text-sm mb-1 text-slate-300">Paragraph A</h5>
          <p>
            {highlightEvidence ? (
              <span>
                Recent neuroimaging trials demonstrate that bilingual individuals consistently display elevated cognitive agility. <mark className="bg-amber-300/40 text-inherit p-0.5 rounded">Far from creating linguistic interference, navigating between discrete semantic frameworks strengthens executive control and mental flexibility</mark>.
              </span>
            ) : (
              "Recent neuroimaging trials demonstrate that bilingual individuals consistently display elevated cognitive agility. Far from creating linguistic interference, navigating between discrete semantic frameworks strengthens executive control and mental flexibility."
            )}
          </p>
        </div>

        <div>
          <h5 className="font-bold text-sm mb-1 text-slate-300">Paragraph B</h5>
          <p>
            {highlightEvidence ? (
              <span>
                Structural MRI scans reveal enhanced volume in the left inferior parietal cortex among multilingual adults. <mark className="bg-amber-300/40 text-inherit p-0.5 rounded">Crucially, longitudinal monitoring indicates these neuroprotective adaptations persist well into older age</mark>, effectively postponing neurodegenerative deterioration.
              </span>
            ) : (
              "Structural MRI scans reveal enhanced volume in the left inferior parietal cortex among multilingual adults. Crucially, longitudinal monitoring indicates these neuroprotective adaptations persist well into older age, effectively postponing neurodegenerative deterioration."
            )}
          </p>
        </div>
      </div>

      {/* Savollar */}
      <div className="space-y-3">
        <div className={`${theme.card} border rounded-2xl p-4 text-xs space-y-2`}>
          <p className="font-bold">1. Paragraph A uchun mos sarlavhani tanlang:</p>
          {["i. Linguistic conflict", "ii. Enhanced mental flexibility and control", "iii. Financial burden"].map(opt => (
            <button
              key={opt}
              onClick={() => setReadingAnswers({ ...readingAnswers, q1: opt })}
              className={`w-full py-2 px-3 rounded-xl text-left border transition ${readingAnswers.q1 === opt ? 'bg-indigo-600 text-white font-bold' : `${theme.subCard}`}`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className={`${theme.card} border rounded-2xl p-4 text-xs space-y-2`}>
          <p className="font-bold">2. Bilingualism accelerates mental decline in older age.</p>
          {["TRUE", "FALSE", "NOT GIVEN"].map(opt => (
            <button
              key={opt}
              onClick={() => setReadingAnswers({ ...readingAnswers, q2: opt })}
              className={`w-full py-2 px-3 rounded-xl text-left border transition ${readingAnswers.q2 === opt ? 'bg-indigo-600 text-white font-bold' : `${theme.subCard}`}`}
            >
              {opt}
            </button>
          ))}
        </div>

        <button 
          onClick={() => {
            setReadingChecked(true);
            setHighlightEvidence(true);
          }}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition active:scale-95 shadow-md"
        >
          Natijalarni Tekshirish va Xatolar Tahlili
        </button>

        {readingChecked && (
          <div className={`${theme.subCard} p-3 rounded-xl border text-xs space-y-1.5`}>
            <div className="font-bold text-emerald-500 flex items-center gap-1.5">
              <CheckCircle2 size={16} /> Tahlil Xulosasi:
            </div>
            <p>1-savol: <strong>ii. Enhanced mental flexibility</strong> — To'g'ri!</p>
            <p>2-savol: <strong>FALSE</strong> (Matnda: kognitiv buzilishlarni 4.5 yilga kechiktiradi deyilgan).</p>
          </div>
        )}
      </div>
    </div>
  );

  // ==========================================
  // ZIYOAI MURABBIY (4 TA ALOHIDA REJIM BILAN)
  // ==========================================
  const renderAiChat = () => (
    <div className="h-full flex flex-col space-y-3 animate-fadeIn">
      <div className="flex items-center justify-between pb-2 border-b border-slate-700/40">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
            <Bot size={22} />
          </div>
          <div>
            <h3 className="font-bold text-sm">ZiyoAI Shaxsiy Murabbiy</h3>
            <span className="text-[11px] text-emerald-500 font-semibold">● IELTS Band {userProfile.targetBand} tayyorgarligi</span>
          </div>
        </div>
      </div>

      {/* Rejimlar tanlovi */}
      <div className="grid grid-cols-4 gap-1.5 text-[11px]">
        {[
          { id: 'consultant', label: 'Murabbiy' },
          { id: 'essay', label: 'Esse Tahlil' },
          { id: 'speaking', label: 'Speaking' },
          { id: 'grammar', label: 'Grammar' }
        ].map(m => (
          <button
            key={m.id}
            onClick={() => setAiMode(m.id)}
            className={`py-1.5 rounded-xl font-bold transition text-center ${
              aiMode === m.id ? 'bg-indigo-600 text-white shadow-sm' : `${theme.subCard} ${theme.textMuted}`
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs max-h-[55vh]">
        {chatMessages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : `${theme.card} border rounded-tl-none`
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-slate-700/30 flex items-center gap-2">
        <button 
          onClick={toggleSpeech}
          className={`p-3 rounded-xl transition ${isAiListening ? 'bg-rose-600 text-white animate-pulse' : `${theme.subCard}`}`}
        >
          <Mic size={20} />
        </button>
        <input 
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendAiMessage()}
          placeholder={`${aiMode} bo'yicha savolingizni yozing...`}
          className={`flex-1 ${theme.inputBg} rounded-xl px-3.5 py-3 text-xs outline-none focus:border-indigo-500`}
        />
        <button 
          onClick={sendAiMessage}
          className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition active:scale-95"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );

  // ==========================================
  // SHAXSIY PROFIL & SOZLAMALAR
  // ==========================================
  const renderProfile = () => (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between pb-2 border-b border-slate-700/40">
        <h3 className="font-bold text-base">O'quvchi Profili</h3>
        <button 
          onClick={() => {
            setEditForm(userProfile);
            setIsEditingProfile(true);
          }}
          className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-xl font-bold flex items-center gap-1"
        >
          <Edit3 size={14} /> Tahrirlash
        </button>
      </div>

      {/* Profil Karta */}
      <div className={`${theme.card} border rounded-3xl p-5 text-center space-y-3`}>
        <div className="relative w-20 h-20 mx-auto">
          <img 
            src={userProfile.photoUrl} 
            alt={userProfile.name}
            className="w-full h-full rounded-2xl object-cover border-2 border-indigo-500 shadow-lg"
          />
        </div>
        <div>
          <h3 className="text-xl font-black">{userProfile.name}</h3>
          <p className={`text-xs ${theme.textMuted}`}>{userProfile.gender} • {userProfile.currentLevel}</p>
        </div>
      </div>

      {/* Ma'lumotlar ro'yxati */}
      <div className={`${theme.card} border rounded-2xl p-4 space-y-3 text-xs`}>
        <h4 className="font-bold text-sm">Shaxsiy & Akademik Ko'rsatkichlar</h4>
        
        <div className="flex justify-between py-2 border-b border-slate-700/20">
          <span className={theme.textMuted}>Tug‘ilgan sana:</span>
          <span className="font-bold flex items-center gap-1">
            <Cake size={14} className="text-pink-500" /> {userProfile.birthDate}
          </span>
        </div>

        <div className="flex justify-between py-2 border-b border-slate-700/20">
          <span className={theme.textMuted}>Hozirgi Diagnostik Ball:</span>
          <span className="font-bold text-indigo-500">Band {userProfile.currentBand}</span>
        </div>

        <div className="flex justify-between py-2 border-b border-slate-700/20">
          <span className={theme.textMuted}>Maqsadli IELTS Ball:</span>
          <span className="font-bold text-amber-500">Band {userProfile.targetBand}</span>
        </div>

        <div className="flex justify-between py-2 border-b border-slate-700/20">
          <span className={theme.textMuted}>Ketma-ketlik:</span>
          <span className="font-bold text-amber-500">🔥 {userProfile.streak} kun</span>
        </div>

        <div className="flex justify-between py-2">
          <span className={theme.textMuted}>Tugallangan testlar soni:</span>
          <span className="font-bold text-emerald-500">{userProfile.completedTests} ta</span>
        </div>
      </div>

      <button 
        onClick={() => {
          localStorage.removeItem('ziyoprep_placement_done');
          setHasCompletedPlacement(false);
          setPlacementStep(0);
          setPlacementScore(0);
        }}
        className="w-full py-3 rounded-2xl border border-indigo-500/30 text-indigo-500 font-bold text-xs"
      >
        Diagnostik Testni Qayta Topshirish
      </button>
    </div>
  );

  return (
    <div className={`min-h-screen w-full ${theme.bg} flex flex-col font-sans select-none antialiased transition-colors duration-300`}>
      
      {/* Yuqori Header */}
      <header className={`sticky top-0 z-40 ${theme.header} backdrop-blur-md border-b px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white text-sm shadow-md">
            Z
          </div>
          <span className="font-black text-lg tracking-tight">Ziyo<span className="text-indigo-500">Prep</span></span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-xl ${theme.subCard} border transition active:scale-95`}
          >
            {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
          </button>
        </div>
      </header>

      {/* Asosiy Kontent Maydoni (Pastdan yetarli masofa bilan) */}
      <main className="flex-1 w-full max-w-lg mx-auto p-4 pb-32">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'tests' && renderReadingTest()}
        {activeTab === 'reading_test' && renderReadingTest()}
        {activeTab === 'ai' && renderAiChat()}
        {activeTab === 'profile' && renderProfile()}
      </main>

      {/* 4 TA ANIQ BO'LINGAN NAVIGATSIYA */}
      <nav className={`fixed bottom-0 left-0 right-0 ${theme.navBg} backdrop-blur-xl border-t z-50 pb-6 pt-2`}>
        <div className="max-w-lg mx-auto flex justify-around items-center px-3">
          
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1.5 py-1 px-3 rounded-2xl transition active:scale-95 ${
              activeTab === 'home' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : `${theme.textMuted}`
            }`}
          >
            <Compass size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
            <span className="text-xs font-medium">Bosh Sahifa</span>
          </button>

          <button 
            onClick={() => setActiveTab('tests')}
            className={`flex flex-col items-center gap-1.5 py-1 px-3 rounded-2xl transition active:scale-95 ${
              activeTab === 'tests' || activeTab === 'reading_test' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : `${theme.textMuted}`
            }`}
          >
            <BookOpen size={24} strokeWidth={activeTab === 'tests' ? 2.5 : 2} />
            <span className="text-xs font-medium">Testlar</span>
          </button>

          <button 
            onClick={() => setActiveTab('ai')}
            className="flex flex-col items-center -mt-6 group"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition transform active:scale-95 ${
              activeTab === 'ai' 
                ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/30' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}>
              <Bot size={28} />
            </div>
            <span className="text-xs text-indigo-500 font-bold mt-1">ZiyoAI</span>
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1.5 py-1 px-3 rounded-2xl transition active:scale-95 ${
              activeTab === 'profile' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : `${theme.textMuted}`
            }`}
          >
            <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
            <span className="text-xs font-medium">Profil</span>
          </button>

        </div>
      </nav>

      {/* PROFILNI TAHRIRLASH MODALI */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${theme.card} border rounded-3xl p-5 w-full max-w-sm space-y-3.5 shadow-2xl`}>
            <h3 className="font-bold text-base">Profil Ma'lumotlari</h3>
            
            <div>
              <label className={`text-xs ${theme.textMuted} block mb-1 font-medium`}>Ismingiz:</label>
              <input 
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className={`w-full ${theme.inputBg} rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-indigo-500`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={`text-xs ${theme.textMuted} block mb-1 font-medium`}>Jinsi:</label>
                <select
                  value={editForm.gender}
                  onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                  className={`w-full ${theme.inputBg} rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-500`}
                >
                  <option value="Erkak">Erkak</option>
                  <option value="Ayol">Ayol</option>
                </select>
              </div>

              <div>
                <label className={`text-xs ${theme.textMuted} block mb-1 font-medium`}>Tug‘ilgan sana:</label>
                <input 
                  type="date"
                  value={editForm.birthDate}
                  onChange={(e) => setEditForm({ ...editForm, birthDate: e.target.value })}
                  className={`w-full ${theme.inputBg} rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-500`}
                />
              </div>
            </div>

            <div>
              <label className={`text-xs ${theme.textMuted} block mb-1 font-medium`}>Profil rasm URL manzili:</label>
              <input 
                type="text"
                value={editForm.photoUrl}
                onChange={(e) => setEditForm({ ...editForm, photoUrl: e.target.value })}
                className={`w-full ${theme.inputBg} rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-indigo-500`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={`text-xs ${theme.textMuted} block mb-1 font-medium`}>Hozirgi Ball:</label>
                <select
                  value={editForm.currentBand}
                  onChange={(e) => setEditForm({ ...editForm, currentBand: e.target.value })}
                  className={`w-full ${theme.inputBg} rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-500`}
                >
                  {['5.0', '5.5', '6.0', '6.5', '7.0'].map(b => (
                    <option key={b} value={b}>Band {b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`text-xs ${theme.textMuted} block mb-1 font-medium`}>Maqsadli Ball:</label>
                <select
                  value={editForm.targetBand}
                  onChange={(e) => setEditForm({ ...editForm, targetBand: e.target.value })}
                  className={`w-full ${theme.inputBg} rounded-xl px-3 py-2 text-xs outline-none focus:border-indigo-500`}
                >
                  {['6.5', '7.0', '7.5', '8.0', '8.5', '9.0'].map(b => (
                    <option key={b} value={b}>Band {b}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
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
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
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
