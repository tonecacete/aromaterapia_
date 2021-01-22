import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { Receita } from '../receita/models/receita.model';

@Injectable({
  providedIn: 'root'
})
export class ReceitasService {
  //private id = 0;
  private receitas: Receita[];
  private receita: Receita;

  constructor() { }

  setReceita(receita){
    this.receita = receita;
  }

  setReceitas(receitas) {
    this.receitas = receitas;
  }

/*   getReceitas(): Observable<any>  {
    let temp = this.receitas;
    //this.clearData();
    //return temp;
    return of(temp).pipe(delay(300));
  } */

  getReceita(){
    let temp = this.receita;
    //this.clearData();
    return temp;
  }

  getReceitas(){
    let temp = this.receitas;
    //this.clearData();
    return temp;
  }

  clearData() {
    this.receita = undefined;
    this.receitas = undefined;
  }

}
