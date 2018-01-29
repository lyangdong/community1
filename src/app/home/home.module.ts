import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {CKEditorModule } from 'ng2-ckeditor';


import { HomeRouter } from './home.routes';

import { HomeComponent } from './home.component';
import { TempletComponent } from './templet/templet.component';
import { ContentComponent } from './content/content.component';
import { ChannelComponent } from './channel/channel.component';
import { ClassifyComponent } from './classify/classify.component';
import { MenuAsideComponent } from './menu-aside/menu-aside.component';
import { ChildChannelComponent } from './child-channel/child-channel.component';
import { AddContentComponent } from './add-content/add-content.component';
import { ContentModifyComponent } from './content-modify/content-modify.component';
import { ChildChannelAddComponent } from './child-channel-add/child-channel-add.component';
import { ChildChannelModifyComponent } from './child-channel-modify/child-channel-modify.component';
import {HeaderComponent} from "./header/header.component";
import { PropagandaStatisticsComponent } from './propaganda-statistics/propaganda-statistics.component';
import { DeviceComponent } from './device/device.component';
import { TemExampleComponent } from './tem-example/tem-example.component';


@NgModule({
  imports: [
    CommonModule,
    HomeRouter,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
  ],
  declarations: [
    TempletComponent,
    ContentComponent,
    ChannelComponent,
    ClassifyComponent,
    MenuAsideComponent,
    HomeComponent,
    ChildChannelComponent,
    AddContentComponent,
    ContentModifyComponent,
    ChildChannelAddComponent,
    ChildChannelModifyComponent,
    HeaderComponent,
    PropagandaStatisticsComponent,
    DeviceComponent,
    TemExampleComponent,
  ]
})
export class HomeModule { }
