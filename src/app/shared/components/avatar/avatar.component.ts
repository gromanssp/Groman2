import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { UI_SIZE_PX, UiSize } from '../../ui.types';

export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away' | null;

/**
 * Image avatar with an initials fallback - no external avatar service, and no
 * broken image when `src` fails.
 */
@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  readonly name = input('');
  readonly src = input('');
  readonly size = input<UiSize | number>('md');
  readonly status = input<AvatarStatus>(null);
  readonly square = input(false);

  protected readonly imageFailed = signal(false);

  protected readonly pixels = computed(() => {
    const size = this.size();
    return typeof size === 'number' ? size : UI_SIZE_PX[size];
  });

  protected readonly showImage = computed(() => !!this.src() && !this.imageFailed());

  protected readonly initials = computed(() =>
    this.name()
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0]!.toUpperCase())
      .join('') || '?'
  );

  /** Deterministic hue from the name, so each person keeps the same color. */
  protected readonly hue = computed(() => {
    const name = this.name();
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = (hash << 5) - hash + name.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % 360;
  });
}
