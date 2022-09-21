import {Component, Input, OnInit} from '@angular/core';
import {BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder} from "@angular/forms";
import {Todo} from "../../models/todo";
import {NewTodoDialogDTO} from "../../pages/todos/types";

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.scss']
})
export class TodoModalComponent {

  @Input() todo?: Todo;


  constructor(
    private modalService: BsModalService
  ) { }

  closeModal() {
    this.modalService.hide();
  }


  onSubmit(todo: NewTodoDialogDTO): void {
    const json = JSON.stringify(todo);
    this.modalService.setDismissReason(json);
    this.modalService.hide();
  }

}
