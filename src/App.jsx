import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, Bot, User, Volume2, ArrowLeft, 
  Sun, Moon, ArrowRight, Menu, GraduationCap, 
  X, Crown, Flame, Heart, Zap, Mail, KeyRound, 
  LogOut, Upload, Award, Sparkles
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
  // --- 1. AUTENTIFIKATSIYA (LOGIN / REGISTER / GOOGLE) ---
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('fariza_auth_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authMode, setAuthMode] = useState('welcome'); // 'welcome' | 'login' | 'register'
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Firebase Auth holatini kuzatish
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

  // Google orqali kirish
  const handleGoogleLogin = async () => {
    setAuthError('');
    setAuthLoading(true);
    try {
      if (auth && googleProvider) {
        await signInWithPopup(auth, googleProvider);
      } else {
        await new Promise(r => setTimeout(r, 500));
        const demoUser = {
          uid: 'google_demo_user',
          name: 'Tokhirbek Yuldashev',
          email: 'tokhirbek@gmail.com',
          photoURL: ''
        };
        setCurrentUser(demoUser);
        localStorage.setItem('fariza_auth_user', JSON.stringify(demoUser));
        setUserProfile(prev => ({ ...prev, name: demoUser.name }));
      }
    } catch (err) {
      if (err.code === 'auth/unauthorized-domain') {
        setAuthError("Domen ruxsat etilmagan! Firebase Console -> Authentication -> Settings -> Authorized domains bo‘limiga ziyoprep-sepia.vercel.app ni qo‘shing.");
      } else if (err.code === 'auth/popup-closed-by-user') {
        setAuthError("Google oynasi yopildi. Qaytadan urinib ko‘ring.");
      } else {
        setAuthError("Google xatoligi: " + (err.code || err.message));
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // Email va Parol orqali kirish / ro'yxatdan o'tish
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (!authForm.email.trim() || !authForm.password.trim()) {
      setAuthError("Email va parolni to‘liq kiriting!");
      return;
    }
    if (authMode === 'register' && !authForm.name.trim()) {
      setAuthError("Ismingizni kiriting!");
      return;
    }

    setAuthLoading(true);
    try {
      if (auth) {
        if (authMode === 'register') {
          const res = await createUserWithEmailAndPassword(auth, authForm.email.trim(), authForm.password);
          await updateProfile(res.user, { displayName: authForm.name.trim() });
          const userObj = {
            uid: res.user.uid,
            name: authForm.name.trim(),
            email: res.user.email,
            photoURL: ''
          };
          setCurrentUser(userObj);
          localStorage.setItem('fariza_auth_user', JSON.stringify(userObj));
          setUserProfile(prev => ({ ...prev, name: authForm.name.trim() }));
        } else {
          await signInWithEmailAndPassword(auth, authForm.email.trim(), authForm.password);
        }
      } else {
        await new Promise(r => setTimeout(r, 400));
        const localUser = {
          uid: 'local_' + Date.now(),
          name: authMode === 'register' ? authForm.name.trim() : authForm.email.split('@')[0],
          email: authForm.email.trim(),
          photoURL: ''
        };
        setCurrentUser(localUser);
        localStorage.setItem('fariza_auth_user', JSON.stringify(localUser));
        setUserProfile(prev => ({ ...prev, name: localUser.name }));
      }
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setAuthError("Bu email allaqachon ro‘yxatdan o‘tgan! Pastdan 'Tizimga kiring' tugmasini bosing.");
      } else if (err.code === 'auth/weak-password') {
        setAuthError("Parol kamida 6 ta belgidan iborat bo‘lishi kerak.");
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setAuthError("Email yoki parol noto‘g‘ri. Qaytadan tekshiring.");
      } else {
        setAuthError("Xatolik: " + (err.code || err.message));
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // Tizimdan chiqish
  const handleLogout = async () => {
    if (auth) {
      try {
        await signOut(auth);
      } catch (e) {}
    }
    localStorage.removeItem('fariza_auth_user');
    setCurrentUser(null);
    setAuthMode('welcome');
    setIsSidebarOpen(false);
  };

  // --- 2. TIL VA MAVZU SOZLAMALARI ---
  const [selectedLanguage, setSelectedLanguage] = useState(() => localStorage.getItem('fariza_lang') || 'kr');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('fariza_theme');
    return saved !== null ? saved === 'dark' : true;
  });

  const switchLanguage = (lang) => {
    setSelectedLanguage(lang);
    localStorage.setItem('fariza_lang', lang);
    setActiveTab('home');
    setIsSidebarOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('fariza_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // --- 3. FOYDALANUVCHI PROFILI & GAMIFICATION ---
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('fariza_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          name: parsed.name || 'Tokhirbek',
          photoBase64: parsed.photoBase64 || '',
          streak: parsed.streak ?? 5,
          xp: parsed.xp ?? 890,
          hearts: parsed.hearts ?? 5,
          isPro: parsed.isPro || false,
          completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [1, 101]
        };
      } catch (e) {}
    }
    return {
      name: 'Tokhirbek',
      photoBase64: '',
      streak: 5,
      xp: 890,
      hearts: 5,
      isPro: false,
      completedLessons: [1, 101]
    };
  });

  useEffect(() => {
    localStorage.setItem('fariza_user', JSON.stringify(userProfile));
  }, [userProfile]);

  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);
  const [lessonStep, setLessonStep] = useState('theory');
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState(userProfile);
  const fileInputRef = useRef(null);

  // --- 4. AUDIOTALAFFUZ ---
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
    if (file.size > 3 * 1024 * 1024) {
      alert("Rasm hajmi 3MB dan oshmasligi kerak.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditForm(prev => ({ ...prev, photoBase64: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // --- 5. DARSLIKLAR BAZASI ---
  const professionalLessons = {
    kr: [
      {
        id: 1,
        unit: "1-BO‘LIM • ASOSLAR",
        title: "1-dars: Hangul Fonetikasi",
        subtitle: "Unlilar, undoshlar va bo‘g‘in arxitekturasi",
        isPro: false,
        icon: "👑",
        color: "bg-emerald-500 border-emerald-700",
        theory: `Hangul 1443-yilda Qirol Sejong tomonidan yaratilgan ilmiy alifbodir.\nU 14 ta asosiy undosh (ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅅ, ㅇ, ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ) va 10 ta asosiy unlidan (ㅏ, ㅑ, ㅓ, ㅕ, ㅗ, ㅛ, ㅜ, ㅠ, ㅡ, ㅣ) tashkil topgan.\n\nHar bir bo‘g‘in kamida bitta undosh va bitta unlidan iborat bo‘ladi. Unli bilan boshlanuvchi so‘z oldiga jim 'ㅇ' harfi qo‘yiladi (Masalan: 아, 오, 우).`,
        words: [
          { word: "한글", meaning: "Hangul (Koreys alifbosi)", sound: "한글", ex: "한글은 배우기 쉬워요" },
          { word: "아이", meaning: "Bola / Go‘dak", sound: "아이", ex: "아이가 웃고 있어요" },
          { word: "우유", meaning: "Sut", sound: "우유", ex: "따뜻한 우유를 마셔요" },
          { word: "모자", meaning: "Bosh kiyim", sound: "모자", ex: "모자를 쓰고 나가요" }
        ],
        dialogue: [
          { speaker: "선생님", text: "안녕하세요! 오늘부터 한글을 공부합니다.", trans: "Assalomu alaykum! Bugundan Hangulni o‘rganamiz." },
          { speaker: "토히르벡", text: "네, 선생님! 열심히 배우겠습니다.", trans: "Xo‘p, ustoz! Astoydil o‘rganaman." }
        ],
        quiz: {
          question: "So‘z unli tovushdan boshlanganda birinchi harf sifatida nima yoziladi?",
          options: ["① ㄱ", "② ㄴ", "③ ㅇ (Talaffuzsiz jim harf)", "④ ㄹ"],
          correct: 2,
          explanation: "Unli harf yolg'iz yozilmaydi, uning boshiga doim 'ㅇ' jim harfi qo‘yiladi (masalan: 아, 어, 오)."
        }
      },
      {
        id: 2,
        unit: "1-BO‘LIM • ASOSLAR",
        title: "2-dars: Bo‘g‘in & Batchim (받침)",
        subtitle: "Pastki undoshlar va fonetik o‘zgarishlar",
        isPro: false,
        icon: "⭐",
        color: "bg-indigo-500 border-indigo-700",
        theory: `Bo‘g‘in tagida keladigan undosh 'Batchim' (받침) deb ataladi.\nLiaison (Ulanish qoidasi): Agar batchimdan keyin unli bilan boshlanuvchi bo‘g‘in kelsa, batchimdagi undosh keyingi bo‘g‘inga ko‘chib o‘qiladi.\nMasalan: 한국어 -> [한구거] deb talaffuz qilinadi.`,
        words: [
          { word: "받침", meaning: "Pastki undosh (Batchim)", sound: "받침", ex: "받침 발음에 주의하세요" },
          { word: "한국어", meaning: "Koreys tili", sound: "한국어", ex: "한국어를 매일 연습해요" },
          { word: "책상", meaning: "Yozuv stoli", sound: "책상", ex: "책상 위에 책이 있어요" },
          { word: "음식", meaning: "Taom / Ovqat", sound: "음식", ex: "한국 음식이 맛있어요" }
        ],
        dialogue: [
          { speaker: "지민", text: "한국어 발음이 어렵지 않아요?", trans: "Koreyscha talaffuz qiyin emasmi?" },
          { speaker: "토히르벡", text: "조금 어렵지만 받침 규칙을 배우니까 쉬워졌어요.", trans: "Biroz qiyin, lekin batchim qoidalarini o‘rgangach osonlashdi." }
        ],
        quiz: {
          question: "'한국어' (Koreys tili) so‘zining to‘g‘ri fonetik talaffuzi qaysi?",
          options: ["① [한국어]", "② [한구거]", "③ [한쿡어]", "④ [하누거]"],
          correct: 1,
          explanation: "Batchimdagi 'ㄱ' unli oldida keyingi bo‘g‘inga o‘tib [한구거] deb ulanib o‘qiladi."
        }
      },
      {
        id: 3,
        unit: "2-BO‘LIM • GRAMMATIKA",
        title: "3-dars: Hozirgi Zamon (-아요/어요)",
        subtitle: "Fe’l va sifatlarni xushmuomala tuslash",
        isPro: false,
        icon: "📘",
        color: "bg-sky-500 border-sky-700",
        theory: `Fe’l o‘zagidagi oxirgi unli 'ㅏ' yoki 'ㅗ' bo‘lsa -> '-아요' qo‘shiladi (가다 -> 가요).\nBoshqa unlilar uchun -> '-어요' qo‘shiladi (먹다 -> 먹어요).\n'하다' bilan tugagan fe’llar -> '-해요' ga aylanadi (공부하다 -> 공부해요).`,
        words: [
          { word: "가다", meaning: "Bormoq", sound: "가다", ex: "지금 시장에 가요" },
          { word: "먹다", meaning: "Yemoq", sound: "먹다", ex: "점심을 맛있게 먹어요" },
          { word: "공부하다", meaning: "Dars qilmoq", sound: "공부하다", ex: "한국어를 공부해요" }
        ],
        dialogue: [
          { speaker: "수진", text: "토히르벡 씨, 지금 무엇을 해요?", trans: "Tokhirbek, hozir nima qilyapsiz?" },
          { speaker: "토히르벡", text: "저는 한국어 단어를 외워요.", trans: "Men koreyscha so‘zlarni yodlayapman." }
        ],
        quiz: {
          question: "'하다' (qilmoq) fe'lining hozirgi zamon shakli qanday tuslanadi?",
          options: ["① 하아요", "② 하어요", "③ 해요", "④ 합어요"],
          correct: 2,
          explanation: "'하다' bilan tugovchi barcha fe'llar hozirgi zamonda '해요' shaklini oladi."
        }
      },
      {
        id: 4,
        unit: "3-BO‘LIM • PRO DARAJA",
        title: "4-dars: EPS-TOPIK Xavfsizlik",
        subtitle: "Zavod va qurilish xavfsizlik protokollari",
        isPro: true,
        icon: "👑",
        color: "bg-amber-500 border-amber-700",
        theory: `Koreya zavodlarida xavfsizlik kaskasi (안전모) va maxsus poyabzal (안전화) kiyish majburiy.`,
        words: [
          { word: "안전모", meaning: "Himoya kaskasi", sound: "안전모", ex: "안전모를 꼭 쓰세요" },
          { word: "보안경", meaning: "Himoya ko‘zoynagi", sound: "보안경", ex: "용접할 때는 보안경을 착용합니다" }
        ],
        dialogue: [
          { speaker: "반장님", text: "작업 전에 안전모 썼어요?", trans: "Ishdan oldin kaska kiydingizmi?" },
          { speaker: "토히르벡", text: "네, 반장님! 모두 착용했습니다.", trans: "Ha, brigadir! Hammasini taqib oldim." }
        ],
        quiz: {
          question: "Ko‘zni uchqunlardan himoyalash uchun nima taqiladi?",
          options: ["① 귀마개", "② 보안경 (Himoya ko‘zoynagi)", "③ 마스크", "④ 안전벨트"],
          correct: 1,
          explanation: "Ko‘zni saqlash uchun '보안경' taqiladi."
        }
      }
    ],
    en: [
      {
        id: 101,
        unit: "UNIT 1 • IELTS 7.5+",
        title: "Lesson 1: Academic Lexicon",
        subtitle: "Paraphrasing & formal vocabulary",
        isPro: false,
        icon: "👑",
        color: "bg-emerald-500 border-emerald-700",
        theory: `To achieve IELTS Band 7.5+, replace informal phrasal verbs with precise academic verbs (e.g., 'look into' -> 'investigate').`,
        words: [
          { word: "Ubiquitous", meaning: "Hamma joyda mavjud", sound: "Ubiquitous", ex: "Smartphones are ubiquitous today." },
          { word: "Detrimental", meaning: "Zararli", sound: "Detrimental", ex: "Smoking has a detrimental effect on health." }
        ],
        dialogue: [
          { speaker: "Examiner", text: "How has technology changed communication?", trans: "Texnologiya muloqotni qanday o'zgartirdi?" },
          { speaker: "Candidate", text: "Digital devices have become ubiquitous in modern society.", trans: "Raqamli qurilmalar zamonaviy jamiyatda hamma joyda mavjud." }
        ],
        quiz: {
          question: "Which word is the formal academic synonym for 'Harmful'?",
          options: ["① Bad", "② Detrimental", "③ Terrible", "④ Painful"],
          correct: 1,
          explanation: "'Detrimental' is the precise academic term."
        }
      },
      {
        id: 102,
        unit: "UNIT 1 • IELTS 7.5+",
        title: "Lesson 2: Band 8.0 Cohesion",
        subtitle: "Linking devices & complex structures",
        isPro: false,
        icon: "⭐",
        color: "bg-indigo-500 border-indigo-700",
        theory: `Use sophisticated discourse markers such as 'Notwithstanding', 'Conversely', and 'Consequently' instead of overusing 'However' and 'So'.`,
        words: [
          { word: "Notwithstanding", meaning: "Shunga qaramasdan", sound: "Notwithstanding", ex: "Notwithstanding the challenges, the project succeeded." },
          { word: "Mitigate", meaning: "Yumshatmoq / Kamaytirmoq", sound: "Mitigate", ex: "Governments must mitigate climate change." }
        ],
        dialogue: [
          { speaker: "Examiner", text: "Can cities reduce traffic congestion?", trans: "Shaharlar tirbandlikni kamaytira oladimi?" },
          { speaker: "Candidate", text: "Expanding public transit can significantly mitigate urban congestion.", trans: "Jamoat transportini kengaytirish tirbandlikni sezilarli kamaytiradi." }
        ],
        quiz: {
          question: "Which verb means 'to make less severe or harmful'?",
          options: ["① Exacerbate", "② Mitigate", "③ Proliferate", "④ Stagnate"],
          correct: 1,
          explanation: "'Mitigate' means to reduce the severity of a problem."
        }
      }
    ]
  };

  const currentRoadmap = professionalLessons[selectedLanguage] || professionalLessons.kr;

  const getLessonStatus = (lesson, idx) => {
    if (userProfile.completedLessons?.includes(lesson.id)) return 'completed';
    if (idx === 0 || userProfile.completedLessons?.includes(currentRoadmap[idx - 1]?.id)) return 'current';
    return 'locked';
  };

  const handleOpenLesson = (lesson) => {
    if (userProfile.hearts <= 0 && !userProfile.isPro) {
      alert("Yuraklaringiz tugadi! Yuraklarni tiklash yoki cheksiz jon olish uchun PRO ga o‘ting.");
      setIsPaywallOpen(true);
      return;
    }
    if (lesson.isPro && !userProfile.isPro) {
      setIsPaywallOpen(true);
      return;
    }
    setActiveLesson(lesson);
    setLessonStep('theory');
    setQuizAnswer(null);
    setActiveTab('lesson_detail');
  };

  const theme = {
    bg: isDarkMode ? 'bg-[#0b0f19] text-slate-100' : 'bg-slate-50 text-slate-900',
    card: isDarkMode ? 'bg-[#131929] border-slate-800' : 'bg-white border-slate-200 shadow-sm',
    subCard: isDarkMode ? 'bg-[#1a2236] border-slate-700/70' : 'bg-slate-100 border-slate-200',
    header: isDarkMode ? 'bg-[#0b0f19]/95 border-b border-slate-800' : 'bg-white/95 border-b border-slate-200',
    textMain: isDarkMode ? 'text-white' : 'text-slate-900',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-slate-500',
    navBg: isDarkMode ? 'bg-[#0f1524]/95 border-t border-slate-800' : 'bg-white/95 border-t border-slate-200',
    inputBg: isDarkMode ? 'bg-[#161d30] border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
  };

  // =========================================================================
  // 0. DUOLINGO KIRISH VA RO‘YXATDAN O‘TISH EKRANI
  // =========================================================================
  if (!currentUser) {
    return (
      <div className={`min-h-screen w-full ${theme.bg} flex flex-col justify-between p-6 font-sans`}>
        <div className="max-w-md w-full mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500 border-b-4 border-emerald-700 flex items-center justify-center text-white font-black text-lg">
              F
            </div>
            <span className={`font-black text-lg tracking-tight ${theme.textMain}`}>Fariza Academy</span>
          </div>
          <button onClick={toggleTheme} className={`p-2.5 rounded-2xl ${theme.subCard} border`}>
            {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
          </button>
        </div>

        <div className="max-w-md w-full mx-auto my-auto py-6">
          {authMode === 'welcome' ? (
            <div className="text-center space-y-8">
              <div className="relative w-32 h-32 mx-auto">
                <div className="w-full h-full rounded-[36px] bg-gradient-to-tr from-emerald-500 to-teal-400 border-b-8 border-emerald-700 flex items-center justify-center shadow-2xl">
                  <span className="text-6xl">🦉</span>
                </div>
                <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg">
                  🇰🇷 & 🇬🇧
                </span>
              </div>

              <div className="space-y-2">
                <h1 className={`text-2xl font-black leading-tight ${theme.textMain}`}>
                  Koreys va Ingliz tillarini bepul, qiziqarli va samarali o‘rganing!
                </h1>
                <p className={`text-xs ${theme.textMuted} max-w-xs mx-auto leading-relaxed`}>
                  TOPIK, EPS-TOPIK hamda IELTS 7.5+ darajasiga o‘yin uslubidagi kunlik mashqlar bilan chiqing.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => { setAuthError(''); setAuthMode('register'); }}
                  className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:translate-y-0.5 border-b-4 border-emerald-700 text-white font-black text-sm tracking-wide uppercase transition shadow-lg"
                >
                  Boshlash (Akkaunt ochish)
                </button>

                <button
                  onClick={() => { setAuthError(''); setAuthMode('login'); }}
                  className={`w-full py-4 rounded-2xl ${theme.card} border-2 border-b-4 font-black text-sm text-indigo-500 tracking-wide uppercase transition active:translate-y-0.5`}
                >
                  Menda allaqachon akkaunt bor
                </button>
              </div>
            </div>
          ) : (
            <div className={`${theme.card} border-2 rounded-3xl p-6 space-y-5 shadow-xl`}>
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setAuthMode('welcome')}
                  className={`p-2 rounded-xl ${theme.subCard} ${theme.textMuted}`}
                >
                  <ArrowLeft size={18} />
                </button>
                <h2 className={`font-black text-lg ${theme.textMain}`}>
                  {authMode === 'login' ? 'Tizimga kirish' : 'Profil yaratish'}
                </h2>
                <div className="w-8" />
              </div>

              {authError && (
                <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-500 text-xs font-bold text-center leading-relaxed">
                  {authError}
                </div>
              )}

              <form onSubmit={handleEmailAuth} className="space-y-3.5">
                {authMode === 'register' && (
                  <div className="relative">
                    <User size={17} className="absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Ismingiz (masalan: Tokhirbek)"
                      value={authForm.name}
                      onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                      className={`w-full ${theme.inputBg} border-2 rounded-2xl pl-10 pr-4 py-3 text-xs font-bold outline-none focus:border-indigo-500`}
                    />
                  </div>
                )}

                <div className="relative">
                  <Mail size={17} className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Email manzilingiz"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                    className={`w-full ${theme.inputBg} border-2 rounded-2xl pl-10 pr-4 py-3 text-xs font-bold outline-none focus:border-indigo-500`}
                  />
                </div>

                <div className="relative">
                  <KeyRound size={17} className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="password"
                    placeholder="Parol (kamida 6 ta belgi)"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    className={`w-full ${theme.inputBg} border-2 rounded-2xl pl-10 pr-4 py-3 text-xs font-bold outline-none focus:border-indigo-500`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 border-b-4 border-indigo-800 text-white font-black text-xs uppercase tracking-wider transition active:translate-y-0.5"
                >
                  {authLoading ? 'Yuklanmoqda...' : authMode === 'login' ? 'Kirish' : 'Akkaunt yaratish'}
                </button>
              </form>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-700/40"></div>
                <span className="flex-shrink mx-3 text-[11px] font-bold text-slate-400 uppercase">Yoki</span>
                <div className="flex-grow border-t border-slate-700/40"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={authLoading}
                className={`w-full py-3.5 rounded-2xl ${theme.subCard} border-2 border-b-4 font-black text-xs flex items-center justify-center gap-2.5 transition active:translate-y-0.5`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"/>
                </svg>
                <span>Google bilan davom etish</span>
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => { setAuthError(''); setAuthMode(authMode === 'login' ? 'register' : 'login'); }}
                  className="text-xs font-bold text-indigo-500 hover:underline"
                >
                  {authMode === 'login' ? "Akkauntingiz yo‘qmi? Ro‘yxatdan o‘ting" : "Akkauntingiz bormi? Tizimga kiring"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-[11px] text-slate-500">
          Fariza Academy • Duolingo Style EdTech Platform
        </div>
      </div>
    );
  }

  // =========================================================================
  // 1. ASOSIY DUOLINGO USLUBIDAGI BOSH SAHIFA (S-SHAKLIDAGI YO‘LAK)
  // =========================================================================
  const renderHome = () => {
    const isKr = selectedLanguage === 'kr';
    const nextLesson = currentRoadmap.find((l, i) => getLessonStatus(l, i) === 'current') || currentRoadmap[0];
    const offsets = ['translate-x-0', '-translate-x-10', '-translate-x-14', '-translate-x-6', 'translate-x-8', 'translate-x-12'];

    return (
      <div className="space-y-6 pb-16">
        {/* UNIT BANNER */}
        <div className={`rounded-3xl p-5 text-white border-b-4 shadow-lg ${
          isKr ? 'bg-rose-600 border-rose-800' : 'bg-indigo-600 border-indigo-800'
        }`}>
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest opacity-85">
                {isKr ? 'KOREYS TILI • TOPIK & EPS' : 'INGLIZ TILI • IELTS 7.5+'}
              </span>
              <h2 className="text-lg font-black mt-0.5">
                Salom, {userProfile.name}! 👋
              </h2>
            </div>
            <button
              onClick={() => handleOpenLesson(nextLesson)}
              className="shrink-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3.5 py-2.5 rounded-2xl text-xs font-black flex items-center gap-1.5 border border-white/25 transition active:scale-95"
            >
              <span>Davom etish</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* TIL TANLASH */}
        <div className={`grid grid-cols-2 gap-2 p-1.5 rounded-2xl ${theme.subCard} border`}>
          <button 
            onClick={() => switchLanguage('kr')}
            className={`py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 ${
              isKr ? 'bg-rose-600 text-white shadow' : theme.textMuted
            }`}
          >
            <span>🇰🇷</span> Korean Course
          </button>
          <button 
            onClick={() => switchLanguage('en')}
            className={`py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 ${
              !isKr ? 'bg-indigo-600 text-white shadow' : theme.textMuted
            }`}
          >
            <span>🇬🇧</span> English Course
          </button>
        </div>

        {/* S-SHAKLIDAGI DUOLINGO YO‘LAGI */}
        <div className="relative py-6 flex flex-col items-center space-y-10">
          {currentRoadmap.map((lesson, idx) => {
            const status = getLessonStatus(lesson, idx);
            const offsetClass = offsets[idx % offsets.length];
            const isLocked = status === 'locked';

            return (
              <div key={lesson.id} className={`relative flex flex-col items-center ${offsetClass} transition-transform`}>
                {status === 'current' && (
                  <div className="mb-2 px-3.5 py-1.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-black text-[11px] uppercase tracking-wider shadow-lg animate-bounce">
                    Boshlash!
                  </div>
                )}

                <button
                  onClick={() => handleOpenLesson(lesson)}
                  className={`w-20 h-20 rounded-full border-b-8 flex items-center justify-center text-3xl shadow-xl transition-all active:translate-y-1 active:border-b-2 relative ${
                    isLocked
                      ? 'bg-slate-300 dark:bg-slate-800 border-slate-400 dark:border-slate-950 text-slate-500'
                      : `${lesson.color} text-white`
                  }`}
                >
                  <span>{isLocked ? '🔒' : status === 'completed' ? '👑' : lesson.icon}</span>
                  
                  {lesson.isPro && !userProfile.isPro && (
                    <span className="absolute -top-1 -right-2 bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full border-2 border-white dark:border-slate-900 shadow">
                      PRO
                    </span>
                  )}
                </button>

                <div className="mt-2.5 text-center max-w-[175px]">
                  <div className={`text-xs font-black leading-tight ${theme.textMain}`}>
                    {lesson.title}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${theme.textMuted}`}>
                    {lesson.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // =========================================================================
  // 2. DARS ICHIDAGI 4 BOSQICHLI MASHG‘ULOT
  // =========================================================================
  const renderLessonDetail = () => {
    if (!activeLesson) return null;

    return (
      <div className="space-y-5 pb-16">
        <div className="flex items-center justify-between pb-3 border-b border-slate-700/30">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-1.5 text-xs text-indigo-500 font-black ${theme.subCard} border px-3 py-2 rounded-xl`}
          >
            <ArrowLeft size={16} /> Yo‘lakka qaytish
          </button>
          <div className="flex items-center gap-1 text-rose-500 font-black text-xs">
            <Heart size={16} className="fill-rose-500" /> {userProfile.isPro ? '∞' : userProfile.hearts}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1.5 text-xs font-black">
          {['theory', 'vocab', 'dialogue', 'quiz'].map((step, i) => {
            const labels = ['Nazariya', `Lug‘at (${activeLesson.words.length})`, 'Dialog', 'Test'];
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
              Davom etish →
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
                  <div className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-500">
                    <Volume2 size={20} />
                  </div>
                  <div>
                    <div className={`text-base font-black ${theme.textMain}`}>{w.word}</div>
                    <div className={`text-xs ${theme.textMuted}`}>{w.meaning}</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-indigo-500">🔊</span>
              </div>
            ))}
            <button 
              onClick={() => setLessonStep('dialogue')}
              className="w-full py-3.5 bg-emerald-500 border-b-4 border-emerald-700 text-white font-black rounded-2xl text-xs uppercase"
            >
              Dialogga o‘tish →
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
                <div className="flex justify-between text-xs font-black text-indigo-500">
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
            <h4 className={`font-black text-base ${theme.textMain}`}>{activeLesson.quiz.question}</h4>
            <div className="space-y-2">
              {activeLesson.quiz.options.map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => {
                    setQuizAnswer(i);
                    if (i !== activeLesson.quiz.correct && !userProfile.isPro) {
                      setUserProfile(prev => ({ ...prev, hearts: Math.max(0, prev.hearts - 1) }));
                    }
                  }}
                  className={`w-full py-3.5 px-4 rounded-2xl text-left border-2 text-xs font-bold transition ${
                    quizAnswer === i 
                      ? i === activeLesson.quiz.correct
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
                quizAnswer === activeLesson.quiz.correct ? 'bg-emerald-500/15 text-emerald-500' : 'bg-rose-500/15 text-rose-500'
              }`}>
                {quizAnswer === activeLesson.quiz.correct ? "To‘g‘ri! +60 XP 🎉" : "Xato! 1 ta yurak kamaydi 💔"}
                <p className={`font-normal mt-1 ${theme.textMuted}`}>{activeLesson.quiz.explanation}</p>
              </div>
            )}

            <button 
              onClick={() => {
                if (quizAnswer === activeLesson.quiz.correct) {
                  setUserProfile(prev => ({
                    ...prev,
                    xp: prev.xp + 60,
                    completedLessons: [...new Set([...(prev.completedLessons || []), activeLesson.id])]
                  }));
                  setActiveTab('home');
                } else {
                  alert("To‘g‘ri javobni belgilang!");
                }
              }}
              className="w-full py-3.5 bg-indigo-600 border-b-4 border-indigo-800 text-white font-black rounded-2xl text-xs uppercase"
            >
              Darsni yakunlash
            </button>
          </div>
        )}
      </div>
    );
  };

  // =========================================================================
  // ASOSIY ILOVA INTERFEYSI
  // =========================================================================
  return (
    <div className={`min-h-screen w-full ${theme.bg} flex flex-col font-sans select-none transition-colors`}>
      
      {/* DUOLINGO TOP STATS BAR */}
      <header className={`sticky top-0 z-40 ${theme.header} px-4 py-3 backdrop-blur-xl`}>
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button onClick={() => setIsSidebarOpen(true)} className={`p-2 rounded-xl ${theme.subCard} border`}>
            <Menu size={19} />
          </button>

          <div className="flex items-center gap-3 text-xs font-black">
            <div className="flex items-center gap-1 text-amber-500">
              <Flame size={18} className="fill-amber-500" />
              <span>{userProfile.streak}</span>
            </div>
            <div className="flex items-center gap-1 text-sky-500">
              <Zap size={18} className="fill-sky-500" />
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
            <button onClick={handleLogout} title="Chiqish" className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </header>

      {/* YON MENYU (SIDEBAR) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          <div className={`relative w-72 ${isDarkMode ? 'bg-[#131929]' : 'bg-white'} p-5 flex flex-col justify-between z-10`}>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className={`font-black text-base ${theme.textMain}`}>Fariza Academy</span>
                <button onClick={() => setIsSidebarOpen(false)}><X size={20} /></button>
              </div>
              <div className={`p-3.5 rounded-2xl ${theme.subCard} border`}>
                <div className={`font-black text-sm ${theme.textMain}`}>{userProfile.name}</div>
                <div className="text-[11px] text-slate-400">{currentUser.email}</div>
              </div>
              <button
                onClick={() => { setIsSidebarOpen(false); setIsPaywallOpen(true); }}
                className="w-full p-3.5 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs flex items-center gap-2"
              >
                <Crown size={18} /> Super Fariza PRO (Cheksiz jon)
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

      {/* PRO PAYWALL MODAL */}
      {isPaywallOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsPaywallOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />
          <div className={`relative w-full max-w-sm ${theme.card} border-2 rounded-3xl p-6 text-center space-y-4 z-10`}>
            <button onClick={() => setIsPaywallOpen(false)} className="absolute top-4 right-4"><X size={20} /></button>
            <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500 flex items-center justify-center text-white">
              <Crown size={32} />
            </div>
            <h3 className={`font-black text-xl ${theme.textMain}`}>Super Fariza PRO</h3>
            <p className={`text-xs ${theme.textMuted}`}>Cheksiz yuraklar (∞) va barcha EPS-TOPIK / IELTS darslari!</p>
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

      {/* ASOSIY KONTENT */}
      <main className="flex-1 w-full max-w-md mx-auto p-4 pb-28">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'lesson_detail' && renderLessonDetail()}
      </main>

      {/* PASTKI NAVIGATSIYA */}
      <nav className={`fixed bottom-0 inset-x-0 z-40 ${theme.navBg} px-3 py-2.5 backdrop-blur-xl`}>
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-emerald-500' : theme.textMuted}`}>
            <Compass size={24} />
            <span className="text-[11px] font-black mt-1">Yo‘lak</span>
          </button>

          <button onClick={() => handleOpenLesson(currentRoadmap[0])} className={`flex flex-col items-center ${activeTab === 'lesson_detail' ? 'text-emerald-500' : theme.textMuted}`}>
            <GraduationCap size={24} />
            <span className="text-[11px] font-black mt-1">Darslar</span>
          </button>

          <button
            onClick={() => speakText(selectedLanguage === 'kr' ? "안녕하세요! 화이팅!" : "Welcome to Fariza Academy!")}
            className="-mt-7 w-14 h-14 rounded-full bg-indigo-600 border-b-4 border-indigo-800 text-white flex items-center justify-center shadow-xl active:translate-y-0.5"
          >
            <Bot size={28} />
          </button>

          <button onClick={() => setIsPaywallOpen(true)} className={`flex flex-col items-center ${theme.textMuted}`}>
            <Award size={24} />
            <span className="text-[11px] font-black mt-1">PRO</span>
          </button>

          <button onClick={() => { setEditForm(userProfile); setIsEditingProfile(true); }} className={`flex flex-col items-center ${theme.textMuted}`}>
            <User size={24} />
            <span className="text-[11px] font-black mt-1">Profil</span>
          </button>
        </div>
      </nav>

      {/* PROFIL TAHRIRLASH */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${theme.card} border-2 rounded-3xl p-6 w-full max-w-sm space-y-4`}>
            <h3 className={`font-black text-base ${theme.textMain}`}>Profil</h3>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" />
            <div className="flex items-center gap-3">
              {editForm.photoBase64 ? (
                <img src={editForm.photoBase64} alt="Avatar" className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-indigo-600/20 flex items-center justify-center font-black text-indigo-500">
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
