import { CharacterPromisseService } from './../services/character-promisse.service';
import { CharacterSheet } from './../model/characterSheet';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Character } from '../model/character';
import { FormCreationService } from '../form-creation/form-creation.service';
import { Shared } from '../util/shared';
import { WebStorageUtil } from '../util/web-storage-util';
import { Constants } from '../util/constants';
import { FormCreationDetailsService } from './form-creation-details.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-form-creation-details',
  template: `
    <div>{{ character?.characterName }}</div>
  `,
  templateUrl: './form-creation-details.component.html',
  styleUrls: ['./form-creation-details.component.css']
})
export class FormCreationDetailsComponent implements OnInit{
  @ViewChild('form') form!: NgForm;
  characterName!: string;
  character! : Character;
  characterSheet! : CharacterSheet;
  characterSheetInvalid = false;
  characterSheetMessage = '';

  constructor(private characterSheetService : FormCreationDetailsService, 
    private characterPromisseService: CharacterPromisseService, private router: ActivatedRoute){}

  modal = {
    show: false,
    title: '',
    text: '',
  };
  
  ngOnInit(): void {
    Shared.initializeWebStorage();
    this.router.params.subscribe(params => {
      this.characterName = params['characterName'];
      });
    //this.character = WebStorageUtil.get(Constants.CHARACTER_NAME_KEY);
    this.characterSheet = new CharacterSheet();
    this.characterPromisseService
    .getByCharacterName(this.characterName)
    .then((c: Character[]) => {
      this.character = c[0];
      localStorage.setItem(
        Constants.CHARACTER_NAME_KEY,
        JSON.stringify(Character.toWs(this.character))
      );
    })
    .catch((e) => {
      this.character = WebStorageUtil.get(this.characterName);
    });
    this.renderizaValoresTela();
  }

  onSubmit() {
    this.characterSheetService
    .do(this.characterSheet, this.characterName)
    .then((value) =>{
      this.characterSheetInvalid = false;
      this.character = WebStorageUtil.get(this.characterName);
      this.characterSheetMessage = 'Personagem Cadastrado';
    })
    .catch((e) => {
      this.characterSheetInvalid = true;
      this.characterSheetMessage = e;
    })
    .finally(() => {
      this.characterSheet = new CharacterSheet();
    });
  }

  onResetClick() {
    this.characterSheet = new CharacterSheet();
  }

  renderizaValoresTela():void{
    const inputElementClass = document.getElementById("input-class") as HTMLInputElement;
    inputElementClass.value = this.characterSheet.classCharacter;

    const inputElementRace = document.getElementById("input-race") as HTMLInputElement;
    inputElementRace.value = this.characterSheet.race;

    const inputElementAligment = document.getElementById("input-aligment") as HTMLInputElement;
    inputElementAligment.value = this.characterSheet.aligment;

    const inputElementStrenght= document.getElementById("input-strenght") as HTMLInputElement;
    inputElementStrenght.value = this.characterSheet.strength.toString();

    const inputElementDexterity= document.getElementById("input-dexterity") as HTMLInputElement;
    inputElementDexterity.value = this.characterSheet.dexterity.toString();

    const inputElementConstituition= document.getElementById("input-constitution") as HTMLInputElement;
    inputElementConstituition.value = this.characterSheet.constitution.toString();

    const inputElementIntelligence= document.getElementById("input-intelligence") as HTMLInputElement;
    inputElementIntelligence.value = this.characterSheet.intelligence.toString();

    const inputElementWinsdom= document.getElementById("input-wisdom") as HTMLInputElement;
    inputElementWinsdom.value = this.characterSheet.wisdom.toString();

    const inputElementCharisma= document.getElementById("input-charisma") as HTMLInputElement;
    inputElementCharisma.value = this.characterSheet.charisma.toString();

    const inputElementProeficiency= document.getElementById("input-proeficiencybonus") as HTMLInputElement;
    inputElementProeficiency.value = this.characterSheet.proeficiencyBonus.toString();

    const inputElementArmor= document.getElementById("input-armor") as HTMLInputElement;
    inputElementArmor.value = this.characterSheet.armorClass.toString();

    const inputElementInitiative= document.getElementById("input-initiative") as HTMLInputElement;
    inputElementInitiative.value = this.characterSheet.initiative.toString();

    const inputElementVelocity= document.getElementById("input-velocity") as HTMLInputElement;
    inputElementVelocity.value = this.characterSheet.velocity.toString();

    const inputElementPerception= document.getElementById("input-perception") as HTMLInputElement;
    inputElementPerception.value = this.characterSheet.perception.toString();

    const collectionDiv = document.getElementById("collection-savingthrows") as HTMLInputElement;
    if (collectionDiv) {
        for (const item of this.characterSheet.arraySavingThrows) {
            const collectionItem = document.createElement("a");
            collectionItem.setAttribute("href", "#");
            collectionItem.classList.add("collection-item");

            const label = document.createElement("label");

            const checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            if (item.principal) {
              checkbox.checked = true; 
            }
            else{
              checkbox.disabled = true;
            }
              
            label.appendChild(checkbox);

            const span = document.createElement("span");
            span.textContent = item.badge || "";
            if (item.badge) {
                span.classList.add("badge");
            }
            label.appendChild(span);

            const textNode = document.createTextNode(item.nome);
            label.appendChild(textNode);

            collectionItem.appendChild(label);
            collectionDiv.appendChild(collectionItem);
        }
    }
  }
}

