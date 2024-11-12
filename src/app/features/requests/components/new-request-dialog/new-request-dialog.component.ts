import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-request-dialog',
  template: `
    <div class="request-dialog">
      <h2 mat-dialog-title>New Service Request</h2>
      
      <mat-dialog-content>
        <form [formGroup]="requestForm">
          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Full Name</mat-label>
              <input matInput formControlName="name" placeholder="Enter your full name">
              <mat-error *ngIf="requestForm.get('name')?.hasError('required')">
                Name is required
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" placeholder="Enter your email">
              <mat-error *ngIf="requestForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="requestForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Phone</mat-label>
              <input matInput formControlName="phone" placeholder="Enter your phone number">
              <mat-error *ngIf="requestForm.get('phone')?.hasError('required')">
                Phone number is required
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Service Type</mat-label>
              <mat-select formControlName="serviceType">
                <mat-option value="renovation">Renovation</mat-option>
                <mat-option value="repair">Repair</mat-option>
                <mat-option value="installation">Installation</mat-option>
                <mat-option value="maintenance">Maintenance</mat-option>
                <mat-option value="other">Other</mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Preferred Date</mat-label>
              <input matInput [matDatepicker]="picker" formControlName="preferredDate">
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Property Address</mat-label>
              <textarea matInput formControlName="address" rows="3" 
                placeholder="Enter the property address"></textarea>
              <mat-error *ngIf="requestForm.get('address')?.hasError('required')">
                Address is required
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Project Description</mat-label>
              <textarea matInput formControlName="description" rows="4" 
                placeholder="Describe your project or service needs"></textarea>
              <mat-error *ngIf="requestForm.get('description')?.hasError('required')">
                Description is required
              </mat-error>
            </mat-form-field>
          </div>
        </form>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" 
                [disabled]="requestForm.invalid"
                (click)="onSubmit()">
          Submit Request
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .request-dialog {
      padding: 16px;
    }

    .form-row {
      margin-bottom: 16px;
    }

    .form-row mat-form-field {
      width: 100%;
    }

    mat-dialog-actions {
      margin-top: 24px;
    }
  `]
})
export class NewRequestDialogComponent {
  requestForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewRequestDialogComponent>
  ) {
    this.requestForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      serviceType: ['', Validators.required],
      preferredDate: [null],
      address: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.requestForm.valid) {
      // Handle form submission
      this.dialogRef.close(this.requestForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}