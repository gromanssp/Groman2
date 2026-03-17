import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-stat-card',
    templateUrl: './stat-card.component.html',
    styleUrls: ['./stat-card.component.css'],
    imports: [NgClass]
})
export class StatCardComponent {
  @Input() title: string = 'Statistic';
  @Input() value: string | number = '0';
  @Input() icon: string = '';
  @Input() trend: number = 0;
  @Input() accent: 'primary' | 'secondary' | 'success' | 'warning' = 'primary';
}
