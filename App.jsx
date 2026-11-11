
import React, { useState } from "react";
import {
  BookOpen, Languages, Headphones, Mic, Brain,
  Trophy, Flame, Target, ChevronRight, Sun, Moon,
  Search, Bell, Menu, X, Bot, Play, Check,
  Clock, Star, Bookmark, Send, Volume2, Sparkles,
  GraduationCap, Globe, CalendarDays, BarChart3,
  MessageCircle, Settings, User, ArrowUpRight
} from "lucide-react";

const courses = [
  {
    id:"english",
    name:"English",
    native:"Ingliz tili",
    flag:"🇬🇧",
    color:"#8B5CF6",
    level:"A2",
    progress:45,
    lessons:32,
    description:"Grammar, vocabulary, IELTS va real English.",
    modules:["Alphabet & Basics","Grammar","Vocabulary","Listening","Speaking","IELTS Preparation"]
  },
  {
    id:"korean",
    name:"한국어",
    native:"Koreys tili",
    flag:"🇰🇷",
    color:"#0EA5E9",
    level:"TOPIK 3",
    progress:62,
    lessons:48,
    description:"Hangul, TOPIK, grammatika va kundalik suhbat.",
    modules:["한글 (Hangul)","문법 (Grammar)","어휘 (Vocabulary)","듣기 (Listening)","말하기 (Speaking)","TOPIK Preparation"]
  }
];

const vocabulary = [
  {language:"English",word:"Improve",translation:"Yaxshilamoq",example:"I want to improve my English."},
  {language:"English",word:"Opportunity",translation:"Imkoniyat",example:"This is a great opportunity."},
  {language:"한국어",word:"발전하다",translation:"Rivojlanmoq",example:"한국어 실력이 발전하고 있어요."},
  {language:"한국어",word:"경험",translation:"Tajriba",example:"좋은 경험이었어요."}
];

const initialTasks = [
  {id:1,title:"English — 10 ta yangi so‘z",time:"10 daqiqa",done:true},
  {id:2,title:"Korean — grammatika mashqi",time:"15 daqiqa",done:false},
  {id:3,title:"English — Listening",time:"15 daqiqa",done:false},
  {id:4,title:"Korean — Speaking",time:"10 daqiqa",done:false}
];

const menu = [
  {id:"home",label:"Bosh sahifa",icon:Target},
  {id:"courses",label:"Kurslar",icon:GraduationCap},
  {id:"vocabulary",label:"Lug‘at",icon:BookOpen},
  {id:"speaking",label:"Speaking Lab",icon:Mic},
  {id:"ai",label:"ZiyoAI",icon:Bot},
  {id:"progress",label:"Natijalar",icon:BarChart3}
];

function Card({children,className=""}) {
  return <div className={`card ${className}`}>{children}</div>;
}

function Progress({value,color="#8B5CF6"}) {
  return <div className="progress"><div style={{width:`${value}%`,background:color}}/></div>;
}

function Heading({title,subtitle,right}) {
  return <div className="heading"><div><h2>{title}</h2>{subtitle&&<p>{subtitle}</p>}</div>{right}</div>;
}

