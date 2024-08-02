import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RrhhHorarioComponent } from './rrhh-horario/rrhh-horario.component';
import { EditarHorarioComponent } from './rrhh-horario/editar-horario/editar-horario.component';
import { ViewHorarioComponent } from './rrhh-horario/view-horario/view-horario.component';
import { ListarPermisosComponent } from './permisos/listar-permisos/listar-permisos.component'; // Importa tu componente
import { CrearPermisoComponent } from './permisos/crear-permiso/crear-permiso.component';

const routes: Routes = [
  { path: 'crear-horario', component: RrhhHorarioComponent },
  { path: 'editar-horario/:id', component: EditarHorarioComponent },
  { path: 'view-horario', component: ViewHorarioComponent },
  { path: 'permisos', component: ListarPermisosComponent },
  { path: 'crear-permiso', component: CrearPermisoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RrhhRoutingModule { }
