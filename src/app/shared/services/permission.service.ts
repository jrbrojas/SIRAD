import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, retry } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Permission } from '../models/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  public showLoader: boolean = false;
  public readonly urlPermission: string;
  public readonly urlPermissionList: string;
  public readonly urlPermissionListPaginado: string;

  constructor(private _httpClient: HttpClient) { 
    this.urlPermission = environment.urlApiV1Permission;
    this.urlPermissionList = environment.urlApiV1PermissionList;
    this.urlPermissionListPaginado = environment.urlApiV1PermissionListPaginado;
  }

  getPermissionPaginado(data: any): Observable<Permission[]> {
    return this._httpClient.post<Permission[]>(`${this.urlPermissionListPaginado}/listar-simple`, data).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getPermission(): Observable<Permission[]> {
    return this._httpClient.get<Permission[]>(`${this.urlPermissionList}/list`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getProfilePermission(idGrupoPermiso:number): Observable<Permission[]> {
    return this._httpClient.get<Permission[]>(`${this.urlPermissionList}/list/${idGrupoPermiso}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  createPermission(data: Permission): Observable<Permission> {
    this.showLoader = true;
    return this._httpClient.post<Permission>(`${this.urlPermission}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getPermissionById(id: number): Observable<Permission> {
    return this._httpClient.get<Permission>(`${this.urlPermission}/${id}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  /*getPermissionGroupById(idGrupoPermiso: number): Observable<Permission> {
    return this._httpClient.get<Permission>(`${this.urlPermission}/${idGrupoPermiso}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }*/

  updatePermission(data: Permission): Observable<Permission> {
    return this._httpClient.post<Permission>(`${this.urlPermission}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }
}
