import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container>
      <mat-sidenav #sidenav mode="side" opened>
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
            <mat-icon>dashboard</mat-icon>
            <span>Dashboard</span>
          </a>
          <a mat-list-item routerLink="/clients" routerLinkActive="active">
            <mat-icon>people</mat-icon>
            <span>Clients</span>
          </a>
          <a mat-list-item routerLink="/jobs" routerLinkActive="active">
            <mat-icon>work</mat-icon>
            <span>Jobs</span>
          </a>
          <a mat-list-item routerLink="/quotes" routerLinkActive="active">
            <mat-icon>request_quote</mat-icon>
            <span>Quotes</span>
          </a>
          <a mat-list-item routerLink="/requests" routerLinkActive="active">
            <mat-icon>assignment</mat-icon>
            <span>Requests</span>
          </a>
          <a mat-list-item routerLink="/invoices" routerLinkActive="active">
            <mat-icon>receipt</mat-icon>
            <span>Invoices</span>
          </a>
          <a mat-list-item routerLink="/reports" routerLinkActive="active">
            <mat-icon>bar_chart</mat-icon>
            <span>Reports</span>
          </a>
          <a mat-list-item routerLink="/expenses" routerLinkActive="active">
            <mat-icon>attach_money</mat-icon>
            <span>Expenses</span>
          </a>
          <a mat-list-item routerLink="/timesheets" routerLinkActive="active">
            <mat-icon>access_time</mat-icon>
            <span>Timesheets</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>GC App</span>
        </mat-toolbar>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    mat-sidenav-container {
      height: 100vh;
      background-color: #fafafa;
    }
    mat-sidenav {
      width: 250px;
    }
    mat-nav-list a {
      display: flex;
      align-items: center;
      gap: 16px;
      height: 48px;
    }
    mat-nav-list .active {
      background-color: rgba(0, 0, 0, 0.04);
    }
    mat-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .content {
      padding: 20px;
    }
  `]
})
export class AppComponent {
  title = 'GC App';
}