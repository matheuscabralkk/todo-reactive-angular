import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Todo} from "../../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly baseUrl = `https://jsonplaceholder.typicode.com/todos`;

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public getAll(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.baseUrl);
  }

  public getBySearch(str: string): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${this.baseUrl}?q=${str}`);
  }
}
