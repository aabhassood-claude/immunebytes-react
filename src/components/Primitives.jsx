import { LIcon } from './LIcon';

// ----- Section label ----------------------------------------
export function SectionLabel({ children, theme = "light", className = "" }) {
  const labelColor = theme === "dark" ? "text-zinc-500" : "text-zinc-600";
  return (
    <div className={`font-mono text-[12px] tracking-wide ${labelColor} ${className}`}>
      <span className="text-immune-green">$</span>{" "}
      <span>{children}</span>
    </div>
  );
}

// ----- Buttons ----------------------------------------------
export function ButtonPrimary({ children, href = "#", className = "", icon = "ArrowRight", size = "md" }) {
  const sizes = {
    sm: "h-9 px-4 text-[13px]",
    md: "h-11 px-5 text-[14px]",
    lg: "h-12 px-6 text-[15px]",
  };
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-full bg-immune-green text-black font-display font-semibold whitespace-nowrap ${sizes[size]} hover:bg-[#82d600] transition-colors ${className}`}
    >
      {children}
      {icon && <LIcon name={icon} size={16} strokeWidth={2.25} />}
    </a>
  );
}

export function ButtonSecondary({ children, href = "#", className = "", theme = "dark", icon = null, size = "md" }) {
  const sizes = {
    sm: "h-9 px-4 text-[13px]",
    md: "h-11 px-5 text-[14px]",
    lg: "h-12 px-6 text-[15px]",
  };
  const themeCls = theme === "dark"
    ? "border-zinc-700 text-white hover:bg-zinc-900 hover:border-zinc-600"
    : "border-zinc-300 text-zinc-900 hover:bg-zinc-50 hover:border-zinc-400";
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-full border bg-transparent ${themeCls} font-display font-semibold whitespace-nowrap ${sizes[size]} transition-colors ${className}`}
    >
      {children}
      {icon && <LIcon name={icon} size={16} strokeWidth={2.25} />}
    </a>
  );
}

export function ButtonGhost({ children, href = "#", className = "", theme = "light" }) {
  const cls = theme === "dark"
    ? "text-zinc-300 hover:text-white"
    : "text-zinc-700 hover:text-zinc-900";
  return (
    <a href={href} className={`group inline-flex items-center gap-1.5 font-display text-[14px] font-medium whitespace-nowrap ${cls} ${className}`}>
      {children}
      <LIcon name="ArrowRight" size={14} strokeWidth={2.25} className="card-arrow" />
    </a>
  );
}

// ----- Reveal-on-scroll wrapper -----------------------------
export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  return (
    <Tag className={`reveal in ${className}`}>
      {children}
    </Tag>
  );
}

// ----- Section heading combo --------------------------------
export function SectionHeading({ label, title, subhead, theme = "light", center = false, action, className = "" }) {
  const headingColor = theme === "dark" ? "text-white" : "text-zinc-900";
  const subColor = theme === "dark" ? "text-zinc-400" : "text-zinc-600";
  const align = center ? "items-center text-center" : "items-start";
  return (
    <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 ${className}`}>
      <div className={`flex flex-col ${align} max-w-[680px]`}>
        <SectionLabel theme={theme}>{label}</SectionLabel>
        <h2 className={`mt-4 font-display font-semibold tracking-tight ${headingColor} text-[34px] sm:text-[42px] md:text-[48px] leading-[1.05]`}>
          {title}
        </h2>
        {subhead && (
          <p className={`mt-5 ${subColor} text-[16px] sm:text-[17px] leading-relaxed max-w-[640px]`}>
            {subhead}
          </p>
        )}
      </div>
      {action && <div className="md:self-end shrink-0">{action}</div>}
    </div>
  );
}
