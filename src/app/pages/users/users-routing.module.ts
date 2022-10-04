import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { DetailsUsersComponent } from './details-users/details-users.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListUsersComponent
      },
      {
        path: 'create-users',
        component: AddUsersComponent
      },
      {
        //path: 'details-users',
        path: 'details-users/:userName',
        component: DetailsUsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
