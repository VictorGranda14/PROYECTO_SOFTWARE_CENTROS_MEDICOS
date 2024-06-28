import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss']
})
export class HomeAdminPage implements OnInit {

  token: string | null = localStorage.getItem('token');
  decodedToken: any;
  nombre: string = '';
  apellido: string = '';

  constructor(private router: Router) {
    if (this.token) {
      this.decodedToken = jwtDecode(this.token);
      this.nombre = this.decodedToken.nombre;
      this.apellido = this.decodedToken.apellido;
    } 
  }

  ngOnInit() {}

  navigateToPage(page: string) {
    this.router.navigate([page]);
  }
}
