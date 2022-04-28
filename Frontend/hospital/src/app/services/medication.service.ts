import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MedicationService {

    medicationUrl = environment.baseUrl + '/medications/api';

    constructor(private http: HttpClient) { }

    getAllMedications(): Observable<any[]> {
        return this.http.get<any[]>(this.medicationUrl + '/get-medication-details')
            .pipe(catchError(this.handleError));
    }
    
    getMedicationByAptId(appointmentId: number): Observable<any[]> {
        return this.http.get<any>(this.medicationUrl + '/appointment-medications/' + appointmentId)
            .pipe(catchError(this.handleError));
    }

    addMedicationByAptId(medications: any): Observable<any> {
        return this.http.post<any>(this.medicationUrl +  '/appointment-medications', medications)
            .pipe(catchError(this.handleError));
    }

    deleteMedicationById(id: number): Observable<void> {
        return this.http.delete<void>(this.medicationUrl + '/deleteMedicationById' + '/' + id)
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
