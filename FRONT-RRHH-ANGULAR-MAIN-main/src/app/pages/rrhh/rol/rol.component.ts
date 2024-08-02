import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolService } from '../../../core/services/rol.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolComponent implements OnInit {
  roles: any[] = [];
  rolForm!: FormGroup;

  constructor(
    private rolService: RolService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.rolForm = this.formBuilder.group({
      rol: ['', Validators.required],
      descripcion: ['']
    });

    this.loadRoles();
  }

  loadRoles() {
    this.rolService.getRoles().subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        this.toastr.error('Error al cargar los roles', 'Error');
      }
    );
  }

  onSubmit() {
    if (this.rolForm.valid) {
      this.rolService.createRol(this.rolForm.value).subscribe(
        (response) => {
          this.toastr.success('Rol creado correctamente', 'Éxito');
          this.loadRoles();
          this.rolForm.reset();
        },
        (error) => {
          this.toastr.error('Error al crear el rol', 'Error');
        }
      );
    }
  }

  onDelete(id: number) {
    this.rolService.deleteRol(id).subscribe(
      (response) => {
        this.toastr.success('Rol eliminado correctamente', 'Éxito');
        this.loadRoles();
      },
      (error) => {
        this.toastr.error('Error al eliminar el rol', 'Error');
      }
    );
  }
}
