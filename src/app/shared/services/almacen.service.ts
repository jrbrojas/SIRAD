import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Almacen } from '../models/almacen.model';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  public showLoader : boolean = false;
  private readonly urlListAlmacenes : string;

  constructor(
    private _httpClient : HttpClient
  ) { 
    this.urlListAlmacenes = environment.urlApiV1ListAlmacenes;
  }

  getAlmacenUbigeo() : Observable<Almacen[]>{
    return this._httpClient.get<Almacen[]>(`${this.urlListAlmacenes}listar-ubigeos`).pipe(
      retry(2),
      catchError((error : HttpErrorResponse) => {
        return new Observable<any>();
      })
    )
  }

  getAlmacen(ubigeo : any):Observable<Almacen[]>{
    return this._httpClient.get<Almacen[]>(`${this.urlListAlmacenes}listar-almacenes/${ubigeo}`).pipe(
      retry(2),
      catchError((error : HttpErrorResponse) => {
        return new Observable<any>();
      })
    )
  }

}
