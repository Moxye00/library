import { Component } from '@angular/core';
import { Author } from 'src/model/dtos/author';
import { authorService } from 'src/services/author.service';
import { Book } from 'src/model/dtos/book';
import { bookService } from 'src/services/book.service';
import { BooksComponent } from '../books/books.component';
import { Genre } from 'src/model/dtos/genre';
import { AuthService } from 'src/services/authservice.service';
import { userService } from 'src/services/user.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchQuery: string = '';
  searchResultsAuthors: Author[] = [];
  searchResultsBooks: Book[] = [];
  searchResultsGenres: Genre[] = [];
  selectedGenre: number | null = null;
  showResults: boolean = false;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(private authorService: authorService, private bookService: bookService, private bookComponent: BooksComponent,
              private authService: AuthService, private userService: userService){}

  searchAuthors() {
    this.authorService.getAuthorsByName(this.searchQuery).subscribe((authors) => {
      this.searchResultsAuthors = authors;
      this.showResults = true;
      console.log(authors);
    });
  }

  searchBooks() {
    this.bookService.getBooksByTitle(this.searchQuery).subscribe((book) => {
      this.searchResultsBooks = book;
      this.showResults = true;
      console.log(book);
    });
  }
  
  searchGenres() {
    this.bookService.getBooksByGenre(+this.searchQuery).subscribe((books) => {
      this.searchResultsBooks = books;
      this.showResults = true;
      console.log(books);
    });
  }

  search() {
    this.searchAuthors();
    this.searchBooks();
    this.bookComponent.hideBookList = true;
  }
  
  closeResults() {
    this.showResults = false;
    this.bookComponent.hideBookList = false;
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

}

