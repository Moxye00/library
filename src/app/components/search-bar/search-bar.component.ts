import { Component } from '@angular/core';
import { authorService } from 'src/services/author.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchQuery: string = '';
  firstname: string = '';
  lastname: string = '';
  searchResults: any[] = [];

  constructor(private authorService: authorService){}

  search() {
    let search = this.searchQuery.split(" ");
    this.authorService.getAuthorsByName(search[0], search[1]).subscribe((authors) => {
      this.searchResults = authors;
    });
  }
  

}

