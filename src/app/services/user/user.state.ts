import { CognitoUser } from 'amazon-cognito-identity-js';

export class UserState {
    currentUser: CognitoUser | any;
    isAuthenticated: boolean;
    error: any;
    loading: boolean;
    newPasswordRequired: boolean;
}