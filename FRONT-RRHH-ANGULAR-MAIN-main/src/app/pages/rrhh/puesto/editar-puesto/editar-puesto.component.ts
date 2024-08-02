import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PuestoService } from '../../../../core/services/puesto.service';
import { DepartamentoService } from '../../../../core/services/departamento.service';

@Component({
  selector: 'app-editar-puesto',
  templateUrl: './editar-puesto.component.html',
  styleUrls: ['./editar-puesto.component.scss']
})
export class EditarPuestoComponent implements OnInit {
  puestoForm: FormGroup;
  puestoId!: number;
  departamentos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private puestoService: PuestoService,
    private departamentoService: DepartamentoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.puestoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      salario: [0, [Validators.required, Validators.min(0)]],
      idDepartamento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.puestoId = +params['id'];
      this.cargarPuesto(this.puestoId);
      this.cargarDepartamentos();
    });
  }

  cargarPuesto(id: number): void {
    this.puestoService.getPuestoById(id).subscribe({
      next: (data) => {
        if (data) {
          this.puestoForm.patchValue(data);
        } else {
          this.toastr.error('Puesto no encontrado', 'Error');
          this.router.navigate(['/rrhh/ver-puestos']);
        }
      },
      error: (err) => {
        this.toastr.error('Error al cargar el puesto', 'Error');
        console.error('Error al cargar el puesto:', err);
        this.router.navigate(['/rrhh/ver-puestos']);
      }
    });
  }

  cargarDepartamentos(): void {
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
      this.puestoService.updatePuesto(this.puestoId, this.puestoForm.value).subscribe({
        next: () => {
          this.toastr.success('Puesto actualizado correctamente', 'Éxito');
          this.router.navigate(['/rrhh/ver-puestos']);
        },
        error: (err) => {
          this.toastr.error('Error al actualizar el puesto', 'Error');
          console.error('Error al actualizar el puesto:', err);
        }
      });
    }
  }
}
