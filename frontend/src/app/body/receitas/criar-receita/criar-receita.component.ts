import { Funcao } from './../receita/models/funcao.model';
import { Receita } from '../receita/models/receita.model';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CriarReceitaService } from '../services/criar-receita.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-criar-receita',
  templateUrl: './criar-receita.component.html',
  styleUrls: ['./criar-receita.component.scss']
})
export class CriarReceitaComponent implements OnInit, OnChanges {
  //@Input() receitas: Receita[];
  @Input() receita: Receita;
  //@Input() receitas: Receita[];
  receitas:any;
  nome:string;
  idadeMin: number;
  tipo:string;
  //funcao: string[];
  funcao: Funcao;
  receitaDesc: string;
  aplicacao:string;
  funcoes;
  funcoesReceita: string[] = [];
  newFuncao = false;

  //id;
  
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private receitasService: CriarReceitaService,
    private backendService: BackendService
    ) { }

  ngOnInit() {
    //this.id = this.receitasService.getReceitaId();
    //this.receitas = this.receitasService.getReceitas();
    this.backendService.getFuncoes().subscribe(funcoes => this.funcoes = funcoes);
    this.backendService.getReceitas().subscribe(receitas => this.receitas = receitas);
/*     this.route.queryParams.subscribe(params => {
      this.nome = params['nome'];
    }); */
  }

  ngOnChanges(){

  }

  addReceita(){
    console.log("add")
    this.receita = new Receita(
      0,
      this.nome,
      this.idadeMin,
      this.tipo,
      this.funcoesReceita,
      this.receitaDesc,
      this.aplicacao
    )
    if (!this.receitas) {
      this.receitas = [];
    }
    this.receitas.push(this.receita);
    this.receitasService.setReceitas(this.receitas);
    this.backendService.addReceita(this.receita);
    //this.receitasService.setReceitaId(this.receita.id);
    this.router.navigate(['/receitas'], { relativeTo: this.route });
    
  }

  setFuncao(event){
    console.log(event);
    const index: number = this.funcoesReceita.indexOf(event.target.defaultValue);
    if (index == -1) {
      this.funcoesReceita.push(event.target.defaultValue)
    }else{
      this.funcoesReceita.splice(index, 1);
    }
  }

  addFuncao(){
    this.newFuncao = true;
  }

  newFuncaoClick(funcao,newFuncao){
    if (newFuncao) {
      this.funcoes.push({"funcao": funcao});
      this.funcao = new Funcao(funcao);
      this.backendService.addFuncoes(this.funcao);
      this.funcao = undefined;
    }
    this.addFuncao();
  }

}
