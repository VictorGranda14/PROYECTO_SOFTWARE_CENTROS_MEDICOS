import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from '../../interfaces/Paciente';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _UserService: UserService
  ) {

    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      rut: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      numTelefono: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), this.validarContraseña]],
      passwordVerify: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    const { rut, password, passwordVerify } = this.registerForm.value;
    const rutLimpio = rut.replace(/\./g, '');

    if (this.validarRUT(rutLimpio)) {
      if (this.registerForm.controls["password"].status !== "INVALID") {
        if (password === passwordVerify) {
          this.mensajeError = '';
          const paciente: Paciente = {
            nombre: this.registerForm.value.nombre,
            primerApellido: this.registerForm.value.primerApellido,
            segundoApellido: this.registerForm.value.primerApellido,
            fechaNacimiento: this.registerForm.value.fechaNacimiento,
            idPaciente: rutLimpio,
            email: this.registerForm.value.email,
            direccion: this.registerForm.value.direccion,
            numTelefono: this.registerForm.value.numTelefono,
            password: this.registerForm.value.password,
          };

          this._UserService.register(paciente).subscribe({
            next: (v) => {
              this.toastr.success('Usuario registrado con éxito');
              this.router.navigate(['/login']);
            },
            error: (e: HttpErrorResponse) => {
              this.mensajeError = e.error.msg || 'Credenciales inválidas';
              this.toastr.error(this.mensajeError);
            }
          });

        } else {
          this.toastr.error('La contraseña no coincide');
          this.registerForm.get('passwordVerify')!.setErrors({ mismatch: true });
        }
      } else {
        this.toastr.error('La contraseña debe tener al menos 6 caracteres y 1 número');
        this.registerForm.get('password')!.setErrors({ invalid: true });
      }
    } else {
      this.toastr.error('RUT inválido. Por favor, intenta nuevamente.');
      this.registerForm.get('rut')!.setErrors({ invalid: true });
    }
  }

  validarRUT(rut: string): boolean {
    if (rut.includes('-')) {
      const partes = rut.split('-');
      if (partes.length === 2) {
        const cuerpo = partes[0];
        const cod = partes[1];
        let suma = 0;
        let multiplo = 2;

        for (let i = cuerpo.length - 1; i >= 0; i--) {
          suma += multiplo * parseInt(cuerpo.charAt(i), 10);
          multiplo = multiplo < 7 ? multiplo + 1 : 2;
        }
        const codEsperado = 11 - (suma % 11);
        const codCalculado = codEsperado === 11 ? 0 : codEsperado === 10 ? 'K' : codEsperado;
        return cod.toUpperCase() === codCalculado.toString();
      }
    }
    return false;
  }

  validarContraseña(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    const conNumero = /\d/;
    if (password?.length < 6 || !conNumero.test(password)) {
      return { invalid: true };
    }
    return null;
  }
}
