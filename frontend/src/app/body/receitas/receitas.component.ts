import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { Receita } from './receita/models/receita.model';
import { CriarReceitaService } from './services/criar-receita.service';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss']
})
export class ReceitasComponent implements OnInit,OnChanges, DoCheck {
  receitas: Receita[];
  receita: Receita;

  constructor(private receitasService: CriarReceitaService) { }

  ngOnInit() {
    this.receitas = this.receitasService.getReceitas();
  }

  ngOnChanges(){
    console.log("mudou")
  }

  ngDoCheck(){
    this.receitas = this.receitasService.getReceitas();

  }

}
