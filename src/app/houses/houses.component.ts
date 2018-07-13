import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})

export class HousesComponent implements OnInit, OnDestroy {
  //variables
  public Houses
  public p;
  public status;
  public subscription;

  //constructor
  constructor(private httpService: HttpService, private spinner: NgxSpinnerService) { }

  //unsubsribing observable o component destroy
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  ngOnInit() {
    this.spinner.show()

    //observables getting houses data from http service
    this.subscription = this.httpService.getHouses().subscribe(
      data => {
        this.Houses = data.sort(function (a, b) {
          var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
          if (nameA < nameB) //sort string ascending
            return -1
          if (nameA > nameB)
            return 1
          return 0 //default return value (no sorting)
        });

        //hiding spinner if succesfully got house data
        if (this.Houses != undefined) {
          this.spinner.hide();
        }

      },

      error => {
        this.spinner.hide()
        this.status = error.status;
      },


    );
  }

  //method to get the id of house
  public getId(url: string) {
    return url.substr(45, url.length - 1)
  }

  //method to check if there is error or not
  public isError() {
    if (this.status == 0 || this.status == 404) {
      return true;
    } else return false;
  }
}
