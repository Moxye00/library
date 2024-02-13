import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    if(this.authService.checkLogin()){
      this.router.navigate(['/user']);
    }
  }

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
        if (error.status === 400 && error.error === "L'indirizzo email è già in uso"){
          this.errorMessage = 'L\'indirizzo email è già in suo. Si prega di utilizzare un altro indirizzo email.';
        } else {
          this.errorMessage = 'Errore durante la registrazione. Riprova.';
        }
      }
    );
  }

}
