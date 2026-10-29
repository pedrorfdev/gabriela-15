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
    <div className="min-w-13 text-center sm:min-w-18">
      <span className="font-serif text-[32px] font-semibold tabular-nums text-accent sm:text-[46px]">
        {String(value).padStart(2, '0')}
      </span>
      <br />
      <span className="text-[9px] uppercase tracking-wide text-muted sm:text-[10px]">{label}</span>
    </div>
  );
}

export default function Countdown({ targetIso }: CountdownProps) {
  const { days, hours, minutes, seconds } = useCountdown(targetIso);

  return (
    <div className="flex items-baseline justify-center gap-1.5 sm:gap-5">
      <CountdownUnit value={days} label="dias" />
      <span className="text-base text-gold sm:text-lg">·</span>
      <CountdownUnit value={hours} label="horas" />
      <span className="text-base text-gold sm:text-lg">·</span>
      <CountdownUnit value={minutes} label="minutos" />
      <span className="text-base text-gold sm:text-lg">·</span>
      <CountdownUnit value={seconds} label="segundos" />
    </div>
  );
}