import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})

export class CharacterDetailsComponent implements OnInit, OnDestroy {
  //variables
  public character;
  public retrievedData;
  public father
  public mother
  public spouse
  public subscription

  //constructors
  constructor(private _route: ActivatedRoute, public http: HttpService, private spinner: NgxSpinnerService) { }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  ngOnInit() {
    this.spinner.show()
    //getting id of character from activated route
    let id = this._route.snapshot.params.id;

    //getting single character data from http service
    this.subscription = this.http.getSpecificCharacter(id).subscribe(
      data => {
        this.character = data;
        console.log(data);
        if (this.character != undefined) {
          this.spinner.hide();
        }

        //subscribing to observable to get data about character's father
        this.http.getFather(this.character.father).subscribe(
          data => {
            this.father = data;
            console.log(data)
          },

          error => {
            console.log(error)
          }
        );

        //subscribing to observable to get data about character's mother
        this.http.getMother(this.character.mother).subscribe(
          data => {
            this.mother = data
            console.log(this.mother)
          },

          error => {
            console.log(error)
          }
        )

        //subscribing to observable to get data about character's spouse
        this.http.getSpouse(this.character.spouse).subscribe(
          data => {
            this.spouse = data
            console.log(this.spouse)
          },

          error => {
            console.log(error)
          }
        )
      },

      error => {
        console.log(error)
      }
    );
  }

  //method to check whether data is null or not
  public isNull(atrribute: string) {
    if (atrribute == "") {
      return true;
    } else return false;
  }

}
