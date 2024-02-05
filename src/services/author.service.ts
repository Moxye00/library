import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Author } from "src/model/dtos/author";
@Injectable({
  providedIn: 'root',
})
export class authorService{
  private URL = 'http://localhost:8080/api/authors';

  constructor(private http: HttpClient){ }

  getAllAuthors(): Observable<Author[]>{
    return this.http.get<Author[]>(`${this.URL}/`);
  }

  getAuthorsDetails(authorId: number): Observable<Author>{
    return this.http.get<Author>(`${this.URL}/${authorId}`);
  }

  getAuthorsByName(firstname: string, lastname: string): Observable<any[]>{
    const params = new HttpParams().set('firstname', firstname).set('lastname', lastname);

    let url = `${this.URL}/name`;
    
    return this.http.get<any[]>(url, {params});
  }
}