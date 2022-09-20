import {Component, OnInit, TemplateRef} from '@angular/core';
import {Observable, take, tap} from "rxjs";
import {TodosStateService} from "./todos-state.service";
import {TodosState} from "./types";
import {FormControl} from "@angular/forms";
import {PageChangedEvent} from "ngx-bootstrap/pagination";
import {Todo} from "../../models/todo";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {TodoModalComponent} from "../../modals/todo-modal/todo-modal.component";
import {User} from "../../models/user";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  providers: [TodosStateService],
})
export class TodosComponent implements OnInit {

  public state$!: Observable<TodosState>;

  public search = new FormControl();

  public currentPage = 1;

  public pagedTodos: Todo[] | undefined;

  constructor(
    private readonly todosStateService: TodosStateService,
    private readonly modalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    this.state$ = this.todosStateService.state$.pipe(
      tap((state) => {
        this.pageChanged({
          page: 1,
          itemsPerPage: 10,
        }, state.todos)
      })
    );
  }

  openModal(todo?: Todo) {
    this.modalService.show(TodoModalComponent, {id: 1, class: 'modal-lg', initialState: {todo}});
    this.modalService.onHide.pipe(take(1))
      .subscribe((res) => {
        this.addTodo(res);
      });

  }

  searchChange() {
    this.state$ = this.todosStateService.searchTodos(this.search.value).pipe(
      tap((state) => {
        this.pageChanged({
          page: 1,
          itemsPerPage: 10,
        }, state.todos)
      }));
  }

  pageChanged($event: PageChangedEvent, todos: Todo[]) {
    const startItem = ($event.page - 1) * $event.itemsPerPage;
    const endItem = $event.page * $event.itemsPerPage;
    this.pagedTodos = todos.slice(startItem, endItem);
  }

  private addTodo(newTodo: any) {
    console.log('handle callback from todos.component.ts: ', newTodo)
    // demo add
  }
}
