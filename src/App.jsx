import React, { useEffect, useMemo, useRef, useState } from "react";

/*
  ZiyoPrep — single-file React app
  - No icon/UI library required
  - Uses localStorage for demo progress and saved words
  - AI chat calls your existing Vercel endpoint: POST /api/chat
  - Keep GROQ_API_KEY only on the server (Vercel Environment Variables)
*/

const COURSES = ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B", "6A", "6B"];

const LESSONS = [
  { id: "1a-01", course: "1A", title: "안녕하세요? (Tanishuv)", subtitle: "Men O‘zbekistonlikman", icon: "👋", words: ["안녕하세요", "저", "학생", "한국", "사람"], grammar: "이에요 / 예요", example: "저는 토히르벡이에요.", meaning: "Men Tohirbekman." },
  { id: "1a-02", course: "1A", title: "이거 뭐예요? (Buyumlar)", subtitle: "Bu koreys tili lug‘ati", icon: "🎒", words: ["이거", "책", "가방", "연필", "핸드폰"], grammar: "이거 / 그거 / 저거", example: "이거는 책이에요.", meaning: "Bu kitob." },
  { id: "1a-03", course: "1A", title: "한국어를 공부해요 (Kundalik ishlar)", subtitle: "Kutubxonada koreys tilini o‘rganaman", icon: "📚", words: ["공부하다", "읽다", "쓰다", "학교", "도서관"], grammar: "을 / 를", example: "저는 한국어를 공부해요.", meaning: "Men koreys tilini o‘rganaman." },
  { id: "1a-04", course: "1A", title: "어디에 있어요? (Joylashuv)", subtitle: "Bank kasalxonaning yonida joylashgan", icon: "📍", words: ["어디", "은행", "병원", "옆", "앞"], grammar: "에 있어요", example: "은행은 병원 옆에 있어요.", meaning: "Bank kasalxona yonida." },
  { id: "1a-05", course: "1A", title: "주말에 친구를 만났어요 (O‘tgan zamon)", subtitle: "Kecha do‘stim bilan kino ko‘rdim", icon: "📅", words: ["주말", "친구", "만나다", "영화", "보다"], grammar: "았어요 / 었어요", example: "어제 영화를 봤어요.", meaning: "Kecha kino ko‘rdim." },
  { id: "1a-06", course: "1A", title: "얼마예요? (Xarid va sonlar)", subtitle: "Beshta olma va ikkita apelsin", icon: "🍎", words: ["얼마", "사과", "오렌지", "개", "원"], grammar: "Koreyscha va xitoycha sonlar", example: "사과 두 개 주세요.", meaning: "Ikkita olma bering." },
  { id: "1a-07", course: "1A", title: "날씨가 어때요? (Ob-havo va fasllar)", subtitle: "Koreyada bahorda havo iliq bo‘ladi", icon: "☀️", words: ["날씨", "봄", "여름", "가을", "겨울"], grammar: "아 / 어요", example: "오늘은 날씨가 좋아요.", meaning: "Bugun havo yaxshi." },
  { id: "1a-08", course: "1A", title: "주말에 같이 영화 볼까요? (Taklif)", subtitle: "Shanba kuni birga kinoga chiqaylikmi?", icon: "🎬", words: ["같이", "주말", "영화", "보다", "까요"], grammar: "(으)ㄹ까요?", example: "주말에 같이 영화 볼까요?", meaning: "Dam olish kuni birga kino ko‘ramizmi?" },
  { id: "1b-01", course: "1B", title: "하루 일과 (Kun tartibi)", subtitle: "Kundalik reja va vaqt", icon: "⏰", words: ["일어나다", "아침", "점심", "저녁", "자다"], grammar: "부터 / 까지", example: "아침 7시부터 공부해요.", meaning: "Ertalab soat 7 dan o‘qiyman." },
  { id: "2a-01", course: "2A", title: "경험 이야기하기 (Tajriba)", subtitle: "Boshdan kechirgan voqealar", icon: "✈️", words: ["경험", "여행", "가다", "먹다", "재미있다"], grammar: "아 / 어 본 적이 있어요", example: "한국에 가 본 적이 있어요.", meaning: "Koreyaga borib ko‘rganman." },
  { id: "2b-01", course: "2B", title: "이유 설명하기 (Sabab)", subtitle: "Sabab va natijani tushuntirish", icon: "💡", words: ["이유", "때문", "아프다", "늦다", "약속"], grammar: "기 때문에", example: "비가 오기 때문에 집에 있어요.", meaning: "Yomg‘ir yog‘ayotgani sababli uyda qolaman." },
];

