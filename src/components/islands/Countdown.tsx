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
 * Fixed-width units, so the countdown has the same size whatever the digits.
 * The entrance animation relies on that to measure a hidden copy of it.
 */
export default function Countdown({ targetIso }: CountdownProps) {
  const time = useCountdown(targetIso);

  return (
    <div role="timer" className="flex items-start justify-center gap-3">
      {UNITS.map(([key, label]) => (
        <div key={key} className="w-14 text-center">
          <p className="font-display text-3xl italic leading-none tabular-nums text-brand">
            {time ? String(time[key]).padStart(2, '0') : '--'}
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-widest text-muted">{label}</p>
        </div>
      ))}
    </div>
  );
}