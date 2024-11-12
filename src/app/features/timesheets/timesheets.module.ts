import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { TimesheetsComponent } from './timesheets.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: TimesheetsComponent },
  { path: 'approve', component: TimesheetsComponent },
  { path: 'payroll', component: TimesheetsComponent }
];

@NgModule({
  declarations: [TimesheetsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class TimesheetsModule {}