const WORDS = [
  { ko: "안녕하세요", uz: "Salom", type: "Salomlashuv", level: "1A" },
  { ko: "감사합니다", uz: "Rahmat", type: "Salomlashuv", level: "1A" },
  { ko: "학교", uz: "Maktab", type: "Joy", level: "1A" },
  { ko: "도서관", uz: "Kutubxona", type: "Joy", level: "1A" },
  { ko: "친구", uz: "Do‘st", type: "Odamlar", level: "1A" },
  { ko: "공부하다", uz: "O‘qimoq, o‘rganmoq", type: "Fe’l", level: "1A" },
  { ko: "맛있어요", uz: "Mazali", type: "Sifat", level: "1A" },
  { ko: "괜찮아요", uz: "Yaxshi, muammo yo‘q", type: "Ifoda", level: "1A" },
  { ko: "약속", uz: "Uchrashuv, va’da", type: "Ot", level: "2B" },
  { ko: "경험", uz: "Tajriba", type: "Ot", level: "2A" },
];

const STORAGE = {
  done: "ziyoprep_done_v2",
  xp: "ziyoprep_xp_v2",
  saved: "ziyoprep_saved_words_v2",
  streak: "ziyoprep_streak_v2",
  name: "ziyoprep_name_v2",
};

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function Icon({ name, size = 21 }) {
  const paths = {
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z"/><path d="M4 5.5v13A2.5 2.5 0 0 1 6.5 16H20"/></>,
    words: <><path d="M4 6h16M4 12h10M4 18h16"/><path d="M17 9l3 3-3 3"/></>,
    spark: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/></>,
    repeat: <><path d="m17 2 4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/></>,
    send: <><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></>,
    mic: <><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    moon: <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></>,
    close: <><path d="m18 6-12 12M6 6l12 12"/></>,
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      {paths[name] || paths.spark}
    </svg>
  );
}

