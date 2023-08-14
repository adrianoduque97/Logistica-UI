import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { TrailerBase } from '../models/trailer';
import { VehiculoBase } from '../models/vehiculo';
import { RutasBase } from '../models/rutas';
import { ContenedorBase } from '../models/contenedor';
import { QueryParams } from '../models/query-params';
import { MantenimientoBase } from '../models/mantenimiento';

@Injectable({
  providedIn: 'root'
})
export class SilogtranService {

  baseurl = 'https://provizcaino.colombiasoftware.net/index.php';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  GetToken(): Observable<any> {

    var body = {
      "usuario_login": "ADRIAN.DUQUE",
      "usuario_password": "23AppSILO"
    };

    var params = { params: new HttpParams().set('api', 'Servicio.Seguridad.login') }

    return this.http
      .post<any>(this.baseurl, body, params)
      .pipe(retry(1), catchError(this.errorHandle));
  }


  GetTrailers(token: string, { pagina, placa, codigo }: QueryParams): Observable<TrailerBase> {
    var params = new HttpParams().set('api', 'Servicio.ApiProvizcaino.getTraileres')
      .append('pagina', pagina ?? '').append('placa', placa ?? '').append('codigo', codigo ?? '');
    var headers = new HttpHeaders().set('Authorization', token)

    const options = { params: params, headers: headers }

    return this.http
      .get<any>(this.baseurl, options)
      .pipe(retry(1), catchError(this.errorHandle));
  }

  GetVehiculos(token: string, { pagina, placa, codigo }: QueryParams): Observable<VehiculoBase> {
    var params = new HttpParams().set('api', 'Servicio.ApiProvizcaino.getVehiculos')
      .append('pagina', pagina ?? '').append('placa', placa ?? '').append('codigo', codigo ?? '');
    var headers = new HttpHeaders().set('Authorization', token)

    const options = { params: params, headers: headers }

    return this.http
      .get<any>(this.baseurl, options)
      .pipe(retry(1), catchError(this.errorHandle));
  }

  GetRutas(token: string, { origen, destino, pagina, codigo }: QueryParams): Observable<RutasBase> {
    var params = new HttpParams().set('api', 'Servicio.ApiProvizcaino.getRutas')
      .append('ciudad_origen', origen ?? '').append('ciudad_destino', destino ?? '')
      .append('pagina', pagina ?? '').append('codigo', codigo ?? '');
    var headers = new HttpHeaders().set('Authorization', token)

    const options = { params: params, headers: headers }

    return this.http
      .get<any>(this.baseurl, options)
      .pipe(retry(1), catchError(this.errorHandle));
  }

  GetContenedores(token: string, { pagina, numero, codigo }: QueryParams): Observable<ContenedorBase> {
    var params = new HttpParams().set('api', 'Servicio.ApiProvizcaino.getContenedores')
      .append('pagina', pagina ?? '').append('numero', numero ?? '').append('codigo', codigo ?? '');
    var headers = new HttpHeaders().set('Authorization', token);

    const options = { params: params, headers: headers }

    return this.http
      .get<any>(this.baseurl, options)
      .pipe(retry(1), catchError(this.errorHandle));
  }

  GetMantenimientos(token: string, { pagina, equipo, codigo }: QueryParams): Observable<MantenimientoBase> {
    var params = new HttpParams().set('api', 'Servicio.ApiProvizcaino.getMantenimientos')
      .append('pagina', pagina ?? '').append('equipo', equipo ?? '').append('codigo', codigo ?? '');
    var headers = new HttpHeaders().set('Authorization', token);

    const options = { params: params, headers: headers }

    return this.http
      .get<any>(this.baseurl, options)
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
