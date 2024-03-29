import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MAT_DATE_LOCALE } from '@angular/material/core'

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
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
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
import { EnturnamientosDialogComponent } from './components/dialogs/enturnamientos-dialog/enturnamientos-dialog.component';
import { UserComponent } from './components/user/user.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { HistoricalComponent } from './components/historical/historical.component';
import { GroupDataComponent } from './components/group-data/group-data.component';



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
    GPSDialogComponent,
    EnturnamientosDialogComponent,
    UserComponent,
    MaintenanceComponent,
    HistoricalComponent,
    GroupDataComponent
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
    MatMenuModule,
    NgxSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatListModule,
    MatTabsModule,
    MatTooltipModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    GoogleChartsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ApiService, AuthService, NavbarService,  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
