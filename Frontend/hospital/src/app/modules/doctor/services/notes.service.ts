import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Note } from "../models/Note";

@Injectable({
    providedIn: 'root'
})
export class NoteService {

    constructor(private http: HttpClient) { }

    baseUrl: string = 'http://localhost:8083/api/note';

    getNotes(): Observable<any> {
        return this.http.get<any>(this.baseUrl+'/getAllNotes').pipe(catchError(this.handleError));;
    }
    getNoteById(id:number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));;
    }

    addNote(note: Note): Observable<boolean> {
        return this.http.post<boolean>(this.baseUrl + '/addNote', note)
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