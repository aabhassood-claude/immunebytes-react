import { useState } from 'react';
import { LIcon } from './LIcon';
import { Logo } from './Logo';

const FOOTER_SOLUTIONS = [
  [
    { label: "Smart Contract Audit",  href: "/solutions/web3/smart-contract" },
    { label: "Protocol & Infra",      href: "/solutions/web3/protocol" },
    { label: "Wallet Security",       href: "/solutions/web3/wallet" },
    { label: "Tokenomics Audit",      href: "/solutions/web3/protocol/tokenomics" },
  ],
  [
    { label: "Penetration Testing",   href: "/solutions/web2/pentest" },
    { label: "Mobile App Testing",    href: "/solutions/web2/mobile" },
    { label: "AI Agent Audit",        href: "/solutions/ai/agent" },
    { label: "LLM Integration Audit", href: "/solutions/ai/llm" },
  ],
];

const FOOTER_RESOURCES = [
  { label: "Audit Leaderboard", href: "/audits" },
  { label: "Case Studies",      href: "/case-studies" },
  { label: "Blog",              href: "/blogs" },
  { label: "Pricing Calculator",href: "/pricing-calculator" },
  { label: "Engagement Models", href: "/engagement-models" },
];

const FOOTER_COMPANY = [
  { label: "About Us",      href: "/about" },
  { label: "Clients",       href: "/clients" },
  { label: "Contact",       href: "/contact" },
  { label: "Careers",       href: "/careers" },
];

const SOCIALS = [
  { name: "X / Twitter", icon: "Twitter",   href: "https://x.com" },
  { name: "LinkedIn",    icon: "Linkedin",  href: "https://linkedin.com" },
  { name: "Telegram",    icon: "Send",      href: "https://t.me" },
  { name: "Discord",     icon: "MessagesSquare", href: "https://discord.com" },
  { name: "GitHub",      icon: "Github",    href: "https://github.com" },
  { name: "YouTube",     icon: "Youtube",   href: "https://youtube.com" },
];

