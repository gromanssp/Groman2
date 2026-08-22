import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastComponent } from './toast.component';
import { ToastService } from '../../../services/toast.service';

/**
 * Renders the `ToastService` queue. Mount once per layout.
 */
@Component({
  selector: 'app-toast-host',
  template: `
    <div class="toast-host" aria-live="polite" aria-relevant="additions">
      @for (toast of toasts(); track toast.id) {
        <app-toast [toast]="toast" (dismissed)="dismiss($event)" />
      }
    </div>
  `,
  styles: `
    .toast-host {
      position: fixed;
      top: 1.25rem;
      right: 1.25rem;
      z-index: var(--z-toast);
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      pointer-events: none;
    }
    .toast-host > * { pointer-events: auto; }

    @media (max-width: 576px) {
      .toast-host { left: 1rem; right: 1rem; }
    }
  `,
  imports: [ToastComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastHostComponent {
  private readonly service = inject(ToastService);
  protected readonly toasts = this.service.toasts;

  protected dismiss(id: string): void {
    this.service.dismiss(id);
  }
}
