import { Routes } from '@angular/router';
import { PermisoComponent } from './permiso/permiso.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PermisoListComponent } from './permiso-list/permiso-list.component';
import { UsuarioComponent } from './usuario/usuario.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'permiso', component: PermisoComponent },
  { path: 'permiso-list', component: PermisoListComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];