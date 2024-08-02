import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermisoService } from '../../../../core/services/permiso.service';
import { UsuarioService } from '../../../../core/services/usuario.service'; // Importa el servicio de usuarios
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-permiso',
  templateUrl: './crear-permiso.component.html',
  styleUrls: ['./crear-permiso.component.scss']
})
export class CrearPermisoComponent implements OnInit {
  permisoForm!: FormGroup;
  usuarios: any[] = []; // Array para almacenar la lista de usuarios

  constructor(
    private fb: FormBuilder,
    private permisoService: PermisoService,
    private usuarioService: UsuarioService, // Inyecta el servicio de usuarios
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.permisoForm = this.fb.group({
      tipoPermiso: ['', Validators.required],
      fechaSolicitud: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      estado: ['', Validators.required],
      idUsuario: ['', Validators.required]
    });

    // Cargar la lista de usuarios
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (error) => {
        this.toastr.error('Error al cargar usuarios', 'Error');
      }
    });
  }

  onSubmit() {
    if (this.permisoForm.valid) {
      this.permisoService.createPermiso(this.permisoForm.value).subscribe({
        next: () => {
          this.toastr.success('Permiso creado correctamente', 'Éxito');
          this.router.navigate(['/rrhh/permisos']);
        },
        error: () => {
          this.toastr.error('Error al crear permiso', 'Error');
        }
      });
    }
  }
}
