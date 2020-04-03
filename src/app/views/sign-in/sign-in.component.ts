import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from 'ngx-strongly-typed-forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordErrorStateMatcher } from 'src/app/helper/password-error-state-matcher';
import { NotificationService } from 'src/app/services/notification.service';
import { ISignInUser } from 'src/app/models/signinuser';
import { UserFacade } from 'src/app/services/user/user.facade';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export enum SignInErrorResponse {
    NotAuthorizedException = 'NotAuthorizedException',
    UserNotConfirmedException = 'UserNotConfirmedException',
    UsernameExistsException = 'UsernameExistsException',
    UserNotFoundException = 'UserNotFoundException'
}

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {
    signInForm: FormGroup<ISignInUser>;

    hide = true;
    newPasswordRequired: boolean;
    passwordErrorStateMatcher = new PasswordErrorStateMatcher();

    onDestroy = new Subject();

    get emailInput() { return this.signInForm.get('email'); }
    get passwordInput() { return this.signInForm.get('password'); }
    get confirmPasswordInput() { return this.signInForm.get('confirmPassword'); }

    constructor(
        public userFacade: UserFacade,
        private router: Router,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService) {
        this.signInForm = this.formBuilder.group<ISignInUser>({
            email: new FormControl('', Validators.required),
            password: new FormControl('', [Validators.required, Validators.minLength(8)])
        });
    }

    ngOnInit(): void {
        this.userFacade.error$
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

        this.userFacade.newPasswordRequired$
            .pipe(takeUntil(this.onDestroy))
            .subscribe((required) => {
                if (required) {
                    this.signInForm = this.formBuilder.group<ISignInUser>({
                        email: new FormControl(this.emailInput.value , [Validators.required]),
                        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
                        confirmPassword: new FormControl('', [Validators.required])
                    }, { validator: this.passwordsEqual });
                }
            });
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
    }

    getEmailInputError() {
        if (this.emailInput.hasError('email')) {
            return 'Please enter a valid email address.';
        }

        if (this.emailInput.hasError('required')) {
            return 'An email is required';
        }
    }

    getPasswordInputError() {
        if (this.passwordInput.hasError('required')) {
            return 'A password is required.';
        }
    }

    getConfirmPasswordInputError() {
        if (this.confirmPasswordInput.hasError('required')) {
            return 'Please confirm your password.';
        }

        if (this.confirmPasswordInput.hasError('notEqual')) {
            return 'Passwords do not match.';
        }
    }

    signIn() {
        this.userFacade.signIn(this.emailInput.value, this.passwordInput.value);

        // if (this.newPasswordRequired && this.currentUser) {
        //     try {
        //         const result = await Auth.completeNewPassword(this.currentUser, this.confirmPasswordInput.value, {});
        //         console.log(result);
        //         this.router.navigate(['home']);
        //     } catch (error) {
        //         this.notificationService.show(error);
        //     }

        //     this.loading = false;
        // } else {

        //     this.auth.signIn(this.emailInput.value, this.passwordInput.value)
        //         .then((user: CognitoUser | any) => {
        //             this.currentUser = user;
        //             console.log(user);
        //             if (user.challengeName === 'SMS_MFA' ||
        //                 user.challengeName === 'SOFTWARE_TOKEN_MFA') {
        //                 console.log('UNHANDLED CHALLANGE => ' + user.challengeName);
        //             } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        //                 this.signInForm = this.formBuilder.group<ISignInUser>({
        //                     email: new FormControl(this.emailInput.value , [Validators.required]),
        //                     password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        //                     confirmPassword: new FormControl('', [Validators.required])
        //                 }, { validator: this.passwordsEqual });
        //                 this.newPasswordRequired = true;
        //             }
        //             this.loading = false;
        //             this.router.navigate(['home']);
        //         })
        //         .catch((error: any) => {
        //             this.notificationService.show(error.message);
        //             this.loading = false;
        //         });
        // }
    }

    passwordsEqual(group: FormGroup<ISignInUser>) {
        const pass = group.controls.password.value;
        const confirmPass = group.controls.confirmPassword.value;

        return pass === confirmPass ? null : { notEqual: true };
    }
}
