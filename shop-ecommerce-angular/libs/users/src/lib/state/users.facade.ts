import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';

@Injectable()
export class UsersFacade {
  currentUser$ =  this.store.pipe(select(UsersSelectors.getUser));
  isAuthenticated$ =  this.store.pipe(select(UsersSelectors.getUserIsAuth));

  constructor(private readonly store: Store) {}

  buildUsersSession() {
    this.store.dispatch(UsersActions.buildUsersSession());
  }
}
