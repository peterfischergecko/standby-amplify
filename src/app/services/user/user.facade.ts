import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { UserState } from './user.state';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { CognitoUser } from 'amazon-cognito-identity-js';

let _state: UserState = {
    currentUser: null,
    isAuthenticated: false,
    error: null,
    loading: false,
    newPasswordRequired: false
};

@Injectable({
    providedIn: 'root'
})
export class UserFacade {
    private currentState = new BehaviorSubject<UserState>(_state);
    private currentState$ = this.currentState.asObservable();

    public currentUser$: Observable<CognitoUser> = this.currentState$.pipe(map(state => state.currentUser),        distinctUntilChanged());
    public error$: Observable<any> = this.currentState$.pipe(map(state => state.error),                            distinctUntilChanged());
    public isAuthenticated$: Observable<boolean> = this.currentState$.pipe(map(state => state.isAuthenticated),    distinctUntilChanged());
    public loading$: Observable<boolean> = this.currentState$.pipe(map(state => state.loading),                    distinctUntilChanged());
    public newPasswordRequired$: Observable<boolean> = this.currentState$.pipe(map(state => state.newPasswordRequired), distinctUntilChanged());

    constructor(private userService: UserService) {
        this.userService.checkForAuthentication()
            .then((user: CognitoUser) => {
                this.updateState({ ..._state, currentUser: user, isAuthenticated: true, loading: false });
            })
            .catch(() => { });
    }

    getStateSnapshot() {
        return { ..._state };
    }

    signIn(username: string, password: string) {
        this.setLoading();
        this.userService.signIn(username, password)
            .then((user: CognitoUser | any) => {
                this.checkForChallenges(user);
                this.updateState({ ..._state, currentUser: user, isAuthenticated: true, loading: false });
            }).catch((err) => {
                this.updateState({ ..._state, error: err, loading: false });
            });
    }

    signOut() {
        this.userService.signOut()
            .then(() => {
                this.updateState({ ..._state, currentUser: null, error: null, isAuthenticated: false, loading: false });
            });
    }

    completeNewPassword(password: string, requiredAttributes: any) {
        this.setLoading();
        this.userService.completeNewPassword(this.currentState.value.currentUser, password, requiredAttributes)
            .then((user: CognitoUser) => {
                this.updateState({ ..._state, currentUser: user, isAuthenticated: true, loading: false });
            })
            .catch((error: any) => {
                this.setLoading(false);
                this.setError(error);
            });
    }

    private updateState(state: UserState) {
        this.currentState.next(_state = state);
    }

    private setLoading(isLoading = true) {
        this.updateState({ ..._state, loading: isLoading });
    }

    private setError(err: any) {
        this.updateState({ ..._state, error: err });
    }

    private checkForChallenges(user: CognitoUser | any) {
        switch (user.challengeName) {
            case 'NEW_PASSWORD_REQUIRED':
                this.updateState({ ..._state, newPasswordRequired: true });
                break;
        }
    }
}
