import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExplanationCreationComponent } from './modal-explanation-creation.component';

describe('ModalExplanationCreationComponent', () => {
  let component: ModalExplanationCreationComponent;
  let fixture: ComponentFixture<ModalExplanationCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalExplanationCreationComponent]
    });
    fixture = TestBed.createComponent(ModalExplanationCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
