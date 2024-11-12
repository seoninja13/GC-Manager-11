import { Component } from '@angular/core';

@Component({
  selector: 'app-expense-reports',
  template: `
    <div class="report-container">
      <h2>Expense Reports</h2>
      
      <mat-card>
        <mat-card-content>
          <h3>Expense Summary</h3>
          <table mat-table [dataSource]="expenses">
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Date</th>
              <td mat-cell *matCellDef="let item">{{item.date}}</td>
            </ng-container>

            <ng-container matColumnDef="category">
              <th mat-header-cell *matHeaderCellDef>Category</th>
              <td mat-cell *matCellDef="let item">{{item.category}}</td>
            </ng-container>

            <ng-container matColumnDef="description">
              <th mat-header-cell *matHeaderCellDef>Description</th>
              <td mat-cell *matCellDef="let item">{{item.description}}</td>
            </ng-container>

            <ng-container matColumnDef="amount">
              <th mat-header-cell *matHeaderCellDef>Amount</th>
              <td mat-cell *matCellDef="let item">\${{item.amount}}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>

          <div class="total-section">
            <p>Total Expenses: <strong>\${{totalExpenses}}</strong></p>
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
export class ExpenseReportsComponent {
  displayedColumns = ['date', 'category', 'description', 'amount'];
  
  expenses = [
    { date: '2024-01-15', category: 'Materials', description: 'Construction supplies', amount: 500 },
    { date: '2024-01-16', category: 'Travel', description: 'Fuel expenses', amount: 150 },
    { date: '2024-01-17', category: 'Equipment', description: 'Tool rental', amount: 300 }
  ];

  get totalExpenses(): number {
    return this.expenses.reduce((sum, item) => sum + item.amount, 0);
  }
}