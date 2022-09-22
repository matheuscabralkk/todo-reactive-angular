import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from "../../models/user";
import {BsModalService} from "ngx-bootstrap/modal";
import {TabsetComponent} from "ngx-bootstrap/tabs";
import {Observable} from "rxjs";
import {TodosState} from "../../pages/todos/types";
import {TodosStateService} from "../../pages/todos/todos-state.service";
import {UserDetailsModalStateService} from "./user-details-modal-state.service";

export interface UserDetailsModalState {
  albums: any;
  todos: any;
  posts: any;
}

@Component({
  selector: 'app-user-details-modal',
  templateUrl: './user-details-modal.component.html',
  styleUrls: ['./user-details-modal.component.scss'],
  providers: [UserDetailsModalStateService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsModalComponent implements OnInit {

  @Input() user?: User;

  @ViewChild('staticTabs', {static: false}) staticTabs?: TabsetComponent;

  public state$!: Observable<UserDetailsModalState>;

  public posts$: Observable<any[]> | undefined;

  public albums$: Observable<any[]> | undefined;

  public todos$: Observable<any[]> | undefined;

  constructor(
    private readonly userDetailsModalStateService: UserDetailsModalStateService,
    private readonly modalService: BsModalService
  ) {
    this.state$ = this.userDetailsModalStateService.state$;
  }

  ngOnInit(): void {
    if (!this.user) {
      throw new Error('User is not defined');
    }
    this.userDetailsModalStateService.user$.next(this.user);
    this.albums$ = this.userDetailsModalStateService.albums;
  }

  closeModal() {
    this.modalService.hide();
  }

  selectedTab($event: any) {
    switch ($event.id) {
      case 'posts':
        this.posts$ = this.userDetailsModalStateService.posts;
        return;
      case 'albums':
        this.albums$ = this.userDetailsModalStateService.albums;
        return;
      case 'todos':
        this.todos$ = this.userDetailsModalStateService.todos;
        return;
    }
    throw new Error(`Tab is not defined: ${$event.id}`);
  }
}
