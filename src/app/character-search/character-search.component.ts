import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-character-search',
  templateUrl: './character-search.component.html',
  styleUrls: ['./character-search.component.css']
})
export class CharacterSearchComponent implements OnInit {
  public character;
  public imageLink;

  constructor(private _route:ActivatedRoute, private http:HttpService, private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show()
    let name = this._route.snapshot.params.name;
    this.http.searchCharacter(name).subscribe(
      data=>{
        this.character = data;
        if(this.character.data.imageLink == undefined){
          this.imageLink="/assets/images/tyrion.jpg"
        }else this.imageLink = "https://api.got.show"+ this.character.data.imageLink;

        if(this.character!=undefined){
          this.spinner.hide()
        }

        console.log(this.imageLink)
      }
    )
  }

  public isNull(atrribute:string){
    if(atrribute == ""){
      return true;
    }else return false;
  }

  public isMale(gender){
    if(gender==false){
      return false;
    }else return true;
  }
 
}
