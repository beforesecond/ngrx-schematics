import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './state';

export const select<%= classify(name) %>State: MemoizedSelector<object, State> = createFeatureSelector<State>('<%= classify(name) %>');

export const select<%= classify(name) %>Error: MemoizedSelector<object, any> = createSelector(
    select<%= classify(name) %>State,
    (state: State): any => state.error
);

export const select<%= classify(name) %>IsLoading: MemoizedSelector<object, boolean> = createSelector(
    select<%= classify(name) %>State,
    (state: State): any => state.isLoading);

export const select<%= classify(name) %>User: MemoizedSelector<object, any> = createSelector(
    select<%= classify(name) %>State,
    (state: State): any => state.data);