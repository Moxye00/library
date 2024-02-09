import { Component, OnInit } from '@angular/core';
import { Book } from 'src/model/dtos/book';
import { AuthService } from 'src/services/authservice.service';
import { bookService } from 'src/services/book.service';
import { userService } from 'src/services/user.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{
  allBooks: Book[] = [];
  showSuccessMessage: boolean = false;

  constructor(private bookService: bookService, private authService: AuthService, private userService: userService){}

  ngOnInit(): void {
    this.fetchAllBooks();
  }

  fetchAllBooks() {
    this.bookService.getAllBooks().subscribe({
      next: b => {
          this.allBooks = b;
          console.log(this.allBooks);
      },
      error: (error) => {
          console.error('Errore nel recupero dei libri:', error);
      }
    });
  }

  assignBookToUser(bookId: number): void {
    const userId = this.authService.checkLogin()?.user.id;
    if(userId){
      this.userService.assignBookToUser(userId, bookId).subscribe( {
        next: () => {
          console.log('Book added to library successfully');
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 5000);
        }, 
        error: (error) => {
          console.error('Book not added to library', error);
        }
      });
    } else {
      console.error('user non loggato');
      alert('user non loggato');
    }
  }
  
}
