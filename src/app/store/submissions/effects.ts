import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import * as SubmissionsActions from "./actions";
import { SubmissionsHttpService } from "./service";
import { Submissions } from "./models";

@Injectable()
export class SubmissionsEffects {
  constructor(private submissionsService: SubmissionsHttpService, private action$: Actions) { }

  CreateSubmissions$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(SubmissionsActions.BeginCreateSubmissionsAction),
      mergeMap(action =>
        this.submissionsService.createSubmissions(action.payload).pipe(
          map((data: Submissions) => {
            return SubmissionsActions.SuccessCreateSubmissionsAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(SubmissionsActions.ErrorSubmissionsAction(error));
          })
        )
      )
    )
  );
}
