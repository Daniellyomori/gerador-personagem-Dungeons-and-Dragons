import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-explanation-creation',
  templateUrl: './modal-explanation-creation.component.html',
  styleUrls: ['./modal-explanation-creation.component.css']
})
export class ModalExplanationCreationComponent implements OnInit, OnChanges{
  @Input() characterName: String = '';
  @Input() characterTraits: String = '';
  @Input() characterIdeals: String = '';
  @Input() characterBonds: String = '';
  @Output() creationCharacterEvent = new EventEmitter<boolean>();
  backgroundColor = 'indigo darken-3';

  constructor() {}

  ngOnChanges(): void {
    if (this.characterName != '' && this.characterTraits && this.characterTraits && this.characterBonds)
      setTimeout(() => {
        this.creationCharacterEvent.emit(true);
      }, 3000);
  }

  ngOnInit(): void {}

  getBackgroundColor() {
    return this.backgroundColor;
  }
}
