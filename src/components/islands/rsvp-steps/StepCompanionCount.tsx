interface StepCompanionCountProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onContinue: () => void;
}

export default function StepCompanionCount({
  count,
  onIncrement,
  onDecrement,
  onContinue,
}: StepCompanionCountProps) {
  return (
    <div className="text-center">
      <p className="mb-5 font-display text-2xl italic text-ink">Vem alguém com você?</p>

      <div className="mb-2 flex items-center justify-center gap-6">
        <button
          onClick={onDecrement}
          aria-label="Diminuir"
          className="h-9 w-9 rounded-full bg-accent/10 text-accent"
        >
          −
        </button>
        <span className="min-w-[40px] font-display text-3xl text-accent">{count}</span>
        <button
          onClick={onIncrement}
          aria-label="Aumentar"
          className="h-9 w-9 rounded-full bg-accent/10 text-accent"
        >
          +
        </button>
      </div>

      <p className="mb-6 text-xs text-muted">acompanhantes</p>

      <button
        onClick={onContinue}
        className="w-full rounded-full bg-accent py-3.5 text-xs uppercase tracking-wide text-white"
      >
        Continuar
      </button>
    </div>
  );
}
