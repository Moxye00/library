import { Component } from '@angular/core';
import { Author } from 'src/model/dtos/author';
import { authorService } from 'src/services/author.service';
import { Book } from 'src/model/dtos/book';
import { bookService } from 'src/services/book.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchQuery: string = '';
  searchResultsAuthors: Author[] = [];
  searchResultsBooks: Book[] = [];
  

  constructor(private authorService: authorService, private bookService: bookService){}

  searchAuthors() {
    this.authorService.getAuthorsByName(this.searchQuery).subscribe((authors) => {
      this.searchResultsAuthors = authors;
      console.log(authors);
    });
  }

  searchBooks() {
    this.bookService.getBooksByTitle(this.searchQuery).subscribe((book) => {
      this.searchResultsBooks = book;
      console.log(book);
    });
  }
  
  search() {
    this.searchAuthors();
    this.searchBooks();
  }
}

