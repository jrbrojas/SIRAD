import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TasksComponent } from './tasks.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

@NgModule({
  declarations: [TasksComponent, AddTaskComponent, EditTaskComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class TasksModule { }
