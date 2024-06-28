import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Examen } from 'src/app/interfaces/Examen';
import { ExamenService } from 'src/app/services/examen.service';

@Component({
  selector: 'app-ver-examen',
  templateUrl: './ver-examen.component.html',
  styleUrls: ['./ver-examen.component.scss']
})
export class VerExamenComponent implements OnInit {
  examenes: Examen[] = [];
  showResults: boolean = false;

  token = localStorage.getItem('token');
  decodedToken: any = jwtDecode(this.token || '{}');
  rutPaciente = this.decodedToken.rut;
  
  constructor(
    private router: Router,
    private _examenService: ExamenService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getListExamenes();  // Cargar los exámenes automáticamente al iniciar
  }

  getListExamenes() {
    console.log(this.rutPaciente)
    this.showResults = false;
    this._examenService.getExamenes().subscribe({
      next: (data: Examen[]) => {
        this.examenes = data.filter(examen => examen.idPaciente.toLowerCase().includes(this.rutPaciente.toLowerCase()));
        this.showResults = true;
        if (this.examenes.length === 0) {
          this.toastr.warning('No se encontraron exámenes que coincidan con los criterios de búsqueda.', 'Sin resultados');
        }
      },
      error: (error) => {
        console.error('Error fetching exams', error);
        this.toastr.error('Error al buscar los exámenes');
      }
    });
  }

  downloadArchivo(rutaArchivo: string) {
    window.open(`http://localhost:3000/uploads/${rutaArchivo}`, '_blank');
  }

  navigateToPage(page: string) {
    this.router.navigate([page]);
  }

  mostrarRut() {
    return this.rutPaciente;
  }
}

