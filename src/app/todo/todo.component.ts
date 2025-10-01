import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoService } from './todo.service';
import { Todo } from '../models/todo';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [HeaderComponent, TodoItemComponent, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  private todoService = inject(TodoService);
  todoForm!:FormGroup

  ngOnInit(): void {
    this.todoForm = new FormGroup({
      "title": new FormControl('', [Validators.required])
    })

    this.todoService.getTodos().subscribe({
      next: (res: Todo[]) =>
        (this.todos = res.map(
          (item) => new Todo(item.id, item.title, item.isComplete)
        )),
    });
  }

  createTodo(title:string){
    this.todoService.addTodos(title).subscribe(
      ({id}) => {
        const todoItem = new Todo(id,title,false);
      },
    )
  }

  onSubmit(){
    if(this.todoForm.invalid) return;
    this.createTodo(this.todoForm.value.title)
    this.todoForm.reset()
  }
}
