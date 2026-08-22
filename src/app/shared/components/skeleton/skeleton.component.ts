import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';

export type SkeletonShape = 'text' | 'circle' | 'block';

/**
 * Standalone placeholder. Use `[appSkeleton]` instead when you want to keep the
 * real content in the DOM and just mask it while loading.
 */
@Component({
  selector: 'app-skeleton',
  template: `
    @for (line of lineArray(); track $index) {
      <span
        class="skeleton shape-{{ shape() }}"
        [style.width]="$last ? lastLineWidth() : width()"
        [style.height]="height()"></span>
    }
  `,
  styles: `
    :host { display: flex; flex-direction: column; gap: 0.5rem; }

    .skeleton {
      display: block;
      background: linear-gradient(
        90deg,
        rgba(var(--overlay-rgb), 0.06) 25%,
        rgba(var(--overlay-rgb), 0.12) 37%,
        rgba(var(--overlay-rgb), 0.06) 63%
      );
      background-size: 400% 100%;
      animation: app-skeleton-shimmer 1.4s ease infinite;
    }

    .shape-text { border-radius: var(--radius-sm); }
    .shape-block { border-radius: var(--radius-md); }
    .shape-circle { border-radius: var(--radius-round); aspect-ratio: 1; }

    @media (prefers-reduced-motion: reduce) {
      .skeleton { animation: none; }
    }
  `,
  host: { 'aria-hidden': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonComponent {
  readonly shape = input<SkeletonShape>('text');
  readonly width = input('100%');
  readonly height = input('1rem');
  readonly lines = input(1, { transform: numberAttribute });
  /** Last line is shortened so a text block reads like a paragraph. */
  readonly lastLineWidth = input('70%');

  protected readonly lineArray = computed(() => Array.from({ length: Math.max(1, this.lines()) }));
}
