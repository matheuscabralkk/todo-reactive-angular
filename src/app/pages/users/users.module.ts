import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import {UserModalComponent} from "../../modals/user-modal/user-modal.component";
import {UsersComponent} from "./users.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserFormComponent} from "../../components/user-form/user-form.component";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {UserDetailsModalComponent} from "../../modals/user-details-modal/user-details-modal.component";
import {TabsModule} from "ngx-bootstrap/tabs";

@NgModule({
  declarations: [
    UsersComponent,
    UserModalComponent,
    UserFormComponent,
    UserDetailsModalComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    PaginationModule,
    FormsModule,
    BsDropdownModule,
    TabsModule,
  ]
})
export class UsersModule { }
