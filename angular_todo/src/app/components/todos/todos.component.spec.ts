import { TODO } from './../../models/todo';
import { TodoService } from './../../services/todo.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatCheckboxModule, MatButtonModule, MatCardModule, MatListModule} from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';


import { TodoItemComponent } from './../todo-item/todo-item.component';
import { TodosComponent } from './todos.component';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let todoService: TodoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosComponent, TodoItemComponent ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatListModule,
        MatInputModule,
        MatIconModule],
      providers: [ TodoService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    todoService = fixture.debugElement.injector.get(TodoService);
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  // it('should display title in browser', () => {
  //   component.title = 'my val';
  //   const h1El = fixture.debugElement.query(By.css('.h1')).nativeElement;
  //   fixture.detectChanges();
  //   expect(h1El.textContent).toContain('my val');
  // });
  it('should call ngOnInit', () => {
      spyOn(component, 'getTodos');
      component.ngOnInit();
      fixture.detectChanges();

      expect(component.getTodos).toHaveBeenCalled();
  });
  // it('should add a todo', async() => {
  //     spyOn(todoService, 'addNewTodo');
  //     component.addNewTodo('new todo');
  //     fixture.detectChanges();

  //     fixture.whenStable().then(() => {
  //       expect(todoService.addNewTodo).toHaveBeenCalled();
  //     });
  // });
  // it('should fetch todos', () => {
  //   component.addNewTodo('new todo');
  //   fixture.detectChanges();

  //   expect(component.todos.length).toBeGreaterThan(0);
  // });
});
