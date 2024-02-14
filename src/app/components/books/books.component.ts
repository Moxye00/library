import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, catchError, tap, throwError } from 'rxjs';
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
  showErrorMessage: boolean = false;
  hideBookList: boolean=false;
  paginatedBooks: Book[] = [];
  pageSize = 9;
  pageEvent: PageEvent | undefined;
  searching: boolean = false;

  constructor(private bookService: bookService, private authService: AuthService, private userService: userService){}

  ngOnInit(): void {
    this.getBooks().subscribe(books => {
      this.allBooks = books;
      this.paginate({pageIndex: 0, pageSize: this.pageSize} as PageEvent);
    });
  }

  paginate(event: PageEvent) {
    const startIdx = event.pageIndex * event.pageSize;
    const endIdx = startIdx + event.pageSize;
    this.paginatedBooks = this.allBooks.slice(startIdx, endIdx);
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
          this.showErrorMessage = true;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 5000);
        }
      });
    } else {
      console.error('Unauthenticated user.');
      alert('Please log in to add books to your list.');
    }
  }

  getBooks(): Observable<Book[]>{
    return this.bookService.getAllBooks().pipe(
      tap(b => {
        this.allBooks = b;
        console.log(this.allBooks);
      }),
      catchError((error) => {
        console.error('Errore nel recupero dei libri:', error);
        return throwError(error);
      })
    );
  }

}
