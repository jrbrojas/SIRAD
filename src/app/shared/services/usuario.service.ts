import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, retry } from 'rxjs';
//import { Profile } from '../models/profile';
import { environment } from '../../../environments/environment';
import { Region, Provincia, Distrito, Usuario, User, UsuarioEditar, UsuarioDetalle, Cargo, InstitucionPublica, InstitucionPrivada, UsuarioSolicitudListar, PerfilNivel, SolicitudUsuario, SolicitudUsuarioEditar, EliminarSolicitud,ExisteDni,ExisteEmail,EliminarUsuario  } from '../models/usuario.model';
import { LoginRequestModel } from "../../auth/login/login-request";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json ' })
};
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public showLoader: boolean = false;
  public readonly urlRegionProvDistrito: string;
  public readonly urlUsuario: string;
  public readonly urlUsuarioListar: string;
  public readonly urlUsuarioById: string;
  public readonly urlUsuarioDetalle: string;
  public readonly urlSolicitudUsuario: string;
  public readonly urlCargo: string;
  public readonly urlInstitucionPublica: string;
  public readonly urlInstitucionPrivada: string;
  public readonly urlUsuarioSolicitudListar: string;
  public readonly urlPerfilNivel: string;
  private readonly urlSolcitudUsuarioById: string;
  private readonly urlSolicitud: string;
  private readonly urlAprobarSolicitudUsuario: string;
  private readonly urlEliminarSolicitid: string;
  private readonly urlValidaCionUsuario: string;
  private readonly urlValidaCionSolicitudUsuario: string;


  constructor(private _httpClient: HttpClient) {
    this.urlRegionProvDistrito = environment.urlApiV1RegionProvDistrito;
    this.urlUsuario = environment.urlApiV1NuevoUsuario;
    this.urlUsuarioListar = environment.urlApiv1ListarUsuario;
    this.urlUsuarioById = environment.urlApiUsuarioById;
    this.urlUsuarioDetalle = environment.urlApiV1DetalleUsuario;
    this.urlSolicitudUsuario = environment.urlApiV1SolicitudUsuarioNuevo;
    this.urlSolicitud = environment.urlApiV1Solicitud;
    this.urlCargo = environment.urlApiCargo;
    this.urlInstitucionPublica = environment.urlApiInstitucionPublica;
    this.urlInstitucionPrivada = environment.urlApiInstitucionPrivada;
    this.urlUsuarioSolicitudListar = environment.urlApiV1ListarSolicitudCreacionUsuario;
    this.urlPerfilNivel = environment.urlApiV1ProfileList;
    this.urlSolcitudUsuarioById = environment.urlApiV1DetailsSolicitudCreacionUsuarioById;
    this.urlAprobarSolicitudUsuario = environment.urlApiV1AprobarSolicitudCreacionUsuario;
    this.urlEliminarSolicitid = environment.urlApiV1SolicitudUsuarioUpdate;
    this.urlValidaCionUsuario = environment.urlApiV1Usuario;
    this.urlValidaCionSolicitudUsuario = environment.urlApiV1ListarSolicitudCreacionUsuario;
  
  }


  
  getCargo(): Observable<Cargo[]> {
    return this._httpClient.get<Cargo[]>(`${this.urlCargo}listar`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getInstitucionPublica(): Observable<InstitucionPublica[]> {
    return this._httpClient.get<InstitucionPublica[]>(`${this.urlInstitucionPublica}listar`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getInstitucionPrivada(): Observable<InstitucionPrivada[]> {
    return this._httpClient.get<InstitucionPrivada[]>(`${this.urlInstitucionPrivada}listar`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getRegion(): Observable<Region[]> {
    return this._httpClient.get<Region[]>(`${this.urlRegionProvDistrito}listar-regiones`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getProvincia(codRegion: string): Observable<Provincia[]> {
    return this._httpClient.get<Provincia[]>(`${this.urlRegionProvDistrito}listar-region-provincia/${codRegion}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getDistrito(codRegionProv: string): Observable<Distrito[]> {
    return this._httpClient.get<Distrito[]>(`${this.urlRegionProvDistrito}listar-region-distrito/${codRegionProv}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }


  getDetalleUsuario(userName: string): Observable<UsuarioDetalle[]> {
    return this._httpClient.get<UsuarioDetalle[]>(`${this.urlUsuarioDetalle}obtener-usuario-listar-detalle/${userName}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }


  createUsuario(data: any): Observable<string> {
    return this._httpClient.post<any>(`${this.urlUsuario}crear-usuario-seguridad-sinpad`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<string>();
      })
    );
  }

 createSolicitudUsuario(data: any): Observable<string> {
     return this._httpClient.post<any>(`${this.urlSolicitudUsuario}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<string>();
      })
    );
  }

  updateSolicitudUsuario(data: any): Observable<string> {
    return this._httpClient.put<any>(`${this.urlUsuarioSolicitudListar}`, data).pipe(
     catchError((error: HttpErrorResponse) => {
       console.log('error', error);
       return new Observable<string>();
     })
   );
 }


  editUsuario(data: any): Observable<string> {
    return this._httpClient.put<any>(`${this.urlUsuario}editar-usuario-seguridad-sinpad`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<string>();
      })
    );
  }

  getUsuarioListar(data: any): Observable<User[]> {
    return this._httpClient.post<User[]>(`${this.urlUsuarioListar}busqueda-usuario-filtro`, data).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getUsuarioSolicitudListar(data: any): Observable<UsuarioSolicitudListar[]> {
    return this._httpClient.post<UsuarioSolicitudListar[]>(`${this.urlUsuarioSolicitudListar}/listar-filtro`, data).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getPerfilNivel(nivel: number): Observable<PerfilNivel[]> {
    return this._httpClient.get<PerfilNivel[]>(`${this.urlPerfilNivel}/listar-nivel/${nivel}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getSolicitudUsuarioId(id: any): Observable<SolicitudUsuario> {
    return this._httpClient.get<SolicitudUsuario>(`${this.urlSolcitudUsuarioById}/${id}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getUpdateSolicitudUsuario(data: any):Observable<SolicitudUsuarioEditar>{
    return this._httpClient.put<SolicitudUsuario>(`${this.urlSolcitudUsuarioById}`,data).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
 }



  getInstitucionPrivadaID(data: any): Observable<InstitucionPrivada[]> {
    return this._httpClient.get<InstitucionPrivada[]>(`${this.urlInstitucionPrivada}${data}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }


  getInstitucionPublicaID(data: any): Observable<InstitucionPublica[]> {
    return this._httpClient.get<InstitucionPublica[]>(`${this.urlInstitucionPublica}${data}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getAprobarSolicitudUsuario(id: number): Observable<SolicitudUsuario[]> {
    return this._httpClient.get<SolicitudUsuario[]>(`${this.urlAprobarSolicitudUsuario}${id}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getEliminarSolicitudUsuario(id: number): Observable<EliminarSolicitud> {
    return this._httpClient.get<EliminarSolicitud>(`${this.urlEliminarSolicitid}eliminar/${id}/${0}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getValidacionEmailUsuario(data: any): Observable<ExisteEmail> {
    return this._httpClient.get<ExisteEmail>(`${this.urlValidaCionUsuario}check-email/${data}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }


  getValidacionDniUsuario(data: any): Observable<ExisteDni> {
    return this._httpClient.get<ExisteDni>(`${this.urlValidaCionUsuario}check-dni/${data}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getValidacionEmaiSolicitudlUsuario(data: any): Observable<ExisteEmail> {
    return this._httpClient.get<ExisteEmail>(`${this.urlValidaCionSolicitudUsuario}/check-email/${data}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }
  
  getValidacionDniSolicitudUsuario(data: any): Observable<ExisteDni> {
    return this._httpClient.get<ExisteDni>(`${this.urlValidaCionSolicitudUsuario}/check-dni/${data}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }


  getEliminarUsuario(data: any): Observable<EliminarUsuario> {
    return this._httpClient.get<EliminarUsuario>(`${this.urlValidaCionUsuario}eliminar-usuario/${data}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }


}
