import { Component, OnInit } from '@angular/core';
import { AuthUser } from 'src/model/dtos/auth-user';
import { AuthService } from 'src/services/authservice.service';
import { Router } from '@angular/router';
import { LibraryItemDto } from 'src/model/dtos/library-item';
import { userService } from 'src/services/user.service';
import { User } from 'src/model/dtos/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  userData: AuthUser | null = null;
  user!: User;
  userBooks: LibraryItemDto[] = [];

  constructor(private authService: AuthService, private userService: userService, private router: Router ) {}

  ngOnInit(): void {
    this.userData = this.authService.checkLogin();
    this.fetchAssignedBook(this.userData?.user.id);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  fetchAssignedBook(userId: number | undefined): void {
    this.userService.getUserBooks(userId).subscribe({
        next: (library) => {
          this.userBooks = library;
        },
        error: (error) => {
            console.error('Error fetching books', error);
        }
    });
}


}
