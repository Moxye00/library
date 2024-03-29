import { Component } from '@angular/core';
import { AuthService } from 'src/services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {

    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe(
      (response) => {
        console.log('Login Successful', response);
        this.router.navigate(['/user'])
      },
      (error) => {
        console.error('Login Failed', error);
        this.errorMessage = 'Credenziali non valide. Riprova.';
      }
    );
  }

  register(): void {
    const registrationData = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      role: 'USER' 
    };

    this.authService.register(registrationData).subscribe(
      (response) => {
        console.log('Registration Successful', response);
        this.router.navigate(['/user'])
      },
      (error) => {
        console.error('Registration Failed', error);
        this.errorMessage = 'Errore durante la registrazione. Riprova.';
      }
    );
  }

}
