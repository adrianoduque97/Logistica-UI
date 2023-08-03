import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import {MatTableModule} from '@angular/material/table';
import { SilogtranService } from 'src/app/services/silogtran-service.service';
import { Contenedor } from 'src/app/models/contenedor';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

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
export class DashboardComponent implements OnInit {

  contenedorData: Contenedor[] = [];

  constructor(public navService: NavbarService,
    public silogtranService: SilogtranService){}

  ngOnInit(): void {
    this.navService.show();
    this.silogtranService.GetToken().subscribe(res =>{
      this.silogtranService.GetContenedores(res.data.token, {pagina:'1'}).subscribe(x => {this.contenedorData = x.data});
    });
  }

  columnsToDisplay = ['contenedor_numero', 'contenedor_pesomaximo'];
  // columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  // expandedElement!: Contenedor | null;

}
