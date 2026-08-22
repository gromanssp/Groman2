import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
  model,
  output
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { TabDirective } from './tab.directive';

/**
 * Accessible tab set with full keyboard support (arrows, Home, End) following
 * the WAI-ARIA tabs pattern.
 */
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
  imports: [NgTemplateOutlet, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent {
  readonly tabs = contentChildren(TabDirective);

  readonly selectedIndex = model(0);
  readonly variant = input<'line' | 'pill'>('line');
  readonly selectedChange = output<number>();

  protected readonly activeTab = computed(() => this.tabs()[this.selectedIndex()] ?? this.tabs()[0]);

  protected select(index: number): void {
    if (this.tabs()[index]?.disabled()) return;
    this.selectedIndex.set(index);
    this.selectedChange.emit(index);
  }

  protected onKeydown(event: KeyboardEvent, index: number): void {
    const total = this.tabs().length;
    if (total === 0) return;

    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: total - 1
    };

    const target = moves[event.key];
    if (target === undefined) return;

    event.preventDefault();
    const next = (target + total) % total;
    this.select(next);
    (event.currentTarget as HTMLElement)
      .parentElement?.querySelectorAll<HTMLElement>('[role="tab"]')[next]
      ?.focus();
  }
}
