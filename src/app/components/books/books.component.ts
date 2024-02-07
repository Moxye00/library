import { Component, OnInit } from '@angular/core';
import { Book } from 'src/model/dtos/book';
import { AuthService } from 'src/services/authservice.service';
import { bookService } from 'src/services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{
  allBooks: Book[] = [];

  constructor(private bookService: bookService, private authService: AuthService){}

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

  /*assignBook(bookId: number) {
    const userId = this.authService.userPublisher.value?.user.id;
    if (userId) {
      this.libraryService.assignBookToUser(userId, bookId).subscribe(
        () => {
          console.log('Book assigned successfully');
        },
        error => {
          console.error('Failed to assign book:', error);
        }
      );
    } else {
      console.error('User ID not available.');

    }
  }*/

}
