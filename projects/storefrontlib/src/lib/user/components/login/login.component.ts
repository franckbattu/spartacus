import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { Store } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromAuthStore from '@auth/store';
import { tap, map, take, filter } from 'rxjs/operators';
import * as fromRouting from '../../../routing/store';
import { UserToken } from '../../../auth/models/token-types.model';

@Component({
  selector: 'y-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  user$: Observable<any> = this.store.select(fromStore.getDetails);
  isLogin = false;

  username: string;
  password: string;
  rememberMe: boolean;

  subscription: Subscription;

  constructor(
    protected dialog: MatDialog,
    private store: Store<fromStore.UserState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select(fromAuthStore.getUserToken)
      .pipe(
        filter((token: UserToken) => !this.isLogin),
        tap((token: UserToken) => {
          if (token.access_token !== undefined) {
            this.isLogin = true;
            this.store.dispatch(new fromStore.LoadUserDetails(token.userId));
            this.store.dispatch(new fromStore.Login());
          }
        })
      )
      .subscribe();
  }

  openLogin() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      data: {
        username: this.username,
        password: this.password,
        rememberMe: this.rememberMe
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.username = result.username;
      this.password = result.password;
      this.rememberMe = result.rememberMe;

      if (this.username !== undefined && this.password !== undefined) {
        this.login();
      }
    });
  }

  logout() {
    this.isLogin = false;
    this.store.dispatch(new fromStore.Logout());

    this.store
      .select(fromRouting.getRouterState)
      .pipe(
        filter(routerState => routerState !== undefined),
        map(routerState => routerState.state.context),
        take(1)
      )
      .subscribe(pageContext => {
        if (pageContext.id === 'multiStepCheckoutSummaryPage') {
          this.store.dispatch(
            new fromRouting.Go({
              path: ['']
            })
          );
        }
      });
  }

  login() {
    this.store.dispatch(
      new fromAuthStore.LoadUserToken({
        userId: this.username,
        password: this.password
      })
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
