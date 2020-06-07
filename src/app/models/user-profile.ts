import { Team } from './team';
import { Member } from './member';
import { Person } from './person';

export interface UserProfile {
    person: Person,    
    member: Member,
    team: Team,
}