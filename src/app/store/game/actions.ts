// import { Injectable } from "@angular/core";
import { Action, createAction, props } from "@ngrx/store";

import { FragmentItem, PromptItem, PromptAndOptions, AppState } from "./models";
// import { Http } from "@angular/http";

export const NEW_GAME = "NEW_GAME";

export const NEW_ROUND = "NEW_ROUND";

export const GetPromptAction = createAction("[Prompt] - Get Prompt");

export const NewRoundAction = createAction(
  "[NewRound] NewRoundAction",
  // props<{ roundNum: number }>(),
);

export const BeginGetPromptAction = createAction("[Prompt] - Begin Get Prompt");

export const SuccessGetPromptAction = createAction(
  "[Prompt] - Success Get Prompt",
  props<{ payload: PromptItem[] }>(),
);

export const ErrorGameAction = createAction("[Game] - Error", props<Error>());