const CHAINS = [
  { name: "Ethereum",  icon: "Hexagon" },
  { name: "Solana",    icon: "Sun" },
  { name: "BSC",       icon: "Diamond" },
  { name: "Polygon",   icon: "Triangle" },
  { name: "Avalanche", icon: "Mountain" },
  { name: "Base",      icon: "Square" },
  { name: "Arbitrum",  icon: "ArrowUpRight" },
  { name: "Optimism",  icon: "Circle" },
  { name: "zkSync",    icon: "Layers" },
  { name: "Starknet",  icon: "Star" },
  { name: "Sui",       icon: "Droplet" },
  { name: "Aptos",     icon: "Infinity" },
];

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };
  if (submitted) {
    return (
      <div className="rounded-md bg-zinc-900 border border-zinc-800 px-4 h-12 flex items-center font-mono text-[13px]">
        <span className="text-immune-green mr-2">{"\u2713"}</span>
        <span className="text-zinc-300">Subscribed — check your inbox.</span>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@protocol.xyz"
        className="flex-1 min-w-0 h-11 px-4 rounded-md bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 font-sans text-[13.5px] focus:outline-none focus:border-immune-green"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-immune-green text-black font-display font-semibold text-[13px] hover:bg-[#82d600] transition-colors whitespace-nowrap"
      >
        Subscribe
        <LIcon name="ArrowRight" size={14} strokeWidth={2.25} />
      </button>
    </form>
  );
}

function SocialPill({ social }) {
  return (
    <a
      href={social.href}
      aria-label={social.name}
      className="group h-10 w-10 rounded-md border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-immune-green hover:border-immune-green/40 hover:bg-zinc-900 flex items-center justify-center transition-colors"
    >
      <LIcon name={social.icon} size={16} strokeWidth={1.75} />
    </a>
  );
}

function FooterLinkColumn({ title, items }) {
  return (
    <div>
      <div className="font-display font-semibold text-[13px] text-zinc-300 tracking-tight uppercase">
        {title}
      </div>
      <ul className="mt-5 flex flex-col gap-3">
        {items.map((it) => (
          <li key={it.label}>
            <a
              href={it.href}
              className="group inline-flex items-center gap-1.5 text-[13.5px] text-zinc-400 hover:text-white transition-colors"
            >
              <span className="w-0 group-hover:w-2 h-px bg-immune-green transition-all" />
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-black border-t border-zinc-900 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-immune-green/40 to-transparent" />

      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, #000 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, #000 30%, transparent 80%)",
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-6 pt-20 pb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 pb-12 border-b border-zinc-900">
          <div className="max-w-[520px]">
            <Logo theme="dark" />
            <p className="mt-5 text-zinc-400 text-[14.5px] leading-[1.7]">
              A blockchain security audit firm with the goal of making the
              Web3 space more secure through innovative and effective solutions.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <a href="tel:+919999999999" className="font-mono text-[13px] text-zinc-400 hover:text-white inline-flex items-center gap-2">
                <LIcon name="Phone" size={13} className="text-immune-green" />
                +91 99999 99999
              </a>
              <a href="mailto:team@immunebytes.com" className="font-mono text-[13px] text-zinc-400 hover:text-white inline-flex items-center gap-2">
                <LIcon name="Mail" size={13} className="text-immune-green" />
                team@immunebytes.com
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
              <span className="text-immune-green">$</span> follow
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {SOCIALS.map((s) => (
                <SocialPill key={s.name} social={s} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-12 md:gap-x-12 pt-14">
          <div className="col-span-2 md:col-span-5">
            <div className="font-display font-semibold text-[13px] text-zinc-300 tracking-tight uppercase">
              Solutions
            </div>
            <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3">
              {FOOTER_SOLUTIONS.flat().map((it) => (
                <a
                  key={it.label}
                  href={it.href}
                  className="group inline-flex items-center gap-1.5 text-[13.5px] text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-immune-green transition-all" />
                  {it.label}
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <FooterLinkColumn title="Resources" items={FOOTER_RESOURCES} />
          </div>
          <div className="col-span-1 md:col-span-2">
            <FooterLinkColumn title="Company" items={FOOTER_COMPANY} />
          </div>

          <div className="col-span-2 md:col-span-3">
            <div className="font-display font-semibold text-[13px] text-zinc-300 tracking-tight uppercase">
              Newsletter
            </div>
            <p className="mt-3 text-[13px] text-zinc-500 leading-relaxed">
              Audit deep-dives and Web3 security insights, monthly. No spam.
            </p>
            <div className="mt-5">
              <NewsletterForm />
            </div>
            <div className="mt-5 flex items-center gap-2 font-mono text-[10.5px] text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-immune-green animate-pulse" />
              ~3,200 subscribers &middot; monthly cadence
            </div>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-zinc-900">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
              <span className="text-immune-green">$</span> chains_audited —{" "}
              <span className="text-zinc-400">{CHAINS.length}+ ecosystems</span>
            </div>
            <a href="/solutions/web3/smart-contract/by-chain" className="font-display text-[12.5px] font-medium text-zinc-300 hover:text-immune-green inline-flex items-center gap-1.5">
              View all chains <LIcon name="ArrowRight" size={12} strokeWidth={2.25} />
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-3">
            {CHAINS.map((c) => (
              <div
                key={c.name}
                className="group inline-flex items-center gap-2 px-3 h-9 rounded-md border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
              >
                <LIcon name={c.icon} size={14} className="text-zinc-500 group-hover:text-immune-green transition-colors" />
                <span className="font-mono text-[12px]">{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-zinc-900 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[13px] text-zinc-600">
          <div className="flex items-center gap-5">
            <a href="/legal/terms" className="hover:text-zinc-300">Terms of Service</a>
            <span className="text-zinc-800">|</span>
            <a href="/legal/privacy" className="hover:text-zinc-300">Privacy Policy</a>
            <span className="text-zinc-800">|</span>
            <a href="/legal/cookies" className="hover:text-zinc-300">Cookies</a>
          </div>
          <div className="font-mono text-[12px]">Powered by Finesse Digital</div>
          <div>&copy; 2026 ImmuneBytes. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}
