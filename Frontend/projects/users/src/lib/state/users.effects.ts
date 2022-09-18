import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
// import { fetch } from '@nrwl/angular';
import { of, concatMap, map, catchError} from 'rxjs';
import { User } from 'src/app/Models/users';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { UsersService } from '../users.service';

import * as UsersActions from './users.actions';

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
    private usersService: UsersService,
  ) {}
}
