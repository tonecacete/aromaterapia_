import { Funcao } from './models/funcao.model';
import { Component, EventEmitter, Input, OnInit, OnChanges, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { ReceitasService } from '../services/receitas.service';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.scss']
})
export class ReceitaComponent implements OnInit, OnChanges {
  @Input() receita;
  @Output() verReceitaFechada = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<boolean>();
  id: number;
  nome: string;
  idadeMin: {};
  idade: number;
  idade_opt: string;
  tipo: string;
  receitaDesc: string;
  aplicacao: string;
  observacoes: string;
  funcoes: Funcao[];
  funcoes_str: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private receitasService: ReceitasService,
    private backendService: BackendService
  ) { }

  ngOnInit() {
    console.log(this.receita);
    this.fetchReceita();
  }

  ngOnChanges(){
    this.fetchReceita();
  }

  fecharVerReceita(){
    this.verReceitaFechada.emit(true);
  }

  goToEdit(){
    this.edit.emit(true);
    this.fecharVerReceita()
  }

  fetchReceita(){
    console.log(this.receita);
    let temp_func_list: Funcao[] = [];
    let temp_func: Funcao;
    this.funcoes_str = '';
    
    for (let i = 0; i < this.receita.funcoes.length; i++) {
      let func = this.receita.funcoes[i];
      if (func.check) {
        temp_func = new Funcao(func.funcao, func.check);
        temp_func_list.push(temp_func);
        this.funcoes_str += "'" + func.funcao + "'";
        if (i !== this.receita.funcoes.length - 1) {
          this.funcoes_str += ', '
        }
      }
    }
    this.nome = this.receita.nome;
    this.idadeMin = this.receita.idadeMin;
    this.idade = this.receita.idadeMin.idade;
    if(this.idade <= 1){
      if (this.receita.idadeMin.tipo === "anos") {
        this.idade_opt = this.receita.idadeMin.tipo.slice(0,-1)
      }else{
        this.idade_opt = "mês"
      }
    }else{
      this.idade_opt = this.receita.idadeMin.tipo;
    }
    this.tipo = this.receita.tipo;
    this.receitaDesc = this.receita.receitaDesc;
    this.aplicacao = this.receita.aplicacao;
    this.observacoes = this.receita.observacoes;
  }
}
