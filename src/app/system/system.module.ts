import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {CKEditorModule } from 'ng2-ckeditor';

import { SystemRoute } from './system.routes';

import { HeaderComponent } from './header/header.component';
import {SystemComponent} from './system.component'
import { SystemAsideComponent } from './system-aside/system-aside.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { CityComponent } from './city/city.component';
import { ResidentComponent } from './resident/resident.component';
import { RoleComponent } from './role/role.component';
import { AccountComponent } from './account/account.component';
import { AuthorityComponent } from './authority/authority.component';
import { ResidentDetailsComponent } from './resident-details/resident-details.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    SystemRoute
  ],
  declarations: [
    HeaderComponent,
    SystemComponent,
    SystemAsideComponent,
    FirstPageComponent,
    CityComponent,
    ResidentComponent,
    RoleComponent,
    AccountComponent,
    AuthorityComponent,
    ResidentDetailsComponent
  ]
})
export class SystemModule { }
