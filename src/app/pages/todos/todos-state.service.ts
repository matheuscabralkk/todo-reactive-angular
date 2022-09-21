import {Injectable} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  combineLatestAll, debounce, debounceTime,
  map,
  mergeMap,
  Observable,
  of, switchMap, take,
  tap,
  withLatestFrom
} from "rxjs";
import {NewTodoDialogDTO, TodosState} from "./types";
import {Todo} from "../../models/todo";
import {TodoService} from "../../services/todo/todo.service";
import {UserService} from "../../services/user/user.service";
import {FormControl, FormGroup} from "@angular/forms";

@Injectable()
export class TodosStateService {

  public state$: Observable<TodosState>;

  public currentPage$ = new BehaviorSubject<number>(1);

  public loading$ = new BehaviorSubject<boolean>(true);

  public todosSubject = new BehaviorSubject<Todo[]>([]);

  public pagedTodosSubject = new BehaviorSubject<Todo[]>([]);

  public form = new FormGroup({
    search: new FormControl('')
  })

  public readonly itemsPerPage = 10;

  constructor(
    private readonly todosService: TodoService,
    private readonly userService: UserService
  ) {
    this.state$ = combineLatest([this.todosSubject, this.pagedTodosSubject, this.currentPage$]).pipe(
      map(([todos, pagedTodos, currentPage]) => ({
        todos,
        pagedTodos,
        currentPage,
        form: this.form
      }))
    );
    this.currentPageWatcher().subscribe()
    this.filterWatcher().subscribe()

    this.todos.pipe(
      tap((todos) => {
        this.todosSubject.next(todos);
        this.currentPage$.next(1);
        this.loading$.next(false);
      })
    ).subscribe();
  }

  public searchTodos(str: string): Observable<Todo[]> {
    this.loading$.next(true)
    return this.todosService.getBySearch(str).pipe(
      mergeMap((todos) =>
        combineLatest(todos.map((todo) => this.userService.getUserById(todo.userId).pipe(
          map((user) => ({
            ...todo,
            user
          })),
        ))),
      ),
      tap(() => this.loading$.next(false))
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
      )
    );
  }

  private currentPageWatcher() {
    return this.currentPage$.pipe(
      withLatestFrom(this.state$),
      tap(([currentPage, {todos}]) => {
        const startItem = (currentPage - 1) * this.itemsPerPage;
        const endItem = currentPage * this.itemsPerPage;
        const pagedTodos = todos.slice(startItem, endItem);
        this.pagedTodosSubject.next(pagedTodos);
      }));
  }

  private filterWatcher() {
    return this.form.get('search')!.valueChanges.pipe(
      debounceTime(500),
      switchMap((res) => this.searchTodos(res)),
      tap((todos) => {
        this.todosSubject.next(todos);
        this.pagedTodosSubject.next(todos.slice(0, this.itemsPerPage));
        this.currentPage$.next(1);
      })
    )
  }

  editTodos({title, completed, creator, editMode, todoId, userId}: NewTodoDialogDTO) {
    const newTodo: Todo = {
      userId: userId,
      id: todoId,
      title: title,
      completed: completed,
      user: {
        id: userId,
        name: creator,
      }
    }

    this.todosSubject.pipe(
      take(1),
      tap((todos) => {
          if (!editMode) {
            this.todosSubject.next([newTodo, ...todos]);
            this.pagedTodosSubject.next([newTodo, ...todos]);
            this.currentPage$.next(1);
          } else {
            const todoToEditIndex = todos.findIndex((todo) => todo.id === newTodo.id);
            todos[todoToEditIndex] = newTodo;
            this.todosSubject.next([...todos]);
            this.pagedTodosSubject.next([...todos]);
            this.currentPage$.next(1);
          }
        }
      )).subscribe();
  }
}
