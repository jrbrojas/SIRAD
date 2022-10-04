import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, retry } from 'rxjs';
import { Emergency, TipoPeligro, Ubigeo, GrupoPeligro, EmergencyRecord, Solicitudes } from '../models/emergency.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {

  public showLoader: boolean = false;
  private readonly urlListEmergencies: string;
  private readonly urlEmergency: string;
  private readonly urlUbigeo: string;
  private readonly urlPeligro: string;
  private readonly urlGroup: string;
  private readonly urlApiV1EmergencyRecord : string;
  private readonly urlListSolicitudEmergencia : string;
  private readonly urlSolicitud : string;

  constructor(private _httpClient: HttpClient) {
    this.urlListEmergencies = environment.urlApiV1ListEmergencies;
    this.urlEmergency = environment.urlApiV1Emergency;
    this.urlUbigeo = environment.urlApiV1Ubigeo;
    this.urlPeligro = environment.urlApiV1Peligro;
    this.urlGroup = environment.urlApiV1Group;
    this.urlApiV1EmergencyRecord = environment.urlApiV1EmergencyRecord;
    this.urlSolicitud = environment.urlApiV1Solicitud;
    this.urlListSolicitudEmergencia = environment.urlApiv1SolicitudEmergencia;
  }

  getEmergencies(data: any): Observable<Emergency[]> {
    console.log(data)
    return this._httpClient.post<Emergency[]>(`${this.urlListEmergencies}listar-simple`, data).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getEmergenciesElininadas(data: any): Observable<Emergency[]> {
    console.log(data)
    return this._httpClient.post<Emergency[]>(`${this.urlListEmergencies}listar-simple/eliminados`, data).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getEmergencyById(id: number): Observable<Emergency> {
    return this._httpClient.get<Emergency>(`${this.urlEmergency}/${id}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getTipoPeligro(): Observable<TipoPeligro[]> {
    return this._httpClient.get<TipoPeligro[]>(`${this.urlPeligro}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getGrupoPeligro(code: string): Observable<GrupoPeligro[]> {
    return this._httpClient.get<GrupoPeligro[]>(`${this.urlGroup}/${code}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getUbigeos(): Observable<Ubigeo[]> {
    return this._httpClient.get<Ubigeo[]>(`${this.urlUbigeo}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  createEmergency(data: Emergency): Observable<Emergency> {
    this.showLoader = true;
    return this._httpClient.post<Emergency>(`${this.urlEmergency}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  updateEmergency(data: Emergency): Observable<Emergency> {
    return this._httpClient.post<Emergency>(`${this.urlEmergency}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  deleteEmergency(id: number): Observable<Emergency> {
    return this._httpClient.delete<Emergency>(`${this.urlEmergency}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }
  
  searchEmergency(data: any): Observable<any> {
    return this._httpClient.post<any>('api/emergencies', data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getChangeHistorie(): Observable<any> {
    return this._httpClient.get<any>('api/change-historie').pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  createEmergencyRecord(data : EmergencyRecord):Observable<EmergencyRecord>{
    return this._httpClient.post<EmergencyRecord>(`${this.urlApiV1EmergencyRecord}`, data).pipe(
      catchError((error : HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  getEmergenciesRecord(data: any): Observable<EmergencyRecord[]> {
    return this._httpClient.get<EmergencyRecord[]>(`${this.urlApiV1EmergencyRecord}/${data}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  //Solicitudes de Cierre 
  getSolicitudesEmergencia(data: any): Observable<Solicitudes[]> {
    console.log(data)
    return this._httpClient.post<Solicitudes[]>(`${this.urlListSolicitudEmergencia}listar-simple`, data).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  createSolicitudesEmergencia(data: Solicitudes): Observable<Solicitudes> {
    this.showLoader = true;
    return this._httpClient.post<Solicitudes>(`${this.urlSolicitud}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  updateSolicitudesEmergencia(data: Solicitudes): Observable<Solicitudes> {
    return this._httpClient.post<Solicitudes>(`${this.urlSolicitud}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

}
