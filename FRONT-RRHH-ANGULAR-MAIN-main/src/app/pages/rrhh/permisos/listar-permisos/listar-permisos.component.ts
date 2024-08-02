import { Component, OnInit } from '@angular/core';
import { PermisoService } from '../../../../core/services/permiso.service';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from '../../../../error-modal/error-modal.component';

@Component({
  selector: 'app-listar-permisos',
  templateUrl: './listar-permisos.component.html',
  styleUrls: ['./listar-permisos.component.scss']
})
export class ListarPermisosComponent implements OnInit {
  permisos: any[] = [];
  usuarios: any[] = [];

  constructor(
    private permisoService: PermisoService,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.cargarPermisos();
    this.cargarUsuarios();
  }

  cargarPermisos() {
    this.permisoService.getPermisos().subscribe({
      next: (data) => {
        this.permisos = data;
      },
      error: (error) => {
        this.toastr.error('Error al cargar permisos', 'Error');
      }
    });
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (error) => {
        this.toastr.error('Error al cargar usuarios', 'Error');
      }
    });
  }

  getUsuarioName(idUsuario: number): string {
    const usuario = this.usuarios.find(u => u.id === idUsuario);
    return usuario ? usuario.nombres : 'Desconocido';
  }

  aprobarPermiso(id: number) {
    this.permisoService.approvePermiso(id).subscribe({
      next: (response) => {
        this.toastr.success('Permiso aprobado correctamente', 'Éxito');
        this.cargarPermisos();
      },
      error: (error) => {
        this.mostrarErrorAprobacion(error.error.message);
      }
    });
  }

  desactivarPermiso(id: number) {
    this.permisoService.desactivarPermiso(id).subscribe({
      next: (response) => {
        this.toastr.success('Permiso desactivado correctamente', 'Éxito');
        this.cargarPermisos();
      },
      error: (error) => {
        this.toastr.error('Error al desactivar permiso', 'Error');
      }
    });
  }

  activarPermiso(id: number) {
    this.permisoService.activarPermiso(id).subscribe({
      next: (response) => {
        this.toastr.success('Permiso activado correctamente', 'Éxito');
        this.cargarPermisos();
      },
      error: (error) => {
        this.toastr.error('Error al activar permiso', 'Error');
      }
    });
  }

  mostrarErrorAprobacion(mensaje: string) {
    const modalRef = this.modalService.open(ErrorModalComponent);
    modalRef.componentInstance.message = mensaje;
  }
}
