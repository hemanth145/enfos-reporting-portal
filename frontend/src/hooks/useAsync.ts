import { useCallback, useEffect, useState } from "react";

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  /** Re-run the async function (used by "Try again" in the error state). */
  reload: () => void;
}

/**
 * Runs an async function on mount (and whenever its dependencies change) and
 * exposes loading / error / data flags. Centralising this keeps every page's
 * data-fetching behaviour — and its loading and error states — consistent.
 */
export function useAsync<T>(
  asyncFn: () => Promise<T>,
  deps: unknown[] = [],
): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // asyncFn is expected to be stable per dependency set; deps drive re-fetching.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const run = useCallback(asyncFn, deps);

  const load = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    run()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Something went wrong.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [run]);

  useEffect(() => load(), [load]);

  return { data, loading, error, reload: load };
}
