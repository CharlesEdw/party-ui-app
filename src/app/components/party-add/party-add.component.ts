import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Party } from 'src/app/models/party';
import { PartyService } from 'src/app/services/party.service';

@Component({
  selector: 'app-party-add',
  templateUrl: './party-add.component.html',
  styleUrls: ['./party-add.component.css']
})
export class PartyAddComponent implements OnInit {

  party: Party = {
    firstname: '',
    surname: '',
    familyname: '',
    isorg: false,
    
  };
  submitted = false;

  constructor(private partyService: PartyService) { }

  ngOnInit(): void {
  }

  saveParty(): void {
    const data = {
      firstname: this.party.firstname,
      surname: this.party.surname,
      familyname: this.party.familyname,
      isorg: this.party.isorg,
      orgname: this.party.orgname,
      dob: this.party.dob,
      imageurl: this.party.imageurl
    };

    this.partyService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newParty(): void {
    this.submitted = false;
    this.party = {
      firstname: '',
      surname: '',
      isorg: false
    };
  }
}
