import React, { useState, useEffect } from 'react';
import { 
  Volume2, ArrowLeft, Globe, Lock, CheckCircle2, 
  ChevronUp, ChevronDown, Edit3, Shuffle, Play, 
  BookOpen, Sparkles, Bot, RotateCcw, User, 
  Flame, Zap, Send, Sun, Moon
} from 'lucide-react';

// Unicode Hangul Bo'g'in Yig'uvchi Formula
const INITIALS = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const MEDIALS = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const FINALS = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

const ROMAN_CHO = { 'ㄱ':'g/k','ㄲ':'kk','ㄴ':'n','ㄷ':'d/t','ㄸ':'tt','ㄹ':'r/l','ㅁ':'m','ㅂ':'b/p','ㅃ':'pp','ㅅ':'s','ㅆ':'ss','ㅇ':'-','ㅈ':'j','ㅉ':'jj','ㅊ':'ch','ㅋ':'kh','ㅌ':'th','ㅍ':'ph','ㅎ':'h' };
const ROMAN_JUNG = { 'ㅏ':'a','ㅐ':'ae','ㅑ':'ya','ㅒ':'yae','ㅓ':'eo','ㅔ':'e','ㅕ':'yeo','ㅖ':'ye','ㅗ':'o','ㅘ':'wa','ㅙ':'wae','ㅚ':'oe','ㅛ':'yo','ㅜ':'u','ㅝ':'wo','ㅞ':'we','ㅟ':'wi','ㅠ':'yu','ㅡ':'eu','ㅢ':'ui','ㅣ':'i' };
const ROMAN_JONG = { '':'','ㄱ':'k','ㄴ':'n','ㄷ':'t','ㄹ':'l','ㅁ':'m','ㅂ':'p','ㅅ':'t','ㅇ':'ng','ㅈ':'t','ㅊ':'t','ㅎ':'t' };

