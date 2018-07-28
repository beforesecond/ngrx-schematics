import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
  } from '@ngrx/store';
import { <%= classify(name) %>Module } from './<%=dasherize(name)%>.module';
import * as <%= classify(name) %>Selectors from './<%=dasherize(name)%>-selectors';
import * as <%= classify(name) %>State from './<%=dasherize(name)%>-state';

// Don't Remove Comment,because it should't generate NGRX. //
/// export ///

export { <%= classify(name) %>State, <%= classify(name) %>Selectors, <%= classify(name) %>Module };