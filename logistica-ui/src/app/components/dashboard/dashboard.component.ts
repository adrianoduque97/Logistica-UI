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
import { ApiService } from 'src/app/services/api-service.service';
import { PlannerRequest } from 'src/app/models/plannerRequest';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

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
  historicaqlDataSelected: PlannerRequest[] = [];

  today =  new Date();
  lastWeek = new Date(this.today.getFullYear(),this.today.getMonth(),this.today.getDate()-7);
  range = new FormGroup({
    start: new FormControl<Date | null>(this.lastWeek),
    end: new FormControl<Date | null>(this.today),
  });




  constructor(public navService: NavbarService,
    public authService: AuthService,
    public silogtranService: SilogtranService,
    public satControlService: SatcontrolService,
    public spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private loaderService: ScriptLoaderService,
    public apiService: ApiService,) { }

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


        this.apiService.GetPlannerByDateRange(this.lastWeek,this.today).subscribe(x => {
          this.parseDates(x)
          this.historicaqlDataSelected = x
          this.drawTimeline();
          this.spinner.hide();
    
        })
    
      });
    });

  

  }

  trailersColumns = ['trailer_placa', 'tipo_equipo', 'tipo_trailer', 'trailer_modelo', 'estado', 'detalles'];
  mantenimientosColumns = ['placa', 'vigencia_revision', 'detalles'];
  vehiculosColumns = ['placa', 'tipo', 'modelo', 'capacidad', 'ejes', 'detalles']
  enturnamientosColumns = ['placa', 'poseedor', 'detalles'];

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
    this.satControlService.GetZonesByPlateAndDate(vehiculo.vehiculo_placa, startDate, endDate).subscribe(res => {
      const dialogRef = this.dialog.open(EnturnamientosDialogComponent, {
        data: {
          zones: res
        }
      });

      this.spinner.hide();
    });
  }

  parseDates(data: PlannerRequest[]) {
    // data.forEach(obj => {
      data.forEach(p => {
        p.dateCreated = new Date(p.dateCreated ?? "")
        p.inicio = new Date(p.inicio ?? "")
        p.fin = new Date(p.fin ?? "")
      })
    // })
  }

  drawTimeline(){
    this.loaderService.loadChartPackages(this.pks).subscribe(() => {
      
      var options = {
      
        height: 375,
        timeline: { colorByRowLabel: true },
        alternatingRowStyle: false,
        hAxis:{
          // format: 'HH:mm',
          // maxValue: dateL.setDate(dateL.getDate()+1)
        }
      };
      var dataCreated: (string | Date | undefined)[][] =  []
      this.historicaqlDataSelected.forEach( x=> {
        dataCreated.push([x.placa,x.destino,x.inicio,x.fin])
      });

      if (dataCreated.length == 0) dataCreated.push(['SIN DATOS','NO DATA',new Date(),new Date()]);
      var data = google.visualization.arrayToDataTable(dataCreated,true);
      const char = new google.visualization.Timeline(this.containerEl.nativeElement);
      char.draw(data, options)
    });
  }  

  changeDate(startDate: any, endDate: any){
    if(startDate.value && endDate.value)
    {
      this.spinner.show()
      this.apiService.GetPlannerByDateRange(this.range.value.start ?? new Date(), this.range.value.end ?? new Date()).subscribe(x => {
      this.parseDates(x)
      this.historicaqlDataSelected = x
      this.drawTimeline();
      this.spinner.hide();

    })
  }
  }

}
