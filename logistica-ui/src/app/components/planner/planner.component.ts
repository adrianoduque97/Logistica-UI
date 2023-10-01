import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlannerInfo } from 'src/app/models/plannerInfo';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {
  plannerForm: FormGroup;
  data:PlannerInfo = new PlannerInfo();

  list = ["Hola","Adrin","Pepe"];
  selectedlist = this.list;
  constructor(public navService: NavbarService, public authService: AuthService, ){
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
    this.navService.show();
    this.data={}
  }

  onClick(){
    this.data.placa= this.plannerForm.value.placa;
    this.data.arrastre= this.plannerForm.value.arrastre;
  }

  onKey(event:Event) { 
    const filterValue = (event.target as HTMLInputElement).value;
    this.selectedlist = this.search(filterValue);
    }

    search(value: string) { 
      let filter = value.toLowerCase();
      return this.list.filter(option => option.toLowerCase().startsWith(filter));
    }
}
