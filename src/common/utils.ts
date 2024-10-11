export function fromIterable<K, V>(iterable: Iterable<[K, V]>) {
  const kv: Record<string, V> = {};
  for (const [k, v] of iterable) {
    kv[String(k)] = v;
  }
  return kv;
}

export function getQueryParams() {
  return new URLSearchParams(window.location.search);
}
