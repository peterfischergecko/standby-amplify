import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { CognitoUser } from 'amazon-cognito-identity-js';
import Auth from '@aws-amplify/auth';
import { PasswordErrorStateMatcher } from 'src/app/helper/password-error-state-matcher';
import { NotificationService } from 'src/app/services/notification.service';

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
export class SignInComponent {
    signInForm: FormGroup;

    hide = true;
    loading = false;
    newPasswordRequired: boolean;
    passwordErrorStateMatcher = new PasswordErrorStateMatcher();
    currentUser: CognitoUser | any;

    get emailInput() { return this.signInForm.get('email'); }
    get passwordInput() { return this.signInForm.get('password'); }
    get confirmPasswordInput() { return this.signInForm.get('confirmPassword'); }

    constructor(
        public auth: AuthService,
        private router: Router,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService) {
        this.signInForm = this.formBuilder.group({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required, Validators.min(6)])
        });
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

    async signIn() {
        this.loading = true;

        if (this.newPasswordRequired && this.currentUser) {
            try {
                const result = await Auth.completeNewPassword(this.currentUser, this.confirmPasswordInput.value, {});
                console.log(result);
                this.router.navigate(['home']);
            } catch (error) {
                this.notificationService.show(error);
            }

            this.loading = false;
        } else {

            this.auth.signIn(this.emailInput.value, this.passwordInput.value)
                .then((user: CognitoUser | any) => {
                    this.currentUser = user;
                    console.log(user);
                    if (user.challengeName === 'SMS_MFA' ||
                        user.challengeName === 'SOFTWARE_TOKEN_MFA') {
                        console.log('UNHANDLED CHALLANGE => ' + user.challengeName);
                    } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                        this.signInForm = this.formBuilder.group({
                            email: new FormControl(this.emailInput.value , [Validators.required]),
                            password: new FormControl('', [Validators.required, Validators.min(6)]),
                            confirmPassword: new FormControl('', [Validators.required, Validators.min(6)])
                        }, { validator: this.passwordsEqual });
                        this.newPasswordRequired = true;
                    }
                    this.loading = false;
                    this.router.navigate(['home']);
                })
                .catch((error: any) => {
                    this.notificationService.show(error.message);
                    this.loading = false;
                });
        }
    }

    passwordsEqual(group: FormGroup) {
        const pass = group.controls.password.value;
        const confirmPass = group.controls.confirmPassword.value;

        return pass === confirmPass ? null : { notEqual: true };
    }
}
