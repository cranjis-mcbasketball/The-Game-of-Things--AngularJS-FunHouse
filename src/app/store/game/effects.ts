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
  constructor(private gameService: GameHttpService, private action$: Actions) { }

  randomInt = Math.floor(Math.random() * Math.floor(11));

  newRound$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(GameActions.BeginnewPromptAction),
      mergeMap((action) =>
        this.gameService.newRounds().pipe(
          map((data: PromptItem[]) => {
            var j = Math.floor(Math.random() * Math.floor(11));
            console.log("payload", data);
            return GameActions.SuccessnewPromptAction({
              payload: data[j],
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
