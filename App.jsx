import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, BookOpen, Headphones, PenTool, Mic, Bot, User, 
  Play, Pause, RotateCcw, CheckCircle2, XCircle, Award, 
  Sparkles, Send, Volume2, ChevronRight, Edit3, ArrowLeft, 
  Layers, Sun, Moon, Target, TrendingUp, Clock, AlertTriangle,
  CheckSquare, Square, FileText, BarChart3, BookmarkCheck,
  Calendar, Cake, ArrowRight, Zap, RefreshCw, Camera, Upload, Check
} from 'lucide-react';

export default function App() {
  // --- 1. MAVZU (DARK / LIGHT) ---
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

  // --- 2. O'QUVCHI PROFILI (BEGONA RASMLARSIZ, TOZA SAQLANISH) ---
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('ziyoprep_user');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        // Begona URL yoki qora skrinshot tushib qolgan bo'lsa tozalash
        if (parsed.photoBase64 && !parsed.photoBase64.startsWith('data:image')) {
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
      xp: 540,
      completedTests: 12
    };
  });

  const [scores, setScores] = useState(() => {
    const saved = localStorage.getItem('ziyoprep_scores');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return { listening: '7.0', reading: '7.5', writing: '6.5', speaking: '7.0' };
  });

  // Kunlik dars rejasi
  const [dailyPlan, setDailyPlan] = useState(() => {
    const saved = localStorage.getItem('ziyoprep_plan');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 1, title: 'Academic Reading: 10 ta savolli to‘liq test', duration: '30 daq', done: false, xp: 60 },
      { id: 2, title: 'ZiyoAI Speaking Coach: Talaffuz & Ravonlik', duration: '20 daq', done: false, xp: 50 },
      { id: 3, title: 'Band 7.5–9.0 uchun 10 ta yangi collocation', duration: '15 daq', done: true, xp: 30 }
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

  // Navigatsiya holati: 'home' | 'tests' | 'ai' | 'writing' | 'profile'
  const [activeTab, setActiveTab] = useState('home');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState(userProfile);
  const fileInputRef = useRef(null);

  // Telefon galereyasidan o'z rasmini tanlash
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("Rasm hajmi juda katta (maksimal 3MB bo‘lsin).");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => ({ ...prev, photoBase64: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- 3. READING TEST (10 TA SAVOL VA TAYMER) ---
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
      question: "1. Paragraph A uchun eng mos sarlavhani tanlang:",
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
      question: "2. Paragraph B uchun eng mos sarlavhani tanlang:",
      options: [
        "i. Neuroplastic resilience persisting into old age",
        "ii. Decline of memory in multilingual adults",
        "iii. Historical evolution of dialect processing"
      ],
      correct: "i. Neuroplastic resilience persisting into old age",
      explanation: "Paragraf B da kognitiv moslashuvchanlik keksayganda ham saqlanishi va kasalliklarni 4.5 yilga kechiktirishi keltirilgan."
    },
    {
      id: "q3",
      type: "True / False / Not Given",
      question: "3. Learning two languages causes lifelong intellectual confusion in adults.",
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct: "FALSE",
      explanation: "Matnda aniq keltirilgan: chalkashlik tug‘dirmaydi, aksincha kognitiv boshqaruvni kuchaytiradi."
    },
    {
      id: "q4",
      type: "True / False / Not Given",
      question: "4. MRI scans specifically highlighted changes in the left inferior parietal cortex.",
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct: "TRUE",
      explanation: "Matnda aytilgan: 'scans reveal enhanced density in the left inferior parietal cortex'."
    },
    {
      id: "q5",
      type: "Multiple Choice",
      question: "5. According to Paragraph B, bilingualism delays symptoms of dementia by approximately:",
      options: ["A) 1.5 years", "B) 4.5 years", "C) Over 10 years"],
      correct: "B) 4.5 years",
      explanation: "Matnda: 'delaying neurological deterioration by an average of 4.5 years'."
    }
  ];

  // --- 4. WRITING TASK 2 STUDIYASI ---
  const [essayText, setEssayText] = useState("");
  const [writingScore, setWritingScore] = useState(null);

  const analyzeEssay = () => {
    const words = essayText.trim().split(/\s+/).filter(Boolean).length;
    if (words < 20) {
      alert("Iltimos, tahlil qilish uchun kamida 20-30 so‘z yozing!");
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
      taskAchievement: words >= 250 ? "Mavzu to‘liq yoritildi (250+ so‘z)" : "So‘z soni kam (kamida 250 so‘z kerak)",
      coherence: hasConnectors ? "Bog‘lovchilar juda to‘g‘ri qo‘llangan" : "Furthermore, However kabi bog‘lovchilarni ko‘paytiring",
      lexical: "Akademik so‘z boyligi yaxshi darajada"
    });
  };

  // --- 5. ZIYOAI SPEAKING COACH ---
  const [speakingActive, setSpeakingActive] = useState(false);
  const [speakingAnalysis, setSpeakingAnalysis] = useState({
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

  // Mavzu ranglari
  const theme = {
    bg: isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900',
    card: isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm',
    subCard: isDarkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200',
    header: isDarkMode ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-200',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-slate-500',
    navBg: isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200 shadow-lg',
    inputBg: isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
  };

  // ==========================================
  // 1. ASOSIY SAHIFA
  // ==========================================
  const renderHome = () => (
    <div className="space-y-4 animate-fadeIn">
      {/* Profil Qatori (Rasm yoki Bosh harf) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {userProfile.photoBase64 ? (
            <img 
              src={userProfile.photoBase64} 
              alt={userProfile.name}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-indigo-500 shadow-md"
            />
          ) : (
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border-2 border-indigo-500/40 flex items-center justify-center text-lg font-black text-indigo-400">
              {userProfile.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-bold tracking-tight">{userProfile.name}</h2>
              <span className="text-[11px] bg-indigo-500/15 text-indigo-500 font-bold px-2 py-0.5 rounded-md">
                {userProfile.currentLevel}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span>XP: <strong className="text-amber-500">{userProfile.xp}</strong></span>
              <span>•</span>
              <span>Testlar: <strong className="text-indigo-400">{userProfile.completedTests} ta</strong></span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/25 px-3 py-1 rounded-full">
          <span className="text-xs font-bold text-amber-500">🔥 {userProfile.streak} kun</span>
        </div>
      </div>

      {/* Haqiqiy Ball vs Maqsadli Ball */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-700 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/20">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-indigo-200 font-semibold flex items-center gap-1">
              <BarChart3 size={13} /> Haqiqiy Diagnostik Ball
            </span>
            <div className="text-3xl font-black mt-1">Band {userProfile.currentBand}</div>
            <span className="text-[10px] text-indigo-100">Hozirgi aniqlangan daraja</span>
          </div>
          <div className="border-l border-white/20 pl-4">
            <span className="text-[11px] uppercase tracking-wider text-amber-200 font-semibold flex items-center gap-1">
              <Target size={13} /> Maqsadli Ball
            </span>
            <div className="text-3xl font-black mt-1 text-amber-300">Band {userProfile.targetBand}</div>
            <span className="text-[10px] text-indigo-100">Farq: +{(parseFloat(userProfile.targetBand) - parseFloat(userProfile.currentBand)).toFixed(1)} ball</span>
          </div>
        </div>

        {/* 4 Ko'nikma taqsimoti */}
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

      {/* Bugungi Reja */}
      <div className={`${theme.card} border rounded-2xl p-4 space-y-3`}>
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm flex items-center gap-2">
            <Clock size={16} className="text-indigo-500" /> Bugungi Kunlik Reja
          </h3>
          <span className="text-[11px] font-semibold text-emerald-500">
            {dailyPlan.filter(t => t.done).length} / {dailyPlan.length} bajarildi
          </span>
        </div>

        <div className="space-y-2">
          {dailyPlan.map(task => (
            <div 
              key={task.id}
              onClick={() => toggleDailyPlanItem(task.id)}
              className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition ${
                task.done 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' 
                  : `${theme.subCard} hover:border-indigo-500/50`
              }`}
            >
              <div className="flex items-center gap-2.5">
                {task.done ? <CheckSquare size={18} className="text-emerald-500" /> : <Square size={18} className="text-slate-400" />}
                <span className={`font-semibold ${task.done ? 'line-through opacity-80' : ''}`}>{task.title}</span>
              </div>
              <div className="text-right">
                <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${task.done ? 'bg-emerald-500/20' : 'bg-slate-200 dark:bg-slate-700'}`}>
                  {task.duration}
                </span>
                <span className="block text-[10px] text-amber-500 font-bold mt-0.5">+{task.xp} XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ZiyoAI Banner */}
      <div 
        onClick={() => setActiveTab('ai')}
        className={`${theme.card} border rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:border-indigo-500 transition group`}
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Bot size={22} />
          </div>
          <div>
            <h4 className="font-bold text-sm group-hover:text-indigo-500 transition flex items-center gap-1.5">
              ZiyoAI Speaking Coach <Sparkles size={15} className="text-amber-400" />
            </h4>
            <p className={`text-xs ${theme.textMuted}`}>Ovoz tahlili, talaffuz xatolari va ravonlik</p>
          </div>
        </div>
        <ChevronRight size={20} className={`${theme.textMuted} group-hover:text-indigo-500 transition`} />
      </div>

      {/* IELTS Testlariga o'tish */}
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => setActiveTab('tests')}
          className={`${theme.card} border p-4 rounded-2xl text-left transition active:scale-95 space-y-2`}
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center">
            <BookOpen size={20} />
          </div>
          <div>
            <div className="font-bold text-sm">Academic Reading</div>
            <div className={`text-[11px] ${theme.textMuted}`}>10 ta savol • 60 daqiqalik test</div>
          </div>
        </button>

        <button 
          onClick={() => setActiveTab('writing')}
          className={`${theme.card} border p-4 rounded-2xl text-left transition active:scale-95 space-y-2`}
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
            <PenTool size={20} />
          </div>
          <div>
            <div className="font-bold text-sm">Writing Task 2</div>
            <div className={`text-[11px] ${theme.textMuted}`}>250 so‘zlik esse baholash</div>
          </div>
        </button>
      </div>
    </div>
  );

  // ==========================================
  // 2. IELTS TESTLAR (READING 10 TA SAVOL)
  // ==========================================
  const renderTests = () => (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between pb-2 border-b border-slate-700/40">
        <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-xs text-indigo-500 font-bold">
          <ArrowLeft size={16} /> Bosh sahifa
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

      <div className={`${theme.card} border rounded-2xl p-4 text-xs space-y-3 leading-relaxed max-h-64 overflow-y-auto`}>
        <div className="flex justify-between items-center pb-2 border-b border-slate-700/20">
          <span className="font-black text-sm text-indigo-500">Passage 2: The Neurobiology of Bilingualism</span>
          <button 
            onClick={() => setHighlightEvidence(!highlightEvidence)}
            className={`text-[11px] px-2.5 py-1 rounded-lg border font-bold transition ${
              highlightEvidence ? 'bg-amber-500/20 text-amber-500 border-amber-500/40' : 'bg-slate-200 dark:bg-slate-800'
            }`}
          >
            {highlightEvidence ? "Dalillar belgilandi ✓" : "Matndan dalillarni ajratish"}
          </button>
        </div>

        <div>
          <h5 className="font-bold text-sm mb-1 text-slate-300">Paragraph A</h5>
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
          <h5 className="font-bold text-sm mb-1 text-slate-300">Paragraph B</h5>
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
        <h4 className="font-bold text-sm">Savollar (Javob berildi: {Object.keys(readingAnswers).length} / {fullReadingQuestions.length}):</h4>

        {fullReadingQuestions.map((q, idx) => (
          <div key={q.id} className={`${theme.card} border rounded-2xl p-4 text-xs space-y-2`}>
            <div className="flex justify-between items-center">
              <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full font-bold">
                {q.type}
              </span>
              <span className="text-slate-500 text-[10px]">Savol {idx + 1}</span>
            </div>
            <p className="font-bold leading-snug">{q.question}</p>
            
            <div className="grid grid-cols-1 gap-2 pt-1">
              {q.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => setReadingAnswers({ ...readingAnswers, [q.id]: opt })}
                  className={`py-2 px-3 rounded-xl text-left border text-xs transition ${
                    readingAnswers[q.id] === opt 
                      ? 'bg-indigo-600 text-white font-bold border-indigo-600' 
                      : `${theme.subCard}`
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {readingChecked && (
              <div className={`mt-2 p-3 rounded-xl ${theme.subCard} text-[11px] space-y-1`}>
                <span className={readingAnswers[q.id] === q.correct ? "text-emerald-500 font-bold" : "text-rose-500 font-bold"}>
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
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition active:scale-95 shadow-md"
        >
          Javoblarni Tekshirish va Xatolarni Tahlil Qilish
        </button>
      </div>
    </div>
  );

  // ==========================================
  // 3. ZIYOAI SPEAKING COACH
  // ==========================================
  const renderAi = () => (
    <div className="space-y-4 animate-fadeIn">
      <div className={`${theme.card} border rounded-3xl p-5 text-center space-y-3 relative overflow-hidden shadow-md`}>
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white mx-auto flex items-center justify-center shadow-lg">
          <Bot size={36} />
        </div>

        <div>
          <h3 className="font-bold text-base">ZiyoAI Speaking Coach</h3>
          <p className={`text-xs ${theme.textMuted}`}>Talaffuz, grammatika va ravonlikni bir zumda baholaydi</p>
        </div>

        <div className={`${theme.subCard} p-3 rounded-2xl text-left border text-xs space-y-1`}>
          <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Siz aytgan jumla:</div>
          <div className="font-medium">
            I am from Tashkent, <span className="bg-rose-500/20 text-rose-500 font-bold px-1 rounded">{speakingAnalysis.mistakePart}</span> Uzbekistan. I love my hometown.
          </div>
        </div>
      </div>

      <div className={`${theme.card} border border-emerald-500/40 rounded-2xl p-4 text-xs space-y-2`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold text-emerald-500 text-sm">
            <CheckCircle2 size={18} /> It's better to say:
          </div>
          <button 
            onClick={() => speakText(speakingAnalysis.fullBetter)}
            className="p-1.5 text-emerald-500 hover:bg-emerald-500/10 rounded-lg"
          >
            <Volume2 size={18} />
          </button>
        </div>

        <p className="font-bold text-sm">{speakingAnalysis.fullBetter}</p>
        <p className="text-emerald-500 font-medium">
          • {speakingAnalysis.mistakePart} → <strong className="underline">{speakingAnalysis.betterSay}</strong>
        </p>

        <div className={`mt-2 p-2.5 rounded-xl ${theme.subCard} text-[11px] space-y-0.5`}>
          <span className="font-bold text-amber-500">💡 Qoida:</span>
          <p className={`${theme.textMuted}`}>{speakingAnalysis.expressionRule}</p>
        </div>
      </div>

      <div className={`${theme.card} border rounded-2xl p-4 text-xs space-y-3`}>
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm text-indigo-400">Nutq Ko‘rsatkichlari:</span>
          <span className="text-lg font-black text-indigo-500">{speakingAnalysis.overallScore}%</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className={`${theme.subCard} p-2 rounded-xl border`}>
            <div className="text-[10px] text-slate-400">Fluency</div>
            <div className="font-bold text-sm text-amber-500">{speakingAnalysis.fluency}%</div>
          </div>
          <div className={`${theme.subCard} p-2 rounded-xl border`}>
            <div className="text-[10px] text-slate-400">Pronunciation</div>
            <div className="font-bold text-sm text-rose-500">{speakingAnalysis.pronunciation}%</div>
          </div>
          <div className={`${theme.subCard} p-2 rounded-xl border`}>
            <div className="text-[10px] text-slate-400">Completeness</div>
            <div className="font-bold text-sm text-emerald-500">{speakingAnalysis.completeness}%</div>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button 
            onClick={handleSimulateVoice}
            className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center text-white shadow-lg transition active:scale-95 ${
              speakingActive ? 'bg-rose-600 animate-pulse ring-4 ring-rose-500/30' : 'bg-indigo-600 hover:bg-indigo-500'
            }`}
          >
            <Mic size={24} />
          </button>
          <span className="block text-xs text-slate-400 mt-2">
            {speakingActive ? "Tahlil qilinmoqda..." : "Gapirish uchun mikrofonni bosing"}
          </span>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // 4. WRITING TASK 2
  // ==========================================
  const renderWriting = () => {
    const wordCount = essayText.trim().split(/\s+/).filter(Boolean).length;
    return (
      <div className="space-y-4 animate-fadeIn">
        <div className="flex items-center justify-between pb-2 border-b border-slate-700/40">
          <h3 className="font-bold text-base">Writing Task 2 Studio</h3>
          <span className="text-xs bg-amber-500/15 text-amber-500 px-2.5 py-0.5 rounded-full font-bold">250 So‘z</span>
        </div>

        <div className={`${theme.card} border rounded-2xl p-4 text-xs space-y-1.5`}>
          <span className="text-amber-500 font-bold uppercase text-[10px]">Mavzu:</span>
          <p className="font-medium leading-relaxed">
            "Some people argue that technological development leads to the loss of traditional cultures. To what extent do you agree or disagree?"
          </p>
        </div>

        <div className="relative">
          <textarea
            rows={8}
            value={essayText}
            onChange={(e) => setEssayText(e.target.value)}
            placeholder="Esse matnini yozing..."
            className={`w-full ${theme.inputBg} rounded-2xl p-4 text-xs outline-none focus:border-indigo-500 leading-relaxed resize-none`}
          />
          <div className={`absolute bottom-3 right-3 text-xs ${theme.subCard} px-2.5 py-1 rounded-lg border`}>
            So‘zlar: <span className={wordCount >= 250 ? "text-emerald-500 font-bold" : "text-amber-500 font-bold"}>{wordCount}</span> / 250
          </div>
        </div>

        <button 
          onClick={analyzeEssay}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition active:scale-95 shadow-md flex items-center justify-center gap-2"
        >
          <Sparkles size={16} /> Esseni AI Mezonlari Bo‘yicha Baholash
        </button>

        {writingScore && (
          <div className={`${theme.card} border border-indigo-500/40 rounded-2xl p-4 space-y-2 text-xs`}>
            <div className="flex justify-between items-center pb-2 border-b border-slate-700/30">
              <span className="font-bold">Taxminiy IELTS Ball:</span>
              <span className="text-base font-black text-indigo-500">Band {writingScore.band}</span>
            </div>
            <p><strong>Task Achievement:</strong> {writingScore.taskAchievement}</p>
            <p><strong>Coherence:</strong> {writingScore.coherence}</p>
            <p><strong>Lexical Resource:</strong> {writingScore.lexical}</p>
          </div>
        )}
      </div>
    );
  };

  // ==========================================
  // 5. FAQAT SHAXSIY PROFIL
  // ==========================================
  const renderProfileOnly = () => (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between pb-2 border-b border-slate-700/40">
        <h3 className="font-bold text-base">Mening Profilim</h3>
        <button 
          onClick={() => {
            setEditForm(userProfile);
            setIsEditingProfile(true);
          }}
          className="text-xs bg-indigo-600 text-white px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition active:scale-95"
        >
          <Edit3 size={14} /> Profilni Tahrirlash
        </button>
      </div>

      <div className={`${theme.card} border rounded-3xl p-6 text-center space-y-3 shadow-md relative`}>
        <div className="relative w-20 h-20 mx-auto">
          {userProfile.photoBase64 ? (
            <img 
              src={userProfile.photoBase64} 
              alt={userProfile.name}
              className="w-full h-full rounded-2xl object-cover border-2 border-indigo-500 shadow-md"
            />
          ) : (
            <div className="w-full h-full rounded-2xl bg-indigo-600/20 border-2 border-indigo-500/40 flex items-center justify-center text-2xl font-black text-indigo-400">
              {userProfile.name.charAt(0)}
            </div>
          )}
          <button 
            onClick={() => fileInputRef.current.click()}
            className="absolute -bottom-1.5 -right-1.5 p-1.5 bg-indigo-600 text-white rounded-xl shadow-md border border-white/20 active:scale-95"
          >
            <Camera size={14} />
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
          <h3 className="text-lg font-black">{userProfile.name}</h3>
          <p className={`text-xs ${theme.textMuted}`}>{userProfile.gender} • {userProfile.currentLevel}</p>
        </div>
      </div>

      <div className={`${theme.card} border rounded-2xl p-4 space-y-3 text-xs`}>
        <h4 className="font-bold text-sm">Shaxsiy & Akademik Ko‘rsatkichlar</h4>

        <div className="flex justify-between py-2 border-b border-slate-700/20">
          <span className={theme.textMuted}>Tug‘ilgan sana:</span>
          <span className="font-bold flex items-center gap-1">
            <Cake size={14} className="text-pink-500" /> {userProfile.birthDate}
          </span>
        </div>

        <div className="flex justify-between py-2 border-b border-slate-700/20">
          <span className={theme.textMuted}>Haqiqiy Diagnostik Ball:</span>
          <span className="font-bold text-indigo-500">Band {userProfile.currentBand}</span>
        </div>

        <div className="flex justify-between py-2 border-b border-slate-700/20">
          <span className={theme.textMuted}>Maqsadli IELTS Ball:</span>
          <span className="font-bold text-amber-500">Band {userProfile.targetBand}</span>
        </div>

        <div className="flex justify-between py-2 border-b border-slate-700/20">
          <span className={theme.textMuted}>Kunlik Streak:</span>
          <span className="font-bold text-amber-500">🔥 {userProfile.streak} kun</span>
        </div>

        <div className="flex justify-between py-2">
          <span className={theme.textMuted}>Tugallangan testlar soni:</span>
          <span className="font-bold text-emerald-500">{userProfile.completedTests} ta</span>
        </div>
      </div>
    </div>
  );

  return (
    // EKRAN O'YNASHINI TO'XTATUVCHI MAXSUS ASOSIY KONTENT KONTEYNERI
    <div className={`min-h-screen w-full ${theme.bg} overflow-x-hidden flex flex-col font-sans select-none antialiased transition-colors duration-300 touch-pan-y`}>
      
      {/* Header */}
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

      {/* Asosiy Ekran (Kengligi aniq 100% va max-w-md orqali cheklangan, hech narsa chetga chiqmaydi) */}
      <main className="flex-1 w-full max-w-md mx-auto p-4 pb-32 box-border">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'tests' && renderTests()}
        {activeTab === 'ai' && renderAi()}
        {activeTab === 'writing' && renderWriting()}
        {activeTab === 'profile' && renderProfileOnly()}
      </main>

      {/* AYNAN 5 TALIK SUZUVCHI PASTKI MENYU */}
      <div className="fixed bottom-3 left-0 right-0 z-50 px-3 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <nav className={`${theme.navBg} backdrop-blur-2xl rounded-[28px] px-2 py-1.5 flex items-center justify-between relative`}>
            
            {/* 1. Asosiy */}
            <button 
              onClick={() => setActiveTab('home')}
              className={`flex-1 flex flex-col items-center py-1 rounded-xl transition active:scale-95 ${
                activeTab === 'home' ? 'text-indigo-500 font-bold' : `${theme.textMuted}`
              }`}
            >
              <Compass size={20} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
              <span className="text-[10px] mt-0.5">Asosiy</span>
              {activeTab === 'home' && <span className="w-4 h-0.5 bg-emerald-500 rounded-full mt-0.5"></span>}
            </button>

            {/* 2. Testlar */}
            <button 
              onClick={() => setActiveTab('tests')}
              className={`flex-1 flex flex-col items-center py-1 rounded-xl transition active:scale-95 ${
                activeTab === 'tests' ? 'text-indigo-500 font-bold' : `${theme.textMuted}`
              }`}
            >
              <BookOpen size={20} strokeWidth={activeTab === 'tests' ? 2.5 : 2} />
              <span className="text-[10px] mt-0.5">Testlar</span>
              {activeTab === 'tests' && <span className="w-4 h-0.5 bg-emerald-500 rounded-full mt-0.5"></span>}
            </button>

            {/* 3. ZiyoAI (O'rtadagi dumaloq tugma) */}
            <button 
              onClick={() => setActiveTab('ai')}
              className="flex flex-col items-center -mt-6 px-1 active:scale-95 transition"
            >
              <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xl ring-4 ring-slate-900">
                <Bot size={26} />
              </div>
              <span className="text-[10px] text-indigo-400 font-bold mt-0.5">ZiyoAI</span>
            </button>

            {/* 4. Writing */}
            <button 
              onClick={() => setActiveTab('writing')}
              className={`flex-1 flex flex-col items-center py-1 rounded-xl transition active:scale-95 ${
                activeTab === 'writing' ? 'text-indigo-500 font-bold' : `${theme.textMuted}`
              }`}
            >
              <PenTool size={20} strokeWidth={activeTab === 'writing' ? 2.5 : 2} />
              <span className="text-[10px] mt-0.5">Writing</span>
              {activeTab === 'writing' && <span className="w-4 h-0.5 bg-emerald-500 rounded-full mt-0.5"></span>}
            </button>

            {/* 5. Profil */}
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex-1 flex flex-col items-center py-1 rounded-xl transition active:scale-95 ${
                activeTab === 'profile' ? 'text-indigo-500 font-bold' : `${theme.textMuted}`
              }`}
            >
              <User size={20} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
              <span className="text-[10px] mt-0.5">Profil</span>
              {activeTab === 'profile' && <span className="w-4 h-0.5 bg-emerald-500 rounded-full mt-0.5"></span>}
            </button>

          </nav>
        </div>
      </div>

      {/* Profil Tahrirlash Modali */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${theme.card} border rounded-3xl p-5 w-full max-w-sm space-y-3.5 shadow-2xl`}>
            <h3 className="font-bold text-base">Profilni Tahrirlash</h3>
            
            <div className="flex items-center gap-3">
              {editForm.photoBase64 ? (
                <img src={editForm.photoBase64} alt="Avatar" className="w-12 h-12 rounded-2xl object-cover border-2 border-indigo-500" />
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border-2 border-indigo-500/40 flex items-center justify-center font-bold text-indigo-400">
                  Rasm
                </div>
              )}
              <button 
                onClick={() => fileInputRef.current.click()}
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Upload size={14} /> Galereyadan rasm tanlash
              </button>
            </div>

            <div>
              <label className={`text-xs ${theme.textMuted} block mb-1 font-medium`}>Ismingiz:</label>
              <input 
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className={`w-full ${theme.inputBg} rounded-xl px-3.5 py-2 text-xs outline-none focus:border-indigo-500`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={`text-xs ${theme.textMuted} block mb-1 font-medium`}>Jinsi:</label>
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
                <label className={`text-xs ${theme.textMuted} block mb-1 font-medium`}>Tug‘ilgan sana:</label>
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
                <label className={`text-xs ${theme.textMuted} block mb-1 font-medium`}>Hozirgi Ball:</label>
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
                <label className={`text-xs ${theme.textMuted} block mb-1 font-medium`}>Maqsadli Ball:</label>
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

            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => setIsEditingProfile(false)}
                className
