import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { IAppState, selectResourcesSucceeded } from '../app-state.interface';
import { ResourcesActions } from './resources.actions';
import { ResourcesService } from '../../../shared/services/resources.service';

@Injectable()
export class IndicationAgEffects {
  constructor(
    private readonly resourcesService: ResourcesService,
    private readonly actions$: Actions,
    private readonly store: Store<IAppState>
  ) { }

  /**
   * Effect to get the resources of the application.
   */
  @Effect()
  get$ = this.actions$.pipe(
    ofType<ResourcesActions.Load>(ResourcesActions.LOAD),
    switchMap(() =>
      this.resourcesService.get().pipe(
        map(resources => new ResourcesActions.LoadComplete(resources)),
        catchError(err => of(new ResourcesActions.LoadError(err)))
      )
    )
  );

  /**
   * Effect to get the resources from cache if available, otherwise return a LOAD action.
   */
  @Effect()
  getFromCache$ = this.actions$.pipe(
    ofType<ResourcesActions.LoadFromCache>(ResourcesActions.LOAD_FROM_CACHE),
    withLatestFrom(this.store.pipe(select(selectResourcesSucceeded))),
    filter(([_, resourcesSucceeded]) => !resourcesSucceeded),
    map(() => new ResourcesActions.Load())
  );
}
