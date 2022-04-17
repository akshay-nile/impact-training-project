import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PatientVisitService {

    constructor(private http: HttpClient) { }

    visitUrl = environment.baseUrl + '/patient-visits/visit';
    
    getVisitReportDetails(appointment: any): Observable<any> {
        return this.http.post<any>(this.visitUrl+'/getVisitReport',appointment)
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
