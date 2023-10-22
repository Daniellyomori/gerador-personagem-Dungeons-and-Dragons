export class Character{
    constructor(public characterName:string, public personalityTraits:string, 
        public ideals:string, public bonds:string){
            this.characterName = characterName;
            this.personalityTraits = personalityTraits;
            this.ideals = ideals;
            this.bonds = bonds;
    }
}