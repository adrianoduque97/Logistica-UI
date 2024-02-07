import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
      'Access-Control-Allow-Origin':'*'
    }),
  };

  GetPlanner(): Observable<PlannerRequest[][]> {
    return this.http
      .get<PlannerRequest[][]>(this.baseurl + '/Planner/GetPlannerHistory')
      .pipe(retry(1), catchError(this.errorHandl));
  }

  GetPlannerByDateRange(startDate: string|Date, endDate: string|Date): Observable<PlannerRequest[]> {

    var params = new HttpParams().set('StartDate', startDate.toLocaleString()).append('EndDate', endDate.toLocaleString());
    const options = { params: params}

    return this.http
      .get<PlannerRequest[]>(this.baseurl + '/Planner/GetPlannerHistoryByDateRange',options)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  SavePlan(plan: PlannerRequest[]): Observable<PlannerRequest> {
    return this.http
      .post<PlannerRequest>(this.baseurl + '/Planner/SavePlan',plan )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  DeletePlan(plan: any): Observable<any> {
    var params = new HttpHeaders().set('plan', plan);
    const options = { headers: params}
    
    return this.http
      .delete<any>(this.baseurl + '/Planner/DeletePlan', options)
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
