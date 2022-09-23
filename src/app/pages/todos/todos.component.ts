import {ChangeDetectionStrategy, Component, OnInit, TemplateRef} from '@angular/core';
import {map, Observable, of, switchMap, take, tap} from "rxjs";
import {TodosState, TodosStateService} from "./todos-state.service";
import {FormControl} from "@angular/forms";
import {PageChangedEvent} from "ngx-bootstrap/pagination";
import {Todo} from "../../models/todo";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {TodoModalComponent} from "../../modals/todo-modal/todo-modal.component";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  providers: [TodosStateService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnInit {

  public state$!: Observable<TodosState>;

  public search = new FormControl();

  constructor(
    private readonly todosStateService: TodosStateService,
    private readonly modalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    this.state$ = this.todosStateService.state$;
  }

  openModal(todo?: Todo) {
    this.todosStateService.openEditModal$.next(todo);
  }

  get isLoading() {
    return this.todosStateService.loading$;
  }

  pageChanged($event: PageChangedEvent) {
    this.todosStateService.currentPage$.next($event.page);
  }

  get itemsPerPage(): number {
    return this.todosStateService.itemsPerPage;
  }
}
