//imports
import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { HttpService } from '../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
  //variables
  public Books;
  public Characters;
  public Houses;
  public allData = [];
  public singleData = [];

  public array1 = [1, 2, 3]
  public array2 = [4, 5, 6]
  public array3 = []
  public isLoaded: boolean
  selected = "filter"
  public name;
  public page;
  selectedCategory = "category"

  public subscriptionOne;
  public subscriptionTwo;
  public subscriptionThree;

  //constructor
  constructor(private spinner: NgxSpinnerService, private httpService: HttpService) {
  }

  //on component destroy all obeservables must be unsubscribed
  ngOnDestroy() {
    this.subscriptionOne.unsubscribe()
    this.subscriptionOne.unsubscribe()
    this.subscriptionOne.unsubscribe()
    console.log("unsubscribed")
  }

  ngOnInit() {
    this.spinner.show()
    //subscription of observable to get Books Data
    this.subscriptionOne = this.httpService.getBooks().subscribe(
      data => {
        this.Books = data;
        this.combine(this.Books)
      },
      error => {
        console.log(error)
        this.spinner.hide()
      }

    );

    //subscription of observable to get Characters Data
    this.subscriptionTwo = this.httpService.getCharacters().subscribe(
      data => {
        this.Characters = data;
        this.combine(this.Characters)
      },
      error => {
        console.log(error)
        this.spinner.hide()
      }
    );

    //subscription of observable to get House Data
    this.subscriptionThree = this.httpService.getHouses().subscribe(
      data => {
        this.Houses = data;
        this.combine(this.Houses)
      },
      error => {
        console.log(error)
        this.spinner.hide()
      }
    );

  }

  //method to check if the data belongs to books
  public isBook(data) {
    if (data.isbn != undefined) {
      return true;
    }
  }

  //method to check if the data belongs to characters
  public isCharacter(data) {
    if (data.gender != undefined) {
      return true;
    }
  }

  //method to check if the data belongs to house
  public isHouse(data) {
    if (data.region != undefined) {
      return true;
    }
  }

  //method to get id of book for routing purpose
  public getBookId(url: string) {
    return url.substr(44, url.length - 1)
  }

  //method to get id of character for routing purpose
  public getCharacterId(url: string) {
    return url.substr(49, url.length - 1)
  }

  //method to get id of house for routing purpose
  public getHouseId(url: string) {
    return url.substr(45, url.length - 1)
  }

  /* method to combine all data of books, characters and
    houses in single data */
  public combine(data) {
    if (data != undefined) {
      this.spinner.hide()
    }
    this.allData.push(data)
    this.singleData = [].concat(...this.allData).sort(function (a, b) {
      if (a.name == "") {
        a.name = a.aliases[0]
      }

      if (b.name == "") {
        b.name = b.aliases[0]
      }
      var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
      if (nameA < nameB) //sort string ascending
        return -1
      if (nameA > nameB)
        return 1
      return 0 //default return value (no sorting)
    });
  }


  //method to know the filter is selected to diaplay books
  public showBooks(selected) {
    if (selected == "option1") {
      return true;
    }
  }

  //method to know the filter is selected to diaplay characters
  public showCharacters(selected) {
    if (selected == "option2") {
      return true;
    }
  }

  //method to know the filter is selected to diaplay houses
  public showHouses(selected) {
    if (selected == "option3") {
      return true;
    }
  }

  //method to know the filter is selected to search character's name
  public showName(selected) {
    if (selected == "option4") {
      return true;
    }
  }

  //method to get the entered character name by user
  public getCharacterName() {
    return this.name;
  }

  //method to check if data is null or undefined
  public isNull(name) {
    if (name == undefined) {
      return true;
    } else return false;
  }

}
