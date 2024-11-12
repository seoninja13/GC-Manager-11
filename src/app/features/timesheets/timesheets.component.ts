import { Component } from '@angular/core';

interface TimeEntry {
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  category: string;
  notes: string;
}

@Component({
  selector: 'app-timesheets',
  template: `
    <div class="timesheets-container">
      <div class="header">
        <div class="title-section">
          <h2>Timesheets</h2>
          <div class="links">
            <a routerLink="/timesheets/approve">Approve Timesheets</a>
            <a routerLink="/timesheets/payroll">Confirm Payroll</a>
          </div>
        </div>
      </div>

      <div class="notification-banner">
        <div class="banner-content">
          <img src="assets/timer-notification.png" alt="Timer notification" class="notification-image">
          <div class="banner-text">
            <h3>Track time automatically</h3>
            <p>Location timers help you and your team maintain accurate, up-to-date timesheets by tracking visit time when near a client's property</p>
          </div>
          <div class="banner-actions">
            <button mat-stroked-button>Try It</button>
            <button mat-button>Learn More</button>
          </div>
          <button mat-icon-button class="close-button">
            <mat-icon>close</mat-icon>
          </button>
        </div>
      </div>

      <div class="user-section">
        <div class="user-info">
          <div class="avatar">J</div>
          <div class="user-details">
            <h3>John</h3>
            <p>john@example.com</p>
          </div>
        </div>
      </div>

      <div class="time-controls">
        <div class="navigation">
          <button mat-icon-button>
            <mat-icon>chevron_left</mat-icon>
          </button>
          <div class="view-controls">
            <button mat-button class="active">Day</button>
            <button mat-button>Week</button>
          </div>
          <button mat-icon-button>
            <mat-icon>chevron_right</mat-icon>
          </button>
          <button mat-stroked-button>Today</button>
          <button mat-icon-button (click)="toggleCalendar()">
            <mat-icon>calendar_today</mat-icon>
          </button>
        </div>
      </div>

      <app-calendar 
        [isVisible]="showCalendar"
        [selectedDate]="selectedDate"
        (dateSelected)="onDateSelected($event)">
      </app-calendar>

      <div class="time-entries">
        <h3>Time Entries for {{selectedDate | date}}</h3>
        <table mat-table [dataSource]="timeEntries" class="entries-table">
          <ng-container matColumnDef="startTime">
            <th mat-header-cell *matHeaderCellDef>Start Time</th>
            <td mat-cell *matCellDef="let entry">{{entry.startTime}}</td>
          </ng-container>

          <ng-container matColumnDef="endTime">
            <th mat-header-cell *matHeaderCellDef>End Time</th>
            <td mat-cell *matCellDef="let entry">{{entry.endTime}}</td>
          </ng-container>

          <ng-container matColumnDef="duration">
            <th mat-header-cell *matHeaderCellDef>Duration</th>
            <td mat-cell *matCellDef="let entry">{{entry.duration}}</td>
          </ng-container>

          <ng-container matColumnDef="category">
            <th mat-header-cell *matHeaderCellDef>Category</th>
            <td mat-cell *matCellDef="let entry">{{entry.category}}</td>
          </ng-container>

          <ng-container matColumnDef="notes">
            <th mat-header-cell *matHeaderCellDef>Notes</th>
            <td mat-cell *matCellDef="let entry">{{entry.notes}}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <div class="time-entry-form">
          <h3>Add New Entry</h3>
          <div class="entry-form">
            <mat-form-field appearance="outline">
              <mat-label>Category</mat-label>
              <mat-select value="general">
                <mat-option value="general">General</mat-option>
                <mat-option value="meeting">Meeting</mat-option>
                <mat-option value="site-work">Site Work</mat-option>
                <mat-option value="admin">Administrative</mat-option>
              </mat-select>
            </mat-form-field>

            <div class="time-inputs">
              <mat-form-field appearance="outline">
                <mat-label>Start</mat-label>
                <input matInput type="time">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>End</mat-label>
                <input matInput type="time">
              </mat-form-field>

              <div class="duration">
                <span>Duration</span>
                <span class="time">0:00</span>
              </div>
            </div>

            <mat-form-field appearance="outline">
              <mat-label>Notes</mat-label>
              <textarea matInput rows="4"></textarea>
            </mat-form-field>

            <div class="form-actions">
              <button mat-raised-button color="primary">Add Entry</button>
              <button mat-button>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .timesheets-container {
      padding: 24px;
    }

    .header {
      margin-bottom: 24px;
    }

    .title-section {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .links {
      display: flex;
      gap: 16px;
    }

    .links a {
      color: #2196f3;
      text-decoration: none;
    }

    .notification-banner {
      background: #f5f5f5;
      border-radius: 8px;
      margin-bottom: 24px;
    }

    .banner-content {
      display: flex;
      align-items: center;
      padding: 16px;
      gap: 24px;
    }

    .notification-image {
      width: 100px;
      height: auto;
    }

    .banner-text {
      flex: 1;
    }

    .banner-text h3 {
      margin: 0 0 8px 0;
    }

    .banner-text p {
      margin: 0;
    }

    .banner-actions {
      display: flex;
      gap: 8px;
    }

    .user-section {
      background: white;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .avatar {
      width: 40px;
      height: 40px;
      background: #2196f3;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }

    .user-details h3 {
      margin: 0;
    }

    .user-details p {
      margin: 4px 0 0 0;
      color: #666;
    }

    .time-controls {
      background: white;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .navigation {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .view-controls {
      display: flex;
      gap: 8px;
    }

    .view-controls .active {
      background: #e3f2fd;
      color: #2196f3;
    }

    .entries-table {
      width: 100%;
      margin-bottom: 24px;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border-radius: 4px;
    }

    .time-entry-form {
      background: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .entry-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .time-inputs {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .duration {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .time {
      font-size: 18px;
      font-weight: 500;
    }

    .form-actions {
      display: flex;
      gap: 16px;
    }
  `]
})
export class TimesheetsComponent {
  showCalendar = false;
  selectedDate = new Date();
  displayedColumns = ['startTime', 'endTime', 'duration', 'category', 'notes'];

  timeEntries: TimeEntry[] = [
    {
      date: '2024-01-15',
      startTime: '09:00',
      endTime: '12:00',
      duration: '3:00',
      category: 'Site Work',
      notes: 'Kitchen renovation project'
    },
    {
      date: '2024-01-15',
      startTime: '13:00',
      endTime: '15:30',
      duration: '2:30',
      category: 'Meeting',
      notes: 'Client consultation'
    },
    {
      date: '2024-01-15',
      startTime: '16:00',
      endTime: '17:00',
      duration: '1:00',
      category: 'Administrative',
      notes: 'Daily reports and documentation'
    }
  ];

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  onDateSelected(date: Date) {
    this.selectedDate = date;
    this.showCalendar = false;
  }
}