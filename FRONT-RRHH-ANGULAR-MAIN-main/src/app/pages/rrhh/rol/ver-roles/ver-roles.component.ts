import { Component, OnInit } from '@angular/core';
import { RolService } from '../../../../core/services/rol.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from '../../rrhh-horario/confirm-modal/confirm-modal.component';
@Component({
  selector: 'app-ver-roles',
  templateUrl: './ver-roles.component.html',
  styleUrls: ['./ver-roles.component.scss']
})
export class VerRolesComponent implements OnInit {
  roles: any[] = [];
  constructor(
    private rolService: RolService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarRoles();
  }

  cargarRoles() {
    this.rolService.getRoles().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (error) => {
        this.toastr.error('Error al cargar roles', 'Error');
      }
    });
  }

  confirmarEliminacion(id: number) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message = '¿Estás seguro de que quieres eliminar este rol?';
    modalRef.componentInstance.confirmCallback = () => this.eliminarRol(id);
  }

  eliminarRol(id: number) {
    this.rolService.deleteRol(id).subscribe({
      next: () => {
        this.toastr.success('Rol eliminado correctamente', 'Éxito');
        this.cargarRoles();
      },
      error: (error) => {
        this.toastr.error('Error al eliminar rol', 'Error');
      }
    });
  }
}