export default function App() {
  const [dark,setDark]=useState(true);
  const [page,setPage]=useState("home");
  const [language,setLanguage]=useState("all");
  const [activeCourse,setActiveCourse]=useState(null);
  const [tasks,setTasks]=useState(initialTasks);
  const [words,setWords]=useState(vocabulary);
  const [search,setSearch]=useState("");
  const [chat,setChat]=useState("");
  const [messages,setMessages]=useState([
    {role:"ai",text:"Salom! Men ZiyoAI. Bugun qaysi tilni o‘rganamiz? English yoki 한국어?"}
  ]);
  const [mobileOpen,setMobileOpen]=useState(false);

  const completed=tasks.filter(t=>t.done).length;

  const go=id=>{
    setPage(id);
    setActiveCourse(null);
    setMobileOpen(false);
    window.scrollTo({top:0,behavior:"smooth"});
  };

  const toggleTask=id=>setTasks(old=>old.map(t=>t.id===id?{...t,done:!t.done}:t));

  const sendChat=()=>{
    if(!chat.trim())return;
    setMessages(old=>[
      ...old,
      {role:"user",text:chat},
      {role:"ai",text:"Bu demo versiya. Haqiqiy AI suhbat uchun xavfsiz backend va AI xizmatini ulash kerak."}
    ]);
    setChat("");
  };

  const toggleWord=word=>setWords(old=>old.filter(w=>w.word!==word));

  return (
    <div className={`app ${dark?"dark":"light"}`}>
      <style>{`
        *{box-sizing:border-box}
        body{margin:0;font-family:Inter,-apple-system,BlinkMacSystemFont,Arial,sans-serif}
        button,input{font:inherit}
        button{cursor:pointer}
        .app{min-height:100vh;background:var(--bg);color:var(--text);transition:.2s}
        .dark{--bg:#0B0B14;--panel:#131321;--card:#171726;--input:#202032;--text:#F7F6FC;--muted:#9695AA;--border:#29283C}
        .light{--bg:#F5F6FA;--panel:#FFFFFF;--card:#FFFFFF;--input:#F0F0F6;--text:#171727;--muted:#77778A;--border:#E6E6EF}
        .layout{display:flex;min-height:100vh}
        .sidebar{width:245px;position:fixed;inset:0 auto 0 0;background:var(--panel);border-right:1px solid var(--border);padding:24px 17px;display:flex;flex-direction:column;z-index:10}
        .logo{display:flex;gap:11px;align-items:center;padding:0 8px 30px}
        .logo-icon{width:43px;height:43px;border-radius:14px;background:linear-gradient(135deg,#9B75FF,#5143C8);display:grid;place-items:center;color:white;font-size:23px;font-weight:900}
        .logo strong{font-size:20px;letter-spacing:-1px}
        .logo small{display:block;color:var(--muted);font-size:9px;letter-spacing:2px;margin-top:3px}
        .nav-label{font-size:10px;color:var(--muted);font-weight:800;letter-spacing:1.5px;margin:12px 12px}
        .nav{display:flex;align-items:center;gap:12px;padding:12px;border:0;background:none;color:var(--muted);width:100%;text-align:left;border-radius:11px;font-size:12px;font-weight:600;margin:3px 0}
        .nav:hover,.nav.active{background:#8B5CF622;color:#A78BFA}
        .nav.active{box-shadow:inset 3px 0 #8B5CF6}
        .sidebar-bottom{margin-top:auto}
        .premium{background:linear-gradient(145deg,#33245D,#1F1B39);padding:16px;border-radius:15px;margin-top:15px}
        .premium h4{font-size:13px;color:white;margin:10px 0 5px}
        .premium p{font-size:10px;color:#C7BCE5;line-height:1.6}
        .premium button{width:100%;padding:10px;border:0;border-radius:9px;background:#B49AFF;color:#21143F;font-weight:800;font-size:11px}
        .main{margin-left:245px;width:calc(100% - 245px);padding:0 35px 50px}
        .topbar{height:75px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;margin-bottom:28px}
        .topbar h3{font-size:14px;margin:0}
        .topbar p{font-size:10px;color:var(--muted);margin:5px 0 0}
        .actions{display:flex;gap:10px;align-items:center}
        .icon-btn{height:38px;width:38px;display:grid;place-items:center;border:1px solid var(--border);background:var(--card);color:var(--text);border-radius:11px}
        .avatar{height:38px;width:38px;border-radius:12px;background:linear-gradient(135deg,#A78BFA,#4F46E5);display:grid;place-items:center;color:white;font-weight:800}
        .content{max-width:1250px;margin:auto}
        .hero{border-radius:22px;padding:30px;background:linear-gradient(110deg,#2C2057,#3B2B78,#28214D);color:white;display:flex;justify-content:space-between;align-items:center;min-height:215px;position:relative;overflow:hidden;margin-bottom:23px}
        .hero:after{content:"";position:absolute;width:290px;height:290px;border:1px solid #FFFFFF22;border-radius:50%;right:80px;top:-150px;box-shadow:0 0 0 35px #FFFFFF08,0 0 0 70px #FFFFFF05}
        .hero-content{z-index:1;max-width:600px}
        .eyebrow{color:#C8B9F7;font-size:10px;font-weight:800;letter-spacing:2px}
        .hero h1{font-size:28px;line-height:1.3;margin:12px 0 8px;letter-spacing:-.8px}
        .hero p{font-size:12px;line-height:1.7;color:#D3C9EA}
        .primary{border:0;border-radius:10px;padding:11px 16px;background:#B49AFF;color:#21143F;font-size:11px;font-weight:800;display:inline-flex;align-items:center;gap:7px}
        .hero-score{text-align:center;position:relative;z-index:1;margin-right:30px}
        .ring{width:120px;height:120px;border-radius:50%;background:conic-gradient(#C4B5FD 0 65%,#FFFFFF22 65%);display:grid;place-items:center;position:relative}
        .ring:before{content:"";position:absolute;inset:9px;background:#302259;border-radius:50%}
        .ring div{z-index:1}
        .ring strong{font-size:32px;display:block}
        .ring small{font-size:9px;color:#D3C9EA}
        .hero-score>small{display:block;margin-top:9px;color:#D3C9EA}
        .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:13px;margin-bottom:28px}
        .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:18px;min-width:0}
        .stat-icon{width:39px;height:39px;border-radius:12px;display:grid;place-items:center}
        .stat-value{font-size:23px;font-weight:800;margin-top:14px}
        .muted{color:var(--muted);font-size:10px}
        .heading{display:flex;align-items:center;justify-content:space-between;margin:27px 0 14px}
        .heading h2{font-size:17px;margin:0}
        .heading p{font-size:10px;color:var(--muted);margin:5px 0 0}
        .link{border:0;background:none;color:#A78BFA;font-size:11px;font-weight:700}
        .course-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
        .course{position:relative;overflow:hidden;transition:.2s;cursor:pointer}
        .course:hover{transform:translateY(-3px);border-color:#8B5CF6}
        .course-top{display:flex;justify-content:space-between;align-items:center}
        .flag{font-size:30px}
        .course h3{font-size:19px;margin:16px 0 5px}
        .course p{font-size:11px;color:var(--muted);line-height:1.7}
        .tag{display:inline-block;padding:6px 9px;border-radius:7px;background:#8B5CF622;color:#A78BFA;font-size:9px;font-weight:800}
        .progress{height:7px;border-radius:20px;background:var(--input);overflow:hidden;margin-top:13px}
        .progress div{height:100%;border-radius:20px}
        .task{display:flex;align-items:center;gap:11px;padding:13px 0;border-bottom:1px solid var(--border)}
        .task:last-child{border:0}
        .check{width:22px;height:22px;border:1px solid var(--border);border-radius:7px;background:var(--input);color:white;display:grid;place-items:center}
        .check.done{background:#8058DB;border-color:#8058DB}
        .task-info{flex:1}
        .task-info strong{font-size:11px}
        .task-info small{display:block;color:var(--muted);font-size:9px;margin-top:4px}
        .columns{display:grid;grid-template-columns:1.2fr .8fr;gap:16px}
        .ai-card{background:linear-gradient(145deg,#28204A,#171525);border:1px solid #6D53A855;border-radius:17px;padding:20px;color:white}
        .ai-card h3{font-size:15px}
        .ai-card p{font-size:11px;color:#C8BDE1;line-height:1.7}
        .ai-card button{background:#B49AFF;color:#21143F;border:0;padding:10px 13px;border-radius:9px;font-weight:800;font-size:11px}
        .page-title{margin:10px 0 25px}
        .page-title h1{font-size:25px;margin:0 0 6px}
        .page-title p{font-size:11px;color:var(--muted)}
        .module-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        .module{cursor:pointer;transition:.2s}
        .module:hover{border-color:#8B5CF6;transform:translateY(-2px)}
        .module h3{font-size:14px;margin:13px 0 5px}
        .module p{font-size:10px;color:var(--muted);line-height:1.6}
        .word{display:flex;align-items:center;gap:12px;border-bottom:1px solid var(--border);padding:14px 0}
        .word:last-child{border:0}
        .word-info{flex:1}
        .word-info strong{font-size:13px}
        .word-info p{font-size:10px;color:var(--muted);margin:5px 0}
        .word-info small{font-size:10px;color:var(--muted);font-style:italic}
        .chat-layout{display:grid;grid-template-columns:1fr 250px;gap:15px}
        .chat{min-height:480px;display:flex;flex-direction:column}
        .chat-body{flex:1;overflow:auto;padding:12px 0}
        .bubble{max-width:85%;font-size:12px;line-height:1.7;padding:12px;border-radius:12px;margin:10px 0}
        .bubble.ai{background:var(--input);border:1px solid var(--border)}
        .bubble.user{background:#6447C4;color:white;margin-left:auto}
        .chat-input{display:flex;gap:8px}
        .chat-input input,.search{background:var(--input);border:1px solid var(--border);border-radius:10px;padding:12px;color:var(--text);outline:none;min-width:0}
        .chat-input input{flex:1}
        .chat-input button{border:0;background:#8058DB;color:white;border-radius:10px;padding:0 14px}
        .vocab-search{display:flex;align-items:center;gap:8px;background:var(--input);border:1px solid var(--border);border-radius:10px;padding:0 12px}
        .vocab-search input{flex:1;border:0;background:none;padding:13px;color:var(--text);outline:none}
        .mobile-nav{display:none}
        .mobile-menu{display:none}
        .footer{text-align:center;color:var(--muted);font-size:9px;padding:30px 0}
        @media(max-width:1000px){.main{padding:0 22px 40px}.stats{grid-template-columns:repeat(2,1fr)}.columns{grid-template-columns:1fr}.module-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:700px){.sidebar{display:none}.main{margin:0;width:100%;padding:0 15px 100px}.topbar{height:64px;margin-bottom:19px}.mobile-menu{display:grid}.hero{padding:22px 18px;min-height:185px}.hero h1{font-size:21px}.hero-score{margin:0}.ring{width:90px;height:90px}.ring strong{font-size:24px}.stats{gap:9px}.card{padding:14px}.course-grid{gap:10px}.course h3{font-size:16px}.module-grid{grid-template-columns:1fr 1fr}.chat-layout{grid-template-columns:1fr}.mobile-nav{display:flex;position:fixed;bottom:0;left:0;right:0;background:var(--panel);border-top:1px solid var(--border);z-index:20;justify-content:space-around;padding:9px 4px calc(9px + env(safe-area-inset-bottom))}.mobile-nav button{display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:0;color:var(--muted);font-size:9px;min-width:0}.mobile-nav button.active{color:#A78BFA}.hero p{font-size:10px}}
        @media(max-width:390px){.hero-score{display:none}.module-grid{grid-template-columns:1fr}}
      `}</style>

      <div className="layout">
        <aside className="sidebar">
          <div className="logo"><div className="logo-icon">Z</div><div><strong>ZiyoPrep</strong><small>LANGUAGE ACADEMY</small></div></div>
          <div className="nav-label">O‘RGANISH</div>
          {menu.map(m=><button key={m.id} className={`nav ${page===m.id?"active":""}`} onClick={()=>go(m.id)}><m.icon size={17}/>{m.label}</button>)}
          <div className="nav-label">SHAXSIY</div>
          <button className="nav" onClick={()=>go("profile")}><User size={17}/> Profil</button>
          <button className="nav" onClick={()=>go("settings")}><Settings size={17}/> Sozlamalar</button>
          <div className="sidebar-bottom"><div className="premium"><Sparkles color="#C4B5FD"/><h4>ZiyoPrep Premium</h4><p>AI suhbat, individual darslar va to‘liq kurslar.</p><button onClick={()=>alert("Premium demo rejimida.")}>Batafsil</button></div></div>
        </aside>

        <main className="main">
          <header className="topbar">
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <button className="icon-btn mobile-menu" onClick={()=>setMobileOpen(!mobileOpen)}><Menu size={17}/></button>
              <div><h3>{menu.find(m=>m.id===page)?.label||"ZiyoPrep"}</h3><p>Har kuni yangi bilim, yangi imkoniyat.</p></div>
            </div>
            <div className="actions">
              <button className="icon-btn" onClick={()=>setDark(!dark)}>{dark?<Sun size={17}/>:<Moon size={17}/>}</button>
              <button className="icon-btn" onClick={()=>alert("Bildirishnomalar yo‘q.")}><Bell size={17}/></button>
              <div className="avatar">T</div>
            </div>
          </header>

          {mobileOpen&&<div style={{position:"fixed",inset:0,background:"var(--panel)",zIndex:40,padding:25}}><button className="icon-btn" onClick={()=>setMobileOpen(false)}><X/></button>{menu.map(m=><button className="nav" key={m.id} onClick={()=>go(m.id)}><m.icon/>{m.label}</button>)}</div>}

          <div className="content">
            {page==="home"&&<Home {...{completed,tasks,toggleTask,go}}/>}
            {page==="courses"&&<Courses {...{setActiveCourse,activeCourse,go}}/>}
            {page==="vocabulary"&&<Vocabulary {...{words,search,setSearch,toggleWord}}/>}
            {page==="speaking"&&<Speaking/>}
            {page==="ai"&&<AI {...{messages,chat,setChat,sendChat}}/>}
            {page==="progress"&&<ProgressPage/>}
            {page==="profile"&&<Profile/>}
            {page==="settings"&&<SettingsPage {...{dark,setDark}}/>}
          </div>
          <div className="footer">ZIYOPREP · Learn languages. Open your world.</div>
        </main>
      </div>

      <nav className="mobile-nav">
        {menu.slice(0,5).map(m=><button key={m.id} className={page===m.id?"active":""} onClick={()=>go(m.id)}><m.icon size={19}/><span>{m.label}</span></button>)}
      </nav>
    </div>
  );
}

