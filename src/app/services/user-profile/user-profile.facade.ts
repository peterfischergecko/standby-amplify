import { Injectable } from '@angular/core';
import { UserProfileState } from './user-profile.state';
import { BehaviorSubject, Observable, from, EMPTY, of } from 'rxjs';
import { UserProfile } from 'src/app/models/user-profile';
import { map, mergeMap, distinctUntilChanged } from 'rxjs/operators';
import { APIService, ListPersonsQuery, ListMembersQuery, GetTeamQuery, ListTeamsQuery } from 'src/app/API.service';
import { Person } from 'src/app/models/person';
import { Member } from 'src/app/models/member';
import { Team } from 'src/app/models/team';

let _userProfileState: UserProfileState = {
    profile: null,
    teams: [],
    loading: false,
    error: null
}

@Injectable({
    providedIn: 'root'
})
export class UserProfileFacade {
    private currentUserProfileState = new BehaviorSubject<UserProfileState>(_userProfileState);    
    private currentUserProfileState$ = this.currentUserProfileState.asObservable();
    
    public profile$: Observable<UserProfile> = this.currentUserProfileState$.pipe(map(state => state.profile), distinctUntilChanged());
    public teams$: Observable<Team[]> = this.currentUserProfileState$.pipe(map(state => state.teams), distinctUntilChanged());
    public loading$: Observable<boolean> = this.currentUserProfileState$.pipe(map(state => state.loading), distinctUntilChanged());
    public error$: Observable<any> = this.currentUserProfileState$.pipe(map(state => state.error), distinctUntilChanged());   

    constructor(private apiService: APIService){        
    }

    getStateSnapshot() {
        return { ..._userProfileState };
    }

    loadUserProfile(email: string) {
        let profile: UserProfile = this.emptyProfile(email);
        let teams: Team[] = [];
        this.setLoading();
        this.findTeams().pipe(
            mergeMap((teamz: Team[]) => {
                teams = teamz;
                return this.loadPerson(email);
            }),        
            mergeMap((person: Person) => {                
                if(!!person) {
                    profile = this.updatePerson(person.id, person.firstName, person.lastName, person.email, profile);
                    return this.loadMember(person.id)
                } else {                    
                    this.updateState({..._userProfileState, teams, profile, loading: false});
                    return EMPTY;
                }
            }),
            mergeMap((member: Member) => {
                if(!!member) {
                    profile = this.updateMember(member.id, profile);
                    return this.loadTeam(member.teamId);
                } else {
                    this.updateState({..._userProfileState, teams, profile, loading: false});
                    return EMPTY;
                }
            }),             
            ).subscribe((team: Team) => {
                if(!!team) {
                    profile = this.updateTeam(team.id, team.name, profile);
                }
                this.updateState({..._userProfileState, teams, profile, loading: false});
            });        
    }

    private emptyProfile(userEmail: string): UserProfile {
        return {
            email: userEmail,
            personId: null,
            firstName: null,
            lastName: null,
            memberId: null,
            teamId: null,
            teamName: null,
        }
    }

    private updatePerson(personId: string, email: string, firstName: string, lastName: string, profile: UserProfile): UserProfile {
        return {
            ...profile, 
            personId,
            firstName,
            lastName,
            email
        }
    }

    private updateMember(memberId: string, profile: UserProfile): UserProfile {
        return {
            ...profile,
            memberId
        }
    }

    private updateTeam(teamId: string, teamName: string, profile: UserProfile): UserProfile {
        return {
            ...profile,
            teamId,
            teamName
        }
    }

    private findTeams(): Observable<Team[]> {
        return from(this.apiService.ListTeams()).pipe(map((t: ListTeamsQuery) => {
            let teams: Team[] = [];
            if(!!t && !!t.items) {
                teams = t.items.map(item => {return {id: item.id, name: item.name}})
            }
            return teams;
        }));
    }

    private loadPerson(email: string): Observable<Person> {
        return from(this.apiService.ListPersons({email: {eq: email}}, 1))
        .pipe(map((persons: ListPersonsQuery) => {
            let person: Person = null;
            if(!!persons.items && persons.items.length > 0) {
                person = {
                    id: persons.items[0].id,
                    firstName: persons.items[0].firstname,
                    lastName: persons.items[0].lastname,
                    email: persons.items[0].email
                }
            }
            return person;
        }));
    }

    private loadMember(personId: string): Observable<Member> {
        return from(this.apiService.ListMembers({personID: {eq: personId}}, 1))
        .pipe(map((members: ListMembersQuery) => {
            let member: Member = null;
            if(!!members.items && members.items.length > 0) {
                member = {
                    id: members.items[0].id,
                    personId: members.items[0].personID,
                    teamId: members.items[0].teamID
                }
            }
            return member;
        }));
    }

    private loadTeam(teamId: string): Observable<Team> {        
        return from(this.apiService.GetTeam(teamId));
    }

    private updateState(state: UserProfileState) {
        this.currentUserProfileState.next(_userProfileState = state);
    }

    private setLoading(isLoading = true) {
        this.updateState({ ..._userProfileState, loading: isLoading });
    }

    private setError(err: any) {
        this.updateState({ ..._userProfileState, error: err });
    }

}