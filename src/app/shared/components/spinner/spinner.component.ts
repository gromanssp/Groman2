import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.css',
    imports: [NgClass]
})
export class SpinnerComponent {
  @Input() variant: 'circular' | 'dots' | 'pulse' = 'circular';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() color: string = 'var(--accent-primary)';

  get sizeInPx(): number {
    const sizes = { sm: 20, md: 36, lg: 56 };
    return sizes[this.size];
  }
}
