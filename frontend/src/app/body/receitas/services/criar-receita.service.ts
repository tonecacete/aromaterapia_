import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { Receita } from '../receita/models/receita.model';

@Injectable({
  providedIn: 'root'
})
export class CriarReceitaService {
  //private id = 0;
  private receitas: Receita[];

  constructor() { }

  setReceitas(receitas) {
    this.receitas = receitas;
  }

/*   getReceitas(): Observable<any>  {
    let temp = this.receitas;
    //this.clearData();
    //return temp;
    return of(temp).pipe(delay(300));
  } */

  getReceitas(){
    let temp = this.receitas;
    //this.clearData();
    return temp;
  }

  clearData() {
    //this.id = undefined;
    this.receitas = undefined;
  }

}
