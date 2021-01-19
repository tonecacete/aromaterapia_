import { Component, DoCheck, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Receita } from './receita/models/receita.model';
import { BackendService } from './services/backend.service';
import { CriarReceitaService } from './services/criar-receita.service';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss']
})
export class ReceitasComponent implements OnInit, OnChanges, DoCheck {
  @Input() tipo: string;
  @Input() funcao: string;
  @ViewChild('openModalDelete') openModalDelete: ElementRef;
  receitas;
  receita: Receita;
  id_delete;
  data_load = false;
  filter = false;
  funcoes;
  message_search;

  filtersLoaded: Promise<boolean>;
  receitasFiltred;



  constructor(
    private receitasService: CriarReceitaService,
    private backendService: BackendService
  ) { }

  ngOnInit() {
    this.data_load = false;
    this.backendService.getReceitas().subscribe((data: any[]) => {
      this.receitas = data;
      this.data_load = true;
      this.receitasService.setReceitas(this.receitas);
      this.filtersLoaded = Promise.resolve(true);
    })
    this.backendService.getFuncoes().subscribe((data: any[]) => {
      this.funcoes = data;
    })
  }

  ngOnChanges() {
    console.log("mudaram cenas")
  }

  ngDoCheck() {

  }

  apagarReceita() {
    this.backendService.deleteReceita(this.id_delete);
    this.receitas = this.receitas.filter(rec => rec.id !== this.id_delete);
    this.openModalDelete.nativeElement.click();
  }
  setIdToDelete(id) {
    this.id_delete = id;
  }

  setFilters() {
    let tipo = (<HTMLInputElement>document.getElementById('tipo')).value;
    this.tipo = tipo;
    let funcao = (<HTMLInputElement>document.getElementById('funcao')).value;
    this.funcao = funcao;
    let receitasFiltred = [];
    this.receitas = this.receitasService.getReceitas2();

    if ((tipo == "Todas" || tipo == "") && (funcao == "Todas" || funcao == "")) {
      this.receitas = this.receitasService.getReceitas2();
    } else if ((tipo == "Todas" || tipo == "") && (funcao !== "Todas" && funcao !== "")) {
      for (let fu of this.receitas) {
        if (fu.funcoes.find(z => z.funcao === funcao)) {
          receitasFiltred.push(fu);
        }
      }
      this.message_search = "Não existem receitas para '" + funcao +"'";
      this.receitas = receitasFiltred;
      this.filter = true;
    } else if ((tipo !== "Todas" && tipo !== "") && (funcao == "Todas" || funcao == "")) {
      receitasFiltred = this.receitasService.getReceitas2().filter(x => x.tipo === tipo);
      this.receitas = receitasFiltred;
      this.filter = true;
      this.message_search = "Não existem receitas do tipo '" + tipo +"'";
    } else {
      for (let fil of this.receitas) {
        if (fil.funcoes.find(z => z.funcao === funcao) && fil.tipo === tipo) {
          receitasFiltred.push(fil);
        }
      }
      this.receitas = receitasFiltred;
      this.filter = true;
      this.message_search = "Não existem receitas correspondentes à sua pesquisa por '" + funcao + "' e '" + tipo + "'";
    }


  }

  clearFilters(){
    (<HTMLInputElement>document.getElementById('tipo')).value = "";
    (<HTMLInputElement>document.getElementById('funcao')).value = "";
    this.receitas = this.receitasService.getReceitas2();
  }

}
