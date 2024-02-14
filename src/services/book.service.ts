import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Book } from "src/model/dtos/book";
import { Genre } from "src/model/dtos/genre";

@Injectable({
  providedIn: 'root',
})
export class bookService{
  private URL = 'http://localhost:8080/api/books/';
  private genreURL = 'http://localhost:8080/api/genre/'

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.URL}`);
  }

  getBooksByTitle(title: string): Observable<Book[]>{
    const params = new HttpParams().set('title', title);
    let url = `${this.URL}`;
    return this.http.get<Book[]>(url, {params});
  }

  getBookDetail(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.URL}${bookId}`)
  }

  getBooksByGenre(genreId:number):Observable<Book[]>{
    return this.http.get<Book[]>(`${this.genreURL}${genreId}`)
  }

  getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.genreURL}`);
  }

  getBooksByTitleAndGenre(title: string, genreId: number): Observable<Book[]> {
    const params = new HttpParams().set('title', title).set('genreId', genreId.toString());
    let url = `${this.URL}`;
    return this.http.get<Book[]>(url, { params });
  }

  getRandomBooksByGenre(id: number, limit: number): Observable<Book[]> {
    const params = new HttpParams().set('id', id).set('limit', limit.toString());
    return this.http.get<Book[]>(`${this.URL}four-books`,{params});
  }

}