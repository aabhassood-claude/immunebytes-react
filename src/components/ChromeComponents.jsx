import { useState, useEffect, useRef, Fragment } from 'react';
import { LIcon } from './LIcon';
import { MatrixRain } from './Hero';

// ---------- Breadcrumb (chrome version) ----------
export function ChromeBreadcrumb({ trail = ["Home"], theme = "light" }) {
  const isDark = theme === "dark";
  const sep = isDark ? "text-zinc-600" : "text-zinc-400";
  const item = isDark ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-zinc-900";
  const last = isDark ? "text-white" : "text-zinc-900";
  return (
    <nav className={`font-mono text-[12px] tracking-wide flex items-center gap-2 ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>
      {trail.map((t, i) => {
        const isLast = i === trail.length - 1;
        return (
          <Fragment key={i}>
            {i > 0 && <LIcon name="ChevronRight" size={12} className={sep} />}
            <span className={isLast ? `${last} font-medium` : `${item} cursor-pointer`}>{t}</span>
          </Fragment>
        );
      })}
    </nav>
  );
}

// ---------- PageHeroWithBackground ----------
export function PageHeroWithBackground({ title, variant = "photo", subjectHue = 142 }) {
  return (
    <section className="relative bg-black overflow-hidden">
      {variant === "photo" ? <HeroPhotoPlate hue={subjectHue} /> : <HeroPatternPlate />}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
      <div className="relative z-20 max-w-[1200px] mx-auto px-6 md:px-10 py-28 md:py-36 text-center">
        <h1 className="font-display font-semibold text-white tracking-tightest text-[44px] md:text-[64px] leading-[1.05]">{title}</h1>
      </div>
    </section>
  );
}

function HeroPhotoPlate() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 60% at 18% 30%, rgba(116,191,0,0.25), transparent 65%), radial-gradient(ellipse 60% 80% at 82% 70%, rgba(116,191,0,0.18), transparent 70%), radial-gradient(ellipse 100% 100% at 50% 50%, rgba(40,40,40,1), rgba(0,0,0,1) 80%)` }} />
      <div className="absolute inset-0 mix-blend-overlay opacity-60" style={{ background: `repeating-linear-gradient(100deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 9px)` }} />
      <MatrixWhisper />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(116,191,0,0.06), rgba(0,0,0,0))" }} />
    </div>
  );
}

function HeroPatternPlate() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 opacity-60" style={{ background: `radial-gradient(ellipse 120% 60% at 50% 50%, rgba(116,191,0,0.15), transparent 70%)` }} />
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 400">
        {Array.from({ length: 18 }).map((_, i) => {
          const y = 20 + i * 22;
          const phase = (i % 3) * 30;
          return <path key={i} d={`M -50 ${y} Q 200 ${y - 24 + phase * 0.4} 400 ${y} T 800 ${y} T 1250 ${y - 8}`} fill="none" stroke="rgba(116,191,0,0.32)" strokeWidth="1" style={{ animation: `drift-x ${28 + i}s linear infinite`, transformOrigin: "center" }} />;
        })}
      </svg>
    </div>
  );
}

function MatrixWhisper() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let raf;
    const fit = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    fit(); window.addEventListener("resize", fit);
    const cols = Math.floor(c.width / 16);
    const drops = Array.from({ length: cols }, () => Math.random() * c.height);
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.10)"; ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = "12px 'Fira Code', monospace"; ctx.fillStyle = "rgba(116,191,0,0.18)";
      drops.forEach((y, i) => { const ch = Math.random() > 0.5 ? "1" : "0"; ctx.fillText(ch, i * 16, y); drops[i] = y > c.height && Math.random() > 0.975 ? 0 : y + 16; });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", fit); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full opacity-70 mix-blend-screen" />;
}

// ---------- PlainPageHeader ----------
export function PlainPageHeader({ title, trail }) {
  return (
    <section className="bg-zinc-50 pt-10 pb-12 md:pt-12 md:pb-14">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {trail && <ChromeBreadcrumb trail={trail} />}
        <h1 className="mt-4 font-display font-semibold tracking-tightest text-zinc-900 text-[36px] md:text-[48px] leading-[1.05]">{title}</h1>
      </div>
    </section>
  );
}

