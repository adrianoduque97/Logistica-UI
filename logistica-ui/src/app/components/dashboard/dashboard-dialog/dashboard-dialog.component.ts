import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard-dialog',
  templateUrl: './dashboard-dialog.component.html',
  styleUrls: ['./dashboard-dialog.component.css']
})
export class DashboardDialogComponent {

  constructor(public dialogRef: MatDialogRef<DashboardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      console.log(data);
      
    }

}
