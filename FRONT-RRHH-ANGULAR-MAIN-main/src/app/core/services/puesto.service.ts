import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PuestoService {
    private apiUrl = 'http://192.168.1.228:3000/v1/api/puesto';


  constructor(private http: HttpClient) {}

  getPuestos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getPuestoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createPuesto(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updatePuesto(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deletePuesto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
