import { Funcao } from './funcao.model';
export class Receita{
    id:number;
    nome:string;
    idadeMin: number;
    tipo:string;
    funcoes: Funcao[];
    receitaDesc: string;
    aplicacao:string;
    observacoes:string;

    constructor(
        id:number,
        nome:string,
        idadeMin:number,
        tipo:string,
        funcoes: Funcao[],
        receitaDesc: string,
        aplicacao:string,
        observacoes:string
    ){
        this.id = id;
        this.nome = nome;
        this.idadeMin = idadeMin;
        this.tipo = tipo;
        this.funcoes = funcoes;
        this.receitaDesc = receitaDesc;
        this.aplicacao = aplicacao;
        this.observacoes = observacoes;
    }
}