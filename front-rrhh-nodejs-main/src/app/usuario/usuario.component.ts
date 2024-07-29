import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, RouterLink]
})
export class UsuarioComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.http.get<any[]>('http://localhost:3000/v1/api/usuario')
      .subscribe((data: any[]) => {
        this.usuarios = data.map(usuario => ({
          id: usuario.id,
          nombres: usuario.nombres,
          identificacion: usuario.identificacion,
          cumpleanios: usuario.cumpleanios
        }));
      }, (error: any) => {
        console.error('Error al obtener usuarios', error);
      });
  }
}
