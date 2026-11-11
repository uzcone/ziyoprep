import React, { useState, useEffect } from 'react';
import { 
  Compass, BookOpen, Headphones, PenTool, Mic, Bot, User, 
  Play, Pause, RotateCcw, CheckCircle2, XCircle, Award, 
  Sparkles, Send, Volume2, ChevronRight, Edit3, ArrowLeft, 
  Layers, Sun, Moon, Target, TrendingUp, Clock, AlertTriangle,
  CheckSquare, Square, FileText, BarChart3, BookmarkCheck,
  Calendar, Cake, ArrowRight, Zap, RefreshCw
} from 'lucide-react';

export default function App() {
  // --- 1. MAVZU (DARK / LIGHT REJIM) ---
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

  // --- 2. O'QUVCHI PROFILI VA MA'LUMOTLAR ---
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
      xp: 420,
      completedTests: 14,
      weakSkill: 'Reading: Matching Headings (42% aniqlik)',
      lastActivity: 'Academic Reading Passage 2 (7/10 tugallandi)'
    };
  });

  const [scores, setScores] = useState(() => {
    const saved = localStorage.getItem('ziyoprep_scores');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return { listening: '6.5', reading: '6.0', writing: '5.5', speaking: '6.0' };
  });

  // --- 3. KUNDALIK REJA (DAILY STUDY PLAN) ---
  const [dailyPlan, setDailyPlan] = useState(() => {
    const saved = localStorage.getItem('ziyoprep_daily_plan');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 1, section: 'Reading', title: 'Matching Headings & TFNG', duration: '30 daq', done: false, xp: 50 },
      { id: 2, section: 'Listening', title: 'Section 2: Form & Note Completion', duration: '20 daq', done: false, xp: 40 },
      { id: 3, section: 'Vocabulary', title: 'Band 7.5–9.0 uchun 10 ta yangi so‘z', duration: '15 daq', done: true, xp: 25 }
    ];
  });

  useEffect(() => {
    localStorage.setItem('ziyoprep_user', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('ziyoprep_daily_plan', JSON.stringify(dailyPlan));
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

  // Navigatsiya holati: 'home' | 'tests' | 'ai' | 'profile_mistakes' | 'reading' | 'listening' | 'writing' | 'speaking' | 'vocab'
  const [activeTab, setActiveTab] = useState('home');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState(userProfile);

  // --- 4. READING MODULI (60 DAQ TAYMER VA EVIDENCE HIGHLIGHTING) ---
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

  const readingQuestions = [
    {
      id: "q1",
      type: "Matching Headings",
      question: "Paragraph A uchun eng mos sarlavhani tanlang:",
      options: [
        "i. The negative consequences of language switching",
        "ii. Cognitive flexibility and executive control enhancement",
        "iii. Financial impact of multilingual educational systems"
      ],
      correct: "ii. Cognitive flexibility and executive control enhancement",
      explanation: "Matnda aniq keltirilgan: 'navigating between discrete semantic frameworks strengthens executive control and mental flexibility'."
    },
    {
      id: "q2",
      type: "True / False / Not Given",
      question: "Neuroplastic adaptations caused by multilingualism fade away during older age.",
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct: "FALSE",
      explanation: "Matnda buning aksi tasdiqlangan: 'these neuroprotective adaptations persist well into older age, delaying cognitive decline'."
    }
  ];

  // --- 5. LISTENING MODULI (SPEECH SYNTHESIS VA TEZLIK) ---
  const [listeningPlaying, setListeningPlaying] = useState(false);
  const [listeningSpeed, setListeningSpeed] = useState(1.0);
  const [listeningAnswers, setListeningAnswers] = useState({});
  const [listeningChecked, setListeningChecked] = useState(false);

  const listeningDialogue = "Good morning, Central Accommodation Agency. We have a private studio on Oakwood Road available from September 15th for 185 pounds per week, excluding metered electricity.";

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

  // --- 6. WRITING TASK 2 VA KRITERIYA TAHLILI ---
  const [essayText, setEssayText] = useState("");
  const [writingAnalysis, setWritingAnalysis] = useState(null);

  const evaluateEssay = () => {
    const words = essayText.trim().split(/\s+/).filter(Boolean).length;
    if (words < 20) {
      alert("Iltimos, tahlil qilish uchun kamida 20-30 so‘z kiriting.");
      return;
    }
    let band = 5.5;
    if (words >= 150) band = 6.0;
    if (words >= 250) band = 7.0;

    const hasAcademicConnectors = /furthermore|moreover|consequently|in contrast|nevertheless/i.test(essayText);
    if (hasAcademicConnectors && words >= 250) band += 0.5;

    setWritingAnalysis({
      band: band.toFixed(1),
      wordCount: words,
      taskAchievement: words >= 250 ? "Mavzu to'liq ochilgan (250+ so'z bajarildi)" : "So'z soni yetarli emas (kamida 250 so'z talab etiladi)",
      coherence: hasAcademicConnectors ? "Paragraflar va fikrlar o'rtasida mustahkam bog'lanish bor" : "Bog'lovchi iboralar (Furthermore, However) ko'proq ishlatilishi lozim",
      lexical: "Akademik so'z boyligi va sinonimlar qoniqarli",
      grammar: "Murakkab gap tuzilmalaridan foydalanilgan"
    });
  };

  // --- 7. ZIYOAI 4 TA MUSTAQIL REJIMI ---
  const [aiMode, setAiMode] = useState('coach'); // 'coach' | 'essay' | 'speaking' | 'grammar'
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: `Assalomu alaykum ${userProfile.name}! ZiyoAI shaxsiy IELTS murabbiyingizman. Bugungi dars rejangiz yoki zaif tomoningiz (${userProfile.weakSkill}) bo‘yicha mashq qilamizmi?` }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isAiListening, setIsAiListening] = useState(false);

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput("");

    setTimeout(() => {
      let reply = "";
      if (aiMode === 'essay') {
        reply = "Esse tahlili (Band 6.5): Fikrlar ketma-ketligi to‘g‘ri, ammo 'Task Response' bo‘yicha har bir argumentni hayotiy yoki statistik misol bilan quvvatlash lozim.";
      } else if (aiMode === 'speaking') {
        reply = "Speaking Part 2 tavsiyasi: 1 daqiqalik tayyorgarlikda gap tuzmang, faqat 4 ta kalit ibora va C1 darajadagi kollokatsiyalarni yozib oling.";
      } else if (aiMode === 'grammar') {
        reply = "Grammatika maslahati: Complex sentences (Although, Whereas) va Passive Voice strukturalaridan foydalanib gap tuzilishini xilma-xil qiling.";
      } else {
        reply = `Hozirgi diagnostik balingiz ${userProfile.currentBand}. Maqsadli ${userProfile.targetBand} ga chiqish uchun bugun Matching Headings bo‘yicha 30 daqiqa shug‘ullanamiz.`;
      }

      setChatMessages(prev => [...prev, { role: 'ai', text: reply }]);
      if ('speechSynthesis' in window) {
        const ut = new SpeechSynthesisUtterance(reply);
        ut.lang = 'uz-UZ';
        window.speechSynthesis.speak(ut);
      }
    }, 600);
  };

  // --- 8. LUG'AT MODULI (BAND 7.5–9.0 UCHUN LUG'AT) ---
  const [vocabIndex, setVocabIndex] = useState(0);
  const [showVocabMeaning, setShowVocabMeaning] = useState(false);
  const vocabCards = [
    { word: "Mitigate", type: "verb", band: "8.0", defUz: "Ta’sirini yumshatmoq, kamaytirmoq", example: "Effective policies can mitigate the impact of climate change." },
    { word: "Ubiquitous", type: "adjective", band: "8.5", defUz: "Hamma joyda uchraydigan, universal", example: "Digital technology has become ubiquitous in higher education." },
    { word: "Detrimental", type: "adjective", band: "7.5", defUz: "Zararli, ziyon keltiruvchi", example: "Sedentary lifestyle has a detrimental effect on academic stamina." }
  ];

  const speakVocabWord = (word) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const ut = new SpeechSynthesisUtterance(word);
    ut.lang = 'en-US';
    window.speechSynthesis.speak(ut);
  };

  // Mavzu ranglari (Styling)
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
  // 1. TAVSIYA ETILGAN TARTIBDAGI BOSH SAHIFA
  // ==========================================
  const renderHome = () => (
    <div className="space-y-4 animate-fadeIn">
      {/* 1. Profil va Streak — ism, daraja, ketma-ket o‘qish kunlari va XP */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={userProfile.photoUrl} 
            alt={userProfile.name}
            className="w-13 h-13 rounded-2xl object-cover border-2 border-indigo-500 shadow-sm" 
          />
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
          <span className="text-xs font-bold text-amber-500">🔥 {userProfile.streak} kun</span>
        </div>
      </div>

      {/* 2. IELTS Maqsadi — Maqsadli Band 7.5 va Haqiqiy oxirgi natija alohida */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-700 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/20">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-indigo-200 font-semibold flex items-center gap-1">
              <BarChart3 size={13} /> Haqiqiy Diagnostik Ball
            </span>
            <div className="text-3xl font-black mt-1">Band {userProfile.currentBand}</div>
            <span className="text-[10px] text-indigo-100">Rasmiy emas • Ichki baholash</span>
          </div>
          <div className="border-l border-white/20 pl-4">
            <span className="text-[11px] uppercase tracking-wider text-amber-200 font-semibold flex items-center gap-1">
              <Target size={13} /> Maqsadli Ball
            </span>
            <div className="text-3xl font-black mt-1 text-amber-300">Band {userProfile.targetBand}</div>
            <span className="text-[10px] text-indigo-100">Oraliq farq: +{(parseFloat(userProfile.targetBand) - parseFloat(userProfile.currentBand)).toFixed(1)} ball</span>
          </div>
        </div>

        {/* 4 Ta ko'nikma taqsimoti */}
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

      {/* 3. Bugungi Reja — vaqt va bo'limlar bilan */}
      <div className={`${theme.card} border rounded-2xl p-4 space-y-3`}>
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm flex items-center gap-2">
            <Clock size={16} className="text-indigo-500" /> Bugungi Kunlik Reja (Jami: 65 daq)
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
                <div>
                  <span className={`font-semibold ${task.done ? 'line-through opacity-80' : ''}`}>{task.title}</span>
                  <span className="block text-[10px] text-slate-400">{task.section}</span>
                </div>
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

      {/* 4. Davom ettirish — oxirgi to‘xtagan mashqni ochish */}
      <div 
        onClick={() => setActiveTab('reading')}
        className={`${theme.subCard} border border-indigo-500/30 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer hover:border-indigo-500 transition`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-500 flex items-center justify-center">
            <RefreshCw size={20} />
          </div>
          <div>
            <div className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">Davom ettirish</div>
            <div className="font-bold text-xs">{userProfile.lastActivity}</div>
          </div>
        </div>
        <ArrowRight size={18} className="text-indigo-500" />
      </div>

      {/* 5. To‘rtta IELTS Bo‘limi — Listening, Reading, Writing, Speaking */}
      <div>
        <h3 className={`text-xs font-bold uppercase tracking-wider ${theme.textMuted} mb-3`}>IELTS Bo‘limlari</h3>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setActiveTab('reading')}
            className={`${theme.card} border p-4 rounded-2xl text-left transition active:scale-95 space-y-2`}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center">
              <BookOpen size={20} />
            </div>
            <div>
              <div className="font-bold text-sm">Reading</div>
              <div className={`text-[11px] ${theme.textMuted}`}>60 daq, TFNG & Headings</div>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('listening')}
            className={`${theme.card} border p-4 rounded-2xl text-left transition active:scale-95 space-y-2`}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
              <Headphones size={20} />
            </div>
            <div>
              <div className="font-bold text-sm">Listening</div>
              <div className={`text-[11px] ${theme.textMuted}`}>4 Section & aksentlar</div>
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
              <div className="font-bold text-sm">Writing</div>
              <div className={`text-[11px] ${theme.textMuted}`}>Task 1 & Task 2 tahlil</div>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('speaking')}
            className={`${theme.card} border p-4 rounded-2xl text-left transition active:scale-95 space-y-2`}
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-500 flex items-center justify-center">
              <Mic size={20} />
            </div>
            <div>
              <div className="font-bold text-sm">Speaking</div>
              <div className={`text-[11px] ${theme.textMuted}`}>Part 1–3 AI suhbat</div>
            </div>
          </button>
        </div>
      </div>

      {/* 6. ZiyoAI Murabbiy Banneri */}
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
            <p className={`text-xs ${theme.textMuted}`}>Zaif tomonlarni aniqlash va Band 7.5 rejasi</p>
          </div>
        </div>
        <ChevronRight size={20} className={`${theme.textMuted} group-hover:text-indigo-500 transition`} />
      </div>

      {/* 7. Zaif Tomonlarim Bloki */}
      <div className="bg-rose-500/10 border border-rose-500/25 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle size={20} className="text-rose-500 shrink-0 mt-0.5" />
        <div className="flex-1 text-xs">
          <div className="font-bold text-rose-500 text-sm">Zaif tomonlaringiz tahlili:</div>
          <p className={`${theme.textMuted} mt-0.5 font-medium`}>{userProfile.weakSkill}</p>
          <button 
            onClick={() => setActiveTab('reading')}
            className="mt-2 text-xs font-bold text-rose-600 dark:text-rose-400 underline flex items-center gap-1"
          >
            Hozir ushbu savol turi ustida mashq qilish <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* 8. Lug‘at va Xatolar Daftarim — "Band 7.5–9.0 uchun lug‘at" */}
      <div className="grid grid-cols-2 gap-3">
        <div 
          onClick={() => setActiveTab('vocab')}
          className={`${theme.card} border p-4 rounded-2xl cursor-pointer hover:border-indigo-500 transition space-y-1`}
        >
          <div className="flex items-center gap-2 text-indigo-500 font-bold text-xs">
            <Layers size={16} /> Lug‘at Moduli
          </div>
          <h4 className="font-bold text-sm">Band 7.5–9.0 uchun lug‘at</h4>
          <p className={`text-[11px] ${theme.textMuted}`}>Collocations & audiolari</p>
        </div>

        <div 
          onClick={() => setActiveTab('profile_mistakes')}
          className={`${theme.card} border p-4 rounded-2xl cursor-pointer hover:border-indigo-500 transition space-y-1`}
        >
          <div className="flex items-center gap-2 text-rose-500 font-bold text-xs">
            <BookmarkCheck size={16} /> Tahlil
          </div>
          <h4 className="font-bold text-sm">Xatolar Daftari</h4>
          <p className={`text-[11px] ${theme.textMuted}`}>O‘zbekcha izohli xatolar</p>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // 2. READING TEST MODULI (60 DAQ TAYMER VA EVIDENCE)
  // ==========================================
  const renderReading = () => (
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

      <div className={`${theme.card} border rounded-2xl p-4 text-xs space-y-3 leading-relaxed max-h-72 overflow-y-auto`}>
        <div className="flex justify-between items-center pb-2 border-b border-slate-700/20">
          <span className="font-black text-sm text-indigo-500">Academic Reading Passage 2</span>
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
                Structural MRI scans reveal enhanced volume in the left inferior parietal cortex among multilingual adults. <mark className="bg-amber-300/40 text-inherit p-0.5 rounded">Crucially, longitudinal monitoring indicates these neuroprotective adaptations persist well into older age</mark>, effectively postponing cognitive decline.
              </span>
            ) : (
              "Structural MRI scans reveal enhanced volume in the left inferior parietal cortex among multilingual adults. Crucially, longitudinal monitoring indicates these neuroprotective adaptations persist well into older age, effectively postponing cognitive decline."
            )}
          </p>
        </div>
      </div>

      {/* Savollar */}
      <div className="space-y-3">
        {readingQuestions.map(q => (
          <div key={q.id} className={`${theme.card} border rounded-2xl p-4 text-xs space-y-2`}>
            <div className="flex justify-between">
              <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full font-bold">{q.type}</span>
            </div>
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
  // 3. LISTENING MODULI
  // ==========================================
  const renderListening = () => (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between pb-2 border-b border-slate-700/40">
        <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-xs text-indigo-500 font-bold">
          <ArrowLeft size={16} /> Bosh sahifa
        </button>
        <span className="text-xs bg-emerald-500/15 text-emerald-500 px-2.5 py-0.5 rounded-full font-bold">Section 1</span>
      </div>

      <div className={`${theme.card} border rounded-2xl p-4 space-y-3`}>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold uppercase tracking-wider ${theme.textMuted}`}>Audio (Britaniya Aksenti)</span>
          <div className="flex gap-1">
            {[0.8, 1.0, 1.2].map(speed => (
              <button 
                key={speed}
                onClick={() => setListeningSpeed(speed)}
                className={`text-xs px-2 py-0.5 rounded-md font-bold transition ${listeningSpeed === speed ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800'}`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleListeningAudio}
            className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md active:scale-95 transition"
          >
            {listeningPlaying ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
          </button>
          <div className="flex-1 text-xs">
            <div className="font-bold">Student Accommodation Inquiry</div>
            <div className={`${theme.textMuted}`}>{listeningPlaying ? "Audio yangramoqda..." : "Tinglash uchun bosing"}</div>
          </div>
        </div>
      </div>

      <div className={`${theme.card} border rounded-2xl p-4 space-y-3 text-xs`}>
        <h4 className="font-bold text-sm">Savollarga javob yozing:</h4>
        <div>
          <label className={`block mb-1 font-medium ${theme.textMuted}`}>1. Haftalik ijara narxi qancha? (£):</label>
          <input 
            type="text" 
            placeholder="Masalan: 185"
            value={listeningAnswers.a1 || ''}
            onChange={(e) => setListeningAnswers({ ...listeningAnswers, a1: e.target.value })}
            className={`w-full ${theme.inputBg} rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo-500`}
          />
        </div>
        <button 
          onClick={() => setListeningChecked(true)}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition"
        >
          Tekshirish
        </button>

        {listeningChecked && (
          <div className={`${theme.subCard} p-3 rounded-xl border text-xs`}>
            <span className="text-emerald-500 font-bold">To‘g‘ri javob: 185</span>
            <p className={`${theme.textMuted} mt-1`}>Matnda: "The weekly rent is 185 pounds" deb aniq aytildi.</p>
          </div>
        )}
      </div>
    </div>
  );

  // ==========================================
  // 4. WRITING TASK 2 VA KRITERIYA TAHLILI
  // ==========================================
  const renderWriting = () => {
    const wordCount = essayText.trim().split(/\s+/).filter(Boolean).length;
    return (
      <div className="space-y-4 animate-fadeIn">
        <div className="flex items-center justify-between pb-2 border-b border-slate-700/40">
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-xs text-indigo-500 font-bold">
            <ArrowLeft size={16} /> Bosh sahifa
          </button>
          <span className="text-xs bg-amber-500/15 text-amber-500 px-2.5 py-0.5 rounded-full font-bold">Task 2 (250 so‘z)</span>
        </div>

        <div className={`${theme.card} border rounded-2xl p-4 text-xs space-y-1.5`}>
          <span className="text-amber-500 font-bold uppercase text-[10px] tracking-wider">Mavzu:</span>
          <p className="font-medium leading-relaxed">
            "Some people believe that unpaid community service should be a compulsory part of high school programmes. To what extent do you agree or disagree?"
          </p>
        </div>

        <div className="relative">
          <textarea
            rows={8}
            value={essayText}
            onChange={(e) => setEssayText(e.target.value)}
            placeholder="Esse matnini bu yerga yozing..."
            className={`w-full ${theme.inputBg} rounded-2xl p-4 text-xs outline-none focus:border-indigo-500 leading-relaxed resize-none`}
          />
          <div className={`absolute bottom-3 right-3 text-xs ${theme.subCard} px-2.5 py-1 rounded-lg border`}>
            So‘zlar: <span className={wordCount >= 250 ? "text-emerald-500 font-bold" : "text-amber-500 font-bold"}>{wordCount}</span> / 250
          </div>
        </div>

        <button 
          onClick={evaluateEssay}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition active:scale-95 shadow-md flex items-center justify-center gap-2"
        >
          <Sparkles size={18} /> ZiyoAI 4 Kriteriya Bo‘yicha Baholash
        </button>

        {writingAnalysis && (
          <div className={`${theme.card} border border-indigo-500/40 rounded-2xl p-4 space-y-2 text-xs`}>
            <div className="flex justify-between items-center pb-2 border-b border-slate-700/30">
              <span className="font-bold">Taxminiy IELTS Bahosi:</span>
              <span className="text-base font-black text-indigo-500">Band {writingAnalysis.band}</span>
            </div>
            <p><strong>Task Achievement:</strong> {writingAnalysis.taskAchievement}</p>
            <p><strong>Coherence & Cohesion:</strong> {writingAnalysis.coherence}</p>
            <p><strong>Lexical Resource:</strong> {writingAnalysis.lexical}</p>
            <p><strong>Grammar:</strong> {writingAnalysis.grammar}</p>
          </div>
        )}
      </div>
    );
  };

  // ==========================================
  // 5. SPEAKING MODULI
  // ==========================================
  const renderSpeaking = () => (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between pb-2 border-b border-slate-700/40">
        <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-xs text-indigo-500 font-bold">
          <ArrowLeft size={16} /> Bosh sahifa
        </button>
        <span className="text-xs bg-rose-500/15 text-rose-500 px-2.5 py-0.5 rounded-full font-bold">Part 2 Cue Card</span>
      </div>

      <div className={`${theme.card} border rounded-2xl p-4 text-xs space-y-2`}>
        <h4 className="font-bold text-sm">Describe an achievement that you are proud of</h4>
        <ul className={`list-disc list-inside ${theme.textMuted} space-y-1 pt-1`}>
          <li>What the achievement was</li>
          <li>When and where it took place</li>
          <li>What difficulties you had to overcome</li>
          <li>Explain why this accomplishment was significant to you</li>
        </ul>
      </div>

      <div className={`${theme.card} border rounded-2xl p-5 text-center space-y-3`}>
        <div className="text-xs font-bold text-slate-400">AI Ovozli Mashg‘ulot</div>
        <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-500 mx-auto flex items-center justify-center">
          <Mic size={32} />
        </div>
        <p className="text-xs text-slate-300">Nutqni yozib oling — ZiyoAI uni grammatika, ravonlik va talaffuz bo‘yicha baholaydi.</p>
        <button 
          onClick={() => alert("Ovoz yozish boshlandi. Nutqingiz tugagach to‘xtatish tugmasini bosing.")}
          className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs transition"
        >
          Ovozni Yozishni Boshlash
        </button>
      </div>
    </div>
  );

  // ==========================================
  // 6. ZIYOAI SHAXSIY MURABBIY (4 TA REJIM)
  // ==========================================
  const renderAi = () => (
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

      {/* 4 Ta Mustaqil Rejim */}
      <div className="grid grid-cols-4 gap-1.5 text-[11px]">
        {[
          { id: 'coach', label: 'Murabbiy' },
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
        <input 
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
          placeholder={`${aiMode} bo‘yicha savolingizni yozing...`}
          className={`flex-1 ${theme.inputBg} rounded-xl px-3.5 py-3 text-xs outline-none focus:border-indigo-500`}
        />
        <button 
          onClick={sendChatMessage}
          className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition active:scale-95"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );

  // ==========================================
  // 7. BAND 7.5–9.0 UCHUN LUG‘AT
  // ==========================================
  const renderVocab = () => {
    const card = vocabCards[vocabIndex];
    return (
      <div className="space-y-4 animate-fadeIn">
        <div className="flex items-center justify-between pb-2 border-b border-slate-700/40">
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-xs text-indigo-500 font-bold">
            <ArrowLeft size={16} /> Bosh sahifa
          </button>
          <h3 className="font-bold text-sm">Band 7.5–9.0 uchun lug‘at</h3>
          <span className="text-xs bg-purple-500/15 text-purple-500 px-2.5 py-0.5 rounded-full font-bold">
            {vocabIndex + 1}/{vocabCards.length}
          </span>
        </div>

        <div 
          onClick={() => setShowVocabMeaning(!showVocabMeaning)}
          className={`${theme.card} border rounded-3xl p-6 text-center cursor-pointer shadow-lg min-h-[200px] flex flex-col justify-center items-center space-y-3 active:scale-98 transition`}
        >
          <span className="text-[11px] bg-indigo-500/15 text-indigo-500 px-3 py-1 rounded-full font-bold uppercase">
            IELTS Band {card.band}
          </span>
          <div className="text-3xl font-black tracking-tight flex items-center gap-2">
            {card.word}
            <button 
              onClick={(e) => { e.stopPropagation(); speakVocabWord(card.word); }}
              className="p-2 text-indigo-500 rounded-lg hover:bg-indigo-500/10"
            >
              <Volume2 size={20} />
            </button>
          </div>
          <span className={`text-xs italic ${theme.textMuted}`}>({card.type})</span>

          <div className="pt-2 border-t border-slate-700/20 w-full">
            {showVocabMeaning ? (
              <div className="space-y-1.5">
                <div className="text-sm font-bold text-emerald-500">{card.defUz}</div>
                <div className={`text-xs ${theme.textMuted} italic`}>"{card.example}"</div>
              </div>
            ) : (
              <div className={`text-xs ${theme.textMuted}`}>O‘zbekcha ma’nosi va misolini ko‘rish uchun bosing</div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            disabled={vocabIndex === 0}
            onClick={() => { setVocabIndex(v => v - 1); setShowVocabMeaning(false); }}
            className={`flex-1 py-3 ${theme.subCard} disabled:opacity-40 rounded-xl text-xs font-bold`}
          >
            Oldingisi
          </button>
          <button 
            disabled={vocabIndex === vocabCards.length - 1}
            onClick={() => { setVocabIndex(v => v + 1); setShowVocabMeaning(false); }}
            className="flex-1 py-3 bg-indigo-600 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
          >
            Keyingisi
          </button>
        </div>
      </div>
    );
  };

  // ==========================================
  // 8. PROFIL & XATOLAR DAFTARI
  // ==========================================
  const renderProfileAndMistakes = () => (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between pb-2 border-b border-slate-700/40">
        <h3 className="font-bold text-base">Profil & Xatolar Daftari</h3>
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
        <img 
          src={userProfile.photoUrl} 
          alt={userProfile.name}
          className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500 mx-auto shadow-md"
        />
        <div>
          <h3 className="text-xl font-black">{userProfile.name}</h3>
          <p className={`text-xs ${theme.textMuted}`}>{userProfile.gender} • {userProfile.currentLevel}</p>
        </div>
      </div>

      {/* Xatolar tahlili daftari */}
      <div className={`${theme.card} border rounded-2xl p-4 space-y-3 text-xs`}>
        <div className="flex items-center gap-2 font-bold text-sm text-rose-500">
          <AlertTriangle size={18} /> Avvalgi Testlardagi Xatolar Tahlili:
        </div>
        
        <div className="space-y-2">
          <div className={`p-3 rounded-xl ${theme.subCard} border border-rose-500/20`}>
            <div className="font-bold text-slate-200">Reading: Matching Headings</div>
            <p className="text-rose-400 mt-0.5">Xato sababi: Paragrafdagi umumiy g‘oyani emas, alohida kalit so‘zni qidirish.</p>
            <p className={`${theme.textMuted} mt-1`}>Maslahat: Paragrafning birinchi va oxirgi gaplariga e’tibor bering.</p>
          </div>

          <div className={`p-3 rounded-xl ${theme.subCard} border border-rose-500/20`}>
            <div className="font-bold text-slate-200">Writing Task 2: So‘z soni yetishmasligi</div>
            <p className="text-rose-400 mt-0.5">Xato sababi: 220 ta so‘z yozilgan (kamida 250 ta talab etiladi).</p>
            <p className={`${theme.textMuted} mt-1`}>Maslahat: Har bir argument uchun kamida 1 ta aniq misol qo‘shing.</p>
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

      {/* Asosiy Ekran Maydoni (Pastdan pb-32 oraliq bilan ta'minlangan) */}
      <main className="flex-1 w-full max-w-lg mx-auto p-4 pb-32">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'reading' && renderReading()}
        {activeTab === 'listening' && renderListening()}
        {activeTab === 'writing' && renderWriting()}
        {activeTab === 'speaking' && renderSpeaking()}
        {activeTab === 'vocab' && renderVocab()}
        {activeTab === 'ai' && renderAi()}
        {activeTab === 'profile_mistakes' && renderProfileAndMistakes()}
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
            onClick={() => setActiveTab('reading')}
            className={`flex flex-col items-center gap-1.5 py-1 px-3 rounded-2xl transition active:scale-95 ${
              activeTab === 'reading' || activeTab === 'listening' || activeTab === 'writing' || activeTab === 'speaking'
                ? 'text-indigo-600 dark:text-indigo-400 font-bold' : `${theme.textMuted}`
            }`}
          >
            <BookOpen size={24} strokeWidth={2} />
            <span className="text-xs font-medium">IELTS Testlar</span>
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
            onClick={() => setActiveTab('profile_mistakes')}
            className={`flex flex-col items-center gap-1.5 py-1 px-3 rounded-2xl transition active:scale-95 ${
              activeTab === 'profile_mistakes' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : `${theme.textMuted}`
            }`}
          >
            <User size={24} strokeWidth={activeTab === 'profile_mistakes' ? 2.5 : 2} />
            <span className="text-xs font-medium">Profil</span>
          </button>

        </div>
      </nav>

      {/* Profilni Tahrirlash Modali */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${theme.card} border rounded-3xl p-5 w-full max-w-sm space-y-3.5 shadow-2xl`}>
            <h3 className="font-bold text-base">Profil Sozlamalari</h3>
            
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
