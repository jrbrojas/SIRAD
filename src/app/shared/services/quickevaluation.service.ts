import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GeoQuickEvaluation, QuickEvaluation, QuickEvaluationDto } from '../models/quickevaluation-model';
import { environment } from '../../../environments/environment';
import { GrupoPeligro, PopulatedCenter } from '../models/emergency.model';

@Injectable({
  providedIn: 'root'
})
export class QuickEvaluationService {

  public showLoader: boolean = false;
  private readonly urlPopulatedCenter: string;
  private readonly urlCreate: string;
  private readonly urlPlaces: string;
  //private readonly urlGeometriaEvaluacion: string;

  constructor(private _httpClient: HttpClient) {
    this.urlPopulatedCenter = environment.urlApiV1CentroPoblado;
    this.urlCreate = environment.urlApiV1CreateEvaluation;
    this.urlPlaces = environment.urlApiPlaces;
  }

  getLifeHealth(): Observable<any> {
    return this._httpClient.get<any>('api/life_health').pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getBasicServices(): Observable<any> {
    return this._httpClient.get<any>('api/basic_services').pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  createEvaluation(data: QuickEvaluationDto): Observable<QuickEvaluationDto> {
    this.showLoader = true;
    return this._httpClient.post<QuickEvaluationDto>(`${this.urlCreate}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  updateEvaluation(data: QuickEvaluationDto): Observable<QuickEvaluationDto> {
    this.showLoader = true;
    return this._httpClient.post<QuickEvaluationDto>(`${this.urlCreate}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getEvaluationById(id: number): Observable<QuickEvaluationDto> {
    return this._httpClient.get<QuickEvaluationDto>(`${this.urlCreate}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getPopulatedCenter(code: any): Observable<PopulatedCenter[]> {
    return this._httpClient.get<PopulatedCenter[]>(`${this.urlPopulatedCenter}/${code}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  existQuickEvaluation(idEmergency: number): Observable<any> {
    return this._httpClient.get<any>(`${this.urlCreate}/existe-evarap/${idEmergency}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getOtherActivities(): Observable<any> {
    return this._httpClient.get<any>('api/other-activities').pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getOtherNeeds(): Observable<any> {
    return this._httpClient.get<any>('api/other-needs').pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getInfrastructure(): Observable<any> {
    return this._httpClient.get<any>('api/infrastructures').pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getLivelihoods(): Observable<any> {
    return this._httpClient.get<any>('api/livelihoods').pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getTaskTodo(): Observable<any> {
    return this._httpClient.get<any>('api/task-todo').pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getNeedsSupport(): Observable<any> {
    return this._httpClient.get<any>('api/needs-support').pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }


  deleteQuickEvaluation(id: number): Observable<QuickEvaluation> {
    return this._httpClient.delete<QuickEvaluation>(`${this.urlCreate}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getKindPlaces(): Observable<any> {
    return this._httpClient.get<any>(`${this.urlPlaces}/lista-tipo-lugar`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getSpecificPlaces(): Observable<any> {
    return this._httpClient.get<any>(`${this.urlPlaces}/lista-lugar-especifico`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

}
