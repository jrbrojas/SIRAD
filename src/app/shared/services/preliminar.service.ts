import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Infraestructura, InfraestructuraEducativa, InfraestructuraReserva, 
  InfraestructuraServiciosBasicos, InfraestructuraTransMaritimo,
   MaestraFuncionamiento, Preliminar,LocalPublico,DanioMaterial, InfraestructuraRiesgo,TransporteTerrestre, PersonalRespuesta, Lesionado, Observacion, Coordinacion, Recomendacion, Necesidades, DanioVidaSalud, Peligro } from '../models/preliminar.model';

@Injectable({
  providedIn: 'root'
})
export class PreliminarService {
  public showLoader: boolean = false;
  private readonly urlPreliminar: string;
  private readonly urlLesionados: string;
  private readonly urlPreliminarMaestras: string;

  constructor(
    private _httpClient: HttpClient
  ) {
    this.urlPreliminar = environment.urlApiV1Preliminar;
    this.urlPreliminarMaestras = environment.urlApiV1PreliminarMaestras;
    this.urlLesionados = environment.urlApiV1PreliminarLesionados;
  }

  crearInformGeneral(data: Preliminar): Observable<Preliminar> {
    return this._httpClient.post<Preliminar>(`${this.urlPreliminar}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  //agregado por Daniel Vallejos para eliminar el formulario
  deletePreliminar(id: number): Observable<any> {
    return this._httpClient.delete(`${this.urlPreliminar}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }


  //agregado por Daniel Valleejos para cambiar el estado del formulario
  updateFormularios(data: Preliminar): Observable<Preliminar> {    
    return this._httpClient.post<Preliminar>(`${this.urlPreliminar}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }










  //servicio infraestructura
  //maestras Daniel
  getMaestraFuncionamiento(): Observable<MaestraFuncionamiento[]> {
    return this._httpClient.get<MaestraFuncionamiento[]>(`${this.urlPreliminarMaestras}/funcionamiento`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getMaestraCondicion(): Observable<MaestraFuncionamiento[]> {
    return this._httpClient.get<MaestraFuncionamiento[]>(`${this.urlPreliminarMaestras}/condicion`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getMaestraCercoPerimetro(): Observable<MaestraFuncionamiento[]> {
    return this._httpClient.get<MaestraFuncionamiento[]>(`${this.urlPreliminarMaestras}/cerco-perimetrico`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getMaestraNivelEducativo(): Observable<MaestraFuncionamiento[]> {
    return this._httpClient.get<MaestraFuncionamiento[]>(`${this.urlPreliminarMaestras}/nivel-educativo`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getMaestraTipoInfraestructura(): Observable<MaestraFuncionamiento[]> {
    return this._httpClient.get<MaestraFuncionamiento[]>(`${this.urlPreliminarMaestras}/tipo-infraestructura`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getMaestraTipoServiciosPublicos(): Observable<MaestraFuncionamiento[]> {
    return this._httpClient.get<MaestraFuncionamiento[]>(`${this.urlPreliminarMaestras}/servicios-basicos`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  //Sebastian
  getMaestraTipoVia(): Observable<MaestraFuncionamiento[]> {
    return this._httpClient.get<MaestraFuncionamiento[]>(`${this.urlPreliminarMaestras}/tipo-via`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getMaestraTipoVehiculo(): Observable<MaestraFuncionamiento[]> {
    return this._httpClient.get<MaestraFuncionamiento[]>(`${this.urlPreliminarMaestras}/tipo-vehiculo`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getMaestraInfraestructuraRiesgo(): Observable<MaestraFuncionamiento[]> {
    return this._httpClient.get<MaestraFuncionamiento[]>(`${this.urlPreliminarMaestras}/tipo-infraestructura`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }
  getMaestraLocalesPublicos(): Observable<MaestraFuncionamiento[]> {
    return this._httpClient.get<MaestraFuncionamiento[]>(`${this.urlPreliminarMaestras}/local-publico`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getMaestraDanioMaterial(id: number): Observable<MaestraFuncionamiento[]> {
    return this._httpClient.get<MaestraFuncionamiento[]>(`${this.urlPreliminar}/danio-material/${id}/instalacion-vehiculo`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }



  //Infraestructura  Daniel

  getInfraestructura(idDanioMaterial: number): Observable<Infraestructura[]> {
    return this._httpClient.get<Infraestructura[]>(`${this.urlPreliminar}/danio-material/${idDanioMaterial}/servicio-salud`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  createInfraestructura(data: Infraestructura): Observable<Infraestructura> {
    return this._httpClient.post<Infraestructura>(`${this.urlPreliminar}/danio-material/servicio-salud`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getInfraestructuraById(id: number): Observable<any> {
    return this._httpClient.get(`${this.urlPreliminar}/danio-material/servicio-salud/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  deleteInfraestructuraById(id: number): Observable<Infraestructura> {
    return this._httpClient.delete<Infraestructura>(`${this.urlPreliminar}/danio-material/servicio-salud/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  //Infraestructura  Educativa
  getInfraestructuraEducativa(id: number): Observable<InfraestructuraEducativa[]> {
    return this._httpClient.get<InfraestructuraEducativa[]>(`${this.urlPreliminar}/danio-material/${id}/infraestructura-educativa`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  createInfraestructuraEducativa(data: InfraestructuraEducativa): Observable<InfraestructuraEducativa> {
    return this._httpClient.post<InfraestructuraEducativa>(`${this.urlPreliminar}/danio-material/infraestructura-educativa`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getInfraestructuraByIdEducativa(id: number): Observable<any> {
    return this._httpClient.get(`${this.urlPreliminar}/danio-material/infraestructura-educativa/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  deleteInfraestructuraByIdEducativa(id: number): Observable<InfraestructuraEducativa> {
    return this._httpClient.delete<InfraestructuraEducativa>(`${this.urlPreliminar}/danio-material/infraestructura-educativa/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }


  //Infraestructura  Transporte Maritimo
  getInfraestructuraTransMaritimo(id: number): Observable<InfraestructuraTransMaritimo[]> {
    return this._httpClient.get<InfraestructuraTransMaritimo[]>(`${this.urlPreliminar}/danio-material/${id}/infraestructura-transporte-maritimo`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  createInfraestructuraTransMaritimo(data: InfraestructuraTransMaritimo): Observable<InfraestructuraTransMaritimo> {
    return this._httpClient.post<InfraestructuraTransMaritimo>(`${this.urlPreliminar}/danio-material/infraestructura-transporte-maritimo`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getInfraestructuraByIdTransMaritimo(id: number): Observable<any> {
    return this._httpClient.get(`${this.urlPreliminar}/danio-material/infraestructura-transporte-maritimo/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  deleteInfraestructuraByIdTransMaritimo(id: number): Observable<InfraestructuraTransMaritimo> {
    return this._httpClient.delete<InfraestructuraTransMaritimo >(`${this.urlPreliminar}/danio-material/infraestructura-transporte-maritimo/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  //Infraestructura  Reserva
  getInfraestructuraReserva(id: number): Observable<InfraestructuraReserva[]> {
    return this._httpClient.get<InfraestructuraReserva[]>(`${this.urlPreliminar}/danio-material/${id}/infraestructura-riesgo-reserva`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  createInfraestructuraReserva(data: InfraestructuraReserva): Observable<InfraestructuraReserva> {
    return this._httpClient.post<InfraestructuraReserva>(`${this.urlPreliminar}/danio-material/infraestructura-riesgo-reserva`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getInfraestructuraByIdReserva(id: number): Observable<any> {
    return this._httpClient.get(`${this.urlPreliminar}/danio-material/infraestructura-riesgo-reserva/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  deleteInfraestructuraByIdReserva(id: number): Observable<InfraestructuraReserva> {
    return this._httpClient.delete<InfraestructuraReserva >(`${this.urlPreliminar}/danio-material/infraestructura-riesgo-reserva/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  //Infraestructura  Servicios Basicos
  getInfraestructuraServicioPublico(id: number): Observable<InfraestructuraServiciosBasicos[]> {
    return this._httpClient.get<InfraestructuraServiciosBasicos[]>(`${this.urlPreliminar}/danio-material/${id}/infraestructura-servicio-basico`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  createInfraestructuraServicioPublico(data: InfraestructuraServiciosBasicos): Observable<InfraestructuraServiciosBasicos> {
    return this._httpClient.post<InfraestructuraServiciosBasicos>(`${this.urlPreliminar}/danio-material/infraestructura-servicio-basico`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  getInfraestructuraByIdServicioPublico(id: number): Observable<any> {
    return this._httpClient.get(`${this.urlPreliminar}/danio-material/infraestructura-servicio-basico/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  deleteInfraestructuraByIdServicioPublico(id: number): Observable<InfraestructuraServiciosBasicos> {
    return this._httpClient.delete<InfraestructuraServiciosBasicos >(`${this.urlPreliminar}/danio-material/infraestructura-servicio-basico/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  //Sebastian
  //Daño a instalaciones y  vehiculos de primera respuesta

getDanioMaterial(): Observable<DanioMaterial[]> {
  return this._httpClient.get<DanioMaterial[]>(`${this.urlPreliminar}/danio-material/1/infraestructura-transporte-terrestre`).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

createDanioMaterial(data: DanioMaterial): Observable<DanioMaterial> {
  return this._httpClient.post<DanioMaterial>(`${this.urlPreliminar}/danio-material/instalacion-vehiculo`, data).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

getDanioMaterialById(id: number): Observable<any> {
  return this._httpClient.get(`${this.urlPreliminar}/danio-material/instalacion-vehiculo/${id}`).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  )
}

deleteDanioMaterialById(id: number): Observable<DanioMaterial> {
  return this._httpClient.delete<DanioMaterial>(`${this.urlPreliminar}/danio-material/instalacion-vehiculo/${id}`).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}


//Daño a infraestructura de transporte - Daños en carreteras, víasférreas y otros
getTransporteTerrestre(id: number): Observable<TransporteTerrestre[]> {
  return this._httpClient.get<TransporteTerrestre[]>(`${this.urlPreliminar}/danio-material/${id}/infraestructura-transporte-terrestre`).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

createTransporteTerrestre(data: TransporteTerrestre): Observable<TransporteTerrestre> {
  return this._httpClient.post<TransporteTerrestre>(`${this.urlPreliminar}/danio-material/infraestructura-transporte-terrestre`, data).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

getTransporteTerrestreById(id: number): Observable<any> {
  return this._httpClient.get(`${this.urlPreliminar}/danio-material/infraestructura-transporte-terrestre/${id}`).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  )
}

deleteTransporteTerrestreById(id: number): Observable<TransporteTerrestre> {
  return this._httpClient.delete<TransporteTerrestre>(`${this.urlPreliminar}/danio-material/infraestructura-transporte-terrestre/${id}`).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

//Infraestructura de riesgo - Daños en canales, defensa y otros
getInfraestructuraRiesgo(id: number): Observable<InfraestructuraRiesgo[]> {
  return this._httpClient.get<InfraestructuraRiesgo[]>(`${this.urlPreliminar}/danio-material/${id}/infraestructura-riesgo-estructura`).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

createInfraestructuraRiesgo(data: InfraestructuraRiesgo): Observable<InfraestructuraRiesgo> {
  return this._httpClient.post<InfraestructuraRiesgo>(`${this.urlPreliminar}/danio-material/infraestructura-riesgo-estructura`, data).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

getInfraestructuraRiesgoById(id: number): Observable<any> {
  return this._httpClient.get(`${this.urlPreliminar}/danio-material/infraestructura-riesgo-estructura/${id}`).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  )
}

deleteInfraestructuraRiesgoById(id: number): Observable<InfraestructuraRiesgo> {
  return this._httpClient.delete<InfraestructuraRiesgo>(`${this.urlPreliminar}/danio-material/infraestructura-riesgo-estructura/${id}`).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

//Locales Publicos
getLocalesPublicos(id: number): Observable<LocalPublico[]> {
  return this._httpClient.get<LocalPublico[]>(`${this.urlPreliminar}/danio-material/${id}/infraestructura-local-publico`).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

createLocalesPublicos(data: LocalPublico): Observable<LocalPublico> {
  return this._httpClient.post<LocalPublico>(`${this.urlPreliminar}/danio-material/infraestructura-local-publico`, data).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

getLocalesPublicosById(id: number): Observable<any> {
  return this._httpClient.get(`${this.urlPreliminar}/danio-material/infraestructura-local-publico/${id}`).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  )
}

deleteLocalesPublicosById(id: number): Observable<LocalPublico> {
  return this._httpClient.delete<LocalPublico>(`${this.urlPreliminar}/danio-material/infraestructura-local-publico/${id}`).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

crearInPeligro(data: Peligro): Observable<Peligro> {
  return this._httpClient.post<Peligro>(`${this.urlPreliminar}/peligro`, data).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

crearDanioVidaSalud(data: DanioVidaSalud): Observable<DanioVidaSalud> {
  return this._httpClient.post<DanioVidaSalud>(`${this.urlPreliminar}/danio-vida-salud`, data).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

crearLesionado(data: Lesionado): Observable<Lesionado> {
  return this._httpClient.post<Lesionado>(`${this.urlPreliminar}/danio-vida-salud/lesionado`, data).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

crearPersonal(data: PersonalRespuesta): Observable<PersonalRespuesta> {
  return this._httpClient.post<PersonalRespuesta>(`${this.urlPreliminar}/danio-vida-salud/personal-respuesta`, data).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

crearCoordinacion(data: Coordinacion): Observable<Coordinacion> {
  return this._httpClient.post<Coordinacion>(`${this.urlPreliminar}/coordinacion`, data).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

crearObservacion(data: Observacion): Observable<Observacion> {
  return this._httpClient.post<Observacion>(`${this.urlPreliminar}/conclusion-observacion`, data).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

crearRecomendacion(data: Recomendacion): Observable<Recomendacion> {
  return this._httpClient.post<Recomendacion>(`${this.urlPreliminar}/recomendacion`, data).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

crearNecesidad(data: Necesidades): Observable<Necesidades> {
  return this._httpClient.post<Necesidades>(`${this.urlPreliminar}/analisis-necesidad/multiple`, data).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

eliminarLesionado(id: number): Observable<any> {
  return this._httpClient.delete<any>(`${this.urlPreliminar}/danio-vida-salud/lesionado/${id}`).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

eliminarPersonal(id: number): Observable<any> {
  return this._httpClient.delete<any>(`${this.urlPreliminar}/danio-vida-salud/personal-respuesta/${id}`).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

eliminarAnalisisNecesidad(id: number): Observable<any> {
  return this._httpClient.delete<any>(`${this.urlPreliminar}/analisis-necesidad/multiple/${id}`).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

getAllLesionados(id: number) {
  return this._httpClient.get<Lesionado[]>(`${this.urlPreliminar}/danio-vida-salud/${id}/lesionado`).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

getOneLesionado(id: number) {
  return this._httpClient.get<PersonalRespuesta[]>(`${this.urlPreliminar}/danio-vida-salud/lesionado/${id}`).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

getAllPersonal(id: number) {
  return this._httpClient.get<PersonalRespuesta[]>(`${this.urlPreliminar}/danio-vida-salud/${id}/personal-respuesta`).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

getDetailPreliminar(id: number) {
  return this._httpClient.get<Preliminar[]>(`${this.urlPreliminar}/${id}`).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

getDetailPersonalRespuesta(id: number) {
  return this._httpClient.get<PersonalRespuesta[]>(`${this.urlPreliminar}/danio-vida-salud/personal-respuesta/${id}`).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

getMaeViaTransporte() {
  return this._httpClient.get<any>(`${this.urlPreliminarMaestras}/via-transporte`).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

getMaeTipoVehiculo() {
  return this._httpClient.get<any>(`${this.urlPreliminarMaestras}/tipo-vehiculo`).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

getMaeTipoNecesidad() {
  return this._httpClient.get<any>(`${this.urlPreliminarMaestras}/tipo-necesidad`).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

getMaeNecesidad(id: number) {
  return this._httpClient.get<any>(`${this.urlPreliminarMaestras}/necesidad/${id}`).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

getMaeRecurso(id: number) {
  return this._httpClient.get<any>(`${this.urlPreliminarMaestras}/recurso/${id}`).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

getAnalisisNecesidades(idAnalisisNecesidad: number, tipoNecesidad: number) {
  return this._httpClient.get<any>(`${this.urlPreliminar}/analisis-necesidad/${idAnalisisNecesidad}/multiple/tipo-necesidad/${tipoNecesidad}`).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

getAccionesPrioritarias() {
  return this._httpClient.get<any>(`${this.urlPreliminarMaestras}/acciones-prioritarias`).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

getAnalisisNecesidadesOne(id: number) {
  return this._httpClient.get<any>(`${this.urlPreliminar}/analisis-necesidad/multiple/${id}`).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}



//Agregados por DV para traer la cantidad de lesionados en los 3 cuadros
//cuadro 1
getHeridosLesion(idEmpadronamiento: number): Observable<Infraestructura[]> {
  return this._httpClient.get<Infraestructura[]>(`${this.urlLesionados}/${idEmpadronamiento}/heridos/nivel-lesion`).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

getHeridosTratamiento(idEmpadronamiento: number): Observable<Infraestructura[]> {
  return this._httpClient.get<Infraestructura[]>(`${this.urlLesionados}/${idEmpadronamiento}/heridos/circunstancia`).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

getHeridosDesplazamiento(idEmpadronamiento: number): Observable<Infraestructura[]> {
  return this._httpClient.get<Infraestructura[]>(`${this.urlLesionados}/${idEmpadronamiento}/heridos/desplazamiento`).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

getPeligroSecundarioEvaluacionRapida(idEmergencia: number): Observable<any> {
  return this._httpClient.get<any>(`${this.urlLesionados}/${idEmergencia}/peligrosSecundarios/evaluacionRapida`).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      return new Observable<any>();
    })
  );
}

}
