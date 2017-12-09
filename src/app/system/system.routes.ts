import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import {SystemComponent} from "./system.component";
import { FirstPageComponent } from './first-page/first-page.component';
import { CityComponent } from './city/city.component';
import { ResidentComponent } from './resident/resident.component';
import { RoleComponent } from './role/role.component';
import { AccountComponent } from './account/account.component';
import { AuthorityComponent } from './authority/authority.component';
import { ResidentDetailsComponent } from './resident-details/resident-details.component';

const SystemRoutes : Routes = <Routes> [
  {
    path : 'system',
    component :SystemComponent ,

    children : [
      {
        path : '',
        component : FirstPageComponent
      },
      {
        path : 'first-page',
        component : FirstPageComponent
      },
      {
        path : 'city',
        component : CityComponent
      },
      {
        path : 'resident',
        component : ResidentComponent
      },
      {
        path : 'resident-details/:id',
        component : ResidentDetailsComponent
      },
      {
        path : 'role',
        component : RoleComponent
      },
      {
        path : 'account',
        component : AccountComponent
      },
      {
        path : 'authority',
        component : AuthorityComponent
      },
    ]
  }
];

@NgModule({
  imports : [RouterModule.forChild(SystemRoutes)],
  exports: [ RouterModule ]
})

export class SystemRoute{ }