// ---------- BreadcrumbBar ----------
export function BreadcrumbBar({ trail }) {
  return (
    <div className="bg-white border-b border-zinc-100">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-4"><ChromeBreadcrumb trail={trail} /></div>
    </div>
  );
}

// ---------- DonutChart ----------
export function DonutChart({ segments }) {
  const total = segments.reduce((a, s) => a + s.count, 0);
  const r = 56, c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg viewBox="0 0 160 160" className="w-[160px] h-[160px] shrink-0" aria-hidden="true">
      <circle cx="80" cy="80" r={r} fill="none" stroke="rgb(244 244 245)" strokeWidth="18" />
      {segments.map((s, i) => { const len = (s.count / total) * c; const dasharray = `${len} ${c - len}`; const dashoffset = -acc; acc += len; return <circle key={i} cx="80" cy="80" r={r} fill="none" stroke={s.color} strokeWidth="18" strokeDasharray={dasharray} strokeDashoffset={dashoffset} transform="rotate(-90 80 80)" strokeLinecap="butt" />; })}
    </svg>
  );
}

export function ChartLegend({ segments }) {
  return (
    <ul className="flex-1 space-y-3">
      {segments.map((s, i) => (<li key={i} className="flex items-center justify-between gap-4 text-[14px]"><span className="flex items-center gap-2.5 min-w-0"><span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} /><span className="text-zinc-700 truncate">{s.label}</span></span><span className="flex items-center gap-3 shrink-0"><span className="text-zinc-900 font-semibold tabular-nums">{s.count}</span><span className="text-zinc-500 tabular-nums text-[13px] w-12 text-right">{s.percent.toFixed(1)}%</span></span></li>))}
    </ul>
  );
}

// ---------- Form primitives ----------
export function TextInput({ label, required, placeholder, type = "text", value, onChange, helper }) {
  return (<label className="block"><div className="flex items-center justify-between mb-1.5"><span className="font-display text-[13px] font-semibold text-zinc-900">{label}{required && <span className="text-red-500"> *</span>}</span></div><input type={type} placeholder={placeholder} value={value || ""} onChange={(e) => onChange && onChange(e.target.value)} className="w-full h-11 px-3 rounded-lg bg-white border border-zinc-200 text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-immune-green focus:ring-2 focus:ring-immune-green/20 transition" />{helper && <div className="mt-1.5 font-mono text-[11px] text-zinc-500">{helper}</div>}</label>);
}

export function TextArea({ label, required, placeholder, rows = 5, value, onChange }) {
  return (<label className="block"><div className="flex items-center justify-between mb-1.5"><span className="font-display text-[13px] font-semibold text-zinc-900">{label}{required && <span className="text-red-500"> *</span>}</span></div><textarea rows={rows} placeholder={placeholder} value={value || ""} onChange={(e) => onChange && onChange(e.target.value)} className="w-full px-3 py-2.5 rounded-lg bg-white border border-zinc-200 text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-immune-green focus:ring-2 focus:ring-immune-green/20 transition resize-y" /></label>);
}

