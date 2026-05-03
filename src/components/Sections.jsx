import { useState, useEffect, useRef } from 'react';
import { LIcon } from './LIcon';
import { LogoMark } from './Logo';
import { SectionLabel, ButtonPrimary, ButtonSecondary, ButtonGhost, Reveal, SectionHeading } from './Primitives';

// ============================================================
// 4.3 — TRUSTED BY (logo strip)
// ============================================================
const CLIENT_LOGOS = [
  { name: "Vanar",   href: "/clients/vanar" },
  { name: "E.Money", href: "/clients/emoney" },
  { name: "Dernex",  href: "/clients/dernex" },
  { name: "cSigma",  href: "/clients/csigma" },
  { name: "Polygon", href: "/clients/polygon" },
  { name: "Plume",   href: "/clients/plume" },
];

function ClientLogo({ name }) {
  const styles = {
    "Vanar":   { icon: "Hexagon",  font: "font-display tracking-tightest font-bold" },
    "E.Money": { icon: "CircleDollarSign", font: "font-display font-semibold tracking-tight" },
    "Dernex":  { icon: "Triangle", font: "font-display font-bold tracking-tight italic" },
    "cSigma":  { icon: "Sigma",    font: "font-mono font-semibold lowercase" },
    "Polygon": { icon: "Diamond",  font: "font-display font-bold tracking-tight" },
    "Plume":   { icon: "Feather",  font: "font-display font-medium tracking-wide italic" },
  };
  const s = styles[name] || { icon: "Hexagon", font: "font-display font-semibold" };
  return (
    <div className="logo-grey shrink-0 flex items-center gap-2.5 text-zinc-700 text-[20px]">
      <LIcon name={s.icon} size={22} strokeWidth={2} />
      <span className={s.font}>{name}</span>
    </div>
  );
}

