import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/components/modal/modal.component';

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
  styleUrl: './calendar.component.css',
  imports: [DatePipe, FormsModule, ModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  // Create event modal
  showCreateModal = false;
  newEventTitle = '';
  newEventColor = 'var(--accent-primary)';
  newEventDate = '';

  eventColors = [
    { name: 'Primary', value: 'var(--accent-primary)' },
    { name: 'Success', value: 'var(--success)' },
    { name: 'Warning', value: 'var(--warning)' },
    { name: 'Danger', value: 'var(--danger)' },
    { name: 'Info', value: 'var(--info)' },
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

  openCreateModal(): void {
    this.showCreateModal = true;
    if (this.selectedDate) {
      const y = this.selectedDate.getFullYear();
      const m = String(this.selectedDate.getMonth() + 1).padStart(2, '0');
      const d = String(this.selectedDate.getDate()).padStart(2, '0');
      this.newEventDate = `${y}-${m}-${d}`;
    } else {
      const today = new Date();
      const y = today.getFullYear();
      const m = String(today.getMonth() + 1).padStart(2, '0');
      const d = String(today.getDate()).padStart(2, '0');
      this.newEventDate = `${y}-${m}-${d}`;
    }
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
    this.newEventTitle = '';
    this.newEventColor = 'var(--accent-primary)';
    this.newEventDate = '';
  }

  createEvent(): void {
    if (!this.newEventTitle || !this.newEventDate) return;
    const parts = this.newEventDate.split('-');
    const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    this.events.push({
      title: this.newEventTitle,
      date,
      color: this.newEventColor,
    });
    this.generateCalendar();
    this.closeCreateModal();
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
