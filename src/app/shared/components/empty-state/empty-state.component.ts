import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Shown when a list, table or search has nothing to display. Project an action
 * with `<button empty-action>` to give the user a way forward.
 */
@Component({
  selector: 'app-empty-state',
  template: `
    <div class="empty-state">
      <div class="empty-icon" aria-hidden="true">
        <ng-content select="[empty-icon]">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </ng-content>
      </div>
      <h3 class="empty-title">{{ title() }}</h3>
      @if (description()) {
        <p class="empty-description">{{ description() }}</p>
      }
      <div class="empty-actions"><ng-content select="[empty-action]" /></div>
    </div>
  `,
  styles: `
    :host { display: block; }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 3rem 1.5rem;
    }

    .empty-icon {
      display: flex;
      width: 56px;
      height: 56px;
      margin-bottom: 1rem;
      color: var(--text-muted);
      opacity: 0.7;
    }
    .empty-icon svg { width: 100%; height: 100%; }

    .empty-title { font-size: 1.05rem; font-weight: 600; color: var(--text-primary); }
    .empty-description { margin-top: 0.35rem; max-width: 42ch; font-size: 0.9rem; color: var(--text-secondary); }
    .empty-actions:not(:empty) { margin-top: 1.25rem; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyStateComponent {
  readonly title = input('Nothing here yet');
  readonly description = input('');
}
