import { Injectable } from '@angular/core';
import { UserProfileState } from './user-profile.state';
import { BehaviorSubject, Observable, from, EMPTY, of } from 'rxjs';
import { UserProfile } from 'src/app/models/user-profile';
import { map, mergeMap, distinctUntilChanged } from 'rxjs/operators';
import { APIService, ListPersonsQuery, ListMembersQuery, GetTeamQuery, ListTeamsQuery, CreatePersonMutation, UpdatePersonMutation, CreateMemberMutation, UpdateMemberMutation } from 'src/app/API.service';
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
                    profile = this.updatePersonInProfile(person, profile);
                    return this.loadMember(person.id)
                } else {                    
                    this.updateState({..._userProfileState, teams, profile, loading: false});
                    return EMPTY;
                }
            }),
            mergeMap((member: Member) => {
                if(!!member) {
                    profile = this.updateMemberInProfile(member, profile);
                    return this.loadTeam(member.teamId);
                } else {
                    this.updateState({..._userProfileState, teams, profile, loading: false});
                    return EMPTY;
                }
            }),             
            ).subscribe((team: Team) => {
                if(!!team) {
                    profile = this.updateTeamInProfile(team, profile);
                }
                this.updateState({..._userProfileState, teams, profile, loading: false});
            });        
    }

    saveUserProfile(profile: UserProfile): void {
        this.setLoading();
        this.createOrUpdatePerson({
            id: profile.person.id,
            firstName: profile.person.firstName,
            lastName: profile.person.lastName,
            email: profile.person.email
        }).pipe(mergeMap((person: Person) => {
            let m: Observable<Member> = EMPTY;
            if(!!person) {
                profile = this.updatePersonInProfile(person, profile);
                if(!!profile.member.teamId) {
                    m = this.createOrUpdateMember({id: profile.member.id, personId: profile.person.id, teamId: profile.team.id});
                } else {
                    this.updateState({..._userProfileState, profile, loading: false});
                }               
            }
            return m;
        }),
        mergeMap((member: Member) => {
            let t: Observable<Team> = EMPTY
            if(!!member) {
                profile = this.updateMemberInProfile(member, profile);
                t = this.loadTeam(member.teamId);
            }
            return t;
        })        
        ).subscribe((team: Team) => {
            if(!!team) {
                profile = this.updateTeamInProfile(team, profile);                
            }
            this.updateState({..._userProfileState, profile, loading: false});
        });
    }

    private createOrUpdateMember(member: Member): Observable<Member> {
        let savedMember$: Observable<Member> = EMPTY;
        if(!!member) {
            if(!!member.id) {
                savedMember$ = this.updateMember(member);
            } else {
                savedMember$ = this.createMember(member);
            }
        }
        return savedMember$;
    }

    private createMember(member: Member): Observable<Member> {
        return from(this.apiService.CreateMember({personID: member.personId, teamID: member.teamId, name: 'default'}))
        .pipe(map((m: CreateMemberMutation)=> {
            let createdMember: Member = null;
            if(!!m) {
                createdMember = {
                    id: m.id,
                    personId: m.personID,
                    teamId: m.teamID
                }
            }
            return createdMember;
        }));
    }

    private updateMember(member: Member): Observable<Member> {
        return from(this.apiService.UpdateMember({id: member.id, personID: member.personId, teamID: member.teamId}))
        .pipe(map((m: UpdateMemberMutation)=>{
            let updatedMember: Member = null;
            if(!!m) {
                updatedMember = {
                    id: m.id,
                    personId: m.personID,
                    teamId: m.teamID
                }
            }
            return updatedMember;
        }));
    }

    private createOrUpdatePerson(person: Person): Observable<Person> {
        let savedPerson$: Observable<Person> = EMPTY;
        if(!!person) {
            if(!!person.id) {
                savedPerson$ = this.updatePerson(person);
            } else {
                savedPerson$ = this.createPerson(person);
            }
        }
        return savedPerson$;
    }

    private createPerson(person: Person): Observable<Person> {
        return from(this.apiService.CreatePerson({firstname: person.firstName, lastname: person.lastName, email: person.email}))
        .pipe(map((p: CreatePersonMutation) => {
            let createdPerson: Person = null;
            if(!!p) {
                createdPerson = {
                    id: p.id,
                    firstName: p.firstname,
                    lastName: p.lastname,
                    email: p.email
                }
            }
            return createdPerson;
        }));
    }

    private updatePerson(person: Person): Observable<Person> {
        return from(this.apiService.UpdatePerson({id: person.id, firstname: person.firstName, lastname: person.lastName, email: person.email}))
        .pipe(map((p: UpdatePersonMutation) => {
            let updatedPerson: Person = null;
            if(!!p) {
                updatedPerson = {
                    id: p.id,
                    firstName: p.firstname,
                    lastName: p.lastname,
                    email: p.email
                }
            }
            return updatedPerson;
        }));
    }

    private emptyProfile(userEmail: string): UserProfile {
        return {
            person: {
            email: userEmail,
            id: null,
            firstName: null,
            lastName: null, },
            member: {
                id: null,
                personId: null,
                teamId: null
            },
            team: {
                id: null,
                name: null
            }

        }
    }

    private updatePersonInProfile(person: Person, profile: UserProfile): UserProfile {
        return {
            ...profile, 
            person
        }
    }

    private updateMemberInProfile(member: Member, profile: UserProfile): UserProfile {
        return {
            ...profile,
            member
        }
    }

    private updateTeamInProfile(team: Team, profile: UserProfile): UserProfile {
        return {
            ...profile,
            team
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
        return from(this.apiService.GetTeam(teamId)).pipe(map((t: GetTeamQuery) => {
            let team: Team = null;
            if(!!t) {
                team = {
                    id: t.id,
                    name: t.name
                };
            }
            return team;
        }));
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