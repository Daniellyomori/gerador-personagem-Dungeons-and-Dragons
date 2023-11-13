import { Character } from 'src/app/model/character';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/internal/Observable';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Injectable({
    providedIn: 'root',
  })
export class CharacterPromisseService{
    URL = 'http://localhost:3000/characters';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
    
      constructor(private httpClient: HttpClient) {}
    
      getByCharacterName(characterName: string): Promise<Character[]> {
        const observable: Observable<Character[]> = this.httpClient.get<Character[]>(`${this.URL}/${characterName}`);
        return lastValueFrom(observable);

      }
    
      save(character: Character): Promise<Character> {
        const observable: Observable<Character> = this.httpClient.post<Character>(this.URL, JSON.stringify(character), this.httpOptions);
        return lastValueFrom(observable);
      }
    
      patch(character: Character): Promise<Character> {
        const observable: Observable<Character> = this.httpClient
        .patch<Character>(
          `${this.URL}/${character.characterName}`,
          JSON.stringify(character),
          this.httpOptions);
        return lastValueFrom(observable);
      }
    
      update(character: Character): Promise<Character> {
        const observable: Observable<Character> = this.httpClient
        .put<Character>(
          `${this.URL}/${character.id}`, 
          JSON.stringify(character),
          this.httpOptions);

        return lastValueFrom(observable);
      }
}