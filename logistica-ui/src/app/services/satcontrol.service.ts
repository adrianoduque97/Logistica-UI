import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SatcontrolService {
  
  baseurl = 'https://si-logistica-api.azurewebsites.net/SatControl/';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  GetMobileList( ): Observable<any> {
    var params = new HttpParams().set('sLogin', 'Sistemassilogisticaecu').append('sPassword', 'sistemassilogisticaecu2023')

    const options = { params: params}

    return this.http
      .get<any>(this.baseurl+'/GetMobileList', options)
      .pipe(retry(1), catchError(this.errorHandle));
  }

  GetHistoryByPlate(placa: string): Observable<any>{
    var params = new HttpParams().set('Plate', placa);
    const options = { params: params}

    return this.http
    .get<any>(this.baseurl+'/GetHistoryByPlate', options)
    .pipe(retry(1), catchError(this.errorHandle));
  }


  errorHandle(error: { error: { message: string; }; status: any; message: any; }) {
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
