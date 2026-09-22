'use client';

import { useSyncExternalStore, useCallback, useRef } from 'react';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('local-storage-update', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('local-storage-update', callback);
  };
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Simpan initialValue di useRef agar referensinya tidak berubah saat re-render
  const initializer = useRef(initialValue);

  // Snapshot Client: Ambil murni dari localStorage
  const getSnapshot = useCallback((): string => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        return item;
      }
      // Jika belum ada di localStorage, simpan data awal ke localStorage
      const defaultStr = JSON.stringify(initializer.current);
      window.localStorage.setItem(key, defaultStr);
      return defaultStr;
    } catch {
      return JSON.stringify(initializer.current);
    }
  }, [key]);

  // Snapshot Server
  const getServerSnapshot = useCallback((): string => {
    return JSON.stringify(initializer.current);
  }, []);

  const rawValue = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const storedValue: T = JSON.parse(rawValue);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const item = window.localStorage.getItem(key);
        const current: T = item !== null ? JSON.parse(item) : initializer.current;
        const nextValue = value instanceof Function ? value(current) : value;

        window.localStorage.setItem(key, JSON.stringify(nextValue));
        window.dispatchEvent(new Event('local-storage-update'));
      } catch (error) {
        console.warn(`Gagal menyimpan ke localStorage untuk key "${key}":`, error);
      }
    },
    [key]
  );

  return [storedValue, setValue] as const;
}