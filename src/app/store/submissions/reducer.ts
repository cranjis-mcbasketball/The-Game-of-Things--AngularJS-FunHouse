import { Action, createReducer, on } from "@ngrx/store";
import { HttpClient } from "@angular/common/http";
import * as SubmissionsActions from "./actions";
import { Submissions } from "./models";
; import { FormGroupState, createFormGroupState, createFormStateReducerWithUpdate, formGroupReducer, updateGroup, validate } from 'ngrx-forms';

import { onNgrxForms, onNgrxFormsAction, wrapReducerWithFormStateUpdate } from 'ngrx-forms';

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
    return { ...state, Submissions: [...state.Submissions], SubmissionsError: null };
  }),

  on(SubmissionsActions.CreateSubmissionsAction, (state: SubmissionsState, submissions: Submissions) => {
    return { ...state, Submissions: [...state.Submissions, submissions], SubmissionsError: null };
  }),

  // on(SubmissionsActions.SuccessCreateSubmissionsAction, (state: SubmissionsState, submissions: Submissions) => {
  //   return { ...state, Submissions: [...state.Submissions, submissions], SubmissionsError: null };
  // }),

  // onNgrxFormsAction(SubmissionsActions.CreateSubmissionsAction, (state: SubmissionsState, submissions: Submissions[]) => {
  //   return { ...state, Submissions: [...state.Submissions, submissions], SubmissionsError: null };
  // }),

  // on(SubmissionsActions.SuccessCreateSubmissionsAction, (state: SubmissionsState, { payload }) => {
  //   return { ...state, Submissions: [...state.Submissions, payload], SubmissionsError: null };
  // }),



);

export function SubmissionsReducer(
  state: SubmissionsState | undefined,
  action: Action,
): SubmissionsState {
  return reducer(state, action);
}


// const SubmissionsReducer = createFormStateReducerWithUpdate<Submissions>(validateAndUpdateFormState);

// export function appReducer(state = initialState, action: Action): SubmissionsState {
//   const Submissions = SubmissionsReducer(state.Submissions, action);



//   switch (action.type) {
//     case 'some action type':
//       // modify state
//       return { ...state, Submissions: [...state.Submissions, submissions]}

//     default: {
//       return state;
//     }
//   }
// }


