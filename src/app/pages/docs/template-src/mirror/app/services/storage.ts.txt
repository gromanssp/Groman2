import { effect, signal, untracked, WritableSignal } from '@angular/core';

/**
 * A writable signal whose value is mirrored into `localStorage`.
 *
 * Reads the stored value once on creation and writes it back on every change,
 * so services never have to touch `localStorage` by hand.
 */
export function persistedSignal<T>(key: string, initial: T): WritableSignal<T> {
  const state = signal<T>(readStorage(key, initial));

  effect(() => {
    const value = state();
    untracked(() => writeStorage(key, value));
  });

  return state;
}

export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function writeStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable (private mode, quota) - state stays in memory only.
  }
}

export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // Nothing to do.
  }
}
