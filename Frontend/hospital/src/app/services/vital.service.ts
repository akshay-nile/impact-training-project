import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vitals } from '../models/Vitals';

@Injectable({
  providedIn: 'root'
})
export class VitalService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.baseUrl + '/hospital';
  vitalsUrl = environment.baseUrl + '/patient-visits/vitals';

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

  getVitalByApptId(appointmentId: any): Observable<Vitals> {
    return this.http.get<Vitals>(this.vitalsUrl + '/aptId/' + appointmentId)
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
