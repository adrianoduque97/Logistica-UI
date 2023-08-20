import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mantenimiento } from 'src/app/models/mantenimiento';
import { SilogtranService } from 'src/app/services/silogtran-service.service';

@Component({
  selector: 'app-mantenimiento-dialog',
  templateUrl: './mantenimiento-dialog.component.html',
  styleUrls: ['./mantenimiento-dialog.component.css']
})
export class MantenimientoDialogComponent {

  @ViewChild('paginator', {static: true}) paginator!: MatPaginator;
  @ViewChild('sort', {static: true}) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  mantenimientoInfo = new MatTableDataSource<Mantenimiento>();


  constructor(public dialogRef: MatDialogRef<MantenimientoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public silogtranService: SilogtranService){
      console.log(data.placa);

      this.silogtranService.GetToken().subscribe(res =>{
        this.silogtranService.GetMantenimientos(res.data.token, {equipo:data.placa}).subscribe(x =>{
          this.mantenimientoInfo.data = x.data.sort((a,b) => a.fecha_inicio?.localeCompare(b.fecha_inicio));
          this.mantenimientoInfo.sort = this.sort;
          this.mantenimientoInfo.paginator = this.paginator
        });
      });      
    }

    mantenimientoColumns = ['codigo', 'estado', 'conductor', 'Inicio']
}
