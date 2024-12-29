import { useEffect, useRef } from 'react';

type Timer = ReturnType<typeof setTimeout>;

function useDebaunce<T extends unknown[]>(
  debaunceFunction: (...args: T) => void,
  debaunceTime: number
) {
  const timerDebounceRef = useRef<Timer>();

  function handleDebounce(...args: T) {
    if (timerDebounceRef.current) {
      clearTimeout(timerDebounceRef.current);
    }

    timerDebounceRef.current = setTimeout(() => {
      debaunceFunction(...args);
    }, debaunceTime);
  }

  useEffect(() => {
    return () => {
      if (timerDebounceRef.current) {
        clearTimeout(timerDebounceRef.current);
      }
    };
  }, []);

  return handleDebounce;
}

export default useDebaunce;
