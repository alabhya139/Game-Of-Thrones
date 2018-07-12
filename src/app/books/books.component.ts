import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  public Books;

  constructor(private httpService: HttpService, private spinner: NgxSpinnerService) {
    console.log(this.Books)
   }

  ngOnInit() {
    this.spinner.show()
    this.httpService.getBooks().subscribe(
      data=>{
        this.Books = data.sort(function(a, b){
          var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
          if (nameA < nameB) //sort string ascending
              return -1 
          if (nameA > nameB)
              return 1
          return 0 //default return value (no sorting)
      });
        console.log(this.Books)
        if(this.Books != undefined){
          this.spinner.hide();
        }
      },

      error=>{
        console.log(error)
      }
      
    );
  }

  public getId(url:string){
    return url.substr(44,url.length-1)
  }

  public getBooks(){
    return this.Books;
  }

}
