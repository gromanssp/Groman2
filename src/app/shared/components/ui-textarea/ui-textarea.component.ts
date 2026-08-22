import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { FormFieldComponent } from '../form-field/form-field.component';

let nextId = 0;

@Component({
  selector: 'app-ui-textarea',
  template: `
    <app-form-field [label]="label()" [hint]="hint()" [error]="errorMessage()" [controlId]="controlId" [required]="required()">
      <textarea
        class="form-control"
        [id]="controlId"
        [rows]="rows()"
        [placeholder]="placeholder()"
        [class.is-invalid]="!!errorMessage()"
        [formField]="field()"></textarea>
    </app-form-field>
  `,
  styles: `
    :host { display: block; }
    textarea { resize: vertical; min-height: 90px; font-family: var(--font-family); }
  `,
  imports: [FormField, FormFieldComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTextareaComponent {
  readonly field = input.required<FieldTree<string>>();
  readonly label = input('');
  readonly hint = input('');
  readonly placeholder = input('');
  readonly rows = input(4, { transform: numberAttribute });
  readonly required = input(false);

  protected readonly controlId = `ui-textarea-${nextId++}`;

  protected readonly errorMessage = computed(() => {
    const state = this.field()();
    return state.touched() ? (state.errors()[0]?.message ?? '') : '';
  });
}
