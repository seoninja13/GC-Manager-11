import { Component } from '@angular/core';

@Component({
  selector: 'app-client-reports',
  template: `
    <div class="report-container">
      <h2>Client Reports</h2>
      
      <mat-card>
        <mat-card-content>
          <h3>Client Activity Summary</h3>
          <table mat-table [dataSource]="clientActivity">
            <ng-container matColumnDef="client">
              <th mat-header-cell *matHeaderCellDef>Client</th>
              <td mat-cell *matCellDef="let item">{{item.client}}</td>
            </ng-container>

            <ng-container matColumnDef="totalJobs">
              <th mat-header-cell *matHeaderCellDef>Total Jobs</th>
              <td mat-cell *matCellDef="let item">{{item.totalJobs}}</td>
            </ng-container>

            <ng-container matColumnDef="lastActivity">
              <th mat-header-cell *matHeaderCellDef>Last Activity</th>
              <td mat-cell *matCellDef="let item">{{item.lastActivity}}</td>
            </ng-container>

            <ng-container matColumnDef="totalSpent">
              <th mat-header-cell *matHeaderCellDef>Total Spent</th>
              <td mat-cell *matCellDef="let item">\${{item.totalSpent}}</td>
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
export class ClientReportsComponent {
  displayedColumns = ['client', 'totalJobs', 'lastActivity', 'totalSpent'];
  
  clientActivity = [
    { client: 'John Doe', totalJobs: 5, lastActivity: '2024-01-15', totalSpent: 3500 },
    { client: 'Jane Smith', totalJobs: 3, lastActivity: '2024-01-10', totalSpent: 2800 },
    { client: 'Bob Johnson', totalJobs: 2, lastActivity: '2024-01-05', totalSpent: 1500 }
  ];
}