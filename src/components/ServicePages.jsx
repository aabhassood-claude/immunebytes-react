import { useState, useEffect, useRef, Fragment } from 'react';
import { LIcon } from './LIcon';
import { LogoMark } from './Logo';
import { SectionLabel, ButtonGhost, Reveal, SectionHeading } from './Primitives';
import { CTA } from './Sections';

// ----- Page Hero -----
export function PageHero({ label, title, subhead }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    let w = 0, h = 0;
    const COLS_DENSITY = 28;
    let cols = 0;
    let drops = [];
    const chars = "0123456789ABCDEF{}/></_=*+-".split("");
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(w / COLS_DENSITY);
      drops = new Array(cols).fill(0).map(() => Math.random() * -h);
    };
    resize(); window.addEventListener("resize", resize);
    let frame = 0; let raf;
    const tick = () => {
      frame++;
      ctx.fillStyle = "rgba(0,0,0,0.16)"; ctx.fillRect(0, 0, w, h);
      ctx.font = "13px 'Fira Code', monospace";
      for (let i = 0; i < cols; i++) {
        if (frame % 3 !== 0 && Math.random() > 0.4) continue;
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const x = i * COLS_DENSITY + Math.random() * 6;
        const y = drops[i];
        ctx.fillStyle = `rgba(116,191,0,${0.18 + Math.random() * 0.18})`;
        ctx.fillText(ch, x, y);
        if (y > h && Math.random() > 0.97) drops[i] = -20;
        drops[i] += COLS_DENSITY;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <section className="relative bg-black overflow-hidden">
      <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ opacity: 0.55 }} />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black pointer-events-none" />
      <div className="relative max-w-[1100px] mx-auto px-6 pt-24 md:pt-32 pb-32 md:pb-36 text-center">
        <Reveal><SectionLabel theme="dark" className="inline-block">{label}</SectionLabel></Reveal>
        <Reveal delay={100}><h1 className="mt-6 font-display font-semibold tracking-tight text-white text-[44px] sm:text-[56px] md:text-[64px] leading-[1.04]">{title}</h1></Reveal>
        <Reveal delay={180}><p className="mt-7 mx-auto text-zinc-400 text-[16px] md:text-[18px] leading-[1.7] max-w-[720px]">{subhead}</p></Reveal>
      </div>
    </section>
  );
}

