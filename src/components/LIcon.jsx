import { icons } from 'lucide-react';

// Drop-in replacement for the prototype's LIcon that used window.lucide.
// Maps name strings to lucide-react components dynamically.
export function LIcon({ name, size = 16, className = "", strokeWidth = 1.75 }) {
  const IconComponent = icons[name];
  if (!IconComponent) return null;
  return (
    <IconComponent
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
    />
  );
}
