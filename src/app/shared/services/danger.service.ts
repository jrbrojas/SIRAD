import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, retry } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Danger } from '../models/danger.model';

@Injectable({
  providedIn: 'root'
})
export class DangerService {

  public showLoader: boolean = false;
  public readonly urlDanger: string;
  public readonly urlDangerList: string;
  constructor(private _httpClient: HttpClient) { 
    this.urlDanger = environment.urlApiV1Danger;
    this.urlDangerList = environment.urlApiV1DangerList;
   }

   getDanger(data:any): Observable<Danger[]> {
    return this._httpClient.post<Danger[]>(`${this.urlDangerList}/listar-simple`,data).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  createDanger(data: Danger): Observable<Danger> {
    this.showLoader = true;
    return this._httpClient.post<Danger>(`${this.urlDanger}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getDangerById(id: number): Observable<Danger> {
    return this._httpClient.get<Danger>(`${this.urlDanger}/${id}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  updateDanger(data: Danger): Observable<Danger> {
    return this._httpClient.post<Danger>(`${this.urlDanger}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }
}
