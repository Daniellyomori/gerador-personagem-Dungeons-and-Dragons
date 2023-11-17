import { Component, OnInit } from '@angular/core';
import { Character } from '../model/character';
import { CharacterSheet } from '../model/characterSheet';
import { FormCreationDetailsService } from '../form-creation-details/form-creation-details.service';
import { ActivatedRoute } from '@angular/router';
import { Shared } from '../util/shared';
import { CharacterObservableService } from '../services/character-observable.service';
import { take } from 'rxjs/internal/operators/take';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-list-character-details',
  templateUrl: './list-character-details.component.html',
  styleUrls: ['./list-character-details.component.css']
})
export class ListCharacterDetailsComponent implements OnInit {

  character!   : Character;
  characterSheet! : CharacterSheet;
  characterName!: string;
  
  constructor(private characterSheetService : FormCreationDetailsService, 
    private characterObservableService: CharacterObservableService, private router: ActivatedRoute){}
  
  ngOnInit(){
    Shared.initializeWebStorage();
    this.router.params.subscribe(params => {
      this.characterName = params['characterName'];
      });
    this.do();
  }

  do() {
    this.characterObservableService.getByCharacterName(this.characterName)
      .pipe(
        take(1),
        catchError(error => {
          console.log('componente');
          console.error(error);
          alert(error.message);
          return throwError(error); 
        })
      )
      .subscribe(
        (data: Character[]) => {
          if (!data || data.length === 0) {
            alert('Nenhum resultado foi encontrado!');
          }
          this.character = data[0];
          this.characterSheet = data[0].characterSheet[0];
          console.log(this.character);
          this.renderizaValoresTela();
        }
      );
     
  }

  renderizaValoresTela():void{
    const inputElementName = document.getElementById("input-characterName") as HTMLInputElement;
    inputElementName.value = this.character.characterName;

    const inputElementTraits = document.getElementById("input-characterTraits") as HTMLInputElement;
    inputElementTraits.value = this.character.personalityTraits;

    const inputElementIdeals = document.getElementById("input-characterIdeals") as HTMLInputElement;
    inputElementIdeals.value = this.character.ideals;

    const inputElementBonds = document.getElementById("input-characterBonds") as HTMLInputElement;
    inputElementBonds.value = this.character.bonds;

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
