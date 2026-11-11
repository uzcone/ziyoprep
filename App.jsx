import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, BookOpen, Headphones, PenTool, Mic, Bot, User, 
  Play, Pause, RotateCcw, CheckCircle2, XCircle, Award, 
  Sparkles, Send, Volume2, ChevronRight, Edit3, ArrowLeft, 
  Layers, Sun, Moon, Target, TrendingUp, Clock, AlertTriangle,
  CheckSquare, Square, FileText, BarChart3, BookmarkCheck,
  Calendar, Cake, ArrowRight, Zap, RefreshCw, Camera, Upload, Check,
  Menu, Bell, ArrowUpRight, GraduationCap, Lock, Star, X, Crown, 
  CreditCard, ShieldCheck, Copy, Flame, MessageCircle, BookMarked,
  HelpCircle, Info
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
          koreanCurrentLevel: parsed.koreanCurrentLevel || '2-급',
          koreanTargetLevel: parsed.koreanTargetLevel || '4-급 (TOPIK II)',
          streak: parsed.streak || 5,
          xp: parsed.xp || 890,
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
      koreanCurrentLevel: '2-급',
      koreanTargetLevel: '4-급 (TOPIK II)',
      streak: 5,
      xp: 890,
      isPro: false,
      completedLessons: [1]
    };
  });

  useEffect(() => {
    localStorage.setItem('fariza_user', JSON.stringify(userProfile));
  }, [userProfile]);

  // Navigatsiya holatlari
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState('select');
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [activeLesson, setActiveLesson] = useState(null);
  const [lessonStep, setLessonStep] = useState('theory'); // 'theory' | 'vocab' | 'dialogue' | 'quiz'
  const [quizAnswer, setQuizAnswer] = useState(null);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState(userProfile);
  const fileInputRef = useRef(null);

  // --- 3. AUDIOTALAFFUZ TIZIMI ---
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.getVoices();
    }
  }, []);

  const speakText = (text, lang = selectedLanguage === 'kr' ? 'ko-KR' : 'en-US') => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      const clean = text.replace(/[\(\)①②③④]/g, '').trim();
      const ut = new SpeechSynthesisUtterance(clean);
      ut.lang = lang;
      ut.rate = 0.85;
      ut.volume = 1.0;
      ut.pitch = 1.0;

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

  // --- 4. PROFESSIONAL VA TO‘LIQ DARSLIKLAR BAZASI ---
  const professionalLessons = {
    kr: [
      {
        id: 1,
        title: "1-dars: Hangul Fonetikasi & Tuzilishi",
        subtitle: "Unlilar, undoshlar va bo‘g‘in arxitekturasi",
        status: "completed",
        isPro: false,
        icon: "👑",
        color: "from-emerald-500 to-green-600",
        theory: `Hangul 1443-yilda Qirol Sejong tomonidan yaratilgan dunyodagi eng ilmiy va mantiqiy alifbolardan biridir. 
U 14 ta asosiy undosh (ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅅ, ㅇ, ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ) va 10 ta asosiy unlidan (ㅏ, ㅑ, ㅓ, ㅕ, ㅗ, ㅛ, ㅜ, ㅠ, ㅡ, ㅣ) tashkil topgan.

Koreys yozuvining boshqa tillardan asosiy farqi — harflar yonma-yon emas, balki doim bo‘g‘in bloklari (음절) ichida guruhlanadi. 
Har bir bo‘g‘in kamida bitta boshlang‘ich undosh (초성) va bitta unlidan (중성) iborat bo‘lishi shart. Agar so‘z unli tovush bilan boshlansa, uning oldiga talaffuz qilinmaydigan jim 'ㅇ' (Iung) harfi qo‘yiladi (Masalan: 아, 오, 우).`,
        words: [
          { word: "한글", meaning: "Hangul (Koreys alifbosi)", sound: "한글", ex: "한글은 배우기 쉬워요 (Hangulni o‘rganish oson)" },
          { word: "자음", meaning: "Undosh tovush", sound: "자음", ex: "한국어 자음은 14개입니다 (Koreys tili undoshlari 14 ta)" },
          { word: "모음", meaning: "Unli tovush", sound: "모음", ex: "기본 모음을 연습하세요 (Asosiy unlilarni mashq qiling)" },
          { word: "아이", meaning: "Bola / Go‘dak", sound: "아이", ex: "아이가 웃고 있어요 (Bola kulyapti)" },
          { word: "우유", meaning: "Sut", sound: "우유", ex: "따뜻한 우유를 마셔요 (Iliq sut ichyapman)" },
          { word: "오이", meaning: "Bodring", sound: "오이", ex: "신선한 오이를 샀어요 (Yangi bodring sotib oldim)" },
          { word: "모자", meaning: "Bosh kiyim / Qalpoq", sound: "모자", ex: "모자를 쓰고 나가요 (Qalpoq kiyib chiqyapti)" }
        ],
        dialogue: [
          { speaker: "선생님 (O‘qituvchi)", text: "안녕하세요! 오늘부터 한글을 공부합니다.", trans: "Assalomu alaykum! Bugundan Hangulni o‘rganamiz." },
          { speaker: "토히르벡 (O‘quvchi)", text: "네, 선생님! 열심히 배우겠습니다.", trans: "Xo‘p, ustoz! Astoydil o‘rganaman." },
          { speaker: "선생님 (O‘qituvchi)", text: "먼저 모음 '아, 야, 어, 여'를 따라 읽으세요.", trans: "Avval 'A, Ya, O, Yo' unlilarini ortimdan takrorlang." }
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
        title: "2-dars: Bo‘g‘in Birlashtirish & Batchim (받침)",
        subtitle: "Pastki undoshlar va fonetik o‘zgarishlar",
        status: "current",
        isPro: false,
        icon: "⭐",
        color: "from-indigo-500 via-purple-500 to-pink-500",
        theory: `Koreys tilida bo‘g‘in tagida keladigan undosh 'Batchim' (받침) deb ataladi. Batchim koreyscha so‘zlarning aniq talaffuzini belgilovchi eng muhim qismdir.
Batchimda 27 xil harf yoki harflar birikmasi kelishi mumkin, ammo ular talaffuzda atigi 7 ta asosiy tovushga keltiriladi:
1. [ㄱ] — ㄱ, ㅋ, ㄲ
2. [ㄴ] — ㄴ
3. [ㄷ] — ㄷ, ㅅ, ㅈ, ㅊ, ㅌ, ㅎ, ㅆ
4. [ㄹ] — ㄹ
5. [ㅁ] — ㅁ
6. [ㅂ] — ㅂ, ㅍ
7. [ㅇ] — ㅇ (bo‘g‘in oxirida 'ng' tovushi)

Liaison (Ulanish qoidasi): Agar batchimdan keyin unli bilan boshlanuvchi bo‘g‘in kelsa, batchimdagi undosh keyingi bo‘g‘inga ko‘chib o‘qiladi. Masalan: 한국어 -> [한구거] deb talaffuz qilinadi.`,
        words: [
          { word: "받침", meaning: "Pastki undosh (Batchim)", sound: "받침", ex: "받침 발음에 주의하세요 (Batchim talaffuziga diqqat qiling)" },
          { word: "한국어", meaning: "Koreys tili", sound: "한국어", ex: "한국어를 매일 연습해요 (Koreys tilini har kuni mashq qilaman)" },
          { word: "책상", meaning: "Yozuv stoli", sound: "책상", ex: "책상 위에 책이 있어요 (Stol ustida kitob bor)" },
          { word: "선생님", meaning: "Ustoz / Muallim", sound: "선생님", ex: "선생님께 질문을 해요 (Ustozga savol beryapman)" },
          { word: "음식", meaning: "Taom / Ovqat", sound: "음식", ex: "한국 음식이 맛있어요 (Koreys taomlari juda mazali)" },
          { word: "식당", meaning: "Oshxona / Restoran", sound: "식당", ex: "근처 식당으로 갑시다 (Yaqin atrofdagi oshxonaga boraylik)" }
        ],
        dialogue: [
          { speaker: "지민 (Jimin)", text: "한국어 발음이 어렵지 않아요?", trans: "Koreyscha talaffuz qiyin emasmi?" },
          { speaker: "토히르벡 (Tokhirbek)", text: "조금 어렵지만 받침 규칙을 배우니까 쉬워졌어요.", trans: "Biroz qiyin, lekin batchim qoidalarini o‘rgangach osonlashdi." },
          { speaker: "지민 (Jimin)", text: "맞아요, '한국어'는 [한구거]로 발음하면 돼요.", trans: "To‘g‘ri, '한국어' so‘zini [Hangugeo] deb talaffuz qilsangiz kifoya." }
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
        title: "3-dars: Hozirgi Zamon (-아요/어요/해요)",
        subtitle: "Fe’l va sifatlarni xushmuomala tuslash qoidalari",
        status: "locked",
        isPro: false,
        icon: "🔒",
        color: "from-blue-600 to-indigo-700",
        theory: `Koreys tilida lug‘atdagi barcha fe’l va sifatlar '-다' bilan tugaydi (Masalan: 가다, 먹다, 공부하다). 
Muloqotda gap tuzish uchun '-다' tushirib qoldirilib, fe’l o‘zagiga hozirgi zamon qo‘shimchalari qo‘shiladi:

1. Agar fe’l o‘zagidagi oxirgi unli 'ㅏ' yoki 'ㅗ' bo‘lsa -> '-아요' qo‘shiladi:
   • 가다 (bormoq) -> 가 + 아요 = 가요 (boraman / boryapman)
   • 보다 (ko‘rmoq) -> 보 + 아요 = 봐요 (ko‘raman / ko‘ryapman)

2. Boshqa barcha unlilar ('ㅓ, ㅜ, ㅣ, ㅡ' va h.k.) uchun -> '-어요' qo‘shiladi:
   • 먹다 (yemoq) -> 먹 + 어요 = 먹어요 (yeyman / yeyapman)
   • 읽다 (o‘qimoq) -> 읽 + 어요 = 읽어요 (o‘qiyman / o‘qiyapman)

3. '하다' (qilmoq) bilan tugagan barcha fe’llar -> '-해요' ga aylanadi:
   • 공부하다 (o‘qimoq) -> 공부해요 (o‘qiyapman)
   • 일하다 (ishlamoq) -> 일해요 (ishlayapman)`,
        words: [
          { word: "가다", meaning: "Bormoq", sound: "가다", ex: "지금 시장에 가요 (Hozir bozorga boryapman)" },
          { word: "먹다", meaning: "Yemoq", sound: "먹다", ex: "점심을 맛있게 먹어요 (Tushlikni mazali yeyapman)" },
          { word: "마시다", meaning: "Ichmoq", sound: "마시다", ex: "시원한 물을 마셔요 (Salqin suv ichyapman)" },
          { word: "공부하다", meaning: "Dars qilmoq", sound: "공부하다", ex: "도서관에서 한국어를 공부해요 (Kutubxonada koreys tilini o‘rganyapman)" },
          { word: "일하다", meaning: "Ishlamoq", sound: "일하다", ex: "공장에서 열심히 일해요 (Zavodda tirishqoqlik bilan ishlayapman)" },
          { word: "쉬다", meaning: "Dam olmoq", sound: "쉬다", ex: "주말에는 집에서 쉬어요 (Dam olish kunlari uyda dam olaman)" }
        ],
        dialogue: [
          { speaker: "수진 (Sujin)", text: "토히르벡 씨, 지금 무엇을 해요?", trans: "Tokhirbek, hozir nima qilyapsiz?" },
          { speaker: "토히르벡 (Tokhirbek)", text: "저는 한국어 단어를 외워요. 수진 씨는요?", trans: "Men koreyscha so‘zlarni yodlayapman. Siz-chi, Sujin?" },
          { speaker: "수진 (Sujin)", text: "저는 친구와 커피를 마셔요.", trans: "Men do‘stim bilan kofe ichyapman." }
        ],
        quiz: {
          question: "'하다' (qilmoq) fe'lining hozirgi zamon xushmuomala shakli qanday tuslanadi?",
          options: ["① 하아요", "② 하어요", "③ 해요", "④ 합어요"],
          correct: 2,
          explanation: "'하다' bilan tugovchi barcha fe'l va birikmalar hozirgi zamonda '해요' shaklini oladi."
        }
      },
      {
        id: 4,
        title: "4-dars: EPS-TOPIK Ishlab Chiqarish & Xavfsizlik",
        subtitle: "Zavod va qurilishdagi xavfsizlik protokollari (산업 안전)",
        status: "locked",
        isPro: true,
        icon: "👑",
        color: "from-amber-500 to-orange-600",
        theory: `Janubiy Koreyadagi ishlab chiqarish korxonalarida mehnat xavfsizligi qoidalari qat'iy nazorat qilinadi. 
EPS-TOPIK imtihonida eng ko‘p uchraydigan buyruq shakli '-(으)십시오' (Hurmatli buyruq) va '-(으)면 안 됩니다' (Man etish) qoidalaridir.

Asosiy xavfsizlik qoidalari:
1. Mashinalar bilan ishlashda qo‘lqopning stanokka qisilib qolish xavfi bo‘lgani uchun maxsus rezina qoplamali vositalar qo‘llaniladi.
2. Baland joylarda ishlashda doim xavfsizlik kamari (안전대) va himoya kaskasi (안전모) taqilishi shart.
3. Favqulodda holatlarda favqulodda to‘xtatish tugmasi (비상 정지 버튼) darhol bosilishi kerak.`,
        words: [
          { word: "안전모", meaning: "Himoya kaskasi", sound: "안전모", ex: "공사장에 들어갈 때는 안전모를 꼭 쓰세요 (Qurilishga kirganda kaskani albatta kiying)" },
          { word: "안전화", meaning: "Maxsus xavfsizlik poyabzali", sound: "안전화", ex: "발을 보호하기 위해 안전화를 신습니다 (Oyoqni himoya qilish uchun maxsus etik kiyiladi)" },
          { word: "비상구", meaning: "Favqulodda chiqish eshigi", sound: "비상구", ex: "화재 시 비상구로 대피하세요 (Yong‘in bo‘lganda favqulodda eshikdan evakuatsiya bo‘ling)" },
          { word: "기계 조작", meaning: "Stanok / Uskunani boshqarish", sound: "기계 조작", ex: "기계 조작 전에 점검을 하십시오 (Stanokni yoqishdan oldin tekshirib chiqing)" },
          { word: "보안경", meaning: "Himoya ko‘zoynagi", sound: "보안경", ex: "용접할 때는 보안경을 착용합니다 (Payvandlash paytida himoya ko‘zoynagi taqiladi)" },
          { word: "소화기", meaning: "O‘t o‘chirgich", sound: "소화기", ex: "소화기의 위치를 항상 확인하세요 (O‘t o‘chirgich qayerdaligini doim tekshiring)" }
        ],
        dialogue: [
          { speaker: "반장님 (Brigadir)", text: "토히르벡 씨, 프레스 기계 작업 전에 안전모 썼어요?", trans: "Tokhirbek, press stanogida ishlashdan oldin kaska kiydingizmi?" },
          { speaker: "토히르벡 (Ishchi)", text: "네, 반장님! 안전모와 보안경 모두 착용했습니다.", trans: "Ha, brigadir! Kaska va himoya ko‘zoynagini taqib oldim." },
          { speaker: "반장님 (Brigadir)", text: "좋아요. 이상이 생기면 즉시 비상 스위치를 누르세요.", trans: "Juda yaxshi. Biror nosozlik sezilsa darhol avariya tugmasini bosing." }
        ],
        quiz: {
          question: "Payvandlash (용접) yoki chiqindilar sachrashi xavfi bo‘lganda ko‘zni himoyalash uchun nima taqiladi?",
          options: ["① 귀마개 (Quloqchin)", "② 보안경 (Himoya ko‘zoynagi)", "③ 마스크 (Oddiy niqob)", "④ 안전벨트"],
          correct: 1,
          explanation: "Ko‘zni uchqun va zararlardan saqlash uchun '보안경' (himoya ko‘zoynagi) taqiladi."
        }
      },
      {
        id: 5,
        title: "5-dars: TOPIK II 54-Insho (쓰기) Professional Standarti",
        subtitle: "700 so‘zlik akademik insho yozish metodologiyasi",
        status: "locked",
        isPro: true,
        icon: "👑",
        color: "from-purple-600 to-indigo-800",
        theory: `TOPIK II imtihonining 54-savoli talabadan 600–700 so‘zlik ijtimoiy-falsafiy insho talab qiladi (Maksimal 50 ball).
Inshoda og‘zaki uslub (해요체) qat'iyan taqiqlanadi, faqat yozma ilmiy uslub '-다 / -(으)ㄴ다 / -(느)ㄴ다' qo‘llanilishi shart.

Insho strukturasi:
1. Kirish (서론, 100-120 so‘z): Muammoning bugungi kundagi dolzarbligi va umumiy fikr.
   • Shablon: '현대 사회에서 ~에 대한 관심이 높아지고 있다' (Zamonaviy jamiyatda ...ga bo‘lgan qiziqish ortib bormoqda).
2. Asosiy qism (본론, 350-400 so‘z): Berilgan 2 yoki 3 ta savolga mantiqiy sabab va dalillar.
   • Shablon: '첫째, ~기 때문이다. 둘째, ~을/를 들 수 있다' (Birinchidan, chunki... Ikkinchidan, ...ni misol keltirish mumkin).
3. Xulosa (결론, 100-150 so‘z): Shaxsiy yechim va kelajakdagi istiqbol.
   • Shablon: '따라서 이러한 문제를 해결하기 위해서는 다각적인 노력을 기울일 필요가 있다' (Shuning uchun ushbu muammoni bartaraf etishda ko‘p tomonlama sa'y-harakatlarni amalga oshirish lozim).`,
        words: [
          { word: "현대 사회", meaning: "Zamonaviy jamiyat", sound: "현대 사회", ex: "현대 사회에서는 정보가 매우 중요하다 (Hozirgi jamiyatda axborot nihoyatda muhim)" },
          { word: "바람직하다", meaning: "Maqsadga muvofiq / Ijobiy", sound: "바람직하다", ex: "올바른 가치관을 가지는 것이 바람직하다 (To‘g‘ri dunyoqarashga ega bo‘lish maqsadga muvofiq)" },
          { word: "다각적인 노력", meaning: "Ko‘p tomonlama sa’y-harakat", sound: "다각적인 노력", ex: "정부와 개인의 다각적인 노력이 필요하다 (Hukumat va shaxsning birgalikdagi harakati zarur)" },
          { word: "이러한 점에서", meaning: "Ushbu nuqtai nazardan", sound: "이러한 점에서", ex: "이러한 점에서 교육은 큰 역할을 한다 (Shu jihatdan ta’lim ulkan rol o‘ynaydi)" },
          { word: "원인으로 꼽히다", meaning: "Sabab sifatida ko‘rilmoq", sound: "원인으로 꼽히다", ex: "스트레스가 주요 원인으로 꼽힌다 (Stress asosiy sabab sifatida e’tirof etiladi)" }
        ],
        dialogue: [
          { speaker: "토픽 교수 (TOPIK Professori)", text: "54번 쓰기에서는 구어체(-아요/어요)를 쓰면 점수가 크게 깎입니다.", trans: "54-inshoda og‘zaki nutq qo‘shimchalari ishlatilsa balldan jiddiy chegiriladi." },
          { speaker: "수험생 (Imtihon topshiruvchi)", text: "네, 반드시 문어체(-ㄴ/는다)로 일관되게 작성하겠습니다.", trans: "Tushundim, albatta faqat yozma ilmiy uslubda yozaman." },
          { speaker: "토픽 교수 (TOPIK Professori)", text: "단락 구분을 명확히 하고 접속사를 자연스럽게 활용하세요.", trans: "Xatboshilarni aniq ajrating va akademik bog‘lovchilardan to‘g‘ri foydalaning." }
        ],
        quiz: {
          question: "TOPIK II 54-akademik inshoda qaysi grammatik uslub qo‘llanilishi majburiy?",
          options: ["① 해요체 (-아요/어요)", "② 문어체 (-다 / -ㄴ/는다)", "③ 합쇼체 (-ㅂ/습니까)", "④ 반말 (-야/어)"],
          correct: 1,
          explanation: "54-insho ilmiy maqola shaklida bo‘lgani uchun faqat yozma neytral uslub (-다 / -ㄴ/는다) qo‘llaniladi."
        }
      }
    ],
    en: [
      {
        id: 101,
        title: "Lesson 1: Advanced Lexicon & Precision",
        subtitle: "Paraphrasing and formal academic vocabulary",
        status: "completed",
        isPro: false,
        icon: "👑",
        color: "from-emerald-500 to-green-600",
        theory: `In academic English and IELTS, vocabulary accounts for 25% of your total score (Lexical Resource). 
To achieve Band 7.5 or higher, candidates must avoid repeating common words and demonstrate precise word choice (collocations).

Key techniques:
1. Academic Register: Replace informal phrasal verbs with Latin-root single verbs (e.g., 'look into' -> 'investigate', 'bring about' -> 'precipitate').
2. Precision over Obscurity: Use words in their exact collocational context rather than memorizing complicated words incorrectly.`,
        words: [
          { word: "Ubiquitous", meaning: "Everywhere / Ham joyda mavjud", sound: "Ubiquitous", ex: "Smartphones have become ubiquitous in modern life." },
          { word: "Substantiate", meaning: "To prove with evidence / Isbotlamoq", sound: "Substantiate", ex: "The researcher failed to substantiate his claims." },
          { word: "Detrimental", meaning: "Harmful / Zararli", sound: "Detrimental", ex: "Sedentary lifestyles have a detrimental effect on health." }
        ],
        dialogue: [
          { speaker: "Examiner", text: "How has technology affected modern communication?", trans: "Texnologiya zamonaviy muloqotga qanday ta'sir ko'rsatdi?" },
          { speaker: "Candidate", text: "Undoubtedly, while digital devices are ubiquitous, they have diminished meaningful interpersonal interaction.", trans: "Shubhasiz, raqamli qurilmalar hamma joyda bo'lsa-da, ular samimiy shaxsiy muloqotni kamaytirdi." }
        ],
        quiz: {
          question: "Which word is the most formal academic synonym for 'Harmful'?",
          options: ["① Bad", "② Detrimental", "③ Terrible", "④ Painful"],
          correct: 1,
          explanation: "'Detrimental' is the precise academic term used in high-level writing."
        }
      }
    ]
  };

  const currentRoadmap = professionalLessons[selectedLanguage] || professionalLessons.kr;

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

  const getSelectedPrice = () => {
    if (selectedPlan === 'monthly') return '49.000 so‘m';
    if (selectedPlan === '2months') return '99.000 so‘m';
    return '499.000 so‘m';
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

  const theme = {
    bg: isDarkMode ? 'bg-[#080912] text-slate-100' : 'bg-slate-100 text-slate-900',
    card: isDarkMode ? 'bg-[#121424] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-md',
    subCard: isDarkMode ? 'bg-[#181b30] border-slate-700/60' : 'bg-slate-50 border-slate-200',
    header: isDarkMode ? 'bg-[#0b0d1a]/95 border-b border-slate-800/80 backdrop-blur-xl' : 'bg-white/95 border-b border-slate-200 backdrop-blur-xl shadow-sm',
    textMain: isDarkMode ? 'text-white' : 'text-slate-900',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-slate-500',
    navBg: isDarkMode ? 'bg-[#0e101f]/95 border-t border-slate-800' : 'bg-white/95 border-t border-slate-200 shadow-xl',
    inputBg: isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
  };

  // ==========================================
  // 1. ASOSIY BOSH SAHIFA (ROADMAP)
  // ==========================================
  const renderHome = () => {
    const isKr = selectedLanguage === 'kr';

    return (
      <div className="space-y-6 animate-fadeIn pb-12">
        {/* HERO BANNER */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#281d60] via-[#1b1a46] to-[#0f1026] p-6 text-white border border-indigo-500/30 shadow-2xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider bg-indigo-500/25 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30">
                {isKr ? 'KOREYS TILI AKADEMIYASI' : 'ENGLISH IELTS ACADEMY'}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                <Flame size={14} className="fill-amber-400" /> {userProfile.streak} KUNLIK STREAK
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black tracking-tight text-white">
                Salom, {userProfile.name}! 👋
              </h2>
              <p className="text-xs text-indigo-200/80 leading-relaxed mt-1 font-medium">
                Professional darsliklar, chuqur tahlillar va audio mashg‘ulotlar platformasi.
              </p>
            </div>

            <div className="bg-black/35 rounded-2xl p-4 border border-white/10 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider">Navbatdagi Vazifa:</span>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-400" /> 2-dars: Bo‘g‘in & Batchim qoidalari
                </div>
              </div>
              <button 
                onClick={() => handleOpenLesson(currentRoadmap[1] || currentRoadmap[0])}
                className="inline-flex items-center gap-1.5 bg-[#b8a5fe] hover:bg-[#a892fe] text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-lg transition transform active:scale-95"
              >
                <span>Darsga kirish</span>
                <ArrowRight size={15} strokeWidth={2.8} />
              </button>
            </div>
          </div>
        </div>

        {/* PRO TARIF */}
        {!userProfile.isPro && (
          <div 
            onClick={() => { setPaymentStep('select'); setIsPaywallOpen(true); }}
            className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-4 text-slate-950 flex items-center justify-between cursor-pointer shadow-lg active:scale-98 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/30 backdrop-blur-md flex items-center justify-center font-black">
                <Crown size={24} className="text-white" />
              </div>
              <div>
                <h4 className="font-black text-sm text-white">Fariza Academy PRO</h4>
                <p className="text-[11px] text-white/90 font-medium">EPS-TOPIK & IELTS 7.5 darslarini to‘liq oching</p>
              </div>
            </div>
            <span className="bg-white text-slate-950 text-xs font-black px-3.5 py-2 rounded-xl shadow">
              Ulanish
            </span>
          </div>
        )}

        {/* TIL TANLASH */}
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

        {/* ROADMAP BEKATLARI (ZIG-ZAG) */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between px-1">
            <h3 className={`font-black text-base ${theme.textMain}`}>
              Darslar Yo‘lagi (Professional Roadmap)[span_1](start_span)[span_1](end_span)
            </h3>
            <span className="text-xs font-bold text-indigo-400">
              {currentRoadmap.filter(l => l.status === 'completed').length} / {currentRoadmap.length} o‘rganildi[span_2](start_span)[span_2](end_span)
            </span>
          </div>

          <div className="relative py-4 flex flex-col items-center space-y-7">
            <div className="absolute top-8 bottom-8 w-1.5 bg-slate-800 rounded-full z-0"></div>

            {currentRoadmap.map((lesson, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <div 
                  key={lesson.id} 
                  className={`relative z-10 flex items-center w-full max-w-xs ${isLeft ? 'justify-start pl-3' : 'justify-end pr-3'}`}
                >
                  <div 
                    onClick={() => handleOpenLesson(lesson)}
                    className="flex items-center gap-3.5 cursor-pointer group active:scale-95 transition"
                  >
                    <div className={`w-18 h-18 rounded-3xl p-1 bg-gradient-to-tr ${lesson.color} shadow-xl flex items-center justify-center relative transition transform group-hover:scale-105 ring-4 ${
                      lesson.status === 'current' ? 'ring-indigo-500/60 animate-bounce' : 'ring-slate-900'
                    }`}>
                      <div className="w-full h-full rounded-[22px] bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                        <span className="text-2xl">{lesson.icon}</span>
                        {lesson.isPro && !userProfile.isPro && (
                          <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded-full shadow">
                            PRO
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-left max-w-[130px]">
                      <div className="text-xs font-black text-white group-hover:text-indigo-400 transition leading-tight">
                        {lesson.title}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 leading-tight">
                        {lesson.subtitle}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // 2. DARSNING TO‘LIQ PROFESSIONAL MODULI
  // ==========================================
  const renderLessonDetail = () => {
    if (!activeLesson) return null;

    return (
      <div className="space-y-5 animate-fadeIn pb-12">
        <div className="flex items-center justify-between pb-3 border-b border-slate-700/40">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-1.5 text-xs text-indigo-500 font-extrabold ${theme.subCard} border px-3 py-1.5 rounded-xl active:scale-95`}
          >
            <ArrowLeft size={16} /> Bosh sahifa
          </button>
          <span className={`text-xs font-black ${theme.textMain} truncate max-w-[200px]`}>
            {activeLesson.title}
          </span>
        </div>

        {/* 4 TALIK BOSQICH (QOIDA -> SO'ZLAR -> DIALOG -> TEST) */}
        <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
          <button 
            onClick={() => setLessonStep('theory')}
            className={`py-2 rounded-xl transition ${lessonStep === 'theory' ? 'bg-indigo-600 text-white shadow-md' : `${theme.subCard} text-slate-400`}`}
          >
            Nazariya
          </button>
          <button 
            onClick={() => setLessonStep('vocab')}
            className={`py-2 rounded-xl transition ${lessonStep === 'vocab' ? 'bg-indigo-600 text-white shadow-md' : `${theme.subCard} text-slate-400`}`}
          >
            Lug‘at ({activeLesson.words.length})
          </button>
          <button 
            onClick={() => setLessonStep('dialogue')}
            className={`py-2 rounded-xl transition ${lessonStep === 'dialogue' ? 'bg-indigo-600 text-white shadow-md' : `${theme.subCard} text-slate-400`}`}
          >
            Dialog
          </button>
          <button 
            onClick={() => setLessonStep('quiz')}
            className={`py-2 rounded-xl transition ${lessonStep === 'quiz' ? 'bg-indigo-600 text-white shadow-md' : `${theme.subCard} text-slate-400`}`}
          >
            Imtihon
          </button>
        </div>

        {/* 1. NAZARIYA VA ILMIY QOIDALAR */}
        {lessonStep === 'theory' && (
          <div className={`${theme.card} border rounded-3xl p-6 space-y-4`}>
            <div className="flex items-center gap-2 text-indigo-400 font-black text-xs uppercase tracking-wider">
              <Sparkles size={16} /> Akademik Darslik & Grammatika
            </div>
            <h3 className={`font-black text-xl ${theme.textMain}`}>{activeLesson.title}</h3>
            
            <div className={`text-xs leading-relaxed font-normal ${theme.subCard} p-4.5 rounded-2xl border space-y-3 whitespace-pre-line text-slate-200`}>
              {activeLesson.theory}
            </div>

            <button 
              onClick={() => setLessonStep('vocab')}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-xs transition shadow-lg flex items-center justify-center gap-2"
            >
              Keyingi: So‘z Boyligi & Kontekst <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* 2. CHUQUR LUG'AT VA AUDIOTALAFFUZ */}
        {lessonStep === 'vocab' && (
          <div className="space-y-3">
            <div className="px-1">
              <h4 className={`font-black text-sm ${theme.textMain}`}>Akademik So‘zlar va Gapdagi Ishlatilishi:</h4>
              <p className={`text-xs ${theme.textMuted}`}>Talaffuzni tinglash uchun so‘z ustiga bosing</p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {activeLesson.words.map((w, idx) => (
                <div 
                  key={idx}
                  onClick={() => speakText(w.sound, selectedLanguage === 'kr' ? 'ko-KR' : 'en-US')}
                  className={`${theme.card} border rounded-2xl p-4 cursor-pointer active:scale-98 transition hover:border-indigo-500 group space-y-2`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition">
                        <Volume2 size={20} />
                      </button>
                      <div>
                        <div className={`text-lg font-black ${theme.textMain}`}>{w.word}</div>
                        <div className={`text-xs ${theme.textMuted}`}>{w.meaning}</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-indigo-400">Tinglash 🔊</span>
                  </div>

                  {w.ex && (
                    <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300">
                      <strong>Misol:</strong> {w.ex}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button 
              onClick={() => setLessonStep('dialogue')}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-xs transition shadow-lg flex items-center justify-center gap-2 mt-2"
            >
              Keyingi: Jonli Dialog Mashqi <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* 3. JONLI MULOQOT DIALOGI */}
        {lessonStep === 'dialogue' && (
          <div className={`${theme.card} border rounded-3xl p-6 space-y-4`}>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-indigo-400 font-black text-xs uppercase tracking-wider">
                <MessageCircle size={16} /> Jonli Muloqot Mashqi
              </span>
              <span className="text-[11px] text-slate-400 font-semibold">Har bir qatorni bosing</span>
            </div>

            <div className="space-y-3">
              {activeLesson.dialogue.map((d, idx) => (
                <div 
                  key={idx}
                  onClick={() => speakText(d.text, selectedLanguage === 'kr' ? 'ko-KR' : 'en-US')}
                  className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500 cursor-pointer transition space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-400">{d.speaker}</span>
                    <Volume2 size={16} className="text-slate-400" />
                  </div>
                  <div className="text-sm font-bold text-white">{d.text}</div>
                  <div className="text-[11px] text-slate-400">{d.trans}</div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setLessonStep('quiz')}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-xs transition shadow-lg flex items-center justify-center gap-2"
            >
              Keyingi: Darsni Tekshirish Testi <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* 4. IMTIHON DARAJASIDAGI TEST */}
        {lessonStep === 'quiz' && (
          <div className={`${theme.card} border rounded-3xl p-6 space-y-4`}>
            <div className="flex items-center gap-2 text-indigo-400 font-black text-xs uppercase tracking-wider">
              <CheckCircle2 size={16} /> Bilimni Sinovchi Yakuniy Test
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
                quizAnswer === activeLesson.quiz.correct ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
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
                      xp: prev.xp + 60,
                      completedLessons: [...new Set([...currentCompleted, activeLesson.id])]
                    };
                  });
                  alert("Tabriklaymiz! Dars mukammal o‘zlashtirildi (+60 XP qo‘shildi).");
                  setActiveTab('home');
                } else {
                  alert("Iltimos, to‘g‘ri javobni tanlang!");
                }
              }}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl text-xs transition shadow-lg"
            >
              Darsni Tugatish va Saqlash
            </button>
          </div>
        )}
      </div>
    );
  };

  // ==========================================
  // 3. TO‘LOV MODAL OYNASI
  // ==========================================
  const renderPaywall = () => {
    if (!isPaywallOpen) return null;

    return (
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
                  Barcha qulflangan professional darslar, to‘liq EPS-TOPIK va IELTS materiallariga cheksiz kirish!
                </p>
              </div>

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
                Click yoki Payme orqali to‘lov qilib, tasdiqlash tugmasini bosing:
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
                  Orqaga
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

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

      {/* 2. TO‘LOV MODALI */}
      {renderPaywall()}

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
                  onClick={() => { setActiveTab('home'); setIsSidebarOpen(false); }}
                  className={`w-full p-3 rounded-2xl flex items-center gap-3 ${theme.subCard} mb-1.5`}
                >
                  <GraduationCap size={18} className="text-indigo-400" /> Darslar Yo‘lagi[span_3](start_span)[span_3](end_span)
                </button>
                <button 
                  onClick={() => { setPaymentStep('select'); setIsPaywallOpen(true); setIsSidebarOpen(false); }}
                  className={`w-full p-3 rounded-2xl flex items-center gap-3 bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-1.5`}
                >
                  <Crown size={18} /> Fariza Academy PRO
                </button>
                <button 
                  onClick={() => { setActiveTab('home'); setIsSidebarOpen(false); }}
                  className={`w-full p-3 rounded-2xl flex items-center gap-3 ${theme.subCard}`}
                >
                  <User size={18} className="text-amber-400" /> Shaxsiy Profil
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700/40 text-xs text-slate-400">
              Fariza Academy v4.5
            </div>
          </div>
        </div>
      )}

      {/* 4. ASOSIY MAYDON */}
      <main className="flex-1 w-full max-w-md mx-auto p-4 pb-48 box-border">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'lesson_detail' && renderLessonDetail()}
      </main>

      {/* 5. 5 TALIK KATTA PASTKI MENYU */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 ${theme.navBg} backdrop-blur-2xl px-3 pt-2.5 pb-7 shadow-2xl`}>
        <div className="max-w-md mx-auto flex items-center justify-between relative px-1">
          
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex-1 flex flex-col items-center py-1 transition active:scale-90 ${
              activeTab === 'home' ? 'text-indigo-400 font-black' : `${theme.textMuted}`
            }`}
          >
            <Compass size={26} strokeWidth={activeTab === 'home' ? 2.8 : 2} />
            <span className="text-xs mt-1 font-bold">Asosiy</span>
            {activeTab === 'home' && <span className="w-6 h-1 bg-emerald-500 rounded-full mt-0.5"></span>}
          </button>

          <button 
            onClick={() => handleOpenLesson(currentRoadmap[0])}
            className={`flex-1 flex flex-col items-center py-1 transition active:scale-90 ${
              activeTab === 'lesson_detail' ? 'text-indigo-400 font-black' : `${theme.textMuted}`
            }`}
          >
            <GraduationCap size={26} strokeWidth={2.8} />
            <span className="text-xs mt-1 font-bold">Darslar</span>
            {activeTab === 'lesson_detail' && <span className="w-6 h-1 bg-emerald-500 rounded-full mt-0.5"></span>}
          </button>

          <button 
            onClick={() => speakText(selectedLanguage === 'kr' ? "안녕하세요! 파리자 아카데미에 오신 것을 환영합니다." : "Welcome to Fariza Academy.")}
            className="flex flex-col items-center -mt-8 px-2 active:scale-90 transition group"
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl ring-4 ${isDarkMode ? 'ring-slate-900' : 'ring-white'} transition bg-gradient-to-tr from-blue-600 to-indigo-600`}>
              <Bot size={32} />
            </div>
            <span className="text-xs text-indigo-400 font-black mt-1">FarizaAI</span>
          </button>

          <button 
            onClick={() => handleOpenLesson(currentRoadmap[currentRoadmap.length - 1])}
            className={`flex-1 flex flex-col items-center py-1 transition active:scale-90 text-slate-400`}
          >
            <Award size={26} strokeWidth={2.8} />
            <span className="text-xs mt-1 font-bold">Imtihon</span>
          </button>

          <button 
            onClick={() => setIsEditingProfile(true)}
            className={`flex-1 flex flex-col items-center py-1 transition active:scale-90 text-slate-400`}
          >
            <User size={26} strokeWidth={2.8} />
            <span className="text-xs mt-1 font-bold">Profil</span>
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
                <div className="w-16 h-16 rounded-full bg-indigo-600/20 border-2 border-indigo-500/40 flex items-center justify-center font-bold text-indigo-400 text-lg">
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
