import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  private apiUrl = 'http://192.168.1.228:3000/v1/api/permiso';

  constructor(private http: HttpClient) {}

  createPermiso(permiso: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, permiso);
  }
  getPermisos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPermisosByUsuario(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  approvePermiso(permisoId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/aprobar/${permisoId}`, {});
  }

  updatePermiso(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deletePermiso(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
    
  }
  desactivarPermiso(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/desactivar`, {});
  }

  activarPermiso(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/activar`, {});
  }
  
  getBirthdayPermisos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cumpleanos`);
  }
}
