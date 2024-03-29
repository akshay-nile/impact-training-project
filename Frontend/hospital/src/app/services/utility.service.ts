import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    constructor(private http: HttpClient) { }

    baseUrl = environment.baseUrl + '/hospital';
    vitalsUrl = environment.baseUrl + '/patient-visits/vitals';
    apptUrl = environment.baseUrl + '/appointments/api';

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

    getEmpIdByEmail(email: string): Observable<any> {
        return this.http.get<any>(this.baseUrl + `/physicianEmail/${email}`)
            .pipe(catchError(this.handleError));
    }

    updatePatientDetails(patient: any): Observable<any> {
        return this.http.put<any>(this.baseUrl + '/patientDetails', patient)
            .pipe(catchError(this.handleError));
    }

    getPatientById(patientId: any): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/get-patient/' + patientId)
            .pipe(catchError(this.handleError));
    }

    getAllPhysicians(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl + '/physician/names')
            .pipe(catchError(this.handleError));
    }

    getAllEmployees(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl + '/get-employees')
            .pipe(catchError(this.handleError));
    }

    getAllPatientNames(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl + '/patient/names')
            .pipe(catchError(this.handleError));
    }

    changeUserPassword(userCredentials: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/api/change-password', userCredentials)
            .pipe(catchError(this.handleError));
    }

    checkOldPassword(userId: any, password: any): Observable<any> {
        return this.http.get<any>(this.baseUrl + `/api/change-password/${userId}/${password}`)
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