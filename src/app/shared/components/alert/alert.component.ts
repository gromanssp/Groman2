import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';

export type AlertVariant = 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  host: { role: 'alert' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent {
  readonly variant = input<AlertVariant>('info');
  readonly title = input('');
  readonly dismissible = input(false);
  readonly visible = model(true);
  readonly dismissed = output<void>();

  protected dismiss(): void {
    this.visible.set(false);
    this.dismissed.emit();
  }
}
