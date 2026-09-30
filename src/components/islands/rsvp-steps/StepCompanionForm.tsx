import Field from './Field';
import type { Person } from '@/hooks/rsvp/types';

interface StepCompanionFormProps {
  draft: Person;
  index: number;
  total: number;
  onChange: (field: keyof Person, value: string) => void;
  onSubmit: () => void;
}

export default function StepCompanionForm({
  draft,
  index,
  total,
  onChange,
  onSubmit,
}: StepCompanionFormProps) {
  return (
    <div>
      <p className="text-center text-xs text-muted">
        Acompanhante {index + 1} de {total}
      </p>
      <p className="mb-5 text-center font-display text-2xl italic text-ink">
        Dados do acompanhante
      </p>

      <Field
        label="Nome completo"
        value={draft.name}
        onChange={(value) => onChange('name', value)}
        placeholder="Nome do acompanhante"
      />
      <Field
        label="Observação (alergia, restrição...)"
        value={draft.note}
        onChange={(value) => onChange('note', value)}
        placeholder="Opcional"
        multiline
      />

      <button
        onClick={onSubmit}
        className="w-full rounded-full bg-accent py-3.5 text-xs uppercase tracking-wide text-white"
      >
        Próximo
      </button>
    </div>
  );
}
