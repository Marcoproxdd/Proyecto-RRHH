// src/app/core/models/permiso.model.ts
export interface Permiso {
    id: number;
    tipoPermiso: string;
    fechaSolicitud: Date;
    fechaInicio: Date;
    fechaFin: Date;
    estado: string;
    idUsuario: number;
  }
  