import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Headphones, PenTool, Mic, Bot, User, 
  Play, Pause, RotateCcw, CheckCircle2, XCircle, Award, 
  Sparkles, Send, Volume2, HelpCircle, ChevronRight, Bookmark,
  Edit3, AlertCircle, ArrowLeft, RefreshCw, Layers
} from 'lucide-react';

export default function App() {
  // --- 1. LOCALSTORAGE BILAN DOIMIY SAQLANUVCHI PROFIL ---
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('ziyoprep_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return {
      name: 'IELTS O\'quvchisi',
      avatar: '👨‍🎓',
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

  // Profil o'zgarganda saqlash
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

  // --- 2. LISTENING DAVLAT ENGINE VA AUDIO ---
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1.0);
  const [audioTime, setAudioTime] = useState(0);
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

    utterance.onend = () => {
      setAudioPlaying(false);
      setAudioTime(100);
    };
    utterance.onerror = () => setAudioPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const resetListeningAudio = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setAudioPlaying(false);
    setAudioTime(0);
  };

  // --- 3. READING SAVOLLARI VA TEKSHIRISH ---
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
      explanation: "Matn aksini ta'kidlaydi: 'neuroplastic adaptations persist well into older adulthood'."
    },
    {
      id: "q3",
      question: "3. Which brain region experiences increased grey matter density through language acquisition?",
      options: ["A) Occipital lobe", "B) Left inferior parietal cortex", "C) Cerebellum"],
      correct: "B) Left inferior parietal cortex",
      explanation: "Matnda aniq keltirilgan: 'structural MRI scans reveal denser grey matter in the left inferior parietal cortex'."
    }
  ];

  // --- 4. WRITING TASK 2 MEZONI ---
  const [essayText, setEssayText] = useState("");
  const [writingScore, setWritingScore] = useState(null);

  const analyzeEssay = () => {
    const words = essayText.trim().split(/\s+/).filter(Boolean).length;
    if (words < 30) {
      alert("Iltimos, tahlil qilish uchun kamida 30-40 so'z yozing!");
      return;
    }
    // Avtomatik IELTS mezon tahlili
    let band = 5.5;
    if (words >= 150) band = 6.0;
    if (words >= 220) band = 6.5;
    if (words >= 250) band = 7.0;

    const hasAcademicConnectors = /furthermore|moreover|consequently|in contrast|nevertheless|therefore/i.test(essayText);
    if (hasAcademicConnectors && words >= 250) band += 0.5;

    setWritingScore({
      band: band.toFixed(1),
      wordCount: words,
      taskAchievement: words >= 250 ? "Yaxshi (250+ so'z bajarildi)" : "Kam (Kamida 250 so'z talab qilinadi)",
      coherence: hasAcademicConnectors ? "Bog'lovchi so'zlar to'g'ri ishlatilgan" : "Bog'lovchi so'zlar (Furthermore, However) ko'paytiring",
      lexical: "Akademik so'z boyligi qoniqarli"
    });
  };

  // --- 5. SPEAKING MODULI ---
  const [speakingStep, setSpeakingStep] = useState('prep'); // prep | speak | done
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

  // --- 6. ZIYOAI EXAMINER CHAT (OVOZLI VA MATNLI) ---
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: `Assalomu alaykum ${userProfile.name}! Men ZiyoAI IELTS yordamchisiman. Writing tekshirish, Speaking savol-javobi yoki grammatika bo'yicha qanday yordam bera olaman?` }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isAiListening, setIsAiListening] = useState(false);

  const sendAiMessage = (overrideText = null) => {
    const textToSend = overrideText || inputMsg;
    if (!textToSend.trim()) return;

    const newMsgs = [...chatMessages, { role: 'user', text: textToSend }];
    setChatMessages(newMsgs);
    setInputMsg("");

    // AI javobini simulyatsiya qilish
    setTimeout(() => {
      let reply = "";
      const lower = textToSend.toLowerCase();
      if (lower.includes('speaking') || lower.includes('part 2')) {
        reply = "Speaking Part 2 bo'yicha maslahat: 1 daqiqalik tayyorgarlikda gaplarni to'liq yozmang, faqat kalit so'zlar va kamida 3 ta Band 7+ iborani (masalan: 'pivotal moment', 'vividly recall') qayd qiling.";
      } else if (lower.includes('writing') || lower.includes('task 2')) {
        reply = "Writing Task 2 da eng ko'p ball olib beradigan narsa bu aniq misollar (concrete examples). Har bir asosiy argumentingizni 1 ta real yoki statistik misol bilan quvvatlang.";
      } else {
        reply = `Savolingiz qabul qilindi. Sizning maqsadingiz Band ${userProfile.targetBand} bo'lgani uchun fikringizni ifodalashda passiv tuzilmalar (Passive Voice) va murakkab gaplardan (Complex sentences) ko'proq foydalaning.`;
      }

      setChatMessages(prev => [...prev, { role: 'ai', text: reply }]);

      // Ovozli o'qish
      if ('speechSynthesis' in window) {
        const ut = new SpeechSynthesisUtterance(reply);
        ut.lang = 'uz-UZ';
        window.speechSynthesis.speak(ut);
      }
    }, 700);
  };

  // Ovoz orqali kiritish (Speech-to-Text)
  const toggleSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Brauzeringiz ovoz bilan yozishni (Speech-to-Text) qo'llab-quvvatlamaydi. Matn ko'rinishida yozing.");
      return;
    }

    if (isAiListening) {
      setIsAiListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsAiListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMsg(transcript);
      setIsAiListening(false);
    };
    recognition.onerror = () => setIsAiListening(false);
    recognition.onend = () => setIsAiListening(false);

    recognition.start();
  };

  // --- 7. VOCABULARY KARTALARI ---
  const [vocabIndex, setVocabIndex] = useState(0);
  const [showVocabMeaning, setShowVocabMeaning] = useState(false);
  const vocabList = [
    { word: "Mitigate", type: "verb", band: "8.0", defUz: "Yumshatmoq, ta'sirini kamaytirmoq", example: "Effective policies can mitigate the environmental crisis." },
    { word: "Ubiquitous", type: "adjective", band: "8.5", defUz: "Hamma joyda uchraydigan", example: "Smartphones have become ubiquitous in modern society." },
    { word: "Detrimental", type: "adjective", band: "7.5", defUz: "Zararli, ziyon keltiruvchi", example: "Lack of sleep has a detrimental effect on cognitive focus." },
    { word: "Plausible", type: "adjective", band: "8.0", defUz: "Haqiqatga yaqin, ishonsa bo'ladigan", example: "The researchers proposed a plausible explanation for the anomaly." }
  ];

  const speakVocab = (word) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const ut = new SpeechSynthesisUtterance(word);
    ut.lang = 'en-US';
    window.speechSynthesis.speak(ut);
  };

  // ==========================================
  // RENDER SAHIFALARI
  // ==========================================

  const renderHome = () => (
    <div className="space-y-5 animate-fadeIn">
      {/* Profil Banneri */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-5 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
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
        className="bg-slate-800/80 hover:bg-slate-800 border border-indigo-500/30 rounded-2xl p-4 flex items-center justify-between cursor-pointer transition shadow-lg group"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md">
            <Bot size={24} />
          </div>
          <div>
            <h4 className="font-semibold text-white group-hover:text-indigo-400 transition flex items-center gap-1.5">
              ZiyoAI Imtihonchi <Sparkles size={16} className="text-yellow-400" />
            </h4>
            <p className="text-xs text-slate-400">Ovozli suhbat, esse tahlili va konsultatsiya</p>
          </div>
        </div>
        <ChevronRight size={20} className="text-slate-500 group-hover:text-indigo-400 transition" />
      </div>

      {/* Bo'limlar to'plami */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">IELTS Mashg'ulotlari</h3>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setActiveTab('listening')} 
            className="bg-slate-800/60 hover:bg-slate-800 p-4 rounded-2xl border border-slate-700/60 text-left transition active:scale-98 flex flex-col justify-between h-32"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Headphones size={22} />
            </div>
            <div>
              <div className="font-bold text-white text-base">Listening</div>
              <div className="text-xs text-slate-400">Audio, tezlik & form test</div>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('reading')} 
            className="bg-slate-800/60 hover:bg-slate-800 p-4 rounded-2xl border border-slate-700/60 text-left transition active:scale-98 flex flex-col justify-between h-32"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <BookOpen size={22} />
            </div>
            <div>
              <div className="font-bold text-white text-base">Reading</div>
              <div className="text-xs text-slate-400">Akademik matn & TFNG</div>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('writing')} 
            className="bg-slate-800/60 hover:bg-slate-800 p-4 rounded-2xl border border-slate-700/60 text-left transition active:scale-98 flex flex-col justify-between h-32"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <PenTool size={22} />
            </div>
            <div>
              <div className="font-bold text-white text-base">Writing</div>
              <div className="text-xs text-slate-400">Task 2 esse baholash</div>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('speaking')} 
            className="bg-slate-800/60 hover:bg-slate-800 p-4 rounded-2xl border border-slate-700/60 text-left transition active:scale-98 flex flex-col justify-between h-32"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Mic size={22} />
            </div>
            <div>
              <div className="font-bold text-white text-base">Speaking</div>
              <div className="text-xs text-slate-400">Part 2 Cue Card & taymer</div>
            </div>
          </button>
        </div>
      </div>

      {/* Lug'at vidjeti */}
      <div 
        onClick={() => setActiveTab('vocab')}
        className="bg-gradient-to-r from-slate-800 to-indigo-950/60 border border-slate-700/60 rounded-2xl p-4 flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Layers size={22} />
          </div>
          <div>
            <div className="font-bold text-white">Band 7.5 - 9.0 Lug'at Boyligi</div>
            <div className="text-xs text-slate-400">Flashcardlar orqali yod olish</div>
          </div>
        </div>
        <ChevronRight size={18} className="text-slate-500" />
      </div>
    </div>
  );

  // --- LISTENING SAHIFASI ---
  const renderListening = () => (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-xs text-indigo-400">
          <ArrowLeft size={16} /> Ortga
        </button>
        <h3 className="font-bold text-white text-base">Listening Section 1</h3>
        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-semibold">Test #1</span>
      </div>

      {/* Audio Player Card */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Audio Dialogue</div>
          <div className="flex gap-1.5">
            {[0.8, 1.0, 1.2].map(speed => (
              <button 
                key={speed}
                onClick={() => setAudioSpeed(speed)}
                className={`text-xs px-2 py-0.5 rounded-md font-medium transition ${audioSpeed === speed ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'}`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Audio boshqaruv */}
        <div className="flex items-center gap-3">
          <button 
            onClick={playListeningAudio}
            className="w-12 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg transition active:scale-95"
          >
            {audioPlaying ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
          </button>
          <div className="flex-1">
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 transition-all duration-300"
                style={{ width: audioPlaying ? '70%' : `${audioTime}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>{audioPlaying ? "Tinglanmoqda (SpeechSynthesis)..." : "Audio tayyor"}</span>
              <span>Central City Housing</span>
            </div>
          </div>
          <button onClick={resetListeningAudio} className="p-2.5 text-slate-400 hover:text-white rounded-lg bg-slate-700/50">
            <RotateCcw size={16} />
          </button>
        </div>

        {/* Transkript ochish */}
        <button 
          onClick={() => setShowTranscript(!showTranscript)}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline"
        >
          {showTranscript ? "Transkriptni yopish" : "Audio transkriptini ko'rish"}
        </button>

        {showTranscript && (
          <div className="bg-slate-900/90 rounded-xl p-3 text-xs text-slate-300 space-y-2 border border-slate-700/50 max-h-48 overflow-y-auto">
            {listeningScript.map((line, idx) => (
              <p key={idx}><strong className="text-indigo-300">{line.speaker}:</strong> {line.text}</p>
            ))}
          </div>
        )}
      </div>

      {/* Savollar */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 space-y-4">
        <h4 className="font-semibold text-white text-sm">Savollarga javob bering (Form Completion):</h4>
        
        <div className="space-y-3 text-xs">
          <div>
            <label className="text-slate-300 block mb-1">1. Haftalik to'lov miqdori qancha? (£)</label>
            <input 
              type="text" 
              placeholder="Masalan: 185"
              value={listeningAnswers.a1 || ''}
              onChange={(e) => setListeningAnswers({ ...listeningAnswers, a1: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-slate-300 block mb-1">2. Ko'chib o'tish sanasi (September ____):</label>
            <input 
              type="text" 
              placeholder="Masalan: 15 yoki 15th"
              value={listeningAnswers.a2 || ''}
              onChange={(e) => setListeningAnswers({ ...listeningAnswers, a2: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-slate-300 block mb-1">3. Qaysi xizmat alohida hisoblanadi (metered separately)?</label>
            <input 
              type="text" 
              placeholder="Masalan: electricity"
              value={listeningAnswers.a3 || ''}
              onChange={(e) => setListeningAnswers({ ...listeningAnswers, a3: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <button 
          onClick={() => setListeningChecked(true)}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs transition active:scale-98 shadow-md"
        >
          Javoblarni Tekshirish
        </button>

        {listeningChecked && (
          <div className="p-3 rounded-xl bg-slate-900 border border-indigo-500/30 text-xs space-y-2">
            <div className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-400" /> Natijalar va To'g'ri Javoblar:
            </div>
            <p className="text-slate-300">1-savol: <strong>185</strong> (Siz: {listeningAnswers.a1 || "bo'sh"})</p>
            <p className="text-slate-300">2-savol: <strong>15th / 15</strong> (Siz: {listeningAnswers.a2 || "bo'sh"})</p>
            <p className="text-slate-300">3-savol: <strong>electricity</strong> (Siz: {listeningAnswers.a3 || "bo'sh"})</p>
          </div>
        )}
      </div>
    </div>
  );

  // --- READING SAHIFASI ---
  const renderReading = () => (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-xs text-indigo-400">
          <ArrowLeft size={16} /> Ortga
        </button>
        <h3 className="font-bold text-white text-base">Reading Passage 2</h3>
        <span className="text-xs bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded-full font-semibold">Academic</span>
      </div>

      {/* Ilmiy Matn */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 text-xs text-slate-300 space-y-3 leading-relaxed max-h-60 overflow-y-auto">
        <h4 className="font-bold text-white text-sm">The Cognitive Architecture of Multilingualism</h4>
        <p>
          Recent neuroimaging studies suggest that bilingual minds demonstrate superior cognitive reserve and task-switching capability compared to their monolingual counterparts. Far from creating linguistic interference, navigating between discrete semantic frameworks strengthens executive control.
        </p>
        <p>
          Furthermore, structural MRI scans reveal denser grey matter in the <strong>left inferior parietal cortex</strong> of individuals who actively utilize more than one dialect. Crucially, contemporary clinical trials demonstrate that these neuroplastic adaptations persist well into older adulthood, delaying neurological decline.
        </p>
      </div>

      {/* Savollar */}
      <div className="space-y-3">
        {readingQuestions.map((q) => (
          <div key={q.id} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 text-xs space-y-2">
            <p className="font-medium text-white">{q.question}</p>
            <div className="grid grid-cols-1 gap-1.5 pt-1">
              {q.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => setReadingAnswers({ ...readingAnswers, [q.id]: opt })}
                  className={`py-2 px-3 rounded-xl text-left border transition ${
                    readingAnswers[q.id] === opt 
                      ? 'bg-indigo-600/30 border-indigo-500 text-white font-semibold' 
                      : 'bg-slate-900 border-slate-700/60 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {readingChecked && (
              <div className="mt-2 p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-[11px]">
                <span className={readingAnswers[q.id] === q.correct ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                  {readingAnswers[q.id] === q.correct ? "✓ To'g'ri" : `✗ Noto'g'ri (To'g'risi: ${q.correct})`}
                </span>
                <p className="text-slate-400 mt-1">{q.explanation}</p>
              </div>
            )}
          </div>
        ))}

        <button 
          onClick={() => setReadingChecked(true)}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs transition active:scale-98 shadow-md"
        >
          Natijani Ko'rish
        </button>
      </div>
    </div>
  );

  // --- WRITING SAHIFASI ---
  const renderWriting = () => {
    const wordCount = essayText.trim().split(/\s+/).filter(Boolean).length;
    return (
      <div className="space-y-4 animate-fadeIn">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-xs text-indigo-400">
            <ArrowLeft size={16} /> Ortga
          </button>
          <h3 className="font-bold text-white text-base">Writing Task 2 Studio</h3>
          <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full font-semibold">250 So'z</span>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 text-xs space-y-2">
          <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">Mavzu (Essay Prompt):</span>
          <p className="text-slate-200 font-medium leading-relaxed">
            "Some people argue that technological development leads to the loss of traditional cultures. To what extent do you agree or disagree?"
          </p>
        </div>

        <div className="relative">
          <textarea
            rows={8}
            value={essayText}
            onChange={(e) => setEssayText(e.target.value)}
            placeholder="In modern discourse, the rapid progression of innovation is frequently argued to imperil cultural heritage..."
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 leading-relaxed resize-none shadow-inner"
          />
          <div className="absolute bottom-3 right-3 text-[11px] bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 text-slate-300">
            So'zlar: <span className={wordCount >= 250 ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>{wordCount}</span> / 250
          </div>
        </div>

        <button 
          onClick={analyzeEssay}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs transition active:scale-98 shadow-md flex items-center justify-center gap-2"
        >
          <Sparkles size={16} /> Esseni AI Mezonlari Bo'yicha Baholash
        </button>

        {writingScore && (
          <div className="bg-slate-800/90 border border-indigo-500/40 rounded-2xl p-4 space-y-2 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-700">
              <span className="font-bold text-white">Baholash Xulosasi:</span>
              <span className="text-base font-black text-indigo-400">Band {writingScore.band}</span>
            </div>
            <p className="text-slate-300"><strong>Task Achievement:</strong> {writingScore.taskAchievement}</p>
            <p className="text-slate-300"><strong>Coherence & Cohesion:</strong> {writingScore.coherence}</p>
            <p className="text-slate-300"><strong>Lexical Resource:</strong> {writingScore.lexical}</p>
          </div>
        )}
      </div>
    );
  };

  // --- SPEAKING SAHIFASI ---
  const renderSpeaking = () => (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-xs text-indigo-400">
          <ArrowLeft size={16} /> Ortga
        </button>
        <h3 className="font-bold text-white text-base">Speaking Part 2 Simulyator</h3>
        <span className="text-xs bg-rose-500/20 text-rose-300 px-2.5 py-0.5 rounded-full font-semibold">Cue Card</span>
      </div>

      {/* Cue Card */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 text-xs space-y-2">
        <h4 className="font-bold text-white text-sm">Describe an accomplishment that made you proud</h4>
        <ul className="list-disc list-inside text-slate-300 space-y-1 pt-1">
          <li>What the achievement was</li>
          <li>When and where it occurred</li>
          <li>What obstacles you overcame</li>
          <li>Explain why this accomplishment was so meaningful to you</li>
        </ul>
      </div>

      {/* Taymer Blok */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center space-y-3">
        <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
          {speakingStep === 'prep' ? '1 Daqiqa Tayyorgarlik Vaqti' : speakingStep === 'speak' ? '2 Daqiqa Nutq So\'zlash' : 'Vaqt Tugadi!'}
        </div>
        
        <div className="text-4xl font-black text-indigo-400 font-mono">
          {speakingStep === 'prep' ? `00:${prepTime < 10 ? '0' : ''}${prepTime}` : `0${Math.floor(speakTime/60)}:${speakTime%60 < 10 ? '0' : ''}${speakTime%60}`}
        </div>

        <div className="flex justify-center gap-2">
          {!speakingActive ? (
            <button 
              onClick={() => setSpeakingActive(true)}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 transition"
            >
              <Play size={16} /> Mashqni Boshlash
            </button>
          ) : (
            <button 
              onClick={() => setSpeakingActive(false)}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 transition"
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
            className="p-2.5 bg-slate-800 text-slate-400 hover:text-white rounded-xl"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  // --- ZIYOAI EXAMINER CHAT SAHIFASI ---
  const renderAiChat = () => (
    <div className="h-full flex flex-col space-y-3 animate-fadeIn">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Bot size={18} />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">ZiyoAI Examiner</h3>
            <span className="text-[10px] text-emerald-400">● Onlayn (Ovozli & Matnli)</span>
          </div>
        </div>
        <button onClick={() => setChatMessages([])} className="text-xs text-slate-500 hover:text-slate-300">
          Tozalash
        </button>
      </div>

      {/* Xabarlar ro'yxati */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs max-h-[60vh]">
        {chatMessages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-slate-800 border border-slate-700/70 text-slate-200 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Yozish va Ovozli kiritish */}
      <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
        <button 
          onClick={toggleSpeechRecognition}
          className={`p-3 rounded-xl transition ${isAiListening ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
          title="Ovoz bilan gapirish"
        >
          <Mic size={18} />
        </button>
        <input 
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendAiMessage()}
          placeholder={isAiListening ? "Eshitilmoqda... gapiring" : "IELTS bo'yicha savol bering..."}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-500"
        />
        <button 
          onClick={() => sendAiMessage()}
          className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition active:scale-95"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );

  // --- LUG'AT SAHIFASI ---
  const renderVocab = () => {
    const item = vocabList[vocabIndex];
    return (
      <div className="space-y-4 animate-fadeIn">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-1.5 text-xs text-indigo-400">
            <ArrowLeft size={16} /> Ortga
          </button>
          <h3 className="font-bold text-white text-base">Band 7.5 - 9.0 Vocabulary</h3>
          <span className="text-xs bg-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-full font-semibold">{vocabIndex + 1}/{vocabList.length}</span>
        </div>

        {/* Flashcard */}
        <div 
          onClick={() => setShowVocabMeaning(!showVocabMeaning)}
          className="bg-gradient-to-br from-slate-800 to-indigo-950/80 border border-slate-700/80 rounded-3xl p-6 text-center cursor-pointer shadow-xl min-h-[220px] flex flex-col justify-center items-center space-y-3 transition transform active:scale-98"
        >
          <span className="text-[10px] bg-indigo-500/30 text-indigo-300 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
            IELTS Band {item.band}
          </span>
          <div className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
            {item.word}
            <button 
              onClick={(e) => { e.stopPropagation(); speakVocab(item.word); }}
              className="p-1.5 text-indigo-400 hover:text-white rounded-lg bg-indigo-600/30"
            >
              <Volume2 size={18} />
            </button>
          </div>
          <span className="text-xs italic text-slate-400">({item.type})</span>

          <div className="pt-2 border-t border-slate-700/60 w-full">
            {showVocabMeaning ? (
              <div className="animate-fadeIn space-y-1.5">
                <div className="text-sm font-bold text-emerald-400">{item.defUz}</div>
                <div className="text-xs text-slate-300 italic font-serif">"{item.example}"</div>
              </div>
            ) : (
              <div className="text-xs text-slate-500">Tarjimasi va misolini ko'rish uchun kartaga bosing</div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            disabled={vocabIndex === 0}
            onClick={() => { setVocabIndex(v => v - 1); setShowVocabMeaning(false); }}
            className="flex-1 py-2.5 bg-slate-800 disabled:opacity-40 text-white rounded-xl text-xs font-semibold"
          >
            Oldingisi
          </button>
          <button 
            disabled={vocabIndex === vocabList.length - 1}
            onClick={() => { setVocabIndex(v => v + 1); setShowVocabMeaning(false); }}
            className="flex-1 py-2.5 bg-indigo-600 disabled:opacity-40 text-white rounded-xl text-xs font-semibold"
          >
            Keyingisi
          </button>
        </div>
      </div>
    );
  };

  // --- PROFIL VA SOZLAMALAR ---
  const renderProfile = () => (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <h3 className="font-bold text-white text-base">Shaxsiy Profil</h3>
        <span className="text-xs text-emerald-400 font-semibold">● Ma'lumotlar saqlangan</span>
      </div>

      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 mx-auto flex items-center justify-center text-3xl shadow-md">
          {userProfile.avatar}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{userProfile.name}</h3>
          <p className="text-xs text-slate-400">{userProfile.currentLevel}</p>
        </div>
        <button 
          onClick={() => {
            setTempName(userProfile.name);
            setTempBand(userProfile.targetBand);
            setIsEditingProfile(true);
          }}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition"
        >
          Profilni Tahrirlash
        </button>
      </div>

      <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-4 space-y-3 text-xs">
        <h4 className="font-semibold text-white">Statistika & Ko'rsatkichlar:</h4>
        <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
          <span>Maqsadli Band Ball:</span>
          <span className="font-bold text-indigo-400">{userProfile.targetBand}</span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
          <span>Kunlik Ketma-ketlik (Streak):</span>
          <span className="font-bold text-amber-400">🔥 {userProfile.streak} kun</span>
        </div>
        <div className="flex justify-between py-1.5 text-slate-300">
          <span>Tugallangan testlar:</span>
          <span className="font-bold text-emerald-400">{userProfile.completedTests} ta</span>
        </div>
      </div>
    </div>
  );

  return (
    // ASOSIY TO'LIQ EKRANLI CONTAINER (TASHQI TELEFON KORPUSLARISIZ)
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans select-none antialiased">
      
      {/* Yuqori toza ilova headeri */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-white text-xs">
            Z
          </div>
          <span className="font-extrabold text-base tracking-tight text-white">Ziyo<span className="text-indigo-400">Prep</span></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
            🔥 {userProfile.streak} kun
          </span>
        </div>
      </header>

      {/* Markaziy sahifa maydoni */}
      <main className="flex-1 w-full max-w-lg mx-auto p-4 pb-24">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'listening' && renderListening()}
        {activeTab === 'reading' && renderReading()}
        {activeTab === 'writing' && renderWriting()}
        {activeTab === 'speaking' && renderSpeaking()}
        {activeTab === 'vocab' && renderVocab()}
        {activeTab === 'ai' && renderAiChat()}
        {activeTab === 'profile' && renderProfile()}
      </main>

      {/* Pastki Navigatsiya (Bottom Tab Bar) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 z-50">
        <div className="max-w-lg mx-auto flex justify-around items-center py-2 px-2">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${activeTab === 'home' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
          >
            <BookOpen size={18} />
            <span className="text-[10px]">Asosiy</span>
          </button>

          <button 
            onClick={() => setActiveTab('vocab')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${activeTab === 'vocab' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
          >
            <Layers size={18} />
            <span className="text-[10px]">Lug'at</span>
          </button>

          <button 
            onClick={() => setActiveTab('ai')}
            className="flex flex-col items-center -mt-5"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition transform active:scale-95 ${
              activeTab === 'ai' ? 'bg-indigo-500 text-white ring-4 ring-indigo-500/30' : 'bg-indigo-600 text-white'
            }`}>
              <Bot size={22} />
            </div>
            <span className="text-[10px] text-indigo-400 font-bold mt-1">ZiyoAI</span>
          </button>

          <button 
            onClick={() => setActiveTab('writing')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${activeTab === 'writing' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
          >
            <PenTool size={18} />
            <span className="text-[10px]">Writing</span>
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${activeTab === 'profile' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
          >
            <User size={18} />
            <span className="text-[10px]">Profil</span>
          </button>
        </div>
      </nav>

      {/* Profilni tahrirlash Modal oynasi */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 w-full max-w-sm space-y-4 shadow-2xl animate-fadeIn">
            <h3 className="font-bold text-white text-base">Profilni Tahrirlash</h3>
            
            <div>
              <label className="text-xs text-slate-400 block mb-1">Ismingiz:</label>
              <input 
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Maqsadli IELTS Ball:</label>
              <select
                value={tempBand}
                onChange={(e) => setTempBand(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-500"
              >
                {['6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0'].map(b => (
                  <option key={b} value={b}>Band {b}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => setIsEditingProfile(false)}
                className="flex-1 py-2.5 bg-slate-800 text-slate-300 font-semibold rounded-xl text-xs"
              >
                Bekor qilish
              </button>
              <button 
                onClick={() => {
                  setUserProfile(prev => ({
                    ...prev,
                    name: tempName.trim() || 'IELTS O\'quvchisi',
                    targetBand: tempBand
                  }));
                  setIsEditingProfile(false);
                }}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs"
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
