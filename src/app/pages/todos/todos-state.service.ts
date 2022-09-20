import {Injectable} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  combineLatestAll, debounce, debounceTime,
  map,
  mergeMap,
  Observable,
  of, switchMap,
  tap,
  withLatestFrom
} from "rxjs";
import {TodosState} from "./types";
import {Todo} from "../../models/todo";
import {TodoService} from "../../services/todo/todo.service";
import {UserService} from "../../services/user/user.service";
import {FormControl, FormGroup} from "@angular/forms";

@Injectable()
export class TodosStateService {

  public state$: Observable<TodosState>;

  public currentPage$ = new BehaviorSubject<number>(1);

  public currentPageTodosSubject = new BehaviorSubject<Todo[]>([]);

  public form = new FormGroup({
    search: new FormControl('')
  })

  constructor(
    private readonly todosService: TodoService,
    private readonly userService: UserService
  ) {
    this.state$ = combineLatest([this.todos, this.currentPageTodosSubject]).pipe(
      map(([todos, pagedTodos]) => ({
        todos,
        pagedTodos,
        form: this.form
      }))
    );
    this.currentPageWatcher().subscribe()
    this.filterWatcher().subscribe()
  }

  public searchTodos(str: string): Observable<Todo[]> {
    return this.todosService.getBySearch(str).pipe(
      mergeMap((todos) =>
        combineLatest(todos.map((todo) => this.userService.getUserById(todo.userId).pipe(
          map((user) => ({
            ...todo,
            user
          })),
        ))),
      ),
      tap((todos) => this.currentPageTodosSubject.next(todos))
    );
  }

  private get todos(): Observable<Todo[]> {
    return this.todosService.getAll().pipe(
      mergeMap((todos) =>
        combineLatest(todos.map((todo) => this.userService.getUserById(todo.userId).pipe(
          map((user) => ({
            ...todo,
            user
          }))
        )))
      ),
      tap(() => this.currentPage$.next(1))
    );
  }

  private currentPageWatcher() {
    return this.currentPage$.pipe(
      withLatestFrom(this.todos),
      tap(([currentPage, todos]) => {
        console.log('currentPageWatcher: ', currentPage, todos)
        const startItem = (currentPage - 1) * 10;
        const endItem = currentPage * 10;
        const pagedTodos = todos.slice(startItem, endItem);
        this.currentPageTodosSubject.next(pagedTodos);
    }));
  }

  private filterWatcher() {
    return this.form.get('search')!.valueChanges.pipe(
      debounceTime(500),
      switchMap((res) => this.searchTodos(res))
    )
  }
}
