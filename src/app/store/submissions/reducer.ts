import { Action, createReducer, on } from "@ngrx/store";
import { HttpClient } from "@angular/common/http";
import * as SubmissionsActions from "./actions";
import { Submissions } from "./models";

// import * as Services from './fragments.actions'

import { SubmissionsState, initializeState } from "./state";

const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(SubmissionsActions.GetSubmissionsAction, state => state),
  on(SubmissionsActions.CreateSubmissionsAction, (state: SubmissionsState, submissions: Submissions) => {
    return { ...state, Submissions: [...state.Submissions, submissions], SubmissionsError: null };
  }),

  on(SubmissionsActions.SuccessGetSubmissionsAction, (state: SubmissionsState, { payload }) => {
    return { ...state, Submissions: payload, SubmissionsError: null };
  }),

  on(SubmissionsActions.CreateSubmissionsAction, (state: SubmissionsState, submissions: Submissions) => {
    return { ...state, Submissions: [...state.Submissions, submissions], SubmissionsError: null };
  }),

  on(SubmissionsActions.SuccessCreateSubmissionsAction, (state: SubmissionsState, { payload }) => {
    return { ...state, Submissions: [...state.Submissions, payload], SubmissionsError: null };
  }),

);

export function SubmissionsReducer(
  state: SubmissionsState | undefined,
  action: Action,
): SubmissionsState {
  return reducer(state, action);
}
