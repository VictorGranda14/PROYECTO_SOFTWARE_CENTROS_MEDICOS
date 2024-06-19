import { Component, OnInit } from '@angular/core';
import { Examen } from 'src/app/interfaces/Examen';
import { ExamenService } from 'src/app/services/examen.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-examen',
  templateUrl: './buscar-examen.page.html',
  styleUrls: ['./buscar-examen.page.scss'],
})
export class BuscarExamenPage implements OnInit {
  rutPaciente: string = '';
  examenes: Examen[] = [];
  showResults: boolean = false;

  constructor(
    private router: Router,
    private _examenService: ExamenService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  getListExamenes(){
    this.showResults = false; // No mostrar la data previo a la búsqueda
    this._examenService.getExamenes().subscribe((data: Examen[]) => {
      this.examenes = data.filter(examen => 
        (this.rutPaciente ? examen.idPaciente.toLowerCase().includes(this.rutPaciente.toLowerCase()) : true)
      );
      this.showResults = true; // Mostrar la data post filtro
      if (this.examenes.length === 0) {
        this.toastr.warning('No se encontraron exámenes que coincidan con los criterios de búsqueda.', 'Sin resultados');
      }
    });
  }

  deleteExamen(idExamen: number) {
    this._examenService.deleteExamen(idExamen).subscribe(() => {
      this.getListExamenes();
      this.toastr.success('Examen eliminado con éxito.', 'Eliminado');
    });
  }

  downloadArchivo(rutaArchivo: string){
    window.open(`http://localhost:3000/uploads/${rutaArchivo}`, '_blank')
  }

  navigateToPage(page: string) {
    this.router.navigate([page]);
  }
}
