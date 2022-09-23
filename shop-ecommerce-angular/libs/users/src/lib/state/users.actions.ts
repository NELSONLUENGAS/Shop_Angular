import { createAction, props } from '@ngrx/store';
import { UsersEntity } from './users.models';

export const buildUsersSession = createAction(
  '[Users] Build user Session'
);

export const buildUsersSessionSuccess = createAction(
  '[Users] Build user Session Success',
  props<{ user: UsersEntity }>()
);

export const buildUsersSessionFailed = createAction(
  '[Users]Build user Session Failure'
);
