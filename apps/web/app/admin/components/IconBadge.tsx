import type { LucideIcon } from 'lucide-react';

type Tone = 'blue' | 'orange' | 'green' | 'gold' | 'gradient';

const TONES: Record<Tone, { bg: string; fg: string }> = {
  blue: { bg: 'var(--color-primary-soft)', fg: 'var(--color-primary)' },
  orange: { bg: 'var(--color-accent-soft)', fg: 'var(--color-accent)' },
  green: { bg: 'var(--status-green-soft)', fg: 'var(--status-green)' },
  gold: { bg: 'rgba(237,215,106,0.22)', fg: '#8a6d0f' },
  gradient: { bg: 'var(--color-accent-gradient)', fg: '#ffffff' },
};

interface IconBadgeProps {
  icon: LucideIcon;
  tone?: Tone;
  size?: number;
  iconSize?: number;
  className?: string;
}

/** Rounded square badge holding a single lucide icon. */
export function IconBadge({ icon: Icon, tone = 'blue', size = 44, iconSize = 20, className }: IconBadgeProps) {
  const t = TONES[tone];
  return (
    <span
      className={`sa-icon-badge${className ? ` ${className}` : ''}`}
      style={{ width: size, height: size, background: t.bg, color: t.fg }}
      aria-hidden="true"
    >
      <Icon size={iconSize} strokeWidth={2} />
    </span>
  );
}
