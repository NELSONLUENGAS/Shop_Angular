import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, concatMap, catchError, of } from 'rxjs';
import { LocalStorageService } from '../Services/local-storage.service';
import { UserService } from '../Services/user.service';

import * as UsersActions from './users.actions';
// import * as UsersFeature from './users.reducer';

@Injectable()
export class UsersEffects {
  buildIUserSession$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.buildUsersSession),
    concatMap( ()=> {
      if(!this.localStorage.isValidToken()){
        const userId = this.localStorage.getUserIdFromToken();
        if(userId){
          return this.usersService.getUserById(userId)
            .pipe(
              map(user => UsersActions.buildUsersSessionSuccess({user: user.data})),
              catchError(() => of(UsersActions.buildUsersSessionFailed()))
            )
        }else{
          return of(UsersActions.buildUsersSessionFailed());
        }
      }else{
        return of(UsersActions.buildUsersSessionFailed());
      }
    })
  ));

  constructor(
    private readonly actions$: Actions,
    private localStorage: LocalStorageService,
    private usersService: UserService,
  ) {}
}