function Home({completed,tasks,toggleTask,go}) {
  return <>
    <section className="hero">
      <div className="hero-content">
        <span className="eyebrow">YOUR LANGUAGE JOURNEY</span>
        <h1>Salom! Xush kelibsiz 👋<br/>Bugun nimani o‘rganamiz?</h1>
        <p>Ingliz va koreys tillarini bir joyda, aqlli va samarali o‘rganing.</p>
        <button className="primary" onClick={()=>go("courses")}>Darsni boshlash <ArrowUpRight size={14}/></button>
      </div>
      <div className="hero-score"><div className="ring"><div><strong>68%</strong><small>Umumiy progress</small></div></div><small>Haftalik maqsad</small></div>
    </section>

    <div className="stats">
      <Stat icon={Flame} value="5 kun" label="Ketma-ket o‘rganish" color="#F59E0B"/>
      <Stat icon={Clock} value="12.5 soat" label="O‘qish vaqti" color="#38BDF8"/>
      <Stat icon={BookOpen} value="80 ta" label="Bajarilgan dars" color="#A78BFA"/>
      <Stat icon={Trophy} value="1,250 XP" label="Jami tajriba" color="#34D399"/>
    </div>

    <Heading title="Til akademiyalari" subtitle="O‘zingiz o‘rganmoqchi bo‘lgan tilni tanlang."/>
    <div className="course-grid">
      {courses.map(c=><Card className="course" key={c.id} onClick={()=>go("courses")}>
        <div className="course-top"><span className="flag">{c.flag}</span><span className="tag">{c.level}</span></div>
        <h3>{c.name} · {c.native}</h3><p>{c.description}</p>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginTop:16}}><span className="muted">O‘rganish progressi</span><strong>{c.progress}%</strong></div>
        <Progress value={c.progress} color={c.color}/>
      </Card>)}
    </div>

    <div className="columns">
      <div><Heading title="Bugungi reja" subtitle={`${completed}/${tasks.length} vazifa bajarildi`}/><Card>
        <Progress value={completed/tasks.length*100}/>
        {tasks.map(t=><div className="task" key={t.id}><button className={`check ${t.done?"done":""}`} onClick={()=>toggleTask(t.id)}>{t.done&&<Check size={13}/>}</button><div className="task-info"><strong>{t.title}</strong><small>{t.time}</small></div></div>)}
      </Card></div>
      <div><Heading title="ZiyoAI" subtitle="Sizning AI til murabbiyingiz"/><div className="ai-card"><Bot size={28} color="#C4B5FD"/><h3>Har ikki tilda mashq qiling!</h3><p>AI bilan inglizcha va koreyscha suhbat qiling, yangi so‘zlarni o‘rganing va xatolaringizni tahlil qiling.</p><button onClick={()=>go("ai")}>ZiyoAI bilan suhbat <ChevronRight size={14}/></button></div></div>
    </div>
  </>;
}

