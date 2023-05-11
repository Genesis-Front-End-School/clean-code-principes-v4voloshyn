import { useCallback, useState } from 'react';

import { localStorageWrapper } from '../utils/browser-storage-wrapper';

import { useLatest } from './useLatest';

type AnyFunction = (...args: any[]) => any;
const isFunction = (value: unknown): value is AnyFunction => {
  return typeof value === 'function';
};

export const useLocalStorage = <T>(
  key: string,
  initialValue: T | (() => T)
) => {
  const [value, setValue] = useState(() => {
    const savedValue = localStorageWrapper.get<T>(key);

    if (savedValue) {
      return savedValue;
    }
    return isFunction(initialValue) ? initialValue() : initialValue;
  });

  const latestValue = useLatest(value);

  const updateValue = useCallback(
    (newValue: React.SetStateAction<T>) => {
      setValue(newValue);

      const actualValue = isFunction(newValue)
        ? newValue(latestValue.current)
        : newValue;

      localStorageWrapper.set(key, actualValue);
    },
    [key, latestValue]
  );

  return [value, updateValue] as const;
};
