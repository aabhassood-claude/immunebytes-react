import { useState, useRef, useEffect, Fragment } from 'react';
import { LIcon } from './LIcon';
import { BreadcrumbBar, PageHeroWithBackground, PlainPageHeader, DonutChart, ChartLegend, TextInput, TextArea, SelectInput, RadioCard, FormFieldGroup, WizardStepper, RangeSlider, SegmentedSelect, LogoCard } from './ChromeComponents';

import { DATA_AUDIT, DATA_CLIENTELE, DATA_ABOUT, DATA_ENGAGEMENT, DATA_ENGAGEMENT_HELP, DATA_CALCULATOR, DATA_BLOG, DATA_CONTACT } from '../data/chromeData';

// ---- Shared helpers ----
function PageBtn({ label, active, disabled }) {
  return (<button disabled={disabled} className={`min-w-[32px] h-8 px-2.5 rounded-md text-[12.5px] font-medium transition grid place-items-center ${active ? "bg-immune-green-deep text-white" : disabled ? "text-zinc-300" : "text-zinc-700 hover:bg-zinc-100"}`}>{label}</button>);
}

function CtaStrip({ eyebrow, title, sub, cta }) {
  return (
    <section className="relative bg-zinc-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{ background: "radial-gradient(circle at 30% 50%, #74BF00 0%, transparent 50%)" }} />
      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20 grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
        <div><div className="font-mono text-[12px] text-immune-green tracking-[0.16em]">{eyebrow}</div><h2 className="mt-3 font-display text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.02em] font-medium">{title}</h2><p className="mt-3 text-zinc-300 text-[15.5px] max-w-xl">{sub}</p></div>
        <a href="/contact" className="self-start md:self-auto inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-immune-green text-zinc-950 font-display font-semibold text-[14.5px] hover:bg-immune-green-bright transition">{cta} <LIcon name="ArrowRight" size={15} /></a>
      </div>
    </section>
  );
}

function DonutPanel({ title, segments }) {
  return (<div className="rounded-2xl bg-white ring-1 ring-zinc-200 p-6 md:p-7"><div className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">// {title.toLowerCase()}</div><h3 className="mt-1 font-display text-[20px] md:text-[22px] tracking-[-0.015em] font-medium text-zinc-900">{title}</h3><div className="mt-5 flex items-center gap-7"><DonutChart segments={segments} /><ChartLegend segments={segments} /></div></div>);
}

function BinaryRainBg() {
  return (<div className="absolute inset-0 pointer-events-none opacity-[0.05] font-mono text-[10px] leading-[12px] text-immune-green-deep overflow-hidden select-none">{Array.from({ length: 18 }).map((_, i) => (<div key={i} className="absolute whitespace-nowrap" style={{ left: `${(i * 6.5) % 100}%`, top: `${(i * 13) % 100}%` }}>{Array.from({ length: 80 }).map((_, j) => (j + i) % 2).join(" ")}</div>))}</div>);
}

// =========================================================
// §27 — AUDIT LEADERBOARD
// =========================================================
export function AuditLeaderboardPage() {
  const D = DATA_AUDIT;
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const filters = ["All","Ethereum","Solana","Polygon","BSC","L1","DApp","Token","DeFi"];
  const filtered = D.projects.filter((p) => { if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false; if (filter === "All") return true; return p.platform === filter || p.tags.some((t) => t.replace(/\+\d+/, "").trim() === filter); });

  return (
    <main className="bg-white">
      <BreadcrumbBar trail={["Home","Audit Leaderboard"]} />
      <section className="relative pt-12 md:pt-16 pb-10 bg-gradient-to-b from-zinc-50 to-white border-b border-zinc-100 overflow-hidden">
        <BinaryRainBg />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-immune-green-deep"><span className="w-2 h-2 rounded-full bg-immune-green" /> Live Audit Leaderboard</div>
          <h1 className="mt-3 font-display text-[40px] md:text-[56px] leading-[1.04] tracking-[-0.025em] font-medium text-zinc-900 max-w-4xl">Audit <em className="font-display italic font-light text-immune-green-deep">Leaderboard</em></h1>
          <p className="mt-4 text-zinc-600 text-[16px] md:text-[17px] max-w-3xl leading-relaxed">Comprehensive overview of audited projects, vulnerabilities found, and platforms secured.</p>
        </div>
      </section>
      <section className="bg-white border-b border-zinc-100"><div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-5">{D.stats.map((s) => (<div key={s.label} className="rounded-xl bg-zinc-50 ring-1 ring-zinc-200/60 p-5 hover:ring-immune-green/40 transition"><div className="font-display text-[36px] md:text-[42px] leading-none tracking-[-0.025em] font-medium text-zinc-900">{s.value}</div><div className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">{s.label}</div></div>))}</div></section>
      <section className="bg-zinc-50/60 border-b border-zinc-100"><div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid md:grid-cols-2 gap-6"><DonutPanel title="Vulnerability Severity Distribution" segments={D.severity} /><DonutPanel title="Platform Distribution" segments={D.platforms} /></div></section>
      <section className="bg-white"><div className="max-w-7xl mx-auto px-6 py-12 md:py-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6"><div><div className="font-mono text-[11px] uppercase tracking-[0.18em] text-immune-green-deep">$ leaderboard --recent</div><h2 className="mt-2 font-display text-[28px] md:text-[34px] tracking-[-0.02em] font-medium text-zinc-900">Recent Audits</h2></div><div className="relative"><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search project\u2026" className="h-10 w-64 rounded-lg border border-zinc-200 bg-white pl-9 pr-3 text-[13px] text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-immune-green/40 focus:border-immune-green" /><LIcon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" /></div></div>
        <div className="flex flex-wrap gap-2 mb-6">{filters.map((f) => (<button key={f} onClick={() => setFilter(f)} className={`h-8 px-3.5 rounded-full text-[12.5px] font-medium transition ring-1 ${f === filter ? "bg-immune-green-deep text-white ring-immune-green-deep" : "bg-white text-zinc-700 ring-zinc-200 hover:ring-zinc-400"}`}>{f}</button>))}</div>
        <div className="rounded-xl ring-1 ring-zinc-200 overflow-hidden"><table className="w-full text-[13.5px]"><thead><tr className="bg-zinc-50 text-zinc-500 font-mono text-[11px] uppercase tracking-[0.14em]"><th className="text-left px-5 py-3 font-medium">Project</th><th className="text-left px-5 py-3 font-medium">Audit Date</th><th className="text-left px-5 py-3 font-medium">Platform</th><th className="text-left px-5 py-3 font-medium">Tags</th><th className="text-right px-5 py-3 font-medium">Report</th></tr></thead><tbody className="divide-y divide-zinc-100">{filtered.map((p, i) => { const tint = D.platformTints[p.platform] || { bg: "rgb(244 244 245)", text: "rgb(82 82 91)", dot: "#a1a1aa" }; return (<tr key={i} className="bg-white hover:bg-zinc-50/60 transition"><td className="px-5 py-3.5"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-gradient-to-br from-zinc-900 to-zinc-700 text-white grid place-items-center font-mono text-[11px] font-bold">{p.logo}</div><div className="font-display text-[14.5px] font-medium text-zinc-900">{p.name}</div></div></td><td className="px-5 py-3.5 font-mono text-[12.5px] text-zinc-600">{p.date}</td><td className="px-5 py-3.5"><span className="inline-flex items-center gap-1.5 px-2.5 h-6 rounded-full text-[11.5px] font-medium" style={{ background: tint.bg, color: tint.text }}><span className="w-1.5 h-1.5 rounded-full" style={{ background: tint.dot }} />{p.platform}</span></td><td className="px-5 py-3.5"><div className="flex flex-wrap gap-1.5">{p.tags.map((t, ti) => (<span key={ti} className="inline-flex items-center px-2 h-6 rounded-md bg-zinc-100 text-zinc-700 text-[11.5px] font-medium">{t}</span>))}</div></td><td className="px-5 py-3.5 text-right"><a href="#" className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-immune-green-deep hover:underline">View report <LIcon name="ArrowUpRight" size={13} /></a></td></tr>); })}</tbody></table></div>
        <div className="mt-5 flex items-center justify-between text-[12.5px] text-zinc-500"><div>Showing <span className="text-zinc-800 font-medium">{filtered.length}</span> of <span className="text-zinc-800 font-medium">{D.pageMeta.rowsTotal}</span> audits</div><div className="flex items-center gap-1"><PageBtn label={<LIcon name="ChevronLeft" size={14} />} disabled /><PageBtn label="1" active /><PageBtn label="2" /><PageBtn label="3" /><span className="px-1 text-zinc-400">&hellip;</span><PageBtn label={String(D.pageMeta.pagesTotal)} /><PageBtn label={<LIcon name="ChevronRight" size={14} />} /></div></div>
      </div></section>
      <CtaStrip eyebrow="$ ./schedule_audit.sh" title="Ready to be on the leaderboard?" sub="Join 1,000+ teams that ship with auditor-grade confidence." cta="Schedule Your Audit" />
    </main>
  );
}

// =========================================================
// §28 — CLIENTELE (simplified)
// =========================================================
export function ClientelePage() {
  const D = DATA_CLIENTELE;
  return (<main className="bg-white">
    <PageHeroWithBackground title="Our Clientele" variant="photo" subjectHue={142} />
    <BreadcrumbBar trail={["Home","Clientele"]} />
    <section className="bg-white"><div className="max-w-6xl mx-auto px-6 pt-14 md:pt-20 text-center"><div className="font-mono text-[11px] uppercase tracking-[0.18em] text-immune-green-deep">$ ls -la /clients</div><h2 className="mt-3 font-display text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.02em] font-medium text-zinc-900">{D.ourClientsHead.title}</h2><p className="mt-4 text-zinc-600 text-[15.5px] max-w-3xl mx-auto leading-relaxed">{D.ourClientsHead.sub}</p></div></section>
    <section className="bg-white"><div className="max-w-6xl mx-auto px-6 py-10 md:py-12"><div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">{D.clients.map((c) => <LogoCard key={c} name={c} />)}</div></div></section>
    <section className="bg-zinc-50 border-y border-zinc-100"><div className="max-w-6xl mx-auto px-6 pt-14 md:pt-20 text-center"><div className="font-mono text-[11px] uppercase tracking-[0.18em] text-immune-green-deep">// testimonials</div><h2 className="mt-3 font-display text-[32px] md:text-[42px] leading-[1.06] tracking-[-0.02em] font-medium text-zinc-900">{D.testimonialsHead.title}</h2><p className="mt-4 text-zinc-600 text-[15.5px] max-w-2xl mx-auto leading-relaxed">{D.testimonialsHead.sub}</p></div>
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-14"><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{D.videos.map((v, i) => (<div key={i} className="group relative rounded-xl overflow-hidden ring-1 ring-zinc-200 bg-white hover:ring-immune-green/40 transition"><div className="aspect-[4/5] relative overflow-hidden" style={{ background: `radial-gradient(circle at 40% 35%, hsl(${v.hue} 60% 70%) 0%, hsl(${v.hue} 35% 35%) 55%, hsl(${v.hue} 30% 18%) 100%)` }}><div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" /><div className="absolute inset-0 grid place-items-center"><div className="w-14 h-14 rounded-full bg-white/95 grid place-items-center shadow-2xl group-hover:scale-110 transition"><LIcon name="Play" size={20} className="text-zinc-900 ml-0.5" /></div></div><div className="absolute bottom-3 left-3 right-3 text-white"><div className="font-display text-[14.5px] font-semibold leading-tight">{v.name}</div><div className="font-mono text-[10.5px] uppercase tracking-[0.12em] opacity-80 mt-0.5">{v.role}</div></div></div><div className="px-3 py-2.5 border-t border-zinc-100"><div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-zinc-500">{v.company}</div></div></div>))}</div></div>
      <div className="max-w-6xl mx-auto px-6 pb-20"><div className="grid md:grid-cols-2 gap-5">{D.texts.map((t, i) => { const dark = t.dark; return (<article key={i} className={`rounded-2xl ${dark ? "bg-zinc-950 text-white ring-1 ring-zinc-900" : "bg-white ring-1 ring-zinc-200"} p-6 md:p-7`}><LIcon name="Quote" size={22} className={dark ? "text-immune-green opacity-70" : "text-immune-green-deep opacity-70"} /><p className={`mt-3 text-[14.5px] leading-relaxed ${dark ? "text-zinc-200" : "text-zinc-800"}`}>{t.quote}</p><div className={`mt-5 pt-5 border-t ${dark ? "border-white/10" : "border-zinc-100"} flex items-center gap-3`}><div className={`w-10 h-10 rounded-full ${dark ? "bg-immune-green" : "bg-zinc-900"} grid place-items-center ${dark ? "text-zinc-950" : "text-white"} font-mono text-[12px] font-bold`}>{t.initials}</div><div><div className={`font-display font-semibold text-[14px] ${dark ? "" : "text-zinc-900"}`}>{t.name}</div><div className={`font-mono text-[10.5px] uppercase tracking-[0.14em] ${dark ? "text-zinc-400" : "text-zinc-500"}`}>{t.role} &middot; {t.company}</div></div></div></article>); })}</div></div>
    </section>
    <CtaStrip eyebrow="$ ./join_them.sh" title="Build alongside teams who take security seriously." sub="From institutional finance to indie protocols." cta="Talk to an Auditor" />
  </main>);
}

// =========================================================
// §29 — ABOUT
// =========================================================
export function AboutPage() {
  const D = DATA_ABOUT;
  return (<main className="bg-white">
    <PageHeroWithBackground title="About ImmuneBytes" variant="pattern" />
    <BreadcrumbBar trail={["Home","About"]} />
    <section className="bg-white"><div className="max-w-4xl mx-auto px-6 py-14 md:py-20 text-center"><div className="font-mono text-[11px] uppercase tracking-[0.18em] text-immune-green-deep">// who_we_are</div><p className="mt-4 font-display text-[20px] md:text-[24px] leading-[1.45] tracking-[-0.012em] text-zinc-800 text-pretty">{D.intro}</p></div></section>
    <section className="bg-zinc-50 border-y border-zinc-100"><div className="max-w-6xl mx-auto px-6 py-14 md:py-20 grid md:grid-cols-2 gap-5">{[D.mission, D.vision].map((b) => (<div key={b.title} className="rounded-2xl bg-white ring-1 ring-zinc-200 p-7 md:p-8"><div className="w-12 h-12 rounded-xl bg-immune-green/10 ring-1 ring-immune-green/30 grid place-items-center"><LIcon name={b.icon} size={20} className="text-immune-green-deep" /></div><div className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-immune-green-deep">{b.title}</div><p className="mt-2 font-display text-[17px] md:text-[18.5px] leading-[1.55] tracking-[-0.005em] text-zinc-800 text-pretty">{b.body}</p></div>))}</div></section>
    <section className="bg-white"><div className="max-w-6xl mx-auto px-6 py-14 md:py-20"><div className="font-mono text-[11px] uppercase tracking-[0.18em] text-immune-green-deep">$ cat /values.md</div><h2 className="mt-2 font-display text-[34px] md:text-[42px] tracking-[-0.02em] font-medium text-zinc-900 max-w-2xl">What we <em className="font-display italic font-light text-immune-green-deep">stand for</em>.</h2><div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">{D.values.map((v, i) => (<div key={v.title} className="rounded-xl ring-1 ring-zinc-200 bg-white p-5 hover:ring-immune-green/40 hover:-translate-y-0.5 transition"><div className="font-mono text-[10.5px] text-zinc-400">VALUE_0{i + 1}</div><div className="mt-2 font-display text-[16.5px] font-semibold text-zinc-900">{v.title}</div><div className="mt-1.5 text-[13.5px] text-zinc-600 leading-relaxed">{v.desc}</div></div>))}</div></div></section>
    <section className="bg-zinc-950 text-white"><div className="max-w-6xl mx-auto px-6 py-14 md:py-20 grid md:grid-cols-[280px_1fr] gap-10 items-start"><div className="rounded-2xl aspect-[4/5] bg-gradient-to-br from-immune-green/30 via-zinc-800 to-zinc-950 ring-1 ring-white/10 grid place-items-center"><div className="w-32 h-32 rounded-full bg-immune-green grid place-items-center text-zinc-950 font-display font-bold text-[44px] tracking-tight">{D.founder.initials}</div></div><div><div className="font-mono text-[11px] uppercase tracking-[0.18em] text-immune-green">// founder</div><h2 className="mt-2 font-display text-[36px] md:text-[44px] leading-[1.05] tracking-[-0.02em] font-medium">{D.founder.name}</h2><div className="mt-1 font-mono text-[12.5px] uppercase tracking-[0.14em] text-zinc-400">{D.founder.role}</div><p className="mt-5 text-zinc-300 text-[15.5px] leading-relaxed max-w-2xl text-pretty">{D.founder.bio}</p></div></div></section>
    <section className="bg-white"><div className="max-w-6xl mx-auto px-6 py-14 md:py-20"><div className="font-mono text-[11px] uppercase tracking-[0.18em] text-immune-green-deep">// core_team</div><h2 className="mt-2 font-display text-[34px] md:text-[42px] tracking-[-0.02em] font-medium text-zinc-900">The people behind the work.</h2><div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-5">{D.team.map((m) => (<div key={m.name} className="rounded-2xl ring-1 ring-zinc-200 bg-white overflow-hidden hover:ring-immune-green/40 transition"><div className="aspect-[4/3] bg-gradient-to-br from-zinc-100 to-zinc-200 grid place-items-center"><div className="w-20 h-20 rounded-full bg-zinc-900 grid place-items-center text-white font-display font-semibold text-[24px]">{m.initials}</div></div><div className="p-5"><div className="font-display text-[16.5px] font-semibold text-zinc-900">{m.name}</div><div className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500 mt-0.5">{m.role}</div></div></div>))}</div></div></section>
    <section className="relative bg-immune-green-deep text-white overflow-hidden"><div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle at 80% 30%, white, transparent 50%)" }} /><div className="relative max-w-5xl mx-auto px-6 py-16 md:py-20 text-center"><div className="font-mono text-[11px] uppercase tracking-[0.18em] text-immune-green-bright">// careers</div><h2 className="mt-3 font-display text-[34px] md:text-[44px] leading-[1.06] tracking-[-0.02em] font-medium">{D.joinTeam.title}</h2><p className="mt-4 text-white/85 text-[15.5px] max-w-2xl mx-auto leading-relaxed">{D.joinTeam.sub}</p><a href={D.joinTeam.href} className="mt-7 inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-white text-immune-green-deep font-display font-semibold text-[14.5px] hover:bg-zinc-100 transition"><LIcon name="Mail" size={15} /> {D.joinTeam.cta}</a></div></section>
  </main>);
}

// =========================================================
// §30 — ENGAGEMENT
// =========================================================
export function EngagementPage() {
  const cards = DATA_ENGAGEMENT; const help = DATA_ENGAGEMENT_HELP;
  return (<main className="bg-white">
    <PlainPageHeader title={<>Pick the engagement <em className="font-display italic font-light text-immune-green-deep">that fits</em>.</>} trail={["Home","Engagement Models"]} />
    <section className="bg-white"><div className="max-w-7xl mx-auto px-6 py-14 md:py-20"><div className="grid md:grid-cols-3 gap-5">{cards.map((c) => (<article key={c.title} className="group rounded-2xl bg-white ring-1 ring-zinc-200 hover:ring-immune-green/40 hover:-translate-y-1 transition p-7 md:p-8 flex flex-col"><div className="font-mono text-[11px] uppercase tracking-[0.18em] text-immune-green-deep">// model</div><h3 className="mt-2 font-display text-[24px] md:text-[26px] tracking-[-0.018em] font-medium text-zinc-900">{c.title}</h3><p className="mt-3 text-[14.5px] text-zinc-600 leading-relaxed">{c.desc}</p><div className="mt-6 pt-6 border-t border-zinc-100"><div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-zinc-500 mb-3">Best for</div><ul className="space-y-2">{c.bestFor.map((b) => (<li key={b} className="flex items-start gap-2.5 text-[13.5px] text-zinc-800"><LIcon name="Check" size={14} className="text-immune-green-deep mt-0.5 shrink-0" />{b}</li>))}</ul></div><a href={c.href} className="mt-7 inline-flex items-center justify-center gap-2 h-11 rounded-lg bg-zinc-950 text-white font-display font-semibold text-[13.5px] hover:bg-immune-green-deep transition">{c.cta} <LIcon name="ArrowRight" size={14} /></a></article>))}</div></div></section>
    <section className="bg-zinc-50 border-y border-zinc-100"><div className="max-w-5xl mx-auto px-6 py-14 md:py-20"><div className="rounded-2xl bg-zinc-950 text-white p-8 md:p-12 ring-1 ring-zinc-900 relative overflow-hidden"><div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-immune-green/15 blur-3xl pointer-events-none" /><div className="relative grid md:grid-cols-[1fr_auto] items-center gap-8"><div><div className="font-mono text-[11px] uppercase tracking-[0.18em] text-immune-green">// help</div><h2 className="mt-2 font-display text-[28px] md:text-[36px] leading-[1.06] tracking-[-0.02em] font-medium">{help.title}?</h2><p className="mt-3 text-zinc-300 text-[15px] max-w-2xl leading-relaxed">{help.desc}</p></div><a href={help.href} className="self-start inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-immune-green text-zinc-950 font-display font-semibold text-[14.5px] hover:bg-immune-green-bright transition"><LIcon name="Calculator" size={15} /> {help.cta}</a></div></div></div></section>
  </main>);
}

// =========================================================
// §31 — PRICING CALCULATOR
// =========================================================
export function PricingCalculatorPage() {
  const D = DATA_CALCULATOR;
  const [step, setStep] = useState(0);
  const [service, setService] = useState(null);
  const [subService, setSubService] = useState(null);
  const [complexity, setComplexity] = useState(D.complexity[1]);
  const [linesOfCode, setLinesOfCode] = useState(2500);
  const [depth, setDepth] = useState("blackbox");
  const [docs, setDocs] = useState("partial");
  const [history, setHistory] = useState("first");
  const [comms, setComms] = useState("Email");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const next = () => setStep((s) => Math.min(s + 1, D.steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  // Estimate math
  const base = service === "web3" ? 18000 : service === "ai" ? 16000 : 9500;
  const cIdx = Math.max(0, D.complexity.indexOf(complexity));
  const cMult = 1 + cIdx * 0.18;
  const docMult = docs === "comprehensive" ? 0.95 : docs === "limited" ? 1.10 : 1.00;
  const histMult = history === "loyal" ? 0.70 : history === "reaudit" ? 0.85 : 1.00;
  const depthMult = depth === "blackbox-arch" ? 1.20 : 1.00;
  const locMult = 1 + Math.max(0, (linesOfCode - 1500)) / 25000;
  const lo = Math.round(base * cMult * docMult * histMult * depthMult * locMult);
  const hi = Math.round(lo * 1.45);
  const days = 8 + cIdx * 4 + (depth === "blackbox-arch" ? 4 : 0);

  return (<main className="bg-white">
    <PlainPageHeader title={<>Pricing <em className="font-display italic font-light text-immune-green-deep">Calculator</em>.</>} trail={["Home","Pricing Calculator"]} />
    <section className="bg-zinc-50 border-y border-zinc-100"><div className="max-w-5xl mx-auto px-6 py-10 md:py-14">
      <WizardStepper steps={D.steps} current={step} />
      <div className="mt-8 rounded-2xl bg-white ring-1 ring-zinc-200 p-6 md:p-8">
        {step === 0 && (<div><h2 className="font-display text-[22px] md:text-[26px] tracking-[-0.018em] font-medium text-zinc-900">Choose your service category</h2><p className="mt-1 text-[13.5px] text-zinc-500">Pick what you want priced.</p><div className="mt-6 grid md:grid-cols-3 gap-3">{D.services.map((s) => (<RadioCard key={s.id} title={s.title} desc={s.desc} selected={service === s.id} onClick={() => { setService(s.id); setSubService(null); }} />))}</div></div>)}
        {step === 1 && (<div><h2 className="font-display text-[22px] md:text-[26px] tracking-[-0.018em] font-medium text-zinc-900">Refine your scope</h2><div className="mt-6 grid sm:grid-cols-2 gap-3">{(D.subServiceMap[service] || []).map((s) => (<RadioCard key={s} title={s} selected={subService === s} onClick={() => setSubService(s)} size="sm" />))}</div></div>)}
        {step === 2 && (<div className="space-y-5"><h2 className="font-display text-[22px] md:text-[26px] tracking-[-0.018em] font-medium text-zinc-900">Project details</h2><FormFieldGroup title="Application complexity"><SegmentedSelect options={D.complexity} value={complexity} onChange={setComplexity} /></FormFieldGroup><FormFieldGroup title="Lines of code (estimated)" optional><div className="flex items-center gap-4"><RangeSlider value={linesOfCode} onChange={setLinesOfCode} min={500} max={20000} /><div className="font-mono text-[13px] text-zinc-700 min-w-[80px] text-right">{linesOfCode.toLocaleString()}</div></div></FormFieldGroup><FormFieldGroup title="Testing depth"><div className="grid sm:grid-cols-2 gap-3">{D.testingDepth.map((o) => (<RadioCard key={o.id} title={o.title} hint={o.hint} selected={depth === o.id} onClick={() => setDepth(o.id)} size="sm" />))}</div></FormFieldGroup><FormFieldGroup title="Documentation status"><div className="grid md:grid-cols-3 gap-3">{D.documentationOptions.map((o) => (<RadioCard key={o.id} title={o.title} hint={o.hint} tone={o.tone} selected={docs === o.id} onClick={() => setDocs(o.id)} size="sm" />))}</div></FormFieldGroup><FormFieldGroup title="Audit history"><div className="grid md:grid-cols-3 gap-3">{D.auditHistoryOptions.map((o) => (<RadioCard key={o.id} title={o.title} hint={o.hint} tone={o.tone} selected={history === o.id} onClick={() => setHistory(o.id)} size="sm" />))}</div></FormFieldGroup></div>)}
        {step === 3 && (<div className="grid md:grid-cols-[1fr_320px] gap-6"><div className="rounded-xl bg-zinc-950 text-white p-6 md:p-7 relative overflow-hidden ring-1 ring-zinc-900"><div className="absolute -top-12 -right-12 w-48 h-48 bg-immune-green/15 rounded-full blur-3xl pointer-events-none" /><div className="relative"><div className="font-mono text-[11px] uppercase tracking-[0.18em] text-immune-green">// estimate</div><div className="mt-3 font-display text-[40px] md:text-[52px] leading-none tracking-[-0.025em] font-medium">${(lo / 1000).toFixed(1)}k <span className="text-zinc-500">&ndash;</span> ${(hi / 1000).toFixed(1)}k</div><div className="mt-2 font-mono text-[12px] text-zinc-400">USD &middot; approx. {days} business days</div></div></div><div className="rounded-xl bg-white ring-1 ring-zinc-200 p-5 md:p-6"><h3 className="font-display text-[16px] font-semibold text-zinc-900">Lock in this quote</h3><p className="mt-1 text-[12.5px] text-zinc-500">We&apos;ll review your inputs and get back within one business day.</p><div className="mt-4 space-y-3"><TextInput label="Your name" required placeholder="Jane Cho" value={name} onChange={setName} /><TextInput label="Email" type="email" required placeholder="jane@example.com" value={email} onChange={setEmail} /><SelectInput label="Preferred contact" options={D.commsOptions} value={comms} onChange={setComms} /></div></div></div>)}
        <div className="mt-8 flex items-center justify-between pt-6 border-t border-zinc-100"><button onClick={back} disabled={step === 0} className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg ring-1 ring-zinc-200 text-zinc-700 font-display text-[13.5px] font-medium disabled:opacity-40 hover:bg-zinc-50"><LIcon name="ArrowLeft" size={14} /> Back</button>{step < D.steps.length - 1 ? (<button onClick={next} className="inline-flex items-center gap-1.5 h-10 px-5 rounded-lg bg-immune-green-deep text-white font-display text-[13.5px] font-semibold hover:bg-immune-green-bright hover:text-zinc-950 transition">Continue <LIcon name="ArrowRight" size={14} /></button>) : (<button className="inline-flex items-center gap-1.5 h-10 px-5 rounded-lg bg-immune-green-deep text-white font-display text-[13.5px] font-semibold hover:bg-immune-green-bright hover:text-zinc-950 transition">Submit Inquiry <LIcon name="Send" size={14} /></button>)}</div>
      </div>
    </div></section>
  </main>);
}

// =========================================================
// §32 — BLOG
// =========================================================
export function BlogPage() {
  const D = DATA_BLOG;
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = D.posts.filter((p) => { if (cat !== "All" && p.category !== cat) return false; if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false; return true; });

  return (<main className="bg-white">
    <PlainPageHeader title={<>Field notes from the <em className="font-display italic font-light text-immune-green-deep">audit floor</em>.</>} trail={["Home","Blog"]} />
    <section className="bg-white border-b border-zinc-100"><div className="max-w-7xl mx-auto px-6 py-8 md:py-10"><div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"><div className="flex flex-wrap items-center gap-2">{D.categories.map((c) => (<button key={c} onClick={() => setCat(c)} className={`h-8 px-3.5 rounded-full text-[12.5px] font-medium transition ring-1 ${c === cat ? "bg-immune-green-deep text-white ring-immune-green-deep" : "bg-white text-zinc-700 ring-zinc-200 hover:ring-zinc-400"}`}>{c}</button>))}</div><div className="relative"><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts\u2026" className="h-10 w-72 rounded-lg border border-zinc-200 bg-white pl-9 pr-3 text-[13px] text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-immune-green/40 focus:border-immune-green" /><LIcon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" /></div></div></div></section>
    <section className="bg-white"><div className="max-w-7xl mx-auto px-6 py-12 md:py-16"><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{filtered.map((p, i) => (<article key={i} className="group rounded-2xl ring-1 ring-zinc-200 bg-white overflow-hidden hover:ring-immune-green/40 hover:-translate-y-0.5 transition flex flex-col"><div className="aspect-[16/10] bg-zinc-900" /><div className="p-5 flex-1 flex flex-col"><div className="flex items-center gap-2"><span className="inline-flex items-center px-2 h-5 rounded-full bg-zinc-100 text-zinc-700 text-[10.5px] font-medium uppercase tracking-[0.12em]">{p.category}</span><span className="font-mono text-[10.5px] text-zinc-500">{p.date}</span></div><h3 className="mt-3 font-display text-[18px] leading-[1.18] tracking-[-0.012em] font-semibold text-zinc-900 text-balance line-clamp-3">{p.title}</h3><p className="mt-2 text-[13px] text-zinc-600 leading-relaxed line-clamp-3">{p.excerpt}</p><a href="#" className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-immune-green-deep hover:underline">Read more <LIcon name="ArrowRight" size={13} /></a></div></article>))}</div></div></section>
  </main>);
}

// =========================================================
// §33 — CONTACT
// =========================================================
export function ContactPage() {
  const D = DATA_CONTACT;
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [company, setCompany] = useState(""); const [category, setCategory] = useState(""); const [msg, setMsg] = useState("");
  function ContactRow({ icon, label, value, link }) {
    const Body = (<div className="flex items-start gap-3"><div className="w-10 h-10 rounded-lg bg-immune-green/10 ring-1 ring-immune-green/30 grid place-items-center shrink-0"><LIcon name={icon} size={16} className="text-immune-green" /></div><div><div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-zinc-500">{label}</div><div className="font-display text-[15px] text-white mt-0.5">{value}</div></div></div>);
    return link ? <a href={link} className="block hover:opacity-80 transition">{Body}</a> : Body;
  }
  return (<main className="bg-white">
    <PlainPageHeader title={<>Talk to a <em className="font-display italic font-light text-immune-green-deep">human auditor</em>.</>} trail={["Home","Contact"]} />
    <section className="bg-white"><div className="max-w-7xl mx-auto px-6 py-14 md:py-20 grid md:grid-cols-[1.05fr_1fr] gap-10 md:gap-14 items-start">
      <div className="rounded-2xl bg-zinc-950 text-white p-8 md:p-10 ring-1 ring-zinc-900 relative overflow-hidden"><div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-immune-green/15 blur-3xl pointer-events-none" /><div className="relative"><div className="font-mono text-[11px] uppercase tracking-[0.18em] text-immune-green">$ ./contact --start</div><h2 className="mt-3 font-display text-[30px] md:text-[36px] leading-[1.06] tracking-[-0.02em] font-medium">{D.getInTouch.title}</h2><p className="mt-3 text-zinc-300 text-[15px] leading-relaxed max-w-xl">{D.getInTouch.sub}</p><div className="mt-8 space-y-4"><ContactRow icon="Building2" label="Company" value={D.getInTouch.company} /><ContactRow icon="MapPin" label="HQ" value={D.getInTouch.address} /><ContactRow icon="Mail" label="Email" value={D.getInTouch.email} link={`mailto:${D.getInTouch.email}`} /><ContactRow icon="Phone" label="Phone" value={D.getInTouch.phone} link={`tel:${D.getInTouch.phone.replace(/\s+/g, "")}`} /></div><div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-3">{["Linkedin","Twitter","Github","Youtube"].map((s) => (<a key={s} href="#" className="w-10 h-10 rounded-lg ring-1 ring-white/15 hover:ring-immune-green hover:bg-immune-green/10 grid place-items-center transition"><LIcon name={s} size={15} /></a>))}</div></div></div>
      <div className="rounded-2xl ring-1 ring-zinc-200 bg-white p-7 md:p-9"><div className="font-mono text-[11px] uppercase tracking-[0.18em] text-immune-green-deep">// query.form</div><h2 className="mt-2 font-display text-[26px] md:text-[30px] tracking-[-0.018em] font-medium text-zinc-900">{D.form.title}</h2><p className="mt-1 text-[14px] text-zinc-500">{D.form.sub}</p><div className="mt-6 grid sm:grid-cols-2 gap-4"><TextInput label="Name" required placeholder="Jane Cho" value={name} onChange={setName} /><TextInput label="Email" type="email" required placeholder="jane@protocol.xyz" value={email} onChange={setEmail} /><TextInput label="Company" placeholder="Protocol Inc." value={company} onChange={setCompany} /><SelectInput label="Category" required placeholder="Select\u2026" options={D.form.categories} value={category} onChange={setCategory} /><div className="sm:col-span-2"><TextArea label="Tell us about your project" required placeholder="A few words on what you\u2019re building\u2026" rows={6} value={msg} onChange={setMsg} /></div></div><div className="mt-6 flex items-center justify-between"><div className="font-mono text-[11px] text-zinc-500">We respond within 1 business day.</div><button className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-immune-green-deep text-white font-display font-semibold text-[13.5px] hover:bg-immune-green-bright hover:text-zinc-950 transition">Send Message <LIcon name="Send" size={14} /></button></div></div>
    </div></section>
  </main>);
}