function composeHangul(cho, jung, jong = '') {
  const c = INITIALS.indexOf(cho);
  const v = MEDIALS.indexOf(jung);
  const f = FINALS.indexOf(jong);
  if (c === -1 || v === -1) return cho || jung || '';
  return String.fromCharCode(0xAC00 + (c * 21 * 28) + (v * 28) + (f > 0 ? f : 0));
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function App() {
  const [screen, setScreen] = useState('home'); // 'home' | 'builder' | 'lesson' | 'ai' | 'review' | 'profile'
  const [uiLang, setUiLang] = useState('uz'); // 'uz' | 'ko'
  const [isDark, setIsDark] = useState(() => localStorage.getItem('hs_dark') === 'true');
  const [selectedBookCode, setSelectedBookCode] = useState('1A');
  const [activeLesson, setActiveLesson] = useState(null);
  const [isUnlockedAll, setIsUnlockedAll] = useState(() => localStorage.getItem('hs_unlocked') === 'true');

  const [profile, setProfile] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('hs_profile'));
      return {
        name: saved?.name || 'Tokhirbek',
        xp: saved?.xp ?? 1450,
        streak: saved?.streak ?? 12,
        hearts: saved?.hearts ?? 5
      };
    } catch {
      return { name: 'Tokhirbek', xp: 1450, streak: 12, hearts: 5 };
    }
  });
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(profile.name);

  const [completedIds, setCompletedIds] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('hs_completed'));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const [memos, setMemos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hs_memos')) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => { localStorage.setItem('hs_profile', JSON.stringify(profile)); }, [profile]);
  useEffect(() => { localStorage.setItem('hs_completed', JSON.stringify(completedIds)); }, [completedIds]);
  useEffect(() => { localStorage.setItem('hs_memos', JSON.stringify(memos)); }, [memos]);

  const toggleDark = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem('hs_dark', String(next));
      return next;
    });
  };

  const speakKo = (text) => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const clean = text.replace(/[\(\)\[\]~]/g, '').trim();
      const u = new SpeechSynthesisUtterance(clean);
      u.lang = 'ko-KR';
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    } catch {}
  };

  // --- AI USTOZ ---
  const [aiMessages, setAiMessages] = useState([
    {
      role: 'ai',
      ko: '안녕하세요! 저는 서울대 한국어 1A–6B AI 튜터예요.',
      uz: 'Salom! Men Seul Milliy Universiteti (1A–6B) dasturi bo‘yicha AI ustozingizman. Qaysi grammatikani mashq qilamiz?'
    }
  ]);
  const [aiInput, setAiInput] = useState('');

  const handleAiSend = (preset) => {
    const text = (preset || aiInput).trim();
    if (!text) return;
    setAiMessages(prev => [...prev, { role: 'user', ko: text }]);
    setAiInput('');

    setTimeout(() => {
      let reply = {
        ko: '아주 좋아요! 한국어 문장을 정확하게 사용하셨어요.',
        uz: "Juda yaxshi! Koreyscha gapni to‘g‘ri tuzdingiz. Yana misol: '저는 매일 한국어를 열심히 공부해요'."
      };

      if (text.includes('예요') || text.includes('이에요')) {
        reply = {
          ko: '받침이 있으면 "이에요" (학생이에요), 없으면 "예요" (가수예요)를 써요!',
          uz: "Undosh bilan tugasa '이에요' (학생이에요), unli bilan tugasa '예요' (가수예요) qo‘shiladi."
        };
      } else if (text.includes('아서') || text.includes('니까')) {
        reply = {
          ko: '명령문(세요)이나 청유문(읍시다) 앞에는 "-(으)니까"를 써야 해요! 예: 추우니까 옷을 입으세요.',
          uz: "Buyruq (-세요) va taklif (-읍시다) gaplarda '-아서/어서' emas, '-(으)니까' ishlatiladi!"
        };
      } else if (text.includes('다고')) {
        reply = {
          ko: '간접화법: 동사에는 "-ㄴ/는다고 해요", 형용사에는 "-다고 해요"를 붙여요.',
          uz: "Bilvosita nutqda fe'lga '-ㄴ/는다고 해요', sifatga '-다고 해요' qo‘shiladi."
        };
      }

      setAiMessages(prev => [...prev, { role: 'ai', ...reply }]);
      speakKo(reply.ko);
    }, 350);
  };

  const [flashIdx, setFlashIdx] = useState(0);
  const [flashFlipped, setFlashFlipped] = useState(false);

  // --- 글자 조립 ---
  const [builderTab, setBuilderTab] = useState('no_batchim');
  const [cho, setCho] = useState('ㄱ');
  const [jung, setJung] = useState('ㅏ');
  const [jong, setJong] = useState('ㄴ');
  const [showDoubleCho, setShowDoubleCho] = useState(false);
  const [showCompoundJung, setShowCompoundJung] = useState(false);
  const [wordBuffer, setWordBuffer] = useState('');
  const [randomChar, setRandomChar] = useState('흐');
  const [practiceCount, setPracticeCount] = useState(0);

  const basicCho = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
  const doubleCho = ['ㄲ','ㄸ','ㅃ','ㅆ','ㅉ'];
  const basicJung = ['ㅏ','ㅑ','ㅓ','ㅕ','ㅗ','ㅛ','ㅜ','ㅠ','ㅡ','ㅣ'];
  const compoundJung = ['ㅐ','ㅒ','ㅔ','ㅖ','ㅘ','ㅙ','ㅚ','ㅝ','ㅞ','ㅟ','ㅢ'];
  const batchims = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅎ'];

  const activeJong = (builderTab === 'with_batchim' || builderTab === 'word') ? jong : '';
  const composedSyllable = composeHangul(cho, jung, activeJong);
  const romanGuide = `${ROMAN_CHO[cho] || ''} + ${ROMAN_JUNG[jung] || ''}${activeJong ? ` + ${ROMAN_JONG[activeJong] || ''}` : ''}`;

  const nextRandomSyllable = () => {
    const c = basicCho[Math.floor(Math.random() * basicCho.length)];
    const v = basicJung[Math.floor(Math.random() * basicJung.length)];
    const b = Math.random() > 0.45 ? batchims[Math.floor(Math.random() * batchims.length)] : '';
    setRandomChar(composeHangul(c, v, b));
    setPracticeCount(p => p + 1);
    setProfile(p => ({ ...p, xp: p.xp + 2 }));
  };

  // --- DARS ICHIDAGI HOLATLAR ---
  const [openSec, setOpenSec] = useState({ rule: true, struct: true, words: true });
  const [doneSec, setDoneSec] = useState({ rule: false, struct: false });
  const [revealed, setRevealed] = useState({});
  const [editingMemo, setEditingMemo] = useState(false);
  const [memoInput, setMemoInput] = useState('');

  const [quizList, setQuizList] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [qAnswer, setQAnswer] = useState(null);

  const toggleItem = (key, ko) => {
    speakKo(ko);
    setRevealed(p => ({ ...p, [key]: !p[key] }));
  };

  // =========================================================================
  // 서울대 한국어 1A ~ 6B (BARCHA 12 TA JILD — HAR BIRIDA BOY DARSLAR VA MISOLLAR)
  // =========================================================================
  const snuBooks = [
    {
      code: '1A',
      label: '서울대 한국어 1A',
      range: 'TOPIK 1 · Boshlang‘ich 1 (6 dars)',
      lessons: [
        {
          id: '1a-1', num: 1, week: '1A · 1과', emoji: '👋', title: '안녕하세요? (Tanishuv)',
          heroKo: '저는 우즈베키스탄 사람이에요', heroUz: 'Men O‘zbekistonlikman',
          pinkTitle: 'N은/는 N이에요 / 예요', pinkSub: 'Millat, kasb va ismni tanishtirish',
          pinkGroups: [
            {
              cond: '받침이 없으면 (Unli bilan tugasa) → 예요',
              items: [
                { ko: '저는 유나예요.', uz: 'Men Yunaman.' },
                { ko: '저는 가수예요.', uz: 'Men qo‘shiqchiman.' },
                { ko: '이건 카메라예요.', uz: 'Bu kamera.' }
              ]
            },
            {
              cond: '받침이 있으면 (Undosh bilan tugasa) → 이에요',
              items: [
                { ko: '저는 학생이에요.', uz: 'Men talabaman.' },
                { ko: '저는 회사원이에요.', uz: 'Men kompaniya xodimiman.' },
                { ko: '이건 책상이에요.', uz: 'Bu yozuv stoli.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '저는 + 명사 + 예요 / 이에요',
          greenRows: [
            { parts: ['저는', '학생', '이에요'], res: '저는 학생이에요.', uz: 'Men talabaman.' },
            { parts: ['저는', '가수', '예요'], res: '저는 가수예요.', uz: 'Men qo‘shiqchiman.' }
          ],
          words: [
            { ko: '사람', uz: 'Odam / Kishi' },
            { ko: '학생', uz: 'Talaba' },
            { ko: '회사원', uz: 'Kompaniya xodimi' },
            { ko: '선생님', uz: 'O‘qituvchi' }
          ],
          quizzes: [
            { q: "‘저는 학생___’ — to‘g‘ri qo‘shimchani tanlang:", opts: ['이에요', '예요', '을', '를'], ans: '이에요', exp: "‘학생’ undosh bilan tugagani uchun ‘이에요’ qo‘shiladi." },
            { q: "‘저는 가수___’ — to‘g‘ri qo‘shimcha:", opts: ['예요', '이에요', '에', '에서'], ans: '예요', exp: "‘가수’ unli bilan tugagani uchun ‘예요’ qo‘shiladi." }
          ]
        },
        {
          id: '1a-2', num: 2, week: '1A · 2과', emoji: '📍', title: '여기가 어디예요? (Joylashuv)',
          heroKo: '도서관에 책상이 있어요', heroUz: 'Kutubxonada yozuv stoli bor',
          pinkTitle: 'N에 N이/가 있어요 / 없어요', pinkSub: 'Biror joyda narsa bor yoki yo‘qligini aytish',
          pinkGroups: [
            {
              cond: 'Joylashuv (에) + Mavjudlik (있어요 / 없어요)',
              items: [
                { ko: '교실에 컴퓨터가 있어요.', uz: 'Sinfxonada kompyuter bor.' },
                { ko: '가방에 지갑이 없어요.', uz: 'Sumkada hamyon yo‘q.' },
                { ko: '책상 위에 핸드폰이 있어요.', uz: 'Stol ustida telefon bor.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '장소 + 에 + 물건 + 이/가 있어요',
          greenRows: [
            { parts: ['교실에', '컴퓨터가', '있어요'], res: '교실에 컴퓨터가 있어요.', uz: 'Sinfxonada kompyuter bor.' },
            { parts: ['가방에', '지갑이', '없어요'], res: '가방에 지갑이 없어요.', uz: 'Sumkada hamyon yo‘q.' }
          ],
          words: [
            { ko: '교실', uz: 'Sinfxona' },
            { ko: '지갑', uz: 'Hamyon' },
            { ko: '위 / 아래', uz: 'Ustida / Ostida' },
            { ko: '앞 / 뒤', uz: 'Oldida / Orqasida' }
          ],
          quizzes: [
            { q: "‘Sumkada hamyon yo‘q’ — to‘g‘ri tarjima:", opts: ['가방에 지갑이 없어요', '가방에서 지갑이 없어요', '가방을 지갑이 없어요', '가방에 지갑을 있어요'], ans: '가방에 지갑이 없어요', exp: "Mavjudlik bildirilganda joyga ‘-에’ qo‘shiladi." }
          ]
        },
        {
          id: '1a-3', num: 3, week: '1A · 3과', emoji: '📚', title: '오늘 뭐 해요? (Kundalik ishlar)',
          heroKo: '도서관에서 한국어를 공부해요', heroUz: 'Kutubxonada koreys tilini o‘rganaman',
          pinkTitle: 'V-아요 / 어요 & N에서', pinkSub: 'Hozirgi zamon fe’li va harakat joyi',
          pinkGroups: [
            {
              cond: 'ㅏ, ㅗ → 아요  |  Boshqa unlilar → 어요  |  하다 → 해요',
              items: [
                { ko: '카페에서 친구를 만나요.', uz: 'Kafeda do‘stim bilan uchrashaman.' },
                { ko: '식당에서 비빔밥을 먹어요.', uz: 'Oshxonada bibimbap yeyman.' },
                { ko: '집에서 숙제를 해요.', uz: 'Uyda uy vazifasini qilaman.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '장소 + 에서 + 목적어 + 을/를 + V-아요/어요',
          greenRows: [
            { parts: ['식당에서', '비빔밥을', '먹어요'], res: '식당에서 비빔밥을 먹어요.', uz: 'Oshxonada bibimbap yeyman.' },
            { parts: ['집에서', '숙제를', '해요'], res: '집에서 숙제를 해요.', uz: 'Uyda uy vazifasini qilaman.' }
          ],
          words: [
            { ko: '식당', uz: 'Oshxona / Restoran' },
            { ko: '숙제', uz: 'Uy vazifasi' },
            { ko: '만나다', uz: 'Uchrashmoq' },
            { ko: '읽다', uz: 'O‘qimoq' }
          ],
          quizzes: [
            { q: "Harakat sodir bo‘lgan joyga qaysi qo‘shimcha qo‘shiladi?", opts: ['에서', '에', '와', '도'], ans: '에서', exp: "Harakat fe’li bilan joyga ‘-에서’ qo‘shiladi." }
          ]
        },
        {
          id: '1a-4', num: 4, week: '1A · 4과', emoji: '⏰', title: '몇 시에 만나요? (Vaqt va Sana)',
          heroKo: '오전 9시에 수업이 시작해요', heroUz: 'Ertalab soat 9 da dars boshlanadi',
          pinkTitle: '시간 + 에 (Soat va kunlar)', pinkSub: 'Aniq vaqtni bildirish',
          pinkGroups: [
            {
              cond: 'Soat (Asl koreys: 한 시, 두 시) + 분 (Xitoy-koreys: 십 분, 삼십 분)',
              items: [
                { ko: '아침 7시 30분에 일어나요.', uz: 'Ertalab 7:30 da uyg‘onaman.' },
                { ko: '토요일에 친구를 만나요.', uz: 'Shanba kuni do‘stim bilan uchrashaman.' },
                { ko: '점심시간에 커피를 마셔요.', uz: 'Tushlik vaqtida kofe ichaman.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '시간(Soat/Kun) + 에 + 동사',
          greenRows: [
            { parts: ['토요일에', '영화를', '봐요'], res: '토요일에 영화를 봐요.', uz: 'Shanba kuni kino ko‘raman.' }
          ],
          words: [
            { ko: '오전 / 오후', uz: 'Tushgacha / Tushdan keyin' },
            { ko: '토요일', uz: 'Shanba' },
            { ko: '일어나다', uz: 'Uyg‘onmoq' },
            { ko: '자다', uz: 'Uxlamoq' }
          ],
          quizzes: [
            { q: "‘Shanba kuni’ — to‘g‘ri qo‘shimcha:", opts: ['토요일에', '토요일에서', '토요일을', '토요일이에요'], ans: '토요일에', exp: "Hafta kunlaridan keyin ‘-에’ qo‘shiladi." }
          ]
        },
        {
          id: '1a-5', num: 5, week: '1A · 5과', emoji: '🍎', title: '얼마예요? (Do‘konda xarid)',
          heroKo: '사과 두 개하고 우유 한 병 주세요', heroUz: 'Ikkita olma va bir shisha sut bering',
          pinkTitle: 'N 주세요 / 얼마예요?', pinkSub: 'Narsa so‘rash va hisoblagich so‘zlar (개, 병, 잔)',
          pinkGroups: [
            {
              cond: 'Buyum (개), Shisha (병), Stakan (잔) — Asl koreys sonlari (한, 두, 세, 네)',
              items: [
                { ko: '아메리카노 두 잔 주세요.', uz: 'Ikkita amerikano bering.' },
                { ko: '이 운동화는 오만 원이에요.', uz: 'Bu krossovka 50,000 von.' },
                { ko: '모두 얼마예요?', uz: 'Hammasi necha pul?' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '명사 + 수량(한/두) + 단위(개/잔) + 주세요',
          greenRows: [
            { parts: ['커피', '두 잔', '주세요'], res: '커피 두 잔 주세요.', uz: 'Ikki stakan kofe bering.' }
          ],
          words: [
            { ko: '사과', uz: 'Olma' },
            { ko: '운동화', uz: 'Krossovka' },
            { ko: '오만 원', uz: '50,000 von' },
            { ko: '모두', uz: 'Hammasi' }
          ],
          quizzes: [
            { q: "Kofe yoki choyni sanashda qaysi birlik ishlatiladi?", opts: ['잔', '명', '권', '마리'], ans: '잔', exp: "Ichimlik stakanlari ‘잔’ bilan sanaladi." }
          ]
        },
        {
          id: '1a-6', num: 6, week: '1A · 6과', emoji: '🎬', title: '어제 뭐 했어요? (O‘tgan zamon)',
          heroKo: '어제 명동에서 쇼핑을 했어요', heroUz: 'Kecha Myongdongda xarid qildim',
          pinkTitle: 'V-았어요 / 었어요', pinkSub: 'O‘tgan zamonda bajarilgan ishlar',
          pinkGroups: [
            {
              cond: 'ㅏ, ㅗ → 았어요  |  Boshqa unlilar → 었어요  |  하다 → 했어요',
              items: [
                { ko: '어제 친구하고 영화를 봤어요.', uz: 'Kecha do‘stim bilan kino ko‘rdim.' },
                { ko: '주말에 집에서 쉬었어요.', uz: 'Dam olish kuni uyda dam oldim.' },
                { ko: '어제 한국 음식을 요리했어요.', uz: 'Kecha koreys taomini pishirdim.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '어제 / 지난주 + 무엇을 + V-았/었어요',
          greenRows: [
            { parts: ['어제', '영화를', '봤어요'], res: '어제 영화를 봤어요.', uz: 'Kecha kino ko‘rdim.' }
          ],
          words: [
            { ko: '지난주', uz: 'O‘tgan hafta' },
            { ko: '쇼핑하다', uz: 'Xarid qilmoq' },
            { ko: '쉬다', uz: 'Dam olmoq' },
            { ko: '요리하다', uz: 'Ovqat pishirmoq' }
          ],
          quizzes: [
            { q: "‘쉬다’ (dam olmoq) fe’lining o‘tgan zamoni:", opts: ['쉬었어요', '쉬았어요', '쉬해요', '쉴 거예요'], ans: '쉬었어요', exp: "‘ㅟ’ unlisidan keyin ‘-었어요’ qo‘shiladi." }
          ]
        }
      ]
    },
    {
      code: '1B',
      label: '서울대 한국어 1B',
      range: 'TOPIK 1–2 · Boshlang‘ich 2 (6 dars)',
      lessons: [
        {
          id: '1b-1', num: 1, week: '1B · 7과', emoji: '☀️', title: '날씨가 어때요? (Ob-havo)',
          heroKo: '오늘 날씨가 맑지만 조금 추워요', heroUz: 'Bugun havo ochiq, lekin biroz sovuq',
          pinkTitle: 'A-지만 & ㅂ-노to‘g‘ri sifatlar (춥다 → 추워요)', pinkSub: 'Ob-havo va fasllarni tasvirlash',
          pinkGroups: [
            {
              cond: 'ㅂ bilan tugagan sifatlar: 춥다 → 추워요, 덥다 → 더워요, 어렵다 → 어려워요',
              items: [
                { ko: '겨울에는 눈이 오고 많이 추워요.', uz: 'Qishda qor yog‘adi va juda sovuq bo‘ladi.' },
                { ko: '여름에는 덥지만 바다에 갈 수 있어요.', uz: 'Yozda issiq, lekin dengizga borish mumkin.' },
                { ko: '한국의 가을 날씨가 정말 시원해요.', uz: 'Koreyaning kuzgi ob-havosi juda salqin.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '계절(Fasl) + 에는 + 날씨(Ob-havo)',
          greenRows: [
            { parts: ['겨울에는', '날씨가', '추워요'], res: '겨울에는 날씨가 추워요.', uz: 'Qishda havo sovuq bo‘ladi.' },
            { parts: ['여름에는', '날씨가', '더워요'], res: '여름에는 날씨가 더워요.', uz: 'Yozda havo issiq bo‘ladi.' }
          ],
          words: [
            { ko: '맑다', uz: 'Ochiq / Musaffo' },
            { ko: '시원하다', uz: 'Salqin / Yoqimli' },
            { ko: '눈이 오다', uz: 'Qor yog‘moq' },
            { ko: '가을 / 겨울', uz: 'Kuz / Qish' }
          ],
          quizzes: [
            { q: "‘춥다’ (sovuq) sifatining hozirgi zamon shakli:", opts: ['추워요', '춥아요', '춥어요', '추웠어요'], ans: '추워요', exp: "‘ㅂ’ tushib qolib ‘우 + 어요 → 워요’ bo‘ladi." }
          ]
        },
        {
          id: '1b-2', num: 2, week: '1B · 8과', emoji: '🍜', title: '뭐 하고 싶어요? (Istak va Taklif)',
          heroKo: '주말에 같이 등산할까요?', heroUz: 'Dam olish kuni birga toqqa chiqaylikmi?',
          pinkTitle: 'V-고 싶어요 & V-(으)ㄹ까요?', pinkSub: 'O‘z istagini aytish va taklif bildirish',
          pinkGroups: [
            {
              cond: 'Istak: -고 싶어요 | Taklif: -(으)ㄹ까요? (...-aylikmi?)',
              items: [
                { ko: '이번 주말에 같이 영화를 볼까요?', uz: 'Shu dam olish kuni birga kino ko‘raylikmi?' },
                { ko: '저는 매운 떡볶이를 먹고 싶어요.', uz: 'Men achchiq ttokpokki yemoqchiman.' },
                { ko: '몇 시에 어디에서 만날까요?', uz: 'Soat nechada va qayerda uchrashaylik?' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '같이 + 명사 + 을/를 + V-(으)ㄹ까요?',
          greenRows: [
            { parts: ['같이', '점심을', '먹을까요?'], res: '같이 점심을 먹을까요?', uz: 'Birga tushlik qilaylikmi?' }
          ],
          words: [
            { ko: '등산하다', uz: 'Toqqa chiqmoq' },
            { ko: '맵다', uz: 'Achchiq' },
            { ko: '같이', uz: 'Birga' },
            { ko: '좋아요', uz: 'Yaxshi / Ma’qul' }
          ],
          quizzes: [
            { q: "‘Birga tushlik qilaylikmi?’ — to‘g‘ri taklif shakli:", opts: ['같이 점심을 먹을까요?', '같이 점심을 먹었어요?', '같이 점심을 먹으세요?', '같이 점심을 먹지만?'], ans: '같이 점심을 먹을까요?', exp: "Taklif so‘rashda ‘-(으)ㄹ까요?’ ishlatiladi." }
          ]
        },
        {
          id: '1b-3', num: 3, week: '1B · 9과', emoji: '🚇', title: '어떻게 가요? (Transport va Yo‘l)',
          heroKo: '집에서 회사까지 지하철로 30분 걸려요', heroUz: 'Uydan ishxonagacha metroda 30 daqiqa ketadi',
          pinkTitle: 'N에서 N까지 / N(으)로 가요', pinkSub: 'Masofa, transport vositasi va ketadigan vaqt',
          pinkGroups: [
            {
              cond: 'Transport vositasi + (으)로 (bilan/orqali) | Vaqt + 걸리다 (ketmoq)',
              items: [
                { ko: '버스나 지하철로 학교에 가요.', uz: 'Avtobus yoki metroda maktabga boraman.' },
                { ko: '서울역에서 강남까지 20분쯤 걸려요.', uz: 'Seul vokzalidan Gangnamgacha 20 daqiqacha ketadi.' },
                { ko: '길이 막혀서 택시보다 지하철이 빨라요.', uz: 'Yo‘l tirband bo‘lgani uchun taksidan ko‘ra metro tezroq.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: 'A에서 B까지 + 교통수단(으)로 + 시간 걸려요',
          greenRows: [
            { parts: ['집에서 학교까지', '버스로', '15분 걸려요'], res: '집에서 학교까지 버스로 15분 걸려요.', uz: 'Uydan maktabgacha avtobusda 15 daqiqa ketadi.' }
          ],
          words: [
            { ko: '걸리다', uz: '(Vaqt) ketmoq' },
            { ko: '갈아타다', uz: 'Transport almashtirmoq' },
            { ko: '길이 막히다', uz: 'Yo‘l tirband bo‘lmoq' },
            { ko: '빠르다', uz: 'Tez' }
          ],
          quizzes: [
            { q: "‘Metro orqali (metroda) boraman’ — to‘g‘ri qo‘shimcha:", opts: ['지하철로 가요', '지하철에서 가요', '지하철을 가요', '지하철에 가요'], ans: '지하철로 가요', exp: "Transport vositasi uchun ‘-(으)로’ ishlatiladi (ㄹ dan keyin 로)." }
          ]
        },
        {
          id: '1b-4', num: 4, week: '1B · 10과', emoji: '📞', title: '지금 통화할 수 있어요? (Telefon)',
          heroKo: '죄송하지만 다시 한 번 말씀해 주세요', heroUz: 'Uzr, yana bir marta aytib bering',
          pinkTitle: 'V-(으)ㄹ 수 있다/없다 & V-아/어 주세요', pinkSub: 'Imkoniyat va xushmuomala iltimos',
          pinkGroups: [
            {
              cond: 'Iltimos: V-아/어 주세요 | Qobiliyat: V-(으)ㄹ 수 있어요',
              items: [
                { ko: '지금 회의 중이라서 통화할 수 없어요.', uz: 'Hozir majlisda bo‘lganim uchun gaplasha olmayman.' },
                { ko: '문자를 보내 주세요.', uz: 'SMS xabar yuboring.' },
                { ko: '한국어로 이메일을 쓸 수 있어요.', uz: 'Koreys tilida email yoza olaman.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '동사 + 아/어 주세요 (Iltimos qilmoq)',
          greenRows: [
            { parts: ['창문을', '열어', '주세요'], res: '창문을 열어 주세요.', uz: 'Derazani ochib bering.' }
          ],
          words: [
            { ko: '통화하다', uz: 'Telefonda gaplashmoq' },
            { ko: '문자', uz: 'SMS xabar' },
            { ko: '다시', uz: 'Qaytadan / Yana' },
            { ko: '도와주다', uz: 'Yordam bermoq' }
          ],
          quizzes: [
            { q: "‘Derazani ochib bering’ — to‘g‘ri iltimos shakli:", opts: ['창문을 열어 주세요', '창문을 열었어요', '창문을 열 거예요', '창문을 열지만'], ans: '창문을 열어 주세요', exp: "Iltimos uchun ‘-아/어 주세요’ qo‘shiladi." }
          ]
        },
        {
          id: '1b-5', num: 5, week: '1B · 11과', emoji: '🏥', title: '어디가 아프세요? (Salomatlik)',
          heroKo: '감기에 걸려서 약을 먹어야 돼요', heroUz: 'Shamollab qolganim uchun dori ichishim kerak',
          pinkTitle: 'V-아야/어야 되다 & V-(으)면 안 되다', pinkSub: 'Majburiyat (-ish kerak) va taqiq (-ish mumkin emas)',
          pinkGroups: [
            {
              cond: 'Majburiyat: -아야/어야 돼요 | Taqiq: -(으)면 안 돼요',
              items: [
                { ko: '열이 나면 병원에 가야 돼요.', uz: 'Isitma chiqsa, kasalxonaga borish kerak.' },
                { ko: '오늘은 찬물을 마시면 안 돼요.', uz: 'Bugun sovuq suv ichish mumkin emas.' },
                { ko: '푹 쉬어야 빨리 나아요.', uz: 'Yaxshi dam olsangiz tez tuzalasiz.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: 'V-아야/어야 돼요 (Majburiyat)',
          greenRows: [
            { parts: ['약을', '먹어야', '돼요'], res: '약을 먹어야 돼요.', uz: 'Dori ichishim kerak.' }
          ],
          words: [
            { ko: '감기에 걸리다', uz: 'Shamollab qolmoq' },
            { ko: '열이 나다', uz: 'Isitmasi chiqmoq' },
            { ko: '찬물', uz: 'Sovuq suv' },
            { ko: '낫다', uz: 'Tuzalmoq' }
          ],
          quizzes: [
            { q: "‘Sovuq suv ichish mumkin emas’ — to‘g‘ri taqiq:", opts: ['찬물을 마시면 안 돼요', '찬물을 마셔야 돼요', '찬물을 마시고 싶어요', '찬물을 마실 거예요'], ans: '찬물을 마시면 안 돼요', exp: "Taqiq shakli: ‘-(으)면 안 되다’." }
          ]
        },
        {
          id: '1b-6', num: 6, week: '1B · 12과', emoji: '✈️', title: '방학에 뭐 할 거예요? (Rejalar)',
          heroKo: '이번 방학에 고향에 돌아갈 거예요', heroUz: 'Bu ta’tilda vatanimga qaytmoqchiman',
          pinkTitle: 'V-(으)ㄹ 거예요 & V-(으)러 가다', pinkSub: 'Kelajak reja va biror maqsadda borish',
          pinkGroups: [
            {
              cond: 'Maqsad bilan borish: -(으)러 가다/오다 | Reja: -(으)ㄹ 거예요',
              items: [
                { ko: '친구 선물을 사러 백화점에 갔어요.', uz: 'Do‘stimga sovg‘a olish uchun univermagga bordim.' },
                { ko: '방학 동안 가족들과 여행을 할 거예요.', uz: 'Ta’til davomida oilam bilan sayohat qilaman.' },
                { ko: '한국어를 배우러 한국에 왔어요.', uz: 'Koreys tilini o‘rganish uchun Koreyaga keldim.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '목적(Maqsad) + -(으)러 + 장소에 가다/오다',
          greenRows: [
            { parts: ['한국어를 배우러', '한국에', '왔어요'], res: '한국어를 배우러 한국에 왔어요.', uz: 'Koreys tilini o‘rganish uchun Koreyaga keldim.' }
          ],
          words: [
            { ko: '방학', uz: 'Ta’til' },
            { ko: '고향', uz: 'Vatan / Tug‘ilgan joy' },
            { ko: '돌아가다', uz: 'Qaytib ketmoq' },
            { ko: '백화점', uz: 'Univermag' }
          ],
          quizzes: [
            { q: "‘Kitob o‘qish uchun kutubxonaga boraman’:", opts: ['책을 읽으러 도서관에 가요', '책을 읽어서 도서관에 가요', '책을 읽지만 도서관에 가요', '책을 읽은 적이 가요'], ans: '책을 읽으러 도서관에 가요', exp: "‘가다/오다’ bilan maqsad ‘-(으)러’ orqali aytiladi." }
          ]
        }
      ]
    },
    {
      code: '2A',
      label: '서울대 한국어 2A',
      range: 'TOPIK 2 · O‘rta-boshlang‘ich 1 (4 dars)',
      lessons: [
        {
          id: '2a-1', num: 1, week: '2A · 1과', emoji: '🤝', title: '새 친구를 사귀었어요 (Tanishuv)',
          heroKo: '성격이 활발해서 친구가 많아요', heroUz: 'Xarakteri quvnoq bo‘lgani uchun do‘stlari ko‘p',
          pinkTitle: 'A/V-아서 / 어서 (Sabab) & N처럼', pinkSub: 'Sabab-natija va o‘xshatish (-dek)',
          pinkGroups: [
            {
              cond: 'Sabab (-gani uchun) → 아서/어서 (Buyruq gapda ishlatilmaydi!)',
              items: [
                { ko: '한국 생활이 재미있어서 시간이 빨리 가요.', uz: 'Koreyadagi hayot qiziqarli bo‘lgani uchun vaqt tez o‘tyapti.' },
                { ko: '그 친구는 친동생처럼 가까워요.', uz: 'U do‘stim o‘z ukamdek yaqin.' },
                { ko: '도움을 주셔서 진심으로 감사해요.', uz: 'Yordam berganingiz uchun chin dildan rahmat.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '원인(-아서/어서) + 결과(Natija)',
          greenRows: [
            { parts: ['성격이 활발해서', '친구가', '많아요'], res: '성격이 활발해서 친구가 많아요.', uz: 'Xarakteri quvnoq bo‘lgani uchun do‘stlari ko‘p.' }
          ],
          words: [
            { ko: '사귀다', uz: 'Do‘stlashmoq' },
            { ko: '활발하다', uz: 'Quvnoq / Faol' },
            { ko: '친절하다', uz: 'Mehribon' },
            { ko: '진심으로', uz: 'Chin dildan' }
          ],
          quizzes: [
            { q: "‘Yordam berganingiz uchun rahmat’ — to‘g‘ri shakl:", opts: ['도와주셔서 감사해요', '도와주셨어서 감사해요', '도와주니까 감사해요', '도와주러 감사해요'], ans: '도와주셔서 감사해요', exp: "Minnatdorchilik sababi ‘-아서/어서’ bilan aytiladi." }
          ]
        },
        {
          id: '2a-2', num: 2, week: '2A · 2과', emoji: '🏠', title: '집을 구하고 있어요 (Uy-joy)',
          heroKo: '학교에서 가깝고 깨끗한 방을 찾고 있어요', heroUz: 'Maktabga yaqin va toza xona qidiryapman',
          pinkTitle: 'A-(으)ㄴ N (Sifatdosh) & V-고 있다', pinkSub: 'Otni sifat bilan ta’riflash va davomiy zamon',
          pinkGroups: [
            {
              cond: 'Sifat + -(으)ㄴ + Ot (조용한 집, 큰 방, 깨끗한 거리)',
              items: [
                { ko: '조용하고 교통이 편리한 집을 구하고 있어요.', uz: 'Tinch va transporti qulay uy qidiryapman.' },
                { ko: '창문이 커서 햇빛이 잘 들어와요.', uz: 'Derazasi katta bo‘lgani uchun quyosh nuri yaxshi tushadi.' },
                { ko: '지금 부동산에서 집을 보고 있어요.', uz: 'Hozir rieltorlik idorasida uy ko‘ryapman.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '형용사 + -(으)ㄴ + 명사 + 을/를 찾고 있어요',
          greenRows: [
            { parts: ['깨끗한', '방을', '찾고 있어요'], res: '깨끗한 방을 찾고 있어요.', uz: 'Toza xona qidiryapman.' }
          ],
          words: [
            { ko: '구하다', uz: '(Uy/ish) qidirmoq' },
            { ko: '깨끗하다', uz: 'Toza' },
            { ko: '조용하다', uz: 'Tinch / Sokin' },
            { ko: '햇빛', uz: 'Quyosh nuri' }
          ],
          quizzes: [
            { q: "‘Tinch xona’ koreys tilida qanday yoziladi?", opts: ['조용한 방', '조용하는 방', '조용할 방', '조용해 방'], ans: '조용한 방', exp: "‘하다’ sifatlariga ‘-ㄴ’ qo‘shiladi: 조용한." }
          ]
        },
        {
          id: '2a-3', num: 3, week: '2A · 3과', emoji: '🧳', title: '제주도에 가 봤어요? (Tajriba)',
          heroKo: '한국에서 한복을 입어 본 적이 있어요', heroUz: 'Koreyada hanbok kiyib ko‘rganman',
          pinkTitle: 'V-아/어 보다 & V-(으)ㄴ 적이 있다', pinkSub: 'Sinab ko‘rish va hayotiy tajriba',
          pinkGroups: [
            {
              cond: 'Sinab ko‘rish: -아/어 보다 | Tajriba: -(으)ㄴ 적이 있다/없다',
              items: [
                { ko: '제주도에서 말을 타 본 적이 있어요.', uz: 'Jeju orolida ot minib ko‘rganman.' },
                { ko: '이 음식은 처음인데 한번 먹어 보세요.', uz: 'Bu taom birinchi marta ekan, bir tatib ko‘ring.' },
                { ko: '아직 KTX를 타 본 적이 없어요.', uz: 'Hali tezyurar poyezd (KTX) ga chiqib ko‘rmaganman.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: 'V-아/어 본 적이 있어요 / 없어요',
          greenRows: [
            { parts: ['한복을', '입어 본 적이', '있어요'], res: '한복을 입어 본 적이 있어요.', uz: 'Hanbok kiyib ko‘rganman.' }
          ],
          words: [
            { ko: '한번', uz: 'Bir marta / Sinab' },
            { ko: '아직', uz: 'Hali' },
            { ko: '처음', uz: 'Birinchi marta' },
            { ko: '타다', uz: 'Minmoq' }
          ],
          quizzes: [
            { q: "‘Bir tatib ko‘ring’ — to‘g‘ri ibora:", opts: ['한번 먹어 보세요', '한번 먹은 적이 있어요', '한번 먹을 거예요', '한번 먹어야 돼요'], ans: '한번 먹어 보세요', exp: "Sinab ko‘rish buyrug‘i: ‘-아/어 보세요’." }
          ]
        },
        {
          id: '2a-4', num: 4, week: '2A · 4과', emoji: '🎁', title: '선물을 고르고 있어요 (Sovg‘a)',
          heroKo: '부모님께 드릴 선물을 사고 싶어요', heroUz: 'Ota-onamga beradigan sovg‘a olmoqchiman',
          pinkTitle: 'V-(으)ㄹ N (Kelajak sifatdosh) & N께 드리다', pinkSub: 'Kattalarga hurmat fe’li (드리다) va maqsad',
          pinkGroups: [
            {
              cond: '주다 → 드리다 (Kattalarga bermoq) | 에게 → 께',
              items: [
                { ko: '선생님께 드릴 꽃을 샀어요.', uz: 'Ustozimga beradigan gul sotib oldim.' },
                { ko: '주말에 읽을 책을 빌렸어요.', uz: 'Dam olish kuni o‘qiydigan kitobimni ijaraga oldim.' },
                { ko: '할머니께 생신 선물을 드렸어요.', uz: 'Buvimga tug‘ilgan kun sovg‘asini berdim.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '어른(Katta kishi) + 께 + 선물을 드리다',
          greenRows: [
            { parts: ['부모님께', '선물을', '드렸어요'], res: '부모님께 선물을 드렸어요.', uz: 'Ota-onamga sovg‘a berdim.' }
          ],
          words: [
            { ko: '드리다', uz: 'Bermoq (hurmat)' },
            { ko: '고르다', uz: 'Tanlamoq' },
            { ko: '빌리다', uz: 'Qarzga / Ijaraga olmoq' },
            { ko: '생신', uz: 'Tug‘ilgan kun (hurmat)' }
          ],
          quizzes: [
            { q: "Ota-onaga yoki ustozga sovg‘a berganda ‘주다’ o‘rniga nima ishlatiladi?", opts: ['드리다', '드시다', '주무시다', '계시다'], ans: '드리다', exp: "‘주다’ fe’lining hurmat shakli ‘드리다’." }
          ]
        }
      ]
    },
    {
      code: '2B',
      label: '서울대 한국어 2B',
      range: 'TOPIK 2–3 · O‘rta-boshlang‘ich 2 (4 dars)',
      lessons: [
        {
          id: '2b-1', num: 1, week: '2B · 1과', emoji: '🎯', title: '한국 회사에 취직하려고 해요',
          heroKo: '졸업한 후에 IT 회사에 취직하려고 해요', heroUz: 'Bitirganimdan keyin IT kompaniyasiga ishga kirmoqchiman',
          pinkTitle: 'V-(으)려고 하다 & V-(으)ㄴ 후에', pinkSub: 'Qat’iy niyat va biror ishdan keyin',
          pinkGroups: [
            {
              cond: 'Niyat: -(으)려고 하다 | Keyin: -(으)ㄴ 후에',
              items: [
                { ko: '방학에 운전면허를 따려고 해요.', uz: 'Ta’tilda haydovchilik guvohnomasini olmoqchiman.' },
                { ko: '수업이 끝난 후에 같이 밥을 먹어요.', uz: 'Dars tugagandan keyin birga ovqatlanamiz.' },
                { ko: '한국어를 잘하기 위해 매일 연습해요.', uz: 'Koreys tilini yaxshi bilish uchun har kuni mashq qilaman.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: 'V-(으)ㄴ 후에 + V-(으)려고 해요',
          greenRows: [
            { parts: ['졸업한 후에', '취직하려고', '해요'], res: '졸업한 후에 취직하려고 해요.', uz: 'Bitirganimdan keyin ishga kirmoqchiman.' }
          ],
          words: [
            { ko: '졸업하다', uz: 'Bitirmoq' },
            { ko: '취직하다', uz: 'Ishga kirmoq' },
            { ko: '자격증', uz: 'Sertifikat / Guvohnoma' },
            { ko: '연습하다', uz: 'Mashq qilmoq' }
          ],
          quizzes: [
            { q: "‘Dars tugagandan keyin’ — to‘g‘ri qo‘shimcha:", opts: ['수업이 끝난 후에', '수업이 끝나려고', '수업이 끝나지만', '수업이 끝나서'], ans: '수업이 끝난 후에', exp: "‘-(으)ㄴ 후에’ — ...-dan keyin." }
          ]
        },
        {
          id: '2b-2', num: 2, week: '2B · 2과', emoji: '🧥', title: '날씨가 추우니까 따뜻하게 입으세요',
          heroKo: '길이 미끄러우니까 조심해서 가세요', heroUz: 'Yo‘l sirpanchiq bo‘lgani uchun ehtiyot bo‘lib boring',
          pinkTitle: 'A/V-(으)니까 (Aniq sabab)', pinkSub: 'Buyruq (-세요) va taklif (-읍시다) bilan keluvchi sabab',
          pinkGroups: [
            {
              cond: 'Sabab + (으)니까 → Buyruq / Taklif / Savol',
              items: [
                { ko: '비가 오니까 우산을 가지고 가세요.', uz: 'Yomg‘ir yog‘ayotgani uchun soyabon olib keting.' },
                { ko: '시간이 없으니까 지하철을 탑시다.', uz: 'Vaqt yo‘qligi sababli metroga chiqaylik.' },
                { ko: '이 식당은 음식이 맛있으니까 손님이 많아요.', uz: 'Bu oshxonaning taomi mazali bo‘lgani uchun mijozlari ko‘p.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '이유(Sabab) + -(으)니까 + 명령/청유',
          greenRows: [
            { parts: ['비가 오니까', '우산을', '가지고 가세요'], res: '비가 오니까 우산을 가지고 가세요.', uz: 'Yomg‘ir yog‘ayotgani uchun soyabon olib keting.' }
          ],
          words: [
            { ko: '미끄럽다', uz: 'Sirpanchiq' },
            { ko: '조심하다', uz: 'Ehtiyot bo‘lmoq' },
            { ko: '우산', uz: 'Soyabon' },
            { ko: '가지고 가다', uz: 'Olib ketmoq' }
          ],
          quizzes: [
            { q: "‘Yomg‘ir yog‘ayotgani uchun soyabon oling’ — to‘g‘ri qo‘shimcha:", opts: ['비가 오니까', '비가 와서', '비가 오지만', '비가 오러'], ans: '비가 오니까', exp: "Buyruq gap bilan ‘-(으)니까’ ishlatiladi." }
          ]
        },
        {
          id: '2b-3', num: 3, week: '2B · 3과', emoji: '📈', title: '한국어 실력이 많이 좋아졌어요',
          heroKo: '매일 공부해서 한국어가 쉬워졌어요', heroUz: 'Har kuni o‘rganganim uchun koreys tili osonlashdi',
          pinkTitle: 'A-아/어지다 (Holat o‘zgarishi)', pinkSub: 'Sifatning vaqt o‘tishi bilan o‘zgarishi (-lashmoq)',
          pinkGroups: [
            {
              cond: '좋다 → 좋아지다 (yaxshilanmoq) | 예쁘다 → 예뻐지다 | 맑다 → 맑아지다',
              items: [
                { ko: '어제보다 날씨가 훨씬 따뜻해졌어요.', uz: 'Kechagidan ko‘ra havo ancha ilidi.' },
                { ko: '한국 친구가 생겨서 생활이 즐거워졌어요.', uz: 'Koreys do‘stim paydo bo‘lgani uchun hayot quvnoqlashdi.' },
                { ko: '건강을 위해 운동을 시작해서 몸이 건강해졌어요.', uz: 'Sog‘liq uchun sport boshlaganim uchun tanam sog‘lomlashdi.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '명사 + 이/가 + 형용사-아/어졌어요',
          greenRows: [
            { parts: ['한국어 실력이', '많이', '좋아졌어요'], res: '한국어 실력이 많이 좋아졌어요.', uz: 'Koreys tili darajam ancha yaxshilandi.' }
          ],
          words: [
            { ko: '실력', uz: 'Mahorat / Bilim' },
            { ko: '훨씬', uz: 'Ancha / Ko‘proq' },
            { ko: '생기다', uz: 'Paydo bo‘lmoq' },
            { ko: '건강하다', uz: 'Sog‘lom' }
          ],
          quizzes: [
            { q: "‘Havo ilidi (iliq bo‘lib qoldi)’ — to‘g‘ri shakl:", opts: ['날씨가 따뜻해졌어요', '날씨가 따뜻했어요', '날씨가 따뜻할 거예요', '날씨가 따뜻하지만'], ans: '날씨가 따뜻해졌어요', exp: "Holat o‘zgarishi: ‘-아/어지다’." }
          ]
        },
        {
          id: '2b-4', num: 4, week: '2B · 4과', emoji: '🎭', title: '한국 문화를 배우는 게 재미있어요',
          heroKo: '한국 드라마를 보는 것이 취미예요', heroUz: 'Koreys serialini ko‘rish mening hobbiyim',
          pinkTitle: 'V-는 것 (Fe’ldan ot yasash)', pinkSub: 'Harakatni otga aylantirish (-ish / -moq)',
          pinkGroups: [
            {
              cond: 'V-는 것 (qisqacha: V-는 게, V-는 걸, V-는 건)',
              items: [
                { ko: '저는 요리하는 것을 아주 좋아해요.', uz: 'Men ovqat pishirishni juda yaxshi ko‘raman.' },
                { ko: '새벽에 일찍 일어나는 게 힘들어요.', uz: 'Saharda erta uyg‘onish qiyin.' },
                { ko: '한국 노래를 듣는 것이 한국어 공부에 도움이 돼요.', uz: 'Koreys qo‘shiqlarini tinglash koreys tilini o‘rganishga yordam beradi.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '동사 + -는 것(게/걸) + 이/가 + 형용사',
          greenRows: [
            { parts: ['요리하는', '것을', '좋아해요'], res: '요리하는 것을 좋아해요.', uz: 'Ovqat pishirishni yaxshi ko‘raman.' }
          ],
          words: [
            { ko: '취미', uz: 'Hobbi / Qiziqish' },
            { ko: '새벽', uz: 'Sahar / Tong' },
            { ko: '힘들다', uz: 'Qiyin / Mashaqqatli' },
            { ko: '도움이 되다', uz: 'Foydasi tegmoq' }
          ],
          quizzes: [
            { q: "‘Erta uyg‘onish qiyin’ — to‘g‘ri grammatika:", opts: ['일찍 일어나는 게 힘들어요', '일찍 일어난 게 힘들어요', '일찍 일어날 게 힘들어요', '일찍 일어나서 힘들어요'], ans: '일찍 일어나는 게 힘들어요', exp: "Hozirgi umumiy harakatni otga aylantirish: ‘-는 것(게)’." }
          ]
        }
      ]
    },
    {
      code: '3A-3B',
      label: '서울대 한국어 3A & 3B',
      range: 'TOPIK 3–4 · O‘rta Bosqich (4 dars)',
      lessons: [
        {
          id: '3a-1', num: 1, week: '3A · 1과', emoji: '🗣️', title: '친구가 내일 서울에 온다고 했어요',
          heroKo: '일기 예보에서 내일 비가 온다고 했어요', heroUz: 'Ob-havo ma’lumotida ertaga yomg‘ir yog‘adi deb aytdi',
          pinkTitle: 'A/V-다고 하다 (Bilvosita nutq)', pinkSub: 'Boshqalarning so‘zini yetkazish (-deb aytdi)',
          pinkGroups: [
            {
              cond: 'Fe’l: -ㄴ/는다고 하다 | Sifat: -다고 하다 | Ot: -(이)라고 하다',
              items: [
                { ko: '민수 씨가 다음 주에 결혼한다고 했어요.', uz: 'Minsu kelasi hafta turmush quraman deb aytdi.' },
                { ko: '선생님께서 시험이 어렵지 않다고 하셨어요.', uz: 'Ustoz imtihon qiyin emas deb aytdilar.' },
                { ko: '그 식당 음식이 아주 맛있다고 해요.', uz: 'O‘sha oshxonaning ovqati juda mazali deyishyapti.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: 'Ega + 이/가 + V-ㄴ/는다고 했어요',
          greenRows: [
            { parts: ['친구가', '내일 온다고', '했어요'], res: '친구가 내일 온다고 했어요.', uz: 'Do‘stim ertaga kelaman deb aytdi.' }
          ],
          words: [
            { ko: '결혼하다', uz: 'Turmush qurmoq' },
            { ko: '일기 예보', uz: 'Ob-havo ma’lumoti' },
            { ko: '전하다', uz: 'Yetkazmoq' },
            { ko: '소식', uz: 'Xabar / Yangilik' }
          ],
          quizzes: [
            { q: "‘Minsu ertaga kelaman deb aytdi’ — to‘g‘ri bilvosita nutq:", opts: ['민수가 내일 온다고 했어요', '민수가 내일 오라고 했어요', '민수가 내일 오자고 했어요', '민수가 내일 오냐고 했어요'], ans: '민수가 내일 온다고 했어요', exp: "Darak gap: ‘-ㄴ/는다고 하다’." }
          ]
        },
        {
          id: '3a-2', num: 2, week: '3A · 2과', emoji: '🤔', title: '밖에 눈이 오는 것 같아요',
          heroKo: '하늘이 흐린 걸 보니까 비가 올 것 같아요', heroUz: 'Osmon bulutligiga qaraganda yomg‘ir yog‘adiganga o‘xshaydi',
          pinkTitle: 'A/V-(으)ㄴ/는/(으)ㄹ 것 같다 (Taxmin)', pinkSub: 'O‘z fikri va taxminini yumshoq ifodalash',
          pinkGroups: [
            {
              cond: 'O‘tgan: -(으)ㄴ 것 같다 | Hozirgi: -는 것 같다 | Kelajak: -(으)ㄹ 것 같다',
              items: [
                { ko: '지금은 길이 많이 막히는 것 같아요.', uz: 'Hozir yo‘l ancha tirbandga o‘xshaydi.' },
                { ko: '어제 밤에 눈이 많이 온 것 같아요.', uz: 'Kecha tunda qor ko‘p yog‘ganga o‘xshaydi.' },
                { ko: '내일은 오늘보다 더 추울 것 같아요.', uz: 'Ertaga bugungidan sovuqroq bo‘ladiganga o‘xshaydi.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '문장 + -(으)ㄴ/는/(으)ㄹ 것 같아요',
          greenRows: [
            { parts: ['비가', '올 것', '같아요'], res: '비가 올 것 같아요.', uz: 'Yomg‘ir yog‘adiganga o‘xshaydi.' }
          ],
          words: [
            { ko: '흐리다', uz: 'Bulutli' },
            { ko: '아마', uz: 'Ehtimol / Balki' },
            { ko: '분위기', uz: 'Muhit' },
            { ko: '어울리다', uz: 'Yarashmoq / Mos kelmoq' }
          ],
          quizzes: [
            { q: "‘Ertaga sovuq bo‘ladiganga o‘xshaydi’ (kelajak taxmin):", opts: ['내일 추울 것 같아요', '내일 추운 것 같아요', '내일 추웠던 것 같아요', '내일 춥거든요'], ans: '내일 추울 것 같아요', exp: "Kelajak taxmini: ‘-(으)ㄹ 것 같다’." }
          ]
        },
        {
          id: '3b-1', num: 3, week: '3B · 1과', emoji: '😱', title: '비행기를 놓칠 뻔했어요',
          heroKo: '늦잠을 자서 중요한 면접에 늦을 뻔했어요', heroUz: 'Uxlab qolib muhim suhbatga kech qolishimga sal qoldi',
          pinkTitle: 'V-(으)ㄹ 뻔하다 (Sal qolish)', pinkSub: 'Salbiy hodisa yuz berishiga bir bahya qolish',
          pinkGroups: [
            {
              cond: 'Doim o‘tgan zamonda (뻔했어요) ishlatiladi!',
              items: [
                { ko: '길이 미끄러워서 넘어질 뻔했어요.', uz: 'Yo‘l sirpanchiq bo‘lgani uchun yiqilib tushishimga sal qoldi.' },
                { ko: '지갑을 지하철에 두고 내릴 뻔했어요.', uz: 'Hamyonimni metroda qoldirib tushib ketishimga sal qoldi.' },
                { ko: '알람을 못 들어서 지각할 뻔했어요.', uz: 'Budilnikni eshitmay qolib kech qolishimga sal qoldi.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '원인(-아서/어서) + V-(으)ㄹ 뻔했어요',
          greenRows: [
            { parts: ['늦잠을 자서', '비행기를 놓칠', '뻔했어요'], res: '늦잠을 자서 비행기를 놓칠 뻔했어요.', uz: 'Uxlab qolib samolyotga kech qolishimga sal qoldi.' }
          ],
          words: [
            { ko: '놓치다', uz: 'O‘tkazib yubormoq' },
            { ko: '넘어지다', uz: 'Yiqilmoq' },
            { ko: '지각하다', uz: 'Kech qolmoq' },
            { ko: '큰일 나다', uz: 'Katta muammo bo‘lmoq' }
          ],
          quizzes: [
            { q: "‘Yiqilib tushishimga sal qoldi’ — to‘g‘ri shakl:", opts: ['넘어질 뻔했어요', '넘어지기로 했어요', '넘어진 적이 있어요', '넘어질 수 있어요'], ans: '넘어질 뻔했어요', exp: "Sal qolish holati: ‘-(으)ㄹ 뻔하다’." }
          ]
        },
        {
          id: '3b-2', num: 4, week: '3B · 2과', emoji: '📅', title: '매일 운동하기로 했어요',
          heroKo: '새해에는 담배를 끊고 운동하기로 했어요', heroUz: 'Yangi yilda chekishni tashlab sport bilan shug‘ullanishga qaror qildim',
          pinkTitle: 'V-기로 하다 & A/V-거든요', pinkSub: 'Qaror qabul qilish va sabab tushuntirish',
          pinkGroups: [
            {
              cond: 'Qaror: -기로 했어요 | Sabab izohi: -거든요 (chunki ...-da)',
              items: [
                { ko: '친구와 주말에 도서관에서 만나기로 했어요.', uz: 'Do‘stim bilan dam olish kuni kutubxonada uchrashishga kelishdik.' },
                { ko: '오늘 백화점에 사람이 많네요. 세일 기간이거든요.', uz: 'Bugun univermagda odam ko‘p-a. Chunki chegirma davri-da.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '결심(Qaror) + V-기로 했어요',
          greenRows: [
            { parts: ['매일', '한국어를 공부하기로', '했어요'], res: '매일 한국어를 공부하기로 했어요.', uz: 'Har kuni koreys tilini o‘rganishga qaror qildim.' }
          ],
          words: [
            { ko: '결심하다', uz: 'Qaror qilmoq' },
            { ko: '약속하다', uz: 'Kelishmoq / Va’da bermoq' },
            { ko: '세일', uz: 'Chegirma' },
            { ko: '새해', uz: 'Yangi yil' }
          ],
          quizzes: [
            { q: "‘Kutubxonada uchrashishga kelishdik’ — to‘g‘ri grammatika:", opts: ['도서관에서 만나기로 했어요', '도서관에서 만날 뻔했어요', '도서관에서 만난 셈이에요', '도서관에서 만나거든요'], ans: '도서관에서 만나기로 했어요', exp: "Kelishuv va qaror: ‘V-기로 하다’." }
          ]
        }
      ]
    },
    {
      code: '4A-4B',
      label: '서울대 한국어 4A & 4B',
      range: 'TOPIK 4–5 · Yuqori-o‘rta (3 dars)',
      lessons: [
        {
          id: '4a-1', num: 1, week: '4A · 1과', emoji: '⚖️', title: '편리한 반면에 스트레스가 많아요',
          heroKo: '도시 생활은 편리한 반면에 물가가 비싸요', heroUz: 'Shahar hayoti qulay bo‘lgani holda, narx-navo qimmat',
          pinkTitle: 'V-는 반면에 & N뿐만 아니라', pinkSub: 'Qiyosiy tahlil va qo‘shimcha ma’lumot',
          pinkGroups: [
            {
              cond: 'Bir tomondan ... ikkinchi tomondan: -는 반면에 | Nafaqat ... balki: -뿐만 아니라',
              items: [
                { ko: '인터넷 쇼핑은 편리한 반면에 직접 입어 볼 수 없어요.', uz: 'Internet xarid qulay bo‘lgani holda, kiyib ko‘rish imkoni yo‘q.' },
                { ko: '그는 한국어뿐만 아니라 영어도 유창하게 구사해요.', uz: 'U nafaqat koreys, balki ingliz tilida ham ravon gapiradi.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '장점(Yutuq) + -는 반면에 + 단점(Kamchilik)',
          greenRows: [
            { parts: ['편리한 반면에', '물가가', '비싸요'], res: '편리한 반면에 물가가 비싸요.', uz: 'Qulay bo‘lgani holda narxlar qimmat.' }
          ],
          words: [
            { ko: '물가', uz: 'Narx-navo' },
            { ko: '장단점', uz: 'Yutuq va kamchiliklar' },
            { ko: '구사하다', uz: '(Tilda) ravon gapirmoq' },
            { ko: '직접', uz: 'Bevosita / O‘zi' }
          ],
          quizzes: [
            { q: "‘Nafaqat koreys, balki ingliz tilini ham biladi’:", opts: ['한국어뿐만 아니라 영어도', '한국어 덕분에 영어도', '한국어 탓에 영어도', '한국어 대신에 영어도'], ans: '한국어뿐만 아니라 영어도', exp: "‘N뿐만 아니라’ — nafaqat ..., balki ... ham." }
          ]
        },
        {
          id: '4b-1', num: 2, week: '4B · 1과', emoji: '🏆', title: '선생님 덕분에 장학금을 받았어요',
          heroKo: '열심히 도와준 친구들 덕분에 성공할 수 있었어요', heroUz: 'Astoydil yordam bergan do‘stlarim sharofati bilan muvaffaqiyatga erishdim',
          pinkTitle: 'N 덕분에 vs N 탓에 / V-는 바람에', pinkSub: 'Ijobiy sabab (덕분에) va salbiy sabab (탓에 / 바람에)',
          pinkGroups: [
            {
              cond: 'Ijobiy natija → 덕분에 | Salbiy natija → 탓에 / -는 바람에',
              items: [
                { ko: '부모님의 응원 덕분에 힘든 시기를 이겨냈어요.', uz: 'Ota-onamning qo‘llab-quvvatlashi sharofati bilan qiyin davrni yengib o‘tdim.' },
                { ko: '갑자기 비가 쏟아지는 바람에 옷이 다 젖었어요.', uz: 'To‘satdan jala quygani sababli kiyimlarim hammasi ho‘l bo‘ldi.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '긍정 원인 + 덕분에  |  부정 원인 + -는 바람에',
          greenRows: [
            { parts: ['선생님 덕분에', '장학금을', '받았어요'], res: '선생님 덕분에 장학금을 받았어요.', uz: 'Ustozim sharofati bilan stipendiya oldim.' }
          ],
          words: [
            { ko: '장학금', uz: 'Stipendiya' },
            { ko: '응원', uz: 'Qo‘llab-quvvatlash' },
            { ko: '이겨내다', uz: 'Yengib o‘tmoq' },
            { ko: '쏟아지다', uz: '(Yomg‘ir) jala bo‘lib quymoq' }
          ],
          quizzes: [
            { q: "Kutilmagan salbiy hodisa sababini aytishda qaysi qo‘shimcha ishlatiladi?", opts: ['-는 바람에', '덕분에', '뿐만 아니라', '기로 하다'], ans: '-는 바람에', exp: "Salbiy kutilmagan sabab: ‘-는 바람에’." }
          ]
        },
        {
          id: '4b-2', num: 3, week: '4B · 2과', emoji: '🚪', title: '창문이 바람에 저절로 닫혔어요',
          heroKo: '멀리서 아름다운 음악 소리가 들려요', heroUz: 'Uzoqdan chiroyli musiqa ovozi eshitilyapti',
          pinkTitle: '피동사 (-이/히/리/기- Majhul nisbat)', pinkSub: '보이다 (ko‘rinmoq), 들리다 (eshitilmoq), 열리다 (ochilmoq)',
          pinkGroups: [
            {
              cond: '보다 → 보이다 | 듣다 → 들리다 | 열다 → 열리다 | 닫다 → 닫히다',
              items: [
                { ko: '창밖으로 한강이 한눈에 보여요.', uz: 'Derazadan Xan daryosi bir qarashda ko‘rinadi.' },
                { ko: '출근 시간이라서 지하철 문이 잘 안 닫혀요.', uz: 'Ishga borish vaqti bo‘lgani uchun metro eshigi yaxshi yopilmayapti.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '사물(Narsa) + 이/가 + 피동사(보이다/들리다)',
          greenRows: [
            { parts: ['창밖으로', '한강이', '보여요'], res: '창밖으로 한강이 보여요.', uz: 'Derazadan Xan daryosi ko‘rinadi.' }
          ],
          words: [
            { ko: '보이다', uz: 'Ko‘rinmoq' },
            { ko: '들리다', uz: 'Eshitilmoq' },
            { ko: '열리다', uz: 'Ochilmoq' },
            { ko: '저절로', uz: 'O‘z-o‘zidan' }
          ],
          quizzes: [
            { q: "‘듣다’ (eshitmoq) fe’lining majhul nisbat (eshitilmoq) shakli:", opts: ['들리다', '보이다', '열리다', '잠기다'], ans: '들리다', exp: "‘듣다’ → ‘들리다’." }
          ]
        }
      ]
    },
    {
      code: '5A-6B',
      label: '서울대 한국어 5A ~ 6B',
      range: 'TOPIK 5–6 · Oliy Akademik (4 dars)',
      lessons: [
        {
          id: '5a-1', num: 1, week: '5A · 1과', emoji: '📊', title: '이 정도면 성공한 셈이에요',
          heroKo: '수출이 증가한 데 반해 내수 시장은 위축되었다', heroUz: 'Eksport oshgan bir paytda ichki bozor qisqardi',
          pinkTitle: 'A/V-(으)ㄴ/는 셈이다 & V-는 데 반해', pinkSub: 'TOPIK 5 rasmiy xulosa va keskin qiyoslash',
          pinkGroups: [
            {
              cond: 'Xulosa: -(으)ㄴ/는 셈이다 (-hisoblanadi) | Keskin qarama-qarshilik: -는 데 반해',
              items: [
                { ko: '1년 만에 TOPIK 5급을 땄으니 대단한 셈이다.', uz: '1 yil ichida TOPIK 5-darajani olgani uchun katta yutuq hisoblanadi.' },
                { ko: '온라인 시장은 급성장한 데 반해 오프라인 매장은 줄어들었다.', uz: 'Onlayn bozor tez o‘sgan bir paytda oflayn do‘konlar kamaydi.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '결과(Natija) + -(으)ㄴ/는 셈이다',
          greenRows: [
            { parts: ['이 정도면', '성공한', '셈이에요'], res: '이 정도면 성공한 셈이에요.', uz: 'Bu daraja bo‘lsa muvaffaqiyatga erishilgan hisoblanadi.' }
          ],
          words: [
            { ko: '수출 / 수입', uz: 'Eksport / Import' },
            { ko: '급성장하다', uz: 'Tez sur’atda o‘smoq' },
            { ko: '위축되다', uz: 'Qisqarmoq / Susaymoq' },
            { ko: '대책', uz: 'Chora-tadbir' }
          ],
          quizzes: [
            { q: "‘Deyarli tugatgan hisoblanamiz’ — TOPIK 5 shakli:", opts: ['다 끝낸 셈이에요', '다 끝낼 뻔했어요', '다 끝내거든요', '다 끝내러 가요'], ans: '다 끝낸 셈이에요', exp: "Umumiy xulosa chiqarish: ‘-(으)ㄴ/는 셈이다’." }
          ]
        },
        {
          id: '5b-1', num: 2, week: '5B · 1과', emoji: '📜', title: '노력하면 좋은 결과가 따르기 마련이다',
          heroKo: '가는 말이 고와야 오는 말이 곱다', heroUz: 'Yaxshi gapirsang, yaxshi javob olasan',
          pinkTitle: 'V-기 마련이다 & N에 불과하다', pinkSub: 'Tabiiy qonuniyat va cheklanganlik (속담 Maqollar)',
          pinkGroups: [
            {
              cond: 'Tabiiy qonun: -기 마련이다 | Bor-yo‘g‘i: -에 불과하다',
              items: [
                { ko: '누구나 처음에는 실수를 하기 마련이다.', uz: 'Har kim ham boshida xato qilishi tabiiy.' },
                { ko: '우리가 아는 지식은 빙산의 일각에 불과하다.', uz: 'Biz bilgan bilim aysbergning uchidan iborat xolos.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '당연한 이치(Tabiiy holat) + -기 마련이다',
          greenRows: [
            { parts: ['노력하면', '좋은 결과가 따르기', '마련이다'], res: '노력하면 좋은 결과가 따르기 마련이다.', uz: 'Harakat qilsangiz, yaxshi natija kelishi tabiiy.' }
          ],
          words: [
            { ko: '빙산의 일각', uz: 'Aysbergning uchi (juda oz qismi)' },
            { ko: '실수', uz: 'Xato' },
            { ko: '불과하다', uz: 'Xolos / Bor-yo‘g‘i' },
            { ko: '속담', uz: 'Maqol' }
          ],
          quizzes: [
            { q: "‘Xato qilishi tabiiy’ — to‘g‘ri grammatika:", opts: ['실수를 하기 마련이다', '실수를 할 뻔했다', '실수를 한 셈이다', '실수를 하기로 했다'], ans: '실수를 하기 마련이다', exp: "Tabiiy qonuniyat: ‘-기 마련이다’." }
          ]
        },
        {
          id: '6a-1', num: 3, week: '6A · 1과', emoji: '🎓', title: '남녀노소를 막론하고 참여할 수 있다',
          heroKo: '본 연구는 AI 교육의 효율성을 규명한 바이다', heroUz: 'Ushbu tadqiqot AI ta’limi samaradorligini isbotlab berdi',
          pinkTitle: 'N을/를 막론하고 & V-는 바이다', pinkSub: 'TOPIK 6 oliy rasmiy uslub va ilmiy maqolalar tili',
          pinkGroups: [
            {
              cond: 'Qat’i nazar: -을/를 막론하고 | Rasmiy bayonot: -는 바이다',
              items: [
                { ko: '국적과 나이를 막론하고 인재를 채용하고 있습니다.', uz: 'Millati va yoshidan qat’i nazar iqtidorli kadrlarni ishga olyapmiz.' },
                { ko: '시대의 패러다임이 빠르게 전환되고 있는 바이다.', uz: 'Davr paradigmasi tez sur’atda o‘zgarib bormoqda.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '명사 + 을/를 막론하고 (Qat’i nazar)',
          greenRows: [
            { parts: ['남녀노소를', '막론하고', '참여할 수 있다'], res: '남녀노소를 막론하고 참여할 수 있다.', uz: 'Yoshu qaridan qat’i nazar hamma qatnasha oladi.' }
          ],
          words: [
            { ko: '막론하다', uz: 'Qat’i nazar' },
            { ko: '규명하다', uz: 'Isbotlamoq / Aniqlamoq' },
            { ko: '인재', uz: 'Iqtidorli kadr' },
            { ko: '전환되다', uz: 'O‘zgarmoq / Burilmoq' }
          ],
          quizzes: [
            { q: "‘Yoshu qaridan qat’i nazar’ — TOPIK 6 iborasi:", opts: ['남녀노소를 막론하고', '남녀노소 덕분에', '남녀노소 탓에', '남녀노소지만'], ans: '남녀노소를 막론하고', exp: "‘N을/를 막론하고’ — ...-dan qat’i nazar." }
          ]
        },
        {
          id: '6b-1', num: 4, week: '6B · 1과', emoji: '👑', title: '도서관에서 살다시피 했어요 (Master)',
          heroKo: '최선을 다한 후 결과를 기다릴 따름이다', heroUz: 'Bor kuchni sarflagach, natijani kutish qoldi xolos',
          pinkTitle: 'V-(으)ㄹ 따름이다 & V-다시피 하다', pinkSub: 'TOPIK 6 yakuniy oliy grammatika',
          pinkGroups: [
            {
              cond: 'Deyarli ... qilmoq: -다시피 하다 | Boshqa iloj yo‘q: -(으)ㄹ 따름이다',
              items: [
                { ko: '시험 기간에는 하루 종일 도서관에서 살다시피 했어요.', uz: 'Imtihon paytida kun bo‘yi kutubxonada yashagandek bo‘ldim.' },
                { ko: '이제는 우리가 할 수 있는 일을 묵묵히 해 나갈 따름이다.', uz: 'Endi qo‘limizdan kelgan ishni jimjitlik bilan davom ettirish qoldi xolos.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '동사 + -다시피 하다 (Deyarli shunday qilmoq)',
          greenRows: [
            { parts: ['도서관에서', '살다시피', '했어요'], res: '도서관에서 살다시피 했어요.', uz: 'Kutubxonada yashagandek bo‘ldim.' }
          ],
          words: [
            { ko: '최선을 다하다', uz: 'Bor kuchini sarflamoq' },
            { ko: '비약적', uz: 'Sakrashsimon / Ulkan' },
            { ko: '귀감', uz: 'Namuna / Ibrat' },
            { ko: '묵묵히', uz: 'Sokinlik va sabr bilan' }
          ],
          quizzes: [
            { q: "‘Kutubxonada yashagandek bo‘ldim’ — TOPIK 6 iborasi:", opts: ['도서관에서 살다시피 했어요', '도서관에서 살 뻔했어요', '도서관에서 살기로 했어요', '도서관에서 살거든요'], ans: '도서관에서 살다시피 했어요', exp: "‘-다시피 하다’ — deyarli shunday qilmoq." }
          ]
        }
      ]
    }
  ];

  const currentBook = snuBooks.find(b => b.code === selectedBookCode) || snuBooks[0];
  const allLessons = snuBooks.flatMap(b => b.lessons);
  const allWords = allLessons.flatMap(l => l.words);
  const nextLesson = allLessons.find(l => !completedIds.includes(l.id)) || allLessons[0];

  const startLesson = (lesson) => {
    setActiveLesson(lesson);
    setOpenSec({ rule: true, struct: true, words: true });
    setDoneSec({ rule: false, struct: false });
    setRevealed({});
    setEditingMemo(false);
    setMemoInput(memos[lesson.id] || '');
    const shuffled = shuffleArray(lesson.quizzes).map(q => ({
      ...q,
      opts: shuffleArray(q.opts)
    }));
    setQuizList(shuffled);
    setQIdx(0);
    setQAnswer(null);
    setScreen('lesson');
  };

  const t = {
    bg: isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-[#faf8f9] text-[#1e1e1e]',
    card: isDark ? 'bg-[#141a29] border-slate-800' : 'bg-white border-slate-200/90 shadow-2xs',
    sub: isDark ? 'bg-[#1c2438] border-slate-700' : 'bg-[#fafafa] border-slate-200',
    nav: isDark ? 'bg-[#0f1524]/95 border-t border-slate-800' : 'bg-white/95 border-t border-slate-200/90',
    textMain: isDark ? 'text-white' : 'text-[#1e1e1e]',
    textMuted: isDark ? 'text-slate-400' : 'text-slate-500'
  };

  // =========================================================================
  // 1. ASOSIY EKRAN — "한글 스튜디오"
  // =========================================================================
  const renderHome = () => (
    <div className="space-y-4 pb-24">
      <div className="flex items-center justify-between pt-2">
        <h1 className={`text-[22px] font-black tracking-tight ${t.textMain}`}>한글 스튜디오</h1>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setUiLang(l => l === 'uz' ? 'ko' : 'uz')}
            className={`px-3 py-1.5 rounded-full ${t.card} border text-xs font-bold flex items-center gap-1.5`}
          >
            <Globe size={14} className="text-sky-500" />
            <span>{uiLang === 'uz' ? "O'zbekcha" : '한국어'}</span>
          </button>
          <button onClick={toggleDark} className={`p-2 rounded-full ${t.card} border`}>
            {isDark ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-slate-600" />}
          </button>
        </div>
      </div>

      {/* ▶ 이어서 공부하기 */}
      <button
        onClick={() => startLesson(nextLesson)}
        className={`w-full py-3.5 px-4 rounded-2xl ${t.card} border hover:border-rose-300 text-xs font-black flex items-center justify-center gap-2 active:scale-99 transition`}
      >
        <Play size={13} className="text-[#e11d48] fill-[#e11d48]" />
        <span>
          {uiLang === 'uz'
            ? `${nextLesson.week} Davom etish (${nextLesson.title})`
            : `${nextLesson.week} 이어서 공부하기`}
        </span>
      </button>

      {/* Yashil Karta: 글자 조립 */}
      <div
        onClick={() => setScreen('builder')}
        className={`rounded-2xl ${isDark ? 'bg-emerald-950/40 border-emerald-800' : 'bg-[#eef6ee] border-[#d6ead6]'} border p-4 flex items-center justify-between cursor-pointer active:scale-99 transition`}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#4d8b6f] text-white font-black text-xs flex items-center justify-center shadow-xs">
            abc
          </div>
          <div>
            <div className={`font-black text-sm ${t.textMain}`}>
              글자 조립 {uiLang === 'uz' && <span className="text-xs font-bold text-emerald-600">(Harf yig‘ish)</span>}
            </div>
            <div className={`text-[11px] ${t.textMuted} mt-0.5`}>
              {uiLang === 'uz'
                ? 'Undosh va unlini bosib bo‘g‘in yasang va talaffuzini eshiting'
                : '자음·모음을 눌러 글자 만들고 발음 듣기'}
            </div>
          </div>
        </div>
        <span className="text-slate-400 font-bold text-lg">›</span>
      </div>

      {/* 서울대 한국어 1A ~ 6B Tablari */}
      <div className="space-y-1 pt-1">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[11px] font-black text-slate-400 tracking-wider uppercase shrink-0 mr-1">서울대</span>
          {snuBooks.map((b) => {
            const active = b.code === selectedBookCode;
            return (
              <button
                key={b.code}
                onClick={() => setSelectedBookCode(b.code)}
                className={`px-3 h-8 rounded-lg font-black text-xs shrink-0 transition ${
                  active
                    ? isDark ? 'bg-slate-800 border-2 border-rose-400 text-white' : 'bg-white border-2 border-[#1e1e1e] text-[#1e1e1e]'
                    : isDark ? 'bg-rose-950/60 text-rose-200' : 'bg-[#f8dce2] text-[#7f2d3f]'
                }`}
              >
                {b.code}
              </button>
            );
          })}
        </div>
        <div className="flex justify-between text-[11px] font-bold text-slate-400 px-0.5">
          <span>{currentBook.label}</span>
          <span>{currentBook.range}</span>
        </div>
      </div>

      {/* Darslar Ro'yxati */}
      <div className="space-y-2.5">
        {currentBook.lessons.map((lesson, idx) => {
          const isDone = completedIds.includes(lesson.id);
          const prev = idx > 0 ? currentBook.lessons[idx - 1] : null;
          const isOpen = isUnlockedAll || idx === 0 || isDone || (prev && completedIds.includes(prev.id));

          return (
            <div
              key={lesson.id}
              onClick={() => {
                if (!isOpen) {
                  alert(uiLang === 'uz' ? "Avval oldingi darsni tugating!" : "이전 과를 먼저 완료하세요!");
                  return;
                }
                startLesson(lesson);
              }}
              className={`rounded-2xl ${t.card} border p-3.5 flex items-center justify-between cursor-pointer transition ${
                isOpen ? 'hover:border-rose-300' : 'opacity-65'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-lg font-black text-xs flex items-center justify-center ${
                  isDone
                    ? 'bg-emerald-500 text-white'
                    : isOpen
                      ? 'bg-[#dbeafe] text-[#1d4ed8]'
                      : 'bg-[#fce7eb] text-[#be123c]'
                }`}>
                  {lesson.num}
                </span>
                <span className="text-base">{lesson.emoji}</span>
                <div>
                  <div className={`text-xs font-black ${t.textMain}`}>{lesson.title}</div>
                  {uiLang === 'uz' && <div className="text-[10px] text-slate-400">{lesson.heroUz}</div>}
                </div>
              </div>

              <div>
                {isDone ? (
                  <CheckCircle2 size={17} className="text-emerald-500" />
                ) : !isOpen ? (
                  <Lock size={15} className="text-slate-300" />
                ) : (
                  <span className="text-[10px] font-black text-rose-500">›</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!isUnlockedAll && (
        <button
          onClick={() => {
            setIsUnlockedAll(true);
            localStorage.setItem('hs_unlocked', 'true');
          }}
          className="w-full py-3.5 rounded-2xl bg-[#e11d48] hover:bg-rose-600 text-white font-black text-xs tracking-wide shadow-md mt-2"
        >
          {uiLang === 'uz' ? '전체 코스 열기 (Barcha darslarni ochish)' : '전체 코스 열기'}
        </button>
      )}
    </div>
  );

  // =========================================================================
  // 2. "글자 조립"
  // =========================================================================
  const renderBuilder = () => (
    <div className="space-y-3.5 pb-24">
      <div className="flex items-center justify-between pt-2">
        <button onClick={() => setScreen('home')} className={`flex items-center gap-1.5 text-sm font-black ${t.textMain}`}>
          <ArrowLeft size={16} /> <span>글자 조립</span>
        </button>
        <button
          onClick={() => setUiLang(l => l === 'uz' ? 'ko' : 'uz')}
          className={`px-3 py-1 rounded-full ${t.card} border text-xs font-bold flex items-center gap-1`}
        >
          <Globe size={13} className="text-sky-500" /> {uiLang === 'uz' ? "O'zbekcha" : '한국어'}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        {[
          { id: 'no_batchim', icon: '가', label: '받침 없는 글자' },
          { id: 'with_batchim', icon: '난', label: '받침 있는 글자' },
          { id: 'word', icon: '🥗', label: '단어 조립' },
          { id: 'pronounce', icon: '🔊', label: '발음 연습' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setBuilderTab(tab.id)}
            className={`p-2.5 rounded-2xl border text-center transition ${
              builderTab === tab.id
                ? isDark ? 'bg-emerald-950/60 border-emerald-500 text-white font-black' : 'bg-[#eef6ee] border-[#9ec99e] font-black text-slate-900'
                : `${t.card} ${t.textMuted}`
            }`}
          >
            <div className="text-sm font-black">{tab.icon}</div>
            <div className="text-[9px] mt-1 leading-tight">{tab.label}</div>
          </button>
        ))}
      </div>

      <div className={`rounded-3xl ${t.card} border p-4 space-y-3.5`}>
        <div className="text-[11px] font-bold text-slate-500">
          자음과 모음을 눌러서 글자를 만들어 보세요
        </div>

        <div className="space-y-1.5">
          <div className="text-[10px] font-bold text-slate-400">자음</div>
          <div className="grid grid-cols-8 gap-1.5">
            {(showDoubleCho ? [...basicCho, ...doubleCho] : basicCho).map(c => (
              <button
                key={c}
                onClick={() => { setCho(c); speakKo(composeHangul(c, jung, activeJong)); }}
                className={`py-2 rounded-xl border text-xs font-black transition ${
                  cho === c
                    ? 'bg-[#e6f3e6] border-[#82b982] text-emerald-900'
                    : `${t.sub} ${t.textMain}`
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <button onClick={() => setShowDoubleCho(!showDoubleCho)} className="text-[10px] font-bold text-slate-400">
            쌍자음 {showDoubleCho ? '▲' : '▼'}
          </button>
        </div>

        <div className="space-y-1.5">
          <div className="text-[10px] font-bold text-slate-400">모음</div>
          <div className="grid grid-cols-8 gap-1.5">
            {(showCompoundJung ? [...basicJung, ...compoundJung] : basicJung).map(v => (
              <button
                key={v}
                onClick={() => { setJung(v); speakKo(composeHangul(cho, v, activeJong)); }}
                className={`py-2 rounded-xl border text-xs font-black transition ${
                  jung === v
                    ? 'bg-[#e6f3e6] border-[#82b982] text-emerald-900'
                    : `${t.sub} ${t.textMain}`
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <button onClick={() => setShowCompoundJung(!showCompoundJung)} className="text-[10px] font-bold text-slate-400">
            겹모음 {showCompoundJung ? '▲' : '▼'}
          </button>
        </div>

        {(builderTab === 'with_batchim' || builderTab === 'word') && (
          <div className="space-y-1.5">
            <div className="text-[10px] font-bold text-slate-400">받침</div>
            <div className="grid grid-cols-6 gap-1.5">
              {batchims.map(b => (
                <button
                  key={b}
                  onClick={() => { setJong(b); speakKo(composeHangul(cho, jung, b)); }}
                  className={`py-1.5 rounded-xl border text-xs font-black ${
                    jong === b ? 'bg-[#fdf2f4] border-rose-400 text-rose-800' : `${t.sub} ${t.textMain}`
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-12 gap-3 pt-2 items-center border-t border-slate-200/40">
          <div
            onClick={() => speakKo(composedSyllable)}
            className={`col-span-5 aspect-square rounded-2xl ${t.sub} border flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400`}
          >
            <span className={`text-5xl font-black ${t.textMain}`}>{composedSyllable}</span>
            <span className="text-[10px] font-bold text-slate-400 mt-1">{romanGuide}</span>
            <span className="text-[9px] font-bold text-slate-500 mt-0.5">🔊 눌러서 듣기</span>
          </div>

          <div className="col-span-7 space-y-2">
            <div className="text-[10px] font-bold text-slate-500">단어 조립</div>
            <div className={`min-h-[38px] px-3 py-2 rounded-xl ${t.sub} border text-sm font-black ${t.textMain} flex items-center`}>
              {wordBuffer || <span className="text-[10px] font-normal text-slate-400">글자를 추가하거나 입력</span>}
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={() => setWordBuffer(w => w + composedSyllable)}
                className="px-3 py-1.5 rounded-xl bg-[#eef6ee] text-emerald-800 font-black text-[11px]"
              >
                + 추가
              </button>
              <button
                onClick={() => setWordBuffer(w => w.slice(0, -1))}
                className={`px-2.5 py-1.5 rounded-xl ${t.sub} border text-[11px] font-bold`}
              >
                ⌫
              </button>
              <button
                onClick={() => setWordBuffer('')}
                className={`px-2.5 py-1.5 rounded-xl ${t.sub} border text-[10px] font-bold`}
              >
                전체 지우기
              </button>
            </div>
            <button
              onClick={() => wordBuffer && speakKo(wordBuffer)}
              className="px-3.5 py-1.5 rounded-full bg-slate-800 text-white font-bold text-[10px] flex items-center gap-1"
            >
              <Volume2 size={12} /> 단어 듣기
            </button>
          </div>
        </div>
      </div>

      <div className={`rounded-3xl ${t.card} border p-5 text-center space-y-3`}>
        <div className="flex justify-between items-center text-[11px] font-bold">
          <span className={t.textMain}>🔊 랜덤 읽기 연습</span>
          <span className="text-slate-400">지금까지 {practiceCount}개 연습</span>
        </div>

        <div className="flex items-center justify-center gap-4 py-1">
          <span className={`text-5xl font-black ${t.textMain}`}>{randomChar}</span>
          <button
            onClick={() => speakKo(randomChar)}
            className="text-[11px] font-bold text-slate-500 hover:text-emerald-600 flex items-center gap-1"
          >
            <Volume2 size={15} /> 발음 들어보기
          </button>
        </div>

        <button
          onClick={nextRandomSyllable}
          className="px-6 py-2.5 rounded-full bg-[#2b2b2b] text-white font-bold text-xs shadow-xs active:scale-95 transition"
        >
          읽었어요, 다음 글자
        </button>
      </div>
    </div>
  );

  // =========================================================================
  // 3. DARS EKRANI
  // =========================================================================
  const renderLesson = () => {
    if (!activeLesson) return null;
    const currentQ = quizList[qIdx];

    return (
      <div className="space-y-3.5 pb-24">
        <div className="flex items-center justify-between pt-2">
          <button onClick={() => setScreen('home')} className={`flex items-center gap-1.5 text-xs font-black ${t.textMuted}`}>
            <ArrowLeft size={15} /> <span>{activeLesson.week}</span>
          </button>
          <button
            onClick={() => setUiLang(l => l === 'uz' ? 'ko' : 'uz')}
            className={`px-3 py-1 rounded-full ${t.card} border text-[11px] font-bold flex items-center gap-1`}
          >
            <Globe size={12} className="text-sky-500" /> {uiLang === 'uz' ? "O'zbekcha" : '한국어'}
          </button>
        </div>

        <div
          onClick={() => toggleItem('hero', activeLesson.heroKo)}
          className={`rounded-2xl ${t.card} border p-4 flex items-center gap-3.5 cursor-pointer`}
        >
          <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl shrink-0">
            🇰🇷
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400">{activeLesson.week}</div>
            <div className={`text-base font-black ${t.textMain}`}>{activeLesson.heroKo}</div>
            {revealed['hero'] && (
              <div className="text-xs font-bold text-indigo-500 mt-0.5">{activeLesson.heroUz}</div>
            )}
          </div>
        </div>

        {/* 1-BLOK (PUSHTI) */}
        <div className={`rounded-3xl ${isDark ? 'bg-rose-950/40 border-rose-800' : 'bg-[#fdf2f4] border-[#f5d5dc]'} border overflow-hidden`}>
          <button
            onClick={() => setOpenSec(p => ({ ...p, rule: !p.rule }))}
            className="w-full p-4 flex items-center justify-between text-left"
          >
            <div>
              <span className={`font-black text-sm ${t.textMain}`}>{activeLesson.pinkTitle} </span>
              <span className="text-[11px] text-slate-500">{activeLesson.pinkSub}</span>
            </div>
            {openSec.rule ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
          </button>

          {openSec.rule && (
            <div className={`${isDark ? 'bg-[#141a29]' : 'bg-white'} p-4 space-y-4`}>
              {activeLesson.pinkGroups.map((grp, gi) => (
                <div key={gi} className="space-y-2">
                  <div className="text-[11px] font-bold text-slate-400">{grp.cond}</div>
                  <div className="space-y-2">
                    {grp.items.map((it, ii) => {
                      const key = `p-${gi}-${ii}`;
                      return (
                        <div key={key} onClick={() => toggleItem(key, it.ko)} className="cursor-pointer">
                          <div className={`text-sm font-black ${t.textMain} hover:text-rose-500`}>{it.ko}</div>
                          {revealed[key] && (
                            <div className="text-xs text-slate-400 font-bold">{it.uz}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="pt-2 border-t border-slate-200/30">
                {editingMemo ? (
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={memoInput}
                      onChange={e => setMemoInput(e.target.value)}
                      placeholder="Eslatma yozing..."
                      className={`flex-1 ${t.sub} border rounded-xl px-3 py-1.5 text-xs`}
                    />
                    <button
                      onClick={() => {
                        setMemos(p => ({ ...p, [activeLesson.id]: memoInput }));
                        setEditingMemo(false);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
                    >
                      OK
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <button onClick={() => setEditingMemo(true)} className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Edit3 size={12} /> {memos[activeLesson.id] || 'memo'}
                    </button>
                    <button
                      onClick={() => setDoneSec(p => ({ ...p, rule: !p.rule }))}
                      className={`px-3 py-1 rounded-lg border text-[11px] font-bold ${
                        doneSec.rule ? 'bg-emerald-500 text-white border-emerald-600' : 'border-slate-300 text-slate-400'
                      }`}
                    >
                      {doneSec.rule ? '✓ 완료' : '☐ 완료'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 2-BLOK (YASHIL) */}
        <div className={`rounded-3xl ${isDark ? 'bg-emerald-950/40 border-emerald-800' : 'bg-[#eef6ee] border-[#d6ead6]'} border overflow-hidden`}>
          <button
            onClick={() => setOpenSec(p => ({ ...p, struct: !p.struct }))}
            className="w-full p-4 flex items-center justify-between text-left"
          >
            <div>
              <span className={`font-black text-sm ${t.textMain}`}>{activeLesson.greenTitle} </span>
              <span className="text-[11px] text-emerald-600 font-bold">{activeLesson.greenFormula}</span>
            </div>
            {openSec.struct ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
          </button>

          {openSec.struct && (
            <div className={`${isDark ? 'bg-[#141a29]' : 'bg-white'} p-4 space-y-3`}>
              {activeLesson.greenRows.map((row, ri) => {
                const key = `g-${ri}`;
                return (
                  <div key={key} onClick={() => toggleItem(key, row.res)} className="cursor-pointer space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
                      {row.parts.map((pt, pi) => (
                        <React.Fragment key={pi}>
                          <span className={`px-2.5 py-1 rounded-lg ${t.sub} border`}>{pt}</span>
                          {pi < row.parts.length - 1 && <span className="text-slate-400">+</span>}
                        </React.Fragment>
                      ))}
                      <span className="text-slate-400">→</span>
                      <span className={`font-black ${t.textMain}`}>{row.res}</span>
                    </div>
                    {revealed[key] && <div className="text-xs text-emerald-600 font-bold">{row.uz}</div>}
                  </div>
                );
              })}

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setDoneSec(p => ({ ...p, struct: !p.struct }))}
                  className={`px-3 py-1 rounded-lg border text-[11px] font-bold ${
                    doneSec.struct ? 'bg-emerald-500 text-white border-emerald-600' : 'border-slate-300 text-slate-400'
                  }`}
                >
                  {doneSec.struct ? '✓ 완료' : '☐ 완료'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3-BLOK (BINAFSHA) */}
        <div className={`rounded-3xl ${isDark ? 'bg-indigo-950/40 border-indigo-800' : 'bg-[#f3f0fa] border-[#e0d7f5]'} border overflow-hidden`}>
          <button
            onClick={() => setOpenSec(p => ({ ...p, words: !p.words }))}
            className="w-full p-4 flex items-center justify-between text-left"
          >
            <span className={`font-black text-sm ${t.textMain}`}>오늘의 핵심 단어</span>
            {openSec.words ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
          </button>

          {openSec.words && (
            <div className={`${isDark ? 'bg-[#141a29]' : 'bg-white'} p-4 space-y-2`}>
              {activeLesson.words.map((w, wi) => {
                const key = `w-${wi}`;
                return (
                  <div
                    key={key}
                    onClick={() => toggleItem(key, w.ko)}
                    className="py-1.5 border-b border-slate-200/30 last:border-none cursor-pointer flex justify-between items-center"
                  >
                    <div>
                      <div className={`text-sm font-black ${t.textMain}`}>{w.ko}</div>
                      <div className="text-[11px] text-slate-400 font-bold">
                        {revealed[key] ? w.uz : '누르면 발음 & 번역'}
                      </div>
                    </div>
                    <Volume2 size={15} className="text-indigo-400" />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* TEST */}
        {currentQ && (
          <div className={`rounded-3xl ${t.card} border p-4 space-y-3`}>
            <div className="flex items-center justify-between text-xs font-black">
              <span className="text-rose-500 flex items-center gap-1">
                <Shuffle size={13} /> 퀴즈 ({qIdx + 1} / {quizList.length})
              </span>
              <button onClick={() => startLesson(activeLesson)} className="text-[11px] text-indigo-500 underline">
                Savollarni almashtirish
              </button>
            </div>

            <div className={`text-sm font-black ${t.textMain}`}>{currentQ.q}</div>

            <div className="space-y-2">
              {currentQ.opts.map(opt => (
                <button
                  key={opt}
                  disabled={qAnswer !== null}
                  onClick={() => {
                    setQAnswer(opt);
                    speakKo(opt);
                  }}
                  className={`w-full p-3 rounded-2xl text-left border text-xs font-bold transition ${
                    qAnswer !== null
                      ? opt === currentQ.ans
                        ? 'bg-emerald-500 text-white border-emerald-600'
                        : qAnswer === opt
                          ? 'bg-rose-500 text-white border-rose-600'
                          : `${t.sub} opacity-50`
                      : `${t.sub} ${t.textMain} hover:border-rose-300`
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {qAnswer && (
              <div className={`p-3 rounded-2xl text-xs ${qAnswer === currentQ.ans ? 'bg-emerald-500/15 text-emerald-600' : 'bg-rose-500/15 text-rose-500'}`}>
                <div className="font-black">{qAnswer === currentQ.ans ? '정답이에요! 🎉' : `오답! 정답: ${currentQ.ans}`}</div>
                <div className="mt-0.5">{currentQ.exp}</div>
              </div>
            )}

            {qAnswer && (
              <button
                onClick={() => {
                  if (qIdx + 1 < quizList.length) {
                    setQIdx(qIdx + 1);
                    setQAnswer(null);
                  } else {
                    setCompletedIds(p => [...new Set([...p, activeLesson.id])]);
                    setProfile(p => ({ ...p, xp: p.xp + 50 }));
                    setScreen('home');
                  }
                }}
                className="w-full py-3 rounded-2xl bg-[#1e1e1e] text-white font-black text-xs"
              >
                {qIdx + 1 < quizList.length ? '다음 문제 →' : '학습 완료 (+50 XP)'}
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  // =========================================================================
  // 4. AI USTOZ
  // =========================================================================
  const renderAiTutor = () => (
    <div className="flex flex-col h-[80vh] pb-20 pt-2">
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow">
            <Bot size={22} />
          </div>
          <div>
            <h2 className={`font-black text-sm ${t.textMain}`}>AI 한국어 튜터 (AI Ustoz)</h2>
            <span className="text-[10px] font-bold text-emerald-500">● Online • Bosib talaffuzini eshiting</span>
          </div>
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-2.5 no-scrollbar">
        {['이에요 / 예요 farqi?', '-아서/어서 vs -(으)니까?', '-다고 하다 bilvosita nutq'].map(chip => (
          <button
            key={chip}
            onClick={() => handleAiSend(chip)}
            className={`shrink-0 px-3 py-1.5 rounded-full ${t.card} border text-[11px] font-bold text-rose-500`}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className={`flex-1 overflow-y-auto rounded-3xl ${t.card} border p-4 space-y-3`}>
        {aiMessages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              onClick={() => m.role === 'ai' && speakKo(m.ko)}
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs space-y-1 cursor-pointer ${
                m.role === 'user'
                  ? 'bg-rose-500 text-white font-bold'
                  : `${t.sub} ${t.textMain}`
              }`}
            >
              <div className="font-black leading-relaxed">{m.ko}</div>
              {m.uz && <div className="text-[11px] opacity-80">{m.uz}</div>}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 flex gap-2">
        <input
          type="text"
          value={aiInput}
          onChange={e => setAiInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAiSend()}
          placeholder="Savol bering yoki koreyscha yozing..."
          className={`flex-1 ${t.card} border rounded-2xl px-4 py-3 text-xs font-bold outline-none`}
        />
        <button
          onClick={() => handleAiSend()}
          className="px-4 rounded-2xl bg-rose-500 text-white font-black flex items-center justify-center"
        >
          <Send size={17} />
        </button>
      </div>
    </div>
  );

  // =========================================================================
  // 5. TAKRORLASH (FLASHCARDS)
  // =========================================================================
  const renderReview = () => {
    const card = allWords[flashIdx % allWords.length];
    return (
      <div className="space-y-4 pb-24 pt-2">
        <div className="flex items-center justify-between">
          <h2 className={`text-lg font-black ${t.textMain}`}>복습 • So‘zlarni Takrorlash</h2>
          <span className="text-xs font-bold text-slate-400">{(flashIdx % allWords.length) + 1} / {allWords.length}</span>
        </div>

        <div
          onClick={() => { setFlashFlipped(!flashFlipped); speakKo(card.ko); }}
          className={`rounded-3xl ${t.card} border-2 p-8 min-h-[250px] flex flex-col items-center justify-center text-center cursor-pointer space-y-3`}
        >
          <span className="text-[10px] font-black uppercase text-rose-500">
            {flashFlipped ? 'Tarjimasi' : 'Talaffuz va tarjima uchun bosing'}
          </span>
          {!flashFlipped ? (
            <>
              <div className={`text-4xl font-black ${t.textMain}`}>{card.ko}</div>
              <Volume2 size={24} className="text-emerald-500" />
            </>
          ) : (
            <div className="text-2xl font-black text-emerald-500">{card.uz}</div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => { setFlashFlipped(false); setFlashIdx(Math.floor(Math.random() * allWords.length)); }}
            className={`py-3.5 rounded-2xl ${t.card} border font-black text-xs flex items-center justify-center gap-1.5`}
          >
            <Shuffle size={15} /> Tasodifiy so‘z
          </button>
          <button
            onClick={() => { setFlashFlipped(false); setFlashIdx(i => i + 1); setProfile(p => ({ ...p, xp: p.xp + 5 })); }}
            className="py-3.5 rounded-2xl bg-emerald-500 text-white font-black text-xs"
          >
            Yodladim (+5 XP) →
          </button>
        </div>
      </div>
    );
  };

  // =========================================================================
  // 6. PROFIL
  // =========================================================================
  const renderProfile = () => (
    <div className="space-y-4 pb-24 pt-2">
      <div className={`rounded-3xl ${t.card} border p-5 flex items-center justify-between`}>
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-rose-500 text-white font-black text-xl flex items-center justify-center">
            {profile.name.charAt(0)}
          </div>
          <div>
            {editingName ? (
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={nameDraft}
                  onChange={e => setNameDraft(e.target.value)}
                  className={`${t.sub} border rounded-xl px-2.5 py-1 text-xs font-bold`}
                />
                <button
                  onClick={() => { setProfile(p => ({ ...p, name: nameDraft || 'Tokhirbek' })); setEditingName(false); }}
                  className="px-2.5 py-1 rounded-xl bg-emerald-500 text-white text-xs font-bold"
                >
                  OK
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className={`font-black text-base ${t.textMain}`}>{profile.name}</h2>
                <button onClick={() => setEditingName(true)} className="text-slate-400"><Edit3 size={13} /></button>
              </div>
            )}
            <p className="text-xs text-slate-400 mt-0.5">한글 스튜디오 • 서울대 1A–6B</p>
          </div>
        </div>
        <button onClick={toggleDark} className={`p-2.5 rounded-2xl ${t.sub} border`}>
          {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-700" />}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        <div className={`rounded-2xl ${t.card} border p-3.5 text-center`}>
          <Flame size={20} className="mx-auto text-amber-500 fill-amber-500" />
          <div className={`text-lg font-black mt-1 ${t.textMain}`}>{profile.streak}</div>
          <div className="text-[10px] text-slate-400 font-bold">Kunlik Streak</div>
        </div>
        <div className={`rounded-2xl ${t.card} border p-3.5 text-center`}>
          <Zap size={20} className="mx-auto text-sky-500 fill-sky-500" />
          <div className={`text-lg font-black mt-1 ${t.textMain}`}>{profile.xp}</div>
          <div className="text-[10px] text-slate-400 font-bold">Jami XP</div>
        </div>
        <div className={`rounded-2xl ${t.card} border p-3.5 text-center`}>
          <CheckCircle2 size={20} className="mx-auto text-emerald-500" />
          <div className={`text-lg font-black mt-1 ${t.textMain}`}>{completedIds.length} / {allLessons.length}</div>
          <div className="text-[10px] text-slate-400 font-bold">Darslar</div>
        </div>
      </div>

      <div className={`rounded-3xl ${t.card} border p-4 flex items-center justify-between`}>
        <div>
          <div className={`text-xs font-black ${t.textMain}`}>Ilova Mavzusi (Tema)</div>
          <div className="text-[11px] text-slate-400">{isDark ? 'Tungi rejim (Dark Mode)' : 'Yorug‘ Pastel (Soft Studio)'}</div>
        </div>
        <button
          onClick={toggleDark}
          className="px-4 py-2 rounded-xl bg-rose-500 text-white font-black text-xs"
        >
          Almashtirish
        </button>
      </div>
    </div>
  );

  // =========================================================================
  // ASOSIY SHELL + PASTKI 5 TA MENYU
  // =========================================================================
  return (
    <div className={`min-h-screen w-full ${t.bg} font-sans select-none transition-colors`}>
      <main className="max-w-md mx-auto px-4 py-2">
        {screen === 'home' && renderHome()}
        {screen === 'builder' && renderBuilder()}
        {screen === 'lesson' && renderLesson()}
        {screen === 'ai' && renderAiTutor()}
        {screen === 'review' && renderReview()}
        {screen === 'profile' && renderProfile()}
      </main>

      <nav className={`fixed bottom-0 inset-x-0 z-40 ${t.nav} px-2 py-2 backdrop-blur-xl`}>
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button
            onClick={() => setScreen('home')}
            className={`flex flex-col items-center ${screen === 'home' || screen === 'lesson' ? 'text-rose-500' : t.textMuted}`}
          >
            <BookOpen size={21} />
            <span className="text-[10px] font-black mt-1">학습 • Darslar</span>
          </button>

          <button
            onClick={() => setScreen('builder')}
            className={`flex flex-col items-center ${screen === 'builder' ? 'text-emerald-600' : t.textMuted}`}
          >
            <Sparkles size={21} />
            <span className="text-[10px] font-black mt-1">조립 • Harflar</span>
          </button>

          <button
            onClick={() => setScreen('ai')}
            className="-mt-6 w-13 h-13 rounded-full bg-rose-500 border-b-4 border-rose-700 text-white flex items-center justify-center shadow-lg active:translate-y-0.5"
          >
            <Bot size={25} />
          </button>

          <button
            onClick={() => setScreen('review')}
            className={`flex flex-col items-center ${screen === 'review' ? 'text-amber-500' : t.textMuted}`}
          >
            <RotateCcw size={21} />
            <span className="text-[10px] font-black mt-1">복습 • Mashq</span>
          </button>

          <button
            onClick={() => setScreen('profile')}
            className={`flex flex-col items-center ${screen === 'profile' ? 'text-indigo-500' : t.textMuted}`}
          >
            <User size={21} />
            <span className="text-[10px] font-black mt-1">프로필 • Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
