import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewRequestDialogComponent } from './components/new-request-dialog/new-request-dialog.component';

interface Request {
  id: string;
  client: string;
  title: string;
  property: string;
  contact: string;
  requested: string;
  status: 'New' | 'Assessment Complete' | 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
}

@Component({
  selector: 'app-requests',
  template: `
    <div class="requests-container">
      <div class="header">
        <h2>Requests</h2>
        <button mat-raised-button color="primary" (click)="openNewRequestDialog()">
          <mat-icon>add</mat-icon>
          New Request
        </button>
      </div>

      <div class="overview-section">
        <mat-card>
          <mat-card-content>
            <h3>Overview</h3>
            <ul class="status-list">
              <li>
                <span class="status-dot new"></span>
                New ({{getStatusCount('New')}})
              </li>
              <li>
                <span class="status-dot assessment"></span>
                Assessment Complete ({{getStatusCount('Assessment Complete')}})
              </li>
              <li>
                <span class="status-dot scheduled"></span>
                Scheduled ({{getStatusCount('Scheduled')}})
              </li>
              <li>
                <span class="status-dot in-progress"></span>
                In Progress ({{getStatusCount('In Progress')}})
              </li>
            </ul>
          </mat-card-content>
        </mat-card>

        <mat-card class="share-card">
          <mat-card-content>
            <div class="share-header">
              <h3>Get more new work</h3>
              <button mat-icon-button>
                <mat-icon>close</mat-icon>
              </button>
            </div>
            <p>Share your request form online and generate new work 24/7—even while you rest</p>
            <button mat-stroked-button color="primary">Share your form</button>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="requests-section">
        <div class="section-header">
          <h3>All Requests</h3>
          <div class="actions">
            <mat-form-field appearance="outline" class="status-filter">
              <mat-label>Status</mat-label>
              <mat-select [(value)]="selectedStatus">
                <mat-option value="all">All</mat-option>
                <mat-option value="new">New</mat-option>
                <mat-option value="assessment">Assessment Complete</mat-option>
                <mat-option value="scheduled">Scheduled</mat-option>
                <mat-option value="in-progress">In Progress</mat-option>
                <mat-option value="completed">Completed</mat-option>
                <mat-option value="cancelled">Cancelled</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </div>

        <table mat-table [dataSource]="filteredRequests" class="requests-table">
          <ng-container matColumnDef="client">
            <th mat-header-cell *matHeaderCellDef>Client</th>
            <td mat-cell *matCellDef="let request">{{request.client}}</td>
          </ng-container>

          <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef>Title</th>
            <td mat-cell *matCellDef="let request">{{request.title}}</td>
          </ng-container>

          <ng-container matColumnDef="property">
            <th mat-header-cell *matHeaderCellDef>Property</th>
            <td mat-cell *matCellDef="let request">{{request.property}}</td>
          </ng-container>

          <ng-container matColumnDef="contact">
            <th mat-header-cell *matHeaderCellDef>Contact</th>
            <td mat-cell *matCellDef="let request">{{request.contact}}</td>
          </ng-container>

          <ng-container matColumnDef="requested">
            <th mat-header-cell *matHeaderCellDef>Requested</th>
            <td mat-cell *matCellDef="let request">{{request.requested}}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let request">
              <span class="status-badge" [ngClass]="request.status.toLowerCase().replace(' ', '-')">
                {{request.status}}
              </span>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .requests-container {
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
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .status-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .status-list li {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 8px;
    }

    .new { background-color: #2196f3; }
    .assessment { background-color: #4caf50; }
    .scheduled { background-color: #ff9800; }
    .in-progress { background-color: #f44336; }

    .share-card {
      background-color: #f5f5f5;
    }

    .share-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
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
    }

    .requests-table {
      width: 100%;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border-radius: 4px;
    }

    .status-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
    }

    .new {
      background-color: #e3f2fd;
      color: #1976d2;
    }

    .assessment-complete {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    .scheduled {
      background-color: #fff3e0;
      color: #f57c00;
    }

    .in-progress {
      background-color: #fce4ec;
      color: #c2185b;
    }

    .completed {
      background-color: #f5f5f5;
      color: #616161;
    }

    .cancelled {
      background-color: #ffebee;
      color: #c62828;
    }
  `]
})
export class RequestsComponent {
  selectedStatus = 'all';
  displayedColumns = ['client', 'title', 'property', 'contact', 'requested', 'status'];

  requests: Request[] = [
    {
      id: '1',
      client: 'John Smith',
      title: 'Kitchen Renovation',
      property: '123 Main St, Anytown',
      contact: 'john@example.com',
      requested: '2024-01-15',
      status: 'New'
    },
    {
      id: '2',
      client: 'Sarah Johnson',
      title: 'Bathroom Remodel',
      property: '456 Oak Ave, Somewhere',
      contact: 'sarah@example.com',
      requested: '2024-01-14',
      status: 'Assessment Complete'
    },
    {
      id: '3',
      client: 'Mike Wilson',
      title: 'Deck Installation',
      property: '789 Pine Rd, Elsewhere',
      contact: 'mike@example.com',
      requested: '2024-01-13',
      status: 'Scheduled'
    },
    {
      id: '4',
      client: 'Emily Davis',
      title: 'Basement Finishing',
      property: '321 Elm St, Nowhere',
      contact: 'emily@example.com',
      requested: '2024-01-12',
      status: 'In Progress'
    }
  ];

  constructor(private dialog: MatDialog) {}

  get filteredRequests(): Request[] {
    if (this.selectedStatus === 'all') {
      return this.requests;
    }
    return this.requests.filter(
      request => request.status.toLowerCase().replace(' ', '-') === this.selectedStatus
    );
  }

  getStatusCount(status: string): number {
    return this.requests.filter(request => request.status === status).length;
  }

  openNewRequestDialog(): void {
    this.dialog.open(NewRequestDialogComponent, {
      width: '600px',
      disableClose: true
    });
  }
}