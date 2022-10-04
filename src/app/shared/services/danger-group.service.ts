import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, retry } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DangerGroup } from '../models/danger-group.model';

@Injectable({
  providedIn: 'root'
})
export class DangerGroupService {

  public showLoader: boolean = false;
  public readonly urlDangerGroup: string;
  public readonly urlDangerGroupList: string;

  constructor(private _httpClient: HttpClient) { 
    this.urlDangerGroup = environment.urlApiV1DangerGroup;
    this.urlDangerGroupList = environment.urlApiV1DangerGroupList;
   }

   getDangerGroup(): Observable<DangerGroup[]> {
    return this._httpClient.get<DangerGroup[]>(`${this.urlDangerGroupList}/list`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  createDangerGroup(data: DangerGroup): Observable<DangerGroup> {
    this.showLoader = true;
    return this._httpClient.post<DangerGroup>(`${this.urlDangerGroup}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getDangerGroupById(id: number): Observable<DangerGroup> {
    return this._httpClient.get<DangerGroup>(`${this.urlDangerGroup}/${id}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  updateDangerGroup(data: DangerGroup): Observable<DangerGroup> {
    return this._httpClient.post<DangerGroup>(`${this.urlDangerGroup}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }
}
