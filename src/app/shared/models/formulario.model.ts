export interface Formulario {
  id?: number;
  idEmergencia?: number;
  descripcionUbigeo?: string;
  numeroFormulario?: string;
  tipoPeligro?: string;
  fechaHoraEvento?: string;
  tipoFormulario?: string;
  cantidadRegistro?: number;
  estado_formulario?: number;
  habilitado?: number;
  nota?: string
}

export interface EvaluacionRapida {
  id?: number,
  idEmergencia?: number,
  numeroFormulario?: number,
  codigoUbigeo?: string,
  descripcionUbigeo?: string,
  codigoUbigeoCentroPoblado?: string,
  centroPoblado?: string,
  fechaHoraEvento?: string,
  idTipoLugar?: string,
  tipoLugar?: string,
  descripcionLugar?: string,
  idLugarEspecifico?: number,
  lugarEspecifico?: string,
  descripcionLugarEspecifico?: string,
  idTipoPeligro?: number,
  tipoPeligro?: string,
  idGrupoPeligro?: number,
  grupoPeligro?: string,
  idTipoPeligroSecundario?: number,
  tipoPeligroSecundario?: string
}
