import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Historial } from '../interfaces/Historial';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {
  private myAppUrl: string; //localhost:3000
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endPoint;
    this.myApiUrl = 'api/historias/'
  }

  getHistorias(): Observable<Historial[]>{
    return this.http.get<Historial[]>(this.myAppUrl+this.myApiUrl);
  }

  deleteHistoria(idHistoria: number): Observable<void>{
    return this.http.delete <void> (`${this.myAppUrl}${this.myApiUrl}${idHistoria}`)
  }

  saveHistoria(historia: Historial): Observable <void>{
    return this.http.post<void> (this.myAppUrl+this.myApiUrl, historia)
  }
}
