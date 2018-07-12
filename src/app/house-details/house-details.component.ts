import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.css']
})
export class HouseDetailsComponent implements OnInit {
  public house;
  public currentLord;
  public heir;
  public overLord;

  constructor(private _route: ActivatedRoute, private http:HttpService, private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show()
    let id = this._route.snapshot.params.id;
    this.http.getSpecificHouse(id).subscribe(
      data=>{
        this.house = data;
        if(this.house!=undefined){
          this.spinner.hide()
        }
        this.http.getCurrentLord(this.house.currentLord).subscribe(
          data=>{
            this.currentLord = data;
            console.log(data)
          },

          error=>{
            console.log(error)
          }
        );

        this.http.getHeir(this.house.heir).subscribe(
          data=>{
            this.heir = data
            console.log(this.heir)
          },

          error=>{
            console.log(error)
          }
        )

        this.http.getOverlord(this.house.overlord).subscribe(
          data=>{
            this.overLord = data
            console.log(this.overLord)
          },

          error=>{
            console.log(error)
          }
        )
      }
    )
    console.log("oninit called")
  }

  public isNull(atrribute:string){
    if(atrribute == ""){
      return true;
    }else return false;
  }

}
