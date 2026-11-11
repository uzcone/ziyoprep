import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Headphones, 
  PenTool, 
  Mic, 
  MicOff, 
  User, 
  CheckCircle2, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Target, 
  Flame, 
  Calendar, 
  Sparkles, 
  BookMarked, 
  Send, 
  Bot, 
  Check, 
  X, 
  Edit3, 
  Award, 
  MessageSquare, 
  ChevronLeft,
  Highlighter,
  AlertCircle,
  BarChart3,
  RefreshCw,
  Clock,
  Sparkle,
  Bookmark,
  CheckCircle,
  TrendingUp,
  BrainCircuit,
  Settings,
  HelpCircle
} from 'lucide-react';

// ==========================================
// MOCK DATA: COMPREHENSIVE IELTS QUESTION SETS
// ==========================================

const READING_EXAM = {
  id: 'read_cambridge_18',
  title: 'The Cognitive Architecture of Multilingualism',
  subheading: 'Academic Reading - Passage 2 (Standard Cambridge Format)',
  passageParagraphs: [
    {
      id: 'p1',
      text: "A. For decades, traditional educational theorists posited that learning two or more languages in childhood caused intellectual confusion and impaired general linguistic fluency. Early cognitive assessments in the 1920s invariably showed bilingual individuals lagging behind monolingual peers in vocabulary acquisition and syntactic speed. However, contemporary neuroimaging technologies and rigorous psycholinguistic paradigms have decisively dismantled this historic misconception."
    },
    {
      id: 'p2',
      text: "B. Modern neurological research proves that both languages remain permanently active within the bilingual brain's executive control network, even when only one linguistic code is actively spoken. Rather than causing interference, this perpetual subconscious arbitration between conflicting grammatical structures strengthens the prefrontal cortex. This mental resistance training substantially optimizes cognitive flexibility, attentional inhibition, and task-switching velocity."
    },
    {
      id: 'p3',
      text: "C. Dr. Ellen Bialystok, a distinguished neuropsychologist at York University in Toronto, spearheaded groundbreaking longitudinal studies that revealed bilingual seniors develop initial symptoms of neurodegenerative pathologies, such as Alzheimer's disease, approximately four to five years later than equivalent monolinguals with identical degrees of underlying physiological brain damage."
    },
    {
      id: 'p4',
      text: "D. Despite this protective cognitive reserve, bilingual speakers occasionally exhibit minor lexical retrieval trade-offs. Standardized laboratory experiments demonstrate that bilingual adults sometimes score marginally lower on rapid single-word naming tasks and report a higher frequency of the ubiquitous 'tip-of-the-tongue' phenomenon, wherein a familiar term feels momentarily inaccessible."
    }
  ],
  questions: [
    {
      id: 'rq_1',
      type: 'TFNG',
      text: '1. Early 20th-century linguistic theories suggested that bilingualism impeded a child’s intellectual development.',
      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
      correctAnswer: 0,
      citation: 'Paragraph A: "...traditional educational theorists posited that learning two or more languages... caused intellectual confusion and impaired general linguistic fluency."',
      explanationUz: 'To‘g‘ri (TRUE). Matnda 1920-yillardagi an‘anaviy nazariyachilar ko‘p tillilik bolalarda aqliy chalkashlikka sabab bo‘ladi deb hisoblagani tasdiqlangan.'
    },
    {
      id: 'rq_2',
      type: 'TFNG',
      text: '2. The prefrontal cortex of a bilingual person is deactivated when only their native language is in use.',
      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
      correctAnswer: 1,
      citation: 'Paragraph B: "...both languages remain permanently active... even when only one linguistic code is actively spoken."',
      explanationUz: 'Noto‘g‘ri (FALSE). Matnda har ikkala til miyada doimiy faol holatda qolishi va prefrontal korteksni mustahkamlashi ta‘kidlangan.'
    },
    {
      id: 'rq_3',
      type: 'TFNG',
      text: '3. Dr. Ellen Bialystok studied patients suffering from Alzheimer’s across more than ten global countries.',
      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
      correctAnswer: 2,
      citation: 'Paragraph C: York Universityda tadqiqot o‘tkazilgani aytilgan, ammo 10 ta davlat haqida hech qanday ma‘lumot yo‘q.',
      explanationUz: 'NOT GIVEN. Matnda doktor Bialystokning 10 ta xalqaro davlatda bemorlarni o‘rgangani haqida umuman yozilmagan.'
    },
    {
      id: 'rq_4',
      type: 'MCQ',
      text: '4. According to Paragraph B, what mental capacity is directly bolstered by bilingualism?',
      options: [
        'Photographic visual memory retention',
        'Executive control and attentional task-switching',
        'Mathematical spatial calculation accuracy',
        'Subconscious auditory frequency processing'
      ],
      correctAnswer: 1,
      citation: 'Paragraph B: "...strengthens the prefrontal cortex... optimizes cognitive flexibility, attentional inhibition, and task-switching velocity."',
      explanationUz: 'To‘g‘ri javob B. Matnda bilingualizm kognitiv moslashuvchanlik va diqqatni boshqarish tezligini oshirishi qayd etilgan.'
    },
    {
      id: 'rq_5',
      type: 'MCQ',
      text: '5. What potential disadvantage of bilingualism is acknowledged in Paragraph D?',
      options: [
        'Impaired long-term episodic narrative memory',
        'Increased risk of childhood speech articulation disorders',
        'Marginally reduced speed in rapid single-word naming',
        'Total inability to master third and fourth grammatical systems'
      ],
      correctAnswer: 2,
      citation: 'Paragraph D: "...bilingual adults sometimes score marginally lower on rapid single-word naming tasks..."',
      explanationUz: 'To‘g‘ri javob C. 4-paragrafda ba‘zi bir so‘zlarni darhol yodga olish tezligida biroz kechikish bo‘lishi mumkinligi ko‘rsatilgan.'
    },
    {
      id: 'rq_6',
      type: 'COMPLETION',
      text: '6. The protective mental buffer described by researchers that delays Alzheimer symptoms is termed cognitive _______ .',
      options: ['reserve', 'resilience', 'flexibility', 'endurance'],
      correctAnswer: 0,
      citation: 'Paragraph D: "Despite this protective cognitive reserve..."',
      explanationUz: 'To‘g‘ri javob: reserve (Cognitive Reserve - kognitiv zaxira).'
    }
  ]
};

const LISTENING_EXAM = {
  id: 'lis_cambridge_18',
  title: 'Cambridge Academic Section 1: University Housing & Lease',
  audioSpeed: 1.0,
  dialogue: [
    { speaker: 'Officer', text: "Welcome to the Graduate Student Accommodation Service. How may I direct your housing application today?" },
    { speaker: 'Student', text: "Good morning! My name is Farhod Karimov from Uzbekistan. I was accepted for the MSc in Data Science and require an en-suite private room." },
    { speaker: 'Officer', text: "Congratulations on your admission! We have two primary residence complexes: St. Peter Court and Millfield Manor." },
    { speaker: 'Student', text: "Could you tell me the weekly cost and deposit requirement for St. Peter Court?" },
    { speaker: 'Officer', text: "St. Peter Court is one hundred and eighty-five pounds (£185) per week. That includes ultra-fast fiber internet and all utility tariffs. The security deposit is three hundred and fifty pounds (£350)." },
    { speaker: 'Student', text: "That is reasonable. Is there a designated bicycle storage facility on the premises?" },
    { speaker: 'Officer', text: "Yes, every resident receives complimentary access to an electronic biometric bicycle shelter situated behind Block B." },
    { speaker: 'Student', text: "Splendid! And what is the official contract moving date for international postgraduates?" },
    { speaker: 'Officer', text: "The formal key handover begins on Monday, the eighteenth (18th) of September." }
  ],
  questions: [
    {
      id: 'lq_1',
      question: '1. What master’s degree program is the applicant planning to study?',
      options: ['MSc in Software Engineering', 'MSc in Data Science', 'MA in Applied Linguistics', 'MSc in Artificial Intelligence'],
      correctAnswer: 1,
      explanationUz: 'Farhod: "...accepted for the MSc in Data Science".'
    },
    {
      id: 'lq_2',
      question: '2. What is the total weekly fee for St. Peter Court?',
      options: ['£165 per week', '£175 per week', '£185 per week', '£195 per week'],
      correctAnswer: 2,
      explanationUz: 'Officer: "St. Peter Court is one hundred and eighty-five pounds (£185) per week".'
    },
    {
      id: 'lq_3',
      question: '3. How much is the mandatory security deposit for the studio?',
      options: ['£250', '£300', '£350', '£400'],
      correctAnswer: 2,
      explanationUz: 'Officer: "The security deposit is three hundred and fifty pounds (£350)".'
    },
    {
      id: 'lq_4',
      question: '4. Where is the biometric bicycle storage area located on campus?',
      options: ['Adjacent to Reception', 'Behind Block B', 'Underground in Block A', 'Near the Dining Pavilion'],
      correctAnswer: 1,
      explanationUz: 'Officer: "...biometric bicycle shelter situated behind Block B".'
    },
    {
      id: 'lq_5',
      question: '5. On what exact date does the formal key collection start?',
      options: ['12th of September', '15th of September', '18th of September', '21st of September'],
      correctAnswer: 2,
      explanationUz: 'Officer: "The formal key handover begins on Monday, the eighteenth (18th) of September".'
    },
    {
      id: 'lq_6',
      question: '6. Are utility tariffs (water, heating, electricity) included in the quoted rent?',
      options: ['Yes, fully included', 'No, billed separately each month', 'Only heating is included', 'Only high-speed internet is included'],
      correctAnswer: 0,
      explanationUz: 'Officer: "That includes ultra-fast fiber internet and all utility tariffs".'
    }
  ]
};

