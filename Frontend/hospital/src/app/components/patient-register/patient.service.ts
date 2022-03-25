import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Patient } from './patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  baseUrl='http://localhost:3000/patients';
  errorMsg: string ='';

  constructor(private httpClient: HttpClient) { }

  addPatient(patient: Patient) : Observable<Patient> {
    return this.httpClient.post<Patient>(this.baseUrl, patient, {
      headers: new HttpHeaders ({
        'Content-Type' : 'application/json'
      })
    })
  }

  getAllPatients(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(this.baseUrl);
  }
}
