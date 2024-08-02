import { Component, OnInit } from '@angular/core';
import { PuestoService } from '../../../../core/services/puesto.service';
import { DepartamentoService } from '../../../../core/services/departamento.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-puesto',
  templateUrl: './ver-puesto.component.html',
  styleUrls: ['./ver-puesto.component.scss']
})
export class VerPuestoComponent implements OnInit {
  puestos: any[] = [];
  departamentos: any[] = [];

  constructor(
    private puestoService: PuestoService,
    private departamentoService: DepartamentoService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPuestos();
  }

  cargarPuestos(): void {
    this.puestoService.getPuestos().subscribe({
      next: (data) => {
        this.puestos = data;
        this.cargarDepartamentos();
      },
      error: (error) => {
        this.toastr.error('Error al cargar los puestos', 'Error');
        console.error('Error al cargar los puestos:', error);
      }
    });
  }

  cargarDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe({
      next: (data) => {
        this.departamentos = data;
        this.asociarNombres();
      },
      error: (error) => {
        this.toastr.error('Error al cargar los departamentos', 'Error');
        console.error('Error al cargar los departamentos:', error);
      }
    });
  }

  asociarNombres(): void {
    this.puestos = this.puestos.map(puesto => {
      const departamento = this.departamentos.find(d => d.id === puesto.idDepartamento);
      return {
        ...puesto,
        nombreDepartamento: departamento ? departamento.nombre : 'Desconocido'
      };
    });
  }

  confirmarEliminacion(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este puesto?')) {
      this.puestoService.deletePuesto(id).subscribe({
        next: () => {
          this.toastr.success('Puesto eliminado correctamente', 'Éxito');
          this.cargarPuestos();
        },
        error: (error) => {
          this.toastr.error('Error al eliminar el puesto', 'Error');
          console.error('Error al eliminar el puesto:', error);
        }
      });
    }
  }
}
