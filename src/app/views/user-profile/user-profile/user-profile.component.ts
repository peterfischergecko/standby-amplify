import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserProfileFacade } from 'src/app/services/user-profile/user-profile.facade';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder } from 'ngx-strongly-typed-forms';
import { UserProfile } from 'src/app/models/user-profile';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfileForm: FormGroup<UserProfile>;

  onDestroy = new Subject();

  constructor(private userProfileFacade: UserProfileFacade, private formBuilder: FormBuilder,) {
    this.userProfileForm = this.formBuilder.group<UserProfile>({
      personId: new FormControl(''),
      email: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      memberId: new FormControl('', ),
      teamId: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

}
