import { Component, OnInit, ViewChild } from '@angular/core';

import { Character } from './../model/character';
import { Shared } from 'src/app/util/shared';
import { FormCreationService } from './form-creation.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CharacterObservableService } from '../services/character-observable.service';

@Component({
  selector: 'app-form-creation',
  templateUrl: './form-creation.component.html',
  styleUrls: ['./form-creation.component.css'],
  providers: [FormCreationService],
})
export class FormCreationComponent implements OnInit{
  @ViewChild('form') form!: NgForm;

  character! : Character;
  characters?: Character[];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private characterService : FormCreationService, private router: Router,
      private characterObservableService: CharacterObservableService){}

  modal = {
    show: false,
    title: '',
    text: '',
  };
  
  ngOnInit(): void {
    Shared.initializeWebStorage();
    this.character = new Character('', '','','');
    this.characters = this.characterService.getCharacters();
  }

  onSubmit() {
    this.isSubmitted = true;
    this.characterObservableService.save(this.character).subscribe(
      (characterSalvo: Character) => {
        console.log('Personagem salvo com sucesso:', characterSalvo);
      }
    );

    this.isShowMessage = true;
    this.isSuccess = true;
    this.message = 'Parte inicial salva com sucesso!';

    this.characterService.notifyTotalCharacters();

    this.navegarComCharacter();
  }

  navegarComCharacter() {
    this.router.navigate(['/cadastro', this.character.characterName], {
      state: { character: this.character },
    });
  }

  onEdit(character: Character) {
    let clone = Character.clone(character);
    this.character = clone;
  }

  limpar(){
    this.form.reset();
  }
}

