import {Todo} from "../../models/todo";

export type TodosState = {
  todos: Todo[];
  pagedTodos?: Todo[];
}
