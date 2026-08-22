import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { UiVariant } from '../../ui.types';

export interface TimelineItem {
  title: string;
  description?: string;
  timestamp?: string;
  variant?: UiVariant;
  /** SVG path data, not markup. */
  icon?: string;
}

/**
 * Vertical activity feed - audit logs, order history, deployment trails.
 */
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent {
  readonly items = input<readonly TimelineItem[]>([]);
}
