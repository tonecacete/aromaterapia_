import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private RECEITAS_ENDPOINT = "http://localhost:3001/receitas/";

  constructor(private httpClient: HttpClient) { }

  public getReceitas(){
    return this.httpClient.get(this.RECEITAS_ENDPOINT);
  }

  public deleteReceitas(id){
    this.httpClient.delete(this.RECEITAS_ENDPOINT + id).subscribe(data => {
      console.log(data);
    });
  }
}