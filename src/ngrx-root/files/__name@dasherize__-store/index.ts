import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
  } from '@ngrx/store';
import { <%= classify(name) %>StoreModule } from './<%=dasherize(name)%>-store.module';
import * as <%= classify(name) %>StoreSelectors from './<%=dasherize(name)%>-selectors';
import * as <%= classify(name) %>StoreState from './<%=dasherize(name)%>-state';

export * from './feature-store'; 

export { <%= classify(name) %>StoreState, <%= classify(name) %>StoreSelectors, <%= classify(name) %>StoreModule };