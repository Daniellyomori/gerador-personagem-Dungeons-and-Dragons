import { CharacterSheetPromisseService } from './../services/character-sheet-promisse.service';
import { BehaviorSubject } from 'rxjs';
import { CharacterSheet } from './../model/characterSheet';
import { Injectable } from "@angular/core";
import { CharacterPromisseService } from '../services/character-promisse.service';
import { Character } from '../model/character';
import { WebStorageUtil } from '../util/web-storage-util';
import { Constants } from '../util/constants';

@Injectable({
    providedIn:'root'
})
export class FormCreationDetailsService{
    characterWS : Character;

    constructor(private characterPromisseService: CharacterPromisseService,
                private characterSheetPromisseService: CharacterSheetPromisseService) {
        this.characterWS = WebStorageUtil.get(Constants.CHARACTER_NAME_KEY);
    }

    do(characterSheet: CharacterSheet, characterName: string): Promise<CharacterSheet>{
        const p = new Promise<CharacterSheet>((resolve, reject) => {
            if(characterSheet == null){
                reject('Ficha não pode ser vazia');
            }
            let character!: Character;
            this.characterPromisseService.getByCharacterName(characterName)
            .then((c: Character[])=> {
                character = c[0];
                characterSheet.idCharacter = character.id;

                this.characterWS = WebStorageUtil.get(Constants.CHARACTER_NAME_KEY);
                this.characterWS.characterSheet.push(characterSheet);

                localStorage.setItem(
                    Constants.CHARACTER_NAME_KEY,
                    JSON.stringify(this.characterWS)
                );

                let p1 = this.characterPromisseService.patch(character);
                let p2 = this.characterSheetPromisseService.save(characterSheet);
                Promise.all([p1, p2]).then((values) => {
                    resolve(values[1]);
                  });
                })
                .catch((e) => {
                  reject('Opps!!! O usuário não foi encontrado!');
                });
            });
        return p;
    }
}