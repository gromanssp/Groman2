import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { FormFieldComponent } from '../form-field/form-field.component';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

let nextId = 0;

@Component({
  selector: 'app-ui-select',
  template: `
    <app-form-field [label]="label()" [hint]="hint()" [error]="errorMessage()" [controlId]="controlId" [required]="required()">
      <div class="select-wrapper">
        <select class="form-control" [id]="controlId" [class.is-invalid]="!!errorMessage()" [formField]="field()">
          @if (placeholder()) {
            <option value="">{{ placeholder() }}</option>
          }
          @for (option of options(); track option.value) {
            <option [value]="option.value" [disabled]="option.disabled ?? false">{{ option.label }}</option>
          }
        </select>
        <svg class="select-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </app-form-field>
  `,
  styles: `
    :host { display: block; }
    .select-wrapper { position: relative; }
    select { appearance: none; padding-right: 2.25rem; cursor: pointer; }
    select option { background: var(--bg-elevated); color: var(--text-primary); }
    .select-arrow {
      position: absolute;
      right: 0.85rem;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      color: var(--text-muted);
      pointer-events: none;
    }
  `,
  imports: [FormField, FormFieldComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiSelectComponent {
  readonly field = input.required<FieldTree<string>>();
  readonly options = input<readonly SelectOption[]>([]);
  readonly label = input('');
  readonly hint = input('');
  readonly placeholder = input('');
  readonly required = input(false);

  protected readonly controlId = `ui-select-${nextId++}`;

  protected readonly errorMessage = computed(() => {
    const state = this.field()();
    return state.touched() ? (state.errors()[0]?.message ?? '') : '';
  });
}
