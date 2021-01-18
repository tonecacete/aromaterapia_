import { Funcao } from './../receita/models/funcao.model';
import { Receita } from './../receita/models/receita.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private RECEITAS_ENDPOINT = "http://localhost:3001/receitas/";
  private FUNCOES_ENDPOINT = "http://localhost:3001/funcoes/";

  constructor(private httpClient: HttpClient) { }

  public getReceitas(){
    return this.httpClient.get(this.RECEITAS_ENDPOINT);
  }

  public getFuncoes(){
    return this.httpClient.get(this.FUNCOES_ENDPOINT);
  }

  public addFuncoes(funcao: Funcao){
    this.httpClient.post(this.FUNCOES_ENDPOINT, funcao).subscribe(data => {
      console.log('POST funcao went ok !');
      },
      error => {
        console.log(error)
      });
  }

  public addReceita(receita: Receita){
    /* let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', username);
    urlSearchParams.append('password', password); */
    this.httpClient.post(this.RECEITAS_ENDPOINT, receita).subscribe(data => {
      console.log('POST receita went ok !');
      },
      error => {
        console.log(JSON.stringify(error.json()));
      });
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