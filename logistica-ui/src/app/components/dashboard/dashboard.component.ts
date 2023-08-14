import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import {MatTableDataSource} from '@angular/material/table';
import { SilogtranService } from 'src/app/services/silogtran-service.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Trailer } from 'src/app/models/trailer';
import { Vehiculo } from 'src/app/models/vehiculo';
import { MatDialog } from '@angular/material/dialog';
import { ArrastreDialogComponent } from '../dialogs/arrastre-dialog/arrastre-dialog.component';
import { MantenimientoDialogComponent } from '../dialogs/mantenimiento-dialog/mantenimiento-dialog.component';

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
  matenimientoDataSource = new MatTableDataSource<Vehiculo>();
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

      this.silogtranService.GetVehiculos(res.data.token,{pagina:'1'}).subscribe(x=>{
        console.log(x.data);
        
        this.VehiculosoDataSource.data = x.data;
        this.VehiculosoDataSource.paginator = this.paginatorVehiculos;
        this.VehiculosoDataSource.sort = this.sortVehiculos;            
        this.matenimientoDataSource.data = x.data;
        this.matenimientoDataSource.paginator = this.paginatorMantenimientos;
        this.matenimientoDataSource.sort = this.sortMant;
      });
    });
  }

  trailersColumns = ['trailer_placa', 'tipo_equipo','tipo_trailer','trailer_modelo','estado', 'detalles'];
  mantenimientosColumns = ['placa', 'vigencia_revision','detalles'];
  vehiculosColumns = ['placa', 'tipo', 'modelo', 'capacidad', 'ejes', 'detalles']

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.trailerDataSource.filter = filterValue.trim();
  }

  OpenCabezalDialog(vehiculo: Vehiculo) {
    const dialogRef = this.dialog.open(ArrastreDialogComponent,{
      data:{
        Placa: vehiculo.vehiculo_placa,
        Peso_Bruto: vehiculo.vehiculo_pesobruto,
        Peso_Vacio: vehiculo.vehiculo_pesovacio,
        Alto: vehiculo.vehiculo_alto,
        Largo: vehiculo.vehiculo_largo,
        Ancho: vehiculo.vehiculo_ancho,
        Seguro: vehiculo.vigencia_seguro_obligatorio
      }
    });

    dialogRef.afterClosed().subscribe(res =>{
      console.log(res);
      
    });
  }

  OpenArrastreDialog(trailer: Trailer) {
    const dialogRef = this.dialog.open(ArrastreDialogComponent,{
      data:{
        Placa: trailer.trailer_placa,
        Peso_Vacio: trailer.trailer_pesovacio,
        Peso_Maximo: trailer.trailer_pesomaximo,
        Carroceria: trailer.carroceria?.nombre,
        Matricula: trailer.trailer_matricula,
        Chasis: trailer.trailer_chasis,
        Tarjeta_Pesas: trailer.tarjeta_de_pesas_y_medidas,
        Habilitacion: trailer.certificado_habilitacion
      }
    });

    dialogRef.afterClosed().subscribe(res =>{
      console.log(res);
      
    });
  }

  OpenMantenimientoDialog(vehiculo: Vehiculo) {
    const dialogRef = this.dialog.open(MantenimientoDialogComponent,{
      data:{
        placa: vehiculo.vehiculo_placa
      }
    });

    dialogRef.afterClosed().subscribe(res =>{
      console.log(res);
      
    });
  }

}
