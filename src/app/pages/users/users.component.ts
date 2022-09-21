import { Component, OnInit } from '@angular/core';
import {Observable, take} from "rxjs";
import {FormControl} from "@angular/forms";
import {BsModalService} from "ngx-bootstrap/modal";
import {User} from "../../models/user";
import {PageChangedEvent} from "ngx-bootstrap/pagination";
import {UsersState, UsersStateService} from "./users-state.service";
import {UserModalComponent} from "../../modals/user-modal/user-modal.component";
import {NewUserDialogDTO} from "./types";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersStateService]
})
export class UsersComponent implements OnInit {
  public state$!: Observable<UsersState>;

  public search = new FormControl();

  constructor(
    private readonly usersStateService: UsersStateService,
    private readonly modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.state$ = this.usersStateService.state$;
  }

  openModal(user?: User) {
    this.modalService.show(UserModalComponent, {id: 2, class: 'modal-lg', initialState: {user}});
    this.modalService.onHide.pipe(take(1))
      .subscribe((res?: unknown) => {
        if (!!res && typeof res === 'string' && res.includes('name')) {
          const userDTO: NewUserDialogDTO = JSON.parse(res);
          this.usersStateService.editUser(userDTO);
        }
      });
  }

  pageChanged($event: PageChangedEvent) {
    this.usersStateService.currentPage$.next($event.page);
  }

  get itemsPerPage(): number {
    return this.usersStateService.itemsPerPage;
  }

  seeAddressModal() {

  }
}
