import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  template: `
    <div class="calendar-container" *ngIf="isVisible">
      <div class="calendar-header">
        <button mat-icon-button (click)="previousMonth()">
          <mat-icon>chevron_left</mat-icon>
        </button>
        <span>{{ currentDate | date:'MMMM yyyy' }}</span>
        <button mat-icon-button (click)="nextMonth()">
          <mat-icon>chevron_right</mat-icon>
        </button>
      </div>
      
      <div class="calendar-weekdays">
        <div *ngFor="let day of weekDays">{{ day }}</div>
      </div>
      
      <div class="calendar-days">
        <div 
          *ngFor="let day of calendarDays" 
          [class.current-month]="day.currentMonth"
          [class.selected]="isSelected(day.date)"
          (click)="selectDate(day.date)">
          {{ day.date | date:'d' }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .calendar-container {
      background: white;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      padding: 16px;
      position: absolute;
      z-index: 1000;
      min-width: 280px;
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .calendar-weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      font-weight: 500;
      margin-bottom: 8px;
    }

    .calendar-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
    }

    .calendar-days div {
      padding: 8px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
    }

    .calendar-days div:hover {
      background: #f5f5f5;
    }

    .current-month {
      color: #000;
    }

    .calendar-days div:not(.current-month) {
      color: #ccc;
    }

    .selected {
      background: #e3f2fd;
      color: #2196f3 !important;
    }
  `]
})
export class CalendarComponent {
  @Input() selectedDate: Date = new Date();
  @Input() isVisible: boolean = false;
  @Output() dateSelected = new EventEmitter<Date>();

  currentDate = new Date();
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: Array<{date: Date, currentMonth: boolean}> = [];

  constructor() {
    this.generateCalendarDays();
  }

  generateCalendarDays() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const prevMonthDays = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    this.calendarDays = [];
    
    // Previous month days
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      this.calendarDays.push({ date, currentMonth: false });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      this.calendarDays.push({ date, currentMonth: true });
    }
    
    // Next month days
    const remainingDays = 42 - this.calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      this.calendarDays.push({ date, currentMonth: false });
    }
  }

  previousMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1
    );
    this.generateCalendarDays();
  }

  nextMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1
    );
    this.generateCalendarDays();
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    this.dateSelected.emit(date);
    this.isVisible = false;
  }

  isSelected(date: Date): boolean {
    return date.toDateString() === this.selectedDate.toDateString();
  }
}