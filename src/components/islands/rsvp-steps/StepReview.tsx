import { useState } from 'react';
import type { Person } from '@/hooks/rsvp/types';

interface StepReviewProps {
  personal: Person;
  companions: Person[];
  onSubmit: () => void;
}

function ReviewRow({ name, note }: Person) {
  return (
    <div className="flex items-center justify-between border-b border-border py-2.5 text-left">
      <span className="text-sm font-medium text-ink">{name}</span>
      <span className="text-xs text-muted">{note || '—'}</span>
    </div>
  );
}

export default function StepReview({ personal, companions, onSubmit }: StepReviewProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalGuests = 1 + companions.length;

  function handleSubmit() {
    setIsSubmitted(true);
    onSubmit();
  }

  return (
    <div className="text-center">
      <p className="mb-5 font-display text-2xl italic text-ink">Confira antes de enviar</p>

      <div className="mb-5">
        <ReviewRow name={personal.name} note={personal.note} />
        {companions.map((companion, index) => (
          <ReviewRow key={index} name={companion.name} note={companion.note} />
        ))}
      </div>

      {isSubmitted ? (
        <p className="text-sm text-sage">✓ Confirmado! Te esperamos lá.</p>
      ) : (
        <button
          onClick={handleSubmit}
          className="w-full rounded-full bg-accent py-3.5 text-xs uppercase tracking-wide text-white"
        >
          Confirmar presença de {totalGuests} {totalGuests > 1 ? 'pessoas' : 'pessoa'}
        </button>
      )}
    </div>
  );
}
