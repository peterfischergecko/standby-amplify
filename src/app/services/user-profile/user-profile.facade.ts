import { Injectable } from '@angular/core';
import { UserProfileState } from './user-profile.state';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserProfile } from 'src/app/models/user-profile';
import { map, distinctUntilChanged, filter } from 'rxjs/operators';
import { APIService, ListPersonsQuery, ListMembersQuery, GetTeamQuery } from 'src/app/API.service';
import { Person } from 'src/app/models/person';
import { Member } from 'src/app/models/member';
import { Team } from 'src/app/models/team';

let _state: UserProfileState = {
    profile: null,
    loading: false,
    error: null
}

@Injectable({
    providedIn: 'root'
})
export class UserProfileFacade {
    private currentState = new BehaviorSubject<UserProfileState>(_state);
    private currentState$ = this.currentState.asObservable();

    public profile$: Observable<IUserProfile> = this.currentState$.pipe(map(state => state.profile), distinctUntilChanged());
    public loading$: Observable<boolean> = this.currentState$.pipe(map(state => state.loading), distinctUntilChanged());
    public error$: Observable<any> = this.currentState$.pipe(map(state => state.error), distinctUntilChanged());

    constructor(private apiService: APIService){        
    }

    getStateSnapshot() {
        return { ..._state };
    }

    async loadUserProfile(email: string) {
        let profile: IUserProfile = {
            email: email,
            personId: null,
            firstName: null,
            lastName: null,
            memberId: null,
            teamId: null,
        }
        this.setLoading();        
        const person: Person = await this.loadPerson(email);
        const member: Member = await this.loadMember(person);
        const team: Team = await this.loadTeam(member);
        if(!!person) {
            profile = {...profile, personId: person.id, firstName: person.firstName, lastName: person.lastName};
        }
        if(!!member) {
            profile = {...profile, memberId: member.id};
        }
        if(!!team) {
            profile = {...profile, teamId: team.id};
        }
        this.updateState({..._state, profile: profile, loading: false});
    }

    private loadPerson(email: string): Person {
        let person: Person = null;
        this.apiService.ListPersons({email: {eq: email}}, 1)
        .then((persons: ListPersonsQuery) => {
            if(!!persons.items && persons.items.length > 0) {
                person = {
                    id: persons.items[0].id,
                    firstName: persons.items[0].firstname,
                    lastName: persons.items[0].lastname,
                    email: persons.items[0].email
                }
            }
        })
        .catch((err) => {
            this.updateState({profile: null, loading: false, error: err});        
        });
        return person;
    }

    private loadMember(person: Person): Member {
        let member: Member = null;
        if(!person || !person.id) {
            return member;
        }
        this.apiService.ListMembers({personID: {eq: person.id}}, 1)
        .then((members: ListMembersQuery) => {
            if(!!members.items && members.items.length > 0) {
                member = {
                    id: members.items[0].id,
                    personId: members.items[0].personID,
                    teamId: members.items[0].teamID
                }
            }
        })
        .catch((err) => {
            this.updateState({..._state, loading: false, error: err});
        });
    }

    private loadTeam(member: Member): Team {
        let team: Team = null;
        if(!member || !member.id) {
            return team;
        }
        this.apiService.GetTeam(member.teamId)
        .then((t: GetTeamQuery) => {
            if(!!t) {
                team = {
                    id: t.id,
                    name: t.name
                }
            }
        })
        .catch((err) => {
            this.updateState({..._state, loading: false, error: err});
        });
        return team;
    }

    private updateState(state: UserProfileState) {
        this.currentState.next(_state = state);
    }

    private setLoading(isLoading = true) {
        this.updateState({ ..._state, loading: isLoading });
    }

    private setError(err: any) {
        this.updateState({ ..._state, error: err });
    }

}