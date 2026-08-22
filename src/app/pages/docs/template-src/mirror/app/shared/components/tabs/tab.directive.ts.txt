import { Directive, inject, input, TemplateRef } from '@angular/core';

/**
 * One panel inside `<app-tabs>`. The content is a template, so inactive tabs
 * cost nothing until they are selected.
 *
 * ```html
 * <app-tabs>
 *   <ng-template appTab="Overview"> ... </ng-template>
 * </app-tabs>
 * ```
 */
@Directive({ selector: '[appTab]' })
export class TabDirective {
  readonly label = input.required<string>({ alias: 'appTab' });
  readonly disabled = input(false, { alias: 'tabDisabled' });
  /** SVG path data, not markup - see `app-icon`. */
  readonly icon = input('', { alias: 'tabIcon' });

  readonly template = inject<TemplateRef<unknown>>(TemplateRef);
}
