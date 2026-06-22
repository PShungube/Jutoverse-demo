import { useEffect, useState } from 'react';

type MockResourceState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useMockResource<T>(loader: () => Promise<T>): MockResourceState<T> {
  const [state, setState] = useState<MockResourceState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    loader()
      .then((data) => {
        if (!active) return;
        setState({
          data,
          loading: false,
          error: null,
        });
      })
      .catch(() => {
        if (!active) return;
        setState({
          data: null,
          loading: false,
          error: 'Unable to load mock resource.',
        });
      });

    return () => {
      active = false;
    };
  }, [loader]);

  return state;
}
