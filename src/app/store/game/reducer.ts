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
    return { ...state, roundNum: state.roundNum++ };
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

// export const gameReducer: ActionReducer<CurrentRound> = (
//   state: CurrentRound = {
//     round: 1,
//     prompt: "nothing to see here!",
//   },
//   // state: {  },
//   action: Action,
// ) => {
//   switch (action.type) {
//     case NEW_ROUND:
//       // return state;
//       return Object.assign({}, state, {
//         round: state.round++,
//         prompt: "placeholder",
//       });

//     // case NEW_GAME:
//     //   return Object.assign({}, state, {
//     //     round: 1,
//     //     prompt: this.getPrompt(),
//     //   });

//     default:
//       return state;
//   }
// };

// export const initialState: any = {
//   game_id: 0,
//   round: 0,
//   prompt: "Nothing to see here!",
// };

// export const newRoundReducer = createReducer(
//   initialState,
//   on(NewRoundAction, (state, { roundNum }) => ({
//     // game_id: state.game_id,
//     // round: state.round++,
//     // prompt: this.getPrompt(),
//     round: state.round,
//   })),
// );

// export const newGameReducer = createReducer(
//   initialState,
//   on(newGameAction, (state) => ({
//     round: 1,
//     prompt: this.getPrompt(),
//   })),
// );

// const initialState: PromptAndOptions = {
//   game_id: 0,
//   round: 0,
//   prompt: "Nothing to see here",
//   options: [
//     {
//       player1: {
//         beginnings: ["one", "one", "one"],
//         middles: ["22one", "22one", "22one"],
//         ends: ["4343", "4343", "4343", "4343"],
//       },
//     },
//     {
//       player2: {
//         beginnings: ["one", "one", "one"],
//         middles: ["22one", "22one", "22one"],
//         ends: ["4343", "4343", "4343", "4343"],
//       },
//     },
//     {
//       player3: {
//         beginnings: ["one", "one", "one"],
//         middles: ["22one,", "22one", "22one"],
//         ends: ["4343", "4343", "4343", "4343"],
//       },
//     },
//     {
//       player4: {
//         beginnings: ["one", "one", "one"],
//         middles: ["22one,", "22one", "22one"],
//         ends: ["4343", "4343", "4343", "4343"],
//       },
//     },
//   ],
// };

// export function promptOptionsReducer(
//   state: PromptAndOptions[] = [initialState],
//   action: PromptAndOptionsActions.Actions,
// ) {
//   // Section 3
//   switch (action.type) {
//     case PromptAndOptionsActions.NEW_GAME:
//       return [...state, action.payload];
//     default:
//       return state;
//   }
// }

// export class ThingsService {
//   fragmentsData: FragmentItem[];
//   promptData: PromptItem[];

// constructor(private httpClient: HttpClient) {
//   this.getFragList();
//   this.getPrompt();
//   // this.promptAndOptions();
// }
//   getFragList() {
//     this.httpClient
//       .get<FragmentItem[]>("assets/fragments.json")
//       .subscribe((res) => {
//         // this.fragmentsData = res;
//         console.log("got fragments in service file");
//         // return res;
//         var selectedFragmentsArr = [
//           {
//             player1: {
//               beginnings: [],
//               middles: [],
//               ends: [],
//             },
//           },
//           {
//             player2: {
//               beginnings: [],
//               middles: [],
//               ends: [],
//             },
//           },
//           {
//             player3: {
//               beginnings: [],
//               middles: [],
//               ends: [],
//             },
//           },
//           {
//             player4: {
//               beginnings: [],
//               middles: [],
//               ends: [],
//             },
//           },
//         ];
//         for (var p = 0; p < selectedFragmentsArr.length; p++) {
//           // var beginnings = [];
//           // var middles = [];
//           // var ends = [];
//           // var all = [];
//           for (var i = 0; i < 6; i++) {
//             var j = Math.floor(Math.random() * Math.floor(24));
//             var k = Math.floor(Math.random() * Math.floor(24));
//             var l = Math.floor(Math.random() * Math.floor(24));
//             selectedFragmentsArr[p][`player${p + 1}`].beginnings.push(
//               res[j].beginning,
//             );
//             selectedFragmentsArr[p][`player${p + 1}`].middles.push(
//               res[k].middle,
//             );
//             selectedFragmentsArr[p][`player${p + 1}`].ends.push(res[l].end);
//           }
//         }

//         // all.push(beginnings);
//         // all.push(middles);
//         // all.push(ends);
//         return selectedFragmentsArr;
//       });
//   }

// export interface FragmentItem {
//   order: number;
//   beginning: string;
//   middle: string;
//   end: string;
// }

// export interface PromptItem {
//   order: number;
//   prompt: string;
// }

// export interface PromptAndOptions {
//   game_id: number;
//   round: number;
//   prompt: string;
//   options: Array<any>;
// }

// export interface AppState {
//   game_id: number;
//   round: number;
//   promptAndOptions: PromptAndOptions[];
// }

// export interface Response {
//   name: string;
//   game_id: number;
//   prompt: string;
//   response: string;
//   submittedAt: Date;
//   won: boolean;
// }

// export interface CurrentResponse {
//   player: number;
//   round: number;
//   response: Response[];
// }

// export const promptoptions: ActionReducer<PromptAndOptions> = (
//   state: PromptAndOptions = {
//     game_id: 1,
//     round: 1,
//     prompt: "",
//     options: [],
//   },
//   action: Action,
// ) => {
//   switch (action.type) {
//     case NEW_ROUND:
//       return Object.assign({}, state, {
//         round: state.round++,
//         prompt: this.getPrompt(),
//         options: this.getFragList(),
//       });
//     case NEW_GAME:
//       return Object.assign({}, state, {
//         game_id: state.game_id++,
//         round: 1,
//         prompt: this.getPrompt(),
//         options: this.getFragList(),
//       });
//     default:
//       return state;
//   }
// };
