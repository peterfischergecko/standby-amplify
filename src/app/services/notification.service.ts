import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(private toast: MatSnackBar) { }

    show(message: string, buttonLabel: string = 'OK'): MatSnackBarRef<any> {
        const timeout = 8000;
        if (timeout > 0) {
            return this.toast.open(message, buttonLabel, { duration: timeout });
        } else {
            return this.toast.open(message, buttonLabel, {});
        }
    }
}
