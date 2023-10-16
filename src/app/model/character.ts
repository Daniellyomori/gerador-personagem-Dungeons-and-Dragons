export class Character{
    constructor(public nomePersonagem:string, public tracosPersonalidade:string, 
        public ideais:string, public vinculos:string){
            this.nomePersonagem = nomePersonagem;
            this.tracosPersonalidade = tracosPersonalidade;
            this.ideais = ideais;
            this.vinculos = vinculos;
    }
}