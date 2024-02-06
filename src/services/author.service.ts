import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Author } from "src/model/dtos/author";
@Injectable({
  providedIn: 'root',
})
export class authorService{
  private URL = 'http://localhost:8080/api/authors/';

  constructor(private http: HttpClient){ }

  getAllAuthors(): Observable<Author[]>{
    return this.http.get<Author[]>(`${this.URL}`);
  }

  getAuthorsDetails(authorId: number): Observable<Author>{
    return this.http.get<Author>(`${this.URL}${authorId}`);
  }

  getAuthorsByName(part: string): Observable<Author[]>{
    const params = new HttpParams().set('part', part);

    let url = `${this.URL}`;
    
    return this.http.get<Author[]>(url, {params});
  }
}