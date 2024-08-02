import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../../../../core/services/horario.service';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { DepartamentoService } from '../../../../core/services/departamento.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../rrhh-horario/confirm-modal/confirm-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-horario',
  templateUrl: './view-horario.component.html',
  styleUrls: ['./view-horario.component.scss']
})
export class ViewHorarioComponent implements OnInit {
  horarios: any[] = [];
  usuarios: any[] = [];
  departamentos: any[] = [];

  constructor(
    private horarioService: HorarioService,
    private usuarioService: UsuarioService,
    private departamentoService: DepartamentoService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.horarioService.getHorarios().subscribe({
      next: (data) => {
        this.horarios = data;
        this.cargarUsuarios();
        this.cargarDepartamentos();
      },
      error: (error) => {
        this.toastr.error('Error al cargar horarios', 'Error');
      }
    });
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.asociarNombres();
      },
      error: (error) => {
        this.toastr.error('Error al cargar usuarios', 'Error');
      }
    });
  }

  cargarDepartamentos() {
    this.departamentoService.getDepartamentos().subscribe({
      next: (data) => {
        this.departamentos = data;
        this.asociarNombres();
      },
      error: (error) => {
        this.toastr.error('Error al cargar departamentos', 'Error');
      }
    });
  }

  asociarNombres() {
    if (this.usuarios.length && this.departamentos.length) {
      this.horarios = this.horarios.map(horario => {
        const usuario = this.usuarios.find(u => u.id === horario.idUsuario);
        const departamento = this.departamentos.find(d => d.id === horario.idDepartamento);
        return {
          ...horario,
          nombreUsuario: usuario ? usuario.nombres : 'Desconocido',
          nombreDepartamento: departamento ? departamento.nombre : 'Desconocido'
        };
      });
    }
  }

  confirmarEliminacion(id: number) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message = '¿Estás seguro de que quieres eliminar este horario?';
    modalRef.componentInstance.confirmCallback = () => this.eliminarHorario(id);
  }

  confirmarEdicion(id: number) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message = '¿Estás seguro de que quieres editar este horario?';
    modalRef.componentInstance.confirmCallback = () => this.editarHorario(id);
  }

  eliminarHorario(id: number) {
    this.horarioService.deleteHorario(id).subscribe({
      next: (response) => {
        this.toastr.success('Horario eliminado correctamente', 'Éxito');
        this.cargarDatos();
      },
      error: (error) => {
        this.toastr.error('Error al eliminar horario', 'Error');
      }
    });
  }

  editarHorario(id: number) {
    this.router.navigate(['/rrhh/editar-horario', id]);
  }
}
