import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';

export type DropdownAlign = 'start' | 'end';

/**
 * Generic anchored panel: project the trigger with `[dropdown-trigger]` and the
 * panel contents as default content.
 *
 * ```html
 * <app-dropdown>
 *   <button dropdown-trigger class="btn">Actions</button>
 *   <a class="dropdown-item" routerLink="/profile">Profile</a>
 * </app-dropdown>
 * ```
 */
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  imports: [ClickOutsideDirective],
  host: { '(keydown.escape)': 'close()' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent {
  readonly open = model(false);
  readonly align = input<DropdownAlign>('end');
  readonly panelWidth = input('auto');
  /** Close as soon as something inside the panel is clicked. */
  readonly closeOnSelect = input(true);

  toggle(): void {
    this.open.update(value => !value);
  }

  close(): void {
    this.open.set(false);
  }

  protected onPanelClick(): void {
    if (this.closeOnSelect()) this.close();
  }
}
