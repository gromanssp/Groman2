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
import { StepDirective } from './step.directive';

/**
 * Multi-step flow with progress header and next/back controls.
 *
 * ```html
 * <app-stepper (completed)="submit()">
 *   <ng-template appStep="Account" [stepValid]="form.valid()"> ... </ng-template>
 * </app-stepper>
 * ```
 */
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent {
  readonly steps = contentChildren(StepDirective);

  readonly activeIndex = model(0);
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly linear = input(true);
  readonly nextLabel = input('Next');
  readonly backLabel = input('Back');
  readonly finishLabel = input('Finish');

  readonly completed = output<void>();
  readonly stepChange = output<number>();

  protected readonly activeStep = computed(() => this.steps()[this.activeIndex()]);
  protected readonly isFirst = computed(() => this.activeIndex() === 0);
  protected readonly isLast = computed(() => this.activeIndex() === this.steps().length - 1);
  protected readonly canAdvance = computed(() => this.activeStep()?.valid() ?? true);
  protected readonly progress = computed(() => {
    const total = this.steps().length;
    return total <= 1 ? 100 : (this.activeIndex() / (total - 1)) * 100;
  });

  next(): void {
    if (!this.canAdvance()) return;
    if (this.isLast()) {
      this.completed.emit();
      return;
    }
    this.goTo(this.activeIndex() + 1);
  }

  back(): void {
    this.goTo(this.activeIndex() - 1);
  }

  goTo(index: number): void {
    const clamped = Math.min(this.steps().length - 1, Math.max(0, index));
    if (clamped === this.activeIndex()) return;
    // In linear mode you can always go back, but only forward one step at a time.
    if (this.linear() && clamped > this.activeIndex() + 1) return;
    this.activeIndex.set(clamped);
    this.stepChange.emit(clamped);
  }
}
