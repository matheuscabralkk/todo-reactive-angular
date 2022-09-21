import {Todo} from "../../models/todo";
import {FormGroup} from "@angular/forms";

export type TodosState = {
  todos: Todo[];
  pagedTodos: Todo[];
  form: FormGroup;
  currentPage: number;
}

export type NewTodoDialogDTO = {
  creator: string;
  completed: boolean;
  title: string;
  editMode: boolean;
  userId: number;
  todoId: number;
}
