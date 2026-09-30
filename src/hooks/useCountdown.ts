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
 * Ticks down to the given ISO date, updating once per second.
 */
export function useCountdown(targetIso: string): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => diffToTimeLeft(targetIso));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(diffToTimeLeft(targetIso));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetIso]);

  return timeLeft;
}
