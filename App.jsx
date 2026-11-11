import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, BookOpen, Headphones, PenTool, Mic, Bot, User, 
  Play, Pause, RotateCcw, CheckCircle2, XCircle, Award, 
  Sparkles, Send, Volume2, ChevronRight, Edit3, ArrowLeft, 
  Layers, Sun, Moon, Target, TrendingUp, Clock, AlertTriangle,
  CheckSquare, Square, FileText, BarChart3, BookmarkCheck,
  Calendar, Cake, ArrowRight, Zap, RefreshCw, Camera, Upload, Check,
  Menu, Bell, ArrowUpRight, GraduationCap, Lock, Star, X
} from 'lucide-react';

export default function App() {
  // --- 1. TIL VA MAVZU SOZLAMALARI ---
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('fariz_lang') || 'kr';
  });

  const switchLanguage = (lang) => {
    setSelectedLanguage(lang);
    localStorage.setItem('fariz_lang', lang);
    setActiveTab('home');
    setIsSidebarOpen(false);
  };

  // Kunduzgi / Kechki rejim (100% ishlaydigan State)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('fariz_theme');
    if (saved !== null) return saved === 'dark';
    return true; // Default qora rejim
  });

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('fariz_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // --- 2. FOYDALANUVCHI PROFILI ---
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('fariz_user');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        return {
          name: parsed.name || 'Tokhirbek',
          gender: parsed.gender || 'Erkak',
          birthDate: parsed.birthDate || '2004-05-18',
          photoBase64: (parsed.photoBase64 && parsed.photoBase64.startsWith('data:image')) ? parsed.photoBase64 : '',
          currentBand: parsed.currentBand || '6.5',
          targetBand: parsed.targetBand || '7.5',
          koreanCurrentLevel: parsed.koreanCurrentLevel || '2-급 (Boshlang‘ich)',
          koreanTargetLevel: parsed.koreanTargetLevel || '4-급 (TOPIK II)',
          streak: parsed.streak || 5,
          xp: parsed.xp || 840,
          completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [1]
        };
      } catch (e) {}
    }
    return {
      name: 'Tokhirbek',
      gender: 'Erkak',
      birthDate: '2004-05-18',
      photoBase64: '',
      currentBand: '6.5',
      targetBand: '7.5',
      koreanCurrentLevel: '2-급 (Boshlang‘ich)',
      koreanTargetLevel: '4-급 (TOPIK II)',
      streak: 5,
      xp: 840,
      completedLessons: [1]
    };
  });

  useEffect(() => {
    localStorage.setItem('fariz_user', JSON.stringify(userProfile));
  }, [userProfile]);

  // Navigatsiya holatlari
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [activeLesson, setActiveLesson] = useState(null);
  const [lessonStep, setLessonStep] = useState('theory'); // 'theory' | 'vocab' | 'quiz'
  const [quizAnswer, setQuizAnswer] = useState(null);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState(userProfile);
  const fileInputRef = useRef(null);

  // --- 3. TO‘LIQ DARSLAR BAZASI (BO'SH BOSQICHLAR YO'Q) ---
  const coursesData = {
    kr: {
      title: "Korean Academy",
      subtitle: "한국어 마스터 과정",
      desc: "Koreys tilini noldan TOPIK II gacha professional o‘rganish",
      levels: [
        { id: 'beginner', title: 'Beginner (초급 1)', desc: 'Hangul alifbosi va tanishuv' },
        { id: 'elementary', title: 'Elementary (초급 2)', desc: 'Hozirgi va o‘tgan zamon fe’llari' },
        { id: 'intermediate', title: 'Intermediate (중급)', desc: 'Bog‘lovchilar, sabab va niyat' },
        { id: 'advanced', title: 'Advanced (고급)', desc: 'Rasmiy muloqot va TOPIK II insholari' }
      ],
      lessons: [
        // Beginner darslari
        {
          id: 1,
          level: 'beginner',
          section: '1-bo‘lim: Hangul',
          title: '1-dars: Koreys alifbosi',
          desc: 'Unlilar va undoshlar',
          theory: 'Koreys alifbosi (Hangul) 14 ta asosiy undosh va 10 ta asosiy unlidan iborat. Harflar doim bo‘g‘in bloklari ko‘rinishida yoziladi.',
          words: [
            { word: '가', meaning: 'Ga (ㄱ + ㅏ)', sound: '가' },
            { word: '나', meaning: 'Na (ㄴ + ㅏ)', sound: '나' },
            { word: '다', meaning: 'Da (ㄷ + ㅏ)', sound: '다' },
            { word: '라', meaning: 'Ra / La (ㄹ + ㅏ)', sound: '라' }
          ],
          quiz: {
            question: "Koreys tilida 'N' tovushini qaysi harf ifodalaydi?",
            options: ["① ㄱ", "② ㄴ", "③ ㄷ", "④ ㄹ"],
            correct: 1,
            explanation: "ㄴ (Niun) harfi 'N' tovushini ifodalaydi."
          }
        },
        {
          id: 2,
          level: 'beginner',
          section: '1-bo‘lim: Hangul',
          title: '2-dars: Bo‘g‘in tuzish',
          desc: 'Oddiy so‘zlarni o‘qish',
          theory: 'Har bir bo‘g‘in kamida bitta undosh va bitta unlidan iborat bo‘ladi. Masalan: 나무 (namu) — daraxt.',
          words: [
            { word: '나무', meaning: 'Daraxt (Namu)', sound: '나무' },
            { word: '다리', meaning: 'Ko‘prik / Oyoq (Dari)', sound: '다리' },
            { word: '라디오', meaning: 'Radio (Radio)', sound: '라디오' }
          ],
          quiz: {
            question: "'Daraxt' so‘zining koreyscha yozilishi qaysi?",
            options: ["① 나비", "② 나무", "③ 나라", "④ 다리"],
            correct: 1,
            explanation: "나무 (namu) — daraxt degani."
          }
        },
        // Elementary darslari
        {
          id: 3,
          level: 'elementary',
          section: '2-bo‘lim: Hozirgi zamon',
          title: '1-dars: -아요/어요 qo‘shimchasi',
          desc: 'Fe’llarni tuslash qoidalari',
          theory: 'Fe’l o‘zagidagi oxirgi unli ㅏ yoki ㅗ bo‘lsa -아요, boshqa unlilar bo‘lsa -어요 qo‘shiladi. Masalan: 가다 -> 가요, 먹다 -> 먹어요.',
          words: [
            { word: '가요', meaning: 'Boryapman / Boraman', sound: '가요' },
            { word: '먹어요', meaning: 'Yeyapman / Yeyman', sound: '먹어요' },
            { word: '자요', meaning: 'Uxlayapman / Uxlayman', sound: '자요' }
          ],
          quiz: {
            question: "'Ovqat yemoq' fe'lining hozirgi zamon xushmuomala shakli qaysi?",
            options: ["① 가요", "② 먹어요", "③ 봐요", "④ 자요"],
            correct: 1,
            explanation: "먹다 fe'liga -어요 qo'shilib '먹어요' bo'ladi."
          }
        },
        {
          id: 4,
          level: 'elementary',
          section: '2-bo‘lim: Joy va Harakat',
          title: '2-dars: -에 / -에서 qo‘shimchalari',
          desc: 'Joy qo‘shimchalari farqi',
          theory: "Borish/kelish yo'nalishi uchun -에 (학교에 가요), biror harakat sodir bo'layotgan joy uchun -에서 (도서관에서 공부해요) ishlatiladi.",
          words: [
            { word: '학교에', meaning: 'Maktabga', sound: '학교에' },
            { word: '집에서', meaning: 'Uyda (harakat qilmoq)', sound: '집에서' },
            { word: '회사에', meaning: 'Ishxonaga / Kompaniyaga', sound: '회사에' }
          ],
          quiz: {
            question: "'Uyda ovqat yeyman' gapi qanday bo'ladi?",
            options: ["① 집에 밥을 먹어요", "② 집에서 밥을 먹어요", "③ 집으로 밥을 먹어요", "④ 집은 밥을 먹어요"],
            correct: 1,
            explanation: "Ovqat yeyish harakati sodir bo'layotgan joy uchun '-에서' qo'shiladi."
          }
        },
        // Intermediate darslari
        {
          id: 5,
          level: 'intermediate',
          section: '3-bo‘lim: Murakkab bog‘lovchilar',
          title: '1-dars: -(으)니까 (Sabab-oqibat)',
          desc: 'Chunki, shu sababli',
          theory: "-(으)니까 sabab bildiradi va undan keyin buyruq yoki taklif gaplar (-(으)세요, -(으)ㅂ시다) ishlatilishi mumkin.",
          words: [
            { word: '더우니까', meaning: 'Issiq bo‘lgani uchun', sound: '더우니까' },
            { word: '바쁘니까', meaning: 'Band bo‘lgani sababli', sound: '바쁘니까' },
            { word: '비가 오니까', meaning: 'Yomg‘ir yog‘ayotgani uchun', sound: '비가 오니까' }
          ],
          quiz: {
            question: "Qaysi gapda sabab to'g'ri ifodalangan?",
            options: ["① 비가 오니까 우산을 쓰세요", "② 비가 와서 우산을 쓰세요", "③ 비가 오지만 가세요", "④ 비가 오고 우산"],
            correct: 0,
            explanation: "Buyruq gaplarda (우산을 쓰세요) faqat -(으)니까 ishlatiladi, -아서/어서 mumkin emas."
          }
        },
        // Advanced darslari
        {
          id: 6,
          level: 'advanced',
          section: '4-bo‘lim: Rasmiy Nutq & TOPIK II',
          title: '1-dars: -기 마련이다 (Muqarrarlik)',
          desc: 'Albatta shunday bo‘ladi',
          theory: "Qonuniyat yoki muqarrar voqealarni ifodalashda 'fe'l + -기 마련이다' formulasi qo'llaniladi.",
          words: [
            { word: '성공하기 마련이다', meaning: 'Albatta muvaffaqiyat qozonadi', sound: '성공하기 마련이다' },
            { word: '변하기 마련이다', meaning: 'O‘zgarishi tabiiy', sound: '변하기 마련이다' }
          ],
          quiz: {
            question: "'Mehnat qilsa, albatta natija bo‘ladi' ma'nosi qaysi biri?",
            options: ["① 노력하면 성공하기 마련이다", "② 노력하면 성공할 뻔했다", "③ 노력하면 성공하는 셈이다", "④ 노력하면 성공할 뿐이다"],
            correct: 0,
            explanation: "-기 마련이다 tabiat qonuniyati yoki muqarrar natijani bildiradi."
          }
        }
      ]
    },
    en: {
      title: "English Academy",
      subtitle: "General & Academic English",
      desc: "Ingliz tilini noldan IELTS 7.5 gacha mukammal o‘rganish",
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
          theory: 'When meeting someone for the first time, polite introductions form the basis of communication.',
          words: [
            { word: 'Greeting', meaning: 'Salomlashish', sound: 'Greeting' },
            { word: 'Pleasure', meaning: 'Mamnuniyat', sound: 'Pleasure' },
            { word: 'Colleague', meaning: 'Hamkasb', sound: 'Colleague' }
          ],
          quiz: {
            question: "Choose the correct phrase to introduce yourself:",
            options: ["① I am pleased meeting you", "② Nice to meet you", "③ Good look", "④ Goodbye"],
            correct: 1,
            explanation: "'Nice to meet you' is the standard polite greeting."
          }
        },
        {
          id: 102,
          level: 'elementary',
          section: 'Unit 2: Present Tense',
          title: 'Lesson 2: Daily Routines',
          desc: 'Present Simple vs Continuous',
          theory: 'Use Present Simple for habits and routines (I work every day). Use Present Continuous for actions happening now.',
          words: [
            { word: 'Usually', meaning: 'Odatda', sound: 'Usually' },
            { word: 'Currently', meaning: 'Hozirgi paytda', sound: 'Currently' }
          ],
          quiz: {
            question: "I ________ my homework right now.",
            options: ["① do", "② am doing", "③ did", "④ done"],
            correct: 1,
            explanation: "'Right now' indicates an action happening at the moment of speaking."
          }
        },
        {
          id: 103,
          level: 'intermediate',
          section: 'Unit 3: Conditionals',
          title: 'Lesson 3: Second Conditional',
          desc: 'Hypothetical situations',
          theory: 'If + Past Simple, would + base verb. Used for imaginary or unreal situations in the present or future.',
          words: [
            { word: 'Hypothetical', meaning: 'Faraziy', sound: 'Hypothetical' },
            { word: 'Opportunity', meaning: 'Imkoniyat', sound: 'Opportunity' }
          ],
          quiz: {
            question: "If I ________ more time, I would learn Korean.",
            options: ["① have", "② had", "③ will have", "④ having"],
            correct: 1,
            explanation: "Second conditional uses Past Simple in the if-clause."
          }
        },
        {
          id: 104,
          level: 'advanced',
          section: 'Unit 4: Academic Writing',
          title: 'Lesson 4: High-Band Cohesive Devices',
          desc: 'Furthermore, In contrast, Consequently',
          theory: 'To achieve Band 7.5+ in IELTS Writing, link paragraphs with advanced discourse markers.',
          words: [
            { word: 'Consequently', meaning: 'Natijada', sound: 'Consequently' },
            { word: 'Nevertheless', meaning: 'Shunga qaramasdan', sound: 'Nevertheless' }
          ],
          quiz: {
            question: "Select the formal synonym for 'As a result':",
            options: ["① So", "② Consequently", "③ But", "④ Because"],
            correct: 1,
            explanation: "'Consequently' is a formal transition word for cause and effect."
          }
        }
      ]
    }
  };

  // --- 4. 10 TA TOPIK & EPS IMTIHON SAVOLLARI ---
  const koreanTopikQuestions = [
    {
      id: "kr1",
      question: "1. 저는 아침에 일찍 ________.",
      options: ["① 일어납니다", "② 잤습니다", "③ 만났습니다", "④ 샀습니다"],
      correct: "① 일어납니다",
      audio: "저는 아침에 일찍 일어납니다",
      explanation: "Tarjimasi: 'Men ertalab barvaqt uyg'onaman'. Odatiy harakat uchun 일어나다 fe'li qo'llaniladi."
    },
    {
      id: "kr2",
      question: "2. [EPS-TOPIK] 공장에서 일할 때 반드시 ________을/를 착용해야 합니다.",
      options: ["① 안전모 (Kaska)", "② 양말 (Paypoq)", "③ 안경 (Ko'zoynak)", "④ 모자 (Oddiy qalpoq)"],
      correct: "① 안전모 (Kaska)",
      audio: "공장에서 일할 때 반드시 안전모를 착용해야 합니다",
      explanation: "Zavod va qurilishda xavfsizlik kaskasi (안전모) kiyish shart."
    },
    {
      id: "kr3",
      question: "3. 식당에서 음식을 먹은 후에 돈을 ________.",
      options: ["① 냅니다 (To'layman)", "② 먹습니다", "③ 입습니다", "④ 봅니다"],
      correct: "① 냅니다 (To'layman)",
      audio: "식당에서 음식을 먹은 후에 돈을 냅니다",
      explanation: "Pul to'lamoq koreys tilida '돈을 내다' deyiladi."
    },
    {
      id: "kr4",
      question: "4. 어제 비가 와서 날씨가 아주 ________.",
      options: ["① 추웠습니다 (Sovuq edi)", "② 맛있었습니다", "③ 넓었습니다", "④ 조용합니다"],
      correct: "① 추웠습니다 (Sovuq edi)",
      audio: "어제 비가 와서 날씨가 아주 추웠습니다",
      explanation: "Kecha sovuq bo'lgani uchun o'tgan zamon: 추웠습니다."
    },
    {
      id: "kr5",
      question: "5. [EPS-TOPIK] 물건을 포장할 때 쓰는 상자를 ________(으)로 닫으세요.",
      options: ["① 테이프 (Skotch)", "② 빗자루 (Supurgi)", "③ 장갑 (Qo'lqop)", "④ 마스크"],
      correct: "① 테이프 (Skotch)",
      audio: "물건을 포장할 때 쓰는 상자를 테이프로 닫으세요",
      explanation: "Qadoqlashda quti skotch (테이프) bilan yopiladi."
    },
    {
      id: "kr6",
      question: "6. 목이 아프고 열이 나요. 그래서 ________에 가서 약을 샀어요.",
      options: ["① 약국 (Dorixona)", "② 은행 (Bank)", "③ 우체국 (Pochta)", "④ 공항 (Aeroport)"],
      correct: "① 약국 (Dorixona)",
      audio: "목이 아프고 열이 나요 그래서 약국에 가서 약을 샀어요",
      explanation: "Dori sotib olish uchun dorixonaga (약국) boriladi."
    },
    {
      id: "kr7",
      question: "7. 버스 정류장에서 버스를 ________.",
      options: ["① 기다립니다 (Kutaman)", "② 가르칩니다", "③ 만듭니다", "④ 전화합니다"],
      correct: "① 기다립니다 (Kutaman)",
      audio: "버스 정류장에서 버스를 기다립니다",
      explanation: "Bekatda avtobus kutiladi (기다리다)."
    },
    {
      id: "kr8",
      question: "8. [EPS-TOPIK] 작업을 끝마친 후에는 기계의 전원을 ________.",
      options: ["① 끕니다 (O'chiraman)", "② 켭니다", "③ 마십니다", "④ 잡니다"],
      correct: "① 끕니다 (O'chiraman)",
      audio: "작업을 끝마친 후에는 기계의 전원을 끕니다",
      explanation: "Ish tugagach elektr quvvati o'chiriladi (끄다)."
    },
    {
      id: "kr9",
      question: "9. 한국어 실력을 늘리기 위해서 매일 드라마를 ________.",
      options: ["① 봅니다 (Ko'raman)", "② 씁니다", "③ 씻습니다", "④ 걷습니다"],
      correct: "① 봅니다 (Ko'raman)",
      audio: "한국어 실력을 늘리기 위해서 매일 드라마를 봅니다",
      explanation: "Serial yoki kino ko'rmoq: 보다 -> 봅니다."
    },
    {
      id: "kr10",
      question: "10. 외국인등록증을 신청하려면 ________에 가야 합니다.",
      options: ["① 출입국관리사무소 (Immigratsiya)", "② 영화관", "③ 세탁소", "④ 소방서"],
      correct: "① 출입국관리사무소 (Immigratsiya)",
      audio: "외국인등록증을 신청하려면 출입국관리사무소에 가야 합니다",
      explanation: "ID kartani rasmiylashtirish uchun Immigratsiya idorasiga boriladi."
    }
  ];

  const [koreanAnswers, setKoreanAnswers] = useState({});
  const [koreanChecked, setKoreanChecked] = useState(false);

  // Ovoz berish
  const speakText = (text, lang = selectedLanguage === 'kr' ? 'ko-KR' : 'en-US') => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();
    const clean = text.replace(/[\(\)①②③④]/g, '');
    const ut = new SpeechSynthesisUtterance(clean);
    ut.lang = lang;
    ut.rate = 0.9;
    window.speechSynthesis.speak(ut);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("Rasm hajmi 3MB dan oshmasligi kerak.");
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

  const currentCourse = coursesData[selectedLanguage] || coursesData.kr;
  const activeLessonsList = currentCourse.lessons.filter(l => l.level === selectedLevel);

  // --- MAVZU RANG USLUBLARI (KUNDUZGI / KECHKI) ---
  const theme = {
    bg: isDarkMode ? 'bg-[#0b0c16] text-slate-100' : 'bg-slate-100 text-slate-900',
    card: isDarkMode ? 'bg-[#151728] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-md',
    subCard: isDarkMode ? 'bg-[#1b1e34] border-slate-700/60' : 'bg-slate-50 border-slate-200',
    header: isDarkMode ? 'bg-[#0e101f]/95 border-b border-slate-800/80 backdrop-blur-xl' : 'bg-white/95 border-b border-slate-200 backdrop-blur-xl shadow-sm',
    textMain: isDarkMode ? 'text-white' : 'text-slate-900',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-slate-500',
    navBg: isDarkMode ? 'bg-[#121424]/95 border-t border-slate-800' : 'bg-white/95 border-t border-slate-200 shadow-xl',
    inputBg: isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
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
                FARIZ ACADEMY • {currentCourse.title.toUpperCase()}
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
                <span>Darsni boshlash</span>
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
        <div className={`flex items-center justify-between p-1.5 rounded-2xl ${isDarkMode ? 'bg-slate-900/90 border border-slate-800' : 'bg-slate-200 border border-slate-300'}`}>
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

        {/* BOSQICHLAR TIZIMI */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className={`font-black text-sm uppercase tracking-wider ${theme.textMain}`}>
              {currentCourse.title} Bosqichlari
            </h3>
            <button 
              onClick={() => setActiveTab('academy')}
              className="text-xs font-bold text-indigo-500 hover:underline"
            >
              Barcha darslar
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
                  <span className="text-xl">
                    {lvl.id === 'beginner' ? '🌱' : lvl.id === 'elementary' ? '🌿' : lvl.id === 'intermediate' ? '🌳' : '🎓'}
                  </span>
                  <span className="text-[10px] bg-indigo-500/15 text-indigo-500 font-black px-2 py-0.5 rounded-full">
                    Faol
                  </span>
                </div>
                <div>
                  <h4 className={`font-black text-sm ${theme.textMain}`}>{lvl.title}</h4>
                  <p className={`text-[11px] ${theme.textMuted} mt-0.5 leading-snug`}>{lvl.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IMTIHON TAYYORGARLIK */}
        <div 
          onClick={() => setActiveTab('tests')}
          className={`${theme.card} border rounded-3xl p-5 flex items-center justify-between cursor-pointer hover:border-indigo-500 transition shadow-sm`}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-500 flex items-center justify-center">
              <Award size={26} />
            </div>
            <div>
              <div className="text-[10px] text-indigo-500 font-black uppercase tracking-wider">
                {isKr ? 'TOPIK & EPS Imtihoni' : 'Cambridge IELTS Mock'}
              </div>
              <h4 className={`font-black text-base mt-0.5 ${theme.textMain}`}>
                {isKr ? 'Haqiqiy 10 Ta TOPIK Testlari' : 'Full Reading & Audio Test'}
              </h4>
            </div>
          </div>
          <ChevronRight size={22} className={theme.textMuted} />
        </div>

      </div>
    );
  };

  // ==========================================
  // 2. AKADEMIYA DARSLAR RO'YXATI
  // ==========================================
  const renderAcademy = () => {
    return (
      <div className="space-y-5 animate-fadeIn pb-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-700/40">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-1.5 text-xs text-indigo-500 font-extrabold ${theme.subCard} border px-3 py-1.5 rounded-xl active:scale-95`}
          >
            <ArrowLeft size={16} /> Bosh sahifa
          </button>
          <span className="text-xs bg-indigo-500/15 text-indigo-500 px-3 py-1 rounded-full font-black">
            {currentCourse.title}
          </span>
        </div>

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

        <div className="space-y-3">
          <div className="px-1">
            <h3 className={`font-black text-base ${theme.textMain}`}>{currentCourse.subtitle}</h3>
            <p className={`text-xs ${theme.textMuted} mt-0.5`}>Qadamma-qadam amaliy darslar</p>
          </div>

          {activeLessonsList.length > 0 ? (
            activeLessonsList.map(lesson => {
              const completedList = userProfile.completedLessons || [];
              const isCompleted = completedList.includes(lesson.id);

              return (
                <div 
                  key={lesson.id}
                  onClick={() => {
                    setActiveLesson(lesson);
                    setLessonStep('theory');
                    setQuizAnswer(null);
                    setActiveTab('lesson_detail');
                  }}
                  className={`${theme.card} border rounded-3xl p-4.5 flex items-center justify-between cursor-pointer active:scale-98 transition hover:border-indigo-500/50 shadow-md`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${
                      isCompleted ? 'bg-emerald-500/20 text-emerald-500' : 'bg-indigo-500/20 text-indigo-500'
                    }`}>
                      {isCompleted ? <CheckCircle2 size={24} /> : <BookOpen size={24} />}
                    </div>
                    <div>
                      <span className="text-[10px] text-indigo-500 font-bold uppercase">{lesson.section}</span>
                      <h4 className={`font-black text-sm mt-0.5 ${theme.textMain}`}>{lesson.title}</h4>
                      <p className={`text-xs ${theme.textMuted} mt-0.5`}>{lesson.desc}</p>
                    </div>
                  </div>
                  
                  <span className="text-[10px] bg-emerald-500/15 text-emerald-500 font-black px-2.5 py-1 rounded-full">
                    Bepul
                  </span>
                </div>
              );
            })
          ) : (
            <div className={`${theme.card} border rounded-3xl p-8 text-center space-y-2`}>
              <Award size={32} className="mx-auto text-indigo-500" />
              <h4 className={`font-bold text-sm ${theme.textMain}`}>Darslar yangilanmoqda</h4>
              <p className={`text-xs ${theme.textMuted}`}>Boshqa bosqich darslarini o‘rganishni davom ettiring.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ==========================================
  // 3. INTERAKTIV DARS JARAYONI
  // ==========================================
  const renderLessonDetail = () => {
    if (!activeLesson) return null;

    return (
      <div className="space-y-5 animate-fadeIn pb-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-700/40">
          <button 
            onClick={() => setActiveTab('academy')}
            className={`flex items-center gap-1.5 text-xs text-indigo-500 font-extrabold ${theme.subCard} border px-3 py-1.5 rounded-xl active:scale-95`}
          >
            <ArrowLeft size={16} /> Darslar
          </button>
          <span className={`text-xs font-black ${theme.textMain}`}>
            {activeLesson.title}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs font-bold">
          <button 
            onClick={() => setLessonStep('theory')}
            className={`py-2.5 rounded-2xl transition ${lessonStep === 'theory' ? 'bg-indigo-600 text-white' : `${theme.subCard} text-slate-400`}`}
          >
            Qoida
          </button>
          <button 
            onClick={() => setLessonStep('vocab')}
            className={`py-2.5 rounded-2xl transition ${lessonStep === 'vocab' ? 'bg-indigo-600 text-white' : `${theme.subCard} text-slate-400`}`}
          >
            So‘zlar
          </button>
          <button 
            onClick={() => setLessonStep('quiz')}
            className={`py-2.5 rounded-2xl transition ${lessonStep === 'quiz' ? 'bg-indigo-600 text-white' : `${theme.subCard} text-slate-400`}`}
          >
            Test
          </button>
        </div>

        {lessonStep === 'theory' && (
          <div className={`${theme.card} border rounded-3xl p-6 space-y-4`}>
            <div className="flex items-center gap-2 text-indigo-500 font-black text-xs uppercase tracking-wider">
              <Sparkles size={16} /> Dars Nazariyasi
            </div>
            <h3 className={`font-black text-lg ${theme.textMain}`}>{activeLesson.title}</h3>
            <p className={`text-sm leading-relaxed font-normal ${theme.subCard} p-4 rounded-2xl border`}>
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

        {lessonStep === 'vocab' && (
          <div className="space-y-3">
            <div className="px-1">
              <h4 className={`font-black text-sm ${theme.textMain}`}>Yangi so‘zlar va Audio Talaffuz:</h4>
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
                    <button className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-500">
                      <Volume2 size={20} />
                    </button>
                    <div>
                      <div className={`text-lg font-black ${theme.textMain}`}>{w.word}</div>
                      <div className={`text-xs ${theme.textMuted}`}>{w.meaning}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-indigo-500">Eshitish 🔊</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setLessonStep('quiz')}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-xs transition shadow-lg flex items-center justify-center gap-2 mt-2"
            >
              Keyingi: Testga o‘tish <ArrowRight size={16} />
            </button>
          </div>
        )}

        {lessonStep === 'quiz' && (
          <div className={`${theme.card} border rounded-3xl p-6 space-y-4`}>
            <div className="flex items-center gap-2 text-indigo-500 font-black text-xs uppercase tracking-wider">
              <CheckCircle2 size={16} /> Yakuniy Test
            </div>
            <h4 className={`font-black text-base ${theme.textMain}`}>{activeLesson.quiz.question}</h4>

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
                quizAnswer === activeLesson.quiz.correct ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'
              }`}>
                <div className="font-bold">
                  {quizAnswer === activeLesson.quiz.correct ? "To‘g‘ri javob! 🎉" : "Noto‘g‘ri javob"}
                </div>
                <div className={`mt-1 ${theme.textMuted}`}>{activeLesson.quiz.explanation}</div>
              </div>
            )}

            <button 
              onClick={() => {
                if (quizAnswer === activeLesson.quiz.correct) {
                  setUserProfile(prev => {
                    const currentCompleted = prev.completedLessons || [];
                    return {
                      ...prev,
                      xp: prev.xp + 50,
                      completedLessons: [...new Set([...currentCompleted, activeLesson.id])]
                    };
                  });
                  alert("Tabriklaymiz! Dars yakunlandi (+50 XP qo‘shildi).");
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
  // 4. TESTLAR MARKAZI (TOPIK & IELTS)
  // ==========================================
  const renderTests = () => {
    return (
      <div className="space-y-4 animate-fadeIn pb-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-700/40">
          <button 
            onClick={() => setActiveTab('home')} 
            className={`flex items-center gap-1.5 text-xs text-indigo-500 font-extrabold ${theme.subCard} border px-3 py-1.5 rounded-xl active:scale-95`}
          >
            <ArrowLeft size={16} /> Bosh sahifa
          </button>
          <span className="text-xs bg-indigo-500/15 text-indigo-500 px-3 py-1 rounded-full font-black">
            TOPIK & EPS Imtihon Testlari
          </span>
        </div>

        <div className="space-y-3">
          {koreanTopikQuestions.map((q) => (
            <div key={q.id} className={`${theme.card} border rounded-3xl p-5 text-xs space-y-3`}>
              <div className="flex items-start justify-between gap-2">
                <p className={`font-bold text-sm leading-relaxed ${theme.textMain}`}>{q.question}</p>
                <button 
                  onClick={() => speakText(q.audio, 'ko-KR')}
                  className="p-2 bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-500 rounded-xl shrink-0"
                  title="Savolni tinglash"
                >
                  <Volume2 size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-1">
                {q.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setKoreanAnswers({ ...koreanAnswers, [q.id]: opt })}
                    className={`py-3 px-3.5 rounded-2xl text-left border text-xs font-semibold transition ${
                      koreanAnswers[q.id] === opt 
                        ? 'bg-indigo-600 text-white font-black border-indigo-600' 
                        : `${theme.subCard}`
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {koreanChecked && (
                <div className={`mt-2 p-3.5 rounded-2xl ${theme.subCard} text-[11px] space-y-1`}>
                  <span className={koreanAnswers[q.id] === q.correct ? "text-emerald-500 font-black" : "text-rose-500 font-black"}>
                    {koreanAnswers[q.id] === q.correct ? "✓ To‘g‘ri javob" : `✗ Xato (To‘g‘risi: ${q.correct})`}
                  </span>
                  <p className={`${theme.textMuted}`}>{q.explanation}</p>
                </div>
              )}
            </div>
          ))}

          <button 
            onClick={() => setKoreanChecked(true)}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-sm transition active:scale-95 shadow-xl"
          >
            Javoblarni Tekshirish va Tahlil Qilish
          </button>
        </div>
      </div>
    );
  };

  // ==========================================
  // 5. FARIZAI SHAXSIY MURABBIY
  // ==========================================
  const renderAi = () => (
    <div className="space-y-4 animate-fadeIn pb-8">
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/40">
        <button 
          onClick={() => setActiveTab('home')} 
          className={`flex items-center gap-1.5 text-xs text-indigo-500 font-extrabold ${theme.subCard} border px-3 py-1.5 rounded-xl active:scale-95`}
        >
          <ArrowLeft size={16} /> Bosh sahifa
        </button>
        <span className="text-xs bg-indigo-500/15 text-indigo-500 px-3 py-1 rounded-full font-black">FarizAI Voice Coach</span>
      </div>

      <div className={`${theme.card} border rounded-3xl p-6 text-center space-y-3.5 shadow-lg`}>
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white mx-auto flex items-center justify-center shadow-xl">
          <Bot size={40} />
        </div>
        <div>
          <h3 className={`font-black text-lg ${theme.textMain}`}>FarizAI Murabbiy</h3>
          <p className={`text-xs ${theme.textMuted} mt-0.5`}>
            {selectedLanguage === 'kr' ? "Koreys tilida ovozli muloqot va talaffuz mashqlari" : "Ingliz tili Speaking va Writing AI murabbiyi"}
          </p>
        </div>

        <button 
          onClick={() => speakText(selectedLanguage === 'kr' ? "안녕하세요! 파리즈 아카데미에 오신 것을 환영합니다. 한국어 공부를 시작해 볼까요?" : "Hello! Welcome to Fariz Academy. Let us practice speaking today.")}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-xs transition flex items-center justify-center gap-2 shadow-lg"
        >
          <Volume2 size={16} /> AI Murabbiy bilan ovozli mashq qilish
        </button>
      </div>
    </div>
  );

  // ==========================================
  // 6. PROFIL VA NATIJALAR
  // ==========================================
  const renderProfileOnly = () => (
    <div className="space-y-5 animate-fadeIn pb-8">
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/40">
        <h3 className={`font-black text-base ${theme.textMain}`}>Mening Profilim</h3>
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
          <h3 className={`text-xl font-black tracking-tight ${theme.textMain}`}>{userProfile.name}</h3>
          <p className="text-xs text-indigo-500 font-bold mt-0.5">• {userProfile.currentLevel || 'B2 Upper-Intermediate'}</p>
        </div>
      </div>

      <div className={`${theme.card} border rounded-[28px] p-5 space-y-3.5 text-xs`}>
        <h4 className={`font-black text-sm ${theme.textMain}`}>Ta’lim Natijalari & Progress</h4>
        
        <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
          <span className={theme.textMuted}>Tugallangan Darslar:</span>
          <span className="font-black text-emerald-500 text-sm">{(userProfile.completedLessons || []).length} ta dars</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
          <span className={theme.textMuted}>To‘plangan Tajriba (XP):</span>
          <span className="font-black text-amber-500 text-sm">{userProfile.xp} XP</span>
        </div>

        <div className="flex justify-between items-center py-2">
          <span className={theme.textMuted}>Kunlik Ketma-ketlik:</span>
          <span className="font-black text-rose-500 text-sm flex items-center gap-1">
            🔥 {userProfile.streak} kun
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen w-full ${theme.bg} overflow-x-hidden flex flex-col font-sans select-none antialiased transition-colors duration-300 touch-pan-y`}>
      
      {/* 1. ASOSIY HEADER */}
      {activeTab === 'home' && (
        <header className={`sticky top-0 z-40 ${theme.header} px-4 py-3 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className={`p-2.5 rounded-2xl ${theme.subCard} border transition active:scale-95`}
            >
              <Menu size={20} strokeWidth={2.5} />
            </button>
            <div>
              <h1 className={`text-base font-extrabold tracking-tight leading-tight ${theme.textMain}`}>
                Fariz Academy
              </h1>
              <p className={`text-[11px] font-medium ${theme.textMuted}`}>
                Har kuni yangi bilim, yangi imkoniyat.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* 100% ISHLOVCHI KUN / TUN (OY VA QUYOSH) TUGMASI */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition active:scale-95 ${theme.subCard} border`}
              title="Mavzuni almashtirish"
            >
              {isDarkMode ? <Sun size={19} className="text-amber-400" /> : <Moon size={19} className="text-indigo-600" />}
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

      {/* 2. YON PANEL (DRAWER MENYU) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            onClick={() => setIsSidebarOpen(false)} 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          ></div>
          <div className={`relative w-72 max-w-[80%] ${isDarkMode ? 'bg-[#121424] border-slate-800' : 'bg-white border-slate-200'} border-r p-5 flex flex-col justify-between shadow-2xl z-10 animate-fadeIn`}>
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/40">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white text-sm">
                    F
                  </div>
                  <span className={`font-black text-base ${theme.textMain}`}>Fariz Academy</span>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className={`p-1.5 rounded-lg ${theme.subCard}`}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Ta’lim Tili</span>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => switchLanguage('en')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      selectedLanguage === 'en' ? 'bg-indigo-600 text-white' : `${theme.subCard}`
                    }`}
                  >
                    🇬🇧 English
                  </button>
                  <button 
                    onClick={() => switchLanguage('kr')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      selectedLanguage === 'kr' ? 'bg-rose-600 text-white' : `${theme.subCard}`
                    }`}
                  >
                    🇰🇷 Korean
                  </button>
                </div>
              </div>

              <div className="space-y-1 text-xs font-semibold">
                <button 
                  onClick={() => { setActiveTab('academy'); setIsSidebarOpen(false); }}
                  className={`w-full p-3 rounded-2xl flex items-center gap-3 ${theme.subCard} mb-1.5`}
                >
                  <GraduationCap size={18} className="text-indigo-500" /> Akademiya Darslari
                </button>
                <button 
                  onClick={() => { setActiveTab('tests'); setIsSidebarOpen(false); }}
                  className={`w-full p-3 rounded-2xl flex items-center gap-3 ${theme.subCard} mb-1.5`}
                >
                  <Award size={18} className="text-emerald-500" /> Imtihon Testlari
                </button>
                <button 
                  onClick={() => { setActiveTab('ai'); setIsSidebarOpen(false); }}
                  className={`w-full p-3 rounded-2xl flex items-center gap-3 ${theme.subCard} mb-1.5`}
                >
                  <Bot size={18} className="text-purple-500" /> FarizAI Murabbiy
                </button>
                <button 
                  onClick={() => { setActiveTab('profile'); setIsSidebarOpen(false); }}
                  className={`w-full p-3 rounded-2xl flex items-center gap-3 ${theme.subCard}`}
                >
                  <User size={18} className="text-amber-500" /> Shaxsiy Profil
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700/40 text-xs text-slate-400">
              Fariz Academy Platformasi v3.0
            </div>
          </div>
        </div>
      )}

      {/* 3. ASOSIY MAYDON */}
      <main className="flex-1 w-full max-w-md mx-auto p-4 pb-44 box-border">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'academy' && renderAcademy()}
        {activeTab === 'lesson_detail' && renderLessonDetail()}
        {activeTab === 'tests' && renderTests()}
        {activeTab === 'ai' && renderAi()}
        {activeTab === 'profile' && renderProfileOnly()}
      </main>

      {/* 4. 5 TALIK KATTA PASTKI MENYU */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 ${theme.navBg} backdrop-blur-2xl px-3 pt-2.5 pb-7 shadow-2xl`}>
        <div className="max-w-md mx-auto flex items-center justify-between relative px-1">
          
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex-1 flex flex-col items-center py-1 transition active:scale-90 ${
              activeTab === 'home' ? 'text-indigo-500 font-black' : `${theme.textMuted}`
            }`}
          >
            <Compass size={26} strokeWidth={activeTab === 'home' ? 2.8 : 2} />
            <span className="text-xs mt-1 font-bold">Asosiy</span>
            {activeTab === 'home' && <span className="w-6 h-1 bg-emerald-500 rounded-full mt-0.5"></span>}
          </button>

          <button 
            onClick={() => setActiveTab('academy')}
            className={`flex-1 flex flex-col items-center py-1 transition active:scale-90 ${
              activeTab === 'academy' || activeTab === 'lesson_detail' ? 'text-indigo-500 font-black' : `${theme.textMuted}`
            }`}
          >
            <GraduationCap size={26} strokeWidth={2.8} />
            <span className="text-xs mt-1 font-bold">Akademiya</span>
            {(activeTab === 'academy' || activeTab === 'lesson_detail') && <span className="w-6 h-1 bg-emerald-500 rounded-full mt-0.5"></span>}
          </button>

          {/* O'rtadagi Katta FarizAI Tugmasi */}
          <button 
            onClick={() => setActiveTab('ai')}
            className="flex flex-col items-center -mt-8 px-2 active:scale-90 transition group"
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl ring-4 ${isDarkMode ? 'ring-slate-900' : 'ring-white'} transition ${
              activeTab === 'ai' 
                ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 scale-105' 
                : 'bg-gradient-to-tr from-indigo-600 to-blue-600'
            }`}>
              <Bot size={32} />
            </div>
            <span className="text-xs text-indigo-500 font-black mt-1">FarizAI</span>
          </button>

          <button 
            onClick={() => setActiveTab('tests')}
            className={`flex-1 flex flex-col items-center py-1 transition active:scale-90 ${
              activeTab === 'tests' ? 'text-indigo-500 font-black' : `${theme.textMuted}`
            }`}
          >
            <Award size={26} strokeWidth={2.8} />
            <span className="text-xs mt-1 font-bold">Imtihon</span>
            {activeTab === 'tests' && <span className="w-6 h-1 bg-emerald-500 rounded-full mt-0.5"></span>}
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex-1 flex flex-col items-center py-1 transition active:scale-90 ${
              activeTab === 'profile' ? 'text-indigo-500 font-black' : `${theme.textMuted}`
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
            <h3 className={`font-black text-base ${theme.textMain}`}>Profilni Tahrirlash</h3>
            
            <div className="flex items-center gap-3.5">
              {editForm.photoBase64 ? (
                <img src={editForm.photoBase64} alt="Avatar" className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500 shadow-md" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-indigo-600/20 border-2 border-indigo-500/40 flex items-center justify-center font-bold text-indigo-500 text-lg">
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
