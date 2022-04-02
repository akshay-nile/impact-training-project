import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) { }

    baseUrl: string = environment.baseUrl + '/hospital';

    loginUser(user: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/login', user)
            .pipe(catchError(this.handleError));
    }

    blockAccount(email: string): Observable<void> {
        return this.http.post<void>(this.baseUrl + '/block-account', email)
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
