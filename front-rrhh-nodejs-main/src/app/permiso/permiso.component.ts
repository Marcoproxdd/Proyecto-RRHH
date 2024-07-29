import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-permiso',
  templateUrl: './permiso.component.html',
  styleUrls: ['./permiso.component.css'],
  standalone: true,
  imports: [HttpClientModule, FormsModule, RouterModule, RouterLink]
})
export class PermisoComponent {
  permiso = {
    tipoPermiso: '',
    fechaSolicitud: '',
    fechaInicio: '',
    fechaFin: '',
    estado: '',
    idUsuario: null
  };

  constructor(private http: HttpClient) {}

  onSubmit(permisoForm: NgForm) {
    this.http.post('http://localhost:3000/v1/api/permiso', this.permiso)
      .subscribe((response: any) => {
        console.log('Permiso registrado', response);
        // Restablecer el formulario
        this.resetForm(permisoForm);
      }, (error: any) => {
        console.error('Error al registrar permiso', error);
      });
  }

  resetForm(permisoForm: NgForm) {
    permisoForm.resetForm();
    this.permiso = {
      tipoPermiso: '',
      fechaSolicitud: '',
      fechaInicio: '',
      fechaFin: '',
      estado: '',
      idUsuario: null
    };
  }
}