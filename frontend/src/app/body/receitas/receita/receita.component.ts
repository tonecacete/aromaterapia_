import { Funcao } from './models/funcao.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { CriarReceitaService } from '../services/criar-receita.service';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.scss']
})
export class ReceitaComponent implements OnInit {
  id: number;
  nome: string;
  idadeMin: number;
  tipo: string;
  receitaDesc: string;
  aplicacao: string;
  funcoes: Funcao[];
  receita;
  funcoes_str: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private receitasService: CriarReceitaService,
    private backendService: BackendService
  ) { }

  ngOnInit() {
    let rId;
    this.route.paramMap.subscribe(params => {
      rId = params.get('id');
    });

    let temp_func_list: Funcao[] = [];
    let temp_func: Funcao;
    this.funcoes_str = '';

    if (this.receitasService.getReceitas2()) {
      let receita = this.receitasService.getReceitas2().find(x => x.id == rId);
      this.backendService.getFuncoes().subscribe((data: any[]) => {
        this.funcoes = data;
      })
      for (let i = 0; i < receita.funcoes.length; i++) {
        let func = receita.funcoes[i];
        if (func.check) {
          temp_func = new Funcao(func.funcao, func.check);
          temp_func_list.push(temp_func);
          this.funcoes_str += "'" + func.funcao + "'";
          if (i !== receita.funcoes.length - 1) {
            this.funcoes_str += ', '
          }
        }
      }
      this.id = rId;
      this.nome = receita.nome
      this.idadeMin = receita.idadeMin
      this.tipo = receita.tipo
      this.receitaDesc = receita.receitaDesc
      this.aplicacao = receita.aplicacao
    }

  }

}
