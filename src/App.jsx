import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Volume2, ArrowLeft, Sun, Moon, ArrowRight, 
  Menu, GraduationCap, X, Crown, Flame, Heart, Zap, 
  LogOut, Trophy, Layers, Shuffle, CheckCircle2, 
  Sparkles, Grid, User, Upload, Award
} from 'lucide-react';
import { 
  signInWithPopup, signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, updateProfile, 
  signOut, onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';

// Savollar va variantlarni har kirganda aralashtiruvchi funksiya (Fisher-Yates Shuffle)
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  // --- 1. AUTENTIFIKATSIYA ---
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('snu_auth_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authMode, setAuthMode] = useState('welcome');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const u = {
          uid: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Talaba',
          email: fbUser.email,
          photoURL: fbUser.photoURL || ''
        };
        setCurrentUser(u);
        localStorage.setItem('snu_auth_user', JSON.stringify(u));
        setUserProfile(prev => ({ ...prev, name: u.name, photoBase64: u.photoURL || prev.photoBase64 }));
      }
    });
    return () => unsub();
  }, []);

  const handleGuestLogin = () => {
    const guest = { uid: 'guest', name: 'Tokhirbek', email: 'talaba@snukorean.uz', isGuest: true };
    setCurrentUser(guest);
    localStorage.setItem('snu_auth_user', JSON.stringify(guest));
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
      setAuthError("Google xatoligi: " + (err.code || err.message));
    } finally {
      setAuthLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (!authForm.email || !authForm.password) return setAuthError("Email va parolni kiriting!");
    setAuthLoading(true);
    try {
      if (authMode === 'register') {
        const res = await createUserWithEmailAndPassword(auth, authForm.email.trim(), authForm.password);
        await updateProfile(res.user, { displayName: authForm.name.trim() || 'Talaba' });
      } else {
        await signInWithEmailAndPassword(auth, authForm.email.trim(), authForm.password);
      }
    } catch (err) {
      setAuthError(err.code === 'auth/email-already-in-use' ? "Bu email band. Tizimga kiring." : "Email yoki parol noto‘g‘ri.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    if (auth) { try { await signOut(auth); } catch (e) {} }
    localStorage.removeItem('snu_auth_user');
    setCurrentUser(null);
    setAuthMode('welcome');
  };

  // --- 2. MAVZU VA FOYDALANUVCHI PROFILI ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('snu_theme');
    return saved !== null ? saved === 'dark' : true;
  });

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('snu_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('snu_profile');
    if (saved) {
      try {
        const p = JSON.parse(saved);
        return {
          name: p.name || 'Tokhirbek',
          photoBase64: p.photoBase64 || '',
          streak: p.streak ?? 12,
          xp: p.xp ?? 1450,
          hearts: p.hearts ?? 5,
          isPro: p.isPro || false,
          completedBooks: Array.isArray(p.completedBooks) ? p.completedBooks : ['hangul']
        };
      } catch (e) {}
    }
    return {
      name: 'Tokhirbek',
      photoBase64: '',
      streak: 12,
      xp: 1450,
      hearts: 5,
      isPro: false,
      completedBooks: ['hangul']
    };
  });

  useEffect(() => {
    localStorage.setItem('snu_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // --- 3. NAVIGATSIYA HOLATLARI ---
  const [activeTab, setActiveTab] = useState('books'); // 'books' | 'hangul' | 'flashcards' | 'book_study'
  const [selectedBook, setSelectedBook] = useState(null);
  const [studySection, setStudySection] = useState('grammar'); // 'grammar' | 'vocab' | 'dialogue' | 'quiz'
  const [shuffledQuizzes, setShuffledQuizzes] = useState([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const [cardIdx, setCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState(userProfile);
  const fileInputRef = useRef(null);

  // Koreyscha Audio Talaffuz (ko-KR)
  const speakKo = (text) => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const clean = text.replace(/[\(\)\[\]]/g, '').trim();
      const ut = new SpeechSynthesisUtterance(clean);
      ut.lang = 'ko-KR';
      ut.rate = 0.85;
      window.speechSynthesis.speak(ut);
    } catch (e) {}
  };

  // --- 4. HANGUL ALIFBOSI MA'LUMOTLARI ---
  const hangulConsonants = [
    { char: 'ㄱ', name: '기역 (Giyok)', sound: 'g / k', ex: '가방 (Sumka)' },
    { char: 'ㄴ', name: '니은 (Niin)', sound: 'n', ex: '나무 (Daraxt)' },
    { char: 'ㄷ', name: '디귿 (Digid)', sound: 'd / t', ex: '다리 (Oyoq / Ko‘prik)' },
    { char: 'ㄹ', name: '리을 (Riil)', sound: 'r / l', ex: '라디오 (Radio)' },
    { char: 'ㅁ', name: '미음 (Miim)', sound: 'm', ex: '모자 (Shapka)' },
    { char: 'ㅂ', name: '비읍 (Biip)', sound: 'b / p', ex: '바다 (Dengiz)' },
    { char: 'ㅅ', name: '시옷 (Siot)', sound: 's', ex: '사과 (Olma)' },
    { char: 'ㅇ', name: '이응 (Iing)', sound: 'jim / ng', ex: '아이 (Bola)' },
    { char: 'ㅈ', name: '지읒 (Jiit)', sound: 'j', ex: '지도 (Xarita)' },
    { char: 'ㅊ', name: '치읓 (Chiit)', sound: 'ch', ex: '차 (Choy / Mashina)' },
    { char: 'ㅋ', name: '키읔 (Khiik)', sound: 'kh', ex: '코 (Burun)' },
    { char: 'ㅌ', name: '티읕 (Thiit)', sound: 'th', ex: '타조 (Tuyaqush)' },
    { char: 'ㅍ', name: '피읖 (Phiip)', sound: 'ph', ex: '포도 (Uzum)' },
    { char: 'ㅎ', name: '히읗 (Hiih)', sound: 'h', ex: '하늘 (Osmon)' }
  ];

  const hangulVowels = [
    { char: 'ㅏ', name: '아 (A)', sound: 'a', ex: '아버지 (Ota)' },
    { char: 'ㅑ', name: '야 (Ya)', sound: 'ya', ex: '야구 (Beysbol)' },
    { char: 'ㅓ', name: '어 (Eo)', sound: 'o‘ / eo', ex: '어머니 (Ona)' },
    { char: 'ㅕ', name: '여 (Yeo)', sound: 'yo‘ / yeo', ex: '여자 (Ayol)' },
    { char: 'ㅗ', name: '오 (O)', sound: 'o', ex: '오이 (Bodring)' },
    { char: 'ㅛ', name: '요 (Yo)', sound: 'yo', ex: '요리 (Taom)' },
    { char: 'ㅜ', name: '우 (U)', sound: 'u', ex: '우유 (Sut)' },
    { char: 'ㅠ', name: '유 (Yu)', sound: 'yu', ex: '유리 (Shisha)' },
    { char: 'ㅡ', name: '으 (Eu)', sound: 'i (qattiq)', ex: '으뜸 (Eng yaxshi)' },
    { char: 'ㅣ', name: '이 (I)', sound: 'i', ex: '이름 (Ism)' }
  ];

  // --- 5. 서울대 한국어 1A ~ 6B TO‘LIQ 12 JILDLIK AKADEMIK BAZA ---
  const snuBooks = [
    {
      id: '1a',
      code: '1A',
      title: '서울대 한국어 1A',
      level: 'Boshlang‘ich 1 • TOPIK 1',
      color: 'from-emerald-500 to-teal-700',
      topics: 'Tanishuv, Kundalik hayot, Joylashuv, Raqamlar va Sana',
      grammar: [
        { pattern: 'N은/는 N이에요/예요', desc: 'Ot kesim (Men ...man / Bu ...dir). Unli bilan tugasa -예요, undosh bilan tugasa -이에요.', ex: '저는 우즈베키스탄 사람이에요. (Men O‘zbekistonlikman.)' },
        { pattern: 'V-아요/어요', desc: 'Hozirgi zamon xushmuomala shakli. ㅏ/ㅗ bo‘lsa -아요, boshqalarda -어요, 하다 -> 해요.', ex: '매일 도서관에서 한국어를 공부해요. (Har kuni kutubxonada koreys tilini o‘rganaman.)' },
        { pattern: 'N에 가다/오다', desc: 'Yo‘nalish kelishigi (-ga bormoq/kelmoq).', ex: '내일 친구하고 명동에 가요. (Ertaga do‘stim bilan Myongdongga boraman.)' },
        { pattern: 'N을/를', desc: 'Tushum kelishigi (-ni).', ex: '아침에 빵하고 우유를 먹어요. (Ertalab non va sut yeyman.)' }
      ],
      vocab: [
        { ko: '자기소개', uz: 'O‘zini tanishtirish', ex: '자기소개를 해 주세요.' },
        { ko: '도서관', uz: 'Kutubxona', ex: '도서관이 아주 조용해요.' },
        { ko: '편의점', uz: '24 soatlik do‘kon', ex: '편의점에서 김밥을 샀어요.' },
        { ko: '학생증', uz: 'Talabalik guvohnomasi', ex: '학생증을 꼭 가지고 오세요.' },
        { ko: '오늘', uz: 'Bugun', ex: '오늘은 날씨가 참 좋아요.' },
        { ko: '얼마예요?', uz: 'Necha pul?', ex: '이 사과 한 개에 얼마예요?' }
      ],
      dialogue: [
        { sp: '민수', ko: '안녕하세요? 저는 김민수예요. 어느 나라 사람이에요?', uz: 'Salom! Men Kim Minsuman. Qaysi davlatdansiz?' },
        { sp: '토히르벡', ko: '안녕하세요? 저는 토히르벡이에요. 우즈베키스탄에서 왔어요.', uz: 'Salom! Men Tokhirbekman. O‘zbekistondan keldim.' },
        { sp: '민수', ko: '반갑습니다! 지금 대학교에서 무엇을 공부해요?', uz: 'Tanishganimdan xursandman! Hozir universitetda nimani o‘rganyapsiz?' },
        { sp: '토히르벡', ko: '컴퓨터공학을 공부해요. 한국어 수업도 들어요.', uz: 'Kompyuter injiniringini o‘rganyapman. Koreys tili darsiga ham qatnashaman.' }
      ],
      quizzes: [
        { q: "'저는 학생___.' Bo‘sh joyga to‘g‘ri qo‘shimchani tanlang:", opts: ['이에요', '예요', '을', '에서'], ans: '이에요', exp: "'학생' undosh (ㅇ) bilan tugagani uchun '-이에요' qo‘shiladi." },
        { q: "'공부하다' fe'lining hozirgi zamon shakli qaysi?", opts: ['공부해요', '공부하아요', '공부허요', '공부았어요'], ans: '공부해요', exp: "'하다' fe'llari doim '해요' shaklida tuslanadi." },
        { q: "Do‘konda narx so‘rash iborasi qaysi?", opts: ['얼마예요?', '어디예요?', '누구예요?', '몇 시예요?'], ans: '얼마예요?', exp: "'얼마예요?' — Necha pul? degan ma'noni bildiradi." },
        { q: "Qayerda harakat bajarilganini bildiruvchi qo‘shimcha qaysi? (도서관___ 책을 읽어요)", opts: ['에서', '에', '을', '와'], ans: '에서', exp: "Harakat sodir bo‘lgan joy uchun '-에서' ishlatiladi." },
        { q: "'우유' so‘zining tarjimasi nima?", opts: ['Sut', 'Suv', 'Non', 'Olma'], ans: 'Sut', exp: "'우유' — sut." }
      ]
    },
    {
      id: '1b',
      code: '1B',
      title: '서울대 한국어 1B',
      level: 'Boshlang‘ich 2 • TOPIK 1',
      color: 'from-teal-500 to-cyan-700',
      topics: 'O‘tgan zamon, Kelajak rejalari, Buyruq va Iltimos, Ob-havo',
      grammar: [
        { pattern: 'V-았/었어요', desc: 'O‘tgan zamon shakli (-di / -gan).', ex: '어제 친구하고 영화를 봤어요. (Kecha do‘stim bilan kino ko‘rdim.)' },
        { pattern: 'V-(으)ㄹ 거예요', desc: 'Kelajak zamon reja va taxmini (-moqchiman / -adi).', ex: '주말에 부산에 여행을 갈 거예요. (Dam olish kuni Pusanga sayohatga bormoqchiman.)' },
        { pattern: 'V-(으)세요', desc: 'Hurmat ma’nosidagi buyruq va iltimos (-ing).', ex: '여기에 이름을 쓰세요. (Bu yerga ismingizni yozing.)' },
        { pattern: 'A/V-지만', desc: 'Qarama-qarshilik bog‘lovchisi (-lekin / -ammo).', ex: '한국어는 어렵지만 재미있어요. (Koreys tili qiyin, lekin qiziqarli.)' }
      ],
      vocab: [
        { ko: '주말', uz: 'Dam olish kunlari', ex: '주말 잘 보내세요!' },
        { ko: '날씨', uz: 'Ob-havo', ex: '오늘 날씨가 아주 맑아요.' },
        { ko: '지하철', uz: 'Metro', ex: '지하철을 타고 학교에 가요.' },
        { ko: '약속', uz: 'Va’da / Uchrashuv', ex: '오늘 저녁에 친구와 약속이 있어요.' },
        { ko: '감기', uz: 'Shamollash', ex: '감기에 걸려서 병원에 갔어요.' }
      ],
      dialogue: [
        { sp: '수진', ko: '어제 무엇을 했어요?', uz: 'Kecha nima qildingiz?' },
        { sp: '토히르벡', ko: '집에서 쉬고 한국 드라마를 봤어요. 수진 씨는요?', uz: 'Uyda dam oldim va koreys serialini ko‘rdim. Siz-chi?' },
        { sp: '수진', ko: '저는 백화점에 가서 부모님 선물을 샀어요.', uz: 'Men univermagga borib ota-onamga sovg‘a oldim.' }
      ],
      quizzes: [
        { q: "'보다' (ko‘rmoq) fe'lining o‘tgan zamon shakli qaysi?", opts: ['봤어요', '보었어요', '보았어요', '볼 거예요'], ans: '봤어요', exp: "'보 + 았어요' qisqarib '봤어요' bo‘ladi." },
        { q: "'Ertaga kutubxonaga bormoqchiman' gapini to‘g‘ri toping:", opts: ['내일 도서관에 갈 거예요', '내일 도서관에 갔어요', '어제 도서관에 갈 거예요', '내일 도서관에 가세요'], ans: '내일 도서관에 갈 거예요', exp: "Kelajak reja uchun '-(으)ㄹ 거예요' ishlatiladi." },
        { q: "'Ovqat qimmat, lekin mazali' — to‘g‘ri bog‘lovchini tanlang:", opts: ['음식이 비싸지만 맛있어요', '음식이 비싸서 맛있어요', '음식이 비싸고 맛있어요', '음식이 비싸면 맛있어요'], ans: '음식이 비싸지만 맛있어요', exp: "Zidlov ma'nosi uchun '-지만' ishlatiladi." },
        { q: "'지하철' nima?", opts: ['Metro', 'Avtobus', 'Taksi', 'Samolyot'], ans: 'Metro', exp: "'지하철' — yer osti metrosi." }
      ]
    },
    {
      id: '2a',
      code: '2A',
      title: '서울대 한국어 2A',
      level: 'O‘rta-boshlang‘ich 1 • TOPIK 2',
      color: 'from-sky-500 to-blue-700',
      topics: 'Sabab-natija, Tajriba, Qobiliyat va Ruxsat',
      grammar: [
        { pattern: 'A/V-아서/어서', desc: 'Sabab va ketma-ketlik (-gani uchun / -ib). Buyruq bilan ishlatilmaydi!', ex: '비가 와서 집에 있었어요. (Yomg‘ir yog‘gani uchun uyda bo‘ldim.)' },
        { pattern: 'V-(으)ㄴ 적이 있다/없다', desc: 'O‘tmishdagi tajriba (-gan joyim bor/yo‘q).', ex: '제주도에 가 본 적이 있어요. (Jeju oroliga borib ko‘rganman.)' },
        { pattern: 'V-(으)ㄹ 수 있다/없다', desc: 'Imkoniyat va qobiliyat (-a olaman / -a olmayman).', ex: '저는 한국 신문을 읽을 수 있어요. (Men koreys gazetasini o‘qiy olaman.)' },
        { pattern: 'V-(으)면 안 되다', desc: 'Taqiq (-ish mumkin emas).', ex: '박물관에서 사진을 찍으면 안 돼요. (Muzeyda rasmga olish mumkin emas.)' }
      ],
      vocab: [
        { ko: '경험', uz: 'Tajriba', ex: '좋은 경험을 많이 했어요.' },
        { ko: '박물관', uz: 'Muzey', ex: '국립중앙박물관에 갔어요.' },
        { ko: '운전면허', uz: 'Haydovchilik guvohnomasi', ex: '작년에 운전면허를 땄어요.' },
        { ko: '회의', uz: 'Majlis / Yig‘ilish', ex: '오후 2시에 중요한 회의가 있어요.' }
      ],
      dialogue: [
        { sp: '지훈', ko: '한국 음식을 만들어 본 적이 있어요?', uz: 'Koreys taomini tayyorlab ko‘rganmisiz?' },
        { sp: '토히르벡', ko: '네, 김치볶음밥을 만들어 본 적이 있어요. 생각보다 쉬웠어요.', uz: 'Ha, kimchili qovurma guruch tayyorlab ko‘rganman. O‘ylaganimdan oson edi.' }
      ],
      quizzes: [
        { q: "Qaysi gap grammatik jihatdan TO‘G‘RI?", opts: ['배가 아파서 병원에 갔어요', '배가 아파서 병원에 가세요', '배가 아파서 병원에 갑시다', '배가 아팠어서 병원에 갔어요'], ans: '배가 아파서 병원에 갔어요', exp: "'-아서/어서' oldidan o‘tgan zamon qo‘shilmaydi va buyruq gap bilan kelmaydi." },
        { q: "'Koreys tilida gapira olaman' tarjimasi qaysi?", opts: ['한국어를 말할 수 있어요', '한국어를 말한 적이 있어요', '한국어를 말하면 안 돼요', '한국어를 말하려고 해요'], ans: '한국어를 말할 수 있어요', exp: "Qobiliyat uchun '-(으)ㄹ 수 있다' ishlatiladi." },
        { q: "'Muzeyda rasmga olish mumkin emas' qanday aytiladi?", opts: ['박물관에서 사진을 찍으면 안 돼요', '박물관에서 사진을 찍어도 돼요', '박물관에서 사진을 찍어야 돼요', '박물관에서 사진을 찍을 거예요'], ans: '박물관에서 사진을 찍으면 안 돼요', exp: "Taqiq shakli: '-(으)면 안 되다'." }
      ]
    },
    {
      id: '2b',
      code: '2B',
      title: '서울대 한국어 2B',
      level: 'O‘rta-boshlang‘ich 2 • TOPIK 2',
      color: 'from-blue-600 to-indigo-800',
      topics: 'Maqsad, Shart, Qiyoslash va Holat o‘zgarishi',
      grammar: [
        { pattern: 'V-(으)려고 하다', desc: 'Niyat va maqsad (-moqchiman / -ish niyatidaman).', ex: '내년에 TOPIK 5급을 따려고 해요. (Kelasi yili TOPIK 5-darajani olmoqchiman.)' },
        { pattern: 'A/V-(으)니까', desc: 'Aniq sabab va dalil (-gani sababli). Buyruq/taklif bilan ishlaydi!', ex: '날씨가 추우니까 따뜻한 옷을 입으세요. (Havo sovuq bo‘lgani uchun issiq kiyim kiying.)' },
        { pattern: 'A-아/어지다', desc: 'Sifatning o‘zgarishi (-lashmoq).', ex: '한국어 실력이 많이 좋아졌어요. (Koreys tili darajam ancha yaxshilandi.)' }
      ],
      vocab: [
        { ko: '실력', uz: 'Mahorat / Bilim darajasi', ex: '매일 연습해서 실력이 늘었어요.' },
        { ko: '준비하다', uz: 'Tayyorlanmoq', ex: '취업 면접을 준비하고 있어요.' },
        { ko: '인기', uz: 'Mashhurlik', ex: '이 노래는 전 세계에서 인기가 많아요.' },
        { ko: '습관', uz: 'Odat', ex: '아침에 일찍 일어나는 습관이 있어요.' }
      ],
      dialogue: [
        { sp: '선생님', ko: '졸업한 후에 무엇을 하려고 해요?', uz: 'Bitirganingizdan keyin nima qilmoqchisiz?' },
        { sp: '토히르벡', ko: '한국 IT 회사에 프론트엔드 개발자로 취직하려고 해요.', uz: 'Koreya IT kompaniyasiga frontend dasturchi bo‘lib ishga kirmoqchiman.' }
      ],
      quizzes: [
        { q: "Buyruq gap ('Issiq kiyim kiying') bilan qaysi sabab qo‘shimchasi ishlatiladi?", opts: ['추우니까', '추워서', '춥지만', '춥고'], ans: '추우니까', exp: "Buyruq va taklif gaplarda '-아서/어서' emas, '-(으)니까' ishlatiladi." },
        { q: "'Yaxshilandi / yaxshi bo‘lib qoldi' qaysi so‘z?", opts: ['좋아졌어요', '좋았어요', '좋겠어요', '좋아요'], ans: '좋아졌어요', exp: "Holat o‘zgarishi '-아/어지다' bilan yasaladi." }
      ]
    },
    {
      id: '3a',
      code: '3A',
      title: '서울대 한국어 3A',
      level: 'O‘rta 1 • TOPIK 3',
      color: 'from-indigo-500 to-purple-700',
      topics: 'Bilvosita nutq, Taxmin va Kutilmagan natija',
      grammar: [
        { pattern: 'A/V-다고 하다 / N(이)라고 하다', desc: 'O‘zga gapini yetkazish (Bilvosita nutq: -deb aytdi).', ex: '친구가 내일 서울에 온다고 했어요. (Do‘stim ertaga Seulga kelaman deb aytdi.)' },
        { pattern: 'A/V-(으)ㄴ/는 것 같다', desc: 'Taxmin va fikr bildirish (-ga o‘xshaydi / -shekilli).', ex: '밖에 눈이 오는 것 같아요. (Tashqarida qor yog‘ayotganga o‘xshaydi.)' },
        { pattern: 'V-는 길에', desc: 'Yo‘l-yo‘lakay (-ga ketayotganda).', ex: '집에 오는 길에 우체국에 들렀어요. (Uyga kelayotib pochtaga kirib o‘tdim.)' }
      ],
      vocab: [
        { ko: '면접', uz: 'Suhbat (Intervyu)', ex: '내일 회사 면접을 보러 가요.' },
        { ko: '성격', uz: 'Xarakter / Fe’l-atvor', ex: '성격이 활발하고 긍정적이에요.' },
        { ko: '예보', uz: 'Ob-havo ma’lumoti', ex: '일기 예보에 따르면 오후에 비가 온대요.' },
        { ko: '들르다', uz: 'Yo‘l-yo‘lakay kirib o‘tmoq', ex: '퇴근길에 마트에 들렀어요.' }
      ],
      dialogue: [
        { sp: '현우', ko: '토히르벡 씨, 내일 모임에 민지 씨도 와요?', uz: 'Tokhirbek, ertangi yig‘ilishga Minji ham keladimi?' },
        { sp: '토히르벡', ko: '아니요, 아까 전화했는데 시험 때문에 못 온다고 했어요.', uz: 'Yo‘q, boya qo‘ng‘iroq qilgandi, imtihon sababli kela olmayman deb aytdi.' }
      ],
      quizzes: [
        { q: "'Do‘stim ertaga kelaman deb aytdi' — to‘g‘ri bilvosita nutq shakli:", opts: ['친구가 내일 온다고 했어요', '친구가 내일 오라고 했어요', '친구가 내일 오자고 했어요', '친구가 내일 오냐고 했어요'], ans: '친구가 내일 온다고 했어요', exp: "Darak gapni yetkazishda fe'lga '-ㄴ/는다고 하다' qo‘shiladi." },
        { q: "'Yomg‘ir yog‘ayotganga o‘xshaydi' qanday tarjima qilinadi?", opts: ['비가 오는 것 같아요', '비가 온 것 같아요', '비가 올 것 같아요', '비가 오기 때문이에요'], ans: '비가 오는 것 같아요', exp: "Hozirgi zamon taxmini: '-는 것 같다'." }
      ]
    },
    {
      id: '3b',
      code: '3B',
      title: '서울대 한국어 3B',
      level: 'O‘rta 2 • TOPIK 3–4',
      color: 'from-purple-600 to-fuchsia-800',
      topics: 'Afsuslanish, Ma’lumot manbasi va Qaror qabul qilish',
      grammar: [
        { pattern: 'V-(으)ㄹ 뻔하다', desc: 'Biror hodisaga sal qolish (-ishiga sal qoldi).', ex: '늦잠을 자서 비행기를 놓칠 뻔했어요. (Uxlab qolib samolyotga kech qolishimga sal qoldi.)' },
        { pattern: 'V-기로 하다', desc: 'Qaror qabul qilish va kelishish (-ishga qaror qildim).', ex: '건강을 위해 매일 30분씩 걷기로 했어요. (Sog‘liq uchun har kuni 30 daqiqa piyoda yurishga qaror qildim.)' },
        { pattern: 'A/V-거든요', desc: 'Suhbatdosh bilmagan sababni tushuntirish (-chunki ...-da).', ex: '오늘 사람이 많네요. 주말이거든요. (Bugun odam ko‘p-a. Chunki dam olish kuni-da.)' }
      ],
      vocab: [
        { ko: '놓치다', uz: 'O‘tkazib yubormoq / Kech qolmoq', ex: '마지막 버스를 놓쳤어요.' },
        { ko: '결심하다', uz: 'Qat’iy qaror qilmoq', ex: '올해는 꼭 금연하기로 결심했어요.' },
        { ko: '사과하다', uz: 'Uzr so‘ramoq', ex: '늦어서 정말 죄송하다고 사과했어요.' }
      ],
      dialogue: [
        { sp: '지민', ko: '오늘 아침에 왜 그렇게 급하게 뛰어왔어요?', uz: 'Bugun ertalab nega bunchalik shoshib yugurib keldingiz?' },
        { sp: '토히르벡', ko: '알람을 못 들어서 지각할 뻔했거든요!', uz: 'Budilnikni eshitmay qolib, darsga kech qolishimga sal qoldi-da!' }
      ],
      quizzes: [
        { q: "'Avtobusga kech qolishimga sal qoldi' iborasi qaysi?", opts: ['버스를 놓칠 뻔했어요', '버스를 놓치기로 했어요', '버스를 놓친 적이 있어요', '버스를 놓칠 수 있어요'], ans: '버스를 놓칠 뻔했어요', exp: "Biror salbiy holatga sal qolish '-(으)ㄹ 뻔하다' bilan ifodalanadi." },
        { q: "'Har kuni koreyscha o‘qishga qaror qildim' — to‘g‘ri javob:", opts: ['매일 한국어를 공부하기로 했어요', '매일 한국어를 공부할 뻔했어요', '매일 한국어를 공부하거든요', '매일 한국어를 공부한 셈이에요'], ans: '매일 한국어를 공부하기로 했어요', exp: "Qaror qabul qilish: 'V-기로 하다'." }
      ]
    },
    {
      id: '4a',
      code: '4A',
      title: '서울대 한국어 4A',
      level: 'Yuqori-o‘rta 1 • TOPIK 4',
      color: 'from-rose-500 to-red-700',
      topics: 'Ijtimoiy mavzular, Passiv fe’llar va Qiyosiy tahlil',
      grammar: [
        { pattern: 'V-는 반면에', desc: 'Ikki qarama-qarshi jihatni solishtirish (-bir tomondan ... ikkinchi tomondan).', ex: '도시 생활은 편리한 반면에 스트레스가 많아요. (Shahar hayoti qulay bo‘lgani holda, stress ko‘p.)' },
        { pattern: 'A/V-(으)ㄹ 뿐만 아니라', desc: 'Nafaqat ..., balki ... ham.', ex: '그는 한국어뿐만 아니라 영어도 유창하게 해요. (U nafaqat koreys, balki ingliz tilida ham ravon gapiradi.)' },
        { pattern: '피동사 (-이/히/리/기-)', desc: 'Majhul nisbat (Passiv fe’llar: 보이다, 들리다, 열리다, 잠기다).', ex: '창문이 바람에 저절로 닫혔어요. (Deraza shamoldan o‘z-o‘zidan yopildi.)' }
      ],
      vocab: [
        { ko: '유창하다', uz: 'Ravon (tilda)', ex: '외국어를 유창하게 구사해요.' },
        { ko: '편리하다', uz: 'Qulay', ex: '한국은 대중교통이 매우 편리해요.' },
        { ko: '환경오염', uz: 'Atrof-muhit ifloslanishi', ex: '환경오염 문제를 해결해야 합니다.' }
      ],
      dialogue: [
        { sp: '교수님', ko: '온라인 수업의 장단점은 무엇이라고 생각합니까?', uz: 'Onlayn darslarning yutuq va kamchiliklari nimada deb o‘ylaysiz?' },
        { sp: '토히르벡', ko: '시간과 장소를 절약할 수 있는 반면에 집중력이 떨어질 수 있습니다.', uz: 'Vaqt va joyni tejash mumkin bo‘lgani holda, diqqat susayishi mumkin.' }
      ],
      quizzes: [
        { q: "'Nafaqat koreys tili, balki ingliz tilini ham biladi' — to‘g‘ri qo‘shimcha:", opts: ['뿐만 아니라', '는 길에', 'ㄹ 뻔하다', '거든요'], ans: '뿐만 아니라', exp: "'N-(으)ㄹ 뿐만 아니라' — nafaqat ..., balki ... ham." },
        { q: "'Eshik ochildi' (Majhul nisbat) qaysi fe'l?", opts: ['문이 열렸어요', '문을 열었어요', '문을 열게 했어요', '문을 열고 있어요'], ans: '문이 열렸어요', exp: "'열다' (ochmoq) -> '열리다' (ochilmoq)." }
      ]
    },
    {
      id: '4b',
      code: '4B',
      title: '서울대 한국어 4B',
      level: 'Yuqori-o‘rta 2 • TOPIK 4–5',
      color: 'from-red-600 to-rose-900',
      topics: 'Madaniyat, Texnologiya taraqqiyoti va Sabab-oqibat tahlili',
      grammar: [
        { pattern: 'N 덕분에 / N 탓에', desc: 'Ijobiy sabab (-sharofati bilan) vs Salbiy sabab (-aybi/tufayli).', ex: '선생님 덕분에 장학금을 받게 되었어요. (Ustozim sharofati bilan stipendiya oladigan bo‘ldim.)' },
        { pattern: 'V-는 바람에', desc: 'Kutilmagan salbiy sabab (-sababli / -kasriga).', ex: '갑자기 정전이 되는 바람에 파일을 저장 못 했어요. (To‘satdan chiroq o‘chgani sababli faylni saqlay olmadim.)' }
      ],
      vocab: [
        { ko: '장학금', uz: 'Stipendiya', ex: '성적이 우수해서 장학금을 받았어요.' },
        { ko: '정전', uz: 'Elektr uzilishi', ex: '태풍 때문에 정전이 되었습니다.' },
        { ko: '발전하다', uz: 'Rivojlanmoq', ex: '인공지능 기술이 빠르게 발전하고 있어요.' }
      ],
      dialogue: [
        { sp: '동기', ko: '축하해요! 이번에 성적 우수 장학금을 받았다면서요?', uz: 'Tabriklayman! Bu safar a'lochi stipendiyasini olgan ekansiz-a?' },
        { sp: '토히르벡', ko: '고마워요. 모두 열심히 도와준 친구들 덕분이에요.', uz: 'Rahmat. Barchasi astoydil yordam bergan do‘stlarim sharofati bilan.' }
      ],
      quizzes: [
        { q: "Ijobiy natija uchun minnatdorchilik bildirishda qaysi so‘z ishlatiladi?", opts: ['덕분에', '탓에', '바람에', '불구하고'], ans: '덕분에', exp: "'덕분에' — sharofati bilan (ijobiy natijada)." }
      ]
    },
    {
      id: '5a',
      code: '5A',
      title: '서울대 한국어 5A',
      level: 'Oliy 1 • TOPIK 5',
      color: 'from-amber-500 to-orange-700',
      topics: 'Iqtisodiyot, OAV, Jamiyat va Rasmiy nutq',
      grammar: [
        { pattern: 'V-는 데 반해', desc: 'Rasmiy yozma nutqda keskin qarama-qarshilik.', ex: '수출이 증가한 데 반해 내수 시장은 위축되었다. (Eksport oshgan bir paytda ichki bozor qisqardi.)' },
        { pattern: 'A/V-(으)ㄴ/는 셈이다', desc: 'Xulosa qilish (-hisoblanadi / -degani).', ex: '이 정도면 성공한 셈이에요. (Bu daraja bo‘lsa muvaffaqiyatga erishilgan hisoblanadi.)' }
      ],
      vocab: [
        { ko: '경제 성장', uz: 'Iqtisodiy o‘sish', ex: '지속 가능한 경제 성장이 중요합니다.' },
        { ko: '인공지능', uz: 'Sun’iy intellekt (AI)', ex: '인공지능이 산업 구조를 바꾸고 있다.' },
        { ko: '해결책', uz: 'Yechim yo‘li', ex: '근본적인 해결책을 모색해야 한다.' }
      ],
      dialogue: [
        { sp: '기자', ko: '이번 정책이 청년 일자리 창출에 효과가 있을까요?', uz: 'Ushbu siyosat yoshlar ish o‘rinlarini yaratishda samara beradimi?' },
        { sp: '전문가', ko: '단기적으로는 효과가 있겠으나 장기적인 대책이 필요합니다.', uz: 'Qisqa muddatda samara bersa-da, uzoq muddatli chora-tadbirlar zarur.' }
      ],
      quizzes: [
        { q: "'Bu daraja bo‘lsa deyarli tugatgan hisoblanamiz' — to‘g‘ri grammatika:", opts: ['다 끝낸 셈이에요', '다 끝낼 뻔했어요', '다 끝내는 길이에요', '다 끝내거든요'], ans: '다 끝낸 셈이에요', exp: "Umumiy xulosa chiqarish uchun '-(으)ㄴ/는 셈이다' ishlatiladi." }
      ]
    },
    {
      id: '5b',
      code: '5B',
      title: '서울대 한국어 5B',
      level: 'Oliy 2 • TOPIK 5',
      color: 'from-orange-600 to-amber-900',
      topics: 'Psixologiya, Ekologiya, Maqollar (속담) va Idiomalar',
      grammar: [
        { pattern: 'N에 불과하다', desc: 'Biror narsaning kichik yoki cheklangan ekanligini ta’kidlash (-dan iborat xolos).', ex: '그것은 시작에 불과합니다. (Bu faqat boshlanishi xolos.)' },
        { pattern: 'V-기 마련이다', desc: 'Tabiiy qonuniyat (-ishi tabiiy / muqarrar).', ex: '노력하면 좋은 결과가 따르기 마련이다. (Harakat qilsangiz, yaxshi natija kelishi tabiiy.)' }
      ],
      vocab: [
        { ko: '불과하다', uz: 'Xolos / Bor-yo‘g‘i', ex: '빙산의 일각에 불과하다.' },
        { ko: '속담', uz: 'Maqol', ex: '‘가는 말이 고와야 오는 말이 곱다’는 한국 속담이다.' },
        { ko: '필연적', uz: 'Muqarrar / Qonuniy', ex: '변화는 필연적인 과정이다.' }
      ],
      dialogue: [
        { sp: '선배', ko: '처음부터 완벽할 수는 없으니 너무 조급해하지 마.', uz: 'Boshidan mukammal bo‘lish mumkin emas, shuning uchun shoshilma.' },
        { sp: '토히르벡', ko: '맞아요, 천 리 길도 한 걸음부터라고 하잖아요.', uz: 'To‘g‘ri, ming chaqirimlik yo‘l ham bir qadamdan boshlanadi deyishadi-ku.' }
      ],
      quizzes: [
        { q: "'가는 말이 고와야 오는 말이 곱다' maqolining ma'nosi nima?", opts: ['Yaxshi gapirsang, yaxshi javob olasan', 'Vaqt — oliy hakam', 'Mehnatning tagi rohat', 'Ko‘z qo‘rqoq, qo‘l botir'], ans: 'Yaxshi gapirsang, yaxshi javob olasan', exp: "So‘zma-so‘z: 'Ketayotgan so‘z chiroyli bo‘lsa, kelayotgan so‘z ham chiroyli bo‘ladi'." }
      ]
    },
    {
      id: '6a',
      code: '6A',
      title: '서울대 한국어 6A',
      level: 'Akademik Oliy 1 • TOPIK 6',
      color: 'from-violet-600 to-indigo-950',
      topics: 'Falsafa, Ilmiy tadqiqotlar, Siyosat va Huquq',
      grammar: [
        { pattern: 'V-는 바이다', desc: 'Rasmiy bayonot va akademik xulosa (-moqdamiz / -hisoblanadi).', ex: '본 연구는 새로운 가능성을 제시하는 바이다. (Ushbu tadqiqot yangi imkoniyatni ko‘rsatib bermoqda.)' },
        { pattern: 'N을/를 막론하고', desc: 'Qat’i nazar (-dan qat’i nazar).', ex: '남녀노소를 막론하고 누구나 참여할 수 있다. (Yoshu qaridan qat’i nazar hamma qatnasha oladi.)' }
      ],
      vocab: [
        { ko: '막론하다', uz: 'Qat’i nazar / Inobatga olmasdan', ex: '이유를 막론하고 약속은 지켜야 한다.' },
        { ko: '패러다임', uz: 'Paradigma (Ilmiy model)', ex: '시대의 패러다임이 전환되고 있다.' },
        { ko: '고찰하다', uz: 'Chuqur tadqiq va tahlil qilmoq', ex: '역사적 배경을 심층적으로 고찰하였다.' }
      ],
      dialogue: [
        { sp: '심사위원', ko: '논문의 핵심 주장을 한 문장으로 요약해 주시겠습니까?', uz: 'Dissertatsiyaning asosiy g‘oyasini bir jumla bilan xulosalab berasizmi?' },
        { sp: '토히르벡', ko: '본 논문은 AI 기반 교육 시스템의 효율성을 실증적으로 규명한 바입니다.', uz: 'Ushbu maqola AI asosidagi ta’lim tizimining samaradorligini amaliy isbotlab berdi.' }
      ],
      quizzes: [
        { q: "'Yoshu qaridan qat’i nazar' iborasining TOPIK 6 darajasidagi shakli:", opts: ['남녀노소를 막론하고', '남녀노소 덕분에', '남녀노소 탓에', '남녀노소뿐만 아니라'], ans: '남녀노소를 막론하고', exp: "'N을/를 막론하고' — ...-dan qat'i nazar." }
      ]
    },
    {
      id: '6b',
      code: '6B',
      title: '서울대 한국어 6B',
      level: 'Akademik Oliy 2 • TOPIK 6 Master',
      color: 'from-fuchsia-700 to-slate-950',
      topics: 'Adabiyot, Tarixiy tahlil, Notiqlik va TOPIK 6 Yakuniy',
      grammar: [
        { pattern: 'V-(으)ㄹ 따름이다', desc: 'Boshqa chora yoki qo‘shimcha fikr yo‘qligi (-xolos / -dan boshqa iloj yo‘q).', ex: '최선을 다한 후 결과를 기다릴 따름이다. (Bor kuchni sarflagach, natijani kutish qoldi xolos.)' },
        { pattern: 'A/V-다시피 하다', desc: 'Deyarli ... qilmoq (-gandek bo‘lmoq).', ex: '시험 기간에는 도서관에서 살다시피 했어요. (Imtihon paytida kutubxonada yashagandek bo‘ldim.)' }
      ],
      vocab: [
        { ko: '규명하다', uz: 'Aniqlamoq / Ochib bermoq', ex: '사건의 진상을 철저히 규명했다.' },
        { ko: '비약적', uz: 'Sakrashsimon / Juda tez', ex: '비약적인 발전을 이루었다.' },
        { ko: '귀감', uz: 'Ibrati / Namuna', ex: '사회적 귀감이 되는 인물이다.' }
      ],
      dialogue: [
        { sp: '원장님', ko: '서울대 한국어 1A부터 6B까지 모든 과정을 마친 것을 축하합니다!', uz: 'Seul Milliy Universiteti 1A dan 6B gacha barcha bosqichni tugatganingiz bilan tabriklayman!' },
        { sp: '토히르벡', ko: '감사합니다! 이제 한국어로 어떤 전문 분야든 자신 있게 소통할 수 있습니다.', uz: 'Rahmat! Endi koreys tilida har qanday sohada ishonch bilan muloqot qila olaman.' }
      ],
      quizzes: [
        { q: "'Imtihon paytida kutubxonada yashagandek bo‘ldim' — eng tabiiy TOPIK 6 iborasi:", opts: ['도서관에서 살다시피 했어요', '도서관에서 살 뻔했어요', '도서관에서 사는 길이에요', '도서관에서 살기 마련이에요'], ans: '도서관에서 살다시피 했어요', exp: "'-다시피 하다' — deyarli shunday qilmoq." }
      ]
    }
  ];

  // Kitobni ochish va savollarni har safar yangidan aralashtirish
  const openBookStudy = (book, initialSection = 'grammar') => {
    setSelectedBook(book);
    setStudySection(initialSection);
    // Har kirganda ham savollar tartibi, ham variantlar tartibi aralashtiriladi!
    const randomized = shuffleArray(book.quizzes).map(q => ({
      ...q,
      opts: shuffleArray(q.opts)
    }));
    setShuffledQuizzes(randomized);
    setQuizIdx(0);
    setSelectedOption(null);
    setQuizScore(0);
    setQuizFinished(false);
    setActiveTab('book_study');
  };

  // Barcha kitoblardan umumiy lug‘at (Flashcards uchun)
  const allKoreanWords = snuBooks.flatMap(b => b.vocab.map(v => ({ ...v, book: b.code })));

  const theme = {
    bg: isDarkMode ? 'bg-[#080c16] text-slate-100' : 'bg-[#f4f6fb] text-slate-900',
    card: isDarkMode ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-sm',
    subCard: isDarkMode ? 'bg-[#192236] border-slate-700/70' : 'bg-slate-100 border-slate-200',
    header: isDarkMode ? 'bg-[#080c16]/95 border-b border-slate-800' : 'bg-white/95 border-b border-slate-200',
    textMain: isDarkMode ? 'text-white' : 'text-slate-900',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-slate-500',
    navBg: isDarkMode ? 'bg-[#0d1322]/95 border-t border-slate-800' : 'bg-white/95 border-t border-slate-200',
    inputBg: isDarkMode ? 'bg-[#161f33] border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
  };

  // =========================================================================
  // 0. KIRISH EKRANI
  // =========================================================================
  if (!currentUser) {
    return (
      <div className={`min-h-screen w-full ${theme.bg} flex flex-col justify-between p-6 font-sans`}>
        <div className="max-w-md w-full mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 border-b-4 border-indigo-900 flex items-center justify-center text-white font-black text-lg">
              한
            </div>
            <div>
              <span className={`font-black text-base block leading-none ${theme.textMain}`}>서울대 한국어</span>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">1A — 6B Akademiya</span>
            </div>
          </div>
          <button onClick={toggleTheme} className={`p-2.5 rounded-2xl ${theme.subCard} border`}>
            {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
          </button>
        </div>

        <div className="max-w-md w-full mx-auto my-auto py-6">
          {authMode === 'welcome' ? (
            <div className="text-center space-y-6">
              <div className="w-28 h-28 mx-auto rounded-[32px] bg-gradient-to-br from-indigo-600 to-emerald-500 border-b-8 border-indigo-950 flex flex-col items-center justify-center text-white shadow-2xl">
                <span className="text-4xl font-black">가나다</span>
                <span className="text-[10px] font-black tracking-widest mt-1">1A ~ 6B</span>
              </div>
              <div className="space-y-2">
                <h1 className={`text-2xl font-black ${theme.textMain}`}>
                  Koreys tilini Hangul alifbosidan TOPIK 6 gacha o‘rganing!
                </h1>
                <p className={`text-xs ${theme.textMuted} max-w-xs mx-auto leading-relaxed`}>
                  Seul Milliy Universitetining (서울대 한국어 1A–6B) barcha 12 ta kitobi, grammatikasi, audiolari va dinamik testlari bitta ilovada.
                </p>
              </div>
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleGuestLogin}
                  className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 border-b-4 border-emerald-700 text-white font-black text-sm uppercase shadow-xl"
                >
                  Akkauntsiz Boshlash (Tezkor kirish)
                </button>
                <button
                  onClick={handleGoogleLogin}
                  className={`w-full py-4 rounded-2xl ${theme.card} border-2 border-b-4 font-black text-sm ${theme.textMain} flex items-center justify-center gap-2`}
                >
                  <span>Google bilan davom etish</span>
                </button>
                <button onClick={() => setAuthMode('login')} className="text-xs font-bold text-indigo-400">
                  Email va Parol orqali kirish
                </button>
              </div>
            </div>
          ) : (
            <div className={`${theme.card} border-2 rounded-3xl p-6 space-y-4`}>
              <div className="flex items-center justify-between">
                <button onClick={() => setAuthMode('welcome')} className={`p-2 rounded-xl ${theme.subCard}`}><ArrowLeft size={18} /></button>
                <h2 className={`font-black text-base ${theme.textMain}`}>{authMode === 'login' ? 'Kirish' : 'Ro‘yxatdan o‘tish'}</h2>
                <div className="w-8" />
              </div>
              {authError && <div className="p-3 rounded-xl bg-rose-500/15 text-rose-400 text-xs font-bold text-center">{authError}</div>}
              <form onSubmit={handleEmailAuth} className="space-y-3">
                {authMode === 'register' && (
                  <input type="text" placeholder="Ismingiz" value={authForm.name} onChange={e => setAuthForm({ ...authForm, name: e.target.value })} className={`w-full ${theme.inputBg} border-2 rounded-2xl px-4 py-3 text-xs font-bold`} />
                )}
                <input type="email" placeholder="Email" value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })} className={`w-full ${theme.inputBg} border-2 rounded-2xl px-4 py-3 text-xs font-bold`} />
                <input type="password" placeholder="Parol" value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })} className={`w-full ${theme.inputBg} border-2 rounded-2xl px-4 py-3 text-xs font-bold`} />
                <button type="submit" disabled={authLoading} className="w-full py-3.5 rounded-2xl bg-indigo-600 border-b-4 border-indigo-800 text-white font-black text-xs uppercase">
                  {authLoading ? 'Yuklanmoqda...' : 'Davom etish'}
                </button>
              </form>
              <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="w-full text-xs font-bold text-indigo-400">
                {authMode === 'login' ? "Akkaunt yaratish" : "Tizimga kirish"}
              </button>
            </div>
          )}
        </div>
        <div className="text-center text-[11px] text-slate-500">서울대 한국어 1A–6B • Koreys Tili Akademiyasi</div>
      </div>
    );
  }

  // =========================================================================
  // 1. ASOSIY SAHIFA: HANGUL + 서울대 한국어 1A–6B KUTUBXONASI
  // =========================================================================
  const renderBooksLibrary = () => (
    <div className="space-y-5 pb-24">
      {/* 0-BOSQICH: HANGUL ALIFBOSI KARTASI */}
      <div 
        onClick={() => setActiveTab('hangul')}
        className="rounded-3xl p-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white border-b-4 border-emerald-950 shadow-xl cursor-pointer active:scale-98 transition"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-wider">
              0-BOSQICH • ASOSIY ALIFBO
            </span>
            <h2 className="text-xl font-black">한글 (Hangul Alifbosi)</h2>
            <p className="text-xs text-white/85">14 ta undosh, 10 ta unli va audio talaffuz jadvali</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-black">
            가나다
          </div>
        </div>
      </div>

      {/* KITOBLAR SARLAVHASI */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className={`text-base font-black ${theme.textMain}`}>서울대 한국어 (1A — 6B)</h3>
          <p className={`text-[11px] ${theme.textMuted}`}>Seul Milliy Universitetining 12 jildlik to‘liq dasturi</p>
        </div>
        <span className="text-xs font-black text-indigo-400">
          {userProfile.completedBooks.length} / {snuBooks.length + 1}
        </span>
      </div>

      {/* 12 TA KITOB GRID (1A dan 6B gacha) */}
      <div className="grid grid-cols-2 gap-3">
        {snuBooks.map((book) => {
          const isDone = userProfile.completedBooks.includes(book.id);
          return (
            <div
              key={book.id}
              onClick={() => openBookStudy(book, 'grammar')}
              className={`${theme.card} border-2 hover:border-indigo-500 rounded-3xl p-4 flex flex-col justify-between cursor-pointer transition active:scale-95 relative overflow-hidden`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-xl bg-gradient-to-r ${book.color} text-white font-black text-xs shadow`}>
                    {book.code}
                  </span>
                  {isDone && <CheckCircle2 size={18} className="text-emerald-500" />}
                </div>
                <h4 className={`font-black text-sm ${theme.textMain}`}>{book.title}</h4>
                <div className="text-[10px] font-bold text-indigo-400 mt-0.5">{book.level}</div>
                <p className={`text-[10px] ${theme.textMuted} mt-2 line-clamp-2 leading-relaxed`}>
                  {book.topics}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-800/30 flex items-center justify-between text-[10px] font-black text-emerald-500">
                <span>{book.grammar.length} grammatika • {book.quizzes.length} test</span>
                <ArrowRight size={13} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // =========================================================================
  // 2. HANGUL ALIFBOSI INTERAKTIV DARSI
  // =========================================================================
  const renderHangul = () => (
    <div className="space-y-5 pb-24">
      <div className="flex items-center justify-between">
        <button onClick={() => setActiveTab('books')} className={`flex items-center gap-1.5 text-xs font-black text-indigo-400 ${theme.subCard} border px-3 py-2 rounded-xl`}>
          <ArrowLeft size={16} /> Kitoblarga qaytish
        </button>
        <span className="text-xs font-black text-emerald-500">Harf ustiga bosing 🔊</span>
      </div>

      <div className={`${theme.card} border rounded-3xl p-4 space-y-3`}>
        <h3 className={`font-black text-sm ${theme.textMain}`}>1. Asosiy Undoshlar (자음 - 14 ta)</h3>
        <div className="grid grid-cols-2 gap-2">
          {hangulConsonants.map(c => (
            <button
              key={c.char}
              onClick={() => speakKo(c.ex.split(' ')[0])}
              className={`${theme.subCard} border hover:border-emerald-500 rounded-2xl p-3 flex items-center justify-between text-left transition active:scale-95`}
            >
              <div>
                <div className="text-2xl font-black text-emerald-400">{c.char}</div>
                <div className={`text-[11px] font-bold ${theme.textMain}`}>{c.name}</div>
                <div className="text-[10px] text-slate-400">{c.ex}</div>
              </div>
              <Volume2 size={16} className="text-indigo-400 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      <div className={`${theme.card} border rounded-3xl p-4 space-y-3`}>
        <h3 className={`font-black text-sm ${theme.textMain}`}>2. Asosiy Unlilar (모음 - 10 ta)</h3>
        <div className="grid grid-cols-2 gap-2">
          {hangulVowels.map(v => (
            <button
              key={v.char}
              onClick={() => speakKo(v.ex.split(' ')[0])}
              className={`${theme.subCard} border hover:border-indigo-500 rounded-2xl p-3 flex items-center justify-between text-left transition active:scale-95`}
            >
              <div>
                <div className="text-2xl font-black text-indigo-400">{v.char}</div>
                <div className={`text-[11px] font-bold ${theme.textMain}`}>{v.name}</div>
                <div className="text-[10px] text-slate-400">{v.ex}</div>
              </div>
              <Volume2 size={16} className="text-emerald-400 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          setUserProfile(prev => ({
            ...prev,
            xp: prev.xp + 50,
            completedBooks: [...new Set([...prev.completedBooks, 'hangul'])]
          }));
          setActiveTab('books');
        }}
        className="w-full py-4 rounded-2xl bg-emerald-500 border-b-4 border-emerald-700 text-white font-black text-xs uppercase"
      >
        Hangul Alifbosini Yakunlash (+50 XP)
      </button>
    </div>
  );

  // =========================================================================
  // 3. TANLANGAN KITOB ICHIDA O‘QISH (GRAMMATIKA, LUG‘AT, DIALOG, RANDOM TEST)
  // =========================================================================
  const renderBookStudy = () => {
    if (!selectedBook) return null;
    const currentQ = shuffledQuizzes[quizIdx];

    return (
      <div className="space-y-4 pb-24">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <button onClick={() => setActiveTab('books')} className={`flex items-center gap-1.5 text-xs font-black text-indigo-400 ${theme.subCard} border px-3 py-2 rounded-xl`}>
            <ArrowLeft size={16} /> Kitoblar
          </button>
          <span className={`px-3 py-1 rounded-xl bg-gradient-to-r ${selectedBook.color} text-white font-black text-xs`}>
            {selectedBook.title}
          </span>
        </div>

        {/* 4 ta bo‘lim */}
        <div className="grid grid-cols-4 gap-1.5 text-[11px] font-black">
          {[
            { id: 'grammar', label: 'Grammatika' },
            { id: 'vocab', label: `Lug‘at (${selectedBook.vocab.length})` },
            { id: 'dialogue', label: 'Dialog' },
            { id: 'quiz', label: `Test (${shuffledQuizzes.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStudySection(tab.id)}
              className={`py-2.5 rounded-xl transition ${
                studySection === tab.id ? 'bg-indigo-600 text-white shadow' : `${theme.subCard} ${theme.textMuted}`
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* GRAMMATIKA */}
        {studySection === 'grammar' && (
          <div className="space-y-3">
            {selectedBook.grammar.map((g, i) => (
              <div key={i} className={`${theme.card} border rounded-3xl p-4 space-y-2`}>
                <div className="text-sm font-black text-emerald-400">{g.pattern}</div>
                <p className={`text-xs ${theme.textMain} leading-relaxed`}>{g.desc}</p>
                <div
                  onClick={() => speakKo(g.ex.split('(')[0])}
                  className={`p-3 rounded-2xl ${theme.subCard} border text-xs flex items-center justify-between cursor-pointer`}
                >
                  <span className="font-bold text-indigo-300">{g.ex}</span>
                  <Volume2 size={16} className="text-indigo-400 shrink-0 ml-2" />
                </div>
              </div>
            ))}
            <button onClick={() => setStudySection('vocab')} className="w-full py-3.5 rounded-2xl bg-emerald-500 border-b-4 border-emerald-700 text-white font-black text-xs uppercase">
              Lug‘atga o‘tish →
            </button>
          </div>
        )}

        {/* LUG‘AT */}
        {studySection === 'vocab' && (
          <div className="space-y-2.5">
            {selectedBook.vocab.map((v, i) => (
              <div
                key={i}
                onClick={() => speakKo(v.ko)}
                className={`${theme.card} border rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:border-indigo-500`}
              >
                <div>
                  <div className={`text-base font-black ${theme.textMain}`}>{v.ko}</div>
                  <div className="text-xs text-emerald-400 font-bold">{v.uz}</div>
                  <div className={`text-[11px] ${theme.textMuted} mt-1`}>{v.ex}</div>
                </div>
                <Volume2 size={20} className="text-indigo-400" />
              </div>
            ))}
            <button onClick={() => setStudySection('dialogue')} className="w-full py-3.5 rounded-2xl bg-emerald-500 border-b-4 border-emerald-700 text-white font-black text-xs uppercase">
              Dialogga o‘tish →
            </button>
          </div>
        )}

        {/* DIALOG */}
        {studySection === 'dialogue' && (
          <div className={`${theme.card} border rounded-3xl p-4 space-y-3`}>
            {selectedBook.dialogue.map((d, i) => (
              <div
                key={i}
                onClick={() => speakKo(d.ko)}
                className={`p-3.5 rounded-2xl ${theme.subCard} border space-y-1 cursor-pointer`}
              >
                <div className="flex justify-between text-xs font-black text-indigo-400">
                  <span>{d.sp}</span>
                  <Volume2 size={15} />
                </div>
                <div className={`text-sm font-bold ${theme.textMain}`}>{d.ko}</div>
                <div className={`text-[11px] ${theme.textMuted}`}>{d.uz}</div>
              </div>
            ))}
            <button onClick={() => setStudySection('quiz')} className="w-full py-3.5 rounded-2xl bg-emerald-500 border-b-4 border-emerald-700 text-white font-black text-xs uppercase">
              Testlarni boshlash →
            </button>
          </div>
        )}

        {/* DINAMIK ARALASH TESTLAR (HAR KIRGANDA YANGILANADI) */}
        {studySection === 'quiz' && (
          <div className={`${theme.card} border-2 rounded-3xl p-5 space-y-4`}>
            <div className="flex items-center justify-between text-xs font-black">
              <span className="text-indigo-400 flex items-center gap-1">
                <Shuffle size={14} /> Aralash Test: {quizIdx + 1} / {shuffledQuizzes.length}
              </span>
              <button
                onClick={() => openBookStudy(selectedBook, 'quiz')}
                className="text-[11px] text-emerald-400 underline"
              >
                Savollarni qayta aralashtirish
              </button>
            </div>

            {!quizFinished && currentQ ? (
              <>
                <h4 className={`font-black text-base leading-snug ${theme.textMain}`}>{currentQ.q}</h4>
                <div className="space-y-2">
                  {currentQ.opts.map((opt) => {
                    const isPicked = selectedOption === opt;
                    const isRight = opt === currentQ.ans;
                    return (
                      <button
                        key={opt}
                        disabled={selectedOption !== null}
                        onClick={() => {
                          setSelectedOption(opt);
                          if (isRight) {
                            setQuizScore(s => s + 1);
                          } else if (!userProfile.isPro) {
                            setUserProfile(prev => ({ ...prev, hearts: Math.max(0, prev.hearts - 1) }));
                          }
                        }}
                        className={`w-full py-3.5 px-4 rounded-2xl text-left border-2 text-xs font-bold transition ${
                          selectedOption !== null
                            ? isRight
                              ? 'bg-emerald-500 text-white border-emerald-700'
                              : isPicked
                                ? 'bg-rose-500 text-white border-rose-700'
                                : `${theme.subCard} opacity-60`
                            : `${theme.subCard} ${theme.textMain} hover:border-indigo-500`
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {selectedOption && (
                  <div className={`p-3.5 rounded-2xl text-xs ${selectedOption === currentQ.ans ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}>
                    <div className="font-black">{selectedOption === currentQ.ans ? "To‘g‘ri! 🎉" : `Xato! To‘g‘ri javob: ${currentQ.ans}`}</div>
                    <p className={`mt-1 ${theme.textMuted}`}>{currentQ.exp}</p>
                  </div>
                )}

                {selectedOption && (
                  <button
                    onClick={() => {
                      if (quizIdx + 1 < shuffledQuizzes.length) {
                        setQuizIdx(quizIdx + 1);
                        setSelectedOption(null);
                      } else {
                        setQuizFinished(true);
                        setUserProfile(prev => ({
                          ...prev,
                          xp: prev.xp + quizScore * 20 + 30,
                          completedBooks: [...new Set([...prev.completedBooks, selectedBook.id])]
                        }));
                      }
                    }}
                    className="w-full py-3.5 rounded-2xl bg-indigo-600 border-b-4 border-indigo-800 text-white font-black text-xs uppercase"
                  >
                    {quizIdx + 1 < shuffledQuizzes.length ? 'Keyingi savol →' : 'Natijani ko‘rish'}
                  </button>
                )}
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="text-5xl">🏆</div>
                <h3 className={`text-xl font-black ${theme.textMain}`}>
                  Natija: {quizScore} / {shuffledQuizzes.length}
                </h3>
                <p className="text-xs text-emerald-400 font-bold">
                  +{quizScore * 20 + 30} XP qo‘shildi!
                </p>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => openBookStudy(selectedBook, 'quiz')}
                    className={`flex-1 py-3 rounded-2xl ${theme.subCard} border font-black text-xs`}
                  >
                    Qayta yechish (Yangi tartib)
                  </button>
                  <button
                    onClick={() => setActiveTab('books')}
                    className="flex-1 py-3 rounded-2xl bg-emerald-500 text-white font-black text-xs"
                  >
                    Kitoblarga qaytish
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // =========================================================================
  // 4. BARCHA KITOBLAR LUG‘ATI (FLASHCARDS)
  // =========================================================================
  const renderFlashcards = () => {
    const card = allKoreanWords[cardIdx % allKoreanWords.length];
    return (
      <div className="space-y-5 pb-24">
        <div className="flex items-center justify-between">
          <h2 className={`text-base font-black ${theme.textMain}`}>1A–6B Lug‘at Kartochkalari</h2>
          <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-xs font-black">
            서울대 {card.book}
          </span>
        </div>

        <div
          onClick={() => { setIsFlipped(!isFlipped); speakKo(card.ko); }}
          className={`${theme.card} border-2 border-b-8 rounded-3xl p-8 min-h-[260px] flex flex-col items-center justify-center text-center cursor-pointer space-y-4`}
        >
          <span className="text-[10px] font-black uppercase text-indigo-400">
            {isFlipped ? 'O‘zbekcha tarjimasi' : 'Talaffuz va tarjima uchun bosing'}
          </span>
          {!isFlipped ? (
            <>
              <div className={`text-4xl font-black ${theme.textMain}`}>{card.ko}</div>
              <Volume2 size={24} className="text-emerald-400" />
            </>
          ) : (
            <>
              <div className="text-2xl font-black text-emerald-400">{card.uz}</div>
              <p className={`text-xs ${theme.textMuted}`}>"{card.ex}"</p>
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => { setIsFlipped(false); setCardIdx(Math.floor(Math.random() * allKoreanWords.length)); }} className={`py-3.5 rounded-2xl ${theme.card} border font-black text-xs flex items-center justify-center gap-1.5`}>
            <Shuffle size={15} /> Tasodifiy so‘z
          </button>
          <button onClick={() => { setIsFlipped(false); setCardIdx(c => c + 1); setUserProfile(p => ({ ...p, xp: p.xp + 5 })); }} className="py-3.5 rounded-2xl bg-emerald-500 border-b-4 border-emerald-700 text-white font-black text-xs">
            Keyingi (+5 XP) →
          </button>
        </div>
      </div>
    );
  };

  // =========================================================================
  // ASOSIY SHELL
  // =========================================================================
  return (
    <div className={`min-h-screen w-full ${theme.bg} flex flex-col font-sans select-none transition-colors`}>
      {/* TOP BAR */}
      <header className={`sticky top-0 z-40 ${theme.header} px-4 py-3 backdrop-blur-xl`}>
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center">한</span>
            <span className={`font-black text-sm ${theme.textMain}`}>서울대 한국어</span>
          </div>

          <div className="flex items-center gap-3 text-xs font-black">
            <div className="flex items-center gap-1 text-amber-500"><Flame size={17} className="fill-amber-500" />{userProfile.streak}</div>
            <div className="flex items-center gap-1 text-sky-400"><Zap size={17} className="fill-sky-400" />{userProfile.xp}</div>
            <div className="flex items-center gap-1 text-rose-500"><Heart size={17} className="fill-rose-500" />{userProfile.isPro ? '∞' : userProfile.hearts}</div>
          </div>

          <div className="flex items-center gap-1.5">
            <button onClick={toggleTheme} className={`p-2 rounded-xl ${theme.subCard} border`}>
              {isDarkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-600" />}
            </button>
            <button onClick={handleLogout} className="p-2 rounded-xl bg-rose-500/15 text-rose-500">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full max-w-md mx-auto p-4">
        {activeTab === 'books' && renderBooksLibrary()}
        {activeTab === 'hangul' && renderHangul()}
        {activeTab === 'book_study' && renderBookStudy()}
        {activeTab === 'flashcards' && renderFlashcards()}
      </main>

      {/* BOTTOM NAVIGATION */}
      <nav className={`fixed bottom-0 inset-x-0 z-40 ${theme.navBg} px-2 py-2.5 backdrop-blur-xl`}>
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button onClick={() => setActiveTab('books')} className={`flex flex-col items-center ${activeTab === 'books' || activeTab === 'book_study' ? 'text-indigo-400' : theme.textMuted}`}>
            <BookOpen size={22} />
            <span className="text-[10px] font-black mt-1">1A–6B Kitoblar</span>
          </button>

          <button onClick={() => setActiveTab('hangul')} className={`flex flex-col items-center ${activeTab === 'hangul' ? 'text-emerald-400' : theme.textMuted}`}>
            <Grid size={22} />
            <span className="text-[10px] font-black mt-1">Alifbo (한글)</span>
          </button>

          <button onClick={() => setActiveTab('flashcards')} className={`flex flex-col items-center ${activeTab === 'flashcards' ? 'text-amber-400' : theme.textMuted}`}>
            <Layers size={22} />
            <span className="text-[10px] font-black mt-1">Lug‘at (1A–6B)</span>
          </button>

          <button onClick={() => { setEditForm(userProfile); setIsEditingProfile(true); }} className={`flex flex-col items-center ${theme.textMuted}`}>
            <User size={22} />
            <span className="text-[10px] font-black mt-1">Profil</span>
          </button>
        </div>
      </nav>

      {/* PROFIL MODAL */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${theme.card} border-2 rounded-3xl p-6 w-full max-w-sm space-y-4`}>
            <h3 className={`font-black text-base ${theme.textMain}`}>Talaba Profili</h3>
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