import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  mergeMap,
  Observable,
  switchMap, take,
  tap,
  withLatestFrom
} from "rxjs";
import {User} from "../../models/user";
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {NewUserDialogDTO} from "./types";
import {Address} from "../../models/address";

export type UsersState = {
  users: User[];
  pagedUsers: User[];
  form: FormGroup;
  currentPage: number;
}

@Injectable()
export class UsersStateService {

  public state$: Observable<UsersState>;

  public currentPage$ = new BehaviorSubject<number>(1);

  public usersSubject = new BehaviorSubject<User[]>([]);

  public pagedUsersSubject = new BehaviorSubject<User[]>([]);

  public form = new FormGroup({
    search: new FormControl('')
  })

  public readonly itemsPerPage = 5;

  constructor(
    private readonly usersService: UserService,
  ) {
    this.state$ = combineLatest([this.usersSubject, this.pagedUsersSubject, this.currentPage$]).pipe(
      map(([users, pagedUsers, currentPage]) => ({
        users,
        pagedUsers,
        currentPage,
        form: this.form
      }))
    );
    this.currentPageWatcher().subscribe()
    this.filterWatcher().subscribe()

    this.users.pipe(
      tap((users) => {
        this.usersSubject.next(users);
        this.currentPage$.next(1);
      })
    ).subscribe();
  }

  public searchUsers(str: string): Observable<User[]> {
    return this.usersService.getBySearch(str);
  }

  private get users(): Observable<User[]> {
    return this.usersService.getAll();
  }

  private currentPageWatcher() {
    return this.currentPage$.pipe(
      withLatestFrom(this.state$),
      tap(([currentPage, {users}]) => {
        const startItem = (currentPage - 1) * this.itemsPerPage;
        const endItem = currentPage * this.itemsPerPage;
        const pagedUsers = users.slice(startItem, endItem);
        this.pagedUsersSubject.next(pagedUsers);
      }));
  }

  private filterWatcher() {
    return this.form.get('search')!.valueChanges.pipe(
      debounceTime(500),
      switchMap((res) => this.searchUsers(res)),
      tap((users) => {
        this.usersSubject.next(users);
        this.pagedUsersSubject.next(users.slice(0, this.itemsPerPage));
        this.currentPage$.next(1);
      })
    )
  }

  editUser({name, id, editMode, username, email, lng, lat, zipcode, suite, street, city}: NewUserDialogDTO) {
    const address: Address = {
      geo: {
        lat,
        lng
      },
      zipcode,
      suite,
      street,
      city,
    }
    const newUser = new User(id, name, username, email, address);

    this.usersSubject.pipe(
      take(1),
      tap((users) => {
          if (!editMode) {
            this.usersSubject.next([newUser, ...users]);
            this.pagedUsersSubject.next([newUser, ...users]);
            this.currentPage$.next(1);
          } else {
            const userToEditIndex = users.findIndex((user) => user.id === newUser.id);
            users[userToEditIndex] = newUser;
            this.usersSubject.next([...users]);
            this.pagedUsersSubject.next([...users]);
            this.currentPage$.next(1);
          }
        }
      )).subscribe();
  }
}
