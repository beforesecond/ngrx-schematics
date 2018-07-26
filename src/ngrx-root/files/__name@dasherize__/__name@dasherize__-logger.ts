import {
    ActionReducerMap,
    ActionReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { storeLogger } from 'ngrx-store-logger';

export interface State {
    id?: any;
}

export const reducers: ActionReducerMap<State> = {
};

export function logger(reducer: ActionReducer<State>): any {
    // default, no options
    return storeLogger()(reducer);
}

export const metaReducers = environment.production ? [] : [logger];