// RegisterComponent.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/services/authservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

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
      },
      (error) => {
        console.error('Registration Failed', error);
        this.errorMessage = 'Errore durante la registrazione. Riprova.';
      }
    );
  }
}
