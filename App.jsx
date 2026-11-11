import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, BookOpen, Headphones, PenTool, Mic, Bot, User, 
  Play, Pause, RotateCcw, CheckCircle2, XCircle, Award, 
  Sparkles, Send, Volume2, ChevronRight, Edit3, ArrowLeft, 
  Layers, Sun, Moon, Target, TrendingUp, Clock, AlertTriangle,
  CheckSquare, Square, FileText, BarChart3, BookmarkCheck,
  Calendar, Cake, ArrowRight, Zap, RefreshCw, Camera, Upload, Check,
  Menu, Bell, ArrowUpRight, GraduationCap, Lock, Star, X, Crown, CreditCard, ShieldCheck, Copy
} from 'lucide-react';

export default function App() {
  // --- 1. TIL VA MAVZU SOZLAMALARI ---
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('fariza_lang') || 'kr';
  });

  const switchLanguage = (lang) => {
    setSelectedLanguage(lang);
    localStorage.setItem('fariza_lang', lang);
    setActiveTab('home');
    setIsSidebarOpen(false);
  };

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('fariza_theme');
    if (saved !== null) return saved === 'dark';
    return true;
  });

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('fariza_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // --- 2. FOYDALANUVCHI PROFILI ---
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('fariza_user');
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
          isPro: parsed.isPro || false,
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
      isPro: false,
      completedLessons: [1]
    };
  });

  useEffect(() => {
    localStorage.setItem('fariza_user', JSON.stringify(userProfile));
  }, [userProfile]);

  // Navigatsiya va Modal holatlari
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState('select'); // 'select' | 'checkout'
  const [selectedPlan, setSelectedPlan] = useState('monthly'); // 'monthly' | '2months' | 'yearly'
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [activeLesson, setActiveLesson] = useState(null);
  const [lessonStep, setLessonStep] = useState('theory');
  const [quizAnswer, setQuizAnswer] = useState(null);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState(userProfile);
  const fileInputRef = useRef(null);

  // --- 3. IOS SAFARI UCHUN 100% KAFOLATLANGAN AUDIO SINTEZ ---
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.getVoices();
    }
  }, []);

  const speakText = (text, lang = selectedLanguage === 'kr' ? 'ko-KR' : 'en-US') => {
    if (!('speechSynthesis' in window)) {
      alert("Qurilmangiz nutq sintezini qo‘llab-quvvatlamaydi.");
      return;
    }
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      const clean = text.replace(/[\(\)①②③④]/g, '').trim();
      const ut = new SpeechSynthesisUtterance(clean);
      ut.lang = lang;
      ut.rate = 0.85;
      ut.volume = 1.0;
      ut.pitch = 1.0;

      // Mavjud ovozlardan mosini tanlash
      const voices = window.speechSynthesis.getVoices();
      const targetVoice = voices.find(v => v.lang.startsWith(lang.slice(0, 2)));
      if (targetVoice) {
        ut.voice = targetVoice;
      }

      window.speechSynthesis.speak(ut);
    } catch (e) {
      console.error(e);
    }
  };

  // --- 4. DARSLAR BAZASI ---
  const coursesData = {
    kr: {
      title: "Korean Academy",
      subtitle: "한국어 마스터 과정",
      desc: "Koreys tilini noldan TOPIK II gacha mukammal o‘rganish",
      levels: [
        { id: 'beginner', title: 'Beginner (초급 1)', desc: 'Hangul alifbosi va tanishuv' },
        { id: 'elementary', title: 'Elementary (초급 2)', desc: 'Hozirgi va o‘tgan zamon fe’llari' },
        { id: 'intermediate', title: 'Intermediate (중급)', desc: 'EPS-TOPIK & Zavod muloqoti' },
        { id: 'advanced', title: 'Advanced (고급)', desc: 'TOPIK II Insholar & Rasmiy nutq' }
      ],
      lessons: [
        {
          id: 1,
          level: 'beginner',
          isPro: false,
          section: '1-bo‘lim: Hangul',
          title: '1-dars: Koreys alifbosi',
          desc: 'Unlilar va undoshlar',
          theory: 'Koreys alifbosi (Hangul) 14 ta asosiy undosh va 10 ta asosiy unlidan iborat. Harflar doim bo‘g‘in bloklari ko‘rinishida birlashadi.',
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
          isPro: false,
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
        {
          id: 3,
          level: 'elementary',
          isPro: false,
          section: '2-bo‘lim: Fe’llar',
          title: '1-dars: Hozirgi zamon (-아요/어요)',
          desc: 'Fe’llarni tuslash qoidalari',
          theory: 'Fe’l o‘zagidagi oxirgi unli ㅏ yoki ㅗ bo‘lsa -아요, boshqa unlilar bo‘lsa -어요 qo‘shiladi.',
          words: [
            { word: '가요', meaning: 'Boryapman / Boraman', sound: '가요' },
            { word: '먹어요', meaning: 'Yeyapman / Yeyman', sound: '먹어요' }
          ],
          quiz: {
            question: "'Ovqat yeyman' gapi qaysi biri?",
            options: ["① 밥을 가요", "② 밥을 먹어요", "③ 밥을 봐요", "④ 밥을 자요"],
            correct: 1,
            explanation: "먹다 fe'liga -어요 qo'shilib '먹어요' bo'ladi."
          }
        },
        {
          id: 4,
          level: 'intermediate',
          isPro: true,
          section: '3-bo‘lim: EPS-TOPIK Maxsus',
          title: '1-dars: Zavodda xavfsizlik qoidalari',
          desc: '안전 수칙 va asbob-uskunalar',
          theory: 'EPS-TOPIK imtihonida eng ko‘p tushadigan savollar: xavfsizlik kaskasi (안전모) va stanoklarni xavfsiz boshqarish qoidalari.',
          words: [
            { word: '안전모', meaning: 'Himoya kaskasi', sound: '안전모' },
            { word: '기계 조작', meaning: 'Stanokni boshqarish', sound: '기계 조작' }
          ],
          quiz: {
            question: "Ish paytida boshni himoya qilish uchun nima kiyiladi?",
            options: ["① 안전모", "② 마스크", "③ 장화", "④ 앞치마"],
            correct: 0,
            explanation: "안전모 — xavfsizlik kaskasi."
          }
        },
        {
          id: 5,
          level: 'advanced',
          isPro: true,
          section: '4-bo‘lim: TOPIK II',
          title: '1-dars: Insho (쓰기) yozish shablonlari',
          desc: '54-savol 700 so‘zlik insho sirlari',
          theory: 'Insho strukturasi: Kirish (서론), Asosiy qism (본론) va Xulosa (결론). Rasmiy ilmiy tilda yozilishi shart.',
          words: [
            { word: '현대 사회에서', meaning: 'Zamonaviy jamiyatda', sound: '현대 사회에서' },
            { word: '바람직하다', meaning: 'Maqsadga muvofiq', sound: '바람직하다' }
          ],
          quiz: {
            question: "Insho xulosasida qaysi grammatik shakl ko‘proq qo‘llaniladi?",
            options: ["① -아/어서요", "② -(으)ㄹ 필요가 있다", "③ -네요", "④ -지요"],
            correct: 1,
            explanation: "Rasmiy insho yakunida -(으)ㄹ 필요가 있다 shakli ishlatiladi."
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
          isPro: false,
          section: 'Unit 1: Foundations',
          title: 'Lesson 1: Greetings & Introductions',
          desc: 'Hello, Nice to meet you',
          theory: 'When meeting someone for the first time, polite introductions form the basis of communication.',
          words: [
            { word: 'Greeting', meaning: 'Salomlashish', sound: 'Greeting' },
            { word: 'Pleasure', meaning: 'Mamnuniyat', sound: 'Pleasure' }
          ],
          quiz: {
            question: "Choose the correct phrase to introduce yourself:",
            options: ["① I am pleased meeting you", "② Nice to meet you", "③ Good look", "④ Goodbye"],
            correct: 1,
            explanation: "'Nice to meet you' is the standard polite greeting."
          }
        }
      ]
    }
  };

  // --- 5. TO‘LIQ 15 TA TOPIK & EPS-TOPIK IMTIHON SAVOLLARI ---
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
      explanation: "Kino yoki serial ko'rmoq: 보다 -> 봅니다."
    },
    {
      id: "kr10",
      question: "10. 외국인등록증을 신청하려면 ________에 가야 합니다.",
      options: ["① 출입국관리사무소 (Immigratsiya)", "② 영화관", "③ 세탁소", "④ 소방서"],
      correct: "① 출입국관리사무소 (Immigratsiya)",
      audio: "외국인등록증을 신청하려면 출입국관리사무소에 가야 합니다",
      explanation: "ID kartani rasmiylashtirish uchun Immigratsiya idorasiga boriladi."
    },
    {
      id: "kr11",
      question: "11. [EPS-TOPIK] 무거운 물건을 높은 곳으로 올릴 때 ________을/를 사용합니다.",
      options: ["① 지게차 (Forklift)", "② 사다리", "③ 드라이버", "④ 망치"],
      correct: "① 지게차 (Forklift)",
      audio: "무거운 물건을 높은 곳으로 올릴 때 지게차를 사용합니다",
      explanation: "Og'ir yuklarni ko'tarish va tashish uchun yuk ko'taruvchi transport (지게차) ishlatiladi."
    },
    {
      id: "kr12",
      question: "12. 한국에서는 밥을 먹을 때 숟가락과 ________을/를 사용합니다.",
      options: ["① 젓가락 (Cho‘p)", "② 가위", "③ 볼펜", "④ 칼"],
      correct: "① 젓가락 (Cho‘p)",
      audio: "한국에서는 밥을 먹을 때 숟가락과 젓가락을 사용합니다",
      explanation: "Koreyada ovqatlanishda qoshiq (숟가락) va cho'p (젓가락) ishlatiladi."
    },
    {
      id: "kr13",
      question: "13. 월급날이 되면 은행에 가서 돈을 통장에 ________.",
      options: ["① 입금합니다 (Kiritaman)", "② 버립니다", "③ 잃어버립니다", "④ 찢습니다"],
      correct: "① 입금합니다 (Kiritaman)",
      audio: "월급날이 되면 은행에 가서 돈을 통장에 입금합니다",
      explanation: "Oylik tushganda bank hisobiga pul kiritish (입금하다) deyiladi."
    },
    {
      id: "kr14",
      question: "14. [EPS-TOPIK] 페인트칠을 할 때 유해 물질을 막기 위해 ________을/를 씁니다.",
      options: ["① 방독마스크 (Gazniqob)", "② 귀마개", "③ 벨트", "④ 안대"],
      correct: "① 방독마스크 (Gazniqob)",
      audio: "페인트칠을 할 때 유해 물질을 막기 위해 방독마스크를 씁니다",
      explanation: "Zaharli moddalardan nafas yo'lini himoyalashda maxsus niqob (방독마스크) taqiladi."
    },
    {
      id: "kr15",
      question: "15. 이번 주말에는 고향 친구를 만나서 즐거운 시간을 ________.",
      options: ["① 보냈습니다 (O‘tkazdim)", "② 팔았습니다", "③ 빌렸습니다", "④ 던졌습니다"],
      correct: "① 보냈습니다 (O‘tkazdim)",
      audio: "이번 주말에는 고향 친구를 만나서 즐거운 시간을 보냈습니다",
      explanation: "Vaqtni maroqli o'tkazmoq birikmasi '시간을 보내다' bo'ladi."
    }
  ];

  // --- 6. TO‘LIQ 15 TA INGLIZ TILI (IELTS) SAVOLLARI ---
  const englishIeltsQuestions = [
    {
      id: "en1",
      question: "1. Academic Reading: Bilingualism consistently enhances mental agility and executive ________.",
      options: ["① control", "② delay", "③ deterioration", "④ weakness"],
      correct: "① control",
      audio: "Bilingualism consistently enhances mental agility and executive control",
      explanation: "Matnda aytilgan: 'navigating between languages strengthens executive control'."
    },
    {
      id: "en2",
      question: "2. The neuroprotective benefits delay neurological symptoms by an average of:",
      options: ["① 4.5 years", "② 1.5 years", "③ 10 years", "④ 6 months"],
      correct: "① 4.5 years",
      audio: "The neuroprotective benefits delay neurological symptoms by an average of 4.5 years",
      explanation: "Matnda aniq keltirilgan: postponing symptoms by 4.5 years."
    },
    {
      id: "en3",
      question: "3. Select the best transition word for expressing contrast in Task 2:",
      options: ["① In contrast", "② Furthermore", "③ Consequently", "④ Namely"],
      correct: "① In contrast",
      audio: "Select the best transition word for expressing contrast in Task 2",
      explanation: "'In contrast' qarama-qarshi fikrlarni bog'lash uchun ishlatiladi."
    },
    {
      id: "en4",
      question: "4. The word 'subsequent' is closest in meaning to:",
      options: ["① following", "② prior", "③ accidental", "④ permanent"],
      correct: "① following",
      audio: "The word subsequent is closest in meaning to following",
      explanation: "Subsequent — keyingi, undan keyin keluvchi (following)."
    },
    {
      id: "en5",
      question: "5. In IELTS Listening Section 1, speakers typically discuss:",
      options: ["① everyday social situations", "② university lectures", "③ scientific debates", "④ history of art"],
      correct: "① everyday social situations",
      audio: "In IELTS Listening Section 1 speakers typically discuss everyday social situations",
      explanation: "Section 1 da kundalik hayotga oid dialoglar bo'ladi."
    },
    {
      id: "en6",
      question: "6. 'To shed light on' something means to:",
      options: ["① clarify or reveal details", "② turn off lights", "③ hide evidence", "④ complain loudly"],
      correct: "① clarify or reveal details",
      audio: "To shed light on something means to clarify or reveal details",
      explanation: "Shed light on — biror masalani oydinlashtirish."
    },
    {
      id: "en7",
      question: "7. Writing Task 2 essays must be at least ________ words long.",
      options: ["① 250", "② 150", "③ 350", "④ 100"],
      correct: "① 250",
      audio: "Writing Task 2 essays must be at least 250 words long",
      explanation: "Task 2 uchun minimal so'z talabi — 250 ta so'z."
    },
    {
      id: "en8",
      question: "8. Select the formal synonym for 'a lot of people':",
      options: ["① numerous individuals", "② heaps of folk", "③ bunch of guys", "④ tons of persons"],
      correct: "① numerous individuals",
      audio: "Select the formal synonym for a lot of people",
      explanation: "'Numerous individuals' akademik yozuvda eng to'g'ri ifodadir."
    },
    {
      id: "en9",
      question: "9. Identify the grammatical error: 'He has lived in London since five years.'",
      options: ["① 'since' should be 'for'", "② 'has lived' is wrong", "③ 'in' should be 'at'", "④ No error"],
      correct: "① 'since' should be 'for'",
      audio: "He has lived in London for five years",
      explanation: "Vaqt davomiyligi (5 years) uchun 'for' ishlatiladi."
    },
    {
      id: "en10",
      question: "10. In Speaking Part 2, how much preparation time is given?",
      options: ["① 1 minute", "② 3 minutes", "③ 30 seconds", "④ No preparation"],
      correct: "① 1 minute",
      audio: "In Speaking Part 2 how much preparation time is given",
      explanation: "Cue card bo'yicha tayyorlanish uchun 1 daqiqa beriladi."
    },
    {
      id: "en11",
      question: "11. 'Unprecedented' means:",
      options: ["① never having happened before", "② predictable", "③ very slow", "④ extremely expensive"],
      correct: "① never having happened before",
      audio: "Unprecedented means never having happened before",
      explanation: "Unprecedented — misli ko'rilmagan hodisa."
    },
    {
      id: "en12",
      question: "12. What does 'alleviate' mean?",
      options: ["① make less severe or reduce", "② destroy completely", "③ increase greatly", "④ build quickly"],
      correct: "① make less severe or reduce",
      audio: "What does alleviate mean",
      explanation: "Alleviate — og'riq yoki muammoni yengillashtirish."
    },
    {
      id: "en13",
      question: "13. In academic reading, True / False / Not Given tests your ability to:",
      options: ["① identify factual information accurately", "② memorize the text", "③ translate word by word", "④ guess grammar"],
      correct: "① identify factual information accurately",
      audio: "Identify factual information accurately",
      explanation: "Bu savol turi matndagi faktlarni aniq tekshiradi."
    },
    {
      id: "en14",
      question: "14. A person who speaks many languages fluently is a:",
      options: ["① polyglot", "② monolingual", "③ botanist", "④ linguist only"],
      correct: "① polyglot",
      audio: "A person who speaks many languages fluently is a polyglot",
      explanation: "Polyglot — ko'p tillarni biluvchi shaxs."
    },
    {
      id: "en15",
      question: "15. 'To take something for granted' means:",
      options: ["① fail to appreciate its true value", "② buy something on credit", "③ take it strictly on contract", "④ give a promise"],
      correct: "① fail to appreciate its true value",
      audio: "Fail to appreciate its true value",
      explanation: "Biror ne'matning qadriga yetmaslik."
    }
  ];

  const [testAnswers, setTestAnswers] = useState({});
  const [testChecked, setTestChecked] = useState(false);

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
  const activeQuestionsList = selectedLanguage === 'kr' ? koreanTopikQuestions : englishIeltsQuestions;

  const handleOpenLesson = (lesson) => {
    if (lesson.isPro && !userProfile.isPro) {
      setPaymentStep('select');
      setIsPaywallOpen(true);
      return;
    }
    setActiveLesson(lesson);
    setLessonStep('theory');
    setQuizAnswer(null);
    setActiveTab('lesson_detail');
  };

  // Tanlangan tarif narxini olish
  const getSelectedPrice = () => {
    if (selectedPlan === 'monthly') return '49 000 so‘m';
    if (selectedPlan === '2months') return '99 000 so‘m';
    return '499 000 so‘m';
  };

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
                FARIZA ACADEMY • {currentCourse.title.toUpperCase()}
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

        {/* PRO TARIFGA O‘TISH BANNERI */}
        {!userProfile.isPro && (
          <div 
            onClick={() => { setPaymentStep('select'); setIsPaywallOpen(true); }}
            className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-4.5 text-slate-950 flex items-center justify-between cursor-pointer shadow-lg active:scale-98 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/30 backdrop-blur-md flex items-center justify-center font-black">
                <Crown size={24} className="text-white" />
              </div>
              <div>
                <h4 className="font-black text-sm text-white">Fariza Academy PRO</h4>
                <p className="text-[11px] text-white/90 font-medium">Barcha EPS-TOPIK & IELTS darslarini oching</p>
              </div>
            </div>
            <span className="bg-white text-slate-950 text-xs font-black px-3 py-1.5 rounded-xl shadow">
              Ulanish
            </span>
          </div>
        )}

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
                {isKr ? 'To‘liq 15 Ta TOPIK Testlari' : 'To‘liq 15 Ta IELTS Savollari'}
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
          <div className="px-1 flex items-center justify-between">
            <div>
              <h3 className={`font-black text-base ${theme.textMain}`}>{currentCourse.subtitle}</h3>
              <p className={`text-xs ${theme.textMuted} mt-0.5`}>Qadamma-qadam amaliy darslar</p>
            </div>
            {userProfile.isPro && (
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                <Crown size={12} /> PRO AKTIV
              </span>
            )}
          </div>

          {activeLessonsList.length > 0 ? (
            activeLessonsList.map(lesson => {
              const completedList = userProfile.completedLessons || [];
              const isCompleted = completedList.includes(lesson.id);
              const isLocked = lesson.isPro && !userProfile.isPro;

              return (
                <div 
                  key={lesson.id}
                  onClick={() => handleOpenLesson(lesson)}
                  className={`${theme.card} border rounded-3xl p-4.5 flex items-center justify-between cursor-pointer active:scale-98 transition hover:border-indigo-500/50 shadow-md ${
                    isLocked ? 'opacity-90 border-amber-500/30' : ''
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${
                      isLocked ? 'bg-amber-500/20 text-amber-400' : isCompleted ? 'bg-emerald-500/20 text-emerald-500' : 'bg-indigo-500/20 text-indigo-500'
                    }`}>
                      {isLocked ? <Lock size={22} /> : isCompleted ? <CheckCircle2 size={24} /> : <BookOpen size={24} />}
                    </div>
                    <div>
                      <span className="text-[10px] text-indigo-500 font-bold uppercase">{lesson.section}</span>
                      <h4 className={`font-black text-sm mt-0.5 ${theme.textMain}`}>{lesson.title}</h4>
                      <p className={`text-xs ${theme.textMuted} mt-0.5`}>{lesson.desc}</p>
                    </div>
                  </div>
                  
                  {isLocked ? (
                    <span className="text-[10px] bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                      <Crown size={11} /> PRO
                    </span>
                  ) : (
                    <span className="text-[10px] bg-emerald-500/15 text-emerald-500 font-black px-2.5 py-1 rounded-full">
                      Bepul
                    </span>
                  )}
                </div>
              );
            })
          ) : (
            <div className={`${theme.card} border rounded-3xl p-8 text-center space-y-2`}>
              <Award size={32} className="mx-auto text-indigo-500" />
              <h4 className={`font-bold text-sm ${theme.textMain}`}>Darslar yuklanmoqda</h4>
              <p className={`text-xs ${theme.textMuted}`}>Boshqa bosqich darslarini ko‘rib turing.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ==========================================
  // 3. INTERAKTIV DARS JARAYONI (SO'ZLAR & AUDIO)
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
              <p className={`text-xs ${theme.textMuted}`}>So‘zlarni eshitish uchun ustiga bosing (Qurilmangiz ovozi yoqilganiga ishonch hosil qiling)</p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {activeLesson.words.map((w, idx) => (
                <div 
                  key={idx}
                  onClick={() => speakText(w.sound, selectedLanguage === 'kr' ? 'ko-KR' : 'en-US')}
                  className={`${theme.card} border rounded-2xl p-4 flex items-center justify-between cursor-pointer active:scale-98 transition hover:border-indigo-500 group`}
                >
                  <div className="flex items-center gap-3">
                    <button className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition">
                      <Volume2 size={20} />
                    </button>
                    <div>
                      <div className={`text-lg font-black ${theme.textMain}`}>{w.word}</div>
                      <div className={`text-xs ${theme.textMuted}`}>{w.meaning}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-indigo-500 flex items-center gap-1">
                    Eshitish 🔊
                  </span>
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
  // 4. TESTLAR MARKAZI (15 TA SAVOLLI)
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
            {selectedLanguage === 'kr' ? 'TOPIK & EPS (15 ta Savol)' : 'IELTS Test (15 ta Savol)'}
          </span>
        </div>

        <div className="space-y-3">
          {activeQuestionsList.map((q) => (
            <div key={q.id} className={`${theme.card} border rounded-3xl p-5 text-xs space-y-3`}>
              <div className="flex items-start justify-between gap-2">
                <p className={`font-bold text-sm leading-relaxed ${theme.textMain}`}>{q.question}</p>
                <button 
                  onClick={() => speakText(q.audio, selectedLanguage === 'kr' ? 'ko-KR' : 'en-US')}
                  className="p-2 bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-500 rounded-xl shrink-0 active:scale-90 transition"
                  title="Savolni tinglash"
                >
                  <Volume2 size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-1">
                {q.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setTestAnswers({ ...testAnswers, [q.id]: opt })}
                    className={`py-3 px-3.5 rounded-2xl text-left border text-xs font-semibold transition ${
                      testAnswers[q.id] === opt 
                        ? 'bg-indigo-600 text-white font-black border-indigo-600' 
                        : `${theme.subCard}`
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {testChecked && (
                <div className={`mt-2 p-3.5 rounded-2xl ${theme.subCard} text-[11px] space-y-1`}>
                  <span className={testAnswers[q.id] === q.correct ? "text-emerald-500 font-black" : "text-rose-500 font-black"}>
                    {testAnswers[q.id] === q.correct ? "✓ To‘g‘ri javob" : `✗ Xato (To‘g‘risi: ${q.correct})`}
                  </span>
                  <p className={`${theme.textMuted}`}>{q.explanation}</p>
                </div>
              )}
            </div>
          ))}

          <button 
            onClick={() => setTestChecked(true)}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-sm transition active:scale-95 shadow-xl"
          >
            Barcha 15 Ta Savolni Tekshirish va Tahlil Qilish
          </button>
        </div>
      </div>
    );
  };

  // ==========================================
  // 5. FARIZAAI SHAXSIY MURABBIY
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
        <span className="text-xs bg-indigo-500/15 text-indigo-500 px-3 py-1 rounded-full font-black">FarizaAI Voice Coach</span>
      </div>

      <div className={`${theme.card} border rounded-3xl p-6 text-center space-y-3.5 shadow-lg`}>
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white mx-auto flex items-center justify-center shadow-xl">
          <Bot size={40} />
        </div>
        <div>
          <h3 className={`font-black text-lg ${theme.textMain}`}>FarizaAI Murabbiy</h3>
          <p className={`text-xs ${theme.textMuted} mt-0.5`}>
            {selectedLanguage === 'kr' ? "Koreys tilida ovozli muloqot va talaffuz mashqlari" : "Ingliz tili Speaking va Writing AI murabbiyi"}
          </p>
        </div>

        <button 
          onClick={() => speakText(selectedLanguage === 'kr' ? "안녕하세요! 파리자 아카데미에 오신 것을 환영합니다. 한국어 공부를 시작해 볼까요?" : "Hello! Welcome to Fariza Academy. Let us practice speaking today.")}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-xs transition flex items-center justify-center gap-2 shadow-lg active:scale-95"
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
          <div className="flex items-center justify-center gap-1.5">
            <h3 className={`text-xl font-black tracking-tight ${theme.textMain}`}>{userProfile.name}</h3>
            {userProfile.isPro && <Crown size={18} className="text-amber-400 fill-amber-400" />}
          </div>
          <p className="text-xs text-indigo-500 font-bold mt-0.5">• {userProfile.currentLevel || 'B2 Upper-Intermediate'}</p>
        </div>
      </div>

      <div className={`${theme.card} border rounded-[28px] p-5 space-y-3.5 text-xs`}>
        <h4 className={`font-black text-sm ${theme.textMain}`}>Ta’lim Natijalari & Status</h4>
        
        <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
          <span className={theme.textMuted}>Obuna Holati:</span>
          <span className={`font-black text-xs px-2.5 py-0.5 rounded-full ${userProfile.isPro ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700/40 text-slate-400'}`}>
            {userProfile.isPro ? '★ PRO A’zo' : 'Oddiy Tarif'}
          </span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
          <span className={theme.textMuted}>Tugallangan Darslar:</span>
          <span className="font-black text-emerald-500 text-sm">{(userProfile.completedLessons || []).length} ta dars</span>
        </div>

        <div className="flex justify-between items-center py-2">
          <span className={theme.textMuted}>To‘plangan Tajriba (XP):</span>
          <span className="font-black text-amber-500 text-sm">{userProfile.xp} XP</span>
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
                Fariza Academy
              </h1>
              <p className={`text-[11px] font-medium ${theme.textMuted}`}>
                Har kuni yangi bilim, yangi imkoniyat.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
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

      {/* 2. REAL TO‘LOV TIZIMI (CLICK / PAYME) */}
      {isPaywallOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setIsPaywallOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          ></div>

          <div className={`relative w-full max-w-sm ${isDarkMode ? 'bg-[#151728] border-slate-700' : 'bg-white border-slate-200'} border rounded-[36px] p-6 text-center space-y-4 shadow-2xl z-10 animate-fadeIn`}>
            <button 
              onClick={() => setIsPaywallOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            {paymentStep === 'select' && (
              <>
                <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-xl">
                  <Crown size={32} />
                </div>

                <div>
                  <h3 className={`font-black text-xl ${theme.textMain}`}>Fariza Academy PRO</h3>
                  <p className={`text-xs ${theme.textMuted} mt-1 leading-relaxed`}>
                    Barcha qulflangan darslar, to‘liq EPS-TOPIK va IELTS materiallariga cheksiz kirish!
                  </p>
                </div>

                {/* 3 ta Tarif tanlovi */}
                <div className="space-y-2 text-left text-xs font-bold pt-1">
                  <div 
                    onClick={() => setSelectedPlan('monthly')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                      selectedPlan === 'monthly' ? 'border-indigo-500 bg-indigo-500/15' : 'border-slate-700/60 bg-slate-900/40'
                    } flex items-center justify-between`}
                  >
                    <div>
                      <div className="text-white font-black">1 Oylik Obuna</div>
                      <div className="text-slate-400 text-[10px]">30 kunlik to‘liq kirish</div>
                    </div>
                    <div className="text-indigo-400 font-black text-sm">49.000 so‘m</div>
                  </div>

                  <div 
                    onClick={() => setSelectedPlan('2months')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                      selectedPlan === '2months' ? 'border-indigo-500 bg-indigo-500/15' : 'border-slate-700/60 bg-slate-900/40'
                    } flex items-center justify-between`}
                  >
                    <div>
                      <div className="text-white font-black">2 Oylik Obuna</div>
                      <div className="text-slate-400 text-[10px]">60 kunlik intensiv kurs</div>
                    </div>
                    <div className="text-indigo-400 font-black text-sm">99.000 so‘m</div>
                  </div>

                  <div 
                    onClick={() => setSelectedPlan('yearly')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                      selectedPlan === 'yearly' ? 'border-amber-500 bg-amber-500/15' : 'border-slate-700/60 bg-slate-900/40'
                    } flex items-center justify-between`}
                  >
                    <div>
                      <div className="text-amber-400 font-black">1 Yillik VIP Obuna ⭐</div>
                      <div className="text-slate-400 text-[10px]">365 kunlik cheksiz kirish</div>
                    </div>
                    <div className="text-amber-400 font-black text-sm">499.000 so‘m</div>
                  </div>
                </div>

                <button 
                  onClick={() => setPaymentStep('checkout')}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black rounded-2xl text-xs transition shadow-xl"
                >
                  To‘lovga O‘tish ({getSelectedPrice()})
                </button>
              </>
            )}

            {paymentStep === 'checkout' && (
              <div className="space-y-3.5 text-left text-xs">
                <div className="text-center pb-1">
                  <h4 className="font-black text-base text-white">To‘lov Kvitansiyasi</h4>
                  <p className="text-[11px] text-slate-400">Summa: <strong className="text-amber-400">{getSelectedPrice()}</strong></p>
                </div>

                {/* SIZ KO'RSATGAN HAQIQIY KARTA RAQAMI */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700 space-y-2">
                  <span className="text-[10px] text-slate-400 uppercase font-black">Karta raqami (Click / Payme):</span>
                  <div className="flex items-center justify-between bg-slate-800 p-2.5 rounded-xl font-mono text-sm font-bold text-white">
                    <span>9860 1601 0396 4799</span>
                    <button 
                      onClick={() => {
                        navigator.clipboard?.writeText("9860160103964799");
                        alert("Karta raqami nusxalandi: 9860 1601 0396 4799");
                      }}
                      className="text-xs bg-indigo-600 hover:bg-indigo-500 px-2.5 py-1 rounded text-white font-sans font-bold flex items-center gap-1 active:scale-95"
                    >
                      <Copy size={12} /> Nusxalash
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-400">Qabul qiluvchi: Fariza Academy</div>
                </div>

                <p className="text-[11px] text-slate-400 leading-snug">
                  Iltimos, Click yoki Payme orqali yuqoridagi kartaga to‘lov qiling va chekni yuboring. To‘lov qilingach, administrator tasdiqlab hisobingizni PRO qiladi:
                </p>

                <div className="space-y-2 pt-1">
                  <button 
                    onClick={() => {
                      setUserProfile(prev => ({ ...prev, isPro: true }));
                      setIsPaywallOpen(false);
                      alert("To‘lov tasdiqlandi! Fariza Academy PRO muvaffaqiyatli faollashtirildi! 🎉");
                    }}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl text-xs transition shadow-lg text-center active:scale-95"
                  >
                    To‘lov Qildim (PRO ni Faollashtirish)
                  </button>
                  
                  <button 
                    onClick={() => setPaymentStep('select')}
                    className="w-full py-2.5 bg-slate-800 text-slate-400 font-bold rounded-2xl text-xs text-center"
                  >
                    Orqaga (Tarifni o‘zgartirish)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. YON PANEL */}
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
                  <span className={`font-black text-base ${theme.textMain}`}>Fariza Academy</span>
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
                  onClick={() => { setPaymentStep('select'); setIsPaywallOpen(true); setIsSidebarOpen(false); }}
                  className={`w-full p-3 rounded-2xl flex items-center gap-3 bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-1.5`}
                >
                  <Crown size={18} /> Fariza Academy PRO
                </button>
                <button 
                  onClick={() => { setActiveTab('tests'); setIsSidebarOpen(false); }}
                  className={`w-full p-3 rounded-2xl flex items-center gap-3 ${theme.subCard} mb-1.5`}
                >
                  <Award size={18} className="text-emerald-500" /> Imtihon Testlari (15 ta)
                </button>
                <button 
                  onClick={() => { setActiveTab('ai'); setIsSidebarOpen(false); }}
                  className={`w-full p-3 rounded-2xl flex items-center gap-3 ${theme.subCard} mb-1.5`}
                >
                  <Bot size={18} className="text-purple-500" /> FarizaAI Murabbiy
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
              Fariza Academy Platformasi v3.6
            </div>
          </div>
        </div>
      )}

      {/* 4. ASOSIY MAYDON */}
      <main className="flex-1 w-full max-w-md mx-auto p-4 pb-44 box-border">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'academy' && renderAcademy()}
        {activeTab === 'lesson_detail' && renderLessonDetail()}
        {activeTab === 'tests' && renderTests()}
        {activeTab === 'ai' && renderAi()}
        {activeTab === 'profile' && renderProfileOnly()}
      </main>

      {/* 5. 5 TALIK KATTA PASTKI MENYU */}
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

          {/* FarizaAI Markaziy Tugma */}
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
            <span className="text-xs text-indigo-500 font-black mt-1">FarizaAI</span>
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
