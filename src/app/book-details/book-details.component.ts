import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})

export class BookDetailsComponent implements OnInit, OnDestroy {
  public Book;
  public subscription;

  //constructor
  constructor(private _route: ActivatedRoute, private httpService: HttpService, private spinner: NgxSpinnerService) { }

  //unsubscribing observable on component destroy
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.spinner.show()
    //finfing id through activated route
    let id = this._route.snapshot.params.id;

    //getting Single Book data using http service
    this.subscription = this.httpService.getSpecificBook(id).subscribe(
      data => {
        this.Book = data;
        console.log(this.Book)
        if (this.Book != undefined) {
          this.spinner.hide()
        }
      },

      error => {
        console.log(error.errorMsg)
      }
    );
  }

}
