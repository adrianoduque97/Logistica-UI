import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  plannerColumns = ['Placa', 'Arrastre','Cliente','Ruta','Fecha Inicio', 'Conductor', 'Fecha Fin', 'Estatus', 'Editar', 'Eliminar'];

  data:PlannerRequest[] = [];
  historicaqlDataSelected = new MatTableDataSource<PlannerRequest>();

  today =  new Date();
  lastWeek = new Date(this.today.getFullYear(),this.today.getMonth(),this.today.getDate()-7);
  range = new FormGroup({
    start: new FormControl<Date | null>(this.lastWeek),
    end: new FormControl<Date | null>(this.today),
  });


  constructor(public navService: NavbarService,
              public apiService: ApiService,
              public spinner: NgxSpinnerService,){}

  ngOnInit(): void {
    this.navService.show();
    this.spinner.show();
    this.apiService.GetPlannerByDateRange(this.lastWeek,this.today).subscribe( x=> {
      this.parseDates(x)
      this.historicaqlDataSelected.data = x
      this.spinner.hide();
    });
    this.historicaqlDataSelected.paginator = this.paginatorHistorcial;
  }

  editPlan(plan:PlannerRequest){
    console.log(plan);
    
  }

  deletePlan(plan:PlannerRequest){
    this.spinner.show();
    this.apiService.DeletePlan(plan?.partitionKey??"").subscribe( x=>{
      
      this.historicaqlDataSelected.data = this.historicaqlDataSelected.data.filter( x => x.partitionKey != plan.partitionKey)
      this.spinner.hide();
      
    });
    
  }

  parseDates(data:PlannerRequest[]){
    data.forEach(obj =>{
        obj.dateCreated = new Date(obj.dateCreated??"")
        obj.inicio =  new Date(obj.inicio??"")
        obj.fin = new Date(obj.fin??"")
    })
  }

  changeDate(startDate: any, endDate: any){
    if(startDate.value && endDate.value)
    {
      this.spinner.show()
      this.apiService.GetPlannerByDateRange(this.range.value.start ?? new Date(), this.range.value.end ?? new Date()).subscribe(x => {
      this.parseDates(x)
      console.log(x);
      this.historicaqlDataSelected.data = x
      this.spinner.hide();

    })
  }
  }
}

