import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrl: './date-picker.component.css'
})
export class DatePickerComponent {
  @Input() mode: 'single' | 'range' | 'minmax' = 'single';
  @Input() value: Date | null = null;
  @Input() rangeStart: Date | null = null;
  @Input() rangeEnd: Date | null = null;
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  @Input() placeholder = 'Select date';

  @Output() dateChange = new EventEmitter<Date>();
  @Output() rangeChange = new EventEmitter<{ start: Date; end: Date }>();

  isOpen = false;
  currentMonth: number;
  currentYear: number;
  weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  private rangeSelecting: 'start' | 'end' = 'start';

  constructor(private elRef: ElementRef) {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: Event): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      const ref = this.value || this.rangeStart || new Date();
      this.currentMonth = ref.getMonth();
      this.currentYear = ref.getFullYear();
    }
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
  }

  get monthLabel(): string {
    const date = new Date(this.currentYear, this.currentMonth, 1);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  get calendarDays(): (Date | null)[] {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startDow = firstDay.getDay();
    const days: (Date | null)[] = [];

    for (let i = 0; i < startDow; i++) {
      days.push(null);
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(this.currentYear, this.currentMonth, d));
    }

    return days;
  }

  selectDay(day: Date | null): void {
    if (!day || this.isDisabled(day)) return;

    if (this.mode === 'single' || this.mode === 'minmax') {
      this.value = day;
      this.dateChange.emit(day);
      this.isOpen = false;
    } else if (this.mode === 'range') {
      if (this.rangeSelecting === 'start') {
        this.rangeStart = day;
        this.rangeEnd = null;
        this.rangeSelecting = 'end';
      } else {
        if (this.rangeStart && day < this.rangeStart) {
          this.rangeEnd = this.rangeStart;
          this.rangeStart = day;
        } else {
          this.rangeEnd = day;
        }
        this.rangeSelecting = 'start';
        if (this.rangeStart && this.rangeEnd) {
          this.rangeChange.emit({ start: this.rangeStart, end: this.rangeEnd });
          this.isOpen = false;
        }
      }
    }
  }

  isSelected(day: Date | null): boolean {
    if (!day) return false;
    if (this.mode === 'single' || this.mode === 'minmax') {
      return this.isSameDay(day, this.value);
    }
    return this.isSameDay(day, this.rangeStart) || this.isSameDay(day, this.rangeEnd);
  }

  isInRange(day: Date | null): boolean {
    if (!day || this.mode !== 'range' || !this.rangeStart || !this.rangeEnd) return false;
    return day > this.rangeStart && day < this.rangeEnd;
  }

  isRangeStart(day: Date | null): boolean {
    if (!day || this.mode !== 'range') return false;
    return this.isSameDay(day, this.rangeStart);
  }

  isRangeEnd(day: Date | null): boolean {
    if (!day || this.mode !== 'range') return false;
    return this.isSameDay(day, this.rangeEnd);
  }

  isDisabled(day: Date | null): boolean {
    if (!day) return true;
    if (this.minDate && day < this.stripTime(this.minDate)) return true;
    if (this.maxDate && day > this.stripTime(this.maxDate)) return true;
    return false;
  }

  isToday(day: Date | null): boolean {
    if (!day) return false;
    return this.isSameDay(day, new Date());
  }

  get displayValue(): string {
    if (this.mode === 'range') {
      if (this.rangeStart && this.rangeEnd) {
        return this.formatDate(this.rangeStart) + ' - ' + this.formatDate(this.rangeEnd);
      }
      if (this.rangeStart) {
        return this.formatDate(this.rangeStart) + ' - ...';
      }
      return '';
    }
    return this.value ? this.formatDate(this.value) : '';
  }

  private formatDate(date: Date): string {
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${m}-${d}`;
  }

  private isSameDay(a: Date | null, b: Date | null): boolean {
    if (!a || !b) return false;
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth() === b.getMonth() &&
           a.getDate() === b.getDate();
  }

  private stripTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}
