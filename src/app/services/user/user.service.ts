import { Injectable } from '@angular/core';
import { CognitoUser } from 'amazon-cognito-identity-js';
import Auth from '@aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  /**
   * Checks the current state of authentication and returns the current authenticated user
   */
  checkForAuthentication(): Promise<CognitoUser | any> {
    return new Promise((resolve, reject) => {
      Auth.currentAuthenticatedUser()
        .then((user: CognitoUser) => {
          resolve(user);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  signIn(username: string, password: string): Promise<CognitoUser | any> {
    return new Promise((resolve, reject) => {
      Auth.signIn(username, password, {})
        .then((user: CognitoUser | any) => {
          resolve(user);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  signOut(): Promise<any> {
    return Auth.signOut();
  }

  completeNewPassword(currentUser: CognitoUser, password: string, requiredAttributes: any): Promise<CognitoUser | any> {
    return new Promise((resolve, reject) => {
      Auth.completeNewPassword(currentUser, password, requiredAttributes)
        .then((user: CognitoUser | any) => {
          resolve(user);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}
