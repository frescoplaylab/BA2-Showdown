import { environment } from './../../environments/environment';
import { TODO } from './../models/todo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
    baseUrl = `http://localhost:1337/api/todo`;
    // baseUrl = `http://${environment.hostname}/api/todo`;
    // baseUrl = 'https://742572bb.ngrok.io/todo';
    // baseUrl = 'http://localhost/api';

    constructor(
        private http: HttpClient,
    ) { }

    getList(): Observable<any> {
        // return of(1, 2, 3);   question
        console.log('this.baseUrl', this.baseUrl);
        return this.http.get<TODO[]>(this.baseUrl);
    }

    addNewTodo(title): Observable<TODO> {
        // console.log('addNewTodo', title);
        return this.http.post<TODO>(this.baseUrl, title);
    }

    updateTodo(updatedTask): Observable<TODO> {
        const url = `${this.baseUrl}/${updatedTask.id}`;
        // console.log('updateTodo', updatedTask);
        return this.http.put<TODO>(url, updatedTask);
    }
    deleteTodo(id) {
        // const id = 25;
        const url = `${this.baseUrl}/${id}`;
        // console.log(`deleteTodo of id ${id}`);
        return this.http.delete(url, {observe: 'response'});
    }
}
