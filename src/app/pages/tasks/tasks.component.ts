import { Component, OnInit, ViewChild } from '@angular/core';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  @ViewChild("addTask") AddTask!: AddTaskComponent;
  @ViewChild("editTask") EditTask!: EditTaskComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