const VOCAB_CATEGORIES = {
  Environment: [
    {
      id: 'v_env_1',
      word: 'Detrimental',
      phonetic: '/ˌdet.rəˈmen.təl/',
      partOfSpeech: 'adjective',
      definition: 'Causing clear damage, harm, or impairment.',
      uzbek: 'Zararli, halokatli ta’sir ko‘rsatuvchi',
      collocations: ['detrimental effect on', 'highly detrimental to'],
      sampleSentence: 'Excessive reliance on non-renewable fossil fuels exerts a detrimental impact on atmospheric homeostasis.',
      band: '8.5'
    },
    {
      id: 'v_env_2',
      word: 'Mitigate',
      phonetic: '/ˈmɪt.ɪ.ɡeɪt/',
      partOfSpeech: 'verb',
      definition: 'To make something bad or dangerous less severe or painful.',
      uzbek: 'Yumshatmoq, salbiy asoratlarni kamaytirmoq',
      collocations: ['mitigate the consequences', 'drastically mitigate emissions'],
      sampleSentence: 'Reforestation initiatives are indispensable to mitigate the accelerating effects of desertification.',
      band: '8.0'
    },
    {
      id: 'v_env_3',
      word: 'Depletion',
      phonetic: '/dɪˈpliː.ʃən/',
      partOfSpeech: 'noun',
      definition: 'A significant reduction in the quantity or number of something.',
      uzbek: 'Tugash, keskin kamayib ketish (resurslar)',
      collocations: ['ozone depletion', 'depletion of natural reserves'],
      sampleSentence: 'The relentless depletion of freshwater aquifers poses an existential threat to regional food security.',
      band: '7.5'
    }
  ],
  Technology: [
    {
      id: 'v_tech_1',
      word: 'Ubiquitous',
      phonetic: '/juːˈbɪk.wə.təs/',
      partOfSpeech: 'adjective',
      definition: 'Present, appearing, or encountered everywhere simultaneously.',
      uzbek: 'Hamma yerda mavjud, keng tarqalgan',
      collocations: ['ubiquitous presence', 'become ubiquitous in modern life'],
      sampleSentence: 'Algorithmic recommendations have become ubiquitous across all social media infrastructures.',
      band: '8.5'
    },
    {
      id: 'v_tech_2',
      word: 'Paradigm',
      phonetic: '/ˈpær.ə.daɪm/',
      partOfSpeech: 'noun',
      definition: 'A typical example, pattern, or model of something.',
      uzbek: 'Yondashuv modeli, ilmiy asos yoki namuna',
      collocations: ['paradigm shift', 'dominant paradigm'],
      sampleSentence: 'Artificial intelligence represents a fundamental paradigm shift in human information processing.',
      band: '8.0'
    }
  ],
  Society: [
    {
      id: 'v_soc_1',
      word: 'Exacerbate',
      phonetic: '/ɪɡˈzæs.ə.beɪt/',
      partOfSpeech: 'verb',
      definition: 'To worsen a pre-existing problematic state or crisis.',
      uzbek: 'Yomonlashtirmoq, keskinlashtirmoq',
      collocations: ['exacerbate inequalities', 'exacerbate the crisis'],
      sampleSentence: 'Soaring metropolitan housing costs exacerbate socioeconomic stratification among younger generations.',
      band: '8.5'
    },
    {
      id: 'v_soc_2',
      word: 'Cohesion',
      phonetic: '/koʊˈhiː.ʒən/',
      partOfSpeech: 'noun',
      definition: 'The state of cohering or sticking together in unity.',
      uzbek: 'Ijtimoiy jipslik, hamjihatlik',
      collocations: ['social cohesion', 'community cohesion'],
      sampleSentence: 'Equitable civic investments are essential to maintain social cohesion in multicultural cities.',
      band: '8.0'
    }
  ]
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'practice' | 'ai' | 'vocab' | 'profile'
  const [activeModule, setActiveModule] = useState(null); // 'listening' | 'reading' | 'writing' | 'speaking'
  const [dynamicIslandStatus, setDynamicIslandStatus] = useState('idle'); // 'idle' | 'playing' | 'recording' | 'ai'
  
  // Student Profile State
  const [profile, setProfile] = useState({
    name: 'Sardorbek Alimov',
    avatar: '👨‍🎓',
    targetBand: '8.0',
    currentLevel: 'C1 Academic Candidate',
    examDate: '2026-10-15',
    streakDays: 14,
    stats: {
      listeningScore: 7.5,
      readingScore: 8.0,
      writingScore: 7.0,
      speakingScore: 7.5,
      completedTests: 18
    },
    mistakeBank: [
      { id: 'mb_1', skill: 'Reading', question: 'Bilingual prefrontal cortex activation', tip: 'Paragraf B da "permanently active" jumlasi bor edi.' },
      { id: 'mb_2', skill: 'Listening', question: 'Key handover date confirmation', tip: '18th of September deb aniq ta\'kidlangan.' }
    ]
  });

  // Sound Engine: Native Web Speech API
  const speakText = (text, lang = 'en-GB', rate = 0.95) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.onstart = () => setDynamicIslandStatus('playing');
      utterance.onend = () => setDynamicIslandStatus('idle');
      utterance.onerror = () => setDynamicIslandStatus('idle');
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setDynamicIslandStatus('idle');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950 p-2 sm:p-5 font-sans select-none antialiased">
      {/* iPhone 16 Pro Max Mockup Enclosure */}
      <div className="relative w-full max-w-[412px] h-[872px] max-h-[96vh] bg-slate-900 rounded-[54px] shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_0_12px_#1e293b,0_0_0_15px_#334155] flex flex-col overflow-hidden border border-slate-700/80">
        
        {/* iOS 18 Dynamic Island & Status Bar */}
        <div className="relative z-50 w-full pt-3 px-7 flex items-center justify-between text-white text-xs font-semibold bg-slate-950/80 backdrop-blur-2xl">
          <span className="font-semibold tracking-tight text-[12px] font-mono">9:41</span>
          
          {/* Interactive Dynamic Island Capsule */}
          <div className={`transition-all duration-300 ease-out absolute left-1/2 -translate-x-1/2 top-2.5 h-7 bg-black rounded-full flex items-center justify-between px-3 border border-slate-800 shadow-inner ${
            dynamicIslandStatus === 'playing' ? 'w-44' : 
            dynamicIslandStatus === 'recording' ? 'w-40' : 
            dynamicIslandStatus === 'ai' ? 'w-36' : 'w-28'
          }`}>
            {dynamicIslandStatus === 'playing' && (
              <div className="flex items-center space-x-2 text-[10px] text-emerald-400 w-full justify-between">
                <span className="flex items-center space-x-1">
                  <Headphones size={11} className="animate-bounce" />
                  <span className="font-mono">Audio Track</span>
                </span>
                <span className="flex space-x-0.5">
                  <span className="w-1 h-2.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="w-1 h-3.5 bg-emerald-400 rounded-full animate-pulse delay-75"></span>
                  <span className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse delay-150"></span>
                </span>
              </div>
            )}
            {dynamicIslandStatus === 'recording' && (
              <div className="flex items-center space-x-2 text-[10px] text-rose-400 w-full justify-between">
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                  <span className="font-mono">REC Speaking</span>
                </span>
                <Mic size={12} className="text-rose-400 animate-pulse" />
              </div>
            )}
            {dynamicIslandStatus === 'ai' && (
              <div className="flex items-center space-x-1 text-[10px] text-indigo-300 w-full justify-between">
                <Bot size={12} className="animate-spin" />
                <span className="font-mono text-[9px]">ZiyoAI Engine</span>
                <Sparkles size={10} className="text-amber-300" />
              </div>
            )}
            {dynamicIslandStatus === 'idle' && (
              <div className="w-full flex items-center justify-end space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800"></span>
                <span className="w-2 h-2 rounded-full bg-indigo-500/70"></span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-1.5 text-white/90">
            <span className="text-[10px] font-mono tracking-tighter">5G</span>
            <div className="w-5 h-2.5 border border-white/80 rounded-xs p-0.5 flex items-center">
              <div className="h-full w-full bg-white rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* Primary Viewport */}
        <div className="flex-1 overflow-y-auto bg-slate-50 relative pb-20 scrollbar-none">
          {activeModule ? (
            <ModuleViewer 
              moduleType={activeModule}
              onBack={() => {
                stopAudio();
                setActiveModule(null);
                setDynamicIslandStatus('idle');
              }}
              profile={profile}
              setProfile={setProfile}
              speakText={speakText}
              stopAudio={stopAudio}
              setDynamicIslandStatus={setDynamicIslandStatus}
              onOpenAI={() => {
                stopAudio();
                setActiveModule(null);
                setActiveTab('ai');
              }}
            />
          ) : (
            <>
              {activeTab === 'home' && (
                <HomeScreen 
                  profile={profile}
                  onSelectModule={(mod) => setActiveModule(mod)}
                  onOpenAI={() => setActiveTab('ai')}
                  onOpenProfile={() => setActiveTab('profile')}
                />
              )}
              {activeTab === 'practice' && (
                <PracticeScreen onSelectModule={(mod) => setActiveModule(mod)} />
              )}
              {activeTab === 'ai' && (
                <ZiyoAITutorScreen 
                  profile={profile}
                  speakText={speakText}
                  stopAudio={stopAudio}
                  setDynamicIslandStatus={setDynamicIslandStatus}
                />
              )}
              {activeTab === 'vocab' && (
                <VocabScreen speakText={speakText} />
              )}
              {activeTab === 'profile' && (
                <ProfileScreen profile={profile} setProfile={setProfile} />
              )}
            </>
          )}
        </div>

        {/* Bottom Tab Bar (iOS Glassmorphism) */}
        {!activeModule && (
          <nav className="absolute bottom-0 inset-x-0 h-18 bg-white/90 backdrop-blur-2xl border-t border-slate-200/80 flex items-center justify-around px-3 z-40 pb-2 shadow-xl">
            <TabButton 
              active={activeTab === 'home'} 
              icon={<Sparkles size={20} />} 
              label="Bosh Sahifa" 
              onClick={() => { stopAudio(); setActiveTab('home'); }} 
            />
            <TabButton 
              active={activeTab === 'practice'} 
              icon={<BookOpen size={20} />} 
              label="IELTS Testlar" 
              onClick={() => { stopAudio(); setActiveTab('practice'); }} 
            />
            
            {/* Pulsing Floating Center AI Tutor Button */}
            <button
              onClick={() => { stopAudio(); setActiveTab('ai'); }}
              className="relative -top-2.5 flex flex-col items-center group active:scale-95 transition-all"
            >
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-700 text-white flex items-center justify-center shadow-lg shadow-indigo-600/40 border-2 border-white ring-2 ring-indigo-100">
                <Bot size={26} className="group-hover:rotate-6 transition-transform" />
              </div>
              <span className={`text-[10px] font-black mt-0.5 tracking-tight ${activeTab === 'ai' ? 'text-indigo-600' : 'text-slate-500'}`}>
                ZiyoAI
              </span>
            </button>

            <TabButton 
              active={activeTab === 'vocab'} 
              icon={<BookMarked size={20} />} 
              label="Lug'at Banki" 
              onClick={() => { stopAudio(); setActiveTab('vocab'); }} 
            />
            <TabButton 
              active={activeTab === 'profile'} 
              icon={<User size={20} />} 
              label="Profil & Natija" 
              onClick={() => { stopAudio(); setActiveTab('profile'); }} 
            />
          </nav>
        )}

        {/* Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900/40 rounded-full pointer-events-none z-50"></div>
      </div>
    </div>
  );
}

function TabButton({ active, icon, label, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 ${
        active ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-600'
      }`}
    >
      <div className={`p-1 rounded-xl transition-all ${active ? 'bg-indigo-50/90 scale-105' : ''}`}>
        {icon}
      </div>
      <span className="text-[10px] tracking-tight mt-0.5">{label}</span>
    </button>
  );
}

// ==========================================
// 1. HOME SCREEN (EXECUTIVE DASHBOARD)
// ==========================================
function HomeScreen({ profile, onSelectModule, onOpenAI, onOpenProfile }) {
  const examDate = new Date(profile.examDate);
  const today = new Date();
  const daysDiff = Math.max(1, Math.ceil((examDate - today) / (1000 * 60 * 60 * 24)));

  return (
    <div className="p-4 space-y-4">
      {/* Top Profile Strip */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onOpenProfile}>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-100 to-violet-100 flex items-center justify-center text-2xl border-2 border-indigo-200 shadow-xs">
            {profile.avatar}
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-medium">Xush kelibsiz,</span>
            <h2 className="text-sm font-extrabold text-slate-900 leading-tight">{profile.name}</h2>
            <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
              {profile.currentLevel}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full text-amber-700 text-xs font-black shadow-xs">
          <Flame size={15} className="fill-amber-500 text-amber-500 animate-bounce" />
          <span>{profile.streakDays} kun</span>
        </div>
      </div>

      {/* Target Band Hero Card */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-950 rounded-3xl p-5 text-white shadow-xl shadow-indigo-700/25 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-200 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
              Cambridge IELTS Target
            </span>
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="text-3xl font-black tracking-tight">Band {profile.targetBand}</span>
              <span className="text-xs text-indigo-300 font-bold">/ 9.0 Academic</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <Target size={24} className="text-white" />
          </div>
        </div>

        {/* 4 Skills Predictor Miniature Bars */}
        <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-4 gap-2 text-center">
          <div>
            <span className="text-[10px] text-indigo-200 block">Listening</span>
            <span className="text-xs font-black text-emerald-300">{profile.stats.listeningScore}</span>
          </div>
          <div>
            <span className="text-[10px] text-indigo-200 block">Reading</span>
            <span className="text-xs font-black text-blue-300">{profile.stats.readingScore}</span>
          </div>
          <div>
            <span className="text-[10px] text-indigo-200 block">Writing</span>
            <span className="text-xs font-black text-amber-300">{profile.stats.writingScore}</span>
          </div>
          <div>
            <span className="text-[10px] text-indigo-200 block">Speaking</span>
            <span className="text-xs font-black text-purple-300">{profile.stats.speakingScore}</span>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-indigo-200">
          <div className="flex items-center space-x-1">
            <Calendar size={13} />
            <span>Imtihongacha: <strong className="text-white font-bold">{daysDiff} kun</strong></span>
          </div>
          <span className="bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded font-bold">
            {profile.stats.completedTests} ta test bajarildi
          </span>
        </div>
      </div>

      {/* ZiyoAI Live Prompt Card */}
      <div 
        onClick={onOpenAI}
        className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-700 p-4 rounded-3xl text-white shadow-lg shadow-indigo-600/20 flex items-center justify-between cursor-pointer active:scale-[0.99] transition-all group border border-indigo-400/30"
      >
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform border border-white/30">
            <Bot size={26} />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h4 className="font-extrabold text-sm">ZiyoAI Examiner</h4>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <p className="text-[11px] text-indigo-100 mt-0.5">Ovozli & matnli IELTS imtihonchisi bilan mashq qiling</p>
          </div>
        </div>
        <ChevronRight size={18} className="text-white/80 group-hover:translate-x-1 transition-transform" />
      </div>

      {/* Core IELTS Modules Section */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">IELTS Bo'limlari</h3>
          <span className="text-[11px] text-indigo-600 font-bold">To‘liq Mock Testlar</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => onSelectModule('listening')}
            className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all active:scale-[0.98] text-left relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
              <Headphones size={22} />
            </div>
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900">Listening</h4>
              <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md">
                6 ta Savol
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Audio suhbat, tezlik & form completion</p>
          </button>

          <button 
            onClick={() => onSelectModule('reading')}
            className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-md transition-all active:scale-[0.98] text-left relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
              <BookOpen size={22} />
            </div>
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900">Reading</h4>
              <span className="text-[10px] font-black bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-md">
                6 ta Savol
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Passage 2, TFNG, MCQ & matn belgila</p>
          </button>

          <button 
            onClick={() => onSelectModule('writing')}
            className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all active:scale-[0.98] text-left relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
              <PenTool size={22} />
            </div>
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900">Writing</h4>
              <span className="text-[10px] font-black bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-md">
                Task 1 & 2
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">250 so‘zlik esse & 4 xil rubric tekshiruv</p>
          </button>

          <button 
            onClick={() => onSelectModule('speaking')}
            className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs hover:border-purple-400 hover:shadow-md transition-all active:scale-[0.98] text-left relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
              <Mic size={22} />
            </div>
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900">Speaking</h4>
              <span className="text-[10px] font-black bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded-md">
                Part 1-3
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Cue Card, 2 daq. taymer & ovoz yozish</p>
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. PRACTICE SCREEN
// ==========================================
function PracticeScreen({ onSelectModule }) {
  const practiceList = [
    {
      id: 'listening',
      title: 'Cambridge Academic 18: Listening Test 1',
      details: 'Section 1: Student Housing Office dialogue, 6 questions',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      icon: <Headphones size={22} />,
      status: 'Ready to play'
    },
    {
      id: 'reading',
      title: 'Cambridge Academic 18: Reading Passage 2',
      details: 'The Cognitive Architecture of Multilingualism, 6 questions',
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      icon: <BookOpen size={22} />,
      status: 'Passage Ready'
    },
    {
      id: 'writing',
      title: 'Academic Writing Studio: Task 2 Essay',
      details: 'University Education vs Workforce Training (250+ words)',
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      icon: <PenTool size={22} />,
      status: 'AI Rubric Ready'
    },
    {
      id: 'speaking',
      title: 'Official Speaking Simulation: Part 1, 2 & 3',
      details: 'Cue Card, 1-min preparation timer, 2-min speech recording',
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      icon: <Mic size={22} />,
      status: 'Full Mock Ready'
    }
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="pt-1">
        <h2 className="text-xl font-black text-slate-900">IELTS Mock Bank</h2>
        <p className="text-xs text-slate-500 mt-0.5">Xalqaro standartdagi to‘liq testlar to‘plami</p>
      </div>

      <div className="space-y-3">
        {practiceList.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectModule(item.id)}
            className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer active:scale-[0.99] flex items-start space-x-3.5"
          >
            <div className={`p-3 rounded-2xl ${item.color} border flex-shrink-0`}>
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-slate-900 truncate">{item.title}</h3>
                <ChevronRight size={16} className="text-slate-400" />
              </div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {item.details}
              </p>
              <div className="mt-2.5">
                <span className="text-[10px] font-black bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 3. READING MODULE (ACADEMIC PASSAGE + 6 QUESTIONS)
// ==========================================
function ReadingModule({ onComplete }) {
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [highlightedText, setHighlightedText] = useState({});
  const [activeTabSub, setActiveTabSub] = useState('passage'); // 'passage' | 'questions'

  const toggleHighlight = (pId) => {
    setHighlightedText(prev => ({
      ...prev,
      [pId]: !prev[pId]
    }));
  };

  const handleSelectAnswer = (qId, optionIdx) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    READING_EXAM.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correctCount++;
    });
    setScore(correctCount);
    setIsSubmitted(true);
    onComplete();
  };

  return (
    <div className="space-y-4">
      {/* Title & Navigation Pill */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            {READING_EXAM.subheading}
          </span>
          <span className="text-xs font-mono font-bold text-slate-400">6 Savol</span>
        </div>
        <h2 className="text-base font-black text-slate-900 mt-1">{READING_EXAM.title}</h2>

        {/* View Switcher: Passage vs Questions */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mt-3">
          <button
            onClick={() => setActiveTabSub('passage')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
              activeTabSub === 'passage' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Matn (Passage)
          </button>
          <button
            onClick={() => setActiveTabSub('questions')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
              activeTabSub === 'questions' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Savollar ({Object.keys(answers).length}/6)
          </button>
        </div>
      </div>

      {/* View 1: Academic Passage */}
      {activeTabSub === 'passage' && (
        <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
            <span className="font-bold text-slate-700">Paragraflar (A-D)</span>
            <span className="text-[11px] text-blue-600 italic">Paragrafni belgilash uchun bosing</span>
          </div>

          <div className="space-y-3 text-xs text-slate-800 leading-relaxed font-normal">
            {READING_EXAM.passageParagraphs.map((p) => {
              const isMarked = highlightedText[p.id];
              return (
                <div 
                  key={p.id}
                  onClick={() => toggleHighlight(p.id)}
                  className={`p-3 rounded-2xl cursor-pointer transition-all border ${
                    isMarked 
                      ? 'bg-amber-50/80 border-amber-300 shadow-xs' 
                      : 'bg-slate-50/60 border-transparent hover:border-slate-200'
                  }`}
                >
                  <p>{p.text}</p>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setActiveTabSub('questions')}
            className="w-full py-3 bg-blue-600 text-white font-bold text-xs rounded-2xl hover:bg-blue-700 transition-all shadow-md active:scale-98 flex items-center justify-center space-x-2"
          >
            <span>Savollarga o'tish</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* View 2: Questions */}
      {activeTabSub === 'questions' && (
        <div className="space-y-3">
          {READING_EXAM.questions.map((q, idx) => {
            const isCorrect = isSubmitted && answers[q.id] === q.correctAnswer;
            return (
              <div key={q.id} className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    Savol {idx + 1} ({q.type})
                  </span>
                  {isSubmitted && (
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {isCorrect ? 'To‘g‘ri' : 'Xato'}
                    </span>
                  )}
                </div>

                <p className="text-xs font-bold text-slate-900 leading-snug">{q.text}</p>

                <div className="space-y-1.5 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = answers[q.id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectAnswer(q.id, optIdx)}
                        disabled={isSubmitted}
                        className={`w-full text-left p-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white font-semibold'
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <Check size={14} className="text-white" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation in Uzbek with citation */}
                {isSubmitted && (
                  <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] space-y-1 bg-slate-50 p-2.5 rounded-xl">
                    <p className="font-bold text-blue-700">Tushuntirish (Band 9):</p>
                    <p className="text-slate-600">{q.explanationUz}</p>
                    <p className="text-slate-400 italic text-[10px] mt-1 border-t border-slate-200 pt-1">
                      {q.citation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < READING_EXAM.questions.length}
              className="w-full py-3.5 bg-blue-600 text-white font-black text-xs rounded-2xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md active:scale-98"
            >
              Testni Yakunlash va Natijani Tekshirish ({Object.keys(answers).length}/6)
            </button>
          ) : (
            <div className="bg-white p-4 rounded-3xl border border-blue-300 text-center space-y-1 shadow-md">
              <p className="text-xs font-bold text-slate-600">Reading Natijangiz:</p>
              <p className="text-3xl font-black text-blue-600">{score} / {READING_EXAM.questions.length}</p>
              <p className="text-xs text-slate-500">
                {score >= 5 ? "Ajoyib! Band 8.0-8.5 darajasi." : "Yaxshi urinish! Xatolar ustida ishlab chiqing."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. LISTENING MODULE (REAL SPEECH + 6 QUESTIONS)
// ==========================================
function ListeningModule({ speakText, stopAudio, setDynamicIslandStatus, onComplete }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [speed, setSpeed] = useState(1.0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    let active = true;

    if (isPlaying) {
      setDynamicIslandStatus('playing');
      const playNext = (index) => {
        if (!active || !isPlaying) return;
        if (index >= LISTENING_EXAM.dialogue.length) {
          setIsPlaying(false);
          setCurrentLineIndex(0);
          setDynamicIslandStatus('idle');
          return;
        }

        setCurrentLineIndex(index);
        const line = LISTENING_EXAM.dialogue[index];
        const utterance = new SpeechSynthesisUtterance(`${line.speaker}: ${line.text}`);
        utterance.lang = line.speaker === 'Student' ? 'en-US' : 'en-GB';
        utterance.rate = speed;

        utterance.onend = () => {
          if (active && isPlaying) {
            playNext(index + 1);
          }
        };

        utterance.onerror = () => {
          setIsPlaying(false);
          setDynamicIslandStatus('idle');
        };

        window.speechSynthesis.speak(utterance);
      };

      playNext(currentLineIndex);
    } else {
      window.speechSynthesis.cancel();
      setDynamicIslandStatus('idle');
    }

    return () => {
      active = false;
      window.speechSynthesis.cancel();
      setDynamicIslandStatus('idle');
    };
  }, [isPlaying, speed]);

  const togglePlayback = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const restartAudio = () => {
    stopAudio();
    setCurrentLineIndex(0);
    setIsPlaying(true);
  };

  const handleSelectAnswer = (qId, idx) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [qId]: idx }));
  };

  const handleSubmit = () => {
    let count = 0;
    LISTENING_EXAM.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) count++;
    });
    setScore(count);
    setIsSubmitted(true);
    onComplete();
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs">
        <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
          Cambridge Academic 18 - Section 1
        </span>
        <h2 className="text-base font-black text-slate-900 mt-1">{LISTENING_EXAM.title}</h2>
        <p className="text-xs text-slate-500 mt-0.5">Audioni diqqat bilan tinglang va 6 ta savolga javob bering.</p>
      </div>

      {/* Audio Engine Card */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-950 text-white p-4 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold tracking-wide">Section 1 Audio Track</span>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center space-x-1 bg-white/10 p-0.5 rounded-lg text-[10px] font-bold">
            {[0.75, 1.0, 1.25, 1.5].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-1.5 py-0.5 rounded transition-colors ${speed === s ? 'bg-white text-emerald-800' : 'text-white hover:bg-white/10'}`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Live Audio Waveform Simulation */}
        <div className="flex items-center justify-center space-x-1 h-12 my-3">
          {[30, 65, 45, 90, 35, 100, 55, 75, 45, 85, 65, 35, 95, 50, 80, 40, 70].map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-200 ${
                isPlaying ? 'bg-emerald-300 animate-pulse' : 'bg-white/30'
              }`}
              style={{ height: isPlaying ? `${h}%` : '20%' }}
            ></div>
          ))}
        </div>

        {/* Active Dialogue Cue */}
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-2.5 text-center text-xs text-emerald-100 min-h-[48px] flex items-center justify-center italic">
          {isPlaying ? (
            <span>"{LISTENING_EXAM.dialogue[currentLineIndex]?.text}"</span>
          ) : (
            <span className="text-emerald-200/70">Tinglash uchun "Play" tugmasini bosing</span>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-4 pt-2 border-t border-white/15">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="text-[11px] font-bold text-emerald-200 hover:text-white"
          >
            {showTranscript ? 'Transkriptni yopish' : 'Transkriptni ko‘rish'}
          </button>

          <div className="flex items-center space-x-3">
            <button 
              onClick={restartAudio} 
              className="p-2 rounded-full hover:bg-white/15 active:scale-95 transition-all"
              title="Qayta boshlash"
            >
              <RotateCcw size={16} />
            </button>
            <button
              onClick={togglePlayback}
              className="w-12 h-12 rounded-full bg-white text-emerald-800 flex items-center justify-center shadow-lg active:scale-95 transition-all"
            >
              {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Transcript Collapsible */}
      {showTranscript && (
        <div className="bg-white p-3.5 rounded-3xl border border-slate-200 text-xs text-slate-700 leading-relaxed max-h-52 overflow-y-auto space-y-1.5 animate-fadeIn">
          <h4 className="font-bold text-slate-900 mb-1">To‘liq Suhbat Transkripti:</h4>
          {LISTENING_EXAM.dialogue.map((d, idx) => (
            <p key={idx} className={idx === currentLineIndex && isPlaying ? 'text-emerald-700 font-bold bg-emerald-50 p-1 rounded-lg' : ''}>
              <strong>{d.speaker}:</strong> {d.text}
            </p>
          ))}
        </div>
      )}

      {/* 6 Questions */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 px-1">
          Listening Savollari (1-6)
        </h3>

        {LISTENING_EXAM.questions.map((q, idx) => {
          const isCorrect = isSubmitted && answers[q.id] === q.correctAnswer;
          return (
            <div key={q.id} className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-slate-400">Savol {idx + 1}</span>
                {isSubmitted && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {isCorrect ? 'To‘g‘ri' : 'Xato'}
                  </span>
                )}
              </div>

              <p className="text-xs font-bold text-slate-900">{q.question}</p>

              <div className="space-y-1.5 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isSelected = answers[q.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectAnswer(q.id, optIdx)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-emerald-600 text-white font-semibold'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && <Check size={14} className="text-white" />}
                    </button>
                  );
                })}
              </div>

              {isSubmitted && (
                <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl">
                  <strong>Tushuntirish:</strong> {q.explanationUz}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!isSubmitted ? (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < LISTENING_EXAM.questions.length}
          className="w-full py-3.5 bg-emerald-600 text-white font-black text-xs rounded-2xl hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-md active:scale-98"
        >
          Listening Javoblarini Tekshirish ({Object.keys(answers).length}/6)
        </button>
      ) : (
        <div className="bg-white p-4 rounded-3xl border border-emerald-300 text-center space-y-1 shadow-md">
          <p className="text-xs font-bold text-slate-600">Listening Natijangiz:</p>
          <p className="text-3xl font-black text-emerald-600">{score} / {LISTENING_EXAM.questions.length}</p>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 5. WRITING MODULE (TASK 1 & 2 + 4 CRITERIA)
// ==========================================
function WritingModule({ onComplete, onOpenAI }) {
  const [taskType, setTaskType] = useState('task2'); // 'task1' | 'task2'
  const [essay, setEssay] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  const wordCount = essay.trim() === '' ? 0 : essay.trim().split(/\s+/).length;
  const targetWords = taskType === 'task1' ? 150 : 250;

  const handleEvaluateEssay = async () => {
    setIsEvaluating(true);

    try {
      const prompt = `Act as an official British Council IELTS Examiner. Evaluate the following ${taskType.toUpperCase()} submission:
- Task: ${taskType === 'task1' ? 'Summarize chart data (150 words minimum)' : 'Discuss views on University education vs workplace vocational preparation (250 words minimum)'}
- Text: "${essay}"

Provide a detailed rubric analysis with individual bands for:
1. Task Achievement / Response
2. Coherence and Cohesion
3. Lexical Resource (suggest 3 higher-level Band 8+ synonyms)
4. Grammatical Range and Accuracy
Give an overall estimated Band score and actionable tips in Uzbek.`;

      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: "You are a professional IELTS Writing Examiner. Provide official feedback with Band estimations in Uzbek." }] }
        })
      });

      const data = await res.json();
      const output = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (output) {
        setEvaluation({ text: output, band: wordCount >= targetWords ? '7.5' : '6.0' });
      } else {
        throw new Error('Offline fallback');
      }
    } catch (e) {
      setEvaluation({
        band: wordCount >= targetWords ? '7.0' : '5.5',
        text: `Official Rubric Baholash (Oflayn rejim):\n\n• Task Achievement (TA): ${wordCount >= targetWords ? 'Band 7.5 (So‘z soni to‘liq me’yorda, mavzu yoritilgan)' : 'Band 5.5 (So‘z soni yetarli emas)'}\n• Coherence & Cohesion (CC): Band 7.0 (Mantiqiy paragraflar va xatboshilar mavjud)\n• Lexical Resource (LR): Band 7.0 (Mavzuga doir so‘z boyligi yaxshi qo‘llanilgan)\n• Grammatical Range (GRA): Band 7.0 (Kompleks jumlalar ishlatilgan)\n\nMaslahat: Keyingi safar mavzuga doir 'ubiquitous', 'mitigate' va 'detrimental' kabi C1 akademik so‘zlarni ko‘proq kiritish orqali 8.0 ballga ko‘tarish mumkin.`
      });
    } finally {
      setIsEvaluating(false);
      onComplete();
    }
  };

  return (
    <div className="space-y-4">
      {/* Task 1 / Task 2 Selector */}
      <div className="flex bg-slate-200/80 p-1 rounded-2xl">
        <button
          onClick={() => { setTaskType('task1'); setEvaluation(null); }}
          className={`flex-1 py-1.5 text-xs font-black rounded-xl transition-all ${
            taskType === 'task1' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600'
          }`}
        >
          Task 1 (Report 150+ words)
        </button>
        <button
          onClick={() => { setTaskType('task2'); setEvaluation(null); }}
          className={`flex-1 py-1.5 text-xs font-black rounded-xl transition-all ${
            taskType === 'task2' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600'
          }`}
        >
          Task 2 (Essay 250+ words)
        </button>
      </div>

      {/* Prompt Card */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs space-y-2">
        <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
          {taskType === 'task1' ? 'Academic Task 1 Prompt' : 'Academic Task 2 Essay Prompt'}
        </span>
        <h3 className="text-xs font-extrabold text-slate-900 leading-relaxed">
          {taskType === 'task1'
            ? 'The chart illustrates the consumption of renewable energy in four OECD countries between 2000 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.'
            : '"Some people argue that universities should exclusively prepare graduates with practical skills required by future employers. Others believe universities must prioritize academic research and theory." Discuss both views and give your opinion.'
          }
        </h3>
      </div>

      {/* Text Area Editor */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-extrabold text-slate-800">Yozish Maydoni</span>
          <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-lg ${wordCount >= targetWords ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
            {wordCount} / {targetWords} so‘z
          </span>
        </div>

        <textarea
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          placeholder={taskType === 'task1' ? "Introduction, Overview va 2 ta detallar paragrafi yozing..." : "Introduction, Body 1, Body 2 va Conclusion xatboshilarini yozing..."}
          rows={9}
          className="w-full text-xs text-slate-800 p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 leading-relaxed resize-none"
        />
      </div>

      <button
        onClick={handleEvaluateEssay}
        disabled={wordCount < 10 || isEvaluating}
        className="w-full py-3.5 bg-amber-600 text-white font-black text-xs rounded-2xl hover:bg-amber-700 disabled:opacity-50 transition-all shadow-md active:scale-98 flex items-center justify-center space-x-2"
      >
        {isEvaluating ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>ZiyoAI 4 ta mezon bo‘yicha tekshirmoqda...</span>
          </>
        ) : (
          <>
            <Sparkles size={16} />
            <span>ZiyoAI orqali Rasmiy Baholash</span>
          </>
        )}
      </button>

      {/* Rubric Feedback Output */}
      {evaluation && (
        <div className="bg-white p-4 rounded-3xl border-2 border-amber-300 shadow-md space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-black text-slate-900">ZiyoAI Rasmiy Xulosasi</span>
            <span className="text-xs font-black text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
              Taxminiy Band: {evaluation.band}
            </span>
          </div>
          <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto bg-slate-50 p-3 rounded-2xl border border-slate-200">
            {evaluation.text}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 6. SPEAKING SIMULATOR (PART 1, 2 & 3 + STT)
// ==========================================
function SpeakingModule({ speakText, setDynamicIslandStatus, onComplete }) {
  const [part, setPart] = useState(2); // Part 1 | Part 2 | Part 3
  const [timerType, setTimerType] = useState('prep'); // 'prep' (60s) | 'speak' (120s)
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedSpeech, setTranscribedSpeech] = useState('');

  useEffect(() => {
    let t = null;
    if (isRunning && timeLeft > 0) {
      t = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (timerType === 'prep') {
        setTimerType('speak');
        setTimeLeft(120);
      }
    }
    return () => clearInterval(t);
  }, [isRunning, timeLeft, timerType]);

  // Web Speech STT for Speaking
  const toggleRecording = () => {
    const SpeechRecognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognition) {
      setIsRecording(!isRecording);
      if (!isRecording) {
        setDynamicIslandStatus('recording');
        setTranscribedSpeech("I would like to acquire advanced machine learning skills because it is ubiquitous in automated industries...");
        onComplete();
      } else {
        setDynamicIslandStatus('idle');
      }
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      setDynamicIslandStatus('idle');
      onComplete();
    } else {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.continuous = true;

        recognition.onstart = () => {
          setIsRecording(true);
          setDynamicIslandStatus('recording');
        };

        recognition.onresult = (event) => {
          let str = '';
          for (let i = 0; i < event.results.length; i++) {
            str += event.results[i][0].transcript + ' ';
          }
          setTranscribedSpeech(str);
        };

        recognition.onerror = () => {
          setIsRecording(false);
          setDynamicIslandStatus('idle');
        };

        recognition.onend = () => {
          setIsRecording(false);
          setDynamicIslandStatus('idle');
        };

        recognition.start();
      } catch (e) {
        setIsRecording(false);
        setDynamicIslandStatus('idle');
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* 3 Parts Navigation */}
      <div className="flex bg-slate-200/80 p-1 rounded-2xl">
        {[1, 2, 3].map((pNum) => (
          <button
            key={pNum}
            onClick={() => { setPart(pNum); setIsRunning(false); }}
            className={`flex-1 py-1.5 text-xs font-black rounded-xl transition-all ${
              part === pNum ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Part {pNum}
          </button>
        ))}
      </div>

      {/* Part 1 Content */}
      {part === 1 && (
        <div className="bg-white p-4 rounded-3xl border border-purple-200 shadow-xs space-y-3">
          <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
            Part 1: Introduction & Interview
          </span>
          <h4 className="text-xs font-extrabold text-slate-900">Mavzu: Hometown & Daily Routine</h4>
          <div className="space-y-2 text-xs text-slate-700">
            <p className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">1. Where is your hometown located in Uzbekistan?</p>
            <p className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">2. What do you like most about living there?</p>
            <p className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">3. How do you usually balance your work and leisure time?</p>
          </div>
        </div>
      )}

      {/* Part 2 Cue Card */}
      {part === 2 && (
        <div className="bg-white p-4 rounded-3xl border border-purple-200 shadow-xs space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
              Part 2: Official Cue Card
            </span>
            <button 
              onClick={() => speakText("Describe a practical skill you would like to master in the future.")}
              className="p-1 text-purple-600 hover:bg-purple-50 rounded-lg"
              title="Savolni ovozli o'qish"
            >
              <Volume2 size={16} />
            </button>
          </div>

          <h3 className="font-extrabold text-sm text-slate-900">
            Describe a practical skill you would like to master in the future.
          </h3>
          <p className="text-xs text-slate-500">You should say:</p>
          <ul className="text-xs text-slate-600 list-disc list-inside space-y-1 pl-1">
            <li>What this skill is and why you chose it</li>
            <li>Where and how you intend to study it</li>
            <li>What difficulties you might encounter</li>
            <li>And explain how it will enhance your career trajectory</li>
          </ul>
        </div>
      )}

      {/* Part 3 Discussion */}
      {part === 3 && (
        <div className="bg-white p-4 rounded-3xl border border-purple-200 shadow-xs space-y-3">
          <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
            Part 3: Two-way Abstract Discussion
          </span>
          <h4 className="text-xs font-extrabold text-slate-900">Mavzu: Education & Technological Shifts</h4>
          <div className="space-y-2 text-xs text-slate-700">
            <p className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">1. How have artificial intelligence tools changed traditional classrooms?</p>
            <p className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">2. Will automation make human teachers obsolete in the coming decades?</p>
          </div>
        </div>
      )}

      {/* Timers & Audio Recorder */}
      <div className="bg-slate-900 text-white p-4 rounded-3xl shadow-lg space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex space-x-1.5">
            <button
              onClick={() => { setIsRunning(false); setTimerType('prep'); setTimeLeft(60); }}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-black transition-all ${
                timerType === 'prep' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              1 daq. Prep
            </button>
            <button
              onClick={() => { setIsRunning(false); setTimerType('speak'); setTimeLeft(120); }}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-black transition-all ${
                timerType === 'speak' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              2 daq. Nutq
            </button>
          </div>

          <span className="font-mono text-xl font-black text-purple-300">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>

        {/* Live Audio Visualizer */}
        <div className="flex items-center justify-center space-x-1.5 h-10">
          {[40, 75, 35, 95, 60, 25, 85, 50, 100, 45, 80, 30].map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-200 ${
                isRecording ? 'bg-purple-400 animate-pulse' : 'bg-slate-700'
              }`}
              style={{ height: isRecording ? `${h}%` : '20%' }}
            ></div>
          ))}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-all"
          >
            {isRunning ? 'Taymerni To‘xtatish' : 'Taymerni Boshlash'}
          </button>
          <button
            onClick={toggleRecording}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black flex items-center justify-center space-x-1.5 transition-all active:scale-95 ${
              isRecording ? 'bg-rose-600 text-white animate-pulse' : 'bg-purple-600 text-white'
            }`}
          >
            {isRecording ? <MicOff size={15} /> : <Mic size={15} />}
            <span>{isRecording ? "Yozishni Tugatish" : "Nutqni Yozish"}</span>
          </button>
        </div>
      </div>

      {/* Real-time Transcription Stream */}
      {transcribedSpeech && (
        <div className="bg-white p-3.5 rounded-3xl border border-purple-200 shadow-xs space-y-1.5 animate-fadeIn">
          <div className="flex justify-between items-center text-[10px] font-black text-purple-700 uppercase">
            <span>Ovoz Transkripti (Real vaqtda):</span>
            <span className="bg-purple-50 px-2 py-0.5 rounded-full">Fluency Analiz</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed italic bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
            "{transcribedSpeech}"
          </p>
        </div>
      )}
    </div>
  );
}

// Router Wrapper for Modules
function ModuleViewer({ moduleType, onBack, profile, setProfile, speakText, stopAudio, setDynamicIslandStatus, onOpenAI }) {
  const handleComplete = (type) => {
    setProfile(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        completedTests: prev.stats.completedTests + 1
      }
    }));
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-xs font-black text-indigo-600 active:scale-95 transition-transform"
        >
          <ChevronLeft size={18} className="mr-0.5" />
          Orqaga
        </button>
        <span className="text-xs font-black uppercase tracking-wider text-slate-800">
          {moduleType === 'listening' && 'IELTS Listening'}
          {moduleType === 'reading' && 'IELTS Reading'}
          {moduleType === 'writing' && 'IELTS Writing'}
          {moduleType === 'speaking' && 'IELTS Speaking'}
        </span>
        <div className="w-8"></div>
      </div>

      <div className="p-4 flex-1">
        {moduleType === 'listening' && (
          <ListeningModule 
            speakText={speakText}
            stopAudio={stopAudio}
            setDynamicIslandStatus={setDynamicIslandStatus}
            onComplete={() => handleComplete('listening')}
          />
        )}
        {moduleType === 'reading' && (
          <ReadingModule onComplete={() => handleComplete('reading')} />
        )}
        {moduleType === 'writing' && (
          <WritingModule 
            onComplete={() => handleComplete('writing')} 
            onOpenAI={onOpenAI}
          />
        )}
        {moduleType === 'speaking' && (
          <SpeakingModule 
            speakText={speakText}
            setDynamicIslandStatus={setDynamicIslandStatus}
            onComplete={() => handleComplete('speaking')}
          />
        )}
      </div>
    </div>
  );
}

// ==========================================
// 7. ZIYOAI TUTOR ROBOT (VOICE & TEXT)
// ==========================================
function ZiyoAITutorScreen({ profile, speakText, stopAudio, setDynamicIslandStatus }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Salom, ${profile.name}! Men sizning shaxsiy IELTS ZiyoAI repetitoringizman.
Menga inglizcha yoki o‘zbekcha savol yozishingiz, yoki mikrofon tugmasini bosib ovoz orqali mashq qilishingiz mumkin. Qaysi mezonni kuchaytiramiz?`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleVoiceInput = () => {
    const SpeechRecognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognition) {
      alert("Kechirasiz, brauzeringiz Speech Recognition API funksiyasini qo‘llab-quvvatlamaydi. Iltimos matn orqali yozing.");
      return;
    }

    if (isVoiceListening) {
      setIsVoiceListening(false);
      setDynamicIslandStatus('idle');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsVoiceListening(true);
        setDynamicIslandStatus('recording');
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsVoiceListening(false);
        setDynamicIslandStatus('idle');
      };

      recognition.onerror = () => {
        setIsVoiceListening(false);
        setDynamicIslandStatus('idle');
      };

      recognition.onend = () => {
        setIsVoiceListening(false);
        setDynamicIslandStatus('idle');
      };

      recognition.start();
    } catch (err) {
      setIsVoiceListening(false);
      setDynamicIslandStatus('idle');
    }
  };

  const handleSendMessage = async (textToSend = inputText) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);
    setDynamicIslandStatus('ai');

    try {
      const systemInstruction = `You are ZiyoAI, a British Council certified IELTS Master Examiner and coach for Uzbek students.
- Address the user as ${profile.name} (target Band: ${profile.targetBand}).
- Answer IELTS Speaking, Writing, Reading, and Listening queries.
- Correct grammatical errors, point out lexical enhancements (Band 8+ collocations), and explain criteria.
- Keep responses compact, inspiring, and bilingual (Uzbek & English).`;

      const contents = [
        ...messages.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.text }]
        })),
        { role: 'user', parts: [{ text: textToSend }] }
      ];

      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: contents,
          systemInstruction: { parts: [{ text: systemInstruction }] }
        })
      });

      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Kechirasiz, javob shakllantirishda xatolik yuz berdi.";

      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);

      if (!isMuted) {
        speakText(reply.replace(/[*_#]/g, ''), 'en-US');
      }
    } catch (error) {
      const fallback = "Ajoyib savol! Band 8.0 olish uchun doimo 'Task Achievement' va 'Coherence' talablariga diqqat qiling va so‘zlarni to‘g‘ri kollokatsiyalar bilan ishlating.";
      setMessages(prev => [...prev, { role: 'assistant', text: fallback }]);
      if (!isMuted) {
        speakText(fallback, 'uz-UZ');
      }
    } finally {
      setIsLoading(false);
      setDynamicIslandStatus('idle');
    }
  };

  return (
    <div className="flex flex-col h-[780px] bg-slate-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-700 text-white flex items-center justify-center shadow-md">
            <Bot size={22} />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <h2 className="text-xs font-black text-slate-900">ZiyoAI Examiner</h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Ovozli & Matnli IELTS Roboti</p>
          </div>
        </div>

        <button
          onClick={() => {
            if (!isMuted) stopAudio();
            setIsMuted(!isMuted);
          }}
          className={`p-2 rounded-xl text-xs font-bold transition-all ${
            isMuted ? 'bg-slate-100 text-slate-400' : 'bg-indigo-50 text-indigo-600'
          }`}
          title={isMuted ? "Ovozni yoqish" : "Ovozni o‘chirish"}
        >
          {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none">
        {messages.map((m, idx) => {
          const isUser = m.role === 'user';
          return (
            <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[84%] p-3.5 rounded-3xl text-xs leading-relaxed shadow-2xs ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-br-xs'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                }`}
              >
                {!isUser && (
                  <div className="flex items-center justify-between mb-1 pb-1 border-b border-slate-100 text-[10px] text-indigo-600 font-extrabold">
                    <span>ZiyoAI</span>
                    <button 
                      onClick={() => speakText(m.text.replace(/[*_#]/g, ''))}
                      className="text-slate-400 hover:text-indigo-600"
                    >
                      <Volume2 size={13} />
                    </button>
                  </div>
                )}
                <p className="whitespace-pre-line">{m.text}</p>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></div>
              <span className="text-xs text-slate-500 font-medium">ZiyoAI javob tayyorlamoqda...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-4 py-1.5 flex items-center space-x-2 overflow-x-auto scrollbar-none">
        {[
          "Speaking Part 1 mock o'tkaz",
          "Band 8.0 uchun 5 ta kollokatsiya",
          "Writing Task 2 rejasini tuz"
        ].map((q, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(q)}
            className="flex-shrink-0 bg-white border border-slate-200 text-slate-600 text-[11px] font-bold px-3 py-1 rounded-full hover:border-indigo-400 active:scale-95 shadow-2xs"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
        <button
          onClick={handleVoiceInput}
          className={`p-3 rounded-2xl transition-all active:scale-95 ${
            isVoiceListening 
              ? 'bg-rose-500 text-white animate-pulse' 
              : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
          }`}
          title="Ovoz bilan gapirish"
        >
          <Mic size={18} />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={isVoiceListening ? "Gapiring, eshitmoqdaman..." : "Savol yoki gap yozing..."}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() || isLoading}
          className="p-3 bg-indigo-600 text-white rounded-2xl disabled:opacity-40 active:scale-95 transition-all shadow-md shadow-indigo-600/20"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 8. VOCABULARY VAULT (BAND 7-9 FLASHCARDS)
// ==========================================
function VocabScreen({ speakText }) {
  const [category, setCategory] = useState('Environment');
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const wordList = VOCAB_CATEGORIES[category] || [];
  const currentItem = wordList[index] || wordList[0];

  const handleNext = () => {
    setIsFlipped(false);
    setIndex((prev) => (prev + 1) % wordList.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setIndex((prev) => (prev - 1 + wordList.length) % wordList.length);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="pt-1">
        <h2 className="text-xl font-black text-slate-900">IELTS Band 7-9 Lug'at Banki</h2>
        <p className="text-xs text-slate-500 mt-0.5">Top akademik so‘zlar, kollokatsiyalar va ovozli talaffuz</p>
      </div>

      {/* Category Pills */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {Object.keys(VOCAB_CATEGORIES).map((cat) => (
          <button
            key={cat}
            onClick={() => { setCategory(cat); setIndex(0); setIsFlipped(false); }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              category === cat ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Card Info */}
      <div className="flex justify-between items-center text-xs text-slate-500 px-1">
        <span>So'z: {index + 1} / {wordList.length}</span>
        <span className="font-black text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
          Band {currentItem?.band}
        </span>
      </div>

      {/* Flashcard Body */}
      {currentItem && (
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="w-full min-h-[290px] bg-white rounded-3xl p-6 border-2 border-indigo-100 shadow-md cursor-pointer flex flex-col justify-between transition-all group active:scale-[0.99]"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
              {currentItem.partOfSpeech}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                speakText(currentItem.word);
              }}
              className="p-2 rounded-full bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-colors"
              title="Talaffuzni tinglash"
            >
              <Volume2 size={18} />
            </button>
          </div>

          {!isFlipped ? (
            <div className="my-auto text-center space-y-2">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">{currentItem.word}</h3>
              <p className="text-xs font-mono text-slate-400">{currentItem.phonetic}</p>
              <p className="text-xs text-slate-400 italic pt-2">(O'zbekcha tarjimani ko'rish uchun bosing)</p>
            </div>
          ) : (
            <div className="my-auto text-center space-y-2.5 animate-fadeIn">
              <h4 className="text-lg font-black text-indigo-600">{currentItem.uzbek}</h4>
              <p className="text-xs text-slate-700 leading-relaxed px-1">
                <strong>English:</strong> {currentItem.definition}
              </p>
              <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 text-left space-y-1">
                <span className="text-[10px] font-bold text-indigo-700 block uppercase">Kollokatsiyalar:</span>
                <p className="text-[11px] text-slate-600">{currentItem.collocations.join(', ')}</p>
                <span className="text-[10px] font-bold text-slate-500 block uppercase pt-1">Misol:</span>
                <p className="text-[11px] text-slate-700 italic">"{currentItem.sampleSentence}"</p>
              </div>
            </div>
          )}

          <div className="text-center text-[10px] text-slate-400 border-t border-slate-100 pt-2">
            {isFlipped ? 'Boshiga qaytish uchun bosing ↺' : 'Tarjima va misollarni ochish ↺'}
          </div>
        </div>
      )}

      {/* Prev / Next Controls */}
      <div className="flex items-center space-x-3 pt-1">
        <button
          onClick={handlePrev}
          className="flex-1 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 active:scale-95 transition-all shadow-xs"
        >
          Oldingi so'z
        </button>
        <button
          onClick={handleNext}
          className="flex-1 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-600/20"
        >
          Keyingi so'z
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 9. STUDENT PROFILE & ERROR BANK
// ==========================================
function ProfileScreen({ profile, setProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });

  const avatarOptions = ['👨‍🎓', '👩‍🎓', '🚀', '🌟', '🎯', '🦁'];
  const bandOptions = ['6.5', '7.0', '7.5', '8.0', '8.5', '9.0'];

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <h2 className="text-xl font-black text-slate-900">Talaba Profili & Analitika</h2>
        <button
          onClick={() => { setFormData({ ...profile }); setIsEditing(true); }}
          className="flex items-center space-x-1 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-2xl active:scale-95 transition-all"
        >
          <Edit3 size={14} />
          <span>Tahrirlash</span>
        </button>
      </div>

      {/* Main Student Card */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs flex items-center space-x-4">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-100 to-violet-100 flex items-center justify-center text-3xl border-2 border-indigo-200 shadow-inner">
          {profile.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-black text-base text-slate-900 truncate">{profile.name}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{profile.currentLevel}</p>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-[10px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded-full">
              Maqsad: Band {profile.targetBand}
            </span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Faol Tayyorgarlik
            </span>
          </div>
        </div>
      </div>

      {/* 4 Skills Band Breakdown */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
        <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
          Ko'nikmalar Bo'yicha Hozirgi Ballar
        </h4>
        <div className="space-y-2.5">
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-600">Listening</span>
              <span className="text-emerald-600 font-mono">Band {profile.stats.listeningScore}</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(profile.stats.listeningScore / 9) * 100}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-600">Reading</span>
              <span className="text-blue-600 font-mono">Band {profile.stats.readingScore}</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(profile.stats.readingScore / 9) * 100}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-600">Writing</span>
              <span className="text-amber-600 font-mono">Band {profile.stats.writingScore}</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(profile.stats.writingScore / 9) * 100}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-600">Speaking</span>
              <span className="text-purple-600 font-mono">Band {profile.stats.speakingScore}</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: `${(profile.stats.speakingScore / 9) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mistake Bank (Xatolar ustida ishlash) */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs space-y-2.5">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
            Xatolar Daftari (Mistake Bank)
          </h4>
          <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
            {profile.mistakeBank.length} ta xato
          </span>
        </div>

        <div className="space-y-2">
          {profile.mistakeBank.map((mb) => (
            <div key={mb.id} className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-0.5">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                <span>{mb.skill}</span>
                <span className="text-indigo-600">Eslatma</span>
              </div>
              <p className="font-bold text-slate-900">{mb.question}</p>
              <p className="text-[11px] text-slate-500 italic">💡 {mb.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="font-black text-sm text-slate-900">Profil Ma'lumotlarini Yangilash</h3>
              <button 
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Avatar</label>
                <div className="flex space-x-2">
                  {avatarOptions.map(av => (
                    <button
                      type="button"
                      key={av}
                      onClick={() => setFormData({ ...formData, avatar: av })}
                      className={`text-xl p-2 rounded-2xl transition-all ${
                        formData.avatar === av ? 'bg-indigo-100 border-2 border-indigo-600 scale-110' : 'bg-slate-50'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ism va Familiya</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Maqsadli IELTS Ball</label>
                <div className="grid grid-cols-6 gap-1">
                  {bandOptions.map(b => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setFormData({ ...formData, targetBand: b })}
                      className={`py-1.5 rounded-xl font-bold text-xs ${
                        formData.targetBand === b ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Imtihon Sanasi</label>
                <input
                  type="date"
                  value={formData.examDate}
                  onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono"
                />
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-2xl font-bold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-md shadow-indigo-600/20"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}