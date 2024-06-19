import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
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
    private _userService: UserService
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
      nombrePaciente: '',
      apellidoPaciente: '',
      idPaciente: '',
      region: '',
      comuna: '',
      role: ''
    };

    this._userService.login(user).subscribe({
      next: (response) => {
        const token = response.token;  // Asegúrate de que el token se extrae correctamente
        localStorage.setItem('token', token);
        this.toast.success('Inicio de sesión exitoso');

        const decodedToken: any = jwtDecode(token);
        const userRole = decodedToken.role;

        if (userRole == 'admin') {
          this.router.navigate(['/home-admin']);
        } else {
          this.router.navigate(['/home']);
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
