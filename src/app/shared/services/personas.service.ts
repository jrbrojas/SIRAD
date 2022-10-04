import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../models/emergency.model';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private readonly urlPersonas : string

  constructor(
    private _httpClient : HttpClient
  ) { 
    this.urlPersonas = environment.urlApiV1ConsultaPersona
  }


  guardarPersona(data : Persona) : Observable<Persona>{
    return this._httpClient.post<Persona>(`${this.urlPersonas}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error)
        return new Observable<any>();
      })
    )
  }

  obtenerPersona(dni : string) : Observable<Persona>{
    return this._httpClient.get<Persona>(`${this.urlPersonas}${dni}`).pipe(
      catchError((error : HttpErrorResponse) => {
        console.log('error ', error)
        return new Observable<any>()
      })
    )
  }
}
