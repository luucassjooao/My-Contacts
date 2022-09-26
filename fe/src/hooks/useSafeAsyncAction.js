import {
  useCallback,
} from 'react';
import useIsMounted from './useIsMounted';

export default function useSafeAsyncAction() {
  const isMounted = useIsMounted();

  const runSafeAsyncAction = useCallback((callabck) => {
    if (isMounted()) {
      callabck();
    }
  }, [isMounted]);

  return runSafeAsyncAction;
}
