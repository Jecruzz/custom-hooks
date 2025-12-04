import { useState, useEffect, useCallback, useRef } from 'react';

function useFetch(url, options = null, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const fetchData = useCallback(async (overrideUrl) => {
    const finalUrl = overrideUrl || url;
    if (!finalUrl) return null;

    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(finalUrl, { signal: controller.signal, ...(options || {}) });
      if (!res.ok) {
        throw new Error(`Network response was not ok (${res.status})`);
      }
      const json = await res.json();
      setData(json);
      return json;
    } catch (err) {
      if (err.name === 'AbortError') {
        return null;
      }
      setError(err.message || String(err));
      throw err;
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }, [url, JSON.stringify(options)]);

  useEffect(() => {
    if (!url) return undefined;
    fetchData();
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, (deps && deps.length) ? deps : [url]);

  return { data, loading, error, refetch: fetchData };
}

export default useFetch;
