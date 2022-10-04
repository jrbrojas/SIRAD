import { GeoJSON } from "geojson";
import { FamilyMembers } from "./forms.model";

export interface DtoEmpadronamiento {
  empadronamiento?: Empadronamiento
  geometria?: GeoFormulario2ab
}

export interface Empadronamiento {
  id?: number,
  idEmergencia?: number
  idEvaluacionRapida?: number
  tieneSalud?: number
  tieneMedioVida?: number
  tieneVivienda?: number
  numeroFormulario?: string
  tipoFormulario?: string
  codigoUbigeo?: string
  descripcionUbigeo?: string
  codigoUbigeoCentroPoblado?: string
  centroPoblado?: string
  fechaHoraEvento?: string
  fechaHoraEmpadronamiento?: string
  idTipoLugar?: number
  tipoLugar?: string
  descripcionLugar?: string
  idLugarEspecifico?: number
  lugarEspecifico?: string
  descripcionLugarEspecifico?: string
  idTipoLugar2?: number
  tipoLugar2?: string
  descripcionLugar2?: string
  descripcionEdificioPisoDpto?: string
  idTipoPeligro?: number
  tipoPeligro?: string
  idGrupoPeligro?: number
  grupoPeligro?: string
  idTipoPeligroSecundario?: number,
  tipoPeligroSecundario?: string,
  fechaHoraRegistrado?: string
  habilitado?: number
  idRegistradoPor?: number
  registradoPor?: string
  idRevisadoPor?: any
  revisadoPor?: any
  fechaHoraRevisado?: any
  idAprobadoPor?: any
  aprobadoPor?: any
  fechaHoraAprobado?: any,
  estado_formulario?: number,
  nota?: string,
  archivos?: FileEmpadronamiento[]
}

export interface WayLife {
  id?: number,
  idCategoriaMedioVida?: number,
  categoriaMedioVida?: string,
  idSubCategoriaMedioVida?: number,
  subCategoriaMedioVida?: string,
  cantidadAfectada: number,
  cantidadPerdida: number,
  integrante: FamilyMembers
}

export interface FileEmpadronamiento {
  id?: number,
  ruta?: string,
  nombre?: string,
  archivo?: string,
  descripcion?: string,
  tamanio?: number,
  tipo?: string
}

export interface GeoFormulario2ab {
  id?: null
  idEmpadronamiento?: any
  geometria?: GeoJSON
}

export interface DtoAffectation {
  id?: number
  afectacionesSalud?: Affectation[]
}

export interface Affectation {
  idCategoriaSalud?: number,
  categoriaSalud?: string,
  idSubCategoriaSalud?: number,
  subCategoriaSalud?: string
}

export interface AffectedHousing{
  id?: number;
  direccion?: string,
  numeroLote?: string,
  tenenciaPropia?: string,
  idUso?: number,
  uso?: string,
  idCondicion?: number,
  condicion?: string,
  unidadMedidaArea?: string,
  idTipoTecho?: number,
  tipoTecho?: string,
  idTipoPared?: number,
  tipoPared?: string,
  idTipoPiso?: number,
  tipoPiso?: string,
  familia:{
    id?: number
  }
}
