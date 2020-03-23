import { Component, OnInit } from '@angular/core';
import { APIService } from './API.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'standby';
  persons: Array<any>;

  constructor(private apiService: APIService) {}

  async ngOnInit() {
    this.apiService.ListPersons().then((evt) => {
      this.persons = evt.items;
    });

    this.apiService.OnCreatePersonListener.subscribe((evt) => {
      const data = evt;
      this.persons = [...this.persons, data];
    });
  }

  createPerson() {
    this.apiService.CreatePerson({firstname: "bob", lastname: "ballermann", email: "bob@ballermann.de"})
  }
}
