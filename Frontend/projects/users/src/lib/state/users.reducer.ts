import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { UsersEntity } from './users.models';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState extends EntityState<UsersEntity> {
  user: UsersEntity | null,
  isAuthenticated: boolean
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const userAdapter: EntityAdapter<UsersEntity> = createEntityAdapter<UsersEntity>();

export const initialUsersState: UsersState = userAdapter.getInitialState({
  user: null,
  isAuthenticated: false
});

const reducer = createReducer(
  initialUsersState,
  on(UsersActions.buildUsersSession,
    state => ({ ...state })
  ),
  on(UsersActions.buildUsersSessionSuccess,
    (state, { user }) => ({ ...state, isAuthenticated: true, user })
  ),
  on(UsersActions.buildUsersSessionFailed,
    state => ({ 
      ...state,
      user: null,
      isAuthenticated: false
    })
  ),
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return reducer(state, action);
}
