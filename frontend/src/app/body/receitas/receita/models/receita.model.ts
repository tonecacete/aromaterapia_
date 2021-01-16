export class Receita{
    id:number;
    nome:string;
    idadeMin: number;
    tipo:string;
    funcao: string[];
    receitaDesc: string;
    aplicacao:string;

    constructor(
        id:number,
        nome:string,
        idadeMin:number,
        tipo:string,
        funcao: string[],
        receitaDesc: string,
        aplicacao:string
    ){
        this.id = id;
        this.nome = nome;
        this.idadeMin = idadeMin;
        this.tipo = tipo;
        this.funcao = funcao;
        this.receitaDesc = receitaDesc;
        this.aplicacao = aplicacao;
    }
}