export function TrustedBy() {
  const loop = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <section className="relative bg-white py-20 md:py-24 overflow-hidden border-y border-zinc-100">
      <div
        className="absolute inset-0 opacity-[0.6] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, #000 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, #000 30%, transparent 75%)",
        }}
      />
      <div className="relative max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <SectionLabel theme="light" className="text-center">trusted_by</SectionLabel>
          <h2 className="mt-4 font-display font-semibold tracking-tight text-zinc-900 text-[28px] sm:text-[34px] md:text-[40px] leading-[1.1]">
            Trusted by Leading Companies
          </h2>
          <p className="mt-3 text-zinc-500 text-[14.5px] max-w-[520px]">
            From L1 protocols to enterprise AI teams — security partners that bet
            their roadmap on us.
          </p>
        </div>

        <div className="mt-12 relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="marquee-track flex items-center gap-14 py-4">
            {loop.map((l, i) => (
              <ClientLogo key={`${l.name}-${i}`} name={l.name} />
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 max-w-[920px] mx-auto">
          {[
            { k: "Active engagements",    v: "32 / month" },
            { k: "Repeat client rate",    v: "87%" },
            { k: "Avg. report turnaround", v: "9 days" },
            { k: "Critical findings shipped", v: "1,400+" },
          ].map((m) => (
            <div key={m.k} className="flex flex-col items-center text-center">
              <div className="font-display font-semibold text-zinc-900 text-[22px] tracking-tight">{m.v}</div>
              <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-zinc-500">{m.k}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 4.4 — IMPACT STATS
// ============================================================
function CountUp({ end, duration = 1200, suffix = "+" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        started = true;
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(eased * end));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const STATS = [
  { value: 608, label: "Audits completed" },
  { value: 192, label: "Clients secured" },
  { value: 61,  label: "Ecosystems covered" },
];

export function Impact() {
  return (
    <section className="bg-black py-28 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 terminal-grid opacity-50 pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-6">
        <Reveal>
          <SectionLabel theme="dark" className="mx-auto text-center">impact</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 mx-auto text-center font-display font-semibold tracking-tight text-white text-[36px] sm:text-[44px] md:text-[52px] leading-[1.05] max-w-[860px]">
            ImmuneBytes:{" "}
            <span className="text-immune-green">Built on Security First</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 mx-auto text-center text-zinc-400 text-[16px] md:text-[17px] leading-relaxed max-w-[760px]">
            Trusted by global teams for a security-first approach, ImmuneBytes has
            completed 6+ years of global experience securing applications,
            protocols and AI systems across Web3 and enterprise ecosystems.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={100 * i} className={`flex flex-col items-center text-center px-6 ${i > 0 ? "md:border-l md:border-zinc-900" : ""} relative`}>
              {i > 0 && <span className="hidden md:block absolute left-0 -top-1 w-px h-3 bg-immune-green/70" />}
              <div className="font-display font-semibold text-white text-[68px] sm:text-[80px] md:text-[88px] leading-none tracking-tightest">
                <CountUp end={s.value} />
              </div>
              <div className="mt-5 font-mono text-[12px] uppercase tracking-[0.16em] text-zinc-500">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 4.5 — SERVICES
// ============================================================
const SERVICES = [
  {
    n: "01",
    title: "Penetration Testing",
    icon: "ShieldCheck",
    desc: "We simulate real adversaries: mapping entry points, chaining weaknesses, and proving impact with tight exploit narratives you can actually fix.",
    href: "/solutions/web2/pentest",
  },
  {
    n: "02",
    title: "Web3 Security",
    icon: "Boxes",
    desc: "We audit protocols, contracts, and economic models before they ship \u2014 covering EVM and non-EVM ecosystems with custom detectors and adversarial review.",
    href: "/solutions/web3",
  },
  {
    n: "03",
    title: "AI Security",
    icon: "Cpu",
    desc: "We test the failure modes that matter. AI security requires understanding prompt manipulation, tool boundaries, and integration vulnerabilities specific to LLMs and agents.",
    href: "/solutions/ai",
  },
  {
    n: "04",
    title: "Security Consultancy",
    icon: "Compass",
    desc: "We embed with engineering teams to shift security left \u2014 secure-by-design reviews, fuzz harnesses, threat modeling, and pre-audit dynamic testing for build-stage discovery.",
    href: "/solutions/consultancy",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-zinc-50 py-28 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6">
        <Reveal>
          <SectionHeading
            label="services"
            title={<>Services engineered for <span className="font-semibold">Modern architectures.</span></>}
            subhead="We are a security-first services firm, embedding cybersecurity at the core of technology and business decisions\u2014moving beyond reactive compliance to deliver proactive, resilient, and trusted systems built for real-world risk."
            action={<ButtonGhost href="/solutions" theme="light">All Services</ButtonGhost>}
            theme="light"
          />
        </Reveal>

        <div className="mt-14 border-t border-zinc-200">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={i * 60}>
              <a
                href={s.href}
                className="service-row group relative flex items-center gap-6 md:gap-10 py-9 md:py-10 border-b border-zinc-200 px-2 md:px-4"
              >
                <div className="service-numeral font-mono text-[44px] md:text-[64px] text-zinc-300 leading-none w-[68px] md:w-[100px] shrink-0 select-none transition-colors">
                  {s.n}
                </div>
                <div className="hidden sm:flex shrink-0 h-14 w-14 md:h-16 md:w-16 rounded-md bg-zinc-900 text-white items-center justify-center">
                  <LIcon name={s.icon} size={22} strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-zinc-900 text-[22px] md:text-[28px] leading-tight tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-zinc-600 text-[15px] md:text-[16px] leading-relaxed max-w-[640px]">
                    {s.desc}
                  </p>
                </div>
                <div className="hidden md:inline-flex items-center gap-1.5 font-display text-[14px] font-medium text-zinc-600 self-center shrink-0">
                  Read More
                  <LIcon name="ArrowRight" size={14} strokeWidth={2.25} className="service-cta-arrow transition-all" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <ButtonSecondary href="/audits" theme="light" size="md" icon="ArrowUpRight">
            Audit Reports
          </ButtonSecondary>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 4.6 — CASE STUDIES
// ============================================================
export function CaseStudies() {
  return (
    <section className="bg-white py-28 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6">
        <Reveal>
          <SectionHeading
            label="case_studies"
            title="Securing High-Impact Enterprise Systems."
            action={<ButtonGhost href="/case-studies" theme="light">All Case Studies</ButtonGhost>}
            theme="light"
          />
        </Reveal>

        <Reveal delay={120}>
          <a
            href="/case-studies/csigma"
            className="group mt-14 grid grid-cols-1 md:grid-cols-12 border border-zinc-200 rounded-lg overflow-hidden hover:border-zinc-300 transition-colors"
          >
            <div className="md:col-span-5 relative bg-black p-8 md:p-10 min-h-[280px] md:min-h-[420px] overflow-hidden">
              <div className="absolute inset-0 terminal-grid opacity-50" />
              <div className="absolute -right-8 -bottom-12 opacity-90">
                <LogoMark theme="dark" size={280} />
              </div>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(80% 60% at 30% 30%, rgba(116,191,0,0.10), transparent 70%)",
                }}
              />
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 px-3 h-7 rounded-full bg-immune-green/15 text-immune-green font-mono text-[11px] uppercase tracking-[0.15em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-immune-green" />
                  Case Study
                </span>
                <h3 className="mt-44 md:mt-56 font-display text-white font-semibold text-[26px] md:text-[32px] leading-tight tracking-tight max-w-[400px]">
                  cSigma Finance Audit
                </h3>
              </div>
            </div>

            <div className="md:col-span-7 bg-zinc-50 p-8 md:p-12 flex flex-col">
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                Web3 Security &middot; Smart Contract Audit
              </div>
              <p className="mt-5 text-zinc-700 text-[15px] md:text-[16px] leading-[1.75] max-w-[560px]">
                <strong className="font-semibold text-zinc-900">Background:</strong>{" "}
                cSigma Finance is a decentralized lending protocol, designed to
                seamlessly connect global borrowers and lenders. By leveraging
                AI, the protocol optimizes critical aspects of the lending
                process, including credit rating, pricing, and risk management.
                It facilitates secure capital movements, on-chain accounting,
                and settlement, while allowing third-party underwriters to
                participate in pricing risk.
              </p>

              <dl className="mt-8 grid grid-cols-3 gap-4 max-w-[480px]">
                {[
                  { k: "Engagement", v: "8 weeks" },
                  { k: "Findings",   v: "24 / 24 fixed" },
                  { k: "Coverage",   v: "12 contracts" },
                ].map((it) => (
                  <div key={it.k} className="flex flex-col">
                    <dt className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-zinc-500">{it.k}</dt>
                    <dd className="mt-1 font-display font-semibold text-zinc-900 text-[16px]">{it.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-auto pt-10">
                <span className="group/cta inline-flex items-center gap-1.5 font-display text-[14px] font-medium text-zinc-700 group-hover:text-immune-green transition-colors">
                  Read More
                  <LIcon name="ArrowRight" size={14} strokeWidth={2.25} className="card-arrow" />
                </span>
              </div>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
// 4.7 — TESTIMONIALS
// ============================================================
const TESTIMONIALS = [
  {
    quote:
      "Robotics can do audits, but the personal touch makes a difference. That\u2019s why we love ImmuneBytes! Not only do they do top-class audits, but they also take the time to understand our project and why certain things are done in specific ways. They take the time to ensure we feel heard, which shows in their work.",
    name: "Yog Shrasti",
    role: "Co-Founder & CEO, Pernoram",
    thumbHue: "from-zinc-700 to-zinc-900",
  },
  {
    quote:
      "ImmuneBytes\u2019 adversarial review caught a re-entrancy class we\u2019d missed across two prior audits. Their report read like a security peer\u2019s notebook, not a marketing deliverable. That\u2019s the bar.",
    name: "Anuje Jahan",
    role: "Head of Engineering, Loki Protocol",
    thumbHue: "from-emerald-900 to-zinc-900",
  },
  {
    quote:
      "Pre-audit dynamic testing surfaced eight high-severity issues before our formal engagement even started. We shipped to mainnet on time because of how early they pushed.",
    name: "Manuel C\u00e1rdenas",
    role: "CTO, Vanarchain",
    thumbHue: "from-blue-900 to-zinc-900",
  },
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS[idx];
  return (
    <section className="bg-zinc-900 py-28 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6">
        <Reveal>
          <SectionHeading
            label="testimonials"
            title="What Our Clients Trust us with."
            action={<ButtonGhost href="/clients" theme="dark">All Testimonials</ButtonGhost>}
            theme="dark"
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <Reveal delay={120} className="lg:col-span-5">
            <button className="group relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-zinc-700">
              <div className={`absolute inset-0 bg-gradient-to-br ${t.thumbHue}`} />
              <svg viewBox="0 0 400 250" className="absolute inset-0 w-full h-full" aria-hidden="true">
                <defs>
                  <linearGradient id="tlight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="rgba(116,191,0,0.18)" />
                    <stop offset="1" stopColor="rgba(0,0,0,0)" />
                  </linearGradient>
                </defs>
                <rect width="400" height="250" fill="url(#tlight)" />
                <circle cx="200" cy="120" r="44" fill="rgba(255,255,255,0.06)" />
                <ellipse cx="200" cy="220" rx="100" ry="50" fill="rgba(255,255,255,0.05)" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-16 h-16 rounded-full bg-immune-green flex items-center justify-center shadow-[0_10px_40px_-12px_rgba(116,191,0,0.6)] group-hover:scale-105 transition-transform">
                  <LIcon name="Play" size={22} strokeWidth={2} className="text-black ml-0.5" />
                </span>
              </span>
              <div className="absolute bottom-3 left-3 font-mono text-[10.5px] text-zinc-300 bg-black/60 px-2 py-0.5 rounded">
                video &middot; 02:14
              </div>
            </button>
          </Reveal>

          <Reveal delay={200} className="lg:col-span-7">
            <div className="relative">
              <span className="absolute -top-6 -left-2 font-display text-immune-green/40 text-[80px] leading-none select-none" aria-hidden="true">&ldquo;</span>
              <blockquote className="relative pl-2 text-zinc-100 text-[18px] md:text-[20px] leading-relaxed max-w-[600px]">
                {t.quote}
              </blockquote>
              <div className="mt-7 pl-2">
                <div className="font-display text-white font-semibold text-[16px]">{t.name}</div>
                <div className="font-mono text-[12.5px] text-zinc-500 mt-0.5">{t.role}</div>
              </div>
              <div className="mt-9 pl-2 flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    aria-label={`Show testimonial ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      i === idx ? "w-6 bg-immune-green" : "w-2 bg-zinc-700 hover:bg-zinc-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 4.8 — INSIGHTS / Blog teaser
// ============================================================
const POSTS = [
  {
    tag: "Web3 Security",
    title: "Alchemy\u2019s Modular Account: Technical Deep Dive into ERC-6900",
    excerpt:
      "A walk-through of ERC-6900\u2019s modular account architecture, the new attack surface introduced by plugin composition, and what auditors should look for.",
    date: "Apr 28, 2026",
    read: "12 min read",
  },
  {
    tag: "Wallet Security",
    title: "The Signature Trap: Why Wallet UX is Failing Users in Web3",
    excerpt:
      "EIP-712 signed messages, blind-sign flows, and the social-engineering patterns we keep seeing in real-world wallet drains. With concrete fixes.",
    date: "Apr 14, 2026",
    read: "9 min read",
  },
];

function PostCover({ kind = 0 }) {
  if (kind === 0) {
    return (
      <svg viewBox="0 0 400 224" className="w-full h-full block">
        <defs>
          <linearGradient id="pc1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0a0a0a" />
            <stop offset="1" stopColor="#1f1f1f" />
          </linearGradient>
        </defs>
        <rect width="400" height="224" fill="url(#pc1)" />
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 24} y1="0" x2={i * 24} y2="224" stroke="rgba(255,255,255,0.04)" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 24} x2="400" y2={i * 24} stroke="rgba(255,255,255,0.04)" />
        ))}
        <g stroke="#74BF00" strokeWidth="1.5" fill="none" opacity="0.85">
          <rect x="60" y="60" width="80" height="40" rx="3" />
          <rect x="180" y="40" width="80" height="40" rx="3" />
          <rect x="180" y="100" width="80" height="40" rx="3" />
          <rect x="300" y="60" width="60" height="40" rx="3" />
          <path d="M140 80 L180 60" />
          <path d="M140 80 L180 120" />
          <path d="M260 60 L300 80" />
          <path d="M260 120 L300 80" />
        </g>
        <g fill="#fff" opacity="0.7" fontFamily="Fira Code,monospace" fontSize="10">
          <text x="60" y="180">{"/* ERC-6900 plugins */"}</text>
          <text x="60" y="196">{"erc6900.compose(modA, modB);"}</text>
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 224" className="w-full h-full block">
      <defs>
        <linearGradient id="pc2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0a0a0a" />
          <stop offset="1" stopColor="#1a1a1a" />
        </linearGradient>
      </defs>
      <rect width="400" height="224" fill="url(#pc2)" />
      {Array.from({ length: 18 }).map((_, i) => (
        <line key={i} x1={i * 24} y1="0" x2={i * 24} y2="224" stroke="rgba(255,255,255,0.04)" />
      ))}
      <g stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" fill="none">
        <path d="M30 130 Q70 60, 110 130 T 190 130 T 270 130 T 350 130" />
      </g>
      <g fill="#74BF00" fontFamily="Fira Code,monospace" fontSize="11">
        <text x="30" y="60">eth_signTypedData_v4</text>
      </g>
      <g fill="rgba(255,255,255,0.55)" fontFamily="Fira Code,monospace" fontSize="10">
        <text x="30" y="190">{"domain: { /* spoofed */ }"}</text>
      </g>
      <g transform="translate(310,30)" fill="#74BF00">
        <path d="M0 30 L20 0 L40 30 Z" opacity="0.85" />
        <rect x="18" y="10" width="4" height="12" fill="#000" />
        <rect x="18" y="24" width="4" height="3" fill="#000" />
      </g>
    </svg>
  );
}

export function Insights() {
  return (
    <section className="bg-white py-28 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6">
        <Reveal>
          <SectionHeading
            label="insights"
            title="Your Hub for smart reads on Audit-Driven Engineering Insights."
            action={<ButtonGhost href="/blogs" theme="light">All Blog Articles</ButtonGhost>}
            theme="light"
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {POSTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <a href="#" className="group block border border-zinc-200 rounded-lg overflow-hidden hover:border-zinc-300 transition-colors">
                <div className="aspect-[16/9] overflow-hidden bg-zinc-900">
                  <div className="w-full h-full transition-transform duration-300 group-hover:scale-[1.02]">
                    <PostCover kind={i} />
                  </div>
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] bg-zinc-100 text-zinc-700 px-2 py-1 rounded">
                      {p.tag}
                    </span>
                    <span className="font-mono text-[11px] text-zinc-500">{p.date} &middot; {p.read}</span>
                  </div>
                  <h3 className="mt-4 font-display font-semibold text-zinc-900 text-[20px] md:text-[22px] leading-snug tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-zinc-600 text-[14.5px] leading-relaxed">
                    {p.excerpt}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-1.5 font-display text-[14px] font-medium text-zinc-700 group-hover:text-immune-green">
                    Read article
                    <LIcon name="ArrowRight" size={14} strokeWidth={2.25} className="card-arrow" />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 4.9 — BOTTOM CTA
// ============================================================
export function CTA() {
  return (
    <section className="relative bg-black py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 terminal-grid opacity-60 pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-px cta-streak"
           style={{ background: "linear-gradient(180deg, transparent, #74BF00, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-px cta-streak"
           style={{ animationDelay: "1.3s", background: "linear-gradient(180deg, transparent, #74BF00, transparent)" }} />

      <div className="relative max-w-[900px] mx-auto px-6 text-center">
        <Reveal>
          <div className="inline-block whitespace-nowrap">
            <SectionLabel theme="dark">cta</SectionLabel>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 font-display font-semibold tracking-tight text-white text-[36px] sm:text-[44px] md:text-[52px] leading-[1.05]">
            Let&apos;s <span className="text-immune-green">Evaluate Risks</span> and Secure your Systems.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-5 mx-auto text-zinc-400 text-[16px] md:text-[17px] leading-relaxed max-w-[600px]">
            Walk us through your stack. We&apos;ll come back with a scoped engagement,
            timeline, and the failure modes we&apos;d hunt first.
          </p>
        </Reveal>
        <Reveal delay={280}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ButtonPrimary href="/contact" size="lg">Talk to an Expert</ButtonPrimary>
            <ButtonSecondary href="/contact" theme="dark" size="lg">Send Query</ButtonSecondary>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
