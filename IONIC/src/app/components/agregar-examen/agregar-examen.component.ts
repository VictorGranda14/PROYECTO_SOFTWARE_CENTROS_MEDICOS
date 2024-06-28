import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExamenService } from 'src/app/services/examen.service';

@Component({
  selector: 'app-agregar-examen',
  templateUrl: './agregar-examen.component.html',
  styleUrls: ['./agregar-examen.component.scss'],
})

export class AgregarExamenComponent implements OnInit {
  examenForm: FormGroup;
  file: File | null = null;
  fileError: string | null = null;

  constructor(private fb: FormBuilder, 
    private router: Router,
    private toastr: ToastrService, 
    private _examenService: ExamenService) {
       
    this.examenForm = this.fb.group({
      fecha: ['', Validators.required],
      idPaciente: ['', [Validators.required, this.validarRUT]],
      idFuncionario: ['',[Validators.required, this.validarRUT]],
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

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.file = file;
      this.fileError = null;
    } else {
      this.file = null;
      this.fileError = 'Solo se permiten archivos PDF';
    }
  }

  onSubmit() {
    if (this.examenForm.valid && this.file) {
      const formData = new FormData();

      formData.append('fecha', this.examenForm.value.fecha);
      formData.append('rutaArchivo', this.file);
      formData.append('idPaciente', this.examenForm.value.idPaciente);
      formData.append('idFuncionario', this.examenForm.value.idFuncionario);

      this._examenService.saveExamen(formData).subscribe(() => {
        this.toastr.success('El examen fue registrado con éxito', 'Examen registrado');
        this.router.navigate(['/buscar-examen']);
      }, error => {
        console.error('Error al agregar examen:', error);
        this.toastr.error('Error al agregar examen. El RUT del paciente y/o funcionario ingresado no está registrado, vuelva a intentarlo.', 'Error');
      });
    } else {
      console.log('Formulario no válido');
    }
  }
  onCancel() {
    this.router.navigate(['/buscar-examen']);
  }
}