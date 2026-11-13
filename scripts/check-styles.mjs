// Style guard: fails when source files break the design-system rules.
// Usage: node scripts/check-style.mjs [--strict]
//   default  -> errors only (exit code 1 when any)
//   --strict -> TODO placeholders become errors too (run before launch)
import { readdirSync, readFileSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const ROOT = 'src';
const EXTENSIONS = new Set(['.astro', '.tsx', '.ts', '.css']);
const TOKEN_FILE = join('src', 'styles', 'theme.css');
const MAX_LINES = 200;
const IGNORE_MARK = 'check-style-ignore';
const STRICT = process.argv.includes('--strict');

const COLOR_UTILITIES = '(?:text|bg|border|fill|stroke|from|via|to|ring|outline|decoration|divide|shadow)';
const LEGACY_NAMES = '(?:gold-soft|gold|sage|blush-band|accent-deep|accent-soft|bg-alt)';
const PALETTE_NAMES =
  '(?:white|black|(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\\d{2,3})';

function utility(names) {
  return new RegExp(`(?<![\\w-])${COLOR_UTILITIES}-${names}(?:\\/\\d+)?(?![\\w-])`);
}

const ERROR_RULES = [
  { id: 'legacy-token', pattern: utility(LEGACY_NAMES) },
  { id: 'palette-color', pattern: utility(PALETTE_NAMES) },
  { id: 'old-css-var', pattern: /var\(--color-/ },
  { id: 'raw-color', pattern: /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch|oklab)\(/ },
  {
    id: 'inline-style',
    pattern:
      /style=(?:"[^"]*|\{\{[^}]*)\b(?:background(?:-?[cC]olor)?|color|border[\w-]*|fill|stroke|font-?[fF]amily)\s*:/,
  },
  { id: 'legacy-class', pattern: /(?<![\w-])(?:name-shine|bokeh|ghost-num|flourish)(?![\w-])/ },
  { id: 'old-font', pattern: /(?<![\w-])font-serif(?![\w-])/ },
];

const WARNING_RULES = [{ id: 'todo', pattern: /\bTODO\b/ }];

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (EXTENSIONS.has(extname(entry.name))) yield path;
  }
}

function findingsFor(path) {
  const findings = [];
  const lines = readFileSync(path, 'utf8').split('\n');
  const isTokenFile = path === TOKEN_FILE;

  if (lines.length > MAX_LINES) {
    findings.push({ line: 1, level: 'error', id: 'file-length', text: `${lines.length} lines (max ${MAX_LINES})` });
  }

  lines.forEach((text, index) => {
    if (text.includes(IGNORE_MARK)) return;
    const line = index + 1;

    if (!isTokenFile) {
      for (const rule of ERROR_RULES) {
        if (rule.pattern.test(text)) findings.push({ line, level: 'error', id: rule.id, text });
      }
    }
    for (const rule of WARNING_RULES) {
      if (rule.pattern.test(text)) findings.push({ line, level: 'warn', id: rule.id, text });
    }
  });

  return findings;
}

let errors = 0;
let warnings = 0;

for (const file of walk(ROOT)) {
  const findings = findingsFor(file);
  if (findings.length === 0) continue;

  console.log(`\n${relative('.', file)}`);
  for (const finding of findings) {
    const isError = finding.level === 'error' || STRICT;
    if (isError) errors += 1;
    else warnings += 1;
    console.log(`  ${String(finding.line).padStart(4)}  ${isError ? 'error' : 'warn '}  ${finding.id.padEnd(13)} ${finding.text.trim().slice(0, 80)}`);
  }
}

console.log(`\n${errors} error(s), ${warnings} warning(s)${STRICT ? ' (strict)' : ''}`);
process.exit(errors > 0 ? 1 : 0);