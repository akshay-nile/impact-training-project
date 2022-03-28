import { Injectable } from '@angular/core';
import { PatientDetails } from '../models/patient-details';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientDetailsService {
  // private baseUrl = "http://localhost:3000/patientdetails";
  private baseUrl = environment.baseUrl + '/api/register'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getPatientDetails() {
    return this.http.get<PatientDetails[]>(this.baseUrl);
  }

  addPatientDetails(data: any) {
    return this.http.post<PatientDetails>(this.baseUrl, data, this.httpOptions)
  }

  getPatientDetailsById(id: number) {
    return this.http.get<PatientDetails>(this.baseUrl + '/' + id);
  }

  updateDemographicDetails(user: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/patient', user);
  }

}
