export function getQueryParams() {
  return new URLSearchParams(window.location.search);
}

export function getManifestUrl() {
  return new URL("tonconnect-manifest.json", window.location.origin).toString();
}

export function getPublicUrl(url: string) {
  return new URL(url, window.location.origin).toString();
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