function Stat({icon:Icon,value,label,color}) {
  return <Card><div className="stat-icon" style={{background:color+"20",color}}><Icon size={19}/></div><div className="stat-value">{value}</div><div className="muted">{label}</div></Card>;
}

function Courses({setActiveCourse,activeCourse,go}) {
  if(activeCourse) {
    const c=courses.find(x=>x.id===activeCourse);
    return <><div className="page-title"><h1>{c.flag} {c.name} Academy</h1><p>{c.description}</p></div><div className="module-grid">{c.modules.map((m,i)=><Card className="module" key={m}><span className="tag">DARS {i+1}</span><h3>{m}</h3><p>Video, misollar, mashqlar va bilimni tekshirish.</p><button className="primary" onClick={()=>alert("Dars kontenti keyingi bosqichda ulanadi.")}>Darsni ochish <ChevronRight size={14}/></button></Card>)}</div><button className="link" style={{marginTop:25}} onClick={()=>setActiveCourse(null)}>← Kurslarga qaytish</button></>;
  }
  return <><div className="page-title"><h1>Til akademiyalari</h1><p>Ikki til, bitta platforma. O‘zingizga mos yo‘nalishni tanlang.</p></div><div className="course-grid">{courses.map(c=><Card className="course" key={c.id} onClick={()=>setActiveCourse(c.id)}><div className="course-top"><span className="flag">{c.flag}</span><span className="tag">{c.level}</span></div><h3>{c.name} Academy</h3><p>{c.description}</p><Progress value={c.progress} color={c.color}/><button className="primary" style={{marginTop:17}}>Kursga kirish <ChevronRight size={14}/></button></Card>)}</div></>;
}

