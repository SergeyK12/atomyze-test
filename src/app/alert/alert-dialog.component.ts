import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
})
export class AlertDialogComponent {
  title: string;
  text: string;
  confirmButtonText = 'OK';
  notButtonText: any = false;

  constructor(
    private dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: {'title': string, text: string, confirmButtonText: string, notButtonText: any },
  ) {
    ({
      title: this.title,
      text: this.text,
      confirmButtonText: this.confirmButtonText,
      notButtonText: this.notButtonText
    } = this.dialogData);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onNot(): void {
    this.dialogRef.close(false);
  }

}
