import {EventEmitter, Injectable} from '@angular/core';
import {combineLatest, map, Observable, of, Subject, switchMap, tap} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Todo} from "../../models/todo";
import {NewTodoDialogDTO} from "../../pages/todos/types";

export interface TodoFormState {
  form: FormGroup;
}

@Injectable()
export class TodoFormStateService {

  public state$: Observable<TodoFormState>;

  public formPatch$ = new Subject<Todo>();

  private form = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    creator: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    completed: new FormControl(false),
  })

  constructor() {
    this.state$ = of(this.form).pipe(
      map((form) => ({
        form
      }))
    );
    this.formPatchWatcher().subscribe();
  }

  private formPatchWatcher() {
    return this.formPatch$.pipe(
      tap((todo) => {
        this.form.patchValue({
          title: todo.title,
          creator: todo.user.name,
          completed: todo.completed
        });
      })
    )
  }
}
