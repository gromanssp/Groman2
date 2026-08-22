import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';

export interface LetContext<T> {
  $implicit: T;
  appLet: T;
}

/**
 * Aliases an expression inside a template without an artificial `@if`.
 *
 * ```html
 * <ng-container *appLet="filteredRows() as rows">
 *   {{ rows.length }} results
 * </ng-container>
 * ```
 *
 * Unlike `@if`, falsy values (0, '', false) still render.
 */
@Directive({ selector: '[appLet]' })
export class LetDirective<T> {
  readonly appLet = input.required<T>();

  private readonly context: LetContext<T> = { $implicit: undefined!, appLet: undefined! };

  constructor() {
    const view = inject(ViewContainerRef);
    const template = inject<TemplateRef<LetContext<T>>>(TemplateRef);
    view.createEmbeddedView(template, this.context);

    effect(() => {
      const value = this.appLet();
      this.context.$implicit = value;
      this.context.appLet = value;
    });
  }

  static ngTemplateContextGuard<T>(_dir: LetDirective<T>, _ctx: unknown): _ctx is LetContext<T> {
    return true;
  }
}
