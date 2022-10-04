import { Injectable } from '@angular/core';
import { Api } from '../../core/http-clients/api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private api: Api, private httpClient: HttpClient) { }

  getAllTodos() {
    return this.api.get('todo/all', {});
  }

  createTodo(todo: any) {
    return this.api.post('todo', todo);
  }

  updateTodo(id: any, todo: any) {
    return this.api.put(`todo/${id}`, todo);
  }

  deleteTodo(id: any) {
    return this.api.delete(`todo`, id);
  }

  getAllEvents() {
    return this.api.get('event/all', {});
  }

  createEvent(event: any) {
    return this.api.post('event', event);
  }

  deleteEvent(id: any) {
    return this.api.delete(`event`, id);
  }

  
}