export function SelectInput({ label, required, placeholder, options = [], value, onChange }) {
  return (<label className="block"><div className="flex items-center justify-between mb-1.5"><span className="font-display text-[13px] font-semibold text-zinc-900">{label}{required && <span className="text-red-500"> *</span>}</span></div><div className="relative"><select value={value || ""} onChange={(e) => onChange && onChange(e.target.value)} className="w-full h-11 px-3 pr-9 rounded-lg bg-white border border-zinc-200 text-[14px] text-zinc-900 focus:outline-none focus:border-immune-green focus:ring-2 focus:ring-immune-green/20 transition appearance-none"><option value="" disabled>{placeholder || "Select..."}</option>{options.map((o) => <option key={o} value={o}>{o}</option>)}</select><LIcon name="ChevronDown" size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" /></div></label>);
}

// ---------- RadioCard ----------
export function RadioCard({ icon, title, desc, hint, tone, selected, onClick, size = "md" }) {
  const toneCls = tone === "good" ? "text-immune-green-deep" : tone === "bad" ? "text-red-600" : "text-zinc-500";
  const pad = size === "sm" ? "p-3.5" : "p-4";
  return (<button type="button" onClick={onClick} className={`w-full text-left ${pad} rounded-xl border transition flex items-start gap-3 ${selected ? "border-immune-green bg-immune-green/[0.06]" : "border-zinc-200 bg-white hover:border-zinc-300"}`}><div className="flex-1 min-w-0"><div className="font-display text-[14px] font-semibold text-zinc-900">{title}</div>{desc && <div className="text-[13px] text-zinc-600 mt-0.5">{desc}</div>}{hint && <div className={`mt-1 font-mono text-[11px] ${toneCls}`}>{hint}</div>}</div><span className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${selected ? "border-immune-green" : "border-zinc-300"}`}>{selected && <span className="w-2.5 h-2.5 rounded-full bg-immune-green" />}</span></button>);
}

// ---------- FormFieldGroup ----------
export function FormFieldGroup({ title, optional, children }) {
  return (<div className="rounded-xl border border-zinc-200 bg-white p-5 md:p-6"><div className="flex items-center justify-between mb-4"><h3 className="font-display text-[15px] font-semibold text-zinc-900">{title} <span className="text-red-500">{optional ? "" : "*"}</span></h3>{optional && <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 px-2 py-0.5 rounded bg-zinc-100">Optional</span>}</div><div>{children}</div></div>);
}

// ---------- WizardStepper ----------
export function WizardStepper({ steps, current }) {
  return (<div className="flex items-center w-full overflow-x-auto no-scrollbar">{steps.map((label, i) => {
    const state = i < current ? "done" : i === current ? "active" : "pending";
    const circle = state === "done" ? "bg-immune-green text-white border-immune-green" : state === "active" ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-400 border-zinc-300";
    const labelCls = state === "pending" ? "text-zinc-400" : "text-zinc-900 font-semibold";
    return (<Fragment key={i}><div className="flex items-center gap-2.5 shrink-0"><span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-display text-[13px] ${circle}`}>{state === "done" ? <LIcon name="Check" size={14} strokeWidth={3} /> : i + 1}</span><span className={`text-[13px] font-display ${labelCls} hidden sm:inline whitespace-nowrap`}>{label}</span></div>{i < steps.length - 1 && (<div className={`flex-1 h-px mx-3 ${i < current ? "bg-immune-green" : "bg-zinc-200"}`} />)}</Fragment>);
  })}</div>);
}

// ---------- RangeSlider ----------
export function RangeSlider({ value, onChange, min = 1, max = 100 }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (<div><div className="relative h-2 rounded-full bg-zinc-200"><div className="absolute h-2 rounded-full bg-immune-green" style={{ width: `${pct}%` }} /></div><input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full mt-2 accent-[#74BF00]" /></div>);
}

// ---------- SegmentedSelect ----------
export function SegmentedSelect({ options, value, onChange }) {
  const idx = Math.max(0, options.indexOf(value));
  const pct = ((idx + 1) / options.length) * 100;
  return (<div><div className="relative h-1.5 rounded-full bg-zinc-100 mb-3 overflow-hidden"><div className="absolute h-full bg-immune-green transition-[width] duration-300" style={{ width: `${pct}%` }} /></div><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">{options.map((o) => (<button key={o} type="button" onClick={() => onChange(o)} className={`px-3 py-2 rounded-full text-[13px] font-display font-medium border transition ${value === o ? "bg-zinc-900 border-zinc-900 text-white" : "bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200"}`}>{o}</button>))}</div></div>);
}

// ---------- LogoCard ----------
export function LogoCard({ name }) {
  const tones = ["text-zinc-900","text-immune-green-deep","text-zinc-700","text-zinc-800"];
  const tone = tones[name.length % tones.length];
  return (<div className="group relative h-[88px] rounded-lg border border-zinc-200 bg-white flex items-center justify-center px-4 transition hover:border-immune-green/40 hover:-translate-y-0.5"><span className={`font-mono text-[13px] tracking-[0.18em] uppercase font-bold ${tone}`}>{name}</span></div>);
}
