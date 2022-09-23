import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {User} from "../../models/user";
import {NewUserDialogDTO} from "../../pages/users/types";
import {UserFormStateService} from "./user-form-state.service";
import {BsModalService} from "ngx-bootstrap/modal";
import {Observable} from "rxjs";
import {TodoFormState} from "../todo-form/todo-form-state.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [UserFormStateService]
})
export class UserFormComponent implements OnInit {

  @Input() user?: User;

  @Output() outputEvent = new EventEmitter<NewUserDialogDTO>();

  public state$?: Observable<TodoFormState>;

  constructor(
    private userFormStateService: UserFormStateService,
  ) { }

  ngOnInit(): void {
    this.state$ = this.userFormStateService.state$;
    if (this.user) {
      this.userFormStateService.formPatch$.next(this.user);
    }
  }

  onSubmit(form: FormGroup) {
    const randomId = Math.floor(Math.random() * 100000) + 200;
    this.outputEvent.emit({
      editMode: !!this.user,
      id: this.user?.id || randomId,
      ...form.value
    });
    form.reset();
  }
}