function Vocabulary({words,search,setSearch,toggleWord}) {
  const filtered=words.filter(w=>(w.word+w.translation+w.language).toLowerCase().includes(search.toLowerCase()));
  return <><div className="page-title"><h1>Smart Vocabulary</h1><p>Ingliz va koreys tillaridagi so‘zlarni o‘rganing.</p></div><Card><div className="vocab-search"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="So‘z qidirish..."/></div>{filtered.map(w=><div className="word" key={w.word}><div className="word-info"><span className="tag">{w.language}</span><strong style={{display:"block",marginTop:8}}>{w.word}</strong><p>{w.translation}</p><small>{w.example}</small></div><button onClick={()=>toggleWord(w.word)} style={{background:"none",border:0,color:"#A78BFA"}}><Bookmark/></button></div>)}</Card></>;
}

function Speaking() {
  const [lang,setLang]=useState("English");
  const [topic,setTopic]=useState("Introduce yourself");
  const [recording,setRecording]=useState(false);
  return <><div className="page-title"><h1>Speaking Studio</h1><p>Inglizcha va koreyscha gapirishni mashq qiling.</p></div><Card><Heading title="Suhbat tilini tanlang"/><div style={{display:"flex",gap:10,marginBottom:20}}>{["English","한국어"].map(x=><button className="primary" style={{opacity:lang===x?1:.55}} onClick={()=>setLang(x)} key={x}>{x}</button>)}</div><span className="tag">PRACTICE TOPIC</span><h2>{topic}</h2><p className="muted">{lang==="English"?"Tell me about yourself and your daily routine.":"자기소개와 일상생활에 대해 이야기해 보세요."}</p><button className="primary" onClick={()=>setRecording(!recording)}><Mic size={16}/>{recording?"Yozishni to‘xtatish":"Ovoz yozishni boshlash"}</button><p className="muted" style={{marginTop:15}}>Bu prototipda ovoz yozish va AI tahlili hali ulanmagan.</p></Card></>;
}

