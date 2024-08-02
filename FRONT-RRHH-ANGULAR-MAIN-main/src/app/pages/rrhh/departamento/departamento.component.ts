import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartamentoService } from '../../../core/services/departamento.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent implements OnInit {
  departamentos: any[] = [];
  departamentoForm!: FormGroup;

  constructor(
    private departamentoService: DepartamentoService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.departamentoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['']
    });

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

  onSubmit() {
    if (this.departamentoForm.valid) {
      this.departamentoService.createDepartamento(this.departamentoForm.value).subscribe(
        (response) => {
          this.toastr.success('Departamento creado correctamente', 'Éxito');
          this.loadDepartamentos();
          this.departamentoForm.reset();
        },
        (error) => {
          this.toastr.error('Error al crear el departamento', 'Error');
        }
      );
    }
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
}
