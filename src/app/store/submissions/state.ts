import { Submissions } from "./models";


export class SubmissionsState {
  Submissions: Array<Submissions>;
  SubmissionsError: Error;
}


// export default class GameState {
//   roundNum: number;
//   prompt: Array<PromptItem>;
//   gameError: Error;
// }

// export const initializeState = (): GameState => {
//   return { roundNum: 0, prompt: Array<PromptItem>(), gameError: null };
// };

export const initializeState = (): SubmissionsState => {
  return {
    Submissions: [],
    SubmissionsError: null
  };
};


