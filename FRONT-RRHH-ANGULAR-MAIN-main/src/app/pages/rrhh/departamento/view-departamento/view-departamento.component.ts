import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from '../../../../core/services/departamento.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-departamento',
  templateUrl: './view-departamento.component.html',
  styleUrls: ['./view-departamento.component.scss']
})
export class ViewDepartamentoComponent implements OnInit {
  departamentos: any[] = [];

  constructor(
    private departamentoService: DepartamentoService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDepartamentos();
  }

  loadDepartamentos() {
    this.departamentoService.getDepartamentos().subscribe(
      (data) => {
        this.departamentos = data;
      },
      (error) => {
        this.toastr.error('Error al cargar los departamentos', 'Error');
      }
    );
  }

  onDelete(id: number) {
    this.departamentoService.deleteDepartamento(id).subscribe(
      (response) => {
        this.toastr.success('Departamento eliminado correctamente', 'Éxito');
        this.loadDepartamentos();
      },
      (error) => {
        this.toastr.error('Error al eliminar el departamento', 'Error');
      }
    );
  }

  onEdit(id: number) {
    this.router.navigate(['/rrhh/departamento/editar-departamento', id]);
  }
}
