import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { TodoService } from './todo.service';
import { TODO } from '../models/todo';

describe('TodoService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let todoService: TodoService;

  // beforeEach(async() => {
  //   TestBed.configureTestingModule({
  //     imports: [HttpClientTestingModule],
  //     providers: [TodoService]
  //   })
  //   .compileComponents();

  //   httpClient = TestBed.get(HttpClient);
  //   httpTestingController = TestBed.get(HttpTestingController);
  //   todoService = TestBed.get(TodoService);
  // });

  // afterEach(() => {
  //   httpTestingController.verify();
  // });

  describe('#getList()', () => {
      beforeEach(async() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [TodoService]
        })
        .compileComponents();

        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        todoService = TestBed.get(TodoService);
      });

      afterEach(() => {
        httpTestingController.verify();
      });

      it('should return expected todos', () => {
        const expectedTodos: TODO[] =
        [
          {
            'title': 'coffee',
            'description': 'todo description',
            'isCompleted': true,
            'createdAt': '2018-06-14T14:21:10.909Z',
            'updatedAt': '2018-06-14T14:21:10.909Z',
            'id': 22
          }
        ];

        todoService.getList().subscribe(
          data => expect(data).toEqual(expectedTodos, 'should return list'),
          fail
        );

        const req = httpTestingController.expectOne(todoService.baseUrl);
        expect(req.request.method).toEqual('GET');
        req.flush(expectedTodos);
      });

      it('should be OK returning no todos', () => {
        todoService.getList().subscribe(
            data => expect(data.length).toEqual(0)
        );

        const req = httpTestingController.expectOne(todoService.baseUrl);
        req.flush([]);
      });

      // it('should turn 404 into empty todos result', () => {
      //    todoService.getList().subscribe(
      //      data => expect(data.length).toEqual(0)
      //    );
      //
      //    const req = httpTestingController.expectOne(todoService.baseUrl);
      //    const msg = 'deliberate 404 error';
      //    req.flush(msg, {status: 404, statusText: 'Not Found'});
      // });
  });

  describe('#updateTodo', () => {
    let updateTodo: TODO;
    let updateUrl: string;
    beforeEach(async() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [TodoService]
      })
      .compileComponents();

      httpClient = TestBed.get(HttpClient);
      httpTestingController = TestBed.get(HttpTestingController);
      todoService = TestBed.get(TodoService);
      updateTodo = {
        'title': 'coffee',
        'description': 'todo description',
        'isCompleted': true,
        'createdAt': '2018-06-14T14:21:10.909Z',
        'updatedAt': '2018-06-14T14:21:10.909Z',
        'id': 22
      };
      updateUrl = `${todoService.baseUrl}/${updateTodo.id}`;
    });

    afterEach(() => {
      httpTestingController.verify();
    });
    it('should mkae PUT request', () => {
        // the function should return updated todo
        todoService.updateTodo(updateTodo).subscribe();
            // data => expect(data).toBe(updateTodo, 'should return updatedTodo'),
            // fail
        // );

        // the function should make one request to PUT todo
        const req = httpTestingController.expectOne(updateUrl);
        expect(req.request.method).toEqual('PUT');
        req.flush(updateTodo);
        // expect(req.request.body).toEqual(updateTodo);

        // const expectedResponse = new HttpResponse({status: 200, statusText: 'OK', body: updateTodo});
        // req.event(expectedResponse);
     });
  });
  describe('#addNewTodo', () => {
    beforeEach(async() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [TodoService]
      })
      .compileComponents();

      httpClient = TestBed.get(HttpClient);
      httpTestingController = TestBed.get(HttpTestingController);
      todoService = TestBed.get(TodoService);
    });

    afterEach(() => {
      httpTestingController.verify();
    });

    it('should make POST request', () => {
      const expectedTodos: TODO[] =
      [
        {
          'title': 'coffee',
          'description': 'todo description',
          'isCompleted': true,
          'createdAt': '2018-06-14T14:21:10.909Z',
          'updatedAt': '2018-06-14T14:21:10.909Z',
          'id': 22,
        }
      ];
      todoService.addNewTodo(expectedTodos).subscribe();

      const req = httpTestingController.expectOne(todoService.baseUrl);
      expect(req.request.method).toBe('POST');
      req.flush(expectedTodos);
    });
  });
  describe('#deleteTodo', () => {
    beforeEach(async() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [TodoService]
      })
      .compileComponents();

      httpClient = TestBed.get(HttpClient);
      httpTestingController = TestBed.get(HttpTestingController);
      todoService = TestBed.get(TodoService);
    });

    afterEach(() => {
      httpTestingController.verify();
    });

    it('should make DELETE request', () => {
      const expectedTodos: TODO = {
          'title': 'coffee',
          'description': 'todo description',
          'isCompleted': true,
          'createdAt': '2018-06-14T14:21:10.909Z',
          'updatedAt': '2018-06-14T14:21:10.909Z',
          'id': 22,
      };
      const deleteUrl = `${todoService.baseUrl}/${expectedTodos.id}`;
      todoService.deleteTodo(expectedTodos.id).subscribe();

      const req = httpTestingController.expectOne(deleteUrl);
      expect(req.request.method).toBe('DELETE');
      req.flush(expectedTodos);
    });
  });
});
