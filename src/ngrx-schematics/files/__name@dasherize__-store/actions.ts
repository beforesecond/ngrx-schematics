import { Action } from '@ngrx/store';

export enum ActionTypes {
  <%= classify(name) %>_REQUEST = '[<%= classify(name) %>] <%= classify(name) %> Request',
  <%= classify(name) %>_FAILURE = '[<%= classify(name) %>] <%= classify(name) %> Failure',
  <%= classify(name) %>_SUCCESS = '[<%= classify(name) %>] <%= classify(name) %> Success'
}

export class <%= classify(name) %>RequestAction implements Action {
  readonly type = ActionTypes.<%= classify(name) %>_REQUEST;
}

export class <%= classify(name) %>FailureAction implements Action {
  readonly type = ActionTypes.<%= classify(name) %>_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class <%= classify(name) %>SuccessAction implements Action {
  readonly type = ActionTypes.<%= classify(name) %>_SUCCESS;
  constructor(public payload: { data: any }) {}
}

export type Actions = <%= classify(name) %>RequestAction | <%= classify(name) %>FailureAction | <%= classify(name) %>SuccessAction;