import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./features/clients/clients.module').then(m => m.ClientsModule)
  },
  {
    path: 'jobs',
    loadChildren: () => import('./features/jobs/jobs.module').then(m => m.JobsModule)
  },
  {
    path: 'quotes',
    loadChildren: () => import('./features/quotes/quotes.module').then(m => m.QuotesModule)
  },
  {
    path: 'requests',
    loadChildren: () => import('./features/requests/requests.module').then(m => m.RequestsModule)
  },
  {
    path: 'invoices',
    loadChildren: () => import('./features/invoices/invoices.module').then(m => m.InvoicesModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./features/reports/reports.module').then(m => m.ReportsModule)
  },
  {
    path: 'expenses',
    loadChildren: () => import('./features/expenses/expenses.module').then(m => m.ExpensesModule)
  },
  {
    path: 'timesheets',
    loadChildren: () => import('./features/timesheets/timesheets.module').then(m => m.TimesheetsModule)
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }