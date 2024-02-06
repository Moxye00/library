import { Component } from '@angular/core';
import { AuthService } from 'src/services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  login(): void {

    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe(
      (response) => {
        console.log('Login Successful', response);
      },
      (error) => {
        console.error('Login Failed', error);
        this.errorMessage = 'Credenziali non valide. Riprova.';
      }
    );
  }
}
