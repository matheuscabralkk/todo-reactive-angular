import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Todo} from "../../models/todo";
import {User} from "../../models/user";
import {NewTodoDialogDTO} from "../../pages/todos/types";
import {NewUserDialogDTO} from "../../pages/users/types";
import {UserService} from "../../services/user/user.service";
import {UserFormStateService} from "./user-form-state.service";
import {BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [UserFormStateService]
})
export class UserFormComponent implements OnInit {

  @Input() user?: User;

  @Output() outputEvent = new EventEmitter<NewUserDialogDTO>();

  constructor(
    private userFormStateService: UserFormStateService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    if (this.user) {
      this.userFormStateService.patchForm(this.user);
    }
  }

  get getForm(): FormGroup {
    return this.userFormStateService.createUserForm;
  }


  onSubmit() {
    const randomId = Math.floor(Math.random() * 100000) + 200;
    const newUserDTO: NewUserDialogDTO = {
      editMode: !!this.user,
      id: this.user?.id || randomId,
      ...this.getForm.value
    };
    this.modalService.setDismissReason(JSON.stringify(newUserDTO));
    this.getForm.reset();
    this.modalService.hide();
  }
}
