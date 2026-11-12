import React, { useState, useEffect } from 'react';
import { 
  Home, BookOpen, RotateCcw, User, Volume2, ArrowLeft, 
  Sun, Moon, Flame, Heart, Zap, LogOut, Shuffle, 
  CheckCircle2, Grid, Trophy, Mic, Headphones, Star, 
  Clock, Target, Award, Lock, Play
} from 'lucide-react';
import { 
  signInWithPopup, signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, updateProfile, 
  signOut, onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  // --- 1. AUTENTIFIKATSIYA (AKKAUNTSIZ KIRISH + GOOGLE + EMAIL) ---
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('snu_auth_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authMode, setAuthMode] = useState('welcome');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const defaultStats = {
    name: 'Tokhirbek',
    streak: 12,
    xp: 1450,
    dailyXp: 65,
    hearts: 5,
    isPro: false,
    studyMinutes: 185,
    completedNodes: ['1a-1'],
    savedWords: ['도서관', '경험', '실력']
  };

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('snu_master_stats');
    if (saved) {
      try {
        return { ...defaultStats, ...JSON.parse(saved) };
      } catch (e) {}
    }
    return defaultStats;
  });

  useEffect(() => {
    localStorage.setItem('snu_master_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const u = {
          uid: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Talaba',
          email: fbUser.email
        };
        setCurrentUser(u);
        localStorage.setItem('snu_auth_user', JSON.stringify(u));
        setStats(prev => ({ ...prev, name: u.name }));
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

  // --- 2. MAVZU & NAVIGATSIYA ---
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

  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'learn' | 'review' | 'profile' | 'lesson_player' | 'hangul'
  const [selectedBookId, setSelectedBookId] = useState('1a');

  // --- 3. KOREYSCHA NATIVE AUDIO ---
  const speakKo = (text, rate = 0.85) => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const clean = text.replace(/[\(\)\[\]]/g, '').trim();
      const ut = new SpeechSynthesisUtterance(clean);
      ut.lang = 'ko-KR';
      ut.rate = rate;
      window.speechSynthesis.speak(ut);
    } catch (e) {}
  };

  // --- 4. 서울대 한국어 1A — 6B TO‘LIQ DASTUR ---
  const snuCurriculum = [
    {
      id: '1a', code: '1A', title: '서울대 한국어 1A', topixTarget: 'TOPIK 1-daraja', estHours: '18 soat',
      color: 'from-emerald-500 to-teal-700',
      nodes: [
        {
          id: '1a-1', title: '1-dars: Tanishuv va Millat', subtitle: 'N은/는 N이에요/예요', xp: 40,
          grammar: { pattern: 'N은/는 N이에요/예요', desc: 'O‘zini tanishtirish va kasb/millatni aytish. Undoshdan keyin -이에요, unlidan keyin -예요.', ex: '저는 우즈베키스탄 사람이에요.' },
          vocab: [
            { ko: '자기소개', uz: 'O‘zini tanishtirish', ex: '자기소개를 해 주세요.' },
            { ko: '학생', uz: 'Talaba / O‘quvchi', ex: '저는 대학교 학생이에요.' },
            { ko: '선생님', uz: 'O‘qituvchi', ex: '선생님이 친절해요.' },
            { ko: '우즈베키스탄', uz: 'O‘zbekiston', ex: '우즈베키스탄에서 왔어요.' }
          ],
          exercises: [
            { type: 'choice', q: "‘저는 대학생___.’ Bo‘sh joyga to‘g‘ri qo‘shimchani tanlang:", opts: ['이에요', '예요', '을', '에서'], ans: '이에요', exp: "‘대학생’ undosh (ㅇ) bilan tugagani uchun ‘-이에요’ qo‘shiladi." },
            { type: 'build', q: "So‘zlardan to‘g‘ri gap tuzing: ‘Men O‘zbekistonlik talabaman’", words: ['저는', '우즈베키스탄', '학생이에요.'], ans: '저는 우즈베키스탄 학생이에요.', exp: "Ega (저는) + Aniqlovchi (우즈베키스탄) + Kesim (학생이에요)." },
            { type: 'listen', q: "Audioni tinglang va eshitilgan so‘zni tanlang:", audio: '선생님', opts: ['선생님', '학생증', '도서관', '편의점'], ans: '선생님', exp: "Audioda ‘선생님’ (O‘qituvchi) so‘zi o‘qildi." }
          ]
        },
        {
          id: '1a-2', title: '2-dars: Kundalik Harakatlar', subtitle: 'V-아요/어요 • N에서', xp: 50,
          grammar: { pattern: 'V-아요/어요 & N에서', desc: 'Hozirgi zamon fe’li va harakat sodir bo‘lgan joy (-da).', ex: '도서관에서 한국어를 공부해요.' },
          vocab: [
            { ko: '도서관', uz: 'Kutubxona', ex: '도서관에서 책을 읽어요.' },
            { ko: '공부하다', uz: 'O‘rganmoq / Dars qilmoq', ex: '매일 한국어를 공부해요.' },
            { ko: '마시다', uz: 'Ichmoq', ex: '카페에서 커피를 마셔요.' },
            { ko: '편의점', uz: '24 soatlik do‘kon', ex: '편의점에서 우유를 사요.' }
          ],
          exercises: [
            { type: 'choice', q: "‘공부하다’ fe’lining hozirgi zamon shakli qaysi?", opts: ['공부해요', '공부하아요', '공부허요', '공부았어요'], ans: '공부해요', exp: "‘하다’ fe’llari doim ‘해요’ bo‘lib tuslanadi." },
            { type: 'build', q: "Gap tuzing: ‘Kutubxonada koreys tilini o‘rganaman’", words: ['도서관에서', '한국어를', '공부해요.'], ans: '도서관에서 한국어를 공부해요.', exp: "Joy (도서관에서) + Obyekt (한국어를) + Fe’l (공부해요)." },
            { type: 'listen', q: "Audioni tinglang va to‘g‘ri javobni toping:", audio: '도서관', opts: ['도서관', '편의점', '우체국', '백화점'], ans: '도서관', exp: "‘도서관’ — kutubxona." }
          ]
        },
        {
          id: '1a-3', title: '3-dars: Raqamlar va Xarid', subtitle: '얼마예요? • N 개/잔', xp: 50,
          grammar: { pattern: 'Xitoy-koreys va Asl koreys raqamlari', desc: 'Pul birligi (원) uchun 일, 이, 삼...; buyum soni (개, 잔) uchun 한, 두, 세... ishlatiladi.', ex: '아메리카노 두 잔에 팔천 원이에요.' },
          vocab: [
            { ko: '얼마예요?', uz: 'Necha pul?', ex: '이 사과 얼마예요?' },
            { ko: '천 원', uz: '1,000 von', ex: '물 한 병에 천 원이에요.' },
            { ko: '영수증', uz: 'Chek', ex: '영수증 드릴까요?' }
          ],
          exercises: [
            { type: 'choice', q: "Do‘konda narx so‘rash uchun nima deyiladi?", opts: ['얼마예요?', '어디예요?', '몇 시예요?', '누구예요?'], ans: '얼마예요?', exp: "‘얼마예요?’ — Necha pul?" },
            { type: 'build', q: "Gap tuzing: ‘Bu olma necha pul?’", words: ['이', '사과', '얼마예요?'], ans: '이 사과 얼마예요?', exp: "Ko‘rsatish olmoshi (이) + Ot (사과) + Savol (얼마예요?)." }
          ]
        }
      ]
    },
    {
      id: '1b', code: '1B', title: '서울대 한국어 1B', topixTarget: 'TOPIK 1–2', estHours: '20 soat',
      color: 'from-teal-500 to-cyan-700',
      nodes: [
        {
          id: '1b-1', title: '1-dars: O‘tgan Zamon', subtitle: 'V-았/었어요', xp: 50,
          grammar: { pattern: 'V-았/었어요', desc: 'O‘tgan zamon harakati (-di / -gan).', ex: '어제 친구하고 영화를 봤어요.' },
          vocab: [
            { ko: '어제', uz: 'Kecha', ex: '어제 비가 왔어요.' },
            { ko: '주말', uz: 'Dam olish kunlari', ex: '주말에 집에서 쉬었어요.' },
            { ko: '지하철', uz: 'Metro', ex: '지하철을 타고 갔어요.' }
          ],
          exercises: [
            { type: 'choice', q: "‘보다’ (ko‘rmoq) fe’lining o‘tgan zamon shakli:", opts: ['봤어요', '보었어요', '보았어요', '볼 거예요'], ans: '봤어요', exp: "‘보 + 았어요’ qisqarib ‘봤어요’ bo‘ladi." },
            { type: 'build', q: "Gap tuzing: ‘Kecha kino ko‘rdim’", words: ['어제', '영화를', '봤어요.'], ans: '어제 영화를 봤어요.', exp: "Vaqt (어제) + Obyekt (영화를) + O‘tgan zamon fe’li (봤어요)." }
          ]
        },
        {
          id: '1b-2', title: '2-dars: Kelajak Rejalari', subtitle: 'V-(으)ㄹ 거예요', xp: 50,
          grammar: { pattern: 'V-(으)ㄹ 거예요', desc: 'Kelajak zamon reja va niyati (-moqchiman).', ex: '내일 부산에 갈 거예요.' },
          vocab: [
            { ko: '내일', uz: 'Ertaga', ex: '내일 도서관에 갈 거예요.' },
            { ko: '여행', uz: 'Sayohat', ex: '방학에 여행을 갈 거예요.' }
          ],
          exercises: [
            { type: 'choice', q: "‘Ertaga kutubxonaga bormoqchiman’:", opts: ['내일 도서관에 갈 거예요', '내일 도서관에 갔어요', '어제 도서관에 갈 거예요', '도서관에서 갔어요'], ans: '내일 도서관에 갈 거예요', exp: "Kelajak zamon uchun ‘-(으)ㄹ 거예요’ ishlatiladi." }
          ]
        }
      ]
    },
    {
      id: '2a', code: '2A', title: '서울대 한국어 2A', topixTarget: 'TOPIK 2-daraja', estHours: '22 soat',
      color: 'from-sky-500 to-blue-700',
      nodes: [
        {
          id: '2a-1', title: '1-dars: Sabab va Tajriba', subtitle: '-아서/어서 • -(으)ㄴ 적이 있다', xp: 60,
          grammar: { pattern: 'A/V-아서/어서 & V-(으)ㄴ 적이 있다', desc: 'Sabab (-gani uchun) va tajriba (-gan joyim bor).', ex: '제주도에 가 본 적이 있어요.' },
          vocab: [
            { ko: '경험', uz: 'Tajriba', ex: '좋은 경험을 했어요.' },
            { ko: '박물관', uz: 'Muzey', ex: '박물관에 가 본 적이 있어요.' }
          ],
          exercises: [
            { type: 'choice', q: "Qaysi gap grammatik jihatdan TO‘G‘RI?", opts: ['배가 아파서 병원에 갔어요', '배가 아파서 병원에 가세요', '배가 아팠어서 병원에 갔어요', '배가 아파서 병원에 갑시다'], ans: '배가 아파서 병원에 갔어요', exp: "‘-아서/어서’ oldidan o‘tgan zamon kelmaydi va buyruq gap bilan ishlatilmaydi." }
          ]
        }
      ]
    },
    {
      id: '2b', code: '2B', title: '서울대 한국어 2B', topixTarget: 'TOPIK 2–3', estHours: '22 soat',
      color: 'from-blue-600 to-indigo-800',
      nodes: [
        {
          id: '2b-1', title: '1-dars: Maqsad va Aniq Sabab', subtitle: '-(으)려고 하다 • -(으)니까', xp: 60,
          grammar: { pattern: 'V-(으)려고 하다 & A/V-(으)니까', desc: 'Maqsad (-moqchiman) va buyruq bilan ishlatiluvchi sabab (-gani sababli).', ex: '날씨가 추우니까 따뜻한 옷을 입으세요.' },
          vocab: [
            { ko: '실력', uz: 'Mahorat / Bilim', ex: '한국어 실력이 늘었어요.' },
            { ko: '취직하다', uz: 'Ishga kirmoq', ex: 'IT 회사에 취직하려고 해요.' }
          ],
          exercises: [
            { type: 'choice', q: "Buyruq gap bilan qaysi sabab qo‘shimchasi ishlaydi?", opts: ['추우니까', '추워서', '춥지만', '춥고'], ans: '추우니까', exp: "Buyruq va taklif gaplarda ‘-(으)니까’ ishlatiladi." }
          ]
        }
      ]
    },
    {
      id: '3a', code: '3A', title: '서울대 한국어 3A', topixTarget: 'TOPIK 3-daraja', estHours: '25 soat',
      color: 'from-indigo-500 to-purple-700',
      nodes: [
        {
          id: '3a-1', title: '1-dars: Bilvosita Nutq', subtitle: '-다고 하다 • -(으)ㄴ/는 것 같다', xp: 70,
          grammar: { pattern: 'A/V-다고 하다', desc: 'Boshqa birovning gapini yetkazish (-deb aytdi).', ex: '친구가 내일 서울에 온다고 했어요.' },
          vocab: [
            { ko: '면접', uz: 'Intervyu / Suhbat', ex: '내일 회사 면접을 봐요.' },
            { ko: '성격', uz: 'Xarakter', ex: '성격이 아주 활발해요.' }
          ],
          exercises: [
            { type: 'choice', q: "‘Do‘stim ertaga kelaman deb aytdi’:", opts: ['친구가 내일 온다고 했어요', '친구가 내일 오라고 했어요', '친구가 내일 오자고 했어요', '친구가 내일 오냐고 했어요'], ans: '친구가 내일 온다고 했어요', exp: "Darak gapni yetkazishda ‘-ㄴ/는다고 하다’ qo‘shiladi." }
          ]
        }
      ]
    },
    {
      id: '3b', code: '3B', title: '서울대 한국어 3B', topixTarget: 'TOPIK 3–4', estHours: '25 soat',
      color: 'from-purple-600 to-fuchsia-800',
      nodes: [
        {
          id: '3b-1', title: '1-dars: Qaror va Sal Qolish', subtitle: '-기로 하다 • -(으)ㄹ 뻔하다', xp: 70,
          grammar: { pattern: 'V-(으)ㄹ 뻔하다 & V-기로 하다', desc: 'Sal qolish (-ishiga sal qoldi) va qaror (-ishga qaror qildim).', ex: '늦잠을 자서 비행기를 놓칠 뻔했어요.' },
          vocab: [
            { ko: '놓치다', uz: 'O‘tkazib yubormoq', ex: '마지막 버스를 놓쳤어요.' },
            { ko: '결심하다', uz: 'Qat’iy qaror qilmoq', ex: '매일 운동하기로 결심했어요.' }
          ],
          exercises: [
            { type: 'choice', q: "‘Avtobusga kech qolishimga sal qoldi’:", opts: ['버스를 놓칠 뻔했어요', '버스를 놓치기로 했어요', '버스를 놓친 적이 있어요', '버스를 놓칠 수 있어요'], ans: '버스를 놓칠 뻔했어요', exp: "Sal qolish holati ‘-(으)ㄹ 뻔하다’ bilan yasaladi." }
          ]
        }
      ]
    },
    {
      id: '4a', code: '4A', title: '서울대 한국어 4A', topixTarget: 'TOPIK 4-daraja', estHours: '28 soat',
      color: 'from-rose-500 to-red-700',
      nodes: [
        {
          id: '4a-1', title: '1-dars: Qiyosiy Tahlil', subtitle: '-는 반면에 • -(으)ㄹ 뿐만 아니라', xp: 80,
          grammar: { pattern: 'V-는 반면에 & -(으)ㄹ 뿐만 아니라', desc: 'Ikki tomonni solishtirish va qo‘shimcha ma’lumot berish.', ex: '그는 한국어뿐만 아니라 영어도 유창해요.' },
          vocab: [
            { ko: '유창하다', uz: 'Ravon (tilda)', ex: '한국어를 유창하게 구사해요.' },
            { ko: '편리하다', uz: 'Qulay', ex: '대중교통이 매우 편리해요.' }
          ],
          exercises: [
            { type: 'choice', q: "‘Nafaqat koreys, balki ingliz tilini ham biladi’:", opts: ['뿐만 아니라', '는 길에', 'ㄹ 뻔하다', '거든요'], ans: '뿐만 아니라', exp: "‘N-(으)ㄹ 뿐만 아니라’ — nafaqat ..., balki ... ham." }
          ]
        }
      ]
    },
    {
      id: '4b', code: '4B', title: '서울대 한국어 4B', topixTarget: 'TOPIK 4–5', estHours: '28 soat',
      color: 'from-red-600 to-rose-900',
      nodes: [
        {
          id: '4b-1', title: '1-dars: Ijobiy va Salbiy Sabab', subtitle: 'N 덕분에 • N 탓에 • -는 바람에', xp: 80,
          grammar: { pattern: 'N 덕분에 vs N 탓에', desc: 'Ijobiy sabab (-sharofati bilan) va salbiy sabab (-aybi tufayli).', ex: '선생님 덕분에 장학금을 받게 되었어요.' },
          vocab: [
            { ko: '장학금', uz: 'Stipendiya', ex: '성적 우수 장학금을 받았어요.' },
            { ko: '발전하다', uz: 'Rivojlanmoq', ex: 'AI 기술이 빠르게 발전하고 있어요.' }
          ],
          exercises: [
            { type: 'choice', q: "Ijobiy natija uchun minnatdorchilik bildirishda:", opts: ['덕분에', '탓에', '바람에', '불구하고'], ans: '덕분에', exp: "‘덕분에’ — sharofati bilan (ijobiy natijada)." }
          ]
        }
      ]
    },
    {
      id: '5a', code: '5A', title: '서울대 한국어 5A', topixTarget: 'TOPIK 5-daraja', estHours: '30 soat',
      color: 'from-amber-500 to-orange-700',
      nodes: [
        {
          id: '5a-1', title: '1-dars: Iqtisod va Rasmiy Nutq', subtitle: '-는 데 반해 • -(으)ㄴ/는 셈이다', xp: 90,
          grammar: { pattern: 'A/V-(으)ㄴ/는 셈이다', desc: 'Umumiy xulosa chiqarish (-hisoblanadi / -degani).', ex: '이 정도면 성공한 셈이에요.' },
          vocab: [
            { ko: '경제 성장', uz: 'Iqtisodiy o‘sish', ex: '지속 가능한 경제 성장이 중요합니다.' },
            { ko: '해결책', uz: 'Yechim yo‘li', ex: '근본적인 해결책을 찾아야 해요.' }
          ],
          exercises: [
            { type: 'choice', q: "‘Deyarli tugatgan hisoblanamiz’ — to‘g‘ri shakl:", opts: ['다 끝낸 셈이에요', '다 끝낼 뻔했어요', '다 끝내는 길이에요', '다 끝내거든요'], ans: '다 끝낸 셈이에요', exp: "Xulosa qilish uchun ‘-(으)ㄴ/는 셈이다’ ishlatiladi." }
          ]
        }
      ]
    },
    {
      id: '5b', code: '5B', title: '서울대 한국어 5B', topixTarget: 'TOPIK 5 Master', estHours: '30 soat',
      color: 'from-orange-600 to-amber-900',
      nodes: [
        {
          id: '5b-1', title: '1-dars: Maqollar va Tabiiy Qonun', subtitle: '-기 마련이다 • 속담', xp: 90,
          grammar: { pattern: 'V-기 마련이다', desc: 'Tabiiy qonuniyat (-ishi tabiiy / muqarrar).', ex: '노력하면 좋은 결과가 따르기 마련이다.' },
          vocab: [
            { ko: '속담', uz: 'Maqol', ex: '가는 말이 고와야 오는 말이 곱다.' },
            { ko: '불과하다', uz: 'Xolos / Bor-yo‘g‘i', ex: '그것은 시작에 불과합니다.' }
          ],
          exercises: [
            { type: 'choice', q: "‘가는 말이 고와야 오는 말이 곱다’ maqolining ma’nosi:", opts: ['Yaxshi gapirsang, yaxshi javob olasan', 'Vaqt — oliy hakam', 'Mehnatning tagi rohat', 'Ko‘z qo‘rqoq, qo‘l botir'], ans: 'Yaxshi gapirsang, yaxshi javob olasan', exp: "Yaxshi so‘zga yaxshi javob qaytadi." }
          ]
        }
      ]
    },
    {
      id: '6a', code: '6A', title: '서울대 한국어 6A', topixTarget: 'TOPIK 6-daraja', estHours: '35 soat',
      color: 'from-violet-600 to-indigo-950',
      nodes: [
        {
          id: '6a-1', title: '1-dars: Akademik Bayonot', subtitle: '-는 바이다 • -을/를 막론하고', xp: 100,
          grammar: { pattern: 'N을/를 막론하고', desc: 'Qat’i nazar (-dan qat’i nazar).', ex: '남녀노소를 막론하고 누구나 참여할 수 있다.' },
          vocab: [
            { ko: '막론하다', uz: 'Qat’i nazar', ex: '이유를 막론하고 약속을 지켜야 한다.' },
            { ko: '고찰하다', uz: 'Chuqur tahlil qilmoq', ex: '역사적 배경을 심층적으로 고찰하였다.' }
          ],
          exercises: [
            { type: 'choice', q: "‘Yoshu qaridan qat’i nazar’ — TOPIK 6 shakli:", opts: ['남녀노소를 막론하고', '남녀노소 덕분에', '남녀노소 탓에', '남녀노소뿐만 아니라'], ans: '남녀노소를 막론하고', exp: "‘N을/를 막론하고’ — ...-dan qat’i nazar." }
          ]
        }
      ]
    },
    {
      id: '6b', code: '6B', title: '서울대 한국어 6B', topixTarget: 'TOPIK 6 Oliy', estHours: '35 soat',
      color: 'from-fuchsia-700 to-slate-950',
      nodes: [
        {
          id: '6b-1', title: '1-dars: Oliy Notiqlik', subtitle: '-(으)ㄹ 따름이다 • -다시피 하다', xp: 100,
          grammar: { pattern: 'A/V-다시피 하다', desc: 'Deyarli ... qilmoq (-gandek bo‘lmoq).', ex: '시험 기간에는 도서관에서 살다시피 했어요.' },
          vocab: [
            { ko: '규명하다', uz: 'Aniqlamoq / Ochib bermoq', ex: '사건의 진상을 철저히 규명했다.' },
            { ko: '귀감', uz: 'Ibrat / Namuna', ex: '사회적 귀감이 되는 인물이다.' }
          ],
          exercises: [
            { type: 'choice', q: "‘Imtihon paytida kutubxonada yashagandek bo‘ldim’:", opts: ['도서관에서 살다시피 했어요', '도서관에서 살 뻔했어요', '도서관에서 사는 길이에요', '도서관에서 살기 마련이에요'], ans: '도서관에서 살다시피 했어요', exp: "‘-다시피 하다’ — deyarli shunday qilmoq." }
          ]
        }
      ]
    }
  ];

  const allNodes = snuCurriculum.flatMap(b => b.nodes.map(n => ({ ...n, bookId: b.id, bookCode: b.code, bookTitle: b.title })));
  const allVocabList = allNodes.flatMap(n => n.vocab.map(v => ({ ...v, bookCode: n.bookCode })));
  const allExercisesPool = allNodes.flatMap(n => n.exercises);

  const currentActiveNode = allNodes.find(n => !stats.completedNodes.includes(n.id)) || allNodes[0];

  // --- 5. INTERAKTIV DARS PLAYER ---
  const [activeNode, setActiveNode] = useState(null);
  const [playerStage, setPlayerStage] = useState('intro');
  const [sessionExercises, setSessionExercises] = useState([]);
  const [exIdx, setExIdx] = useState(0);
  const [userChoice, setUserChoice] = useState(null);
  const [builtWords, setBuiltWords] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const startLessonNode = (node) => {
    if (stats.hearts <= 0 && !stats.isPro) {
      alert("Yuraklaringiz tugadi! Takrorlash bo‘limidan mashq qilib yurak to‘plang yoki PRO ni yoqing.");
      return;
    }
    setActiveNode(node);
    setPlayerStage('intro');
    const randomized = shuffleArray(node.exercises).map(ex => ({
      ...ex,
      opts: ex.opts ? shuffleArray(ex.opts) : undefined,
      shuffledWords: ex.words ? shuffleArray(ex.words) : undefined
    }));
    setSessionExercises(randomized);
    setExIdx(0);
    setUserChoice(null);
    setBuiltWords([]);
    setIsChecked(false);
    setActiveTab('lesson_player');
  };

  // --- 6. TAKRORLASH (복습) BO‘LIMI ---
  const [reviewSubTab, setReviewSubTab] = useState('vocab');
  const [flashIdx, setFlashIdx] = useState(0);
  const [flashFlipped, setFlashFlipped] = useState(false);

  const [listenIdx, setListenIdx] = useState(0);
  const [listenChoice, setListenChoice] = useState(null);

  const [speakIdx, setSpeakIdx] = useState(0);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [spokenResult, setSpokenResult] = useState('');
  const [speakFeedback, setSpeakFeedback] = useState(null);

  const [mockStarted, setMockStarted] = useState(false);
  const [mockQuestions, setMockQuestions] = useState([]);
  const [mockIdx, setMockIdx] = useState(0);
  const [mockAnswers, setMockAnswers] = useState({});
  const [mockTimeLeft, setMockTimeLeft] = useState(300);
  const [mockFinished, setMockFinished] = useState(false);

  useEffect(() => {
    if (!mockStarted || mockFinished) return;
    const timer = setInterval(() => {
      setMockTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer);
          setMockFinished(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [mockStarted, mockFinished]);

  const startTopikMock = () => {
    const choiceOnly = allExercisesPool.filter(e => e.type === 'choice');
    const qList = shuffleArray(choiceOnly).slice(0, 8).map(q => ({
      ...q,
      opts: shuffleArray(q.opts)
    }));
    setMockQuestions(qList);
    setMockIdx(0);
    setMockAnswers({});
    setMockTimeLeft(300);
    setMockFinished(false);
    setMockStarted(true);
  };

  const startSpeechCheck = (targetWord) => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      setSpokenResult("Brauzeringiz mikrofonni qo‘llab-quvvatlamaydi (Safari/Chrome da sinab ko‘ring).");
      return;
    }
    try {
      const rec = new SpeechRec();
      rec.lang = 'ko-KR';
      rec.interimResults = false;
      setIsListeningMic(true);
      setSpokenResult('');
      setSpeakFeedback(null);

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript.replace(/\s+/g, '');
        const cleanTarget = targetWord.replace(/[\?\!\.\s]+/g, '');
        setSpokenResult(event.results[0][0].transcript);
        if (transcript.includes(cleanTarget) || cleanTarget.includes(transcript)) {
          setSpeakFeedback({ ok: true, msg: "Ajoyib talaffuz! 100% to‘g‘ri! 🎉 (+15 XP)" });
          setStats(p => ({ ...p, xp: p.xp + 15, dailyXp: p.dailyXp + 15 }));
        } else {
          setSpeakFeedback({ ok: false, msg: `Eshitildi: "${event.results[0][0].transcript}". Yana bir bor aniqroq talaffuz qiling!` });
        }
        setIsListeningMic(false);
      };
      rec.onerror = () => {
        setIsListeningMic(false);
        setSpokenResult("Ovoz eshitilmadi. Mikrofonga ruxsat bering va qayta urinib ko‘ring.");
      };
      rec.start();
    } catch (e) {
      setIsListeningMic(false);
    }
  };

  const toggleSaveWord = (wordKo) => {
    setStats(prev => {
      const exists = prev.savedWords.includes(wordKo);
      return {
        ...prev,
        savedWords: exists ? prev.savedWords.filter(w => w !== wordKo) : [...prev.savedWords, wordKo]
      };
    });
  };

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
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 border-b-4 border-indigo-900 flex items-center justify-center text-white font-black text-lg">한</div>
            <div>
              <span className={`font-black text-base block leading-none ${theme.textMain}`}>서울대 한국어</span>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Duolingo Style EdTech</span>
            </div>
          </div>
          <button onClick={toggleTheme} className={`p-2.5 rounded-2xl ${theme.subCard} border`}>
            {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
          </button>
        </div>

        <div className="max-w-md w-full mx-auto my-auto py-6 text-center space-y-6">
          {authMode === 'welcome' ? (
            <>
              <div className="w-28 h-28 mx-auto rounded-[32px] bg-gradient-to-br from-indigo-600 to-emerald-500 border-b-8 border-indigo-950 flex flex-col items-center justify-center text-white shadow-2xl">
                <span className="text-4xl font-black">가나다</span>
                <span className="text-[10px] font-black tracking-widest mt-1">1A ~ 6B</span>
              </div>
              <div className="space-y-2">
                <h1 className={`text-2xl font-black ${theme.textMain}`}>Koreys tilini tizimli va interaktiv o‘rganing!</h1>
                <p className={`text-xs ${theme.textMuted} max-w-xs mx-auto`}>
                  서울대 한국어 1A–6B kitoblari, ketma-ket dars yo‘lagi, Listening, Speaking va TOPIK Mock testlari.
                </p>
              </div>
              <div className="space-y-3 pt-2">
                <button onClick={handleGuestLogin} className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 border-b-4 border-emerald-700 text-white font-black text-sm uppercase shadow-xl">
                  Akkauntsiz Boshlash (Tezkor kirish)
                </button>
                <button onClick={handleGoogleLogin} className={`w-full py-4 rounded-2xl ${theme.card} border-2 border-b-4 font-black text-sm ${theme.textMain}`}>
                  Google bilan davom etish
                </button>
                <button onClick={() => setAuthMode('login')} className="text-xs font-bold text-indigo-400">
                  Email va Parol orqali kirish
                </button>
              </div>
            </>
          ) : (
            <div className={`${theme.card} border-2 rounded-3xl p-6 space-y-4 text-left`}>
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
              <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="w-full text-center text-xs font-bold text-indigo-400">
                {authMode === 'login' ? "Akkaunt yaratish" : "Tizimga kirish"}
              </button>
            </div>
          )}
        </div>
        <div className="text-center text-[11px] text-slate-500">서울대 한국어 1A–6B • Premium EdTech</div>
      </div>
    );
  }

  // =========================================================================
  // 1. 홈 — BOSH SAHIFA (DASHBOARD)
  // =========================================================================
  const renderHome = () => {
    const dailyPercent = Math.min(100, Math.round((stats.dailyXp / 100) * 100));
    const leaderboard = [
      { name: 'Kim Min-ji 🇰🇷', xp: 1890 },
      { name: `${stats.name} (Siz)`, xp: stats.xp, isMe: true },
      { name: 'Sardorbek 🇺🇿', xp: 1210 },
      { name: 'Fariza 🎓', xp: 980 }
    ].sort((a, b) => b.xp - a.xp);

    return (
      <div className="space-y-5 pb-24">
        <div className={`${theme.card} border rounded-3xl p-4 space-y-2.5`}>
          <div className="flex items-center justify-between text-xs font-black">
            <div className="flex items-center gap-2">
              <Target size={17} className="text-amber-500" />
              <span className={theme.textMain}>Kunlik Maqsad (15 daqiqa)</span>
            </div>
            <span className="text-amber-500">{stats.dailyXp} / 100 XP ({dailyPercent}%)</span>
          </div>
          <div className="w-full h-3 bg-slate-800/40 rounded-full overflow-hidden p-0.5">
            <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500" style={{ width: `${dailyPercent}%` }} />
          </div>
        </div>

        <div className="rounded-3xl p-5 bg-gradient-to-br from-indigo-600 via-blue-700 to-slate-900 text-white border-b-4 border-indigo-950 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-white/15 text-[10px] font-black uppercase tracking-wider">
              {currentActiveNode.bookTitle} • Joriy dars
            </span>
            <span className="text-xs font-black text-amber-300">+{currentActiveNode.xp} XP</span>
          </div>
          <div>
            <h2 className="text-xl font-black">{currentActiveNode.title}</h2>
            <p className="text-xs text-white/80 mt-0.5">{currentActiveNode.subtitle}</p>
          </div>
          <button
            onClick={() => startLessonNode(currentActiveNode)}
            className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 border-b-4 border-emerald-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:translate-y-0.5 transition"
          >
            <Play size={16} className="fill-white" /> Continue Learning (Darsni boshlash)
          </button>
        </div>

        <div className={`${theme.card} border rounded-3xl p-4 space-y-3`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black uppercase tracking-wider ${theme.textMain}`}>Bugungi Vazifalar</span>
            <button onClick={() => setActiveTab('hangul')} className="text-[11px] font-black text-emerald-400 flex items-center gap-1">
              <Grid size={13} /> Alifbo (한글)
            </button>
          </div>
          <div className="space-y-2">
            <div onClick={() => { setActiveTab('review'); setReviewSubTab('vocab'); }} className={`p-3 rounded-2xl ${theme.subCard} border flex items-center justify-between cursor-pointer`}>
              <div className="flex items-center gap-2.5 text-xs font-bold">
                <span className="text-base">📚</span>
                <span className={theme.textMain}>5 ta yangi so‘zni takrorlash</span>
              </div>
              <span className="text-[11px] font-black text-indigo-400">+20 XP →</span>
            </div>
            <div onClick={() => { setSelectedBookId(currentActiveNode.bookId); setActiveTab('learn'); }} className={`p-3 rounded-2xl ${theme.subCard} border flex items-center justify-between cursor-pointer`}>
              <div className="flex items-center gap-2.5 text-xs font-bold">
                <span className="text-base">✍️</span>
                <span className={theme.textMain}>3 ta grammatika va gap tuzish mashqi</span>
              </div>
              <span className="text-[11px] font-black text-emerald-400">+40 XP →</span>
            </div>
            <div onClick={() => { setActiveTab('review'); setReviewSubTab('listening'); }} className={`p-3 rounded-2xl ${theme.subCard} border flex items-center justify-between cursor-pointer`}>
              <div className="flex items-center gap-2.5 text-xs font-bold">
                <span className="text-base">🎧</span>
                <span className={theme.textMain}>1 ta tinglab tushunish (Listening)</span>
              </div>
              <span className="text-[11px] font-black text-amber-400">+15 XP →</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className={`text-sm font-black ${theme.textMain}`}>서울대 한국어 Kurslari (1A — 6B)</h3>
            <span className="text-[11px] font-bold text-indigo-400">12 jild</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {snuCurriculum.map(book => {
              const doneCount = book.nodes.filter(n => stats.completedNodes.includes(n.id)).length;
              const percent = Math.round((doneCount / book.nodes.length) * 100);
              return (
                <div
                  key={book.id}
                  onClick={() => { setSelectedBookId(book.id); setActiveTab('learn'); }}
                  className={`${theme.card} border-2 hover:border-indigo-500 rounded-3xl p-4 cursor-pointer transition active:scale-98 space-y-3`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${book.color} text-white font-black text-sm flex items-center justify-center shadow`}>
                        {book.code}
                      </span>
                      <div>
                        <h4 className={`font-black text-sm ${theme.textMain}`}>{book.title}</h4>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-400 mt-0.5">
                          <span>🎯 {book.topixTarget}</span>
                          <span>•</span>
                          <span>⏱ {book.estHours}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-black text-emerald-500">{percent}%</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="w-full h-2 bg-slate-800/40 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${percent}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-400">
                      <span>O‘tilgan darslar: {doneCount} / {book.nodes.length}</span>
                      <span className="text-indigo-400">Yo‘lakni ochish →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${theme.card} border rounded-3xl p-4 space-y-3`}>
          <div className="flex items-center gap-2 text-xs font-black text-amber-500">
            <Trophy size={16} /> <span>Haftalik Olmos Ligasi</span>
          </div>
          <div className="space-y-2">
            {leaderboard.map((p, idx) => (
              <div key={p.name} className={`p-2.5 rounded-2xl flex items-center justify-between text-xs ${p.isMe ? 'bg-indigo-500/15 border border-indigo-500/30 font-black' : ''}`}>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 font-black text-slate-400">{idx + 1}.</span>
                  <span className={theme.textMain}>{p.name}</span>
                </div>
                <span className="font-black text-amber-500">{p.xp} XP</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // =========================================================================
  // 2. 학습 — KETMA-KET OCHILADIGAN DUOLINGO DARS YO‘LAGI
  // =========================================================================
  const renderLearnPath = () => {
    const book = snuCurriculum.find(b => b.id === selectedBookId) || snuCurriculum[0];
    const offsets = ['translate-x-0', '-translate-x-8', 'translate-x-8', 'translate-x-0'];

    return (
      <div className="space-y-5 pb-24">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {snuCurriculum.map(b => (
            <button
              key={b.id}
              onClick={() => setSelectedBookId(b.id)}
              className={`shrink-0 px-3.5 py-2 rounded-2xl text-xs font-black transition ${
                b.id === book.id ? `bg-gradient-to-r ${b.color} text-white shadow-lg` : `${theme.card} border ${theme.textMuted}`
              }`}
            >
              {b.code}
            </button>
          ))}
        </div>

        <div className={`rounded-3xl p-5 bg-gradient-to-r ${book.color} text-white border-b-4 border-black/30 shadow-xl`}>
          <div className="text-[10px] font-black uppercase tracking-widest opacity-85">{book.topixTarget} • {book.estHours}</div>
          <h2 className="text-xl font-black mt-0.5">{book.title}</h2>
          <p className="text-xs opacity-90 mt-1">Darslar ketma-ket ochiladi. Keyingi darsni ochish uchun joriy darsni yakunlang!</p>
        </div>

        <div className={`${theme.card} border rounded-3xl p-6 flex flex-col items-center space-y-10`}>
          {book.nodes.map((node, idx) => {
            const isCompleted = stats.completedNodes.includes(node.id);
            const prevNode = idx > 0 ? book.nodes[idx - 1] : null;
            const isUnlocked = idx === 0 || isCompleted || (prevNode && stats.completedNodes.includes(prevNode.id));
            const isCurrent = isUnlocked && !isCompleted;

            return (
              <div key={node.id} className={`flex flex-col items-center ${offsets[idx % offsets.length]}`}>
                {isCurrent && (
                  <div className="mb-2 px-3.5 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-lg animate-bounce">
                    Boshlash!
                  </div>
                )}

                <button
                  onClick={() => {
                    if (!isUnlocked) {
                      alert("Avval oldingi darsni yakunlang!");
                      return;
                    }
                    startLessonNode(node);
                  }}
                  className={`w-20 h-20 rounded-full border-b-8 flex items-center justify-center text-2xl font-black shadow-2xl transition-all active:translate-y-1 active:border-b-2 ${
                    isCompleted
                      ? 'bg-emerald-500 border-emerald-800 text-white'
                      : isCurrent
                        ? 'bg-indigo-600 border-indigo-900 text-white ring-4 ring-indigo-500/30'
                        : 'bg-slate-800 border-slate-950 text-slate-500'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 size={32} /> : isCurrent ? <Play size={30} className="fill-white ml-1" /> : <Lock size={26} />}
                </button>

                <div className="mt-2.5 text-center max-w-[190px]">
                  <div className={`text-xs font-black ${theme.textMain}`}>{node.title}</div>
                  <div className="text-[10px] text-indigo-400 font-bold mt-0.5">{node.subtitle} • +{node.xp} XP</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // =========================================================================
  // INTERAKTIV DARS PLAYER
  // =========================================================================
  const renderLessonPlayer = () => {
    if (!activeNode) return null;
    const currentEx = sessionExercises[exIdx];

    const handleCheckAnswer = () => {
      if (!currentEx) return;
      let ok = false;
      if (currentEx.type === 'choice' || currentEx.type === 'listen') {
        ok = userChoice === currentEx.ans;
      } else if (currentEx.type === 'build') {
        ok = builtWords.join(' ') === currentEx.ans;
      }
      setIsCorrect(ok);
      setIsChecked(true);
      if (!ok && !stats.isPro) {
        setStats(p => ({ ...p, hearts: Math.max(0, p.hearts - 1) }));
      }
    };

    const handleNextStep = () => {
      if (exIdx + 1 < sessionExercises.length) {
        setExIdx(exIdx + 1);
        setUserChoice(null);
        setBuiltWords([]);
        setIsChecked(false);
      } else {
        setPlayerStage('complete');
        setStats(p => ({
          ...p,
          xp: p.xp + activeNode.xp,
          dailyXp: p.dailyXp + activeNode.xp,
          studyMinutes: p.studyMinutes + 10,
          completedNodes: [...new Set([...p.completedNodes, activeNode.id])]
        }));
      }
    };

    return (
      <div className="space-y-5 pb-24">
        <div className="flex items-center gap-3">
          <button onClick={() => setActiveTab('learn')} className={`p-2 rounded-xl ${theme.subCard} border`}>
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1 h-3 bg-slate-800/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${playerStage === 'intro' ? 15 : playerStage === 'complete' ? 100 : Math.round(((exIdx + 1) / sessionExercises.length) * 85)}%` }}
            />
          </div>
          <div className="flex items-center gap-1 text-rose-500 font-black text-xs">
            <Heart size={16} className="fill-rose-500" /> {stats.isPro ? '∞' : stats.hearts}
          </div>
        </div>

        {playerStage === 'intro' && (
          <div className="space-y-4">
            <div className={`${theme.card} border-2 rounded-3xl p-5 space-y-3`}>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/15 text-indigo-400 text-[10px] font-black uppercase">
                Grammar Academy
              </span>
              <h3 className={`text-lg font-black ${theme.textMain}`}>{activeNode.grammar.pattern}</h3>
              <p className={`text-xs ${theme.textMuted} leading-relaxed`}>{activeNode.grammar.desc}</p>
              <div onClick={() => speakKo(activeNode.grammar.ex)} className={`p-3.5 rounded-2xl ${theme.subCard} border flex items-center justify-between cursor-pointer`}>
                <span className="text-xs font-black text-emerald-400">{activeNode.grammar.ex}</span>
                <Volume2 size={18} className="text-indigo-400" />
              </div>
            </div>

            <div className={`${theme.card} border rounded-3xl p-4 space-y-2.5`}>
              <div className={`text-xs font-black ${theme.textMain}`}>Dars lug‘ati (Saqlash uchun ★ bosing)</div>
              {activeNode.vocab.map(v => {
                const isSaved = stats.savedWords.includes(v.ko);
                return (
                  <div key={v.ko} className={`p-3 rounded-2xl ${theme.subCard} border flex items-center justify-between`}>
                    <div onClick={() => speakKo(v.ko)} className="cursor-pointer flex-1">
                      <div className={`text-sm font-black ${theme.textMain}`}>{v.ko} <span className="text-xs font-normal text-slate-400">— {v.uz}</span></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => speakKo(v.ko)} className="p-1.5 text-indigo-400"><Volume2 size={16} /></button>
                      <button onClick={() => toggleSaveWord(v.ko)} className={`p-1.5 ${isSaved ? 'text-amber-400' : 'text-slate-500'}`}>
                        <Star size={16} className={isSaved ? 'fill-amber-400' : ''} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button onClick={() => setPlayerStage('exercise')} className="w-full py-4 rounded-2xl bg-emerald-500 border-b-4 border-emerald-700 text-white font-black text-xs uppercase">
              Interaktiv Mashqlarni Boshlash →
            </button>
          </div>
        )}

        {playerStage === 'exercise' && currentEx && (
          <div className={`${theme.card} border-2 rounded-3xl p-5 space-y-5`}>
            <div className="flex items-center justify-between text-[11px] font-black text-indigo-400 uppercase">
              <span>Mashq {exIdx + 1} / {sessionExercises.length}</span>
              <span>{currentEx.type === 'build' ? 'Gap tuzish' : currentEx.type === 'listen' ? 'Listening' : 'Test'}</span>
            </div>

            <h3 className={`text-base font-black ${theme.textMain}`}>{currentEx.q}</h3>

            {currentEx.type === 'listen' && (
              <button
                onClick={() => speakKo(currentEx.audio)}
                className="w-full py-5 rounded-2xl bg-indigo-600/20 border-2 border-indigo-500 text-indigo-400 font-black text-sm flex items-center justify-center gap-2"
              >
                <Volume2 size={24} /> Audioni tinglash (Bosing)
              </button>
            )}

            {(currentEx.type === 'choice' || currentEx.type === 'listen') && (
              <div className="space-y-2.5">
                {currentEx.opts.map(opt => (
                  <button
                    key={opt}
                    disabled={isChecked}
                    onClick={() => { setUserChoice(opt); speakKo(opt); }}
                    className={`w-full py-3.5 px-4 rounded-2xl text-left border-2 text-xs font-bold transition ${
                      userChoice === opt ? 'border-indigo-500 bg-indigo-500/15 text-indigo-400' : `${theme.subCard} ${theme.textMain}`
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {currentEx.type === 'build' && (
              <div className="space-y-4">
                <div className={`min-h-[56px] p-3 rounded-2xl ${theme.subCard} border-2 border-dashed border-indigo-500/40 flex flex-wrap gap-2`}>
                  {builtWords.map((w, i) => (
                    <button
                      key={i}
                      disabled={isChecked}
                      onClick={() => setBuiltWords(builtWords.filter((_, idx) => idx !== i))}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-black"
                    >
                      {w}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentEx.shuffledWords.map((w, i) => {
                    const used = builtWords.includes(w);
                    return (
                      <button
                        key={i}
                        disabled={used || isChecked}
                        onClick={() => { setBuiltWords([...builtWords, w]); speakKo(w); }}
                        className={`px-3.5 py-2 rounded-xl border-2 text-xs font-black transition ${
                          used ? 'opacity-30' : `${theme.card} ${theme.textMain} hover:border-emerald-500`
                        }`}
                      >
                        {w}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {isChecked && (
              <div className={`p-4 rounded-2xl text-xs space-y-1 ${isCorrect ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}>
                <div className="font-black">{isCorrect ? "To‘g‘ri javob! 🎉" : `Xato! To‘g‘ri javob: ${currentEx.ans}`}</div>
                <p className={theme.textMuted}>{currentEx.exp}</p>
              </div>
            )}

            {!isChecked ? (
              <button
                onClick={handleCheckAnswer}
                disabled={!userChoice && builtWords.length === 0}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 border-b-4 border-indigo-800 text-white font-black text-xs uppercase disabled:opacity-40"
              >
                Javobni tekshirish
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                className="w-full py-3.5 rounded-2xl bg-emerald-500 border-b-4 border-emerald-700 text-white font-black text-xs uppercase"
              >
                Davom etish →
              </button>
            )}
          </div>
        )}

        {playerStage === 'complete' && (
          <div className={`${theme.card} border-2 rounded-3xl p-8 text-center space-y-4`}>
            <div className="text-6xl">🏆</div>
            <h2 className={`text-2xl font-black ${theme.textMain}`}>Dars Muvaffaqiyatli Yakunlandi!</h2>
            <p className="text-sm font-black text-emerald-400">+{activeNode.xp} XP qo‘shildi va keyingi dars ochildi!</p>
            <button onClick={() => setActiveTab('learn')} className="w-full py-4 rounded-2xl bg-emerald-500 border-b-4 border-emerald-700 text-white font-black text-xs uppercase">
              Keyingi darsga o‘tish →
            </button>
          </div>
        )}
      </div>
    );
  };

  // =========================================================================
  // 3. 복습 — TAKRORLASH
  // =========================================================================
  const renderReview = () => {
    const vocabSource = stats.savedWords.length > 0
      ? allVocabList.filter(v => stats.savedWords.includes(v.ko))
      : allVocabList;
    const currentCard = vocabSource[flashIdx % vocabSource.length] || allVocabList[0];
    const currentListen = allVocabList[listenIdx % allVocabList.length];
    const currentSpeak = allVocabList[speakIdx % allVocabList.length];

    return (
      <div className="space-y-5 pb-24">
        <div className="grid grid-cols-4 gap-1.5 text-[10px] font-black">
          {[
            { id: 'vocab', label: 'Smart Lug‘at', icon: Star },
            { id: 'listening', label: 'Listening', icon: Headphones },
            { id: 'speaking', label: 'Speaking', icon: Mic },
            { id: 'mock', label: 'TOPIK Test', icon: Clock }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setReviewSubTab(t.id)}
              className={`py-2.5 px-1 rounded-2xl flex flex-col items-center gap-1 transition ${
                reviewSubTab === t.id ? 'bg-indigo-600 text-white shadow-lg' : `${theme.card} border ${theme.textMuted}`
              }`}
            >
              <t.icon size={16} />
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {reviewSubTab === 'vocab' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs font-black">
              <span className={theme.textMain}>Saqlangan so‘zlar ({vocabSource.length} ta)</span>
              <span className="text-amber-400">Kartochkani bosing</span>
            </div>
            <div
              onClick={() => { setFlashFlipped(!flashFlipped); speakKo(currentCard.ko); }}
              className={`${theme.card} border-2 border-b-8 rounded-3xl p-8 min-h-[240px] flex flex-col items-center justify-center text-center cursor-pointer space-y-3`}
            >
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 text-[10px] font-black">
                서울대 {currentCard.bookCode}
              </span>
              {!flashFlipped ? (
                <>
                  <div className={`text-4xl font-black ${theme.textMain}`}>{currentCard.ko}</div>
                  <Volume2 size={24} className="text-emerald-400" />
                </>
              ) : (
                <>
                  <div className="text-2xl font-black text-emerald-400">{currentCard.uz}</div>
                  <p className={`text-xs ${theme.textMuted}`}>"{currentCard.ex}"</p>
                </>
              )}
            </div>
            <button
              onClick={() => {
                setFlashFlipped(false);
                setFlashIdx(i => i + 1);
                setStats(p => ({ ...p, xp: p.xp + 5, dailyXp: p.dailyXp + 5 }));
              }}
              className="w-full py-3.5 rounded-2xl bg-emerald-500 border-b-4 border-emerald-700 text-white font-black text-xs uppercase"
            >
              Keyingi so‘z (+5 XP) →
            </button>
          </div>
        )}

        {reviewSubTab === 'listening' && (
          <div className={`${theme.card} border-2 rounded-3xl p-5 space-y-4`}>
            <h3 className={`font-black text-base ${theme.textMain}`}>Tinglab Tushunish Mashqi</h3>
            <button
              onClick={() => speakKo(currentListen.ko)}
              className="w-full py-6 rounded-2xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <Volume2 size={26} /> Audioni Eshitish
            </button>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                currentListen.uz,
                allVocabList[(listenIdx + 2) % allVocabList.length].uz,
                allVocabList[(listenIdx + 4) % allVocabList.length].uz,
                allVocabList[(listenIdx + 6) % allVocabList.length].uz
              ].map(opt => (
                <button
                  key={opt}
                  onClick={() => {
                    setListenChoice(opt);
                    if (opt === currentListen.uz) {
                      setStats(p => ({ ...p, xp: p.xp + 15, dailyXp: p.dailyXp + 15 }));
                    }
                  }}
                  className={`p-3.5 rounded-2xl border-2 text-xs font-bold ${
                    listenChoice === opt
                      ? opt === currentListen.uz ? 'bg-emerald-500 text-white border-emerald-700' : 'bg-rose-500 text-white border-rose-700'
                      : `${theme.subCard} ${theme.textMain}`
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button
              onClick={() => { setListenChoice(null); setListenIdx(i => i + 1); }}
              className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-black text-xs"
            >
              Keyingi audio →
            </button>
          </div>
        )}

        {reviewSubTab === 'speaking' && (
          <div className={`${theme.card} border-2 rounded-3xl p-6 text-center space-y-4`}>
            <span className="px-3 py-1 rounded-full bg-rose-500/15 text-rose-400 text-[10px] font-black uppercase">
              AI Pronunciation Check
            </span>
            <h3 className={`text-3xl font-black ${theme.textMain}`}>{currentSpeak.ko}</h3>
            <p className={`text-xs ${theme.textMuted}`}>{currentSpeak.uz}</p>

            <div className="flex justify-center gap-3 pt-2">
              <button onClick={() => speakKo(currentSpeak.ko)} className={`px-4 py-3 rounded-2xl ${theme.subCard} border font-black text-xs flex items-center gap-1.5`}>
                <Volume2 size={16} /> Namuna
              </button>
              <button
                onClick={() => startSpeechCheck(currentSpeak.ko)}
                className={`px-5 py-3 rounded-2xl font-black text-xs text-white flex items-center gap-2 ${isListeningMic ? 'bg-rose-600 animate-pulse' : 'bg-emerald-500 border-b-4 border-emerald-700'}`}
              >
                <Mic size={16} /> {isListeningMic ? 'Eshitilmoqda...' : 'Gapirish (Mikrofon)'}
              </button>
            </div>

            {spokenResult && <div className="text-xs font-bold text-indigo-400">Siz aytdingiz: "{spokenResult}"</div>}
            {speakFeedback && (
              <div className={`p-3 rounded-2xl text-xs font-black ${speakFeedback.ok ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'}`}>
                {speakFeedback.msg}
              </div>
            )}

            <button onClick={() => { setSpokenResult(''); setSpeakFeedback(null); setSpeakIdx(i => i + 1); }} className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-black text-xs">
              Keyingi so‘z →
            </button>
          </div>
        )}

        {reviewSubTab === 'mock' && (
          <div className={`${theme.card} border-2 rounded-3xl p-5 space-y-4`}>
            {!mockStarted ? (
              <div className="text-center py-4 space-y-4">
                <div className="text-5xl">📝</div>
                <h3 className={`text-lg font-black ${theme.textMain}`}>TOPIK I & II Mock Test</h3>
                <p className={`text-xs ${theme.textMuted}`}>
                  8 ta aralash savol • 05:00 daqiqa vaqt chegarasi • Imtihon yakunida batafsil ball tahlili.
                </p>
                <button onClick={startTopikMock} className="w-full py-4 rounded-2xl bg-indigo-600 border-b-4 border-indigo-800 text-white font-black text-xs uppercase">
                  Imtihonni Boshlash
                </button>
              </div>
            ) : !mockFinished ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-black">
                  <span className="text-indigo-400">Savol {mockIdx + 1} / {mockQuestions.length}</span>
                  <span className="text-rose-500 flex items-center gap-1">
                    <Clock size={14} /> {Math.floor(mockTimeLeft / 60)}:{String(mockTimeLeft % 60).padStart(2, '0')}
                  </span>
                </div>
                <h4 className={`font-black text-sm ${theme.textMain}`}>{mockQuestions[mockIdx]?.q}</h4>
                <div className="space-y-2">
                  {mockQuestions[mockIdx]?.opts.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setMockAnswers({ ...mockAnswers, [mockIdx]: opt })}
                      className={`w-full p-3.5 rounded-2xl text-left border-2 text-xs font-bold ${
                        mockAnswers[mockIdx] === opt ? 'border-indigo-500 bg-indigo-500/15 text-indigo-400' : `${theme.subCard} ${theme.textMain}`
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  {mockIdx + 1 < mockQuestions.length ? (
                    <button onClick={() => setMockIdx(i => i + 1)} className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-black text-xs">
                      Keyingi savol →
                    </button>
                  ) : (
                    <button onClick={() => setMockFinished(true)} className="w-full py-3 rounded-2xl bg-emerald-500 text-white font-black text-xs">
                      Imtihonni Yakunlash
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="text-5xl">🎓</div>
                <h3 className={`text-xl font-black ${theme.textMain}`}>
                  TOPIK Mock Natijasi: {mockQuestions.filter((q, i) => mockAnswers[i] === q.ans).length} / {mockQuestions.length}
                </h3>
                <p className="text-xs text-emerald-400 font-bold">
                  Taxminiy daraja: {mockQuestions.filter((q, i) => mockAnswers[i] === q.ans).length >= 6 ? 'TOPIK 3–4급 (A’lo!)' : 'TOPIK 1–2급'}
                </p>
                <button onClick={startTopikMock} className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-black text-xs">
                  Yangi Mock Test Yechish
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // =========================================================================
  // 4. 프로필 — PROFIL VA STATISTIKA
  // =========================================================================
  const renderProfile = () => (
    <div className="space-y-5 pb-24">
      <div className={`${theme.card} border rounded-3xl p-5 flex items-center justify-between`}>
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-500 text-white font-black text-xl flex items-center justify-center">
            {stats.name.charAt(0)}
          </div>
          <div>
            <h2 className={`font-black text-base ${theme.textMain}`}>{stats.name}</h2>
            <p className="text-xs text-slate-400">{currentUser.email}</p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-[10px] font-black">
              {stats.isPro ? 'SUPER PRO A’ZO' : 'STANDART REJA'}
            </span>
          </div>
        </div>
        <button onClick={handleLogout} className="p-2.5 rounded-2xl bg-rose-500/15 text-rose-500">
          <LogOut size={18} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className={`${theme.card} border rounded-3xl p-4`}>
          <div className="text-xs text-slate-400 font-bold">Jami XP</div>
          <div className="text-2xl font-black text-sky-400 mt-1">⚡ {stats.xp}</div>
        </div>
        <div className={`${theme.card} border rounded-3xl p-4`}>
          <div className="text-xs text-slate-400 font-bold">Ketma-ket kun</div>
          <div className="text-2xl font-black text-amber-500 mt-1">🔥 {stats.streak} kun</div>
        </div>
        <div className={`${theme.card} border rounded-3xl p-4`}>
          <div className="text-xs text-slate-400 font-bold">O‘tilgan darslar</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">✅ {stats.completedNodes.length} / {allNodes.length}</div>
        </div>
        <div className={`${theme.card} border rounded-3xl p-4`}>
          <div className="text-xs text-slate-400 font-bold">O‘qish vaqti</div>
          <div className="text-2xl font-black text-indigo-400 mt-1">⏱ {stats.studyMinutes} daq</div>
        </div>
      </div>

      {!stats.isPro && (
        <div className="rounded-3xl p-5 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 space-y-3 shadow-xl">
          <div className="font-black text-base flex items-center gap-2">
            <Award size={20} /> Super ZiyoPrep PRO
          </div>
          <p className="text-xs font-bold opacity-90">Cheksiz yuraklar (∞), barcha 1A–6B darslari va cheklovsiz TOPIK Mock testlari!</p>
          <button
            onClick={() => setStats(p => ({ ...p, isPro: true, hearts: 5 }))}
            className="w-full py-3 rounded-2xl bg-slate-950 text-white font-black text-xs uppercase"
          >
            PRO ni Faollashtirish
          </button>
        </div>
      )}
    </div>
  );

  // =========================================================================
  // ASOSIY SHELL
  // =========================================================================
  return (
    <div className={`min-h-screen w-full ${theme.bg} flex flex-col font-sans select-none transition-colors`}>
      <header className={`sticky top-0 z-40 ${theme.header} px-4 py-3 backdrop-blur-xl`}>
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center">한</span>
            <span className={`font-black text-sm ${theme.textMain}`}>서울대 한국어</span>
          </div>

          <div className="flex items-center gap-3.5 text-xs font-black">
            <div className="flex items-center gap-1 text-amber-500"><Flame size={17} className="fill-amber-500" />{stats.streak}</div>
            <div className="flex items-center gap-1 text-sky-400"><Zap size={17} className="fill-sky-400" />{stats.xp}</div>
            <div className="flex items-center gap-1 text-rose-500"><Heart size={17} className="fill-rose-500" />{stats.isPro ? '∞' : stats.hearts}</div>
          </div>

          <button onClick={toggleTheme} className={`p-2 rounded-xl ${theme.subCard} border`}>
            {isDarkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-600" />}
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto p-4">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'learn' && renderLearnPath()}
        {activeTab === 'lesson_player' && renderLessonPlayer()}
        {activeTab === 'review' && renderReview()}
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'hangul' && (
          <div className="space-y-4 pb-24">
            <button onClick={() => setActiveTab('home')} className={`flex items-center gap-1.5 text-xs font-black text-indigo-400 ${theme.subCard} border px-3 py-2 rounded-xl`}>
              <ArrowLeft size={16} /> Bosh sahifaga
            </button>
            <div className={`${theme.card} border rounded-3xl p-4 grid grid-cols-3 gap-2`}>
              {['가 (ga)', '나 (na)', '다 (da)', '라 (ra)', '마 (ma)', '바 (ba)', '사 (sa)', '아 (a)', '자 (ja)', '차 (cha)', '카 (kha)', '타 (tha)', '파 (pha)', '하 (ha)', '한글'].map(s => (
                <button key={s} onClick={() => speakKo(s.split(' ')[0])} className={`${theme.subCard} border p-3 rounded-2xl text-center font-black text-sm hover:border-emerald-500`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <nav className={`fixed bottom-0 inset-x-0 z-40 ${theme.navBg} px-2 py-2.5 backdrop-blur-xl`}>
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-indigo-400' : theme.textMuted}`}>
            <Home size={22} />
            <span className="text-[10px] font-black mt-1">홈 • Bosh sahifa</span>
          </button>

          <button onClick={() => setActiveTab('learn')} className={`flex flex-col items-center ${activeTab === 'learn' || activeTab === 'lesson_player' ? 'text-emerald-400' : theme.textMuted}`}>
            <BookOpen size={22} />
            <span className="text-[10px] font-black mt-1">학습 • Darslar</span>
          </button>

          <button onClick={() => setActiveTab('review')} className={`flex flex-col items-center ${activeTab === 'review' ? 'text-amber-400' : theme.textMuted}`}>
            <RotateCcw size={22} />
            <span className="text-[10px] font-black mt-1">복습 • Takrorlash</span>
          </button>

          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-rose-400' : theme.textMuted}`}>
            <User size={22} />
            <span className="text-[10px] font-black mt-1">프로필 • Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
