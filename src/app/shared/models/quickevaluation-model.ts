import { GeoJSON } from "geojson";

export interface QuickEvaluationDto {
  evaluacionRapida: QuickEvaluation,
  geometria: GeoQuickEvaluation
}

export interface FileQuickEvaluation {
  id?: number,
  ruta?: string,
  nombre?: string,
  archivo?: string,
  descripcion?: string,
  tamanio?: number,
  tipo?: string
}
export interface QuickEvaluation {
  id?: number;
  idEmergencia?: number,
  tipoFormulario?: string,
  numeroFormulario?: string,
  codigoUbigeo?: string,
  descripcionUbigeo?: string,
  codigoUbigeoCentroPoblado?: string,
  centroPoblado?: string,
  fechaHoraEvento?: string,
  idTipoLugar?: number,
  tipoLugar?: string,
  descripcionLugar?: string,
  idLugarEspecifico?: string,
  lugarEspecifico?: string,
  descripcionLugarEspecifico?: string,
  referencia?: string,
  medioTransporte?: string,
  idMedioTransporte?: number,
  idTipoPeligro?: number,
  tipoPeligro?: string,
  idTipoPeligroSecundario?: number,
  tipoPeligroSecundario?: string,
  idGrupoPeligro?: number,
  grupoPeligro?: string,
  habilitado?: number,
  idRegistradoPor?: number,
  registradoPor?: string,
  fechaHoraRegistrado?: string,
  idRevisadoPor?: null,
  revisadoPor?: null,
  fechaHoraRevisado?: null,
  idAprobadoPor?: null,
  aprobadoPor?: null,
  fechaHoraAprobado: null,
  danioVidaSalud?: LifeAndHealth,
  danioServicioBasico?: BasicServices,
  danioInfraestructura?: Infrastructure,
  danioMedioVida?: LiveLiHoods,
  actividad?: Activity,
  necesidad?: Needs,
  otraActividad?: OtherActivity,
  otraNecesidad?: OtherNeeds,
  archivos?: FileQuickEvaluation[]
  nota?: null,
  estado_formulario?: number,
}
export interface GeoQuickEvaluation {
  id?: number;
  idEvaluacionRapida?: number;
  geometria?: GeoJSON;
}

export interface LifeAndHealth {
  id?: number;
  lesionados: number,
  cantidadLesionados: number,
  atrapados: number,
  cantidadAtrapados: number,
  aislados: number,
  cantidadAislados: number,
  desaparecidos: number,
  cantidadDesaparecidos: number,
  fallecidos: number,
  cantidadFallecidos: number
}

export interface BasicServices {
  id?: number;
  agua: number,
  desague: number,
  energiaElectrica: number,
  telefono: number,
  gas: number
}

export interface Infrastructure {
  id?: number;
  vivienda: number,
  carretera: number,
  puente: number,
  establecimientoSalud: number
}

export interface LiveLiHoods {
  id?: number;
  ganaderia: number,
  agricultura: number,
  comercio: number,
  turismo: number,
  pesca: number
}

export interface Activity {
  id?: number;
  busquedaRescate: number,
  evacuacion: number,
  atencionSalud: number,
  equipoEdan: number,
  medidaControl: number,
  observacion: null
}

export interface Needs {
  id?: number;
  bienAyudaHumanitaria: number,
  maquinariaPesada: number,
  asistenciaTecnica: number,
  observacion: null
}

export interface OtherActivity {
  id?: number;
  rescatePersonaAtrapada: number,
  busquedaDesaparecido: number,
  atencionPreHospitalaria: number,
  evacuacionHerido: number,
  evacuacionDamnificado: number,
  evacuacionPoblacionRiesgo: number,
  atencionLesionado: number,
  asistenciaTechoTemporal: number,
  asistenciaRopaAbrigo: number,
  asistenciaAlimentaria: number,
  provisionAguaSegura: number,
  rehabilitacionServicio: number,
  evaluadorEdan: number,
  rehabilitacionVia: number,
  equipoComunicacion: number,
  remocionEscombio: number,
  instalacionAlbergue: number,
  instalacionLetrina: number,
  disposicionDesechoSolido: number,
  hospitalCampaniaEmt: number,
  gestionRestoHumano: number,
  seguridad: number,
  evaluacionRiesgo: number,
  utensilioMenaje: number,
  herramienta: number,
  maquinariaPesada: number
}

export interface OtherNeeds {
  id?: number;
  carpa: number,
  capa: number,
  frazada: number,
  alimentoFrio: number,
  alimentoCrudo: number,
  utensilioMenaje: number,
  herramienta: number,
  equipo: number,
  equipoBusquedaRescate: number,
  medicoBrigadaSalud: number,
  atencionPreHospitalaria: number,
  evacuacionHerido: number,
  bombero: number,
  equipoComunicacion: number,
  ingenieroArquitecto: number,
  maquinariaPesada: number,
  cisterna: number
}

export interface File {
  id?: number;
  name: string,
  description: string,
  id_quick_evaluation: string,
}
