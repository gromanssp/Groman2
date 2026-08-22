import { DestroyRef, Directive, ElementRef, inject, input, output } from '@angular/core';

/**
 * Defers an image request until the element scrolls near the viewport.
 *
 * ```html
 * <img [appLazyImg]="product.image" alt="..." />
 * ```
 */
@Directive({
  selector: 'img[appLazyImg]',
  host: { '[attr.loading]': '"lazy"', '[attr.decoding]': '"async"' }
})
export class LazyImgDirective {
  readonly src = input.required<string>({ alias: 'appLazyImg' });
  /** Distance from the viewport at which loading starts. */
  readonly rootMargin = input('200px');

  readonly loaded = output<void>();

  private readonly host = inject<ElementRef<HTMLImageElement>>(ElementRef);

  constructor() {
    const element = this.host.nativeElement;
    element.addEventListener('load', () => this.loaded.emit(), { once: true });

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          element.src = this.src();
          observer.disconnect();
        }
      },
      { rootMargin: this.rootMargin() }
    );

    observer.observe(element);
    inject(DestroyRef).onDestroy(() => observer.disconnect());
  }
}
