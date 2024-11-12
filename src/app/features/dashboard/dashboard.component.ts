import { Component } from '@angular/core';

interface DashboardStats {
  label: string;
  value: number;
  trend: number;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-container">
      <div class="stats-grid">
        <mat-card *ngFor="let stat of stats" class="stat-card">
          <mat-card-content>
            <div class="stat-header">
              <mat-icon [class.positive]="stat.trend > 0" 
                       [class.negative]="stat.trend < 0">{{stat.icon}}</mat-icon>
              <span class="trend" [class.positive]="stat.trend > 0" 
                                [class.negative]="stat.trend < 0">
                {{stat.trend > 0 ? '+' : ''}}{{stat.trend}}%
              </span>
            </div>
            <h3>{{stat.label}}</h3>
            <p class="value">{{stat.value | currency}}</p>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="charts-grid">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Recent Activity</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="activity-list">
              <div class="activity-item" *ngFor="let activity of recentActivity">
                <div class="activity-icon">
                  <mat-icon>{{activity.icon}}</mat-icon>
                </div>
                <div class="activity-content">
                  <p class="activity-title">{{activity.title}}</p>
                  <p class="activity-subtitle">{{activity.subtitle}}</p>
                </div>
                <p class="activity-time">{{activity.time}}</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Upcoming Jobs</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="jobs-list">
              <div class="job-item" *ngFor="let job of upcomingJobs">
                <div class="job-header">
                  <h4>{{job.title}}</h4>
                  <span class="job-amount">{{job.amount | currency}}</span>
                </div>
                <p class="job-client">{{job.client}}</p>
                <p class="job-date">{{job.date}}</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 24px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 24px;
      margin-bottom: 24px;
    }

    .stat-card {
      padding: 16px;
    }

    .stat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .trend {
      font-size: 14px;
    }

    .positive {
      color: #4caf50;
    }

    .negative {
      color: #f44336;
    }

    h3 {
      margin: 0;
      color: #666;
      font-size: 14px;
    }

    .value {
      margin: 8px 0 0;
      font-size: 24px;
      font-weight: 500;
    }

    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 24px;
    }

    .activity-list {
      margin-top: 16px;
    }

    .activity-item {
      display: flex;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
    }

    .activity-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
    }

    .activity-content {
      flex: 1;
    }

    .activity-title {
      margin: 0;
      font-weight: 500;
    }

    .activity-subtitle {
      margin: 4px 0 0;
      color: #666;
      font-size: 14px;
    }

    .activity-time {
      color: #666;
      font-size: 14px;
    }

    .jobs-list {
      margin-top: 16px;
    }

    .job-item {
      padding: 16px;
      border-bottom: 1px solid #eee;
    }

    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .job-header h4 {
      margin: 0;
      font-weight: 500;
    }

    .job-amount {
      font-weight: 500;
      color: #2196f3;
    }

    .job-client {
      margin: 4px 0;
      color: #666;
    }

    .job-date {
      margin: 0;
      font-size: 14px;
      color: #666;
    }
  `]
})
export class DashboardComponent {
  stats: DashboardStats[] = [
    { label: 'Revenue', value: 45250, trend: 12.5, icon: 'trending_up' },
    { label: 'Expenses', value: 15800, trend: -8.3, icon: 'trending_down' },
    { label: 'Outstanding', value: 28400, trend: 5.2, icon: 'account_balance' },
    { label: 'Profit', value: 29450, trend: 15.8, icon: 'show_chart' }
  ];

  recentActivity = [
    {
      icon: 'work',
      title: 'New job created',
      subtitle: 'Kitchen Renovation - John Smith',
      time: '2 hours ago'
    },
    {
      icon: 'receipt',
      title: 'Invoice paid',
      subtitle: 'INV-001 - $3,500',
      time: '4 hours ago'
    },
    {
      icon: 'person_add',
      title: 'New client added',
      subtitle: 'Sarah Johnson',
      time: '6 hours ago'
    },
    {
      icon: 'check_circle',
      title: 'Job completed',
      subtitle: 'Bathroom Remodel - Mike Wilson',
      time: '1 day ago'
    }
  ];

  upcomingJobs = [
    {
      title: 'Kitchen Renovation',
      client: 'John Smith',
      amount: 12500,
      date: 'Starting Jan 15, 2024'
    },
    {
      title: 'Deck Construction',
      client: 'Emily Davis',
      amount: 8500,
      date: 'Starting Jan 18, 2024'
    },
    {
      title: 'Basement Finishing',
      client: 'Robert Brown',
      amount: 15000,
      date: 'Starting Jan 22, 2024'
    }
  ];
}