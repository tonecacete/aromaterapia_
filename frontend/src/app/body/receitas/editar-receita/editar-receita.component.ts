import { Funcao } from './../receita/models/funcao.model';
import { Receita } from './../receita/models/receita.model';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceitasService } from '../services/receitas.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-editar-receita',
  templateUrl: './editar-receita.component.html',
  styleUrls: ['./editar-receita.component.scss']
})
export class EditarReceitaComponent implements OnInit,OnChanges {
  @Input() receita;
  @Output() editReceitaFechada = new EventEmitter<boolean>();
  @ViewChild('openModalEdit') openModalEdit: ElementRef;
  //@Input() receitas: Receita[];
  receitas: any;
  nome: string;
  idadeMin: {};
  idade: number;
  idade_opt: string;
  tipo: string;
  funcao: Funcao;
  funcoes: Funcao[];
  receitaDesc: string;
  aplicacao: string;
  observacoes: string;
  newFuncao = false;

  id;
  eId;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private receitasService: ReceitasService,
    private backendService: BackendService
  ) { }

  ngOnInit() {
    this.fetchReceita();
  }

  ngOnChanges(){
    this.fetchReceita();
  }

  fetchReceita(){
    this.receita = this.receitasService.getReceita();
    this.backendService.getFuncoes().subscribe((data: any[]) => {
      this.funcoes = data;
      for (let i = 0; i < this.receita.funcoes.length; i++) {
        this.setCheckFun(this.receita.funcoes[i].funcao);
      }
    })
    this.nome = this.receita.nome
    this.idadeMin = this.receita.idadeMin
    this.idade = this.receita.idadeMin.idade;
    this.idade_opt = this.receita.idadeMin.tipo;
    this.tipo = this.receita.tipo;
    this.receitaDesc = this.receita.receitaDesc;
    this.aplicacao = this.receita.aplicacao;
    this.observacoes = this.receita.observacoes;
  }

  setCheckFun(fun) {
    if (this.funcoes) {
      for (let j = 0; j < this.funcoes.length; j++) {
        if (this.funcoes[j].funcao == fun) {
          this.funcoes[j].check = true;
        }
      }
    }
  }

  setFuncao(event) {
    console.log(event);
    for (let f of this.funcoes) {
      if (f.funcao == event.target.defaultValue) {
        f.check = !f.check;
      }
    }
  }

  ngAfterViewInit() {
  }

  checkboxCheck(val) {
    console.log(val);


  }

  editReceita() {
    let funcoes: Funcao[] = [];

    console.log("edit")
    this.receita.nome = this.nome;
    this.receita.idadeMin = { idade : this.idade, tipo: this.idade_opt};
    this.receita.tipo = this.tipo;
    this.funcoes = this.funcoes.filter(f => f.check == true);
    for (let f of this.funcoes) {
      let fu = new Funcao(f.funcao, f.check)
      funcoes.push(fu);
    }
    this.receita.funcoes = funcoes;
    this.receita.receitaDesc = this.receitaDesc;
    this.receita.aplicacao = this.aplicacao;
    this.receita.observacoes = this.observacoes;
    this.backendService.editarReceita(this.receita, this.receita.id);
    this.receitas = this.receitasService.getReceitas().filter(x => x.id !== this.receita.id);
    this.receitas.push(this.receita);
    this.receitasService.setReceitas(this.receitas);
    this.fecharEditReceita();
    this.openModalEdit.nativeElement.click();
  }

  addFuncao() {
    this.newFuncao = true;
  }

  newFuncaoClick(funcao, newFuncao) {
    if (newFuncao) {
      this.funcoes.push(new Funcao(funcao,false));
      this.funcao = new Funcao(funcao, false);
      this.backendService.addFuncoes(this.funcao);
      this.funcao = undefined;
    }
    this.addFuncao();
  }

  getSelectedFuncoes() {

  }

  fecharEditReceita(){
    this.editReceitaFechada.emit(true);
  }

}
