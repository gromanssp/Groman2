import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { email, form, required, submit } from '@angular/forms/signals';
import { StepDirective } from '../../shared/components/stepper/step.directive';
import { StepperComponent } from '../../shared/components/stepper/stepper.component';
import { UiInputComponent } from '../../shared/components/ui-input/ui-input.component';
import { UiSelectComponent } from '../../shared/components/ui-select/ui-select.component';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css'],
  imports: [StepperComponent, StepDirective, UiInputComponent, UiSelectComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardComponent {
  private readonly toasts = inject(ToastService);

  protected readonly model = signal({
    fullName: '',
    email: '',
    theme: 'system',
    notifications: 'important'
  });

  protected readonly setupForm = form(this.model, path => {
    required(path.fullName, { message: 'Full name is required' });
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Enter a valid email address' });
  });

  protected readonly themeOptions = [
    { value: 'system', label: 'System default' },
    { value: 'dark', label: 'Dark mode' },
    { value: 'light', label: 'Light mode' }
  ];

  protected readonly notificationOptions = [
    { value: 'all', label: 'All alerts' },
    { value: 'important', label: 'Important only' },
    { value: 'none', label: 'Disabled' }
  ];

  /** The stepper blocks Continue until the account step is filled in. */
  protected readonly accountValid = computed(
    () => this.setupForm.fullName().valid() && this.setupForm.email().valid()
  );

  protected readonly summary = computed(() => {
    const data = this.model();
    return [
      { label: 'Name', value: data.fullName || '—' },
      { label: 'Email', value: data.email || '—' },
      { label: 'Theme', value: this.labelOf(this.themeOptions, data.theme) },
      { label: 'Notifications', value: this.labelOf(this.notificationOptions, data.notifications) }
    ];
  });

  protected complete(): void {
    submit(this.setupForm, async () => {
      this.toasts.success('Setup complete', { message: `Welcome aboard, ${this.model().fullName}` });
    });
  }

  private labelOf(options: { value: string; label: string }[], value: string): string {
    return options.find(option => option.value === value)?.label ?? value;
  }
}
