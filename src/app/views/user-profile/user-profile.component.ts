import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserProfileFacade } from 'src/app/services/user-profile/user-profile.facade';
import { NotificationService } from 'src/app/services/notification.service';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder } from 'ngx-strongly-typed-forms';
import { UserProfile } from 'src/app/models/user-profile';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Team } from 'src/app/models/team';
import { UserFacade } from 'src/app/services/user/user.facade';
import { Person } from 'src/app/models/person';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfileForm: FormGroup<UserProfile>;
  onDestroy = new Subject();

  get firstNameInput() { return this.userProfileForm.get('person').get('firstName'); }
  get lastNameInput() { return this.userProfileForm.get('person').get('lastName'); }
  get teamNameInput() { return this.userProfileForm.get('team').get('name'); }
  get allTeams() { return this.userProfileFacade.teams$; }

  constructor(private userFacade: UserFacade, private userProfileFacade: UserProfileFacade, private formBuilder: FormBuilder, private notificationService: NotificationService) {
    this.userProfileForm = this.formBuilder.group<UserProfile>({
      person: this.formBuilder.group<Person>({
        id: new FormControl(''),
        email: new FormControl('', Validators.required),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
      }),
      member: this.formBuilder.group<Member>({
        id: new FormControl(''),
        personId: new FormControl(''),
        teamId: new FormControl(''),
      }),
      team: this.formBuilder.group<Team>({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
      })      
    });
  }

  public ngOnInit(): void {
    this.userProfileFacade.profile$
      .pipe(takeUntil(this.onDestroy))
      .subscribe((userProfile: UserProfile) => {
        this.updateForm(userProfile);
      });
    
    this.userProfileFacade.error$
            .pipe(takeUntil(this.onDestroy))
            .subscribe((error: any) => {
                if (error) {
                    if (error.message) {
                        this.notificationService.show(error.message);
                    } else {
                        this.notificationService.show(error);
                    }
                }
            });
    const currentUser = this.userFacade.getStateSnapshot().currentUser;
    this.userProfileFacade.loadUserProfile(currentUser.attributes.email);
  }

  public ngOnDestroy(): void {
    this.onDestroy.next();
  }

  public getFirstNameInputError(): string {
    let error = null;
    if(this.firstNameInput.hasError('required')) {
      error = 'The first name is required.'
    }
    return error;
  }

  public getLastNameInputError(): string {
    let error = null;
    if(this.lastNameInput.hasError('required')) {
      error = 'The last name is required.'
    }
    return error;
  }

  public getTeamNameInputError(): string {
    let error = null;
    if(this.teamNameInput.hasError('required')) {
      error = 'The team is required.'
    }
    return error;
  }

  public onTeamSelect(team: Team) {
    this.userProfileForm.get('team').patchValue({
      ...team
    });
  }

  public onSave() {
    const profile: UserProfile = {
      ...this.userProfileForm.value,
      member: {
        id: this.userProfileForm.value.member.id,
        personId: this.userProfileForm.value.person.id,
        teamId: this.userProfileForm.value.team.id
      }
    };    
    this.userProfileFacade.saveUserProfile(profile);
  }

  private updateForm(userProfile: UserProfile): void {
    this.userProfileForm.patchValue({
      ...userProfile
    });
  }

}
