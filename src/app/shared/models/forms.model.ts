import { WayLife } from "./empadronamiento.model";

export interface Form2aEmpFam {
  id?: number,
  idEmergencia: number,
  numeroFormulario: string,
  tipoFormulario: string,
  codigoUbigeo: string,
  descripcionUbigeo: string,
  codigoUbigeoCentroPoblado: number,
  centroPoblado: string,
  fechaHoraEvento: string,
  fechaHoraEmpadronamiento: string,
  idTipoLugar: number,
  tipoLugar: string,
  descripcionLugar: string,
  idLugarEspecifico: number,
  lugarEspecifico: string,
  descripcionLugarEspecifico: string,
  idTipoLugar2: number,
  tipoLugar2: string,
  descripcionLugar2: string,
  descripcionEdificioPisoDpto: string,
  idTipoPeligro: number,
  tipoPeligro: string,
  idGrupoPeligro: number,
  grupoPeligro: string,
  fechaHoraRegistrado: string,
  habilitado: number,
  idRegistradoPor: number,
  registradoPor: string,
  idRevisadoPor: null,
  revisadoPor: null,
  fechaHoraRevisado: null,
  idAprobadoPor: null,
  aprobadoPor: null,
  fechaHoraAprobado: null
}

export interface Form2aViv {
  id?: number;
  codigoSinpad?: number,
  idEmpadrona?: number,
  direccion?: string,
  numeroLote?: string,
  tenenciaPropia?: string,
  desCondicionUso?: string,
  desCondicionViv?: string,
  area?: string,
  idTecho?: number,
  desTecho?: string,
  idPared?: number,
  desPared?: string,
  idPiso?: number,
  desPiso?: string,
  habilitado?: number,
  fechaHoraRegistrado?: string
}

export interface FamilyMembers {
  id?: number;
  medioVida?: string;
  tipoIntegrante?: string;
  idTipoDocumento?: number;
  tipoDocumento?: string;
  numeroDocumento?: string;
  apellidos?: string;
  nombres?: string;
  fechaNacimiento?: string;
  edad?: number;
  tipoSexo?: string;
  direccion?: string;
  lote?: string;
  gestante?: string;
  semanaGestacion?: number;
  habilitado?: number;
  fechaHoraRegistrado?: string;
  familia?: Familia,
  afectacionesMedioVida?: WayLife[]
}

export interface Familia {
  id?: number,
  empadronamiento?: Empadronamiento
  habilitado?: number
}

export interface Empadronamiento {
  id?: number
}

export interface Form2bMVida {
  id?: number,
  codigoSinpad?: number,
  idFamInt?: number,
  apellidos?: string,
  nombres?: string,
  tipoDocumento?: string,
  numeroDocumento?: number,
  idTipoMedioVida?: number,
  tipoMedioVida?: string,
  cantidadAfectada?: number,
  idProductoEspecie?: number,
  productoEspecie?: string,
  cantidadPerdida?: number,
  habilitado?: number,
  fechaHoraRegistrado?: string
}
