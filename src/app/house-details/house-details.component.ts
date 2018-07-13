import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.css']
})

export class HouseDetailsComponent implements OnInit, OnDestroy {
  //variables
  public house;
  public currentLord;
  public heir;
  public overLord;
  public page;
  public subscription;

  //constructors
  constructor(private _route: ActivatedRoute, private http: HttpService, private spinner: NgxSpinnerService) { }

  //unsubscribing observable on component destroy
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.spinner.show()

    //getting id of house through activated route
    let id = this._route.snapshot.params.id;

    //getting data about single house through http service and  observables
    this.subscription = this.http.getSpecificHouse(id).subscribe(
      data => {
        this.house = data;
        if (this.house != undefined) {
          this.spinner.hide()
        }

        //observable to get data about house current lord
        this.http.getCurrentLord(this.house.currentLord).subscribe(
          data => {
            this.currentLord = data;
            console.log(data)
          },

          error => {
            console.log(error)
          }
        );

        //observable to get data about house heir
        this.http.getHeir(this.house.heir).subscribe(
          data => {
            this.heir = data
            console.log(this.heir)
          },

          error => {
            console.log(error)
          }
        )

        //observable to get data about house overlord
        this.http.getOverlord(this.house.overlord).subscribe(
          data => {
            this.overLord = data
            console.log(this.overLord)
          },

          error => {
            console.log(error)
          }
        )
      }
    )
  }

  //method to check if data is null or not
  public isNull(atrribute: string) {
    if (atrribute == "") {
      return true;
    } else return false;
  }

}
