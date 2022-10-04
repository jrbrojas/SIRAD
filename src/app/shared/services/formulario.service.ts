import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable, retry} from "rxjs";
import {Emergency} from "../models/emergency.model";
import { Formulario } from '../models/formulario.model';
import { EvaluacionRapida } from '../models/formulario.model';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

    public showLoader: boolean = false;
    private readonly urlFormularios: string;
    private readonly urlFormulariosEdit: string;
    private readonly urlEvaluacionRapida : string

    // obtener formato por tipo y id

    constructor(private _httpClient: HttpClient) {
      this.urlFormularios = environment.urlApiV1Formularios;
      this.urlFormulariosEdit = environment.urlApiV1FormulariosUpdate;
      this.urlEvaluacionRapida = environment.urlApiV1CreateEvaluation
    }

    getFormularios(data: any): Observable<Formulario[]> {
      return this._httpClient.post<Formulario[]>(`${this.urlFormularios}/listar-simple`, data).pipe(
        retry(2),
        catchError((error: HttpErrorResponse) => {
          console.log('error', error);
          return new Observable<any>();
        })
      );
    }

    updateFormularios(data: Formulario): Observable<Formulario> {
      console.log("kasnjdjklasdhjkasdj");

      return this._httpClient.post<Emergency>(`${this.urlFormulariosEdit}`, data).pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('error', error);
          return new Observable<any>();
        })
      );
    }

    updateFormulariosAll(id: number): Observable<Formulario> {
      return this._httpClient.get<Emergency>(`${this.urlFormulariosEdit}/update-all/${id}`).pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('error', error);
          return new Observable<any>();
        })
      );
    }

    listarEvaluacionesRapidasPorEmergencia(idEmergencia: number, idEmpadronamiento: number): Observable<EvaluacionRapida> {
      return this._httpClient.get<Emergency>(`${this.urlFormularios}/listar-evaluacion-rapida-por-emergencia/${idEmergencia}/${idEmpadronamiento}`).pipe(
        retry(2),
        catchError((error: HttpErrorResponse) => {
          console.log('error', error);
          return new Observable<any>();
        })
      );
    }

    /*listarEvaluacionRapidaPorId(id: number): Observable<EvaluacionRapida> {
      return this._httpClient.get<Emergency>(`${this.urlEvaluacionRapida}/${id}/obtener-para-empadronamiento`).pipe(
        retry(2),
        catchError((error: HttpErrorResponse) => {
          console.log('error', error);
          return new Observable<any>();
        })
      );
    }*/
}
