import { Component, OnInit } from '@angular/core';
import { Character } from './../model/character';

@Component({
  selector: 'app-form-creation',
  templateUrl: './form-creation.component.html',
  styleUrls: ['./form-creation.component.css']
})
export class FormCreationComponent implements OnInit{
  character! : Character;
  submitted = false;
  characterInvalid = false;
  message = '';

  constructor(){}
  
  ngOnInit(): void {
    this.character = new Character('',  '','','');
  }

  onSubmit() {
    if (this.character.nomePersonagem == '') {
      this.characterInvalid = true;
      this.message = 'Nome do personagem não pode ser vazio!';
      return;
    }
    if (this.character.tracosPersonalidade == '') {
      this.characterInvalid = true;
      this.message = 'Traços de personalidade não pode ser vazio!';
      return;
    }
    if (this.character.ideais == '') {
      this.characterInvalid = true;
      this.message = 'Ideais não pode ser vazio!';
      return;
    }

    this.characterInvalid = false;
    this.message = 'Personagem criado com sucesso!';
    this.submitted = true;
  }

  onClickResetForm() {
    this.character = new Character('','','','');
    this.characterInvalid = false;
    this.message = '';
  }
}

