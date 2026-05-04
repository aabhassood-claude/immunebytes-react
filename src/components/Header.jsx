import { useState, useEffect, useRef } from 'react';
import { LIcon } from './LIcon';
import { Logo } from './Logo';
import { ButtonPrimary } from './Primitives';
import { ContactFormModal } from './ContactFormModal';

const SOLUTIONS_COLUMNS = [
  {
    id: "web3",
    icon: "Boxes",
    title: "Web3 Security",
    eyebrow: "Core protection for on-chain systems",
    items: [
      { label: "Smart Contract Audit", href: "/solutions/web3/smart-contract", icon: "FileCode2", children: [
        { label: "By Chain",        href: "/solutions/web3/smart-contract/by-chain",        icon: "Link" },
        { label: "By Project Type", href: "/solutions/web3/smart-contract/by-project-type", icon: "Layers" },
      ]},
      { label: "Protocol & Infrastructure Audit", href: "/solutions/web3/protocol", icon: "Network", children: [
        { label: "L1/L2 Audit",                href: "/solutions/web3/protocol/l1-l2",       icon: "Layers3" },
        { label: "Consensus Frameworks Audit", href: "/solutions/web3/protocol/consensus",   icon: "GitMerge" },
        { label: "Tokenomics Audit",           href: "/solutions/web3/protocol/tokenomics",  icon: "Coins" },
      ]},
      { label: "Wallet Security", href: "/solutions/web3/wallet", icon: "Wallet", children: [
        { label: "Dapp Integration Security", href: "/solutions/web3/wallet/dapp-integration", icon: "Plug" },
        { label: "Wallet Extension Audit",    href: "/solutions/web3/wallet/extension",        icon: "Puzzle" },
      ]},
    ],
  },
  {
    id: "web2",
    icon: "ShieldCheck",
    title: "Web2 Security",
    eyebrow: "Application & infrastructure pen testing",
    items: [
      { label: "Penetration Testing",        href: "/solutions/web2/pentest",  icon: "Bug" },
      { label: "Web Application Testing",    href: "/solutions/web2/web-app",  icon: "Globe" },
      { label: "Mobile Application Testing", href: "/solutions/web2/mobile",   icon: "Smartphone" },
      { label: "Desktop Application Testing", href: "/solutions/web2/desktop", icon: "Monitor" },
    ],
  },
  {
    id: "ai",
    icon: "Cpu",
    title: "AI Security",
    eyebrow: "LLMs, agents & ML pipelines",
    items: [
      { label: "AI Agent Audit",            href: "/solutions/ai/agent",      icon: "Bot" },
      { label: "Chatbot Security",          href: "/solutions/ai/chatbot",    icon: "MessagesSquare" },
      { label: "LLM Integration Audit",     href: "/solutions/ai/llm",        icon: "Brain" },
      { label: "Automation & Workflow Audit", href: "/solutions/ai/automation", icon: "Workflow" },
    ],
  },
  {
    id: "consultancy",
    icon: "Compass",
    title: "Security Consultancy",
    eyebrow: "Embed with engineering teams",
    items: [
      { label: "Shift-Left Security (SSDL)",        href: "/solutions/consultancy/shift-left", icon: "MoveLeft" },
      { label: "Test & Fuzz-Driven Development",    href: "/solutions/consultancy/test-fuzz",  icon: "FlaskConical" },
      { label: "Pre-Audit Dynamic Testing",         href: "/solutions/consultancy/pre-audit",  icon: "Activity" },
      { label: "Security Research & Engineering",   href: "/solutions/consultancy/research",   icon: "Microscope" },
    ],
  },
];

const NAV_ITEMS = [
  { label: "Solutions", mega: true },
  { label: "Audit",   href: "/audits" },
  { label: "Client",  href: "/clients" },
  { label: "About",   href: "/about" },
  { label: "Pricing", href: "/engagement-models" },
  { label: "Blog",    href: "/blogs" },
];

