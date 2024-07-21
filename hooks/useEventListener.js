import { useEffect } from 'react';

export const useEventListener = (type, listener, options, element = window) => {
  useEffect(() => {
    element.addEventListener(type, listener, options);
    return () => {
      element.removeEventListener(type, listener, options);
    };
  }, [type, listener, options, element]);
};
