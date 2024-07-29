import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PermisoComponent } from './permiso/permiso.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'permiso', component: PermisoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const config = {
  // Configuración del servidor aquí
  apiUrl: 'http://localhost:3000/v1/api/',
  timeout: 3000,
  // Otras configuraciones que necesites
};