import {Todo} from "../../models/todo";
import {FormGroup} from "@angular/forms";

export type TodosState = {
  todos: Todo[];
  pagedTodos: Todo[];
  form: FormGroup;
}
