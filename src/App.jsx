import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Grid2X2,
  UserRound,
  Flame,
  Zap,
  Heart,
  Sun,
  Moon,
  ChevronRight,
  Check,
  X,
  Play,
  Volume2,
  Search,
  Trophy,
  Target,
  Clock3,
  RotateCcw,
  Headphones,
  BarChart3,
  Settings,
  Menu,
  Star,
  Sparkles,
  BookMarked,
  ArrowRight,
  Home,
} from "lucide-react";

/**
 * Curriculum levels mapping from SNU Korean 1A through 6B (TOPIK 1 to TOPIK 6)
 */
const LEVELS = [
  ["1A", "서울대 한국어 1A", "Boshlang‘ich 1 · TOPIK 1", "Tanishuv, kundalik hayot, joylashuv va sonlar", 4, 5],
  ["1B", "서울대 한국어 1B", "Boshlang‘ich 2 · TOPIK 1", "O‘tgan zamon, kelajak rejalari, buyruq va iltimos", 4, 4],
  ["2A", "서울대 한국어 2A", "O‘rta-boshlang‘ich 1 · TOPIK 2", "Sabab-natija, tajriba, qobiliyat va ruxsat", 4, 3],
  ["2B", "서울대 한국어 2B", "O‘rta-boshlang‘ich 2 · TOPIK 2", "Maqsad, shart, qiyoslash va holat o‘zgarishi", 3, 2],
  ["3A", "서울대 한국어 3A", "O‘rta 1 · TOPIK 3", "Bilvosita nutq, taxmin va kutilmagan natija", 3, 2],
  ["3B", "서울대 한국어 3B", "O‘rta 2 · TOPIK 3–4", "Afsuslanish, ma’lumot manbasi va qaror", 3, 2],
  ["4A", "서울대 한국어 4A", "Yuqori-o‘rta 1 · TOPIK 4", "Ijtimoiy mavzular, passiv fe’llar va qiyosiy tahlil", 3, 2],
  ["4B", "서울대 한국어 4B", "Yuqori-o‘rta 2 · TOPIK 4–5", "Madaniyat, texnologiya va sabab-oqibat", 2, 1],
  ["5A", "서울대 한국어 5A", "Oliy 1 · TOPIK 5", "Iqtisodiyot, OAV, jamiyat va rasmiy nutq", 2, 1],
  ["5B", "서울대 한국어 5B", "Oliy 2 · TOPIK 5", "Psixologiya, ekologiya, maqollar va idiomalar", 2, 1],
  ["6A", "서울대 한국어 6A", "Akademik oliy 1 · TOPIK 6", "Falsafa, ilmiy tadqiqotlar, siyosat va huquq", 2, 1],
  ["6B", "서울대 한국어 6B", "Akademik oliy 2 · TOPIK 6 Master", "Adabiyot, tarixiy tahlil, notiqlik va TOPIK 6 yakuniy", 2, 1],
].map(([id, title, sub, desc, grammar, tests], i) => ({
  id,
  title,
  sub,
  desc,
  grammar,
  tests,
  index: i,
}));

/**
 * Interactive Lessons dataset with multiple-choice questions, Korean visuals, and explanations
 */
const LESSONS = [
  {
    id: "hangul",
    level: "0",
    title: "Hangul: birinchi harflar",
    kind: "Alifbo",
    minutes: 8,
    xp: 20,
    questions: [
      {
        q: "Quyidagi harf qanday o‘qiladi?",
        visual: "ㄱ",
        opts: ["g/k", "n", "m", "s"],
        a: 0,
        why: "ㄱ so‘z boshida ko‘pincha g/k oralig‘ida talaffuz qilinadi.",
      },
      {
        q: "‘ㅏ’ qanday tovush?",
        visual: "ㅏ",
        opts: ["a", "eo", "o", "u"],
        a: 0,
        why: "ㅏ — a tovushi.",
      },
      {
        q: "‘나’ bo‘g‘ini qanday o‘qiladi?",
        visual: "나",
        opts: ["na", "ga", "da", "ma"],
        a: 0,
        why: "ㄴ + ㅏ = 나 (na).",
      },
    ],
  },
  {
    id: "hello",
    level: "1A",
    title: "Salomlashish",
    kind: "Vocabulary",
    minutes: 10,
    xp: 30,
    questions: [
      {
        q: "‘안녕하세요’ tarjimasini toping.",
        visual: "안녕하세요",
        opts: ["Salom / Assalomu alaykum", "Xayrli tun", "Rahmat", "Kechirasiz"],
        a: 0,
        why: "안녕하세요 — odobli salomlashish shakli.",
      },
      {
        q: "‘감사합니다’ nimani anglatadi?",
        visual: "감사합니다",
        opts: ["Rahmat", "Kechirasiz", "Salom", "Xayr"],
        a: 0,
        why: "감사합니다 — rahmat.",
      },
      {
        q: "Rasmiy salomlashishda qaysi shakl mos?",
        visual: "",
        opts: ["안녕하세요", "안녕", "잘 자", "응"],
        a: 0,
        why: "안녕하세요 odobli va keng qo‘llanadigan shakl.",
      },
    ],
  },
  {
    id: "intro",
    level: "1A",
    title: "O‘zimni tanishtiraman",
    kind: "Grammar",
    minutes: 12,
    xp: 35,
    questions: [
      {
        q: "‘저는 토히르벡___’ gapini to‘ldiring.",
        visual: "저는 토히르벡 ___",
        opts: ["입니다", "있어요", "가요", "먹어요"],
        a: 0,
        why: "입니다 — ‘...man’ ma’nosidagi rasmiy kopula.",
      },
      {
        q: "‘저는 학생입니다’ tarjimasi qaysi?",
        visual: "저는 학생입니다",
        opts: ["Men talabaman", "Men o‘qituvchiman", "Men uyga ketdim", "Men ovqat yeyman"],
        a: 0,
        why: "학생 — talaba, 입니다 — ...man.",
      },
      {
        q: "‘Men O‘zbekistondanman’ uchun to‘g‘ri variant?",
        visual: "",
        opts: [
          "저는 우즈베키스탄에서 왔어요",
          "저는 우즈베키스탄을 먹어요",
          "저는 우즈베키스탄이 예뻐요",
          "저는 우즈베키스탄에 있어요",
        ],
        a: 0,
        why: "에서 왔어요 — ...dan keldim.",
      },
    ],
  },
  {
    id: "numbers",
    level: "1A",
    title: "Koreyscha sonlar",
    kind: "Vocabulary",
    minutes: 9,
    xp: 25,
    questions: [
      {
        q: "하나 nechani bildiradi?",
        visual: "하나",
        opts: ["1", "2", "3", "4"],
        a: 0,
        why: "하나 — sof koreyscha bir.",
      },
      {
        q: "‘세 명’ nimani anglatadi?",
        visual: "세 명",
        opts: ["3 kishi", "2 kishi", "3 dona kitob", "4 kishi"],
        a: 0,
        why: "세 — uch, 명 — kishilarni sanash birligi.",
      },
      {
        q: "Native Korean 5 qaysi?",
        visual: "",
        opts: ["다섯", "넷", "여섯", "일곱"],
        a: 0,
        why: "다섯 — besh.",
      },
    ],
  },
  {
    id: "past",
    level: "1B",
    title: "O‘tgan zamon",
    kind: "Grammar",
    minutes: 12,
    xp: 35,
    questions: [
      {
        q: "가다 fe’lining o‘tgan zamon odobli shakli?",
        visual: "가다 → ?",
        opts: ["갔어요", "가요", "갈 거예요", "가세요"],
        a: 0,
        why: "가다 → 갔어요 (bordi).",
      },
      {
        q: "‘어제’ nimani anglatadi?",
        visual: "어제",
        opts: ["Kecha", "Bugun", "Ertaga", "Hozir"],
        a: 0,
        why: "어제 — kecha.",
      },
      {
        q: "‘Men kecha maktabga bordim’ qaysi?",
        visual: "",
        opts: ["어제 학교에 갔어요", "내일 학교에 가요", "학교가 커요", "학교에 있어요"],
        a: 0,
        why: "어제 + 갔어요 o‘tgan zamonni bildiradi.",
      },
    ],
  },
  {
    id: "reason",
    level: "2A",
    title: "Sabab: -아/어서",
    kind: "Grammar",
    minutes: 14,
    xp: 40,
    questions: [
      {
        q: "‘늦어서 죄송합니다’ ma’nosi?",
        visual: "늦어서 죄송합니다",
        opts: ["Kech qolganim uchun uzr", "Kech qolmang", "Juda xursandman", "Ertaga uchrashamiz"],
        a: 0,
        why: "-아/어서 sababni bildiradi.",
      },
      {
        q: "피곤하다 fe’lining sabab shakli?",
        visual: "피곤하다 → ?",
        opts: ["피곤해서", "피곤하고", "피곤하면", "피곤지만"],
        a: 0,
        why: "피곤하다 → 피곤해서.",
      },
      {
        q: "To‘g‘ri gapni tanlang.",
        visual: "",
        opts: [
          "비가 와서 집에 있어요",
          "비가 오지만 집에 있어요",
          "비가 오고 어제",
          "비가 오면 갔어요",
        ],
        a: 0,
        why: "Yomg‘ir yog‘ayotgani sababli uyda qolaman.",
      },
    ],
  },
  {
    id: "listening",
    level: "1A",
    title: "Kundalik iboralarni tinglash",
    kind: "Listening",
    minutes: 8,
    xp: 30,
    questions: [
      {
        q: "Audio mashq namunasi: ‘물 주세요’ nimani anglatadi?",
        visual: "물 주세요",
        opts: ["Suv bering, iltimos", "Suv ichdim", "Suv sovuq", "Suv yo‘q"],
        a: 0,
        why: "주세요 — iltimos, bering.",
      },
      {
        q: "‘얼마예요?’ qachon ishlatiladi?",
        visual: "얼마예요?",
        opts: ["Narxini so‘rashda", "Salomlashishda", "Uzr so‘rashda", "Xayrlashishda"],
        a: 0,
        why: "얼마예요? — Qancha turadi?",
      },
      {
        q: "‘화장실이 어디예요?’ tarjimasi?",
        visual: "화장실이 어디예요?",
        opts: ["Hojatxona qayerda?", "Bu nima?", "Qayerga borasiz?", "Soat necha?"],
        a: 0,
        why: "어디예요? — qayerda?",
      },
    ],
  },
];

