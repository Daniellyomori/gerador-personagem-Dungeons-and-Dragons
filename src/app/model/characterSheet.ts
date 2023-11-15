export class CharacterSheet{
    public arraySavingThrows: any[];
    public classCharacter: string;
    public race: string;
    public aligment: string;
    public strength: number;
    public dexterity: number;
    public constitution: number;
    public intelligence: number;
    public wisdom: number;
    public charisma: number;
    public proeficiencyBonus: number;
    public armorClass: number;
    public initiative: number;
    public velocity: number;
    public perception: number;

    public id: number;

    characterSheet! : CharacterSheet;
    
    constructor(){
            this.id = Math.round(Math.random() * 1000);

            this.classCharacter = this.escolherClasseAleatoria();
            this.race = this.escolherRacaAleatoria();
            this.aligment = this.escolherAlinhamentoAleatorio();

            this.strength = this.randomizaAtributo();
            this.dexterity = this.randomizaAtributo();
            this.constitution = this.randomizaAtributo();
            this.intelligence = this.randomizaAtributo();
            this.wisdom = this.randomizaAtributo();
            this.charisma = this.randomizaAtributo();

            this.proeficiencyBonus = 2;
            this.armorClass = 10 + this.dexterity;
            this.initiative = this.dexterity;

            this.velocity = this.calculaDeslocamento(this.race);
            this.perception = 10;
            this.arraySavingThrows = this.calculaPericia(this.classCharacter);
    }
    

    public escolherClasseAleatoria(): string {
      const arrayClass = ['Bárbaro', 'Bardo', 'Bruxo', 'Clérigo', 'Druida', 'Feiticeiro', 'Guardião', 'Guerreiro',
      'Ladino', 'Mago', 'Monge',  'Paladino'];
      
      const indiceAleatorioClass = Math.floor(Math.random() * arrayClass.length);
      return arrayClass[indiceAleatorioClass];
    }
    
    public escolherRacaAleatoria(): string {  
      const arrayRaces= ['Anão da Colina', 'Anão da Montanha', 'Alto Elfo', 'Elfo da Floresta', 'Elfo Negro',
      'Meio-Elfo', 'Halflings Pés Leves', 'Halflings Robusto', 'Humano', 'Humano Variante', 'Draconatos', 'Gnomo da Floresta',
      'Gnomo das Rochas', 'Meio-Orc', 'Tiefling Infernal', 'Tiefling Abissal'];
      
      const indiceAleatorioRace = Math.floor(Math.random() * arrayRaces.length);
        return arrayRaces[indiceAleatorioRace];
    }
    
      public escolherAlinhamentoAleatorio(): string {
        const arrayAligment = ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'Neutral', 'Chaotic Neutral',
        'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'];
      
        const indiceAleatorioAligment = Math.floor(Math.random() * arrayAligment.length);
        return arrayAligment[indiceAleatorioAligment];
      }
    
      public randomizaAtributo(): number{
        const arrayValores= [];
    
        for(let i = 0; i < 4; i++){
          const numeroAleatorioInteiro = Math.floor(Math.random() * 6) + 1;
          arrayValores.push(numeroAleatorioInteiro);
        }
    
        arrayValores.sort((a, b) => b - a);
        const valorTotal = arrayValores.slice(0, 3).reduce((total, valor) => total + valor, 0);  
        return valorTotal;
      }
    
      calculaDeslocamento(raca:string):number{
        if(raca ==='Anão da Colina' || raca === 'Anão da Montanha' || raca ==='Gnomo da Floresta' || raca ===
        'Gnomo das Rochas'){
          return 7.5;
        }
        else if(raca === 'Elfo da Floresta'){
          return 10.5;
        }
        return 9;
      }

      calculaPericia(classe:string): any[]{
        var arraySavingThrowsTemp = [
          {nome: "Força", badge: 1, principal: false},
          {nome: "Destreza", badge: 1, principal: false},
          {nome: "Constituição", badge: 1, principal: false},
          {nome: "Inteligência", badge: 1, principal: false},
          {nome: "Sabedoria", badge: 1, principal: false},
          {nome: "Carisma", badge: 1, principal: false}
        ];

        if(classe === "Bárbaro"){
          for (const item of arraySavingThrowsTemp) {
            if (item.nome === "Força") {
              item.badge = 3 + this.proeficiencyBonus;
              item.principal = true;
            }
            else if(item.nome === "Constituição"){
              item.badge = 1 + this.proeficiencyBonus;
              item.principal = true;
            }
          }
          return arraySavingThrowsTemp;
        }

        else if(classe === "Bardo"){
          for (const item of arraySavingThrowsTemp) {
            if (item.nome === "Destreza") {
              item.badge = 3 + this.proeficiencyBonus;
              item.principal = true;
            }
            else if(item.nome === "Carisma"){
              item.badge = 1 + this.proeficiencyBonus;
              item.principal = true;
            }
          }
          return arraySavingThrowsTemp;
        }

        else if(classe === "Bruxo"){
          for (const item of arraySavingThrowsTemp) {
            if (item.nome === "Sabedoria") {
              item.badge = 3 + this.proeficiencyBonus;
              item.principal = true;
            }
            else if(item.nome === "Carisma"){
              item.badge = 1 + this.proeficiencyBonus;
              item.principal = true;
            }
          }
          return arraySavingThrowsTemp;
        }

        else if(classe === "Clérigo"){
          for (const item of arraySavingThrowsTemp) {
            if (item.nome === "Sabedoria") {
              item.badge = 3 + this.proeficiencyBonus;
              item.principal = true;
            }
            else if(item.nome === "Carisma"){
              item.badge = 1 + this.proeficiencyBonus;
              item.principal = true;
            }
          }
          return arraySavingThrowsTemp;
        }

        else if(classe === "Druida"){
          for (const item of arraySavingThrowsTemp) {
            if (item.nome === "Inteligência") {
              item.badge = 3 + this.proeficiencyBonus;
              item.principal = true;
            }
            else if(item.nome === "Sabedoria"){
              item.badge = 1 + this.proeficiencyBonus;
              item.principal = true;
            }
          }
          return arraySavingThrowsTemp;
        }

        else if(classe === "Feiticeiro"){
          for (const item of arraySavingThrowsTemp) {
            if (item.nome === "Constituição") {
              item.badge = 3 + this.proeficiencyBonus;
              item.principal = true;
            }
            else if(item.nome === "Carisma"){
              item.badge = 1 + this.proeficiencyBonus;
              item.principal = true;
            }
          }
          return arraySavingThrowsTemp;
        }

        else if(classe === "Guardião"){
          for (const item of arraySavingThrowsTemp) {
            if (item.nome === "Força") {
              item.badge = 3 + this.proeficiencyBonus;
              item.principal = true;
            }
            else if(item.nome === "Destreza"){
              item.badge = 1 + this.proeficiencyBonus;
              item.principal = true;
            }
          }
          return arraySavingThrowsTemp;
        }

        else if(classe === "Guerreiro"){
          for (const item of arraySavingThrowsTemp) {
            if (item.nome === "Força") {
              item.badge = 3 + this.proeficiencyBonus;
              item.principal = true;
            }
            else if(item.nome === "Constituição"){
              item.badge = 1 + this.proeficiencyBonus;
              item.principal = true;
            }
          }
          return arraySavingThrowsTemp;
        }

        else if(classe === "Ladino"){
          for (const item of arraySavingThrowsTemp) {
            if (item.nome === "Destreza") {
              item.badge = 3 + this.proeficiencyBonus;
              item.principal = true;
            }
            else if(item.nome === "Inteligência"){
              item.badge = 1 + this.proeficiencyBonus;
              item.principal = true;
            }
          }
          return arraySavingThrowsTemp;
        }

        else if(classe === "Mago"){
          for (const item of arraySavingThrowsTemp) {
            if (item.nome === "Inteligência") {
              item.badge = 3 + this.proeficiencyBonus;
              item.principal = true;
            }
            else if(item.nome === "Sabedoria"){
              item.badge = 1 + this.proeficiencyBonus;
              item.principal = true;
            }
          }
          return arraySavingThrowsTemp;
        }

        else if(classe === "Monge"){
          for (const item of arraySavingThrowsTemp) {
            if (item.nome === "Força") {
              item.badge = 3 + this.proeficiencyBonus;
              item.principal = true;
            }
            else if(item.nome === "Destreza"){
              item.badge = 1 + this.proeficiencyBonus;
              item.principal = true;
            }
          }
          return arraySavingThrowsTemp;
        }

        else if(classe === "Paladino"){
          for (const item of arraySavingThrowsTemp) {
            if (item.nome === "Sabedoria") {
              item.badge = 3 + this.proeficiencyBonus;
              item.principal = true;
            }
            else if(item.nome === "Carisma"){
              item.badge = 1 + this.proeficiencyBonus;
              item.principal = true;
            }
          }
          return arraySavingThrowsTemp;
        }

        return [];
      }
}