import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../core/services/usuario.service';
import { PuestoService } from '../../../core/services/puesto.service';
import { RolService } from '../../../core/services/rol.service';
import { DepartamentoService } from '../../../core/services/departamento.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;
  userId!: number;
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
    private departamentoService: DepartamentoService,
    private route: ActivatedRoute
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
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.loadUserData();
    });

    this.loadPuestos();
    this.loadRoles();
    this.loadDepartamentos();
  }

  loadUserData(): void {
    this.usuarioService.getUsuarioById(this.userId).subscribe(user => {
      this.userForm.patchValue(user);
    }, error => {
      console.error('Error al cargar usuario', error);
    });
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

  onSubmit(): void {
    if (this.userForm.valid) {
      this.usuarioService.updateUsuario(this.userId, this.userForm.value).subscribe(
        response => {
          this.toastr.success('¡Usuario actualizado correctamente!', 'Éxito');
          this.router.navigate(['/user/view']);
        },
        error => {
          console.error('Error al actualizar usuario', error);
          this.toastr.error('Ocurrió un error al actualizar el usuario.', 'Error');
        }
      );
    } else {
      this.toastr.error('Por favor, completa el formulario correctamente.', 'Error');
    }
  }
}
