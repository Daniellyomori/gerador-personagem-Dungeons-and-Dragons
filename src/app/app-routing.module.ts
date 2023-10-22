import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandPageComponent } from './land-page/land-page.component';
import { FormCreationComponent } from './form-creation/form-creation.component';
import { ListCharactersComponent } from './list-characters/list-characters.component';
import { ListCharacterDetailsComponent } from './list-character-details/list-character-details.component';

const routes: Routes = [
  { path: 'inicio', component: LandPageComponent },
  { path: 'cadastro', component: FormCreationComponent },
  { path: 'listagem', component: ListCharactersComponent},
  { path: 'listagem/detalhes/:characterName', component: ListCharacterDetailsComponent},
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
