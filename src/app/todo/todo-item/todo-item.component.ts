import { Component, inject, input } from '@angular/core';
import { Todo } from '../../models/todo';
import { NgClass } from '@angular/common';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-item',
  imports: [NgClass],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  todo = input.required<Todo>()
  private todoService = inject(TodoService);

  removeTodo(id:string){
    this.todoService.deleteTodo(id).subscribe(
      res => console.log(res)
    )
  }

  markAsComplete(todo:Todo){
    todo.complete()
    this.todoService.updateTodo(todo).subscribe(
      res => console.log(res),
    )
  }
}
