import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private apiUrl = 'http://192.168.1.228:3000/v1/api/horario';

  constructor(private http: HttpClient) {}

  getHorarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getHorarioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateHorario(id: number, horario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, horario);
  }


  createHorario(horario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, horario);
  }
  deleteHorario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
