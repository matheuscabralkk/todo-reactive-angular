import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder} from "@angular/forms";
import {NewUserDialogDTO} from "../../pages/users/types";

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent {

  @Input() user?: User;

  constructor(
    private modalService: BsModalService,
  ) {
  }

  closeModal() {
    this.modalService.hide();
  }

  onSubmit(user: NewUserDialogDTO): void {
    const json = JSON.stringify(user);
    this.modalService.setDismissReason(json);
    this.modalService.hide();
  }

}
