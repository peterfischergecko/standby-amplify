import { UserProfile } from 'src/app/models/user-profile';

export class UserProfileState {
    profile: UserProfile;
    loading: boolean;
    error: any;
}