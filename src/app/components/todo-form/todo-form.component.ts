import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from "../../models/todo";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NewTodoDialogDTO} from "../../pages/todos/types";
import {TodoFormStateService} from "./todo-form-state.service";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  providers: [TodoFormStateService]
})
export class TodoFormComponent implements OnInit {

  @Input() todo?: Todo;

  @Output() outputEvent = new EventEmitter<NewTodoDialogDTO>();

  constructor(
    private todoFormStateService: TodoFormStateService
  ) {
  }

  ngOnInit(): void {
    if (this.todo) {
      this.todoFormStateService.patchForm(this.todo);
    }
  }

  get getForm(): FormGroup {
    return this.todoFormStateService.form;
  }

  onSubmit() {
    const randomId = Math.floor(Math.random() * 100000) + 200;
    this.outputEvent.emit({
      editMode: !!this.todo,
      userId: this.todo?.user.id || randomId,
      todoId: this.todo?.id || randomId,
      ...this.getForm.value
    });
    this.getForm.reset();
  }
}
