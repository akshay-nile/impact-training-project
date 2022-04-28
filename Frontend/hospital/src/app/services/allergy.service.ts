import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AllergyService {

    allergyUrl = environment.baseUrl + '/allergy/api';

    constructor(private http: HttpClient) { }

    getAllAllergies(): Observable<any[]> {
        return this.http.get<any[]>(this.allergyUrl + '/get-allergy-details')
            .pipe(catchError(this.handleError));
    }

    deleteAllergyById(allergyId: number): Observable<void> {
        return this.http.delete<void>(this.allergyUrl + '/delete-allergy/' + allergyId)
            .pipe(catchError(this.handleError));
    }

    addNewAllergy(allergy: any): Observable<any> {
        return this.http.post<any>(this.allergyUrl + '/add-allergy', allergy)
            .pipe(catchError(this.handleError));
    }

    getAllergyNamesAndTypes(): Observable<any> {
        return this.http.get<any>(this.allergyUrl + '/names-and-types')
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
