import { useCountdown } from '@/hooks/useCountdown';

interface CountdownProps {
  targetIso: string;
}

const UNITS = [
  ['days', 'dias'],
  ['hours', 'horas'],
  ['minutes', 'min'],
  ['seconds', 'seg'],
] as const;

/**
 * Sized in em from one fluid font size, so it scales with the screen and keeps
 * the same proportions whatever the digits. The entrance animation measures a
 * hidden copy of it, so every copy renders with these exact classes.
 */
export default function Countdown({ targetIso }: CountdownProps) {
  const time = useCountdown(targetIso);

  return (
    <div
      role="timer"
      className="flex items-start justify-center gap-[0.4em] text-[clamp(1.75rem,min(3.4vw,6svh),3.25rem)]"
    >
      {UNITS.map(([key, label]) => (
        <div key={key} className="w-[2.2em] text-center">
          <p className="font-display italic leading-none tabular-nums text-brand">
            {time ? String(time[key]).padStart(2, '0') : '--'}
          </p>
          <p className="mt-2 text-[clamp(0.75rem,1vw,0.95rem)] uppercase tracking-widest text-muted">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}