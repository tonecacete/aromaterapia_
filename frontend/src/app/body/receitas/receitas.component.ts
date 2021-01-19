import { Component, DoCheck, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jsPDF } from "jspdf";
import { catchError, retry } from 'rxjs/operators';
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
  @ViewChild('receitasHtml') receitasHtml: ElementRef;
  receitas;
  receita: Receita;
  data_load = false;
  filter = false;
  funcoes;
  message_search;
  
  id_delete;
  receita_delete;
  filtersLoaded: Promise<boolean>;
  receitasFiltred;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
    this.receitas = this.receitasService.getReceitas();
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
  setIdToDelete(id,receita) {
    this.id_delete = id;
    this.receita_delete = receita;
  }

  setFilters() {
    let tipo = (<HTMLInputElement>document.getElementById('tipo')).value;
    this.tipo = tipo;
    let funcao = (<HTMLInputElement>document.getElementById('funcao')).value;
    this.funcao = funcao;
    let receitasFiltred = [];
    this.receitas = this.receitasService.getReceitas();

    if ((tipo == "Todas" || tipo == "") && (funcao == "Todas" || funcao == "")) {
      this.receitas = this.receitasService.getReceitas();
    } else if ((tipo == "Todas" || tipo == "") && (funcao !== "Todas" && funcao !== "")) {
      for (let fu of this.receitas) {
        if (fu.funcoes.find(z => z.funcao === funcao)) {
          receitasFiltred.push(fu);
        }
      }
      this.message_search = "Não existem receitas para '" + funcao + "'";
      this.receitas = receitasFiltred;
      this.filter = true;
    } else if ((tipo !== "Todas" && tipo !== "") && (funcao == "Todas" || funcao == "")) {
      receitasFiltred = this.receitasService.getReceitas().filter(x => x.tipo === tipo);
      this.receitas = receitasFiltred;
      this.filter = true;
      this.message_search = "Não existem receitas do tipo '" + tipo + "'";
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

  clearFilters() {
    (<HTMLInputElement>document.getElementById('tipo')).value = "";
    (<HTMLInputElement>document.getElementById('funcao')).value = "";
    this.receitas = this.receitasService.getReceitas();
  }

  downloadPDF() {

    var doc = new jsPDF();
    for (let pdf of this.receitas) {
      //doc.setFont("courier");  
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text(pdf.nome, 20, 20);
      doc.line(20, 25, 150, 25);
      doc.setFontSize(12);
      doc.text('Idade Minima', 20, 35);
      doc.setFont("helvetica", "normal");
      doc.text(pdf.idadeMin.toString(), 30, 40);
      doc.setFont("helvetica", "bold");
      doc.text('Tipo', 20, 50);
      doc.setFont("helvetica", "normal");
      doc.text(pdf.tipo, 30, 55);
      doc.setFont("helvetica", "bold");
      doc.text('Funções', 20, 65);
      doc.setFont("helvetica", "normal");
      let i = 70
      for (let f of pdf.funcoes) {
      }
      for (let x = 0; x < pdf.funcoes.length; x++) {
        doc.text(pdf.funcoes[x].funcao, 30, i);
        if (x !== pdf.funcoes.length - 1) {
          i += 5
        }
      }
      doc.setFont("helvetica", "bold");
      i += 10
      doc.text('Receita', 20, i);
      doc.setFont("helvetica", "normal");
      i += 5
      doc.text(pdf.receitaDesc, 30, i);
      doc.setFont("helvetica", "bold");
      i += 10
      doc.text('Aplicação', 20, i);
      doc.setFont("helvetica", "normal");
      i += 5
      doc.text(pdf.aplicacao, 30, i);
      doc.addPage();
    }
    doc.text('Do you like that?', 20, 140);
    doc.save('Test.pdf');
  }
  goToReceita(event,id){
    let idEl = event.srcElement.id
    if (idEl !== "openModalDelete" && idEl !== "iconDelete") {
      //this.router.navigate(['/receitas'], { relativeTo: this.route });
      this.router.navigate(['/receita',id], { relativeTo: this.route });
    }
  }

}
