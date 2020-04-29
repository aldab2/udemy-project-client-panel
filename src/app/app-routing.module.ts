import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';

import {AuthGuard} from './guards/auth.gaurds'
import { RegisterGaurd } from './guards/register.gaurd';

const routes: Routes = [
  {path : "" , redirectTo : "dashboard" , pathMatch : "full"},
  {path : "dashboard" , component : DashboardComponent, canActivate: [AuthGuard]},
  {path : "login" , component : LoginComponent},
  {path : "register" , component : RegisterComponent, canActivate: [RegisterGaurd]},
  {path : "client/add" , component : AddClientComponent, canActivate: [AuthGuard]},
  {path : "client/edit/:id" , component : EditClientComponent, canActivate: [AuthGuard]},
  {path : "client/:id" , component : ClientDetailsComponent, canActivate: [AuthGuard]},
  {path : "settings" , component : SettingsComponent, canActivate: [AuthGuard]},
  {path : "**" , component : NotFoundComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [AuthGuard,RegisterGaurd]
})
export class AppRoutingModule { }
