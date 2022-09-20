import {ChangeDetectionStrategy, Component, OnInit, TemplateRef} from '@angular/core';
import {map, Observable, of, switchMap, take, tap} from "rxjs";
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnInit {

  public state$!: Observable<TodosState>;

  public search = new FormControl();

  public currentPage = 1;

  public itemsPerPage = 10;

  constructor(
    private readonly todosStateService: TodosStateService,
    private readonly modalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    this.state$ = this.todosStateService.state$;
  }

  openModal(todo?: Todo) {
    this.modalService.show(TodoModalComponent, {id: 1, class: 'modal-lg', initialState: {todo}});
    this.modalService.onHide.pipe(take(1))
      .subscribe((res) => {
        this.addTodo(res);
      });

  }


  pageChanged($event: PageChangedEvent) {
    this.todosStateService.currentPage$.next($event.page);
  }

  private addTodo(newTodo: any) {
    console.log('handle callback from todos.component.ts: ', newTodo)
    // demo add
  }

}
