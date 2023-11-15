import { Character } from '../model/character';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RoutesAPI } from '../util/routes-api';
import { ErrorUtil } from '../util/error-util';

@Injectable({
    providedIn:'root'
})
export class CharacterObservableService{
    constructor(private httpClient: HttpClient) {}

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
    
    getByCharacterName(characterName: string): Observable<Character[]> {
        const query: HttpParams = new HttpParams().set('characterName', characterName);
        const options = characterName ? { params: query } : {};
    
        return this.httpClient
          .get<Character[]>(`${RoutesAPI.CHARACTERS}`, options)
          .pipe(catchError(ErrorUtil.handleError));
    }
    
    save(character: Character): Observable<Character> {
        return this.httpClient.post<Character>(
          `${RoutesAPI.CHARACTERS}`,
          character,
          this.httpOptions
        );
    }

    delete(character: Character): Observable<Character> {
        return this.httpClient.delete<Character>(
          `${RoutesAPI.CHARACTERS}/${character.id}`,
          this.httpOptions
        );
    }

    patch(character: Character): Observable<Character> {
        return this.httpClient.patch<Character>(
          `${RoutesAPI.CHARACTERS}/${character.id}`,
          character,
          this.httpOptions
        );
    }

    update(character: Character): Observable<Character> {
        return this.httpClient.put<Character>(
          `${RoutesAPI.CHARACTERS}/${character.id}`,
          character,
          this.httpOptions
        );
    }

    get(): Observable<Character[]>{
      return this.httpClient
          .get<Character[]>(`${RoutesAPI.CHARACTERS}`)
          .pipe(catchError(ErrorUtil.handleError));
    }
}