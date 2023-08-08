import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { SatcontrolService } from 'src/app/services/satcontrol.service';
import { SilogtranService } from 'src/app/services/silogtran-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    public navService: NavbarService,
    public silogtranService: SilogtranService,
    public satControlService: SatcontrolService
  ){}


  submitReq(){

    this.satControlService.GetMobileList().subscribe(data =>{
      console.log(data);
      
    });
    

    // this.silogtranService.GetToken().subscribe(res => {
    //   console.log(res.data.token)

    //   this.silogtranService.GetTrailers(res.data.token,{placa:'CR0353'}).subscribe(x => console.log(x))

    //   this.silogtranService.GetVehiculos(res.data.token,{placa:'SNB266'}).subscribe(x => {console.log(x);
    //   });

    //   this.silogtranService.GetRutas(res.data.token, {origen:'quito'}).subscribe(x => {console.log(x);});

    //   this.silogtranService.GetContenedores(res.data.token, {pagina:'1'}).subscribe(x => {console.log(x);});
      
    // })
  }

}
