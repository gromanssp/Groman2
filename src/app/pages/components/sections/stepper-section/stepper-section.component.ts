import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';
import { StepDirective } from '../../../../shared/components/stepper/step.directive';
import { StepperComponent } from '../../../../shared/components/stepper/stepper.component';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-stepper-section',
  templateUrl: './stepper-section.component.html',
  styleUrl: '../section-shared.css',
  imports: [StepperComponent, StepDirective, CodeSnippetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperSectionComponent {
  private readonly toasts = inject(ToastService);

  protected readonly projectName = signal('');
  protected readonly nameValid = computed(() => this.projectName().trim().length >= 3);

  protected readonly codes = {
    basic: `<app-stepper (completed)="submit()">\n  <ng-template appStep="Account" [stepValid]="nameValid()">…</ng-template>\n  <ng-template appStep="Details" stepDescription="Optional">…</ng-template>\n  <ng-template appStep="Review">…</ng-template>\n</app-stepper>`
  };

  protected onName(event: Event): void {
    this.projectName.set((event.target as HTMLInputElement).value);
  }

  protected finish(): void {
    this.toasts.success('Project created', { message: this.projectName() });
  }
}
