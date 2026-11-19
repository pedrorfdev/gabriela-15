// ============================================================
// src/data/party.ts
//
// Copy and limits for the party-day page (/party), reached through the QR
// codes on the tables. Reword or tweak anything here, never inside components.
// ============================================================

import { eventConfig } from '@/data/event';

export const partyPage = {
  title: `Festa da ${eventConfig.person.name}`,
  intro: 'Que bom ter você aqui! Compartilhe a noite com a gente.',

  instagram: {
    title: 'Poste e marque a Gabi',
    description: 'Copie a legenda, cole na sua foto ou story e pronto.',
  },

  photos: {
    title: 'Envie suas fotos',
    description: 'As fotos vão direto para a pasta da família.',
    notice: 'As fotos da festa serão disponibilizadas ao final dela.',
    /** Flip to false after the party to close the upload. */
    uploadsOpen: true,
    closedNotice: 'O envio de fotos foi encerrado. Obrigada por celebrar com a gente!',
    maxFilesPerBatch: 10,
    maxEdgePx: 1600,
    jpegQuality: 0.85,
  },

  message: {
    title: 'Deixe um recado',
    description: 'Escreva uma mensagem para a Gabriela.',
  },
};