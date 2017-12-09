import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import {SystemComponent} from "./system/system.component";

const appRoutes : Routes = <Routes> [
  {
    path : "",
    component : LoginComponent
  },
  {
    path : "login",
    component : LoginComponent
  },
  {
    path : "home",
    component : HomeComponent
  },
  {
    path : "system",
    component : SystemComponent
  },

];

@NgModule({
  imports : [
    RouterModule.forRoot(appRoutes,{useHash:true})
  ],
  exports: [ RouterModule ]
})

export class AppRouter{}
