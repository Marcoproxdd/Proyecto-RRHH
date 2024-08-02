import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://192.168.1.228:3000/v1/api/usuario'; // Cambia la URL si es necesario

  constructor(private http: HttpClient) {}
  

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }


  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  createUser(user: Usuario): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  updateUsuario(id: number, user: Usuario): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getBirthdayUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cumpleanos`);
  }
  desactivarUsuario(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/desactivar`, {});
  }

  activarUsuario(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/activar`, {});
  }
}
