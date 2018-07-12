import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpService } from '../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnChanges {
  public Books;
  public Characters;
  public Houses;
  public allData = [];
  public singleData =[];

  public array1 = [1,2,3]
  public array2 = [4,5,6]
  public array3 = []
  public isLoaded: boolean
  selected = "filter"
  public name;
  public page;
  selectedCategory = "category"

  


  constructor(private spinner:NgxSpinnerService,private httpService: HttpService) {
  }

  ngOnChanges(){
    console.log(this.selected)
  }

  ngOnInit() {
    this.spinner.show()

    console.log(this.showBooks(this.selected))
    this.httpService.getBooks().subscribe(
      data=>{
        this.Books = data;
        this.combine(this.Books)
      },
      error=>{
        console.log(error)
        this.spinner.hide()
      }
      
    );
    this.httpService.getCharacters().subscribe(
      data=>{
        this.Characters= data;
        this.combine(this.Characters)
      },
      error=>{
        console.log(error)
        this.spinner.hide()
      }
    )
    this.httpService.getHouses().subscribe(
      data=>{
        this.Houses = data;
        this.combine(this.Houses)
      },
      error=>{
        console.log(error)
        this.spinner.hide()
      }
    );
    
  }

  public isBook(data){
    if(data.isbn!=undefined){
      return true;
    }
  }

  public isCharacter(data){
    if(data.gender!=undefined){
      return true;
    }
  }

  public isHouse(data){
    if(data.region!=undefined){
      return true;
    }
  }

  public getBookId(url:string){
    return url.substr(44,url.length-1)
  }

  public getCharacterId(url:string){
    return url.substr(49,url.length-1)
  }

  public getHouseId(url:string){
    return url.substr(45,url.length-1)
  }

  public combine(data) {
    if(data!=undefined){
      this.spinner.hide()
    }
    this.allData.push(data)
    this.singleData = [].concat(...this.allData).sort(function (a, b) {
      if (a.name == "") {
        a.name = a.aliases[0]
      }

      if (b.name == "") {
        b.name = b.aliases[0]
      }
      var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
      if (nameA < nameB) //sort string ascending
        return -1
      if (nameA > nameB)
        return 1
      return 0 //default return value (no sorting)
    });
  }

  public showBooks(selected){
    if(selected=="option1"){
      return true;
    }
  }

  public showCharacters(selected){
    if(selected=="option2"){
      return true;
    }
  }

  public showHouses(selected){
    if(selected=="option3"){
      return true;
    }
  }

  public showName(selected){
    if(selected=="option4"){
      return true;
    }
  }

  public getCharacterName(){
    return this.name;
  }

  public isNull(name){
    if(name==undefined){
      return true;
    }else return false;
  }

}
