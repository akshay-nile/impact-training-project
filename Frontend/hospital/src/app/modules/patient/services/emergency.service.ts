import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Emergency } from '../models/emergency';
import { pipe } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {

  private baseUrl="http://localhost:3000/comments";

  private handleError(errorResponse:HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent){
      console.error('Client side error:',errorResponse.error.message);
    }else{
      console.error('Server side error',errorResponse);
    }
  }
  

  constructor(private http:HttpClient) { }

  samplemethod(data:Emergency){
    console.log(data);
  }
 


  addEmergencyContactInfo(emergency:any){
    return this.http.post<Emergency>(this.baseUrl,emergency,{
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    })
    
  }

  updateEmergencyContactInfo(emergency:Emergency,id:number):Observable<void>{
    return this.http.put<void>(this.baseUrl+'/'+id,emergency,{
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    });
  }
   getEmergencyContactDetailsById(id:number){
     return this.http.get(this.baseUrl+'/'+id);
   }

}
