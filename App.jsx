import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, BookOpen, Headphones, PenTool, Mic, Bot, User, 
  Play, Pause, RotateCcw, CheckCircle2, XCircle, Award, 
  Sparkles, Send, Volume2, ChevronRight, Edit3, ArrowLeft, 
  Layers, Sun, Moon, Target, TrendingUp, Clock, AlertTriangle,
  CheckSquare, Square, FileText, BarChart3, BookmarkCheck,
  Calendar, Cake, ArrowRight, Zap, RefreshCw, Camera, Upload, Check,
  Flame, Bookmark, VolumeX, Eye, ShieldAlert, Sparkle, BrainCircuit
} from 'lucide-react';

export default function App() {
  // --- 1. MAVZU REJIMI ---
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

  // --- 2. O'QUVCHI PROFILI VA SHAXSIY SOZLAMALARI ---
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
      currentLevel: 'B2 Upper-Intermediate',
      streak: 5,
      xp: 720,
      completedTests: 19,
      weakSkill: 'Reading: Matching Headings (42% aniqlik)',
      lastActivity: 'Academic Reading: Cambridge 18 Test 2'
    };
  });

  const [scores, setScores] = useState(() => {
    const saved = localStorage.getItem('ziyoprep_scores');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return { listening: '7.0', reading: '7.5', writing: '6.5', speaking: '7.0' };
  });

  const [dailyPlan, setDailyPlan] = useState(() => {
    const saved = localStorage.getItem('ziyoprep_plan');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 1, title: 'Academic Reading: 10 ta savolli to‘liq test', duration: '30 daq', done: false, xp: 60, tag: 'Reading' },
      { id: 2, title: 'ZiyoAI Speaking Coach: Talaffuz & Ravonlik', duration: '20 daq', done: false, xp: 50, tag: 'Speaking' },
      { id: 3, title: 'Band 7.5–9.0 uchun 10 ta yangi collocation', duration: '15 daq', done: true, xp: 30, tag: 'Vocab' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('ziyoprep_user', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('ziyoprep_scores', JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    localStorage.setItem('ziyoprep_plan', JSON.stringify(dailyPlan));
  }, [dailyPlan]);

  const toggleDailyPlanItem = (id) => {
    setDailyPlan(prev => prev.map(item => {
      if (item.id === id) {
        const nextDone = !item.done;
        setUserProfile(u => ({ ...u, xp: nextDone ? u.xp + item.xp : Math.max(0, u.xp - item.xp) }));
        return { ...item, done: nextDone };
      }
      return item;
    }));
  };

  // Navigatsiya: 'home' | 'tests' | 'ai' | 'writing' | 'profile' | 'listening'
  const [activeTab, setActiveTab] = useState('home');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState(userProfile);
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("Rasm hajmi 3MB dan oshmasligi kerak.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => ({ ...prev, photoBase64: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- 3. READING MODULI (10 TA SAVOL VA TAYMER) ---
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
      question: "1. Paragraph A uchun mos keladigan asosiy g'oyani tanlang:",
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
    },
    {
      id: "q4",
      type: "True / False / Not Given",
      question: "4. MRI scans specifically highlighted changes in the left inferior parietal cortex.",
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct: "TRUE",
      explanation: "Matnda to‘g‘ridan-to‘g‘ri keltirilgan: 'scans reveal enhanced density in the left inferior parietal cortex'."
    },
    {
      id: "q5",
      type: "Multiple Choice",
      question: "5. Multilingualism postpones neurodegenerative decline by an average of:",
      options: ["A) 1.5 years", "B) 4.5 years", "C) Over 10 years"],
      correct: "B) 4.5 years",
      explanation: "Matnda: 'postponing neurological deterioration by an average of 4.5 years'."
    }
  ];

  // --- 4. LISTENING MODULI ---
  const [listeningPlaying, setListeningPlaying] = useState(false);
  const [listeningSpeed, setListeningSpeed] = useState(1.0);
  const [listeningAnswers, setListeningAnswers] = useState({});
  const [listeningChecked, setListeningChecked] = useState(false);

  const listeningDialogue = "Good morning, Central City Accommodation Agency. We have an executive studio flat on Oakwood Avenue available from September 15th for 185 pounds per week, excluding metered electricity.";

  const toggleListeningAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert("Brauzeringiz nutq sintezini qo'llab-quvvatlamaydi.");
      return;
    }
    if (listeningPlaying) {
      window.speechSynthesis.cancel();
      setListeningPlaying(false);
      return;
    }
    window.speechSynthesis.cancel();
    setListeningPlaying(true);
    const ut = new SpeechSynthesisUtterance(listeningDialogue);
    ut.lang = 'en-GB';
    ut.rate = listeningSpeed;
    ut.onend = () => setListeningPlaying(false);
    ut.onerror = () => setListeningPlaying(false);
    window.speechSynthesis.speak(ut);
  };

  // --- 5. WRITING TASK 2 STUDIYASI ---
  const [essayText, setEssayText] = useState("");
  const [writingScore, setWritingScore] = useState(null);

  const analyzeEssay = () => {
    const words = essayText.trim().split(/\s+/).filter(Boolean).length;
    if (words < 20) {
      alert("Iltimos, baholash uchun kamida 20-30 so‘z yozing!");
      return;
    }
    let band = 5.5;
    if (words >= 150) band = 6.0;
    if (words >= 250) band = 7.0;

    const hasConnectors = /furthermore|moreover|consequently|in contrast|nevertheless/i.test(essayText);
    if (hasConnectors && words >= 250) band += 0.5;

    setWritingScore({
      band: band.toFixed(1),
      wordCount: words,
      taskAchievement: words >= 250 ? "Mavzu to‘liq yoritildi (250+ so‘z bajarildi)" : "So‘z soni kam (kamida 250 so‘z kerak)",
      coherence: hasConnectors ? "Bog‘lovchilar to‘g‘ri qo‘llangan" : "Furthermore, However kabi akademik bog‘lovchilarni ko‘paytiring",
      lexical: "Akademik so‘z boyligi yaxshi shakllangan"
    });
  };

  // --- 6. ZIYOAI SPEAKING COACH ---
  const [speakingActive, setSpeakingActive] = useState(false);
  const [speakingAnalysis] = useState({
    original: "I am from Tashkent, capital city in Uzbekistan. I love my hometown.",
    mistakePart: "capital city in",
    betterSay: "the capital of",
    fullBetter: "I am from Tashkent, the capital of Uzbekistan. I love my hometown.",
    expressionRule: "In English, when identifying a unique capital city, we use the definite article 'the' and preposition 'of' (the capital of [country]).",
    overallScore: 78.5,
    fluency: 84,
    pronunciation: 76,
    completeness: 92
  });

  const speakText = (text, lang = 'en-US') => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const ut = new SpeechSynthesisUtterance(text);
    ut.lang = lang;
    window.speechSynthesis.speak(ut);
  };

  const handleSimulateVoice = () => {
    setSpeakingActive(true);
    setTimeout(() => {
      setSpeakingActive(false);
      speakText(speakingAnalysis.fullBetter);
    }, 1200);
  };

  // Ranglar va mavzu uslubi
  const theme = {
    bg: isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900',
    card: isDarkMode ? 'bg-slate-900/90 border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-md',
    subCard: isDarkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-100 border-slate-200',
    header: isDarkMode ? 'bg-slate-950/95 border-slate-800' : 'bg-white/95 border-slate-200',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-slate-500',
    navBg: isDarkMode ? 'bg-slate-900/98 border-slate-800 shadow-2xl' : 'bg-white/98 border-slate-200 shadow-2xl',
    inputBg: isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
  };

  // ==========================================
  // 1. ZAMONAVIY VA BOYITILGAN BOSH MENYU
  // ==========================================
  const renderHome = () => (
    <div className="space-y-6 animate-fadeIn pb-6">
      
      {/* Profil Qatori */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3.5">
          {userProfile.photoBase64 ? (
            <img 
              src={userProfile.photoBase64} 
              alt={userProfile.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500 shadow-md"
            />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 border-2 border-indigo-400/40 flex items-center justify-center text-xl font-black text-white shadow-md">
              {userProfile.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black tracking-tight">{userProfile.name}</h2>
              <span className="text-[11px] bg-indigo-500/15 text-indigo-500 font-extrabold px-2.5 py-0.5 rounded-full">
                {userProfile.currentLevel}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400 mt-1">
              <span className="flex items-center gap-1 font-semibold text-amber-500">
                <Zap size={14} className="fill-amber-500" /> {userProfile.xp} XP
              </span>
              <span>•</span>
              <span className="font-semibold text-indigo-400">{userProfile.completedTests} ta test bajarildi</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 px-3.5 py-1.5 rounded-2xl shadow-sm">
          <span className="text-xs font-black text-amber-500">🔥 {userProfile.streak} kun</span>
        </div>
      </div>

      {/* Haqiqiy Ball vs Maqsadli Ball (Zamonaviy Karta) */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-600 rounded-[28px] p-6 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-2 gap-4 pb-5 border-b border-white/20 relative z-10">
          <div>
            <span className="text-xs uppercase tracking-wider text-indigo-200 font-bold flex items-center gap-1.5">
              <BarChart3 size={15} /> Diagnostik Ball
            </span>
            <div className="text-4xl font-black mt-1.5 tracking-tight">Band {userProfile.currentBand}</div>
            <span className="text-[11px] text-indigo-100 font-medium">Hozirgi tekshirilgan daraja</span>
          </div>
          <div className="border-l border-white/20 pl-5">
            <span className="text-xs uppercase tracking-wider text-amber-200 font-bold flex items-center gap-1.5">
              <Target size={15} /> Maqsadli Ball
            </span>
            <div className="text-4xl font-black mt-1.5 tracking-tight text-amber-300">Band {userProfile.targetBand}</div>
            <span className="text-[11px] text-indigo-100 font-medium">Farq: +{(parseFloat(userProfile.targetBand) - parseFloat(userProfile.currentBand)).toFixed(1)} ball qoldi</span>
          </div>
        </div>

        {/* 4 Skill kesimi */}
        <div className="grid grid-cols-4 gap-2 text-center pt-4 text-xs relative z-10">
          <div className="bg-white/10 rounded-xl py-2">
            <div className="text-indigo-200 text-[11px] font-semibold">Listening</div>
            <div className="font-black text-sm mt-0.5">{scores.listening}</div>
          </div>
          <div className="bg-white/10 rounded-xl py-2">
            <div className="text-indigo-200 text-[11px] font-semibold">Reading</div>
            <div className="font-black text-sm mt-0.5">{scores.reading}</div>
          </div>
          <div className="bg-white/10 rounded-xl py-2">
            <div className="text-indigo-200 text-[11px] font-semibold">Writing</div>
            <div className="font-black text-sm mt-0.5">{scores.writing}</div>
          </div>
          <div className="bg-white/10 rounded-xl py-2">
            <div className="text-indigo-200 text-[11px] font-semibold">Speaking</div>
            <div className="font-black text-sm mt-0.5">{scores.speaking}</div>
          </div>
        </div>
      </div>

      {/* Davom ettirish (Progress Tracker) */}
      <div 
        onClick={() => setActiveTab('tests')}
        className={`${theme.subCard} border border-indigo-500/30 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:border-indigo-500 transition shadow-sm`}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow">
            <RefreshCw size={22} />
          </div>
          <div>
            <div className="text-[11px] text-indigo-500 font-black uppercase tracking-wider">Mashqni davom ettirish</div>
            <div className="font-bold text-sm mt-0.5">{userProfile.lastActivity}</div>
          </div>
        </div>
        <ArrowRight size={20} className="text-indigo-500" />
      </div>

      {/* Bugungi Kunlik Reja */}
      <div className={`${theme.card} border rounded-3xl p-5 space-y-4`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-black text-base flex items-center gap-2">
              <Clock size={18} className="text-indigo-500" /> Bugungi Kunlik Reja
            </h3>
            <p className={`text-xs ${theme.textMuted} mt-0.5`}>Muntazamlik — Band 7.5 ga erishish garovi</p>
          </div>
          <span className="text-xs font-black bg-emerald-500/15 text-emerald-500 px-3 py-1 rounded-full">
            {dailyPlan.filter(t => t.done).length}/{dailyPlan.length} tayyor
          </span>
        </div>

        <div className="space-y-2.5">
          {dailyPlan.map(task => (
            <div 
              key={task.id}
              onClick={() => toggleDailyPlanItem(task.id)}
              className={`flex items-center justify-between p-3.5 rounded-2xl border text-xs cursor-pointer transition active:scale-98 ${
                task.done 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' 
                  : `${theme.subCard} hover:border-indigo-500/50`
              }`}
            >
              <div className="flex items-center gap-3">
                {task.done ? <CheckSquare size={20} className="text-emerald-500" /> : <Square size={20} className="text-slate-400" />}
                <div>
                  <span className={`font-bold text-sm ${task.done ? 'line-through opacity-80' : ''}`}>{task.title}</span>
                  <span className="block text-[11px] text-slate-400 mt-0.5 font-medium">{task.tag} mashg'uloti</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-[11px] px-2.5 py-1 rounded-lg font-bold ${task.done ? 'bg-emerald-500/20' : 'bg-slate-200 dark:bg-slate-700'}`}>
                  {task.duration}
                </span>
                <span className="block text-[11px] text-amber-500 font-extrabold mt-1">+{task.xp} XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ZiyoAI Examiner Studio Banner */}
      <div 
        onClick={() => setActiveTab('ai')}
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-5 text-white flex items-center justify-between cursor-pointer hover:shadow-xl transition group shadow-lg"
      >
        <div className="flex items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
            <Bot size={28} />
          </div>
          <div>
            <h4 className="font-black text-base flex items-center gap-1.5">
              ZiyoAI Speaking Coach <Sparkles size={16} className="text-amber-300" />
            </h4>
            <p className="text-xs text-blue-100 mt-0.5">Ovoz tahlili, talaffuz xatolari va ravonlik balli</p>
          </div>
        </div>
        <ChevronRight size={22} className="text-white/80 group-hover:translate-x-1 transition" />
      </div>

      {/* Zaif tomonlar tahlilchi monitoring bloki */}
      <div className="bg-rose-500/10 border border-rose-500/25 rounded-2xl p-4 flex items-start gap-3.5">
        <AlertTriangle size={22} className="text-rose-500 shrink-0 mt-0.5" />
        <div className="flex-1 text-xs">
          <div className="font-black text-rose-500 text-sm">Zaif tomoningiz tahlili:</div>
          <p className={`${theme.textMuted} mt-1 font-medium leading-relaxed`}>{userProfile.weakSkill}</p>
          <button 
            onClick={() => setActiveTab('tests')}
            className="mt-2 text-xs font-black text-rose-600 dark:text-rose-400 underline flex items-center gap-1"
          >
            Aynan shu bo‘limni kuchaytirish <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* 4 Ta Asosiy IELTS Modullari */}
      <div>
        <h3 className={`text-xs font-black uppercase tracking-wider ${theme.textMuted} mb-3.5`}>
          IELTS Ekotizimi Modullari
        </h3>
        <div className="grid grid-cols-2 gap-3.5">
          {/* Reading */}
          <div 
            onClick={() => setActiveTab('tests')}
            className={`${theme.card} border rounded-3xl p-4 cursor-pointer group active:scale-95 transition space-y-3`}
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-500 flex items-center justify-center">
              <BookOpen size={24} />
            </div>
            <div>
              <div className="text-[11px] font-bold text-blue-500 uppercase">Cambridge 18</div>
              <h4 className="font-black text-base mt-0.5">Reading Test</h4>
              <p className={`text-xs ${theme.textMuted} mt-1`}>10 ta savol • 60 daqiqalik to'liq taymer</p>
            </div>
          </div>

          {/* Listening */}
          <div 
            onClick={() => setActiveTab('listening')}
            className={`${theme.card} border rounded-3xl p-4 cursor-pointer group active:scale-95 transition space-y-3`}
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
              <Headphones size={24} />
            </div>
            <div>
              <div className="text-[11px] font-bold text-emerald-500 uppercase">Audio Lab</div>
              <h4 className="font-black text-base mt-0.5">Listening Hub</h4>
              <p className={`text-xs ${theme.textMuted} mt-1`}>Britaniya & Avstraliya aksentlari</p>
            </div>
          </div>

          {/* Writing */}
          <div 
            onClick={() => setActiveTab('writing')}
            className={`${theme.card} border rounded-3xl p-4 cursor-pointer group active:scale-95 transition space-y-3`}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
              <PenTool size={24} />
            </div>
            <div>
              <div className="text-[11px] font-bold text-amber-500 uppercase">Task 1 & 2</div>
              <h4 className="font-black text-base mt-0.5">Writing Studio</h4>
              <p className={`text-xs ${theme.textMuted} mt-1`}>AI bilan 250 so'zlik esse baholash</p>
            </div>
          </div>

          {/* Speaking */}
          <div 
            onClick={() => setActiveTab('ai')}
            className={`${theme.card} border rounded-3xl p-4 cursor-pointer group active:scale-95 transition space-y-3`}
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-500 flex items-center justify-center">
              <Mic size={24} />
            </div>
            <div>
              <div className="text-[11px] font-bold text-rose-500 uppercase">Part 1–3</div>
              <h4 className="font-black text-base mt-0.5">Speaking Mock</h4>
              <p className={`text-xs ${theme.textMuted} mt-1`}>Talaffuz, grammatika va ravonlik</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // 2. READING TEST (10 TA SAVOL)
  // ==========================================
  const renderTests = () => (
    <div className="space-y-4 animate-fadeIn pb-8">
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/40">
        <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-xs text-indigo-500 font-extrabold">
          <ArrowLeft size={18} /> Bosh sahifa
        </button>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-indigo-500/15 border border-indigo-500/30 px-3.5 py-1 rounded-xl text-xs font-mono font-black text-indigo-500">
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

      <div className={`${theme.card} border rounded-3xl p-5 text-xs space-y-3 leading-relaxed max-h-72 overflow-y-auto`}>
        <div className="flex justify-between items-center pb-2.5 border-b border-slate-700/20">
          <span className="font-black text-sm text-indigo-500">Passage 2: The Neurobiology of Bilingualism</span>
          <button 
            onClick={() => setHighlightEvidence(!highlightEvidence)}
            className={`text-[11px] px-3 py-1.5 rounded-xl border font-bold transition ${
              highlightEvidence ? 'bg-amber-500/20 text-amber-500 border-amber-500/40' : 'bg-slate-200 dark:bg-slate-800'
            }`}
          >
            {highlightEvidence ? "Dalillar belgilandi ✓" : "Matndan dalillarni ajratish"}
          </button>
        </div>

        <div>
          <h5 className="font-black text-sm mb-1.5 text-slate-300">Paragraph A</h5>
          <p>
            {highlightEvidence ? (
              <span>
                Recent neuroimaging trials demonstrate that bilingual individuals consistently display elevated cognitive agility. <mark className="bg-amber-300/40 text-inherit p-0.5 rounded">Far from creating linguistic interference, navigating between discrete semantic frameworks strengthens executive control and mental flexibility</mark>, enabling participants to switch tasks with minimal latency.
              </span>
            ) : (
              "Recent neuroimaging trials demonstrate that bilingual individuals consistently display elevated cognitive agility. Far from creating linguistic interference, navigating between discrete semantic frameworks strengthens executive control and mental flexibility, enabling participants to switch tasks with minimal latency."
            )}
          </p>
        </div>

        <div>
          <h5 className="font-black text-sm mb-1.5 text-slate-300">Paragraph B</h5>
          <p>
            {highlightEvidence ? (
              <span>
                Structural MRI scans reveal enhanced volume in the left inferior parietal cortex among multilingual adults. <mark className="bg-amber-300/40 text-inherit p-0.5 rounded">Crucially, longitudinal monitoring indicates these neuroprotective adaptations persist well into older age</mark>, effectively postponing the symptoms of neurodegenerative deterioration by an average of 4.5 years.
              </span>
            ) : (
              "Structural MRI scans reveal enhanced volume in the left inferior parietal cortex among multilingual adults. Crucially, longitudinal monitoring indicates these neuroprotective adaptations persist well into older age, effectively postponing the symptoms of neurodegenerative deterioration by an average of 4.5 years."
            )}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-black text-sm">Savollar to‘plami ({Object.keys(readingAnswers).length} / {fullReadingQuestions.length}):</h4>

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
          onClick={() => {
            setReadingChecked(true);
            setHighlightEvidence(true);
          }}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-sm transition active:scale-95 shadow-xl"
        >
          Javoblarni Tekshirish va Xatolarni Tahlil Qilish
        </button>
      </div>
    </div>
  );

  // ==========================================
  // 3. LISTENING AUDIO HUB
  // ==========================================
  const renderListening = () => (
    <div className="space-y-4 animate-fadeIn pb-8">
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/40">
        <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-xs text-indigo-500 font-extrabold">
          <ArrowLeft size={18} /> Bosh sahifa
        </button>
        <span className="text-xs bg-emerald-500/15 text-emerald-500 px-3 py-1 rounded-full font-black">Section 1</span>
      </div>

      <div className={`${theme.card} border rounded-3xl p-5 space-y-4`}>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-black uppercase tracking-wider ${theme.textMuted}`}>Audio (Britaniya Aksenti)</span>
          <div className="flex gap-1.5">
            {[0.8, 1.0, 1.2].map(speed => (
              <button 
                key={speed}
                onClick={() => setListeningSpeed(speed)}
                className={`text-xs px-2.5 py-1 rounded-xl font-black transition ${listeningSpeed === speed ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800'}`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <button 
            onClick={toggleListeningAudio}
            className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg active:scale-95 transition"
          >
            {listeningPlaying ? <Pause size={26} /> : <Play size={26} className="ml-1" />}
          </button>
          <div className="flex-1 text-xs">
            <div className="font-black text-sm">Student Accommodation Inquiry</div>
            <div className={`${theme.textMuted} mt-0.5`}>{listeningPlaying ? "Audio yangramoqda..." : "Tinglash uchun bosing"}</div>
          </div>
        </div>
      </div>

      <div className={`${theme.card} border rounded-3xl p-5 space-y-3.5 text-xs`}>
        <h4 className="font-black text-sm">Savollarga javob yozing:</h4>
        <div>
          <label className={`block mb-1.5 font-bold ${theme.textMuted}`}>1. Haftalik ijara narxi qancha? (£):</label>
          <input 
            type="text" 
            placeholder="Masalan: 185"
            value={listeningAnswers.a1 || ''}
            onChange={(e) => setListeningAnswers({ ...listeningAnswers, a1: e.target.value })}
            className={`w-full ${theme.inputBg} rounded-2xl px-4 py-3 outline-none focus:border-indigo-500 text-sm`}
          />
        </div>
        <button 
          onClick={() => setListeningChecked(true)}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-xs transition active:scale-95 shadow-md"
        >
          Tekshirish
        </button>

        {listeningChecked && (
          <div className={`${theme.subCard} p-3.5 rounded-2xl border text-xs`}>
            <span className="text-emerald-500 font-black">To‘g‘ri javob: 185</span>
            <p className={`${theme.textMuted} mt-1`}>Matnda: "The weekly rent is 185 pounds" deb aniq aytildi.</p>
          </div>
        )}
      </div>
    </div>
  );

  // ==========================================
  // 4. ZIYOAI SPEAKING COACH
  // ==========================================
  const renderAi = () => (
    <div className="space-y-4 animate-fadeIn pb-8">
      <div className={`${theme.card} border rounded-3xl p-6 text-center space-y-3.5 relative overflow-hidden shadow-lg`}>
        <div className="w-22 h-22 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white mx-auto flex items-center justify-center shadow-xl">
          <Bot size={42} />
        </div>

        <div>
          <h3 className="font-black text-lg">ZiyoAI Speaking Coach</h3>
          <p className={`text-xs ${theme.textMuted} mt-0.5`}>Talaffuz, grammatika va ravonlikni sun'iy intellekt orqali baholash</p>
        </div>

        <div className={`${theme.subCard} p-3.5 rounded-2xl text-left border text-xs space-y-1.5`}>
          <div className="text-[10px] text-slate-400 uppercase font-black tracking-wider">Siz aytgan jumla:</div>
          <div className="font-semibold text-sm">
            I am from Tashkent, <span className="bg-rose-500/20 text-rose-500 font-black px-1.5 py-0.5 rounded-md">{speakingAnalysis.mistakePart}</span> Uzbekistan. I love my hometown.
          </div>
        </div>
      </div>

      <div className={`${theme.card} border border-emerald-500/40 rounded-3xl p-5 text-xs space-y-2.5 shadow-sm`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-black text-emerald-500 text-sm">
            <CheckCircle2 size={18} /> It's better to say:
          </div>
          <button 
            onClick={() => speakText(speakingAnalysis.fullBetter)}
            className="p-1.5 text-emerald-500 hover:bg-emerald-500/10 rounded-xl"
          >
            <Volume2 size={20} />
          </button>
        </div>

        <p className="font-bold text-sm leading-relaxed">{speakingAnalysis.fullBetter}</p>
        <p className="text-emerald-500 font-bold">
          • {speakingAnalysis.mistakePart} → <strong className="underline">{speakingAnalysis.betterSay}</strong>
        </p>

        <div className={`mt-2 p-3 rounded-2xl ${theme.subCard} text-[11px] space-y-1`}>
          <span className="font-black text-amber-500">💡 Qoida:</span>
          <p className={`${theme.textMuted}`}>{speakingAnalysis.expressionRule}</p>
        </div>
      </div>

      <div className={`${theme.card} border rounded-3xl p-5 text-xs space-y-3.5`}>
        <div className="flex items-center justify-between">
          <span className="font-black text-sm text-indigo-400">Nutq Ko‘rsatkichlari:</span>
          <span className="text-xl font-black text-indigo-500">{speakingAnalysis.overallScore}%</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5 text-center">
          <div className={`${theme.subCard} p-3 rounded-2xl border`}>
            <div className="text-[11px] text-slate-400 font-bold">Fluency</div>
            <div className="font-black text-base text-amber-500 mt-0.5">{speakingAnalysis.fluency}%</div>
          </div>
          <div className={`${theme.subCard} p-3 rounded-2xl border`}>
            <div className="text-[11px] text-slate-400 font-bold">Pronunciation</div>
            <div className="font-black text-base text-rose-500 mt-0.5">{speakingAnalysis.pronunciation}%</div>
          </div>
          <div className={`${theme.subCard} p-3 rounded-2xl border`}>
            <div className="text-[11px] text-slate-400 font-bold">Completeness</div>
            <div className="font-black text-base text-emerald-500 mt-0.5">{speakingAnalysis.completeness}%</div>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button 
            onClick={handleSimulateVoice}
            className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white shadow-xl transition active:scale-95 ${
              speakingActive ? 'bg-rose-600 animate-pulse ring-8 ring-rose-500/30' : 'bg-indigo-600 hover:bg-indigo-500'
            }`}
          >
            <Mic size={28} />
          </button>
          <span className="block text-xs font-bold text-slate-400 mt-2.5">
            {speakingActive ? "Tahlil qilinmoqda..." : "Gapirish uchun mikrofonni bosing"}
          </span>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // 5. WRITING TASK 2
  // ==========================================
  const renderWriting = () => {
    const wordCount = essayText.trim().split(/\s+/).filter(Boolean).length;
    return (
      <div className="space-y-4 animate-fadeIn pb-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-700/40">
          <h3 className="font-black text-base">Writing Task 2 Studio</h3>
          <span className="text-xs bg-amber-500/15 text-amber-500 px-3 py-1 rounded-full font-black">250 So‘z</span>
        </div>

        <div className={`${theme.card} border rounded-3xl p-5 text-xs space-y-2`}>
          <span className="text-amber-500 font-black uppercase text-[10px] tracking-wider">Mavzu:</span>
          <p className="font-bold text-sm leading-relaxed">
            "Some people argue that technological development leads to the loss of traditional cultures. To what extent do you agree or disagree?"
          </p>
        </div>

        <div className="relative">
          <textarea
            rows={9}
            value={essayText}
            onChange={(e) => setEssayText(e.target.value)}
            placeholder="Esse matnini bu yerga yozing..."
            className={`w-full ${theme.inputBg} rounded-3xl p-4 text-xs outline-none focus:border-indigo-500 leading-relaxed resize-none shadow-inner`}
          />
          <div className={`absolute bottom-3 right-3 text-xs ${theme.subCard} px-3 py-1 rounded-xl border font-bold`}>
            So‘zlar: <span className={wordCount >= 250 ? "text-emerald-500" : "text-amber-500"}>{wordCount}</span> / 250
          </div>
        </div>

        <button 
          onClick={analyzeEssay}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-sm transition active:scale-95 shadow-xl flex items-center justify-center gap-2"
        >
          <Sparkles size={18} /> Esseni AI Mezonlari Bo‘yicha Baholash
        </button>

        {writingScore && (
          <div className={`${theme.card} border border-indigo-500/40 rounded-3xl p-5 space-y-2.5 text-xs`}>
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-700/30">
              <span className="font-black text-sm">Taxminiy IELTS Ball:</span>
              <span className="text-lg font-black text-indigo-500">Band {writingScore.band}</span>
            </div>
            <p><strong>Task Achievement:</strong> {writingScore.taskAchievement}</p>
            <p><strong>Coherence & Cohesion:</strong> {writingScore.coherence}</p>
            <p><strong>Lexical Resource:</strong> {writingScore.lexical}</p>
          </div>
        )}
      </div>
    );
  };

  // ==========================================
  // 6. SHAXSIY PROFIL
  // ==========================================
  const renderProfileOnly = () => (
    <div className="space-y-4 animate-fadeIn pb-8">
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/40">
        <h3 className="font-black text-base">Mening Profilim</h3>
        <button 
          onClick={() => {
            setEditForm(userProfile);
            setIsEditingProfile(true);
          }}
          className="text-xs bg-indigo-600 text-white px-4 py-2 rounded-2xl font-black flex items-center gap-1.5 transition active:scale-95 shadow"
        >
          <Edit3 size={15} /> Tahrirlash
        </button>
      </div>

      <div className={`${theme.card} border rounded-3xl p-6 text-center space-y-3.5 shadow-md relative`}>
        <div className="relative w-22 h-22 mx-auto">
          {userProfile.photoBase64 ? (
            <img 
              src={userProfile.photoBase64} 
              alt={userProfile.name}
              className="w-full h-full rounded-3xl object-cover border-4 border-indigo-500 shadow-lg"
            />
          ) : (
            <div className="w-full h-full rounded-3xl bg-indigo-600/20 border-4 border-indigo-500/40 flex items-center justify-center text-3xl font-black text-indigo-400">
              {userProfile.name.charAt(0)}
            </div>
          )}
          <button 
            onClick={() => fileInputRef.current.click()}
            className="absolute -bottom-1 -right-1 p-2 bg-indigo-600 text-white rounded-xl shadow-md border border-white/20 active:scale-95"
          >
            <Camera size={15} />
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
          <h3 className="text-xl font-black">{userProfile.name}</h3>
          <p className={`text-xs ${theme.textMuted} font-bold mt-0.5`}>{userProfile.gender} • {userProfile.currentLevel}</p>
        </div>
      </div>

      <div className={`${theme.card} border rounded-3xl p-5 space-y-3 text-xs`}>
        <h4 className="font-black text-sm">Shaxsiy & Akademik Ko‘rsatkichlar</h4>

        <div className="flex justify-between py-2 border-b border-slate-700/20">
          <span className={theme.textMuted}>Tug‘ilgan sana:</span>
          <span className="font-bold flex items-center gap-1">
            <Cake size={14} className="text-pink-500" /> {userProfile.birthDate}
          </span>
        </div>

        <div className="flex justify-between py-2 border-b border-slate-700/20">
          <span className={theme.textMuted}>Haqiqiy Diagnostik Ball:</span>
          <span className="font-black text-indigo-500">Band {userProfile.currentBand}</span>
        </div>

        <div className="flex justify-between py-2 border-b border-slate-700/20">
          <span className={theme.textMuted}>Maqsadli IELTS Ball:</span>
          <span className="font-black text-amber-500">Band {userProfile.targetBand}</span>
        </div>

        <div className="flex justify-between py-2 border-b border-slate-700/20">
          <span className={theme.textMuted}>Kunlik Streak:</span>
          <span className="font-black text-amber-500">🔥 {userProfile.streak} kun</span>
        </div>

        <div className="flex justify-between py-2">
          <span className={theme.textMuted}>Tugallangan testlar soni:</span>
          <span className="font-black text-emerald-500">{userProfile.completedTests} ta</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen w-full ${theme.bg} overflow-x-hidden flex flex-col font-sans select-none antialiased transition-colors duration-300 touch-pan-y`}>
      
      {/* KATTALASHTIRILGAN ZAMONAVIY HEADER */}
      <header className={`sticky top-0 z-40 ${theme.header} backdrop-blur-md border-b px-5 py-3.5 flex items-center justify-between shadow-sm`}>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white text-base shadow-md">
            Z
          </div>
          <span className="font-black text-xl tracking-tight">Ziyo<span className="text-indigo-500">Prep</span></span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className={`p-2.5 rounded-2xl ${theme.subCard} border transition active:scale-95`}
          >
            {isDarkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-indigo-600" />}
          </button>
        </div>
      </header>

      {/* Asosiy Maydon (Pastki menyuga xalaqit bermasligi uchun pb-44) */}
      <main className="flex-1 w-full max-w-md mx-auto p-4 pb-44 box-border">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'tests' && renderTests()}
        {activeTab === 'listening' && renderListening()}
        {activeTab === 'ai' && renderAi()}
        {activeTab === 'writing' && renderWriting()}
        {activeTab === 'profile' && renderProfileOnly()}
      </main>

      {/* YANGI KATTA, ANIQ VA BOSISHGA JUDA QULAY 5 TALIK PASTKI MENYU */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/98 dark:bg-slate-900/98 border-t border-slate-800 backdrop-blur-2xl px-3 pt-2.5 pb-7 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-between relative px-1">
          
          {/* 1. Asosiy */}
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

          {/* 2. Testlar */}
          <button 
            onClick={() => setActiveTab('tests')}
            className={`flex-1 flex flex-col items-center py-1 transition active:scale-90 ${
              activeTab === 'tests' || activeTab === 'listening' ? 'text-indigo-400 font-black' : 'text-slate-400'
            }`}
          >
            <BookOpen size={26} strokeWidth={activeTab === 'tests' || activeTab === 'listening' ? 2.8 : 2} />
            <span className="text-xs mt-1 font-bold">Testlar</span>
            {(activeTab === 'tests' || activeTab === 'listening') && <span className="w-6 h-1 bg-emerald-500 rounded-full mt-0.5"></span>}
          </button>

          {/* 3. ZiyoAI (Katta va Keng Dumaloq Tugma) */}
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

          {/* 4. Writing */}
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

          {/* 5. Profil */}
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

      {/* Profilni Tahrirlash Modali */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${theme.card} border rounded-3xl p-6 w-full max-w-sm space-y-4 shadow-2xl`}>
            <h3 className="font-black text-base">Profilni Tahrirlash</h3>
            
            <div className="flex items-center gap-3.5">
              {editForm.photoBase64 ? (
                <img src={editForm.photoBase64} alt="Avatar" className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500" />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border-2 border-indigo-500/40 flex items-center justify-center font-bold text-indigo-400">
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

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={`text-xs ${theme.textMuted} block mb-1 font-bold`}>Jinsi:</label>
                <select
                  value={editForm.gender}
                  onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                  className={`w-full ${theme.inputBg} rounded-xl px-3.5 py-2 text-xs outline-none focus:border-indigo-500`}
                >
                  <option value="Erkak">Erkak</option>
                  <option value="Ayol">Ayol</option>
                </select>
              </div>

              <div>
                <label className={`text-xs ${theme.textMuted} block mb-1 font-bold`}>Tug‘ilgan sana:</label>
                <input 
                  type="date"
                  value={editForm.birthDate}
                  onChange={(e) => setEditForm({ ...editForm, birthDate: e.target.value })}
                  className={`w-full ${theme.inputBg} rounded-xl px-3.5 py-2 text-xs outline-none focus:border-indigo-500`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={`text-xs ${theme.textMuted} block mb-1 font-bold`}>Hozirgi Ball:</label>
                <select
                  value={editForm.currentBand}
                  onChange={(e) => setEditForm({ ...editForm, currentBand: e.target.value })}
                  className={`w-full ${theme.inputBg} rounded-xl px-3.5 py-2 text-xs outline-none focus:border-indigo-500`}
                >
                  {['5.0', '5.5', '6.0', '6.5', '7.0'].map(b => (
                    <option key={b} value={b}>Band {b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`text-xs ${theme.textMuted} block mb-1 font-bold`}>Maqsadli Ball:</label>
                <select
                  value={editForm.targetBand}
                  onChange={(e) => setEditForm({ ...editForm, targetBand: e.target.value })}
                  className={`w-full ${theme.inputBg} rounded-xl px-3.5 py-2 text-xs outline-none focus:border-indigo-500`}
                >
                  {['6.5', '7.0', '7.5', '8.0', '8.5', '9.0'].map(b => (
                    <option key={b} value={b}>Band {b}</option>
                  ))}
                </select>
              </div>
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
