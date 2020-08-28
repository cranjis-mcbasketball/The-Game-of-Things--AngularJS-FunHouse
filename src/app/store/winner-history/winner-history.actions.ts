import {Action} from '@ngrx/store';

export enum WinnerActionTypes {
  Add = '[Winner Component] Add',
  Remove = '[Winner Component] Remove'
}
export class ActionEx implements Action {
  readonly type;
  payload: any;
}
export class WinnerAdd implements ActionEx {
  readonly type = WinnerActionTypes.Add;
  constructor(public payload: any) {
  }
}
export class WinnerRemove implements ActionEx {
  readonly type = WinnerActionTypes.Remove;
  constructor(public payload: any) {
  }
}