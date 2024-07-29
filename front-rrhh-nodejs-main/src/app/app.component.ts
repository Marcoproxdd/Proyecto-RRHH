import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PermisoComponent } from './permiso/permiso.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router'; 
import { PermisoListComponent } from './permiso-list/permiso-list.component';
import { UsuarioComponent } from './usuario/usuario.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    HeaderComponent,
    FormsModule,
    HttpClientModule,
    RouterModule,
    RouterLink,
    PermisoComponent,
    DashboardComponent,
    PermisoListComponent,
    UsuarioComponent
]
})
export class AppComponent {
[x: string]: any;
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}
