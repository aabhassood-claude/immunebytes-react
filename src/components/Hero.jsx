import { useState, useEffect, useRef } from 'react';
import { SectionLabel, ButtonPrimary, ButtonSecondary, Reveal } from './Primitives';

// ----- Matrix rain background canvas -----------------------
export function MatrixRain() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, w, h, columns, drops;
    const fontSize = 14;
    const chars = "01<>/$#=*+-_";

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.floor(w / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * -h);
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.085)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px "Fira Code", monospace`;
      for (let i = 0; i < columns; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i];
        ctx.fillStyle = `rgba(116, 191, 0, ${0.10 + (Math.random() * 0.05)})`;
        ctx.fillText(ch, x, y);
        drops[i] += fontSize * 0.6;
        if (drops[i] > h && Math.random() > 0.985) {
          drops[i] = Math.random() * -200;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) {
          cancelAnimationFrame(raf);
        } else {
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="matrix-rain" aria-hidden="true" />;
}

// ----- Terminal mockup --------------------------------------
const TERMINAL_LINES = [
  { kind: "prompt", text: "immunebytes scan ./contracts" },
  { kind: "info",   text: "\u2192 parsing 247 functions across 12 contracts" },
  { kind: "info",   text: "\u2192 running slither + custom detectors" },
  { kind: "warn",   text: "\u2192 3 critical findings, 7 high, 14 medium" },
  { kind: "ok",     text: "\u2713 report generated: audit-2026-05-03.pdf" },
  { kind: "prompt", text: "" },
];

export function TerminalMockup() {
  const [progress, setProgress] = useState({ line: 0, char: 0, done: false });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let timer;

    function step() {
      if (cancelled) return;
      setProgress((p) => {
        const cur = TERMINAL_LINES[p.line];
        if (!cur) return { line: 0, char: 0, done: false };
        if (cur.text === "") {
          timer = setTimeout(() => {
            if (!cancelled) {
              setProgress({ line: 0, char: 0, done: false });
              setTick((t) => t + 1);
            }
          }, 4500);
          return { ...p, done: true };
        }
        if (p.char < cur.text.length) {
          const delay = 18 + Math.random() * 28;
          timer = setTimeout(step, delay);
          return { ...p, char: p.char + 1 };
        } else {
          timer = setTimeout(step, 320);
          return { line: p.line + 1, char: 0 };
        }
      });
    }
    timer = setTimeout(step, 600);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [tick]);

  const colorFor = (k) => {
    switch (k) {
      case "prompt": return "text-zinc-100";
      case "info":   return "text-zinc-400";
      case "warn":   return "text-amber-300";
      case "ok":     return "text-immune-green";
      default:       return "text-zinc-300";
    }
  };

  return (
    <div className="relative">
      <div
        className="absolute -inset-12 rounded-[40px] opacity-50 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(116,191,0,0.10) 0%, rgba(116,191,0,0) 70%)",
        }}
      />

      <div className="relative rounded-xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-md shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="flex items-center gap-2 px-4 h-9 bg-zinc-900/80 border-b border-zinc-800">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-zinc-700" />
            <span className="w-3 h-3 rounded-full bg-zinc-700" />
            <span className="w-3 h-3 rounded-full bg-zinc-700" />
          </div>
          <div className="ml-3 font-mono text-[11.5px] text-zinc-500 truncate">
            immunebytes — audit pipeline
          </div>
          <div className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-zinc-600">
            <span className="w-1.5 h-1.5 rounded-full bg-immune-green" />
            live
          </div>
        </div>

        <div className="px-5 py-5 font-mono text-[13.5px] leading-[1.7] min-h-[260px]">
          {TERMINAL_LINES.map((ln, i) => {
            const showFull = i < progress.line;
            const showPartial = i === progress.line;
            const visible = showFull
              ? ln.text
              : showPartial
              ? ln.text.slice(0, progress.char)
              : "";
            const isCurrent = i === progress.line || (progress.done && i === TERMINAL_LINES.length - 1);
            if (i > progress.line && !progress.done) return null;
            return (
              <div key={i} className={`whitespace-pre ${colorFor(ln.kind)}`}>
                {ln.kind === "prompt" && (
                  <span className="text-immune-green">$</span>
                )}{" "}
                <span>{visible}</span>
                {isCurrent && (
                  <span className="term-cursor inline-block translate-y-[1px] ml-0.5 w-[7px] h-[15px] bg-immune-green/90 align-middle" />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between px-4 h-8 bg-zinc-900/60 border-t border-zinc-800 font-mono text-[10.5px] text-zinc-500">
          <span>~/projects/csigma</span>
          <span className="flex items-center gap-3">
            <span className="text-zinc-600">slither</span>
            <span className="text-zinc-600">mythril</span>
            <span className="text-zinc-600">echidna</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ----- Hero section ----------------------------------------
export function Hero() {
  return (
    <section className="relative isolate bg-black pt-[112px] pb-24 md:pt-[148px] md:pb-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <MatrixRain />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.95) 100%)",
          }}
        />
        <div
          className="hidden md:block absolute right-[-10%] top-[20%] w-[640px] h-[640px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(116,191,0,0.07), rgba(116,191,0,0) 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col">
          <Reveal>
            <SectionLabel theme="dark">hero</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 font-display font-semibold text-white tracking-tightest text-[44px] sm:text-[54px] md:text-[64px] lg:text-[68px] leading-[1.02] max-w-[720px]">
              Security-First Protection for the Future of{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Innovation</span>
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 bottom-1 h-3 bg-immune-green/25 -z-0"
                />
              </span>
              .
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-zinc-400 text-[17px] md:text-[19px] leading-relaxed max-w-[540px]">
              Our proactive approach ensures your digital assets and intelligent
              systems remain impenetrable in an evolving threat landscape.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonPrimary href="/contact" size="lg">Send Query</ButtonPrimary>
              <ButtonSecondary href="#services" theme="dark" icon="ArrowDown" size="lg">
                Learn More
              </ButtonSecondary>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-[11.5px] text-zinc-500">
              <span className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-immune-green" />
                608+ audits delivered
              </span>
              <span className="text-zinc-700">|</span>
              <span>Web3 &middot; AI &middot; Web2</span>
              <span className="text-zinc-700">|</span>
              <span>SOC 2-aligned reporting</span>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5 xl:col-span-5">
          <Reveal delay={200}>
            <TerminalMockup />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
