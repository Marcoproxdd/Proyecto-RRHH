import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartamentoService } from '../../../../core/services/departamento.service';

@Component({
  selector: 'app-editar-departamento',
  templateUrl: './editar-departamento.component.html',
  styleUrls: ['./editar-departamento.component.scss']
})
export class EditarDepartamentoComponent implements OnInit {
  departamentoForm: FormGroup;
  departamentoId!: number;

  constructor(
    private fb: FormBuilder,
    private departamentoService: DepartamentoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.departamentoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.departamentoId = +params['id'];
      this.cargarDepartamento(this.departamentoId);
    });
  }

  cargarDepartamento(id: number): void {
    this.departamentoService.getDepartamentoById(id).subscribe({
      next: (data) => {
        if (data) {
          this.departamentoForm.patchValue(data);
        } else {
          this.toastr.error('Departamento no encontrado', 'Error');
          this.router.navigate(['/rrhh/ver-departamentos']);
        }
      },
      error: (err) => {
        this.toastr.error('Error al cargar el departamento', 'Error');
        this.router.navigate(['/rrhh/ver-departamentos']);
      }
    });
  }

  onSubmit(): void {
    if (this.departamentoForm.valid) {
      this.departamentoService.updateDepartamento(this.departamentoId, this.departamentoForm.value).subscribe({
        next: () => {
          this.toastr.success('Departamento actualizado correctamente', 'Éxito');
          this.router.navigate(['/rrhh/ver-departamentos']);
        },
        error: (err) => {
          this.toastr.error('Error al actualizar el departamento', 'Error');
        }
      });
    }
  }
}
