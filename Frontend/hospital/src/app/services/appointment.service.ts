import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/Appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }
  apptUrl = environment.baseUrl + '/appointments/api';
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
