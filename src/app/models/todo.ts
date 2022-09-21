import {User} from "./user";

type TodoUser = Omit<User, "username" | "email" | "address">;

export class Todo {
  id: number;
  userId: number;
  user: TodoUser;
  title: string;
  completed: boolean;
  constructor(id: number, userId: number, title: string, completed: boolean, user: TodoUser) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.completed = completed;
    this.user = user;
  }
}
