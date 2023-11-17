import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandPageComponent } from './land-page/land-page.component';
import { FormCreationComponent } from './form-creation/form-creation.component';
import { ListCharactersComponent } from './list-characters/list-characters.component';
import { ListCharacterDetailsComponent } from './list-character-details/list-character-details.component';
import { FormCreationDetailsComponent } from './form-creation-details/form-creation-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'inicio', component: LandPageComponent },
  { path: 'cadastro', component: FormCreationComponent },
  { path: 'listagem', component: ListCharactersComponent},
  { path: 'cadastro/:characterName', component: FormCreationDetailsComponent},
  { path: 'listagem/:characterName', component: ListCharacterDetailsComponent},
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
