import { useState, useEffect, useRef } from "react";

const Icon = ({ name, className = "w-6 h-6", style }: any) => {
  const icons = {
    arrow: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>,
    check: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
    mail: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    lightning: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    location: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    users: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    target: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    sparkle: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    chart: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    handshake: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg>,
    calendar: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    beaker: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
    rocket: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>,
    phone: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    x: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
    menu: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>,
    shield: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    eye: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
    academic: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>,
    plus: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
    send: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
  };
  return icons[name as keyof typeof icons] || null;
};

// ── AVATARS ───────────────────────────────────────────────────────────────────
const TeddyIcon = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <defs>
      <linearGradient id="tb" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1f1f1f"/><stop offset="100%" stopColor="#0a0a0a"/></linearGradient>
      <linearGradient id="sk" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FDDCBD"/><stop offset="100%" stopColor="#F5C9A8"/></linearGradient>
    </defs>
    <circle cx="60" cy="60" r="60" fill="url(#tb)"/>
    <ellipse cx="60" cy="105" rx="28" ry="22" fill="#7a1c1c"/>
    <circle cx="60" cy="52" r="26" fill="url(#sk)"/>
    <ellipse cx="48" cy="50" rx="3" ry="4" fill="#2D2D2D"/><ellipse cx="72" cy="50" rx="3" ry="4" fill="#2D2D2D"/>
    <ellipse cx="49" cy="49" rx="1.5" ry="1.5" fill="#fff"/><ellipse cx="73" cy="49" rx="1.5" ry="1.5" fill="#fff"/>
    <path d="M54,64 Q60,70 66,64" stroke="#C9907A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M34,42 Q36,20 60,18 Q84,20 86,42" fill="#C44536"/>
    <ellipse cx="60" cy="24" rx="20" ry="10" fill="#C44536"/>
  </svg>
);
const JTIcon = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <defs><linearGradient id="sk2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FDDCBD"/><stop offset="100%" stopColor="#F5C9A8"/></linearGradient></defs>
    <circle cx="60" cy="60" r="60" fill="#1a1a1a"/>
    <ellipse cx="60" cy="105" rx="30" ry="22" fill="#1C1917"/>
    <circle cx="60" cy="52" r="26" fill="url(#sk2)"/>
    <ellipse cx="48" cy="50" rx="3" ry="4" fill="#2D2D2D"/><ellipse cx="72" cy="50" rx="3" ry="4" fill="#2D2D2D"/>
    <path d="M52,66 L68,66" stroke="#C9907A" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M32,38 Q32,16 60,16 Q88,16 88,38" fill="#4A3728"/>
    <ellipse cx="60" cy="20" rx="14" ry="6" fill="#4A3728"/>
  </svg>
);
const JackIcon = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <defs><linearGradient id="sk3" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FDDCBD"/><stop offset="100%" stopColor="#F5C9A8"/></linearGradient></defs>
    <circle cx="60" cy="60" r="60" fill="#1a1a1a"/>
    <ellipse cx="60" cy="105" rx="28" ry="22" fill="#18181B"/>
    <circle cx="60" cy="52" r="26" fill="url(#sk3)"/>
    <ellipse cx="48" cy="50" rx="3" ry="4" fill="#2D2D2D"/><ellipse cx="72" cy="50" rx="3" ry="4" fill="#2D2D2D"/>
    <path d="M52,65 Q60,71 68,65" stroke="#C9907A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M32,46 Q32,14 60,14 Q88,14 88,46 L84,42 Q82,22 60,22 Q38,22 36,42 Z" fill="#3D2B1F"/>
  </svg>
);
const ZachIcon = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <defs><linearGradient id="sk4" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FDDCBD"/><stop offset="100%" stopColor="#F5C9A8"/></linearGradient></defs>
    <circle cx="60" cy="60" r="60" fill="#1a1a1a"/>
    <ellipse cx="60" cy="105" rx="28" ry="22" fill="#1E3A5F"/>
    <circle cx="60" cy="52" r="26" fill="url(#sk4)"/>
    <ellipse cx="48" cy="50" rx="2.5" ry="3.5" fill="#2D2D2D"/><ellipse cx="72" cy="50" rx="2.5" ry="3.5" fill="#2D2D2D"/>
    <path d="M54,64 Q60,68 66,64" stroke="#C9907A" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M36,42 Q38,20 60,20 Q82,20 84,42 L80,38 Q78,26 60,26 Q42,26 40,38 Z" fill="#5C4033"/>
  </svg>
);

// ── LOGOS ─────────────────────────────────────────────────────────────────────
const AC = { primary:'#7a1c1c', text:'#b05252', textHover:'#c97070', primaryLight:'rgba(122,28,28,0.18)', primaryGlow:'rgba(122,28,28,0.4)', primaryBorder:'rgba(122,28,28,0.5)', particleRgb:'122,28,28' };

const RallyWordmark = ({ className = '' }) => (
  <svg viewBox="0 0 320 100" className={className}>
    <text x="8" y="72" fontFamily="Georgia,serif" fontWeight="900" fontSize="68" fill="white" letterSpacing="-2">Rally</text>
    <text x="168" y="72" fontFamily="Georgia,serif" fontWeight="900" fontSize="44" fill={AC.primary}>co</text>
    <path d="M230,85 L230,55 L250,55 L250,48 L260,48 L260,55 L290,55 L290,85 Z" fill={AC.primary}/>
    <path d="M228,57 L260,43 L292,57 Z" fill={AC.primary}/>
    <rect x="253" y="30" width="14" height="28" fill="#1a1a1a" stroke={AC.primary} strokeWidth="1"/>
    <circle cx="260" cy="39" r="5" fill="white" opacity="0.9"/>
    <line x1="260" y1="36" x2="260" y2="39" stroke="#1a1a1a" strokeWidth="1"/>
    <line x1="260" y1="39" x2="262.5" y2="39" stroke="#1a1a1a" strokeWidth="1"/>
    <polygon points="253,30 267,30 260,18" fill={AC.primary}/>
    <line x1="260" y1="18" x2="260" y2="8" stroke="#1a1a1a" strokeWidth="1.5"/>
    <polygon points="260,8 272,11 260,14" fill={AC.primary}/>
    <rect x="235" y="62" width="8" height="8" fill="white" opacity="0.3"/>
    <rect x="248" y="62" width="8" height="8" fill="white" opacity="0.3"/>
    <rect x="272" y="62" width="8" height="8" fill="white" opacity="0.3"/>
    <rect x="285" y="62" width="8" height="8" fill="white" opacity="0.3"/>
    <line x1="220" y1="85" x2="300" y2="85" stroke={AC.primary} strokeWidth="1.5"/>
  </svg>
);

