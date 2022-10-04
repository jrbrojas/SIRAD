export interface Emergency {
  id?: string;
  codigoSinpad?: string;
  idTipoPeligro?: number;
  tipoPeligro?: string;
  idGrupoPeligro?: number;
  grupoPeligro?: string;
  codigoUbigeo?: string;
  descripcionUbigeo?: string;
  fechaHoraEvento?: string;
  descripcionEvento?: string;
  habilitado?: number;
  idRegistradoPor?: number;
  registradoPor?: string;
  fechaHoraRegistrado?: string;
  idRevisadoPor?: any,
  revisadoPor?: any,
  fechaHoraRevisado?: any,
  idAprobadoPor?: any,
  aprobadoPor?: any,
  fechaHoraAprobado?: any,
  estadoEmergencia?: number,
  color?: string,
  asignado?: any,
  estado?: any,
  nota?: string
}

//Solicitudes Sebastian
export interface Solicitudes{
  id_solicitud?: number;
  id_emergencia?: number;
  fechaSolicitud?: string;
  codigoSinpad?: string;
  motivo?: string;
  estado?: number;  
  nota?: string;
}

export interface Recursos{
  id? : number;
  desc_articulo : string;
  id_recurso : number;
  id_articulo : string;
}

export interface ArticuloAtendido{
  id_articulo_atendido? : number;
  tipo_recurso : string;
  cantidad : number;
  codigo_sinpad : number;
  id_atencion? : string;
  fecha_hora_registro : string;
  id_tipo_recurso : string;
  habilitado : number;
  id_articulo_emergencia : number;
}

export interface EmergencyRecord {
  id? : string;
  modificadoPor : string;
  nombresApellidosModificadoPor : string;
  fechaHoraModificacion : string;
  cambios : string;
  codigoSinpad : string
  tipoModificacion : String;

}

export interface AtencionEmergencia {
  id? : string;
  ubigeoAlmacen ?: string;
  nombreAlmacen ?: string;
  fechaAtencion ?: string;
  descripcion ?: string;
  codigoSinpad ?: string;
  estado ?: number;
  habilitado ?: number
}

export interface EmergenciaArticulosAtencion{
  id : number;
  articulo_necesidad : string;
  codigo_articulo_necesidad : string;
  cantidad_necesidad : number;
  articulo_atencion : string;
  cantidad_atencion : number;
  diferencia : number;
  codigo_sinpad : string;
  id_atencion : string;
  fechahoraregistro: string;
  codigo_articulo_atencion : string;
  habilitado : number;
}

export interface TipoPeligro {
  idTipoPeligro: string;
  idGrupoPeligro: string;
  tipoPeligro: string;
}

export interface GrupoPeligro {
  id: string;
  descripcion: string;
}

export interface Ubigeo {
  id: string;
  ubigeo: string;
  descripcionRegion: string;
  codigoRegion: string;
  codigoRegionProvincia: string;
  codigoRegionDistrito: string;
}

export interface PopulatedCenter {
  id: string;
  descripcion: string;
}

export interface Persona{
  dni : string;
  prenombres : string;
  primerapellido : string;
  segundoapellido : string;
  apellidocasada : string;
  fechanacimiento : string;
  genero : string;
}
