import { UserProfile } from 'src/app/models/user-profile';
import { Team } from 'src/app/models/team';

export class UserProfileState {
    profile: UserProfile;
    teams: Team[];
    loading: boolean;
    error: any;
}