export class Character{
    constructor(public characterName:string, public personalityTraits:string, 
        public ideals:string, public bonds:string){
            this.characterName = characterName;
            this.personalityTraits = personalityTraits;
            this.ideals = ideals;
            this.bonds = bonds;
    }

    public static clone(character: Character) {
        let c: Character = new Character(character.characterName, character.personalityTraits, character.ideals, character.bonds);
        c.characterName = character.characterName;
        c.personalityTraits = character.personalityTraits;
        c.ideals = character.ideals;
        c.bonds = character.bonds;

        return c;
      }
      
}