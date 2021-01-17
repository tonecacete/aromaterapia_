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
  nome:string;
  idadeMin: number;
  tipo:string;
  funcao: string[];
  receitaDesc: string;
  aplicacao:string;

  receitas: Receita[];
  //id;
  
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private receitasService: CriarReceitaService,
    private backendService: BackendService
    ) { }

  ngOnInit() {
    //this.id = this.receitasService.getReceitaId();
    this.receitas = this.receitasService.getReceitas();
/*     this.route.queryParams.subscribe(params => {
      this.nome = params['nome'];
    }); */
  }

  ngOnChanges(){

  }

  addReceita(){
    console.log("add")
    this.receita = new Receita(
      0,
      this.nome,
      this.idadeMin,
      this.tipo,
      [],
      this.receitaDesc,
      this.aplicacao
    )
    if (!this.receitas) {
      this.receitas = [];
    }
    this.receitas.push(this.receita);
    this.backendService.addReceita(this.receita);
    //this.receitasService.setReceitaId(this.receita.id);
    this.receitasService.setReceitas(this.receitas);
    this.router.navigate(['/receitas'], { relativeTo: this.route });
    
  }

}
