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
  funcoes: Funcao[];
  funcoesReceita: string[] = [];
  newFuncao = false;


  //var: Funcao;

  //id;
  
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private receitasService: CriarReceitaService,
    private backendService: BackendService
    ) { }

  ngOnInit() {
    this.backendService.getReceitas().subscribe(receitas => this.receitas = receitas);
    this.backendService.getFuncoes().subscribe((data: any[])=>{
      this.funcoes = data;
    })
  }

  ngOnChanges(){

  }

  addReceita(){
    console.log("add")
    let func: Funcao[] = [];
    this.funcoes = this.funcoes.filter(f => f.check == true);

    for(let f of this.funcoes){
      let fu = new Funcao(f.funcao,f.check)
      func.push(fu);
    }
    this.receita = new Receita(
      0,
      this.nome,
      this.idadeMin,
      this.tipo,
      func,
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
    for(let f of this.funcoes){
      if(f.funcao == event.target.defaultValue){
        f.check = !f.check;
      }
    }
  }

  addFuncao(){
    this.newFuncao = true;
  }

  newFuncaoClick(funcao,newFuncao){
    if (newFuncao) {
      this.funcoes.push(new Funcao(funcao,false));
      this.funcao = new Funcao(funcao,false);
      this.backendService.addFuncoes(this.funcao);
      this.funcao = undefined;
    }
    this.addFuncao();
  }

}