function AI({messages,chat,setChat,sendChat}) {
  return <><div className="page-title"><h1><Sparkles color="#A78BFA"/> ZiyoAI Tutor</h1><p>Ingliz va koreys tillarida aqlli suhbatdosh.</p></div><div className="chat-layout"><Card className="chat"><div style={{display:"flex",alignItems:"center",gap:10,borderBottom:"1px solid var(--border)",paddingBottom:13}}><Bot color="#A78BFA" size={25}/><div><strong>ZiyoAI</strong><div className="muted">Demo rejim</div></div></div><div className="chat-body">{messages.map((m,i)=><div className={`bubble ${m.role}`} key={i}>{m.text}</div>)}</div><div className="chat-input"><input value={chat} onChange={e=>setChat(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Savolingizni yozing..."/><button onClick={sendChat}><Send size={16}/></button></div></Card><Card><strong>Tezkor mashqlar</strong>{["English speaking","Korean speaking","Grammar explanation","Vocabulary quiz"].map(t=><button className="nav" key={t} onClick={()=>setChat(t)}><Sparkles size={15}/>{t}</button>)}<p className="muted" style={{lineHeight:1.7}}>Haqiqiy AI javoblari uchun server integratsiyasi zarur.</p></Card></div></>;
}

function ProgressPage() {
  return <><div className="page-title"><h1>O‘quv natijalari</h1><p>Har ikki til bo‘yicha rivojlanishingiz.</p></div><div className="course-grid">{courses.map(c=><Card key={c.id}><span className="flag">{c.flag}</span><h2>{c.name}</h2><strong style={{fontSize:24}}>{c.progress}%</strong><Progress value={c.progress} color={c.color}/><p className="muted">{c.level} · {c.lessons} dars</p></Card>)}</div><Heading title="Mening yutuqlarim"/><Card><Trophy color="#EAB308"/><h3>Learning Champion</h3><p className="muted">Davom eting! Yangi yutuqlar sizni kutmoqda.</p></Card></>;
}

function Profile() {
  return <><div className="page-title"><h1>Profil</h1><p>Shaxsiy ma’lumotlar va o‘quv maqsadlari.</p></div><Card><div className="avatar" style={{width:65,height:65,fontSize:24}}>T</div><h2>Tokhirbek</h2><span className="tag">Language Learner</span><p className="muted">O‘rganayotgan tillar: English, 한국어</p><p className="muted">Maqsad: Ingliz va koreys tillarida erkin muloqot qilish.</p></Card></>;
}

function SettingsPage({dark,setDark}) {
  return <><div className="page-title"><h1>Sozlamalar</h1><p>Ilovani o‘zingizga moslang.</p></div><Card><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><strong>Dark / Light Mode</strong><button className="primary" onClick={()=>setDark(!dark)}>{dark?"Dark":"Light"} <Sun size={14}/></button></div></Card></>;
}
