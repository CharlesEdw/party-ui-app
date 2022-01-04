import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { PartyAddComponent } from './components/party-add/party-add.component';
import { PartyDetailsComponent } from './components/party-details/party-details.component';
import { PartyListComponent } from './components/party-list/party-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PartyAddComponent,
    PartyDetailsComponent,
    PartyListComponent
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
