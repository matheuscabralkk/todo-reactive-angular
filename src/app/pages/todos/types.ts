import {Todo} from "../../models/todo";
import {FormGroup} from "@angular/forms";


export type NewTodoDialogDTO = {
  creator: string;
  completed: boolean;
  title: string;
  editMode: boolean;
  userId: number;
  todoId: number;
}
