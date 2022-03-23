import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: string = 'http://localhost:9000/getOtp';

  getOtp(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/${email}`)
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
