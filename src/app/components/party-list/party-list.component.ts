import { Component, OnInit } from '@angular/core';
import { Party } from 'src/app/models/party';
import { PartyService } from 'src/app/services/party.service';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.css']
})
export class PartyListComponent implements OnInit {

  parties?: Party[];
  currentParty: Party = {};
  currentIndex = -1;
  firstname = '';

  constructor(private partyService: PartyService) { }

  ngOnInit(): void {
    this.retrieveParties();
  }

  retrieveParties(): void {
    this.partyService.getAll()
      .subscribe({
        next: (data) => {
          this.parties = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveParties();
    this.currentParty = {};
    this.currentIndex = -1;
  }

  setActiveParty(party: Party, index: number): void {
    this.currentParty = party;
    this.currentIndex = index;
  }

  removeAllParties(): void {
    this.partyService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchFirstname(): void {
    this.currentParty = {};
    this.currentIndex = -1;
    this.partyService.findByFirstname(this.firstname)
      .subscribe({
        next: (data) => {
          this.parties = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
