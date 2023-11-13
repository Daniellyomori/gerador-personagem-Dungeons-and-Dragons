import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FormCreationComponent } from './form-creation/form-creation.component';
import { FormsModule } from '@angular/forms';
import { LandPageComponent } from './land-page/land-page.component';
import { ListCharactersComponent } from './list-characters/list-characters.component';
import { ListCharacterDetailsComponent } from './list-character-details/list-character-details.component';
import { FormCreationDetailsComponent } from './form-creation-details/form-creation-details.component';
import { ModalExplanationCreationComponent } from './shared/modal-explanation-creation/modal-explanation-creation.component';
import { ModalComponent } from './shared/modal/modal.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    FormCreationComponent,
    LandPageComponent,
    ListCharactersComponent,
    ListCharacterDetailsComponent,
    FormCreationDetailsComponent,
    ModalExplanationCreationComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
