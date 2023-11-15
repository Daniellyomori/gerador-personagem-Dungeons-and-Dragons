import { CharacterObservableService } from './../services/character-observable.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Character } from '../model/character';
import { Constants } from 'src/app/util/constants';
import { WebStorageUtil } from 'src/app/util/web-storage-util';
import { NgForm } from '@angular/forms';
import { Shared } from '../util/shared';
import { FormCreationService } from '../form-creation/form-creation.service';

@Component({
  selector: 'app-list-characters',
  templateUrl: './list-characters.component.html',
  styleUrls: ['./list-characters.component.css']
})
export class ListCharactersComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
  
  character! : Character;
  characters: Character[] = [];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private characterObservableService: CharacterObservableService) {
    
  }

  ngOnInit(): void {
    Shared.initializeWebStorage();
    this.character = new Character('', '', '','');
    this.characterObservableService.get() .subscribe((characters: Character[]) => {
      this.characters = characters;
      console.log('Registros de characters:', this.characters);
    });
  }

  onEdit(character: Character) {
    let clone = Character.clone(character);
    this.character = clone;
  }


}
