import { Character } from '../model/character';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RoutesAPI } from '../util/routes-api';
import { ErrorUtil } from '../util/error-util';
import { CharacterSheet } from '../model/characterSheet';

@Injectable({
    providedIn:'root'
})
export class CharacterSheetObservableService{
    constructor(private httpClient: HttpClient) {}

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
    
    getById(characterId: string): Observable<CharacterSheet[]> {
        const query: HttpParams = new HttpParams().set('id', characterId);
        const options = characterId ? { params: query } : {};
    
        return this.httpClient
          .get<CharacterSheet[]>(`${RoutesAPI.CHARACTERT_SHEET}`, options)
          .pipe(catchError(ErrorUtil.handleError));
    }
    
    save(character: CharacterSheet): Observable<CharacterSheet> {
        return this.httpClient.post<CharacterSheet>(
          `${RoutesAPI.CHARACTERT_SHEET}`,
          character,
          this.httpOptions
        );
    }

    delete(character: CharacterSheet): Observable<CharacterSheet> {
        return this.httpClient.delete<CharacterSheet>(
          `${RoutesAPI.CHARACTERT_SHEET}/${character.id}`,
          this.httpOptions
        );
    }

    patch(character: Character): Observable<CharacterSheet> {
        return this.httpClient.patch<CharacterSheet>(
          `${RoutesAPI.CHARACTERT_SHEET}/${character.id}`,
          character,
          this.httpOptions
        );
    }

    update(character: Character): Observable<CharacterSheet> {
        return this.httpClient.put<CharacterSheet>(
          `${RoutesAPI.CHARACTERT_SHEET}/${character.id}`,
          character,
          this.httpOptions
        );
    }

}