// ----- Breadcrumb -----
export function Breadcrumb({ items }) {
  return (
    <div className="relative z-10 bg-black border-b border-zinc-900 pt-[72px]">
      <div className="max-w-[1280px] mx-auto px-6 h-12 flex items-center font-mono text-[11.5px] text-zinc-500 overflow-x-auto no-scrollbar">
        <span className="text-immune-green mr-2">$</span>
        {items.map((it, i) => (
          <Fragment key={i}>
            {i > 0 && <span className="text-zinc-700 mx-2">/</span>}
            <span className={i === items.length - 1 ? "text-zinc-300" : "text-zinc-500"}>{it}</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

// ----- Coverage B Mark -----
function CoverageBMark() {
  return (
    <div className="relative w-full h-[280px] md:h-[400px] flex items-center justify-center">
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(116,191,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(116,191,0,0.06) 1px, transparent 1px)", backgroundSize: "24px 24px", maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 80%)" }} />
      <LogoMark theme="light" size={260} />
    </div>
  );
}

// ----- Coverage List -----
export function CoverageList({ data }) {
  return (
    <section className="bg-white py-24 md:py-28">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
        <Reveal className="md:col-span-5"><CoverageBMark /></Reveal>
        <div className="md:col-span-7">
          <Reveal><SectionLabel theme="light">{data.label}</SectionLabel></Reveal>
          <Reveal delay={80}><h2 className="mt-4 font-display font-semibold tracking-tight text-zinc-900 text-[34px] md:text-[44px] leading-[1.05]">{data.title}</h2></Reveal>
          <ul className="mt-9 border-t border-zinc-100">
            {data.items.map((it, i) => (
              <Reveal key={i} delay={50 * i} as="li">
                <div className="flex items-start gap-4 py-5 border-b border-zinc-100">
                  <span className="font-mono text-immune-green text-[16px] leading-[1.4] mt-px shrink-0">&rsaquo;</span>
                  <span className="text-zinc-700 text-[16px] leading-[1.6]">{it}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ----- Coverage List Detailed -----
export function CoverageListDetailed({ data }) {
  return (
    <section className="bg-white py-24 md:py-28">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <Reveal className="md:col-span-5 md:sticky md:top-32 self-start"><CoverageBMark /></Reveal>
        <div className="md:col-span-7">
          <Reveal><SectionLabel theme="light">{data.label}</SectionLabel></Reveal>
          <Reveal delay={80}><h2 className="mt-4 font-display font-semibold tracking-tight text-zinc-900 text-[34px] md:text-[44px] leading-[1.05]">{data.title}</h2></Reveal>
          <ul className="mt-9 border-t border-zinc-100">
            {data.items.map((it, i) => (
              <Reveal key={i} delay={60 * i} as="li">
                <div className="flex items-start gap-4 py-7 border-b border-zinc-100">
                  <span className="font-mono text-immune-green text-[16px] leading-[1.4] mt-1 shrink-0">&rsaquo;</span>
                  <div className="flex-1">
                    <div className="font-display font-semibold text-zinc-900 text-[18px] tracking-tight">{it.name}<span className="text-zinc-400">.</span></div>
                    <p className="mt-2 text-zinc-700 text-[15.5px] leading-[1.7] max-w-[640px]">{it.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ----- Failure Modes -----
export function FailureModes({ data }) {
  return (
    <section className="relative bg-black py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1/2 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(116,191,0,0.10), transparent 70%)" }} />
      <div className="relative max-w-[1100px] mx-auto px-6">
        <div className="text-center">
          <Reveal><SectionLabel theme="dark" className="inline-block">{data.label}</SectionLabel></Reveal>
          <Reveal delay={80}><h2 className="mt-4 font-display font-semibold tracking-tight text-white text-[32px] md:text-[42px] leading-[1.05]">{data.title}</h2></Reveal>
        </div>
        <div className="mt-14 flex flex-col gap-5">
          {data.cards.map((c, i) => (
            <Reveal key={i} delay={80 * i}>
              <div className="failure-card group flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8 bg-zinc-900/70 border border-zinc-800 hover:border-immune-green/30 transition-colors">
                <div className="shrink-0 h-16 w-16 md:h-20 md:w-20 bg-zinc-950 border border-zinc-800 flex items-center justify-center group-hover:border-immune-green/40 transition-colors">
                  <LIcon name={c.icon} size={28} strokeWidth={1.5} className="text-zinc-200 group-hover:text-immune-green transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-white text-[22px] md:text-[24px] leading-tight tracking-tight">{c.title}</h3>
                  <p className="mt-3 text-zinc-400 text-[15.5px] md:text-[16px] leading-[1.7] max-w-[820px]">{c.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----- Binary Rain Backdrop -----
function BinaryRainBackdrop() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    let w = 0, h = 0, cols = 0, drops = [];
    const colW = 18;
    const resize = () => { w = canvas.clientWidth; h = canvas.clientHeight; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); cols = Math.floor(w / colW); drops = new Array(cols).fill(0).map(() => Math.random() * -h); };
    resize(); window.addEventListener("resize", resize);
    let raf; let visible = true;
    if ("IntersectionObserver" in window) { const observer = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 }); observer.observe(canvas); }
    const tick = () => {
      if (visible) { ctx.fillStyle = "rgba(255,255,255,0.18)"; ctx.fillRect(0, 0, w, h); ctx.font = "11px 'Fira Code', monospace";
        for (let i = 0; i < cols; i++) { if (Math.random() > 0.6) continue; const ch = Math.random() > 0.5 ? "1" : "0"; const x = i * colW; const y = drops[i]; ctx.fillStyle = `rgba(116,191,0,${0.14 + Math.random() * 0.18})`; ctx.fillText(ch, x, y); if (y > h && Math.random() > 0.96) drops[i] = -20; drops[i] += colW; } }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <div className="relative w-full h-full min-h-[400px] overflow-hidden bg-zinc-50 border border-zinc-200">
      <canvas ref={ref} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-zinc-50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-zinc-50 to-transparent" />
    </div>
  );
}

// ----- Process Section -----
export function ProcessSection({ data }) {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-[680px]">
          <Reveal><SectionLabel theme="light">{data.label}</SectionLabel></Reveal>
          <Reveal delay={80}><h2 className="mt-4 font-display font-semibold tracking-tight text-zinc-900 text-[34px] md:text-[44px] leading-[1.05]">{data.title}</h2></Reveal>
        </div>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
          <Reveal delay={120} className="md:col-span-4 md:sticky md:top-32"><BinaryRainBackdrop /></Reveal>
          <div className="md:col-span-8 flex flex-col gap-4">
            {data.steps.map((s, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="relative bg-white border border-zinc-200 p-6 md:p-7 hover:border-zinc-300 transition-colors">
                  <div className="absolute top-5 right-5 font-mono text-[12px] text-zinc-400">{String(i + 1).padStart(2, "0")}</div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-md bg-zinc-900 text-white flex items-center justify-center"><LIcon name={s.icon} size={15} strokeWidth={1.75} /></div>
                    <h3 className="font-display font-semibold text-zinc-900 text-[18px] md:text-[20px] tracking-tight">{s.title}</h3>
                  </div>
                  <p className="mt-3 text-zinc-600 text-[14.5px] md:text-[15px] leading-[1.7] max-w-[600px]">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ----- Tools and Standards -----
export function ToolsStandards({ data }) {
  return (
    <section className="relative bg-black py-24 md:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(116,191,0,0.06), transparent 70%)" }} />
      <div className="relative max-w-[1200px] mx-auto px-6">
        <div className="text-center">
          <Reveal><SectionLabel theme="dark" className="inline-block">{data.label}</SectionLabel></Reveal>
          <Reveal delay={80}><h2 className="mt-4 font-display font-semibold tracking-tight text-white text-[32px] md:text-[42px] leading-[1.05]">{data.title}</h2></Reveal>
        </div>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-[920px] mx-auto">
          <Reveal>
            <div className="font-display font-semibold text-white text-[18px] md:text-[20px] tracking-tight pb-3 border-b border-zinc-800">Core Tooling</div>
            <ul className="mt-5 flex flex-col gap-3">{data.coreTooling.map((t, i) => (<li key={i} className="flex items-start gap-3 text-zinc-300 text-[15px] leading-[1.6]"><span className="text-immune-green font-mono mt-1 shrink-0">&rsaquo;</span><span>{t}</span></li>))}</ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="font-display font-semibold text-white text-[18px] md:text-[20px] tracking-tight pb-3 border-b border-zinc-800">{data.outputsHeading || "Audit outputs"}</div>
            <ul className="mt-5 flex flex-col gap-3">{data.outputs.map((t, i) => (<li key={i} className="flex items-start gap-3 text-zinc-300 text-[15px] leading-[1.6]"><span className="text-immune-green font-mono mt-1 shrink-0">&rsaquo;</span><span>{t}</span></li>))}</ul>
          </Reveal>
        </div>
        <div className="mt-16 pt-10 border-t border-zinc-900">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {data.logos.map((l) => (<div key={l} className="logo-grey text-zinc-400 font-display font-semibold text-[15px] tracking-wide hover:text-white transition-colors">{l}</div>))}
          </div>
          <p className="mt-7 text-center font-mono text-[12px] text-zinc-500"><span className="text-immune-green">&rsaquo;</span> {data.caption}</p>
        </div>
      </div>
    </section>
  );
}

// ----- Deliverables -----
export function Deliverables({ data }) {
  return (
    <section className="relative bg-black py-24 md:py-28 overflow-hidden border-y border-zinc-900">
      <div className="absolute inset-0 terminal-grid opacity-60 pointer-events-none" />
      <div className="relative max-w-[1280px] mx-auto px-6">
        <div className="max-w-[760px]"><Reveal><SectionLabel theme="dark">{data.label}</SectionLabel></Reveal><Reveal delay={80}><h2 className="mt-4 font-display font-semibold tracking-tight text-white text-[34px] md:text-[44px] leading-[1.05]">{data.title}</h2></Reveal></div>
        <ul className="mt-12 max-w-[760px] flex flex-col gap-5">
          {data.items.map((it, i) => (
            <Reveal key={i} delay={i * 100}><li className="flex items-start gap-4 py-2">
              <svg viewBox="0 0 24 24" width="22" height="22" className="shrink-0 mt-1" fill="none" stroke="#74BF00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path className="check-path" d="M20 6L9 17l-5-5" /></svg>
              <span className="text-zinc-200 text-[16.5px] md:text-[18px] leading-[1.6]">{it}</span>
            </li></Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ----- Page Case Study -----
export function PageCaseStudy({ data }) {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6">
        <Reveal><SectionHeading label="case_studies" title="Securing High-Impact Enterprise Systems." action={<ButtonGhost href="/case-studies" theme="light">All Case Studies</ButtonGhost>} theme="light" /></Reveal>
        <Reveal delay={120}>
          <a href="/case-studies" className="group mt-14 grid grid-cols-1 md:grid-cols-12 border border-zinc-200 rounded-lg overflow-hidden hover:border-zinc-300 transition-colors">
            <div className="md:col-span-5 relative bg-black p-8 md:p-10 min-h-[280px] md:min-h-[420px] overflow-hidden">
              <div className="absolute inset-0 terminal-grid opacity-50" />
              <div className="absolute -right-8 -bottom-12 opacity-90"><LogoMark theme="dark" size={280} /></div>
              <div className="absolute inset-0" style={{ background: "radial-gradient(80% 60% at 30% 30%, rgba(116,191,0,0.10), transparent 70%)" }} />
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 px-3 h-7 rounded-full bg-immune-green/15 text-immune-green font-mono text-[11px] uppercase tracking-[0.15em]"><span className="w-1.5 h-1.5 rounded-full bg-immune-green" />Case Study</span>
                <h3 className="mt-44 md:mt-56 font-display text-white font-semibold text-[26px] md:text-[32px] leading-tight tracking-tight max-w-[400px]">{data.name}</h3>
              </div>
            </div>
            <div className="md:col-span-7 bg-zinc-50 p-8 md:p-12 flex flex-col">
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">{data.tag}</div>
              <p className="mt-5 text-zinc-700 text-[15px] md:text-[16px] leading-[1.75] max-w-[560px]"><strong className="font-semibold text-zinc-900">Background:</strong> A representative engagement showcasing how we apply this practice.</p>
              <dl className="mt-8 grid grid-cols-3 gap-4 max-w-[480px]">
                {[{ k: "Engagement", v: data.weeks },{ k: "Findings", v: data.findings },{ k: "Coverage", v: data.coverage }].map((it) => (<div key={it.k} className="flex flex-col"><dt className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-zinc-500">{it.k}</dt><dd className="mt-1 font-display font-semibold text-zinc-900 text-[16px]">{it.v}</dd></div>))}
              </dl>
              <div className="mt-auto pt-10"><span className="inline-flex items-center gap-1.5 font-display text-[14px] font-medium text-zinc-700 group-hover:text-immune-green transition-colors">Read More <LIcon name="ArrowRight" size={14} strokeWidth={2.25} className="card-arrow" /></span></div>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

// ----- FAQ Accordion -----
export function FAQAccordion({ data }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="max-w-[640px]"><Reveal><SectionLabel theme="light">{data.label}</SectionLabel></Reveal><Reveal delay={80}><h2 className="mt-4 font-display font-semibold tracking-tight text-zinc-900 text-[34px] md:text-[44px] leading-[1.05]">{data.title}</h2></Reveal><Reveal delay={140}><p className="mt-4 text-zinc-500 text-[16px]">{data.subhead}</p></Reveal></div>
        <div className="mt-12 max-w-[880px]">
          {data.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={40 * i}><div className="border-b border-zinc-200">
                <button onClick={() => setOpen(isOpen ? -1 : i)} className="w-full flex items-start justify-between gap-6 py-6 text-left group">
                  <h3 className={`font-display font-medium text-[17px] md:text-[19px] tracking-tight leading-snug transition-colors ${isOpen ? "text-immune-green" : "text-zinc-900 group-hover:text-zinc-700"}`}>{item.q}</h3>
                  <span className={`shrink-0 mt-1 h-7 w-7 rounded-full border flex items-center justify-center transition-all ${isOpen ? "border-immune-green text-immune-green rotate-45" : "border-zinc-300 text-zinc-700"}`}><LIcon name="Plus" size={14} strokeWidth={2.5} /></span>
                </button>
                <div className="grid transition-all duration-300 ease-in-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}>
                  <div className="overflow-hidden"><p className="pb-7 pr-12 text-zinc-600 text-[15px] md:text-[16px] leading-[1.75] max-w-[760px]">{item.a}</p></div>
                </div>
              </div></Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ----- Prose Section -----
export function ProseSection({ data }) {
  let bgCls = "bg-white"; let labelTheme = "light"; let headingCls = "text-zinc-900"; let bodyCls = "text-zinc-700"; let monoSwap = false; let extra = null;
  if (data.bg === "dark-green") { bgCls = "relative bg-black"; labelTheme = "dark"; headingCls = "text-white"; bodyCls = "text-zinc-300"; extra = <div className="absolute inset-x-0 top-0 h-1/2 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(116,191,0,0.10), transparent 70%)" }} />; }
  else if (data.bg === "dark-grid") { bgCls = "relative bg-black"; labelTheme = "dark"; headingCls = data.titleGreen ? "text-immune-green" : "text-white"; bodyCls = "text-zinc-200"; extra = <div className="absolute inset-0 terminal-grid opacity-60 pointer-events-none" />; }
  else if (data.bg === "light") { bgCls = "bg-white"; labelTheme = "light"; headingCls = "text-zinc-900"; bodyCls = "text-zinc-700"; monoSwap = true; }
  return (
    <section className={`${bgCls} py-24 md:py-32`}>{extra}
      <div className="relative max-w-[820px] mx-auto px-6 text-center">
        <Reveal><SectionLabel theme={labelTheme} className="inline-block">{data.label}</SectionLabel></Reveal>
        <Reveal delay={80}><h2 className={`mt-5 font-display font-semibold tracking-tight ${headingCls} text-[32px] md:text-[42px] leading-[1.08]`}>{data.title}</h2></Reveal>
        <div className="mt-9 flex flex-col gap-6">
          {data.paragraphs.map((p, i) => {
            if (p && p.closing) return <Reveal key={i} delay={200 + i * 80}><p className={`${bodyCls} text-[18px] md:text-[20px] leading-[1.65] font-display font-medium`}>{p.closing}</p></Reveal>;
            return (<Reveal key={i} delay={120 + i * 60}><p className={`${bodyCls} text-[17px] md:text-[18.5px] leading-[1.75]`}>
              {Array.isArray(p) ? p.map((part, j) => { if (typeof part === "string") return <Fragment key={j}>{part}</Fragment>; if (part.mono) { const cls = monoSwap ? "font-mono text-zinc-900 font-medium" : "font-mono text-immune-green"; return <span key={j} className={cls}>{part.mono}</span>; } return null; }) : p}
            </p></Reveal>);
          })}
        </div>
      </div>
    </section>
  );
}

// ----- Page Orchestrators -----
export function StructuredServicePage({ data }) {
  const failuresData = data.failures || data.failureModes;
  return (
    <div className="bg-white">
      <Breadcrumb items={data.breadcrumb} />
      <PageHero {...data.hero} />
      {data.coverage && (data.coverage.detailed ? <CoverageListDetailed data={data.coverage} /> : <CoverageList data={data.coverage} />)}
      {failuresData && <FailureModes data={failuresData} />}
      {data.process && <ProcessSection data={data.process} />}
      {data.tools && <ToolsStandards data={data.tools} />}
      {data.deliverables && <Deliverables data={data.deliverables} />}
      {data.caseStudy && <PageCaseStudy data={data.caseStudy} />}
      <CTA />
      {data.faq && <FAQAccordion data={data.faq} />}
    </div>
  );
}

export function ProseServicePage({ data }) {
  return (
    <div className="bg-white">
      <Breadcrumb items={data.breadcrumb} />
      <PageHero {...data.hero} />
      {data.coverage && (data.coverage.detailed ? <CoverageListDetailed data={data.coverage} /> : <CoverageList data={data.coverage} />)}
      {data.prose && data.prose.map((section, i) => <ProseSection key={i} data={section} />)}
      {data.caseStudy && <PageCaseStudy data={data.caseStudy} />}
      <CTA />
      {data.faq && <FAQAccordion data={data.faq} />}
    </div>
  );
}
