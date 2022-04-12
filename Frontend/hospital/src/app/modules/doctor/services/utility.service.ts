import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/Appointment';
import { Diagnosis } from '../models/Diagnosis';
import { Medication } from '../models/Medication';
import { Prescription } from '../models/Prescription';
import { Procedure } from '../models/Procedure';
import { Vitals } from '../models/Vitals';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    constructor(private http: HttpClient) { }

    baseUrl: string = environment.baseUrl + '/api';

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

    addVitals(vital: any): Observable<boolean> {
        return this.http.post<boolean>('http://localhost:8084/api/vital/', vital)
            .pipe(catchError(this.handleError));
    }
    updateVitals(vital: any): Observable<boolean> {
        return this.http.put<boolean>('http://localhost:8084/api/vital/', vital)
            .pipe(catchError(this.handleError));
    }
    deleteVitals(id: any): Observable<boolean> {
        return this.http.delete<boolean>(`http://localhost:8084/api/vital/${id}`)
            .pipe(catchError(this.handleError));
    }
    getVitalByPatientId(id: any): Observable<Vitals> {
        console.log("INSIDE SERVICE"+id);
        
        return this.http.get<Vitals>(`http://localhost:8084/api/vital/aptId/${id}`)
            .pipe(catchError(this.handleError));
    }
    getVitalDetails(): Observable<Vitals[]> {
        return this.http.get<Vitals[]>('http://localhost:8084/api/vital/getAllVitalDetails')
            .pipe(catchError(this.handleError));
    }

    addAppointmentDetails(appointment: any): Observable<boolean> {
        return this.http.post<boolean>('http://localhost:8085/api/appointment/', appointment)
            .pipe(catchError(this.handleError));
    }

    updateAppointmentDetails(appointment: any): Observable<boolean> {
        return this.http.put<boolean>('http://localhost:8085/api/appointment/', appointment)
            .pipe(catchError(this.handleError));
    }
    deleteAppointmentDetails(id: any): Observable<boolean> {
        return this.http.delete<boolean>(`http://localhost:8085/api/appointment/${id}`)
            .pipe(catchError(this.handleError));
    }
    getAppointmentDetails(id: any): Observable<Appointment> {
        return this.http.get<Appointment>(`http://localhost:8085/api/appointment/${id}`)
            .pipe(catchError(this.handleError));
    }
    getAllAppointmentDetails(): Observable<Appointment[]> {
        return this.http.get<Appointment[]>('http://localhost:8085/api/appointment/getAllAppointments')
            .pipe(catchError(this.handleError));
    }
    
    getAllPhysicianNames(): Observable<string[]> {
        return this.http.get<string[]>('http://localhost:8081/api/employee/names')
            .pipe(catchError(this.handleError));
    }

    getAllPatientEmail(): Observable<string[]> {
        return this.http.get<string[]>('http://localhost:8081/api/patient/emails')
            .pipe(catchError(this.handleError));
    }
    getPatientByEmail(email:string): Observable<number> {
        return this.http.get<number>(`http://localhost:8081/api/patient/email/${email}`)
            .pipe(catchError(this.handleError));
    }

    phoneExists(phone: string): Observable<boolean> {
        return this.http.post<boolean>(this.baseUrl + '/exists/phone', phone)
            .pipe(catchError(this.handleError));
    }
    // adding doctor module
    getMedicationDetails(): Observable<Medication[]> {
        return this.http.get<Medication[]>('http://localhost:8090//api/medication/getAllMedicationDetails')
            .pipe(catchError(this.handleError));
    }
    getProcedureDetails(): Observable<Procedure[]> {
        return this.http.get<Procedure[]>('http://localhost:8089/api/procedure/getAllProcedureDetails')
            .pipe(catchError(this.handleError));
    }
    getDiagnosisDetails(): Observable<Diagnosis[]> {
        return this.http.get<Diagnosis[]>('http://localhost:8088/api/diagnosis/getAllDiagnosisDetails')
            .pipe(catchError(this.handleError));
    }
    getPrescriptionDetails(): Observable<Prescription[]> {
        return this.http.get<Prescription[]>('http://localhost:8092/api/prescription/getAllPrescriptionDetails')
            .pipe(catchError(this.handleError));
    }
    addPrescription(prescription: any): Observable<boolean> {
        return this.http.post<boolean>('http://localhost:8092/api/prescription/', prescription)
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