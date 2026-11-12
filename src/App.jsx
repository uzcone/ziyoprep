import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, Bot, User, Volume2, ArrowLeft, 
  Sun, Moon, ArrowRight, Menu, GraduationCap, 
  X, Crown, Flame, Heart, Zap, Mail, KeyRound, 
  LogOut, Upload, Trophy, Layers, Send, 
  CheckCircle2, Sparkles, BookOpen, Headphones, Target
} from 'lucide-react';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';

export default function App() {
  // --- 1. AUTENTIFIKATSIYA (GOOGLE, EMAIL, MEHMON) ---
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('fariza_auth_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authMode, setAuthMode] = useState('welcome');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const userObj = {
          uid: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'O‘quvchi',
          email: fbUser.email,
          photoURL: fbUser.photoURL || ''
        };
        setCurrentUser(userObj);
        localStorage.setItem('fariza_auth_user', JSON.stringify(userObj));
        setUserProfile(prev => ({
          ...prev,
          name: userObj.name,
          photoBase64: userObj.photoURL || prev.photoBase64
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGuestLogin = () => {
    const guestUser = {
      uid: 'guest_user',
      name: 'Tokhirbek',
      email: 'guest@ziyoprep.uz',
      photoURL: '',
      isGuest: true
    };
    setCurrentUser(guestUser);
    localStorage.setItem('fariza_auth_user', JSON.stringify(guestUser));
  };

  const handleGoogleLogin = async () => {
    setAuthError('');
    setAuthLoading(true);
    try {
      if (auth && googleProvider) {
        await signInWithPopup(auth, googleProvider);
      } else {
        handleGuestLogin();
      }
    } catch (err) {
      if (err.code === 'auth/unauthorized-domain') {
        setAuthError("Domen ruxsat etilmagan! Firebase Console -> Authorized domains bo‘limiga ziyoprep-sepia.vercel.app ni qo‘shing.");
      } else if (err.code === 'auth/popup-closed-by-user') {
        setAuthError("Google oynasi yopildi. Qaytadan urinib ko‘ring.");
      } else {
        setAuthError("Google xatoligi: " + (err.code || err.message));
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (!authForm.email.trim() || !authForm.password.trim()) {
      setAuthError("Email va parolni to‘liq kiriting!");
      return;
    }
    setAuthLoading(true);
    try {
      if (auth) {
        if (authMode === 'register') {
          const res = await createUserWithEmailAndPassword(auth, authForm.email.trim(), authForm.password);
          await updateProfile(res.user, { displayName: authForm.name.trim() || 'O‘quvchi' });
        } else {
          await signInWithEmailAndPassword(auth, authForm.email.trim(), authForm.password);
        }
      }
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setAuthError("Bu email allaqachon ro‘yxatdan o‘tgan! 'Tizimga kiring' tugmasini bosing.");
      } else if (err.code === 'auth/weak-password') {
        setAuthError("Parol kamida 6 ta belgidan iborat bo‘lishi kerak.");
      } else {
        setAuthError("Email yoki parol noto‘g‘ri.");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    if (auth) {
      try { await signOut(auth); } catch (e) {}
    }
    localStorage.removeItem('fariza_auth_user');
    setCurrentUser(null);
    setAuthMode('welcome');
    setIsSidebarOpen(false);
  };

  // --- 2. TIL VA MAVZU (DEFAULT: PREMIUM DARK) ---
  const [selectedLanguage, setSelectedLanguage] = useState(() => localStorage.getItem('fariza_lang') || 'kr');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('fariza_theme');
    return saved !== null ? saved === 'dark' : true;
  });

  const switchLanguage = (lang) => {
    setSelectedLanguage(lang);
    localStorage.setItem('fariza_lang', lang);
    setActiveTab('home');
    setFlashcardIndex(0);
    setIsCardFlipped(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('fariza_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // --- 3. GAMIFICATION & PROFIL ---
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('fariza_user');
    if (saved) {
      try {
        const p = JSON.parse(saved);
        return {
          name: p.name || 'Tokhirbek',
          photoBase64: p.photoBase64 || '',
          streak: p.streak ?? 7,
          xp: p.xp ?? 950,
          dailyXp: p.dailyXp ?? 60,
          hearts: p.hearts ?? 5,
          isPro: p.isPro || false,
          completedLessons: Array.isArray(p.completedLessons) ? p.completedLessons : [1, 101]
        };
      } catch (e) {}
    }
    return {
      name: 'Tokhirbek',
      photoBase64: '',
      streak: 7,
      xp: 950,
      dailyXp: 60,
      hearts: 5,
      isPro: false,
      completedLessons: [1, 101]
    };
  });

  useEffect(() => {
    localStorage.setItem('fariza_user', JSON.stringify(userProfile));
  }, [userProfile]);

  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'flashcards' | 'ai_tutor' | 'leaderboard' | 'lesson_detail'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);
  const [lessonStep, setLessonStep] = useState('theory');
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState(userProfile);
  const fileInputRef = useRef(null);

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // AI Tutor state
  const [aiMessages, setAiMessages] = useState([
    {
      role: 'ai',
      text: "Annyeonghaseyo! 👋 Men Ziyo AI ustozman. Qaysi mavzuda suhbatlashamiz yoki grammatikani mashq qilamiz?",
      trans: "Pastdagi tayyor mavzulardan birini bosing yoki koreyscha/inglizcha yozing!"
    }
  ]);
  const [aiInput, setAiInput] = useState('');

  // --- 4. AUDIO TALAFFUZ ---
  const speakText = (text, lang = selectedLanguage === 'kr' ? 'ko-KR' : 'en-US') => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const clean = text.replace(/[\(\)①②③④]/g, '').trim();
      const ut = new SpeechSynthesisUtterance(clean);
      ut.lang = lang;
      ut.rate = 0.85;
      window.speechSynthesis.speak(ut);
    } catch (e) {}
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditForm(prev => ({ ...prev, photoBase64: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // --- 5. BOYITILGAN DARSLAR BAZASI ---
  const professionalLessons = {
    kr: [
      {
        id: 1,
        unit: "1-BO‘LIM • HANGUL VA FONETIKA",
        title: "1-dars: Hangul Alifbosi",
        subtitle: "Unlilar, undoshlar va bo‘g‘in qurilishi",
        isPro: false,
        icon: "👑",
        color: "from-emerald-500 to-teal-600 border-emerald-800",
        theory: `Hangul 1443-yilda Qirol Sejong tomonidan yaratilgan ilmiy alifbodir.\n• 14 ta asosiy undosh: ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅅ, ㅇ, ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ\n• 10 ta asosiy unli: ㅏ, ㅑ, ㅓ, ㅕ, ㅗ, ㅛ, ㅜ, ㅠ, ㅡ, ㅣ\n\nQoida: Har bir bo‘g‘in undosh bilan boshlanishi shart. Unli tovushdan boshlanuvchi so‘z oldiga jim 'ㅇ' harfi qo‘yiladi (Masalan: 아이, 우유).`,
        words: [
          { word: "한글", meaning: "Hangul (Koreys alifbosi)", sound: "한글", ex: "한글은 아주 과학적이에요." },
          { word: "아이", meaning: "Bola / Go‘dak", sound: "아이", ex: "아이가 공원에서 놀아요." },
          { word: "우유", meaning: "Sut", sound: "우유", ex: "아침마다 우유를 마셔요." },
          { word: "모자", meaning: "Bosh kiyim / Kepka", sound: "모자", ex: "검은색 모자를 샀어요." },
          { word: "바다", meaning: "Dengiz", sound: "바다", ex: "여름에 바다에 가고 싶어요." },
          { word: "나무", meaning: "Daraxt", sound: "나무", ex: "학교 앞에 큰 나무가 있어요." }
        ],
        dialogue: [
          { speaker: "선생님", text: "안녕하세요! 오늘부터 한글을 공부합니다.", trans: "Assalomu alaykum! Bugundan Hangulni o‘rganamiz." },
          { speaker: "토히르벡", text: "네, 선생님! 발음도 열심히 연습하겠습니다.", trans: "Xo‘p, ustoz! Talaffuzni ham astoydil mashq qilaman." },
          { speaker: "선생님", text: "좋아요! '우유'라고 읽어 보세요.", trans: "Ajoyib! 'Uyu' deb o‘qib ko‘ring-chi." }
        ],
        quizzes: [
          {
            question: "Unli tovushdan boshlanuvchi bo‘g‘in oldiga qaysi harf qo‘yiladi?",
            options: ["① ㄱ", "② ㄴ", "③ ㅇ (Jim undosh)", "④ ㄹ"],
            correct: 2,
            explanation: "Unli harf yolg‘iz yozilmaydi, boshiga talaffuzsiz 'ㅇ' qo‘yiladi."
          },
          {
            question: "'우유' so‘zining ma'nosi nima?",
            options: ["① Non", "② Sut", "③ Suv", "④ Choy"],
            correct: 1,
            explanation: "'우유' (uyu) — sut degan ma'noni bildiradi."
          }
        ]
      },
      {
        id: 2,
        unit: "1-BO‘LIM • HANGUL VA FONETIKA",
        title: "2-dars: Batchim (받침) Qoidalari",
        subtitle: "Pastki undoshlar va ulanish fonetikasi",
        isPro: false,
        icon: "⭐",
        color: "from-indigo-500 to-violet-600 border-indigo-800",
        theory: `Bo‘g‘in ostida keladigan undosh 'Batchim' (받침) deyiladi.\n• Liaison (Ulanish): Batchimdan keyin 'ㅇ' (unli) kelsa, batchimdagi harf keyingi bo‘g‘inga ko‘chib o‘qiladi.\nMisol: 한국어 -> [한구거], 직업 -> [지겁], 먹어요 -> [머거요].`,
        words: [
          { word: "한국어", meaning: "Koreys tili", sound: "한국어", ex: "한국어를 매일 공부해요." },
          { word: "책상", meaning: "Yozuv stoli", sound: "책상", ex: "책상 위에 노트북이 있어요." },
          { word: "음식", meaning: "Taom / Ovqat", sound: "음식", ex: "한국 음식이 정말 맛있어요." },
          { word: "직업", meaning: "Kasb / Hunar", sound: "직업", ex: "제 직업은 개발자입니다." },
          { word: "학생", meaning: "Talaba / O‘quvchi", sound: "학생", ex: "저는 대학교 학생이에요." },
          { word: "선생님", meaning: "O‘qituvchi / Ustoz", sound: "선생님", ex: "선생님께 질문이 있어요." }
        ],
        dialogue: [
          { speaker: "지민", text: "토히르벡 씨는 직업이 무엇이에요?", trans: "Tokhirbek, kasbingiz nima?" },
          { speaker: "토히르벡", text: "저는 컴퓨터공학을 공부하는 대학생이에요.", trans: "Men kompyuter injiniringini o‘rganayotgan talabaman." }
        ],
        quizzes: [
          {
            question: "'한국어' so‘zining to‘g‘ri talaffuzi qaysi?",
            options: ["① [한국어]", "② [한구거]", "③ [한쿡어]", "④ [하누거]"],
            correct: 1,
            explanation: "Batchimdagi 'ㄱ' keyingi unli bo‘g‘inga o‘tib [한구거] o‘qiladi."
          },
          {
            question: "'직업' (Kasb) so‘zi qanday o‘qiladi?",
            options: ["① [직업]", "② [지겁]", "③ [지컵]", "④ [지껍]"],
            correct: 1,
            explanation: "'ㄱ' unli oldida [g] tovushiga o‘tib [지겁] deb talaffuz qilinadi."
          }
        ]
      },
      {
        id: 3,
        unit: "2-BO‘LIM • KUNDALIK GRAMMATIKA",
        title: "3-dars: Hozirgi Zamon (-아요/어요)",
        subtitle: "Fe’l va sifatlarni xushmuomala tuslash",
        isPro: false,
        icon: "⚡",
        color: "from-sky-500 to-blue-600 border-sky-800",
        theory: `Koreys tilida xushmuomala norasmiy uslub (-아요/어요) eng ko‘p ishlatiladi:\n1. O‘zakda 'ㅏ' yoki 'ㅗ' bo‘lsa -> -아요 (가다 -> 가요, 보다 -> 봐요)\n2. Boshqa unlilar bo‘lsa -> -어요 (먹다 -> 먹어요, 읽다 -> 읽어요)\n3. '하다' bilan tugasa -> 해요 (공부하다 -> 공부해요, 일하다 -> 일해요)`,
        words: [
          { word: "가다", meaning: "Bormoq", sound: "가다", ex: "지금 회사에 가요." },
          { word: "먹다", meaning: "Yemoq", sound: "먹다", ex: "점심에 비빔밥을 먹어요." },
          { word: "마시다", meaning: "Ichmoq", sound: "마시다", ex: "아메리카노를 마셔요." },
          { word: "일하다", meaning: "Ishlamoq", sound: "일하다", ex: "서울에서 일해요." },
          { word: "운동하다", meaning: "Sport bilan shug‘ullanmoq", sound: "운동하다", ex: "저녁에 축구를 해요." }
        ],
        dialogue: [
          { speaker: "수진", text: "주말에 보통 무엇을 해요?", trans: "Dam olish kunlari odatda nima qilasiz?" },
          { speaker: "토히르벡", text: "도서관에서 공부하고 친구들과 축구를 해요.", trans: "Kutubxonada dars qilaman va do‘stlarim bilan futbol o‘ynayman." }
        ],
        quizzes: [
          {
            question: "'일하다' (ishlamoq) fe'lining hozirgi zamon shakli qaysi?",
            options: ["① 일하아요", "② 일해요", "③ 일허요", "④ 일합요"],
            correct: 1,
            explanation: "'하다' bilan tugovchi fe'llar '해요' shaklida tuslanadi."
          }
        ]
      },
      {
        id: 4,
        unit: "2-BO‘LIM • KUNDALIK GRAMMATIKA",
        title: "4-dars: Koreys Raqamlari va Xarid",
        subtitle: "Do‘konda narx so‘rash va sanash tizimi",
        isPro: false,
        icon: "🛍️",
        color: "from-fuchsia-500 to-purple-600 border-purple-800",
        theory: `Koreys tilida 2 xil raqam tizimi mavjud:\n• Xitoy-koreys (일, 이, 삼, 사, 오...): Pul (원), sana, telefon raqami va daqiqalar uchun.\n• Asl koreys (하나, 둘, 셋, 넷, 다섯...): Yoshi, soat va buyumlar soni (개, 명, 잔) uchun.`,
        words: [
          { word: "얼마예요?", meaning: "Necha pul?", sound: "얼마예요", ex: "이 사과 얼마예요?" },
          { word: "천 원", meaning: "1,000 von", sound: "천 원", ex: "물 한 병에 천 원이에요." },
          { word: "만 원", meaning: "10,000 von", sound: "만 원", ex: "이 티셔츠는 만 원이에요." },
          { word: "깎아 주세요", meaning: "Arzonroq qilib bering", sound: "깎아 주세요", ex: "조금만 깎아 주세요." },
          { word: "영수증", meaning: "Chek / Kvitansiya", sound: "영수증", ex: "영수증 필요하세요?" }
        ],
        dialogue: [
          { speaker: "손님", text: "사장님, 이 커피 두 잔에 얼마예요?", trans: "Usta, bu ikki stakan kofe necha pul?" },
          { speaker: "사장님", text: "모두 팔천 원입니다. 영수증 드릴까요?", trans: "Hammasi 8,000 von. Chek beraymi?" }
        ],
        quizzes: [
          {
            question: "Do‘konda biror narsaning narxini so‘rash uchun nima deyiladi?",
            options: ["① 어디예요?", "② 얼마예요?", "③ 누구예요?", "④ 몇 시예요?"],
            correct: 1,
            explanation: "'얼마예요?' — Necha pul? degan savoldir."
          }
        ]
      },
      {
        id: 5,
        unit: "3-BO‘LIM • EPS-TOPIK & PRO",
        title: "5-dars: Zavod Xavfsizligi (안전)",
        subtitle: "EPS-TOPIK imtihoni uchun maxsus leksika",
        isPro: true,
        icon: "👑",
        color: "from-amber-400 to-orange-600 border-amber-800",
        theory: `Koreya ishlab chiqarish korxonalarida xavfsizlik qoidalariga qat'iy rioya qilinadi:\n• 안전모 (Himoya kaskasi) — boshni himoyalaydi.\n• 안전화 (Himoya poyabzali) — oyoqni og‘ir yukdan saqlaydi.\n• 소화기 (O‘t o‘chirgich) — yong‘in chiqqanda ishlatiladi.`,
        words: [
          { word: "안전모", meaning: "Himoya kaskasi", sound: "안전모", ex: "작업장에서는 안전모를 꼭 쓰세요." },
          { word: "보안경", meaning: "Himoya ko‘zoynagi", sound: "보안경", ex: "용접할 때 보안경을 착용합니다." },
          { word: "소화기", meaning: "O‘t o‘chirgich", sound: "소화기", ex: "소화기 위치를 미리 확인하세요." },
          { word: "비상구", meaning: "Favqulodda chiqish eshigi", sound: "비상구", ex: "불이 나면 비상구로 대피하세요." }
        ],
        dialogue: [
          { speaker: "반장님", text: "작업 시작 전에 안전모와 안전화를 착용했나요?", trans: "Ish boshlashdan oldin kaska va maxsus oyoq kiyim kiydingizmi?" },
          { speaker: "토히르벡", text: "네, 반장님! 안전 수칙을 모두 확인했습니다.", trans: "Ha, brigadir! Barcha xavfsizlik qoidalarini tekshirdim." }
        ],
        quizzes: [
          {
            question: "Yong‘in chiqqanda ishlatiladigan vosita koreys tilida nima deyiladi?",
            options: ["① 안전모", "② 소화기", "③ 보안경", "④ 귀마개"],
            correct: 1,
            explanation: "'소화기' — o‘t o‘chirish moslamasi."
          }
        ]
      }
    ],
    en: [
      {
        id: 101,
        unit: "UNIT 1 • IELTS BAND 7.5+",
        title: "Lesson 1: Academic Lexicon",
        subtitle: "High-scoring synonyms & formal verbs",
        isPro: false,
        icon: "👑",
        color: "from-emerald-500 to-teal-600 border-emerald-800",
        theory: `To score Band 7.5+ in IELTS Writing & Speaking, replace basic words with precise academic vocabulary:\n• Very common -> Ubiquitous\n• Harmful -> Detrimental\n• Reduce -> Mitigate\n• Make worse -> Exacerbate`,
        words: [
          { word: "Ubiquitous", meaning: "Hamma joyda mavjud", sound: "Ubiquitous", ex: "Smartphones have become ubiquitous in modern life." },
          { word: "Detrimental", meaning: "Zararli / Salbiy ta'sirli", sound: "Detrimental", ex: "Air pollution has a detrimental impact on health." },
          { word: "Mitigate", meaning: "Yumshatmoq / Kamaytirmoq", sound: "Mitigate", ex: "Green energy helps mitigate climate change." },
          { word: "Exacerbate", meaning: "Yanada og‘irlashtirmoq", sound: "Exacerbate", ex: "Traffic congestion exacerbates urban stress." },
          { word: "Inevitable", meaning: "Muqarrar / Qochib bo‘lmaydigan", sound: "Inevitable", ex: "Technological progress is inevitable." }
        ],
        dialogue: [
          { speaker: "Examiner", text: "How has technology influenced modern education?", trans: "Texnologiya zamonaviy ta'limga qanday ta'sir ko‘rsatdi?" },
          { speaker: "Tokhirbek", text: "Digital platforms have become ubiquitous, making quality resources accessible globally.", trans: "Raqamli platformalar hamma joyda mavjud bo‘lib, sifatli resurslarni butun dunyoga ochiq qildi." }
        ],
        quizzes: [
          {
            question: "Which academic word means 'present, appearing, or found everywhere'?",
            options: ["① Scarce", "② Ubiquitous", "③ Fragile", "④ Obsolete"],
            correct: 1,
            explanation: "'Ubiquitous' is a Band 8.0+ vocabulary word meaning found everywhere."
          }
        ]
      },
      {
        id: 102,
        unit: "UNIT 1 • IELTS BAND 7.5+",
        title: "Lesson 2: Band 8.0 Cohesion",
        subtitle: "Advanced linking devices for Task 2",
        isPro: false,
        icon: "⭐",
        color: "from-indigo-500 to-violet-600 border-indigo-800",
        theory: `Avoid repeating 'However' and 'Therefore' in every paragraph. Use advanced cohesive devices:\n• Notwithstanding (Shunga qaramasdan)\n• Conversely (Aksincha)\n• Consequently (Natijada)\n• Albeit (Garchi ... bo‘lsa-da)`,
        words: [
          { word: "Notwithstanding", meaning: "Shunga qaramasdan", sound: "Notwithstanding", ex: "Notwithstanding economic hurdles, innovation thrived." },
          { word: "Conversely", meaning: "Aksincha", sound: "Conversely", ex: "Urban areas are crowded; conversely, rural regions are quiet." },
          { word: "Consequently", meaning: "Natijada / Binobarin", sound: "Consequently", ex: "Costs rose; consequently, demand declined." }
        ],
        dialogue: [
          { speaker: "Tutor", text: "How can you contrast two opposing arguments in an essay?", trans: "Inshoda ikkita qarama-qarshi fikrni qanday solishtirish mumkin?" },
          { speaker: "Tokhirbek", text: "I can introduce the counter-argument using 'Conversely' or 'Notwithstanding'.", trans: "Qarama-qarshi fikrni 'Conversely' yoki 'Notwithstanding' bilan boshlashim mumkin." }
        ],
        quizzes: [
          {
            question: "Which linker is best used to introduce an opposite point of view?",
            options: ["① Furthermore", "② Conversely", "③ Namely", "④ Similarly"],
            correct: 1,
            explanation: "'Conversely' introduces a statement that is the opposite of the previous one."
          }
        ]
      }
    ]
  };

  const currentRoadmap = professionalLessons[selectedLanguage] || professionalLessons.kr;
  const allWords = currentRoadmap.flatMap(l => l.words);

  const getLessonStatus = (lesson, idx) => {
    if (userProfile.completedLessons?.includes(lesson.id)) return 'completed';
    if (idx === 0 || userProfile.completedLessons?.includes(currentRoadmap[idx - 1]?.id)) return 'current';
    return 'locked';
  };

  const handleOpenLesson = (lesson) => {
    if (userProfile.hearts <= 0 && !userProfile.isPro) {
      alert("Yuraklaringiz tugadi! Yuraklarni tiklash uchun PRO ga o‘ting.");
      setIsPaywallOpen(true);
      return;
    }
    if (lesson.isPro && !userProfile.isPro) {
      setIsPaywallOpen(true);
      return;
    }
    setActiveLesson(lesson);
    setLessonStep('theory');
    setQuizIndex(0);
    setQuizAnswer(null);
    setActiveTab('lesson_detail');
  };

  // AI Tutor javob generatsiyasi
  const handleSendAiMessage = (customPrompt) => {
    const text = (customPrompt || aiInput).trim();
    if (!text) return;

    const userMsg = { role: 'user', text };
    setAiMessages(prev => [...prev, userMsg]);
    setAiInput('');

    setTimeout(() => {
      let reply = {
        text: "아주 좋아요! (Juda zo‘r!) Koreys tilida gap tuzish mahoratingiz oshib boryapti.",
        trans: "Yana bir misol: '저는 한국에서 소프트웨어 공학을 공부해요' (Men Koreyada dasturiy injiniringni o‘rganyapman)."
      };

      if (text.toLowerCase().includes('kafe') || text.includes('커피')) {
        reply = {
          text: "카페: '아이스 아메리카노 한 잔 주세요.' (Bitta muzli amerikano bering.)",
          trans: "Sotuvchi javobi: '네, 알겠습니다. 영수증 필요하세요?' (Xo‘p bo‘ladi. Chek kerakmi?)"
        };
      } else if (text.toLowerCase().includes('ielts') || text.toLowerCase().includes('speaking')) {
        reply = {
          text: "IELTS Speaking Tip: Instead of saying 'I think', use 'From my perspective' or 'I firmly believe that...'",
          trans: "Bu iboralar Lexical Resource ballingizni 7.5+ ga olib chiqadi!"
        };
      } else if (text.toLowerCase().includes('batchim')) {
        reply = {
          text: "Batchim qoidasi: '같이' [가치], '좋아요' [조아요], '한국어' [한구거] shaklida o‘qiladi.",
          trans: "Eshitish uchun xabar ustiga bosing!"
        };
      }

      setAiMessages(prev => [...prev, { role: 'ai', ...reply }]);
      speakText(reply.text);
    }, 450);
  };

  const theme = {
    bg: isDarkMode ? 'bg-[#080c16] text-slate-100' : 'bg-[#f4f6fb] text-slate-900',
    card: isDarkMode ? 'bg-[#111827] border-slate-800/90' : 'bg-white border-slate-200/90 shadow-sm',
    subCard: isDarkMode ? 'bg-[#192236] border-slate-700/60' : 'bg-slate-100 border-slate-200',
    header: isDarkMode ? 'bg-[#080c16]/90 border-b border-slate-800/80' : 'bg-white/90 border-b border-slate-200',
    textMain: isDarkMode ? 'text-white' : 'text-slate-900',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-slate-500',
    navBg: isDarkMode ? 'bg-[#0d1322]/95 border-t border-slate-800' : 'bg-white/95 border-t border-slate-200',
    inputBg: isDarkMode ? 'bg-[#161f33] border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
  };

  // =========================================================================
  // 0. KIRISH EKRANI (GOOGLE, EMAIL YOKI AKKAUNTSIZ KIRISH)
  // =========================================================================
  if (!currentUser) {
    return (
      <div className={`min-h-screen w-full ${theme.bg} flex flex-col justify-between p-6 font-sans`}>
        <div className="max-w-md w-full mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 border-b-4 border-emerald-700 flex items-center justify-center text-white font-black text-xl shadow-lg">
              Z
            </div>
            <div>
              <span className={`font-black text-lg tracking-tight block leading-none ${theme.textMain}`}>ZiyoPrep</span>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Academy Pro</span>
            </div>
          </div>
          <button onClick={toggleTheme} className={`p-2.5 rounded-2xl ${theme.subCard} border`}>
            {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
          </button>
        </div>

        <div className="max-w-md w-full mx-auto my-auto py-6">
          {authMode === 'welcome' ? (
            <div className="text-center space-y-7">
              <div className="relative w-32 h-32 mx-auto">
                <div className="w-full h-full rounded-[36px] bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-500 border-b-8 border-indigo-900 flex items-center justify-center shadow-2xl">
                  <span className="text-6xl">🚀</span>
                </div>
                <span className="absolute -bottom-2 inset-x-4 bg-amber-400 text-slate-950 text-[10px] font-black py-1 rounded-full shadow-lg uppercase">
                  TOPIK & IELTS 7.5+
                </span>
              </div>

              <div className="space-y-2">
                <h1 className={`text-2xl font-black leading-tight ${theme.textMain}`}>
                  Til o‘rganishning eng zamonaviy va interaktiv platformasi
                </h1>
                <p className={`text-xs ${theme.textMuted} max-w-xs mx-auto leading-relaxed`}>
                  Kuniga 15 daqiqa o‘yin uslubidagi mashqlar, AI ustoz va audio kartochkalar bilan natijaga chiqing.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={handleGuestLogin}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 active:translate-y-0.5 border-b-4 border-emerald-700 text-white font-black text-sm tracking-wide uppercase transition shadow-xl"
                >
                  Akkauntsiz Boshlash (Tezkor kirish)
                </button>

                <button
                  onClick={handleGoogleLogin}
                  className={`w-full py-4 rounded-2xl ${theme.card} border-2 border-b-4 font-black text-sm ${theme.textMain} flex items-center justify-center gap-2.5 transition active:translate-y-0.5`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"/>
                  </svg>
                  <span>Google bilan davom etish</span>
                </button>

                <button
                  onClick={() => { setAuthError(''); setAuthMode('login'); }}
                  className="w-full py-2 text-xs font-bold text-indigo-400 hover:underline"
                >
                  Email va Parol orqali kirish
                </button>
              </div>
            </div>
          ) : (
            <div className={`${theme.card} border-2 rounded-3xl p-6 space-y-5 shadow-2xl`}>
              <div className="flex items-center justify-between">
                <button onClick={() => setAuthMode('welcome')} className={`p-2 rounded-xl ${theme.subCard}`}>
                  <ArrowLeft size={18} />
                </button>
                <h2 className={`font-black text-lg ${theme.textMain}`}>
                  {authMode === 'login' ? 'Tizimga kirish' : 'Profil yaratish'}
                </h2>
                <div className="w-8" />
              </div>

              {authError && (
                <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-400 text-xs font-bold text-center">
                  {authError}
                </div>
              )}

              <form onSubmit={handleEmailAuth} className="space-y-3.5">
                {authMode === 'register' && (
                  <input
                    type="text"
                    placeholder="Ismingiz"
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    className={`w-full ${theme.inputBg} border-2 rounded-2xl px-4 py-3 text-xs font-bold outline-none`}
                  />
                )}
                <input
                  type="email"
                  placeholder="Email manzilingiz"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  className={`w-full ${theme.inputBg} border-2 rounded-2xl px-4 py-3 text-xs font-bold outline-none`}
                />
                <input
                  type="password"
                  placeholder="Parol (kamida 6 ta belgi)"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  className={`w-full ${theme.inputBg} border-2 rounded-2xl px-4 py-3 text-xs font-bold outline-none`}
                />
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3.5 rounded-2xl bg-indigo-600 border-b-4 border-indigo-800 text-white font-black text-xs uppercase"
                >
                  {authLoading ? 'Yuklanmoqda...' : authMode === 'login' ? 'Kirish' : 'Akkaunt yaratish'}
                </button>
              </form>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="text-xs font-bold text-indigo-400"
                >
                  {authMode === 'login' ? "Akkauntingiz yo‘qmi? Ro‘yxatdan o‘ting" : "Akkauntingiz bormi? Tizimga kiring"}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="text-center text-[11px] text-slate-500">ZiyoPrep Academy • Premium EdTech</div>
      </div>
    );
  }

  // =========================================================================
  // 1. PREMIUM BOSH SAHIFA (DASHBOARD + KUNLIK MAQSAD + S-YO‘LAK)
  // =========================================================================
  const renderHome = () => {
    const isKr = selectedLanguage === 'kr';
    const nextLesson = currentRoadmap.find((l, i) => getLessonStatus(l, i) === 'current') || currentRoadmap[0];
    const dailyGoalPercent = Math.min(100, Math.round((userProfile.dailyXp / 100) * 100));
    const offsets = ['translate-x-0', '-translate-x-9', '-translate-x-12', 'translate-x-0', 'translate-x-9', 'translate-x-12'];

    return (
      <div className="space-y-5 pb-20">
        {/* KURS TANLASH PILL */}
        <div className={`grid grid-cols-2 gap-2 p-1.5 rounded-2xl ${theme.card} border`}>
          <button 
            onClick={() => switchLanguage('kr')}
            className={`py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 ${
              isKr ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg' : theme.textMuted
            }`}
          >
            <span>🇰🇷</span> Korean (TOPIK)
          </button>
          <button 
            onClick={() => switchLanguage('en')}
            className={`py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 ${
              !isKr ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg' : theme.textMuted
            }`}
          >
            <span>🇬🇧</span> English (IELTS)
          </button>
        </div>

        {/* HERO DAVOM ETISH KARTASI */}
        <div className={`relative overflow-hidden rounded-3xl p-5 text-white border-b-4 shadow-xl ${
          isKr 
            ? 'bg-gradient-to-br from-rose-600 via-rose-700 to-indigo-900 border-rose-950' 
            : 'bg-gradient-to-br from-indigo-600 via-blue-700 to-slate-900 border-indigo-950'
        }`}>
          <div className="relative z-10 flex items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-white/15 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                <Sparkles size={12} /> {nextLesson.unit}
              </div>
              <h2 className="text-lg font-black leading-snug pt-1">
                {nextLesson.title}
              </h2>
              <p className="text-xs text-white/80">{nextLesson.subtitle}</p>
            </div>
            <button
              onClick={() => handleOpenLesson(nextLesson)}
              className="shrink-0 w-14 h-14 rounded-2xl bg-white text-slate-950 font-black flex items-center justify-center shadow-xl active:scale-95 transition"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        {/* KUNLIK MAQSAD & TEZKOR MASHQLAR GRID */}
        <div className="grid grid-cols-1 gap-3">
          {/* Daily Quest Progress */}
          <div className={`${theme.card} border rounded-3xl p-4 space-y-2.5`}>
            <div className="flex items-center justify-between text-xs font-black">
              <div className="flex items-center gap-2">
                <Target size={16} className="text-amber-500" />
                <span className={theme.textMain}>Kunlik Maqsad</span>
              </div>
              <span className="text-amber-500">{userProfile.dailyXp} / 100 XP</span>
            </div>
            <div className="w-full h-3 bg-slate-800/40 rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${dailyGoalPercent}%` }}
              />
            </div>
          </div>

          {/* 3 ta Tezkor Mashq tugmasi */}
          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`${theme.card} border hover:border-emerald-500/50 rounded-2xl p-3 text-left space-y-1.5 transition active:scale-95`}
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                <Layers size={18} />
              </div>
              <div className={`text-xs font-black ${theme.textMain}`}>Kartochka</div>
              <div className="text-[10px] text-slate-400">{allWords.length} ta so‘z</div>
            </button>

            <button
              onClick={() => setActiveTab('ai_tutor')}
              className={`${theme.card} border hover:border-indigo-500/50 rounded-2xl p-3 text-left space-y-1.5 transition active:scale-95`}
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
                <Bot size={18} />
              </div>
              <div className={`text-xs font-black ${theme.textMain}`}>AI Suhbat</div>
              <div className="text-[10px] text-slate-400">Jonli dialog</div>
            </button>

            <button
              onClick={() => speakText(allWords[Math.floor(Math.random() * allWords.length)]?.sound || "안녕하세요")}
              className={`${theme.card} border hover:border-amber-500/50 rounded-2xl p-3 text-left space-y-1.5 transition active:scale-95`}
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
                <Headphones size={18} />
              </div>
              <div className={`text-xs font-black ${theme.textMain}`}>Audio Mashq</div>
              <div className="text-[10px] text-slate-400">Talaffuz</div>
            </button>
          </div>
        </div>

        {/* S-SHAKLIDAGI 3D DARSLAR YO‘LAGI */}
        <div className={`${theme.card} border rounded-3xl p-5`}>
          <div className="flex items-center justify-between mb-6">
            <span className={`text-xs font-black uppercase tracking-wider ${theme.textMain}`}>
              O‘quv Yo‘lagi ({userProfile.completedLessons.length}/{currentRoadmap.length})
            </span>
            <span className="text-[11px] font-bold text-emerald-500">Bosqichma-bosqich</span>
          </div>

          <div className="relative py-4 flex flex-col items-center space-y-11">
            {currentRoadmap.map((lesson, idx) => {
              const status = getLessonStatus(lesson, idx);
              const offsetClass = offsets[idx % offsets.length];
              const isLocked = status === 'locked';

              return (
                <div key={lesson.id} className={`relative flex flex-col items-center ${offsetClass}`}>
                  {status === 'current' && (
                    <div className="mb-2.5 px-3.5 py-1 rounded-full bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest shadow-lg animate-bounce">
                      Boshlash!
                    </div>
                  )}

                  <button
                    onClick={() => handleOpenLesson(lesson)}
                    className={`w-20 h-20 rounded-full border-b-8 flex items-center justify-center text-3xl shadow-2xl transition-all active:translate-y-1 active:border-b-2 relative ${
                      isLocked
                        ? 'bg-slate-800 border-slate-950 text-slate-600'
                        : `bg-gradient-to-b ${lesson.color} text-white`
                    }`}
                  >
                    <span>{isLocked ? '🔒' : status === 'completed' ? '👑' : lesson.icon}</span>
                    {lesson.isPro && !userProfile.isPro && (
                      <span className="absolute -top-1 -right-2 bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full shadow">
                        PRO
                      </span>
                    )}
                  </button>

                  <div className="mt-2.5 text-center max-w-[180px]">
                    <div className={`text-xs font-black ${theme.textMain}`}>{lesson.title}</div>
                    <div className={`text-[10px] mt-0.5 ${theme.textMuted}`}>{lesson.subtitle}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // =========================================================================
  // 2. INTERAKTIV FLASHCARDS (SO‘Z YODLASH KARTOCHKALARI)
  // =========================================================================
  const renderFlashcards = () => {
    const card = allWords[flashcardIndex % allWords.length];
    return (
      <div className="space-y-5 pb-20">
        <div className="flex items-center justify-between">
          <h2 className={`text-lg font-black ${theme.textMain}`}>Aqlli Lug‘at Kartochkalari</h2>
          <span className="text-xs font-black text-indigo-400">
            {(flashcardIndex % allWords.length) + 1} / {allWords.length}
          </span>
        </div>

        <div
          onClick={() => {
            setIsCardFlipped(!isCardFlipped);
            speakText(card.sound);
          }}
          className={`${theme.card} border-2 border-b-8 rounded-3xl p-8 min-h-[270px] flex flex-col items-center justify-center text-center cursor-pointer transition-all active:scale-98 space-y-4`}
        >
          <span className="px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-400 text-[10px] font-black uppercase">
            {isCardFlipped ? 'Tarjima va Misol' : 'Kartochkani bosing (Aylantirish)'}
          </span>

          {!isCardFlipped ? (
            <>
              <div className={`text-4xl font-black ${theme.textMain}`}>{card.word}</div>
              <button
                onClick={(e) => { e.stopPropagation(); speakText(card.sound); }}
                className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-500"
              >
                <Volume2 size={24} />
              </button>
            </>
          ) : (
            <>
              <div className="text-2xl font-black text-emerald-400">{card.meaning}</div>
              <p className={`text-xs ${theme.textMuted} italic`}>"{card.ex}"</p>
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              setIsCardFlipped(false);
              setFlashcardIndex(prev => (prev - 1 + allWords.length) % allWords.length);
            }}
            className={`py-3.5 rounded-2xl ${theme.card} border-2 font-black text-xs`}
          >
            ← Oldingi so‘z
          </button>
          <button
            onClick={() => {
              setIsCardFlipped(false);
              setFlashcardIndex(prev => (prev + 1) % allWords.length);
              setUserProfile(prev => ({ ...prev, xp: prev.xp + 5, dailyXp: prev.dailyXp + 5 }));
            }}
            className="py-3.5 rounded-2xl bg-emerald-500 border-b-4 border-emerald-700 text-white font-black text-xs"
          >
            Yodladim (+5 XP) →
          </button>
        </div>
      </div>
    );
  };

  // =========================================================================
  // 3. JONLI AI USTOZ (AI TUTOR CHAT)
  // =========================================================================
  const renderAiTutor = () => (
    <div className="flex flex-col h-[76vh] pb-14">
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center">
            <Bot size={22} />
          </div>
          <div>
            <h2 className={`text-sm font-black ${theme.textMain}`}>Ziyo AI Ustoz</h2>
            <span className="text-[10px] font-bold text-emerald-500">● Online • Audio yordamchi</span>
          </div>
        </div>
      </div>

      {/* Tezkor mavzular */}
      <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar">
        {['☕ Kafeda buyurtma', '🔤 Batchim qoidasi', '🎓 IELTS Speaking'].map(topic => (
          <button
            key={topic}
            onClick={() => handleSendAiMessage(topic)}
            className={`shrink-0 px-3 py-1.5 rounded-full ${theme.card} border text-[11px] font-bold text-indigo-400`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Chat xabarlari */}
      <div className={`flex-1 overflow-y-auto ${theme.card} border rounded-3xl p-4 space-y-3`}>
        {aiMessages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              onClick={() => m.role === 'ai' && speakText(m.text)}
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs space-y-1 cursor-pointer ${
                m.role === 'user'
                  ? 'bg-indigo-600 text-white font-bold'
                  : `${theme.subCard} ${theme.textMain}`
              }`}
            >
              <div className="font-bold leading-relaxed">{m.text}</div>
              {m.trans && <div className="text-[11px] opacity-75">{m.trans}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Yozish maydoni */}
      <div className="pt-3 flex gap-2">
        <input
          type="text"
          placeholder="Savol bering yoki koreyscha yozing..."
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendAiMessage()}
          className={`flex-1 ${theme.inputBg} border-2 rounded-2xl px-4 py-3 text-xs font-bold outline-none`}
        />
        <button
          onClick={() => handleSendAiMessage()}
          className="px-4 rounded-2xl bg-indigo-600 text-white font-black flex items-center justify-center"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );

  // =========================================================================
  // 4. REYTING (LEADERBOARD LIGA)
  // =========================================================================
  const renderLeaderboard = () => {
    const players = [
      { name: 'Kim Min-ji 🇰🇷', xp: 1420, badge: '🥇' },
      { name: `${userProfile.name} (Siz)`, xp: userProfile.xp, badge: '🥈', isMe: true },
      { name: 'Sardorbek 🇺🇿', xp: 840, badge: '🥉' },
      { name: 'Fariza 🎓', xp: 790, badge: '4' },
      { name: 'Lee Jun-ho 🇰🇷', xp: 650, badge: '5' }
    ].sort((a, b) => b.xp - a.xp);

    return (
      <div className="space-y-4 pb-20">
        <div className="rounded-3xl p-5 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-xl">
          <div className="flex items-center gap-3">
            <Trophy size={32} />
            <div>
              <h2 className="font-black text-lg">Olmos Ligasi (Top 5)</h2>
              <p className="text-xs font-bold opacity-85">Haftalik XP reytingida 1-o‘ringa chiqing!</p>
            </div>
          </div>
        </div>

        <div className={`${theme.card} border rounded-3xl divide-y divide-slate-800/40`}>
          {players.map((p, idx) => (
            <div
              key={p.name}
              className={`p-4 flex items-center justify-between ${p.isMe ? 'bg-indigo-500/15' : ''}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 text-center font-black text-sm">{idx + 1}</span>
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
                  {p.name.charAt(0)}
                </div>
                <span className={`text-xs font-black ${theme.textMain}`}>{p.name}</span>
              </div>
              <span className="text-xs font-black text-amber-500">{p.xp} XP</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // =========================================================================
  // 5. DARS ICHIDAGI 4 BOSQICHLI MASHG‘ULOT
  // =========================================================================
  const renderLessonDetail = () => {
    if (!activeLesson) return null;
    const currentQuiz = activeLesson.quizzes[quizIndex] || activeLesson.quizzes[0];

    return (
      <div className="space-y-5 pb-20">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/40">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-1.5 text-xs text-indigo-400 font-black ${theme.subCard} border px-3 py-2 rounded-xl`}
          >
            <ArrowLeft size={16} /> Yo‘lakka qaytish
          </button>
          <div className="flex items-center gap-1 text-rose-500 font-black text-xs">
            <Heart size={16} className="fill-rose-500" /> {userProfile.isPro ? '∞' : userProfile.hearts}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1.5 text-xs font-black">
          {['theory', 'vocab', 'dialogue', 'quiz'].map((step, i) => {
            const labels = ['Nazariya', `Lug‘at (${activeLesson.words.length})`, 'Dialog', `Test (${activeLesson.quizzes.length})`];
            return (
              <button
                key={step}
                onClick={() => setLessonStep(step)}
                className={`py-2.5 rounded-xl transition ${
                  lessonStep === step ? 'bg-emerald-500 text-white border-b-2 border-emerald-700' : `${theme.subCard} ${theme.textMuted}`
                }`}
              >
                {labels[i]}
              </button>
            );
          })}
        </div>

        {lessonStep === 'theory' && (
          <div className={`${theme.card} border-2 rounded-3xl p-5 space-y-4`}>
            <h3 className={`font-black text-lg ${theme.textMain}`}>{activeLesson.title}</h3>
            <div className={`text-xs leading-relaxed ${theme.subCard} p-4 rounded-2xl border whitespace-pre-line ${theme.textMain}`}>
              {activeLesson.theory}
            </div>
            <button 
              onClick={() => setLessonStep('vocab')}
              className="w-full py-3.5 bg-emerald-500 border-b-4 border-emerald-700 text-white font-black rounded-2xl text-xs uppercase"
            >
              Lug‘atlarni o‘rganish →
            </button>
          </div>
        )}

        {lessonStep === 'vocab' && (
          <div className="space-y-3">
            {activeLesson.words.map((w, idx) => (
              <div 
                key={idx}
                onClick={() => speakText(w.sound)}
                className={`${theme.card} border-2 rounded-2xl p-4 cursor-pointer hover:border-indigo-500 transition flex items-center justify-between`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-400">
                    <Volume2 size={20} />
                  </div>
                  <div>
                    <div className={`text-base font-black ${theme.textMain}`}>{w.word}</div>
                    <div className={`text-xs ${theme.textMuted}`}>{w.meaning}</div>
                    <div className="text-[11px] text-indigo-400 mt-0.5">{w.ex}</div>
                  </div>
                </div>
                <span className="text-xs font-bold">🔊</span>
              </div>
            ))}
            <button 
              onClick={() => setLessonStep('dialogue')}
              className="w-full py-3.5 bg-emerald-500 border-b-4 border-emerald-700 text-white font-black rounded-2xl text-xs uppercase"
            >
              Jonli dialogga o‘tish →
            </button>
          </div>
        )}

        {lessonStep === 'dialogue' && (
          <div className={`${theme.card} border-2 rounded-3xl p-5 space-y-3`}>
            {activeLesson.dialogue.map((d, idx) => (
              <div 
                key={idx}
                onClick={() => speakText(d.text)}
                className={`p-3.5 rounded-2xl ${theme.subCard} border cursor-pointer space-y-1`}
              >
                <div className="flex justify-between text-xs font-black text-indigo-400">
                  <span>{d.speaker}</span>
                  <Volume2 size={15} />
                </div>
                <div className={`text-sm font-bold ${theme.textMain}`}>{d.text}</div>
                <div className={`text-[11px] ${theme.textMuted}`}>{d.trans}</div>
              </div>
            ))}
            <button 
              onClick={() => setLessonStep('quiz')}
              className="w-full py-3.5 bg-emerald-500 border-b-4 border-emerald-700 text-white font-black rounded-2xl text-xs uppercase"
            >
              Yakuniy testga o‘tish →
            </button>
          </div>
        )}

        {lessonStep === 'quiz' && (
          <div className={`${theme.card} border-2 rounded-3xl p-5 space-y-4`}>
            <div className="flex justify-between text-[11px] font-black text-indigo-400 uppercase">
              <span>Savol {quizIndex + 1} / {activeLesson.quizzes.length}</span>
              <span>+60 XP</span>
            </div>
            <h4 className={`font-black text-base ${theme.textMain}`}>{currentQuiz.question}</h4>
            <div className="space-y-2">
              {currentQuiz.options.map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => {
                    setQuizAnswer(i);
                    if (i !== currentQuiz.correct && !userProfile.isPro) {
                      setUserProfile(prev => ({ ...prev, hearts: Math.max(0, prev.hearts - 1) }));
                    }
                  }}
                  className={`w-full py-3.5 px-4 rounded-2xl text-left border-2 text-xs font-bold transition ${
                    quizAnswer === i 
                      ? i === currentQuiz.correct
                        ? 'bg-emerald-500 text-white border-emerald-700'
                        : 'bg-rose-500 text-white border-rose-700'
                      : `${theme.subCard} ${theme.textMain}`
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {quizAnswer !== null && (
              <div className={`p-3.5 rounded-2xl text-xs font-bold ${
                quizAnswer === currentQuiz.correct ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
              }`}>
                {quizAnswer === currentQuiz.correct ? "To‘g‘ri! 🎉" : "Xato! 1 ta yurak kamaydi 💔"}
                <p className={`font-normal mt-1 ${theme.textMuted}`}>{currentQuiz.explanation}</p>
              </div>
            )}

            <button 
              onClick={() => {
                if (quizAnswer !== currentQuiz.correct) {
                  alert("To‘g‘ri javobni belgilang!");
                  return;
                }
                if (quizIndex + 1 < activeLesson.quizzes.length) {
                  setQuizIndex(quizIndex + 1);
                  setQuizAnswer(null);
                } else {
                  setUserProfile(prev => ({
                    ...prev,
                    xp: prev.xp + 60,
                    dailyXp: prev.dailyXp + 60,
                    completedLessons: [...new Set([...(prev.completedLessons || []), activeLesson.id])]
                  }));
                  setActiveTab('home');
                }
              }}
              className="w-full py-3.5 bg-indigo-600 border-b-4 border-indigo-800 text-white font-black rounded-2xl text-xs uppercase"
            >
              {quizIndex + 1 < activeLesson.quizzes.length ? 'Keyingi savol →' : 'Darsni yakunlash (+60 XP)'}
            </button>
          </div>
        )}
      </div>
    );
  };

  // =========================================================================
  // ASOSIY SHELL
  // =========================================================================
  return (
    <div className={`min-h-screen w-full ${theme.bg} flex flex-col font-sans select-none transition-colors`}>
      {/* TOP STATS BAR */}
      <header className={`sticky top-0 z-40 ${theme.header} px-4 py-3 backdrop-blur-xl`}>
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button onClick={() => setIsSidebarOpen(true)} className={`p-2 rounded-xl ${theme.subCard} border`}>
            <Menu size={19} />
          </button>

          <div className="flex items-center gap-3.5 text-xs font-black">
            <div className="flex items-center gap-1 text-amber-500">
              <Flame size={18} className="fill-amber-500" />
              <span>{userProfile.streak}</span>
            </div>
            <div className="flex items-center gap-1 text-sky-400">
              <Zap size={18} className="fill-sky-400" />
              <span>{userProfile.xp}</span>
            </div>
            <div className="flex items-center gap-1 text-rose-500">
              <Heart size={18} className="fill-rose-500" />
              <span>{userProfile.isPro ? '∞' : userProfile.hearts}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className={`p-2 rounded-xl ${theme.subCard} border`}>
              {isDarkMode ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-indigo-600" />}
            </button>
            <button onClick={handleLogout} title="Chiqish" className="p-2 rounded-xl bg-rose-500/15 text-rose-500">
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </header>

      {/* SIDEBAR */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/75 backdrop-blur-sm" />
          <div className={`relative w-72 ${isDarkMode ? 'bg-[#111827]' : 'bg-white'} p-5 flex flex-col justify-between z-10`}>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className={`font-black text-base ${theme.textMain}`}>ZiyoPrep Academy</span>
                <button onClick={() => setIsSidebarOpen(false)}><X size={20} /></button>
              </div>
              <div className={`p-3.5 rounded-2xl ${theme.subCard} border`}>
                <div className={`font-black text-sm ${theme.textMain}`}>{userProfile.name}</div>
                <div className="text-[11px] text-slate-400">{currentUser.email}</div>
              </div>
              <button
                onClick={() => { setIsSidebarOpen(false); setIsPaywallOpen(true); }}
                className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs flex items-center gap-2"
              >
                <Crown size={18} /> Super ZiyoPrep PRO
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-2xl bg-rose-500/15 text-rose-500 font-black text-xs flex items-center justify-center gap-2"
            >
              <LogOut size={16} /> Akkauntdan chiqish
            </button>
          </div>
        </div>
      )}

      {/* PRO PAYWALL */}
      {isPaywallOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsPaywallOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />
          <div className={`relative w-full max-w-sm ${theme.card} border-2 rounded-3xl p-6 text-center space-y-4 z-10`}>
            <button onClick={() => setIsPaywallOpen(false)} className="absolute top-4 right-4"><X size={20} /></button>
            <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500 flex items-center justify-center text-white">
              <Crown size={32} />
            </div>
            <h3 className={`font-black text-xl ${theme.textMain}`}>Super ZiyoPrep PRO</h3>
            <p className={`text-xs ${theme.textMuted}`}>Cheksiz yuraklar (∞) va barcha EPS-TOPIK / IELTS maxsus darslari!</p>
            <button
              onClick={() => {
                setUserProfile(prev => ({ ...prev, isPro: true, hearts: 5 }));
                setIsPaywallOpen(false);
                alert("PRO faollashtirildi! 🎉");
              }}
              className="w-full py-3.5 rounded-2xl bg-emerald-500 border-b-4 border-emerald-700 text-white font-black text-xs uppercase"
            >
              PRO ni Faollashtirish
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full max-w-md mx-auto p-4 pb-28">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'flashcards' && renderFlashcards()}
        {activeTab === 'ai_tutor' && renderAiTutor()}
        {activeTab === 'leaderboard' && renderLeaderboard()}
        {activeTab === 'lesson_detail' && renderLessonDetail()}
      </main>

      {/* BOTTOM NAVIGATION (5 TA ASOSIY BO‘LIM) */}
      <nav className={`fixed bottom-0 inset-x-0 z-40 ${theme.navBg} px-2 py-2.5 backdrop-blur-xl`}>
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-emerald-500' : theme.textMuted}`}>
            <Compass size={23} />
            <span className="text-[10px] font-black mt-1">Yo‘lak</span>
          </button>

          <button onClick={() => setActiveTab('flashcards')} className={`flex flex-col items-center ${activeTab === 'flashcards' ? 'text-emerald-500' : theme.textMuted}`}>
            <Layers size={23} />
            <span className="text-[10px] font-black mt-1">Lug‘at</span>
          </button>

          <button
            onClick={() => setActiveTab('ai_tutor')}
            className="-mt-7 w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 border-b-4 border-indigo-900 text-white flex items-center justify-center shadow-xl active:translate-y-0.5"
          >
            <Bot size={27} />
          </button>

          <button onClick={() => setActiveTab('leaderboard')} className={`flex flex-col items-center ${activeTab === 'leaderboard' ? 'text-amber-500' : theme.textMuted}`}>
            <Trophy size={23} />
            <span className="text-[10px] font-black mt-1">Reyting</span>
          </button>

          <button onClick={() => { setEditForm(userProfile); setIsEditingProfile(true); }} className={`flex flex-col items-center ${theme.textMuted}`}>
            <User size={23} />
            <span className="text-[10px] font-black mt-1">Profil</span>
          </button>
        </div>
      </nav>

      {/* PROFIL MODAL */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${theme.card} border-2 rounded-3xl p-6 w-full max-w-sm space-y-4`}>
            <h3 className={`font-black text-base ${theme.textMain}`}>Shaxsiy Profil</h3>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" />
            <div className="flex items-center gap-3">
              {editForm.photoBase64 ? (
                <img src={editForm.photoBase64} alt="Avatar" className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-indigo-600/20 flex items-center justify-center font-black text-indigo-400">
                  {editForm.name?.charAt(0) || 'T'}
                </div>
              )}
              <button onClick={() => fileInputRef.current?.click()} className="px-3 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5">
                <Upload size={14} /> Rasm tanlash
              </button>
            </div>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className={`w-full ${theme.inputBg} border-2 rounded-xl px-3.5 py-2.5 text-xs font-bold`}
            />
            <div className="flex gap-2">
              <button onClick={() => setIsEditingProfile(false)} className={`flex-1 py-2.5 ${theme.subCard} rounded-xl text-xs font-bold`}>Yopish</button>
              <button onClick={() => { setUserProfile(editForm); setIsEditingProfile(false); }} className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-black">Saqlash</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
