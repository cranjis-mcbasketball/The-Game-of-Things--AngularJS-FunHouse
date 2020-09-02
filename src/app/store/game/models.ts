export interface FragmentItem {
  order: number;
  beginning: string;
  middle: string;
  end: string;
}

export interface PromptItem {
  order: number;
  prompt: string;
}

export interface PromptAndOptions {
  game_id: number;
  round: number;
  prompt: string;
  options: Array<Object>;
}

export interface CurrentRound {
  round: number;
  prompt: string;
}

export interface WinningGuy {
  prompt: string;
  name: string;
  response: string;
  date: Date;
}

export interface AppState {
  game_id: number;
  round: number;
  winner_hist: Array<object>;
  promptAndOptions: PromptAndOptions[];
}
