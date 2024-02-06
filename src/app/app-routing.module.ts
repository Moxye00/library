import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/books/books.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'books', component:BooksComponent},
  { path: 'login', component:LoginComponent},
  { path: 'user', component:UserComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }