import { Directive, inject, input, TemplateRef } from '@angular/core';

/**
 * One step of an `<app-stepper>`.
 */
@Directive({ selector: '[appStep]' })
export class StepDirective {
  readonly label = input.required<string>({ alias: 'appStep' });
  readonly description = input('', { alias: 'stepDescription' });
  /** Return false to block moving forward from this step. */
  readonly valid = input(true, { alias: 'stepValid' });

  readonly template = inject<TemplateRef<unknown>>(TemplateRef);
}
