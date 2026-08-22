import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Label / hint / error chrome shared by every form control.
 * Use it directly when you need to wrap a control this library does not cover.
 */
@Component({
  selector: 'app-form-field',
  template: `
    <div class="form-field" [class.has-error]="!!error()">
      @if (label()) {
        <label class="form-label" [attr.for]="controlId()">
          {{ label() }}
          @if (required()) {
            <span class="required-mark" aria-hidden="true">*</span>
          }
        </label>
      }

      <ng-content />

      @if (error()) {
        <p class="form-text text-danger" role="alert">{{ error() }}</p>
      } @else if (hint()) {
        <p class="form-text">{{ hint() }}</p>
      }
    </div>
  `,
  styles: `
    :host { display: block; }
    .form-field { display: flex; flex-direction: column; gap: 0.4rem; }
    .required-mark { margin-left: 0.15rem; color: var(--danger); }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent {
  readonly label = input('');
  readonly hint = input('');
  readonly error = input('');
  readonly required = input(false);
  readonly controlId = input('');
}
