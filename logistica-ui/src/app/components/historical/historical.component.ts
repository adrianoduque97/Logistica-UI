import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { PlannerInfo } from 'src/app/models/plannerInfo';
import { PlannerRequest } from 'src/app/models/plannerRequest';
import { ApiService } from 'src/app/services/api-service.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.css']
})
export class HistoricalComponent implements OnInit {

  // planner table
  @ViewChild('paginatorHistorical', { static: true }) paginatorHistorcial!: MatPaginator;
  @ViewChild('sortHistorical', { static: true }) sortHistorical!: MatSort;
  @ViewChild('filterHistorical', { static: true }) filterHistorical!: ElementRef;
  plannerColumns = ['Placa', 'Arrastre','Cliente','Ruta','Fecha Inicio', 'Conductor', 'Fecha Fin', 'Estatus', 'Editar'];

  data:PlannerRequest[][] = [];
  historicaqlDataSelected = new MatTableDataSource<PlannerRequest>();

  constructor(public navService: NavbarService,
              public apiService: ApiService,
              public spinner: NgxSpinnerService,){}

  ngOnInit(): void {
    this.navService.show();
    this.spinner.show();
    this.apiService.GetPlanner().subscribe( x=> {
      console.log(x);
      this.parseDates(x)
      this.data = x
      this.spinner.hide();
      
    })
  }

  selectPlan(plan:PlannerRequest[]){
    this.historicaqlDataSelected.data = plan;
  }

  editPlan(plan:PlannerRequest){
    console.log(plan);
    
  }

  parseDates(data:PlannerRequest[][]){
    data.forEach(obj =>{
      obj.forEach(p => {
        p.dateCreated = new Date(p.dateCreated??"")
        p.inicio =  new Date(p.inicio??"")
        p.fin = new Date(p.fin??"")
      })
    })
  }
}

