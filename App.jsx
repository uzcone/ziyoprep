import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Headphones, PenTool, Mic, Bot, User, 
  Play, Pause, RotateCcw, CheckCircle2, XCircle, Award, 
  Sparkles, Send, Volume2, ChevronRight, Edit3, ArrowLeft, 
  Layers, Sun, Moon, Target, TrendingUp, Clock, AlertTriangle,
  CheckSquare, Square, FileText, Compass, BarChart3, BookmarkCheck
} from 'lucide-react';

export default function App() {
  // --- 1. REJIM (DARK / LIGHT THEME) ---
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

  // --- 2. FOYDALANUVCHI PROFILI VA BALLAR (SAQLANUVCHI) ---
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('ziyoprep_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      name: 'Tokhirbek',
      avatar: '🥷',
      currentBand: '6.0',     // Hozirgi haqiqiy diagnostika natijasi
      targetBand: '7.5',      // Maqsad qilingan ball
      currentLevel: 'B2 Upper-Intermediate',
      daysLeft: 45,
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

  // Kunlik reja holatlari
  const [dailyTasks, setDailyTasks] = useState(() => {
    const saved = localStorage.getItem('ziyoprep_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 1, title: 'Academic Reading: Matching Headings', duration: '20 daq', done: false, type: 'reading' },
      { id: 2, title: 'Listening Section 2: Form & Note completion', duration: '15 daq', done: false, type: 'listening' },
      { id: 3, title: 'Band 7.5+ Lug\'at: 5 ta Collocation yodlash', duration: '10 daq', done: true, type: 'vocab' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('ziyoprep_user', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('ziyoprep_tasks', JSON.stringify(dailyTasks));
  }, [dailyTasks]);

  const toggleTask = (id) => {
    setDailyTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // Asosiy sahifalar: 'home' | 'tests' | 'ai' | 'mistakes' | 'reading_test' | 'listening_test' | 'vocab'
  const [activeTab, setActiveTab] = useState('home');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempName, setTempName] = useState(userProfile.name);
  const [tempCurrentBand, setTempCurrentBand] = useState(userProfile.currentBand);
  const [tempTargetBand, setTempTargetBand] = useState(userProfile.targetBand);

  // --- 3. TO'LIQ ACADEMIC READING TESTI (60 DAQ TAYMER VA 2 TA SAVOL TURI) ---
  const [readingTime, setReadingTime] = useState(60 * 60); // 60 daqiqa (soniyalarda)
  const [readingTimerRunning, setReadingTimerRunning] = useState(false);
  const [highlightEvidence, setHighlightEvidence] = useState(false);
  const [readingAnswers, setReadingAnswers] = useState({});
  const [readingChecked, setReadingChecked] = useState(false);

  useEffect(() => {
    let interval = null;
    if (readingTimerRunning && readingTime > 0) {
      interval = setInterval(() => setReadingTime(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [readingTimerRunning, readingTime]);

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const readingHeadings = [
    "i. The financial burden of urbanization",
    "ii. Neurological benefits extending to older age",
    "iii. Linguistic conflict in young infants",
    "iv. Enhanced executive control and mental flexibility"
  ];

  const readingQuestions = [
    {
      id: "h1",
      type: "heading",
      question: "Paragraph A uchun mos sarlavhani tanlang:",
      paragraphRef: "A",
      options: readingHeadings,
      correct: "iv. Enhanced executive control and mental flexibility",
      explanation: "Paragraf A da ko'p tilli insonlarning vazifalarni almashtirish (task-switching) va miya moslashuvchanligi bayon qilingan."
    },
    {
      id: "h2",
      type: "heading",
      question: "Paragraph B uchun mos sarlavhani tanlang:",
      paragraphRef: "B",
      options: readingHeadings,
      correct: "ii. Neurological benefits extending to older age",
      explanation: "Paragraf B da kognitiv moslashuv keksayganda ham davom etishi va asabiy buzilishlarni kechiktirishi keltirilgan."
    },
    {
      id: "tf1",
      type: "tfng",
      question: "1. Learning multiple languages leads to long-term cognitive interference in adults.",
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct: "FALSE",
      explanation: "Matnda aniq keltirilgan: 'Far from creating linguistic interference, navigating between discrete semantic frameworks strengthens executive control'."
    },
    {
      id: "tf2",
      type: "tfng",
      question: "2. MRI scans confirmed changes in the right hemisphere of multilingual patients.",
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct: "NOT GIVEN",
      explanation: "Matnda faqat 'left inferior parietal cortex' qayd etilgan, o'ng yarimshar (right hemisphere) haqida ma'lumot berilmagan."
    }
  ];

  // --- 4. ZIYOAI EXAMINER VA SHAXSIY MASLAHAT ---
  const [chatMessages, setChatMessages] = useState([
    { 
      role: 'ai', 
      text: `Salom ${userProfile.name}! Hozirgi ballingiz Band ${userProfile.currentBand}, maqsadimiz esa Band ${userProfile.targetBand}. Sizda Reading bo'limida 'Matching Headings' bo'yicha ko'p xatolar bor. Bugun aynan shu ko'nikmani 7.5 ga ko'tarish ustida ishlaymizmi?` 
    }
  ]);
  const [inputMsg, setInputMsg] = useState("");

  const sendAiMessage = () => {
    if (!inputMsg.trim()) return;
    const newMsgs = [...chatMessages, { role: 'user', text: inputMsg }];
    setChatMessages(newMsgs);
    setInputMsg("");

    setTimeout(() => {
      let reply = "";
      const text = inputMsg.toLowerCase();
      if (text.includes('reja') || text.includes('plan')) {
        reply = `Band ${userProfile.targetBand} ga yetish uchun kunlik rejangiz: 1) 20 daqiqa Reading skimmig, 2) Kamida 10 ta yangi akademik kollokatsiya, 3) Haftada 2 ta to'liq Writing Task 2 essesi yozish.`;
      } else if (text.includes('heading') || text.includes('reading')) {
        reply = "Matching Headings sirli qoidasi: Sarlavhalarni o'qishdan oldin paragrafning birinchi va oxirgi 2 ta gapini diqqat bilan o'qing. Paragrafdagi umumiy g'oyani (Main idea) bitta so'zga emas, umumiy ma'noga qarab moslang.";
      } else {
        reply = `Savolingiz qabul qilindi. Hozirgi darajangiz (${userProfile.currentBand}) dan ${userProfile.targetBand} ga chiqishda eng muhim narsa xatolar daftarini muntazam tahlil qilib borishdir.`;
      }

      setChatMessages(prev => [...prev, { role: 'ai', text: reply }]);
      if ('speechSynthesis' in window) {
        const ut = new SpeechSynthesisUtterance(reply);
        ut.lang = 'uz-UZ';
        window.speechSynthesis.speak(ut);
      }
    }, 600);
  };

  // Dinamik Mavzu (Themes)
  const theme = {
    bg: isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900',
    card: isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm',
    subCard: isDarkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200',
    header: isDarkMode ? 'bg-slate-950/95 border-slate-800' : 'bg-white/95 border-slate-200',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-slate-500',
    navBg: isDarkMode ? 'bg-slate-950/95 border-slate-800/90' : 'bg-white/95 border-slate-200/90',
    inputBg: isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
  };

  // ==========================================
  // 1. YANGILANGAN BOSH SAHIFA
  // ==========================================
  const renderHome = () => (
    <div className="space-y-4 animate-fadeIn">
      {/* Profil va Streak */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-13 h-13 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-3xl shadow-sm">
            {userProfile.avatar}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-lg font-bold">{userProfile.name}</h2>
              <button 
                onClick={() => {
                  setTempName(userProfile.name);
                  setTempCurrentBand(userProfile.currentBand);
                  setTempTargetBand(userProfile.targetBand);
                  setIsEditingProfile(true);
                }}
                className="text-slate-400 hover:text-indigo-500"
              >
                <Edit3 size={15} />
              </button>
            </div>
            <span className="text-xs text-indigo-500 font-semibold">{userProfile.currentLevel}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/25 px-3 py-1 rounded-full">
          <span className="text-xs font-bold text-amber-500">🔥 {userProfile.streak} kun</span>
        </div>
      </div>

      {/* HAQIQIY BALL vs MAQSADLI BALL (AJRATILGAN KARTA) */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-700 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-15 pointer-events-none">
          <Target size={160} />
        </div>

        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/20">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-indigo-200 font-semibold flex items-center gap-1">
              <BarChart3 size={13} /> Hozirgi Natija
            </span>
            <div className="text-3xl font-black mt-1">Band {userProfile.currentBand}</div>
            <span className="text-[10px] text-indigo-100">Oxirgi mock test tahlili</span>
          </div>
          <div className="border-l border-white/20 pl-4">
            <span className="text-[11px] uppercase tracking-wider text-amber-200 font-semibold flex items-center gap-1">
              <Target size={13} /> Maqsadli Ball
            </span>
            <div className="text-3xl font-black mt-1 text-amber-300">Band {userProfile.targetBand}</div>
            <span className="text-[10px] text-indigo-100">Oraliq farq: +{(parseFloat(userProfile.targetBand) - parseFloat(userProfile.currentBand)).toFixed(1)} ball</span>
          </div>
        </div>

        {/* Ko'nikmalar kesimi */}
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

      {/* ZAIF TOMONLARIM OGOHLANTIRISH BLOKI */}
      <div className="bg-rose-500/10 border border-rose-500/25 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle size={20} className="text-rose-500 shrink-0 mt-0.5" />
        <div className="flex-1 text-xs">
          <div className="font-bold text-rose-500 text-sm">Zaif tomoningiz aniqlandi:</div>
          <p className={`${theme.textMuted} mt-0.5 font-medium`}>{userProfile.weakSkill}</p>
          <button 
            onClick={() => setActiveTab('reading_test')}
            className="mt-2 text-xs font-bold text-rose-600 dark:text-rose-400 underline flex items-center gap-1"
          >
            Hozir ushbu bo'lim bo'yicha mashq qilish <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* BUGUNGI KUNLIK REJA (CHECKLIST) */}
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

      {/* ZIYOAI MURABBIY BANNERI */}
      <div 
        onClick={() => setActiveTab('ai')}
        className={`${theme.card} border rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:border-indigo-500 transition group shadow-sm`}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md">
            <Bot size={24} />
          </div>
          <div>
            <h4 className="font-bold text-sm group-hover:text-indigo-500 transition flex items-center gap-1.5">
              ZiyoAI Shaxsiy Murabbiy <Sparkles size={15} className="text-amber-400" />
            </h4>
            <p className={`text-xs ${theme.textMuted}`}>Xatolar tahlili, individual dars jadvali va yo'l-yo'riq</p>
          </div>
        </div>
        <ChevronRight size={20} className={`${theme.textMuted} group-hover:text-indigo-500 transition`} />
      </div>

      {/* TEZKOR TEST BO'LIMLARI */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-xs font-bold uppercase tracking-wider ${theme.textMuted}`}>IELTS Ko'nikmalari</h3>
          <button onClick={() => setActiveTab('tests')} className="text-xs font-bold text-indigo-500">Barchasi</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setActiveTab('reading_test')}
            className={`${theme.card} border p-4 rounded-2xl text-left transition active:scale-95 space-y-2`}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center">
              <BookOpen size={20} />
            </div>
            <div>
              <div className="font-bold text-sm">Academic Reading</div>
              <div className={`text-[11px] ${theme.textMuted}`}>60 daq, Headings & TFNG</div>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('tests')}
            className={`${theme.card} border p-4 rounded-2xl text-left transition active:scale-95 space-y-2`}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
              <Headphones size={20} />
            </div>
            <div>
              <div className="font-bold text-sm">Listening Audio</div>
              <div className={`text-[11px] ${theme.textMuted}`}>Aksentlar & bo'limlar</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // 2. TO'LIQ ACADEMIC READING TESTI (MATCHING HEADINGS + TFNG)
  // ==========================================
  const renderReadingTest = () => (
    <div className="space-y-4 animate-fadeIn">
      {/* Test Header va Taymer */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-700/40">
        <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-xs text-indigo-500 font-bold">
          <ArrowLeft size={16} /> Testdan Chiqish
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

      {/* Matn va Asoslarni Belgilash (Highlight Evidence) */}
      <div className={`${theme.card} border rounded-2xl p-4 text-xs space-y-3 leading-relaxed max-h-72 overflow-y-auto`}>
        <div className="flex justify-between items-center pb-2 border-b border-slate-700/20">
          <span className="font-black text-sm text-indigo-500">Reading Passage 2</span>
          <button 
            onClick={() => setHighlightEvidence(!highlightEvidence)}
            className={`text-[11px] px-2.5 py-1 rounded-lg border font-bold transition ${
              highlightEvidence ? 'bg-amber-500/20 text-amber-500 border-amber-500/40' : 'bg-slate-200 dark:bg-slate-800'
            }`}
          >
            {highlightEvidence ? "Asosiy dalillar belgilandi ✓" : "Matndan dalillarni ajratish"}
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

      {/* Savollar to'plami */}
      <div className="space-y-3">
        <h4 className="font-bold text-sm flex items-center gap-2">
          <FileText size={16} className="text-indigo-500" /> Savollar: Matching Headings & TFNG
        </h4>

        {readingQuestions.map(q => (
          <div key={q.id} className={`${theme.card} border rounded-2xl p-4 text-xs space-y-2`}>
            <p className="font-bold">{q.question}</p>
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
                  {readingAnswers[q.id] === q.correct ? "✓ To'g'ri javob" : `✗ Xato (To'g'risi: ${q.correct})`}
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
          Testni Yakunlash va Xatolarni Tahlil Qilish
        </button>
      </div>
    </div>
  );

  // ==========================================
  // 3. IELTS TESTLAR HUBI
  // ==========================================
  const renderTestsHub = () => (
    <div className="space-y-4 animate-fadeIn">
      <h3 className="font-bold text-base">IELTS Mock & Bo'lim Testlari</h3>
      <div className="grid grid-cols-1 gap-3">
        <div 
          onClick={() => setActiveTab('reading_test')}
          className={`${theme.card} border p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:border-indigo-500 transition`}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center">
              <BookOpen size={24} />
            </div>
            <div>
              <div className="font-bold text-sm">Academic Reading — Cambridge #18</div>
              <div className={`text-xs ${theme.textMuted}`}>60 daqiqa • Matching Headings, TFNG, Summary</div>
            </div>
          </div>
          <ChevronRight size={20} className={theme.textMuted} />
        </div>

        <div className={`${theme.card} border p-4 rounded-2xl flex items-center justify-between opacity-80`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
              <Headphones size={24} />
            </div>
            <div>
              <div className="font-bold text-sm">Listening Section 1-4</div>
              <div className={`text-xs ${theme.textMuted}`}>30 daqiqa • Britaniya va Avstraliya aksentlari</div>
            </div>
          </div>
          <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-md font-bold">Tez kunda</span>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // 4. ZIYOAI SHAXSIY MURABBIY
  // ==========================================
  const renderAiChat = () => (
    <div className="h-full flex flex-col space-y-3 animate-fadeIn">
      <div className="flex items-center justify-between pb-2 border-b border-slate-700/40">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
            <Bot size={22} />
          </div>
          <div>
            <h3 className="font-bold text-sm">ZiyoAI Murabbiy</h3>
            <span className="text-[11px] text-emerald-500 font-semibold">● IELTS Band {userProfile.targetBand} strategiyasi faol</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs max-h-[60vh]">
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
        <input 
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendAiMessage()}
          placeholder="Xatolar yoki tayyorgarlik bo'yicha savol bering..."
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
  // 5. XATOLAR DAFTARI VA PROFIL
  // ==========================================
  const renderMistakesAndProfile = () => (
    <div className="space-y-4 animate-fadeIn">
      <h3 className="font-bold text-base">Xatolar Daftari & Profil</h3>

      <div className={`${theme.card} border rounded-2xl p-4 space-y-3`}>
        <div className="flex items-center gap-2 font-bold text-sm text-rose-500">
          <AlertTriangle size={18} /> Avvalgi Testlardagi Asosiy Xatolar:
        </div>
        <div className="space-y-2 text-xs">
          <div className={`p-3 rounded-xl ${theme.subCard} border border-rose-500/20`}>
            <div className="font-bold text-slate-200">Reading: TFNG va Not Given chalkashligi</div>
            <p className={`${theme.textMuted} mt-1`}>Fakt matnda umuman berilmagan bo'lsa, uni FALSE emas, NOT GIVEN deb belgilang.</p>
          </div>
          <div className={`p-3 rounded-xl ${theme.subCard} border border-rose-500/20`}>
            <div className="font-bold text-slate-200">Writing Task 2: So'z soni yetishmasligi</div>
            <p className={`${theme.textMuted} mt-1`}>Esse kamida 250 so'z bo'lishi shart, aks holda Task Achievement'dan ball tushadi.</p>
          </div>
        </div>
      </div>

      <div className={`${theme.card} border rounded-2xl p-4 space-y-2 text-xs`}>
        <h4 className="font-bold text-sm">Shaxsiy Ma'lumotlar</h4>
        <div className="flex justify-between py-1.5 border-b border-slate-700/20">
          <span className={theme.textMuted}>Ism:</span>
          <span className="font-bold">{userProfile.name}</span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-slate-700/20">
          <span className={theme.textMuted}>Hozirgi diagnostika:</span>
          <span className="font-bold text-indigo-500">Band {userProfile.currentBand}</span>
        </div>
        <div className="flex justify-between py-1.5">
          <span className={theme.textMuted}>Maqsadli ball:</span>
          <span className="font-bold text-amber-500">Band {userProfile.targetBand}</span>
        </div>
      </div>
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
            title="Mavzuni almashtirish"
          >
            {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
          </button>
        </div>
      </header>

      {/* Asosiy Ekran Maydoni */}
      <main className="flex-1 w-full max-w-lg mx-auto p-4 pb-28">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'tests' && renderTestsHub()}
        {activeTab === 'reading_test' && renderReadingTest()}
        {activeTab === 'ai' && renderAiChat()}
        {activeTab === 'mistakes' && renderMistakesAndProfile()}
      </main>

      {/* 4 TA TOZA VA ANIQ BO'LINGAN NAVIGATSIYA USTUNI */}
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
            <span className="text-xs font-medium">IELTS Testlar</span>
          </button>

          {/* ZiyoAI Murabbiy */}
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
            onClick={() => setActiveTab('mistakes')}
            className={`flex flex-col items-center gap-1.5 py-1 px-3 rounded-2xl transition active:scale-95 ${
              activeTab === 'mistakes' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : `${theme.textMuted}`
            }`}
          >
            <BookmarkCheck size={24} strokeWidth={activeTab === 'mistakes' ? 2.5 : 2} />
            <span className="text-xs font-medium">Xatolarim</span>
          </button>

        </div>
      </nav>

      {/* Profilni Tahrirlash Modali */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${theme.card} border rounded-3xl p-5 w-full max-w-sm space-y-4 shadow-2xl`}>
            <h3 className="font-bold text-base">Ball va Profil Sozlamalari</h3>
            
            <div>
              <label className={`text-xs ${theme.textMuted} block mb-1 font-medium`}>Ismingiz:</label>
              <input 
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className={`w-full ${theme.inputBg} rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-indigo-500`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={`text-xs ${theme.textMuted} block mb-1 font-medium`}>Hozirgi Ball:</label>
                <select
                  value={tempCurrentBand}
                  onChange={(e) => setTempCurrentBand(e.target.value)}
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
                  value={tempTargetBand}
                  onChange={(e) => setTempTargetBand(e.target.value)}
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
                  setUserProfile(prev => ({
                    ...prev,
                    name: tempName.trim() || 'Tokhirbek',
                    currentBand: tempCurrentBand,
                    targetBand: tempTargetBand
                  }));
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
