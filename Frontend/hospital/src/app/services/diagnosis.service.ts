import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DiagnosisService {

    diagnosisUrl = environment.baseUrl + '/diagnosis/api';

    constructor(private http: HttpClient) { }

    getAllDiagnosis(): Observable<any[]> {
        return this.http.get<any[]>(this.diagnosisUrl + '/getAllDiagnosisDetails')
            .pipe(catchError(this.handleError));
    }

    getDiagnosisByAptId(appointmentId: number): Observable<any[]> {
        return this.http.get<any>(this.diagnosisUrl + '/appointment-diagnosis/' + appointmentId )
            .pipe(catchError(this.handleError));
    }

    addDiagnosisByAptId(diagnosis: any): Observable<any> {
        return this.http.post<any>(this.diagnosisUrl + '/appointment-diagnosis', diagnosis)
            .pipe(catchError(this.handleError));
    }

    deleteDiagnosisById(id: number): Observable<void> {
        return this.http.delete<void>(this.diagnosisUrl + '/deleteDiagnosisById' + '/' + id)
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
