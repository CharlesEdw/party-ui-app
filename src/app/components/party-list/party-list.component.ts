
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
  pageSize = 4;
  pageSizes = [2, 3, 4, 5, 8, 10, 20, 50];
  sortBy = 'Id';
  sortBys = ['Id','Firstname', 'Surname', 'Org Name'];

  constructor(private partyService: PartyService) { }

  ngOnInit(): void {
    this.retrieveParties(this.sortBy,this.page, this.pageSize);
  }

  getRequestParams(searchSelected: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchSelected == 'Firstname') {
      params[`sortBy`] = 'firstname';
    }

    if (searchSelected == 'Id') {
      params[`sortBy`] = 'id';
    }

    if (searchSelected == 'Surname') {
      params[`sortBy`] = 'surname';
    }

    if (searchSelected == 'Org Name') {
      params[`sortBy`] = 'orgname';
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveParties(sortBy: string,page: number,pageSize: number): void {
    let params: any = {};
    params = this.getRequestParams(sortBy, page, pageSize);
    console.log(params);
    this.partyService.getAll(params)
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
    this.retrieveParties(this.sortBy,this.page, this.pageSize);
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.retrieveParties(this.sortBy, this.page, this.pageSize);
  }

  handlePageSortChange(event: any): void {
    this.sortBy = event.target.value;
    this.retrieveParties(this.sortBy, this.page, this.pageSize);
  }

  refreshList(): void {
    this.retrieveParties(this.sortBy, this.page, this.pageSize);
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
        }
      });
  }
}
