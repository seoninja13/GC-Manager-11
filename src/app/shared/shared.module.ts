import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    CalendarComponent
  ]
})
export class SharedModule { }