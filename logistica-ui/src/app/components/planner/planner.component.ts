import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cliente } from 'src/app/models/cliente';
import { Conductor } from 'src/app/models/conductor';
import { estatus } from 'src/app/models/estatus';
import { PlannerInfo } from 'src/app/models/plannerInfo';
import { Rutas } from 'src/app/models/rutas';
import { Trailer } from 'src/app/models/trailer';
import { Vehiculo } from 'src/app/models/vehiculo';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { SatcontrolService } from 'src/app/services/satcontrol.service';
import { SilogtranService } from 'src/app/services/silogtran-service.service';
import { DetailsDialogComponent } from '../dialogs/details-dialog/details-dialog.component';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {

  // planner table
  @ViewChild('paginatorPlanner', { static: true }) paginatorPlanner!: MatPaginator;
  @ViewChild('sortPlanner', { static: true }) sortPlanner!: MatSort;
  @ViewChild('filterPlanner', { static: true }) filterPlanner!: ElementRef;
  plannerColumns = ['Placa', 'Arrastre','Cliente','Ruta','Fecha Inicio', 'Conductor', 'Fecha Fin', 'Estatus'];

  
  plannerForm: FormGroup;
  data:PlannerInfo = new PlannerInfo();
  dataCreated:Array<PlannerInfo> = new Array;
  plannerDataCreated = new MatTableDataSource<PlannerInfo>();

  // Data objects
  clientList: Cliente[] = [];
  rutaList: Rutas[] = [];
  arrastresList: Trailer[] = [];
  vehiculosList: Vehiculo[]=[];
  conductoresList:Conductor[] = [];

  // List for selected information
  selectedClients = this.clientList;
  selectedRutas = this.rutaList;
  selectedArrastres = this.arrastresList;
  selectedVehiculos = this.vehiculosList;
  selectedConductores = this.conductoresList;

  //dummy data
  notAvailableVehiculo = {} as Vehiculo;
  notAvailabletrailer = {} as Trailer;

  duracion = 0;
  fechaFin = new Date();

  constructor(public navService: NavbarService, 
              public authService: AuthService, 
              public silogtranService: SilogtranService,
              public satControlService: SatcontrolService,
              private dialog: MatDialog,
              public spinner: NgxSpinnerService, ){

    this.plannerForm = new FormGroup({
      placa: new FormControl('', Validators.required),
      arrastre:new FormControl('', Validators.required),
      cliente:new FormControl('', Validators.required),
      ruta:new FormControl('', Validators.required),
      fecha:new FormControl<Date|null>(null, Validators.required),
      conductor:new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.navService.show();
    this.data={};
    this.silogtranService.GetToken().subscribe(res => {
      this.silogtranService.GetClientes(res.data.token, { estado: '4' }).subscribe(x => {
        this.clientList = x.data;
        this.selectedClients = this.clientList;
      });

      this.silogtranService.GetRutas(res.data.token, {estado:'15'}).subscribe( x=>{
        this.rutaList = x.data;
        this.selectedRutas = this.rutaList;        
      });

      this.silogtranService.GetTrailers(res.data.token, { estado: '426' }).subscribe(x => {
        this.arrastresList = x.data;
        this.selectedArrastres = this.arrastresList
        this.notAvailabletrailer.trailer_placa = "POR DEFINIR";
        this.selectedArrastres.push(this.notAvailabletrailer);
      });

      this.silogtranService.GetVehiculos(res.data.token, { estado: '19' }).subscribe(x => {
        this.vehiculosList = x.data;
        this.selectedVehiculos = this.vehiculosList;
        this.notAvailableVehiculo.vehiculo_placa = "POR DEFINIR";
        this.selectedVehiculos.push(this.notAvailableVehiculo);
        this.spinner.hide();
      });

      this.silogtranService.PostConductores(res.data.token, {estado: '1'}).subscribe(x => {
        this.conductoresList = x.data;
        this.selectedConductores = this.conductoresList;
      });
    });
    this.plannerDataCreated.paginator = this.paginatorPlanner;
    this.plannerDataCreated.sort = this.sortPlanner;   
  }

  onClick(){
    this.data.placa= this.plannerForm?.value?.placa;
    this.data.arrastre= this.plannerForm?.value?.arrastre;
    this.data.cliente = this.plannerForm?.value?.cliente;
    this.data.ruta = this.plannerForm?.value?.ruta;
    this.data.fecha = this.plannerForm?.value?.fecha;
    this.data.conductor = this.plannerForm?.value?.conductor;

    var duracionViaje = (this?.data?.ruta?.tiempo??0)/60;
    this.data.duracion = duracionViaje;
    this.duracion = duracionViaje;
    this.data.fin = addHours(this.data.fecha,duracionViaje);
    this.fechaFin =  this.data.fin;
    this.data.estatus = 'PROGRAMADO'

    this.dataCreated.push(this.data);
    this.plannerDataCreated.data = this.dataCreated;    

    setTimeout( () => this.data = new PlannerInfo(), 2000);

    console.log(this.data);
    
  }

  onKey(event:Event, type:string) { 
    const filterValue = (event.target as HTMLInputElement).value;
    var search = this.search(filterValue, type);
    }

    search(value: string, type:string) { 
      let filter = value.toLowerCase();
      switch (type){
        case 'rutas':{
          var spacedRoutes = filter.split(/[\s-]+/);
          this.selectedRutas = spacedRoutes.length > 1 ? this.rutaList.filter(option => option.ciudad_origen.nombre.toLowerCase().includes(spacedRoutes[0]) && option.ciudad_destino.nombre.toLocaleLowerCase().includes(spacedRoutes[1])) : this.rutaList.filter(option => option.ciudad_origen.nombre.toLowerCase().includes(filter) || option.ciudad_destino.nombre.toLocaleLowerCase().includes(filter));
          return;
        }

        case 'clientes':{
          this.selectedClients = this.clientList.filter(option => option.cliente_nombre.toLowerCase().includes(filter));
          return
        }

        case 'arrastres':{
          this.selectedArrastres = this.arrastresList.filter(option => option.trailer_placa.toLowerCase().includes(filter));
          return
        }

        case 'vehiculos':{
          this.selectedVehiculos = this.vehiculosList.filter(option => option.vehiculo_placa.toLowerCase().includes(filter));
          return
        }

        case 'conductores':{
          this.selectedConductores = this.conductoresList.filter(option => option.nombre_completo.toLowerCase().includes(filter));
          return
        }

        default:{
          return this.clientList;
        }
      }
    }

    OpenGPSDialog(placa: string) {
      this.spinner.show();
      this.satControlService.GetHistoryByPlate(placa).subscribe(res => {
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
}

function addHours(date?: Date, hours?:number):Date {
  var dateTemp = new Date(date as Date);
  dateTemp?.setTime(dateTemp?.getTime() + (hours??0) * 60 * 60 * 1000);

  return dateTemp??new Date();
}
