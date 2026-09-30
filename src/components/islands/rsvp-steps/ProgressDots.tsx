import type { WizardStep } from '@/hooks/rsvp/types';

const STEP_ORDER: WizardStep[] = ['personal', 'companionCount', 'companionForm', 'review'];

interface ProgressDotsProps {
  step: WizardStep;
}

export default function ProgressDots({ step }: ProgressDotsProps) {
  const activeIndex = step === 'declined' ? 3 : STEP_ORDER.indexOf(step);

  return (
    <div className="mb-6 flex justify-center gap-1.5">
      {STEP_ORDER.map((_, index) => (
        <span
          key={index}
          className="h-1.5 rounded-full bg-accent/20 transition-all duration-300"
          style={{
            width: index === activeIndex ? 18 : 6,
            backgroundColor: index === activeIndex ? 'var(--color-accent)' : undefined,
          }}
        />
      ))}
    </div>
  );
}
