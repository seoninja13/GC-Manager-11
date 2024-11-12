import { Component } from '@angular/core';
import { MatChipListbox } from '@angular/material/chips';

interface Quote {
  id: string;
  client: string;
  title: string;
  total: number;
  status: 'Draft' | 'Sent' | 'Approved' | 'Declined';
  date: Date;
  expiryDate: Date;
}

@Component({
  selector: 'app-quotes',
  template: `
    <div class="quotes-container">
      <div class="header">
        <h2>Quotes</h2>
        <button mat-raised-button color="primary">
          <mat-icon>add</mat-icon>
          New Quote
        </button>
      </div>

      <div class="overview-section">
        <mat-card>
          <mat-card-content>
            <h3>Overview</h3>
            <div class="stats-grid">
              <div class="stat-item">
                <span class="label">Draft</span>
                <span class="value">{{getDraftCount()}}</span>
                <span class="amount">\${{getDraftAmount() | number:'1.0-0'}}</span>
              </div>
              <div class="stat-item">
                <span class="label">Sent</span>
                <span class="value">{{getSentCount()}}</span>
                <span class="amount">\${{getSentAmount() | number:'1.0-0'}}</span>
              </div>
              <div class="stat-item">
                <span class="label">Approved</span>
                <span class="value">{{getApprovedCount()}}</span>
                <span class="amount">\${{getApprovedAmount() | number:'1.0-0'}}</span>
              </div>
              <div class="stat-item">
                <span class="label">Declined</span>
                <span class="value">{{getDeclinedCount()}}</span>
                <span class="amount">\${{getDeclinedAmount() | number:'1.0-0'}}</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-content>
            <h3>Conversion Rate</h3>
            <div class="conversion-rate">
              <div class="rate-circle">
                <span class="rate">{{getConversionRate() | number:'1.0-0'}}%</span>
              </div>
              <p class="rate-label">Last 30 days</p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="quotes-section">
        <div class="filters">
          <mat-form-field appearance="outline">
            <mat-label>Status</mat-label>
            <mat-select [(value)]="selectedStatus">
              <mat-option value="all">All Quotes</mat-option>
              <mat-option value="draft">Draft</mat-option>
              <mat-option value="sent">Sent</mat-option>
              <mat-option value="approved">Approved</mat-option>
              <mat-option value="declined">Declined</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <table mat-table [dataSource]="quotes" class="quotes-table">
          <ng-container matColumnDef="client">
            <th mat-header-cell *matHeaderCellDef>Client</th>
            <td mat-cell *matCellDef="let quote">{{quote.client}}</td>
          </ng-container>

          <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef>Title</th>
            <td mat-cell *matCellDef="let quote">{{quote.title}}</td>
          </ng-container>

          <ng-container matColumnDef="total">
            <th mat-header-cell *matHeaderCellDef>Total</th>
            <td mat-cell *matCellDef="let quote">\${{quote.total | number:'1.0-0'}}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let quote">
              <div class="status-chip" [ngClass]="quote.status.toLowerCase()">
                {{quote.status}}
              </div>
            </td>
          </ng-container>

          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef>Date</th>
            <td mat-cell *matCellDef="let quote">{{quote.date | date}}</td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let quote">
              <button mat-icon-button [matMenuTriggerFor]="menu">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #menu="matMenu">
                <button mat-menu-item>
                  <mat-icon>edit</mat-icon>
                  <span>Edit</span>
                </button>
                <button mat-menu-item>
                  <mat-icon>content_copy</mat-icon>
                  <span>Duplicate</span>
                </button>
                <button mat-menu-item>
                  <mat-icon>delete</mat-icon>
                  <span>Delete</span>
                </button>
              </mat-menu>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .quotes-container {
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
      grid-template-columns: 2fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      padding: 16px;
      background: #f5f5f5;
      border-radius: 4px;
    }

    .stat-item .label {
      color: #666;
      font-size: 14px;
    }

    .stat-item .value {
      font-size: 24px;
      font-weight: 500;
      margin: 4px 0;
    }

    .stat-item .amount {
      color: #666;
      font-size: 14px;
    }

    .conversion-rate {
      text-align: center;
      padding: 16px;
    }

    .rate-circle {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: #e3f2fd;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
    }

    .rate {
      font-size: 32px;
      font-weight: 500;
      color: #2196f3;
    }

    .rate-label {
      color: #666;
      margin: 0;
    }

    .filters {
      margin-bottom: 16px;
    }

    .quotes-table {
      width: 100%;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border-radius: 4px;
    }

    .status-chip {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
    }

    .draft {
      background-color: #e0e0e0;
      color: #616161;
    }

    .sent {
      background-color: #e3f2fd;
      color: #1976d2;
    }

    .approved {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    .declined {
      background-color: #ffebee;
      color: #c62828;
    }
  `]
})
export class QuotesComponent {
  selectedStatus = 'all';
  displayedColumns = ['client', 'title', 'total', 'status', 'date', 'actions'];

  quotes: Quote[] = [
    {
      id: '1',
      client: 'John Smith',
      title: 'Kitchen Renovation',
      total: 25000,
      status: 'Draft',
      date: new Date('2024-01-15'),
      expiryDate: new Date('2024-02-15')
    },
    {
      id: '2',
      client: 'Sarah Johnson',
      title: 'Bathroom Remodel',
      total: 15000,
      status: 'Sent',
      date: new Date('2024-01-10'),
      expiryDate: new Date('2024-02-10')
    },
    {
      id: '3',
      client: 'Mike Davis',
      title: 'Deck Construction',
      total: 8000,
      status: 'Approved',
      date: new Date('2024-01-05'),
      expiryDate: new Date('2024-02-05')
    },
    {
      id: '4',
      client: 'Emily Wilson',
      title: 'Basement Finishing',
      total: 35000,
      status: 'Declined',
      date: new Date('2024-01-01'),
      expiryDate: new Date('2024-02-01')
    }
  ];

  getDraftCount(): number {
    return this.quotes.filter(q => q.status === 'Draft').length;
  }

  getDraftAmount(): number {
    return this.quotes
      .filter(q => q.status === 'Draft')
      .reduce((sum, q) => sum + q.total, 0);
  }

  getSentCount(): number {
    return this.quotes.filter(q => q.status === 'Sent').length;
  }

  getSentAmount(): number {
    return this.quotes
      .filter(q => q.status === 'Sent')
      .reduce((sum, q) => sum + q.total, 0);
  }

  getApprovedCount(): number {
    return this.quotes.filter(q => q.status === 'Approved').length;
  }

  getApprovedAmount(): number {
    return this.quotes
      .filter(q => q.status === 'Approved')
      .reduce((sum, q) => sum + q.total, 0);
  }

  getDeclinedCount(): number {
    return this.quotes.filter(q => q.status === 'Declined').length;
  }

  getDeclinedAmount(): number {
    return this.quotes
      .filter(q => q.status === 'Declined')
      .reduce((sum, q) => sum + q.total, 0);
  }

  getConversionRate(): number {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentQuotes = this.quotes.filter(q => q.date >= thirtyDaysAgo);
    const approvedQuotes = recentQuotes.filter(q => q.status === 'Approved');

    return recentQuotes.length > 0
      ? (approvedQuotes.length / recentQuotes.length) * 100
      : 0;
  }
}