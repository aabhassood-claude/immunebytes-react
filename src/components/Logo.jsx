import { Link } from 'react-router-dom';

export function LogoMark({ theme = "dark", size = 28 }) {
  const slashColor = theme === "dark" ? "#FFFFFF" : "#0A0A0A";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      {/* Diagonal bar (the back-slash of the B) */}
      <path
        d="M30 4 L42 4 L34 60 L22 60 Z"
        fill={slashColor}
      />
      {/* Hollow chevron (the bowl/play arrow of the B) — outlined right-angle */}
      <path
        d="M14 14 L40 32 L14 50 L14 40 L26 32 L14 24 Z"
        fill="#74BF00"
      />
    </svg>
  );
}

export function Logo({ theme = "dark", className = "" }) {
  const isDark = theme === "dark";
  const first = isDark ? "text-white" : "text-zinc-900";
  const second = isDark ? "text-immune-green" : "text-immune-green";
  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`} aria-label="ImmuneBytes — home">
      <LogoMark theme={theme} size={28} />
      <span className="font-display font-semibold text-[19px] tracking-tight leading-none">
        <span className={first}>Immune</span><span className={second}>Bytes</span>
      </span>
    </Link>
  );
}
