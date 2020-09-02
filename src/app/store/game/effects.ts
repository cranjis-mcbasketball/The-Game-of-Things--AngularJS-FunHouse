import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import * as GameActions from "./actions";
import { GameHttpService } from "./service";
import { PromptItem } from "./models";

@Injectable()
export class GameEffects {
  constructor(private gameService: GameHttpService, private action$: Actions) {}

  randomInt = Math.floor(Math.random() * Math.floor(11));

  GetPrompt$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(GameActions.BeginGetPromptAction),
      mergeMap((action) =>
        this.gameService.getPrompts().pipe(
          map((data: PromptItem[]) => {
            // var j = Math.floor(Math.random() * Math.floor(11));
            console.log("payload", data);
            return GameActions.SuccessGetPromptAction({
              payload: data,
            });
          }),
          catchError((error: Error) => {
            return of(GameActions.ErrorGameAction(error));
          }),
        ),
      ),
    ),
  );
}