const DEFAULT = {
  xp: 0,
  hearts: 5,
  streak: 1,
  completed: [],
  mistakes: [],
  words: [],
  minutes: 0,
  lastDay: new Date().toLocaleDateString("en-CA"),
  dailyGoal: 15,
  theme: "dark",
  name: "Tokhirbek",
};

const load = () => {
  try {
    return { ...DEFAULT, ...JSON.parse(localStorage.getItem("ziyo-premium") || "{}") };
  } catch {
    return DEFAULT;
  }
};

/**
 * Comprehensive styling for ZiyoPrep covering dark/light modes, glassmorphism,
 * responsive layouts, interactive lesson player, vocabulary builder, and toast notifications.
 */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .app {
    --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-kr: 'Noto Sans KR', sans-serif;

    --brand: #10b981;
    --brand-hover: #059669;
    --brand-soft: rgba(16, 185, 129, 0.14);
    --brand-glow: rgba(16, 185, 129, 0.35);

    --accent-indigo: #6366f1;
    --accent-purple: #8b5cf6;
    --accent-orange: #f97316;
    --accent-rose: #f43f5e;
    --accent-amber: #f59e0b;
    --accent-teal: #14b8a6;

    font-family: var(--font-sans);
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    transition: background-color 0.25s ease, color 0.25s ease;
    -webkit-font-smoothing: antialiased;
  }

  /* Dark Theme Tokens */
  .app.dark {
    --bg: #090d16;
    --bg-elevated: #111827;
    --bg-card: rgba(17, 24, 39, 0.78);
    --bg-card-solid: #131c2e;
    --bg-subtle: rgba(255, 255, 255, 0.04);
    --bg-hover: rgba(255, 255, 255, 0.08);
    --border: rgba(255, 255, 255, 0.08);
    --border-strong: rgba(255, 255, 255, 0.16);
    --text: #f8fafc;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;
    --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.25);
    --shadow-md: 0 12px 32px rgba(0, 0, 0, 0.38);
    --shadow-lg: 0 20px 48px rgba(0, 0, 0, 0.5);
    --topbar-bg: rgba(9, 13, 22, 0.82);
  }

  /* Light Theme Tokens */
  .app.light {
    --bg: #f1f5f9;
    --bg-elevated: #ffffff;
    --bg-card: rgba(255, 255, 255, 0.88);
    --bg-card-solid: #ffffff;
    --bg-subtle: rgba(15, 23, 42, 0.04);
    --bg-hover: rgba(15, 23, 42, 0.07);
    --border: rgba(15, 23, 42, 0.08);
    --border-strong: rgba(15, 23, 42, 0.15);
    --text: #0f172a;
    --text-secondary: #475569;
    --text-muted: #64748b;
    --shadow-sm: 0 2px 8px rgba(15, 23, 42, 0.05);
    --shadow-md: 0 10px 28px rgba(15, 23, 42, 0.08);
    --shadow-lg: 0 18px 40px rgba(15, 23, 42, 0.12);
    --topbar-bg: rgba(255, 255, 255, 0.85);
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
    color: inherit;
    transition: all 0.18s cubic-bezier(0.22, 1, 0.36, 1);
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Topbar */
  .topbar {
    position: sticky;
    top: 0;
    z-index: 40;
    height: 68px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--topbar-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 800;
    font-size: 1.2rem;
    letter-spacing: -0.02em;
  }

  .brandmark {
    width: 36px;
    height: 36px;
    border-radius: 11px;
    background: linear-gradient(135deg, #10b981, #059669);
    color: #fff;
    display: grid;
    place-items: center;
    font-family: var(--font-kr);
    font-size: 1.15rem;
    font-weight: 900;
    box-shadow: 0 6px 16px var(--brand-glow);
  }

  .brand small {
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    padding: 3px 7px;
    border-radius: 6px;
    background: var(--brand-soft);
    color: var(--brand);
  }

  .topstats {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .stat {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
  }

  .stat.fire { color: #f97316; }
  .stat.xp { color: #eab308; }
  .stat.hearts { color: #f43f5e; }

  .topactions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .iconbtn {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: grid;
    place-items: center;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    color: var(--text-secondary);
  }

  .iconbtn:hover {
    background: var(--bg-hover);
    color: var(--text);
    transform: translateY(-1px);
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
    font-weight: 800;
    font-size: 1rem;
    display: grid;
    place-items: center;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);
  }

  .avatar:hover {
    transform: translateY(-1px);
  }

  .mobile-toggle {
    display: none;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    place-items: center;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
  }

  /* Layout Shell */
  .shell {
    display: flex;
    max-width: 1400px;
    margin: 0 auto;
    min-height: calc(100vh - 68px);
  }

  /* Sidebar */
  .sidebar {
    width: 260px;
    flex-shrink: 0;
    padding: 24px 16px;
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 6px;
    position: sticky;
    top: 68px;
    height: calc(100vh - 68px);
  }

  .side-label {
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: var(--text-muted);
    padding: 0 14px 8px;
  }

  .navitem {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 14px;
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-align: left;
  }

  .navitem:hover {
    background: var(--bg-hover);
    color: var(--text);
  }

  .navitem.selected {
    background: var(--brand-soft);
    color: var(--brand);
    font-weight: 700;
  }

  .navcount {
    margin-left: auto;
    background: var(--accent-rose);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: 999px;
  }

  .side-card {
    margin-top: auto;
    padding: 16px;
    border-radius: 18px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .side-card-icon {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: var(--brand-soft);
    color: var(--brand);
    display: grid;
    place-items: center;
    margin-bottom: 4px;
  }

  .side-card b {
    font-size: 0.9rem;
  }

  .side-card p, .side-card small {
    font-size: 0.78rem;
    color: var(--text-secondary);
  }

  .sidebar-foot {
    padding: 12px 14px 0;
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  /* Progress Bars */
  .progress {
    width: 100%;
    height: 8px;
    border-radius: 999px;
    background: var(--bg-subtle);
    overflow: hidden;
    margin: 4px 0;
  }

  .progress.large {
    height: 12px;
    margin: 12px 0;
  }

  .progress i {
    display: block;
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, #10b981, #34d399);
    transition: width 0.4s ease;
  }

  /* Main Area */
  .main {
    flex: 1;
    padding: 28px 32px 80px;
    min-width: 0;
  }

  .page {
    max-width: 1040px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
    animation: fadeIn 0.28s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .eyebrow {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--brand);
    margin-bottom: 6px;
  }

  .eyebrow.light {
    color: rgba(255, 255, 255, 0.85);
  }

  /* Welcome Header */
  .welcome {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  .welcome h1 {
    font-size: 1.85rem;
    font-weight: 800;
    letter-spacing: -0.025em;
    margin-bottom: 4px;
  }

  .welcome p {
    color: var(--text-secondary);
    font-size: 0.95rem;
  }

  .level-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border-radius: 14px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--text-secondary);
    box-shadow: var(--shadow-sm);
  }

  .level-pill svg {
    color: #eab308;
  }

  .level-pill b {
    background: var(--brand-soft);
    color: var(--brand);
    padding: 2px 8px;
    border-radius: 6px;
  }

  /* Hero Grid */
  .hero-grid {
    display: grid;
    grid-template-columns: 1.55fr 1fr;
    gap: 20px;
  }

  .hero-card {
    position: relative;
    overflow: hidden;
    border-radius: 24px;
    padding: 28px;
    background: linear-gradient(135deg, #059669 0%, #10b981 55%, #0d9488 100%);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 16px 36px rgba(16, 185, 129, 0.28);
  }

  .hero-copy {
    position: relative;
    z-index: 2;
    max-width: 75%;
  }

  .hero-copy h2 {
    font-size: 1.55rem;
    font-weight: 800;
    margin-bottom: 8px;
    letter-spacing: -0.02em;
  }

  .hero-copy p {
    font-size: 0.92rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 20px;
  }

  .hero-korean {
    position: absolute;
    right: 20px;
    bottom: -14px;
    font-family: var(--font-kr);
    font-size: 7.5rem;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.14);
    pointer-events: none;
    user-select: none;
    line-height: 1;
  }

  .goal-card {
    border-radius: 24px;
    padding: 24px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .goal-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .goal-head h3 {
    font-size: 1.9rem;
    font-weight: 800;
  }

  .goal-head h3 small {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .goal-icon {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    background: var(--brand-soft);
    color: var(--brand);
    display: grid;
    place-items: center;
  }

  .goal-card p {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  /* Buttons */
  .primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 20px;
    border-radius: 14px;
    font-weight: 700;
    font-size: 0.92rem;
    background: #ffffff;
    color: #065f46;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.14);
  }

  .primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
  }

  .page .primary,
  .lesson-page .primary {
    background: linear-gradient(135deg, #10b981, #059669);
    color: #fff;
    box-shadow: 0 8px 20px var(--brand-glow);
  }

  .hero-card .primary {
    background: #ffffff;
    color: #065f46;
  }

  .primary.full {
    width: 100%;
    padding: 15px 24px;
    font-size: 1rem;
  }

  .secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 16px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.88rem;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    color: var(--text);
  }

  .secondary:hover {
    background: var(--bg-hover);
  }

  .textbtn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--brand);
  }

  .textbtn:hover {
    opacity: 0.8;
  }

  /* Section Headers */
  .section-head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: 6px;
  }

  .section-head h2 {
    font-size: 1.3rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  /* Learning Path Card */
  .path-card {
    border-radius: 24px;
    padding: 24px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .path-top {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .path-symbol {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
    font-weight: 800;
    font-size: 1.1rem;
    display: grid;
    place-items: center;
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.3);
  }

  .path-info {
    display: flex;
    flex-direction: column;
  }

  .path-info b {
    font-family: var(--font-kr);
    font-size: 1.05rem;
  }

  .path-info span {
    font-size: 0.82rem;
    color: var(--text-secondary);
  }

  .path-progress {
    margin-left: auto;
    padding: 6px 12px;
    border-radius: 999px;
    background: var(--bg-subtle);
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--text-secondary);
  }

  .lesson-nodes {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 16px;
    position: relative;
  }

  .lesson-nodes::before {
    content: "";
    position: absolute;
    left: 36px;
    right: 36px;
    height: 4px;
    background: var(--border-strong);
    border-radius: 999px;
    z-index: 0;
  }

  .node {
    position: relative;
    z-index: 1;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background: var(--bg-card-solid);
    border: 3px solid var(--border-strong);
    font-weight: 800;
    font-size: 1.05rem;
    display: grid;
    place-items: center;
    color: var(--text-secondary);
    box-shadow: var(--shadow-sm);
  }

  .node:hover {
    transform: scale(1.08);
    border-color: var(--brand);
    color: var(--brand);
  }

  .node.done {
    background: var(--brand);
    border-color: var(--brand);
    color: #fff;
    box-shadow: 0 6px 18px var(--brand-glow);
  }

  .node.current {
    border-color: var(--brand);
    color: var(--brand);
    box-shadow: 0 0 0 6px var(--brand-soft);
  }

  .path-bottom {
    display: flex;
    justify-content: space-between;
    font-size: 0.82rem;
    color: var(--text-secondary);
    padding-top: 12px;
    border-top: 1px solid var(--border);
  }

  /* Quick Access Grid */
  .quick-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .quick-grid button {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px;
    border-radius: 20px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    text-align: left;
  }

  .quick-grid button:hover {
    transform: translateY(-2px);
    border-color: var(--border-strong);
    box-shadow: var(--shadow-md);
  }

  .quick-icon {
    width: 44px;
    height: 44px;
    border-radius: 13px;
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }

  .quick-icon.teal { background: rgba(20, 184, 166, 0.15); color: #14b8a6; }
  .quick-icon.purple { background: rgba(139, 92, 246, 0.15); color: #8b5cf6; }
  .quick-icon.orange { background: rgba(249, 115, 22, 0.15); color: #f97316; }

  .quick-grid button b {
    display: block;
    font-size: 0.95rem;
    margin-bottom: 2px;
  }

  .quick-grid button span {
    display: block;
    font-size: 0.78rem;
    color: var(--text-secondary);
  }

  .quick-grid button > svg:last-child {
    margin-left: auto;
    color: var(--text-muted);
    width: 18px;
  }

  /* Page Title Header */
  .page-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .page-title h1 {
    font-size: 1.75rem;
    font-weight: 800;
    letter-spacing: -0.025em;
  }

  .page-title p {
    color: var(--text-secondary);
    font-size: 0.92rem;
    margin-top: 4px;
  }

  .course-count {
    font-size: 1.6rem;
    font-weight: 800;
    color: var(--brand);
    background: var(--brand-soft);
    padding: 10px 18px;
    border-radius: 16px;
  }

  .course-count small {
    font-size: 0.85rem;
    font-weight: 600;
  }

  /* Searchbox */
  .searchbox {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 16px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
  }

  .searchbox svg {
    color: var(--text-muted);
  }

  .searchbox input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    color: var(--text);
    font-family: inherit;
    font-size: 0.95rem;
  }

  /* Courses Grid */
  .course-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
    gap: 18px;
  }

  .course-card {
    border-radius: 22px;
    padding: 22px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .course-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
    border-color: var(--border-strong);
  }

  .course-badge {
    width: 46px;
    height: 46px;
    border-radius: 14px;
    font-weight: 800;
    font-size: 1rem;
    color: #fff;
    display: grid;
    place-items: center;
    margin-bottom: 4px;
  }

  .color-0 { background: linear-gradient(135deg, #10b981, #059669); }
  .color-1 { background: linear-gradient(135deg, #3b82f6, #2563eb); }
  .color-2 { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
  .color-3 { background: linear-gradient(135deg, #f59e0b, #d97706); }
  .color-4 { background: linear-gradient(135deg, #ec4899, #db2777); }
  .color-5 { background: linear-gradient(135deg, #14b8a6, #0d9488); }

  .course-card h3 {
    font-family: var(--font-kr);
    font-size: 1.15rem;
    font-weight: 700;
  }

  .course-sub {
    font-size: 0.78rem;
    color: var(--brand);
    font-weight: 700;
  }

  .course-card p {
    font-size: 0.86rem;
    color: var(--text-secondary);
    line-height: 1.5;
    flex: 1;
  }

  .course-meta {
    display: flex;
    gap: 12px;
    font-size: 0.78rem;
    color: var(--text-muted);
    padding-top: 8px;
    border-top: 1px solid var(--border);
  }

  .course-open {
    margin-top: 6px;
    width: 100%;
    padding: 11px 16px;
    border-radius: 12px;
    background: var(--bg-subtle);
    font-weight: 700;
    font-size: 0.88rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .course-open:hover {
    background: var(--brand);
    color: #fff;
  }

  .note {
    padding: 14px 18px;
    border-radius: 14px;
    background: var(--bg-subtle);
    border: 1px dashed var(--border-strong);
    font-size: 0.84rem;
    color: var(--text-secondary);
  }

  /* Vocabulary Builder */
  .vocab-count {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border-radius: 14px;
    background: var(--brand-soft);
    color: var(--brand);
    font-weight: 700;
    font-size: 0.88rem;
  }

  .word-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 16px;
  }

  .word-card {
    border-radius: 20px;
    padding: 20px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .word-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .word-top span {
    font-size: 0.72rem;
    font-weight: 700;
    padding: 3px 9px;
    border-radius: 999px;
    background: var(--bg-subtle);
    color: var(--text-secondary);
  }

  .word-top button {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: var(--brand-soft);
    color: var(--brand);
    display: grid;
    place-items: center;
  }

  .word-top button:hover {
    background: var(--brand);
    color: #fff;
  }

  .word-card h2 {
    font-family: var(--font-kr);
    font-size: 1.5rem;
    font-weight: 800;
    margin-top: 4px;
  }

  .word-card b {
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }

  .save-word {
    margin-top: auto;
    padding: 9px 12px;
    border-radius: 11px;
    font-size: 0.8rem;
    font-weight: 700;
    background: var(--bg-subtle);
    color: var(--text);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .save-word:hover {
    background: var(--bg-hover);
  }

  .save-word.saved {
    background: var(--brand-soft);
    color: var(--brand);
  }

  /* Review Center */
  .review-icon, .stats-icon {
    width: 48px;
    height: 48px;
    border-radius: 16px;
    background: var(--brand-soft);
    color: var(--brand);
    display: grid;
    place-items: center;
  }

  .review-summary {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .review-summary > div {
    padding: 20px;
    border-radius: 20px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    text-align: center;
  }

  .review-summary strong {
    display: block;
    font-size: 1.8rem;
    font-weight: 800;
    margin-bottom: 4px;
  }

  .review-summary span {
    font-size: 0.84rem;
    color: var(--text-secondary);
  }

  .empty {
    padding: 48px 24px;
    border-radius: 24px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .empty-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--brand-soft);
    color: var(--brand);
    display: grid;
    place-items: center;
  }

  .empty p {
    color: var(--text-secondary);
    max-width: 380px;
    font-size: 0.92rem;
    margin-bottom: 8px;
  }

  .mistake-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .mistake {
    padding: 18px 20px;
    border-radius: 18px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .mistake b {
    display: block;
    font-size: 0.95rem;
    margin-bottom: 4px;
  }

  .mistake p {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  .mistake strong {
    color: var(--brand);
  }

  .wrong-tag {
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(244, 63, 94, 0.14);
    color: #f43f5e;
    font-size: 0.75rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  /* Stats Page */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .metric {
    padding: 20px;
    border-radius: 20px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .metric span {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .metric strong {
    font-size: 1.75rem;
    font-weight: 800;
  }

  .metric small {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.76rem;
    color: var(--brand);
    font-weight: 600;
  }

  .panel {
    padding: 24px;
    border-radius: 22px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .panel h3 {
    font-size: 1.1rem;
    font-weight: 700;
  }

  .big-progress {
    width: 100%;
    height: 14px;
    border-radius: 999px;
    background: var(--bg-subtle);
    overflow: hidden;
  }

  .big-progress-fill {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, #10b981, #3b82f6);
    transition: width 0.5s ease;
  }

  .progress-label {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  .achievement-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  .achievement {
    position: relative;
    padding: 18px;
    border-radius: 18px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .achievement svg:first-child {
    color: #eab308;
    margin-bottom: 4px;
  }

  .achievement b {
    font-size: 0.95rem;
  }

  .achievement span {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  .ach-check {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 22px;
    height: 22px;
    padding: 3px;
    border-radius: 50%;
    background: var(--brand);
    color: #fff;
  }

  /* Profile Page */
  .profile-avatar {
    width: 48px;
    height: 48px;
    border-radius: 16px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
    font-weight: 800;
    font-size: 1.25rem;
    display: grid;
    place-items: center;
  }

  .profile-avatar.large-avatar {
    width: 68px;
    height: 68px;
    border-radius: 22px;
    font-size: 1.75rem;
  }

  .profile-panel {
    padding: 26px;
    border-radius: 24px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .profile-head {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .profile-head h2 {
    font-size: 1.35rem;
    font-weight: 800;
  }

  .profile-head span {
    font-size: 0.85rem;
    color: var(--brand);
    font-weight: 600;
  }

  .profile-head .secondary {
    margin-left: auto;
  }

  .settings-box {
    padding: 20px;
    border-radius: 18px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    align-items: end;
    gap: 14px;
  }

  .settings-box label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .settings-box input {
    padding: 10px 14px;
    border-radius: 12px;
    background: var(--bg-card-solid);
    border: 1px solid var(--border-strong);
    color: var(--text);
    font-family: inherit;
    font-size: 0.92rem;
    outline: none;
  }

  .profile-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    padding-top: 18px;
    border-top: 1px solid var(--border);
    text-align: center;
  }

  .profile-stats b {
    display: block;
    font-size: 1.4rem;
    font-weight: 800;
  }

  .profile-stats span {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  .muted {
    font-size: 0.88rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  /* Interactive Lesson Player */
  .lesson-page {
    max-width: 680px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
    animation: fadeIn 0.25s ease;
  }

  .lesson-top {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .lesson-progress {
    flex: 1;
    height: 12px;
    border-radius: 999px;
    background: var(--bg-subtle);
    overflow: hidden;
  }

  .lesson-progress i {
    display: block;
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, #10b981, #34d399);
    transition: width 0.35s ease;
  }

  .heart-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-weight: 800;
    color: #f43f5e;
  }

  .lesson-content {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .lesson-content h1 {
    font-size: 1.5rem;
    font-weight: 800;
  }

  .question-count {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .question-card {
    padding: 26px;
    border-radius: 24px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-md);
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .question-card h2 {
    font-size: 1.22rem;
    font-weight: 700;
    line-height: 1.45;
  }

  .question-visual {
    padding: 22px;
    border-radius: 18px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    font-family: var(--font-kr);
    font-size: 2rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    text-align: center;
  }

  .question-visual button {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: var(--brand-soft);
    color: var(--brand);
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }

  .question-visual button:hover {
    background: var(--brand);
    color: #fff;
  }

  .answer-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .answer {
    width: 100%;
    padding: 15px 18px;
    border-radius: 16px;
    background: var(--bg-subtle);
    border: 2px solid var(--border);
    display: flex;
    align-items: center;
    gap: 14px;
    font-family: var(--font-kr), var(--font-sans);
    font-size: 1rem;
    font-weight: 600;
    text-align: left;
  }

  .answer:hover:not(:disabled) {
    border-color: var(--border-strong);
    background: var(--bg-hover);
  }

  .answer.chosen {
    border-color: #6366f1;
    background: rgba(99, 102, 241, 0.12);
  }

  .answer.correct {
    border-color: #10b981;
    background: rgba(16, 185, 129, 0.16);
    color: #10b981;
  }

  .answer.incorrect {
    border-color: #f43f5e;
    background: rgba(244, 63, 94, 0.16);
    color: #f43f5e;
  }

  .answer-letter {
    width: 30px;
    height: 30px;
    border-radius: 9px;
    background: var(--bg-card-solid);
    border: 1px solid var(--border);
    display: grid;
    place-items: center;
    font-size: 0.8rem;
    font-weight: 800;
    flex-shrink: 0;
  }

  .answer-check {
    margin-left: auto;
  }

  .explanation {
    padding: 18px 20px;
    border-radius: 18px;
    border: 1px solid;
    animation: fadeIn 0.2s ease;
  }

  .explanation.good {
    background: rgba(16, 185, 129, 0.12);
    border-color: rgba(16, 185, 129, 0.35);
  }

  .explanation.good b { color: #10b981; }

  .explanation.bad {
    background: rgba(244, 63, 94, 0.12);
    border-color: rgba(244, 63, 94, 0.35);
  }

  .explanation.bad b { color: #f43f5e; }

  .explanation b {
    display: block;
    font-size: 0.98rem;
    margin-bottom: 4px;
  }

  .explanation p {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }

  .lesson-actions {
    margin-top: 6px;
  }

  /* Bottom Mobile Nav */
  .bottomnav {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 40;
    height: 66px;
    background: var(--topbar-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-top: 1px solid var(--border);
    grid-template-columns: repeat(4, 1fr);
    padding: 6px 8px;
  }

  .bottomnav button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--text-secondary);
    border-radius: 12px;
  }

  .bottomnav button.active {
    color: var(--brand);
    background: var(--brand-soft);
  }

  /* Toast Notification */
  .toast {
    position: fixed;
    bottom: 84px;
    right: 24px;
    z-index: 60;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 20px;
    border-radius: 16px;
    background: var(--bg-card-solid);
    border: 1px solid var(--brand);
    color: var(--text);
    font-weight: 700;
    font-size: 0.9rem;
    box-shadow: var(--shadow-lg);
    animation: slideUp 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .toast svg {
    color: var(--brand);
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Custom Confirm Modal (Replaces window.confirm) */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 70;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(6px);
    display: grid;
    place-items: center;
    padding: 20px;
  }

  .modal-card {
    max-width: 400px;
    width: 100%;
    padding: 24px;
    border-radius: 22px;
    background: var(--bg-card-solid);
    border: 1px solid var(--border-strong);
    box-shadow: var(--shadow-lg);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 6px;
  }

  /* Responsive Breakpoints */
  @media (max-width: 960px) {
    .hero-grid {
      grid-template-columns: 1fr;
    }
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .quick-grid {
      grid-template-columns: 1fr;
    }
    .achievement-row {
      grid-template-columns: 1fr;
    }
    .settings-box {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .topbar {
      padding: 0 16px;
    }
    .brand small {
      display: none;
    }
    .mobile-toggle {
      display: grid;
    }
    .sidebar {
      position: fixed;
      top: 68px;
      left: 0;
      bottom: 66px;
      z-index: 35;
      background: var(--bg-elevated);
      transform: translateX(-100%);
      transition: transform 0.25s ease;
      height: auto;
    }
    .sidebar.open {
      transform: translateX(0);
      box-shadow: var(--shadow-lg);
    }
    .main {
      padding: 20px 16px 88px;
    }
    .bottomnav {
      display: grid;
    }
    .hero-copy {
      max-width: 100%;
    }
    .lesson-nodes {
      padding: 8px 4px;
    }
    .node {
      width: 44px;
      height: 44px;
      font-size: 0.92rem;
    }
    .toast {
      left: 16px;
      right: 16px;
      bottom: 78px;
      justify-content: center;
    }
  }
`;

export default function App() {
  const [data, setData] = useState(load);
  const [tab, setTab] = useState("home");
  const [active, setActive] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [choice, setChoice] = useState(null);
  const [checked, setChecked] = useState(false);
  const [session, setSession] = useState({ correct: 0, wrong: 0 });
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  // Persist user progress in localStorage
  useEffect(() => {
    localStorage.setItem("ziyo-premium", JSON.stringify(data));
  }, [data]);

  // Auto-dismiss toast notification
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 2400);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const done = data.completed.length;
  const progress = Math.round((done / LESSONS.length) * 100);
  const currentLesson = LESSONS.find((l) => !data.completed.includes(l.id)) || LESSONS[0];

  const update = (patch) => setData((d) => ({ ...d, ...patch }));

  const startLesson = (lesson) => {
    setActive(lesson);
    setQIndex(0);
    setChoice(null);
    setChecked(false);
    setSession({ correct: 0, wrong: 0 });
    setTab("lesson");
  };

  const question = active?.questions[qIndex];

  const finishQuestion = () => {
    if (choice === null) return;
    setChecked(true);
    const correct = choice === question.a;
    setSession((s) => ({
      ...s,
      correct: s.correct + (correct ? 1 : 0),
      wrong: s.wrong + (correct ? 0 : 1),
    }));
    if (!correct) {
      update({
        hearts: Math.max(0, data.hearts - 1),
        mistakes: [
          ...data.mistakes,
          { question: question.q, answer: question.opts[question.a], at: Date.now() },
        ],
      });
    }
  };

  const nextQuestion = () => {
    if (qIndex < active.questions.length - 1) {
      setQIndex((i) => i + 1);
      setChoice(null);
      setChecked(false);
    } else {
      const passed =
        session.correct + (choice === question.a ? 1 : 0) >=
        Math.ceil(active.questions.length * 0.6);
      if (passed) {
        update({
          completed: [...new Set([...data.completed, active.id])],
          xp: data.xp + active.xp,
          minutes: data.minutes + active.minutes,
          hearts: Math.min(
            5,
            data.hearts + (session.wrong === 0 && choice === question.a ? 1 : 0)
          ),
        });
        setToast(`Ajoyib! +${active.xp} XP`);
      } else {
        setToast("Yana urinib ko‘ring. Natijangiz saqlandi.");
      }
      setActive(null);
      setTab("home");
    }
  };

  const nav = [
    ["home", "Bosh sahifa", Home],
    ["learn", "Kurslar", BookOpen],
    ["vocab", "Lug‘at", Grid2X2],
    ["review", "Takrorlash", RotateCcw],
    ["stats", "Statistika", BarChart3],
    ["profile", "Profil", UserRound],
  ];

  const filteredLevels = LEVELS.filter((l) =>
    (l.id + l.title + l.desc).toLowerCase().includes(query.toLowerCase())
  );

  // Korean Text-to-Speech via Web Speech API
  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "ko-KR";
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    } else {
      setToast("Audio ushbu brauzerda qo‘llab-quvvatlanmaydi.");
    }
  };

  return (
    <div className={`app ${data.theme}`}>
      <style>{STYLES}</style>

      {/* Top Navigation Bar */}
      <header className="topbar">
        <button className="brand" onClick={() => setTab("home")}>
          <span className="brandmark">한</span>
          <span>ZiyoPrep</span>
          <small>KOREAN</small>
        </button>
        <div className="topstats">
          <span className="stat fire">
            <Flame size={17} fill="currentColor" />
            {data.streak}
          </span>
          <span className="stat xp">
            <Zap size={17} fill="currentColor" />
            {data.xp.toLocaleString()}
          </span>
          <span className="stat hearts">
            <Heart size={17} fill="currentColor" />
            {data.hearts}
          </span>
        </div>
        <div className="topactions">
          <button
            className="iconbtn"
            onClick={() => update({ theme: data.theme === "dark" ? "light" : "dark" })}
            title="Theme"
          >
            {data.theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button className="avatar" onClick={() => setTab("profile")}>
            {data.name.slice(0, 1).toUpperCase()}
          </button>
        </div>
        <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
          <Menu size={20} />
        </button>
      </header>

      <div className="shell">
        {/* Left Sidebar */}
        <aside className={`sidebar ${mobileMenu ? "open" : ""}`}>
          <div className="side-label">MENYU</div>
          {nav.map(([id, label, Icon]) => (
            <button
              key={id}
              className={`navitem ${tab === id ? "selected" : ""}`}
              onClick={() => {
                setTab(id);
                setMobileMenu(false);
              }}
            >
              <Icon size={19} />
              {label}
              {id === "review" && data.mistakes.length > 0 && (
                <b className="navcount">{data.mistakes.length}</b>
              )}
            </button>
          ))}
          <div className="side-card">
            <div className="side-card-icon">
              <Target size={18} />
            </div>
            <b>Kunlik maqsad</b>
            <p>{data.dailyGoal} daqiqa o‘qish</p>
            <div className="progress">
              <i style={{ width: `${Math.min(100, (data.minutes / data.dailyGoal) * 100)}%` }} />
            </div>
            <small>
              {Math.min(data.minutes, data.dailyGoal)} / {data.dailyGoal} daqiqa
            </small>
          </div>
          <div className="sidebar-foot">ZiyoPrep v1.0 · Korean</div>
        </aside>

        {/* Main Content Viewport */}
        <main className="main">
          {tab === "home" && (
            <section className="page">
              <div className="welcome">
                <div>
                  <span className="eyebrow">KOREAN LEARNING JOURNEY</span>
                  <h1>안녕하세요, {data.name}님! 👋</h1>
                  <p>Bugun koreys tilida yana bir qadam oldinga yuring.</p>
                </div>
                <div className="level-pill">
                  <Star size={16} /> BEGINNER <b>1A</b>
                </div>
              </div>

              <div className="hero-grid">
                <div className="hero-card">
                  <div className="hero-copy">
                    <span className="eyebrow light">DAVOM ETTIRISH</span>
                    <h2>{currentLesson.title}</h2>
                    <p>
                      {currentLesson.kind} · {currentLesson.minutes} daqiqa · {currentLesson.xp} XP
                    </p>
                    <button className="primary" onClick={() => startLesson(currentLesson)}>
                      <Play size={16} fill="currentColor" /> Darsni boshlash <ArrowRight size={16} />
                    </button>
                  </div>
                  <div className="hero-korean">한글</div>
                </div>

                <div className="goal-card">
                  <div className="goal-head">
                    <div>
                      <span className="eyebrow">BUGUNGI MAQSAD</span>
                      <h3>
                        {Math.min(data.minutes, data.dailyGoal)}
                        <small> / {data.dailyGoal} min</small>
                      </h3>
                    </div>
                    <div className="goal-icon">
                      <Target size={22} />
                    </div>
                  </div>
                  <div className="progress large">
                    <i
                      style={{ width: `${Math.min(100, (data.minutes / data.dailyGoal) * 100)}%` }}
                    />
                  </div>
                  <p>
                    {data.minutes >= data.dailyGoal
                      ? "Maqsad bajarildi. Zo‘r!"
                      : "Har kuni oz-ozdan o‘rganing."}
                  </p>
                </div>
              </div>

              <div className="section-head">
                <div>
                  <span className="eyebrow">YOUR LEARNING PATH</span>
                  <h2>O‘rganish yo‘li</h2>
                </div>
                <button className="textbtn" onClick={() => setTab("learn")}>
                  Barcha kurslar <ChevronRight size={16} />
                </button>
              </div>

              <div className="path-card">
                <div className="path-top">
                  <div className="path-symbol">1A</div>
                  <div className="path-info">
                    <b>서울대 한국어 1A</b>
                    <span>Boshlang‘ich · TOPIK 1</span>
                  </div>
                  <span className="path-progress">
                    {done}/{LESSONS.length}
                  </span>
                </div>
                <div className="lesson-nodes">
                  {LESSONS.slice(0, 5).map((l, i) => (
                    <button
                      key={l.id}
                      className={`node ${
                        data.completed.includes(l.id)
                          ? "done"
                          : l.id === currentLesson.id
                          ? "current"
                          : ""
                      }`}
                      onClick={() => startLesson(l)}
                      title={l.title}
                    >
                      {data.completed.includes(l.id) ? <Check size={20} /> : <span>{i + 1}</span>}
                    </button>
                  ))}
                </div>
                <div className="path-bottom">
                  <span>{progress}% kurs bajarildi</span>
                  <span>{done} ta dars yakunlandi</span>
                </div>
              </div>

              <div className="section-head">
                <div>
                  <span className="eyebrow">QUICK ACCESS</span>
                  <h2>Tezkor mashqlar</h2>
                </div>
              </div>

              <div className="quick-grid">
                <button onClick={() => setTab("vocab")}>
                  <div className="quick-icon teal">
                    <BookMarked size={20} />
                  </div>
                  <div>
                    <b>So‘z yodlash</b>
                    <span>Flashcards va lug‘at</span>
                  </div>
                  <ChevronRight size={18} />
                </button>
                <button onClick={() => setTab("review")}>
                  <div className="quick-icon purple">
                    <RotateCcw size={20} />
                  </div>
                  <div>
                    <b>Xatolarni takrorlash</b>
                    <span>{data.mistakes.length} ta qayta ko‘rish</span>
                  </div>
                  <ChevronRight size={18} />
                </button>
                <button onClick={() => setTab("learn")}>
                  <div className="quick-icon orange">
                    <Headphones size={20} />
                  </div>
                  <div>
                    <b>Listening</b>
                    <span>Eshitish mashqlari</span>
                  </div>
                  <ChevronRight size={18} />
                </button>
              </div>
            </section>
          )}

          {tab === "learn" && (
            <section className="page">
              <div className="page-title">
                <div>
                  <span className="eyebrow">CURRICULUM</span>
                  <h1>Koreys tili kurslari</h1>
                  <p>Hanguldan TOPIK 6 darajasigacha bosqichma-bosqich.</p>
                </div>
                <div className="course-count">
                  12 <small>daraja</small>
                </div>
              </div>

              <div className="searchbox">
                <Search size={18} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Kurs yoki mavzu qidirish..."
                />
              </div>

              <div className="course-grid">
                {filteredLevels.map((l) => (
                  <article className="course-card" key={l.id}>
                    <div className={`course-badge color-${l.index % 6}`}>{l.id}</div>
                    <h3>{l.title}</h3>
                    <b className="course-sub">{l.sub}</b>
                    <p>{l.desc}</p>
                    <div className="course-meta">
                      <span>{l.grammar} grammatika</span>
                      <span>{l.tests} test</span>
                    </div>
                    <button
                      className="course-open"
                      onClick={() => {
                        const found = LESSONS.find((x) => x.level === l.id);
                        if (found) startLesson(found);
                        else
                          setToast(
                            `${l.id} darajasi uchun dars kontenti keyingi yangilanishda qo‘shiladi.`
                          );
                      }}
                    >
                      Kursni ochish <ArrowRight size={16} />
                    </button>
                  </article>
                ))}
              </div>
              <div className="note">
                Hozirgi MVPda 7 ta namunaviy dars interaktiv. Qolgan darajalar uchun to‘liq dars
                kontentini alohida qo‘shish kerak.
              </div>
            </section>
          )}

          {tab === "vocab" && (
            <section className="page">
              <div className="page-title">
                <div>
                  <span className="eyebrow">VOCABULARY BUILDER</span>
                  <h1>Shaxsiy lug‘at</h1>
                  <p>Koreyscha so‘zlarni o‘rganing va talaffuzini tinglang.</p>
                </div>
                <div className="vocab-count">
                  <BookMarked size={18} />
                  {data.words.length} saqlangan
                </div>
              </div>

              <div className="word-grid">
                {[
                  ["안녕하세요", "Salom", "Salomlashish"],
                  ["감사합니다", "Rahmat", "Odobli ibora"],
                  ["학생", "Talaba", "Ot"],
                  ["학교", "Maktab", "Ot"],
                  ["친구", "Do‘st", "Ot"],
                  ["물", "Suv", "Ot"],
                  ["먹다", "Yemoq", "Fe’l"],
                  ["가다", "Bormoq", "Fe’l"],
                  ["오늘", "Bugun", "Vaqt"],
                  ["내일", "Ertaga", "Vaqt"],
                  ["어제", "Kecha", "Vaqt"],
                  ["주세요", "Iltimos, bering", "Ibora"],
                ]
                  .filter(
                    (w) => query === "" || w.join(" ").toLowerCase().includes(query.toLowerCase())
                  )
                  .map((w) => (
                    <div className="word-card" key={w[0]}>
                      <div className="word-top">
                        <span>{w[2]}</span>
                        <button onClick={() => speak(w[0])} aria-label="Talaffuzni tinglash">
                          <Volume2 size={17} />
                        </button>
                      </div>
                      <h2>{w[0]}</h2>
                      <b>{w[1]}</b>
                      <button
                        className={`save-word ${data.words.includes(w[0]) ? "saved" : ""}`}
                        onClick={() =>
                          update({
                            words: data.words.includes(w[0])
                              ? data.words.filter((x) => x !== w[0])
                              : [...data.words, w[0]],
                          })
                        }
                      >
                        {data.words.includes(w[0]) ? (
                          <>
                            <Check size={14} /> Saqlangan
                          </>
                        ) : (
                          <>+ Lug‘atga qo‘shish</>
                        )}
                      </button>
                    </div>
                  ))}
              </div>
            </section>
          )}

          {tab === "review" && (
            <section className="page">
              <div className="page-title">
                <div>
                  <span className="eyebrow">SMART REVIEW</span>
                  <h1>Takrorlash markazi</h1>
                  <p>Xatolar ustida ishlang va bilimni mustahkamlang.</p>
                </div>
                <div className="review-icon">
                  <RotateCcw size={22} />
                </div>
              </div>

              <div className="review-summary">
                <div>
                  <strong>{data.mistakes.length}</strong>
                  <span>Jami xato</span>
                </div>
                <div>
                  <strong>{data.words.length}</strong>
                  <span>Saqlangan so‘z</span>
                </div>
                <div>
                  <strong>{done}</strong>
                  <span>Tugallangan dars</span>
                </div>
              </div>

              {data.mistakes.length === 0 ? (
                <div className="empty">
                  <div className="empty-icon">
                    <Check size={26} />
                  </div>
                  <h3>Hozircha xatolar yo‘q!</h3>
                  <p>Darslarni bajaring. Noto‘g‘ri javoblaringiz shu yerda jamlanadi.</p>
                  <button className="primary" onClick={() => setTab("learn")}>
                    Darslarni ko‘rish
                  </button>
                </div>
              ) : (
                <div className="mistake-list">
                  {data.mistakes
                    .slice()
                    .reverse()
                    .map((m, i) => (
                      <div className="mistake" key={i}>
                        <div>
                          <b>{m.question}</b>
                          <p>
                            To‘g‘ri javob: <strong>{m.answer}</strong>
                          </p>
                        </div>
                        <span className="wrong-tag">Xato</span>
                      </div>
                    ))}
                  <button className="secondary" onClick={() => update({ mistakes: [] })}>
                    Takrorlash ro‘yxatini tozalash
                  </button>
                </div>
              )}
            </section>
          )}

          {tab === "stats" && (
            <section className="page">
              <div className="page-title">
                <div>
                  <span className="eyebrow">YOUR PERFORMANCE</span>
                  <h1>O‘quv statistikasi</h1>
                  <p>Rivojlanishingizni kuzatib boring.</p>
                </div>
                <div className="stats-icon">
                  <BarChart3 size={22} />
                </div>
              </div>

              <div className="stats-grid">
                <div className="metric">
                  <span>Jami XP</span>
                  <strong>{data.xp.toLocaleString()}</strong>
                  <small>
                    <Zap size={14} /> Tajriba ballari
                  </small>
                </div>
                <div className="metric">
                  <span>Tugallangan dars</span>
                  <strong>{done}</strong>
                  <small>
                    <BookOpen size={14} /> {LESSONS.length} ta namunadan
                  </small>
                </div>
                <div className="metric">
                  <span>O‘qish vaqti</span>
                  <strong>{data.minutes} min</strong>
                  <small>
                    <Clock3 size={14} /> Jami vaqt
                  </small>
                </div>
                <div className="metric">
                  <span>Streak</span>
                  <strong>{data.streak} kun</strong>
                  <small>
                    <Flame size={14} /> Ketma-ket kun
                  </small>
                </div>
              </div>

              <div className="panel">
                <h3>Kurs bajarilishi</h3>
                <div className="big-progress">
                  <div className="big-progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <div className="progress-label">
                  <span>
                    {done} / {LESSONS.length} dars
                  </span>
                  <b>{progress}%</b>
                </div>
              </div>

              <div className="panel">
                <h3>Yutuqlar</h3>
                <div className="achievement-row">
                  <div className="achievement">
                    <Trophy size={22} />
                    <b>Birinchi qadam</b>
                    <span>Birinchi darsni tugating</span>
                    {done >= 1 && <Check className="ach-check" />}
                  </div>
                  <div className="achievement">
                    <Flame size={22} />
                    <b>Izchillik</b>
                    <span>7 kunlik streak</span>
                    {data.streak >= 7 && <Check className="ach-check" />}
                  </div>
                  <div className="achievement">
                    <Star size={22} />
                    <b>Bilimdon</b>
                    <span>500 XP to‘plang</span>
                    {data.xp >= 500 && <Check className="ach-check" />}
                  </div>
                </div>
              </div>
            </section>
          )}

          {tab === "profile" && (
            <section className="page">
              <div className="page-title">
                <div>
                  <span className="eyebrow">YOUR ACCOUNT</span>
                  <h1>Profil</h1>
                  <p>Shaxsiy ma’lumot va sozlamalar.</p>
                </div>
                <div className="profile-avatar">{data.name.slice(0, 1).toUpperCase()}</div>
              </div>

              <div className="profile-panel">
                <div className="profile-head">
                  <div className="profile-avatar large-avatar">
                    {data.name.slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <h2>{data.name}</h2>
                    <span>Premium Learner · Korean</span>
                  </div>
                  <button className="secondary" onClick={() => setShowSettings(!showSettings)}>
                    <Settings size={16} /> Sozlamalar
                  </button>
                </div>

                {showSettings && (
                  <div className="settings-box">
                    <label>
                      Ismingiz
                      <input
                        value={data.name}
                        onChange={(e) => update({ name: e.target.value })}
                      />
                    </label>
                    <label>
                      Kunlik maqsad (daqiqa)
                      <input
                        type="number"
                        min="5"
                        max="120"
                        value={data.dailyGoal}
                        onChange={(e) =>
                          update({ dailyGoal: Math.max(5, Number(e.target.value)) })
                        }
                      />
                    </label>
                    <button className="secondary" onClick={() => setConfirmReset(true)}>
                      Progressni tiklash
                    </button>
                  </div>
                )}

                <div className="profile-stats">
                  <div>
                    <b>{data.xp}</b>
                    <span>XP</span>
                  </div>
                  <div>
                    <b>{done}</b>
                    <span>Dars</span>
                  </div>
                  <div>
                    <b>{data.streak}</b>
                    <span>Streak</span>
                  </div>
                </div>
              </div>

              <div className="panel">
                <h3>Hisob ma’lumotlari</h3>
                <p className="muted">
                  Hozirgi versiya ma’lumotlarni ushbu brauzerning localStorage xotirasida saqlaydi.
                  Boshqa qurilmaga avtomatik sinxronlash uchun backend ulash kerak.
                </p>
              </div>
            </section>
          )}

          {tab === "lesson" && active && (
            <section className="lesson-page">
              <div className="lesson-top">
                <button
                  className="iconbtn"
                  onClick={() => {
                    setActive(null);
                    setTab("home");
                  }}
                >
                  <X size={20} />
                </button>
                <div className="lesson-progress">
                  <i style={{ width: `${((qIndex + 1) / active.questions.length) * 100}%` }} />
                </div>
                <span className="heart-label">
                  <Heart size={17} fill="currentColor" />
                  {data.hearts}
                </span>
              </div>

              <div className="lesson-content">
                <span className="eyebrow">
                  {active.kind} · {active.level}
                </span>
                <h1>{active.title}</h1>
                <p className="question-count">
                  Savol {qIndex + 1} / {active.questions.length}
                </p>

                <div className="question-card">
                  <h2>{question.q}</h2>
                  {question.visual && (
                    <div className="question-visual">
                      {question.visual}
                      <button onClick={() => speak(question.visual)} aria-label="Tinglash">
                        <Volume2 size={20} />
                      </button>
                    </div>
                  )}

                  <div className="answer-list">
                    {question.opts.map((opt, i) => (
                      <button
                        key={i}
                        disabled={checked}
                        className={`answer ${choice === i ? "chosen" : ""} ${
                          checked && i === question.a
                            ? "correct"
                            : checked && choice === i
                            ? "incorrect"
                            : ""
                        }`}
                        onClick={() => setChoice(i)}
                      >
                        <span className="answer-letter">{["A", "B", "C", "D"][i]}</span>
                        {opt}
                        {checked && i === question.a && <Check className="answer-check" size={18} />}
                        {checked && choice === i && i !== question.a && (
                          <X className="answer-check" size={18} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {checked && (
                  <div className={`explanation ${choice === question.a ? "good" : "bad"}`}>
                    <b>{choice === question.a ? "To‘g‘ri javob!" : "Yana bir bor o‘rganamiz"}</b>
                    <p>{question.why}</p>
                  </div>
                )}

                <div className="lesson-actions">
                  {!checked ? (
                    <button
                      className="primary full"
                      disabled={choice === null}
                      onClick={finishQuestion}
                    >
                      Javobni tekshirish
                    </button>
                  ) : (
                    <button className="primary full" onClick={nextQuestion}>
                      {qIndex === active.questions.length - 1 ? "Darsni yakunlash" : "Davom etish"}{" "}
                      <ArrowRight size={17} />
                    </button>
                  )}
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="bottomnav">
        {nav.slice(0, 4).map(([id, label, Icon]) => (
          <button
            key={id}
            className={tab === id ? "active" : ""}
            onClick={() => setTab(id)}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Custom Confirmation Modal for Progress Reset */}
      {confirmReset && (
        <div className="modal-backdrop" onClick={() => setConfirmReset(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Progressni tiklash</h3>
            <p className="muted">Barcha progressni boshidan boshlaysizmi?</p>
            <div className="modal-actions">
              <button className="secondary" onClick={() => setConfirmReset(false)}>
                Bekor qilish
              </button>
              <button
                className="primary"
                onClick={() => {
                  localStorage.removeItem("ziyo-premium");
                  setData(DEFAULT);
                  setConfirmReset(false);
                  setToast("Progress qayta tiklandi.");
                }}
              >
                Tiklash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="toast">
          <Sparkles size={17} />
          {toast}
        </div>
      )}
    </div>
  );
}