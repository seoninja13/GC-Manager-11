import { Component } from '@angular/core';

@Component({
  selector: 'app-financial-reports',
  template: `
    <div class="report-container">
      <h2>Financial Reports</h2>
      
      <mat-card>
        <mat-card-content>
          <h3>Projected Income</h3>
          <table mat-table [dataSource]="projectedIncome">
            <ng-container matColumnDef="invoice">
              <th mat-header-cell *matHeaderCellDef>Invoice #</th>
              <td mat-cell *matCellDef="let item">{{item.invoice}}</td>
            </ng-container>

            <ng-container matColumnDef="client">
              <th mat-header-cell *matHeaderCellDef>Client</th>
              <td mat-cell *matCellDef="let item">{{item.client}}</td>
            </ng-container>

            <ng-container matColumnDef="dueDate">
              <th mat-header-cell *matHeaderCellDef>Due Date</th>
              <td mat-cell *matCellDef="let item">{{item.dueDate}}</td>
            </ng-container>

            <ng-container matColumnDef="amount">
              <th mat-header-cell *matHeaderCellDef>Amount</th>
              <td mat-cell *matCellDef="let item">\${{item.amount}}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>

          <div class="total-section">
            <p>Total Projected Income: <strong>\${{totalProjectedIncome}}</strong></p>
          </div>
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
      margin-bottom: 24px;
    }

    .total-section {
      text-align: right;
      font-size: 18px;
    }
  `]
})
export class FinancialReportsComponent {
  displayedColumns = ['invoice', 'client', 'dueDate', 'amount'];
  
  projectedIncome = [
    { invoice: 'INV-001', client: 'John Doe', dueDate: '2024-02-01', amount: 1500 },
    { invoice: 'INV-002', client: 'Jane Smith', dueDate: '2024-02-15', amount: 2300 },
    { invoice: 'INV-003', client: 'Bob Johnson', dueDate: '2024-02-28', amount: 1800 }
  ];

  get totalProjectedIncome(): number {
    return this.projectedIncome.reduce((sum, item) => sum + item.amount, 0);
  }
}