import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-character-search',
  templateUrl: './character-search.component.html',
  styleUrls: ['./character-search.component.css']
})

export class CharacterSearchComponent implements OnInit, OnDestroy {
  //variables
  public character;
  public imageLink;
  public status;
  public subscription;

  //constructors
  constructor(private _route: ActivatedRoute, private http: HttpService, private spinner: NgxSpinnerService) { }

  //unsubscribing from observable on component destroy
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.spinner.show()

    //getting name of character through activated route
    let name = this._route.snapshot.params.name;

    //observable to get data about character through http service
    this.subscription = this.http.searchCharacter(name).subscribe(
      data => {
        this.character = data;
        if (this.character.data.imageLink == undefined) {
          this.imageLink = "/assets/images/tyrion.jpg"
        } else this.imageLink = "https://api.got.show" + this.character.data.imageLink;

        if (this.character != undefined) {
          this.spinner.hide()
        }

        console.log(this.imageLink)
      },

      error => {
        this.status = error.status
        this.spinner.hide()
      }
    );
  }

  //method to check if data is null or not
  public isNull(atrribute: string) {
    if (atrribute == "") {
      return true;
    } else return false;
  }

  //method to check character's gender
  public isMale(gender) {
    if (gender == false) {
      return false;
    } else return true;
  }

  //method to check if there is an error
  public isError(message) {
    if (message == 404 || message == 0) {
      return true;
    } else return false;
  }

}
