import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { SilogtranService } from 'src/app/services/silogtran-service.service';
import { Contenedor } from 'src/app/models/contenedor';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;

  datasource = new MatTableDataSource<Contenedor>();

  contenedorData: Contenedor[] = [];

  constructor(public navService: NavbarService,
    public silogtranService: SilogtranService){}

  ngAfterViewInit(): void {
    this.navService.show();
    this.silogtranService.GetToken().subscribe(res =>{
      this.silogtranService.GetContenedores(res.data.token, {pagina:'1'}).subscribe(x => {
        this.datasource.data = x.data;
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
      });
    });
  }

  columnsToDisplay = ['contenedor_numero', 'contenedor_pesomaximo'];
  // columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  // expandedElement!: Contenedor | null;

}
