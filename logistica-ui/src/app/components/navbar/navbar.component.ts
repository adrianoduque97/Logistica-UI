import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    public apiService: ApiService,
    public navService: NavbarService,
  ){}


  submitReq(){
    this.apiService.GetViajes().subscribe(res => {
      console.log(res);
    })
  }

}
