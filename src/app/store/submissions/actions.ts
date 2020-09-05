// import { Injectable } from "@angular/core";
import { Action, createAction, props } from "@ngrx/store";

import { Submissions } from "./models";


export const GetSubmissionsAction = createAction('[Submissions] - Get Submissions');


export const BeginGetSubmissionsAction = createAction('[Submissions] - Begin Get Submissions');

export const SuccessGetSubmissionsAction = createAction(
  '[Submissions] - Sucess Get Submissions',
  props<{ payload: Submissions[] }>()
);

// export const CreateSubmissionsAction = createAction(
//   '[Submissions] - Create Submissions',
//   props<Submissions>()
// );

export const CreateSubmissionsAction = createAction(
  '[Submissions] - Create Submissions',
  props<Submissions>()
);

export const BeginCreateSubmissionsAction = createAction(
  '[Submissions] - Begin Create Submissions',
  props<{ payload: Submissions }>()
);

export const SuccessCreateSubmissionsAction = createAction(
  '[Submissions] - Sucess Create Submissions',
  props<{ payload: Submissions }>()
);


// export const SuccessCreateSubmissionsAction = createAction(
//   '[Submissions] - Sucess Create Submissions',
//   props<{ Submissions: Submissions }>()
// );

export const ErrorSubmissionsAction = createAction("[Game] - Error", props<Error>());
