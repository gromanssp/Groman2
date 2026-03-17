import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrl: './progress-bar.component.css',
    imports: [NgClass]
})
export class ProgressBarComponent {
  @Input() value = 0;
  @Input() variant: 'primary' | 'success' | 'warning' | 'danger' = 'primary';
  @Input() striped = false;
  @Input() animated = false;
  @Input() height = 8;
  @Input() label = '';
}
