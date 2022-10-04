export interface Preliminar {
    id?: number,
    idEmergencia?:          number;
    tipoFormulario?:        string;
    idResponsable?:         number;
    responsable?:           string;
    dni?:                   string;
    cargo?:                 string;
    institucion?:           string;
    condicionClimatica?:    string;
    idViaTransporte?:       number;
    viaTransporte?:         string;
    idTipoVehiculo?:        number;
    tipoVehiculo?:          string;
    lugarPartida?:          string;
    tiempoEstimadoLlegada?: string;
    rutaPrincipal?:         string;
    rutaAlterna?:           string;
    habilitado?:            number;
    idRegistradoPor?:       any;
    registradoPor?:         any;
    fechaHoraRegistrado?:   any;
    idRevisadoPor?:         any;
    revisadoPor?:           any;
    fechaHoraRevisado?:     any;
    idAprobadoPor?:         any;
    aprobadoPor?:           any;
    fechaHoraAprobado?:     any;
    peligro?:               Peligro;
    danioVidaSalud?:        DanioVidaSalud;
    danioMaterial?:         DanioMaterial;
    analisisNecesidad?:     AnalisisNecesidad;
    coordinacion?:          Coordinacion;
    conclusionObservacion?: ConclusionObservacion;
    recomendacion?:         Recomendacion;
    resumen?:               Resumen;
    archivos?:              FilePreliminar[];
    estado_formulario?:     number;
    nota?:     any;
  }
  
  
  export interface FilePreliminar {
    id?: number,
    ruta?: string,
    nombre?: string,
    archivo?: string,
    descripcion?: string,
    tamanio?: number,
    tipo?: string
  }
  
  
  export interface ConclusionObservacion {
    id?: number,
    conclusionObservacion?: string;
    preliminar?: Preliminar;
  }
  
  export interface Peligro {
    id?: number,
    peligroSecundario?: string;
    peligroNaturalHumana?: string;
    preliminar?: Preliminar;
  }
  
  export interface Coordinacion {
    id?: number,
    coordinacion?: string;
    preliminar?: Preliminar;
  }
  
  export interface Lesionado {
    id?: number;
    lugarAtencion?: string;
    cantidadGrave?: number;
    cantidadModerado?: number;
    cantidadLeve?: number;
    cantidadTratamientoLocal?: number;
    cantidadNecesidadEvacuacion?: number;
    danioVidaSalud?: DanioVidaSalud;
  }
  
  export interface DanioVidaSalud {
    id?: number;
    habilitado?: number;
    preliminar?: Preliminar;
  }
  
  export interface PersonalRespuesta {
    id?: number;
    idPotencialHumano?:    number;
    potencialHumano?:      string;
    totalPersonal?:        number;
    cantidadLesionado?:    number;
    cantidadFallecido?:    number;
    cantidadDesaparecido?: number;
    observacion?:          string;
    danioVidaSalud?:      DanioVidaSalud;
  }
  
  export interface Resumen {
    id?: number;
    resumen?: string;
    preliminar?: Preliminar;
  }
  
  export interface Recomendacion {
    id?: number;
    recomendacion?: string;
    preliminar?: Preliminar;
  }
  
  export interface Observacion {
    id?: number;
    conclusionObservacion?: string;
    preliminar?: Preliminar;
  }
  
  //Agregados por Daniel Vallejos
  export interface Infraestructura {
    id?: number,
    establecimiento?: string,
    idFuncionamiento?: number,
    funcionamiento?: string,
    idCondicion?: number,
    condicion?: string,
    justificacionDanio?: string,
    observacion?: string,
    danioMaterial?: any
  }
  
  export interface InfraestructuraEducativa {
    id?: number,
    nombreInstitucion?: string,
    totalAula?: number,
    cantidadDestruida?: number,
    cantidadInhabitable?: number,
    cantidadAfectada?: number,
    idSituacionCercoPerimetrico?: number,
    situacionCercoPerimetrico?: string,
    idNivelEducativo?: number,
    nivelEducativo?: string,
    danioMaterial?: any
  }
  
  export interface InfraestructuraTransMaritimo {
    id?: number,
    idTipoInfraestructura?: number,
    tipoInfraestructura?: string,
    cantidadDestruido?: number,
    cantidadAfectado?: number,
    cantidadInhabitable?: number,
    ubicacion?: string,
    observacion?: string,
    danioMaterial?: any
  }
  
  export interface Necesidades {
    id?:                number;
    idTipoNecesidad?:   number;
    tipoNecesidad?:     string;
    idNecesidad?:       number;
    necesidad?:         string;
    idTipoRecurso?:     number;
    tipoRecurso?:       string;
    cantidad?:          number;
    analisisNecesidad?: AnalisisNecesidad;
  }
  
  export interface AnalisisNecesidad {
    id?: number,
    habilitado?: number;
  }
  
  export interface Lesionado {
    id?:                          number;
    lugarAtencion?:               string;
    cantidadGrave?:               number;
    cantidadModerado?:            number;
    cantidadLeve?:                number;
    cantidadTratamientoLocal?:    number;
    cantidadNecesidadEvacuacion?: number;
    danioVidaSalud?:              DanioVidaSalud;
  }
  
  export interface InfraestructuraReserva {
      id?: number,
      idTipoInfraestructura?: number,
      tipoInfraestructura?: string,
      cantidadDestruido?: number,
      cantidadAfectado?: number,
      ubicacion?: string,
      danioMaterial?: any
  }
  
  export interface InfraestructuraServiciosBasicos {
    id?: number,
    idTipoInfraestructura?: number,
    tipoInfraestructura?: string,
    indTieneServicio?: number,
    porcentajeSinServicio?: number,
    cantidadDestruido?: number,
    cantidadAfectado?: number,
    observacion?: string,
    danioMaterial?: any
  }
  
  //Agregadas por Sebastian
  export interface DanioMaterial{
    id?: number,
    habilitado?: number
    idTipoInstalacion?: number,
    instalacion?: string,
    entidad?: string,
    cantidadDestruida?: number,
    cantidadInhabitableInoperativo?: number,
    cantidadAfectada?: number,
    observacion?: string,
    danioMaterial?: any,
  }
  
  export interface TransporteTerrestre{
    id?: number,
    idTipoVia?: string,
    tipoVia?: string,
    mlDestruido?: number,
    mlAfectado?: number,
    cantidadTramo?: number,
    ubicacion?: string,
    observacion?: string,
    danioMaterial?: any
  }
  
  export interface InfraestructuraRiesgo{
    id?: number,
    idTipoInfraestructura?: number,
    tipoInfraestructura?:string,
    cantidadDestruido?: number,
    cantidadAfectado?: number,
    cantidadTramo?: number,
    ubicacion?: string,
    observacion?: string,
    danioMaterial?: any
  }
  
  export interface LocalPublico{
    id?: number,
    idTipoLocalPublico?: number,
    tipoLocalPublico?: string,
    cantidadDestruido?: number,
    cantidadAfectado?: number,
    cantidadInhabitable?: number,
    danioMaterial?: any
  }
  
  
  //maestras
  export interface MaestraFuncionamiento {
    id?: string,
    descripcion?: string,
  }
  