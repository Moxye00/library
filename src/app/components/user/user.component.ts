import { Component, OnInit } from '@angular/core';
import { AuthUser } from 'src/model/dtos/auth-user';
import { AuthService } from 'src/services/authservice.service';
import { Router } from '@angular/router';
import { LibraryItemDto } from 'src/model/dtos/library-item';
import { userService } from 'src/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  userData: AuthUser | null = null;
  userBooks: LibraryItemDto[] = [];

  constructor(private authService: AuthService, private userService: userService, private router: Router ) {}

  ngOnInit(): void {
    this.userData = this.authService.checkLogin();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  fetchAssignedBook(userId: number): void {
    this.userService.getUserBooks(userId).subscribe({
      next: (books) => {
        this.userBooks = books;
      },
      error: (error) => {
        console.error('errore ndel recupero dei libri', error);
      }
    });

  }

}
