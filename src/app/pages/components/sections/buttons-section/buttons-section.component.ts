import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';

@Component({
    selector: 'app-buttons-section',
    templateUrl: './buttons-section.component.html',
    styleUrl: './buttons-section.component.css',
    imports: [CodeSnippetComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsSectionComponent {
  protected readonly isLoading = signal(false);

  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.timer && clearTimeout(this.timer));
  }

  codes = {
    solid: `<button class="btn btn-primary">Primary</button>\n<button class="btn btn-secondary">Secondary</button>\n<button class="btn btn-success">Success</button>\n<button class="btn btn-danger">Danger</button>`,
    outline: `<button class="btn btn-outline-primary">Outline Primary</button>\n<button class="btn btn-outline-secondary">Outline Secondary</button>`,
    ghost: `<button class="btn btn-ghost">Ghost</button>\n<button class="btn btn-gradient">Gradient</button>\n<button class="btn btn-gradient-glow">Gradient Glow</button>`,
    sizes: `<button class="btn btn-primary btn-sm">Small</button>\n<button class="btn btn-primary">Default</button>\n<button class="btn btn-primary btn-lg">Large</button>`,
    disabled: `<button class="btn btn-primary" disabled>Disabled</button>`,
    loading: `<button class="btn btn-primary" [disabled]="isLoading"\n  (click)="simulateLoading()">\n  {{ isLoading ? 'Loading...' : 'Click to Load' }}\n</button>`
  };

  simulateLoading(): void {
    this.isLoading.set(true);
    this.timer = setTimeout(() => this.isLoading.set(false), 2000);
  }
}
