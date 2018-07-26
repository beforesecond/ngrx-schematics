import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
  } from '@ngrx/store';
import { <%= classify(name) %>Module } from './<%=dasherize(name)%>.module';
import * as <%= classify(name) %>Selectors from './<%=dasherize(name)%>-selectors';
import * as <%= classify(name) %>State from './<%=dasherize(name)%>-state';

export * from './feature-store'; 

export { <%= classify(name) %>State, <%= classify(name) %>Selectors, <%= classify(name) %>Module };