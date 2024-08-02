import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HorarioService } from '../../../core/services/horario.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { DepartamentoService } from '../../../core/services/departamento.service';

@Component({
  selector: 'app-rrhh-horario',
  templateUrl: './rrhh-horario.component.html',
  styleUrls: ['./rrhh-horario.component.scss']
})
export class RrhhHorarioComponent implements OnInit {
  horarioForm: FormGroup;
  usuarios: any[] = [];
  departamentos: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private horarioService: HorarioService,
    private usuarioService: UsuarioService,
    private departamentoService: DepartamentoService
  ) {
    this.horarioForm = this.formBuilder.group({
      dia: ['', [Validators.required]],
      horaEntrada: ['', [Validators.required]],
      horaSalida: ['', [Validators.required]],
      horasExtra: [0, [Validators.required, Validators.min(0)]],
      compensaciones: [0.0, [Validators.required, Validators.min(0)]],
      idUsuario: ['', [Validators.required]],
      idDepartamento: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadUsuarios();
    this.loadDepartamentos();
  }

  loadUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => {
        this.toastr.error('Error al cargar los usuarios', 'Error');
        console.error('Error al cargar los usuarios:', err);
      }
    });
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
    if (this.horarioForm.valid) {
      const formValues = this.horarioForm.value;
      const dia = new Date(formValues.dia);

      const horaEntrada = this.combineDateAndTime(dia, formValues.horaEntrada);
      const horaSalida = this.combineDateAndTime(dia, formValues.horaSalida);

      const horarioData = {
        ...formValues,
        horaEntrada: horaEntrada.toISOString(),
        horaSalida: horaSalida.toISOString()
      };

      this.horarioService.createHorario(horarioData).subscribe({
        next: (response) => {
          this.toastr.success('Horario creado correctamente', 'Éxito');
          console.log('Horario creado', response);
        },
        error: (err) => {
          this.toastr.error('Error al crear el horario', 'Error');
          console.error('Error al crear el horario:', err);
        }
      });
    }
  }

  private combineDateAndTime(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const combinedDate = new Date(date);
    combinedDate.setHours(hours);
    combinedDate.setMinutes(minutes);
    combinedDate.setSeconds(0);
    combinedDate.setMilliseconds(0);
    return combinedDate;
  }
}
