import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from "../../models/todo";
import {NewTodoDialogDTO} from "../../pages/todos/types";
import {TodoFormState, TodoFormStateService} from "./todo-form-state.service";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoFormStateService]
})
export class TodoFormComponent implements OnInit {

  @Input() todo?: Todo;

  @Output() outputEvent = new EventEmitter<NewTodoDialogDTO>();

  state$?: Observable<TodoFormState>;

  constructor(
    private todoFormStateService: TodoFormStateService
  ) {
  }

  ngOnInit(): void {
    this.state$ = this.todoFormStateService.state$;
    if (this.todo) {
      this.todoFormStateService.formPatch$.next(this.todo);
    }
  }

  onSubmit(form: FormGroup) {
    const randomId = Math.floor(Math.random() * 100000) + 200;
    this.outputEvent.emit({
      editMode: !!this.todo,
      userId: this.todo?.user.id || randomId,
      todoId: this.todo?.id || randomId,
      ...form.value
    });
    form.reset();
  }
}
