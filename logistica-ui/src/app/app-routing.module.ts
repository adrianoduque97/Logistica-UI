import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PlannerComponent } from './components/planner/planner.component';
import { RestoreComponent } from './components/restore/restore.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'restore', component: RestoreComponent},
  {path: 'planner', component: PlannerComponent},
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
