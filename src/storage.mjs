import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';

const DB_PATH = 'data/memory.json';

export function ensureStore() {
  if (!existsSync('data')) mkdirSync('data');
  if (!existsSync(DB_PATH)) writeFileSync(DB_PATH, '[]', 'utf8');
}

export function loadAll() {
  ensureStore();
  return JSON.parse(readFileSync(DB_PATH, 'utf8'));
}

export function save(entry) {
  ensureStore();
  const all = loadAll();
  all.push(entry);
  writeFileSync(DB_PATH, JSON.stringify(all, null, 2), 'utf8');
  return entry;
}
