// src/app/core/models/usuario.model.ts
export interface Usuario {
estado: any;
    id: number;
    nombres: string;
    identificacion: string;
    usuario: string;
    contraseña: string;
    idPuesto: number;
    idRol: number;
    idDepartamento: number;
    cumpleanios?: Date;
    fechaIngreso: Date;
  }
  