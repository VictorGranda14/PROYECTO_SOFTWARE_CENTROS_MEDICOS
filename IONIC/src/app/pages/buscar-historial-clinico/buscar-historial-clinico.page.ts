import { Component, OnInit } from '@angular/core';
import { Historial } from '../../interfaces/Historial';
import { HistoriaClinicaService } from '../../services/historia-clinica.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-historial-clinico',
  templateUrl: './buscar-historial-clinico.page.html',
  styleUrls: ['./buscar-historial-clinico.page.scss'],
})
export class BuscarHistorialClinicoPage implements OnInit {
  nombrePaciente: string = '';
  rutPaciente: string = '';
  historias: Historial[] = [];
  showResults: boolean = false;

  constructor(
    private router: Router,
    private _historiaClinicaService: HistoriaClinicaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  getListHistorias() {
    this.showResults = false; // Reset the flag before fetching data
    this._historiaClinicaService.getHistorias().subscribe((data: Historial[]) => {
      this.historias = data.filter(historia => 
        (this.nombrePaciente ? historia.nombrePaciente.toLowerCase().includes(this.nombrePaciente.toLowerCase()) : true) &&
        (this.rutPaciente ? historia.idPaciente.toLowerCase().includes(this.rutPaciente.toLowerCase()) : true)
      );
      this.showResults = true; // Show the results after fetching and filtering
      if (this.historias.length === 0) {
        this.toastr.warning('No se encontraron historias clínicas que coincidan con los criterios de búsqueda.', 'Sin resultados');
      }
    });
  }

  deleteHistoriaClinica(idHistoria: number) {
    this._historiaClinicaService.deleteHistoria(idHistoria).subscribe(() => {
      this.getListHistorias();
      this.toastr.success('Historia clínica eliminada con éxito.', 'Eliminado');
    });
  }

  navigateToPage(page: string) {
    this.router.navigate([page]);
  }
}
