import { Component } from '@angular/core';

@Component({
  selector: 'app-buttons-section',
  templateUrl: './buttons-section.component.html',
  styleUrl: './buttons-section.component.css'
})
export class ButtonsSectionComponent {
  isLoading = false;

  codes = {
    solid: `<button class="btn btn-primary">Primary</button>\n<button class="btn btn-secondary">Secondary</button>\n<button class="btn btn-success">Success</button>\n<button class="btn btn-danger">Danger</button>`,
    outline: `<button class="btn btn-outline-primary">Outline Primary</button>\n<button class="btn btn-outline-secondary">Outline Secondary</button>`,
    ghost: `<button class="btn btn-ghost">Ghost</button>\n<button class="btn btn-gradient">Gradient</button>\n<button class="btn btn-gradient-glow">Gradient Glow</button>`,
    sizes: `<button class="btn btn-primary btn-sm">Small</button>\n<button class="btn btn-primary">Default</button>\n<button class="btn btn-primary btn-lg">Large</button>`,
    disabled: `<button class="btn btn-primary" disabled>Disabled</button>`,
    loading: `<button class="btn btn-primary" [disabled]="isLoading"\n  (click)="simulateLoading()">\n  {{ isLoading ? 'Loading...' : 'Click to Load' }}\n</button>`
  };

  simulateLoading(): void {
    this.isLoading = true;
    setTimeout(() => this.isLoading = false, 2000);
  }
}
