import { Component, OnInit } from '@angular/core';
import { Historial } from '../../interfaces/Historial';
import { HistoriaClinicaService } from '../../services/historia-clinica.service';

@Component({
  selector: 'app-buscar-historial-clinico',
  templateUrl: './buscar-historial-clinico.page.html',
  styleUrls: ['./buscar-historial-clinico.page.scss'],
})
export class BuscarHistorialClinicoPage implements OnInit {
  nombrePaciente: string = '';
  rutPaciente: string = '';
  historias: Historial[] = [];

  constructor(private _historiaClinicaService: HistoriaClinicaService) { }

  ngOnInit():void { 
    this.getListHistorias();
  }

  getListHistorias(){
    this._historiaClinicaService.getHistorias().subscribe((data:Historial[]) => {
      this.historias = data;
    })
  }

  deleteHistoriaClinica(idHistoria: number){
    this._historiaClinicaService.deleteHistoria(idHistoria).subscribe(() => {
      this.getListHistorias();
    })
  }
}
