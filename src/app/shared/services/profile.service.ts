import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, retry } from 'rxjs';
import { Profile } from '../models/profile';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public showLoader: boolean = false;
  public readonly urlProfile: string;
  public readonly urlProfileList: string;

  constructor(private _httpClient: HttpClient) {
    this.urlProfile = environment.urlApiV1Profile;
    this.urlProfileList = environment.urlApiV1ProfileList;
  }

  getProfile(): Observable<Profile[]> {
    return this._httpClient.get<Profile[]>(`${this.urlProfileList}/listar-simple`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  createProfile(data: Profile): Observable<Profile> {
    this.showLoader = true;
    return this._httpClient.post<Profile>(`${this.urlProfile}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getProfileById(id: number): Observable<Profile> {
    return this._httpClient.get<Profile>(`${this.urlProfile}/${id}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  updateProfile(data: Profile): Observable<Profile> {
    return this._httpClient.post<Profile>(`${this.urlProfile}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }
}
