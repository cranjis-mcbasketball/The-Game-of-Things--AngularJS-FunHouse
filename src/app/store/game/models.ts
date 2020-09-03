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


export interface WinningGuy {
  prompt: string;
  name: string;
  response: string;
  date: Date;
}


