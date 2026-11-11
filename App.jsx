import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, BookOpen, Headphones, PenTool, Mic, Bot, User, 
  Play, Pause, RotateCcw, CheckCircle2, XCircle, Award, 
  Sparkles, Send, Volume2, ChevronRight, Edit3, ArrowLeft, 
  Layers, Sun, Moon, Target, TrendingUp, Clock, AlertTriangle,
  CheckSquare, Square, FileText, BarChart3, BookmarkCheck,
  Calendar, Cake, ArrowRight, Zap, RefreshCw, Camera, Upload, 
  Check, Flame, Star, ShieldCheck, ChevronDown
} from 'lucide-react';

export default function App() {
  // --- 1. MAVZU REJIMI (DARK / LIGHT) ---
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

  // --- 2. FOYDALANUVCHI PROFILI (RASM LOCALSTORAGE'DA SAQLANADI) ---
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('ziyoprep_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      name: 'Tokhirbek',
      gender: 'Erkak',
      birthDate: '2004-05-18',
      photoBase64: '', // Telefon galereyasidan yuklangan haqiqiy rasm
      currentBand: '6.0',
      targetBand: '7.5',
      currentLevel: 'B2 Upper-Intermediate',
      streak: 5,
      xp: 540,
      completedTests: 16
    };
  });

  const [scores, setScores] = useState(() => {
    const saved = localStorage.getItem('ziyoprep_scores');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return { listening: '6.5', reading: '6.0', writing: '5.5', speaking: '6.0' };
  });

  // Kunlik reja (Daily Study Plan)
  const [dailyPlan, setDailyPlan] = useState(() => {
    const saved = localStorage.getItem('ziyoprep_plan');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 1, title: 'Academic Reading: 10 ta savolli to‘liq test', duration: '30 daq', done: false, xp: 60 },
      { id: 2, title: 'ZiyoAI Speaking Coach: Pronunciation & Fluency', duration: '20 daq', done: false, xp: 50 },
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

  // Navigatsiya holati: 'home' | 'tests' | 'ai' | 'profile' | 'reading_active'
  const [activeTab, setActiveTab] = useState('home');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState(userProfile);
  const fileInputRef = useRef(null);

  // Telefon galereyasidan rasm yuklash
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Rasm hajmi juda katta (maksimal 2MB bo‘lsin).");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => ({ ...prev, photoBase64: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- 3. TO‘LIQ ACADEMIC READING TESTI (10 TA SAVOL + 60 DAQ TAYMER) ---
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

  // 10 ta Cambridge standartidagi savollar to‘plami
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
      explanation: "Paragraf A da: 'navigating between discrete semantic frameworks strengthens executive control' deb ta'kidlangan."
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
      explanation: "Paragraf B da: 'adaptations persist well into older age, postponing neurodegenerative decline by 4.5 years'."
    },
    {
      id: "q3",
      type: "True / False / Not Given",
      question: "3. Learning two languages causes lifelong intellectual confusion in adults.",
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct: "FALSE",
      explanation: "Matnda buning aksi aytilgan: 'Far from creating interference, it strengthens mental flexibility'."
    },
    {
      id: "q4",
      type: "True / False / Not Given",
      question: "4. MRI scans specifically highlighted changes in the left inferior parietal cortex.",
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct: "TRUE",
      explanation: "Matnda aynan shunday deyilgan: 'scans reveal enhanced density in the left inferior parietal cortex'."
    },
    {
      id: "q5",
      type: "True / False / Not Given",
      question: "5. Monolinguals perform better during unexpected multitasking challenges.",
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct: "FALSE",
      explanation: "Aksincha, ko‘p tilli odamlar (bilinguals) vazifalarni tezroq almashtira olishi tasdiqlangan."
    },
    {
      id: "q6",
      type: "Multiple Choice",
      question: "6. According to Paragraph B, bilingualism delays symptoms of dementia by approximately:",
      options: ["A) 1.5 years", "B) 4.5 years", "C) Over 10 years", "D) Not mentioned"],
      correct: "B) 4.5 years",
      explanation: "Matnda aniq keltirilgan: 'delaying neurological deterioration by an average of 4.5 years'."
    },
    {
      id: "q7",
      type: "Sentence Completion",
      question: "7. Executive control is primarily fortified by alternating between distinct ________ frameworks.",
      options: ["A) emotional", "B) semantic", "C) geographical", "D) physiological"],
      correct: "B) semantic",
      explanation: "Matnda: 'navigating between discrete semantic frameworks' iborasi qo‘llangan."
    },
    {
      id: "q8",
      type: "Multiple Choice",
      question: "8. What methodology was employed to inspect structural neural alterations?",
      options: ["A) Genetic sequencing", "B) Structural MRI scans", "C) Behavioral questionnaires", "D) Blood tests"],
      correct: "B) Structural MRI scans",
      explanation: "Matnda: 'Structural MRI scans reveal enhanced volume in the cortex'."
    },
    {
      id: "q9",
      type: "True / False / Not Given",
      question: "9. Children learn a second language at double the speed of mature individuals.",
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct: "NOT GIVEN",
      explanation: "Matnda bolalar va kattalarning o‘rganish tezligi taqqoslanmagan."
    },
    {
      id: "q10",
      type: "Summary Completion",
      question: "10. In conclusion, mastering multilingual communication creates a vital cognitive ________ for later years.",
      options: ["A) barrier", "B) reserve", "C) burden", "D) confusion"],
      correct: "B) reserve",
      explanation: "Xulosada 'cognitive reserve' (kognitiv zaxira) shakllanishi aytib o‘tilgan."
    }
  ];

  // --- 4. ZIYOAI SPEAKING & PRONUNCIATION COACH (RASMDAGI ELSA/SPEAK USLUBIDA) ---
  const [speakingActive, setSpeakingActive] = useState(false);
  const [speakingTranscript, setSpeakingTranscript] = useState("I am from Tashkent, capital city in Uzbekistan. I love my hometown.");
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
    navBg: isDarkMode ? 'bg-slate-950/95 border-slate-800/90' : 'bg-white/95 border-slate-200/90',
    inputBg: isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
  };

  // ==========================================
  // 1. BOSH SAHIFA
  // ==========================================
  const renderHome = () => (
    <div className="space-y-4 animate-fadeIn">
      {/* Profil va Streak */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {userProfile.photoBase64 ? (
            <img 
              src={userProfile.photoBase64} 
              alt={userProfile.name}
              className="w-13 h-13 rounded-2xl object-cover border-2 border-indigo-500 shadow-md"
            />
          ) : (
            <div className="w-13 h-13 rounded-2xl bg-indigo-600/20 border-2 border-indigo-500/40 flex items-center justify-center text-xl font-black text-indigo-400">
              {userProfile.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-lg font-bold tracking-tight">{userProfile.name}</h2>
              <span className="text-xs bg-indigo-500/15 text-indigo-500 font-bold px-2 py-0.5 rounded-md">
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
        <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/25 px-3 py-1.5 rounded-full">
          <span className="text-xs font-bold text-amber-500">🔥 {userProfile.streak} kun streak</span>
        </div>
      </div>

      {/* Haqiqiy Ball vs Maqsadli Ball (Alohida) */}
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

        {/* 4 Ko'nikma natijalari */}
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

      {/* Bugungi 65 daqiqalik dars rejasi */}
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

      {/* ZiyoAI Speaking Coach Tezkori (Elsa / Speak uslubida) */}
      <div 
        onClick={() => setActiveTab('ai')}
        className={`${theme.card} border rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:border-indigo-500 transition group shadow-sm`}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Bot size={24} />
          </div>
          <div>
            <h4 className="font-bold text-sm group-hover:text-indigo-500 transition flex items-center gap-1.5">
              ZiyoAI Speaking Coach <Sparkles size={15} className="text-amber-400" />
            </h4>
            <p className={`text-xs ${theme.textMuted}`}>Talaffuz va ravonlik tahlili, "It's better to say" tuzatishlari</p>
          </div>
        </div>
        <ChevronRight size={20} className={`${theme.textMuted} group-hover:text-indigo-500 transition`} />
      </div>

      {/* IELTS Bo'limlari */}
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => setActiveTab('reading_active')}
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
          onClick={() => setActiveTab('ai')}
          className={`${theme.card} border p-4 rounded-2xl text-left transition active:scale-95 space-y-2`}
        >
          <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-500 flex items-center justify-center">
            <Mic size={20} />
          </div>
          <div>
            <div className="font-bold text-sm">Speaking Coach</div>
            <div className={`text-[11px] ${theme.textMuted}`}>Ovoz tahlili & Band ball</div>
          </div>
        </button>
      </div>
    </div>
  );

  // ==========================================
  // 2. TO‘LIQ ACADEMIC READING TESTI (10 TA SAVOL)
  // ==========================================
  const renderReadingTest = () => (
    <div className="space-y-4 animate-fadeIn">
      {/* Test Header */}
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

      {/* Matn & Dalillarni belgilash */}
      <div className={`${theme.card} border rounded-2xl p-4 text-xs space-y-3 leading-relaxed max-h-72 overflow-y-auto`}>
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

      {/* 10 ta Savol Ro'yxati */}
      <div className="space-y-3">
        <h4 className="font-bold text-sm flex items-center justify-between">
          <span>Savollar to‘plami (10 ta savol):</span>
          <span className="text-xs text-indigo-500 font-normal">
            Belgilangan: {Object.keys(readingAnswers).length} / 10
          </span>
        </h4>

        {fullReadingQuestions.map((q, idx) => (
          <div key={q.id} className={`${theme.card} border rounded-2xl p-4 text-xs space-y-2`}>
            <div className="flex justify-between items-center">
              <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full font-bold">
                {q.type}
              </span>
              <span className="text-slate-500 text-[10px]">Savol {idx + 1}/10</span>
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
            const correctCount = fullReadingQuestions.filter(q => readingAnswers[q.id] === q.correct).length;
            alert(`Test yakunlandi! Siz 10 tadan ${correctCount} ta to‘g‘ri javob berdingiz.`);
          }}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl text-xs transition active:scale-95 shadow-lg"
        >
          10 Ta Savolni Tekshirish va Xatolarni Tahlil Qilish
        </button>
      </div>
    </div>
  );

  // ==========================================
  // 3. ZIYOAI SPEAKING & PRONUNCIATION COACH (RASMDAGI DIZAYN)
  // ==========================================
  const renderSpeakingCoach = () => (
    <div className="space-y-4 animate-fadeIn">
      {/* Yuqori AI Tutor Boshqaruv Card */}
      <div className={`${theme.card} border rounded-3xl p-5 text-center space-y-3 relative overflow-hidden shadow-lg`}>
        <div className="relative w-24 h-24 mx-auto">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
            alt="AI Tutor"
            className="w-full h-full rounded-full object-cover border-4 border-indigo-500 shadow-md"
          />
          <button 
            onClick={() => speakText("That's a nice sentence! Let me analyze your pronunciation and grammar.")}
            className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-md"
          >
            <Volume2 size={16} />
          </button>
        </div>

        <div>
          <h3 className="font-bold text-base">ZiyoAI Speaking Coach</h3>
          <p className={`text-xs ${theme.textMuted}`}>Inglizcha gapiring — AI xatolarni va talaffuzni bir soniyada tahlil qiladi</p>
        </div>

        {/* O'quvchi gapirgan jumla */}
        <div className={`${theme.subCard} p-3.5 rounded-2xl text-left border text-xs space-y-1.5`}>
          <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Sizning nutqingiz:</div>
          <div className="font-medium text-slate-200">
            I am from Tashkent, <span className="bg-rose-500/20 text-rose-400 font-bold px-1.5 py-0.5 rounded border border-rose-500/40">{speakingAnalysis.mistakePart}</span> Uzbekistan. I love my hometown.
          </div>
        </div>
      </div>

      {/* "It's better to say" (Rasmdagi kabi aniq grammatik tahlil) */}
      <div className={`${theme.card} border border-emerald-500/40 rounded-2xl p-4 text-xs space-y-2 shadow-sm`}>
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

        <p className="font-bold text-slate-100 text-sm">{speakingAnalysis.fullBetter}</p>
        <p className="text-emerald-400 font-medium text-xs">
          • {speakingAnalysis.mistakePart} → <strong className="underline">{speakingAnalysis.betterSay}</strong>
        </p>

        <div className={`mt-2 p-3 rounded-xl ${theme.subCard} text-[11px] space-y-1`}>
          <span className="font-bold text-amber-400">💡 Qoida izohi (Expression):</span>
          <p className={`${theme.textMuted}`}>{speakingAnalysis.expressionRule}</p>
        </div>
      </div>

      {/* Pronunciation Coach — Foizli tahlil (Rasmdagi kabi) */}
      <div className={`${theme.card} border rounded-2xl p-4 text-xs space-y-3`}>
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm text-indigo-400">Pronunciation & Fluency Ballari:</span>
          <span className="text-xl font-black text-indigo-500">{speakingAnalysis.overallScore}%</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className={`${theme.subCard} p-2.5 rounded-xl border`}>
            <div className="text-[10px] text-slate-400">Fluency</div>
            <div className="font-black text-sm text-amber-400">{speakingAnalysis.fluency}%</div>
          </div>
          <div className={`${theme.subCard} p-2.5 rounded-xl border`}>
            <div className="text-[10px] text-slate-400">Pronunciation</div>
            <div className="font-black text-sm text-rose-400">{speakingAnalysis.pronunciation}%</div>
          </div>
          <div className={`${theme.subCard} p-2.5 rounded-xl border`}>
            <div className="text-[10px] text-slate-400">Completeness</div>
            <div className="font-black text-sm text-emerald-400">{speakingAnalysis.completeness}%</div>
          </div>
        </div>

        {/* Mikrofon tugmasi */}
        <div className="pt-2 text-center">
          <button 
            onClick={handleSimulateVoice}
            className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white shadow-xl transition active:scale-95 ${
              speakingActive ? 'bg-rose-600 animate-pulse ring-8 ring-rose-500/30' : 'bg-indigo-600 hover:bg-indigo-500'
            }`}
          >
            <Mic size={28} />
          </button>
          <span className="block text-xs text-slate-400 mt-2">
            {speakingActive ? "Nutqingiz tahlil qilinmoqda..." : "Gapirish uchun mikrofonni bosing"}
          </span>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // 4. FAQAT SHAXSIY PROFIL (BEGONA BLOKLARSIZ)
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

      {/* Profil Rasmi va Ism */}
      <div className={`${theme.card} border rounded-3xl p-6 text-center space-y-3 shadow-lg relative`}>
        <div className="relative w-24 h-24 mx-auto">
          {userProfile.photoBase64 ? (
            <img 
              src={userProfile.photoBase64} 
              alt={userProfile.name}
              className="w-full h-full rounded-2xl object-cover border-4 border-indigo-500 shadow-xl"
            />
          ) : (
            <div className="w-full h-full rounded-2xl bg-indigo-600/20 border-4 border-indigo-500/40 flex items-center justify-center text-3xl font-black text-indigo-400 shadow-inner">
              {userProfile.name.charAt(0)}
            </div>
          )}
          <button 
            onClick={() => fileInputRef.current.click()}
            className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 text-white rounded-xl shadow-lg border border-white/20 active:scale-95"
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
          <h3 className="text-xl font-black">{userProfile.name}</h3>
          <p className={`text-xs ${theme.textMuted}`}>{userProfile.gender} • {userProfile.currentLevel}</p>
        </div>
      </div>

      {/* Faqat Shaxsiy Ma'lumotlar va Ballar */}
      <div className={`${theme.card} border rounded-2xl p-4 space-y-3 text-xs`}>
        <h4 className="font-bold text-sm">Shaxsiy & Akademik Ko‘rsatkichlar</h4>

        <div className="flex justify-between py-2 border-b border-slate-700/20">
          <span className={theme.textMuted}>Tug‘ilgan sana:</span>
          <span className="font-bold flex items-center gap-1">
            <Cake size={14} className="text-pink-500" /> {userProfile.birthDate}
          </span>
        </div>

        <div className="flex justify-between py-2 border-b border-slate-700/20">
          <span className={theme.textMuted}>Jinsi:</span>
          <span className="font-bold">{userProfile.gender}</span>
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
          <span className={theme.textMuted}>Streak:</span>
          <span className="font-bold text-amber-500">🔥 {userProfile.streak} kun</span>
        </div>

        <div className="flex justify-between py-2">
          <span className={theme.textMuted}>Tugallangan testlar:</span>
          <span className="font-bold text-emerald-500">{userProfile.completedTests} ta</span>
        </div>
      </div>

      {/* Yutuqlar (Badges) */}
      <div className={`${theme.card} border rounded-2xl p-4 text-xs space-y-2.5`}>
        <h4 className="font-bold text-sm flex items-center gap-1.5">
          <Award size={16} className="text-amber-400" /> Yutuqlar & Natijalar
        </h4>
        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className={`${theme.subCard} p-2.5 rounded-xl border`}>
            <div className="text-lg">🎯</div>
            <div className="font-bold text-[11px] mt-1">Band 7.5 Aim</div>
          </div>
          <div className={`${theme.subCard} p-2.5 rounded-xl border`}>
            <div className="text-lg">🔥</div>
            <div className="font-bold text-[11px] mt-1">5 Days Streak</div>
          </div>
          <div className={`${theme.subCard} p-2.5 rounded-xl border`}>
            <div className="text-lg">📚</div>
            <div className="font-bold text-[11px] mt-1">10+ Tests</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen w-full ${theme.bg} flex flex-col font-sans select-none antialiased transition-colors duration-300`}>
      
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

      {/* Asosiy Kontent Maydoni */}
      <main className="flex-1 w-full max-w-lg mx-auto p-4 pb-32">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'tests' && renderReadingTest()}
        {activeTab === 'reading_active' && renderReadingTest()}
        {activeTab === 'ai' && renderSpeakingCoach()}
        {activeTab === 'profile' && renderProfileOnly()}
      </main>

      {/* RASMDAGI (IMAGE 3) ULTRA-MODERN FLOATING BOTTOM NAVIGATION */}
      <div className="fixed bottom-3 left-0 right-0 z-50 px-4 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <nav className="bg-slate-900/95 border border-slate-800/90 backdrop-blur-2xl rounded-[32px] px-3 py-2 shadow-2xl flex items-center justify-around relative">
            
            <button 
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition active:scale-95 ${
                activeTab === 'home' ? 'text-white font-bold' : 'text-slate-400'
              }`}
            >
              <Compass size={22} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
              <span className="text-[11px]">Asosiy</span>
              {activeTab === 'home' && <span className="w-6 h-1 bg-emerald-500 rounded-full mt-0.5"></span>}
            </button>

            <button 
              onClick={() => setActiveTab('tests')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition active:scale-95 ${
                activeTab === 'tests' || activeTab === 'reading_active' ? 'text-white font-bold' : 'text-slate-400'
              }`}
            >
              <BookOpen size={22} strokeWidth={2} />
              <span className="text-[11px]">Testlar</span>
              {(activeTab === 'tests' || activeTab === 'reading_active') && <span className="w-6 h-1 bg-emerald-500 rounded-full mt-0.5"></span>}
            </button>

            {/* O'rtadagi Dumaloq Katta ZiyoAI (Rasmdagi Exchange kabi) */}
            <button 
              onClick={() => setActiveTab('ai')}
              className="flex flex-col items-center -mt-8 active:scale-95 transition"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-xl ring-4 ring-slate-900">
                <Bot size={28} />
              </div>
              <span className="text-[11px] text-indigo-400 font-bold mt-1">ZiyoAI</span>
            </button>

            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition active:scale-95 ${
                activeTab === 'profile' ? 'text-white font-bold' : 'text-slate-400'
              }`}
            >
              <User size={22} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
              <span className="text-[11px]">Profil</span>
              {activeTab === 'profile' && <span className="w-6 h-1 bg-emerald-500 rounded-full mt-0.5"></span>}
            </button>

          </nav>
        </div>
      </div>

      {/* Profilni Tahrirlash Modali */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${theme.card} border rounded-3xl p-5 w-full max-w-sm space-y-3.5 shadow-2xl`}>
            <h3 className="font-bold text-base">Profil Ma'lumotlarini Tahrirlash</h3>
            
            {/* Rasm tanlash bloki */}
            <div className="flex items-center gap-3">
              {editForm.photoBase64 ? (
                <img src={editForm.photoBase64} alt="Avatar" className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500" />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border-2 border-indigo-500/40 flex items-center justify-center font-bold text-indigo-400">
                  Rasm
                </div>
              )}
              <div>
                <button 
                  onClick={() => fileInputRef.current.click()}
                  className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Upload size={14} /> Telefoningizdan rasm tanlash
                </button>
              </div>
            </div>

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
