import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recursos, ArticuloAtendido } from '../models/emergency.model';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {

  private readonly urlRecursos : string;

  constructor(
    private _httpClient : HttpClient
  ) { 
    this.urlRecursos = environment.urlApiV1Recursos;
  }

  listarRecursos(id_tipo_recurso : number) : Observable<Recursos[]>{
    return this._httpClient.get<Recursos[]>(`${this.urlRecursos}/${id_tipo_recurso}`).pipe(
      retry(2),
      catchError((error : HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  



}


