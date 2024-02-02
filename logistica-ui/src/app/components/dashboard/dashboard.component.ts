import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { SilogtranService } from 'src/app/services/silogtran-service.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Trailer } from 'src/app/models/trailer';
import { Vehiculo } from 'src/app/models/vehiculo';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDialogComponent } from '../dialogs/details-dialog/details-dialog.component';
import { MantenimientoDialogComponent } from '../dialogs/mantenimiento-dialog/mantenimiento-dialog.component';
import { SatcontrolService } from 'src/app/services/satcontrol.service';
import { NgxSpinnerService } from "ngx-spinner";
import { EnturnamientosDialogComponent } from '../dialogs/enturnamientos-dialog/enturnamientos-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { ChartType, ScriptLoaderService, getPackageForChart } from 'angular-google-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class DashboardComponent implements AfterViewInit {

  @ViewChild('paginatorTrailer', { static: true }) paginatorTrailer!: MatPaginator;
  @ViewChild('sortTrailer', { static: true }) sortTrailer!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  @ViewChild('paginatorMant', { static: true }) paginatorMantenimientos!: MatPaginator;
  @ViewChild('sortMant', { static: true }) sortMant!: MatSort;
  @ViewChild('filterMant', { static: true }) filterMant!: ElementRef;

  @ViewChild('paginatorVehiculos', { static: true }) paginatorVehiculos!: MatPaginator;
  @ViewChild('sortVehiculos', { static: true }) sortVehiculos!: MatSort;
  @ViewChild('filterVehiculos', { static: true }) filterVehiculos!: ElementRef;

  @ViewChild('paginatorEnturnamientos', { static: true }) paginatorEnturnamientos!: MatPaginator;
  @ViewChild('sortEnturnamientos', { static: true }) sortEnturnamientos!: MatSort;
  @ViewChild('filterEnturnamientos', { static: true }) filterEnturnamientos!: ElementRef;

  @ViewChild('testGr', { read: ElementRef })
  private containerEl!: ElementRef<HTMLElement>;
  

  trailerDataSource = new MatTableDataSource<Trailer>();
  matenimientoDataSource = new MatTableDataSource<Vehiculo>();
  VehiculosoDataSource = new MatTableDataSource<Vehiculo>();
  EnturnamientosDataSource = new MatTableDataSource<Vehiculo>();

  


  constructor(public navService: NavbarService,
    public authService: AuthService,
    public silogtranService: SilogtranService,
    public satControlService: SatcontrolService,
    public spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private loaderService: ScriptLoaderService) { }

    private readonly pks = getPackageForChart(ChartType.Timeline); 

  ngAfterViewInit(): void {
    this.spinner.show()
    this.navService.show();
    this.silogtranService.GetToken().subscribe(res => {
      this.silogtranService.GetTrailers(res.data.token, { pagina: '1' }).subscribe(x => {
        this.trailerDataSource.data = x.data;
        this.trailerDataSource.paginator = this.paginatorTrailer;
        this.trailerDataSource.sort = this.sortTrailer;
      });

      this.silogtranService.GetVehiculos(res.data.token, { pagina: '1' }).subscribe(x => {
        this.VehiculosoDataSource.data = x.data;
        this.VehiculosoDataSource.paginator = this.paginatorVehiculos;
        this.VehiculosoDataSource.sort = this.sortVehiculos;

        //mantenimientos
        this.matenimientoDataSource.data = x.data;
        this.matenimientoDataSource.paginator = this.paginatorMantenimientos;
        this.matenimientoDataSource.sort = this.sortMant;

        //enturnamientos
        this.EnturnamientosDataSource.data = x.data;
        this.EnturnamientosDataSource.paginator = this.paginatorEnturnamientos;
        this.EnturnamientosDataSource.sort = this.sortEnturnamientos;
        this.spinner.hide();
      });
    });

    this.loaderService.loadChartPackages(this.pks).subscribe( () => {

    var data = new google.visualization.DataTable();
    // data.addColumn('string', 'Task ID');
    // data.addColumn('string', 'Task Name');
    // data.addColumn('date', 'Start Date');
    // data.addColumn('date', 'End Date');
    // data.addColumn('number', 'Duration');
    // data.addColumn('number', 'Percent Complete');
    // data.addColumn('string', 'Dependencies');
    // data.addRows([
    //   ['Research', 'Find sources',
    //    new Date(2015, 0, 1,9), new Date(2015, 0, 5,10), null,  100,  null],
    //   ['Write', 'Write paper',
    //   new Date(2015, 0, 8), new Date(2015, 0, 9), daysToMilliseconds(3), 25, null],
    //   ['Cite', 'Create bibliography',
    //    null, new Date(2015, 0, 7), daysToMilliseconds(1), 20, null],
    //   ['Complete', 'Hand in paper',
    //   new Date(2015, 2, 10), new Date(2015, 2, 12), daysToMilliseconds(1), 0, null],
    //   ['Outline', 'Outline paper',
    //    null, new Date(2015, 0, 6), daysToMilliseconds(1), 100, null]
    // ]);
    var options = {
      height: 375,
      width: 600
    };
    var data = google.visualization.arrayToDataTable([
      ['Activity', 'Start Time', 'End Time'],
      ['Sleep',
       new Date(2014, 10, 15, 0, 30),
       new Date(2014, 10, 15, 6, 30)],
      ['Eat Breakfast',
       new Date(2014, 10, 15, 6, 45),
       new Date(2014, 11, 15, 7)],
      ['Get Ready',
       new Date(2014, 10, 15, 7, 4),
       new Date(2014, 10, 15, 7, 30)],
      ['Commute To Work',
       new Date(2014, 10, 15, 7, 30),
       new Date(2014, 10, 15, 8, 30)],
      ['Work',
       new Date(2014, 10, 15, 8, 30),
       new Date(2014, 10, 15, 17)],
      ['Commute Home',
       new Date(2014, 10,  15, 17),
       new Date(2014, 10,  15, 18)],
      ['Gym',
       new Date(2014, 10, 15, 18),
       new Date(2014, 10,  15, 18, 45)],
      ['Eat Dinner',
       new Date(2014, 10,  15, 19),
       new Date(2014, 10,  15, 20)],
      ['Get Ready For Bed',
       new Date(2014, 10,  15, 21),
       new Date(2014, 10,  15, 22)]
    ]);
    // var options = {
    //   height: 450,
    //   with: 800
    // };
      const char = new google.visualization.Timeline(this.containerEl.nativeElement);
      char.draw(data,options)
      
    });
  }

  trailersColumns = ['trailer_placa', 'tipo_equipo', 'tipo_trailer', 'trailer_modelo', 'estado', 'detalles'];
  mantenimientosColumns = ['placa', 'vigencia_revision', 'detalles'];
  vehiculosColumns = ['placa', 'tipo', 'modelo', 'capacidad', 'ejes', 'detalles']
  enturnamientosColumns = ['placa','poseedor', 'detalles'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.trailerDataSource.filter = filterValue.trim();
  }

  OpenCabezalDialog(vehiculo: Vehiculo) {
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      data: {
        Placa: vehiculo.vehiculo_placa,
        Peso_Bruto: vehiculo.vehiculo_pesobruto,
        Peso_Vacio: vehiculo.vehiculo_pesovacio,
        Alto: vehiculo.vehiculo_alto,
        Largo: vehiculo.vehiculo_largo,
        Ancho: vehiculo.vehiculo_ancho,
        Seguro: vehiculo.vigencia_seguro_obligatorio
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);

    });
  }

  OpenArrastreDialog(trailer: Trailer) {
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      data: {
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

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);

    });
  }

  OpenMantenimientoDialog(vehiculo: Vehiculo) {
    const dialogRef = this.dialog.open(MantenimientoDialogComponent, {
      data: {
        placa: vehiculo.vehiculo_placa
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);

    });
  }

  OpenGPSDialog(vehiculo: Trailer) {
    this.spinner.show();
    this.satControlService.GetHistoryByPlate(vehiculo.trailer_placa).subscribe(res => {
      const dialogRef = this.dialog.open(DetailsDialogComponent, {
        data: {
          Latitud: res?.latitude ?? 0,
          Longitud: res?.longitude,
          Odometro: res?.odometer,
          Localizacion: res?.location,
          Altutud: res?.altitud ?? 0
        }
      });
      this.spinner.hide();

    });
  }

  OpenEnturnamientosDialog(vehiculo: Vehiculo) {
    this.spinner.show();
    var endDate = new Date();
    var startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);
    this.satControlService.GetZonesByPlateAndDate(vehiculo.vehiculo_placa, startDate, endDate).subscribe(res =>{
      const dialogRef = this.dialog.open(EnturnamientosDialogComponent,{
        data:{
          zones: res
        }
      });
    
      this.spinner.hide();      
    });
  }

}
