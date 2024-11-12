import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { ReportsComponent } from './reports.component';
import { FinancialReportsComponent } from './components/financial-reports/financial-reports.component';
import { WorkReportsComponent } from './components/work-reports/work-reports.component';
import { ClientReportsComponent } from './components/client-reports/client-reports.component';
import { ExpenseReportsComponent } from './components/expense-reports/expense-reports.component';

const routes: Routes = [
  { path: '', component: ReportsComponent },
  { path: 'financial', component: FinancialReportsComponent },
  { path: 'work', component: WorkReportsComponent },
  { path: 'clients', component: ClientReportsComponent },
  { path: 'expenses', component: ExpenseReportsComponent }
];

@NgModule({
  declarations: [
    ReportsComponent,
    FinancialReportsComponent,
    WorkReportsComponent,
    ClientReportsComponent,
    ExpenseReportsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    RouterModule.forChild(routes)
  ]
})
export class ReportsModule { }