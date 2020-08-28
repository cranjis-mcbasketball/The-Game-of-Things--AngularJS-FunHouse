import {ActionEx, WinnerActionTypes} from './winner-history.actions';
export const initialState = [];
export function WinnerReducer(state = initialState, action: ActionEx) {
  switch (action.type) {
    case WinnerActionTypes.Add:
      return [...state, action.payload];
    case WinnerActionTypes.Remove:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ];
    default:
      return state;
  }
}
