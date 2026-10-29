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
      className={`rounded-2xl border border-border bg-surface p-5 text-center transition-transform hover:-translate-y-1 hover:border-accent sm:p-7 ${
        offset ? 'sm:[transform:translateY(28px)]' : ''
      }`}
    >
      <IconMail size={30} className="mx-auto text-accent" />
      <p className="mt-3.5 text-sm text-muted">{sender} ♥</p>
    </button>
  );
}