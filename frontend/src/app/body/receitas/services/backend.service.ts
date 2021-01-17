import { Receita } from './../receita/models/receita.model';
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

  public addReceita(receita: Receita){
    /* let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', username);
    urlSearchParams.append('password', password); */
    this.httpClient.post(this.RECEITAS_ENDPOINT, receita).subscribe(data => {
      console.log('POST went ok !');
      },
      error => {
        console.log(JSON.stringify(error.json()));
      });
    /* this.httpClient.post(this.RECEITAS_ENDPOINT + id).subscribe(data => {
      console.log(data);
    }); */
  }
  public deleteReceita(id){
    this.httpClient.delete(this.RECEITAS_ENDPOINT + id).subscribe(data => {
      console.log(data);
    });
  }
  public editarReceita(receita: Receita, id){
    this.httpClient.put(this.RECEITAS_ENDPOINT + id, receita).subscribe(data => {
      console.log(data);
    });
  }
}