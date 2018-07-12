import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {
  public character;
  public retrievedData;
  public father
  public mother
  public spouse

  constructor(private _route: ActivatedRoute, public http: HttpService) { }

  ngOnInit() {
    let id = this._route.snapshot.params.id;
    this.http.getSpecificCharacter(id).subscribe(
      data=>{
        this.character = data;
        console.log(data);

        this.http.getFather(this.character.father).subscribe(
          data=>{
            this.father = data;
            console.log(data)
          },

          error=>{
            console.log(error)
          }
        );

        this.http.getMother(this.character.mother).subscribe(
          data=>{
            this.mother = data
            console.log(this.mother)
          },

          error=>{
            console.log(error)
          }
        )

        this.http.getMother(this.character.spouse).subscribe(
          data=>{
            this.spouse = data
            console.log(this.spouse)
          },

          error=>{
            console.log(error)
          }
        )
      },

      error=>{
        console.log(error)
      }
    );
  }

  public isNull(atrribute:string){
    if(atrribute == ""){
      return true;
    }else return false;
  }

}
