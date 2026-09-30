import { useState } from 'react';

interface StepDeclinedProps {
  name: string;
  onConfirm: () => void;
}

export default function StepDeclined({ name, onConfirm }: StepDeclinedProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleConfirm() {
    setIsSubmitted(true);
    onConfirm();
  }

  return (
    <div className="text-center">
      <p className="mb-3 font-display text-xl italic text-ink">
        Vamos sentir sua falta, {name}
      </p>
      <p className="mb-5 text-xs text-muted">obrigada por avisar com carinho</p>

      {isSubmitted ? (
        <p className="text-sm text-sage">✓ Registrado. Obrigada por avisar!</p>
      ) : (
        <button
          onClick={handleConfirm}
          className="w-full rounded-full bg-accent py-3.5 text-xs uppercase tracking-wide text-white"
        >
          Confirmar ausência
        </button>
      )}
    </div>
  );
}
