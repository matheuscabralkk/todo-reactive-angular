import {Injectable} from '@angular/core';
import {combineLatest, combineLatestAll, map, mergeMap, Observable} from "rxjs";
import {TodosState} from "./types";
import {Todo} from "../../models/todo";
import {TodoService} from "../../services/todo/todo.service";
import {UserService} from "../../services/user/user.service";

@Injectable()
export class TodosStateService {

  public state$: Observable<TodosState>;

  constructor(
    private readonly todosService: TodoService,
    private readonly userService: UserService
  ) {
    this.state$ = combineLatest([this.todos]).pipe(
      map(([todos]) => ({
        todos
      }))
    );
  }

  public searchTodos(str: string): Observable<TodosState> {
    const todos$ = this.todosService.getBySearch(str).pipe(
      mergeMap((todos) =>
        combineLatest(todos.map((todo) => this.userService.getUserById(todo.userId).pipe(
          map((user) => ({
            ...todo,
            user
          }))
        )))
      )
    );
    return combineLatest([todos$]).pipe(
      map(([todos]) => ({
        todos
      }))
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
}
