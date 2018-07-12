import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.css']
})
export class HouseDetailsComponent implements OnInit {
  public house;

  constructor(private _route: ActivatedRoute, private http:HttpService) { }

  ngOnInit() {
    let id = this._route.snapshot.params.id;
    this.http.getSpecificHouse(id).subscribe(
      data=>{
        this.house = data;
      }
    )
    console.log("oninit called")
  }

}
