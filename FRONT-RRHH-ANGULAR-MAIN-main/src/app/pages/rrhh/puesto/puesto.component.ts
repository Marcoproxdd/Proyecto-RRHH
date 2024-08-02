import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PuestoService } from '../../../core/services/puesto.service';
import { DepartamentoService } from '../../../core/services/departamento.service';

@Component({
  selector: 'app-puesto',
  templateUrl: './puesto.component.html',
  styleUrls: ['./puesto.component.scss']
})
export class PuestoComponent implements OnInit {
  puestoForm: FormGroup;
  departamentos: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private puestoService: PuestoService,
    private departamentoService: DepartamentoService
  ) {
    this.puestoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      salario: [0, [Validators.required, Validators.min(0)]],
      idDepartamento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadDepartamentos();
  }

  loadDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe({
      next: (data) => {
        this.departamentos = data;
      },
      error: (err) => {
        this.toastr.error('Error al cargar los departamentos', 'Error');
        console.error('Error al cargar los departamentos:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.puestoForm.valid) {
      this.puestoService.createPuesto(this.puestoForm.value).subscribe({
        next: (response) => {
          this.toastr.success('Puesto creado correctamente', 'Éxito');
          this.router.navigate(['/rrhh/puestos']);
        },
        error: (err) => {
          this.toastr.error('Error al crear el puesto', 'Error');
          console.error('Error al crear el puesto:', err);
        }
      });
    }
  }
}
