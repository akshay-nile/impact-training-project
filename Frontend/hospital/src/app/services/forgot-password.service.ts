import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.baseUrl + '/api/forgot-password';

  sendOtp(email: string): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + '/send-otp', email)
      .pipe(catchError(this.handleError));
  }

  resetPassword(passUpdate: any): Observable<string> {
    return this.http.post<string>(this.baseUrl + '/reset', passUpdate)
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
