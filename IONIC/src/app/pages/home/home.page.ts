import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CitaService } from 'src/app/services/cita.service';
import { Cita } from 'src/app/interfaces/Cita';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  reservedHours: Cita[] = [];
  token: string | null = localStorage.getItem('token');
  decodedToken: any;
  idPaciente: string;
  nombre: string = '';
  apellido: string = '';

  constructor(
    private citaService: CitaService, 
    private router: Router, 
    private toastr: ToastrService
  ) {
    if (this.token) {
      this.decodedToken = jwtDecode(this.token);
      this.idPaciente = this.decodedToken.rut;
      this.nombre = this.decodedToken.nombre;
      this.apellido = this.decodedToken.apellido;
    } 
  }

  ngOnInit() {
    this.loadReservedHours();
  }

  ionViewWillEnter() {
    this.loadReservedHours();
  }

  loadReservedHours() {
    if (this.idPaciente) {
      this.citaService.obtenerCitasPorPaciente(this.idPaciente).subscribe({
        next: (citas) => {
          this.reservedHours = citas;
        },
        error: (err) => {
          console.error('Error al cargar las citas:', err);
        }
      });
    }
  }

  cancelReservation(idCita: number) {
    this.citaService.cancelarCita(idCita).subscribe({
      next: () => {
        this.toastr.success('Cita cancelada con éxito');
        this.loadReservedHours(); // Recargar las horas reservadas
      },
      error: (err) => {
        console.error('Error al cancelar la cita:', err);
        this.toastr.error('Error al cancelar la cita');
      }
    });
  }

  navigateToPage(page: string) {
    if (page === '/home') {
      this.router.navigate([page], { replaceUrl: true });
    } else {
      this.router.navigate([page]);
    }
  }
}


