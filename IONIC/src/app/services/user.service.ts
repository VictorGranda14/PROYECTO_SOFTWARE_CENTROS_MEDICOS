import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paciente } from '../interfaces/Paciente';
import { User } from '../interfaces/User';
import { Funcionario } from '../interfaces/Funcionario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string; //localhost:3000
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endPoint;
    this.myApiUrl = 'api/users/'
  }

  register(user: Paciente): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user)
  }

  login(user: User): Observable<{token: string, tipo: number}>{
    return this.http.post<{token: string, tipo: number}>(`${this.myAppUrl}${this.myApiUrl}login`, user)
  } 

  getFuncionarios(): Observable<Funcionario[]>{
    return this.http.get<Funcionario[]>(this.myAppUrl+this.myApiUrl);
  }
}
