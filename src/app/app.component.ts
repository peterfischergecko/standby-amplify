import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserFacade } from './services/user/user.facade';
import { Observable, Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'standby';
  authenticated$: Observable<boolean> = this.userFacade.isAuthenticated$;
  newPasswordRequired$: Observable<boolean> = this.userFacade.newPasswordRequired$;
  authenticated: boolean;
  newPasswordRequired: boolean;
  onDestroy = new Subject();

  constructor(private userFacade: UserFacade) {

  }

  ngOnInit(): void {
    this.authenticated = this.userFacade.getStateSnapshot().isAuthenticated;
    this.newPasswordRequired = this.userFacade.getStateSnapshot().newPasswordRequired;

    this.authenticated$
      .pipe(takeUntil(this.onDestroy))
      .subscribe(value => {
        this.authenticated = value;
      });

    this.newPasswordRequired$
        .pipe(takeUntil(this.onDestroy))
        .subscribe(value => {
          this.newPasswordRequired = value;
        });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

}
