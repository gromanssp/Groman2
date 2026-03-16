import { Component } from '@angular/core';

@Component({
  selector: 'app-datepicker-section',
  templateUrl: './datepicker-section.component.html',
  styleUrl: './datepicker-section.component.css'
})
export class DatepickerSectionComponent {
  minDate = new Date();
  maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  codes = {
    single: `<app-date-picker mode="single"></app-date-picker>`,
    range: `<app-date-picker mode="range"></app-date-picker>`,
    minmax: `<app-date-picker mode="minmax"\n  [minDate]="minDate"\n  [maxDate]="maxDate">\n</app-date-picker>`
  };
}
