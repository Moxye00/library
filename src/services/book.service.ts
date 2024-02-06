import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Book } from "src/model/dtos/book";

@Injectable({
  providedIn: 'root',
})
export class bookService{
  private URL = 'http://localhost:8080/api/books/';

  constructor(private http: HttpClient){ }

  getAllBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.URL}`);
  }

  getBooksByTitle(title: string): Observable<Book[]>{
    const params = new HttpParams().set('title', title);
    let url = `${this.URL}`;
    return this.http.get<Book[]>(url, {params});
  }

}