import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'motion/react';
import { IconPlus } from '@tabler/icons-react';
import { seedMessages } from '@/data/event';
import MessageCard from './MessageCard';
import MessageModal from './MessageModal';
import AddMessageModal from './AddMessageModal';

export default function MessagesGrid() {
  const [openMessageId, setOpenMessageId] = useState<string | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openMessage = seedMessages.find((message) => message.id === openMessageId);

  const modals = (
    <AnimatePresence>
      {openMessage && (
        <MessageModal message={openMessage} onClose={() => setOpenMessageId(null)} />
      )}
      {isComposing && <AddMessageModal onClose={() => setIsComposing(false)} />}
    </AnimatePresence>
  );

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {seedMessages.map((message, index) => (
          <MessageCard
            key={message.id}
            sender={message.sender}
            offset={index % 2 === 1}
            onClick={() => setOpenMessageId(message.id)}
          />
        ))}

        <button
          onClick={() => setIsComposing(true)}
          className="rounded-2xl border border-dashed border-border-strong p-7 text-center transition-transform hover:-translate-y-1"
        >
          <IconPlus size={30} className="mx-auto text-muted" />
          <p className="mt-3.5 text-sm text-muted">Deixe o seu</p>
        </button>
      </div>

      {isMounted ? createPortal(modals, document.body) : null}
    </div>
  );
}