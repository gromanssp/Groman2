import { booleanAttribute, Directive, ElementRef, inject, input } from '@angular/core';

/**
 * Material-style ripple on click, themed with `--accent-primary`.
 * Purely visual - it never touches component state, so it stays cheap in a
 * zoneless app.
 */
@Directive({
  selector: '[appRipple]',
  host: {
    '[style.position]': '"relative"',
    '[style.overflow]': '"hidden"',
    '(pointerdown)': 'spawn($event)'
  }
})
export class RippleDirective {
  readonly disabled = input(false, { alias: 'rippleDisabled', transform: booleanAttribute });
  readonly color = input('rgba(255, 255, 255, 0.35)', { alias: 'rippleColor' });

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected spawn(event: PointerEvent): void {
    if (this.disabled()) return;

    const element = this.host.nativeElement;
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;

    const ripple = document.createElement('span');
    ripple.className = 'app-ripple';
    ripple.style.cssText = `
      position:absolute;border-radius:50%;pointer-events:none;
      width:${size}px;height:${size}px;
      left:${event.clientX - rect.left - size / 2}px;
      top:${event.clientY - rect.top - size / 2}px;
      background:${this.color()};transform:scale(0);opacity:1;
      animation:app-ripple-in 550ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
    `;

    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    element.appendChild(ripple);
  }
}
