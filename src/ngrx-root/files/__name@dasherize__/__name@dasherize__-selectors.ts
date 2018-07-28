import { createSelector, MemoizedSelector } from '@ngrx/store';

export const selectError: MemoizedSelector<object, string> = createSelector(
  (): any => 'error',
  (Error: string) => {
    return Error;
  }
);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
  (): any => false,
  (loading: boolean) => {
    return loading;
  }
);

