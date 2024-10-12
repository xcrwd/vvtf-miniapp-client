import { useCallback, useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const doFetch = useCallback(() => {
    setLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error(err));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return { data, loading, error, doFetch };
}
