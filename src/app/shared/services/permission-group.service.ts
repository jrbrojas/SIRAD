import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, retry } from 'rxjs';
import { PermissionGroup } from '../models/permission-group';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionGroupService {

  public showLoader: boolean = false;
  public readonly urlPermissionGroup: string;
  public readonly urlPermissionGroupList: string;

  constructor(private _httpClient: HttpClient) { 
    this.urlPermissionGroup = environment.urlApiV1PermissionGroup;
    this.urlPermissionGroupList = environment.urlApiV1PermissionGroupList;
   }

   getPermissionGroup(): Observable<PermissionGroup[]> {
    return this._httpClient.get<PermissionGroup[]>(`${this.urlPermissionGroupList}/list`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

   createPermissionGroup(data: PermissionGroup): Observable<PermissionGroup> {
    this.showLoader = true;
    return this._httpClient.post<PermissionGroup>(`${this.urlPermissionGroup}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getPermissionGroupById(id: number): Observable<PermissionGroup> {
    return this._httpClient.get<PermissionGroup>(`${this.urlPermissionGroup}/${id}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  updatePermissionGroup(data: PermissionGroup): Observable<PermissionGroup> {
    return this._httpClient.post<PermissionGroup>(`${this.urlPermissionGroup}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }
}
