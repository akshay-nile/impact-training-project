import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemographicsService {
  private baseUrl = environment.hospital + '/hospital'

  constructor(private http: HttpClient) { }

  updateDemographics(user: any) {
    return this.http.post<any>(this.baseUrl + '/register', user);
  }

}
