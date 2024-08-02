import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RrhhService {
  private apiUrl = `${environment.api_url}/departamento`; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  createDepartment(departmentData: any) {
    return this.http.post(this.apiUrl, departmentData).toPromise();
  }
}