const NavLogo = () => (
  <svg viewBox="0 0 56 44" width="56" height="44">
    <text x="4" y="32" fontFamily="Impact,Arial Black,sans-serif" fontWeight="900" fontSize="34" fill="#1a1a1a">R</text>
    <text x="3" y="31" fontFamily="Impact,Arial Black,sans-serif" fontWeight="900" fontSize="34" fill="white">R</text>
    <text x="3" y="30" fontFamily="Impact,Arial Black,sans-serif" fontWeight="900" fontSize="34" fill={AC.primary}>R</text>
    <ellipse cx="10" cy="40" rx="3" ry="2.5" fill="white"/>
    <line x1="10" y1="37.5" x2="10" y2="33" stroke="white" strokeWidth="2.5"/>
    <line x1="10" y1="35" x2="7" y2="32" stroke="white" strokeWidth="1.5"/>
    <ellipse cx="20" cy="40" rx="3" ry="2.5" fill="white"/>
    <line x1="20" y1="37.5" x2="20" y2="33" stroke="white" strokeWidth="2.5"/>
    <line x1="20" y1="34" x2="22" y2="31" stroke="white" strokeWidth="1.5"/>
    <ellipse cx="30" cy="40" rx="3" ry="2.5" fill="white"/>
    <line x1="30" y1="37.5" x2="30" y2="33" stroke="white" strokeWidth="2.5"/>
    <line x1="30" y1="35" x2="27" y2="31" stroke="white" strokeWidth="1.5"/>
    <ellipse cx="40" cy="40" rx="3" ry="2.5" fill="white"/>
    <line x1="40" y1="37.5" x2="40" y2="33" stroke="white" strokeWidth="2.5"/>
    <line x1="40" y1="34" x2="42" y2="31" stroke="white" strokeWidth="1.5"/>
    <path d="M4,42 Q28,38 52,42" stroke="white" strokeWidth="1.5" fill="none"/>
  </svg>
);

// ── UTILITIES ─────────────────────────────────────────────────────────────────
function useInView(): [React.RefObject<any>, boolean] {
  const ref = useRef(null);
  return [ref, true];
}

function useCounter(target: number, duration: number = 1400, start: boolean = false): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0: any = null;
    const step = (ts: any) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function Particles() {
  const cvs = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = cvs.current; if (!c) return;
    const ctx = c.getContext('2d');
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      r: Math.random() * 1.8 + 0.4, vx: (Math.random()-.5)*.35, vy: (Math.random()-.5)*.35,
      a: Math.random()*.4+.08
    }));
    let raf: any;
    const draw = () => {
      ctx!.clearRect(0, 0, c.width, c.height);
      pts.forEach((p: any) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0;
        if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0;
        ctx!.beginPath(); ctx!.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx!.fillStyle = `rgba(${AC.particleRgb},${p.a})`; ctx!.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i+1; j < pts.length; j++) {
        const dx = pts[i].x-pts[j].x, dy = pts[i].y-pts[j].y, d = Math.sqrt(dx*dx+dy*dy);
        if (d < 110) { ctx!.beginPath(); ctx!.moveTo(pts[i].x,pts[i].y); ctx!.lineTo(pts[j].x,pts[j].y); ctx!.strokeStyle=`rgba(${AC.particleRgb},${.05*(1-d/110)})`; ctx!.lineWidth=.5; ctx!.stroke(); }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={cvs} className="absolute inset-0 w-full h-full" style={{ pointerEvents:'none' }}/>;
}

function Typewriter({ words, speed=75, pause=1800 }: any) {
  const [text, setText] = useState('');
  const [wi, setWi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = words[wi];
    const t = setTimeout(() => {
      if (!del) { setText(cur.slice(0, text.length+1)); if (text.length===cur.length) setTimeout(()=>setDel(true),pause); }
      else { setText(cur.slice(0,text.length-1)); if (text.length===0){setDel(false);setWi((wi+1)%words.length);} }
    }, del ? speed/2 : speed);
    return () => clearTimeout(t);
  }, [text, del, wi, words, speed, pause]);
  return <span>{text}<span className="animate-pulse" style={{color:AC.text}}>|</span></span>;
}

function MagBtn({ children, onClick, className, style }: any) {
  const r = useRef<HTMLButtonElement>(null);
  return (
    <button ref={r} onClick={onClick}
      onMouseMove={(e: any)=>{if(r.current){const b=r.current.getBoundingClientRect();r.current.style.transform=`translate(${(e.clientX-b.left-b.width/2)*.18}px,${(e.clientY-b.top-b.height/2)*.18}px)`;}}}
      onMouseLeave={()=>{if(r.current)r.current.style.transform='translate(0,0)';}}
      className={`${className} transition-transform duration-200`} style={{willChange:'transform',...style}}>
      {children}
    </button>
  );
}

function StatCard({ icon, value, label, suffix='' }: any) {
  const [ref, inView] = useInView();
  const num = parseInt(value.replace(/\D/g,''))||0;
  const displayNum = suffix === 'K+' ? Math.floor(num / 1000) : num;
  const count = useCounter(displayNum, 1200, inView);
  return (
    <div ref={ref} className="bg-black/60 p-6 border border-zinc-800/80 transition-all duration-300 cursor-default"
      style={{boxShadow:'inset 0 1px 0 rgba(255,255,255,0.04)'}}
      onMouseEnter={(e: any)=>e.currentTarget.style.borderColor=AC.primary}
      onMouseLeave={(e: any)=>e.currentTarget.style.borderColor=''}>
      <svg className="w-6 h-6 mb-3" style={{color:AC.primary}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {icon==='academic'&&<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>}
        {icon==='users'&&<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>}
        {icon==='lightning'&&<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>}
        {icon==='target'&&<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>}
      </svg>
      <p className="text-3xl font-black text-white mb-1 tabular-nums">{`${count}${suffix}`}</p>
      <p className="text-zinc-500 text-sm">{label}</p>
    </div>
  );
}

function FlipCard({ icon, title, desc, features }: any) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="h-64 cursor-pointer" style={{perspective:'1000px'}} onClick={()=>setFlipped(!flipped)}>
      <div style={{transition:'transform 0.55s cubic-bezier(.4,0,.2,1)',transformStyle:'preserve-3d',transform:flipped?'rotateY(180deg)':'',position:'relative',height:'100%'}}>
        <div style={{backfaceVisibility:'hidden',position:'absolute',inset:0,boxShadow:'0 4px 24px rgba(0,0,0,0.06)'}}
          className="bg-white border border-zinc-100 p-7 flex flex-col justify-between transition-all duration-300 group hover:border-zinc-300">
          <div>
            <div className="w-12 h-12 bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-4 transition-all duration-300 group-hover:border-zinc-300"
              style={{}} onMouseEnter={(e: any)=>{e.currentTarget.style.background=AC.primary;e.currentTarget.style.borderColor=AC.primary;}} onMouseLeave={(e: any)=>{e.currentTarget.style.background='';e.currentTarget.style.borderColor='';}}>
              <Icon name={icon} className="w-6 h-6 text-zinc-500"/>
            </div>
            <h3 className="text-lg font-bold text-black mb-2">{title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3">{desc}</p>
          </div>
          <p className="text-xs font-semibold tracking-wide" style={{color:AC.text}}>Tap to see details</p>
        </div>
        <div style={{backfaceVisibility:'hidden',transform:'rotateY(180deg)',position:'absolute',inset:0,boxShadow:`0 0 30px ${AC.primaryLight}`,borderColor:AC.primaryBorder}}
          className="bg-zinc-950 p-7 flex flex-col justify-between border">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
            <ul className="space-y-2">
              {features.map((f: any,i: any)=>(
                <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:AC.primary}}/>{f}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-zinc-600">Tap to flip back</p>
        </div>
      </div>
    </div>
  );
}

function FAQ({ q, a }: any) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b transition-colors duration-300" style={{borderColor:open?AC.primaryBorder:'#27272a'}}>
      <button className="w-full flex justify-between items-center py-5 text-left gap-4" onClick={()=>setOpen(!open)}>
        <span className="font-semibold transition-colors text-sm" style={{color:open?AC.text:'white'}}>{q}</span>
        <span className={`flex-shrink-0 w-7 h-7 flex items-center justify-center border transition-all duration-300 ${open?'rotate-45':'border-zinc-700'}`}
          style={{borderColor:open?AC.primary:'',background:open?AC.primary:''}}>
          <Icon name="plus" className="w-3.5 h-3.5 text-white"/>
        </span>
      </button>
      <div style={{maxHeight:open?'180px':'0',overflow:'hidden',transition:'max-height .4s cubic-bezier(.4,0,.2,1)'}}>
        <p className="text-zinc-400 text-sm pb-5 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

function Toast({ msg, onClose }: any) {
  useEffect(()=>{const t=setTimeout(onClose,3500);return ()=>clearTimeout(t);},[onClose]);
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 text-white px-5 py-4"
      style={{background:'#0d0d0f',border:`1px solid ${AC.primaryBorder}`,boxShadow:`0 20px 60px rgba(0,0,0,0.5),0 0 30px ${AC.primaryLight}`}}>
      <Icon name="check" className="w-4 h-4 flex-shrink-0" style={{color:AC.text}}/>
      <span className="text-sm">{msg}</span>
      <button onClick={onClose} className="ml-2 text-zinc-500 hover:text-white"><Icon name="x" className="w-3.5 h-3.5"/></button>
    </div>
  );
}

