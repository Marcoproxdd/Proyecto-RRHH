import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../core/services/usuario.service';
import { RolService } from '../../../core/services/rol.service';
import { PuestoService } from '../../../core/services/puesto.service';
import { DepartamentoService } from '../../../core/services/departamento.service';
import { Usuario } from '../../../core/models/usuario.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {
  usuarios: Usuario[] = [];
  roles: any[] = [];
  puestos: any[] = [];
  departamentos: any[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private puestoService: PuestoService,
    private departamentoService: DepartamentoService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsuarios();
    this.getRoles();
    this.getPuestos();
    this.getDepartamentos();
  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getRoles(): void {
    this.rolService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getPuestos(): void {
    this.puestoService.getPuestos().subscribe({
      next: (puestos) => {
        this.puestos = puestos;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe({
      next: (departamentos) => {
        this.departamentos = departamentos;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getRolName(idRol: number): string {
    const rol = this.roles.find(r => r.id === idRol);
    return rol ? rol.rol : 'Desconocido';
  }

  getPuestoName(idPuesto: number): string {
    const puesto = this.puestos.find(p => p.id === idPuesto);
    return puesto ? puesto.nombre : 'Desconocido';
  }

  getDepartamentoName(idDepartamento: number): string {
    const departamento = this.departamentos.find(d => d.id === idDepartamento);
    return departamento ? departamento.nombre : 'Desconocido';
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuarioService.deleteUsuario(id).subscribe({
        next: () => {
          this.usuarios = this.usuarios.filter(u => u.id !== id);
          this.toastr.success('Usuario eliminado correctamente', 'Éxito');
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Error al eliminar usuario', 'Error');
        }
      });
    }
  }

  desactivarUsuario(id: number): void {
    this.usuarioService.desactivarUsuario(id).subscribe({
      next: () => {
        this.usuarios = this.usuarios.map(u => {
          if (u.id === id) {
            u.estado = 'Inactivo';
          }
          return u;
        });
        this.toastr.success('Usuario desactivado correctamente', 'Éxito');
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Error al desactivar usuario', 'Error');
      }
    });
  }

  activarUsuario(id: number): void {
    this.usuarioService.activarUsuario(id).subscribe({
      next: () => {
        this.usuarios = this.usuarios.map(u => {
          if (u.id === id) {
            u.estado = 'Activo';
          }
          return u;
        });
        this.toastr.success('Usuario activado correctamente', 'Éxito');
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Error al activar usuario', 'Error');
      }
    });
  }

  editarUsuario(id: number): void {
    this.router.navigate(['/user/edit', id]);
  }
}
