import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    constructor(private http: HttpClient) { }

    baseUrl: string = environment.baseUrl + '/hospital';

    getRelations(): Observable<string[]> {
        return this.http.get<string[]>(this.baseUrl + '/enums/relations')
            .pipe(catchError(this.handleError));
    }

    getLanguages(): Observable<string[]> {
        return this.http.get<string[]>(this.baseUrl + '/enums/languages')
            .pipe(catchError(this.handleError));
    }

    emailExists(email: string): Observable<boolean> {
        return this.http.post<boolean>(this.baseUrl + '/exists/email', email)
            .pipe(catchError(this.handleError));
    }

    phoneExists(phone: string): Observable<boolean> {
        return this.http.post<boolean>(this.baseUrl + '/exists/phone', phone)
            .pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error("Client Side Error", errorResponse.error.message)
        }
        else {
            console.error("Server Side Error", errorResponse);
        }
        return throwError("There is problem with service. Please try again");
    }
}