import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../models/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly baseUrl = `https://jsonplaceholder.typicode.com/users/`;

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public getUserById(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}${userId}`);
  }

  public getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}`);
  }

  public getBySearch(str: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}?q=${str}`);
  }
}