function CursorSpot() {
  const [p, setP] = useState({x:-500,y:-500});
  useEffect(()=>{const h=(e: any)=>setP({x:e.clientX,y:e.clientY});window.addEventListener('mousemove',h);return ()=>window.removeEventListener('mousemove',h);},[]);
  return <div className="pointer-events-none fixed inset-0 z-30" style={{background:`radial-gradient(280px at ${p.x}px ${p.y}px,${AC.primaryLight},transparent 70%)`}}/>;
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function RallyCo() {
  const [page, setPage] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [formData, setFormData] = useState({name:'',email:'',company:'',message:''});
  const [formDone, setFormDone] = useState(false);
  const [selCampus, setSelCampus] = useState('pitt');
  const [activeTeam, setActiveTeam] = useState<number | null>(null);

  useEffect(()=>{const h=()=>setScrollY(window.scrollY);window.addEventListener('scroll',h,{passive:true});return ()=>window.removeEventListener('scroll',h);},[]);
  const go = (p: string) => { setPage(p); setMobileOpen(false); window.scrollTo(0,0); };

  const campusInfo: Record<string, any> = {
    pitt:       { full:'University of Pittsburgh', loc:'Pittsburgh, PA',  students:'28,000', operator:'Teddy', color:'#003594', desc:'Deep roots in Oakland. Strong Greek row and sports culture. Direct ties to the most active campus orgs.' },
    indiana:    { full:'Indiana University',        loc:'Bloomington, IN', students:'45,000', operator:'JT',    color:'#990000', desc:'Largest campus in the network. IU Greek life is its own economy and JT has the keys.' },
    providence: { full:'Providence College',        loc:'Providence, RI',  students:'5,000',  operator:'Jack',  color:'#555555', desc:'Tight-knit school where word travels fast. Jack built the brand that the whole campus knows.' },
    middlebury: { full:'Middlebury College',         loc:'Middlebury, VT',  students:'2,800',  operator:'Zach',  color:'#003D7D', desc:'Elite liberal arts network. High-trust demographic. Zach has direct admin access.' },
  };

  const team = [
    { name:'Teddy', school:'University of Pittsburgh', year:'Freshman',  hometown:'New Canaan, CT',  Icon:TeddyIcon, bio:"Grew up in New Canaan, CT. Now running campus ops at Pitt as a freshman. Deeply plugged into student orgs, Greek life, and everything that moves on campus. Entrepreneurial from day one and not slowing down." },
    { name:'JT',    school:'Indiana University',        year:'Sophomore', hometown:'Chevy Chase, MD', Icon:JTIcon,    bio:"From Chevy Chase, MD. Co-founded Blue Bridge Connecting and Lazy Buoy alongside Jack, building real experience in social media marketing and sales before college. At IU he brought that same hustle to one of the biggest campuses in the country." },
    { name:'Jack',  school:'Providence College',        year:'Sophomore', hometown:'Madison, NJ',     Icon:JackIcon,  bio:"Grew up in Madison, NJ. Co-founded Blue Bridge Connecting and Lazy Buoy with JT, where he led social media marketing and sales. At Providence he built a name for himself fast on a tight-knit campus where reputation is everything." },
    { name:'Zach',  school:'Middlebury College',         year:'Sophomore', hometown:'Tenafly, NJ',     Icon:ZachIcon,  bio:"From Tenafly, NJ. Founded a college counseling agency in high school that generated real revenue. He is our financial brain, keeping Rally sharp on the business side while building deep relationships across Middlebury's student body and administration." },
  ];

  const services = [
    { icon:'rocket',    title:'Campus Activations',   desc:'High-impact on-the-ground brand experiences. Pop-ups, sampling, and demos in the spaces students actually occupy.',   features:['Location scouting & permits','Staffing & training','Full execution','Real-time reporting'] },
    { icon:'sparkle',   title:'Influencer Seeding',   desc:'We identify students with genuine influence, not vanity metrics. Organic product placement that actually spreads.',    features:['Network mapping','Organic placement','Content capture','Ripple tracking'] },
    { icon:'users',     title:'Street Teams',          desc:'Trained students who know how to work their own campus. Distribution, signups, and buzz generation done right.',      features:['Recruitment & vetting','Brand training','Deployment strategy','Performance incentives'] },
    { icon:'calendar',  title:'Event Marketing',       desc:'Game days, Greek formals, club events. Show up at the moments that matter with activations students remember.',        features:['Event sourcing','Sponsorship negotiation','On-site activation','Post-event analysis'] },
    { icon:'phone',     title:'Social Strategy',       desc:'Content built for how students actually use platforms in 2025. Formats that work because we live them.',              features:['Platform strategy','Content creation','Trend integration','Performance optimization'] },
    { icon:'handshake', title:'Ambassador Programs',   desc:'Long-term brand representation done right. Authentic ambassadors, not students reading scripts.',                     features:['Recruitment','Onboarding & training','Content guidance','Community building'] },
    { icon:'beaker',    title:'Growth Experiments',    desc:'Fast, low-cost tests across campuses to find signal before you scale. Fail cheap, learn fast, double down.',          features:['Hypothesis design','Multi-campus testing','Rapid iteration','Scalability assessment'] },
    { icon:'chart',     title:'Analytics & Reporting', desc:'Clear visibility into what is working. Reach, conversions, ROI tracked and reported without fluff.',                  features:['Real-time dashboards','Weekly reports','ROI analysis','Strategic insights'] },
  ];

  const faqs = [
    { q:'How quickly can you launch a campaign?',          a:'Most campaigns activate within 1-2 weeks of contract signing. For same-week launches on existing networks, reach out directly.' },
    { q:'Do you work with brands outside consumer goods?', a:'Absolutely. We work with fintech, software, food and bev, apparel, and services. If your target market includes college students, we can reach them.' },
    { q:'What schools are you currently operating at?',    a:'Pittsburgh, Indiana, Providence, and Middlebury. We are actively expanding and onboarding new operators every semester.' },
    { q:'What does a typical engagement cost?',            a:'Projects range from $2K to $25K+ depending on scope, campuses, and duration. We scope every project individually.' },
    { q:'How do you measure success?',                     a:'KPIs are set before every campaign. Reach, engagement, downloads, signups, samples. We track and report on whatever matters most.' },
  ];

  // ── NAV ───────────────────────────────────────────────────────────────────
  const NavBar = (): React.ReactElement => (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{padding:scrollY>40?'12px 0':'20px 0',background:scrollY>40?'rgba(0,0,0,0.92)':'transparent',backdropFilter:scrollY>40?'blur(20px)':'none',boxShadow:scrollY>40?'0 1px 0 rgba(255,255,255,0.04),0 20px 40px rgba(0,0,0,0.4)':'none'}}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <button onClick={()=>go('home')} className="group"><NavLogo/></button>
        <div className="hidden md:flex items-center gap-10">
          {['about','services','team','contact'].map(item=>(
            <button key={item} onClick={()=>go(item)}
              className={`relative text-xs uppercase tracking-widest transition-all duration-300 hover:text-white ${page===item?'text-white':'text-zinc-500'}`}>
              {item}
              <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${page===item?'w-full':'w-0'}`}
                style={{background:AC.primary,boxShadow:page===item?`0 0 6px ${AC.primaryGlow}`:'none'}}/>
            </button>
          ))}
        </div>
        <MagBtn onClick={()=>go('contact')}
          className="hidden md:flex items-center gap-2 text-white text-xs uppercase tracking-widest px-5 py-3.5 group transition-colors"
          style={{background:AC.primary,boxShadow:`0 4px 20px ${AC.primaryGlow}`}}>
          <span>Start Project</span>
          <Icon name="arrow" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"/>
        </MagBtn>
        <button className="md:hidden text-white" onClick={()=>setMobileOpen(!mobileOpen)}>
          <Icon name={mobileOpen?'x':'menu'} className="w-5 h-5"/>
        </button>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-400 ${mobileOpen?'max-h-72':'max-h-0'}`}
        style={{background:'rgba(0,0,0,0.97)',backdropFilter:'blur(20px)'}}>
        <div className="px-8 py-6 space-y-5">
          {['about','services','team','contact'].map(i=>(
            <button key={i} onClick={()=>go(i)} className="block w-full text-left text-xl font-bold text-white capitalize">{i}</button>
          ))}
          <button onClick={()=>go('contact')} className="w-full text-white py-3.5 uppercase tracking-widest text-xs font-medium"
            style={{background:AC.primary}}>Start Project</button>
        </div>
      </div>
    </nav>
  );

  // ── FOOTER ────────────────────────────────────────────────────────────────
  const FooterBar = (): React.ReactElement => (
    <footer className="bg-black pt-16 pb-10 px-8 border-t border-zinc-900/80">
      <div className="max-w-7xl mx-auto">
        <div className="mb-3"><NavLogo/></div>
        <p className="text-zinc-500 text-sm mb-10 max-w-sm leading-relaxed">The campus marketing agency built by students, for brands who want to reach students the right way.</p>
        <div className="flex flex-wrap gap-x-10 gap-y-6 mb-10">
          <div>
            <p className="text-white font-semibold text-xs uppercase tracking-widest mb-3">Navigate</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {['Home','About','Services','Team','Contact'].map(i=>(
                <button key={i} onClick={()=>go(i.toLowerCase())} className="text-zinc-500 text-sm transition-colors"
                  onMouseEnter={(e: any)=>e.target.style.color=AC.text} onMouseLeave={(e: any)=>e.target.style.color=''}>{i}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white font-semibold text-xs uppercase tracking-widest mb-3">Contact</p>
            <a href="mailto:hello@rallyco.com" className="text-sm block mb-1" style={{color:AC.text}}>hello@rallyco.com</a>
            <p className="text-zinc-600 text-sm">Pittsburgh · Bloomington · Providence · Middlebury</p>
          </div>
        </div>
        <div className="border-t border-zinc-900 pt-6 flex justify-between items-center">
          <p className="text-zinc-700 text-xs">2025 Rally Co. All rights reserved.</p>
          <div className="flex gap-6 text-zinc-700 text-xs">
            <span className="hover:text-zinc-400 cursor-pointer">Privacy</span>
            <span className="hover:text-zinc-400 cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );

  // ── HOME ──────────────────────────────────────────────────────────────────
  const HomePage = (): React.ReactElement => {
    const [loaded, setLoaded] = useState(false);
    useEffect(()=>{const t=setTimeout(()=>setLoaded(true),60);return ()=>clearTimeout(t);},[]);
    const ci = campusInfo[selCampus];
    return (
      <div>
        {/* HERO */}
        <section className="min-h-screen bg-black flex items-center px-8 pt-24 relative overflow-hidden">
          <Particles/>
          <div className="absolute inset-0 opacity-[0.025]" style={{backgroundImage:'radial-gradient(circle at 1px 1px,white 1px,transparent 0)',backgroundSize:'44px 44px'}}/>
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px]" style={{background:`radial-gradient(circle,${AC.primaryLight} 0%,transparent 70%)`}}/>
          <div className="max-w-7xl mx-auto relative z-10 w-full py-16">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className={`transition-all duration-700 ${loaded?'opacity-100 translate-y-0':'opacity-0 translate-y-8'}`}>
                  <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 border border-zinc-800/80" style={{background:'rgba(24,24,27,0.8)',backdropFilter:'blur(12px)'}}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:AC.primary,boxShadow:`0 0 8px ${AC.primaryGlow}`}}/>
                    <span className="text-zinc-400 text-xs uppercase tracking-widest">Campus Marketing Agency</span>
                  </div>
                </div>
                <div className={`transition-all duration-700 delay-100 ${loaded?'opacity-100 translate-y-0':'opacity-0 translate-y-8'}`}>
                  <RallyWordmark className="w-72 mb-6"/>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.04] mb-6 tracking-tight">
                    Brands don't break into college.
                    <span className="block mt-2" style={{background:`linear-gradient(135deg,${AC.primary} 0%,${AC.text} 50%,${AC.primary} 100%)`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
                      <Typewriter words={["They're brought in.","They earn trust.","They go native.","They start here."]}/>
                    </span>
                  </h1>
                </div>
                <div className={`transition-all duration-700 delay-200 ${loaded?'opacity-100 translate-y-0':'opacity-0 translate-y-8'}`}>
                  <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-lg">We are the student operators at top universities who help brands connect with college audiences through authentic, on-the-ground marketing.</p>
                  <div className="flex flex-wrap gap-4">
                    <MagBtn onClick={()=>go('contact')} className="group flex items-center justify-center gap-2.5 text-white px-8 py-4 transition-colors" style={{background:AC.primary,boxShadow:`0 8px 30px ${AC.primaryGlow}`}}>
                      <span className="uppercase tracking-widest text-xs font-semibold">Start a Project</span>
                      <Icon name="arrow" className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                    </MagBtn>
                    <MagBtn onClick={()=>go('services')} className="group flex items-center justify-center gap-2.5 border border-zinc-800 hover:border-zinc-600 text-white px-8 py-4 transition-colors">
                      <span className="uppercase tracking-widest text-xs font-semibold">Our Services</span>
                      <Icon name="arrow" className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                    </MagBtn>
                  </div>
                </div>
                <div className={`transition-all duration-700 delay-500 mt-12 pt-8 border-t border-zinc-900 ${loaded?'opacity-100':'opacity-0'}`}>
                  <p className="text-zinc-600 text-xs uppercase tracking-widest mb-4">Operators at</p>
                  <div className="flex flex-wrap gap-5">
                    {['Pittsburgh','Indiana','Providence','Middlebury'].map((s,i)=>(
                      <span key={i} className="text-zinc-500 hover:text-white transition-colors cursor-default flex items-center gap-1.5 text-sm">
                        <Icon name="academic" className="w-4 h-4" style={{color:AC.primary}}/>{s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className={`hidden lg:block transition-all duration-700 delay-300 ${loaded?'opacity-100 translate-y-0':'opacity-0 translate-y-8'}`}>
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl blur-2xl" style={{background:`radial-gradient(circle,${AC.primaryLight} 0%,transparent 70%)`}}/>
                  <div className="relative rounded-3xl p-8 border border-zinc-800/60" style={{background:'rgba(18,18,20,0.7)',backdropFilter:'blur(20px)',boxShadow:'0 30px 80px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.04)'}}>
                    <div className="grid grid-cols-2 gap-3">
                      <StatCard icon="academic" value="4"     label="Universities"  suffix=""/>
                      <StatCard icon="users"    value="50000" label="Student Reach" suffix="K+"/>
                      <StatCard icon="lightning" value="24"  label="Hr Response"   suffix="hr"/>
                      <StatCard icon="target"   value="100"  label="Student Run"   suffix="%"/>
                    </div>
                    <div className="mt-4 p-4 border" style={{background:AC.primaryLight,borderColor:AC.primaryBorder}}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" style={{boxShadow:'0 0 6px rgba(52,211,153,0.8)'}}/>
                        <span className="text-emerald-400 text-xs font-semibold">Currently Active</span>
                      </div>
                      <p className="text-sm text-white">Accepting brand partners for Spring 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-px h-10" style={{background:`linear-gradient(to bottom,#52525b,${AC.primary},transparent)`}}/>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="py-28 px-8" style={{background:'#0a0a0b'}}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="w-10 h-px" style={{background:AC.primary}}/>
                <span className="text-xs uppercase tracking-widest font-medium" style={{color:AC.text}}>The Problem</span>
                <div className="w-10 h-px" style={{background:AC.primary}}/>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white">Traditional marketing fails<br/>on college students.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {icon:'eye',   title:'Ad Blindness',      desc:'Students scroll past anything that looks like marketing. Programmatic, display, pre-roll. It all gets ignored.', stat:'86% skip ads'},
                {icon:'users', title:'Peer Trust',         desc:'Purchase decisions come from roommates and group chats. Word of mouth is the only channel that matters.',        stat:'4x more trusted'},
                {icon:'shield',title:'Authenticity Radar', desc:'Gen Z can smell corporate from a mile away. If it does not feel native, it does not work. Period.',             stat:'73% detect fakes'},
              ].map((item,i)=>(
                <div key={i} className="group relative border border-zinc-900 p-9 h-full transition-all duration-500 cursor-default overflow-hidden"
                  style={{background:'#0d0d0f',boxShadow:'inset 0 1px 0 rgba(255,255,255,0.03)'}}
                  onMouseEnter={(e: any)=>e.currentTarget.style.borderColor=AC.primaryBorder}
                  onMouseLeave={(e: any)=>e.currentTarget.style.borderColor=''}>
                  <div className="absolute top-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{background:`linear-gradient(to right,transparent,${AC.primary},transparent)`}}/>
                  <div className="w-12 h-12 flex items-center justify-center mb-6 border transition-all duration-300"
                    style={{background:AC.primaryLight,borderColor:AC.primaryBorder}}>
                    <Icon name={item.icon} className="w-6 h-6" style={{color:AC.primary}}/>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-zinc-500 leading-relaxed text-sm mb-6">{item.desc}</p>
                  <div className="pt-5 border-t border-zinc-900">
                    <p className="font-bold text-sm" style={{color:AC.primary}}>{item.stat}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NETWORK */}
        <section className="py-28 px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="w-10 h-px" style={{background:AC.primary}}/>
                <span className="text-xs uppercase tracking-widest font-medium" style={{color:AC.text}}>Our Network</span>
                <div className="w-10 h-px" style={{background:AC.primary}}/>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-3">Four campuses. One strategy.</h2>
              <p className="text-zinc-500">Click a school to learn more.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {Object.entries(campusInfo).map(([id,c]: any)=>(
                <button key={id} onClick={()=>setSelCampus(id)}
                  className="text-left p-6 border-2 transition-all duration-300"
                  style={{borderColor:selCampus===id?AC.primary:'#27272a',background:selCampus===id?AC.primaryLight:'#0d0d0f',boxShadow:selCampus===id?`0 0 30px ${AC.primaryLight}`:'none'}}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{backgroundColor:selCampus===id?AC.primary:'#52525b'}}/>
                    <span className="text-zinc-500 text-xs uppercase tracking-widest">{c.loc}</span>
                  </div>
                  <h3 className="text-base font-black text-white mb-1 leading-snug" style={{color:selCampus===id?AC.text:''}}>{c.full}</h3>
                  <p className="text-zinc-600 text-xs">{c.students} students</p>
                </button>
              ))}
            </div>
            <div className="border border-zinc-800 p-8" style={{background:'#0d0d0f',boxShadow:'inset 0 1px 0 rgba(255,255,255,0.04)'}}>
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor:campusInfo[selCampus].color,boxShadow:`0 0 10px ${campusInfo[selCampus].color}`}}/>
                    <h3 className="text-2xl font-black text-white">{campusInfo[selCampus].full}</h3>
                    <span className="text-xs text-white px-2 py-0.5 uppercase tracking-widest font-semibold" style={{background:AC.primary}}>{campusInfo[selCampus].operator}</span>
                  </div>
                  <p className="text-zinc-400 leading-relaxed mb-6">{campusInfo[selCampus].desc}</p>
                  <button onClick={()=>go('team')} className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors" style={{color:AC.text}}
                    onMouseEnter={(e: any)=>e.currentTarget.style.color=AC.textHover} onMouseLeave={(e: any)=>e.currentTarget.style.color=AC.text}>
                    <span>Meet {campusInfo[selCampus].operator}</span>
                    <Icon name="arrow" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"/>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[['Location',campusInfo[selCampus].loc],['Students',campusInfo[selCampus].students],['Operator',campusInfo[selCampus].operator],['Status','Active']].map(([l,v])=>(
                    <div key={l} className="p-4 border border-zinc-800" style={{background:'rgba(0,0,0,0.4)'}}>
                      <p className="text-zinc-600 text-xs uppercase tracking-wider mb-1">{l}</p>
                      <p className="text-white font-semibold text-sm">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TEAM PREVIEW */}
        <section className="py-28 px-8 bg-zinc-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="w-10 h-px" style={{background:AC.primary}}/>
              <span className="text-xs uppercase tracking-widest font-medium" style={{color:AC.text}}>The Team</span>
              <div className="w-10 h-px" style={{background:AC.primary}}/>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-black mb-3">Built by students who build things.</h2>
            <p className="text-zinc-500 mb-14 max-w-lg mx-auto">Four founders with real companies and deep campus roots.</p>
            <div className="grid md:grid-cols-4 gap-8 mb-10">
              {team.map((m,i)=>(
                <button key={i} onClick={()=>go('team')} className="group text-center">
                  <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-white transition-all duration-400 shadow-xl group-hover:scale-110 transform"
                    onMouseEnter={(e: any)=>e.currentTarget.style.boxShadow=`0 0 0 4px ${AC.primary}`}
                    onMouseLeave={(e: any)=>e.currentTarget.style.boxShadow='0 10px 40px rgba(0,0,0,0.15)'}>
                    <m.Icon/>
                  </div>
                  <h3 className="text-lg font-bold text-black">{m.name}</h3>
                  <p className="text-zinc-400 text-xs">{m.hometown}</p>
                </button>
              ))}
            </div>
            <button onClick={()=>go('team')} className="group inline-flex items-center gap-2 font-bold uppercase tracking-widest text-xs transition-colors" style={{color:AC.primary}}
              onMouseEnter={(e: any)=>e.currentTarget.style.color=AC.text} onMouseLeave={(e: any)=>e.currentTarget.style.color=AC.primary}>
              <span>Meet the full team</span>
              <Icon name="arrow" className="w-4 h-4 group-hover:translate-x-2 transition-transform"/>
            </button>
          </div>
        </section>

        {/* CTA */}
        <section className="py-28 px-8 relative overflow-hidden" style={{background:AC.primary}}>
          <div className="absolute inset-0 opacity-[0.07]" style={{backgroundImage:'radial-gradient(circle at 2px 2px,black 1px,transparent 0)',backgroundSize:'28px 28px'}}/>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-5">Ready to reach students<br/>the right way?</h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">Stop guessing. Start working with the people who actually know.</p>
            <MagBtn onClick={()=>go('contact')} className="group inline-flex items-center gap-3 bg-black hover:bg-zinc-900 text-white px-10 py-5 transition-colors" style={{boxShadow:'0 10px 40px rgba(0,0,0,0.4)'}}>
              <span className="uppercase tracking-widest text-xs font-semibold">Start Your Project</span>
              <Icon name="arrow" className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
            </MagBtn>
          </div>
        </section>
      </div>
    );
  };

  // ── SERVICES ──────────────────────────────────────────────────────────────
  const ServicesPage = (): React.ReactElement => (
    <div className="pt-24">
      <section className="py-28 px-8 bg-black relative overflow-hidden">
        <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{background:`radial-gradient(circle,${AC.primaryLight},transparent)`}}/>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5"><div className="w-10 h-px" style={{background:AC.primary}}/><span className="uppercase tracking-widest text-xs" style={{color:AC.text}}>Services</span></div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5">Campus marketing that<br/>moves the needle.</h1>
          <p className="text-zinc-400 text-lg max-w-2xl">Full-stack campus marketing from operators who live on the campuses they activate. Click any card to see what is included.</p>
        </div>
      </section>
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s,i)=><FlipCard key={i} {...s}/>)}
          </div>
        </div>
      </section>
      <section className="py-24 px-8" style={{background:'#0a0a0b'}}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-2">Frequently Asked</h2>
            <p className="text-zinc-500 text-sm">Answers to the questions we hear most.</p>
          </div>
          {faqs.map((f,i)=><FAQ key={i} {...f}/>)}
        </div>
      </section>
      <section className="py-24 px-8" style={{background:AC.primary}}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-3">Not sure what you need?</h2>
          <p className="text-white/80 mb-8">Let us figure it out together.</p>
          <MagBtn onClick={()=>go('contact')} className="group inline-flex items-center gap-3 bg-black text-white px-10 py-5 hover:bg-zinc-900 transition-colors" style={{boxShadow:'0 8px 30px rgba(0,0,0,0.4)'}}>
            <span className="uppercase tracking-widest text-xs font-semibold">Start a Conversation</span>
            <Icon name="arrow" className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
          </MagBtn>
        </div>
      </section>
    </div>
  );

  // ── TEAM ──────────────────────────────────────────────────────────────────
  const TeamPage = (): React.ReactElement => (
    <div className="pt-24">
      <section className="py-28 px-8 bg-black relative overflow-hidden">
        <Particles/>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5"><div className="w-10 h-px" style={{background:AC.primary}}/><span className="uppercase tracking-widest text-xs" style={{color:AC.text}}>The Team</span></div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5">Four founders. Four campuses.<br/>Real experience.</h1>
          <p className="text-zinc-400 text-lg max-w-2xl">We are not career marketers who studied Gen Z in a focus group. We are students who have built real companies.</p>
        </div>
      </section>
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-14">
            {team.map((m,i)=>(
              <button key={i} onClick={()=>setActiveTeam(activeTeam===i?null:i)}
                className="flex items-center gap-2.5 px-5 py-2.5 border-2 transition-all duration-300 text-sm font-semibold"
                style={{borderColor:activeTeam===i?AC.primary:'#e4e4e7',background:activeTeam===i?AC.primary:'white',color:activeTeam===i?'white':'#52525b'}}>
                <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0"><m.Icon/></div>
                {m.name}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m,i)=>(
              <div key={i} className={`transition-all duration-400 ${activeTeam!==null&&activeTeam!==i?'opacity-25 scale-95':'opacity-100 scale-100'}`}>
                <div className="border border-zinc-800 p-6 h-full transition-all duration-400 group"
                  style={{background:'#0d0d0f',boxShadow:'inset 0 1px 0 rgba(255,255,255,0.04)'}}
                  onMouseEnter={(e: any)=>e.currentTarget.style.borderColor=AC.primaryBorder}
                  onMouseLeave={(e: any)=>e.currentTarget.style.borderColor=''}>
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-zinc-800 transition-all"
                    style={{boxShadow:'0 8px 24px rgba(0,0,0,0.3)'}}
                    onMouseEnter={(e: any)=>e.currentTarget.style.boxShadow=`0 0 0 4px ${AC.primary}`}
                    onMouseLeave={(e: any)=>e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.3)'}>
                    <m.Icon/>
                  </div>
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-black text-white">{m.name}</h3>
                    <p className="text-xs font-semibold mt-0.5" style={{color:AC.text}}>{m.hometown}</p>
                    <p className="text-zinc-600 text-xs mt-1">{m.school} · {m.year}</p>
                  </div>
                  <p className="text-zinc-400 text-xs text-center leading-relaxed">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-8 bg-zinc-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl text-zinc-600 leading-relaxed">We are not pretending to understand college students. We <em className="text-black font-semibold not-italic">are</em> college students running a real agency with real accountability.</p>
        </div>
      </section>
      <section className="py-24 px-8" style={{background:AC.primary}}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-3">Want to work with us?</h2>
          <p className="text-white/80 mb-8">Always excited to meet brands doing interesting things.</p>
          <MagBtn onClick={()=>go('contact')} className="group inline-flex items-center gap-3 bg-black text-white px-10 py-5 hover:bg-zinc-900 transition-colors" style={{boxShadow:'0 8px 30px rgba(0,0,0,0.4)'}}>
            <span className="uppercase tracking-widest text-xs font-semibold">Get in Touch</span>
            <Icon name="arrow" className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
          </MagBtn>
        </div>
      </section>
    </div>
  );

  // ── ABOUT ─────────────────────────────────────────────────────────────────
  const AboutPage = (): React.ReactElement => {
    const [beliefOpen, setBeliefOpen] = useState<number | null>(null);
    const beliefs = [
      {title:'Marketing to students is broken', desc:'Most brands run focus groups, build personas, and launch campaigns that feel corporate. They spend six figures guessing.'},
      {title:'Access beats targeting',           desc:'Students trust students. Better ad targeting will not fix a credibility problem. You need people on the inside.'},
      {title:'Operators beat ambassadors',       desc:'We are not recruiting students to read scripts. We are building a network of operators who understand their schools deeply.'},
      {title:'Learnings compound',               desc:'What works at Indiana informs what we try at Pitt. Every campaign makes the whole network smarter.'},
    ];
    return (
      <div className="pt-24">
        <section className="py-28 px-8 bg-black relative overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{background:`radial-gradient(circle,${AC.primaryLight},transparent)`}}/>
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="flex items-center gap-3 mb-5"><div className="w-10 h-px" style={{background:AC.primary}}/><span className="uppercase tracking-widest text-xs" style={{color:AC.text}}>About Us</span></div>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-5">We do not study college students.<br/><span style={{color:AC.text}}>We are college students.</span></h1>
            <p className="text-zinc-400 text-lg max-w-2xl">The only campus marketing agency built and operated entirely by students at the universities we serve.</p>
          </div>
        </section>
        <section className="py-20 px-8 bg-white">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-black text-black mb-7">The Story</h2>
              <div className="space-y-5 text-zinc-600 leading-relaxed">
                <p>Rally started because we saw something broken that nobody was fixing properly.</p>
                <p>Brands want to reach college students but do not know how. They hire agencies that run focus groups and create campaigns that feel corporate from a mile away.</p>
                <p>We are four founders at four universities who realized we already had what brands actually needed: <strong className="text-black">real access, real credibility, and a native understanding of how campuses work.</strong></p>
                <p>So we built Rally, a marketing agency that operates from inside the institutions brands are trying to reach.</p>
              </div>
            </div>
            <div className="p-10 h-full flex flex-col justify-between border border-zinc-800" style={{background:'#0d0d0f',boxShadow:'0 30px 80px rgba(0,0,0,0.15)'}}>
              <div>
                <Icon name="sparkle" className="w-9 h-9 mb-5" style={{color:AC.primary}}/>
                <p className="text-2xl text-white leading-relaxed font-medium mb-8">"You cannot understand campus culture from the outside. You have to live it."</p>
              </div>
              <div className="flex items-center gap-4 pt-5 border-t border-zinc-800">
                <div className="w-12 h-12 rounded-full overflow-hidden"><TeddyIcon/></div>
                <div><p className="font-bold text-white text-sm">Teddy</p><p className="text-zinc-500 text-xs">Co-Founder, Rally</p></div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 px-8" style={{background:'#0a0a0b'}}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-white mb-2">What We Believe</h2>
              <p className="text-zinc-500 text-sm">Click each principle.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {beliefs.map((b,i)=>(
                <button key={i} onClick={()=>setBeliefOpen(beliefOpen===i?null:i)}
                  className="w-full p-6 text-left border-2 transition-all duration-300"
                  style={{borderColor:beliefOpen===i?AC.primaryBorder:'#27272a',background:beliefOpen===i?AC.primaryLight:'#0d0d0f'}}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm transition-colors" style={{color:beliefOpen===i?AC.text:'white'}}>{b.title}</h3>
                    <span className={`flex-shrink-0 ml-3 w-6 h-6 flex items-center justify-center border transition-all duration-300 ${beliefOpen===i?'rotate-45':''}`}
                      style={{borderColor:beliefOpen===i?AC.primary:'#3f3f46',background:beliefOpen===i?AC.primary:'transparent'}}>
                      <Icon name="plus" className="w-3 h-3 text-white"/>
                    </span>
                  </div>
                  <div style={{maxHeight:beliefOpen===i?'120px':'0',overflow:'hidden',transition:'max-height 0.35s cubic-bezier(.4,0,.2,1)'}}>
                    <p className="text-zinc-400 text-xs mt-3 leading-relaxed">{b.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="py-24 px-8" style={{background:AC.primary}}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-black text-white mb-3">Let us build something together.</h2>
            <p className="text-white/80 mb-8">Looking for brands who want to do college marketing the right way.</p>
            <MagBtn onClick={()=>go('contact')} className="group inline-flex items-center gap-3 bg-black text-white px-10 py-5 hover:bg-zinc-900 transition-colors" style={{boxShadow:'0 8px 30px rgba(0,0,0,0.4)'}}>
              <span className="uppercase tracking-widest text-xs font-semibold">Contact Us</span>
              <Icon name="arrow" className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
            </MagBtn>
          </div>
        </section>
      </div>
    );
  };

  // ── CONTACT ───────────────────────────────────────────────────────────────
  const ContactPage = (): React.ReactElement => {
    const [step, setStep] = useState(1);
    const ok = step===1?(formData.name&&formData.email):step===2?formData.message:true;
    if (formDone) return (
      <div className="pt-24 min-h-screen bg-black flex items-center justify-center px-8">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 border flex items-center justify-center mx-auto mb-8"
            style={{borderColor:'rgba(52,211,153,0.4)',background:'rgba(52,211,153,0.06)',boxShadow:'0 0 40px rgba(52,211,153,0.1)'}}>
            <Icon name="check" className="w-10 h-10 text-emerald-400"/>
          </div>
          <h2 className="text-4xl font-black text-white mb-3">Message Sent!</h2>
          <p className="text-zinc-400 mb-8">We will get back to you within 24 hours.</p>
          <MagBtn onClick={()=>{setFormDone(false);setFormData({name:'',email:'',company:'',message:''});go('home');}}
            className="group inline-flex items-center gap-2 text-white px-8 py-4 transition-colors" style={{background:AC.primary,boxShadow:`0 8px 30px ${AC.primaryGlow}`}}>
            <span className="uppercase tracking-widest text-xs font-semibold">Back to Home</span>
          </MagBtn>
        </div>
      </div>
    );
    return (
      <div className="pt-24">
        <section className="min-h-screen py-32 px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20">
              <div>
                <div className="flex items-center gap-3 mb-5"><div className="w-10 h-px" style={{background:AC.primary}}/><span className="uppercase tracking-widest text-xs" style={{color:AC.text}}>Contact</span></div>
                <h1 className="text-5xl font-black text-black mb-5">Let us work together.</h1>
                <p className="text-zinc-500 mb-10 leading-relaxed">Whether you have a specific campaign in mind or just want to explore, we would love to hear from you.</p>
                {[
                  {icon:'mail',      label:'Email',         value:'hello@rallyco.com',href:'mailto:hello@rallyco.com'},
                  {icon:'lightning', label:'Response Time', value:'Under 24 hours'},
                  {icon:'location',  label:'Locations',     value:'Pittsburgh · Bloomington · Providence · Middlebury'},
                ].map((item,i)=>(
                  <div key={i} className="flex items-start gap-5 mb-6">
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{background:AC.primary,boxShadow:`0 6px 20px ${AC.primaryGlow}`}}>
                      <Icon name={item.icon} className="w-5 h-5 text-white"/>
                    </div>
                    <div>
                      <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">{item.label}</p>
                      {item.href?<a href={item.href} className="text-lg font-bold text-black hover:text-red-500 transition-colors">{item.value}</a>:<p className="text-lg font-bold text-black">{item.value}</p>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-10 border border-zinc-800" style={{background:'#0a0a0b',boxShadow:'0 30px 80px rgba(0,0,0,0.2),inset 0 1px 0 rgba(255,255,255,0.04)'}}>
                <div className="flex items-center gap-2 mb-8">
                  {['Your Info','Message','Review'].map((l,i)=>(
                    <div key={i} className="flex items-center gap-2 flex-1">
                      <div className="w-7 h-7 flex items-center justify-center text-xs font-bold transition-all duration-300"
                        style={{background:i+1<=step?AC.primary:'#27272a',color:'white',boxShadow:i+1<=step?`0 4px 12px ${AC.primaryGlow}`:'none'}}>{i+1}</div>
                      <span className={`text-xs uppercase tracking-widest hidden sm:block ${i+1===step?'text-white':'text-zinc-600'}`}>{l}</span>
                      {i<2&&<div className="flex-1 h-px" style={{background:i+1<step?AC.primary:'#27272a'}}/>}
                    </div>
                  ))}
                </div>
                {step===1&&(
                  <div className="space-y-4">
                    <h3 className="text-white font-bold mb-4">Tell us who you are</h3>
                    {[{k:'name' as const,l:'Name',t:'text',p:'Your name',req:true},{k:'email' as const,l:'Email',t:'email',p:'you@company.com',req:true},{k:'company' as const,l:'Company',t:'text',p:'Your company',req:false}].map(f=>(
                      <div key={f.k}>
                        <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">{f.l}{f.req&&<span className="ml-1" style={{color:AC.primary}}>*</span>}</label>
                        <input type={f.t} value={formData[f.k]} onChange={e=>setFormData({...formData,[f.k]:e.target.value as never})}
                          className="w-full px-4 py-3.5 text-white text-sm placeholder-zinc-600 outline-none transition-all duration-300 border border-zinc-800"
                          style={{background:'#111113'}} placeholder={f.p}
                          onFocus={(e: any)=>e.target.style.borderColor=AC.primary} onBlur={(e: any)=>e.target.style.borderColor=''}/>
                      </div>
                    ))}
                  </div>
                )}
                {step===2&&(
                  <div>
                    <h3 className="text-white font-bold mb-4">What are you looking for?</h3>
                    <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Message <span style={{color:AC.primary}}>*</span></label>
                    <textarea rows={6} value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})}
                      className="w-full px-4 py-3.5 text-white text-sm placeholder-zinc-600 outline-none resize-none border border-zinc-800 transition-colors"
                      style={{background:'#111113'}} placeholder="Tell us about your brand and what you are looking for..."
                      onFocus={(e: any)=>e.target.style.borderColor=AC.primary} onBlur={(e: any)=>e.target.style.borderColor=''}/>
                    <p className="text-zinc-700 text-xs mt-1">{formData.message.length} characters</p>
                  </div>
                )}
                {step===3&&(
                  <div>
                    <h3 className="text-white font-bold mb-4">Review and Send</h3>
                    <div className="space-y-2">
                      {[['Name',formData.name],['Email',formData.email],['Company',formData.company||'Not provided'],['Message',formData.message]].map(([l,v])=>(
                        <div key={l} className="p-3.5 border border-zinc-800" style={{background:'#111113'}}>
                          <p className="text-xs text-zinc-600 uppercase tracking-wider mb-1">{l}</p>
                          <p className="text-white text-sm line-clamp-2">{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-3 mt-7">
                  {step>1&&<button onClick={()=>setStep(s=>s-1)} className="flex-1 border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white py-3.5 text-xs uppercase tracking-widest transition-all">Back</button>}
                  {step<3
                    ?<button onClick={()=>ok&&setStep(s=>s+1)}
                        className={`flex-1 py-3.5 text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 text-white ${!ok?'cursor-not-allowed opacity-40':''}`}
                        style={{background:ok?AC.primary:'#27272a',boxShadow:ok?`0 6px 20px ${AC.primaryGlow}`:'none'}}>
                        <span>Next</span><Icon name="arrow" className="w-3.5 h-3.5"/>
                      </button>
                    :<button onClick={()=>{setFormDone(true);setToast(null);}}
                        className="flex-1 text-white py-3.5 text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                        style={{background:AC.primary,boxShadow:`0 6px 20px ${AC.primaryGlow}`}}>
                        <span>Send Message</span><Icon name="send" className="w-3.5 h-3.5"/>
                      </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const pages: Record<string, React.ComponentType> = {home:HomePage,about:AboutPage,services:ServicesPage,team:TeamPage,contact:ContactPage};
  const PageComponent = pages[page as keyof typeof pages]||pages.home;

  return (
    <div className="min-h-screen bg-white" style={{fontFamily:'system-ui,-apple-system,sans-serif'}}>
      <CursorSpot/>
      <NavBar/>
      <PageComponent/>
      <FooterBar/>
      {toast&&<Toast msg={toast} onClose={()=>setToast(null)}/>}
    </div>
  );
}
