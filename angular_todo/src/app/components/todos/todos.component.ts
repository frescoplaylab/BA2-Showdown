import { TODO } from './../../models/todo';
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { environment } from '../../../environments/environment';
// import { trigger, transition, style, animate, query, stagger, animateChild  } from '@angular/animations';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
    title = 'My Todo App';
    resetInput = '';
    todos: TODO[];
    constructor(
        private todoService: TodoService
    ) { }
    // todos = [
    //     {
    //       'title': 'coffee',
    //       'description': 'todo description',
    //       'isCompleted': true,
    //       'createdAt': '2018-06-14T14:21:10.909Z',
    //       'updatedAt': '2018-06-14T14:21:10.909Z',
    //       'id': 22
    //     },
    //     {
    //       'title': 'dc',
    //       'createdAt': '2018-06-14T17:45:56.814Z',
    //       'updatedAt': '2018-06-14T17:45:56.814Z',
    //       'id': 23
    //     },
    //     {
    //       'title': 'asd',
    //       'createdAt': '2018-06-14T17:46:18.260Z',
    //       'updatedAt': '2018-06-14T17:46:18.260Z',
    //       'id': 24
    //     },
    //     {
    //       'title': 'asdfsf',
    //       'createdAt': '2018-06-14T17:50:57.442Z',
    //       'updatedAt': '2018-06-14T17:50:57.442Z',
    //       'id': 25
    //     }
    //   ];

    ngOnInit() {
        this.getTodos();
    }

    // this code is working. don't kknow how. dont change this.
    getTodos() {
        this.todoService.getList()
            .subscribe(todosList => {
                this.todos = todosList;
                console.log('Fetched Todos', this.todos);
            } );
    }
    addNewTodo(title: string) {
        if (!title) { return; }
        const isCompleted = false;
        console.log('addNewTodo', title);
        this.resetInput = '';
        this.todoService.addNewTodo( {title, isCompleted} as TODO )
                        .subscribe(newTodoList => this.todos.push(newTodoList));
    }
    // sendUpdatedTask(editedTask: TODO) {
    //     this.todoService.updateTodo(editedTask as TODO)
    //                     .subscribe( updatedTodo => {
    //                         const index = this.todos.findIndex(todo => todo.id === updatedTodo[0].id);
    //                         this.todos[index] = updatedTodo[0];
    //                         console.log('editedTask', updatedTodo[0]);
    //                         console.log('updatedTodos', this.todos);
    //                     });
    // }
    deleteTodo(id) {
        this.todoService.deleteTodo(id)
                        // .subscribe(response => console.log('response', response));
                        .subscribe ( response => {
                            const index = this.todos.findIndex(todo => todo.id === id );
                            this.todos.splice(index, 1);
                            // console.log(`index ${index}`);
                            }
                        );
    }
}
