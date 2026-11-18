import { useEffect, useState } from 'react';

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ZERO: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function diffToTimeLeft(targetIso: string): TimeLeft {
  const diffMs = new Date(targetIso).getTime() - Date.now();
  if (diffMs <= 0) return ZERO;

  const totalSeconds = Math.floor(diffMs / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

/**
 * Ticks down to the given ISO date, once per second. Returns null until the
 * component mounts, so the server-rendered markup and the first client render match.
 */
export function useCountdown(targetIso: string): TimeLeft | null {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const update = () => setTimeLeft(diffToTimeLeft(targetIso));
    update();

    const intervalId = setInterval(update, 1000);
    return () => clearInterval(intervalId);
  }, [targetIso]);

  return timeLeft;
}