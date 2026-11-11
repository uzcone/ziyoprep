import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Headphones, PenTool, Mic, Bot, User, 
  Play, Pause, RotateCcw, CheckCircle2, XCircle, Award, 
  Sparkles, Send, Volume2, ChevronRight, Edit3, ArrowLeft, 
  Layers, Sun, Moon
} from 'lucide-react';

export default function App() {
  // --- 1. KUNDUZGI / KECHKI REJIM (AUTO DARK / LIGHT) ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('ziyoprep_theme');
    if (savedTheme !== null) {
      return savedTheme === 'dark';
    }
    // Avtomatik soat tekshiruvi: 07:00 dan 19:00 gacha oq, kechqurun qora
    const currentHour = new Date().getHours();
    return currentHour < 7 || currentHour >= 19;
  });

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('ziyoprep_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // --- 2. LOCALSTORAGE BILAN SAQLANUVCHI PROFIL ---
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('ziyoprep_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return {
      name: 'Tokhirbek',
      avatar: '🥷',
      targetBand: '7.5',
      currentLevel: 'B2 Upper-Intermediate',
      daysLeft: 24,
      streak: 5,
      completedTests: 12
    };
  });

  const [scores, setScores] = useState(() => {
    const saved = localStorage.getItem('ziyoprep_scores');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return { listening: '7.0', reading: '7.5', writing: '6.5', speaking: '7.0' };
  });

  useEffect(() => {
    localStorage.setItem('ziyoprep_user', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('ziyoprep_scores', JSON.stringify(scores));
  }, [scores]);

  // Tablar: 'home' | 'listening' | 'reading' | 'writing' | 'speaking' | 'vocab' | 'ai' | 'profile'
  const [activeTab, setActiveTab] = useState('home');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempName, setTempName] = useState(userProfile.name);
  const [tempBand, setTempBand] = useState(userProfile.targetBand);

  // --- 3. LISTENING AUDIO ---
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1.0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [listeningAnswers, setListeningAnswers] = useState({});
  const [listeningChecked, setListeningChecked] = useState(false);

  const listeningScript = [
    { speaker: "Adviser", text: "Good morning! City Housing Agency. How can I assist your student accommodation search today?" },
    { speaker: "Student", text: "Hello! I am enrolling at Central University next month and desperately need a quiet studio flat near campus." },
    { speaker: "Adviser", text: "Sure thing. We currently have a furnished studio on Oakwood Avenue. The weekly rent is 185 pounds." },
    { speaker: "Student", text: "Does that cover broadband internet and utility bills?" },
    { speaker: "Adviser", text: "Water and broadband are included, but electricity is metered separately. A security deposit of 400 pounds is required upfront." },
    { speaker: "Student", text: "That sounds reasonable. When is it officially available for move-in?" },
    { speaker: "Adviser", text: "The current lease concludes on the 14th of September, so you can collect keys on September 15th." }
  ];

  const playListeningAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert("Kechirasiz, brauzeringiz ovoz sintezini qo'llab-quvvatlamaydi.");
      return;
    }
    if (audioPlaying) {
      window.speechSynthesis.cancel();
      setAudioPlaying(false);
      return;
    }
    window.speechSynthesis.cancel();
    setAudioPlaying(true);

    const fullDialogue = listeningScript.map(s => `${s.speaker}: ${s.text}`).join('. ');
    const utterance = new SpeechSynthesisUtterance(fullDialogue);
    utterance.lang = 'en-GB';
    utterance.rate = audioSpeed;

    utterance.onend = () => setAudioPlaying(false);
    utterance.onerror = () => setAudioPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const resetListeningAudio = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setAudioPlaying(false);
  };

  // --- 4. READING ---
  const [readingAnswers, setReadingAnswers] = useState({});
  const [readingChecked, setReadingChecked] = useState(false);

  const readingQuestions = [
    {
      id: "q1",
      question: "1. Multilingual individuals exhibit enhanced cognitive flexibility compared to monolinguals.",
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct: "TRUE",
      explanation: "Matnda: 'bilingual minds demonstrate superior cognitive reserve and task-switching capability' deb tasdiqlangan."
    },
    {
      id: "q2",
      question: "2. The neuroplastic advantages of learning a second language only occur during childhood.",
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correct: "FALSE",
      explanation: "Matnda: 'neuroplastic adaptations persist well into older adulthood' deb keltirilgan."
    },
    {
      id: "q3",
      question: "3. Which brain region experiences increased grey matter density through language acquisition?",
      options: ["A) Occipital lobe", "B) Left inferior parietal cortex", "C) Cerebellum"],
      correct: "B) Left inferior parietal cortex",
      explanation: "Matnda aniq keltirilgan: 'structural MRI scans reveal denser grey matter in the left inferior parietal cortex'."
    }
  ];

  // --- 5. WRITING TASK 2 ---
  const [essayText, setEssayText] = useState("");
  const [writingScore, setWritingScore] = useState(null);

  const analyzeEssay = () => {
    const words = essayText.trim().split(/\s+/).filter(Boolean).length;
    if (words < 30) {
      alert("Iltimos, baholash uchun kamida 30-40 so'z yozing!");
      return;
    }
    let band = 5.5;
    if (words >= 150) band = 6.0;
    if (words >= 220) band = 6.5;
    if (words >= 250) band = 7.0;

    const hasConnectors = /furthermore|moreover|consequently|in contrast|nevertheless|therefore/i.test(essayText);
    if (hasConnectors && words >= 250) band += 0.5;

    setWritingScore({
      band: band.toFixed(1),
      wordCount: words,
      taskAchievement: words >= 250 ? "A'lo (250+ so'z normasi bajarildi)" : "Yetarli emas (kamida 250 so'z yozing)",
      coherence: hasConnectors ? "Bog'lovchilar o'rinli qo'llangan" : "Furthermore, However kabi akademik so'zlarni ko'paytiring",
      lexical: "Lug'at boyligi yaxshi shakllangan"
    });
  };

  // --- 6. SPEAKING ---
  const [speakingStep, setSpeakingStep] = useState('prep');
  const [prepTime, setPrepTime] = useState(60);
  const [speakTime, setSpeakTime] = useState(120);
  const [speakingActive, setSpeakingActive] = useState(false);

  useEffect(() => {
    let timer = null;
    if (speakingActive) {
      timer = setInterval(() => {
        if (speakingStep === 'prep') {
          setPrepTime(prev => {
            if (prev <= 1) {
              setSpeakingStep('speak');
              return 60;
            }
            return prev - 1;
          });
        } else if (speakingStep === 'speak') {
          setSpeakTime(prev => {
            if (prev <= 1) {
              setSpeakingActive(false);
              setSpeakingStep('done');
              return 120;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [speakingActive, speakingStep]);

  // --- 7. ZIYOAI ROBOT ---
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: `Assalomu alaykum ${userProfile.name}! ZiyoAI bilan IELTS mashg'ulotini boshlaymizmi? Listening, Speaking yoki Writing bo'yicha savollaringizni bering.` }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isAiListening, setIsAiListening] = useState(false);

  const sendAiMessage = (overrideText = null) => {
    const textToSend = overrideText || inputMsg;
    if (!textToSend.trim()) return;

    const newMsgs = [...chatMessages, { role: 'user', text: textToSend }];
    setChatMessages(newMsgs);
    setInputMsg("");

    setTimeout(() => {
      let reply = "";
      const lower = textToSend.toLowerCase();
      if (lower.includes('speaking') || lower.includes('part 2')) {
        reply = "Speaking bo'yicha muhim qoida: Pauza qilib qolmaslik uchun 'Well, to be perfectly honest...' yoki 'As far as I recall...' kabi 'filler' birikmalarni ishlating.";
      } else if (lower.includes('writing') || lower.includes('task 2')) {
        reply = "Writing Task 2 da har bir paragrafni aniq Topic Sentence (Mavzu gapi) bilan boshlang va unga bitta aniq faktik misol keltiring.";
      } else {
        reply = `Savolingiz qabul qilindi. Maqsadingiz Band ${userProfile.targetBand} bo'lgani uchun akademik sinonimlar va murakkab sintaksisdan ko'proq foydalaning.`;
      }

      setChatMessages(prev => [...prev, { role: 'ai', text: reply }]);

      if ('speechSynthesis' in window) {
        const ut = new SpeechSynthesisUtterance(reply);
        ut.lang = 'uz-UZ';
        window.speechSynthesis.speak(ut);
      }
    }, 600);
  };

  const toggleSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Brauzeringiz ovozli yozishni qo'llab-quvvatlamaydi.");
      return;
    }
    if (isAiListening) {
      setIsAiListening(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsAiListening(true);
    recognition.onresult = (e) => {
      setInputMsg(e.results[0][0].transcript);
      setIsAiListening(false);
    };
    recognition.onerror = () => setIsAiListening(false);
    recognition.onend = () => setIsAiListening(false);
    recognition.start();
  };

  // --- 8. VOCABULARY ---
  const [vocabIndex, setVocabIndex] = useState(0);
  const [showVocabMeaning, setShowVocabMeaning] = useState(false);
  const vocabList = [
    { word: "Mitigate", type: "verb", band: "8.0", defUz: "Yumshatmoq, ta'sirini kamaytirmoq", example: "Effective policies can mitigate the environmental crisis." },
    { word: "Ubiquitous", type: "adjective", band: "8.5", defUz: "Hamma joyda uchraydigan", example: "Smartphones have become ubiquitous in modern society." },
    { word: "Detrimental", type: "adjective", band: "7.5", defUz: "Zararli, ziyon keltiruvchi", example: "Lack of sleep has a detrimental effect on cognitive focus." },
    { word: "Plausible", type: "adjective", band: "8.0", defUz: "Haqiqatga yaqin, asosli", example: "The researchers proposed a plausible explanation for the anomaly." }
  ];

  const speakVocab = (word) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const ut = new SpeechSynthesisUtterance(word);
    ut.lang = 'en-US';
    window.speechSynthesis.speak(ut);
  };

  // Dinamik rang uslublari (Theme styling)
  const theme = {
    bg: isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900',
    card: isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm',
    subCard: isDarkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200',
    header: isDarkMode ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-200',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-slate-500',
    navBg: isDarkMode ? 'bg-slate-950/95 border-slate-800/90' : 'bg-white/95 border-slate-200/90',
    inputBg: isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
  };

  // ==========================================
  // SAHIFALARNI CHIQARISH
  // ==========================================

  const renderHome = () => (
    <div className="space-y-5 animate-fadeIn">
      {/* Profil Karta */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 rounded-3xl p-5 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
              {userProfile.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">{userProfile.name}</h2>
              <span className="text-xs bg-white/25 px-2.5 py-0.5 rounded-full font-medium text-blue-100">
                {userProfile.currentLevel}
              </span>
            </div>
          </div>
          <button 
            onClick={() => {
              setTempName(userProfile.name);
              setTempBand(userProfile.targetBand);
              setIsEditingProfile(true);
            }}
            className="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 transition active:scale-95"
          >
            <Edit3 size={18} />
          </button>
        </div>

        {/* Target Band & Progress */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-blue-100">Maqsadli IELTS Ball</span>
            <span className="text-2xl font-black tracking-tight">Band {userProfile.targetBand}</span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center pt-2 border-t border-white/15 text-xs">
            <div>
              <div className="text-blue-200">Listening</div>
              <div className="font-bold text-sm">{scores.listening}</div>
            </div>
            <div>
              <div className="text-blue-200">Reading</div>
              <div className="font-bold text-sm">{scores.reading}</div>
            </div>
            <div>
              <div className="text-blue-200">Writing</div>
              <div className="font-bold text-sm">{scores.writing}</div>
            </div>
            <div>
              <div className="text-blue-200">Speaking</div>
              <div className="font-bold text-sm">{scores.speaking}</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Quick Banner */}
      <div 
        onClick={() => setActiveTab('ai')}
        className={`${theme.card} border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition shadow-md group`}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
            <Bot size={24} />
          </div>
          <div>
            <h4 className="font-bold text-base group-hover:text-indigo-500 transition flex items-center gap-1.5">
              ZiyoAI Imtihonchi <Sparkles size={16} className="text-amber-400" />
            </h4>
            <p className={`text-xs ${theme.textMuted}`}>Ovozli suhbat, esse tahlili va yo'l-yo'riq</p>
          </div>
        </div>
        <ChevronRight size={22} className={`${theme.textMuted} group-hover:text-indigo-500 transition`} />
      </div>

      {/* Bo'limlar */}
      <div>
        <h3 className={`text-xs font-bold uppercase tracking-wider ${theme.textMuted} mb-3`}>IELTS Mashg'ulotlari</h3>
        <div className="grid grid-cols-2 gap-3.5">
          <button 
            onClick={() => setActiveTab('listening')} 
            className={`${theme.card} border p-4 rounded-2xl text-left transition active:scale-95 flex flex-col justify-between h-36`}
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
              <Headphones size={24} />
            </div>
            <div>
              <div className="font-bold text-base">Listening</div>
              <div className={`text-xs ${theme.textMuted}`}>Audio & form test</div>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('reading')} 
            className={`${theme.card} border p-4 rounded-2xl text-left transition active:scale-95 flex flex-col justify-between h-36`}
          >
            <div className="w-11 h-11 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center">
              <BookOpen size={24} />
            </div>
            <div>
              <div className="font-bold text-base">Reading</div>
              <div className={`text-xs ${theme.textMuted}`}>Akademik matn & TFNG</div>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('writing')} 
            className={`${theme.card} border p-4 rounded-2xl text-left transition active:scale-95 flex flex-col justify-between h-36`}
          >
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
              <PenTool size={24} />
            </div>
            <div>
              <div className="font-bold text-base">Writing</div>
              <div className={`text-xs ${theme.textMuted}`}>Task 2 esse baholash</div>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('speaking')} 
            className={`${theme.card} border p-4 rounded-2xl text-left transition active:scale-95 flex flex-col justify-between h-36`}
          >
            <div className="w-11 h-11 rounded-xl bg-rose-500/15 text-rose-500 flex items-center justify-center">
              <Mic size={24} />
            </div>
            <div>
              <div className="font-bold text-base">Speaking</div>
              <div className={`text-xs ${theme.textMuted}`}>Cue Card & taymer</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  // --- LISTENING ---
  const renderListening = () => (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between pb-2 border-b border-slate-700/40">
        <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-xs text-indigo-500 font-bold">
          <ArrowLeft size={16} /> Ortga
        </button>
        <h3 className="font-bold text-base">Listening Section 1</h3>
        <span className="text-xs bg-emerald-500/15 text-emerald-500 px-2.5 py-0.5 rounded-full font-bold">Test #1</span>
      </div>

      <div className={`${theme.card} border rounded-2xl p-4 space-y-3`}>
        <div className="flex items-center justify-between">
          <div className={`text-xs font-bold uppercase tracking-wider ${theme.textMuted}`}>Audio Dialogue</div>
          <div className="flex gap-1.5">
            {[0.8, 1.0, 1.2].map(speed => (
              <button 
                key={speed}
                onClick={() => setAudioSpeed(speed)}
                className={`text-xs px-2.5 py-1 rounded-md font-bold transition ${audioSpeed === speed ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800'}`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={playListeningAudio}
            className="w-13 h-13 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg transition active:scale-95"
          >
            {audioPlaying ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
          </button>
          <div className="flex-1">
            <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: audioPlaying ? '80%' : '15%' }}
              ></div>
            </div>
            <div className={`flex justify-between text-xs ${theme.textMuted} mt-1.5`}>
              <span>{audioPlaying ? "Audio yangramoqda..." : "Eshitish uchun bosing"}</span>
              <span>City Housing</span>
            </div>
          </div>
          <button onClick={resetListeningAudio} className={`p-2.5 rounded-xl ${theme.subCard}`}>
            <RotateCcw size={18} />
          </button>
        </div>

        <button 
          onClick={() => setShowTranscript(!showTranscript)}
          className="text-xs text-indigo-500 font-bold underline block"
        >
          {showTranscript ? "Transkriptni yashirish" : "Audio matnini ko'rish"}
        </button>

        {showTranscript && (
          <div className={`${theme.subCard} rounded-xl p-3 text-xs space-y-2 border max-h-48 overflow-y-auto`}>
            {listeningScript.map((line, idx) => (
              <p key={idx}><strong className="text-indigo-500">{line.speaker}:</strong> {line.text}</p>
            ))}
          </div>
        )}
      </div>

      <div className={`${theme.card} border rounded-2xl p-4 space-y-4`}>
        <h4 className="font-bold text-sm">Savollarga javob yozing:</h4>
        <div className="space-y-3 text-xs">
          <div>
            <label className={`block mb-1 font-medium ${theme.textMuted}`}>1. Haftalik ijara to'lovi (£):</label>
            <input 
              type="text" 
              placeholder="Masalan: 185"
              value={listeningAnswers.a1 || ''}
              onChange={(e) => setListeningAnswers({ ...listeningAnswers, a1: e.target.value })}
              className={`w-full ${theme.inputBg} rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo-500`}
            />
          </div>
          <div>
            <label className={`block mb-1 font-medium ${theme.textMuted}`}>2. Ko'chib o'tish sanasi (September ____):</label>
            <input 
              type="text" 
              placeholder="Masalan: 15"
              value={listeningAnswers.a2 || ''}
              onChange={(e) => setListeningAnswers({ ...listeningAnswers, a2: e.target.value })}
              className={`w-full ${theme.inputBg} rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo-500`}
            />
          </div>
          <div>
            <label className={`block mb-1 font-medium ${theme.textMuted}`}>3. Qaysi xizmat hisoblagich bilan alohida to'lanadi?</label>
            <input 
              type="text" 
              placeholder="Masalan: electricity"
              value={listeningAnswers.a3 || ''}
              onChange={(e) => setListeningAnswers({ ...listeningAnswers, a3: e.target.value })}
              className={`w-full ${theme.inputBg} rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo-500`}
            />
          </div>
        </div>

        <button 
          onClick={() => setListeningChecked(true)}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition active:scale-95 shadow-md"
        >
          Javoblarni Tekshirish
        </button>

        {listeningChecked && (
          <div className={`${theme.subCard} p-3 rounded-xl border text-xs space-y-1.5`}>
            <div className="font-bold text-emerald-500 flex items-center gap-1.5">
              <CheckCircle2 size={16} /> To'g'ri Javoblar:
            </div>
            <p>1-savol: <strong>185</strong> (Siz: {listeningAnswers.a1 || "bo'sh"})</p>
            <p>2-savol: <strong>15th / 15</strong> (Siz: {listeningAnswers.a2 || "bo'sh"})</p>
            <p>3-savol: <strong>electricity</strong> (Siz: {listeningAnswers.a3 || "bo'sh"})</p>
          </div>
        )}
      </div>
    </div>
  );

  // --- READING ---
  const renderReading = () => (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between pb-2 border-b border-slate-700/40">
        <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-xs text-indigo-500 font-bold">
          <ArrowLeft size={16} /> Ortga
        </button>
        <h3 className="font-bold text-base">Reading Passage 2</h3>
        <span className="text-xs bg-blue-500/15 text-blue-500 px-2.5 py-0.5 rounded-full font-bold">Academic</span>
      </div>

      <div className={`${theme.card} border rounded-2xl p-4 text-xs space-y-3 leading-relaxed max-h-60 overflow-y-auto`}>
        <h4 className="font-bold text-sm">The Cognitive Architecture of Multilingualism</h4>
        <p>
          Recent neuroimaging studies suggest that bilingual minds demonstrate superior cognitive reserve and task-switching capability compared to their monolingual counterparts.
        </p>
        <p>
          Furthermore, structural MRI scans reveal denser grey matter in the <strong>left inferior parietal cortex</strong> of individuals who actively utilize more than one dialect. Crucially, these adaptations persist well into older adulthood.
        </p>
      </div>

      <div className="space-y-3">
        {readingQuestions.map((q) => (
          <div key={q.id} className={`${theme.card} border rounded-2xl p-4 text-xs space-y-2.5`}>
            <p className="font-bold">{q.question}</p>
            <div className="grid grid-cols-1 gap-2 pt-1">
              {q.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => setReadingAnswers({ ...readingAnswers, [q.id]: opt })}
                  className={`py-2.5 px-3.5 rounded-xl text-left border text-xs transition ${
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
              <div className={`mt-2 p-2.5 rounded-xl ${theme.subCard} text-[11px]`}>
                <span className={readingAnswers[q.id] === q.correct ? "text-emerald-500 font-bold" : "text-rose-500 font-bold"}>
                  {readingAnswers[q.id] === q.correct ? "✓ To'g'ri" : `✗ Noto'g'ri (To'g'risi: ${q.correct})`}
                </span>
                <p className={`${theme.textMuted} mt-1`}>{q.explanation}</p>
              </div>
            )}
          </div>
        ))}

        <button 
          onClick={() => setReadingChecked(true)}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition active:scale-95 shadow-md"
        >
          Natijani Ko'rish
        </button>
      </div>
    </div>
  );

  // --- WRITING ---
  const renderWriting = () => {
    const wordCount = essayText.trim().split(/\s+/).filter(Boolean).length;
    return (
      <div className="space-y-4 animate-fadeIn">
        <div className="flex items-center justify-between pb-2 border-b border-slate-700/40">
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-xs text-indigo-500 font-bold">
            <ArrowLeft size={16} /> Ortga
          </button>
          <h3 className="font-bold text-base">Writing Task 2 Studio</h3>
          <span className="text-xs bg-amber-500/15 text-amber-500 px-2.5 py-0.5 rounded-full font-bold">250 So'z</span>
        </div>

        <div className={`${theme.card} border rounded-2xl p-4 text-xs space-y-1.5`}>
          <span className="text-amber-500 font-black uppercase text-[10px] tracking-wider">Mavzu:</span>
          <p className="font-medium leading-relaxed">
            "Some people argue that technological development leads to the loss of traditional cultures. To what extent do you agree or disagree?"
          </p>
        </div>

        <div className="relative">
          <textarea
            rows={8}
            value={essayText}
            onChange={(e) => setEssayText(e.target.value)}
            placeholder="In modern discourse, the rapid progression of innovation is frequently argued..."
            className={`w-full ${theme.inputBg} rounded-2xl p-4 text-xs outline-none focus:border-indigo-500 leading-relaxed resize-none`}
          />
          <div className={`absolute bottom-3 right-3 text-xs ${theme.subCard} px-2.5 py-1 rounded-lg border`}>
            So'zlar: <span className={wordCount >= 250 ? "text-emerald-500 font-bold" : "text-amber-500 font-bold"}>{wordCount}</span> / 250
          </div>
        </div>

        <button 
          onClick={analyzeEssay}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition active:scale-95 shadow-md flex items-center justify-center gap-2"
        >
          <Sparkles size={18} /> Esseni Baholash
        </button>

        {writingScore && (
          <div className={`${theme.card} border border-indigo-500/40 rounded-2xl p-4 space-y-2 text-xs`}>
            <div className="flex justify-between items-center pb-2 border-b border-slate-700/30">
              <span className="font-bold">IELTS Bahosi:</span>
              <span className="text-base font-black text-indigo-500">Band {writingScore.band}</span>
            </div>
            <p><strong>Task Achievement:</strong> {writingScore.taskAchievement}</p>
            <p><strong>Coherence & Cohesion:</strong> {writingScore.coherence}</p>
            <p><strong>Lexical Resource:</strong> {writingScore.lexical}</p>
          </div>
        )}
      </div>
    );
  };

  // --- SPEAKING ---
  const renderSpeaking = () => (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between pb-2 border-b border-slate-700/40">
        <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-xs text-indigo-500 font-bold">
          <ArrowLeft size={16} /> Ortga
        </button>
        <h3 className="font-bold text-base">Speaking Part 2</h3>
        <span className="text-xs bg-rose-500/15 text-rose-500 px-2.5 py-0.5 rounded-full font-bold">Cue Card</span>
      </div>

      <div className={`${theme.card} border rounded-2xl p-4 text-xs space-y-2`}>
        <h4 className="font-bold text-sm">Describe an accomplishment that made you proud</h4>
        <ul className={`list-disc list-inside ${theme.textMuted} space-y-1 pt-1`}>
          <li>What the achievement was</li>
          <li>When and where it occurred</li>
          <li>What obstacles you overcame</li>
          <li>Explain why this was meaningful to you</li>
        </ul>
      </div>

      <div className={`${theme.card} border rounded-2xl p-6 text-center space-y-3`}>
        <div className={`text-xs ${theme.textMuted} uppercase tracking-wider font-bold`}>
          {speakingStep === 'prep' ? '1 Daqiqa Tayyorgarlik' : speakingStep === 'speak' ? '2 Daqiqa Nutq' : 'Vaqt Tugadi!'}
        </div>
        
        <div className="text-4xl font-black text-indigo-500 font-mono">
          {speakingStep === 'prep' ? `00:${prepTime < 10 ? '0' : ''}${prepTime}` : `0${Math.floor(speakTime/60)}:${speakTime%60 < 10 ? '0' : ''}${speakTime%60}`}
        </div>

        <div className="flex justify-center gap-2 pt-2">
          {!speakingActive ? (
            <button 
              onClick={() => setSpeakingActive(true)}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition"
            >
              <Play size={16} /> Boshlash
            </button>
          ) : (
            <button 
              onClick={() => setSpeakingActive(false)}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition"
            >
              <Pause size={16} /> To'xtatish
            </button>
          )}
          <button 
            onClick={() => {
              setSpeakingActive(false);
              setSpeakingStep('prep');
              setPrepTime(60);
              setSpeakTime(120);
            }}
            className={`p-2.5 rounded-xl ${theme.subCard}`}
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  // --- ZIYOAI ROBOT ---
  const renderAiChat = () => (
    <div className="h-full flex flex-col space-y-3 animate-fadeIn">
      <div className="flex items-center justify-between pb-2 border-b border-slate-700/40">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm">ZiyoAI Examiner</h3>
            <span className="text-[11px] text-emerald-500 font-semibold">● Onlayn (Ovozli & Matnli)</span>
          </div>
        </div>
        <button onClick={() => setChatMessages([])} className={`text-xs ${theme.textMuted}`}>
          Tozalash
        </button>
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
        <button 
          onClick={toggleSpeechRecognition}
          className={`p-3 rounded-xl transition ${isAiListening ? 'bg-rose-600 text-white animate-pulse' : `${theme.subCard}`}`}
        >
          <Mic size={20} />
        </button>
        <input 
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendAiMessage()}
          placeholder="IELTS bo'yicha savol bering..."
          className={`flex-1 ${theme.inputBg} rounded-xl px-3.5 py-3 text-xs outline-none focus:border-indigo-500`}
        />
        <button 
          onClick={() => sendAiMessage()}
          className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition active:scale-95"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );

  // --- LUG'AT ---
  const renderVocab = () => {
    const item = vocabList[vocabIndex];
    return (
      <div className="space-y-4 animate-fadeIn">
        <div className="flex items-center justify-between pb-2 border-b border-slate-700/40">
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-xs text-indigo-500 font-bold">
            <ArrowLeft size={16} /> Ortga
          </button>
          <h3 className="font-bold text-base">Band 7.5 - 9.0 Vocabulary</h3>
          <span className="text-xs bg-purple-500/15 text-purple-500 px-2.5 py-0.5 rounded-full font-bold">{vocabIndex + 1}/{vocabList.length}</span>
        </div>

        <div 
          onClick={() => setShowVocabMeaning(!showVocabMeaning)}
          className={`${theme.card} border rounded-3xl p-6 text-center cursor-pointer shadow-lg min-h-[220px] flex flex-col justify-center items-center space-y-3 active:scale-98 transition`}
        >
          <span className="text-[11px] bg-indigo-500/15 text-indigo-500 px-3 py-1 rounded-full font-bold uppercase">
            IELTS Band {item.band}
          </span>
          <div className="text-3xl font-black tracking-tight flex items-center gap-2">
            {item.word}
            <button 
              onClick={(e) => { e.stopPropagation(); speakVocab(item.word); }}
              className="p-2 text-indigo-500 rounded-lg hover:bg-indigo-500/10"
            >
              <Volume2 size={20} />
            </button>
          </div>
          <span className={`text-xs italic ${theme.textMuted}`}>({item.type})</span>

          <div className="pt-2 border-t border-slate-700/20 w-full">
            {showVocabMeaning ? (
              <div className="space-y-1.5">
                <div className="text-sm font-bold text-emerald-500">{item.defUz}</div>
                <div className={`text-xs ${theme.textMuted} italic`}>"{item.example}"</div>
              </div>
            ) : (
              <div className={`text-xs ${theme.textMuted}`}>Tarjimasini ko'rish uchun bosing</div>
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
            disabled={vocabIndex === vocabList.length - 1}
            onClick={() => { setVocabIndex(v => v + 1); setShowVocabMeaning(false); }}
            className="flex-1 py-3 bg-indigo-600 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
          >
            Keyingisi
          </button>
        </div>
      </div>
    );
  };

  // --- PROFIL ---
  const renderProfile = () => (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between pb-2 border-b border-slate-700/40">
        <h3 className="font-bold text-base">Shaxsiy Profil</h3>
        <span className="text-xs text-emerald-500 font-bold">● Ma'lumotlar saqlangan</span>
      </div>

      <div className={`${theme.card} border rounded-2xl p-5 text-center space-y-3`}>
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 mx-auto flex items-center justify-center text-3xl shadow-inner">
          {userProfile.avatar}
        </div>
        <div>
          <h3 className="text-xl font-bold">{userProfile.name}</h3>
          <p className={`text-xs ${theme.textMuted}`}>{userProfile.currentLevel}</p>
        </div>
        <button 
          onClick={() => {
            setTempName(userProfile.name);
            setTempBand(userProfile.targetBand);
            setIsEditingProfile(true);
          }}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition"
        >
          Profilni Tahrirlash
        </button>
      </div>

      <div className={`${theme.card} border rounded-2xl p-4 space-y-3 text-xs`}>
        <h4 className="font-bold">Statistika & Ko'rsatkichlar:</h4>
        <div className="flex justify-between py-2 border-b border-slate-700/20">
          <span className={theme.textMuted}>Maqsadli Band Ball:</span>
          <span className="font-bold text-indigo-500">{userProfile.targetBand}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-slate-700/20">
          <span className={theme.textMuted}>Kunlik Ketma-ketlik:</span>
          <span className="font-bold text-amber-500">🔥 {userProfile.streak} kun</span>
        </div>
        <div className="flex justify-between py-2">
          <span className={theme.textMuted}>Tugallangan testlar:</span>
          <span className="font-bold text-emerald-500">{userProfile.completedTests} ta</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen w-full ${theme.bg} flex flex-col font-sans select-none antialiased transition-colors duration-300`}>
      
      {/* Yuqori Header va Rejimni almashtirish tugmasi */}
      <header className={`sticky top-0 z-40 ${theme.header} backdrop-blur-md border-b px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white text-sm shadow-md">
            Z
          </div>
          <span className="font-black text-lg tracking-tight">Ziyo<span className="text-indigo-500">Prep</span></span>
        </div>

        <div className="flex items-center gap-2">
          {/* Rejimni almashtirish (Kunduzgi / Kechki) */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-xl ${theme.subCard} border transition active:scale-95`}
            title="Mavzuni almashtirish"
          >
            {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
          </button>
          <span className="text-xs font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
            🔥 {userProfile.streak} kun
          </span>
        </div>
      </header>

      {/* Asosiy sahifa */}
      <main className="flex-1 w-full max-w-lg mx-auto p-4 pb-28">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'listening' && renderListening()}
        {activeTab === 'reading' && renderReading()}
        {activeTab === 'writing' && renderWriting()}
        {activeTab === 'speaking' && renderSpeaking()}
        {activeTab === 'vocab' && renderVocab()}
        {activeTab === 'ai' && renderAiChat()}
        {activeTab === 'profile' && renderProfile()}
      </main>

      {/* KATTALASHTIRILGAN VA QULAY PASTKI MENYU (BOTTOM TAB BAR) */}
      <nav className={`fixed bottom-0 left-0 right-0 ${theme.navBg} backdrop-blur-xl border-t z-50 pb-6 pt-2`}>
        <div className="max-w-lg mx-auto flex justify-around items-center px-3">
          
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1.5 py-1 px-3 rounded-2xl transition active:scale-95 ${
              activeTab === 'home' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : `${theme.textMuted}`
            }`}
          >
            <BookOpen size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
            <span className="text-xs font-medium">Asosiy</span>
          </button>

          <button 
            onClick={() => setActiveTab('vocab')}
            className={`flex flex-col items-center gap-1.5 py-1 px-3 rounded-2xl transition active:scale-95 ${
              activeTab === 'vocab' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : `${theme.textMuted}`
            }`}
          >
            <Layers size={24} strokeWidth={activeTab === 'vocab' ? 2.5 : 2} />
            <span className="text-xs font-medium">Lug'at</span>
          </button>

          {/* O'rtadagi Katta ZiyoAI Tugmasi */}
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
            onClick={() => setActiveTab('writing')}
            className={`flex flex-col items-center gap-1.5 py-1 px-3 rounded-2xl transition active:scale-95 ${
              activeTab === 'writing' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : `${theme.textMuted}`
            }`}
          >
            <PenTool size={24} strokeWidth={activeTab === 'writing' ? 2.5 : 2} />
            <span className="text-xs font-medium">Writing</span>
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

      {/* Profil Tahrirlash Modali */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${theme.card} border rounded-3xl p-5 w-full max-w-sm space-y-4 shadow-2xl`}>
            <h3 className="font-bold text-base">Profilni Tahrirlash</h3>
            
            <div>
              <label className={`text-xs ${theme.textMuted} block mb-1 font-medium`}>Ismingiz:</label>
              <input 
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className={`w-full ${theme.inputBg} rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-indigo-500`}
              />
            </div>

            <div>
              <label className={`text-xs ${theme.textMuted} block mb-1 font-medium`}>Maqsadli IELTS Ball:</label>
              <select
                value={tempBand}
                onChange={(e) => setTempBand(e.target.value)}
                className={`w-full ${theme.inputBg} rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-indigo-500`}
              >
                {['6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0'].map(b => (
                  <option key={b} value={b}>Band {b}</option>
                ))}
              </select>
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
                    targetBand: tempBand
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
