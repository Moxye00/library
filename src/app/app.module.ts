import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/books/books.component';
import { BooksDetailComponent } from './components/books-detail/books-detail.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { AuthorDetailsComponent } from './components/author-details/author-details.component';
import { AuthorComponent } from './components/author/author.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { authorService } from 'src/services/author.service';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { BooksCardComponent } from './components/books-card/books-card.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BooksComponent,
    BooksDetailComponent,
    UserComponent,
    LoginComponent,
    AuthorDetailsComponent,
    AuthorComponent,
    SearchBarComponent,
    NavbarComponent,
    FooterComponent,
    BooksCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
