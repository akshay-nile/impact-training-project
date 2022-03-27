import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Patient } from './patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  baseUrl = environment.baseUrl + '/api/register';

  constructor(private httpClient: HttpClient) { }

  addPatient(patient: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/patient', patient);
  }

  getAllPatients(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(this.baseUrl);
  }
}
