import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/User';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  msjError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private _userService: UserService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login_form_submit() {
    const { email, password } = this.loginForm.value;

    const user: User = {
      email: email,
      password: password,
    };

    this._userService.login(user).subscribe({
      next: (response) => {
        const token = response.token;  // Asegúrate de que el token se extrae correctamente
        const tipo = response.tipo;
        localStorage.setItem('token', token);
        this.toast.success('Inicio de sesión exitoso');

        const decodedToken: any = jwtDecode(token);
        const rut = decodedToken.rut;

        if (tipo == 1) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/home-admin']);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error en la solicitud de login:', err);
        this.msjError = err.error.msg || 'Credenciales inválidas';  // Actualizar msjError
        this.toast.error(this.msjError);
      }
    });
  }
}
