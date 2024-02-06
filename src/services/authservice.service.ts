import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, tap, throwError } from "rxjs";
import { AuthUser } from "src/model/dtos/auth-user";
import { AuthReq } from "src/model/dtos/authreq";



@Injectable({
    providedIn: 'root'
})
export class AuthService{
    userPublisher = new BehaviorSubject<AuthUser|null>(null);

    private URL = 'http://localhost:8080/api';

    constructor(private http: HttpClient){}

    private LOGIN_URL = 'http://localhost:8080/api/auth/authenticate';

    login(credentials: {email: string, password: string }): Observable<AuthUser>{
        return this.http.post<AuthUser>(`${this.LOGIN_URL}`, credentials)
        .pipe(catchError(this.handleError),
        tap(resData => {
            this.handleAuthentication(resData);
        })
        );
    }

    private REGISTER_URL = 'http://localhost:8080/api/auth/register'

    register(registrationData: any): Observable<AuthUser> {
        return this.http.post<AuthUser>(`${this.REGISTER_URL}`, registrationData)
        .pipe(catchError(this.handleError),
        tap(resData => {
            this.handleAuthentication(resData);
        })
        );
    }

    logout(){
        this.userPublisher.next(null);
        localStorage.removeItem('userData');
    }

    private handleAuthentication(resData : AuthUser){
        this.userPublisher.next(resData);
        localStorage.setItem('userData', JSON.stringify(resData));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        return throwError(() => 
            errorMessage
        );
    }
}