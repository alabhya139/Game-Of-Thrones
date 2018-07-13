import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {
  //variables
  public Books;
  public page;
  public status;
  public subscription;

  //contructor
  constructor(private httpService: HttpService, private spinner: NgxSpinnerService) {
    console.log(this.Books)
  }

  //unsubscribing observabe on component destroy
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.spinner.show()

    //getting book data from http service
    this.subscription = this.httpService.getBooks().subscribe(
      data => {
        this.Books = data.sort(function (a, b) {
          var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
          if (nameA < nameB) //sort string ascending
            return -1
          if (nameA > nameB)
            return 1
          return 0 //default return value (no sorting)
        });
        console.log(this.Books)
        if (this.Books != undefined) {
          this.spinner.hide();
        }
      },

      error => {
        this.spinner.hide()
        this.status = error.status;
      }

    );
  }

  //method to get book id
  public getId(url: string) {
    return url.substr(44, url.length - 1)
  }

  //method to get books
  public getBooks() {
    return this.Books;
  }

  //method to check if there is an error
  public isError() {
    if (this.status == 404 || this.status == 0) {
      return true;
    } else return false;
  }

}
