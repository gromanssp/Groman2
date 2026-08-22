import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';
import { ToastService, ToastVariant } from '../../../../services/toast.service';

@Component({
  selector: 'app-toasts-section',
  templateUrl: './toasts-section.component.html',
  styleUrl: '../section-shared.css',
  imports: [CodeSnippetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastsSectionComponent {
  private readonly toasts = inject(ToastService);

  protected readonly codes = {
    service: `private readonly toasts = inject(ToastService);\n\nthis.toasts.success('Profile saved');\nthis.toasts.error('Upload failed', { message: 'The file was larger than 5 MB.' });\nthis.toasts.info('Sync in progress', { duration: 0 }); // sticky`,
    host: `<!-- Mount once per layout -->\n<app-toast-host />`
  };

  protected fire(variant: ToastVariant): void {
    const messages: Record<ToastVariant, [string, string]> = {
      success: ['Profile saved', 'Your changes are now live.'],
      error: ['Upload failed', 'The file was larger than 5 MB.'],
      warning: ['Storage almost full', 'You have used 92% of your quota.'],
      info: ['New release available', 'Version 0.3.0 is ready to install.']
    };
    const [title, message] = messages[variant];
    this.toasts.show(variant, title, { message });
  }

  protected fireSticky(): void {
    this.toasts.info('Sync in progress', { message: 'This one stays until dismissed.', duration: 0 });
  }

  protected clear(): void {
    this.toasts.clear();
  }
}
