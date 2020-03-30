import { Injectable } from '@angular/core';
import Auth from '@aws-amplify/auth';
import { Hub, ICredentials } from '@aws-amplify/core';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState: Subject<CognitoUser | any> = new Subject<CognitoUser | any>();

  public AuthState: Observable<CognitoUser | any> = this.authState.asObservable();
  public LoggedIn: boolean;

  constructor() {
    // for more informations about aws-amplify 'Hub' see https://aws-amplify.github.io/docs/js/hub
    Hub.listen('auth', (data) => {
      const { channel, payload } = data;
      if (channel === 'auth') {
        this.authState.next(payload.event);
      }
    });
  }

  signIn(username: string, password: string): Promise<CognitoUser | any> {
    return new Promise((resolve, reject) => {
      Auth.signIn(username, password)
        .then((user: CognitoUser | any) => {
          this.LoggedIn = true;
          resolve(user);
        })
        .catch((error: any) => reject(error));
    });
  }

  signOut(): Promise<any> {
    return Auth.signOut()
      .then(() => this.LoggedIn = false);
  }
}
