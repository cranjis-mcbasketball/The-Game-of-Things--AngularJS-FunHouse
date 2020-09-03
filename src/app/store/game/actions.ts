// import { Injectable } from "@angular/core";
import { Action, createAction, props } from "@ngrx/store";

import { PromptItem } from "./models";



export const newRoundAction = createAction("[Prompt] - Get Prompt");

export const NewRoundAction = createAction(
  "[NewRound] NewRoundAction",
);

export const NewGameAction = createAction(
  "[NewGame] NewGameAction",
);

export const BeginnewPromptAction = createAction("[Prompt] - Begin Get Prompt");

export const SuccessnewPromptAction = createAction(
  "[Prompt] - Success Get Prompt",
  props<{ payload: PromptItem }>(),
);

export const ErrorGameAction = createAction("[Game] - Error", props<Error>());
