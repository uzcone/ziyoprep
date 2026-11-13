import React, { useState, useEffect } from 'react';
import { 
  Volume2, ArrowLeft, Globe, Lock, CheckCircle2, 
  ChevronUp, ChevronDown, Edit3, Shuffle, Play, 
  BookOpen, Sparkles, Bot, RotateCcw, User, 
  Flame, Zap, Heart, Send, Sun, Moon, Trophy, Award
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
  // --- ASOSIY HOLATLAR ---
  const [screen, setScreen] = useState('home'); // 'home' | 'builder' | 'lesson' | 'ai' | 'review' | 'profile'
  const [uiLang, setUiLang] = useState('uz'); // 'uz' | 'ko'
  const [isDark, setIsDark] = useState(() => localStorage.getItem('hs_dark') === 'true');
  const [selectedBookCode, setSelectedBookCode] = useState('1A');
  const [activeLesson, setActiveLesson] = useState(null);
  const [isUnlockedAll, setIsUnlockedAll] = useState(() => localStorage.getItem('hs_unlocked') === 'true');

  // Foydalanuvchi Profili va Gamification
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

  useEffect(() => {
    localStorage.setItem('hs_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('hs_completed', JSON.stringify(completedIds));
  }, [completedIds]);

  useEffect(() => {
    localStorage.setItem('hs_memos', JSON.stringify(memos));
  }, [memos]);

  const toggleDark = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem('hs_dark', String(next));
      return next;
    });
  };

  // Koreyscha Native Audio
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

  // --- AI USTOZ HOLATLARI ---
  const [aiMessages, setAiMessages] = useState([
    {
      role: 'ai',
      ko: '안녕하세요! 저는 한글 스튜디오 AI 튜터예요.',
      uz: 'Salom! Men Hangul Studio AI ustozingizman. Qaysi grammatika yoki mavzuni birga mashq qilamiz?'
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
        ko: '아주 잘했어요! 한국어 문장을 자연스럽게 만드셨네요.',
        uz: "Juda yaxshi! Koreyscha gapni tabiiy tuzdingiz. Yana misol: '저는 매일 한국어를 공부해요' (Men har kuni koreys tilini o‘rganaman)."
      };

      if (text.includes('예요') || text.includes('이에요')) {
        reply = {
          ko: '받침이 있으면 "이에요" (학생이에요), 없으면 "예요" (가수예요)를 써요!',
          uz: "Qoida: Undosh (받침) bilan tugasa '이에요' (학생이에요), unli bilan tugasa '예요' (가수예요) ishlatiladi!"
        };
      } else if (text.includes('을') || text.includes('를')) {
        reply = {
          ko: '받침이 있으면 "을" (음악을), 없으면 "를" (노래를) 사용해요.',
          uz: "Tushum kelishigi: Undoshdan keyin '을' (음악을), unlidan keyin '를' (노래를) qo‘yiladi."
        };
      } else if (text.includes('Kafe') || text.includes('카페')) {
        reply = {
          ko: '카페에서: "아이스 아메리카노 한 잔 주세요."',
          uz: "Kafeda buyurtma: 'Bitta muzli amerikano bering.' Javob: '네, 알겠습니다. 영수증 드릴까요?' (Xo‘p, chek beraymi?)"
        };
      }

      setAiMessages(prev => [...prev, { role: 'ai', ...reply }]);
      speakKo(reply.ko);
    }, 350);
  };

  // --- TAKRORLASH (FLASHCARDS) HOLATLARI ---
  const [flashIdx, setFlashIdx] = useState(0);
  const [flashFlipped, setFlashFlipped] = useState(false);

  // --- 글자 조립 (BO'G'IN YIG'ISH) HOLATLARI ---
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

  // --- 서울대 한국어 1A ~ 6B & 1–12 HAFTALIK DARSLAR BAZASI ---
  const snuBooks = [
    {
      code: '1A',
      label: '서울대 한국어 1A',
      range: '1–12주차 · Boshlang‘ich 1',
      lessons: [
        {
          id: '1a-1', num: 1, week: '1주차 · DAY 1', emoji: '👋', title: '나를 소개해요',
          heroKo: '저는 학생이에요', heroUz: 'Men talabaman',
          pinkTitle: '저는 ~예요 / 이에요', pinkSub: 'Odam yoki narsaning kim/nimaligini aytish',
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
                { ko: '저는 중학생이에요.', uz: 'Men o‘rta maktab o‘quvchisiman.' },
                { ko: '이건 선물이에요.', uz: 'Bu sovg‘a.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '저는 + 명사 + 예요 / 이에요',
          greenRows: [
            { parts: ['저는', '학생', '이에요'], res: '저는 학생이에요.', uz: 'Men talabaman.' },
            { parts: ['저는', '중학생', '이에요'], res: '저는 중학생이에요.', uz: 'Men o‘rta maktab o‘quvchisiman.' }
          ],
          words: [
            { ko: '저', uz: 'Men' },
            { ko: '학생', uz: 'Talaba / O‘quvchi' },
            { ko: '가수', uz: 'Qo‘shiqchi' },
            { ko: '선물', uz: 'Sovg‘a' }
          ],
          quizzes: [
            { q: "‘저는 학생___’ — to‘g‘ri qo‘shimchani tanlang:", opts: ['이에요', '예요', '을', '를'], ans: '이에요', exp: "‘학생’ undosh (ㅇ) bilan tugagani uchun ‘이에요’ qo‘shiladi." },
            { q: "‘저는 가수___’ — to‘g‘ri qo‘shimchani tanlang:", opts: ['예요', '이에요', '에', '에서'], ans: '예요', exp: "‘가수’ unli (ㅜ) bilan tugagani uchun ‘예요’ qo‘shiladi." },
            { q: "‘이건 선물이에요’ nima degani?", opts: ['Bu sovg‘a', 'Bu kamera', 'Men talabaman', 'Bu kitob'], ans: 'Bu sovg‘a', exp: "‘선물’ — sovg‘a." }
          ]
        },
        {
          id: '1a-2', num: 2, week: '1주차 · DAY 2', emoji: '📍', title: '오늘 뭐 해요?',
          heroKo: '저는 K-POP을 좋아해요', heroUz: 'Men K-POP ni yaxshi ko‘raman',
          pinkTitle: '저는 ~을/를 좋아해요', pinkSub: 'Yoqtirgan narsa yoki mashg‘ulotni bildirish',
          pinkGroups: [
            {
              cond: 'Yoqtirgan narsangizni aytish',
              items: [
                { ko: '저는 K-POP을 좋아해요.', uz: 'Men K-POP ni yaxshi ko‘raman.' },
                { ko: '저는 음악을 좋아해요.', uz: 'Men musiqani yaxshi ko‘raman.' },
                { ko: '저는 그림을 좋아해요.', uz: 'Men rasm chizishni yaxshi ko‘raman.' },
                { ko: '저는 노래를 좋아해요.', uz: 'Men qo‘shiqni yaxshi ko‘raman.' }
              ]
            }
          ],
          greenTitle: '을 / 를', greenFormula: 'Final consonant → 을  |  No final consonant → 를',
          greenRows: [
            { parts: ['음악', '을'], res: '음악을', uz: 'musiqani (undosh + 을)' },
            { parts: ['노래', '를'], res: '노래를', uz: 'qo‘shiqni (unli + 를)' }
          ],
          words: [
            { ko: '음악', uz: 'Musiqa' },
            { ko: '그림', uz: 'Rasm' },
            { ko: '노래', uz: 'Qo‘shiq' },
            { ko: '가수', uz: 'Qo‘shiqchi' }
          ],
          quizzes: [
            { q: "‘음악___ 좋아해요’ — bo‘sh joyga nima qo‘yiladi?", opts: ['을', '를', '이에요', '예요'], ans: '을', exp: "‘음악’ undosh bilan tugagan: 음악을." },
            { q: "‘노래___ 좋아해요’ — bo‘sh joyga nima qo‘yiladi?", opts: ['를', '을', '은', '이'], ans: '를', exp: "‘노래’ unli bilan tugagan: 노래를." }
          ]
        },
        {
          id: '1a-3', num: 3, week: '2주차 · DAY 3', emoji: '⏰', title: '언제 해요?',
          heroKo: '아침 8시에 학교에 가요', heroUz: 'Ertalab soat 8 da maktabga boraman',
          pinkTitle: '시간 + 에 / 장소 + 에 가요', pinkSub: 'Aniq vaqt va yo‘nalishni aytish',
          pinkGroups: [
            {
              cond: 'Vaqt va joy nomidan keyin → 에',
              items: [
                { ko: '아침 8시에 일어나요.', uz: 'Ertalab soat 8 da uyg‘onaman.' },
                { ko: '주말에 도서관에 가요.', uz: 'Dam olish kuni kutubxonaga boraman.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '시간 + 에 + 장소 + 에 가요',
          greenRows: [
            { parts: ['아침 8시에', '학교에', '가요'], res: '아침 8시에 학교에 가요.', uz: 'Ertalab soat 8 da maktabga boraman.' }
          ],
          words: [
            { ko: '아침', uz: 'Ertalab' },
            { ko: '학교', uz: 'Maktab / Universitet' },
            { ko: '도서관', uz: 'Kutubxona' },
            { ko: '주말', uz: 'Dam olish kunlari' }
          ],
          quizzes: [
            { q: "‘Soat 8 da’ iborasi koreys tilida qanday?", opts: ['8시에', '8시을', '8시에서', '8시예요'], ans: '8시에', exp: "Vaqt birligiga ‘-에’ qo‘shiladi." }
          ]
        },
        {
          id: '1a-4', num: 4, week: '2주차 · DAY 4', emoji: '🍜', title: '뭐 하고 싶어요?',
          heroKo: '한국 음식을 먹고 싶어요', heroUz: 'Koreys taomini yemoqchiman',
          pinkTitle: '동사 + 고 싶어요', pinkSub: 'Istak va xohishni bildirish',
          pinkGroups: [
            {
              cond: 'Fe’l o‘zagiga → 고 싶어요 (-moqchiman)',
              items: [
                { ko: '서울에 가고 싶어요.', uz: 'Seulga bormoqchiman.' },
                { ko: '비빔밥을 먹고 싶어요.', uz: 'Bibimbap yemoqchiman.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '명사 + 을/를 + 동사 + 고 싶어요',
          greenRows: [
            { parts: ['한국 음식을', '먹', '고 싶어요'], res: '한국 음식을 먹고 싶어요.', uz: 'Koreys taomini yemoqchiman.' }
          ],
          words: [
            { ko: '음식', uz: 'Taom' },
            { ko: '먹다', uz: 'Yemoq' },
            { ko: '가다', uz: 'Bormoq' },
            { ko: '보다', uz: 'Ko‘rmoq' }
          ],
          quizzes: [
            { q: "‘Seulga bormoqchiman’ qaysi gap?", opts: ['서울에 가고 싶어요', '서울에 갔어요', '서울에 가세요', '서울에 가지만'], ans: '서울에 가고 싶어요', exp: "Xohish uchun ‘-고 싶어요’ ishlatiladi." }
          ]
        },
        {
          id: '1a-5', num: 5, week: '3주차 · DAY 5', emoji: '🎬', title: '어제 뭐 했어요?',
          heroKo: '어제 친구하고 영화를 봤어요', heroUz: 'Kecha do‘stim bilan kino ko‘rdim',
          pinkTitle: '동사 + 았어요 / 었어요', pinkSub: 'O‘tgan zamonni ifodalash',
          pinkGroups: [
            {
              cond: 'ㅏ/ㅗ → 았어요  |  Boshqa unlilar → 었어요',
              items: [
                { ko: '어제 영화를 봤어요.', uz: 'Kecha kino ko‘rdim.' },
                { ko: '도서관에서 책을 읽었어요.', uz: 'Kutubxonada kitob o‘qidim.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '어제 + 무엇을 + 봤어요 / 했어요',
          greenRows: [
            { parts: ['어제', '영화를', '봤어요'], res: '어제 영화를 봤어요.', uz: 'Kecha kino ko‘rdim.' }
          ],
          words: [
            { ko: '어제', uz: 'Kecha' },
            { ko: '영화', uz: 'Kino' },
            { ko: '친구', uz: 'Do‘st' },
            { ko: '책', uz: 'Kitob' }
          ],
          quizzes: [
            { q: "‘읽다’ (o‘qimoq) fe’lining o‘tgan zamoni:", opts: ['읽었어요', '읽았어요', '읽해요', '읽을 거예요'], ans: '읽었어요', exp: "‘ㅣ’ unlisidan keyin ‘-었어요’ keladi." }
          ]
        },
        {
          id: '1a-6', num: 6, week: '3주차 · DAY 6', emoji: '🌤️', title: '어때요?',
          heroKo: '한국어가 어렵지만 재미있어요', heroUz: 'Koreys tili qiyin, lekin qiziqarli',
          pinkTitle: '형용사 + 지만', pinkSub: 'Qarama-qarshi sifatlarni bog‘lash',
          pinkGroups: [
            {
              cond: 'Sifat o‘zagiga → 지만 (-lekin)',
              items: [
                { ko: '한국어가 어렵지만 재미있어요.', uz: 'Koreys tili qiyin, lekin qiziqarli.' },
                { ko: '음식이 비싸지만 맛있어요.', uz: 'Ovqat qimmat, lekin mazali.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: 'A-지만 + B',
          greenRows: [
            { parts: ['어렵지만', '재미있어요'], res: '어렵지만 재미있어요.', uz: 'Qiyin, lekin qiziqarli.' }
          ],
          words: [
            { ko: '어렵다', uz: 'Qiyin' },
            { ko: '재미있다', uz: 'Qiziqarli' },
            { ko: '비싸다', uz: 'Qimmat' },
            { ko: '맛있다', uz: 'Mazali' }
          ],
          quizzes: [
            { q: "‘Qimmat, lekin mazali’ — to‘g‘ri javob:", opts: ['비싸지만 맛있어요', '비싸서 맛있어요', '비싸고 맛있어요', '비싸면 맛있어요'], ans: '비싸지만 맛있어요', exp: "Zidlov bog‘lovchisi ‘-지만’." }
          ]
        }
      ]
    },
    {
      code: '1B',
      label: '서울대 한국어 1B',
      range: '1–12주차 · Boshlang‘ich 2',
      lessons: [
        {
          id: '1b-1', num: 7, week: '4주차 · DAY 7', emoji: '💪', title: '할 수 있어요?',
          heroKo: '저는 한국 신문을 읽을 수 있어요', heroUz: 'Men koreys gazetasini o‘qiy olaman',
          pinkTitle: '동사 + (으)ㄹ 수 있어요 / 없어요', pinkSub: 'Qobiliyat va imkoniyat',
          pinkGroups: [
            {
              cond: '받침 X → ㄹ 수 있어요 | 받침 O → 을 수 있어요',
              items: [
                { ko: '한국어로 말할 수 있어요.', uz: 'Koreys tilida gapira olaman.' },
                { ko: '한국 음식을 만들 수 있어요.', uz: 'Koreys taomini tayyorlay olaman.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: 'V + (으)ㄹ 수 있어요',
          greenRows: [
            { parts: ['한국어를', '말할 수', '있어요'], res: '한국어를 말할 수 있어요.', uz: 'Koreys tilida gapira olaman.' }
          ],
          words: [
            { ko: '신문', uz: 'Gazeta' },
            { ko: '말하다', uz: 'Gapirmoq' },
            { ko: '만들다', uz: 'Tayyorlamoq' },
            { ko: '운전하다', uz: 'Haydamoq' }
          ],
          quizzes: [
            { q: "‘Gapira olaman’ iborasi qaysi?", opts: ['말할 수 있어요', '말한 적이 있어요', '말하려고 해요', '말하면 안 돼요'], ans: '말할 수 있어요', exp: "Qobiliyat: ‘-(으)ㄹ 수 있어요’." }
          ]
        },
        {
          id: '1b-2', num: 8, week: '4주차 · DAY 8', emoji: '🧳', title: '해 본 적 있어요?',
          heroKo: '제주도에 가 본 적이 있어요', heroUz: 'Jeju oroliga borib ko‘rganman',
          pinkTitle: '동사 + (으)ㄴ 적이 있어요', pinkSub: 'O‘tmishdagi tajriba',
          pinkGroups: [
            {
              cond: 'Tajribani aytish → (으)ㄴ 적이 있어요',
              items: [
                { ko: '제주도에 가 본 적이 있어요.', uz: 'Jeju oroliga borib ko‘rganman.' },
                { ko: '김치를 만들어 본 적이 있어요.', uz: 'Kimchi tayyorlab ko‘rganman.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: '장소 + 에 + 가 본 적이 있어요',
          greenRows: [
            { parts: ['제주도에', '가 본 적이', '있어요'], res: '제주도에 가 본 적이 있어요.', uz: 'Jeju oroliga borib ko‘rganman.' }
          ],
          words: [
            { ko: '경험', uz: 'Tajriba' },
            { ko: '여행', uz: 'Sayohat' },
            { ko: '한복', uz: 'Milliy libos' },
            { ko: '사진', uz: 'Rasm' }
          ],
          quizzes: [
            { q: "‘Borib ko‘rganman’ — to‘g‘ri shakl:", opts: ['가 본 적이 있어요', '갈 거예요', '가고 싶어요', '가야 돼요'], ans: '가 본 적이 있어요', exp: "Tajriba: ‘-(으)ㄴ 적이 있다’." }
          ]
        }
      ]
    },
    {
      code: '2A',
      label: '서울대 한국어 2A',
      range: '1–12주차 · O‘rta-boshlang‘ich 1',
      lessons: [
        {
          id: '2a-1', num: 9, week: '6주차 · DAY 9', emoji: '☔', title: '왜 좋아요? (-아서/어서)',
          heroKo: '비가 와서 집에 있었어요', heroUz: 'Yomg‘ir yog‘gani uchun uyda bo‘ldim',
          pinkTitle: 'A/V + 아서 / 어서', pinkSub: 'Sabab va natijani bog‘lash',
          pinkGroups: [
            {
              cond: 'Sabab (-gani uchun) → 아서 / 어서',
              items: [
                { ko: '배가 아파서 병원에 갔어요.', uz: 'Qornim og‘rigani uchun kasalxonaga bordim.' },
                { ko: '늦어서 정말 죄송해요.', uz: 'Kech qolganim uchun uzr so‘rayman.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: 'Sabab (-아서/어서) + Natija',
          greenRows: [
            { parts: ['비가 와서', '집에', '있었어요'], res: '비가 와서 집에 있었어요.', uz: 'Yomg‘ir yog‘gani uchun uyda bo‘ldim.' }
          ],
          words: [
            { ko: '병원', uz: 'Kasalxona' },
            { ko: '죄송하다', uz: 'Uzr so‘ramoq' },
            { ko: '피곤하다', uz: 'Charchamoq' },
            { ko: '바쁘다', uz: 'Band bo‘lmoq' }
          ],
          quizzes: [
            { q: "Qaysi gap grammatik jihatdan TO‘G‘RI?", opts: ['늦어서 죄송해요', '늦었어서 죄송해요', '늦어서 빨리 오세요', '늦어서 갑시다'], ans: '늦어서 죄송해요', exp: "‘-아서/어서’ oldidan o‘tgan zamon kelmaydi." }
          ]
        }
      ]
    },
    {
      code: '2B',
      label: '서울대 한국어 2B',
      range: '1–12주차 · O‘rta-boshlang‘ich 2',
      lessons: [
        {
          id: '2b-1', num: 10, week: '7주차 · DAY 10', emoji: '🆘', title: '도와주세요! (-(으)니까)',
          heroKo: '날씨가 추우니까 따뜻한 옷을 입으세요', heroUz: 'Havo sovuq bo‘lgani uchun issiq kiyim kiying',
          pinkTitle: 'A/V + (으)니까', pinkSub: 'Buyruq va taklif bilan keluvchi sabab',
          pinkGroups: [
            {
              cond: 'Aniq sabab (-gani sababli) → (으)니까',
              items: [
                { ko: '날씨가 추우니까 따뜻한 옷을 입으세요.', uz: 'Havo sovuq bo‘lgani uchun issiq kiyim kiying.' },
                { ko: '시간이 없으니까 택시를 탑시다.', uz: 'Vaqt yo‘qligi sababli taksiga chiqaylik.' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: 'Sabab (-(으)니까) + Buyruq (-(으)세요)',
          greenRows: [
            { parts: ['추우니까', '따뜻한 옷을', '입으세요'], res: '추우니까 따뜻한 옷을 입으세요.', uz: 'Sovuq bo‘lgani uchun issiq kiyim kiying.' }
          ],
          words: [
            { ko: '도와주다', uz: 'Yordam bermoq' },
            { ko: '따뜻하다', uz: 'Issiq / Iliq' },
            { ko: '택시', uz: 'Taksi' },
            { ko: '서두르다', uz: 'Shoshilmoq' }
          ],
          quizzes: [
            { q: "Buyruq gap bilan qaysi sabab qo‘shimchasi ishlaydi?", opts: ['추우니까', '추워서', '춥지만', '춥고'], ans: '추우니까', exp: "Buyruq va taklif gaplarda ‘-(으)니까’ ishlatiladi." }
          ]
        }
      ]
    },
    {
      code: '3A-6B',
      label: '서울대 한국어 3A ~ 6B',
      range: 'TOPIK 3–6 · O‘rta va Oliy Bosqich',
      lessons: [
        {
          id: '3a-6b-1', num: 11, week: '12주차 · MASTER', emoji: '🎓', title: '한국어로 하루를 살아봐요',
          heroKo: '남녀노소를 막론하고 유창하게 말할 수 있어요', heroUz: 'Yoshu qaridan qat’i nazar ravon gapira olamiz',
          pinkTitle: '-다고 하다 / -뿐만 아니라 / -을 막론하고', pinkSub: 'TOPIK 3–6 darajadagi oliy grammatika',
          pinkGroups: [
            {
              cond: 'O‘rta va Oliy daraja asosiy qoidalari',
              items: [
                { ko: '친구가 내일 서울에 온다고 했어요.', uz: 'Do‘stim ertaga Seulga kelaman deb aytdi. (3A)' },
                { ko: '한국어뿐만 아니라 영어도 유창해요.', uz: 'Nafaqat koreys, balki ingliz tilida ham ravon. (4A)' },
                { ko: '남녀노소를 막론하고 누구나 참여할 수 있다.', uz: 'Yoshu qaridan qat’i nazar hamma qatnasha oladi. (6A)' }
              ]
            }
          ],
          greenTitle: '문장 구조', greenFormula: 'N + 뿐만 아니라 / N + 을/를 막론하고',
          greenRows: [
            { parts: ['한국어뿐만 아니라', '영어도', '유창해요'], res: '한국어뿐만 아니라 영어도 유창해요.', uz: 'Nafaqat koreys, balki ingliz tilini ham mukammal biladi.' }
          ],
          words: [
            { ko: '유창하다', uz: 'Ravon (tilda)' },
            { ko: '막론하다', uz: 'Qat’i nazar' },
            { ko: '장학금', uz: 'Stipendiya' },
            { ko: '규명하다', uz: 'Isbotlamoq / Aniqlamoq' }
          ],
          quizzes: [
            { q: "‘Yoshu qaridan qat’i nazar’ — TOPIK 6 iborasi:", opts: ['남녀노소를 막론하고', '남녀노소 덕분에', '남녀노소 탓에', '남녀노소지만'], ans: '남녀노소를 막론하고', exp: "‘N을/를 막론하고’ — ...-dan qat’i nazar." }
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

  // --- SOFT PASTEL & DARK THEME ---
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

      {/* ▶ 1주차 이어서 공부하기 */}
      <button
        onClick={() => startLesson(nextLesson)}
        className={`w-full py-3.5 px-4 rounded-2xl ${t.card} border hover:border-rose-300 text-xs font-black flex items-center justify-center gap-2 active:scale-99 transition`}
      >
        <Play size={13} className="text-[#e11d48] fill-[#e11d48]" />
        <span>
          {uiLang === 'uz'
            ? `${nextLesson.week.split('·')[0].trim()} Davom etish (${nextLesson.title})`
            : `${nextLesson.week.split('·')[0].trim()} 이어서 공부하기`}
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
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[11px] font-black text-slate-400 tracking-wider uppercase shrink-0">서울대</span>
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
  // 2. "글자 조립" — 자음·모음으로 글자 만들기
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
  // 3. DARS EKRANI (PUSHTI, YASHIL, BINAFSHA BLOKLAR + TEST)
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
  // 4. AI USTOZ (AI 튜터)
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

      {/* Tezkor savollar */}
      <div className="flex gap-1.5 overflow-x-auto pb-2.5 no-scrollbar">
        {['이에요 / 예요 farqi?', '을 / 를 qoidasi?', '☕ 카페에서 buyurtma'].map(chip => (
          <button
            key={chip}
            onClick={() => handleAiSend(chip)}
            className={`shrink-0 px-3 py-1.5 rounded-full ${t.card} border text-[11px] font-bold text-rose-500`}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Xabarlar */}
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

      {/* Yozish maydoni */}
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
  // 5. TAKRORLASH (복습 - FLASHCARDS)
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
  // 6. PROFIL (프로필)
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

      {/* Statistika */}
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

      {/* Tema almashtirish kartasi */}
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

      {/* PASTKI 5 TA MENYU (Darslar • Harf yasash • AI Ustoz • Takrorlash • Profil) */}
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
