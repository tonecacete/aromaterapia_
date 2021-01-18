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
  receitas;
  receita: Receita;
  id_delete;
  data_load = false;

  filtersLoaded: Promise<boolean>;

  constructor(
    private receitasService: CriarReceitaService,
    private backendService: BackendService
    ) { }

  ngOnInit() {
    this.data_load = false;
    this.backendService.getReceitas().subscribe((data: any[])=>{
      this.receitas = data;
      this.data_load = true;
      this.receitasService.setReceitas(this.receitas);
      this.filtersLoaded = Promise.resolve(true);
    })
  }

  ngOnChanges(){
    console.log("mudaram cenas")
  }

  ngDoCheck(){
    
  }

  apagarReceita(){
    this.backendService.deleteReceita(this.id_delete);
    this.receitas = this.receitas.filter(rec => rec.id !== this.id_delete);
    this.openModalDelete.nativeElement.click();
  }
  setIdToDelete(id){
    this.id_delete = id;
  }

}
