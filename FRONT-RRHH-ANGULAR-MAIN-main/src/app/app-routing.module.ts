import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { ContentComponent } from './shared/components/layout/content/content.component';
import { FullComponent } from './shared/components/layout/full/full.component';
import { content } from './shared/routes/routes';
import { full } from './shared/routes/full.routes';

// Importar los nuevos componentes
import { RrhhHorarioComponent } from './pages/rrhh/rrhh-horario/rrhh-horario.component';
import { ViewHorarioComponent } from './pages/rrhh/rrhh-horario/view-horario/view-horario.component';
import { EditarHorarioComponent } from './pages/rrhh/rrhh-horario/editar-horario/editar-horario.component';
import { ListarPermisosComponent } from './pages/rrhh/permisos/listar-permisos/listar-permisos.component';
import { SortiComponent } from './rrhh/sorti/sorti.component';
import { PuestoComponent } from './pages/rrhh/puesto/puesto.component';
import { RolComponent } from './pages/rrhh/rol/rol.component';
import { DepartamentoComponent } from './pages/rrhh/departamento/departamento.component';
import { EditarRolComponent } from './pages/rrhh/rol/editar-rol/editar-rol.component';
import { VerRolesComponent } from './pages/rrhh/rol/ver-roles/ver-roles.component';
import { ViewDepartamentoComponent } from './pages/rrhh/departamento/view-departamento/view-departamento.component';
import { EditarDepartamentoComponent } from './pages/rrhh/departamento/editar-departamento/editar-departamento.component';
import { VerPuestoComponent } from './pages/rrhh/puesto/ver-puesto/ver-puesto.component';
import { EditarPuestoComponent } from './pages/rrhh/puesto/editar-puesto/editar-puesto.component';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      ...content,
      // Añadir las nuevas rutas dentro del componente ContentComponent
      { path: 'rrhh/horarios', component: ViewHorarioComponent },
      { path: 'rrhh/crear-horario', component: RrhhHorarioComponent },
      { path: 'rrhh/editar-horario/:id', component: EditarHorarioComponent },
      { path: 'permisos', component: ListarPermisosComponent },
      { path: 'rrhh/sorti', component: SortiComponent },
      { path: '', redirectTo: '/rrhh/sorti', pathMatch: 'full' }, // Ruta por defecto
      { path: 'rrhh/puestos', component: PuestoComponent },
      { path: 'rrhh/rol/ver-roles', component: VerRolesComponent },
      { path: 'rrhh/editar-rol/:id', component: EditarRolComponent },
      { path: 'rrhh/departamento/view-departamento', component: ViewDepartamentoComponent },
      { path: 'rrhh/departamento/editar-departamento/:id', component: EditarDepartamentoComponent },
      { path: 'rrhh/puesto', component: PuestoComponent },
      { path: 'rrhh/puesto/ver-puesto', component: VerPuestoComponent },
      { path: 'rrhh/puesto/editar-puesto/:id', component: EditarPuestoComponent },
      
  { path: 'rrhh/rol', component: RolComponent },
  { path: 'rrhh/departamento', component: DepartamentoComponent },
    ],
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: '',
    component: FullComponent,
    children: full,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
