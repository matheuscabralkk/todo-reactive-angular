import {Injectable} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
} from "rxjs";
import {UserDetailsModalState} from "./user-details-modal.component";
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user";

@Injectable()
export class UserDetailsModalStateService {

  public state$!: Observable<UserDetailsModalState>;

  public albums$ = new BehaviorSubject<any>([]);

  public todos$ = new BehaviorSubject<any>([]);

  public posts$ = new BehaviorSubject<any>([]);

  public user$ = new BehaviorSubject<User | null>(null);

  constructor(
    private readonly userService: UserService,
  ) {
    this.state$ = combineLatest([this.albums$, this.todos$, this.posts$]).pipe(
      map(([albums, todos, posts]) => ({
        albums,
        todos,
        posts
      }))
    );
  }

  public get albums(): Observable<any[]> {
    return this.user$.pipe(
      switchMap(user => user ? this.userService.getAlbums(user.id) : of(null)),
      tap(albums => { this.albums$.next(albums) })
    )
  }

  public get posts(): Observable<any[]> {
    return this.user$.pipe(
      switchMap(user => user ? this.userService.getPosts(user.id) : of(null)),
      tap(posts => { this.posts$.next(posts) })
    )
  }

  public get todos(): Observable<any[]> {
    return this.user$.pipe(
      switchMap(user => user ? this.userService.getTodos(user.id) : of(null)),
      tap(todos => { this.todos$.next(todos) })
    )
  }

}
