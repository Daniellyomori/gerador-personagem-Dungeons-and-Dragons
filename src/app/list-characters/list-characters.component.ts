import { Component, OnInit } from '@angular/core';
import { Character } from '../model/character';
import { Constants } from 'src/util/constants';
import { WebStorageUtil } from 'src/util/web-storage-util';

@Component({
  selector: 'app-list-characters',
  templateUrl: './list-characters.component.html',
  styleUrls: ['./list-characters.component.css']
})
export class ListCharactersComponent implements OnInit {
  characters: Character[] = [];
  constructor() {
    
  }

  ngOnInit(): void {
    this.characters = WebStorageUtil.get(Constants.CHARACTERS_KEY) as Character[];
  }

}
