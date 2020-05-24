
import { Component, OnInit } from '@angular/core';
import { APIService } from './../../API.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  title = 'standby';
  teams: Array<any>;

  constructor(private apiService: APIService) {}

  async ngOnInit() {
    this.apiService.ListTeams().then((evt) => {
      this.teams = evt.items;
    });

    this.apiService.OnCreateTeamListener.subscribe((evt) => {
      const data = evt;
      this.teams = [...this.teams, data];
    });
    }
    createTeam(teamName : string = 'default') {
        this.apiService.CreateTeam({name: teamName});
      }
}