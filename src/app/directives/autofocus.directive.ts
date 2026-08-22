import { afterNextRender, booleanAttribute, Directive, ElementRef, inject, input } from '@angular/core';

/**
 * Focuses the host once it is rendered - for modal, drawer and dialog contents,
 * which need the keyboard to land inside them, not behind them.
 */
@Directive({ selector: '[appAutofocus]' })
export class AutofocusDirective {
  readonly enabled = input(true, { alias: 'appAutofocus', transform: booleanAttribute });
  readonly focusDelay = input(0);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterNextRender(() => {
      if (!this.enabled()) return;

      const focus = () => this.host.nativeElement.focus({ preventScroll: true });
      const delay = this.focusDelay();
      delay > 0 ? setTimeout(focus, delay) : focus();
    });
  }
}
