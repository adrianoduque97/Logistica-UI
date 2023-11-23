import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PlannerInfo } from 'src/app/models/plannerInfo';
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
  plannerColumns = ['Placa', 'Arrastre','Cliente','Ruta','Fecha Inicio', 'Conductor', 'Fecha Fin', 'Estatus'];

  data:PlannerInfo[][] = [];
  dataCreated:Array<PlannerInfo> = new Array;
  historicaqlDataSelected = new MatTableDataSource<PlannerInfo>();

  constructor(public navService: NavbarService){}

  ngOnInit(): void {
    this.navService.show();
  }

  selectPlan(plan:PlannerInfo[]){
    this.historicaqlDataSelected.data = plan;
  }

}
