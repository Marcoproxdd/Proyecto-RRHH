import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-permiso-list',
  templateUrl: './permiso-list.component.html',
  styleUrls: ['./permiso-list.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, RouterLink]
})
export class PermisoListComponent implements OnInit {
  permisos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getPermisos();
  }

  getPermisos(): void {
    this.http.get<any[]>('http://localhost:3000/v1/api/permiso')
      .subscribe((data: any[]) => {
        this.permisos = data;
      }, (error: any) => {
        console.error('Error al obtener permisos', error);
      });
  }
}