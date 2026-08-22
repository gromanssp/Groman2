import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { UiSize, UiVariant } from '../../ui.types';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipComponent {
  readonly variant = input<UiVariant>('secondary');
  readonly size = input<UiSize>('md');
  readonly removable = input(false);
  readonly selected = input(false);
  readonly removed = output<void>();
}
