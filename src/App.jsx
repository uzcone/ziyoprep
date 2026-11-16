import React, { useState } from "react";
import {
  Bell, UserRound, ChevronRight, Flame, Star, Play,
  BookOpen, Headphones, Mic, Sparkles, Dumbbell,
  Home, Moon, Sun, CheckCircle2, Clock3, X,
  Search, Send, Volume2, ArrowRight, Trophy, Target
} from "lucide-react";
import "./App.css";

const COURSES = [
  "1A", "1B", "2A", "2B", "3A", "3B",
  "4A", "4B", "5A", "5B", "6A", "6B"
];

const LESSONS = [
  {
    id: 1,
    title: "안녕하세요? (Tanishuv)",
    subtitle: "Men O'zbekistonlikman",
    duration: "5 daqiqa"
  },
  {
    id: 2,
    title: "이거 뭐예요? (Buyumlar)",
    subtitle: "Bu koreys tili lug'ati",
    duration: "7 daqiqa"
  },
  {
    id: 3,
    title: "한국어를 공부해요 (Kundalik ishlar)",
    subtitle: "Kutubxonada koreys tilini o'rganaman",
    duration: "8 daqiqa"
  },
  {
    id: 4,
    title: "어디에 있어요? (Joylashuv)",
    subtitle: "Bank kasalxonaning yonida joylashgan",
    duration: "6 daqiqa"
  },
  {
    id: 5,
    title: "주말에 친구를 만났어요 (O'tgan zamon)",
    subtitle: "Kecha do'stim bilan kino ko'rdim",
    duration: "8 daqiqa"
  },
  {
    id: 6,
    title: "얼마예요? (Xarid va sonlar)",
    subtitle: "Beshta olma va ikkita apelsin bering",
    duration: "7 daqiqa"
  },
  {
    id: 7,
    title: "날씨가 어때요? (Ob-havo va fasllar)",
    subtitle: "Koreyada bahorda havo iliq bo'ladi",
    duration: "5 daqiqa"
  },
  {
    id: 8,
    title: "주말에 같이 영화 볼까요? (Taklif)",
    subtitle: "Shanba tushdan keyin birga chiqaylikmi?",
    duration: "6 daqiqa"
  }
];

const NAV = [
  { id: "home", label: "Bosh sahifa", icon: Home },
  { id: "vocab", label: "Lug'at", icon: BookOpen },
  { id: "ai", label: "AI ustoz", icon: Sparkles },
  { id: "practice", label: "Mashq", icon: Dumbbell },
  { id: "profile", label: "Profil", icon: UserRound }
];

