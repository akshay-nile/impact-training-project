import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from '../models/Patient';
import { Appointment } from '../models/Appointment';
import { Vitals } from '../models/Vitals';


@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    constructor(private http: HttpClient) { }

    baseUrl: string = environment.baseUrl + '/hospital';
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

    addVitals(vital: any): Observable<boolean> {
        return this.http.post<boolean>(this.vitalsUrl, vital)
            .pipe(catchError(this.handleError));
    }
    updateVitals(vital: any): Observable<boolean> {
        return this.http.put<boolean>(this.vitalsUrl, vital)
            .pipe(catchError(this.handleError));
    }
    deleteVitals(id: any): Observable<boolean> {
        return this.http.delete<boolean>(this.vitalsUrl + '/' + id)
            .pipe(catchError(this.handleError));
    }
    getVitalByPatientId(id: any): Observable<Vitals> {
        return this.http.get<Vitals>(this.vitalsUrl + `/aptId/${id}`)
            .pipe(catchError(this.handleError));
    }
    getEmpIdByEmail(email: string): Observable<any> {
        return this.http.get<any>(this.baseUrl + `/physicianEmail/${email}`)
            .pipe(catchError(this.handleError));
    }
    updatePatientDetails(patient: any): Observable<Patient> {
        return this.http.put<Patient>(this.baseUrl + '/patientDetails/', patient)
            .pipe(catchError(this.handleError));
    }
    getVitalDetails(): Observable<Vitals[]> {
        return this.http.get<Vitals[]>(this.vitalsUrl + '/getAllVitalDetails')
            .pipe(catchError(this.handleError));
    }

    addAppointmentDetails(appointment: any): Observable<boolean> {
        return this.http.post<boolean>(this.apptUrl, appointment)
            .pipe(catchError(this.handleError));
    }

    updateAppointmentDetails(appointment: any): Observable<boolean> {
        return this.http.put<boolean>(this.apptUrl, appointment)
            .pipe(catchError(this.handleError));
    }
    deleteAppointmentDetails(id: any): Observable<boolean> {
        return this.http.delete<boolean>(this.apptUrl + `/${id}`)
            .pipe(catchError(this.handleError));
    }
    getAppointmentDetails(id: any): Observable<Appointment> {
        return this.http.get<Appointment>(this.apptUrl + `/${id}`)
            .pipe(catchError(this.handleError));
    }
    getCalendarAppointment(): Observable<any> {
        return this.http.get<any>(this.apptUrl + '/getCalendarAppointments')
            .pipe(catchError(this.handleError));
    }
    getAvailableTimeSlots(physician: string, date: string): Observable<string[]> {
        return this.http.get<string[]>(this.apptUrl + `/timeslots/${physician}/${date}`)
            .pipe(catchError(this.handleError));
    }
    getAllAppointmentDetails(): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(this.apptUrl + '/getAllAppointments')
            .pipe(catchError(this.handleError));
    }

    getAllPhysicianNames(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl + '/physician/names')
            .pipe(catchError(this.handleError));
    }

    getAllPatientEmail(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl + '/patient/names')
            .pipe(catchError(this.handleError));
    }
    getPatientByEmail(email: string): Observable<number> {
        return this.http.get<number>(this.baseUrl + `/patient/email/${email}`)
            .pipe(catchError(this.handleError));
    }

    getPatientByPatientId(id: number): Observable<any> {
        return this.http.get<any>(this.baseUrl + `/patient/id/${id}`)
            .pipe(catchError(this.handleError));
    }

    changeUserPassword(userCredentials: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/api/user/change-password/employee', userCredentials)
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