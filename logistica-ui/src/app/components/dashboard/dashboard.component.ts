import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { SilogtranService } from 'src/app/services/silogtran-service.service';
import { Contenedor } from 'src/app/models/contenedor';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Trailer } from 'src/app/models/trailer';
import { Mantenimiento } from 'src/app/models/mantenimiento';
import { Vehiculo } from 'src/app/models/vehiculo';
import { MatDialog } from '@angular/material/dialog';
import { DashboardDialogComponent } from './dashboard-dialog/dashboard-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild('paginatorTrailer', {static: true}) paginatorTrailer!: MatPaginator;
  @ViewChild('sortTrailer', {static: true}) sortTrailer!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  @ViewChild('paginatorMant', {static: true}) paginatorMantenimientos!: MatPaginator;
  @ViewChild('sortMant', {static: true}) sortMant!: MatSort;
  @ViewChild('filterMant', {static: true}) filterMant!: ElementRef;

  @ViewChild('paginatorVehiculos', {static: true}) paginatorVehiculos!: MatPaginator;
  @ViewChild('sortVehiculos', {static: true}) sortVehiculos!: MatSort;
  @ViewChild('filterVehiculos', {static: true}) filterVehiculos!: ElementRef;

  trailerDataSource = new MatTableDataSource<Trailer>();
  matenimientoDataSource = new MatTableDataSource<Mantenimiento>();
  VehiculosoDataSource = new MatTableDataSource<Vehiculo>();


  constructor(public navService: NavbarService,
    public silogtranService: SilogtranService,
    private dialog: MatDialog){}

  ngAfterViewInit(): void {
    this.navService.show();
    this.silogtranService.GetToken().subscribe(res =>{
      this.silogtranService.GetTrailers(res.data.token, {pagina:'1'}).subscribe(x => {
        console.log(x.data);
           
        this.trailerDataSource.data = x.data;
        this.trailerDataSource.paginator = this.paginatorTrailer;
        this.trailerDataSource.sort = this.sortTrailer;
      });

      this.silogtranService.GetMantenimientos(res.data.token, {pagina:'1'}).subscribe( x=>{
        console.log(x.data);
        
        this.matenimientoDataSource.data = x.data;
        this.matenimientoDataSource.paginator = this.paginatorMantenimientos;
        this.matenimientoDataSource.sort = this.sortMant;

      });

      this.silogtranService.GetVehiculos(res.data.token,{pagina:'1'}).subscribe(x=>{
        console.log(x.data);
        
        this.VehiculosoDataSource.data = x.data;
        this.VehiculosoDataSource.paginator = this.paginatorVehiculos;
        this.VehiculosoDataSource.sort = this.sortVehiculos;
      });
    });
  }

  trailersColumns = ['trailer_placa', 'tipo_equipo','tipo_trailer','trailer_modelo','trailer_pesovacio','estado'];
  mantenimientosColumns = ['placa', 'estado','inicio','compromiso'];
  vehiculosColumns = ['placa', 'tipo', 'modelo', 'peso', 'capacidad', 'ejes']

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.trailerDataSource.filter = filterValue.trim();
  }

  OpenDialog(vehiculo: Vehiculo) {
    const dialogRef = this.dialog.open(DashboardDialogComponent,{
      data:{
        vehiculo
      }
    });

    dialogRef.afterClosed().subscribe(res =>{
      console.log(res);
      
    });
  }

}
