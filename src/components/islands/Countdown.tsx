import { useCountdown } from '@/hooks/useCountdown';

interface CountdownProps {
  targetIso: string;
}

interface CountdownUnitProps {
  value: number;
  label: string;
}

function CountdownUnit({ value, label }: CountdownUnitProps) {
  return (
    <div className="min-w-[56px] text-center">
      <span
        className="font-serif text-[46px] font-semibold text-accent tabular-nums"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <br />
      <span className="text-[10px] uppercase text-muted">{label}</span>
    </div>
  );
}

export default function Countdown({ targetIso }: CountdownProps) {
  const { days, hours, minutes, seconds } = useCountdown(targetIso);

  return (
    <div className="flex items-baseline justify-center gap-5">
      <CountdownUnit value={days} label="dias" />
      <span className="text-lg text-gold">·</span>
      <CountdownUnit value={hours} label="horas" />
      <span className="text-lg text-gold">·</span>
      <CountdownUnit value={minutes} label="minutos" />
      <span className="text-lg text-gold">·</span>
      <CountdownUnit value={seconds} label="segundos" />
    </div>
  );
}
