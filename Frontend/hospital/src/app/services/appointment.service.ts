import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/Appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  apptUrl = environment.baseUrl + '/appointments/api';

  constructor(private http: HttpClient) { }

  addAppointment(appointment: any): Observable<any> {
    return this.http.post<any>(this.apptUrl + '/add-appointment', appointment)
      .pipe(catchError(this.handleError));
  }

  updateAppointment(appointment: any): Observable<any> {
    return this.http.put<any>(this.apptUrl + '/update-appointment', appointment)
      .pipe(catchError(this.handleError));
  }

  getAppointmentById(appointmentId: number): Observable<Appointment> {
    return this.http.get<Appointment>(this.apptUrl + '/get-appointment/' + appointmentId)
      .pipe(catchError(this.handleError));
  }

  getPastAppointmentByPatientId(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(this.apptUrl + '/past-appointments/' + patientId)
      .pipe(catchError(this.handleError));
  }
  getAllPastAppointments(): Observable<any[]> {
    return this.http.get<any[]>(this.apptUrl + '/past-appointments')
      .pipe(catchError(this.handleError));
  }
  
  getAppointmentsById(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.apptUrl + '/get-appointments/' + id)
      .pipe(catchError(this.handleError));
  }

  getCalendarAppointments(): Observable<any> {
    return this.http.get<any>(this.apptUrl + '/calendar-appointments')
      .pipe(catchError(this.handleError));
  }

  getCalendarAppointmentsById(id: string): Observable<any> {
    return this.http.get<any>(this.apptUrl + '/calendar-appointments/' + id)
      .pipe(catchError(this.handleError));
  }

  getAvailabilityWindows(params: any): Observable<any[]> {
    return this.http.post<any[]>(this.apptUrl + '/get-windows', params)
      .pipe(catchError(this.handleError));
  }

  getAllAppointmentDetails(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apptUrl + '/get-all')
      .pipe(catchError(this.handleError));
  }

  getMeetingTitlesByPatientId(patientId: string): Observable<any> {
    return this.http.get<any>(this.apptUrl + '/get-meeting-titles/' + patientId)
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
