import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { ClassifyComponent } from './classify/classify.component';
import { TempletComponent } from './templet/templet.component';
import { ContentComponent } from './content/content.component';
import { ChannelComponent } from './channel/channel.component';
import { ChildChannelComponent } from './child-channel/child-channel.component';
import { AddContentComponent } from './add-content/add-content.component';
import { ContentModifyComponent } from './content-modify/content-modify.component';
import { ChildChannelAddComponent } from './child-channel-add/child-channel-add.component';
import { ChildChannelModifyComponent } from './child-channel-modify/child-channel-modify.component';
import { PropagandaStatisticsComponent } from './propaganda-statistics/propaganda-statistics.component';

const HomeRoutes : Routes = <Routes> [
  {
    path : 'home',
    component : HomeComponent,
    children : [
      {
        path : '',
        component : PropagandaStatisticsComponent
      }
      ,{
        path : 'classify',
        component : ClassifyComponent
      },
      {
        path : 'propaganda-statistics',
        component : PropagandaStatisticsComponent
      },
      {
        path : 'templet',
        component : TempletComponent
      },{
        path : 'content',
        component : ContentComponent
      },{
        path : 'channel',
        component : ChannelComponent
      },{
        path : 'child-channel/:id',
        component : ChildChannelComponent
      },
      {
        path : 'child-channel-add/:id',
        component : ChildChannelAddComponent
      }
      ,{
        path : 'child-channel-modify/:id/:pid',
        component : ChildChannelModifyComponent
      }
      ,
      {
        path : 'add-content',
        component : AddContentComponent
      },
      {
        path : 'content-modify/:id',
        component : ContentModifyComponent
      },
    ]
  }
];


@NgModule({
  imports : [RouterModule.forChild(HomeRoutes)],
  exports: [ RouterModule ]
})

export class HomeRouter{ }
