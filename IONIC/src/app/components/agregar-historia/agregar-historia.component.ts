import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService, 
    private _historiaClinicaService: HistoriaClinicaService) {
       
    this.historiaForm = this.fb.group({
      nombrePaciente: ['', Validators.required],
      rutPaciente: ['', [Validators.required, this.validarRUT]],
      fechaIngreso: ['', Validators.required],
      descripcion: ['', Validators.required],
      diagnostico: ['', Validators.required],
      antecedentes: [''],
    });
  }

  ngOnInit() {}

  validarRUT(control: AbstractControl) {
    const rut = control.value;
    if (!/^[0-9]+-[0-9kK]{1}$/.test(rut)) {
      return { invalidRUT: true };
    }

    const [rutBody, dv] = rut.split('-');
    const sum = rutBody
      .split('')
      .reverse()
      .reduce((acc:any, digit:any, idx:any) => acc + Number(digit) * ((idx % 6) + 2), 0);

    const computedDv = 11 - (sum % 11);
    const finalDv = computedDv === 11 ? '0' : computedDv === 10 ? 'k' : computedDv.toString();

    if (dv.toLowerCase() !== finalDv) {
      return { invalidRUT: true };
    }

    return null;
  }

  onSubmit() {
    if (this.historiaForm.valid) {
      const historia: Historial = {
        nombrePaciente: this.historiaForm.value.nombrePaciente,
        fechaIngreso: this.historiaForm.value.fechaIngreso,
        descripcion: this.historiaForm.value.descripcion,
        diagnostico: this.historiaForm.value.diagnostico,
        antecedentes: this.historiaForm.value.antecedentes,
        idPaciente: this.historiaForm.value.rutPaciente
      };

      console.log(historia);

      this._historiaClinicaService.saveHistoria(historia).subscribe(() => {
        this.toastr.success('La historia clínica fue registrada con éxito', 'Historia Clínica registrada');
        this.router.navigate(['/buscar-historial-clinico']);
      }, error => {
        console.error('Error al agregar historia clínica:', error);
        this.toastr.error('Error al agregar historia clínica. El RUT del paciente ingresado no está registrado, vuelva a intentarlo.', 'Error');
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  onCancel() {
    this.router.navigate(['/buscar-historial-clinico']);
  }
}

