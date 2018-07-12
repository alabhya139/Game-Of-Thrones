import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  public Book;


  constructor(private _route: ActivatedRoute, private httpService: HttpService, private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show()
    console.log(this._route)

    let id =this._route.snapshot.params.id;
    
    this.httpService.getSpecificBook(id).subscribe(
      data=>{
        this.Book = data;
        console.log(this.Book)
        if(this.Book!=undefined){
          this.spinner.hide()
        }
      },

      error=>{
        console.log(error.errorMsg)
        alert("error")
      }
    );
  }

}
