import { Submissions } from "./models";
import { FormGroupState, createFormGroupState, createFormStateReducerWithUpdate, formGroupReducer, updateGroup, validate } from 'ngrx-forms';

export class SubmissionsState {
  Submissions: Array<Submissions>;
  SubmissionsError: Error;
}

// const FORM_ID = 'some globally unique string';

// const initialSubmissionstate = createFormGroupState<Submissions>(FORM_ID, {
//   userName: '',
//   userResponse: ''
// });

// const initialState: SubmissionsState = {
//   Submissions: []

// };



// const validateAndUpdateFormState = updateGroup<Submissions>({
//   return { ...state, Submissions: [...state.Submissions, submissions] }

// });

export const initializeState = (): SubmissionsState => {
  return {
    Submissions: [], SubmissionsError: null
  };
};
