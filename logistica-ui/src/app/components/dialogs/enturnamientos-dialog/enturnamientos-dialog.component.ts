import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SilogtranService } from 'src/app/services/silogtran-service.service';
import { Zona } from 'src/app/models/zona';

@Component({
  selector: 'app-enturnamientos-dialog',
  templateUrl: './enturnamientos-dialog.component.html',
  styleUrls: ['./enturnamientos-dialog.component.css']
})
export class EnturnamientosDialogComponent implements AfterViewInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort', {static: true}) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  zoneInfo = new MatTableDataSource<Zona>();


  constructor(public dialogRef: MatDialogRef<EnturnamientosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public silogtranService: SilogtranService){
          this.zoneInfo.data = data.zones;
          this.zoneInfo.sort = this.sort;
    }

    ngAfterViewInit() {
      this.zoneInfo.paginator = this.paginator
  }
  enturnamientoColumns = ['Id', 'nombre','dateIn', 'dateOut', 'location']
}
