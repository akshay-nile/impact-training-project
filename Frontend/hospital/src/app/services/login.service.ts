import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) { }

    baseUrl: string = environment.baseUrl + '/api/login';

    checkEmailExist(email: string): Observable<boolean> {
        return this.http.post<boolean>(this.baseUrl + '/exist', email)
            .pipe(catchError(this.handleError));
    }

    loginUser(user: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/', user)
            .pipe(catchError(this.handleError));
    }

    blockAccount(email: string): Observable<void> {
        return this.http.post<void>(this.baseUrl + '/block', email)
            .pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error("Client Side Error", errorResponse.error.message)
        } else {
            console.error("Server Side Error", errorResponse);
        }
        return throwError("There is problem with service. Please try again");
    }
}
