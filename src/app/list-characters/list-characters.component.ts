import { CharacterObservableService } from './../services/character-observable.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Character } from '../model/character';
import { Constants } from 'src/app/util/constants';
import { WebStorageUtil } from 'src/app/util/web-storage-util';
import { NgForm } from '@angular/forms';
import { Shared } from '../util/shared';
import { CharacterSheetObservableService } from '../services/character-sheet-observable.service';

@Component({
  selector: 'app-list-characters',
  templateUrl: './list-characters.component.html',
  styleUrls: ['./list-characters.component.css']
})
export class ListCharactersComponent implements OnInit {
  character! : Character;
  characters: Character[] = [];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private characterObservableService: CharacterObservableService,
    private characterSheetObservableService: CharacterSheetObservableService) {
    
  }

  ngOnInit(): void {
    Shared.initializeWebStorage();
    this.character = new Character('', '', '','');
    this.characterObservableService.get() .subscribe((characters: Character[]) => {
      this.characters = characters;
      console.log('Registros de characters:', this.characters);
    });
  }

  onDelete(character: Character) {
    let confirmation = window.confirm(
      'Você tem certeza que deseja remover ' + character.characterName
    );
    if (!confirmation) {
      return;
    }
    if (character.characterSheet && character.characterSheet.length > 0) {
      this.characterSheetObservableService.delete(character.characterSheet[0]).subscribe(
        () => {
          this.deleteCharacter(character);
        },
        error => {
          this.handleError(error);
        }
      );
    } else {
      this.deleteCharacter(character);
    }
  }
  
  private deleteCharacter(character: Character) {
    this.characterObservableService.delete(character).subscribe(
      () => {
        this.message ='Item deletado com sucesso!';
        this.isSuccess = true;
        this.atualizaPagina();
      },
      error => {
        this.handleError(error);
      }
    );
  }

  private handleError(error: any) {
    this.message = 'Erro ao deletar item: ' + error;
    this.isSuccess = false;
  }

  atualizaPagina(): void{
    this.isShowMessage = true;
    this.characterObservableService.get() .subscribe((characters: Character[]) => {
      this.characters = characters;
    });
  }
  
}
