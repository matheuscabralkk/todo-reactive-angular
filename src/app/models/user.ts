import {Address} from "./address";

export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  constructor(id: number, name: string, username: string, email: string, address: Address) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.address = address;
  }
}
