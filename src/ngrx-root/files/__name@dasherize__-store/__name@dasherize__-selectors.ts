import { createSelector, MemoizedSelector } from '@ngrx/store';

import { FeatureSelectors } from './feature-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
  FeatureSelectors.selectFeatureError,
  (Error: string) => {
    return Error;
  }
);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
  FeatureSelectors.selectFeatureIsLoading,
  (loading: boolean) => {
    return loading;
  }
);

