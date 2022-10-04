import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable, retry} from "rxjs";
//import { FamilyGroup } from '../models/familygroup.model';

@Injectable({
  providedIn: 'root'
})
export class FamilyGroupService {

  public showLoader: boolean = false;
  private readonly urlFamilyGroup: string;

  constructor(private _httpClient: HttpClient) {
    this.urlFamilyGroup = environment.urlApiV1FamilyGroup;
  }

  getFamilyGroup(data: any): Observable<any> {
    return this._httpClient.post(`${this.urlFamilyGroup}list`, data).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }
}
