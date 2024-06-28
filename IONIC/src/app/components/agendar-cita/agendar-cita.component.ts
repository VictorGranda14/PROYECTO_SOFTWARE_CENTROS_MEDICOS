import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/services/user.service';
import { CitaService } from 'src/app/services/cita.service';
import { Funcionario } from 'src/app/interfaces/Funcionario';
import { Cita } from 'src/app/interfaces/Cita';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.scss']
})
export class AgendarCitaComponent implements OnInit {
  agendaForm: FormGroup;
  funcionarios: Funcionario[] = [];

  token = localStorage.getItem('token');
  decodedToken: any = jwtDecode(this.token || '{}');
  rutPaciente = this.decodedToken.rut;
  formData: any;

  constructor(private fb: FormBuilder, 
    private userService: UserService, 
    private CitaService: CitaService, 
    private router: Router,
    private toastr: ToastrService ) { 
      
    this.agendaForm = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      motivo: [''],
      idFuncionarioSalud: ['', Validators.required],
      idPaciente: this.rutPaciente
    }); 
  }

  ngOnInit(): void { this.loadFuncionarios(); }

  onSubmit() {
    if (this.agendaForm.valid) {
      const cita: Cita = {
        fecha: this.agendaForm.value.fecha,
        hora: this.agendaForm.value.hora,
        idPaciente: this.agendaForm.value.idPaciente,
        idFuncionarioSalud: this.agendaForm.value.idFuncionarioSalud,
        motivo: this.agendaForm.value.motivo
      };

      console.log(cita)
  
      this.CitaService.guardarCita(cita).subscribe({
        next: () => {
          this.toastr.success('La hora fue agendada con éxito');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error al agendar la hora:', err);
          this.toastr.error('Error al agendar la hora');
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  loadFuncionarios(): void {
    this.userService.getFuncionarios().subscribe({
      next: (data) => {
        this.funcionarios = data;
      },
      error: (error) => {
        console.error('Error al cargar los funcionarios', error);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/home']);
  }
}

