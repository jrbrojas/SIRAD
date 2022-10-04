import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AtencionEmergencia, ArticuloAtendido, EmergenciaArticulosAtencion } from '../models/emergency.model';

@Injectable({
  providedIn: 'root'
})
export class EmergencyAtentionService {
  public showLoader : boolean = false;
  private readonly urlEmergencyAtention : string;
  private readonly urlArticuloAtendido : string;
  private readonly urlEmergencyArticleAtention : string;
  
  constructor(
    private _httpClient : HttpClient
  ) {
    this.urlEmergencyAtention = environment.urlApiV1EmergencyAtention;
    this.urlArticuloAtendido = environment.urlApiV1EmergencyArticleAtention;
    this.urlEmergencyArticleAtention = environment.urlApiV1EmergencyArticleAtention
  }


  guardarAtencionEmergencia(data : AtencionEmergencia, file):Observable<AtencionEmergencia>{
    this.showLoader = true;
    const fd = new FormData();
    fd.append('descripcion', data.descripcion);
    fd.append('fechaAtencion', data.fechaAtencion);
    fd.append('nombreAlmacen', data.nombreAlmacen)
    fd.append('ubigeoAlmacen', data.ubigeoAlmacen);
    fd.append('file', file),
    fd.append('codigoSinpad', data.codigoSinpad);
    fd.append('estado', data.estado.toString());
    fd.append('habilitado', data.habilitado.toString())
    return this._httpClient.post<AtencionEmergencia>(`${this.urlEmergencyAtention}`, fd).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  guardarAtencionEmergenciaUpdate(data : AtencionEmergencia):Observable<AtencionEmergencia>{
    this.showLoader = true;
    return this._httpClient.post<AtencionEmergencia>(`${this.urlEmergencyAtention}/update`,data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  obtenerAtenciones(codigoSinpad : any):Observable<AtencionEmergencia[]>{
    return this._httpClient.get<AtencionEmergencia[]>( `${this.urlEmergencyAtention}/listar/${codigoSinpad}`).pipe(
      retry(2),
      catchError((error : HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  eliminarAtencion(id : any):Observable<AtencionEmergencia>{
    return this._httpClient.delete<AtencionEmergencia>(`${this.urlEmergencyAtention}/${id}`).pipe(
      retry(2),
      catchError((error : HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
        
      })
    )
  }

  actualizarAtencion(id : any, data : AtencionEmergencia, file):Observable<AtencionEmergencia>{
    const fd = new FormData();
    fd.append('descripcion', data.descripcion);
    fd.append('fechaAtencion', data.fechaAtencion);
    fd.append('nombreAlmacen', data.nombreAlmacen)
    fd.append('ubigeoAlmacen', data.ubigeoAlmacen);
    fd.append('file', file),
    fd.append('codigoSinpad', data.codigoSinpad);
    fd.append('estado', data.estado.toString());
    fd.append('habilitado', data.habilitado.toString())
    return this._httpClient.put<AtencionEmergencia>(`${this.urlEmergencyAtention}/${id}`, fd).pipe(
      retry(2),
      catchError((error : HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
        
      })
    )
  }

  obtenerArticulosAtencion(id : string) : Observable<EmergenciaArticulosAtencion[]>{
    return this._httpClient.get<EmergenciaArticulosAtencion[]>(`${this.urlEmergencyArticleAtention}/${id}`).pipe(
      retry(2),
      catchError((error : HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
        
      })
    )
  }

  eliminarArticuloAtencion(id : number) : Observable<EmergenciaArticulosAtencion>{
    return this._httpClient.delete<EmergenciaArticulosAtencion>(`${this.urlEmergencyArticleAtention}/${id}`).pipe(
      retry(2),
      catchError((error : HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })      
      )
    }

    agregarRecursoAtendido(data : ArticuloAtendido) : Observable<ArticuloAtendido>{
      return this._httpClient.post<ArticuloAtendido>(`${this.urlArticuloAtendido}` , data).pipe(
        catchError((error : HttpErrorResponse) => {
          console.log('error', error);
          return new Observable<any>();
        })
      )
    }
}
