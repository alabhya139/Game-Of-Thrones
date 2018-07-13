import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit, OnDestroy {
  //variables
  public Characters;
  page: number = 1;
  public status;
  public subsription;

  //constructors
  constructor(private httpService: HttpService, private spinner: NgxSpinnerService) { }

  //unsubscribing observables on component destroy
  ngOnDestroy() {
    this.subsription.unsubscribe()
  }

  ngOnInit() {
    this.spinner.show();

    //observable to get data of character through http service
    this.subsription = this.httpService.getCharacters().subscribe(
      data => {
        this.Characters = data;

        //loop to handle sorting if character aliases is null
        for (let characters of this.Characters) {
          if (characters.aliases[0] == "") {
            characters.aliases[0] = characters.name;
          }
        }

        //sort function to sort character alphabetically by aliases
        this.Characters.sort(function (a, b) {
          var nameA = a.aliases[0].toLowerCase(), nameB = b.aliases[0].toLowerCase()
          if (nameA < nameB) //sort string ascending
            return -1
          if (nameA > nameB)
            return 1
          return 0 //default return value (no sorting)
        });

        //hiding spinner service
        if (this.Characters != undefined) {
          this.spinner.hide();
        }
      },

      //handling error
      error => {
        this.spinner.hide()
        this.status = error.status;
        console.log(this.status)
      }
    );

  }

  //method to get id of character
  public getId(url: string) {
    return url.substr(49, url.length - 1)
  }

  //method to check if there is an error
  public isError() {
    if (this.status == 0 || this.status == 404) {
      return true;
    } else return false;
  }

}
