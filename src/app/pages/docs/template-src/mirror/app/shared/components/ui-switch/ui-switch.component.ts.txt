import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';

let nextId = 0;

/**
 * Toggle switch. Works standalone with `[(checked)]` - handy for settings that
 * live in a service rather than a form.
 */
@Component({
  selector: 'app-ui-switch',
  templateUrl: './ui-switch.component.html',
  styleUrl: './ui-switch.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiSwitchComponent {
  readonly checked = model(false);
  readonly label = input('');
  readonly description = input('');
  readonly disabled = input(false);
  readonly changed = output<boolean>();

  protected readonly controlId = `ui-switch-${nextId++}`;

  protected toggle(): void {
    if (this.disabled()) return;
    const next = !this.checked();
    this.checked.set(next);
    this.changed.emit(next);
  }
}
