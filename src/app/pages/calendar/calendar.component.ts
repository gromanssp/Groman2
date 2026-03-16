import { Component, OnInit } from '@angular/core';

interface CalendarEvent {
  title: string;
  date: Date;
  color: string;
}

interface CalendarDay {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  events: CalendarEvent[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  selectedDate: Date | null = null;
  weeks: CalendarDay[][] = [];
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  events: CalendarEvent[] = [
    { title: 'Team Standup', date: new Date(2026, 2, 2), color: 'var(--accent-primary)' },
    { title: 'Sprint Review', date: new Date(2026, 2, 6), color: 'var(--success)' },
    { title: 'Product Launch', date: new Date(2026, 2, 14), color: 'var(--danger)' },
    { title: 'Design Workshop', date: new Date(2026, 2, 14), color: 'var(--accent-secondary)' },
    { title: 'Client Meeting', date: new Date(2026, 2, 18), color: 'var(--warning)' },
    { title: 'Code Freeze', date: new Date(2026, 2, 20), color: 'var(--danger)' },
    { title: 'Team Lunch', date: new Date(2026, 2, 25), color: 'var(--success)' },
    { title: 'Quarterly Review', date: new Date(2026, 2, 28), color: 'var(--accent-primary)' },
  ];

  get monthYear(): string {
    return this.currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  get selectedDateEvents(): CalendarEvent[] {
    if (!this.selectedDate) return [];
    return this.events.filter(e =>
      e.date.getDate() === this.selectedDate!.getDate() &&
      e.date.getMonth() === this.selectedDate!.getMonth() &&
      e.date.getFullYear() === this.selectedDate!.getFullYear()
    );
  }

  ngOnInit(): void {
    this.generateCalendar();
  }

  prevMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  selectDay(day: CalendarDay): void {
    if (!day.isCurrentMonth) return;
    this.selectedDate = new Date(day.year, day.month, day.date);
    this.generateCalendar();
  }

  private generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const today = new Date();

    const days: CalendarDay[] = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      days.push(this.createDay(d, month - 1, year, false, today));
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(this.createDay(d, month, year, true, today));
    }

    // Next month days
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      days.push(this.createDay(d, month + 1, year, false, today));
    }

    // Split into weeks
    this.weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      this.weeks.push(days.slice(i, i + 7));
    }
  }

  private createDay(date: number, month: number, year: number, isCurrentMonth: boolean, today: Date): CalendarDay {
    const isToday = isCurrentMonth &&
      date === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    const isSelected = this.selectedDate !== null &&
      isCurrentMonth &&
      date === this.selectedDate.getDate() &&
      month === this.selectedDate.getMonth() &&
      year === this.selectedDate.getFullYear();

    const dayEvents = isCurrentMonth ? this.events.filter(e =>
      e.date.getDate() === date &&
      e.date.getMonth() === month &&
      e.date.getFullYear() === year
    ) : [];

    return { date, month, year, isCurrentMonth, isToday, isSelected, events: dayEvents };
  }
}
