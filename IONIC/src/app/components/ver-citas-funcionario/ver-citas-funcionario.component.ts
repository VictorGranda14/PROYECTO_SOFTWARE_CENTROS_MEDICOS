import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { CitaService } from 'src/app/services/cita.service';
import { Cita } from 'src/app/interfaces/Cita';

@Component({
  selector: 'app-ver-citas-funcionario',
  templateUrl: './ver-citas-funcionario.component.html',
  styleUrls: ['./ver-citas-funcionario.component.scss']
})
export class VerCitasFuncionarioComponent implements OnInit {
  citas: Cita[] = [];
  token = localStorage.getItem('token');
  decodedToken: any = jwtDecode(this.token || '{}');
  idFuncionarioSalud = this.decodedToken.rut;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private citaService: CitaService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadCitas();
  }

  loadCitas() {
    this.citaService.obtenerCitasPorFuncionario(this.idFuncionarioSalud).subscribe({
      next: (citas) => {
        this.citas = citas;
      },
      error: (err) => {
        console.error('Error al cargar las citas:', err);
        this.toastr.error('Error al cargar las citas');
      }
    });
  }

  cancelarCita(idCita: number) {
    this.citaService.cancelarCita(idCita).subscribe({
      next: () => {
        this.toastr.success('Cita cancelada con éxito');
        this.loadCitas();
      },
      error: (err) => {
        console.error('Error al cancelar la cita:', err);
        this.toastr.error('Error al cancelar la cita');
      }
    });
  }
}
