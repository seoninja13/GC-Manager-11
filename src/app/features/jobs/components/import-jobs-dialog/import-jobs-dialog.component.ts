import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-import-jobs-dialog',
  template: `
    <div class="import-dialog">
      <h2 mat-dialog-title>Import Jobs</h2>
      
      <mat-dialog-content>
        <div class="import-info">
          <h3>Supported File Types</h3>
          <ul>
            <li>CSV (.csv)</li>
            <li>Excel (.xlsx, .xls)</li>
          </ul>

          <h3>File Requirements</h3>
          <ul>
            <li>Maximum file size: 10MB</li>
            <li>Maximum records: 1000 jobs</li>
          </ul>

          <h3>Required Columns</h3>
          <ul>
            <li>Client Name</li>
            <li>Job Title</li>
            <li>Start Date</li>
            <li>Description (optional)</li>
            <li>Property Address (optional)</li>
          </ul>

          <div class="template-download">
            <mat-icon>download</mat-icon>
            <a href="#">Download template file</a>
          </div>
        </div>

        <div class="upload-section">
          <button mat-stroked-button color="primary" (click)="onFileSelect()">
            <mat-icon>upload_file</mat-icon>
            Select File
          </button>
          <p class="upload-hint">Drag and drop a file here or click to select</p>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" [disabled]="true">
          Import Jobs
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .import-dialog {
      padding: 16px;
      max-width: 500px;
    }

    .import-info {
      margin-bottom: 24px;
    }

    .import-info h3 {
      color: #333;
      font-size: 16px;
      margin: 16px 0 8px;
    }

    .import-info ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    .import-info li {
      margin: 4px 0;
      color: #666;
    }

    .template-download {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 16px;
    }

    .template-download a {
      color: #2196f3;
      text-decoration: none;
    }

    .upload-section {
      border: 2px dashed #ccc;
      border-radius: 4px;
      padding: 24px;
      text-align: center;
      background: #fafafa;
    }

    .upload-hint {
      margin: 8px 0 0;
      color: #666;
      font-size: 14px;
    }

    mat-dialog-actions {
      margin-top: 24px;
    }
  `]
})
export class ImportJobsDialogComponent {
  constructor(private dialogRef: MatDialogRef<ImportJobsDialogComponent>) {}

  onFileSelect() {
    // Implement file selection logic
  }

  onCancel() {
    this.dialogRef.close();
  }
}