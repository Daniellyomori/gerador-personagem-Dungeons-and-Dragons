import { Character } from "src/app/model/character";
import { Constants } from "./constants";


export class Shared{
    constructor(){}

    public static initializeWebStorage(): void {
        if (localStorage.getItem(Constants.CHARACTER_NAME_KEY) != null) {
          return;
        }
    
        let character = new Character(Constants.CHARACTER_NAME_KEY, Constants.CHARACTER_TRAITS_KEY,
            Constants.CHARACTER_BONDS_KEY, Constants.CHARACTER_IDEALS_KEY);
    
        localStorage.setItem(Constants.CHARACTER_NAME_KEY, JSON.stringify(character));
        localStorage.setItem(Constants.CHARACTERS_KEY, JSON.stringify([]));
      }
}