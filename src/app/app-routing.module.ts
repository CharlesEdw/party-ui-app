import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartyListComponent } from './components/party-list/party-list.component';
import { PartyAddComponent } from './components/party-add/party-add.component';
import { PartyDetailsComponent } from './components/party-details/party-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'parties', pathMatch: 'full' },
  { path: 'parties', component: PartyListComponent },
  { path: 'parties/:id', component: PartyDetailsComponent },
  { path: 'add', component: PartyAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
