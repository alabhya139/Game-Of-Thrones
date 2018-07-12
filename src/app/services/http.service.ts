import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public baseUrl = "https://www.anapioficeandfire.com/api"

  constructor(private http:HttpClient) { }

  public getBooks():Observable<any>{
    let htttpResponse = this.http.get(this.baseUrl + '/books?pageSize=100');
    return htttpResponse;
  }

  public getSpecificBook(id):Observable<any>{
    let htttpResponse = this.http.get(this.baseUrl + '/books/'+ id);
    return htttpResponse;
  }

  public getCharacters():Observable<any>{
    let htttpResponse = this.http.get(this.baseUrl + '/characters?pageSize=50');
    return htttpResponse;
  }

  public getSpecificCharacter(id):Observable<any>{
    let htttpResponse = this.http.get(this.baseUrl + '/characters/'+ id);
    return htttpResponse;
  }

  public getHouses():Observable<any>{
    let htttpResponse = this.http.get(this.baseUrl + '/houses?pageSize=1000');
    return htttpResponse;
  }

  public getSpecificHouse(id):Observable<any>{
    let htttpResponse = this.http.get(this.baseUrl + '/houses/'+ id);
    return htttpResponse;
  }

  public getFather(url){
    let htttpResponse = this.http.get(url);
    return htttpResponse;
  }

  public getMother(url){
    let htttpResponse = this.http.get(url);
    return htttpResponse;
  }

  public getSpouse(url){
    let htttpResponse = this.http.get(url);
    return htttpResponse;
  }

  public getCurrentLord(url){
    let htttpResponse = this.http.get(url);
    return htttpResponse;
  }

  public getHeir(url){
    let htttpResponse = this.http.get(url);
    return htttpResponse;
  }

  public getOverlord(url){
    let htttpResponse = this.http.get(url);
    return htttpResponse;
  }

  public searchCharacter(name){
    let htttpResponse = this.http.get("https://api.got.show/api/characters/"+name)
    return htttpResponse;
  }
}
