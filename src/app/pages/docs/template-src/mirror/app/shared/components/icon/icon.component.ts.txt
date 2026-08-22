import { ChangeDetectionStrategy, Component, input, numberAttribute } from '@angular/core';

/**
 * Renders an outline icon from its SVG path data.
 *
 * Icons are passed as path `d` strings rather than full markup, because
 * Angular's HTML sanitizer strips `<svg>` out of `[innerHTML]` bindings - the
 * icon silently disappears. Binding `[attr.d]` keeps the markup in the template
 * where the compiler can see it.
 *
 * ```html
 * <app-icon [path]="ICONS.users" [size]="20" />
 * ```
 */
@Component({
  selector: 'app-icon',
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true">
      @for (segment of paths(); track segment) {
        <path [attr.d]="segment" />
      }
    </svg>
  `,
  styles: `
    :host { display: inline-flex; }
    svg { display: block; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  /** One path, or several for multi-stroke icons. */
  readonly path = input.required<string | readonly string[]>();
  readonly size = input(20, { transform: numberAttribute });
  readonly strokeWidth = input(2, { transform: numberAttribute });

  protected paths(): readonly string[] {
    const value = this.path();
    return typeof value === 'string' ? [value] : value;
  }
}
