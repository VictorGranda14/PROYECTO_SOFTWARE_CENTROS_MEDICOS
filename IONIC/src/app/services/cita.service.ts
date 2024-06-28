import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cita } from '../interfaces/Cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private myAppUrl: string; //localhost:3000
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endPoint;
    this.myApiUrl = 'api/citas/'
  }

  guardarCita(cita: Cita): Observable <void>{
    return this.http.post<void> (this.myAppUrl+this.myApiUrl, cita)
  }
  obtenerCitasPorPaciente(idPaciente: string): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.myAppUrl}${this.myApiUrl}paciente/${idPaciente}`);
  }
  cancelarCita(idCita: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${idCita}`);
  }
  obtenerCitasPorFuncionario(idFuncionarioSalud: string): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.myAppUrl}${this.myApiUrl}funcionario/${idFuncionarioSalud}`);
  }
}
