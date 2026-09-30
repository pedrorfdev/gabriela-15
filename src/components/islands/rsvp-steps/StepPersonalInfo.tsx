import Field from './Field';
import type { Person } from '@/hooks/rsvp/types';

interface StepPersonalInfoProps {
  personal: Person;
  onChange: (field: keyof Person, value: string) => void;
  onConfirmGoing: (isGoing: boolean) => void;
}

export default function StepPersonalInfo({ personal, onChange, onConfirmGoing }: StepPersonalInfoProps) {
  return (
    <div>
      <p className="mb-5 text-center font-display text-2xl italic text-ink">Seus dados</p>

      <Field
        label="Nome completo"
        value={personal.name}
        onChange={(value) => onChange('name', value)}
        placeholder="Seu nome"
      />
      <Field
        label="Observação (alergia, restrição...)"
        value={personal.note}
        onChange={(value) => onChange('note', value)}
        placeholder="Opcional"
        multiline
      />

      <p className="mb-2 text-center text-xs text-muted">Você vai?</p>
      <div className="flex gap-2.5">
        <button
          onClick={() => onConfirmGoing(true)}
          className="flex-1 rounded-full border border-accent py-3 text-xs uppercase tracking-wide text-accent transition-colors hover:bg-accent hover:text-white"
        >
          Sim, vou!
        </button>
        <button
          onClick={() => onConfirmGoing(false)}
          className="flex-1 rounded-full border border-accent py-3 text-xs uppercase tracking-wide text-accent transition-colors hover:bg-accent hover:text-white"
        >
          Não posso
        </button>
      </div>
    </div>
  );
}
