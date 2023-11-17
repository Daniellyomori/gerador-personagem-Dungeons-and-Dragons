import { CharacterSheetPromisseService } from './../services/character-sheet-promisse.service';
import { BehaviorSubject, Observable, catchError, concatMap, map, tap, throwError } from 'rxjs';
import { CharacterSheet } from './../model/characterSheet';
import { Injectable } from "@angular/core";
import { CharacterPromisseService } from '../services/character-promisse.service';
import { Character } from '../model/character';
import { WebStorageUtil } from '../util/web-storage-util';
import { Constants } from '../util/constants';
import { AppError } from '../util/app-error';
import { CharacterObservableService } from '../services/character-observable.service';
import { ErrorUtil } from '../util/error-util';

@Injectable({
    providedIn:'root'
})
export class FormCreationDetailsService{
    character!: Character;

    constructor(private characterObservableService: CharacterObservableService,
                private characterSheetPromisseService: CharacterSheetPromisseService) {
    }

    do(characterSheet: CharacterSheet, characterName: string): Observable<CharacterSheet>{
            if(characterSheet == null){
                return throwError(
                    new AppError(
                      'Não pode ser nulo'
                    )
                  );
            }
            let result$ = this.characterObservableService.getByCharacterName(characterName).pipe(
                map((characters) => characters[0]),
                tap((character) => {
                  this.character = character;
                }),
                tap((character) => {
                  console.log(character);
                }),
                concatMap((character: Character) => {
                    this.character.characterSheet?.push(characterSheet);
                    WebStorageUtil.set(Constants.CHARACTER_NAME_KEY, this.character);
                    const result$ = this.characterObservableService.patch(character).pipe(
                        concatMap(() => {
                          return this.characterSheetPromisseService.save(characterSheet);
                        })
                      );
              
                      return result$;
                    }),
                    catchError(ErrorUtil.handleError)
                  );
              
                  console.log(result$);
                  return result$;
    }
}