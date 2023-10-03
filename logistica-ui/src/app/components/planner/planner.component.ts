import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cliente, ClienteBase } from 'src/app/models/cliente';
import { PlannerInfo } from 'src/app/models/plannerInfo';
import { Rutas } from 'src/app/models/rutas';
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
  clientList: Cliente[] = [];
  rutaList: Rutas[] = [];

  list = ["Hola","Adrin","Pepe"];
  selectedClients = this.clientList;
  selectedRutas = this.rutaList;
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
        console.log(x.data);
        
        this.spinner.hide();
      });
    });
  }

  onClick(){
    this.data.placa= this.plannerForm.value.placa;
    this.data.arrastre= this.plannerForm.value.arrastre;
    console.log(this.plannerForm.value);
    
  }

  onKey(event:Event, type:string) { 
    const filterValue = (event.target as HTMLInputElement).value;
    var search = this.search(filterValue, type);
    }

    search(value: string, type:string) { 
      let filter = value.toLowerCase();

      switch (type){
        case 'rutas':{
          this.selectedRutas = this.rutaList.filter(option => option.ciudad_origen.nombre.toLowerCase().startsWith(filter) || option.ciudad_destino.nombre.toLocaleLowerCase().startsWith(filter));
          return;
        }

        case 'clientes':{
          this.selectedClients = this.clientList.filter(option => option.cliente_nombre.toLowerCase().startsWith(filter));
          return
        }

        default:{
          return this.clientList;
        }
      }
    }
}
