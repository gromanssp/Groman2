import { computed, DestroyRef, inject, Injectable, signal, Signal } from '@angular/core';

export const BREAKPOINTS = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Viewport queries as signals, so components never read `window.innerWidth`
 * directly (which never re-renders anything in a zoneless app).
 */
@Injectable({ providedIn: 'root' })
export class BreakpointService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly queries = new Map<string, Signal<boolean>>();

  /** True below the `md` breakpoint - the point where the sidebar becomes a drawer. */
  readonly isMobile = this.matches(`(max-width: ${BREAKPOINTS.md}px)`);
  readonly isTablet = this.matches(`(max-width: ${BREAKPOINTS.lg}px)`);
  readonly isDesktop = computed(() => !this.isTablet());

  /** Reactive `matchMedia`. Repeated queries share a single listener. */
  matches(query: string): Signal<boolean> {
    const existing = this.queries.get(query);
    if (existing) return existing;

    const list = window.matchMedia(query);
    const state = signal(list.matches);
    const onChange = (event: MediaQueryListEvent) => state.set(event.matches);

    list.addEventListener('change', onChange);
    this.destroyRef.onDestroy(() => list.removeEventListener('change', onChange));

    const readonlyState = state.asReadonly();
    this.queries.set(query, readonlyState);
    return readonlyState;
  }

  up(breakpoint: Breakpoint): Signal<boolean> {
    return this.matches(`(min-width: ${BREAKPOINTS[breakpoint]}px)`);
  }

  down(breakpoint: Breakpoint): Signal<boolean> {
    return this.matches(`(max-width: ${BREAKPOINTS[breakpoint] - 0.02}px)`);
  }
}
