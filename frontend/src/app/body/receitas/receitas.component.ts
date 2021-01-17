import { Component, DoCheck, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Receita } from './receita/models/receita.model';
import { BackendService } from './services/backend.service';
import { CriarReceitaService } from './services/criar-receita.service';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss']
})
export class ReceitasComponent implements OnInit,OnChanges, DoCheck {
  @ViewChild('openModalDelete') openModalDelete:ElementRef;
  receitas: Receita[];
  receita: Receita;
  id_delete;

  constructor(private receitasService: CriarReceitaService, private backendService: BackendService) { }

  ngOnInit() {
    this.backendService.getReceitas().subscribe((data: any[])=>{
      this.receitas = data;
      this.receitasService.setReceitas(this.receitas);
    })
  }

  ngOnChanges(){
    console.log("mudou")
  }

  ngDoCheck(){
    //this.receitas = this.receitasService.getReceitas();
  }

  apagarReceita(){
    this.backendService.deleteReceitas(this.id_delete);
    this.receitas = this.receitas.filter(rec => rec.id !== this.id_delete);
    this.openModalDelete.nativeElement.click();
  }
  setIdToDelete(id){
    this.id_delete = id;
  }

}
