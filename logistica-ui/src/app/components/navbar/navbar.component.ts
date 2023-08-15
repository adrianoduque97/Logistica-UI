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
}
