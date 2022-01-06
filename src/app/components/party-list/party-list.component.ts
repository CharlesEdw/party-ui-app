import { Component, OnInit } from '@angular/core';
import { Party } from 'src/app/models/party';
import { PartyService } from 'src/app/services/party.service';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.css']
})
export class PartyListComponent implements OnInit {

  parties: Party[] = [];
  currentParty: Party = {};
  currentIndex = -1;
  id=0;
  firstname = '';
  surname='';
  orgname='';

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [2, 3, 4, 5, 8, 10, 20, 50];

  constructor(private partyService: PartyService) { }

  ngOnInit(): void {
    this.retrieveParties();
  }

  getRequestParams(searchFirstname: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchFirstname) {
      params[`firstname`] = searchFirstname;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
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
  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveParties();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveParties();
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

  deleteParty(): void {
    console.log(this.currentParty.id)
    this.partyService.delete(this.currentParty.id)
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e)
    });
  }

  searchFirstname(): void {
    this.page = 1;
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
  searchSurname(): void {
    this.page = 1;
    this.currentParty = {};
    this.currentIndex = -1;
    this.partyService.findBySurname(this.surname)
      .subscribe({
        next: (data) => {
          this.parties = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  searchOrgname(): void {
    this.page = 1;
    this.currentParty = {};
    this.currentIndex = -1;
    this.partyService.findByOrgname(this.orgname)
      .subscribe({
        next: (data) => {
          this.parties = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  searchId(): void {
    this.page = 1;
    this.currentParty = {};
    this.currentIndex = -1;
    this.partyService.findById(this.id)
      .subscribe({
        next: (data) => {
          this.parties = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