export default function App() {
  const [course, setCourse] = useState("1A");
  const [activeTab, setActiveTab] = useState("home");
  const [dark, setDark] = useState(false);

  const [completed, setCompleted] = useState([1, 2, 3, 4, 5, 6]);

  const [selectedLesson, setSelectedLesson] = useState(null);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([
    {
      from: "ai",
      text: "안녕하세요! 오늘은 어떤 한국어 표현을 연습해 볼까요?"
    }
  ]);

  const currentLesson =
    LESSONS.find(x => !completed.includes(x.id)) || LESSONS[0];

  const progress = Math.round(
    (completed.length / LESSONS.length) * 100
  );

  const finishLesson = (id) => {
    setCompleted(prev =>
      prev.includes(id) ? prev : [...prev, id]
    );
    setSelectedLesson(null);
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    setChat(prev => [
      ...prev,
      { from: "user", text: message.trim() },
      {
        from: "ai",
        text: "Yaxshi! Bu iborani birga mashq qilamiz. Koreyscha javob yozib ko'ring: 오늘 날씨가 어때요?"
      }
    ]);

    setMessage("");
  };

  return (
    <div className={dark ? "zp-app dark" : "zp-app"}>
      <div className="zp-shell">

        {/* HEADER */}

        <header className="topbar">
          <div className="brand">
            <div className="brand-mark">
              <BookOpen size={22} />
            </div>
            <span>Ziyo<span>Prep</span></span>
          </div>

          <div className="top-actions">
            <button className="icon-button">
              <Bell size={19} />
            </button>

            <button
              className="icon-button"
              onClick={() => setDark(!dark)}
            >
              {dark ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            <button
              className="avatar"
              onClick={() => setActiveTab("profile")}
            >
              <UserRound size={21} />
            </button>
          </div>
        </header>

        <main>

          {/* HOME */}

          {activeTab === "home" && (
            <>

              <section className="welcome">
                <p className="eyebrow">
                  BUGUNGI O'QUV REJANGIZ
                </p>

                <h1>Salom, Tokhirbek! 👋</h1>

                <p className="muted">
                  Bugun ham oz-ozdan oldinga intilamiz.
                </p>
              </section>

              {/* PROGRESS */}

              <section className="progress-card">

                <div
                  className="progress-ring"
                  style={{ "--progress": `${progress}%` }}
                >
                  <div>
                    <strong>{progress}%</strong>
                    <small>progress</small>
                  </div>
                </div>

                <div className="progress-info">

                  <div className="card-topline">
                    <span className="eyebrow">
                      JORIY KURS
                    </span>

                    <span className="course-pill">
                      {course}
                    </span>
                  </div>

                  <h2>Koreys tili · {course}</h2>

                  <div className="progress-track">
                    <span style={{ width: `${progress}%` }} />
                  </div>

                  <div className="stats-line">
                    <span>
                      <Flame size={16} />
                      23 kunlik streak
                    </span>

                    <i />

                    <span>
                      <Star size={16} />
                      2620 XP
                    </span>
                  </div>

                </div>

                <button
                  className="plain-arrow"
                  onClick={() => setActiveTab("profile")}
                >
                  <ChevronRight />
                </button>

              </section>

              {/* CONTINUE LEARNING */}

              <section className="continue-card">

                <div className="continue-copy">

                  <span className="continue-label">
                    <Play size={13} fill="currentColor" />
                    DAVOM ETTIRISH
                  </span>

                  <p className="eyebrow light">
                    KEYINGI DARS
                  </p>

                  <h2>{currentLesson.title}</h2>

                  <p className="continue-sub">
                    {currentLesson.subtitle}
                  </p>

                  <div className="lesson-meta">
                    <Clock3 size={16} />
                    {currentLesson.duration}
                  </div>

                  <button
                    className="start-button"
                    onClick={() => setSelectedLesson(currentLesson)}
                  >
                    Darsni boshlash
                    <ArrowRight size={17} />
                  </button>

                </div>

                <div className="continue-art">
                  <div className="sun-orb" />
                  <div className="mountain mountain-back" />
                  <div className="mountain mountain-front" />
                  <div className="tower"><span /></div>
                  <div className="petal petal-one">✿</div>
                  <div className="petal petal-two">✿</div>
                </div>

              </section>

              {/* QUICK ACTIONS */}

              <section className="quick-grid">

                <button
                  className="quick-card lavender"
                  onClick={() => setActiveTab("vocab")}
                >
                  <span className="quick-icon">
                    <BookOpen />
                  </span>
                  <strong>So'z yodlash</strong>
                  <small>Bugun 20 ta so'z</small>
                </button>

                <button
                  className="quick-card mint"
                  onClick={() => setActiveTab("practice")}
                >
                  <span className="quick-icon">
                    <Headphones />
                  </span>
                  <strong>Tinglash</strong>
                  <small>10 daqiqa</small>
                </button>

                <button
                  className="quick-card peach"
                  onClick={() => setActiveTab("ai")}
                >
                  <span className="quick-icon">
                    <Mic />
                  </span>
                  <strong>Gapirish</strong>
                  <small>5 daqiqa</small>
                </button>

              </section>

              {/* COURSE SELECTION */}

              <section className="section-block">

                <div className="section-heading">
                  <div>
                    <p className="eyebrow">
                      O'RGANISH DARAJASI
                    </p>
                    <h2>Kursni tanlang</h2>
                  </div>

                  <span className="section-count">
                    12 ta kurs
                  </span>
                </div>

                <div className="course-grid">
                  {COURSES.map(c => (
                    <button
                      key={c}
                      className={
                        course === c
                          ? "course-option selected"
                          : "course-option"
                      }
                      onClick={() => setCourse(c)}
                    >
                      {c}
                      {course === c && (
                        <span className="selected-dot" />
                      )}
                    </button>
                  ))}
                </div>

              </section>

              {/* MOTIVATION */}

              <section className="motivation">
                <div className="owl">🦉</div>

                <div>
                  <strong>
                    Bugun ham ajoyib ish qildingiz!
                  </strong>
                  <p>
                    Har kuni 15 daqiqa — katta natija sari qadam.
                  </p>
                </div>

                <Trophy className="motivation-trophy" />
              </section>

              {/* LESSONS */}

              <section className="section-block lesson-section">

                <div className="section-heading">
                  <div>
                    <p className="eyebrow">KURS DASTURI</p>
                    <h2>{course} darslari</h2>
                  </div>

                  <span className="section-count">
                    {completed.length}/{LESSONS.length} tugallangan
                  </span>
                </div>

                <div className="lesson-list">

                  {LESSONS.map((lesson, i) => {
                    const done = completed.includes(lesson.id);

                    return (
                      <button
                        className="lesson-row"
                        key={lesson.id}
                        onClick={() => setSelectedLesson(lesson)}
                      >
                        <span className={
                          done
                            ? "lesson-number done"
                            : "lesson-number"
                        }>
                          {done
                            ? <CheckCircle2 size={19} />
                            : String(i + 1).padStart(2, "0")}
                        </span>

                        <span className="lesson-text">
                          <strong>{lesson.title}</strong>
                          <small>{lesson.subtitle}</small>
                        </span>

                        <ChevronRight className="lesson-chevron" />
                      </button>
                    );
                  })}

                </div>
              </section>

            </>
          )}

          {/* VOCABULARY */}

          {activeTab === "vocab" && (
            <section className="page-section">

              <p className="eyebrow">SO'Z BOYLIGINGIZ</p>
              <h1>Lug'at</h1>

              <p className="muted">
                Yangi so'zlarni o'rganing va takrorlang.
              </p>

              <div className="search-box">
                <Search size={18} />

                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="So'z qidirish..."
                />
              </div>

              {[
                "안녕하세요 — Salom",
                "감사합니다 — Rahmat",
                "학교 — Maktab",
                "친구 — Do'st",
                "날씨 — Ob-havo"
              ]
                .filter(x =>
                  x.toLowerCase().includes(query.toLowerCase())
                )
                .map((word, i) => (
                  <div className="vocab-row" key={word}>
                    <span className="vocab-index">{i + 1}</span>
                    <strong>{word}</strong>
                    <button className="sound-button">
                      <Volume2 size={18} />
                    </button>
                  </div>
                ))}

            </section>
          )}

          {/* AI TUTOR */}

          {activeTab === "ai" && (
            <section className="page-section ai-page">

              <div className="ai-heading">
                <div className="ai-orb">
                  <Sparkles />
                </div>

                <div>
                  <p className="eyebrow">ZIYOPREP AI</p>
                  <h1>AI ustoz</h1>
                  <p className="muted">
                    Koreys tilida suhbatni mashq qiling.
                  </p>
                </div>
              </div>

              <div className="chat-box">
                {chat.map((m, i) => (
                  <div
                    key={i}
                    className={`chat-bubble ${m.from}`}
                  >
                    {m.text}
                  </div>
                ))}
              </div>

              <div className="chat-input">

                <input
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={e =>
                    e.key === "Enter" && sendMessage()
                  }
                  placeholder="Javobingizni yozing..."
                />

                <button onClick={sendMessage}>
                  <Send size={18} />
                </button>

              </div>

              <p className="small-note">
                Bu demo chat. Haqiqiy AI javoblari uchun AI API ulanishi kerak.
              </p>

            </section>
          )}

          {/* PRACTICE */}

          {activeTab === "practice" && (
            <section className="page-section">

              <p className="eyebrow">
                KO'NIKMALARNI MUSTAHKAMLASH
              </p>

              <h1>Mashq</h1>

              <p className="muted">
                Bugun qaysi ko'nikmani rivojlantiramiz?
              </p>

              <div className="practice-list">

                {[
                  ["Tinglab tushunish", "Audio orqali koreys tilini tushuning", Headphones, "mint"],
                  ["Talaffuz", "So'zlarni ovoz chiqarib mashq qiling", Mic, "peach"],
                  ["Grammatika", "Qisqa testlar bilan bilimingizni tekshiring", Target, "lavender"]
                ].map(([title, desc, Icon, color]) => (
                  <button className="practice-card" key={title}>

                    <span className={`practice-icon ${color}`}>
                      <Icon />
                    </span>

                    <span>
                      <strong>{title}</strong>
                      <small>{desc}</small>
                    </span>

                    <ChevronRight />

                  </button>
                ))}

              </div>
            </section>
          )}

          {/* PROFILE */}

          {activeTab === "profile" && (
            <section className="page-section">

              <p className="eyebrow">SHAXSIY KABINET</p>
              <h1>Profil</h1>

              <div className="profile-card">

                <div className="profile-avatar">
                  <UserRound size={32} />
                </div>

                <h2>Tokhirbek</h2>

                <p className="muted">
                  ZiyoPrep o'quvchisi
                </p>

                <div className="profile-stats">
                  <div>
                    <strong>2620</strong>
                    <small>XP</small>
                  </div>

                  <div>
                    <strong>23</strong>
                    <small>Kun streak</small>
                  </div>

                  <div>
                    <strong>{progress}%</strong>
                    <small>Progress</small>
                  </div>
                </div>

              </div>

              <div className="settings-row">
                <span>Ko'rinish</span>

                <button
                  className="setting-toggle"
                  onClick={() => setDark(!dark)}
                >
                  {dark ? "Dark mode" : "Light mode"}
                  {dark ? <Sun size={17} /> : <Moon size={17} />}
                </button>
              </div>

            </section>
          )}

        </main>

        {/* BOTTOM NAVIGATION */}

        <nav className="bottom-nav">

          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={
                activeTab === id
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() => setActiveTab(id)}
            >
              <span>
                <Icon size={21} />
              </span>
              <small>{label}</small>
            </button>
          ))}

        </nav>

      </div>

      {/* LESSON MODAL */}

      {selectedLesson && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedLesson(null)}
        >
          <div
            className="lesson-modal"
            onClick={e => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setSelectedLesson(null)}
            >
              <X size={20} />
            </button>

            <span className="modal-kicker">
              ZIYOPREP · {course}
            </span>

            <div className="modal-symbol">
              <BookOpen size={30} />
            </div>

            <h2>{selectedLesson.title}</h2>

            <p>{selectedLesson.subtitle}</p>

            <div className="modal-meta">
              <Clock3 size={16} />
              {selectedLesson.duration}
            </div>

            <div className="sample-question">
              <strong>BUGUNGI IFODA</strong>

              <p>
                안녕하세요? 만나서 반가워요.
              </p>

              <small>
                Salom. Tanishganimdan xursandman.
              </small>
            </div>

            <button
              className="primary-button"
              onClick={() => finishLesson(selectedLesson.id)}
            >
              Darsni tugallangan deb belgilash
              <CheckCircle2 size={18} />
            </button>

          </div>
        </div>
      )}

    </div>
  );
}