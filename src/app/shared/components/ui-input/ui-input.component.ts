import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { FormFieldComponent } from '../form-field/form-field.component';

let nextId = 0;

/**
 * Text-like input bound to a Signal Forms field.
 *
 * ```html
 * <app-ui-input label="Email" type="email" [field]="loginForm.email" />
 * ```
 */
@Component({
  selector: 'app-ui-input',
  templateUrl: './ui-input.component.html',
  styleUrl: './ui-input.component.css',
  imports: [FormField, FormFieldComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiInputComponent {
  readonly field = input.required<FieldTree<string>>();
  readonly label = input('');
  readonly hint = input('');
  readonly placeholder = input('');
  readonly type = input<'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'date'>('text');
  readonly autocomplete = input('');
  /** Only drives the asterisk; the real rule lives in the form schema. */
  readonly required = input(false);

  protected readonly controlId = `ui-input-${nextId++}`;

  /** Surface an error only after the user has interacted with the control. */
  protected readonly errorMessage = computed(() => {
    const state = this.field()();
    return state.touched() ? (state.errors()[0]?.message ?? '') : '';
  });
}
