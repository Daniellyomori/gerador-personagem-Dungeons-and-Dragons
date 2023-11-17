import { CharacterSheet } from "./characterSheet";

export class Character{
    id!: string;
    characterName: string;
    personalityTraits: string;
    ideals: string;
    bonds: string;
    characterSheet: CharacterSheet[];

    constructor(characterName:string, personalityTraits:string, ideals:string, bonds:string){
            this.id = String(Math.round(Math.random() * 1000));
            this.characterName = characterName;
            this.personalityTraits = personalityTraits;
            this.ideals = ideals;
            this.bonds = bonds;
            this.characterSheet = [];
    }

    public static clone(character: Character) {
        let c: Character = new Character(character.characterName, character.personalityTraits, character.ideals, character.bonds);
        c.characterName = character.characterName;
        c.personalityTraits = character.personalityTraits;
        c.ideals = character.ideals;
        c.bonds = character.bonds;
        c.characterSheet = character.characterSheet;

        return c;
      }

      public static toWs(character: Character) {
        let c: Character = new Character(character.characterName, character.personalityTraits, character.ideals, character.bonds);
        c.characterName = character.characterName;
        c.personalityTraits = character.personalityTraits;
        c.ideals = character.ideals;
        c.bonds = character.bonds;
        c.characterSheet = [];

        return c;
      }
      
}