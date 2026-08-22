import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';

let nextId = 0;

@Component({
  selector: 'app-ui-checkbox',
  template: `
    <label class="form-check" [attr.for]="controlId">
      <input class="form-check-input" type="checkbox" [id]="controlId" [formField]="field()" />
      <span class="form-check-label"><ng-content>{{ label() }}</ng-content></span>
    </label>
    @if (errorMessage()) {
      <p class="form-text text-danger" role="alert">{{ errorMessage() }}</p>
    }
  `,
  styles: `:host { display: block; }`,
  imports: [FormField],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiCheckboxComponent {
  readonly field = input.required<FieldTree<boolean>>();
  readonly label = input('');

  protected readonly controlId = `ui-checkbox-${nextId++}`;

  protected readonly errorMessage = computed(() => {
    const state = this.field()();
    return state.touched() ? (state.errors()[0]?.message ?? '') : '';
  });
}
