import {User} from "./user";

export class Todo {
  id: number;
  userId: number;
  user: User;
  title: string;
  completed: boolean;
  constructor(id: number, userId: number, title: string, completed: boolean, user: User) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.completed = completed;
    this.user = user;
  }
}
