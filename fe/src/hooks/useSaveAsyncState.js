import {
  useCallback, useEffect, useRef, useState,
} from 'react';

export default function useSafeAsyncState(initialState) {
  const [state, setState] = useState(initialState);

  const isMoutend = useRef(false);

  useEffect(() => {
    isMoutend.current = true;

    return () => {
      isMoutend.current = false;
    };
  }, []);

  const setSafeAsyncState = useCallback((data) => {
    if (isMoutend.current) {
      setState(data);
    }
  }, []);

  return [state, setSafeAsyncState];
}
