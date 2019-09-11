import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoItemComponent } from './todo-item.component';
import { MatCheckboxModule, MatButtonModule, MatCardModule, MatListModule} from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { TODO } from '../../models/todo';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let todoItem: TODO;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoItemComponent ],
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatListModule,
        MatInputModule,
        MatIconModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    todoItem =  {
      'title': 'coffee',
      'description': 'todo description',
      'isCompleted': true,
      'createdAt': '2018-06-14T14:21:10.909Z',
      'updatedAt': '2018-06-14T14:21:10.909Z',
      'id': 22
    };
    component.todoItem = todoItem;
    // fixture.detectChanges();
  });

  // testing @Input()
  describe('@Input', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(TodoItemComponent);
        component = fixture.componentInstance;
        todoItem =  {
          'title': 'coffee',
          'description': 'todo description',
          'isCompleted': true,
          'createdAt': '2018-06-14T14:21:10.909Z',
          'updatedAt': '2018-06-14T14:21:10.909Z',
          'id': 22
        };
        component.todoItem = todoItem;
        fixture.detectChanges();
      });
      it('should display the todo title', () => {
          const titleEl = fixture.debugElement.query(By.css('.display')).nativeElement;

          const expectedTitle = todoItem.title;

          expect(titleEl.textContent).toContain(expectedTitle);
      });
  });

  // testing @output
  describe('@Output', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(TodoItemComponent);
        component = fixture.componentInstance;
        todoItem =  {
          'title': 'coffee',
          'description': 'todo description',
          'isCompleted': true,
          'createdAt': '2018-06-14T14:21:10.909Z',
          'updatedAt': '2018-06-14T14:21:10.909Z',
          'id': 22
        };
        component.todoItem = todoItem;
        fixture.detectChanges();
      });
      it('should emit the event when button is clicked in template', async() => {
        // spyOn takes two arguments, class name and the function/event to be observed
        spyOn(component, 'deleteTodoId').and.callThrough();

        const deleteEl: HTMLElement = fixture.debugElement.query(By.css('.deleteButton')).nativeElement;
        deleteEl.click();

        fixture.whenStable().then(() => {
          expect(component.deleteTodoId.emit).toHaveBeenCalledWith(todoItem.id);
        });
      });
      it('should test the @output event with simple subscribe', async() => {
        component.deleteTodoId.subscribe(selectedTodoID => expect(selectedTodoID).toBe(todoItem.id));
        component.deleteTask();
      });
      it('should fire the @output event emitter when triggering the event', () => {
        component.deleteTodoId.subscribe(selectedTodoID => expect(selectedTodoID).toBe(todoItem.id));
        fixture.debugElement.triggerEventHandler('deleteTodoId', <Event>{});
      });
  });

  // checkbox
  describe('#checkbox', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(TodoItemComponent);
        component = fixture.componentInstance;
        todoItem =  {
          'title': 'coffee',
          'description': 'todo description',
          'isCompleted': true,
          'createdAt': '2018-06-14T14:21:10.909Z',
          'updatedAt': '2018-06-14T14:21:10.909Z',
          'id': 22
        };
        component.todoItem = todoItem;
        // fixture.detectChanges();
      });
      it('should toggle checkbox when toggleCheckbox() is called from class', async() => {
        component.toggleCheckbox();
        fixture.detectChanges();

        expect(component.todoItem.isCompleted).toBeFalsy();
      });
      // on uncommenting this, the code coverage is not generated. this test is passing
      // it('should call toggleCheckbox when checked in browser', () => {
      //     const spy = spyOn(component, 'toggleCheckbox');
      //     const checkboxDe = fixture.debugElement.query(By.css('.example-margin'));
      //     checkboxDe.triggerEventHandler('change', null);
      //     fixture.detectChanges();

      //     expect(component.toggleCheckbox).toHaveBeenCalled()
      // });
  });
  describe('#editButton', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TodoItemComponent);
      component = fixture.componentInstance;
      todoItem =  {
        'title': 'coffee',
        'description': 'todo description',
        'isCompleted': true,
        'createdAt': '2018-06-14T14:21:10.909Z',
        'updatedAt': '2018-06-14T14:21:10.909Z',
        'id': 22
      };
      component.todoItem = todoItem;
      fixture.detectChanges();
    });
    it('should be disabled when todo isCompleted', () => {
        const editButtonEl = fixture.debugElement.query(By.css('.editButton')).nativeElement;
        expect(editButtonEl.disabled).toBeTruthy();
    });
    it('should be enabled when todo is active', () => {
        const editButtonEl = fixture.debugElement.query(By.css('.editButton')).nativeElement;

        component.todoItem.isCompleted = false;
        fixture.detectChanges();

        expect(editButtonEl.disabled).toBeFalsy();
    });
    it('should call toggleEditMode from class', async() => {
        // spyOn takes two arguments, class name and the function/event to be observed
        spyOn(component, 'toggleEditMode');

        component.toggleEditMode();
        fixture.detectChanges();
        expect(component.toggleEditMode).toHaveBeenCalled();
    });
    it('should call toggleEditMode when button is clicked', () => {
        spyOn(component, 'toggleEditMode');
        const editButtonDe = fixture.debugElement.query(By.css('.editButton'));

        editButtonDe.triggerEventHandler('click', null);

        expect(component.toggleEditMode).toHaveBeenCalled();
    });
    it('should change editMode', () => {
        component.editMode = true;

        component.toggleEditMode();
        fixture.detectChanges();

        expect(component.editMode).toBe(false);
    });
  });

  // delete
  describe('#delete', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TodoItemComponent);
      component = fixture.componentInstance;
      todoItem =  {
        'title': 'coffee',
        'description': 'todo description',
        'isCompleted': true,
        'createdAt': '2018-06-14T14:21:10.909Z',
        'updatedAt': '2018-06-14T14:21:10.909Z',
        'id': 22
      };
      component.todoItem = todoItem;
      fixture.detectChanges();
    });
    it('should be enabled when todo is active', () => {
      const deleteBtnEl = fixture.debugElement.query(By.css('.deleteButton')).nativeElement;

      component.todoItem.isCompleted = false;
      fixture.detectChanges();

      expect(deleteBtnEl.disabled).toBeFalsy();
    });
    it('should call function when delete button is clicked', () => {
      spyOn(component, 'deleteTask');
      const deleteBtnDe = fixture.debugElement.query(By.css('.deleteButton'));

      deleteBtnDe.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(component.deleteTask).toHaveBeenCalled();

    });
  });

  // save
  describe('#save', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TodoItemComponent);
      component = fixture.componentInstance;
      todoItem =  {
        'title': 'coffee',
        'description': 'todo description',
        'isCompleted': false,
        'createdAt': '2018-06-14T14:21:10.909Z',
        'updatedAt': '2018-06-14T14:21:10.909Z',
        'id': 22
      };
      component.editMode = true;
      component.todoItem = todoItem;
      fixture.detectChanges();
    });
    it('should call sendUpdatedTask() when save button is clicked', () => {
      spyOn(component, 'sendUpdatedTask');
      const saveBtnDe = fixture.debugElement.query(By.css('.saveButton'));

      saveBtnDe.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(component.sendUpdatedTask).toHaveBeenCalled();
    });
  });

  // cancel
  describe('#cancel', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TodoItemComponent);
      component = fixture.componentInstance;
      todoItem =  {
        'title': 'coffee',
        'description': 'todo description',
        'isCompleted': false,
        'createdAt': '2018-06-14T14:21:10.909Z',
        'updatedAt': '2018-06-14T14:21:10.909Z',
        'id': 22
      };
      component.editMode = true;
      component.todoItem = todoItem;
      fixture.detectChanges();
    });

    it('toggle editMode when cancel() is called', () => {
        component.editMode = true;
        component.cancel();
        fixture.detectChanges();

        expect(component.editMode).toBeFalsy();
    });
    it('toggle editMode when cancel button is clicked', () => {
        spyOn(component, 'cancel');
        const cancelBtnDe = fixture.debugElement.query(By.css('.cancelButton'));
        cancelBtnDe.triggerEventHandler('click', null);

        expect(component.cancel).toHaveBeenCalled();
    });
  });
  it('should set editMode=false when sendUpdatedTask() is called', () => {
      const mockValue = 'new todo titile';
      component.sendUpdatedTask();
      fixture.detectChanges();

      expect(component.editMode).toBeFalsy();
  });

});
