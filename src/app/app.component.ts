import { Component, OnInit } from '@angular/core';
import { APIService } from './API.service';
import Auth from '@aws-amplify/auth';
import { AuthService } from './services/auth.service';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'standby';
  persons: Array<any>;

  constructor(
    public authService: AuthService,
    private apiService: APIService) { }

  ngOnInit() {
  }

  subscribePersons() {
    this.apiService.ListPersons().then((evt) => {
      this.persons = evt.items;
    });

    this.apiService.OnCreatePersonListener.subscribe((evt) => {
      const data = evt;
      this.persons = [...this.persons, data];
    });
  }
}
