import { createSelector, MemoizedSelector } from '@ngrx/store';

import { FeatureStoreSelectors } from './feature-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
  FeatureStoreSelectors.selectFeatureStoreError,
  (Error: string) => {
    return Error;
  }
);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
  FeatureStoreSelectors.selectFeatureStoreIsLoading,
  (loading: boolean) => {
    return loading;
  }
);

