export function getQueryParams() {
  return new URLSearchParams(window.location.search);
}

export function getPublicUrl(url: string) {
  return new URL(url, window.location.href).toString();
}

export function fromIterable<K, V>(iterable: Iterable<[K, V]>) {
  const kv: Record<string, V> = {};
  for (const [k, v] of iterable) {
    kv[String(k)] = v;
  }
  return kv;
}

export function arrayToggleValue<T>(arr: T[], value: T, present: boolean) {
  const idx = arr.indexOf(value);

  if (present) return idx < 0 ? arr.concat(value) : arr;

  return idx < 0 ? arr : arrayRemoveIndex(arr, idx);
}

export function arrayRemoveIndex<T>(arr: T[], index: number) {
  if (index < 0) return arr;

  return arr.slice(0, index).concat(arr.slice(index + 1));
}

export function toArray<T>(value?: T): T extends unknown[] ? T : T[];
export function toArray<T>(value?: T | T[]): T[] {
  if (Array.isArray(value)) return value;
  return value === undefined ? [] : [value];
}

export async function sha256(message: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  const bytes = Array.from(new Uint8Array(digest));
  const hex = bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hex;
}
