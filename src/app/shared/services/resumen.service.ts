import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import {FamilyMembers, Form2aEmpFam, Form2aViv, Form2bMVida} from '../models/forms.model';
import { DtoEmpadronamiento, WayLife, AffectedHousing, Empadronamiento } from '../models/empadronamiento.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ResumenService {

    private readonly urlResumen: string;

    constructor(private _httpClient: HttpClient) {
        this.urlResumen = environment.urlApiResumen;
    }

    
    getResumenEmpadronamiento2a(idEmpadronaiento: number): Observable<any> {
        return this._httpClient.get(`${this.urlResumen}/empadronamiento/${idEmpadronaiento}/2a`).pipe(
            catchError((error: HttpErrorResponse) => {
            console.log('error', error);
            return new Observable<any>();
            })
        )
    }

    getResumenEmpadronamiento2b(idEmpadronaiento: number): Observable<any> {
        return this._httpClient.get(`${this.urlResumen}/empadronamiento/${idEmpadronaiento}/2b`).pipe(
            catchError((error: HttpErrorResponse) => {
            console.log('error', error);
            return new Observable<any>();
            })
        )
    }

}  