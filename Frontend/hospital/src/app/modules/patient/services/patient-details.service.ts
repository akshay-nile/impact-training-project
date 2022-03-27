import { Injectable } from '@angular/core';
import { PatientDetails } from '../models/patient-details';
import {HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientDetailsService {
  private baseUrl = "http://localhost:3000/patientdetails";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http:HttpClient) { }

  getPatientDetails(){
    return this.http.get<PatientDetails[]>(this.baseUrl);
      
    }

  addPatientDetails(data:any) {
    return this.http.post<PatientDetails>(this.baseUrl,data, this.httpOptions)
    
  } 

  getPatientDetailsById(id:number){
     return this.http.get<PatientDetails>(this.baseUrl+'/'+id);
  }



 
}
