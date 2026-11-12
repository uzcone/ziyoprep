import React, { useState } from 'react';
import { 
  Flame, 
  ArrowRight, 
  Moon, 
  Sun, 
  Compass, 
  GraduationCap, 
  Bot, 
  Award, 
  User, 
  CheckCircle2, 
  Play, 
  Lock,
  Sparkles
} from 'lucide-react';

const LESSONS_DATA = {
  korean: [
    {
      id: 1,
      title: "1-dars: Hangul Fonetikasi & Yozilishi",
      subtitle: "Unlilar, undoshlar va bo‘g‘in arxitekturasi",
      status: "completed",
      duration: "15 daqiqa"
    },
    {
      id: 2,
      title: "2-dars: Bo‘g‘in Birlashtirish & Batchim (받침)",
      subtitle: "Pastki undoshlar va fonetik o‘zgarishlar",
      status: "current",
      duration: "20 daqiqa"
    },
    {
      id: 3,
      title: "3-dars: Hozirgi Zamon (-아요 / -어요)",
      subtitle: "Fe’l va sifatlarni xushmuomala tuslash qoidalari",
      status: "locked",
      duration: "25 daqiqa"
    },
    {
      id: 4,
      title: "4-dars: EPS-TOPIK Ishlab Chiqarish & Xavfsizlik",
      subtitle: "Zavod va qurilishdagi xavfsizlik protokollari (산업 안전)",
      status: "locked",
      duration: "30 daqiqa"
    },
    {
      id: 5,
      title: "5-dars: TOPIK II (54-masala) Insho Standarti",
      subtitle: "700 so‘zlik akademik insho yozish metodologiyasi",
      status: "locked",
      duration: "40 daqiqa"
    }
  ],
  english: [
    {
      id: 1,
      title: "Lesson 1: IELTS Band 7.5+ Strategy",
      subtitle: "Exam structure, time management & scoring criteria",
      status: "completed",
      duration: "18 mins"
    },
    {
      id: 2,
      title: "Lesson 2: Academic Reading Skimming",
      subtitle: "True/False/Not Given & Matching Headings mastery",
      status: "current",
      duration: "25 mins"
    },
    {
      id: 3,
      title: "Lesson 3: Writing Task 2 Cohesion",
      subtitle: "Complex sentence structures & C1 lexical resource",
      status: "locked",
      duration: "35 mins"
    }
  ]
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true); // Zamonaviy Dark Mode sukut bo'yicha yoqilgan
  const [academy, setAcademy] = useState('korean');
  const [activeTab, setActiveTab] = useState('home');

  const lessons = LESSONS_DATA[academy];
  const completedCount = lessons.filter(l => l.status === 'completed').length;
  const currentLesson = lessons.find(l => l.status === 'current') || lessons[0];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-28 font-sans">
        
        {/* Top Header */}
        <header className="sticky top-0 z-30 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 px-4 py-3.5">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20">
                F
              </div>
              <div>
                <h1 className="font-bold text-base leading-tight tracking-tight">
                  Fariza Academy
                </h1>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Har kuni yangi bilim, yangi imkoniyat
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Mavzuni o‘zgartirish"
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800/90 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-semibold text-sm flex items-center justify-center shadow-sm">
                T
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-md mx-auto px-4 pt-5 space-y-6">
          
          {/* Hero Card */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-5 shadow-xl shadow-indigo-950/20 border border-indigo-500/20">
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
            
            {/* Badges */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-indigo-500/25 text-indigo-200 border border-indigo-400/20">
                {academy === 'korean' ? 'Koreys tili akademiyasi' : 'Ingliz tili akademiyasi'}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-400/20">
                <Flame size={14} className="fill-amber-400 text-amber-400" />
                5 KUNLIK STREAK
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight mb-1">
              Salom, Tokhirbek! 👋
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-5">
              Professional darsliklar, chuqur tahlillar va audio mashg‘ulotlar platformasi.
            </p>

            {/* Next Task Box */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-3.5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-indigo-300 mb-0.5">
                  Navbatdagi vazifa:
                </span>
                <p className="text-xs font-medium text-white truncate">
                  {currentLesson.title}
                </p>
              </div>
              <button className="shrink-0 flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl transition shadow-md shadow-indigo-600/30">
                <span>Darsga kirish</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </section>

          {/* Academy Switcher */}
          <section className="p-1.5 rounded-2xl bg-slate-200/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setAcademy('english')}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                academy === 'english'
                  ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <span className="text-base">🇬🇧</span>
              <span>English Academy</span>
            </button>

            <button
              onClick={() => setAcademy('korean')}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                academy === 'korean'
                  ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <span className="text-base">🇰🇷</span>
              <span>Korean Academy</span>
            </button>
          </section>

          {/* Roadmap Section (Toza bir ustunli va o'qishga qulay dizayn) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Darslar Yo‘lagi
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Professional Roadmap
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-300">
                {completedCount} / {lessons.length} o‘rganildi
              </span>
            </div>

            {/* Vertical Timeline */}
            <div className="relative pl-4 space-y-3.5">
              {/* Timeline Vertical Line */}
              <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-800" />

              {lessons.map((lesson) => {
                const isCompleted = lesson.status === 'completed';
                const isCurrent = lesson.status === 'current';
                const isLocked = lesson.status === 'locked';

                return (
                  <div
                    key={lesson.id}
                    className={`relative flex items-start gap-3.5 p-3.5 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-white dark:bg-slate-900 border-indigo-500/60 shadow-md shadow-indigo-500/10'
                        : isCompleted
                        ? 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
                        : 'bg-slate-100/70 dark:bg-slate-900/30 border-slate-200/60 dark:border-slate-800/60 opacity-75'
                    }`}
                  >
                    {/* Node Icon */}
                    <div
                      className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        isCompleted
                          ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                          : isCurrent
                          ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/20'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {isCompleted && <CheckCircle2 size={16} />}
                      {isCurrent && <Play size={13} className="fill-white ml-0.5" />}
                      {isLocked && <Lock size={13} />}
                    </div>

                    {/* Lesson Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            isCompleted
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : isCurrent
                              ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                              : 'bg-slate-200/70 dark:bg-slate-800 text-slate-500'
                          }`}
                        >
                          {isCompleted ? 'Yakunlangan' : isCurrent ? 'Jarayonda' : lesson.duration}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug mb-1">
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {lesson.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 inset-x-0 z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-2 py-2">
          <div className="max-w-md mx-auto grid grid-cols-5 items-center">
            <NavButton
              icon={<Compass size={20} />}
              label="Asosiy"
              active={activeTab === 'home'}
              onClick={() => setActiveTab('home')}
            />
            <NavButton
              icon={<GraduationCap size={20} />}
              label="Darslar"
              active={activeTab === 'lessons'}
              onClick={() => setActiveTab('lessons')}
            />

            {/* Center AI Action Button */}
            <div className="flex flex-col items-center -mt-6">
              <button
                onClick={() => setActiveTab('ai')}
                className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/35 hover:scale-105 active:scale-95 transition"
              >
                <Bot size={24} />
              </button>
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mt-1 flex items-center gap-0.5">
                FarizaAI <Sparkles size={9} />
              </span>
            </div>

            <NavButton
              icon={<Award size={20} />}
              label="Imtihon"
              active={activeTab === 'exam'}
              onClick={() => setActiveTab('exam')}
            />
            <NavButton
              icon={<User size={20} />}
              label="Profil"
              active={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')}
            />
          </div>
        </nav>

      </div>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center py-1 gap-1 transition ${
        active
          ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
          : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
      }`}
    >
      {icon}
      <span className="text-[10px]">{label}</span>
    </button>
  );
}
