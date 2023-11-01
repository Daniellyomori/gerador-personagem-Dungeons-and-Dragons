import { Component, OnInit, ViewChild } from '@angular/core';

import { Character } from './../model/character';
import { Shared } from 'src/app/util/shared';
import { FormCreationService } from './form-creation.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-creation',
  templateUrl: './form-creation.component.html',
  styleUrls: ['./form-creation.component.css']
})
export class FormCreationComponent implements OnInit{
  @ViewChild('form') form!: NgForm;

  character! : Character;
  characters?: Character[];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private characterService : FormCreationService){}

  modal = {
    show: false,
    title: '',
    text: '',
  };
  
  ngOnInit(): void {
    Shared.initializeWebStorage();
    this.character = new Character('',  '','','');
    this.characters = this.characterService.getCharacters();
  }

  onSubmit() {
    this.isSubmitted = true;
    if(!this.characterService.isExist(this.character.characterName)){
      this.characterService.save(this.character);
    }
    else{
      this.characterService.update(this.character);
    }

    this.isShowMessage = true;
    this.isSuccess = true;
    this.message = 'Parte inicial salva com sucesso!';

    this.form.reset();
    this.character = new Character('','','','');
    this.characters = this.characterService.getCharacters();

    this.characterService.notifyTotalCharacters();
  }

  onCreationCharacterEvent(event: boolean){
    this.modal.show = event;
    this.modal.title = 'Aviso';
    this.modal.text = 'Será iniciada a criação aleatória do personagem';
  }

  onCloseModal(){
    this.modal.show = false;
  }

  onEdit(character: Character) {
    let clone = Character.clone(character);
    this.character = clone;
  }

}

