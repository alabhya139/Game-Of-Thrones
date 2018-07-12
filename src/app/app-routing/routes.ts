import { Routes} from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { CharacterDetailsComponent } from '../character-details/character-details.component';
import { HouseDetailsComponent } from '../house-details/house-details.component';
import { BooksComponent } from '../books/books.component';
import { CharactersComponent } from '../characters/characters.component';
import { HousesComponent } from '../houses/houses.component';

export const routes: Routes = [
    {path:'home', component: HomeComponent},
    {path:'', redirectTo: '/home', pathMatch:'full'},
    {path:'books',component:BooksComponent},
    {path:'characters',component:CharactersComponent},
    {path:'houses',component:HousesComponent},
    {path:'books/:id',component: BookDetailsComponent},
    {path:'characters/:id', component: CharacterDetailsComponent},
    {path:'houses/:id', component: HouseDetailsComponent}
];

