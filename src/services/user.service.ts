import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { LibraryItemDto } from "src/model/dtos/library-item";

@Injectable({
    providedIn: 'root',
})
export class userService{
    private URL = 'http://localhost:8080/api/library/';

    constructor(private http: HttpClient) {}

    assignBookToUser(userId: number, bookId: number): Observable<any>{
        console.log(userId, bookId);
        const params = new HttpParams()
            .set('userId', userId)
            .set('bookId', bookId);
        return this.http.post(`${this.URL}`, null, {params: params, responseType: 'text'}).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = errorRes.message;
        return throwError(() => 
            errorMessage
        );
    }

    getUserBooks(userId: number): Observable<LibraryItemDto[]>{
        return this.http.get<LibraryItemDto[]>(`${this.URL}${userId}`).pipe(
            catchError(this.handleError)
        );
    }

}