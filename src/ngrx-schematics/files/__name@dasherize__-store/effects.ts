import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
//import { DataService } from '../../services/data.service';
import * as featureActions from './actions';

@Injectable()
export class <%= classify(name) %>Effects {

    constructor(private actions$: Actions) { }

    @Effect()
    <%= classify(name) %>RequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<featureActions.<%= classify(name) %>RequestAction>(
            featureActions.ActionTypes.<%= classify(name) %>_REQUEST
        ),
        switchMap(action =>
            observableOf(new featureActions.<%= classify(name) %>SuccessAction({
                data: { "action": "Hello NGRX" }
            }))
        )
    )
}