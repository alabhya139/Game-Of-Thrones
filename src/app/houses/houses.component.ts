import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent implements OnInit {
  public Houses
  public p

  constructor(private httpService: HttpService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show()
    this.httpService.getHouses().subscribe(
      data=>{
        this.Houses = data.sort(function(a, b){
          var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
          if (nameA < nameB) //sort string ascending
              return -1 
          if (nameA > nameB)
              return 1
          return 0 //default return value (no sorting)
      });

      if(this.Houses != undefined){
        this.spinner.hide();
      }

      },

      error=>{
        console.log(error)
      },


    );
  }

  public getId(url:string){
    return url.substr(45,url.length-1)
  }
}
