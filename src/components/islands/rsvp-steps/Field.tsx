interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}

export default function Field({ label, value, onChange, placeholder, multiline }: FieldProps) {
  const sharedClassName =
    'w-full border-0 border-b border-border-strong bg-transparent px-0.5 py-1.5 text-sm text-ink outline-none focus:border-accent';

  return (
    <div className="mb-5 text-left">
      <label className="mb-2 block text-[10px] uppercase tracking-wide text-muted">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={`${sharedClassName} min-h-12.5 resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={sharedClassName}
        />
      )}
    </div>
  );
}
