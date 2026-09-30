// Usage: npm run generate-hash -- "your-password"
import { createHash } from 'node:crypto';

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run generate-hash -- "your-password"');
  process.exit(1);
}

const normalized = password.trim().toLowerCase();
const hash = createHash('sha256').update(normalized).digest('hex');

console.log('\nPUBLIC_GATE_HASH=' + hash + '\n');
console.log('Paste that into .env and into your Vercel project env vars.\n');