export default function App() {
  const [tab, setTab] = useState("learn");
  const [course, setCourse] = useState("1A");
  const [done, setDone] = useState(() => readStorage(STORAGE.done, []));
  const [xp, setXp] = useState(() => readStorage(STORAGE.xp, 535));
  const [savedWords, setSavedWords] = useState(() => readStorage(STORAGE.saved, []));
  const [userName, setUserName] = useState(() => readStorage(STORAGE.name, "토히르벡"));
  const [dark, setDark] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);
  const [quizChoice, setQuizChoice] = useState("");
  const [quizChecked, setQuizChecked] = useState(false);
  const [wordSearch, setWordSearch] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      ko: "안녕하세요! 저는 ZiyoPrep AI 선생님이에요. 한국어, TOPIK, 문법에 대해 무엇이든 물어보세요!",
      uz: "Assalomu alaykum! Men ZiyoPrep AI ustoziman. Koreys tili, TOPIK yoki grammatika haqida istalgan savolingizni bering."
    }
  ]);
  const [chatBusy, setChatBusy] = useState(false);
  const [chatError, setChatError] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => localStorage.setItem(STORAGE.done, JSON.stringify(done)), [done]);
  useEffect(() => localStorage.setItem(STORAGE.xp, JSON.stringify(xp)), [xp]);
  useEffect(() => localStorage.setItem(STORAGE.saved, JSON.stringify(savedWords)), [savedWords]);
  useEffect(() => localStorage.setItem(STORAGE.name, JSON.stringify(userName)), [userName]);
  useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), [chatHistory, chatBusy]);

  const courseLessons = useMemo(
    () => LESSONS.filter((lesson) => lesson.course === course),
    [course]
  );

  const completedCount = done.length;
  const progress = Math.min(
    100,
    Math.round((completedCount / Math.max(LESSONS.length, 1)) * 100)
  );

  const filteredWords = useMemo(
    () => WORDS.filter((w) =>
      `${w.ko} ${w.uz} ${w.type}`.toLowerCase().includes(wordSearch.toLowerCase())
    ),
    [wordSearch]
  );

  function completeLesson(lesson) {
    if (!done.includes(lesson.id)) {
      setDone((current) => [...current, lesson.id]);
      setXp((current) => current + 20);
    }

    setActiveLesson(null);
    setQuizChoice("");
    setQuizChecked(false);
  }

  function toggleSaved(word) {
    setSavedWords((current) =>
      current.some((w) => w.ko === word.ko)
        ? current.filter((w) => w.ko !== word.ko)
        : [...current, word]
    );
  }

  async function sendChat(event) {
    event?.preventDefault();

    const message = chatInput.trim();
    if (!message || chatBusy) return;

    const nextHistory = [
      ...chatHistory,
      { role: "user", ko: message, uz: message }
    ];

    setChatHistory(nextHistory);
    setChatInput("");
    setChatBusy(true);
    setChatError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          userName,
          history: chatHistory.slice(-8),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.uz || data?.error || `HTTP ${response.status}`);
      }

      if (
        data?.uz?.startsWith("AI xatosi") ||
        data?.uz?.startsWith("Server xatosi")
      ) {
        throw new Error(data.uz);
      }

      setChatHistory((current) => [
        ...current,
        {
          role: "assistant",
          ko: data.ko || "답변을 준비하지 못했어요.",
          uz: data.uz || data.ko || "Javob olinmadi."
        }
      ]);
    } catch (error) {
      setChatError(
        error.message || "AI bilan bog‘lanib bo‘lmadi. Keyinroq urinib ko‘ring."
      );
    } finally {
      setChatBusy(false);
    }
  }

  function speak(text) {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR";
    utterance.rate = 0.88;

    window.speechSynthesis.speak(utterance);
  }

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@500;600;700;800;900&family=Noto+Sans+KR:wght@500;600;700;800;900&display=swap');

    * { box-sizing: border-box; }

    :root {
      font-family: Nunito, 'Noto Sans KR', sans-serif;
      color: #17243a;
      background: #f8f9fc;
    }

    body {
      margin: 0;
      background: #f8f9fc;
    }

    button, input { font: inherit; }
    button { cursor: pointer; }

    .app {
      min-height: 100vh;
      background: ${dark ? "#111827" : "#f8f9fc"};
      color: ${dark ? "#f3f4f6" : "#17243a"};
      padding-bottom: 94px;
      transition: .2s;
    }

    .wrap {
      width: min(100%, 760px);
      margin: 0 auto;
      padding: 24px 22px 30px;
    }

    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin: 8px 0 24px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo {
      width: 58px;
      height: 58px;
      border-radius: 19px;
      background: linear-gradient(145deg, #b7efff, #d9f8eb);
      display: grid;
      place-items: center;
      font-size: 31px;
      box-shadow: 0 5px 12px #1e293b18;
    }

    .brand h1 {
      font-size: 27px;
      line-height: 1;
      margin: 0;
      font-weight: 1000;
      letter-spacing: -1px;
    }

    .brand p {
      margin: 6px 0 0;
      color: #0aa477;
      font-weight: 900;
      font-size: 13px;
    }

    .topActions { display: flex; gap: 9px; }

    .pill, .round {
      border: 1px solid #e1e8f1;
      background: ${dark ? "#1f2937" : "#fff"};
      color: inherit;
      border-radius: 24px;
      padding: 11px 15px;
      font-weight: 900;
    }

    .round {
      width: 44px;
      height: 44px;
      padding: 0;
      display: grid;
      place-items: center;
    }

    .hero {
      border: 1px solid #ccebd1;
      background: linear-gradient(110deg, #eefbea, #e7f6ff);
      border-radius: 29px;
      padding: 19px;
      display: flex;
      align-items: center;
      gap: 17px;
      color: #17243a;
      margin-bottom: 22px;
    }

    .avatar {
      width: 92px;
      height: 92px;
      flex: 0 0 92px;
      border-radius: 25px;
      background: linear-gradient(145deg, #c9f4ff, #d9f9df);
      display: grid;
      place-items: center;
      font-size: 48px;
      border: 4px solid #fff;
      box-shadow: 0 5px 12px #1e293b18;
    }

    .heroMain { flex: 1; min-width: 0; }

    .heroLine {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-weight: 1000;
    }

    .heroLine strong { font-size: 18px; }
    .xp { color: #059b70; white-space: nowrap; }

    .bar {
      height: 11px;
      background: #fff;
      border: 1px solid #dce8e3;
      border-radius: 20px;
      overflow: hidden;
      margin: 12px 0;
    }

    .bar span {
      height: 100%;
      display: block;
      background: #55c900;
      border-radius: 20px;
    }

    .muted { color: #8292a9; }

    .stats {
      font-size: 14px;
      font-weight: 900;
      color: #70819a;
    }

    .sectionHead {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 24px 0 12px;
    }

    .sectionHead h2 {
      font-size: 19px;
      margin: 0;
      font-weight: 1000;
    }

    .link {
      border: 0;
      background: none;
      color: #079c71;
      font-weight: 900;
    }

    .continue {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 13px;
      text-align: left;
      border: 1px solid #e0e8f2;
      background: ${dark ? "#1f2937" : "#fff"};
      color: inherit;
      padding: 17px 18px;
      border-radius: 22px;
      font-weight: 1000;
      font-size: 16px;
      box-shadow: 0 2px 5px #1e293b05;
    }

    .play {
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      color: #55c900;
      font-size: 22px;
    }

    .featureGrid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin: 17px 0;
    }

    .feature {
      min-height: 142px;
      border-radius: 25px;
      border: 1px solid;
      padding: 17px;
      text-align: left;
      color: inherit;
      background: ${dark ? "#1f2937" : "#fff"};
    }

    .feature.purple {
      border-color: #d9d0ff;
      background: ${dark ? "#27243c" : "#f2efff"};
    }

    .feature.blue {
      border-color: #c9e7fa;
      background: ${dark ? "#1e3040" : "#edf7ff"};
    }

    .feature.green {
      border-color: #d3ead8;
      background: ${dark ? "#1e352a" : "#eff9f0"};
    }

    .featureIcon {
      width: 48px;
      height: 48px;
      border-radius: 16px;
      display: grid;
      place-items: center;
      background: #5746e8;
      color: white;
      font-size: 23px;
      margin-bottom: 11px;
    }

    .feature.blue .featureIcon { background: #10a8df; }
    .feature.green .featureIcon { background: #4d9277; }

    .feature b {
      display: block;
      font-size: 16px;
      font-weight: 1000;
    }

    .feature small {
      display: block;
      color: #8091a8;
      font-weight: 800;
      margin-top: 5px;
      line-height: 1.35;
    }

    .courseScroller {
      display: flex;
      gap: 9px;
      overflow: auto;
      padding: 4px 0 9px;
      scrollbar-width: none;
    }

    .courseScroller::-webkit-scrollbar { display: none; }

    .courseBtn {
      border: 0;
      background: #f8dfe4;
      color: #8e3348;
      padding: 11px 16px;
      border-radius: 14px;
      font-weight: 1000;
      white-space: nowrap;
    }

    .courseBtn.active {
      background: ${dark ? "#263b35" : "#fff"};
      color: #17243a;
      outline: 3px solid #222;
      outline-offset: -3px;
    }

    .courseMeta {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      color: #8ea0b8;
      font-size: 13px;
      font-weight: 900;
      margin: 5px 0 14px;
    }

    .lessonList { display: grid; gap: 12px; }

    .lesson {
      display: flex;
      align-items: center;
      gap: 13px;
      width: 100%;
      border: 1px solid #e0e8f2;
      background: ${dark ? "#1f2937" : "#fff"};
      color: inherit;
      text-align: left;
      padding: 15px;
      border-radius: 23px;
    }

    .lessonNum {
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      border-radius: 13px;
      background: #e1edff;
      color: #2460db;
      font-size: 18px;
      font-weight: 1000;
      flex: 0 0 42px;
    }

    .lesson.done .lessonNum {
      background: #55c900;
      color: white;
    }

    .lessonEmoji { font-size: 23px; }
    .lessonText { flex: 1; min-width: 0; }

    .lessonText b {
      display: block;
      font-size: 15px;
      font-weight: 1000;
    }

    .lessonText small {
      display: block;
      color: #91a0b5;
      font-size: 13px;
      font-weight: 800;
      margin-top: 4px;
    }

    .lessonArrow { color: #0a9e72; font-weight: 1000; }

    .panel {
      border: 1px solid #e1e9f2;
      background: ${dark ? "#1f2937" : "#fff"};
      border-radius: 25px;
      padding: 18px;
      margin-top: 15px;
    }

    .panel h2 { margin: 0 0 7px; font-size: 21px; }
    .panel p { color: #8292a9; font-weight: 700; }

    .search {
      width: 100%;
      padding: 14px 16px;
      border: 1px solid #dfe7f0;
      border-radius: 16px;
      background: ${dark ? "#111827" : "#f8fafc"};
      color: inherit;
      outline: none;
      margin: 10px 0 14px;
    }

    .wordRow {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 0;
      border-bottom: 1px solid #edf0f5;
    }

    .wordRow:last-child { border: 0; }
    .wordInfo { flex: 1; }

    .wordInfo b {
      display: block;
      font-size: 19px;
    }

    .wordInfo small {
      color: #8494aa;
      font-weight: 800;
    }

    .save {
      border: 1px solid #dfe7ef;
      background: transparent;
      border-radius: 12px;
      padding: 9px 12px;
      color: #0a9e72;
      font-weight: 900;
    }

    .chatPanel {
      height: min(58vh, 560px);
      overflow: auto;
      display: flex;
      flex-direction: column;
      gap: 13px;
      padding: 16px;
    }

    .bubble {
      max-width: 88%;
      padding: 14px 16px;
      border-radius: 20px;
      line-height: 1.55;
      white-space: pre-wrap;
      font-weight: 700;
    }

    .bubble.ai {
      align-self: flex-start;
      background: ${dark ? "#263345" : "#f2f5f8"};
      border-bottom-left-radius: 6px;
    }

    .bubble.user {
      align-self: flex-end;
      background: #55c900;
      color: #fff;
      border-bottom-right-radius: 6px;
    }

    .bubble small {
      display: block;
      margin-top: 8px;
      color: #8292a9;
      font-weight: 900;
    }

    .bubble.user small { color: #efffe5; }

    .chatForm {
      display: flex;
      gap: 9px;
      margin-top: 12px;
    }

    .chatForm input {
      flex: 1;
      min-width: 0;
      border: 1px solid #dfe7f0;
      border-radius: 17px;
      padding: 15px;
      background: ${dark ? "#1f2937" : "#fff"};
      color: inherit;
      outline: none;
    }

    .send {
      width: 54px;
      border: 0;
      border-radius: 17px;
      background: #55c900;
      color: white;
      display: grid;
      place-items: center;
    }

    .suggestions {
      display: flex;
      gap: 8px;
      overflow: auto;
      margin: 12px 0;
    }

    .suggestion {
      border: 1px solid #dfe7f0;
      background: ${dark ? "#1f2937" : "#fff"};
      border-radius: 20px;
      padding: 9px 13px;
      white-space: nowrap;
      font-weight: 800;
      color: inherit;
    }

    .bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;
      background: ${dark ? "#111827ee" : "#ffffffed"};
      backdrop-filter: blur(12px);
      border-top: 1px solid #e4eaf2;
    }

    .nav {
      width: min(100%, 760px);
      margin: auto;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      padding: 9px 8px 12px;
    }

    .nav button {
      border: 0;
      background: none;
      color: #71829b;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 1000;
      padding: 5px 0;
    }

    .nav button.active { color: #55c900; }

    .nav .aiNav {
      color: #fff;
      background: #55c900;
      border-radius: 50%;
      width: 56px;
      height: 56px;
      justify-self: center;
      margin-top: -24px;
      border: 5px solid ${dark ? "#111827" : "#f8f9fc"};
      box-shadow: 0 4px 12px #1e293b25;
      font-size: 22px;
    }

    .modalBack {
      position: fixed;
      inset: 0;
      background: #0b172a88;
      z-index: 20;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding: 12px;
    }

    .modal {
      width: min(100%, 620px);
      max-height: 88vh;
      overflow: auto;
      background: ${dark ? "#172033" : "#fff"};
      color: inherit;
      border-radius: 28px 28px 20px 20px;
      padding: 22px;
    }

    .modalTop {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: center;
    }

    .modalTop h2 { margin: 0; font-size: 21px; }

    .close {
      border: 0;
      background: #eef2f7;
      color: #26344a;
      border-radius: 50%;
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
    }

    .tag {
      display: inline-flex;
      padding: 7px 11px;
      border-radius: 12px;
      background: #e9f8ef;
      color: #098b62;
      font-size: 12px;
      font-weight: 1000;
      margin: 8px 5px 8px 0;
    }

    .example {
      background: #f1f8ff;
      border-radius: 17px;
      padding: 15px;
      margin: 14px 0;
      color: #17243a;
    }

    .primary {
      width: 100%;
      border: 0;
      border-radius: 16px;
      padding: 15px;
      background: #55c900;
      color: white;
      font-weight: 1000;
      font-size: 16px;
      margin-top: 12px;
    }

    .choice {
      width: 100%;
      text-align: left;
      border: 1px solid #dfe7f0;
      border-radius: 15px;
      background: transparent;
      color: inherit;
      padding: 13px;
      margin: 6px 0;
      font-weight: 800;
    }

    .choice.selected {
      border: 2px solid #55c900;
      background: #f0ffe8;
    }

    .correct { color: #0a9e72; font-weight: 1000; }
    .wrong { color: #e05b5b; font-weight: 1000; }

    .profileHero {
      display: flex;
      gap: 15px;
      align-items: center;
    }

    .profileAvatar {
      width: 76px;
      height: 76px;
      border-radius: 23px;
      background: #dff7ec;
      display: grid;
      place-items: center;
      font-size: 39px;
    }

    .statGrid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-top: 16px;
    }

    .stat {
      background: ${dark ? "#263345" : "#f5f8fb"};
      border-radius: 17px;
      padding: 14px;
      text-align: center;
    }

    .stat b { display: block; font-size: 22px; }
    .stat small { color: #8797ad; font-weight: 800; }

    @media (max-width: 480px) {
      .wrap { padding: 18px 15px 25px; }
      .brand h1 { font-size: 23px; }
      .hero { padding: 14px; gap: 11px; }
      .avatar {
        width: 70px;
        height: 70px;
        flex-basis: 70px;
        font-size: 37px;
      }
      .heroLine {
        align-items: flex-start;
        flex-direction: column;
        gap: 3px;
      }
      .feature { padding: 14px; min-height: 136px; }
      .feature b { font-size: 14px; }
      .courseMeta { font-size: 11px; }
      .lesson { padding: 13px; }
      .lessonText b { font-size: 14px; }
    }
  `;

  return (
    <div className="app">
      <style>{styles}</style>

      <main className="wrap">
        <header className="top">
          <div className="brand">
            <div className="logo" aria-label="ZiyoPrep mascot">🦉</div>
            <div>
              <h1>ZiyoPrep</h1>
              <p>한글 스튜디오 • 1A–6B</p>
            </div>
          </div>

          <div className="topActions">
            <button className="pill" onClick={() => setTab("profile")}>
              🌐 O‘zbekcha
            </button>
            <button
              className="round"
              aria-label="Theme"
              onClick={() => setDark((v) => !v)}
            >
              <Icon name={dark ? "sun" : "moon"} />
            </button>
          </div>
        </header>

        {tab === "learn" && (
          <>
            <section className="hero">
              <div className="avatar">🦉📘</div>

              <div className="heroMain">
                <div className="heroLine">
                  <strong>Salom, {userName}! 👋</strong>
                  <span className="xp">{xp} XP</span>
                </div>

                <div className="bar">
                  <span
                    style={{
                      width: `${Math.max(8, Math.min(100, xp % 100 || 100))}%`
                    }}
                  />
                </div>

                <div className="stats">
                  🔥 12 kunlik streak&nbsp; • &nbsp;⚡ {xp} XP&nbsp; • &nbsp;❄️ 3
                </div>
              </div>
            </section>

            <button
              className="continue"
              onClick={() =>
                setActiveLesson(
                  courseLessons.find((l) => !done.includes(l.id)) ||
                  courseLessons[0] ||
                  LESSONS[0]
                )
              }
            >
              <span className="play">▶</span>
              <span style={{ flex: 1 }}>
                Davom etish
                <small
                  className="muted"
                  style={{ display: "block", marginTop: 3 }}
                >
                  Oxirgi darsingizni davom ettiring
                </small>
              </span>
              <Icon name="arrow" />
            </button>

            <div className="featureGrid">
              <button
                className="feature purple"
                onClick={() => setTab("words")}
              >
                <span className="featureIcon">단어장</span>
                <b>📚 Lug‘atlar & Savol-Javob</b>
                <small>So‘zlarni o‘rganish va takrorlash</small>
              </button>

              <button
                className="feature blue"
                onClick={() => setTab("ai")}
              >
                <span className="featureIcon">
                  <Icon name="spark" size={25} />
                </span>
                <b>🎭 Dialog Simulator</b>
                <small>Kafe, shifoxona, suhbat</small>
              </button>

              <button
                className="feature green"
                onClick={() => setTab("practice")}
              >
                <span className="featureIcon">가나다</span>
                <b>글자 조립 (Harf)</b>
                <small>Bo‘g‘in yig‘ish va talaffuz</small>
              </button>

              <button
                className="feature"
                style={{ borderColor: "#d8e8fa" }}
                onClick={() => setTab("ai")}
              >
                <span
                  className="featureIcon"
                  style={{ background: "#0aa477" }}
                >
                  AI
                </span>
                <b>Ziyo AI Tutor</b>
                <small>Istalgan savolingizni bering</small>
              </button>
            </div>

            <div className="sectionHead">
              <h2>📖 Koreys tili kurslari</h2>
              <span
                className="muted"
                style={{ fontWeight: 900, fontSize: 12 }}
              >
                {completedCount}/{LESSONS.length} dars
              </span>
            </div>

            <div className="courseScroller">
              {COURSES.map((c) => (
                <button
                  key={c}
                  className={`courseBtn ${course === c ? "active" : ""}`}
                  onClick={() => setCourse(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="courseMeta">
              <span>서울대 한국어 {course}</span>
              <span>
                TOPIK {["1A", "1B"].includes(course) ? "1" : "2"} · Boshlang‘ich kurs
              </span>
            </div>

            <div className="lessonList">
              {courseLessons.length ? (
                courseLessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    className={`lesson ${done.includes(lesson.id) ? "done" : ""}`}
                    onClick={() => setActiveLesson(lesson)}
                  >
                    <span className="lessonNum">
                      {done.includes(lesson.id) ? "✓" : index + 1}
                    </span>
                    <span className="lessonEmoji">{lesson.icon}</span>
                    <span className="lessonText">
                      <b>{lesson.title}</b>
                      <small>{lesson.subtitle}</small>
                    </span>
                    <span className="lessonArrow">›</span>
                  </button>
                ))
              ) : (
                <div className="panel">
                  <b>{course} kursi</b>
                  <p>
                    Bu kurs uchun darslar hali qo‘shilmagan. Hozircha mavjud
                    namunaviy darslardan foydalaning.
                  </p>
                  <button className="primary" onClick={() => setCourse("1A")}>
                    1A kursiga qaytish
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {tab === "words" && (
          <>
            <div className="sectionHead">
              <h2>📚 Lug‘at daftari</h2>
              <span className="muted">{savedWords.length} saqlangan</span>
            </div>

            <div className="panel">
              <h2>Har kuni yangi so‘zlar</h2>
              <p>
                Koreyscha so‘zni eshiting, ma’nosini o‘rganing va keyin takrorlang.
              </p>

              <input
                className="search"
                value={wordSearch}
                onChange={(e) => setWordSearch(e.target.value)}
                placeholder="Koreyscha yoki o‘zbekcha qidiring..."
              />

              {filteredWords.map((word) => (
                <div className="wordRow" key={word.ko}>
                  <div className="wordInfo">
                    <b>{word.ko}</b>
                    <span>{word.uz}</span>
                    <small>{word.type} · {word.level}</small>
                  </div>

                  <button className="save" onClick={() => speak(word.ko)}>
                    🔊
                  </button>

                  <button className="save" onClick={() => toggleSaved(word)}>
                    {savedWords.some((w) => w.ko === word.ko) ? "★" : "☆"}
                  </button>
                </div>
              ))}

              {!filteredWords.length && <p>Bu so‘z topilmadi.</p>}
            </div>

            {savedWords.length > 0 && (
              <div className="panel">
                <h2>⭐ Saqlangan so‘zlar</h2>

                {savedWords.map((w) => (
                  <div className="wordRow" key={w.ko}>
                    <div className="wordInfo">
                      <b>{w.ko}</b>
                      <small>{w.uz}</small>
                    </div>
                    <button className="save" onClick={() => speak(w.ko)}>
                      🔊
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === "ai" && (
          <>
            <div className="sectionHead">
              <h2>✨ Ziyo AI Tutor</h2>
              <span
                style={{
                  color: "#0aa477",
                  fontWeight: 900,
                  fontSize: 12
                }}
              >
                ● Jonli AI ulangan
              </span>
            </div>

            <div className="panel" style={{ padding: 12 }}>
              <div className="chatPanel">
                {chatHistory.map((item, index) =>
                  item.role === "user" ? (
                    <div className="bubble user" key={index}>
                      {item.ko}
                    </div>
                  ) : (
                    <div className="bubble ai" key={index}>
                      <b>🦉 토히르벡 AI</b>
                      <div style={{ marginTop: 7 }}>{item.ko}</div>
                      <small>{item.uz}</small>
                      <button
                        className="link"
                        style={{ padding: "8px 0 0" }}
                        onClick={() => speak(item.ko)}
                      >
                        🔊 Tinglash
                      </button>
                    </div>
                  )
                )}

                {chatBusy && (
                  <div className="bubble ai">AI javob tayyorlamoqda…</div>
                )}

                <div ref={chatEndRef} />
              </div>

              {chatError && (
                <p className="wrong" role="alert">{chatError}</p>
              )}

              <div className="suggestions">
                {[
                  "이에요 va 예요 farqi?",
                  "TOPIK uchun maslahat",
                  "Koreyscha suhbat qilaylik"
                ].map((s) => (
                  <button
                    className="suggestion"
                    key={s}
                    onClick={() => setChatInput(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <form className="chatForm" onSubmit={sendChat}>
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Savolingizni yozing..."
                  aria-label="AI savoli"
                />

                <button
                  className="send"
                  type="submit"
                  disabled={chatBusy || !chatInput.trim()}
                  aria-label="Yuborish"
                >
                  <Icon name="send" />
                </button>
              </form>
            </div>
          </>
        )}

        {tab === "practice" && (
          <>
            <div className="sectionHead">
              <h2>🎯 Mashq markazi</h2>
            </div>

            <div className="featureGrid">
              <button
                className="feature green"
                onClick={() => setActiveLesson(LESSONS[0])}
              >
                <span className="featureIcon">가</span>
                <b>Hangul mashqi</b>
                <small>Harf va bo‘g‘inlarni o‘rganish</small>
              </button>

              <button
                className="feature blue"
                onClick={() => setTab("ai")}
              >
                <span className="featureIcon">
                  <Icon name="mic" />
                </span>
                <b>Speaking</b>
                <small>AI bilan gaplashish</small>
              </button>

              <button
                className="feature purple"
                onClick={() => setTab("words")}
              >
                <span className="featureIcon">가나다</span>
                <b>Vocabulary</b>
                <small>So‘zlarni takrorlash</small>
              </button>

              <button
                className="feature"
                onClick={() => setActiveLesson(LESSONS[1])}
              >
                <span
                  className="featureIcon"
                  style={{ background: "#e49b2c" }}
                >
                  TOPIK
                </span>
                <b>TOPIK mini test</b>
                <small>Namunaviy savollar</small>
              </button>
            </div>

            <div className="panel">
              <h2>Bugungi maqsad</h2>
              <p>
                Bugun 15 daqiqa shug‘ullaning va ketma-ketlikni davom ettiring.
              </p>
              <div className="bar">
                <span
                  style={{
                    width: `${Math.min(100, completedCount * 12)}%`
                  }}
                />
              </div>
              <b>{Math.min(15, completedCount * 2)} / 15 daqiqa</b>
            </div>
          </>
        )}

        {tab === "profile" && (
          <>
            <div className="sectionHead">
              <h2>👤 Profil</h2>
            </div>

            <div className="panel">
              <div className="profileHero">
                <div className="profileAvatar">🦉</div>
                <div>
                  <h2 style={{ margin: 0 }}>{userName}</h2>
                  <p style={{ margin: "5px 0" }}>ZiyoPrep o‘quvchisi</p>
                </div>
              </div>

              <label
                style={{
                  display: "block",
                  marginTop: 20,
                  fontWeight: 900
                }}
              >
                Ismingiz
              </label>

              <input
                className="search"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Ismingiz"
              />

              <div className="statGrid">
                <div className="stat">
                  <b>{xp}</b>
                  <small>Jami XP</small>
                </div>
                <div className="stat">
                  <b>{completedCount}</b>
                  <small>Tugallangan dars</small>
                </div>
                <div className="stat">
                  <b>{savedWords.length}</b>
                  <small>Saqlangan so‘z</small>
                </div>
              </div>
            </div>

            <div className="panel">
              <h2>📈 O‘quv progressi</h2>
              <p>Namunaviy kursdagi darslar bajarilishi</p>
              <div className="bar">
                <span style={{ width: `${progress}%` }} />
              </div>
              <b>{progress}% yakunlangan</b>
            </div>
          </>
        )}
      </main>

      <footer className="bottom">
        <nav className="nav">
          <button
            className={tab === "learn" ? "active" : ""}
            onClick={() => setTab("learn")}
          >
            <Icon name="book" size={24} />
            <span>학습 · Dars</span>
          </button>

          <button
            className={tab === "words" ? "active" : ""}
            onClick={() => setTab("words")}
          >
            <Icon name="words" size={24} />
            <span>단어 · Lug‘at</span>
          </button>

          <button
            className={`aiNav ${tab === "ai" ? "active" : ""}`}
            onClick={() => setTab("ai")}
          >
            <Icon name="spark" size={25} />
          </button>

          <button
            className={tab === "practice" ? "active" : ""}
            onClick={() => setTab("practice")}
          >
            <Icon name="repeat" size={24} />
            <span>복습 · Mashq</span>
          </button>

          <button
            className={tab === "profile" ? "active" : ""}
            onClick={() => setTab("profile")}
          >
            <Icon name="user" size={24} />
            <span>프로필 · Profil</span>
          </button>
        </nav>
      </footer>

      {activeLesson && (
        <div
          className="modalBack"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setActiveLesson(null);
              setQuizChoice("");
              setQuizChecked(false);
            }
          }}
        >
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={activeLesson.title}
          >
            <div className="modalTop">
              <h2>{activeLesson.icon} {activeLesson.title}</h2>
              <button
                className="close"
                onClick={() => setActiveLesson(null)}
              >
                <Icon name="close" />
              </button>
            </div>

            <span className="tag">{activeLesson.course} · Koreys tili</span>
            <span className="tag">+20 XP</span>

            <h3>📌 Grammatika: {activeLesson.grammar}</h3>

            <div className="example">
              <b>{activeLesson.example}</b>
              <p style={{ margin: "7px 0 0" }}>{activeLesson.meaning}</p>
              <button
                className="link"
                onClick={() => speak(activeLesson.example)}
              >
                🔊 Talaffuzni eshitish
              </button>
            </div>

            <h3>🧠 Lug‘at</h3>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {activeLesson.words.map((w) => (
                <button
                  className="tag"
                  key={w}
                  onClick={() => speak(w)}
                >
                  {w} 🔊
                </button>
              ))}
            </div>

            <h3 style={{ marginTop: 20 }}>✏️ Mini test</h3>
            <p>
              “Men koreys tilini o‘rganaman” jumlasining koreyschasi qaysi?
            </p>

            {[
              "저는 한국어를 공부해요.",
              "저는 학교에 있어요.",
              "이거는 사과예요."
            ].map((choice) => (
              <button
                key={choice}
                className={`choice ${quizChoice === choice ? "selected" : ""}`}
                onClick={() => {
                  setQuizChoice(choice);
                  setQuizChecked(false);
                }}
              >
                {choice}
              </button>
            ))}

            {quizChecked && (
              <p
                className={
                  quizChoice === "저는 한국어를 공부해요."
                    ? "correct"
                    : "wrong"
                }
              >
                {quizChoice === "저는 한국어를 공부해요."
                  ? "정답이에요! To‘g‘ri javob! 🎉"
                  : "다시 해 보세요. Yana urinib ko‘ring."}
              </p>
            )}

            {!quizChecked ? (
              <button
                className="primary"
                disabled={!quizChoice}
                onClick={() => setQuizChecked(true)}
              >
                Javobni tekshirish
              </button>
            ) : (
              <button
                className="primary"
                onClick={() =>
                  quizChoice === "저는 한국어를 공부해요."
                    ? completeLesson(activeLesson)
                    : setQuizChecked(false)
                }
              >
                {quizChoice === "저는 한국어를 공부해요."
                  ? "Darsni yakunlash · +20 XP"
                  : "Qayta urinish"}
              </button>
            )}
          </section>
        </div>
      )}
    </div>
  );
}