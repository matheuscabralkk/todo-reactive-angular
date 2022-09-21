import {Injectable} from '@angular/core';
import {debounceTime, switchMap, tap} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Todo} from "../../models/todo";

@Injectable()
export class TodoFormStateService {

  public form = new FormGroup({
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
  }

  patchForm(todo: Todo) {
    this.form.patchValue({
      title: todo.title,
      creator: todo.user.name,
      completed: todo.completed
    });
  }
}
