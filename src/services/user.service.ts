import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class userService{
    private URL = 'http://localhost:8080/api/library/';

    constructor(private http: HttpClient) {}

    assignBookToUser(userId: number, bookId: number): Observable<any>{
        const params = new HttpParams()
            .set('userId', userId.toString())
            .set('bookId', bookId.toString());
        return this.http.post(this.URL,null,{params}).pipe(
            catchError(this.handleError)
        )
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        return throwError(() => 
            errorMessage
        );
    }

}
