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

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfileForm: FormGroup<UserProfile>;
  onDestroy = new Subject();

  get firstNameInput() { return this.userProfileForm.get('firstName'); }
  get lastNameInput() { return this.userProfileForm.get('lastName'); }
  get teamNameInput() { return this.userProfileForm.get('teamName'); }
  get allTeams() { return this.userProfileFacade.teams$; }

  constructor(private userFacade: UserFacade, private userProfileFacade: UserProfileFacade, private formBuilder: FormBuilder, private notificationService: NotificationService) {
    this.userProfileForm = this.formBuilder.group<UserProfile>({
      personId: new FormControl(''),
      email: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      memberId: new FormControl(''),
      teamId: new FormControl(''),
      teamName: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.userProfileFacade.profile$
      .pipe(takeUntil(this.onDestroy))
      .subscribe(userProfile => {
        this.userProfileForm.patchValue({
          ...userProfile
        });
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

  ngOnDestroy(): void {
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

  public displayFn(team: Team): string {
    return team && team.name ? team.name : '';
  }

}