function MegaItem({ item, sub = false }) {
  return (
    <a
      href={item.href}
      className={`group/link flex items-start gap-3 ${sub ? "py-1.5" : "py-2"} -mx-2 px-2 rounded-md hover:bg-zinc-50 transition-colors`}
    >
      <span
        className={`shrink-0 ${sub ? "h-6 w-6" : "h-8 w-8"} rounded-md flex items-center justify-center border border-zinc-200 bg-white text-zinc-700 group-hover/link:border-immune-green/40 group-hover/link:text-immune-green group-hover/link:bg-immune-green/5 transition-colors`}
      >
        <LIcon name={item.icon} size={sub ? 13 : 15} strokeWidth={1.75} />
      </span>
      <span
        className={`font-sans ${sub ? "text-[12.5px] text-zinc-600" : "text-[14px] text-zinc-800"} leading-snug pt-1 group-hover/link:text-zinc-900`}
      >
        {item.label}
      </span>
    </a>
  );
}

function MegaMenu({ open, onClose }) {
  if (!open) return null;
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[min(1180px,calc(100vw-32px))] z-40"
      onMouseLeave={onClose}
    >
      <div className="mega-enter rounded-xl bg-white border border-zinc-200 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.4)] overflow-hidden">
        {/* Columns */}
        <div className="grid grid-cols-4 gap-x-10 px-10 py-8">
          {SOLUTIONS_COLUMNS.map((col) => (
            <div key={col.id} className="flex flex-col">
              <div className="pb-4 border-b border-immune-green/40">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-md bg-immune-green text-black flex items-center justify-center">
                    <LIcon name={col.icon} size={16} strokeWidth={2.25} />
                  </div>
                  <div className="font-display font-semibold text-[15px] text-zinc-900 tracking-tight">
                    {col.title}
                  </div>
                </div>
                <div className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-zinc-500">
                  {col.eyebrow}
                </div>
              </div>

              <ul className="mt-3 flex flex-col gap-0.5">
                {col.items.map((it) => (
                  <li key={it.label} className="flex flex-col">
                    <MegaItem item={it} />
                    {it.children && (
                      <ul className="mt-0.5 ml-4 pl-3 border-l border-zinc-100 flex flex-col gap-0">
                        {it.children.map((sub) => (
                          <li key={sub.label}>
                            <MegaItem item={sub} sub />
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom rail */}
        <div className="border-t border-zinc-100 grid grid-cols-1 md:grid-cols-3">
          <div className="px-10 py-4 md:col-span-2 flex items-center gap-4 bg-zinc-50/60">
            <div className="font-mono text-[11px] text-zinc-500">
              <span className="text-immune-green">$</span> solutions —{" "}
              <span className="text-zinc-700">17 services across 4 pillars</span>
            </div>
            <span className="hidden md:inline-block w-px h-4 bg-zinc-200" />
            <a
              href="/solutions"
              className="hidden md:inline-flex font-display text-[13px] font-medium text-zinc-900 hover:text-immune-green items-center gap-1.5"
            >
              Explore all services
              <LIcon name="ArrowRight" size={13} strokeWidth={2.25} />
            </a>
          </div>
          <a
            href="/contact"
            className="px-6 py-4 bg-zinc-950 text-white flex items-center justify-between gap-4 group/cta hover:bg-black"
          >
            <div className="flex flex-col">
              <span className="font-display font-semibold text-[14px]">Get a free audit consultation</span>
              <span className="font-mono text-[10.5px] text-zinc-500 mt-0.5">15-min discovery call</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full bg-immune-green text-black font-display text-[12px] font-semibold whitespace-nowrap">
              Book now
              <LIcon name="ArrowRight" size={12} strokeWidth={2.5} />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

function MobileDrawer({ open, onClose, onContactOpen }) {
  if (!open) return null;
  const [openCol, setOpenCol] = useState("web3");
  return (
    <div className="fixed inset-0 z-[60] bg-black flex flex-col">
      <div className="flex items-center justify-between h-16 px-5 border-b border-zinc-800">
        <Logo theme="dark" />
        <button onClick={onClose} className="text-zinc-300 hover:text-white p-2 -mr-2" aria-label="Close menu">
          <LIcon name="X" size={22} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-6">
        <nav className="flex flex-col">
          {NAV_ITEMS.filter(n => !n.mega).map((n) => (
            <a key={n.label} href={n.href} className="py-3 border-b border-zinc-900 font-display text-[16px] text-white">
              {n.label}
            </a>
          ))}

          <div className="mt-6 mb-2 font-mono text-[11px] text-zinc-500 uppercase tracking-wider">
            <span className="text-immune-green">$</span> solutions
          </div>
          {SOLUTIONS_COLUMNS.map((col) => {
            const isOpen = openCol === col.id;
            return (
              <div key={col.id} className="border-b border-zinc-900">
                <button
                  onClick={() => setOpenCol(isOpen ? "" : col.id)}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span className="flex items-center gap-3">
                    <span className="h-7 w-7 rounded-md bg-immune-green text-black flex items-center justify-center">
                      <LIcon name={col.icon} size={14} strokeWidth={2.25} />
                    </span>
                    <span className="font-display text-[15px] text-white">{col.title}</span>
                  </span>
                  <LIcon name={isOpen ? "Minus" : "Plus"} size={16} className="text-zinc-500" />
                </button>
                {isOpen && (
                  <ul className="pb-4 pl-10 flex flex-col gap-2.5">
                    {col.items.map((it) => (
                      <li key={it.label}>
                        <a href={it.href} className="flex items-center gap-2.5 text-[14px] text-zinc-300 hover:text-white">
                          <LIcon name={it.icon} size={14} className="text-zinc-500" />
                          {it.label}
                        </a>
                        {it.children && (
                          <ul className="mt-1.5 ml-3 pl-3 border-l border-zinc-800 flex flex-col gap-1.5">
                            {it.children.map((s) => (
                              <li key={s.label}>
                                <a href={s.href} className="flex items-center gap-2 text-[13px] text-zinc-500 hover:text-zinc-200">
                                  <LIcon name={s.icon} size={12} />
                                  {s.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        <div className="mt-8">
          <button
            onClick={onContactOpen}
            className="w-full justify-center inline-flex items-center gap-2 rounded-full bg-immune-green text-black font-display font-semibold whitespace-nowrap h-11 px-5 text-[14px] hover:bg-[#82d600] transition-colors"
          >
            Talk to an Expert
          </button>
        </div>
      </div>
    </div>
  );
}

export function Header({ activePath = "/" }) {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  const shellCls = scrolled
    ? "bg-black/95 backdrop-blur-md border-b border-zinc-800"
    : "bg-transparent border-b border-transparent";

  return (
    <>
      <header className={`header-shell fixed top-0 inset-x-0 z-50 ${shellCls}`}>
        <div className="max-w-[1320px] mx-auto h-[72px] px-6 grid grid-cols-[auto_1fr_auto] items-center gap-8">
          <Logo theme="dark" />

          <nav className="hidden lg:flex items-center justify-center gap-1 relative">
            {NAV_ITEMS.map((item) => {
              const isActive = item.href === activePath;
              if (item.mega) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      onClick={() => setMegaOpen((o) => !o)}
                      className={`font-display text-[14.5px] font-medium px-3.5 h-10 inline-flex items-center gap-1.5 ${megaOpen ? "text-white" : "text-zinc-200 hover:text-white"}`}
                      aria-expanded={megaOpen}
                    >
                      {item.label}
                      <LIcon name="ChevronDown" size={14} className={`transition-transform ${megaOpen ? "rotate-180 text-immune-green" : ""}`} />
                    </button>
                  </div>
                );
              }
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative font-display text-[14.5px] font-medium px-3.5 h-10 inline-flex items-center ${isActive ? "text-white" : "text-zinc-300 hover:text-white"}`}
                >
                  {item.label}
                  {isActive && <span className="absolute left-3.5 right-3.5 -bottom-px h-0.5 bg-immune-green rounded-full" />}
                </a>
              );
            })}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full"
              onMouseEnter={openMega}
              onMouseLeave={scheduleClose}
            >
              <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
            </div>
          </nav>

          <div className="flex items-center gap-3 justify-self-end">
            <button
              onClick={() => setContactOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-immune-green text-black font-display font-semibold whitespace-nowrap h-9 px-4 text-[13px] hover:bg-[#82d600] transition-colors"
            >
              Talk to an Expert
              <span className="inline-flex"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
            </button>
            <button
              className="lg:hidden text-zinc-200 p-2 -mr-2"
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
            >
              <LIcon name="Menu" size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onContactOpen={() => { setDrawerOpen(false); setContactOpen(true); }} />
      <ContactFormModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

export { SOLUTIONS_COLUMNS, NAV_ITEMS };
