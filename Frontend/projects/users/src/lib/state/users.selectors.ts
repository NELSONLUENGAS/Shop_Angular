import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, UsersState } from './users.reducer';

// Lookup the 'Users' feature state managed by NgRx
export const getUserState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const getUser = createSelector(getUserState, state => state.user);

export const getUserIsAuth = createSelector(getUserState, state => state.isAuthenticated);
