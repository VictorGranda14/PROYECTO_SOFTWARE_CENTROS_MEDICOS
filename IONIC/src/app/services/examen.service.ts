import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Examen } from '../interfaces/Examen';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  private myAppUrl: string; //localhost:3000
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endPoint;
    this.myApiUrl = 'api/examenes/'
  }

  getExamenes(): Observable<Examen[]>{
    return this.http.get<Examen[]>(this.myAppUrl+this.myApiUrl);
  }

  deleteExamen(idExamen: number): Observable<void>{
    return this.http.delete <void> (`${this.myAppUrl}${this.myApiUrl}${idExamen}`)
  }

  saveExamen(examen: FormData): Observable <void>{
    return this.http.post<void> (this.myAppUrl+this.myApiUrl, examen)
  }
}

