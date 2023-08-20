import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mantenimiento } from 'src/app/models/mantenimiento';
import { SilogtranService } from 'src/app/services/silogtran-service.service';
import { MantenimientoDialogComponent } from '../mantenimiento-dialog/mantenimiento-dialog.component';

@Component({
  selector: 'app-enturnamientos-dialog',
  templateUrl: './enturnamientos-dialog.component.html',
  styleUrls: ['./enturnamientos-dialog.component.css']
})
export class EnturnamientosDialogComponent {

  @ViewChild('paginator', {static: true}) paginator!: MatPaginator;
  @ViewChild('sort', {static: true}) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  zoneInfo = new MatTableDataSource<Mantenimiento>();


  constructor(public dialogRef: MatDialogRef<MantenimientoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public silogtranService: SilogtranService){
          this.zoneInfo.data = data.zones;
          this.zoneInfo.sort = this.sort;
          this.zoneInfo.paginator = this.paginator   
    }


  enturnamientoColumns = ['Id', 'nombre','dateIn', 'dateOut', 'location']
}
