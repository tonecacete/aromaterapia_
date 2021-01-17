import { Injectable } from '@angular/core';
import { Receita } from '../receita/models/receita.model';

@Injectable({
  providedIn: 'root'
})
export class CriarReceitaService {
  private id = 0;
  private receitas: Receita[];

  constructor() { }

  setReceitaId(id) {
    this.id = id;
  }

  getReceitaId() {
    let temp = this.id;
    //this.clearData();
    return temp;
  }

  setReceitas(receitas) {
    this.receitas = receitas;
  }

  getReceitas() {
    let temp = this.receitas;
    //this.clearData();
    return temp;
  }

  clearData() {
    this.id = undefined;
    this.receitas = undefined;
  }

}
