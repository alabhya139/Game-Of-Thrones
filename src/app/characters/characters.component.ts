import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  public Characters
  page:number = 1

  constructor(private httpService: HttpService, private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.httpService.getCharacters().subscribe(
      data=>{
        this.Characters = data;

        for(let characters of this.Characters){
          if(characters.aliases[0]==""){
            characters.aliases[0] = characters.name;
          }
        }

        this.Characters.sort(function(a, b){
          var nameA=a.aliases[0].toLowerCase(), nameB=b.aliases[0].toLowerCase()
          if (nameA < nameB) //sort string ascending
              return -1 
          if (nameA > nameB)
              return 1
          return 0 //default return value (no sorting)
      });
      if(this.Characters != undefined){
        this.spinner.hide();
      }

      console.log(this.Characters)
      },

      error=>{
        console.log(error)
      }
    );
  
  }

  public getId(url:string){
    return url.substr(49,url.length-1)
  }

}
