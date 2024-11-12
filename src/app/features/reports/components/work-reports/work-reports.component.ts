import { Component } from '@angular/core';

@Component({
  selector: 'app-work-reports',
  template: `
    <div class="report-container">
      <h2>Work Reports</h2>
      
      <mat-card>
        <mat-card-content>
          <h3>Visits Overview</h3>
          <table mat-table [dataSource]="visits">
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Date</th>
              <td mat-cell *matCellDef="let item">{{item.date}}</td>
            </ng-container>

            <ng-container matColumnDef="client">
              <th mat-header-cell *matHeaderCellDef>Client</th>
              <td mat-cell *matCellDef="let item">{{item.client}}</td>
            </ng-container>

            <ng-container matColumnDef="service">
              <th mat-header-cell *matHeaderCellDef>Service</th>
              <td mat-cell *matCellDef="let item">{{item.service}}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let item">{{item.status}}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .report-container {
      padding: 24px;
    }

    table {
      width: 100%;
    }
  `]
})
export class WorkReportsComponent {
  displayedColumns = ['date', 'client', 'service', 'status'];
  
  visits = [
    { date: '2024-01-15', client: 'John Doe', service: 'Maintenance', status: 'Completed' },
    { date: '2024-01-16', client: 'Jane Smith', service: 'Repair', status: 'Scheduled' },
    { date: '2024-01-17', client: 'Bob Johnson', service: 'Installation', status: 'In Progress' }
  ];
}