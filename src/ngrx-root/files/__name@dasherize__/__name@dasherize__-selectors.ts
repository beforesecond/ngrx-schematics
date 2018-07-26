import { createSelector, MemoizedSelector } from '@ngrx/store';

import { FeatureStoreSelectors } from './feature-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
  FeatureStoreSelectors.selectFeatureError,
  (Error: string) => {
    return Error;
  }
);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
  FeatureStoreSelectors.selectFeatureIsLoading,
  (loading: boolean) => {
    return loading;
  }
);

