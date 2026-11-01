// Reading progress, kept only in this browser (localStorage): which pages the
// reader has marked "read and reflected", and when. Nothing leaves the device.
// Every read and write is guarded: in a private window or with storage blocked
// the site still works, progress just isn't kept.

const KEY = 'tefekkur-progress-v1';
export const CHANGE = 'tefekkur-progress';

/** Item id (S1, M2, Q8) → the day it was completed (YYYY-MM-DD, local time). */
export type Done = Record<string, string>;

export function load(): Done {
  try {
    const raw = localStorage.getItem(KEY);
    const data = raw ? JSON.parse(raw) : null;
    return data && typeof data.done === 'object' && data.done ? data.done : {};
  } catch {
    return {};
  }
}

function save(done: Done): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify({ version: 1, done }));
    window.dispatchEvent(new CustomEvent(CHANGE));
    return true;
  } catch {
    return false;
  }
}

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export function setDone(id: string, on: boolean): boolean {
  const done = load();
  if (on) done[id] = done[id] ?? today();
  else delete done[id];
  return save(done);
}

/** A JSON file the reader can keep, and load again on another device. */
export function exportJson(): string {
  return JSON.stringify({ app: 'tefekkur', version: 1, done: load() }, null, 1);
}

/** Merges an exported file into this device's progress. Returns how many pages it added. */
export function importJson(text: string, validIds: Set<string>): number {
  const data = JSON.parse(text);
  if (!data || data.app !== 'tefekkur' || typeof data.done !== 'object') throw new Error('not a progress file');
  const done = load();
  let added = 0;
  for (const [id, day] of Object.entries(data.done)) {
    if (!validIds.has(id) || typeof day !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(day)) continue;
    if (!done[id]) added++;
    done[id] = done[id] && done[id] < day ? done[id] : day;
  }
  save(done);
  return added;
}

export function reset(): void {
  save({});
}
