import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminUrl = environment.baseUrl + '/admin/api';

  constructor(private http: HttpClient) { }

  getAllEmployees(adminId): Observable<any[]> {
    return this.http.get<any[]>(this.adminUrl + '/get-employees?adminId=' + adminId)
      .pipe(catchError(this.handleError));
  }

  getAllPatients(): Observable<any[]> {
    return this.http.get<any[]>(this.adminUrl + '/get-patients')
      .pipe(catchError(this.handleError));
  }

  updateEmployee(employee: any, action: string): Observable<any> {
    return this.http.put<any>(this.adminUrl + '/update-employee?action=' + action, employee)
      .pipe(catchError(this.handleError));
  }

  updatePatient(patient: any): Observable<any> {
    return this.http.put<any>(this.adminUrl + '/update-patient', patient)
      .pipe(catchError(this.handleError));
  }

  registerEmployee(employee: any): Observable<any> {
    return this.http.post<any>(this.adminUrl + '/register-employee', employee)
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
