import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';

export function <%= classify(name) %>Reducer(state = initialState, action: Actions): State {
   switch (action.type) {
      case ActionTypes.<%= classify(name) %>_REQUEST:
        return {
          ...state,
          error: null,
          isLoading: true
        };
      case ActionTypes.<%= classify(name) %>_SUCCESS:
        return {
          ...state,
          data: action.payload.data,
          error: null,
          isLoading: false,

        };
      case ActionTypes.<%= classify(name) %>_FAILURE:
        return {
          ...state,
          error: action.payload.error,
          isLoading: false
        };
      default: {
         return state;
      }
    }
 }