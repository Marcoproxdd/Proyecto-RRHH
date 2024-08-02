import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RrhhRoutingModule } from './rrhh-routing.module';
import { RrhhHorarioComponent } from './rrhh-horario/rrhh-horario.component';
import { ViewHorarioComponent } from './rrhh-horario/view-horario/view-horario.component';
import { EditarHorarioComponent } from './rrhh-horario/editar-horario/editar-horario.component';
import { RouterModule } from '@angular/router';
import { ConfirmModalComponent } from './rrhh-horario/confirm-modal/confirm-modal.component';
import { ListarPermisosComponent } from './permisos/listar-permisos/listar-permisos.component';
import { CrearPermisoComponent } from './permisos/crear-permiso/crear-permiso.component';
import { PuestoComponent } from './puesto/puesto.component';
import { RolComponent } from './rol/rol.component';
import { DepartamentoComponent } from './departamento/departamento.component';
import { EditarRolComponent } from './rol/editar-rol/editar-rol.component';
import { VerRolesComponent } from './rol/ver-roles/ver-roles.component';
import { ViewDepartamentoComponent } from './departamento/view-departamento/view-departamento.component';
import { EditarDepartamentoComponent } from './departamento/editar-departamento/editar-departamento.component';
import { VerPuestoComponent } from './puesto/ver-puesto/ver-puesto.component';
import { EditarPuestoComponent } from './puesto/editar-puesto/editar-puesto.component';

@NgModule({
  declarations: [
    RrhhHorarioComponent,
    ViewHorarioComponent,
    EditarHorarioComponent,
    ConfirmModalComponent,
    ListarPermisosComponent,
    CrearPermisoComponent,
    PuestoComponent,
    RolComponent,
    DepartamentoComponent,
    EditarRolComponent,
    VerRolesComponent,
    ViewDepartamentoComponent,
    EditarDepartamentoComponent,
    VerPuestoComponent,
    EditarPuestoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RrhhRoutingModule,
    RouterModule
  ],
  
})
export class RRHHModule { }
