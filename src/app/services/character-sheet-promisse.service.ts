import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CharacterSheet } from "../model/characterSheet";
import { lastValueFrom } from "rxjs/internal/lastValueFrom";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
    providedIn: 'root',
  })
export class CharacterSheetPromisseService{
    URL = 'http://localhost:3000/characterSheet';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    
    constructor(private httpClient: HttpClient) {}

    getById(id: number): Promise<CharacterSheet> {
        const observable: Observable<CharacterSheet> =  this.httpClient.get<CharacterSheet>(`${this.URL}/${id}`);
        return lastValueFrom(observable);
    }
    
    save(characterSheet: CharacterSheet): Promise<CharacterSheet> {
        const observable: Observable<CharacterSheet> = this.httpClient.post<CharacterSheet>(this.URL, JSON.stringify(characterSheet), this.httpOptions);
        return lastValueFrom(observable);
    }
    
    patch(characterSheet: CharacterSheet): Promise<CharacterSheet> {
        const observable: Observable<CharacterSheet> = this.httpClient
        .patch<CharacterSheet>(
            this.URL,
            JSON.stringify(characterSheet),
            this.httpOptions
          )
        return lastValueFrom(observable);
    }
    
    update(characterSheet: CharacterSheet): Promise<CharacterSheet> {
        const observable: Observable<CharacterSheet> = this.httpClient
        .put<CharacterSheet>(this.URL, JSON.stringify(characterSheet), this.httpOptions)

        return lastValueFrom(observable);
    }

}