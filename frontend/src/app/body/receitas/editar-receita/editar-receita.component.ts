import { Funcao } from './../receita/models/funcao.model';
import { Receita } from './../receita/models/receita.model';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CriarReceitaService } from '../services/criar-receita.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-editar-receita',
  templateUrl: './editar-receita.component.html',
  styleUrls: ['./editar-receita.component.scss']
})
export class EditarReceitaComponent implements OnInit {
  @ViewChild('openModalEdit') openModalEdit: ElementRef;
  @Input() receita: Receita;
  //@Input() receitas: Receita[];
  receitas: any;
  nome: string;
  idadeMin: number;
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
    private receitasService: CriarReceitaService,
    private backendService: BackendService
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.eId = params.get('id');
    });

    if (this.receitasService.getReceitas()) {
      this.receita = this.receitasService.getReceitas().find(x => x.id == this.eId);
      this.backendService.getFuncoes().subscribe((data: any[]) => {
        this.funcoes = data;
        for (let i = 0; i < this.receita.funcoes.length; i++) {
          this.setCheckFun(this.receita.funcoes[i].funcao);
        }
      })
      this.id = this.eId;
      this.nome = this.receita.nome
      this.idadeMin = this.receita.idadeMin
      this.tipo = this.receita.tipo
      this.receitaDesc = this.receita.receitaDesc
      this.aplicacao = this.receita.aplicacao
      this.observacoes = this.receita.observacoes
    }



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
    this.receita.id = this.eId;
    this.receita.nome = this.nome;
    this.receita.idadeMin = this.idadeMin;
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
    this.backendService.editarReceita(this.receita, this.eId);
    this.receitas = this.receitasService.getReceitas().filter(x => x.id !== this.eId);
    this.receitas.push(this.receita);
    this.receitasService.setReceitas(this.receitas);
    this.openModalEdit.nativeElement.click();
    this.router.navigate(['/receitas'], { relativeTo: this.route });
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

}
