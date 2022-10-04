import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MasterTablesService {

  constructor(private _httpClient: HttpClient) { }

  getTypeDocuments(): Observable<any> {
    return this._httpClient.get<any>('api/type-documents').pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  //-- maestras java

  getTipoPared(urlMaestra: string): Observable<any> {
    return this._httpClient.get<any>(urlMaestra + '/api/v1/tipo-pared/listar').pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getTipoPiso(urlMaestra: string): Observable<any> {
    return this._httpClient.get<any>(urlMaestra + '/api/v1/tipo-piso/listar').pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getTipoTecho(urlMaestra: string): Observable<any> {
    return this._httpClient.get<any>(urlMaestra + '/api/v1/tipo-techo/listar').pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getUsoVivienda(urlMaestra: string): Observable<any> {
    return this._httpClient.get<any>(urlMaestra + '/api/v1/vivienda/condicion-uso-instalacion').pipe(

      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getCondicionUsoVivienda(urlMaestra: string): Observable<any> {
    return this._httpClient.get<any>(urlMaestra + '/api/v1/vivienda/condicion-vivienda-post-desastre').pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }
  // todo borrar data falsa
  getCeiling(): Observable<any> {
    return this._httpClient.get<any>('api/ceiling').pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getWall(): Observable<any> {
    return this._httpClient.get<any>('api/wall').pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getFloor(): Observable<any> {
    return this._httpClient.get<any>('api/floor').pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }
  getForm2b(): Observable<any> {
    return this._httpClient.get<any>('api/form-2b').pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

}
