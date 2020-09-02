import { Action, createReducer, on } from "@ngrx/store";
import { HttpClient } from "@angular/common/http";
import * as GameActions from "./actions";
import { PromptItem } from "./models";

// import * as Services from './fragments.actions'

import GameState, { initializeState } from "./state";

const initialState = initializeState();

// export const initialState: any = { round: 0, prompt: "nothing to see here!" };

// export const newRoundReducer = createReducer(
//   initialState,
//   // on(GameActions.NewRoundAction, (state: GameState) => ({
//   //   ...state,
//   //   roundNum: state.roundNum++,
//   // })),
//   on(GameActions.NewRoundAction, (state: GameState) => {
//     return { ...state, roundNum: state.roundNum++ };
//   }),
// );

const reducer = createReducer(
  initialState,
  on(GameActions.GetPromptAction, (state) => state),

  on(GameActions.SuccessGetPromptAction, (state: GameState, { payload }) => {
    return { ...state, prompt: payload, gameError: null };
  }),

  // on(GameActions.NewRoundAction, (state: GameState) => {
  //   return { ...state, roundNum: state.roundNum++ };
  // }),

  on(GameActions.NewRoundAction, (state) => {
    console.log("NewRoundAction state", state);
    return { ...state };
    // return state.roundNum++;
  }),

  on(GameActions.ErrorGameAction, (state: GameState, error: Error) => {
    // remove below line and use different telemetry logging
    console.error(error);
    return { ...state, gameError: error };
  }),
);

export function GameReducer(
  state: GameState | undefined,
  action: Action,
): GameState {
  return reducer(state, action);
}
