import { Component, OnInit, Input } from '@angular/core';
import { Party } from 'src/app/models/party';
import { ActivatedRoute, Router } from '@angular/router';
import { PartyService } from 'src/app/services/party.service';

@Component({
  selector: 'app-party-details',
  templateUrl: './party-details.component.html',
  styleUrls: ['./party-details.component.css']
})
export class PartyDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentParty: Party = {
    id: 0,
    firstname: '',
    surname: '',
    familyname: '',
    dob: '',
    isorg: false,
    orgname:'',
    imageurl: ''
  };
    
  message = '';

  constructor(
    private partyService: PartyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getParty(this.route.snapshot.params["id"]);
      console.log("Party Id from ngOnInit "+this.route.snapshot.params["id"]);
    }
  }
  
  getEditParty(id: number): void {
        this.partyService.get(id)
      .subscribe({
        next: (data) => {
          this.currentParty
          console.log("Full Data: "+ data + "Current Party: "+this.currentParty);
        },
        error: (err) => { 
          console.log(err);
        }
      });
  }

  getParty(id: string): void {
    this.partyService.get(id)
      .subscribe({
        next: (data) => {
          this.currentParty = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  updateParty(): void {
    this.message = '';

    this.partyService.update(this.currentParty)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Party was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteParty(): void {
    this.partyService.delete(this.currentParty.id)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/parties']);
      },
      error: (e) => console.error(e)
    });
  }
}
