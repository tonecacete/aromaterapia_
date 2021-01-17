import { Receita } from './../receita/models/receita.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CriarReceitaService } from '../services/criar-receita.service';

@Component({
  selector: 'app-editar-receita',
  templateUrl: './editar-receita.component.html',
  styleUrls: ['./editar-receita.component.scss']
})
export class EditarReceitaComponent implements OnInit {
  @Input() receita: Receita;
  nome:string;
  idadeMin: number;
  tipo:string;
  funcao: string[];
  receitaDesc: string;
  aplicacao:string;

  receitas: Receita[];
  id;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private receitasService: CriarReceitaService
    ) { }

  ngOnInit() {
    let rId;
    //this.receitasService.getReceitas();
    this.route.paramMap.subscribe(params => {
      //console.log(params.get('id'));
      rId = params.get('id');
    });

    if (this.receitasService.getReceitas()) {
      let receita = this.receitasService.getReceitas().find(x => x.id == rId);
      this.id = rId;
      this.nome = receita.nome
      this.idadeMin = receita.idadeMin
      this.tipo = receita.tipo
      this.funcao = receita.funcao
      this.receitaDesc = receita.receitaDesc
      this.aplicacao = receita.aplicacao
    }
  }

  editReceita(){
    console.log("edit")
    
    
  }

}
