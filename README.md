# Gabriela · 15 anos

Site de convite dos 15 anos da Gabriela. Astro + ilhas React, Tailwind v4, Motion.

## Setup

```bash
npm install
cp .env.example .env
npm run generate-hash -- "sua-senha-aqui"   # cola o resultado no .env
npm run dev
```

Abre em `http://localhost:4321`.

## Estrutura

```
src/
├── components/
│   ├── sections/   → .astro, estático, zero JS
│   ├── islands/     → .tsx, React hidratado seletivamente
│   └── ui/          → peças .astro reaproveitadas (Flourish, Bokeh, etc)
├── hooks/            → lógica de estado separada dos componentes
├── lib/              → hash, constantes, variantes do Motion
├── data/             → event.ts e photos.ts — edite os dados aqui
├── layouts/
└── pages/
```

## Antes de publicar de verdade

Estes campos estão marcados com `TODO` em `src/data/event.ts` e `src/data/photos.ts`:

- Endereço completo e embed do Google Maps (`eventConfig.venue`)
- Traje real (`eventConfig.dressCode`)
- Links de redes sociais (`eventConfig.social`)
- Recomendações reais de hotel/salão (`recommendations`)
- Mensagens reais da família (`seedMessages`)
- Fotos da galeria (`src/data/photos.ts`, hoje vazio — mostra um placeholder)

## O que ainda não foi construído (de propósito)

- **Apps Script** (`apps-script/Code.gs`): combinamos deixar pro final. O ponto de entrada no
  front-end já existe — é só o `handleFinalSubmit` em `RsvpWizard.tsx`, marcado com `TODO`.
- **Dark mode**: os tokens em `global.css` têm um `.dark` de partida, mas a linguagem visual
  atual (Bodoni Moda, bokeh, selo, numeral fantasma) nunca foi validada nesse tema. Revisitar
  antes de ligar de verdade.

## Uma nota honesta

Esse projeto foi escrito por completo sem rodar `npm install` nem `npm run build` — o ambiente
onde foi gerado não tem acesso à internet. É bem possível que apareça algum erro pequeno
(import, prop, versão de lib) no seu primeiro `npm run dev`. Isso é esperado pro tamanho do
projeto — cola o erro que a gente resolve rápido.
