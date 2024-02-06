import { Component } from '@angular/core';
import { Author } from 'src/model/dtos/author';
import { authorService } from 'src/services/author.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchQuery: string = '';
  searchResults: Author[] = [];

  constructor(private authorService: authorService){}

  search() {
    this.authorService.getAuthorsByName(this.searchQuery).subscribe((authors) => {
      this.searchResults = authors;
      console.log(authors);
    });
  }
  

}

