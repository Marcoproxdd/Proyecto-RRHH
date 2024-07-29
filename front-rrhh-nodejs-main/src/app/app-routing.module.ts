import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLink } from '@angular/router';
import { routes } from './app.routes';

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, RouterLink]
})
export class AppRoutingModule { }

export const config = {
  // Configuración del servidor aquí
  apiUrl: 'http://localhost:3000/v1/api/',
  timeout: 3000,
  // Otras configuraciones que necesites
};