import { Component, OnInit } from '@angular/core';
import * as data from '../../shared/data/todo/todo';
import { ToastrService } from 'ngx-toastr';
import { NgbDateStruct, NgbDate, NgbCalendar, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import { TodoService } from '../../shared/services/todo.service';

export interface Task {
  id?: any;
  title: string
  completed: boolean
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  public text!: string;
  public todos: Task[] = [];
  public completed!: boolean;
  public red_border: boolean = false;
  public visible!: boolean

  // Validation
  public validate = false;

  // Ng Date Picker
  model!: NgbDateStruct;
  date!: { year: number, month: number };
  modelDisabled!: NgbDateStruct;
  disabled = true;
  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';
  hoveredDate!: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  modelFooter!: NgbDateStruct;
  today = this.calendar.getToday();

  // Ng Select
  public defaultBindingsList = [
    { value: "1", label: "Alabama", job: "Developer" },
    { value: "2", label: "Wyoming", job: "Developer" },
    { value: "3", label: "Coming", job: "Designer",disabled:true },
    { value: "4", label: "Hanry Die", job: "Designer" },
    { value: "5", label: "John Doe", job: "Designer" },
  ];

  public disable: boolean = false
  public selectedCity!: string;
  public selectedCity1!: string;
  public selectedCities: string[]=[];
  public selectedCitiesOutline: string[]=[];
  public selectGroupBy!: string;
  public multipleSelectedCity!: string[];
  public multipleSelectedCity1!: string[];
  public rtl!: string[];
  public dropdowns=[
    {
      buttonColor:"primary",
      defaultBindingsList:this.defaultBindingsList
    },
    {
      buttonColor:"secondary",
      defaultBindingsList:this.defaultBindingsList
    },
    {
      buttonColor:"success",
      defaultBindingsList:this.defaultBindingsList
    },
    {
      buttonColor:"info",
      defaultBindingsList:this.defaultBindingsList
    },
    {
      buttonColor:"warning",
      defaultBindingsList:this.defaultBindingsList
    },
    {
      buttonColor:"inverse",
      defaultBindingsList:this.defaultBindingsList
    },
  ];

  constructor(private toastService: ToastrService, private calendar: NgbCalendar, private todoService: TodoService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todoService.getAllTodos().subscribe(
      (data: any) => {
        this.todos = data;
      },
      (error: any) => {
      }
    );
  }

  // date picker
  isDisabled = (date: NgbDate, current: {month: number}) => date.month !== current.month;
  isWeekend = (date: NgbDate) =>  this.calendar.getWeekday(date) >= 6;

  public addTask(text: any) {
    if (!text) {
      this.red_border = true;
      return
    }
    let task = { title: text, completed: false }
    /*this.todoService.createTodo(task).subscribe(
      (data: any) => {
        this.text = '';
        this.red_border = false;
        this.toastService.success(`${data.message}`);
        this.getAllTodos();
      },
      (error: any) => {
        this.toastService.error('Something went wrong', 'Error');
      }
    );*/
  }

  public taskCompleted(task: any) {
    /*task.completed = !task.completed;
    this.todoService.updateTodo(task.id, task).subscribe(
      (data: any) => {
        this.toastService.success(`${data.message}`);
        this.getAllTodos();
      },
      (error: any) => {
        this.toastService.error('Mark as Incomplete');
      }
    );*/
  }

  public taskDeleted(id: number) {
    /*this.todoService.deleteTodo(id).subscribe(
      (data: any) => {
        this.toastService.success(`${data.message}`);
        this.getAllTodos();
      },
      (error: any) => {
        this.toastService.error('Something went wrong', 'Error');
      }
    );*/
  }

  public markAllAction(action: any) {
    /*this.todos.forEach(element => {
      element.completed = action;
    });*/
    /*this.todos.filter(task => {
      task.completed = action;
      const data: Task = {
        title: task.title,
        completed: task.completed
      }
      this.todoService.updateTodo(task.id, data).subscribe(
        (data: any) => {
          //this.toastService.success(`${data.message}`);
          this.getAllTodos();
        },
        (error: any) => {
          this.toastService.error('Something went wrong', 'Error');
        }
      );
    })*/
    /*this.completed = action;
    action ? this.toastService.success('All tasks are completed') : this.toastService.success('All tasks are incomplete');*/
    //this.toastService.error("All Task as Incomplete")
    //action ? this.toastService.success("All Task as Completed") : this.toastService.error("All Task as Incompleted")
  }

  public submit() {
    this.validate = !this.validate;
  }
}
