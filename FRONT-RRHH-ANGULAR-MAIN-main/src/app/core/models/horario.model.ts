// src/app/core/models/horario.model.ts
export interface Horario {
    id: number;
    dia: Date;
    horaEntrada: Date;
    horaSalida: Date;
    horasExtra: number;
    compensaciones: number;
    idUsuario: number;
    idDepartamento: number;
  }
  