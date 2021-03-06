import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProcedureService {

    procedureUrl = environment.baseUrl + '/procedures/api';

    constructor(private http: HttpClient) { }

    getAllProcedures(): Observable<any[]> {
        return this.http.get<any[]>(this.procedureUrl + '/get-procedure-details')
            .pipe(catchError(this.handleError));
    }

    deleteProcedureById(procedureId: number): Observable<void> {
        return this.http.delete<void>(this.procedureUrl + '/delete-procedure/' + procedureId)
            .pipe(catchError(this.handleError));
    }

    addNewProcedure(procedure: any): Observable<any> {
        return this.http.post<any>(this.procedureUrl + '/add-procedure', procedure)
            .pipe(catchError(this.handleError));
    }

    getProcedureByAptId(appointmentId: number): Observable<any[]> {
        return this.http.get<any>(this.procedureUrl + '/appointment-procedures/' + appointmentId)
            .pipe(catchError(this.handleError));
    }

    addProcedureByAptId(procedures: any): Observable<any> {
        return this.http.post<any>(this.procedureUrl + '/appointment-procedures', procedures)
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
