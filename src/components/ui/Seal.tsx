import { useId } from 'react';
import { eventConfig } from '@/data/event';

type SealTone = 'default' | 'inverse';

interface SealProps {
  tone?: SealTone;
  className?: string;
  /** Accessible name. Leave out when the seal is purely decorative. */
  label?: string;
}

const TONES: Record<SealTone, { ring: string; mark: string }> = {
  default: { ring: 'text-ink', mark: 'fill-brand' },
  inverse: { ring: 'text-on-action', mark: 'fill-on-action' },
};

// TODO(monogram): swap this placeholder letter for the real monogram path.
const MONOGRAM = 'G';

export default function Seal({ tone = 'default', className = 'size-24', label }: SealProps) {
  const baseId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const topId = `${baseId}-top`;
  const bottomId = `${baseId}-bottom`;
  const { ring, mark } = TONES[tone];
  const { name, age } = eventConfig.person;

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <path id={topId} d="M14 60 A46 46 0 0 1 106 60" />
        <path id={bottomId} d="M6 60 A54 54 0 0 0 114 60" />
      </defs>

      <g className={`${ring} font-display`} fill="currentColor" fontSize="12" letterSpacing="3.2" textAnchor="middle">
        <text>
          <textPath href={`#${topId}`} startOffset="50%">
            {name.toUpperCase()}
          </textPath>
        </text>
        <text>
          <textPath href={`#${bottomId}`} startOffset="50%">
            {`${age} ANOS`}
          </textPath>
        </text>
      </g>

      <circle cx="10" cy="60" r="2.6" className={mark} />
      <circle cx="110" cy="60" r="2.6" className={mark} />
      <text x="60" y="73" textAnchor="middle" fontSize="38" fontStyle="italic" className={`${mark} font-display`}>
        {MONOGRAM}
      </text>
    </svg>
  );
}