import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImportJobsDialogComponent } from './components/import-jobs-dialog/import-jobs-dialog.component';

interface Job {
  client: string;
  jobNumber: string;
  property: string;
  schedule: string;
  status: 'Draft' | 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  total: number;
}

@Component({
  selector: 'app-jobs',
  template: `
    <div class="jobs-container">
      <div class="header">
        <h2>Jobs</h2>
        <button mat-raised-button color="primary">
          <mat-icon>add</mat-icon>
          New Job
        </button>
      </div>

      <div class="overview-section">
        <mat-card class="status-card">
          <mat-card-content>
            <h3>Job Status Overview</h3>
            <ul class="status-list">
              <li>
                <div class="status-info">
                  <span class="status-dot ending"></span>
                  <span class="status-label">Ending within 30 days</span>
                </div>
                <span class="status-count">2</span>
              </li>
              <li>
                <div class="status-info">
                  <span class="status-dot late"></span>
                  <span class="status-label">Late</span>
                </div>
                <span class="status-count">1</span>
              </li>
              <li>
                <div class="status-info">
                  <span class="status-dot requires-invoicing"></span>
                  <span class="status-label">Requires Invoicing</span>
                </div>
                <span class="status-count">3</span>
              </li>
              <li>
                <div class="status-info">
                  <span class="status-dot action-required"></span>
                  <span class="status-label">Action Required</span>
                </div>
                <span class="status-count">2</span>
              </li>
              <li>
                <div class="status-info">
                  <span class="status-dot unscheduled"></span>
                  <span class="status-label">Unscheduled</span>
                </div>
                <span class="status-count">1</span>
              </li>
            </ul>
          </mat-card-content>
        </mat-card>

        <mat-card class="metrics-card">
          <mat-card-content>
            <h3>Recent Visits</h3>
            <p class="subtitle">Past 30 days</p>
            <div class="metric-content">
              <div class="metric-circle">
                <span class="number">12</span>
                <span class="percent">75%</span>
              </div>
              <div class="metric-details">
                <span class="metric-label">Total Value</span>
                <span class="metric-amount">{{15450 | currency}}</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="metrics-card">
          <mat-card-content>
            <h3>Visits Scheduled</h3>
            <p class="subtitle">Next 30 days</p>
            <div class="metric-content">
              <div class="metric-circle">
                <span class="number">8</span>
                <span class="percent">25%</span>
              </div>
              <div class="metric-details">
                <span class="metric-label">Total Value</span>
                <span class="metric-amount">{{12800 | currency}}</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="jobs-section">
        <div class="section-header">
          <h3>All Jobs</h3>
          <div class="actions">
            <mat-form-field appearance="outline" class="status-filter">
              <mat-label>Status</mat-label>
              <mat-select value="all">
                <mat-option value="all">All</mat-option>
                <mat-option value="draft">Draft</mat-option>
                <mat-option value="scheduled">Scheduled</mat-option>
                <mat-option value="in-progress">In Progress</mat-option>
                <mat-option value="completed">Completed</mat-option>
                <mat-option value="cancelled">Cancelled</mat-option>
              </mat-select>
            </mat-form-field>
            <button mat-raised-button color="primary">
              <mat-icon>add</mat-icon>
              New Job
            </button>
          </div>
        </div>

        <table mat-table [dataSource]="jobs" class="jobs-table">
          <ng-container matColumnDef="client">
            <th mat-header-cell *matHeaderCellDef>Client</th>
            <td mat-cell *matCellDef="let job">
              <div class="client-info">
                <span class="client-name">{{job.client}}</span>
              </div>
            </td>
          </ng-container>

          <ng-container matColumnDef="jobNumber">
            <th mat-header-cell *matHeaderCellDef>Job Number</th>
            <td mat-cell *matCellDef="let job">
              <span class="job-number">{{job.jobNumber}}</span>
            </td>
          </ng-container>

          <ng-container matColumnDef="property">
            <th mat-header-cell *matHeaderCellDef>Property</th>
            <td mat-cell *matCellDef="let job">
              <div class="property-info">
                <mat-icon class="property-icon">location_on</mat-icon>
                <span>{{job.property}}</span>
              </div>
            </td>
          </ng-container>

          <ng-container matColumnDef="schedule">
            <th mat-header-cell *matHeaderCellDef>Schedule</th>
            <td mat-cell *matCellDef="let job">
              <div class="schedule-info">
                <mat-icon class="schedule-icon">event</mat-icon>
                <span>{{job.schedule}}</span>
              </div>
            </td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let job">
              <span class="status-badge" [ngClass]="job.status.toLowerCase().replace(' ', '-')">
                {{job.status}}
              </span>
            </td>
          </ng-container>

          <ng-container matColumnDef="total">
            <th mat-header-cell *matHeaderCellDef>Total</th>
            <td mat-cell *matCellDef="let job">
              <span class="total-amount">{{job.total | currency}}</span>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <div class="empty-state" *ngIf="jobs.length === 0">
          <p>Let's create a job and get to work</p>
          <div class="empty-state-actions">
            <button mat-raised-button color="primary">Create your first job</button>
            <button mat-stroked-button color="primary" (click)="openImportDialog()">
              <mat-icon>upload_file</mat-icon>
              Import Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .jobs-container {
      padding: 24px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .overview-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .status-card {
      height: 100%;
    }

    .status-list {
      list-style: none;
      padding: 0;
      margin: 16px 0 0;
    }

    .status-list li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
    }

    .status-list li:last-child {
      border-bottom: none;
    }

    .status-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .status-label {
      font-size: 14px;
      color: #333;
    }

    .status-count {
      font-weight: 500;
      color: #666;
      background: #f5f5f5;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
    }

    .ending { background-color: #ff9800; }
    .late { background-color: #f44336; }
    .requires-invoicing { background-color: #2196f3; }
    .action-required { background-color: #fdd835; }
    .unscheduled { background-color: #4caf50; }

    .metrics-card {
      height: 100%;
    }

    .metric-content {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-top: 16px;
    }

    .metric-circle {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: #f5f5f5;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .number {
      font-size: 28px;
      font-weight: 500;
      color: #333;
    }

    .percent {
      font-size: 14px;
      color: #666;
    }

    .metric-details {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .metric-label {
      font-size: 14px;
      color: #666;
    }

    .metric-amount {
      font-size: 24px;
      font-weight: 500;
      color: #2196f3;
    }

    .subtitle {
      color: #666;
      font-size: 14px;
      margin: 4px 0 0;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .actions {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .status-filter {
      width: 200px;
      margin-bottom: 0;
    }

    .jobs-table {
      width: 100%;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border-radius: 4px;
    }

    .jobs-table th {
      color: #666;
      font-size: 13px;
      font-weight: 500;
      text-transform: uppercase;
      padding: 16px;
    }

    .jobs-table td {
      padding: 16px;
    }

    .client-info {
      display: flex;
      flex-direction: column;
    }

    .client-name {
      font-weight: 500;
      color: #2196f3;
    }

    .job-number {
      font-family: monospace;
      color: #666;
    }

    .property-info,
    .schedule-info {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
    }

    .property-icon,
    .schedule-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: #999;
    }

    .status-badge {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
    }

    .draft {
      background-color: #e0e0e0;
      color: #616161;
    }

    .scheduled {
      background-color: #e3f2fd;
      color: #1976d2;
    }

    .in-progress {
      background-color: #fff3e0;
      color: #f57c00;
    }

    .completed {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    .cancelled {
      background-color: #ffebee;
      color: #c62828;
    }

    .total-amount {
      font-weight: 500;
      color: #333;
    }

    .empty-state {
      text-align: center;
      padding: 48px;
      background: white;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .empty-state p {
      margin-bottom: 16px;
      color: #666;
    }

    .empty-state-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
    }

    mat-card-content h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }
  `]
})
export class JobsComponent {
  displayedColumns = ['client', 'jobNumber', 'property', 'schedule', 'status', 'total'];
  
