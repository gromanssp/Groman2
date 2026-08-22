import { Directive, inject, input, TemplateRef } from '@angular/core';

export interface CellContext<T = Record<string, unknown>> {
  $implicit: unknown;
  row: T;
  index: number;
}

/**
 * Registers a custom renderer for one `app-data-table` column.
 *
 * ```html
 * <app-data-table [columns]="columns" [rows]="rows">
 *   <ng-template appCellTemplate="status" let-value let-row="row">
 *     <app-badge [variant]="value === 'active' ? 'success' : 'secondary'">{{ value }}</app-badge>
 *   </ng-template>
 * </app-data-table>
 * ```
 */
@Directive({ selector: '[appCellTemplate]' })
export class CellTemplateDirective {
  /** Key of the column this template renders. */
  readonly column = input.required<string>({ alias: 'appCellTemplate' });

  readonly template = inject<TemplateRef<CellContext>>(TemplateRef);

  static ngTemplateContextGuard(_dir: CellTemplateDirective, _ctx: unknown): _ctx is CellContext {
    return true;
  }
}
