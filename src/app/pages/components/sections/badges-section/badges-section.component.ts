import { Component } from '@angular/core';

@Component({
  selector: 'app-badges-section',
  templateUrl: './badges-section.component.html',
  styleUrl: './badges-section.component.css'
})
export class BadgesSectionComponent {
  counter = 3;

  codes = {
    variants: `<app-badge variant="primary">Primary</app-badge>\n<app-badge variant="success">Success</app-badge>\n<app-badge variant="warning">Warning</app-badge>\n<app-badge variant="danger">Danger</app-badge>\n<app-badge variant="secondary">Secondary</app-badge>\n<app-badge variant="outline">Outline</app-badge>`,
    sizes: `<app-badge variant="primary" size="sm">Small</app-badge>\n<app-badge variant="primary" size="md">Medium</app-badge>\n<app-badge variant="primary" size="lg">Large</app-badge>`,
    withButtons: `<button class="btn btn-primary">\n  Notifications <app-badge variant="danger" size="sm">4</app-badge>\n</button>`,
    counter: `<app-badge [variant]="counter > 5 ? 'danger' : 'success'"\n  size="lg">{{ counter }}</app-badge>`,
    status: `<app-badge variant="success" size="sm">Active</app-badge>\n<span>Server is running</span>`
  };

  increment(): void {
    this.counter++;
  }

  decrement(): void {
    if (this.counter > 0) this.counter--;
  }
}
