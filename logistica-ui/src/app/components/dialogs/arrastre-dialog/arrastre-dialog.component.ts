import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mantenimiento } from 'src/app/models/mantenimiento';
import { SatcontrolService } from 'src/app/services/satcontrol.service';
import { SilogtranService } from 'src/app/services/silogtran-service.service';

@Component({
  selector: 'app-arrastre-dialog',
  templateUrl: './arrastre-dialog.component.html',
  styleUrls: ['./arrastre-dialog.component.css']
})

export class ArrastreDialogComponent {

  constructor(public dialogRef: MatDialogRef<ArrastreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public satcontrolService: SatcontrolService){
    }

}