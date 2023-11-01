import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Constants } from 'src/app/util/constants';
import { WebStorageUtil } from 'src/app/util/web-storage-util';
import { Character } from '../model/character';

@Injectable({
    providedIn:'root'
})
export class FormCreationService{
    charachters!: Character[];

    private characterSource!: BehaviorSubject<number>;

    constructor(){
        this.charachters = WebStorageUtil.get(Constants.CHARACTERS_KEY);
        if(this.charachters != null){
            this.characterSource = new BehaviorSubject<number>(this.charachters.length);
        }
        else{
            this.characterSource = new BehaviorSubject<number>(0);
        }
        
    }

    save(character : Character){
        this.charachters = WebStorageUtil.get(Constants.CHARACTERS_KEY);
        this.charachters.push(character);
        WebStorageUtil.set(Constants.CHARACTERS_KEY, this.charachters);
    }

    delete(characterName : string): boolean{
        this.charachters = WebStorageUtil.get(Constants.CHARACTERS_KEY);
        this.charachters = this.charachters.filter((c) =>{
            return c.characterName?.valueOf() != characterName.valueOf();
        });

        WebStorageUtil.set(Constants.CHARACTERS_KEY, this.charachters);
        return true;
    }

    update(character : Character){
        this.charachters = WebStorageUtil.get(Constants.CHARACTERS_KEY);
        this.delete(character.characterName);
        this.save(character);
    }

    isExist(value: string): boolean{
        this.charachters = WebStorageUtil.get(Constants.CHARACTERS_KEY);
        for(let c of this.charachters){
            if(c.characterName?.valueOf() == value.valueOf()){
                return true;
            }
        }
        return false;
    }

    getCharacters(): Character[]{
        this.charachters = WebStorageUtil.get(Constants.CHARACTERS_KEY);
        return this.charachters;    
    }

    notifyTotalCharacters() {
        this.characterSource.next(this.getCharacters()?.length);
    }

    asObservable(): Observable<number> {
        return this.characterSource;
      }
}