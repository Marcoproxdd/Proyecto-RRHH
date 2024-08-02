import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HorarioService } from '../../../../core/services/horario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-horario',
  templateUrl: './editar-horario.component.html',
  styleUrls: ['./editar-horario.component.scss']
})
export class EditarHorarioComponent implements OnInit {
  horarioForm: FormGroup;
  horarioId!: number;

  constructor(
    private fb: FormBuilder,
    private horarioService: HorarioService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.horarioForm = this.fb.group({
      dia: ['', Validators.required],
      horaEntrada: ['', Validators.required],
      horaSalida: ['', Validators.required],
      horasExtra: [0, Validators.required],
      compensaciones: [0, Validators.required],
      idUsuario: [0, Validators.required],
      idDepartamento: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.horarioId = +params['id'];
      this.cargarHorario(this.horarioId);
    });
  }

  cargarHorario(id: number): void {
    this.horarioService.getHorarioById(id).subscribe({
      next: (data) => {
        if (data) {
          // Ajustar las horas para compensar las 5 horas adicionales
          data.horaEntrada = this.adjustTime(data.horaEntrada);
          data.horaSalida = this.adjustTime(data.horaSalida);
          this.horarioForm.patchValue(data);
        } else {
          this.toastr.error('Horario no encontrado', 'Error');
          this.router.navigate(['/rrhh/ver-horarios']);
        }
      },
      error: (err) => {
        this.toastr.error('Error al cargar el horario', 'Error');
        this.router.navigate(['/rrhh/ver-horarios']);
      }
    });
  }

  actualizarHorario(): void {
    if (this.horarioForm.valid) {
      this.horarioService.updateHorario(this.horarioId, this.horarioForm.value).subscribe({
        next: () => {
          this.toastr.success('Horario actualizado correctamente', 'Éxito');
          this.router.navigate(['/rrhh/ver-horarios']);
        },
        error: (err) => {
          this.toastr.error('Error al actualizar el horario', 'Error');
        }
      });
    }
  }

  private formatTime(time: string): string {
    if (time) {
      const date = new Date(time);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    return '';
  }

  private adjustTime(time: string): string {
    if (time) {
      const date = new Date(time);
      date.setHours(date.getHours() + 5); // Restar 5 horas
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    return '';
  }
}
