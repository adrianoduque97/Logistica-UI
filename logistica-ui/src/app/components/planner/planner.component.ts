import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cliente, ClienteBase } from 'src/app/models/cliente';
import { PlannerInfo } from 'src/app/models/plannerInfo';
import { Rutas } from 'src/app/models/rutas';
import { Trailer } from 'src/app/models/trailer';
import { Vehiculo } from 'src/app/models/vehiculo';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { SilogtranService } from 'src/app/services/silogtran-service.service';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {
  plannerForm: FormGroup;
  data:PlannerInfo = new PlannerInfo();

  // Data objects
  clientList: Cliente[] = [];
  rutaList: Rutas[] = [];
  arrastresList: Trailer[] = [];
  vehiculosList: Vehiculo[]=[];

  // List for selected information
  selectedClients = this.clientList;
  selectedRutas = this.rutaList;
  selectedArrastres = this.arrastresList;
  selectedVehiculos = this.vehiculosList;

  constructor(public navService: NavbarService, 
              public authService: AuthService, 
              public silogtranService: SilogtranService,
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
      });

      this.silogtranService.GetVehiculos(res.data.token, { estado: '19' }).subscribe(x => {
        console.log(x.data);
        this.vehiculosList = x.data;
        this.selectedVehiculos = this.vehiculosList;
        this.spinner.hide();
      });

    });
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
    this.data.fin = addHours(this.data.fecha,duracionViaje)
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

        default:{
          return this.clientList;
        }
      }
    }
}

function addHours(date?: Date, hours?:number):Date {
  date?.setTime(date?.getTime() + (hours??0) * 60 * 60 * 1000);

  return date??new Date();
}
