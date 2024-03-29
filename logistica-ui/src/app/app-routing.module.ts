import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PlannerComponent } from './components/planner/planner.component';
import { RestoreComponent } from './components/restore/restore.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { HistoricalComponent } from './components/historical/historical.component';
import { GroupDataComponent } from './components/group-data/group-data.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'restore', component: RestoreComponent},
  {path: 'programacion', component: GroupDataComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user', component: UserComponent},
  {path: 'mantenimiento', component: MaintenanceComponent},
  {path: 'historico', component: HistoricalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
