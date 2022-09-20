import {Component, Input, OnInit} from '@angular/core';
import {BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder} from "@angular/forms";
import {Todo} from "../../models/todo";

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.scss']
})
export class TodoModalComponent implements OnInit {
  createTodoForm = this.formBuilder.group({
    title: '',
    creator: '',
    completed: false
  });

  @Input() todo?: Todo;


  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log('---> ', this.todo)

    if (this.todo) {
      this.createTodoForm.patchValue({
        title: this.todo.title,
        creator: this.todo.user.name,
        completed: this.todo.completed
      });
    }
  }

  closeModal() {
    this.modalService.hide();
  }

  onSubmit(): void {
    this.modalService.setDismissReason(this.createTodoForm.value);
    this.createTodoForm.reset();
    this.modalService.hide();
  }

}
