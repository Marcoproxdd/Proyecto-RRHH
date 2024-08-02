import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RolService } from '../../../../core/services/rol.service';

@Component({
  selector: 'app-editar-rol',
  templateUrl: './editar-rol.component.html',
  styleUrls: ['./editar-rol.component.scss']
})
export class EditarRolComponent implements OnInit {
  rolForm: FormGroup;
  rolId!: number;

  constructor(
    private fb: FormBuilder,
    private rolService: RolService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.rolForm = this.fb.group({
      rol: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.rolId = +params['id'];
      this.cargarRol(this.rolId);
    });
  }

  cargarRol(id: number): void {
    this.rolService.getRolById(id).subscribe({
      next: (data) => {
        if (data) {
          this.rolForm.patchValue(data);
        } else {
          this.toastr.error('Rol no encontrado', 'Error');
          this.router.navigate(['/rrhh/ver-roles']);
        }
      },
      error: (err) => {
        this.toastr.error('Error al cargar el rol', 'Error');
        this.router.navigate(['/rrhh/ver-roles']);
      }
    });
  }

  onSubmit(): void {
    if (this.rolForm.valid) {
      this.rolService.updateRol(this.rolId, this.rolForm.value).subscribe({
        next: () => {
          this.toastr.success('Rol actualizado correctamente', 'Éxito');
          this.router.navigate(['/rrhh/ver-roles']);
        },
        error: (err) => {
          this.toastr.error('Error al actualizar el rol', 'Error');
        }
      });
    }
  }
}
