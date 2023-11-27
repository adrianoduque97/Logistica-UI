import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { PlannerRequest } from '../models/plannerRequest';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Base url
  baseurl = 'https://si-logistica-api.azurewebsites.net/';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  GetPlanner(): Observable<PlannerRequest[][]> {
    return this.http
      .get<PlannerRequest[][]>(this.baseurl + '/Planner/GetPlannerHistory')
      .pipe(retry(1), catchError(this.errorHandl));
  }


  errorHandl(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
