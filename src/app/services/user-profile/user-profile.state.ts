import { IUserProfile } from 'src/app/models/user-profile';

export class UserProfileState {
    profile: IUserProfile;
    loading: boolean;
    error: any;
}