  jobs: Job[] = [
    {
      client: 'John Smith',
      jobNumber: 'JOB-00001',
      property: '123 Main St, Anytown',
      schedule: 'Jan 15 - Jan 20, 2024',
      status: 'In Progress',
      total: 5000
    },
    {
      client: 'Sarah Johnson',
      jobNumber: 'JOB-00002',
      property: '456 Oak Ave, Somewhere',
      schedule: 'Jan 18 - Jan 25, 2024',
      status: 'Scheduled',
      total: 7500
    },
    {
      client: 'Mike Wilson',
      jobNumber: 'JOB-00003',
      property: '789 Pine Rd, Elsewhere',
      schedule: 'Jan 10 - Jan 12, 2024',
      status: 'Completed',
      total: 3200
    },
    {
      client: 'Emily Davis',
      jobNumber: 'JOB-00004',
      property: '321 Elm St, Nowhere',
      schedule: 'Jan 22 - Jan 24, 2024',
      status: 'Draft',
      total: 4800
    },
    {
      client: 'Robert Brown',
      jobNumber: 'JOB-00005',
      property: '654 Maple Dr, Anywhere',
      schedule: 'Jan 8 - Jan 9, 2024',
      status: 'Cancelled',
      total: 2500
    }
  ];

  constructor(private dialog: MatDialog) {}

  openImportDialog() {
    this.dialog.open(ImportJobsDialogComponent, {
      width: '600px',
      disableClose: true
    });
  }
}