import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { email, form, minLength, required, submit, validate } from '@angular/forms/signals';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';
import { FileUploadComponent } from '../../../../shared/components/file-upload/file-upload.component';
import { UiCheckboxComponent } from '../../../../shared/components/ui-checkbox/ui-checkbox.component';
import { UiInputComponent } from '../../../../shared/components/ui-input/ui-input.component';
import { UiSelectComponent } from '../../../../shared/components/ui-select/ui-select.component';
import { UiSwitchComponent } from '../../../../shared/components/ui-switch/ui-switch.component';
import { UiTextareaComponent } from '../../../../shared/components/ui-textarea/ui-textarea.component';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-forms-section',
  templateUrl: './forms-section.component.html',
  styleUrl: './forms-section.component.css',
  imports: [
    UiInputComponent,
    UiSelectComponent,
    UiTextareaComponent,
    UiCheckboxComponent,
    UiSwitchComponent,
    FileUploadComponent,
    CodeSnippetComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsSectionComponent {
  private readonly toasts = inject(ToastService);

  protected readonly model = signal({
    name: '',
    email: '',
    role: '',
    bio: '',
    newsletter: false
  });

  protected readonly demoForm = form(this.model, path => {
    required(path.name, { message: 'Name is required' });
    minLength(path.name, 2, { message: 'At least 2 characters' });
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Enter a valid email address' });
    required(path.role, { message: 'Pick a role' });
    validate(path.bio, ({ value }) =>
      value().length > 200 ? { kind: 'tooLong', message: 'Keep it under 200 characters' } : undefined
    );
  });

  protected readonly roles = [
    { value: 'admin', label: 'Administrator' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' }
  ];

  protected readonly notifications = signal(true);
  protected readonly files = signal<readonly File[]>([]);

  protected readonly codes = {
    model: `protected readonly model = signal({\n  name: '',\n  email: '',\n  role: '',\n  newsletter: false\n});\n\nprotected readonly demoForm = form(this.model, path => {\n  required(path.name, { message: 'Name is required' });\n  email(path.email, { message: 'Enter a valid email address' });\n  required(path.role, { message: 'Pick a role' });\n});`,
    template: `<app-ui-input label="Name" [required]="true" [field]="demoForm.name" />\n<app-ui-select label="Role" [options]="roles" [field]="demoForm.role" />\n<app-ui-textarea label="Bio" [field]="demoForm.bio" />\n<app-ui-checkbox label="Subscribe" [field]="demoForm.newsletter" />\n\n<button [disabled]="demoForm().invalid()">Save</button>`,
    submitCode: `protected onSubmit(): void {\n  submit(this.demoForm, async () => {\n    await this.api.save(this.model());\n  });\n}`,
    switchCode: `<!-- Standalone toggle, no form needed -->\n<app-ui-switch label="Email notifications" [(checked)]="notifications" />`,
    upload: `<app-file-upload\n  accept="image/*"\n  [maxSizeMb]="5"\n  [(files)]="files"\n  (rejected)="toasts.warning($event)" />`,
    raw: `<!-- The raw utility classes are still available -->\n<div class="form-group">\n  <label class="form-label">Label</label>\n  <input class="form-control is-invalid" />\n  <p class="form-text text-danger">Error message</p>\n</div>`
  };

  protected onSubmit(): void {
    submit(this.demoForm, async () => {
      this.toasts.success('Form submitted', { message: JSON.stringify(this.model()) });
    });
  }

  protected onRejected(message: string): void {
    this.toasts.warning('File rejected', { message });
  }
}
