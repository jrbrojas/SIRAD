import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListProfileComponent } from './list-profile/list-profile.component';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { DetailsProfileComponent } from './details-profile/details-profile.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';

const routes: Routes = [
  {
    path: '',
    //component: ListEmergenciesComponent,
    children: [
      {
        path: '',
        component: ListProfileComponent,
      },
      {
        path: 'create-profile',
        component: AddProfileComponent
      },
      {
        path: 'details-profile/:id',
        component: DetailsProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
