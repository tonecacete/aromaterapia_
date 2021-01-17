import { Receita } from './../receita/models/receita.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CriarReceitaService } from '../services/criar-receita.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-editar-receita',
  templateUrl: './editar-receita.component.html',
  styleUrls: ['./editar-receita.component.scss']
})
export class EditarReceitaComponent implements OnInit {
  @Input() receita: Receita;
  nome: string;
  idadeMin: number;
  tipo: string;
  funcao: string[];
  receitaDesc: string;
  aplicacao: string;

  receitas: Receita[];
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

    if (this.receitasService.getReceitas()) {
      this.receita = this.receitasService.getReceitas().find(x => x.id == this.eId);
      this.id = this.eId;
      this.nome = this.receita.nome
      this.idadeMin = this.receita.idadeMin
      this.tipo = this.receita.tipo
      this.funcao = this.receita.funcao
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
    this.receita.funcao = this.funcao;
    this.receita.receitaDesc = this.receitaDesc;
    this.receita.aplicacao = this.aplicacao;
    this.backendService.editarReceita(this.receita,this.eId);
    this.router.navigate(['/receitas'], { relativeTo: this.route });
  }

}
