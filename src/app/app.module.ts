import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import { NgxPaginationModule } from 'ngx-pagination'
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';


import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpService } from './services/http.service';

import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule, MatSelectModule, MatFormFieldModule, MatDialogModule, MatListModule, MatDividerModule} from '@angular/material';
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from '@angular/common/http';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { HouseDetailsComponent } from './house-details/house-details.component';
import { FormsModule } from '@angular/forms';
import { BooksComponent } from './books/books.component';
import { CharactersComponent } from './characters/characters.component';
import { HousesComponent } from './houses/houses.component';
import { PagingComponent } from './paging/paging.component';
import { CharacterSearchComponent } from './character-search/character-search.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookDetailsComponent,
    CharacterDetailsComponent,
    HouseDetailsComponent,
    BooksComponent,
    CharactersComponent,
    HousesComponent,
    PagingComponent,
    CharacterSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    NgxPaginationModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    NgxSpinnerModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
