import { DestroyRef, Directive, ElementRef, inject, input, output } from '@angular/core';

/**
 * Emits when a click (or touch) lands outside the host element.
 *
 * Replaces the hand-rolled `@HostListener('document:click')` blocks that every
 * dropdown, menu and popover used to duplicate.
 *
 * ```html
 * <div (clickOutside)="open.set(false)"> ... </div>
 * ```
 */
@Directive({ selector: '[appClickOutside]' })
export class ClickOutsideDirective {
  /** Set to `false` to stop listening (e.g. while the panel is closed). */
  readonly clickOutsideEnabled = input(true, { alias: 'appClickOutside' });

  readonly clickOutside = output<Event>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    const onDocumentEvent = (event: Event) => {
      if (!this.clickOutsideEnabled()) return;

      const target = event.target as Node | null;
      if (target && !this.host.nativeElement.contains(target)) {
        this.clickOutside.emit(event);
      }
    };

    // `capture` so the handler still runs when inner handlers stop propagation.
    document.addEventListener('pointerdown', onDocumentEvent, true);
    inject(DestroyRef).onDestroy(() =>
      document.removeEventListener('pointerdown', onDocumentEvent, true)
    );
  }
}
