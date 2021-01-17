import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CriarReceitaService } from '../services/criar-receita.service';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.scss']
})
export class ReceitaComponent implements OnInit {
  id:number;
  nome: string;
  idadeMin: number;
  tipo: string;
  funcao: string[];
  receitaDesc: string;
  aplicacao: string;

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

}
