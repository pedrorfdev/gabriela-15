import { IconMail } from '@tabler/icons-react';

interface MessageCardProps {
  sender: string;
  offset?: boolean;
  onClick: () => void;
}

export default function MessageCard({ sender, offset, onClick }: MessageCardProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl border border-black/8 bg-surface p-7 text-center transition-transform hover:-translate-y-1 hover:border-accent"
      style={{ transform: offset ? 'translateY(28px)' : undefined }}
    >
      <IconMail size={30} className="mx-auto text-accent" />
      <p className="mt-3.5 text-sm text-muted">{sender} ♥</p>
    </button>
  );
}