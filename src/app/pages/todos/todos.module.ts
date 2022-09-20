import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos.component';
import { CompletedPipe } from './completed.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {TodoModalComponent} from "../../modals/todo-modal/todo-modal.component";
import {TodoFormComponent} from "../../components/todo-form/todo-form.component";


@NgModule({
  declarations: [
    TodosComponent,
    CompletedPipe,
    TodoModalComponent,
    TodoFormComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    ReactiveFormsModule,
    PaginationModule,
    FormsModule
  ],
  providers: []
})
export class TodosModule { }
