import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api-service.service';
import { LoginComponent } from './components/login/login.component';
import { RestoreComponent } from './components/restore/restore.component';

// Mat imports
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import { MatTableExporterModule } from 'mat-table-exporter';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

//spinner
import { NgxSpinnerModule } from "ngx-spinner";


// Firebase services + environment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../enviroments/enviroment';
import { PlannerComponent } from './components/planner/planner.component';
import { AuthService } from './services/auth.service';

import { GoogleChartsModule } from 'angular-google-charts';
import { NavbarService } from './services/navbar.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailsDialogComponent } from './components/dialogs/details-dialog/details-dialog.component';
import { MantenimientoDialogComponent } from './components/dialogs/mantenimiento-dialog/mantenimiento-dialog.component';
import { GPSDialogComponent } from './components/dialogs/cabezal-dialog/gps-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RestoreComponent,
    PlannerComponent,
    DashboardComponent,
    DetailsDialogComponent,
    MantenimientoDialogComponent,
    GPSDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    GoogleChartsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatTableExporterModule,
    MatDialogModule,
    MatIconModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ApiService, AuthService, NavbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
