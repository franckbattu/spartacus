import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromStore from './../store';
import * as fromAuthStore from '@auth/store';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<fromStore.UserState>,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(fromAuthStore.getUserToken).pipe(
      map(token => {
        if (!token.access_token) {
          this.router.navigate(['/']);
        }
        return !!token.access_token;
      })
    );
  }
}
