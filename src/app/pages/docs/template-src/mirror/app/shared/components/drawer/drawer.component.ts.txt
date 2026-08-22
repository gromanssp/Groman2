import { ChangeDetectionStrategy, Component, effect, input, model, output } from '@angular/core';
import { AutofocusDirective } from '../../../directives/autofocus.directive';

export type DrawerSide = 'left' | 'right';

/**
 * Off-canvas panel for filters, details and secondary navigation.
 */
@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
  imports: [AutofocusDirective],
  host: { '(document:keydown.escape)': 'onEscape()' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerComponent {
  readonly open = model(false);
  readonly title = input('');
  readonly side = input<DrawerSide>('right');
  readonly width = input('380px');
  readonly closed = output<void>();

  constructor() {
    effect(() => {
      document.body.style.overflow = this.open() ? 'hidden' : '';
    });
  }

  close(): void {
    this.open.set(false);
    this.closed.emit();
  }

  protected onEscape(): void {
    if (this.open()) this.close();
  }
}
