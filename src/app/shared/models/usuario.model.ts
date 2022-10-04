export interface Usuario{
    id?: number;
    idTipoDocumento?: number;
    numeroDocumento?: string;
    nombres?: string;
    apellidos?: string;
    username?: string;
    password?: string;
    email?: string;
    idsPerfiles?: {};
    nivel?: number;
    codigoRegion?: string;
    descRegion?: string;
    codigoRegionProvincia?: string;
    codigoRegionDistrito?: string;
    idSistema?: number;
    habilitado?: number;
    cargo?: string;
}

export interface SolicitudUsuario{
    id?: number;
    codigoSolicitud?: string;
    nombres?: string;
    apellidos?: string;
    username?: string;
    fechaRegistro?: string;
    idCargo?: number;
    nombreCargo?: string;
    tipoDocumento?: number;
    numeroDocumento?: string;
    email?: string;
    idInstitucionPublica?: number;
    descripcionInstitucionPublica?: string;
    idInstitucionPrivada?: number;
    descripcionInstitucionPrivada?: string;
    nivel?: number;
    region?: string;
    provincia?: string;
    distrito?: string;
    observacion?: string;
    estado?: number;
    idPerfiles?: string;
    habilitado?: number;
}

export interface Cargo {
    id?: number;
    nombre?: string;
    descripcion?: string;
}

export interface InstitucionPublica {
    id?: number;
    nombre?: string;
    siglas?: string;
}

export interface InstitucionPrivada {
    id?: number;
    nombre?: string;
}
export interface Region {
    codRegion?: string;
    descripcion?: string;
}

export interface Provincia {
    codProvincia?: string;
    descripcion?: string;
}

export interface Distrito {
    codDistrito: string;
    descripcion: string;
}

export interface User{
    numDocumento?: string;
    nombres?: string;
    perfil?: string;
}

export interface UsuarioEditar{
    apellidos?: string;
    //numeroDocumento?: string;
    nombres?: string;
    email?: string
    //tipodocumento?: number;
    username?: string;
    codigoRegionDistrito?: string;
    codigoRegion?:string;
    codigoRegionProvincia?: string;
    nivel?:number;
    idsPerfiles?: string;
    habilitado?:number;
}

export interface UsuarioDetalle{
    id?: number;
    idTipoDocumento?: number;
    numeroDocumento?: string;
    nombres?: string;
    apellidos?: string;
    username?: string;
    password?: string;
    email?: string;
    habilitado?: String;
    idsPerfiles?: String;
    nivel?: number;
    codigoRegion?: string;
    codigoRegionProvincia?: string;
    codigoRegionDistrito?: string;
    idSistema?: number;
}

export interface UsuarioSolicitudListar{
    id?: number;
    codSolicitud?: number;
    fechaSolicitud?: string
    nombresApellidos?: string;
    cargo?: string;
    numeroDocumento?: string;
    idPerfiles?: string;
    estado?: number;
}

export interface PerfilNivel{
    id?: number;
    nombre?: number;
    descripcion?: string
    habilitado?: number;
    nivel?: number;
}

export interface PersonaDNI{
    dni : string;
    prenombres : string;
    primerapellido : string;
    segundoapellido : string;
    apellidocasada : string;
}

export interface SolicitudUsuarioEditar{

    id?: number;
    idTipoDocumento?: number;
    numeroDocumento?: string;
    codigoSolicitud?: string
    nombres?: string;
    apellidos?: string;
    username?: string;
    idInstitucionPublica?: number;
    descripcionInstitucionPublica?: string;
    idInstitucionPrivada?: number;
    descripcionInstitucionPrivada?: string;
    nombreCargo?: string;
    email?: string;
    nivel?: number;
    idPerfiles?: string;
    region?: string;
    provincia?: string;
    distrito?: string;
    fechaModificacion?: string
    fechaRegistro?: string
    estado?: number;
    habilitado?: number;
    observacion?: string;
    comentarios?: string;
}

export interface EliminarSolicitud{
res?: number    
}

export interface ExisteEmail{
email?: string 
}
    
export interface ExisteDni{
dni?: string
}
    
export interface EliminarUsuario{
id?: number     
}