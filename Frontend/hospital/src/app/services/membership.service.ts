import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MembershipService {
    
    constructor(private httpClient: HttpClient) { }
    
    baseUrl: string = environment.baseUrl + '/api/login';
    
    getOtp(email: string): Observable<boolean> {
        return of(true);
        // return this.httpClient.get<boolean>(this.baseUrl+'/otps')
        //     .pipe(catchError(this.handleError));
    }
    
    checkEmailExist(email: string): Observable<boolean> {
        return this.httpClient.post<boolean>(this.baseUrl + '/exist', email)
        .pipe(catchError(this.handleError));
    }
    
    login(user: any): Observable<any> {
        return this.httpClient.post<any>(this.baseUrl + '/', user)
        .pipe(catchError(this.handleError));
    }
    
    block(email: string): Observable<void> {
        return this.httpClient.post<void>(this.baseUrl + '/block', email)
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
