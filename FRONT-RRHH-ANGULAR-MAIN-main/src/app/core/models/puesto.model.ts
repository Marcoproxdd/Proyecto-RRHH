// src/app/core/models/puesto.model.ts
export interface Puesto {
    id: number;
    departamento: number;
    nombre: string;
    descripcion?: string;
    salario: number;
  }
  