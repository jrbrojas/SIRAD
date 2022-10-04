export interface Profile {
    id?: number;
    nombre?: string;
    descripcion?: string;
    habilitado?: number;
    permisos?: {};
  }

  export interface Permission {
    id?: number;
    nombre?: string;
    descripcion?: string;
    idGrupoPermiso?: number;
    nombreGrupoPermiso?: string;
    descripcionGrupoPermiso?: string;
  }