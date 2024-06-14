import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Historial } from 'src/app/interfaces/Historial';
import { HistoriaClinicaService } from 'src/app/services/historia-clinica.service';

@Component({
  selector: 'app-agregar-historia',
  templateUrl: './agregar-historia.component.html',
  styleUrls: ['./agregar-historia.component.scss'],
})
export class AgregarHistoriaComponent implements OnInit {
  historiaForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private router: Router, 
    private _historiaClinicaService: HistoriaClinicaService) {
       
    this.historiaForm = this.fb.group({
      nombrePaciente: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      descripcion: ['', Validators.required],
      diagnostico: ['', Validators.required],
      antecedentes: [''],
    });
  }

  ngOnInit() {}

  onSubmit() {
    const historia: Historial = {
      idHistoria: 1,
      nombrePaciente: this.historiaForm.value.nombrePaciente,
      fechaIngreso: this.historiaForm.value.fechaIngreso,
      descripcion: this.historiaForm.value.descripcion,
      diagnostico: this.historiaForm.value.diagnostico,
      antecedentes: this.historiaForm.value.antecedentes,
      idPaciente: '21.160.315-1'
    }

    console.log(historia);

    if (this.historiaForm.valid) {
      this._historiaClinicaService.saveHistoria(historia).subscribe(() => {
        console.log("Producto agregado");
      })
    } else {
      console.log('Formulario no válido');
    }
  }

  onCancel() {
    this.router.navigate(['/buscar-historial-clinico']);
  }
}
