import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner-section',
  templateUrl: './spinner-section.component.html',
  styleUrl: './spinner-section.component.css'
})
export class SpinnerSectionComponent {
  codes = {
    circular: `<app-spinner variant="circular" size="sm"></app-spinner>\n<app-spinner variant="circular" size="md"></app-spinner>\n<app-spinner variant="circular" size="lg"></app-spinner>`,
    dots: `<app-spinner variant="dots" size="sm"></app-spinner>\n<app-spinner variant="dots" size="md"></app-spinner>\n<app-spinner variant="dots" size="lg"></app-spinner>`,
    pulse: `<app-spinner variant="pulse" size="sm"></app-spinner>\n<app-spinner variant="pulse" size="md"></app-spinner>\n<app-spinner variant="pulse" size="lg"></app-spinner>`,
    colors: `<app-spinner variant="circular" [color]="'var(--success)'"></app-spinner>\n<app-spinner variant="circular" [color]="'var(--danger)'"></app-spinner>\n<app-spinner variant="circular" [color]="'var(--warning)'"></app-spinner>\n<app-spinner variant="dots" [color]="'var(--info)'"></app-spinner>\n<app-spinner variant="pulse" [color]="'var(--success)'"></app-spinner>`
  };
}
