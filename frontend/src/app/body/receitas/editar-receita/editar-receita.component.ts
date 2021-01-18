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
  @ViewChild('openModalEdit') openModalEdit:ElementRef;
  @Input() receita: Receita;
  //@Input() receitas: Receita[];
  receitas: any;
  nome: string;
  idadeMin: number;
  tipo: string;
  funcao: Funcao;
  funcoes;
  receitaDesc: string;
  aplicacao: string;
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
    //this.receitasService.getReceitas();
    this.route.paramMap.subscribe(params => {
      //console.log(params.get('id'));
      this.eId = params.get('id');
    });

    if (this.receitasService.getReceitas2()) {
      this.receita = this.receitasService.getReceitas2().find(x => x.id == this.eId);
      //this.backendService.getReceitas().subscribe(products => this.receitas = products);
      this.id = this.eId;
      this.nome = this.receita.nome
      this.idadeMin = this.receita.idadeMin
      this.tipo = this.receita.tipo
      this.funcoes = this.receita.funcao
      this.receitaDesc = this.receita.receitaDesc
      this.aplicacao = this.receita.aplicacao
    }
  }

  editReceita() {
    console.log("edit")
    this.receita.id= this.eId;
    this.receita.nome = this.nome;
    this.receita.idadeMin = this.idadeMin;
    this.receita.tipo = this.tipo;
    //this.receita.funcao = this.funcao;
    this.receita.receitaDesc = this.receitaDesc;
    this.receita.aplicacao = this.aplicacao;
    this.backendService.editarReceita(this.receita,this.eId);
    this.receitas = this.receitasService.getReceitas2().filter(x => x.id !== this.eId);
    this.receitas.push(this.receita);
    this.receitasService.setReceitas(this.receitas);
    this.openModalEdit.nativeElement.click();
    this.router.navigate(['/receitas'], { relativeTo: this.route });
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

  getSelectedFuncoes(){

  }

}
