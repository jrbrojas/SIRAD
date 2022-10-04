import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable } from 'rxjs';
import {FamilyMembers, Form2aEmpFam, Form2aViv, Form2bMVida} from '../models/forms.model';
import { DtoEmpadronamiento, WayLife, AffectedHousing, Empadronamiento } from '../models/empadronamiento.model';

@Injectable({
  providedIn: 'root'
})
export class Form2aService {
  public showLoader: boolean = false;
  private readonly urlForm2a: string;
  private readonly urlForm2b: string;
  private readonly urlFormEmpadrona: string;
  private readonly urlFormMaster: string;
  private readonly urlGroupProducts: string;
  private readonly urlProducts: string;
  private readonly urlConsultaReniec : string;

  constructor(private _httpClient: HttpClient) {
    this.urlForm2a = environment.urlApiForm2a;
    this.urlForm2b = environment.urlApiForm2b;
    this.urlFormEmpadrona = environment.urlApiEmpadronamiento;
    this.urlFormMaster = environment.urlApiV1Maestras;
    this.urlGroupProducts = environment.urlApiGroupProducts;
    this.urlProducts = environment.urlApiProducts;
    this.urlConsultaReniec = environment.urlApiV1ConsultaReniec;
  }

  queryReniec(applicantDni, dniRequested):Observable<any>{
    return this._httpClient.get(`${this.urlConsultaReniec}${applicantDni}/${dniRequested}`).pipe(
      catchError((err : HttpErrorResponse) => {
        console.log('error', err);
        return new Observable<any>()
      })
    )
  }

  createForm2a(data: DtoEmpadronamiento): Observable<any> {
    return this._httpClient.post(`${this.urlFormEmpadrona}`, data).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('error', err);
        return new Observable<any>();
      })
    );
  }

  createFamilyInfo(data: FamilyMembers): Observable<FamilyMembers> {
    return this._httpClient.post(`${this.urlFormEmpadrona}/integrante`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  createAffectation(data: any): Observable<any> {
    return this._httpClient.post(`${this.urlFormEmpadrona}/integrante`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getFormFamily(id: number): Observable<any> {
    return this._httpClient.get(`${this.urlFormEmpadrona}/familia/${id}/integrantes`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  getHealth(): Observable<any> {
    return this._httpClient.get(`${this.urlFormMaster}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  createFamilyMv(data: Form2bMVida): Observable<Form2bMVida> {
    return this._httpClient.post(`${this.urlForm2b}/crear-medios`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getForm2bViv(id: number): Observable<any> {
    return this._httpClient.get(`${this.urlForm2b}/litar-mv/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  deleteFamMV(id: number): Observable<any> {
    return this._httpClient.delete(`${this.urlForm2b}/delete-mv/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  deleteForm2a(id: number): Observable<any> {
    return this._httpClient.delete(`${this.urlFormEmpadrona}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  deleteFamily(id: number): Observable<any> {
    return this._httpClient.delete(`${this.urlFormEmpadrona}/integrante/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  deleteEmpFamily(id: number): Observable<any> {
    return this._httpClient.delete(`${this.urlFormEmpadrona}/familia/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  getByIdForm2a(id: number): Observable<any> {
    return this._httpClient.get(`${this.urlFormEmpadrona}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  getByIdViv(id: number): Observable<any> {
    return this._httpClient.get(`${this.urlForm2a}/get-house/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  deleteViv(id: number): Observable<any> {
    return this._httpClient.delete(`${this.urlForm2a}/delete-house/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  createHousingInfo(data: Form2aViv): Observable<Form2aViv> {
    return this._httpClient.post(`${this.urlForm2a}/create-house`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  listViviById(code: number): Observable<any> {
    //this.showLoader = true;
    return this._httpClient.get(`${this.urlForm2a}/get-households/${code}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  listFamilyMembers(id: number) {
    return this._httpClient.get(`${this.urlFormEmpadrona}/integrante/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  getFamily(id: number) {
    return this._httpClient.get(`${this.urlForm2b}/litar-familia/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  listChronicIllness(): Observable<any> {
    return this._httpClient.get('/api/chronic-illness').pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  listPersonDisability(): Observable<any> {
    return this._httpClient.get('/api/person-disability').pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  listPersonalInjure(): Observable<any> {
    return this._httpClient.get('/api/personal-injure').pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  createForm2b(data: any) {
    this.showLoader = true;
    return this._httpClient.post('/api/form2a3', data);
  }



  getGroupProductsWayLife(): Observable<any>{
    return this._httpClient.get(`${this.urlGroupProducts}`).pipe(
      catchError((error:  HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  getProductsWayLife(id: number): Observable<any>{
    return this._httpClient.get(`${this.urlProducts}/${id}`).pipe(
      catchError((error:  HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  getMembersHaveWayLifeByFamily(idFamilia: number): Observable<any> {
    return this._httpClient.get(`${this.urlFormEmpadrona}/afectacion-medio-vida/integrantes/${idFamilia}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  getAllWaysLifeByFamily(idFamilia: number): Observable<any>{
    return this._httpClient.get(`${this.urlFormEmpadrona}/afectacion-medio-vida/por-familia/${idFamilia}`).pipe(
      catchError((error:  HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }



  saveWayLife(data: WayLife): Observable<any>{
    return this._httpClient.post(`${this.urlFormEmpadrona}/afectacion-medio-vida`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  deleteWayLife(id: number): Observable<any>{
    return this._httpClient.delete(`${this.urlFormEmpadrona}/afectacion-medio-vida/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  createAffectedHousing(data: AffectedHousing): Observable<AffectedHousing> {
    this.showLoader = true;
    return this._httpClient.post<AffectedHousing>(`${this.urlFormEmpadrona}/afectacion-vivienda`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  updateAffectedHousing(data: AffectedHousing): Observable<AffectedHousing> {
    this.showLoader = true;
    return this._httpClient.post<AffectedHousing>(`${this.urlFormEmpadrona}/afectacion-vivienda`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getAffectedHousingById(idFamilia: number): Observable<any> {
    return this._httpClient.get<any>(`${this.urlFormEmpadrona}/afectacion-vivienda/por-familia/${idFamilia}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  //agregado por Daniel y Sebastian para guardar el editar enpadronamiento
  updateEmpadronamiento(data: Empadronamiento): Observable<Empadronamiento> {    
    return this._httpClient.post<Empadronamiento>(`${this.urlFormEmpadrona}/updateOne`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

}
