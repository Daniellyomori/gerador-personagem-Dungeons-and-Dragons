import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreationDetailsComponent } from './form-creation-details.component';

describe('FormCreationDetailsComponent', () => {
  let component: FormCreationDetailsComponent;
  let fixture: ComponentFixture<FormCreationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCreationDetailsComponent]
    });
    fixture = TestBed.createComponent(FormCreationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
