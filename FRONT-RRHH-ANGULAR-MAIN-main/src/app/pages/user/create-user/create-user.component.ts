import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../core/services/usuario.service';
import { PuestoService } from '../../../core/services/puesto.service';
import { RolService } from '../../../core/services/rol.service';
import { DepartamentoService } from '../../../core/services/departamento.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;
  puestos: any[] = [];
  roles: any[] = [];
  departamentos: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
    private puestoService: PuestoService,
    private rolService: RolService,
    private departamentoService: DepartamentoService
  ) {
    this.userForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      identificacion: ['', Validators.required],
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required],
      cumpleanios: ['', Validators.required],
      idPuesto: [null, Validators.required],
      idRol: [null, Validators.required],
      idDepartamento: [null, Validators.required],
      fechaIngreso: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPuestos();
    this.loadRoles();
    this.loadDepartamentos();
  }

  loadPuestos() {
    this.puestoService.getPuestos().subscribe(data => {
      this.puestos = data;
    }, error => {
      console.error('Error al cargar puestos', error);
    });
  }

  loadRoles() {
    this.rolService.getRoles().subscribe(data => {
      this.roles = data;
    }, error => {
      console.error('Error al cargar roles', error);
    });
  }

  loadDepartamentos() {
    this.departamentoService.getDepartamentos().subscribe(data => {
      this.departamentos = data;
    }, error => {
      console.error('Error al cargar departamentos', error);
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.usuarioService.createUser(this.userForm.value).subscribe(
        response => {
          this.toastr.success('¡Usuario creado correctamente!', 'Éxito');
          this.router.navigate(['/user/view']);
        },
        error => {
          console.error(error);
          this.toastr.error('Ocurrió un error al crear el usuario.', 'Error');
        }
      );
    } else {
      this.toastr.error('Por favor, completa el formulario correctamente.', 'Error');
    }
  }
}
